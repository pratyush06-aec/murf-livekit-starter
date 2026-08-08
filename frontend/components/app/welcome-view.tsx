import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeViewProps {
  startButtonText: string;
  isConnecting?: boolean;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  isConnecting,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Custom Native Three.js Disaster Globe */}
      <iframe
        src="/disaster.html"
        className="pointer-events-auto absolute inset-0 z-0 h-full w-full border-0 opacity-90 mix-blend-screen"
        title="Disaster Globe Background"
      />

      {/* Overlay UI */}
      <section className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
        {/* We add an invisible spacer so the button sits exactly in the lower-middle, aligned cleanly over the globe */}
        <div className="flex-1"></div>

        <Button
          size="lg"
          onClick={onStartCall}
          disabled={isConnecting}
          className="pointer-events-auto mb-32 w-64 rounded-full bg-red-500 font-mono text-xs font-bold tracking-wider text-white uppercase shadow-xl shadow-red-500/20 hover:bg-red-600"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            startButtonText
          )}
        </Button>
      </section>

      <div className="pointer-events-none absolute bottom-8 left-0 z-10 flex w-full items-center justify-center">
        <p className="text-muted-foreground pt-1 text-sm leading-5 font-medium tracking-wide uppercase">
          Stay Calm
        </p>
      </div>
    </div>
  );
};
