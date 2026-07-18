import type {
  Complaint,
  FeatureRequest,
  PraisedFeature,
  Recommendation,
} from '../data/placeholder';
import { Badge } from './ui/Badge';
import { Card, CardHeader } from './ui/Card';
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Lightbulb,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import type { ReactNode } from 'react';

function TrendIcon({ trend }: { trend?: 'up' | 'down' | 'flat' }) {
  if (!trend || trend === 'flat')
    return <Minus size={12} className="text-ink-400" />;
  return trend === 'up' ? (
    <TrendingUp size={12} className="text-accent-600" />
  ) : (
    <TrendingDown size={12} className="text-danger-500" />
  );
}

interface MetricBarProps {
  label: string;
  value: number;
  max: number;
  tone: 'brand' | 'accent' | 'warning' | 'danger';
}

function MetricBar({ label, value, max, tone }: MetricBarProps) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100));
  const tones = {
    brand: 'bg-brand-500',
    accent: 'bg-accent-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
  };
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-ink-500 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-ink-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${tones[tone]} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-ink-700 w-10 text-right tabular-nums">
        {value}%
      </span>
    </div>
  );
}

/* ---------- Executive Summary ---------- */
interface ExecutiveSummaryProps {
  summary: string;
  points: { text: string }[];
  sentiment: { positive: number; neutral: number; negative: number };
}

export function ExecutiveSummaryCard({
  summary,
  points,
  sentiment,
}: ExecutiveSummaryProps) {
  return (
    <Card padding="lg">
      <CardHeader
        icon={<FileText size={18} />}
        title="Executive Summary"
        subtitle="AI-generated overview"
        action={<Badge tone="brand" dot>Ready</Badge>}
      />
      <p className="mt-5 text-[15px] leading-relaxed text-ink-700 text-pretty">
        {summary}
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
        {points.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 rounded-xl bg-ink-50/70 border border-ink-200/60 px-3.5 py-3"
          >
            <CheckCircle2
              size={16}
              className="text-accent-500 mt-0.5 shrink-0"
            />
            <span className="text-[13px] text-ink-600 leading-relaxed">
              {p.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-ink-200/70">
        <p className="text-xs font-medium text-ink-500 mb-3">
          Sentiment distribution
        </p>
        <div className="space-y-2.5">
          <MetricBar label="Positive" value={sentiment.positive} max={100} tone="accent" />
          <MetricBar label="Neutral" value={sentiment.neutral} max={100} tone="brand" />
          <MetricBar label="Negative" value={sentiment.negative} max={100} tone="danger" />
        </div>
      </div>
    </Card>
  );
}

/* ---------- Top Customer Complaints ---------- */
const severityTone = {
  high: 'danger',
  medium: 'warning',
  low: 'neutral',
} as const;

export function ComplaintsCard({ complaints }: { complaints: Complaint[] }) {
  return (
    <Card padding="lg">
      <CardHeader
        icon={<AlertTriangle size={18} />}
        title="Top Customer Complaints"
        subtitle="Ranked by frequency & severity"
        action={<Badge tone="danger">{complaints.length} themes</Badge>}
      />
      <div className="mt-5 space-y-3">
        {complaints.map((c, i) => (
          <div
            key={i}
            className="rounded-xl border border-ink-200/70 bg-white hover:border-ink-200 hover:shadow-soft transition-all p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="shrink-0 w-6 h-6 rounded-lg bg-danger-50 text-danger-600 text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-ink-900">
                    {c.title}
                  </h4>
                  <p className="mt-1.5 text-[13px] text-ink-500 italic leading-relaxed">
                    {c.excerpt}
                  </p>
                </div>
              </div>
              <Badge tone={severityTone[c.severity]} className="capitalize shrink-0">
                {c.severity}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-ink-400">
              <span>{c.mentions.toLocaleString()} mentions</span>
              <span className="h-3 w-px bg-ink-200" />
              <span>{c.share}% of negative reviews</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- Top Praised Features ---------- */
export function PraisedCard({ praised }: { praised: PraisedFeature[] }) {
  return (
    <Card padding="lg">
      <CardHeader
        icon={<CheckCircle2 size={18} />}
        title="Top Praised Features"
        subtitle="What customers love most"
        action={<Badge tone="success">High satisfaction</Badge>}
      />
      <div className="mt-5 space-y-4">
        {praised.map((f, i) => (
          <div key={i}>
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-medium text-ink-800 truncate">
                  {f.name}
                </span>
                <Badge tone="neutral" className="shrink-0">
                  {f.category}
                </Badge>
              </div>
              <span className="text-sm font-semibold text-ink-900 tabular-nums">
                {f.score.toFixed(1)}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-500 transition-all duration-700"
                style={{ width: `${(f.score / 5) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-ink-400">
              {f.mentions.toLocaleString()} mentions
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- Feature Requests ---------- */
const priorityTone = {
  critical: 'danger',
  high: 'warning',
  medium: 'brand',
  low: 'neutral',
} as const;

export function RequestsCard({ requests }: { requests: FeatureRequest[] }) {
  return (
    <Card padding="lg">
      <CardHeader
        icon={<Lightbulb size={18} />}
        title="Feature Requests"
        subtitle="What customers want next"
        action={<Badge tone="brand">{requests.length} requests</Badge>}
      />
      <div className="mt-5 space-y-3">
        {requests.map((r, i) => (
          <div
            key={i}
            className="rounded-xl border border-ink-200/70 bg-white p-4 hover:border-ink-200 hover:shadow-soft transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="shrink-0 mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-md tabular-nums">
                  {r.votes} votes
                </span>
                <h4 className="text-sm font-semibold text-ink-900">
                  {r.title}
                </h4>
              </div>
              <Badge
                tone={priorityTone[r.priority]}
                className="capitalize shrink-0"
              >
                {r.priority}
              </Badge>
            </div>
            <p className="mt-2 text-[13px] text-ink-500 leading-relaxed">
              {r.rationale}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- Product Recommendations ---------- */
const impactTone = { high: 'success', medium: 'brand', low: 'neutral' } as const;
const effortTone = { high: 'danger', medium: 'warning', low: 'success' } as const;

function Pill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'success' | 'brand' | 'neutral' | 'danger' | 'warning';
}) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-ink-500">
      {label}
      <Badge tone={tone} className="capitalize">
        {value}
      </Badge>
    </span>
  );
}

export function RecommendationsCard({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  return (
    <Card padding="lg">
      <CardHeader
        icon={<Sparkles size={18} />}
        title="Product Recommendations"
        subtitle="Prioritized by impact vs. effort"
        action={<Badge tone="brand" dot>AI ranked</Badge>}
      />
      <div className="mt-5 space-y-3">
        {recommendations.map((r, i) => (
          <div
            key={i}
            className="rounded-xl border border-ink-200/70 bg-white p-4 hover:border-ink-200 hover:shadow-soft transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-brand-50 text-brand-600 text-sm font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-ink-900">{r.title}</h4>
                <p className="mt-1.5 text-[13px] text-ink-500 leading-relaxed">
                  {r.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Pill label="Impact" value={r.impact} tone={impactTone[r.impact]} />
                  <Pill label="Effort" value={r.effort} tone={effortTone[r.effort]} />
                  <span className="text-[11px] text-ink-400">
                    Est. {r.timeframe}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- Metric tile ---------- */
interface MetricTileProps {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
  icon?: ReactNode;
}

export function MetricTile({ label, value, delta, trend, icon }: MetricTileProps) {
  return (
    <Card padding="md" hover>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-500">{label}</span>
        {icon && <span className="text-ink-300">{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-ink-900 tracking-tight tabular-nums">
          {value}
        </span>
        {delta && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-600">
            <TrendIcon trend={trend} />
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
