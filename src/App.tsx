import { useState } from 'react';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { LoadingScreen } from './components/LoadingScreen';
import { Results } from './components/Results';
import { placeholderResult } from './data/placeholder';

type View = 'landing' | 'dashboard' | 'loading' | 'results';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  return (
    <>
      {view === 'landing' && (
        <Landing
          onPrimary={() => setView('dashboard')}
          onSecondary={() => {
            setAnalysisCompleted(false);
            setView('results');
          }}
        />
      )}

      {view === 'dashboard' && (
        <Dashboard
          onBack={() => setView('landing')}
          onAnalyze={() => setView('loading')}
        />
      )}

      {view === 'loading' && (
        <LoadingScreen
          onComplete={() => {
            setAnalysisCompleted(true);
            setView('results');
          }}
        />
      )}

      {view === 'results' && (
        <Results
          result={placeholderResult}
          analysisCompleted={analysisCompleted}
          onNewAnalysis={() => {
            setAnalysisCompleted(false);
            setView('dashboard');
          }}
          onBack={() => setView('landing')}
        />
      )}
    </>
  );
}
