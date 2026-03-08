/**
 * Re-export from engine for backward compatibility.
 * New code should import from @/engine/codegen directly.
 */

export { generateStaticHTML as exportToStaticHTML } from '@/engine/codegen/staticHtmlGenerator';
export { generateReactComponent as exportToReact } from '@/engine/codegen/reactGenerator';
export { generateMultiPageProject as exportMultiPageReact } from '@/engine/codegen/reactGenerator';
export { generateMultiPageHTML as exportMultiPageHTML } from '@/engine/codegen/staticHtmlGenerator';
export { downloadFile } from '@/engine/codegen';
