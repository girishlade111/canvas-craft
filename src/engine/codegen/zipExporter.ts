/**
 * ZIP Export Utility
 * Bundles generated project files into a downloadable ZIP archive.
 */

import JSZip from 'jszip';

/**
 * Create a ZIP blob from a map of file paths to contents.
 */
export const createProjectZip = async (
  files: Record<string, string>,
  projectName: string
): Promise<Blob> => {
  const zip = new JSZip();
  const folder = zip.folder(projectName);

  if (!folder) throw new Error('Failed to create ZIP folder');

  Object.entries(files).forEach(([filePath, content]) => {
    folder.file(filePath, content);
  });

  return zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });
};

/**
 * Download a ZIP blob as a file.
 */
export const downloadZip = async (
  files: Record<string, string>,
  projectName: string
): Promise<void> => {
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
  const blob = await createProjectZip(files, safeName);

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safeName}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
