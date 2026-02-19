import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LoadingAnimation from './components/LoadingAnimation';
import ResultsDisplay from './components/ResultsDisplay';
import { History, Sparkles } from 'lucide-react';
import { ProjectGeneration } from './types';
import { supabase } from './lib/supabase';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<ProjectGeneration | null>(null);


  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-2">Configuration Error</h2>
          <p className="text-slate-300 mb-4">
            Supabase keys are missing. Please check your <code className="bg-slate-900 px-2 py-1 rounded">.env</code> file.
          </p>
          <p className="text-sm text-slate-400">
            Make sure <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> are set.
          </p>
        </div>
      </div>
    );
  }

  const generateStructure = async (description: string) => {
    setIsLoading(true);

    if (!supabase) {
      console.error('Supabase client not initialized');
      setIsLoading(false);
      return;
    }


    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-structure`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ description }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const { data: savedGeneration, error } = await supabase
        .from('project_generations')
        .insert([data])
        .select()
        .maybeSingle();

      if (error) throw error;

      if (savedGeneration) {
        setCurrentGeneration(savedGeneration);
      }
    } catch (error) {
      console.error('Error generating structure:', error);
      alert(error instanceof Error ? error.message : 'An unexpected error occurred. Please check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyStructure = () => {
    if (!currentGeneration) return;

    const structureText = JSON.stringify(currentGeneration.folder_structure, null, 2);
    navigator.clipboard.writeText(structureText);
    alert('Structure copied to clipboard!');
  };

  const handleRegenerate = () => {
    if (!currentGeneration) return;
    generateStructure(currentGeneration.project_description);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-12 px-6">
        {!currentGeneration && !isLoading && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                AI-Powered Architecture Generator
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent">
                Build Smarter, Start Faster
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Transform your ideas into complete project architectures instantly.
                Let AI handle the planning while you focus on building.
              </p>
            </div>

            <SearchBar onSubmit={generateStructure} isLoading={isLoading} />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">AI Analysis</h3>
                <p className="text-slate-400 text-sm">
                  Advanced AI understands your requirements and suggests optimal architectures
                </p>
              </div>

              <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <History className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Instant Results</h3>
                <p className="text-slate-400 text-sm">
                  Get complete folder structures, tech stacks, and deployment strategies in seconds
                </p>
              </div>

              <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Export Ready</h3>
                <p className="text-slate-400 text-sm">
                  Copy structures to clipboard or export for immediate implementation
                </p>
              </div>
            </div>
          </div>
        )}

        {isLoading && <LoadingAnimation />}

        {currentGeneration && !isLoading && (
          <ResultsDisplay
            generation={currentGeneration}
            onRegenerate={handleRegenerate}
            onCopy={handleCopyStructure}
          />
        )}
      </main>
    </div>
  );
}

export default App;
