# 🚀 DevBuilder — Visual Website Builder

> **Build stunning websites visually — no coding required.**
> Drag-and-drop editor with 100+ components, 12+ templates, built-in CMS, eCommerce, SEO tools, and one-click publish.

[![Built with React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

---

## 📊 Platform Stats

| Metric | Count |
|--------|-------|
| **Components** | 100+ drag-and-drop UI components |
| **Component Categories** | 15+ (Layout, Text, Media, Forms, Marketing, eCommerce, Blog, etc.) |
| **Templates** | 12 professionally designed starter templates |
| **Supabase Tables** | 17 tables with full RLS policies |
| **Pages** | 9+ public routes (Landing, Docs, Changelog, API Reference, etc.) |
| **Builder Panels** | 15+ sidebar panels (Components, Layers, SEO, CMS, eCommerce, etc.) |
| **Export Formats** | 3 (React + Vite, Static HTML, ZIP download) |

---

## ✨ Features

### 🎨 Editor & Design Tools
- **Free-form drag & drop canvas** — Click, drag, and place components with pixel precision
- **100+ built-in components** — Buttons, forms, galleries, navbars, hero sections, pricing tables, cards, and more
- **Responsive design editor** — Preview and customize layouts for **desktop** (1440px), **tablet** (768px), and **mobile** (375px)
- **Visual properties panel** — Edit fonts, colors, spacing, borders, shadows, opacity, and border radius visually
- **Layer management** — Organize elements with sections, containers, and nested trees (Figma-like)
- **Global Design Panel** — Site-wide typography, color palette, and spacing configuration
- **Canvas context menu** — Right-click for duplicate, delete, move, copy styles
- **Keyboard shortcuts** — Undo/Redo (Ctrl+Z/Ctrl+Shift+Z), Save (Ctrl+S), Delete, Copy/Paste
- **Auto Layout Panel** — Flexbox and Grid controls with visual configuration
- **Animation Panel** — Entrance animations, scroll effects, and parallax support
- **Photo Studio** — In-editor image editing with crop, filters, and adjustments
- **Popup Builder** — Create lightbox popups, modals, and promotional banners
- **Code Editor** — Monaco-based editor for custom CSS and JavaScript
- **Block locking** — Prevent accidental edits on finalized components

### 📝 Content Management (CMS)
- **Blog system** — Full blog with rich text editor, categories, tags, and reading time
- **Content scheduling** — Draft → Scheduled → Published workflow
- **CMS Collections** — Custom content types with flexible field schemas
- **Media manager** — Upload and organize images, videos, and documents
- **Version history** — Save page snapshots and restore previous states
- **Multi-page support** — Create and manage multiple pages per project

### 🤖 AI & Automation
- **AI Text Generator** — Generate marketing copy, blog posts, and descriptions with tone/style controls
- **AI Image Generator** — Create images from text prompts with style and aspect ratio options
- **AI SEO Analyzer** — Automated SEO scoring with actionable improvement suggestions
- **AI Design Suggestions** — Smart layout and color palette recommendations
- **Auto-save** — Automatic saving every 3 seconds with toast notifications
- **Version history** — Auto-versioned page snapshots on every save

### 🔍 SEO & Meta Tags
- **Custom meta titles & descriptions** — Per-page SEO configuration
- **Open Graph tags** — Full OG title, description, image, and site name
- **Twitter Cards** — Large image cards with creator attribution
- **JSON-LD structured data** — WebApplication, Organization, and BreadcrumbList schemas
- **XML sitemap** — Auto-generated sitemap.xml with all public routes
- **robots.txt** — Configured for 10+ major crawlers
- **Canonical URLs** — Prevent duplicate content issues
- **noindex/nofollow** — Granular page-level indexing control
- **SEO audit tool** — 10-point automated checklist with scoring
- **50+ meta tags** — Primary, OG, Twitter, theme-color, app meta, and more

### 🛒 eCommerce
- **Product management** — Name, price, compare-at price, images, categories, variants, inventory
- **Order tracking** — Pending → Processing → Shipped → Delivered status pipeline
- **Coupon system** — Percentage and fixed-amount discount codes with usage tracking
- **Inventory management** — Stock levels and low-inventory alerts
- **Product status** — Draft, active, and archived lifecycle

### 📧 Marketing & Communication
- **Email campaigns** — Create campaigns with open rate and click-through tracking
- **Social media scheduler** — Multi-platform posting for Facebook, Instagram, Twitter, LinkedIn
- **Automation workflows** — Triggered actions (abandoned cart, welcome series, etc.)
- **Contact segmentation** — Organize recipients by segments and lists

### 📅 Booking & Events
- **Service management** — Define services with pricing, duration, and categories
- **Event management** — Events with capacity, registration tracking, and location
- **Calendar view** — Visual monthly calendar for scheduling
- **Booking analytics** — Track bookings, revenue, and popular time slots

### 🔌 App Market
- **12+ integrations** — Google Analytics, Stripe, Mailchimp, Zapier, Hotjar, Intercom, and more
- **One-click install/remove** — Toggle integrations per project
- **Category filtering** — Browse by Analytics, Payments, Marketing, CRM, Support, etc.

### 🚀 Publishing & Export
- **One-click publish** — Deploy to a live URL with Vercel integration
- **React + Vite export** — Full TypeScript project with React Router, Tailwind CSS, and Vercel config
- **Static HTML export** — Standalone HTML files for simple hosting
- **ZIP download** — Complete project archive
- **Deployment history** — Versioned deployments with rollback capability
- **Custom domains** — Connect your own domain name

### 🔒 Security
- **Supabase Auth** — Secure email/password authentication
- **Row-Level Security (RLS)** — Every table has policies ensuring users only access their own data
- **HTTPS/SSL** — All data encrypted in transit
- **Password reset** — Secure email-based password recovery
- **No vendor lock-in** — Export everything; you own 100% of your code

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18.3 | UI rendering with functional components and hooks |
| **Language** | TypeScript 5.x | Type-safe development with strict mode |
| **Build Tool** | Vite 5.x | Lightning-fast HMR, optimized production builds |
| **Styling** | Tailwind CSS 3.x | Utility-first CSS with custom design tokens |
| **State Management** | Zustand 5.x | Lightweight store with undo/redo history |
| **Data Fetching** | TanStack React Query 5.x | Server state, caching, and cache invalidation |
| **Routing** | React Router DOM 6.x | Client-side SPA routing with protected routes |
| **Backend** | Supabase | Auth, PostgreSQL database, storage, and RLS |
| **Drag & Drop** | dnd-kit | Accessible drag-and-drop for canvas and layers |
| **Code Editor** | Monaco Editor | VS Code-powered editor for custom code panels |
| **Charts** | Recharts 2.x | Analytics and data visualization |
| **Forms** | React Hook Form + Zod | Form handling with schema validation |
| **Icons** | Lucide React | 1000+ consistent SVG icons |
| **Notifications** | Sonner + Radix Toast | Toast notifications and alerts |
| **UI Primitives** | Radix UI | Accessible, unstyled component primitives |
| **Animation** | Tailwind Animate | CSS animation utilities |
| **ZIP Export** | JSZip | Client-side ZIP file generation |
| **Theming** | next-themes | Dark/light mode support |

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.ico              # Site favicon
│   ├── robots.txt               # Search engine crawler rules
│   └── sitemap.xml              # XML sitemap for SEO
├── src/
│   ├── components/
│   │   ├── builder/             # 15+ builder panels (Canvas, Toolbar, SEO, CMS, etc.)
│   │   └── ui/                  # 40+ shadcn/ui components (Button, Dialog, Card, etc.)
│   ├── data/
│   │   ├── componentLibrary.ts  # Component definitions and categories
│   │   └── templates.ts         # 12 page templates with full schemas
│   ├── engine/
│   │   ├── codegen/             # React, HTML, and ZIP code generators
│   │   ├── deploy/              # Vercel deployment integration
│   │   ├── plugins/             # Plugin manager and extensibility
│   │   ├── properties/          # Property schema definitions
│   │   ├── registry/            # Component registry system
│   │   ├── renderer/            # Recursive component renderer
│   │   ├── runtime/             # Tree operations and undo/redo history
│   │   └── symbols/             # Reusable component symbols engine
│   ├── hooks/                   # 15+ custom hooks (useAuth, usePages, useProducts, etc.)
│   ├── integrations/supabase/   # Supabase client and auto-generated types
│   ├── pages/                   # 12+ route pages (Landing, Builder, Dashboard, Docs, etc.)
│   ├── plugins/                 # Plugin system (components, extensions, templates)
│   ├── registry/components/     # 18 component category files (200+ component renderers)
│   ├── store/                   # Zustand builder store with undo/redo
│   └── types/                   # TypeScript type definitions
├── supabase/
│   ├── config.toml              # Supabase project configuration
│   └── migrations/              # Database migration files
├── index.html                   # Entry HTML with 50+ SEO meta tags and JSON-LD
├── tailwind.config.ts           # Tailwind configuration with custom design tokens
├── vite.config.ts               # Vite build configuration
└── vitest.config.ts             # Test configuration
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Tailwind Design Tokens

Custom design tokens are defined in `src/index.css` and `tailwind.config.ts`:

```css
:root {
  --primary: 210 100% 45%;
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --muted: 220 14% 96%;
  --accent: 210 100% 50%;
}
```

### Supabase Database

The platform uses **17 database tables** with full Row-Level Security:

| Table | Purpose |
|-------|---------|
| `projects` | User website projects |
| `pages` | Multi-page support with JSON schemas |
| `page_versions` | Version history for page snapshots |
| `components` | Saved/global component library |
| `assets` | Uploaded files (images, videos, docs) |
| `deployments` | Deployment history and status |
| `project_settings` | SEO, branding, domain, analytics config |
| `blog_posts` | Blog content with categories and tags |
| `cms_collections` | Custom content type definitions |
| `products` | eCommerce product catalog |
| `orders` | Order tracking and management |
| `coupons` | Discount codes and promotions |
| `email_campaigns` | Email marketing campaigns |
| `social_posts` | Social media scheduled posts |
| `services` | Booking service definitions |
| `events` | Event management with capacity |
| `installed_apps` | App Market integration tracking |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **Supabase** project (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/devbuilder.git
cd devbuilder

# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
# or
bun dev
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Start Vite dev server with HMR (port 8080) |
| **Build** | `npm run build` | TypeScript check + production build |
| **Preview** | `npm run preview` | Preview production build locally |
| **Lint** | `npm run lint` | Run ESLint checks |
| **Test** | `npx vitest` | Run unit tests with Vitest |

---

## 📄 Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing Page | Public |
| `/templates` | Template Selection | Public |
| `/auth` | Sign In / Sign Up | Public |
| `/reset-password` | Password Reset | Public |
| `/docs` | Documentation | Public |
| `/changelog` | Changelog | Public |
| `/api-reference` | API Reference | Public |
| `/privacy` | Privacy Policy | Public |
| `/terms` | Terms of Service | Public |
| `/dashboard` | Project Dashboard | 🔒 Protected |
| `/builder/:projectId` | Visual Editor | Protected |
| `/preview/:projectId` | Live Preview | 🔒 Protected |
| `/project/:projectId/settings` | Project Settings | 🔒 Protected |
| `/analytics/:projectId` | Analytics Dashboard | 🔒 Protected |

---

## 📝 SEO Configuration

- ✅ **50+ meta tags** (primary, Open Graph, Twitter Cards, robots, theme-color)
- ✅ **3 JSON-LD schemas** (WebApplication, Organization, BreadcrumbList)
- ✅ **XML sitemap** with all 9 public routes
- ✅ **robots.txt** allowing 10+ major crawlers
- ✅ **Semantic HTML5** throughout all pages
- ✅ **Canonical URLs** for duplicate content prevention
- ✅ **Preconnect hints** for Google Fonts performance

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

Proprietary software built by **[LadeStack](https://ladestack.in)**.

---

## 📬 Contact

- **Email**: [admin@ladestack.in](mailto:admin@ladestack.in)
- **Website**: [ladestack.in](https://ladestack.in)
- **Instagram**: [@girish_lade_](https://www.instagram.com/girish_lade_/)
- **LinkedIn**: [Girish Lade](https://www.linkedin.com/in/girish-lade-075bba201/)
- **GitHub**: [girishlade111](https://github.com/girishlade111)
- **CodePen**: [Girish Lade](https://codepen.io/Girish-Lade-the-looper)

---

<p align="center">Made with ❤️ by <a href="https://ladestack.in">LadeStack</a></p>
