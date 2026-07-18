import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 32, withWordmark = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-xl bg-ink-900 text-white shadow-soft"
        style={{ width: size, height: size }}
      >
        <Sparkles size={size * 0.52} strokeWidth={2.2} />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-400 ring-2 ring-white" />
      </div>
      {withWordmark && (
        <div className="leading-none">
          <div className="text-[15px] font-semibold tracking-tight text-ink-900">
            InsightLens
            <span className="text-brand-500"> AI</span>
          </div>
        </div>
      )}
    </div>
  );
}
