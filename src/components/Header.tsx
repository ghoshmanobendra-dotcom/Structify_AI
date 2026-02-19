import { Boxes } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50"></div>
            <Boxes className="w-8 h-8 text-cyan-400 relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Structify AI
            </h1>
            <p className="text-xs text-slate-400">Intelligent Project Architecture Generator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
