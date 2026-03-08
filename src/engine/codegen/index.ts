/**
 * Layer 5 — Code Generation Engine
 * Converts visual builder schemas into deployable code.
 */

export { generateStaticHTML } from './staticHtmlGenerator';
export { generateReactComponent, generateReactProject } from './reactGenerator';

/**
 * Download a file to the user's machine.
 */
export const downloadFile = (filename: string, content: string, type = 'text/html') => {
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
export const downloadProject = async (files: Record<string, string>, projectName: string) => {
  // For now, download each file individually
  Object.entries(files).forEach(([filename, content]) => {
    const type = filename.endsWith('.html') ? 'text/html' : 'text/plain';
    downloadFile(filename, content, type);
  });
};
