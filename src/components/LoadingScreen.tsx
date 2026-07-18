import { useEffect, useState } from 'react';
import { Logo } from './ui/Logo';

interface LoadingScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

const messages = [
  'Reading reviews...',
  'Finding patterns...',
  'Understanding customer sentiment...',
  'Generating recommendations...',
  'Preparing dashboard...',
];

export function LoadingScreen({ onComplete, durationMs = 5200 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      // Ease-out for a calmer finish
      const eased = 100 - (1 - pct / 100) * (1 - pct / 100) * 100;
      setProgress(eased);

      const idx = Math.min(
        messages.length - 1,
        Math.floor((pct / 100) * messages.length),
      );
      setMsgIndex(idx);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // Small beat at 100% before transitioning
        setTimeout(onComplete, 420);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onComplete]);

  const currentStep = msgIndex + 1;

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" aria-hidden />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(53,99,245,0.10), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="animate-fade-in mb-10">
          <Logo size={40} />
        </div>

        {/* Animated progress ring + pulse */}
        <div className="relative mb-10" style={{ width: 132, height: 132 }}>
          <span className="absolute inset-0 rounded-full bg-brand-200/40 animate-pulse-ring" aria-hidden />
          <span
            className="absolute inset-0 rounded-full bg-brand-200/40 animate-pulse-ring"
            style={{ animationDelay: '1.2s' }}
            aria-hidden
          />
          <svg
            width="132"
            height="132"
            viewBox="0 0 132 132"
            className="-rotate-90 relative z-10"
          >
            <circle
              cx="66"
              cy="66"
              r="58"
              fill="none"
              stroke="#eef0f4"
              strokeWidth="6"
            />
            <circle
              cx="66"
              cy="66"
              r="58"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 58}
              strokeDashoffset={2 * Math.PI * 58 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 120ms linear' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3563f5" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-2xl font-semibold tabular-nums text-ink-900">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Rotating message */}
        <div className="h-7 mb-3 flex items-center justify-center">
          <p
            key={msgIndex}
            className="animate-fade-up text-lg font-medium text-ink-800 tracking-tight"
          >
            {messages[msgIndex]}
          </p>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {messages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === msgIndex
                  ? 'w-6 bg-brand-500'
                  : i < msgIndex
                    ? 'w-1.5 bg-brand-300'
                    : 'w-1.5 bg-ink-200'
              }`}
              aria-hidden
            />
          ))}
        </div>

        <p className="mt-8 text-xs text-ink-400">
          Step {currentStep} of {messages.length} · This usually takes under a minute
        </p>
      </div>
    </div>
  );
}
