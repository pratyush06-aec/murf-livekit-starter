'use client';

import { useMemo, useEffect } from 'react';
import { TokenSource } from 'livekit-client';
import { useSession } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr';
import type { AppConfig } from '@/app-config';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/ui/sonner';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { getSandboxTokenSource } from '@/lib/utils';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

// ── DEBUG helper ─────────────────────────────────────────────────────────────
function dbg(tag: string, ...args: unknown[]) {
  // console.log(`%c[DEBUG][APP][${tag}]`, 'color: #4fc3f7; font-weight: bold;', ...args);
}

function AppSetup() {
  dbg('SETUP', 'AppSetup component mounted');
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();

  return null;
}

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  dbg('INIT', '─── App component rendering ───');
  dbg('INIT', 'appConfig:', JSON.stringify(appConfig, null, 2));
  dbg('INIT', `NEXT_PUBLIC_CONN_DETAILS_ENDPOINT=${process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? 'NOT SET'}`);
  dbg('INIT', `NODE_ENV=${process.env.NODE_ENV}, IN_DEVELOPMENT=${IN_DEVELOPMENT}`);

  const tokenSource = useMemo(() => {
    if (typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === 'string') {
      dbg('TOKEN-SOURCE', '→ Using SANDBOX token source (custom endpoint)');
      return getSandboxTokenSource(appConfig);
    } else {
      dbg('TOKEN-SOURCE', '→ Using DEFAULT token source (/api/token)');
      return TokenSource.endpoint('/api/token');
    }
  }, [appConfig]);

  dbg('SESSION', 'Calling useSession()...');
  dbg('SESSION', `agentName=${appConfig.agentName ?? 'NOT SET'}`);

  const sessionOptions = useMemo(() => {
    return appConfig.agentName ? { agentName: appConfig.agentName } : undefined;
  }, [appConfig.agentName]);

  const session = useSession(tokenSource, sessionOptions);

  useEffect(() => {
    dbg('SESSION-STATE', `isConnected=${session.isConnected}`);
  }, [session.isConnected]);

  dbg('RENDER', `Session isConnected=${session.isConnected}`);

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="grid h-svh grid-cols-1 place-content-center">
        <ViewController appConfig={appConfig} />
      </main>
      <StartAudioButton label="Start Audio" />
      <Toaster
        icons={{
          warning: <WarningIcon weight="bold" />,
        }}
        position="top-center"
        className="toaster group"
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
          } as React.CSSProperties
        }
      />
    </AgentSessionProvider>
  );
}
