/**
 * Layer 5 — Code Generation Engine: React Components
 * Converts builder schema into React/TypeScript component files.
 * Supports multi-page projects with routing.
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

  files[`src/pages/${componentName}Page.tsx`] = pageContent;
  return files;
};

/**
 * Generate a full React project with routing for multiple pages.
 */
export const generateMultiPageProject = (
  pages: { name: string; slug: string; schema: PageSchema }[],
  projectName: string
): Record<string, string> => {
  const files: Record<string, string> = {};

  // Generate each page component
  const pageImports: string[] = [];
  const routeEntries: string[] = [];

  pages.forEach(({ name, slug, schema }) => {
    const componentName = name.replace(/\s+/g, '') || 'Page';
    const pageFiles = generateReactComponent(schema);
    Object.assign(files, pageFiles);

    pageImports.push(`import ${componentName}Page from './pages/${componentName}Page';`);
    const path = slug === 'index' ? '/' : `/${slug}`;
    routeEntries.push(`        <Route path="${path}" element={<${componentName}Page />} />`);
  });

  // App.tsx with router
  files['src/App.tsx'] = `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
${pageImports.join('\n')}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
${routeEntries.join('\n')}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
`;

  // main.tsx
  files['src/main.tsx'] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  // index.css with reset
  files['src/index.css'] = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, -apple-system, sans-serif; }
`;

  // index.html
  files['index.html'] = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

  // package.json
  files['package.json'] = JSON.stringify(
    {
      name: projectName.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        'react-router-dom': '^6.30.0',
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

  // tsconfig.json
  files['tsconfig.json'] = JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        moduleResolution: 'bundler',
        jsx: 'react-jsx',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
      },
      include: ['src'],
    },
    null,
    2
  );

  // vite.config.ts
  files['vite.config.ts'] = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

  return files;
};

/**
 * Generate a single-page React project (backward compat).
 */
export const generateReactProject = (schema: PageSchema): Record<string, string> => {
  return generateMultiPageProject(
    [{ name: schema.name, slug: 'index', schema }],
    schema.name
  );
};
