/**
 * Re-export from engine for backward compatibility.
 * New code should import from @/engine/codegen directly.
 */

export { generateStaticHTML as exportToStaticHTML } from '@/engine/codegen/staticHtmlGenerator';
export { generateReactComponent as exportToReact } from '@/engine/codegen/reactGenerator';
export { downloadFile } from '@/engine/codegen';
