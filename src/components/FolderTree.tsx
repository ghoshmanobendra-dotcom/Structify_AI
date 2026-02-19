import { useState, MouseEvent } from 'react';
import { Folder, File, ChevronRight, FileJson, FileCode, FileType } from 'lucide-react';
import { FolderNode } from '../types';

interface FolderTreeProps {
  node: FolderNode;
  isRoot?: boolean;
}

function TreeNode({ node, isRoot = false }: FolderTreeProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(isRoot || true); // Root always expanded initially
  const hasChildren = node.children && node.children.length > 0;

  const toggleExpand = (e: MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) return <FileCode className="w-4 h-4 text-blue-400" />;
    if (fileName.endsWith('.css')) return <FileType className="w-4 h-4 text-sky-300" />;
    if (fileName.endsWith('.json')) return <FileJson className="w-4 h-4 text-yellow-400" />;
    if (fileName.endsWith('.html')) return <FileCode className="w-4 h-4 text-orange-500" />;
    return <File className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="select-none text-slate-400 font-mono text-[13px]">
      <div
        className={`flex items-center gap-1.5 py-1 px-2 hover:bg-[#1f2428] hover:text-slate-200 cursor-pointer transition-colors duration-150 rounded-sm group ${isRoot ? 'mb-2' : ''}`}
        onClick={toggleExpand}
      >
        {/* Arrow / Spacer */}
        <span className={`flex items-center justify-center w-4 h-4 transition-transform duration-200 ${isExpanded && hasChildren ? 'rotate-90' : ''}`}>
          {hasChildren && <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />}
        </span>

        {/* Folder/File Icon */}
        {node.type === 'folder' ? (
          <Folder
            className={`w-4 h-4 ${isRoot || isExpanded ? 'text-blue-400' : 'text-blue-300/60'} transition-colors`}
            fill={isRoot || isExpanded ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        ) : (
          getFileIcon(node.name)
        )}

        {/* Name */}
        <span className={`${node.type === 'folder' ? 'text-slate-300 font-medium' : 'text-slate-400'}`}>
          {node.name}
        </span>

        {/* Description tooltip/comment */}
        {node.description && !isRoot && (
          <span className="hidden group-hover:inline ml-auto text-[10px] text-slate-600 italic">
                // {node.description}
          </span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col border-l border-slate-800/60 ml-[19px] pl-1">
          {node.children!.map((child, index) => (
            <TreeNode key={`${child.name}-${index}`} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FolderTree({ node }: { node: FolderNode }) {
  return (
    <div className="w-full">
      <TreeNode node={node} isRoot={true} />
    </div>
  );
}
