import logging
import os
import sys
import traceback
from pathlib import Path

# Force utf-8 encoding for standard output to prevent LiveKit CLI rich console crashes on Windows
if sys.stdout and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr and sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

from dotenv import load_dotenv
from livekit import rtc
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    JobContext,
    JobProcess,
    cli,
    room_io,
    tokenize,
    function_tool,
    RunContext,
)
from livekit.plugins import deepgram, google, murf, noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel

import db
db.init_db()

# ── DEBUG: Configure logging ────────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("agent")
# logger.setLevel(logging.DEBUG)

# ── DEBUG: Env file loading ─────────────────────────────────────────────────
env_path = Path(__file__).resolve().parent.parent / ".env.local"
# logger.debug("[ENV] Looking for .env.local at: %s (exists=%s)", env_path, env_path.exists())
load_dotenv(env_path, override=True)

# ── DEBUG: Verify critical env vars ─────────────────────────────────────────
# _required_env_vars = [
#     "LIVEKIT_URL",
#     "LIVEKIT_API_KEY",
#     "LIVEKIT_API_SECRET",
#     "MURF_API_KEY",
#     "DEEPGRAM_API_KEY",
#     "GOOGLE_API_KEY",
# ]
# for var in _required_env_vars:
#     val = os.environ.get(var)
#     if val:
#         masked = val[:6] + "..." if len(val) > 6 else val
#         logger.debug("[ENV] %s = %s", var, masked)
#     else:
#         logger.error("[ENV] %s is NOT SET — this will cause failures!", var)

# logger.debug("[ENV] Python version: %s", sys.version)
# logger.debug("[ENV] Working directory: %s", os.getcwd())

# Change this prompt to change what your voice agent does.
# See README.md for example prompts (customer support, language tutor, receptionist).
SYSTEM_PROMPT = """
IDENTITY: You are Pooja, a disaster response voice agent for a flood alert hotline in India. You work for the regional emergency management authority.
OBJECTIVES: 
1. Triage the caller's immediate safety and location.
2. Provide verified information on local emergency shelters and relief camps.
3. Quickly gather basic information on medical emergencies or stranded individuals for the human rescue dispatch team.
KNOWLEDGE: You know general flood safety protocols, emergency contact numbers, and triage procedures. You do NOT have real-time GPS tracking capabilities, and you do NOT know the exact arrival time of rescue boats.
LANGUAGE: You are fully bilingual in Hindi and English. Mirror the caller's language mix. If the user starts in Hindi and drops in English words (Hinglish), reply in the exact same register. Maintain a calm, formal, and authoritative tone.
LANGUAGE & SCRIPT:
Always write every language in its own native script.
- Hindi → Devanagari (नमस्ते), never romanized (never "namaste").
- Same rule for all non-English languages.
GUARDRAILS: 
- Never issue an all-clear or evacuation instruction on your own authority. Always advise callers to wait for official government alerts for final clearance.
- Never promise an exact rescue time. 
- Escalation Script: If someone is in immediate life-threatening danger, state: "I am flagging your situation as a priority medical emergency for the rescue dispatch team right now."
STYLE: Speak in very short, clear sentences. Keep your pace calm and steady. If the user goes silent, ask "Are you still there? Are you safe?"
MEMORY & PERSISTENCE:
- Whenever you learn new details about a caller's situation (location, household size, mobility needs), you MUST call the `save_caller_info` tool to save them.
- Immediately after calling the save tool, inform the caller: "As this is a case of disaster, I'm saving your details by default, as it's required for the rescue process as well. Please don't panic."
- When you are provided with a phone number in your context, use the `lookup_caller` tool. If they exist, greet them by name and reference their previous situation (e.g., "Namaste Ramesh, last time we spoke about your location. Are you still safe there?").
- If the caller's phone number is missing or not provided automatically, politely ask them for their phone number to look up their previous records.
"""


class Assistant(Agent):
    def __init__(self, phone_number: str | None = None) -> None:
        # Append phone number to prompt context if available
        prompt = SYSTEM_PROMPT
        if phone_number:
            prompt += f"\n\n[SYSTEM] The caller's phone number is {phone_number}. Use lookup_caller right away to see if they are a returning caller."
        else:
            prompt += "\n\n[SYSTEM] No phone number was provided automatically. Ask the caller for their phone number to look them up."
            
        super().__init__(instructions=prompt)

    @function_tool
    async def lookup_caller(self, context: RunContext, phone_number: str) -> str:
        """Use this tool to look up a caller's previous details and facts using their phone number.
        
        Args:
            phone_number: The phone number of the caller.
        """
        data = db.get_caller(phone_number)
        if data:
            return f"Found caller: {data}"
        return "No previous records found for this phone number."

    @function_tool
    async def save_caller_info(self, context: RunContext, phone_number: str, name: str, language_preference: str, facts: str) -> str:
        """Use this tool to save or update details about a caller.
        
        Args:
            phone_number: The phone number of the caller.
            name: The name of the caller.
            language_preference: The caller's preferred language.
            facts: A JSON string containing facts like location, household size, mobility needs, last check-in.
        """
        db.upsert_caller(phone_number, name, language_preference, facts)
        return "Successfully saved caller details."


server = AgentServer()
# logger.debug("[SERVER] AgentServer created")


def prewarm(proc: JobProcess):
    # logger.debug("[PREWARM] Starting prewarm — loading Silero VAD model...")
    try:
        proc.userdata["vad"] = silero.VAD.load()
        # logger.debug("[PREWARM] Silero VAD model loaded successfully")
    except Exception as e:
        # logger.error("[PREWARM] Failed to load Silero VAD model: %s", e)
        # logger.error("[PREWARM] Traceback:\n%s", traceback.format_exc())
        raise


server.setup_fnc = prewarm
# logger.debug("[SERVER] Prewarm function registered")


@server.rtc_session(agent_name="my-agent")
async def my_agent(ctx: JobContext):
    # logger.debug("═" * 60)
    # logger.debug("[SESSION] my_agent() called — new session starting")
    # logger.debug("[SESSION] Room name: %s", ctx.room.name)
    # logger.debug("[SESSION] Room SID: %s", ctx.room.sid)

    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # ── DEBUG: STT init ─────────────────────────────────────────────────
    # logger.debug("[STT] Initializing Deepgram STT (model=nova-3)...")
    try:
        stt = deepgram.STT(model="nova-3", language="hi")
        # logger.debug("[STT] Deepgram STT created successfully")
    except Exception as e:
        # logger.error("[STT] Failed to create Deepgram STT: %s", e)
        # logger.error("[STT] Traceback:\n%s", traceback.format_exc())
        raise

    # ── DEBUG: LLM init ─────────────────────────────────────────────────
    # logger.debug("[LLM] Initializing Google LLM (model=gemini-3.5-flash)...")
    try:
        llm = google.LLM(
            model="gemini-3.5-flash",
            temperature=0.7,
        )
        # logger.debug("[LLM] Google LLM created successfully")
    except Exception as e:
        # logger.error("[LLM] Failed to create Google LLM: %s", e)
        # logger.error("[LLM] Traceback:\n%s", traceback.format_exc())
        raise

    # ── DEBUG: TTS init ─────────────────────────────────────────────────
    # logger.debug("[TTS] Initializing Murf TTS (voice=en-US-matthew, style=Conversation)...")
    try:
        tts = murf.TTS(
            voice="Pooja",
            style="Conversational",
            tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
            text_pacing=True,
        )
        # logger.debug("[TTS] Murf TTS created successfully")
    except Exception as e:
        # logger.error("[TTS] Failed to create Murf TTS: %s", e)
        # logger.error("[TTS] Traceback:\n%s", traceback.format_exc())
        raise

    # ── DEBUG: Turn detector init ───────────────────────────────────────
    # logger.debug("[TURN] Initializing MultilingualModel turn detector...")
    try:
        turn_detection = MultilingualModel()
        # logger.debug("[TURN] Turn detector created successfully")
    except Exception as e:
        # logger.error("[TURN] Failed to create turn detector: %s", e)
        # logger.error("[TURN] Traceback:\n%s", traceback.format_exc())
        raise

    # ── DEBUG: VAD retrieval ────────────────────────────────────────────
    # logger.debug("[VAD] Retrieving prewarmed VAD from proc.userdata...")
    try:
        vad = ctx.proc.userdata["vad"]
        # logger.debug("[VAD] VAD retrieved successfully: %s", type(vad).__name__)
    except KeyError as e:
        # logger.error("[VAD] VAD not found in proc.userdata! Prewarm may have failed. Key: %s", e)
        raise

    # ── DEBUG: AgentSession creation ────────────────────────────────────
    # logger.debug("[PIPELINE] Creating AgentSession with full voice pipeline...")
    try:
        # Set up a voice AI pipeline using Murf Falcon, Gemini, Deepgram, and the LiveKit turn detector
        session = AgentSession(
            # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
            # See all available models at https://docs.livekit.io/agents/models/stt/
            stt=stt,
            # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
            # See all available models at https://docs.livekit.io/agents/models/llm/
            llm=llm,
            # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
            # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
            tts=tts,
            # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
            # See more at https://docs.livekit.io/agents/build/turns
            turn_detection=turn_detection,
            vad=vad,
            # allow the LLM to generate a response while waiting for the end of turn
            # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
            preemptive_generation=True,
        )
        # logger.debug("[PIPELINE] AgentSession created successfully")
    except Exception as e:
        # logger.error("[PIPELINE] Failed to create AgentSession: %s", e)
        # logger.error("[PIPELINE] Traceback:\n%s", traceback.format_exc())
        raise

    # To use a realtime model instead of a voice pipeline, use the following session setup instead.
    # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    # 1. Install livekit-agents[openai]
    # 2. Set OPENAI_API_KEY in .env.local
    # 3. Add `from livekit.plugins import openai` to the top of this file
    # 4. Use the following session setup instead of the version above
    # session = AgentSession(
    #     llm=openai.realtime.RealtimeModel(voice="marin")
    # )

    # # Add a virtual avatar to the session, if desired
    # # For other providers, see https://docs.livekit.io/agents/models/avatar/
    # avatar = hedra.AvatarSession(
    #   avatar_id="...",  # See https://docs.livekit.io/agents/models/avatar/plugins/hedra
    # )
    # # Start the avatar and wait for it to join
    # await avatar.start(session, room=ctx.room)

    # ── DEBUG: Session start ────────────────────────────────────────────
    # logger.debug("[START] Starting session — connecting agent to room with noise cancellation...")
    try:
        # Extract phone number from participant identity if available
        remote_participant = next(iter(ctx.room.remote_participants.values()), None)
        phone_number = remote_participant.identity if remote_participant else None

        # Start the session, which initializes the voice pipeline and warms up the models
        await session.start(
            agent=Assistant(phone_number=phone_number),
            room=ctx.room,
            room_options=room_io.RoomOptions(
                audio_input=room_io.AudioInputOptions(
                    noise_cancellation=lambda params: (
                        noise_cancellation.BVCTelephony()
                        if params.participant.kind
                        == rtc.ParticipantKind.PARTICIPANT_KIND_SIP
                        else noise_cancellation.BVC()
                    ),
                ),
            ),
        )
        # logger.debug("[START] session.start() completed successfully")
    except Exception as e:
        # logger.error("[START] session.start() FAILED: %s", e)
        # logger.error("[START] Traceback:\n%s", traceback.format_exc())
        raise

    # ── DEBUG: Room connect ─────────────────────────────────────────────
    # logger.debug("[CONNECT] Calling ctx.connect() — joining room...")
    try:
        # Join the room and connect to the user
        await ctx.connect()
        # Immediately greet the user as requested in Step 4
        # Adding a brief delay ensures the frontend audio tracks are fully mounted before speaking
        import asyncio
        await asyncio.sleep(1.5)
        await session.say("Namaste, emergency flood response. This is Pooja. Are you safe right now?", allow_interruptions=True)
        # logger.debug("[CONNECT] ctx.connect() completed — agent is now in the room")
    except Exception as e:
        # logger.error("[CONNECT] ctx.connect() FAILED: %s", e)
        # logger.error("[CONNECT] Traceback:\n%s", traceback.format_exc())
        raise

    # logger.debug("═" * 60)
    # logger.debug("[SESSION] Agent fully started and connected to room: %s", ctx.room.name)


if __name__ == "__main__":
    # logger.debug("[MAIN] Starting agent CLI...")
    cli.run_app(server)
