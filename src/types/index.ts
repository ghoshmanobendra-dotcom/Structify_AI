export interface FolderNode {
  name: string;
  type: 'file' | 'folder';
  children?: FolderNode[];
  description?: string;
}

export interface ProjectGeneration {
  id: string;
  project_description: string;
  tech_stack: TechStackItem[];
  folder_structure: FolderNode;
  architecture_type: string;
  database_suggestion: string;
  tools_integrations: string[];
  deployment_recommendations: string;
  module_breakdown: ModuleItem[];
  created_at: string;
}

export interface TechStackItem {
  category: string;
  technology: string;
  purpose: string;
}

export interface ModuleItem {
  name: string;
  purpose: string;
  files: string[];
}
