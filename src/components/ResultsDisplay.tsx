import { useState } from 'react';
import { Copy, Download, RefreshCw, Database, Server, Layers, Package, ChevronDown, ChevronUp, Code2, Cpu } from 'lucide-react';
import { ProjectGeneration } from '../types';
import FolderTree from './FolderTree';

interface ResultsDisplayProps {
  generation: ProjectGeneration;
  onRegenerate: () => void;
  onCopy: () => void;
}

export default function ResultsDisplay({ generation, onRegenerate, onCopy }: ResultsDisplayProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Generated Successfully
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Your Project Blueprint
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg text-slate-400 transition-all duration-300"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy JSON</span>
          </button>

          <button
            onClick={() => {
              const projectName = prompt('Enter a name for your project folder:', 'my-structify-project');
              if (!projectName) return;

              import('../utils/fileSystem').then(async (mod) => {
                const success = await mod.exportProjectToDisk(generation.folder_structure, projectName);
                if (success) {
                  alert(`Project "${projectName}" extracted successfully! Open the selected folder in VS Code to start coding.`);
                }
              }).catch(err => alert(err.message));
            }}
            className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20 border border-transparent rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 group-hover:animate-bounce" />
            Export to VS Code
          </button>

          <button
            onClick={onRegenerate}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg text-slate-400 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Regenerate</span>
          </button>
        </div>
      </div>

      {/* Project Brief Card */}
      <div className="relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all hover:border-slate-700">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-50"></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              Project Brief
            </h3>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              {showFullDescription ? (
                <>Show Less <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>Show Details <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          </div>
          <p className={`text-slate-400 text-sm leading-relaxed ${!showFullDescription && 'line-clamp-2'}`}>
            {generation.project_description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Architecture Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative h-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <Layers className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Architecture</h3>
                <p className="text-xs text-cyan-400 font-medium tracking-wide uppercase pt-1">{generation.architecture_type}</p>
              </div>
            </div>

            <div className="space-y-4">
              {generation.module_breakdown.map((module, index) => (
                <div key={index} className="group/item pb-3 border-b border-slate-800/50 last:border-0 last:pb-0">
                  <h4 className="text-sm font-medium text-slate-300 mb-1 group-hover/item:text-cyan-300 transition-colors">
                    {module.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {module.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database & Deployment Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative h-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-colors flex flex-col gap-6">

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Database className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Database</h3>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-800">
                <p className="text-slate-300 font-medium">{generation.database_suggestion}</p>
              </div>
            </div>

            <div className="border-t border-slate-800/50 pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Server className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Deployment</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed bg-slate-800/30 rounded-lg p-4 border border-slate-800">
                {generation.deployment_recommendations}
              </p>
            </div>

          </div>
        </div>

        {/* Tools & Integrations Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative h-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <Package className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Ecosystem</h3>
            </div>

            <div className="flex flex-wrap gap-2 content-start">
              {generation.tools_integrations.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-medium text-slate-300 transition-all hover:scale-105 cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-200 px-1">Tech Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {generation.tech_stack.map((item, index) => (
            <div key={index} className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-800 to-slate-700 group-hover:from-blue-500 group-hover:to-cyan-500 rounded-t-xl transition-all duration-500"></div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 pt-2">
                {item.category}
              </div>
              <div className="text-lg font-semibold text-slate-200 mb-2 truncate" title={item.technology}>
                {item.technology}
              </div>
              <div className="text-xs text-slate-400 line-clamp-2" title={item.purpose}>
                {item.purpose}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Editor View for Folder Structure */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/50">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="ml-4 flex items-center gap-2 text-slate-400 text-sm font-mono">
              <Code2 className="w-4 h-4" />
              <span>project-explorer</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Read-only Preview
          </div>
        </div>

        {/* Editor Body */}
        <div className="flex font-mono text-sm max-h-[600px]">
          {/* Sidebar / Tree View */}
          <div className="w-full overflow-auto p-4 custom-scrollbar">
            <FolderTree node={generation.folder_structure} />
          </div>
        </div>
      </div>

    </div>
  );
}
