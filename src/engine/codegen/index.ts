/**
 * Layer 5 — Code Generation Engine
 * Converts visual builder schemas into deployable code.
 * Supports multiple tech stacks: React + Vite, Next.js
 */

export { generateStaticHTML, generateMultiPageHTML } from './staticHtmlGenerator';
export { generateReactComponent, generateReactProject, generateMultiPageProject } from './reactGenerator';
export { generateNextJSProject, generateNextJSProjectSingle } from './nextjsGenerator';

/**
 * Download a file to the user's machine.
 */
export const downloadFile = (content: string, filename: string, type = 'text/html') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Download a full project as a zip (placeholder for future JSZip integration).
 */
export const downloadProject = async (files: Record<string, string>, _projectName: string) => {
  // For now, download each file individually
  Object.entries(files).forEach(([filename, content]) => {
    const type = filename.endsWith('.html') ? 'text/html' : 'text/plain';
    downloadFile(content, filename, type);
  });
};
