import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

interface SearchBarProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSubmit, isLoading }: SearchBarProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && !isLoading) {
      onSubmit(description);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative backdrop-blur-xl bg-slate-900/90 rounded-2xl border border-cyan-500/30 p-6 shadow-2xl">
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-1">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <label htmlFor="project-description" className="block text-sm font-medium text-slate-300 mb-2">
                Describe your project idea
              </label>
              <textarea
                id="project-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: Create a full-stack social media app with authentication, posts, comments, and real-time chat using React, Node.js, and MongoDB"
                className="w-full h-32 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !description.trim()}
              className="relative group/btn px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Structure
                    <Send className="w-4 h-4" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
