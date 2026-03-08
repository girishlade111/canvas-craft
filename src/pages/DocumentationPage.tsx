import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Book, Code2, Layout, Palette, Globe, Zap, ShoppingCart,
  Layers, MousePointerClick, Monitor, Settings, FileCode2, Rocket,
  Search, PenTool, BarChart3, Shield, Box, Smartphone, ExternalLink,
} from 'lucide-react';

const DocumentationPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'getting-started',
      icon: Rocket,
      title: 'Getting Started',
      description: 'Learn the basics of DevBuilder and create your first website in minutes.',
      articles: [
        {
          title: 'Quick Start Guide',
          content: `Welcome to DevBuilder! Follow these steps to create your first website:

1. **Sign Up** — Create a free account at devbuilder.app/auth
2. **Choose a Template** — Browse 12+ professionally designed templates for blogs, portfolios, eCommerce, SaaS, restaurants, and more
3. **Customize** — Use the drag-and-drop editor to modify layouts, colors, fonts, and content
4. **Preview** — Test your design across desktop, tablet, and mobile viewports
5. **Publish** — Deploy your site with one click to get a live URL instantly`,
        },
        {
          title: 'Understanding the Dashboard',
          content: `Your dashboard is your command center for managing all projects:

- **Project Cards** — Each card shows the project name, last updated date, and quick actions
- **Create New** — Start from scratch or pick a template
- **Settings** — Configure SEO, custom domains, analytics scripts, and branding per project
- **Analytics** — Track visitor traffic, page views, and engagement metrics
- **Quick Actions** — Edit, preview, duplicate, or delete projects directly from the dashboard`,
        },
        {
          title: 'System Requirements',
          content: `DevBuilder runs entirely in your browser. For the best experience:

- **Browser**: Chrome 90+, Firefox 88+, Safari 15+, or Edge 90+
- **Screen**: Minimum 1024×768 resolution (1440×900+ recommended)
- **Internet**: Stable connection for real-time saving and publishing
- **Device**: Works on desktop and tablets; mobile editing available with limited features`,
        },
      ],
    },
    {
      id: 'editor',
      icon: MousePointerClick,
      title: 'Editor & Canvas',
      description: 'Master the visual drag-and-drop editor, canvas controls, and component placement.',
      articles: [
        {
          title: 'Canvas Overview',
          content: `The canvas is your visual workspace where you build pages:

- **Drag & Drop** — Select components from the left sidebar and drop them onto the canvas
- **Click to Select** — Click any element to select it and reveal its property panel
- **Context Menu** — Right-click elements for quick actions: duplicate, delete, move up/down, copy styles
- **Zoom Controls** — Use the toolbar to zoom in/out or fit the canvas to your screen
- **Grid & Guides** — Toggle snap-to-grid for precise alignment
- **Undo/Redo** — Full history support with Ctrl+Z / Ctrl+Shift+Z`,
        },
        {
          title: 'Working with Sections',
          content: `Pages are organized into sections — the building blocks of your layout:

- **Header** — Navigation bar, logo, and menu links
- **Body Sections** — Hero banners, content blocks, features grids, testimonials, CTAs
- **Footer** — Site-wide footer with links, social icons, and copyright

Each section can be reordered, styled independently, and configured with background colors, images, padding, and max-width constraints.`,
        },
        {
          title: 'Keyboard Shortcuts',
          content: `Speed up your workflow with these shortcuts:

| Shortcut | Action |
|----------|--------|
| Ctrl + Z | Undo |
| Ctrl + Shift + Z | Redo |
| Ctrl + S | Save |
| Ctrl + D | Duplicate selected |
| Delete / Backspace | Delete selected |
| Ctrl + C | Copy element |
| Ctrl + V | Paste element |
| Escape | Deselect all |
| Ctrl + P | Preview mode |`,
        },
      ],
    },
    {
      id: 'components',
      icon: Box,
      title: 'Components Library',
      description: 'Explore 100+ built-in components across 15+ categories.',
      articles: [
        {
          title: 'Component Categories',
          content: `DevBuilder includes a rich component library organized into categories:

- **Layout** — Containers, grids, columns, sections, dividers, spacers
- **Text** — Headings (H1–H6), paragraphs, rich text, blockquotes, code blocks
- **Media** — Images, videos, galleries, carousels, audio players
- **Navigation** — Navbars, breadcrumbs, tabs, pagination, anchor links
- **Forms** — Inputs, textareas, selects, checkboxes, radio buttons, file uploads
- **Interactive** — Buttons, accordions, modals, tooltips, dropdowns, toggles
- **Data Display** — Tables, cards, stats, badges, progress bars, timelines
- **Marketing** — Hero sections, CTAs, testimonials, pricing tables, feature grids
- **eCommerce** — Product cards, shopping carts, checkout forms, price displays
- **Blog** — Post cards, author bios, comment sections, reading progress bars
- **Social** — Share buttons, social feeds, profile cards, follower counts
- **Embed** — YouTube, Vimeo, Google Maps, iframes, custom HTML
- **Design** — Gradients, patterns, decorative shapes, animated backgrounds`,
        },
        {
          title: 'Customizing Components',
          content: `Every component can be fully customized through the Properties Panel:

**Content**: Edit text, images, links, and placeholder content directly
**Styles**: Adjust colors, fonts, spacing, borders, shadows, opacity, and border radius
**Layout**: Control width, height, alignment, display mode, and overflow behavior
**Responsive**: Set different styles for desktop, tablet, and mobile breakpoints
**Advanced**: Add custom CSS classes, HTML attributes, and animation settings

Pro tip: Use the Global Design Panel to set site-wide typography, color palettes, and spacing scales.`,
        },
      ],
    },
    {
      id: 'responsive',
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Build pixel-perfect layouts for desktop, tablet, and mobile devices.',
      articles: [
        {
          title: 'Device Previews',
          content: `DevBuilder provides three viewport modes for responsive design:

- **Desktop** (1440px) — Default editing view for large screens
- **Tablet** (768px) — Preview and adjust layouts for iPad-sized devices
- **Mobile** (375px) — Optimize for smartphones with touch-friendly sizing

Switch between viewports using the toolbar icons. Each viewport can have independent styles for spacing, font sizes, visibility, and layout direction.`,
        },
        {
          title: 'Responsive Best Practices',
          content: `Follow these guidelines for great responsive designs:

1. **Mobile-first thinking** — Start with the mobile layout, then enhance for larger screens
2. **Flexible grids** — Use percentage-based widths and CSS Grid/Flexbox over fixed pixels
3. **Readable typography** — Minimum 16px body text on mobile; scale up for desktop
4. **Touch targets** — Buttons and links should be at least 44×44px on mobile
5. **Image optimization** — Use responsive images and lazy loading for faster mobile loads
6. **Test thoroughly** — Always preview all three viewports before publishing`,
        },
      ],
    },
    {
      id: 'cms',
      icon: FileCode2,
      title: 'CMS & Blog',
      description: 'Manage blog posts, collections, and dynamic content with the built-in CMS.',
      articles: [
        {
          title: 'Blog Management',
          content: `DevBuilder includes a full-featured blog system:

- **Create Posts** — Write blog posts with a rich text editor supporting headings, lists, images, and code blocks
- **Categories & Tags** — Organize posts with categories and searchable tags
- **Status Workflow** — Draft → Scheduled → Published lifecycle
- **Featured Posts** — Mark posts as featured to highlight them on your homepage
- **SEO Fields** — Custom meta titles, descriptions, and slugs per post
- **Author Profiles** — Associate posts with author names and bios
- **Reading Time** — Automatically calculated based on word count`,
        },
        {
          title: 'CMS Collections',
          content: `Beyond blogs, create custom content collections for any data type:

- **Define Fields** — Create collections with custom field schemas (text, number, image, date, boolean, rich text)
- **Dynamic Pages** — Connect collections to page templates for auto-generated pages
- **Content API** — Access collection data programmatically via Supabase queries
- **Import/Export** — Bulk manage content with JSON import and export

Example use cases: team members, portfolio projects, FAQ items, product catalogs, event listings, recipe databases.`,
        },
      ],
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'eCommerce',
      description: 'Set up an online store with products, orders, inventory, and payments.',
      articles: [
        {
          title: 'Store Setup',
          content: `Launch your online store with DevBuilder's built-in eCommerce tools:

1. **Add Products** — Create product listings with names, descriptions, prices, images, categories, and variants (size, color)
2. **Inventory Management** — Track stock levels and get low-inventory alerts
3. **Pricing** — Set regular prices and compare-at prices for sale displays
4. **Product Status** — Draft, active, or archived lifecycle management
5. **Categories** — Organize products into browsable categories`,
        },
        {
          title: 'Orders & Coupons',
          content: `Manage your sales pipeline:

**Orders**:
- View all orders with customer info, items, totals, and status
- Status tracking: pending → processing → shipped → delivered
- Order history and search

**Coupons & Discounts**:
- Create percentage or fixed-amount discount codes
- Track coupon usage counts
- Activate/deactivate coupons anytime`,
        },
      ],
    },
    {
      id: 'seo',
      icon: Search,
      title: 'SEO & Meta Tags',
      description: 'Optimize your site for search engines with comprehensive SEO tools.',
      articles: [
        {
          title: 'SEO Configuration',
          content: `DevBuilder provides enterprise-level SEO tools:

**Page-Level SEO**:
- Custom meta title (recommended: under 60 characters)
- Meta description (recommended: under 160 characters)
- Canonical URL to prevent duplicate content
- noindex/nofollow options for specific pages
- Custom URL slugs

**Open Graph & Social**:
- OG title, description, and image for Facebook/LinkedIn sharing
- Twitter Card meta tags with large image support
- Social share preview editor

**Technical SEO**:
- Auto-generated XML sitemap
- robots.txt with all crawlers allowed
- JSON-LD structured data (WebApplication, Organization, BreadcrumbList)
- Semantic HTML5 markup throughout
- Image alt text support on all media components`,
        },
        {
          title: 'SEO Audit Tool',
          content: `The built-in SEO audit scores your pages on key factors:

✅ Title length (50–60 characters optimal)
✅ Meta description (120–160 characters optimal)
✅ Focus keyword presence in title and description
✅ Open Graph tags configured
✅ Canonical URL set
✅ Image alt text present
✅ Heading hierarchy (single H1, proper H2–H6 nesting)
✅ Internal linking structure
✅ Mobile-friendly layout
✅ Page load performance

Each check provides actionable tips to improve your score.`,
        },
      ],
    },
    {
      id: 'publishing',
      icon: Globe,
      title: 'Publishing & Deployment',
      description: 'Deploy your site live with one click and manage custom domains.',
      articles: [
        {
          title: 'One-Click Publish',
          content: `Publishing your site is simple:

1. Click the **Publish** button in the builder toolbar
2. DevBuilder saves your current page schema
3. Clean React + TypeScript code is generated automatically
4. Your site is deployed and a live URL is provided
5. Share your URL or connect a custom domain

Each deployment is versioned — you can view deployment history and rollback if needed.`,
        },
        {
          title: 'Export & Self-Hosting',
          content: `You own 100% of your code. Export options include:

- **React + Vite** — Full project with TypeScript, React Router, and Tailwind CSS
- **Static HTML** — Standalone HTML files for simple hosting
- **ZIP Download** — Complete project archive ready for deployment

Exported projects include:
- package.json with all dependencies
- Vite configuration with optimized build settings
- TypeScript configuration (strict mode)
- Vercel deployment config (vercel.json)
- ESLint and Prettier setup
- README with setup instructions`,
        },
      ],
    },
    {
      id: 'marketing',
      icon: BarChart3,
      title: 'Marketing Tools',
      description: 'Email campaigns, social media scheduling, and analytics integration.',
      articles: [
        {
          title: 'Email Campaigns',
          content: `Create and manage email marketing campaigns:

- **Campaign Builder** — Design email campaigns with subject lines, content, and recipient lists
- **Status Tracking** — Draft → Scheduled → Sent lifecycle
- **Analytics** — Track open rates and click-through rates per campaign
- **Scheduling** — Set future send dates for timed releases
- **Recipient Management** — Manage subscriber counts and segments`,
        },
        {
          title: 'Social Media',
          content: `Schedule and manage social media posts:

- **Multi-Platform** — Support for Facebook, Instagram, Twitter, and LinkedIn
- **Content Calendar** — Visual scheduling with date/time pickers
- **Status Workflow** — Draft → Scheduled → Published
- **Post Preview** — See how posts will appear on each platform
- **Bulk Management** — Create and manage multiple posts simultaneously`,
        },
      ],
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Security & Data',
      description: 'How DevBuilder keeps your data safe and secure.',
      articles: [
        {
          title: 'Security Features',
          content: `DevBuilder is built with security at its core:

- **Authentication** — Secure email/password auth with Supabase Auth
- **Row-Level Security** — Every database table has RLS policies ensuring users can only access their own data
- **HTTPS/SSL** — All data transmitted over encrypted connections
- **Auto-Save** — Your work is automatically saved every 3 seconds to prevent data loss
- **Version History** — Page versions are stored so you can restore previous states
- **No vendor lock-in** — Export your code anytime; you own everything you build`,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              <h1 className="font-bold text-lg">Documentation</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">DevBuilder Documentation</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Everything you need to build, customize, and publish stunning websites. From getting started to advanced features — it's all here.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-6 border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-sm transition-all text-sm font-medium">
                <s.icon className="w-4 h-4 text-primary" />
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        {sections.map((section, si) => (
          <section key={section.id} id={section.id} className={si > 0 ? 'mt-20' : ''}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>

            <div className="mt-8 space-y-10">
              {section.articles.map((article, ai) => (
                <article key={ai} className="pl-4 border-l-2 border-primary/20">
                  <h3 className="text-lg font-semibold mb-3">{article.title}</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {article.content}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer CTA */}
      <section className="py-16 px-6 border-t border-border text-center bg-muted/30">
        <h3 className="text-2xl font-bold mb-3">Ready to build?</h3>
        <p className="text-muted-foreground mb-6">Start creating your website today — no coding required.</p>
        <button onClick={() => navigate('/templates')} className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground" style={{ background: 'var(--gradient-primary, hsl(var(--primary)))' }}>
          Get Started Free
        </button>
      </section>
    </div>
  );
};

export default DocumentationPage;
