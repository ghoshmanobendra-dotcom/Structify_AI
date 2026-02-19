
import { FolderNode } from '../types';


/**
 * Interface representing a File System Directory Handle
 */
export interface FileSystemDirectoryHandle {
    kind: 'directory';
    name: string;
    getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FileSystemDirectoryHandle>;
    getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
}

/**
 * Interface representing a File System File Handle
 */
export interface FileSystemFileHandle {
    kind: 'file';
    name: string;
    createWritable(): Promise<FileSystemWritableFileStream>;
}

/**
 * Interface representing a File System Writable Stream
 */
export interface FileSystemWritableFileStream extends WritableStream {
    write(data: string): Promise<void>;
    close(): Promise<void>;
}

/**
 * Recursively creates a file and folder structure using the File System Access API.
 * 
 * @param dirHandle - The handle of the current directory to write to.
 * @param node - The current node in the folder structure (file or folder).
 */
async function createStructure(dirHandle: any, node: FolderNode) {
    if (node.type === 'folder') {
        // Create or get the directory handle
        const newDirHandle = await dirHandle.getDirectoryHandle(node.name, { create: true });

        // Process children if they exist
        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                await createStructure(newDirHandle, child);
            }
        }
    } else if (node.type === 'file') {
        // Create the file handle
        const fileHandle = await dirHandle.getFileHandle(node.name, { create: true });

        // Create a writable stream to the file
        const writable = await fileHandle.createWritable();

        // Determine file content based on file extension or description (simplified for now)
        // In a real app, this might come from the AI or be a template
        let content = `// ${node.name}\n`;
        if (node.description) {
            content += `// ${node.description}\n`;
        }
        content += '\n';

        // Basic templates for common files
        if (node.name.endsWith('.ts') || node.name.endsWith('.tsx')) {
            content += 'export {};\n';
        } else if (node.name.endsWith('.json')) {
            content = '{}';
        } else if (node.name.endsWith('.md')) {
            content = `# ${node.name}\n\n${node.description || ''}`;
        }

        // Write content and close
        await writable.write(content);
        await writable.close();
    }
}

/**
 * Main function to trigger the directory picker and start the writing process.
 * 
 * @param structure - The root folder node of the project structure.
 * @param projectName - The name of the project folder to create.
 */
export async function exportProjectToDisk(structure: FolderNode, projectName: string) {
    try {
        // Check if the API is supported
        if (!('showDirectoryPicker' in window)) {
            throw new Error('Your browser does not support the File System Access API. Please use Chrome, Edge, or Opera.');
        }

        // specific type needed for TypeScript to recognize the global function
        const showDirectoryPicker = (window as any).showDirectoryPicker;

        // 1. Ask the user to select the PARENT directory where they want the project
        const parentHandle = await showDirectoryPicker();

        // 2. Create the project directory with the user-specified name
        const projectHandle = await parentHandle.getDirectoryHandle(projectName, { create: true });

        // 3. Start creating the structure inside the new project directory
        let nodesToProcess = structure.children || [];

        // Check if the structure contains a single root folder that matches the default project name.
        // If so, we unwrap it so the user's chosen folder name becomes the actual project root.
        if (nodesToProcess.length === 1 && nodesToProcess[0].type === 'folder' && nodesToProcess[0].name === 'my-structify-project') {
            nodesToProcess = nodesToProcess[0].children || [];
        } else if (!structure.children) {
            // Fallback for single-node structure that isn't a wrapper
            nodesToProcess = [structure];
        }

        for (const child of nodesToProcess) {
            await createStructure(projectHandle, child);
        }

        return true;
    } catch (error) {
        if ((error as Error).name === 'AbortError') {
            // User cancelled
            return false;
        }
        console.error('Error exporting project:', error);
        throw error;
    }
}
