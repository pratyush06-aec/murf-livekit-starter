# Disaster Response Voice AI Agent

An advanced, real-time voice AI assistant designed for emergency disaster response and flood alerting in India. Powered by LiveKit Agents, Murf Falcon TTS, Deepgram STT, and Google Gemini, this system acts as an autonomous hotline agent capable of triaging emergencies, looking up returning callers, and fetching live meteorological data.

## 🚀 Key Features

*   **Ultra-Low Latency Voice Pipeline:** Seamless conversational flow using Deepgram Nova-3 for Speech-to-Text, Gemini for intelligent routing, and Murf Falcon for hyper-realistic Text-to-Speech.
*   **Multilingual Support:** Fully bilingual capabilities, seamlessly switching between English and Hindi (including Hinglish), adapting to the caller's language register.
*   **Persistent Caller Memory:** Integrates a local SQLite database to securely save caller profiles (location, household size, medical needs) by phone number. When callers return, the agent greets them by name and recalls their previous situation.
*   **Live Disaster Alerts & Forecasts:** Dynamically fetches real-time severe weather alerts and 2-hour forecasts for any specified district.
*   **Graceful Fallbacks:** Built-in network resiliency ensures the agent gracefully handles API failures (like losing connection to the weather database) by verbally informing the user instead of crashing or hallucinating.

---

## 📡 Live Data Source Disclosure

> **Note on Data Sources:** 
> This project uses **Open-Meteo's Free Weather API** as its live data source for the `get_district_alert` agent tool. 
> - **Geocoding:** Resolves district names to exact coordinates.
> - **Forecasts:** Fetches real-time precipitation and wind speed to calculate disaster alert thresholds (Green/Yellow/Orange/Red) and provides a 2-hour rain forecast.
> 
> *Open-Meteo does not require an API key for non-commercial use, making this agent extremely reliable for live demonstrations without quota risks.*

---

## 🏗️ System Architecture

The project is structured as a monorepo containing three core components:

1.  **Backend (Python):** 
    - The `livekit-agents` worker (`backend/src/agent.py`).
    - Handles the core LLM logic, function calling (Tools), memory persistence (`db.py`), and external API requests (`weather_api.py`).
2.  **Frontend (Next.js):** 
    - A React-based web interface built with `livekit-components-react` and TailwindCSS.
    - Provides a visual representation of the agent, voice visualizers, and microphone controls.
3.  **LiveKit Server:** 
    - The WebRTC media server that bridges the low-latency audio streams between the Frontend and the Backend worker.

---

## 🛠️ Available Agent Tools

The Gemini LLM is equipped with specialized function tools to autonomously assist callers:
*   `lookup_caller(phone_number)`: Retrieves persistent details (name, language, previous facts) from SQLite to provide contextual greetings.
*   `save_caller_info(...)`: Upserts newly learned facts (location, household size, medical needs) into the SQLite database.
*   `get_district_alert(district_name)`: Triggers the `weather_api.py` module to fetch live disaster alerts and rain forecasts from Open-Meteo.

---

## 🧪 Testing

The backend includes automated evaluation tests using LiveKit's LLM-as-judge framework. These tests simulate a user interacting with the agent and evaluate the agent's responses.

```bash
cd backend
uv run pytest
```
*(Note: Running tests requires valid `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET` in your `.env.local`).*

---

## 🎨 Customization

*   **Change Agent Behavior:** Edit the `SYSTEM_PROMPT` in `backend/src/agent.py` to adjust the agent's persona, rules, and guardrails.
*   **Update Frontend Branding:** Edit `frontend/app-config.ts` to change the application title, visualizer colors, logo, and welcome messages.
*   **Change the Voice:** Browse the [Murf Voice Library](https://murf.ai/api/docs/voices-styles/voice-library) and update the `voice` argument in `murf.TTS(...)` within `agent.py`.

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
*   **Python 3.10+** (managed via `uv`)
*   **Node.js 18+** & **pnpm**
*   **LiveKit CLI** (for running the local development server)
*   **uv package manager** (`pip install uv`)

---

## 🔑 Environment Setup

You need two environment files. Copy the `.env.example` files to `.env.local` in both the `backend/` and `frontend/` directories.

**Backend (`backend/.env.local`):**
```env
LIVEKIT_URL=ws://127.0.0.1:7880
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret
MURF_API_KEY=your_murf_key_here
DEEPGRAM_API_KEY=your_deepgram_key_here
GOOGLE_API_KEY=your_gemini_key_here
```

**Frontend (`frontend/.env.local`):**
```env
LIVEKIT_URL=ws://127.0.0.1:7880
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret
```

---

## 🚀 Running the Application

For the full system to work locally, you must start all three services simultaneously. You can use the provided startup scripts (`start_app.sh` for macOS/Linux or `start_app.ps1` for Windows), or run them manually in three separate terminals:

### 1. Start the LiveKit Media Server
```bash
# In Terminal 1
livekit-server --dev
```

### 2. Start the Python Agent Backend
```bash
# In Terminal 2
cd backend
uv sync
uv run python src/agent.py dev
```
*(The backend will auto-initialize the SQLite database on startup).*

### 3. Start the Next.js Frontend
```bash
# In Terminal 3
cd frontend
pnpm install
pnpm dev
```

Once all three are running, open your browser and navigate to `http://localhost:3000`. Click the connect button, allow microphone permissions, and start speaking to your disaster response agent!

---

## 📂 Project Structure

```text
murf-livekit-starter/
├── backend/                  # Python voice agent worker
│   ├── src/
│   │   ├── agent.py          # Agent entrypoint, system prompt, and tools
│   │   ├── db.py             # SQLite wrapper for persistent memory
│   │   └── weather_api.py    # Open-Meteo live API integration
│   ├── caller_data.db        # Auto-generated SQLite memory storage
│   └── pyproject.toml        # Python dependencies managed by uv
├── frontend/                 # Next.js web application
│   ├── app/                  # Pages and API routes (Token generation)
│   ├── components/           # UI components, visualizers, controls
│   └── app-config.ts         # Branding and visualizer configuration
└── livekit/                  # LiveKit local server directory
```
