/**
 * Layer 5 — Code Generation Engine: React Components
 * Converts builder schema into React/TypeScript component files.
 */

import type { PageSchema, BuilderComponent } from '@/types/builder';

const renderNodeJSX = (node: BuilderComponent, indent = 2): string => {
  const pad = ' '.repeat(indent);
  const styleEntries = Object.entries(node.styles || {})
    .filter(([k, v]) => v && !k.startsWith('custom'));

  const styleStr = styleEntries.length
    ? ` style={{${styleEntries.map(([k, v]) => `${k}: '${v}'`).join(', ')}}}`
    : '';

  const classStr = node.styles?.customClasses
    ? ` className="${node.styles.customClasses}"`
    : '';

  const childrenJSX = node.children?.map(c => renderNodeJSX(c, indent + 2)).join('\n') || '';
  const content = node.content ? `\n${pad}  ${node.content}` : '';

  return `${pad}<div${classStr}${styleStr}>${content}
${childrenJSX}
${pad}</div>`;
};

export const generateReactComponent = (schema: PageSchema): Record<string, string> => {
  const files: Record<string, string> = {};
  const componentName = schema.name.replace(/\s+/g, '') || 'Page';

  const pageContent = `import React from 'react';

const ${componentName}Page: React.FC = () => {
  return (
    <div>
${schema.sections
  .map(section => {
    const children = section.components.map(c => renderNodeJSX(c, 6)).join('\n');
    return `      <section>\n${children}\n      </section>`;
  })
  .join('\n')}
    </div>
  );
};

export default ${componentName}Page;
`;

  files[`${componentName}Page.tsx`] = pageContent;
  return files;
};

/**
 * Generate a full React project structure (for future Vercel deploy).
 */
export const generateReactProject = (
  schema: PageSchema
): Record<string, string> => {
  const files = generateReactComponent(schema);
  const componentName = schema.name.replace(/\s+/g, '') || 'Page';

  // Package.json
  files['package.json'] = JSON.stringify(
    {
      name: schema.name.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
      },
      devDependencies: {
        '@types/react': '^18.3.0',
        '@types/react-dom': '^18.3.0',
        typescript: '^5.0.0',
        vite: '^5.0.0',
        '@vitejs/plugin-react': '^4.0.0',
      },
    },
    null,
    2
  );

  // Entry point
  files['src/main.tsx'] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import ${componentName}Page from './${componentName}Page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <${componentName}Page />
  </React.StrictMode>
);
`;

  // index.html
  files['index.html'] = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${schema.name}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

  return files;
};
