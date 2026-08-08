import { ReactNode, useEffect } from 'react';
import { toast as sonnerToast } from 'sonner';
import { useAgent, useSessionContext } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// ── DEBUG helper ─────────────────────────────────────────────────────────────
function dbg(tag: string, ...args: unknown[]) {
  // console.log(`%c[DEBUG][AGENT-ERRORS][${tag}]`, 'color: #ef5350; font-weight: bold;', ...args);
}

interface ToastProps {
  title: ReactNode;
  description: ReactNode;
}

function toastAlert(toast: ToastProps) {
  const { title, description } = toast;

  return sonnerToast.custom(
    (id) => (
      <Alert onClick={() => sonnerToast.dismiss(id)} className="bg-accent w-full md:w-[364px]">
        <WarningIcon weight="bold" />
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    ),
    { duration: 10_000 }
  );
}

export function useAgentErrors() {
  const agent = useAgent();
  const { isConnected, end } = useSessionContext();

  useEffect(() => {
    dbg('STATE', `agent.state=${agent.state}, isConnected=${isConnected}`);

    if (agent.state) {
      dbg('AGENT-STATE', `Current agent state: "${agent.state}"`);
    }

    if (isConnected && agent.state === 'failed') {
      const reasons = agent.failureReasons;
      dbg('FAILURE', `❌ Agent FAILED with ${reasons.length} reason(s):`);
      reasons.forEach((reason, i) => {
        dbg('FAILURE', `  [${i}] ${reason}`);
      });

      const hasMicError = reasons.some(
        (r) => typeof r === 'string' && r.includes('NotAllowedError')
      );

      if (hasMicError) {
        toastAlert({
          title: 'Microphone Access Blocked',
          description: (
            <p className="w-full">
              Microphone access is required. Please click the padlock in your browser address bar to
              allow microphone access, then refresh the page.
            </p>
          ),
        });
      } else {
        toastAlert({
          title: 'Session ended',
          description: (
            <>
              {reasons.length > 1 && (
                <ul className="list-inside list-disc">
                  {reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              )}
              {reasons.length === 1 && <p className="w-full">{reasons[0]}</p>}
              <p className="w-full">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.livekit.io/agents/start/voice-ai/"
                  className="whitespace-nowrap underline"
                >
                  See quickstart guide
                </a>
                .
              </p>
            </>
          ),
        });
      }

      dbg('FAILURE', 'Calling end() to disconnect session');
      end();
    }
  }, [agent, isConnected, end]);
}
