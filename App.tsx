
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { GuidedQuestions } from './components/GuidedQuestions';
import { BlueprintDisplay } from './components/BlueprintDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateBlueprint } from './services/geminiService';
import type { InnovatorData } from './types';

const App: React.FC = () => {
  const [innovatorData, setInnovatorData] = useState<InnovatorData>({
    domain: '',
    missingPiece: '',
    supportNeeded: '',
  });

  const [blueprint, setBlueprint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDataChange = useCallback((field: keyof InnovatorData, value: string) => {
    setInnovatorData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleGenerateBlueprint = async () => {
    setIsLoading(true);
    setError(null);
    setBlueprint(null);
    try {
      const result = await generateBlueprint(innovatorData);
      setBlueprint(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const canGenerate = innovatorData.domain.trim() !== '' && innovatorData.missingPiece.trim() !== '' && innovatorData.supportNeeded.trim() !== '';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 space-y-8">
          <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-700">
            <h2 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-4">Your Innovation Journey</h2>
            <p className="text-slate-400 mb-6">
              We understand that bringing breakthrough ideas to life is a challenging path. This tool is designed to help you articulate your vision, identify what's holding you back, and create a strategic blueprint to move forward. Let's break it down together.
            </p>
            <GuidedQuestions
              data={innovatorData}
              onChange={handleDataChange}
              onSubmit={handleGenerateBlueprint}
              isLoading={isLoading}
              canSubmit={canGenerate}
            />
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
              <LoadingSpinner />
              <p className="mt-4 text-cyan-300 animate-pulse">Crafting your blueprint...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
              <h3 className="font-bold">Error</h3>
              <p>{error}</p>
            </div>
          )}

          {blueprint && <BlueprintDisplay content={blueprint} />}
        </main>
        <footer className="text-center text-slate-500 mt-12 pb-4">
          <p>Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
