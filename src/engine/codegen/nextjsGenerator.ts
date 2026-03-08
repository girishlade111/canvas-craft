/**
 * Layer 5 — Code Generation Engine: Next.js + TypeScript
 * Converts builder schema into a production-ready Next.js App Router project.
 * 
 * Features:
 * - App Router (Next.js 14+)
 * - TypeScript strict mode
 * - Tailwind CSS
 * - SEO optimized with metadata API
 * - Server Components by default
 * - Optimized Image component
 * - Font optimization
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
    heading: 'h2', paragraph: 'p', button: 'button', image: 'Image',
    link: 'Link', list: 'ul', 'list-item': 'li', section: 'section',
    nav: 'nav', footer: 'footer', header: 'header', article: 'article',
    form: 'form', input: 'input', textarea: 'textarea', hr: 'hr',
  };
  const tag = tagMap[node.type] || 'div';

  if (tag === 'Image') {
    const src = node.props?.src || node.content || '/placeholder.svg';
    const alt = node.props?.alt || node.label || '';
    return `${pad}<Image src="${src}" alt="${alt}" width={800} height={600}${classStr}${styleStr} />`;
  }

  if (tag === 'Link') {
    const href = node.props?.href || '#';
    return `${pad}<Link href="${href}"${classStr}${styleStr}>${content}${childrenJSX ? '\n' + childrenJSX + '\n' + pad : ''}</Link>`;
  }

  if (tag === 'hr') {
    return `${pad}<hr${classStr}${styleStr} />`;
  }

  return `${pad}<${tag}${classStr}${styleStr}>${content}
${childrenJSX}
${pad}</${tag}>`;
};

/**
 * Generate a full Next.js App Router project with TypeScript and Tailwind
 */
export const generateNextJSProject = (
  pages: { name: string; slug: string; schema: PageSchema }[],
  projectName: string
): Record<string, string> => {
  const files: Record<string, string> = {};
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

  // Generate each page component using App Router structure
  pages.forEach(({ name, slug, schema }) => {
    const componentName = name.replace(/\s+/g, '') || 'Page';
    const isHome = slug === 'index' || slug === '';
    const pagePath = isHome ? 'app/page.tsx' : `app/${slug}/page.tsx`;

    const hasImages = schema.sections.some(s => 
      s.components.some(c => c.type === 'image' || c.type === 'img')
    );
    const hasLinks = schema.sections.some(s => 
      s.components.some(c => c.type === 'link')
    );

    const imports: string[] = [];
    if (hasImages) imports.push("import Image from 'next/image';");
    if (hasLinks) imports.push("import Link from 'next/link';");

    const pageContent = `${imports.join('\n')}${imports.length ? '\n\n' : ''}export default function ${componentName}Page() {
  return (
    <main className="min-h-screen">
${schema.sections
  .map(section => {
    const sectionStyles = section.styles ? 
      ` style={{${Object.entries(section.styles).map(([k, v]) => `${k}: '${v}'`).join(', ')}}}` : '';
    const children = section.components.map(c => renderNodeJSX(c, 8)).join('\n');
    return `      <section${sectionStyles}>\n${children}\n      </section>`;
  })
  .join('\n')}
    </main>
  );
}
`;

    files[pagePath] = pageContent;

    // Generate metadata for each page
    if (isHome) {
      files['app/page.tsx'] = `import type { Metadata } from 'next';
${imports.join('\n')}${imports.length ? '\n' : ''}
export const metadata: Metadata = {
  title: '${schema.name || projectName}',
  description: '${schema.name || projectName} — Built with DevBuilder',
};

export default function ${componentName}Page() {
  return (
    <main className="min-h-screen">
${schema.sections
  .map(section => {
    const sectionStyles = section.styles ? 
      ` style={{${Object.entries(section.styles).map(([k, v]) => `${k}: '${v}'`).join(', ')}}}` : '';
    const children = section.components.map(c => renderNodeJSX(c, 8)).join('\n');
    return `      <section${sectionStyles}>\n${children}\n      </section>`;
  })
  .join('\n')}
    </main>
  );
}
`;
    }
  });

  // app/layout.tsx — Root layout with fonts and metadata
  files['app/layout.tsx'] = `import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: '${projectName}',
    template: \`%s | ${projectName}\`,
  },
  description: '${projectName} — Built with DevBuilder',
  openGraph: {
    title: '${projectName}',
    description: '${projectName} — Built with DevBuilder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={\`\${inter.variable} \${jetbrainsMono.variable}\`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
`;

  // app/globals.css — Tailwind + custom properties
  files['app/globals.css'] = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 221 83% 53%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 221 83% 53%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

  // app/not-found.tsx — 404 page
  files['app/not-found.tsx'] = `import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link href="/" className="text-primary hover:underline">
        Go back home
      </Link>
    </div>
  );
}
`;

  // app/loading.tsx — Loading state
  files['app/loading.tsx'] = `export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
`;

  // app/error.tsx — Error boundary
  files['app/error.tsx'] = `'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
`;

  // package.json — Next.js 14+ with App Router
  files['package.json'] = JSON.stringify(
    {
      name: safeName,
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
        'lint:fix': 'next lint --fix',
        typecheck: 'tsc --noEmit',
      },
      dependencies: {
        next: '^14.2.0',
        react: '^18.3.1',
        'react-dom': '^18.3.1',
      },
      devDependencies: {
        '@types/node': '^20.14.0',
        '@types/react': '^18.3.0',
        '@types/react-dom': '^18.3.0',
        autoprefixer: '^10.4.19',
        eslint: '^8.57.0',
        'eslint-config-next': '^14.2.0',
        postcss: '^8.4.38',
        tailwindcss: '^3.4.4',
        typescript: '^5.5.0',
      },
    },
    null,
    2
  );

  // next.config.mjs
  files['next.config.mjs'] = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Image optimization domains (add your domains here)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
`;

  // tsconfig.json
  files['tsconfig.json'] = JSON.stringify(
    {
      compilerOptions: {
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [{ name: 'next' }],
        paths: { '@/*': ['./*'] },
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules'],
    },
    null,
    2
  );

  // tailwind.config.ts
  files['tailwind.config.ts'] = `import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
`;

  // postcss.config.mjs
  files['postcss.config.mjs'] = `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
`;

  // .eslintrc.json
  files['.eslintrc.json'] = JSON.stringify(
    {
      extends: ['next/core-web-vitals', 'next/typescript'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/no-unescaped-entities': 'off',
      },
    },
    null,
    2
  );

  // next-env.d.ts
  files['next-env.d.ts'] = `/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/compat/navigation" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;

  // .gitignore
  files['.gitignore'] = `# Dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea
.vscode
*.swp
*.swo
`;

  // public/placeholder.svg
  files['public/placeholder.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect fill="#f1f5f9" width="800" height="600"/>
  <text fill="#64748b" font-family="system-ui, sans-serif" font-size="24" text-anchor="middle" x="400" y="310">Image Placeholder</text>
</svg>`;

  // VS Code settings
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

  files['.vscode/extensions.json'] = JSON.stringify(
    {
      recommendations: [
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'bradlc.vscode-tailwindcss',
        'formulahendry.auto-rename-tag',
      ],
    },
    null,
    2
  );

  // README.md - Comprehensive documentation
  const pageList = pages.map(p => `- **${p.name}** (\`/${p.slug === 'index' ? '' : p.slug}\`)`).join('\\n');
  
  files['README.md'] = `# ${projectName}

Built with [DevBuilder](https://ladestack.in) — Visual Website Builder.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Components:** React Server Components
- **Fonts:** Google Fonts (Inter, JetBrains Mono)
- **SEO:** Metadata API, OpenGraph, sitemap.xml, robots.txt

## 📄 Pages

${pageList}

## 🏁 Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/
│   ├── layout.tsx      # Root layout with fonts & metadata
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global Tailwind styles
│   ├── not-found.tsx   # Custom 404 page
│   ├── loading.tsx     # Loading state UI
│   └── error.tsx       # Error boundary
├── public/
│   ├── robots.txt      # SEO crawler rules
│   ├── sitemap.xml     # Search engine sitemap
│   └── favicon.svg     # Site favicon
├── components/         # Reusable React components
└── lib/               # Utility functions
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Deploy automatically

Or use CLI:
\`\`\`bash
npx vercel
\`\`\`

### Netlify

1. Push to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Import your repository
4. Build settings are auto-detected

### Docker

\`\`\`bash
docker build -t ${safeName} .
docker run -p 3000:3000 ${safeName}
\`\`\`

### Railway / Render

1. Connect your repository
2. Auto-detects Next.js configuration
3. Deploy!

## 🔍 SEO

This project includes:
- **robots.txt** — Crawler rules for search engines
- **sitemap.xml** — Auto-generated sitemap for all pages
- **Metadata API** — SEO-optimized meta tags per page
- **OpenGraph** — Social media sharing cards

> **Note:** Update the domain in \`public/robots.txt\` and \`public/sitemap.xml\` with your actual domain.

## 📄 License

MIT License
`;

  // Vercel config
  files['vercel.json'] = JSON.stringify(
    {
      framework: 'nextjs',
      buildCommand: 'npm run build',
      devCommand: 'npm run dev',
      installCommand: 'npm install',
    },
    null,
    2
  );

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
    const loc = slug === 'index' || slug === '' ? '/' : \`/\${slug}\`;
    const priority = (slug === 'index' || slug === '') ? '1.0' : (index === 1 ? '0.9' : '0.8');
    return \`  <url>
    <loc>https://your-domain.com\${loc}</loc>
    <lastmod>\${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>\${priority}</priority>
  </url>\`;
  }).join('\\n');

  files['public/sitemap.xml'] = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${sitemapUrls}
</urlset>
\`;

  return files;
};

/**
 * Single page export wrapper for backward compatibility
 */
export const generateNextJSProjectSingle = (schema: PageSchema): Record<string, string> => {
  return generateNextJSProject(
    [{ name: schema.name || 'Home', slug: 'index', schema }],
    schema.name || 'my-nextjs-app'
  );
};
