import { ArrowLeft, FileText, Key, Sparkles, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardHeader } from './ui/Card';
import { Badge } from './ui/Badge';
import { Logo } from './ui/Logo';

interface DashboardProps {
  onBack: () => void;
  onAnalyze: () => void;
}

export function Dashboard({ onBack, onAnalyze }: DashboardProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    const kb = file.size / 1024;
    setFileSize(
      kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`,
    );
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const canAnalyze = Boolean(fileName);

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-ink-50/85 backdrop-blur-md border-b border-ink-200/70">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-5 w-px bg-ink-200" />
            <Logo />
          </div>
          <Badge tone="brand" dot>
            Workspace
          </Badge>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="mb-10 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            Analyze your reviews
          </h1>
          <p className="mt-2 text-ink-500 max-w-xl">
            Upload a CSV of customer reviews, connect your AI key, and generate a
            full product insights dashboard.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Upload area — spans 3 */}
          <div className="lg:col-span-3 animate-fade-up" style={{ animationDelay: '60ms' }}>
            <Card padding="lg" className="h-full">
              <CardHeader
                icon={<UploadCloud size={18} />}
                title="Upload Area"
                subtitle="Drag & drop your reviews export"
                action={<Badge tone="neutral">CSV only</Badge>}
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`mt-5 cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 ${
                  isDragging
                    ? 'border-brand-400 bg-brand-50/60 scale-[1.01]'
                    : 'border-ink-200 hover:border-ink-300 bg-ink-50/40'
                } px-6 py-12 text-center`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={onInputChange}
                />
                <div className="mx-auto w-14 h-14 rounded-2xl bg-white border border-ink-200 shadow-soft flex items-center justify-center text-ink-500 mb-4">
                  <UploadCloud size={24} />
                </div>
                {fileName ? (
                  <div className="animate-scale-in">
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-ink-200 shadow-soft">
                      <FileText size={18} className="text-brand-500" />
                      <span className="text-sm font-medium text-ink-800">
                        {fileName}
                      </span>
                      {fileSize && (
                        <span className="text-xs text-ink-400">{fileSize}</span>
                      )}
                    </div>
                    <p className="mt-3 text-xs text-ink-400">
                      Click anywhere to replace the file
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-ink-700">
                      Drag & drop your CSV here
                    </p>
                    <p className="mt-1 text-xs text-ink-400">
                      or click to browse · accepted file: CSV
                    </p>
                  </>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-ink-400">
                  Tip: App Store, G2, Zendesk, or any review export works.
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  leftIcon={<FileText size={14} />}
                  onClick={() => inputRef.current?.click()}
                >
                  Browse Files
                </Button>
              </div>
            </Card>
          </div>

          {/* API configuration — spans 2 */}
          <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <Card padding="lg" className="h-full">
              <CardHeader
                icon={<Key size={18} />}
                title="Connect AI"
                subtitle="Powered by OpenRouter"
              />

              <div className="mt-5">
                <label
                  htmlFor="apikey"
                  className="block text-[13px] font-medium text-ink-700 mb-1.5"
                >
                  OpenRouter API Key
                </label>
                <div className="relative">
                  <input
                    id="apikey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="w-full h-11 px-3.5 pr-10 rounded-xl bg-ink-50 border border-ink-200 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:bg-white focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-300">
                    <Key size={15} />
                  </span>
                </div>
                <p className="mt-2 text-xs text-ink-400 leading-relaxed">
                  Your key stays in your browser and is never stored.
                </p>
              </div>

              <div className="mt-5 rounded-xl bg-accent-50/60 border border-accent-100 px-3.5 py-3 flex items-start gap-2.5">
                <Sparkles size={15} className="text-accent-600 mt-0.5 shrink-0" />
                <p className="text-xs text-accent-700 leading-relaxed">
                  No key? You can still explore the demo dashboard with
                  pre-loaded sample insights.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Analyze */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-up" style={{ animationDelay: '180ms' }}>
          <p className="text-sm text-ink-500">
            {canAnalyze ? (
              <>
                Ready to analyze{' '}
                <span className="font-medium text-ink-800">{fileName}</span>
              </>
            ) : (
              'Upload a CSV to enable analysis'
            )}
          </p>
          <Button
            size="lg"
            leftIcon={<Sparkles size={18} />}
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className="w-full sm:w-auto"
          >
            Analyze Reviews
          </Button>
        </div>
      </main>
    </div>
  );
}
