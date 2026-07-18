export interface Metric {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
}

export interface SummaryPoint {
  text: string;
}

export interface Complaint {
  title: string;
  mentions: number;
  share: number;
  severity: 'high' | 'medium' | 'low';
  excerpt: string;
}

export interface PraisedFeature {
  name: string;
  score: number;
  mentions: number;
  category: string;
}

export interface FeatureRequest {
  title: string;
  votes: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  rationale: string;
}

export interface Recommendation {
  title: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  timeframe: string;
  description: string;
}

export interface AnalysisResult {
  source: {
    name: string;
    reviews: number;
    uploadedAt: string;
  };
  metrics: Metric[];
  executiveSummary: string;
  summaryPoints: SummaryPoint[];
  complaints: Complaint[];
  praised: PraisedFeature[];
  requests: FeatureRequest[];
  recommendations: Recommendation[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export const placeholderResult: AnalysisResult = {
  source: {
    name: 'product_reviews_q3_2025.csv',
    reviews: 4827,
    uploadedAt: 'Just now',
  },
  metrics: [
    { label: 'Reviews analyzed', value: '4,827', delta: '+12%', trend: 'up' },
    { label: 'Avg. sentiment', value: '3.6 / 5', delta: '+0.3', trend: 'up' },
    { label: 'Themes detected', value: '37', delta: '+6', trend: 'up' },
    { label: 'Action items', value: '14', delta: '+4', trend: 'up' },
  ],
  executiveSummary:
    'Across 4,827 reviews from Q3 2025, customers are largely positive about onboarding speed and the new automation engine, but a growing segment is frustrated by sync reliability on mobile and the absence of offline mode. Three of the top five complaints map to a single root cause — background sync timing out on intermittent connections. Addressing it would meaningfully lift the mobile NPS, which currently trails desktop by 11 points.',
  summaryPoints: [
    { text: 'Overall sentiment is positive (68%) and trending up vs. Q2 (+4 pts).' },
    { text: 'Mobile sync reliability is the dominant risk — 22% of all negative reviews.' },
    { text: 'Offline mode is the #1 requested feature, with 312 explicit mentions.' },
    { text: 'The automation engine launched in July is already the 2nd most praised feature.' },
    { text: 'Pricing complaints dropped 38% after the May tier restructuring.' },
  ],
  complaints: [
    {
      title: 'Mobile sync fails on weak connections',
      mentions: 1062,
      share: 22,
      severity: 'high',
      excerpt:
        '"On the train every morning the app just spins and never syncs. I have to kill and reopen it 2–3 times."',
    },
    {
      title: 'No offline mode',
      mentions: 743,
      share: 15,
      severity: 'high',
      excerpt:
        '"Travel for work constantly. Without offline I literally cannot use half the features on flights."',
    },
    {
      title: 'Notifications can\u2019t be muted per workspace',
      mentions: 418,
      share: 9,
      severity: 'medium',
      excerpt:
        '"I love the product but the notification spam across 4 workspaces is driving me insane."',
    },
    {
      title: 'Search is slow on large accounts',
      mentions: 286,
      share: 6,
      severity: 'medium',
      excerpt:
        '"With 40k items, search takes 4–6 seconds. Feels like it\u2019s loading the whole database."',
    },
    {
      title: 'Export to CSV missing custom fields',
      mentions: 191,
      share: 4,
      severity: 'low',
      excerpt:
        '"CSV export drops my custom fields. I have to rebuild them in Sheets every week."',
    },
  ],
  praised: [
    {
      name: 'Onboarding flow',
      score: 4.8,
      mentions: 1402,
      category: 'Experience',
    },
    {
      name: 'Automation engine',
      score: 4.7,
      mentions: 1188,
      category: 'Capability',
    },
    {
      name: 'Keyboard shortcuts',
      score: 4.6,
      mentions: 873,
      category: 'Productivity',
    },
    {
      name: 'Design & polish',
      score: 4.6,
      mentions: 762,
      category: 'Experience',
    },
    {
      name: 'Customer support',
      score: 4.5,
      mentions: 534,
      category: 'Service',
    },
  ],
  requests: [
    {
      title: 'Offline mode with conflict resolution',
      votes: 312,
      priority: 'critical',
      rationale:
        'Top request by volume. Unblocks the travel/commute use case and directly reduces the #1 complaint.',
    },
    {
      title: 'Per-workspace notification controls',
      votes: 248,
      priority: 'high',
      rationale:
        'Frequent mention among power users with multiple workspaces; low effort, high satisfaction.',
    },
    {
      title: 'Instant search with indexing',
      votes: 197,
      priority: 'high',
      rationale:
        'Search latency is a recurring complaint for large accounts and blocks enterprise expansion.',
    },
    {
      title: 'Custom fields in CSV export',
      votes: 134,
      priority: 'medium',
      rationale:
        'Niche but vocal segment; small engineering cost with a clear workflow payoff.',
    },
    {
      title: 'Dark mode for mobile',
      votes: 88,
      priority: 'low',
      rationale:
        'Nice-to-have with steady demand. Good candidate for a quick win release.',
    },
  ],
  recommendations: [
    {
      title: 'Fix mobile background sync timeout',
      impact: 'high',
      effort: 'medium',
      timeframe: '2–4 weeks',
      description:
        'Add retry-with-backoff and a resilient queue for intermittent connections. Targets the single largest source of negative reviews (22%) and closes the desktop/mobile NPS gap.',
    },
    {
      title: 'Ship offline mode (read + queue writes)',
      impact: 'high',
      effort: 'high',
      timeframe: '1–2 quarters',
      description:
        'The #1 feature request. Pair with conflict-resolution UX. Roll out as an opt-in beta to validate the sync model before GA.',
    },
    {
      title: 'Granular notification preferences',
      impact: 'medium',
      effort: 'low',
      timeframe: '2–3 weeks',
      description:
        'Per-workspace mute and digest modes. Low effort, directly addresses a top-5 complaint, and improves retention among multi-workspace users.',
    },
    {
      title: 'Indexed search for large accounts',
      impact: 'medium',
      effort: 'medium',
      timeframe: '4–6 weeks',
      description:
        'Move from sequential query to an indexed store. Removes a blocker for enterprise deals and improves perceived performance across the board.',
    },
    {
      title: 'Expand CSV export to custom fields',
      impact: 'low',
      effort: 'low',
      timeframe: '1–2 weeks',
      description:
        'Small but visible win for ops/reporting users. Bundle with a broader export refresh for a cleaner release narrative.',
    },
  ],
  sentiment: {
    positive: 68,
    neutral: 19,
    negative: 13,
  },
};
