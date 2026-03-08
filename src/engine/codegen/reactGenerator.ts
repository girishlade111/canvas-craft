/**
 * Layer 5 — Code Generation Engine: React Components
 * Converts builder schema into a Vercel-compatible Vite + React + TypeScript project.
 * Output is fully editable in VS Code with proper tooling config.
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

  // Map component types to semantic HTML
  const tagMap: Record<string, string> = {
    heading: 'h2', paragraph: 'p', button: 'button', image: 'img',
    link: 'a', list: 'ul', 'list-item': 'li', section: 'section',
    nav: 'nav', footer: 'footer', header: 'header', article: 'article',
    form: 'form', input: 'input', textarea: 'textarea', hr: 'hr',
  };
  const tag = tagMap[node.type] || 'div';

  if (tag === 'img') {
    const src = node.props?.src || node.content || '/placeholder.svg';
    const alt = node.props?.alt || node.label || '';
    return `${pad}<img src="${src}" alt="${alt}"${classStr}${styleStr} />`;
  }

  if (tag === 'hr') {
    return `${pad}<hr${classStr}${styleStr} />`;
  }

  return `${pad}<${tag}${classStr}${styleStr}>${content}
${childrenJSX}
${pad}</${tag}>`;
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
 * Generate a full Vercel-compatible React + Vite project with routing.
 * Includes all config files needed to `npm install && npm run dev` or deploy to Vercel.
 */
export const generateMultiPageProject = (
  pages: { name: string; slug: string; schema: PageSchema }[],
  projectName: string
): Record<string, string> => {
  const files: Record<string, string> = {};
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

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
        <Route path="*" element={<div style={{ textAlign: 'center', padding: '4rem' }}><h1>404</h1><p>Page not found</p></div>} />
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

  // index.css — modern reset + base styles
  files['src/index.css'] = `/* Reset & Base Styles */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --color-bg: #ffffff;
  --color-fg: #111111;
  --color-muted: #6b7280;
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-fg);
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  cursor: pointer;
  font: inherit;
}
`;

  // index.html
  files['index.html'] = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${projectName} — Built with DevBuilder" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <title>${projectName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

  // package.json — Vercel-compatible
  files['package.json'] = JSON.stringify(
    {
      name: safeName,
      version: '1.0.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        'react-router-dom': '^6.30.0',
      },
      devDependencies: {
        '@types/react': '^18.3.0',
        '@types/react-dom': '^18.3.0',
        '@vitejs/plugin-react': '^4.3.0',
        typescript: '^5.5.0',
        vite: '^5.4.0',
        eslint: '^8.57.0',
        '@typescript-eslint/eslint-plugin': '^7.0.0',
        '@typescript-eslint/parser': '^7.0.0',
        'eslint-plugin-react-hooks': '^4.6.0',
        'eslint-plugin-react-refresh': '^0.4.0',
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
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: false,
        noUnusedParameters: false,
        noFallthroughCasesInSwitch: true,
        baseUrl: '.',
        paths: {
          '@/*': ['src/*'],
        },
      },
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }],
    },
    null,
    2
  );

  // tsconfig.node.json
  files['tsconfig.node.json'] = JSON.stringify(
    {
      compilerOptions: {
        composite: true,
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowSyntheticDefaultImports: true,
      },
      include: ['vite.config.ts'],
    },
    null,
    2
  );

  // vite.config.ts — Vercel-compatible
  files['vite.config.ts'] = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
`;

  // vercel.json — SPA routing for Vercel
  files['vercel.json'] = JSON.stringify(
    {
      $schema: 'https://openapi.vercel.sh/vercel.json',
      framework: 'vite',
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      rewrites: [{ source: '/(.*)', destination: '/index.html' }],
    },
    null,
    2
  );

  // .gitignore
  files['.gitignore'] = `# Dependencies
node_modules/

# Build output
dist/
dist-ssr/

# Editor
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json

# Env
.env
.env.local
.env.*.local

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
`;

  // VS Code settings for great DX
  files['.vscode/settings.json'] = JSON.stringify(
    {
      'editor.formatOnSave': true,
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': 'explicit',
      },
      'typescript.tsdk': 'node_modules/typescript/lib',
      'typescript.enablePromptUseWorkspaceTsdk': true,
    },
    null,
    2
  );

  // VS Code recommended extensions
  files['.vscode/extensions.json'] = JSON.stringify(
    {
      recommendations: [
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'bradlc.vscode-tailwindcss',
        'dsznajder.es7-react-js-snippets',
      ],
    },
    null,
    2
  );

  // README.md
  files['README.md'] = `# ${projectName}

Built with [DevBuilder](https://ladestack.in) — Visual Website Builder.

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

Or use the Vercel CLI:

\`\`\`bash
npx vercel
\`\`\`

## Tech Stack

- **React** 18 + TypeScript
- **Vite** — Lightning-fast build tool
- **React Router** — Client-side routing
- **Vercel** — Deployment platform

## Project Structure

\`\`\`
├── public/            # Static assets
├── src/
│   ├── pages/         # Page components
│   ├── App.tsx        # Router setup
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── index.html         # HTML template
├── vercel.json        # Vercel config
├── vite.config.ts     # Vite config
└── package.json       # Dependencies
\`\`\`
`;

  // public/vite.svg placeholder
  files['public/vite.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#3b82f6"/><text x="16" y="22" font-size="18" font-family="system-ui" fill="white" text-anchor="middle" font-weight="bold">D</text></svg>`;

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
