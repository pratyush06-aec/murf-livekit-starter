import { NextResponse } from 'next/server';
import { AccessToken, type AccessTokenOptions, type VideoGrant } from 'livekit-server-sdk';
import { RoomConfiguration } from '@livekit/protocol';

type ConnectionDetails = {
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
};

// NOTE: you are expected to define the following environment variables in `.env.local`:
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;
const AGENT_NAME = process.env.AGENT_NAME;

// don't cache the results
export const revalidate = 0;

// ── DEBUG helpers ────────────────────────────────────────────────────────────
function dbg(tag: string, ...args: unknown[]) {
  // console.log(`[DEBUG][TOKEN-API][${tag}]`, ...args);
}
function dbgErr(tag: string, ...args: unknown[]) {
  console.error(`[ERROR][TOKEN-API][${tag}]`, ...args);
}

export async function POST(req: Request) {
  dbg('REQUEST', '─── Incoming POST /api/token ───');
  dbg('ENV-CHECK', `LIVEKIT_URL=${LIVEKIT_URL ?? 'UNDEFINED'}`);
  dbg('ENV-CHECK', `LIVEKIT_API_KEY=${API_KEY ? API_KEY.slice(0, 6) + '...' : 'UNDEFINED'}`);
  dbg('ENV-CHECK', `LIVEKIT_API_SECRET=${API_SECRET ? '***set***' : 'UNDEFINED'}`);
  dbg('ENV-CHECK', `AGENT_NAME=${AGENT_NAME ?? 'UNDEFINED (no explicit dispatch)'}`);

  try {
    if (LIVEKIT_URL === undefined) {
      throw new Error('LIVEKIT_URL is not defined');
    }
    if (API_KEY === undefined) {
      throw new Error('LIVEKIT_API_KEY is not defined');
    }
    if (API_SECRET === undefined) {
      throw new Error('LIVEKIT_API_SECRET is not defined');
    }

    dbg('ENV-CHECK', '✅ All required env vars are present');

    // Parse room config from request body (if provided).
    dbg('BODY', 'Parsing request body...');
    const body = await req.json().catch(() => ({}));
    dbg('BODY', 'Request body:', JSON.stringify(body));

    let roomConfig: RoomConfiguration | undefined;
    if (body?.room_config) {
      dbg('ROOM-CONFIG', 'Using room_config from request body');
      roomConfig = RoomConfiguration.fromJson(body.room_config, { ignoreUnknownFields: true });
    } else if (AGENT_NAME) {
      dbg('ROOM-CONFIG', `Using AGENT_NAME="${AGENT_NAME}" for explicit agent dispatch`);
      // When AGENT_NAME is set, configure explicit agent dispatch so the named
      // agent worker picks up the job when a user joins the room.
      roomConfig = RoomConfiguration.fromJson(
        { agents: [{ agentName: AGENT_NAME }] },
        { ignoreUnknownFields: true }
      );
    } else {
      dbg('ROOM-CONFIG', 'No room_config and no AGENT_NAME — using default dispatch');
    }
      
    // Generate participant token
    const participantName = 'user';
    const participantIdentity = `voice_assistant_user_${Math.floor(Math.random() * 10_000)}`;
    const roomName = `voice_assistant_room_${Math.floor(Math.random() * 10_000)}`;

    dbg('TOKEN', `Generating token for participant="${participantIdentity}" room="${roomName}"`);

    const participantToken = await createParticipantToken(
      { identity: participantIdentity, name: participantName },
      roomName,
      roomConfig
    );

    dbg('TOKEN', `✅ Token generated (length=${participantToken.length})`);

    // Return connection details
    const data: ConnectionDetails = {
      serverUrl: LIVEKIT_URL,
      roomName,
      participantName,
      participantToken,
    };

    dbg('RESPONSE', `✅ Returning connection details: serverUrl=${data.serverUrl}, room=${data.roomName}`);

    const headers = new Headers({
      'Cache-Control': 'no-store',
    });
    return NextResponse.json(data, { headers });
  } catch (error) {
    if (error instanceof Error) {
      dbgErr('HANDLER', `❌ Error in POST /api/token: ${error.message}`);
      dbgErr('HANDLER', `Stack trace:`, error.stack);
      console.error(error);
      return new NextResponse(error.message, { status: 500 });
    }
  }
}

function createParticipantToken(
  userInfo: AccessTokenOptions,
  roomName: string,
  roomConfig?: RoomConfiguration
): Promise<string> {
  dbg('JWT', `Creating AccessToken: identity=${userInfo.identity}, ttl=15m`);

  const at = new AccessToken(API_KEY, API_SECRET, {
    ...userInfo,
    ttl: '15m',
  });
  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  };
  at.addGrant(grant);

  dbg('JWT', `Grant added: room=${roomName}, roomJoin=true, canPublish=true`);

  if (roomConfig) {
    at.roomConfig = roomConfig;
    dbg('JWT', `Room config attached to token`);
  }

  dbg('JWT', 'Signing JWT...');
  return at.toJwt();
}
