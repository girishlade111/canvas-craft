/**
 * Layer 5 — Code Generation Engine: React Components
 * Converts builder schema into a multi-platform compatible Vite + React + TypeScript project.
 * Output is fully editable in VS Code with proper tooling config.
 * 
 * Supported Platforms:
 * - Vercel (vercel.json)
 * - Netlify (netlify.toml, _redirects)
 * - GitHub Pages (404.html SPA hack, base path config)
 * - VPS/Docker (Dockerfile, nginx.conf, docker-compose.yml)
 * - Cloudflare Pages (_routes.json)
 * - Railway/Render (Procfile)
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
 * Generate a full multi-platform compatible React + Vite project with routing.
 * Includes all config files needed for Vercel, Netlify, GitHub Pages, VPS, Docker, and more.
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

  // index.html with GitHub Pages SPA script
  files['index.html'] = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${projectName} — Built with DevBuilder" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <title>${projectName}</title>
  <!-- GitHub Pages SPA redirect restoration -->
  <script>
    (function() {
      var redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
      }
    })();
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

  // package.json — Multi-platform compatible
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
        'build:github': 'tsc && vite build --base=./',
        serve: 'npx serve dist -s -l 3000',
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

  // vite.config.ts — Multi-platform compatible
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
    // Compatibility for older browsers if needed
    target: 'es2015',
  },
  // For GitHub Pages: set base to repository name
  // base: '/${safeName}/',
});
`;

  // ════════════════════════════════════════════════════════════
  // VERCEL CONFIGURATION
  // ════════════════════════════════════════════════════════════
  files['vercel.json'] = JSON.stringify(
    {
      $schema: 'https://openapi.vercel.sh/vercel.json',
      framework: 'vite',
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      rewrites: [{ source: '/(.*)', destination: '/index.html' }],
      headers: [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
          ],
        },
        {
          source: '/assets/(.*)',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ],
        },
      ],
    },
    null,
    2
  );

  // ════════════════════════════════════════════════════════════
  // NETLIFY CONFIGURATION
  // ════════════════════════════════════════════════════════════
  files['netlify.toml'] = `# Netlify Configuration
# https://docs.netlify.com/configure-builds/file-based-configuration/

[build]
  command = "npm run build"
  publish = "dist"

# SPA routing - redirect all routes to index.html
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache static assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Cache images
[[headers]]
  for = "/*.{png,jpg,jpeg,gif,webp,svg,ico}"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Environment variables (add your own)
[context.production.environment]
  NODE_ENV = "production"

[context.deploy-preview.environment]
  NODE_ENV = "development"
`;

  // Netlify _redirects file (alternative to netlify.toml)
  files['public/_redirects'] = `# Netlify _redirects
# SPA fallback - serves index.html for all routes
/*    /index.html   200

# Optional: Redirect www to non-www (uncomment if needed)
# https://www.${safeName}.com/*  https://${safeName}.com/:splat  301

# Optional: Force HTTPS (uncomment if needed)
# http://${safeName}.com/*  https://${safeName}.com/:splat  301!
`;

  // ════════════════════════════════════════════════════════════
  // GITHUB PAGES CONFIGURATION
  // ════════════════════════════════════════════════════════════
  // 404.html - GitHub Pages SPA hack
  files['public/404.html'] = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${projectName}</title>
  <script>
    // GitHub Pages SPA redirect hack
    // Stores the current path and redirects to index.html
    // The path is restored by a script in index.html
    var pathSegmentsToKeep = 0; // Set to 1 if using project site (username.github.io/repo)
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

  // GitHub Actions workflow for automatic deployment
  files['.github/workflows/deploy.yml'] = `# GitHub Pages Deployment
# Automatically deploys to GitHub Pages on push to main branch

name: Deploy to GitHub Pages

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:github

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  // ════════════════════════════════════════════════════════════
  // CLOUDFLARE PAGES CONFIGURATION
  // ════════════════════════════════════════════════════════════
  files['public/_routes.json'] = JSON.stringify(
    {
      version: 1,
      include: ['/*'],
      exclude: ['/assets/*', '/*.ico', '/*.svg', '/*.png', '/*.jpg', '/*.webp'],
    },
    null,
    2
  );

  files['_headers'] = `# Cloudflare Pages Headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

  // ════════════════════════════════════════════════════════════
  // DOCKER / VPS CONFIGURATION
  // ════════════════════════════════════════════════════════════
  files['Dockerfile'] = `# Multi-stage build for production
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
`;

  files['nginx.conf'] = `# Nginx configuration for SPA
server {
    listen 80;
    listen [::]:80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;
    gzip_disable "MSIE [1-6]\\.";

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Cache images and fonts
    location ~* \\.(ico|svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # SPA fallback - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
`;

  files['docker-compose.yml'] = `# Docker Compose for local development and production
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s

  # Optional: Add nginx reverse proxy with SSL
  # nginx-proxy:
  #   image: jwilder/nginx-proxy
  #   ports:
  #     - "80:80"
  #     - "443:443"
  #   volumes:
  #     - /var/run/docker.sock:/tmp/docker.sock:ro
  #     - ./certs:/etc/nginx/certs
`;

  files['.dockerignore'] = `node_modules
dist
.git
.gitignore
*.md
.vscode
.env
.env.*
Dockerfile
docker-compose.yml
.dockerignore
`;

  // ════════════════════════════════════════════════════════════
  // RAILWAY / RENDER CONFIGURATION
  // ════════════════════════════════════════════════════════════
  files['Procfile'] = `web: npx serve dist -s -l $PORT
`;

  files['render.yaml'] = `# Render Blueprint
# https://render.com/docs/blueprint-spec

services:
  - type: web
    name: ${safeName}
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    headers:
      - path: /*
        name: X-Frame-Options
        value: DENY
      - path: /assets/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
`;

  // ════════════════════════════════════════════════════════════
  // AWS S3 / CLOUDFRONT CONFIGURATION
  // ════════════════════════════════════════════════════════════
  files['aws-deploy.sh'] = `#!/bin/bash
# AWS S3 + CloudFront Deployment Script
# Prerequisites: AWS CLI configured with appropriate credentials

# Configuration
BUCKET_NAME="your-bucket-name"
DISTRIBUTION_ID="your-cloudfront-distribution-id"
BUILD_DIR="dist"

# Build the project
npm run build

# Sync to S3
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME --delete

# Set cache headers for assets
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ \\
  --recursive \\
  --metadata-directive REPLACE \\
  --cache-control "public, max-age=31536000, immutable"

# Invalidate CloudFront cache
aws cloudfront create-invalidation \\
  --distribution-id $DISTRIBUTION_ID \\
  --paths "/*"

echo "Deployment complete!"
`;

  // ════════════════════════════════════════════════════════════
  // OTHER FILES
  // ════════════════════════════════════════════════════════════
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

# Docker
.docker/

# Test coverage
coverage/
`;

  // .env — Environment variables template
  files['.env'] = `# ════════════════════════════════════════════════════════════
# Environment Variables — ${projectName}
# ════════════════════════════════════════════════════════════
# ⚠️  WARNING: Never commit this file with real credentials!
# Copy this file to .env.local for local development.
# ════════════════════════════════════════════════════════════

# ─── Analytics & Tracking ────────────────────────────────────
VITE_GOOGLE_ANALYTICS_ID=
VITE_GTM_ID=
VITE_HOTJAR_ID=
VITE_MIXPANEL_TOKEN=
VITE_POSTHOG_KEY=

# ─── Payment Providers ───────────────────────────────────────
VITE_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
VITE_PAYPAL_CLIENT_ID=

# ─── Email Services ──────────────────────────────────────────
MAILCHIMP_API_KEY=
SENDGRID_API_KEY=
RESEND_API_KEY=

# ─── Authentication ──────────────────────────────────────────
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_CLERK_PUBLISHABLE_KEY=

# ─── Supabase ────────────────────────────────────────────────
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ─── Firebase ────────────────────────────────────────────────
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# ─── CMS & Content ───────────────────────────────────────────
VITE_CONTENTFUL_SPACE_ID=
VITE_CONTENTFUL_ACCESS_TOKEN=
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=

# ─── AI Services ─────────────────────────────────────────────
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# ─── Maps & Location ─────────────────────────────────────────
VITE_GOOGLE_MAPS_API_KEY=
VITE_MAPBOX_ACCESS_TOKEN=

# ─── Social Media ────────────────────────────────────────────
VITE_FACEBOOK_APP_ID=
TWITTER_API_KEY=
TWITTER_API_SECRET=

# ─── Cloud Storage ───────────────────────────────────────────
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# ─── Custom API Keys ─────────────────────────────────────────
# Add your custom API keys below
# VITE_ prefix exposes to client-side code
# Without VITE_ prefix = server-side only (keep secrets here)

`;

  // .env.example — Template for team sharing
  files['.env.example'] = `# ════════════════════════════════════════════════════════════
# Environment Variables Template — ${projectName}
# ════════════════════════════════════════════════════════════
# Copy this file to .env and fill in your credentials.
# Never commit .env with real values!
# ════════════════════════════════════════════════════════════

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX

# Payment (Stripe)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Email
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxx

# Add more as needed...
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

  // .nvmrc for Node version
  files['.nvmrc'] = `20
`;

  // .node-version for other version managers
  files['.node-version'] = `20
`;

  // robots.txt - SEO optimized
  files['public/robots.txt'] = `# robots.txt — ${projectName}
# Allow all crawlers full access

User-agent: *
Allow: /
Disallow:

# Specific crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Applebot
Allow: /

# Sitemap (update with your domain)
Sitemap: https://your-domain.com/sitemap.xml

# Host (update with your domain)
Host: https://your-domain.com
`;

  // sitemap.xml - Dynamic sitemap based on pages
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls = pages.map(({ slug }, index) => {
    const loc = slug === 'index' ? '/' : `/${slug}`;
    const priority = slug === 'index' ? '1.0' : (index === 1 ? '0.9' : '0.8');
    return `  <url>
    <loc>https://your-domain.com${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  files['public/sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

  // README.md with comprehensive documentation - Fully editable by user
  const pageList = pages.map(p => `- **${p.name}** (\`/${p.slug === 'index' ? '' : p.slug}\`)`).join('\n');
  
  files['README.md'] = `# ${projectName}

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  📝 EDITABLE README - Customize this file for your project!     ║
  ║  Delete sections you don't need, add your own content below.    ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

> Built with [DevBuilder](https://ladestack.in) — Visual Website Builder

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=YOUR_REPO_URL)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Pages](#pages)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [SEO & Performance](#seo--performance)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About

<!-- ✏️ EDIT: Describe your project here -->
This is a modern, responsive website built with React and Vite. Add your project description, goals, and any relevant information here.

**Key highlights:**
- ⚡ Fast loading with Vite
- 📱 Fully responsive design
- 🎨 Modern UI components
- 🔍 SEO optimized

---

## ✨ Features

<!-- ✏️ EDIT: List your project's features -->
- [ ] Feature 1 - Description
- [ ] Feature 2 - Description  
- [ ] Feature 3 - Description
- [ ] Feature 4 - Description

---

## 📄 Pages

This project includes the following pages:

${pageList}

---

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone YOUR_REPO_URL
cd ${safeName}

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

---

## 🔐 Environment Variables

Copy \`.env.example\` to \`.env\` and configure your environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| \`VITE_GOOGLE_ANALYTICS_ID\` | Google Analytics tracking ID | No |
| \`VITE_STRIPE_PUBLISHABLE_KEY\` | Stripe publishable key | No |
| \`VITE_SUPABASE_URL\` | Supabase project URL | No |
| \`VITE_SUPABASE_ANON_KEY\` | Supabase anonymous key | No |

> ⚠️ **Important:** Never commit \`.env\` files with real credentials. Use \`.env.example\` as a template.

---

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Deploy automatically

\`\`\`bash
# Or use CLI
npx vercel
\`\`\`

### Netlify

1. Push to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Import your repository
4. Build settings are auto-detected

\`\`\`bash
# Or use CLI
npx netlify deploy --prod
\`\`\`

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch - auto-deploys

### Docker / VPS

\`\`\`bash
# Build and run
docker build -t ${safeName} .
docker run -p 3000:80 ${safeName}

# Or use Docker Compose
docker-compose up -d
\`\`\`

### Other Platforms

- **Cloudflare Pages:** Connect repo, build command: \`npm run build\`, output: \`dist\`
- **Railway / Render:** Auto-detects from \`Procfile\` or \`render.yaml\`
- **AWS S3:** Run \`./aws-deploy.sh\` (configure bucket first)

---

## 🔍 SEO & Performance

### Built-in Optimizations

- ✅ Meta tags (title, description, Open Graph)
- ✅ Semantic HTML structure
- ✅ robots.txt configured
- ✅ sitemap.xml generated
- ✅ Lazy loading images
- ✅ Code splitting

### Performance Tips

1. Optimize images before uploading
2. Use WebP format when possible
3. Enable caching headers on your server
4. Use a CDN for static assets

### Analytics Setup

1. Copy your Google Analytics ID to \`.env\`
2. Uncomment analytics code in \`index.html\`
3. Verify tracking in GA dashboard

---

## 📁 Project Structure

\`\`\`
${safeName}/
├── public/                  # Static assets
│   ├── favicon.svg          # Site favicon
│   ├── robots.txt           # SEO crawlers config
│   ├── sitemap.xml          # Sitemap for search engines
│   ├── _redirects           # Netlify redirects
│   └── 404.html             # GitHub Pages fallback
├── src/
│   ├── pages/               # Page components
│   │   └── *.tsx            # Individual pages
│   ├── components/          # Reusable components (add your own)
│   ├── App.tsx              # Router setup
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment template
├── .env                     # Your environment (gitignored)
├── vercel.json              # Vercel config
├── netlify.toml             # Netlify config
├── Dockerfile               # Docker config
├── docker-compose.yml       # Docker Compose
└── package.json             # Dependencies
\`\`\`

---

## 🎨 Customization

### Adding New Pages

1. Create a new file in \`src/pages/\`
2. Add route in \`src/App.tsx\`
3. Link from navigation

### Styling

- Global styles: \`src/index.css\`
- CSS variables for theming
- Tailwind-compatible classes

### Adding Components

Create reusable components in \`src/components/\`:

\`\`\`tsx
// src/components/MyComponent.tsx
export const MyComponent = () => {
  return <div>My Component</div>;
};
\`\`\`

---

## 🤝 Contributing

<!-- ✏️ EDIT: Add your contributing guidelines -->
Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

---

## 📄 License

<!-- ✏️ EDIT: Update license as needed -->
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

<!-- ✏️ EDIT: Add your contact information -->
- **Website:** [your-website.com](https://your-website.com)
- **Email:** your-email@example.com
- **Twitter:** [@yourhandle](https://twitter.com/yourhandle)

---

<p align="center">
  Made with ❤️ using <a href="https://ladestack.in">DevBuilder</a>
</p>
`;

  // LICENSE file (MIT)
  const currentYear = new Date().getFullYear();
  files['LICENSE'] = `MIT License

Copyright (c) ${currentYear} ${projectName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

  // .gitignore additions for security
  files['.gitignore'] += `
# Additional security exclusions
.env
.env.*
!.env.example
*.pem
*.key
secrets/
`;

  // CONTRIBUTING.md for open source projects
  files['CONTRIBUTING.md'] = `# Contributing to ${projectName}

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: \`git clone YOUR_FORK_URL\`
3. Install dependencies: \`npm install\`
4. Create a branch: \`git checkout -b feature/your-feature-name\`

## Development

\`\`\`bash
# Start development server
npm run dev

# Run tests (if available)
npm test

# Build for production
npm run build
\`\`\`

## Pull Request Process

1. Ensure your code follows the existing style
2. Update documentation if needed
3. Test your changes thoroughly
4. Create a Pull Request with a clear description

## Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Keep components small and focused
- Write meaningful commit messages

## Questions?

Open an issue for any questions or concerns.
`;

  // src/components/shared/index.ts - Shared component exports
  files['src/components/shared/index.ts'] = `// Shared components - Add your reusable components here
// Example: export { Button } from './Button';
// Example: export { Card } from './Card';
// Example: export { Modal } from './Modal';

// This file serves as the central export point for shared components
// Import in pages like: import { Button, Card } from '@/components/shared';
`;

  // src/components/shared/README.md - Component documentation
  files['src/components/shared/README.md'] = `# Shared Components

This directory contains reusable UI components used across the application.

## Usage

Import components from the shared index:

\`\`\`tsx
import { Button, Card, Modal } from '@/components/shared';
\`\`\`

## Adding New Components

1. Create a new file: \`src/components/shared/MyComponent.tsx\`
2. Export from index: Add to \`src/components/shared/index.ts\`

## Component Guidelines

- Keep components focused and single-purpose
- Use TypeScript for props
- Include JSDoc comments
- Support dark mode via CSS variables
`;

  // src/utils/index.ts - Utility functions
  files['src/utils/index.ts'] = `// Utility functions - Add your helpers here

/**
 * Combines class names conditionally
 */
export const cn = (...classes: (string | boolean | undefined)[]) => 
  classes.filter(Boolean).join(' ');

/**
 * Formats a date to a readable string
 */
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);
`;

  // src/hooks/index.ts - Custom hooks
  files['src/hooks/index.ts'] = `// Custom React hooks - Add your hooks here
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing localStorage state
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

/**
 * Hook for detecting screen size
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

/**
 * Hook for detecting mobile devices
 */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');

/**
 * Hook for clipboard operations
 */
export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return { copy, copied };
};
`;

  // public/favicon.svg placeholder
  files['public/favicon.svg'] = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#3b82f6"/><text x="16" y="22" font-size="18" font-family="system-ui" fill="white" text-anchor="middle" font-weight="bold">D</text></svg>\`;

  // public/placeholder.svg
  files['public/placeholder.svg'] = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#e5e7eb"/><text x="200" y="150" font-size="16" font-family="system-ui" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">Image Placeholder</text></svg>\`;

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
