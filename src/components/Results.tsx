import { ArrowLeft, Download, RotateCcw, FileText, Hash, Smile, Target } from 'lucide-react';
import { Logo } from './ui/Logo';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { MetricTile } from './InsightCards';
import {
  ExecutiveSummaryCard,
  ComplaintsCard,
  PraisedCard,
  RequestsCard,
  RecommendationsCard,
} from './InsightCards';
import type { AnalysisResult } from '../data/placeholder';

interface ResultsProps {
  result: AnalysisResult;
  analysisCompleted: boolean;
  onNewAnalysis: () => void;
  onBack: () => void;
}

export function Results({
  result,
  analysisCompleted,
  onNewAnalysis,
  onBack,
}: ResultsProps) {
  const [m1, m2, m3, m4] = result.metrics;

  const handleExport = async () => {
    const { exportInsightsPdf } = await import('../lib/exportPdf');
    exportInsightsPdf(result);
  };

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-ink-50/85 backdrop-blur-md border-b border-ink-200/70">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Home</span>
            </button>
            <div className="h-5 w-px bg-ink-200" />
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Download size={14} />}
              onClick={handleExport}
              disabled={!analysisCompleted}
              title={analysisCompleted ? 'Export PDF report' : 'Run an analysis before exporting.'}
              className="hidden sm:inline-flex"
            >
              Export
            </Button>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<RotateCcw size={14} />}
              onClick={onNewAnalysis}
            >
              New analysis
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge tone="success" dot>
                Analysis complete
              </Badge>
              <span className="text-xs text-ink-400">
                {result.source.uploadedAt} · {result.source.reviews.toLocaleString()} reviews
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
              Product Insights
            </h1>
            <p className="mt-1.5 text-sm text-ink-500">
              Source: <span className="text-ink-700 font-medium">{result.source.name}</span>
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger"
        >
          <MetricTile
            label={m1.label}
            value={m1.value}
            delta={m1.delta}
            trend={m1.trend}
            icon={<Hash size={15} />}
          />
          <MetricTile
            label={m2.label}
            value={m2.value}
            delta={m2.delta}
            trend={m2.trend}
            icon={<Smile size={15} />}
          />
          <MetricTile
            label={m3.label}
            value={m3.value}
            delta={m3.delta}
            trend={m3.trend}
            icon={<Target size={15} />}
          />
          <MetricTile
            label={m4.label}
            value={m4.value}
            delta={m4.delta}
            trend={m4.trend}
            icon={<FileText size={15} />}
          />
        </div>

        {/* Insight cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="animate-fade-up" style={{ animationDelay: '60ms' }}>
            <ExecutiveSummaryCard
              summary={result.executiveSummary}
              points={result.summaryPoints}
              sentiment={result.sentiment}
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
            <RecommendationsCard recommendations={result.recommendations} />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '180ms' }}>
            <ComplaintsCard complaints={result.complaints} />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
            <PraisedCard praised={result.praised} />
          </div>
          <div
            className="animate-fade-up lg:col-span-2"
            style={{ animationDelay: '300ms' }}
          >
            <RequestsCard requests={result.requests} />
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-ink-400">
          Insights generated from placeholder data · Connect OpenRouter to analyze
          your own reviews
        </p>
      </main>
    </div>
  );
}
