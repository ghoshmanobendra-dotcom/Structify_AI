import { Brain, Cpu, Zap } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
        <div className="absolute inset-2 border-4 border-blue-500/30 rounded-full animate-ping animation-delay-150"></div>
        <div className="absolute inset-4 border-4 border-purple-500/30 rounded-full animate-ping animation-delay-300"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Brain className="w-12 h-12 text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h3 className="text-xl font-semibold text-slate-200">AI is analyzing your project...</h3>

        <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
          <div className="flex items-center gap-2 animate-pulse">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Processing requirements</span>
          </div>
          <div className="flex items-center gap-2 animate-pulse animation-delay-150">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Generating architecture</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 pt-4">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-150"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-300"></div>
        </div>
      </div>
    </div>
  );
}
