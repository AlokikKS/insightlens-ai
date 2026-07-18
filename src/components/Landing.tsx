import { ArrowRight, Play, Upload, Sparkles, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { Logo } from './ui/Logo';
import { Badge } from './ui/Badge';

interface LandingProps {
  onPrimary: () => void;
  onSecondary: () => void;
}

const steps = [
  {
    id: '01',
    icon: Upload,
    title: 'Upload CSV',
    description:
      'Drop in any export of customer reviews — App Store, G2, Zendesk, your own database. No schema mapping required.',
  },
  {
    id: '02',
    icon: Sparkles,
    title: 'AI Analysis',
    description:
      'InsightLens reads every review, clusters them into themes, scores sentiment, and surfaces what actually matters.',
  },
  {
    id: '03',
    icon: FileText,
    title: 'Product Insights',
    description:
      'Get an executive summary, ranked complaints, feature requests, and prioritized recommendations — ready to act on.',
  },
];

const logos = ['Linear', 'Notion', 'Vercel', 'Loom', 'Ramp', 'Retool'];

export function Landing({ onPrimary, onSecondary }: LandingProps) {
  return (
    <div className="min-h-screen bg-ink-50 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" aria-hidden />
      {/* Soft brand glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(53,99,245,0.10), transparent 70%)',
        }}
        aria-hidden
      />

      {/* Nav */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-500">
          <a href="#how" className="hover:text-ink-900 transition-colors">
            How it works
          </a>
          <a href="#demo" className="hover:text-ink-900 transition-colors">
            Demo
          </a>
          <a
            href="https://openrouter.ai"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink-900 transition-colors"
          >
            OpenRouter
          </a>
        </nav>
        <Button variant="secondary" size="sm" onClick={onPrimary}>
          Open app
        </Button>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 sm:pt-24 pb-20 text-center">
        <div className="animate-fade-up">
          <Badge tone="brand" dot className="mb-6">
            Now in private beta
          </Badge>
        </div>
        <h1
          className="animate-fade-up text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-ink-900 text-balance"
          style={{ animationDelay: '60ms' }}
        >
          InsightLens{' '}
          <span className="font-serif italic text-brand-500">AI</span>
        </h1>
        <p
          className="animate-fade-up mt-6 text-lg sm:text-xl text-ink-500 text-pretty max-w-2xl mx-auto leading-relaxed"
          style={{ animationDelay: '120ms' }}
        >
          Transform raw customer reviews into AI-powered product insights. In
          under 60 seconds, know exactly what to build next.
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: '180ms' }}
        >
          <Button size="lg" leftIcon={<Upload size={18} />} onClick={onPrimary}>
            Upload Review CSV
          </Button>
          <Button
            size="lg"
            variant="secondary"
            leftIcon={<Play size={16} />}
            onClick={onSecondary}
          >
            View Demo
          </Button>
        </div>

        <p
          className="animate-fade-in mt-6 text-xs text-ink-400"
          style={{ animationDelay: '260ms' }}
        >
          No account required · Runs in your browser · Your data never leaves your machine
        </p>
      </section>

      {/* Social proof strip */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <p className="text-center text-xs font-medium tracking-widest uppercase text-ink-400 mb-6">
          Trusted by product teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-ink-400">
          {logos.map((l) => (
            <span
              key={l}
              className="text-base font-semibold tracking-tight opacity-70 hover:opacity-100 transition-opacity"
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* 3-step workflow */}
      <section id="how" className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <Badge tone="neutral" className="mb-4">
            How it works
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            From CSV to roadmap in three steps
          </h2>
          <p className="mt-3 text-ink-500 max-w-xl mx-auto">
            No data science team required. Upload, analyze, act.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative animate-scale-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="rounded-3xl bg-white border border-ink-200/80 p-6 shadow-soft h-full hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <span className="text-sm font-mono text-ink-300">
                      {step.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-ink-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-white border border-ink-200 shadow-soft flex items-center justify-center text-ink-400">
                      <ArrowRight size={12} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-28">
        <div className="relative overflow-hidden rounded-4xl bg-ink-900 text-white p-10 sm:p-14 text-center shadow-lift">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(53,99,245,0.5), transparent 60%)',
            }}
            aria-hidden
          />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
              Stop reading reviews. Start acting on them.
            </h2>
            <p className="mt-4 text-ink-300 max-w-xl mx-auto">
              Upload your first CSV and get a full product insights dashboard in
              under a minute.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                variant="secondary"
                leftIcon={<Upload size={18} />}
                onClick={onPrimary}
                className="bg-white text-ink-900 hover:bg-ink-100 border-transparent"
              >
                Upload Review CSV
              </Button>
              <Button
                size="lg"
                variant="ghost"
                rightIcon={<ArrowRight size={18} />}
                onClick={onSecondary}
                className="text-ink-200 hover:text-white hover:bg-white/10"
              >
                See it in action
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-ink-200/70">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={26} />
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} InsightLens AI · Built for product teams
          </p>
        </div>
      </footer>
    </div>
  );
}
