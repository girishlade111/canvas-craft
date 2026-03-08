import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ═══════════════════════════════════════════════════════════
// SHARED FOOTERS
// ═══════════════════════════════════════════════════════════

const darkFooter = {
  id: "footer-shared", type: "footer", label: "Footer",
  styles: { padding: "64px 40px 32px", backgroundColor: "#0f172a", color: "#94a3b8", textAlign: "center" },
  components: [
    { id: "f-links", type: "paragraph", category: "Text", label: "Footer Links", content: "Home   About   Services   Blog   Contact   Privacy   Terms", styles: { fontSize: "13px", letterSpacing: "0.5px", opacity: "0.7", marginBottom: "20px" } },
    { id: "f-social", type: "social-icons", category: "Widgets", label: "Social", styles: {}, props: { layout: "horizontal", size: "28" } },
    { id: "f-divider", type: "divider", category: "Basic", label: "Divider", styles: { width: "100%", height: "1px", backgroundColor: "#1e293b", margin: "24px 0" } },
    { id: "f-text", type: "paragraph", category: "Text", label: "Copyright", content: "© 2026 All rights reserved. Crafted with DevBuilder.", styles: { fontSize: "12px", opacity: "0.5" } },
  ],
};

const lightFooter = {
  ...darkFooter,
  styles: { padding: "64px 40px 32px", backgroundColor: "#f8fafc", color: "#64748b", textAlign: "center", borderTop: "1px solid #e2e8f0" },
  components: [
    { id: "f-links-l", type: "paragraph", category: "Text", label: "Footer Links", content: "Home   About   Services   Blog   Contact   Privacy   Terms", styles: { fontSize: "13px", letterSpacing: "0.5px", opacity: "0.7", marginBottom: "20px" } },
    { id: "f-social-l", type: "social-icons", category: "Widgets", label: "Social", styles: {}, props: { layout: "horizontal", size: "28" } },
    { id: "f-divider-l", type: "divider", category: "Basic", label: "Divider", styles: { width: "100%", height: "1px", backgroundColor: "#e2e8f0", margin: "24px 0" } },
    { id: "f-text-l", type: "paragraph", category: "Text", label: "Copyright", content: "© 2026 All rights reserved.", styles: { fontSize: "12px", opacity: "0.5" } },
  ],
};

// ═══════════════════════════════════════════════════════════
// PREVIEW IMAGE MAP (name keyword → preview file)
// ═══════════════════════════════════════════════════════════

const PREVIEW_MAP: Record<string, string> = {
  "saas": "saas-preview.jpg",
  "portfolio": "portfolio-preview.jpg",
  "photography": "portfolio-preview.jpg",
  "agency": "agency-preview.jpg",
  "ecommerce": "ecommerce-preview.jpg",
  "e-commerce": "ecommerce-preview.jpg",
  "blog": "blog-preview.jpg",
  "restaurant": "restaurant-preview.jpg",
  "delivery": "restaurant-preview.jpg",
  "fitness": "fitness-preview.jpg",
  "real estate": "realestate-preview.jpg",
  "travel": "travel-preview.jpg",
  "wedding": "wedding-preview.jpg",
  "dashboard": "dashboard-preview.jpg",
  "job": "jobboard-preview.jpg",
  "event": "event-preview.jpg",
  "music": "music-preview.jpg",
  "landing": "landing-preview.jpg",
  "education": "education-preview.jpg",
  "enterprise": "enterprise-preview.jpg",
  "nonprofit": "nonprofit-preview.jpg",
  "non-profit": "nonprofit-preview.jpg",
  "community": "community-preview.jpg",
  "blank": "landing-preview.jpg",
  "medical": "fitness-preview.jpg",
  "personal blog": "blog-preview.jpg",
};

function getPreviewUrl(name: string, baseUrl: string): string | null {
  const lower = name.toLowerCase();
  for (const [keyword, file] of Object.entries(PREVIEW_MAP)) {
    if (lower.includes(keyword)) return `${baseUrl}/templates/${file}`;
  }
  return null;
}

// ═══════════════════════════════════════════════════════════
// ALL 25 TEMPLATES (consolidated from seed-templates, seed-new-templates, seed-more-templates)
// ═══════════════════════════════════════════════════════════

const templates = [
  // ── 1. Blank Canvas ──
  {
    name: "Blank Canvas",
    description: "Clean starter with header, hero section, and footer — ready for customization",
    category: "starter",
    thumbnail: "🗒️",
    tags: ["starter", "blank", "minimal"],
    installs: 320,
    schema: {
      id: "page-blank", name: "Home",
      sections: [
        { id: "header-1", type: "header", label: "Header", styles: { padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", borderBottom: "1px solid #f1f5f9" }, components: [
          { id: "logo-1", type: "heading", category: "Text", label: "Logo", content: "● YourBrand", styles: { fontSize: "20px", fontWeight: "700" } },
          { id: "nav-1", type: "paragraph", category: "Text", label: "Nav", content: "Home   About   Contact", styles: { fontSize: "14px", fontWeight: "500", opacity: "0.7" } },
        ]},
        { id: "body-1", type: "body", label: "Body", styles: { padding: "120px 32px", minHeight: "500px", textAlign: "center", background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }, components: [
          { id: "body-heading", type: "heading", category: "Text", label: "Main Heading", content: "Welcome to Your Website", styles: { fontSize: "48px", fontWeight: "800", margin: "0 0 16px 0", letterSpacing: "-0.02em", lineHeight: "1.1" } },
          { id: "body-text", type: "paragraph", category: "Text", label: "Body Text", content: "Start building by dragging components from the sidebar. This blank canvas is your creative playground.", styles: { fontSize: "18px", color: "#6b7280", maxWidth: "560px", margin: "0 auto 32px", lineHeight: "1.7" } },
          { id: "body-btn", type: "button", category: "Basic", label: "CTA", content: "Get Started →", styles: { padding: "14px 36px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#0f172a", color: "#ffffff", border: "none" } },
        ]},
        lightFooter,
      ],
    },
  },
  // ── 2. SaaS Landing ──
  {
    name: "SaaS Landing",
    description: "Full-featured startup landing with hero, features, pricing, FAQ, testimonials, and conversion CTAs",
    category: "tech",
    thumbnail: "⚡",
    tags: ["saas", "startup", "landing", "tech"],
    installs: 487,
    schema: {
      id: "page-saas", name: "SaaS Landing",
      sections: [
        { id: "saas-nav", type: "header", label: "Navigation", styles: { padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#020617", color: "#ffffff" }, components: [
          { id: "saas-logo", type: "heading", category: "Text", label: "Logo", content: "⚡ Velocity", styles: { fontSize: "22px", fontWeight: "800" } },
          { id: "saas-nav-links", type: "paragraph", category: "Text", label: "Nav", content: "Features   Pricing   Integrations   Docs   Blog", styles: { fontSize: "14px", opacity: "0.7", fontWeight: "500" } },
          { id: "saas-nav-cta", type: "button", category: "Basic", label: "Nav CTA", content: "Start Free Trial", styles: { padding: "10px 24px", fontSize: "13px", fontWeight: "700", borderRadius: "8px", backgroundColor: "#6366f1", color: "#ffffff", border: "none" } },
        ]},
        { id: "saas-hero", type: "body", label: "Hero", styles: { padding: "120px 40px 100px", textAlign: "center", background: "radial-gradient(ellipse at top, #1e1b4b 0%, #020617 60%)", color: "#ffffff" }, components: [
          { id: "saas-badge", type: "badge", category: "Text", label: "Badge", content: "✨ Trusted by 50,000+ teams worldwide", styles: {} },
          { id: "saas-h1", type: "heading", category: "Text", label: "Headline", content: "Ship products 10x faster\nwith modern infrastructure", styles: { fontSize: "68px", fontWeight: "800", lineHeight: "1.08", margin: "24px 0", letterSpacing: "-0.03em" } },
          { id: "saas-sub", type: "paragraph", category: "Text", label: "Subtitle", content: "The complete developer platform for building, deploying, and scaling web applications.", styles: { fontSize: "20px", color: "#94a3b8", maxWidth: "680px", margin: "0 auto 40px", lineHeight: "1.6" } },
          { id: "saas-cta", type: "button", category: "Basic", label: "Primary CTA", content: "Start Free Trial →", styles: { padding: "18px 44px", fontSize: "16px", fontWeight: "700", borderRadius: "12px", backgroundColor: "#6366f1", color: "#ffffff", border: "none", marginRight: "12px" } },
          { id: "saas-cta2", type: "button", category: "Basic", label: "Secondary CTA", content: "Watch Demo", styles: { padding: "18px 44px", fontSize: "16px", fontWeight: "700", borderRadius: "12px", backgroundColor: "transparent", color: "#ffffff", border: "1px solid #334155" } },
        ]},
        { id: "saas-features", type: "body", label: "Features", styles: { padding: "100px 40px", backgroundColor: "#0f172a", color: "#ffffff" }, components: [
          { id: "saas-feat-h", type: "heading", category: "Text", label: "Title", content: "Everything you need to build,\ndeploy, and scale", styles: { fontSize: "44px", fontWeight: "800", textAlign: "center", margin: "16px 0 56px 0", letterSpacing: "-0.02em" } },
          { id: "saas-f1", type: "feature-card", category: "Layout", label: "Feature 1", styles: {}, props: { icon: "⚡", title: "Lightning Fast Builds", description: "Optimized CI/CD pipeline with incremental builds and sub-second cold starts." } },
          { id: "saas-f2", type: "feature-card", category: "Layout", label: "Feature 2", styles: {}, props: { icon: "🛡️", title: "Enterprise-Grade Security", description: "SOC2 Type II certified with end-to-end encryption, SSO/SAML, and role-based access control." } },
          { id: "saas-f3", type: "feature-card", category: "Layout", label: "Feature 3", styles: {}, props: { icon: "📊", title: "Real-time Observability", description: "Full-stack monitoring with distributed tracing, custom dashboards, and instant alerting." } },
        ]},
        { id: "saas-pricing", type: "body", label: "Pricing", styles: { padding: "100px 40px", backgroundColor: "#0f172a", color: "#ffffff" }, components: [
          { id: "saas-price-h", type: "heading", category: "Text", label: "Title", content: "Simple, transparent pricing", styles: { fontSize: "44px", fontWeight: "800", textAlign: "center", margin: "16px 0 56px 0", letterSpacing: "-0.02em" } },
          { id: "saas-price-1", type: "pricing-card", category: "Layout", label: "Hobby", styles: {}, props: { name: "Hobby", price: "$0", period: "/month", featured: false } },
          { id: "saas-price-2", type: "pricing-card", category: "Layout", label: "Pro", styles: {}, props: { name: "Pro", price: "$29", period: "/month", featured: true } },
          { id: "saas-price-3", type: "pricing-card", category: "Layout", label: "Enterprise", styles: {}, props: { name: "Enterprise", price: "Custom", period: "", featured: false } },
        ]},
        { id: "saas-faq", type: "body", label: "FAQ", styles: { padding: "100px 40px", backgroundColor: "#020617", color: "#ffffff" }, components: [
          { id: "saas-faq-h", type: "heading", category: "Text", label: "Title", content: "Frequently asked questions", styles: { fontSize: "36px", fontWeight: "800", textAlign: "center", margin: "0 0 48px 0" } },
          { id: "saas-faq-c", type: "faq", category: "Layout", label: "FAQ", styles: {} },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: "#020617" } },
      ],
    },
  },
  // ── 3. Creative Agency ──
  {
    name: "Creative Agency",
    description: "Bold agency site with immersive hero, portfolio showcase, services, team, and client testimonials",
    category: "creative",
    thumbnail: "✦",
    tags: ["agency", "creative", "portfolio", "bold"],
    installs: 412,
    schema: {
      id: "page-agency", name: "Agency",
      sections: [
        { id: "ag-nav", type: "header", label: "Navigation", styles: { padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent", position: "relative", zIndex: "10" }, components: [
          { id: "ag-logo", type: "heading", category: "Text", label: "Logo", content: "STUDIO∞", styles: { fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px", color: "#ffffff" } },
          { id: "ag-links", type: "paragraph", category: "Text", label: "Nav", content: "Work   Services   About   Careers   Contact", styles: { fontSize: "14px", fontWeight: "500", color: "#ffffff", opacity: "0.7" } },
        ]},
        { id: "ag-hero", type: "body", label: "Hero", styles: { padding: "100px 48px 120px", background: "linear-gradient(160deg, #0f0f23 0%, #1a1a3e 35%, #2d1b4e 60%, #1a0a2e 80%, #0f0f23 100%)", color: "#ffffff" }, components: [
          { id: "ag-h1", type: "heading", category: "Text", label: "Hero Title", content: "We craft digital\nexperiences that\nmove people.", styles: { fontSize: "76px", fontWeight: "800", lineHeight: "1.02", letterSpacing: "-0.04em", margin: "0 0 32px 0" } },
          { id: "ag-sub", type: "paragraph", category: "Text", label: "Subtitle", content: "Award-winning agency specializing in brand strategy, product design, and full-stack development.", styles: { fontSize: "19px", color: "rgba(255,255,255,0.55)", maxWidth: "580px", lineHeight: "1.7" } },
          { id: "ag-cta", type: "button", category: "Basic", label: "CTA", content: "View Our Work →", styles: { marginTop: "44px", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#ffffff", color: "#0f0f23", border: "none" } },
        ]},
        { id: "ag-services", type: "body", label: "Services", styles: { padding: "100px 48px", backgroundColor: "#ffffff" }, components: [
          { id: "ag-srv-h", type: "heading", category: "Text", label: "Title", content: "What We Do", styles: { fontSize: "44px", fontWeight: "800", textAlign: "center", margin: "0 0 56px 0", letterSpacing: "-0.02em" } },
          { id: "ag-s1", type: "feature-card", category: "Layout", label: "Service 1", styles: {}, props: { icon: "🎨", title: "Brand & Identity", description: "Logo design, visual identity systems, brand guidelines, and positioning strategy." } },
          { id: "ag-s2", type: "feature-card", category: "Layout", label: "Service 2", styles: {}, props: { icon: "✏️", title: "Product Design", description: "User research, wireframing, UI/UX design, prototyping, and usability testing." } },
          { id: "ag-s3", type: "feature-card", category: "Layout", label: "Service 3", styles: {}, props: { icon: "💻", title: "Development", description: "Full-stack web and mobile development with React, Next.js, and modern frameworks." } },
        ]},
        { id: "ag-cta-section", type: "body", label: "CTA", styles: { padding: "120px 48px", textAlign: "center", background: "linear-gradient(160deg, #0f0f23 0%, #2d1b4e 50%, #0f0f23 100%)", color: "#ffffff" }, components: [
          { id: "ag-cta-h", type: "heading", category: "Text", label: "CTA", content: "Let's create something\nextraordinary together.", styles: { fontSize: "52px", fontWeight: "800", lineHeight: "1.08", margin: "0 0 20px 0" } },
          { id: "ag-cta-btn", type: "button", category: "Basic", label: "CTA", content: "Start a Project →", styles: { padding: "18px 56px", fontSize: "16px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#ffffff", color: "#0f0f23", border: "none" } },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: "#0f0f23" } },
      ],
    },
  },
  // ── 4. Modern Blog ──
  {
    name: "Modern Blog",
    description: "Content-first publishing platform with featured posts, categories, newsletter, and search",
    category: "content",
    thumbnail: "✍️",
    tags: ["blog", "content", "publishing", "articles"],
    installs: 356,
    schema: {
      id: "page-blog", name: "Blog",
      sections: [
        { id: "blog-nav", type: "header", label: "Navigation", styles: { padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", backgroundColor: "#ffffff" }, components: [
          { id: "blog-logo", type: "heading", category: "Text", label: "Logo", content: "✍️ The Journal", styles: { fontSize: "22px", fontWeight: "800" } },
          { id: "blog-nav-l", type: "paragraph", category: "Text", label: "Nav", content: "Articles   Categories   Newsletter   About", styles: { fontSize: "14px", fontWeight: "500", opacity: "0.7" } },
        ]},
        { id: "blog-hero", type: "body", label: "Hero", styles: { padding: "100px 40px 80px", textAlign: "center", background: "linear-gradient(135deg, #faf5ff 0%, #f0f9ff 40%, #fefce8 100%)" }, components: [
          { id: "blog-h", type: "heading", category: "Text", label: "Title", content: "Ideas That Shape\nthe Future", styles: { fontSize: "60px", fontWeight: "800", lineHeight: "1.08", margin: "0 0 20px 0", letterSpacing: "-0.03em" } },
          { id: "blog-p", type: "paragraph", category: "Text", label: "Subtitle", content: "Exploring design, technology, and the craft of building exceptional digital products.", styles: { fontSize: "18px", color: "#6b7280", maxWidth: "560px", margin: "0 auto 36px", lineHeight: "1.7" } },
          { id: "blog-nl", type: "newsletter", category: "Forms", label: "Newsletter", styles: {}, props: { title: "", buttonText: "Subscribe Free" } },
        ]},
        { id: "blog-grid", type: "body", label: "Posts", styles: { padding: "48px 40px" }, components: [
          { id: "bp-1", type: "blog-post-card", category: "Blog", label: "Post 1", styles: {}, props: { title: "The Art of Minimal Design", excerpt: "How less really is more in modern web interfaces.", date: "Mar 5, 2026", author: "Sarah Chen" } },
          { id: "bp-2", type: "blog-post-card", category: "Blog", label: "Post 2", styles: { marginTop: "24px" }, props: { title: "Building Scalable Design Systems", excerpt: "A comprehensive guide to creating reusable component libraries.", date: "Mar 2, 2026", author: "Alex Kim" } },
          { id: "bp-3", type: "blog-post-card", category: "Blog", label: "Post 3", styles: { marginTop: "24px" }, props: { title: "React Server Components Deep Dive", excerpt: "Advanced optimization techniques for production applications.", date: "Feb 28, 2026", author: "James Liu" } },
        ]},
        lightFooter,
      ],
    },
  },
  // ── 5. Enterprise ──
  {
    name: "Enterprise",
    description: "Professional B2B site with KPIs, feature comparison, pricing tiers, and enterprise-grade social proof",
    category: "business",
    thumbnail: "◆",
    tags: ["enterprise", "b2b", "business", "corporate"],
    installs: 298,
    schema: {
      id: "page-enterprise", name: "Enterprise",
      sections: [
        { id: "ent-nav", type: "header", label: "Navigation", styles: { padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }, components: [
          { id: "ent-logo", type: "heading", category: "Text", label: "Logo", content: "◆ Meridian", styles: { fontSize: "22px", fontWeight: "800" } },
          { id: "ent-nav-l", type: "paragraph", category: "Text", label: "Nav", content: "Solutions   Platform   Resources   Customers   Company", styles: { fontSize: "14px", fontWeight: "500", opacity: "0.7" } },
          { id: "ent-cta-nav", type: "button", category: "Basic", label: "CTA", content: "Request a Demo", styles: { padding: "10px 28px", fontSize: "13px", fontWeight: "700", borderRadius: "8px", backgroundColor: "#0f172a", color: "#ffffff", border: "none" } },
        ]},
        { id: "ent-hero", type: "body", label: "Hero", styles: { padding: "120px 48px 100px", background: "linear-gradient(170deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", color: "#ffffff", textAlign: "center" }, components: [
          { id: "ent-trust", type: "badge", category: "Text", label: "Trust Badge", content: "🏆 G2 Leader — Enterprise Infrastructure 2026", styles: {} },
          { id: "ent-h1", type: "heading", category: "Text", label: "Title", content: "Enterprise Infrastructure\nfor the AI Era", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08", letterSpacing: "-0.03em", margin: "24px 0 20px 0" } },
          { id: "ent-sub", type: "paragraph", category: "Text", label: "Subtitle", content: "Secure, scalable, and intelligent cloud platform trusted by Fortune 500 companies.", styles: { fontSize: "20px", color: "#94a3b8", maxWidth: "720px", margin: "0 auto 40px", lineHeight: "1.6" } },
          { id: "ent-cta1", type: "button", category: "Basic", label: "Primary CTA", content: "Schedule a Demo", styles: { padding: "18px 44px", fontSize: "16px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#3b82f6", color: "#ffffff", border: "none" } },
        ]},
        { id: "ent-features", type: "body", label: "Features", styles: { padding: "100px 48px" }, components: [
          { id: "ent-f-h", type: "heading", category: "Text", label: "Title", content: "Built for scale,\ndesigned for security", styles: { fontSize: "44px", fontWeight: "800", textAlign: "center", margin: "16px 0 56px 0", letterSpacing: "-0.02em" } },
          { id: "ent-f1", type: "feature-card", category: "Layout", label: "Feature", styles: {}, props: { icon: "🛡️", title: "SOC2 & HIPAA Compliant", description: "Enterprise-grade security with continuous monitoring." } },
          { id: "ent-f2", type: "feature-card", category: "Layout", label: "Feature", styles: {}, props: { icon: "🌐", title: "Global Edge Network", description: "300+ edge locations across 6 continents for sub-30ms latency." } },
          { id: "ent-f3", type: "feature-card", category: "Layout", label: "Feature", styles: {}, props: { icon: "🤖", title: "AI-Powered Insights", description: "ML models that optimize infrastructure and predict capacity needs." } },
        ]},
        { id: "ent-pricing", type: "body", label: "Pricing", styles: { padding: "100px 48px", backgroundColor: "#f8fafc" }, components: [
          { id: "ent-pr-h", type: "heading", category: "Text", label: "Title", content: "Enterprise pricing", styles: { fontSize: "40px", fontWeight: "800", textAlign: "center", margin: "0 0 48px 0" } },
          { id: "ent-pr1", type: "pricing-card", category: "Layout", label: "Team", styles: {}, props: { name: "Team", price: "$499", period: "/month", featured: false } },
          { id: "ent-pr2", type: "pricing-card", category: "Layout", label: "Business", styles: {}, props: { name: "Business", price: "$1,999", period: "/month", featured: true } },
          { id: "ent-pr3", type: "pricing-card", category: "Layout", label: "Enterprise", styles: {}, props: { name: "Enterprise", price: "Custom", period: "", featured: false } },
        ]},
        darkFooter,
      ],
    },
  },
  // ── 6. Portfolio ──
  {
    name: "Portfolio",
    description: "Refined designer portfolio with project showcase, about section, experience timeline, and testimonials",
    category: "creative",
    thumbnail: "◯",
    tags: ["portfolio", "designer", "minimal", "personal"],
    installs: 445,
    schema: {
      id: "page-portfolio", name: "Portfolio",
      sections: [
        { id: "port-nav", type: "header", label: "Navigation", styles: { padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#0a0a0a", color: "#ffffff" }, components: [
          { id: "port-name", type: "heading", category: "Text", label: "Name", content: "JANE DOE", styles: { fontSize: "14px", fontWeight: "600", letterSpacing: "4px" } },
          { id: "port-links", type: "paragraph", category: "Text", label: "Nav", content: "Work   About   Process   Contact", styles: { fontSize: "13px", opacity: "0.5", letterSpacing: "1px" } },
        ]},
        { id: "port-hero", type: "body", label: "Hero", styles: { padding: "140px 48px 100px", backgroundColor: "#0a0a0a", color: "#ffffff" }, components: [
          { id: "port-h1", type: "heading", category: "Text", label: "Title", content: "I design digital\nexperiences that\nfeel effortless.", styles: { fontSize: "72px", fontWeight: "200", lineHeight: "1.05", letterSpacing: "-0.03em" } },
          { id: "port-sub", type: "paragraph", category: "Text", label: "Bio", content: "Senior Product Designer with 10+ years crafting interfaces for startups, agencies, and Fortune 500 companies.", styles: { fontSize: "17px", color: "#737373", maxWidth: "520px", marginTop: "36px", lineHeight: "1.8" } },
        ]},
        { id: "port-contact", type: "body", label: "Contact", styles: { padding: "120px 48px", backgroundColor: "#0a0a0a", color: "#ffffff", textAlign: "center" }, components: [
          { id: "port-c-h", type: "heading", category: "Text", label: "CTA", content: "Let's work\ntogether.", styles: { fontSize: "60px", fontWeight: "200", lineHeight: "1.1", margin: "0 0 20px 0" } },
          { id: "port-email", type: "button", category: "Basic", label: "Email", content: "hello@janedoe.com", styles: { padding: "16px 48px", fontSize: "15px", fontWeight: "500", borderRadius: "100px", backgroundColor: "transparent", color: "#ffffff", border: "1px solid #333" } },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: "#0a0a0a" } },
      ],
    },
  },
  // ── 7. E-commerce ──
  {
    name: "E-commerce",
    description: "Premium fashion store with categories, product grid, customer reviews, and newsletter signup",
    category: "commerce",
    thumbnail: "🛍️",
    tags: ["ecommerce", "store", "fashion", "shop"],
    installs: 523,
    schema: {
      id: "page-ecommerce", name: "Store",
      sections: [
        { id: "ec-nav", type: "header", label: "Navigation", styles: { padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", backgroundColor: "#ffffff" }, components: [
          { id: "ec-logo", type: "heading", category: "Text", label: "Logo", content: "MAISON", styles: { fontSize: "26px", fontWeight: "300", letterSpacing: "8px" } },
          { id: "ec-links", type: "paragraph", category: "Text", label: "Nav", content: "New Arrivals   Women   Men   Accessories   Sale", styles: { fontSize: "12px", fontWeight: "500", letterSpacing: "2px", textTransform: "uppercase" } },
        ]},
        { id: "ec-hero", type: "body", label: "Hero", styles: { padding: "120px 48px", background: "linear-gradient(135deg, #fdf4ff 0%, #faf5ff 30%, #f5f3ff 60%, #eff6ff 100%)", textAlign: "center" }, components: [
          { id: "ec-h1", type: "heading", category: "Text", label: "Title", content: "Spring / Summer\n2026", styles: { fontSize: "72px", fontWeight: "200", lineHeight: "1.08", letterSpacing: "-0.02em", margin: "20px 0 24px 0" } },
          { id: "ec-sub", type: "paragraph", category: "Text", label: "Subtitle", content: "Timeless pieces crafted with premium materials and ethical manufacturing.", styles: { fontSize: "18px", color: "#6b7280", margin: "0 auto 40px", maxWidth: "520px", lineHeight: "1.7" } },
          { id: "ec-cta", type: "button", category: "Basic", label: "CTA", content: "SHOP THE COLLECTION", styles: { padding: "18px 56px", fontSize: "13px", fontWeight: "600", borderRadius: "0", backgroundColor: "#0f172a", color: "#ffffff", border: "none", letterSpacing: "3px" } },
        ]},
        { id: "ec-products", type: "body", label: "Products", styles: { padding: "80px 40px" }, components: [
          { id: "ec-prod-h", type: "heading", category: "Text", label: "Title", content: "Bestsellers", styles: { fontSize: "32px", fontWeight: "400", textAlign: "center", margin: "0 0 48px 0", letterSpacing: "1px" } },
          { id: "ec-pg", type: "product-grid", category: "Ecommerce", label: "Products", styles: {} },
        ]},
        lightFooter,
      ],
    },
  },
  // ── 8. Dashboard ──
  {
    name: "Dashboard",
    description: "Data-rich admin panel with KPIs, charts, data tables, search, and pagination",
    category: "tech",
    thumbnail: "📊",
    tags: ["dashboard", "admin", "analytics", "data"],
    installs: 389,
    schema: {
      id: "page-dashboard", name: "Dashboard",
      sections: [
        { id: "dash-nav", type: "header", label: "Top Bar", styles: { padding: "12px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }, components: [
          { id: "dash-logo", type: "heading", category: "Text", label: "Logo", content: "📊 Analytics Hub", styles: { fontSize: "18px", fontWeight: "700" } },
          { id: "dash-search", type: "search-bar", category: "Widgets", label: "Search", styles: {}, props: { placeholder: "Search reports..." } },
        ]},
        { id: "dash-kpis", type: "body", label: "KPIs", styles: { padding: "24px 28px" }, components: [
          { id: "dash-kpi", type: "kpi-dashboard", category: "Layout", label: "KPIs", styles: {} },
        ]},
        { id: "dash-charts", type: "body", label: "Charts", styles: { padding: "0 28px 24px" }, components: [
          { id: "dash-ch-h", type: "heading", category: "Text", label: "Chart Title", content: "Revenue Overview", styles: { fontSize: "16px", fontWeight: "700", margin: "0 0 16px 0" } },
          { id: "dash-chart1", type: "chart-placeholder", category: "Advanced", label: "Revenue Chart", styles: {}, props: { chartType: "area" } },
        ]},
      ],
    },
  },
  // ── 9. Fine Dining ──
  {
    name: "Fine Dining",
    description: "Elegant restaurant site with tasting menu, philosophy section, gallery, reviews, and reservations",
    category: "food",
    thumbnail: "✦",
    tags: ["restaurant", "food", "dining", "elegant"],
    installs: 267,
    schema: {
      id: "page-restaurant", name: "Restaurant",
      sections: [
        { id: "rest-nav", type: "header", label: "Navigation", styles: { padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1c1917", color: "#fef3c7" }, components: [
          { id: "rest-logo", type: "heading", category: "Text", label: "Logo", content: "✦ La Maison", styles: { fontSize: "28px", fontWeight: "300", letterSpacing: "4px" } },
          { id: "rest-links", type: "paragraph", category: "Text", label: "Nav", content: "Menu   Wine   Reservations   Private Events   Contact", styles: { fontSize: "12px", letterSpacing: "2px", opacity: "0.6", textTransform: "uppercase" } },
        ]},
        { id: "rest-hero", type: "body", label: "Hero", styles: { padding: "160px 48px 120px", textAlign: "center", background: "linear-gradient(180deg, #1c1917 0%, #292524 50%, #1c1917 100%)", color: "#fef3c7" }, components: [
          { id: "rest-h1", type: "heading", category: "Text", label: "Title", content: "A Culinary\nJourney", styles: { fontSize: "80px", fontWeight: "200", lineHeight: "1.02", letterSpacing: "-0.02em" } },
          { id: "rest-sub", type: "paragraph", category: "Text", label: "Subtitle", content: "Three Michelin stars — Farm-to-table dining in the heart of Paris since 1987", styles: { fontSize: "17px", color: "#a8a29e", margin: "24px 0 48px 0", letterSpacing: "1px" } },
          { id: "rest-cta", type: "button", category: "Basic", label: "CTA", content: "RESERVE A TABLE", styles: { padding: "18px 56px", fontSize: "13px", fontWeight: "500", borderRadius: "0", backgroundColor: "#fef3c7", color: "#1c1917", border: "none", letterSpacing: "3px" } },
        ]},
        { id: "rest-menu", type: "body", label: "Menu", styles: { padding: "100px 48px", backgroundColor: "#fef3c7", color: "#1c1917" }, components: [
          { id: "rest-m-h", type: "heading", category: "Text", label: "Title", content: "The Menu", styles: { fontSize: "44px", fontWeight: "300", textAlign: "center", margin: "0 0 56px 0", letterSpacing: "3px" } },
          { id: "rest-m1", type: "paragraph", category: "Text", label: "Item", content: "Truffle Burrata — Heirloom tomatoes, basil oil, aged balsamic..... $28", styles: { fontSize: "15px", padding: "16px 0", borderBottom: "1px solid #d4c9a8" } },
          { id: "rest-m2", type: "paragraph", category: "Text", label: "Item", content: "Foie Gras Torchon — Fig compote, toasted brioche, Sauternes gel..... $36", styles: { fontSize: "15px", padding: "16px 0", borderBottom: "1px solid #d4c9a8" } },
          { id: "rest-m3", type: "paragraph", category: "Text", label: "Item", content: "A5 Wagyu Ribeye — Bone marrow butter, black garlic, potato mousseline..... $78", styles: { fontSize: "15px", padding: "16px 0", borderBottom: "1px solid #d4c9a8" } },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: "#1c1917" } },
      ],
    },
  },
  // ── 10. Photography ──
  {
    name: "Photography",
    description: "Cinematic photography portfolio with gallery, pricing packages, testimonials, and booking CTA",
    category: "creative",
    thumbnail: "📷",
    tags: ["photography", "portfolio", "gallery", "cinematic"],
    installs: 334,
    schema: {
      id: "page-photography", name: "Photography",
      sections: [
        { id: "photo-nav", type: "header", label: "Navigation", styles: { padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#0a0a0a", color: "#ffffff" }, components: [
          { id: "photo-logo", type: "heading", category: "Text", label: "Logo", content: "LENS", styles: { fontSize: "18px", fontWeight: "400", letterSpacing: "10px" } },
          { id: "photo-links", type: "paragraph", category: "Text", label: "Nav", content: "Portfolio   Collections   About   Pricing   Contact", styles: { fontSize: "11px", letterSpacing: "3px", opacity: "0.45", textTransform: "uppercase" } },
        ]},
        { id: "photo-hero", type: "body", label: "Hero", styles: { padding: "180px 48px 140px", backgroundColor: "#0a0a0a", color: "#ffffff", textAlign: "center" }, components: [
          { id: "photo-h1", type: "heading", category: "Text", label: "Title", content: "Capturing\nLife's Poetry", styles: { fontSize: "84px", fontWeight: "200", lineHeight: "1.02", letterSpacing: "-0.03em" } },
          { id: "photo-sub", type: "paragraph", category: "Text", label: "Subtitle", content: "Wedding • Portrait • Editorial • Fine Art • Commercial", styles: { fontSize: "13px", color: "#525252", letterSpacing: "5px", textTransform: "uppercase", marginTop: "40px" } },
        ]},
        { id: "photo-contact", type: "body", label: "Contact", styles: { padding: "120px 48px", backgroundColor: "#0a0a0a", color: "#ffffff", textAlign: "center" }, components: [
          { id: "photo-c-h", type: "heading", category: "Text", label: "CTA", content: "Let's tell\nyour story.", styles: { fontSize: "52px", fontWeight: "200", lineHeight: "1.12", margin: "0 0 40px 0" } },
          { id: "photo-c-btn", type: "button", category: "Basic", label: "Email", content: "INQUIRE NOW", styles: { padding: "16px 48px", fontSize: "12px", borderRadius: "0", backgroundColor: "transparent", color: "#ffffff", border: "1px solid #333", letterSpacing: "4px" } },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: "#0a0a0a" } },
      ],
    },
  },
  // ── 11. Landing Page ──
  {
    name: "Landing Page",
    description: "High-conversion landing with social proof, features, pricing, FAQ, and multiple CTAs",
    category: "marketing",
    thumbnail: "▲",
    tags: ["landing", "conversion", "marketing", "product"],
    installs: 512,
    schema: {
      id: "page-landing", name: "Landing Page",
      sections: [
        { id: "lp-nav", type: "header", label: "Navigation", styles: { padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }, components: [
          { id: "lp-logo", type: "heading", category: "Text", label: "Logo", content: "▲ Prism", styles: { fontSize: "22px", fontWeight: "800" } },
          { id: "lp-nav-l", type: "paragraph", category: "Text", label: "Nav", content: "Features   How It Works   Pricing   FAQ", styles: { fontSize: "14px", fontWeight: "500", opacity: "0.7" } },
          { id: "lp-cta-nav", type: "button", category: "Basic", label: "CTA", content: "Get Early Access", styles: { padding: "10px 28px", fontSize: "13px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#0f172a", color: "#ffffff", border: "none" } },
        ]},
        { id: "lp-hero", type: "body", label: "Hero", styles: { padding: "120px 40px 100px", textAlign: "center", background: "linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)" }, components: [
          { id: "lp-h1", type: "heading", category: "Text", label: "Headline", content: "The modern way to\nbuild web products", styles: { fontSize: "68px", fontWeight: "800", lineHeight: "1.08", letterSpacing: "-0.03em", margin: "28px 0 20px 0" } },
          { id: "lp-sub", type: "paragraph", category: "Text", label: "Subtitle", content: "From wireframe to production in one tool. Design, build, and ship — all without leaving your browser.", styles: { fontSize: "20px", color: "#6b7280", maxWidth: "620px", margin: "0 auto 40px", lineHeight: "1.6" } },
          { id: "lp-cta1", type: "button", category: "Basic", label: "CTA", content: "Start Free — No Credit Card", styles: { padding: "18px 44px", fontSize: "16px", fontWeight: "700", borderRadius: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "none" } },
        ]},
        { id: "lp-features", type: "body", label: "Features", styles: { padding: "100px 40px", backgroundColor: "#f8fafc" }, components: [
          { id: "lp-f-h", type: "heading", category: "Text", label: "Title", content: "Why teams choose Prism", styles: { fontSize: "44px", fontWeight: "800", textAlign: "center", margin: "16px 0 56px 0", letterSpacing: "-0.02em" } },
          { id: "lp-f1", type: "feature-card", category: "Layout", label: "Feature", styles: {}, props: { icon: "🎯", title: "Pixel Perfect Design", description: "Advanced layout engine with snap-to-grid and responsive breakpoints." } },
          { id: "lp-f2", type: "feature-card", category: "Layout", label: "Feature", styles: {}, props: { icon: "⚡", title: "One-Click Deploy", description: "Deploy to a global CDN with automatic SSL and custom domains." } },
          { id: "lp-f3", type: "feature-card", category: "Layout", label: "Feature", styles: {}, props: { icon: "🤝", title: "Real-time Collaboration", description: "Multiplayer editing with live cursors, comments, and version history." } },
        ]},
        lightFooter,
      ],
    },
  },
  // ── 12. Community ──
  {
    name: "Community",
    description: "Vibrant social platform with activity feed, member showcase, features, and community testimonials",
    category: "social",
    thumbnail: "🟣",
    tags: ["community", "social", "platform", "members"],
    installs: 278,
    schema: {
      id: "page-community", name: "Community",
      sections: [
        { id: "com-nav", type: "header", label: "Navigation", styles: { padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#7c3aed", color: "#ffffff" }, components: [
          { id: "com-logo", type: "heading", category: "Text", label: "Logo", content: "🟣 Commune", styles: { fontSize: "22px", fontWeight: "800" } },
          { id: "com-links", type: "paragraph", category: "Text", label: "Nav", content: "Feed   Events   Members   Resources   About", styles: { fontSize: "14px", opacity: "0.8", fontWeight: "500" } },
        ]},
        { id: "com-hero", type: "body", label: "Hero", styles: { padding: "100px 40px 80px", background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #5b21b6 70%, #4c1d95 100%)", color: "#ffffff", textAlign: "center" }, components: [
          { id: "com-h1", type: "heading", category: "Text", label: "Title", content: "Connect with\ncreators worldwide", styles: { fontSize: "56px", fontWeight: "800", lineHeight: "1.08", margin: "20px 0 16px 0", letterSpacing: "-0.02em" } },
          { id: "com-sub", type: "paragraph", category: "Text", label: "Subtitle", content: "Join a vibrant community of designers, developers, and makers building the future of the web.", styles: { fontSize: "18px", opacity: "0.8", maxWidth: "560px", margin: "0 auto 40px", lineHeight: "1.6" } },
          { id: "com-cta", type: "button", category: "Basic", label: "CTA", content: "Join the Community — Free", styles: { padding: "18px 44px", fontSize: "16px", fontWeight: "700", borderRadius: "12px", backgroundColor: "#ffffff", color: "#7c3aed", border: "none" } },
        ]},
        { id: "com-features", type: "body", label: "Why Join", styles: { padding: "100px 40px" }, components: [
          { id: "com-f-h", type: "heading", category: "Text", label: "Title", content: "Why join Commune?", styles: { fontSize: "40px", fontWeight: "800", textAlign: "center", margin: "0 0 56px 0" } },
          { id: "com-f1", type: "feature-card", category: "Layout", label: "Feature 1", styles: {}, props: { icon: "💬", title: "Discussion Forums", description: "Engage in thoughtful conversations across 50+ topic channels." } },
          { id: "com-f2", type: "feature-card", category: "Layout", label: "Feature 2", styles: {}, props: { icon: "🎓", title: "Weekly Workshops", description: "Free live workshops and AMAs with industry experts." } },
          { id: "com-f3", type: "feature-card", category: "Layout", label: "Feature 3", styles: {}, props: { icon: "🤝", title: "Mentorship Program", description: "Connect with experienced mentors who guide your growth." } },
        ]},
        lightFooter,
      ],
    },
  },
  // ── 13. Travel & Tourism ──
  {
    name: "Travel & Tourism",
    description: "Stunning travel agency site with destination showcases, trip packages, traveler testimonials, and booking CTAs",
    category: "business",
    thumbnail: "✈️",
    tags: ["travel", "tourism", "vacation", "booking", "destinations"],
    installs: 167,
    schema: {
      id: "page-travel", name: "Travel & Tourism",
      sections: [
        { id: "trv-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
          { id: "trv-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#0369a1" }, content: "✈️ Wanderlust", category: "Text" },
          { id: "trv-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Destinations   Packages   About   Blog   Contact", category: "Text" },
        ]},
        { id: "trv-hero", type: "body", label: "Hero", styles: { padding: "160px 40px 140px", textAlign: "center", background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 100%)", color: "#ffffff" }, components: [
          { id: "trv-h1", type: "heading", label: "Headline", styles: { fontSize: "72px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-0.02em" }, content: "Explore the World\nYour Way", category: "Text" },
          { id: "trv-sub", type: "paragraph", label: "Subtitle", styles: { color: "#bae6fd", margin: "24px auto 40px", fontSize: "18px", maxWidth: "560px", lineHeight: "1.6" }, content: "Curated travel experiences to 100+ destinations.", category: "Text" },
          { id: "trv-cta", type: "button", label: "CTA", styles: { color: "#0369a1", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#ffffff" }, content: "Explore Destinations", category: "Basic" },
        ]},
        { id: "trv-dest", type: "body", label: "Destinations", styles: { padding: "100px 40px", backgroundColor: "#f0f9ff" }, components: [
          { id: "trv-d-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#0c4a6e" }, content: "Top Destinations", category: "Text" },
          { id: "trv-d1", type: "feature-card", label: "Destination", props: { icon: "🏝️", title: "Bali, Indonesia", description: "Pristine beaches, ancient temples, and lush rice terraces. From $1,299/person." }, styles: {}, category: "Layout" },
          { id: "trv-d2", type: "feature-card", label: "Destination", props: { icon: "🗼", title: "Paris, France", description: "The City of Light — art, cuisine, and romance. From $1,599/person." }, styles: {}, category: "Layout" },
          { id: "trv-d3", type: "feature-card", label: "Destination", props: { icon: "🏔️", title: "Swiss Alps", description: "Breathtaking mountain scenery and world-class skiing. From $1,899/person." }, styles: {}, category: "Layout" },
        ]},
        { id: "trv-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#f8fafc" }, components: [
          { id: "trv-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 Wanderlust Travel Co. All rights reserved.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 14. Restaurant Delivery ──
  {
    name: "Restaurant Delivery",
    description: "Modern food delivery and restaurant ordering site with menu categories, featured dishes, and order CTAs",
    category: "food",
    thumbnail: "🍕",
    tags: ["restaurant", "delivery", "food", "ordering", "takeout"],
    installs: 234,
    schema: {
      id: "page-delivery", name: "Restaurant Delivery",
      sections: [
        { id: "del-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
          { id: "del-logo", type: "heading", label: "Logo", styles: { fontSize: "24px", fontWeight: "800", color: "#dc2626" }, content: "🍕 FreshBite", category: "Text" },
          { id: "del-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Menu   Specials   Delivery   About   Track Order", category: "Text" },
        ]},
        { id: "del-hero", type: "body", label: "Hero", styles: { padding: "120px 40px 100px", textAlign: "center", background: "linear-gradient(180deg, #fef2f2 0%, #fee2e2 50%, #fef2f2 100%)" }, components: [
          { id: "del-h1", type: "heading", label: "Headline", styles: { fontSize: "68px", fontWeight: "900", lineHeight: "1.05", color: "#991b1b" }, content: "Delicious Food\nAt Your Door", category: "Text" },
          { id: "del-sub", type: "paragraph", label: "Subtitle", styles: { color: "#dc2626", margin: "24px auto 40px", fontSize: "18px", maxWidth: "520px", lineHeight: "1.6" }, content: "Fresh ingredients, bold flavors, delivered in 30 minutes or less.", category: "Text" },
          { id: "del-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#dc2626" }, content: "Order Now — Free Delivery", category: "Basic" },
        ]},
        { id: "del-menu", type: "body", label: "Menu", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
          { id: "del-m-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#991b1b" }, content: "Our Menu", category: "Text" },
          { id: "del-m1", type: "feature-card", label: "Category", props: { icon: "🍕", title: "Artisan Pizzas", description: "Hand-tossed dough, San Marzano tomatoes, and premium toppings. From $12." }, styles: {}, category: "Layout" },
          { id: "del-m2", type: "feature-card", label: "Category", props: { icon: "🍔", title: "Gourmet Burgers", description: "Wagyu beef, brioche buns, house-made sauces, and crispy fries. From $14." }, styles: {}, category: "Layout" },
          { id: "del-m3", type: "feature-card", label: "Category", props: { icon: "🥗", title: "Fresh Salads & Bowls", description: "Farm-fresh greens, grains, and protein. From $10." }, styles: {}, category: "Layout" },
        ]},
        { id: "del-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#ffffff" }, components: [
          { id: "del-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 FreshBite. Open daily 11AM–11PM.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 15. SaaS Dashboard ──
  {
    name: "SaaS Dashboard",
    description: "Clean SaaS analytics dashboard landing page with feature highlights, integrations, metrics, and pricing",
    category: "tech",
    thumbnail: "📊",
    tags: ["saas", "dashboard", "analytics", "metrics", "software"],
    installs: 289,
    schema: {
      id: "page-saas-dash", name: "SaaS Dashboard",
      sections: [
        { id: "sd-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#09090b", color: "#ffffff" }, components: [
          { id: "sd-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700" }, content: "📊 Metrica", category: "Text" },
          { id: "sd-links", type: "paragraph", label: "Nav", styles: { opacity: "0.6", fontSize: "13px", fontWeight: "500" }, content: "Features   Integrations   Pricing   Docs   Login", category: "Text" },
        ]},
        { id: "sd-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #09090b 0%, #18181b 50%, #09090b 100%)", color: "#ffffff" }, components: [
          { id: "sd-h1", type: "heading", label: "Headline", styles: { fontSize: "68px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-0.03em" }, content: "Your data.\nBeautifully clear.", category: "Text" },
          { id: "sd-sub", type: "paragraph", label: "Subtitle", styles: { color: "#a1a1aa", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px", lineHeight: "1.6" }, content: "Real-time dashboards, custom reports, and AI insights — all in one platform.", category: "Text" },
          { id: "sd-cta", type: "button", label: "CTA", styles: { color: "#09090b", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#ffffff" }, content: "Start Free Trial", category: "Basic" },
        ]},
        { id: "sd-features", type: "body", label: "Features", styles: { padding: "100px 40px", backgroundColor: "#09090b", color: "#ffffff" }, components: [
          { id: "sd-f-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Built for modern teams", category: "Text" },
          { id: "sd-f1", type: "feature-card", label: "Feature", props: { icon: "📈", title: "Real-Time Analytics", description: "Live dashboards that update in milliseconds." }, styles: {}, category: "Layout" },
          { id: "sd-f2", type: "feature-card", label: "Feature", props: { icon: "🤖", title: "AI Insights", description: "Automated anomaly detection and natural language queries." }, styles: {}, category: "Layout" },
          { id: "sd-f3", type: "feature-card", label: "Feature", props: { icon: "🔌", title: "200+ Integrations", description: "Connect Postgres, Stripe, Google Analytics, and more." }, styles: {}, category: "Layout" },
        ]},
        { id: "sd-footer", type: "footer", label: "Footer", styles: { color: "#71717a", padding: "48px 40px", borderTop: "1px solid #27272a", textAlign: "center", backgroundColor: "#09090b" }, components: [
          { id: "sd-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.6" }, content: "© 2026 Metrica Inc. SOC 2 Compliant. GDPR Ready.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 16. Personal Blog ──
  {
    name: "Personal Blog",
    description: "Minimal personal blog with author bio, featured posts, newsletter signup, and clean reading experience",
    category: "content",
    thumbnail: "✍️",
    tags: ["blog", "personal", "writing", "journal", "newsletter"],
    installs: 195,
    schema: {
      id: "page-personal-blog", name: "Personal Blog",
      sections: [
        { id: "pb-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "20px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff" }, components: [
          { id: "pb-logo", type: "heading", label: "Logo", styles: { fontSize: "20px", fontWeight: "600", color: "#1c1917" }, content: "✍️ sarah writes", category: "Text" },
          { id: "pb-links", type: "paragraph", label: "Nav", styles: { opacity: "0.5", fontSize: "14px", fontWeight: "400", color: "#1c1917" }, content: "Essays   Projects   About   Newsletter", category: "Text" },
        ]},
        { id: "pb-hero", type: "body", label: "Hero", styles: { padding: "100px 40px 80px", maxWidth: "680px", margin: "0 auto", backgroundColor: "#ffffff" }, components: [
          { id: "pb-h1", type: "heading", label: "Headline", styles: { fontSize: "48px", fontWeight: "700", lineHeight: "1.15", color: "#1c1917" }, content: "Hi, I'm Sarah 👋", category: "Text" },
          { id: "pb-bio", type: "paragraph", label: "Bio", styles: { color: "#57534e", margin: "20px 0 0 0", fontSize: "18px", lineHeight: "1.8" }, content: "I write about technology, design, and the art of building things on the internet.", category: "Text" },
        ]},
        { id: "pb-posts", type: "body", label: "Latest Posts", styles: { padding: "60px 40px 80px", maxWidth: "680px", margin: "0 auto", backgroundColor: "#ffffff" }, components: [
          { id: "pb-p-h", type: "heading", label: "Title", styles: { margin: "0 0 32px 0", fontSize: "24px", fontWeight: "600", color: "#1c1917" }, content: "Latest Essays", category: "Text" },
          { id: "pb-p1", type: "paragraph", label: "Post", styles: { padding: "20px 0", fontSize: "16px", borderBottom: "1px solid #e7e5e4", color: "#1c1917" }, content: "Why I Quit Big Tech to Join a 5-Person Startup — Mar 2, 2026", category: "Text" },
          { id: "pb-p2", type: "paragraph", label: "Post", styles: { padding: "20px 0", fontSize: "16px", borderBottom: "1px solid #e7e5e4", color: "#1c1917" }, content: "The Case for Boring Technology in 2026 — Feb 18, 2026", category: "Text" },
          { id: "pb-p3", type: "paragraph", label: "Post", styles: { padding: "20px 0", fontSize: "16px", borderBottom: "1px solid #e7e5e4", color: "#1c1917" }, content: "Design Systems Are a Team Sport — Jan 30, 2026", category: "Text" },
        ]},
        { id: "pb-footer", type: "footer", label: "Footer", styles: { color: "#a8a29e", padding: "40px", textAlign: "center", backgroundColor: "#ffffff" }, components: [
          { id: "pb-f-text", type: "paragraph", label: "Footer", styles: { fontSize: "13px" }, content: "© 2026 Sarah Chen. Built with love and too much coffee.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 17. Job Board ──
  {
    name: "Job Board",
    description: "Professional job board with featured listings, category filters, and employer CTAs",
    category: "tech",
    thumbnail: "💼",
    tags: ["jobs", "careers", "hiring", "recruitment", "board"],
    installs: 178,
    schema: {
      id: "page-jobboard", name: "Job Board",
      sections: [
        { id: "jb-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
          { id: "jb-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#111827" }, content: "💼 HireFlow", category: "Text" },
          { id: "jb-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Browse Jobs   Companies   Salary Guide   Post a Job", category: "Text" },
        ]},
        { id: "jb-hero", type: "body", label: "Hero", styles: { padding: "120px 40px 100px", textAlign: "center", background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)" }, components: [
          { id: "jb-h1", type: "heading", label: "Headline", styles: { fontSize: "60px", fontWeight: "800", lineHeight: "1.08", color: "#111827" }, content: "Find Your Next\nGreat Opportunity", category: "Text" },
          { id: "jb-sub", type: "paragraph", label: "Subtitle", styles: { color: "#6b7280", margin: "24px auto 40px", fontSize: "18px", maxWidth: "520px" }, content: "10,000+ jobs from top companies. Updated daily.", category: "Text" },
          { id: "jb-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#111827" }, content: "Browse All Jobs", category: "Basic" },
        ]},
        { id: "jb-categories", type: "body", label: "Categories", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
          { id: "jb-c-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "36px", textAlign: "center", fontWeight: "800", color: "#111827" }, content: "Browse by Category", category: "Text" },
          { id: "jb-c1", type: "feature-card", label: "Category", props: { icon: "💻", title: "Engineering", description: "1,200+ roles in frontend, backend, DevOps, ML, and more." }, styles: {}, category: "Layout" },
          { id: "jb-c2", type: "feature-card", label: "Category", props: { icon: "🎨", title: "Design", description: "800+ roles in product design, UX research, and brand." }, styles: {}, category: "Layout" },
          { id: "jb-c3", type: "feature-card", label: "Category", props: { icon: "📈", title: "Marketing & Sales", description: "600+ roles in growth, content, partnerships, and revenue." }, styles: {}, category: "Layout" },
        ]},
        { id: "jb-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#f9fafb" }, components: [
          { id: "jb-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 HireFlow. Connecting talent with opportunity.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 18. Event & Conference ──
  {
    name: "Event & Conference",
    description: "Dynamic event conference site with speaker lineup, schedule, ticket tiers, and sponsor logos",
    category: "marketing",
    thumbnail: "🎤",
    tags: ["event", "conference", "summit", "speakers", "tickets"],
    installs: 153,
    schema: {
      id: "page-event", name: "Event & Conference",
      sections: [
        { id: "ev-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#0f172a", color: "#ffffff" }, components: [
          { id: "ev-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700" }, content: "🎤 DevSummit '26", category: "Text" },
          { id: "ev-links", type: "paragraph", label: "Nav", styles: { opacity: "0.6", fontSize: "13px", fontWeight: "500" }, content: "Speakers   Schedule   Tickets   Venue   Sponsors", category: "Text" },
        ]},
        { id: "ev-hero", type: "body", label: "Hero", styles: { padding: "160px 40px 140px", textAlign: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)", color: "#ffffff" }, components: [
          { id: "ev-h1", type: "heading", label: "Headline", styles: { fontSize: "72px", fontWeight: "900", lineHeight: "1.02", letterSpacing: "-0.03em" }, content: "The Future of\nDeveloper Tools", category: "Text" },
          { id: "ev-sub", type: "paragraph", label: "Subtitle", styles: { color: "#a5b4fc", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px" }, content: "3 days, 50+ speakers, 2000+ developers.", category: "Text" },
          { id: "ev-cta", type: "button", label: "CTA", styles: { color: "#0f172a", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#818cf8" }, content: "Get Early Bird Tickets — $199", category: "Basic" },
        ]},
        { id: "ev-speakers", type: "body", label: "Speakers", styles: { padding: "100px 40px", backgroundColor: "#0f172a", color: "#ffffff" }, components: [
          { id: "ev-s-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Featured Speakers", category: "Text" },
          { id: "ev-s1", type: "feature-card", label: "Speaker", props: { icon: "👩‍💻", title: "Sarah Chen", description: "CTO at Vercel — \"The Next Wave of Edge Computing\"" }, styles: {}, category: "Layout" },
          { id: "ev-s2", type: "feature-card", label: "Speaker", props: { icon: "👨‍💻", title: "Alex Rivera", description: "Co-founder of Linear — \"Building Products That Last\"" }, styles: {}, category: "Layout" },
        ]},
        { id: "ev-tickets", type: "body", label: "Tickets", styles: { padding: "100px 40px", backgroundColor: "#0f172a", color: "#ffffff" }, components: [
          { id: "ev-t-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Get Your Ticket", category: "Text" },
          { id: "ev-t1", type: "pricing-card", label: "Community", props: { name: "Community", price: "$199", period: " early bird", featured: false }, styles: {}, category: "Layout" },
          { id: "ev-t2", type: "pricing-card", label: "Pro", props: { name: "Pro", price: "$499", period: " all access", featured: true }, styles: {}, category: "Layout" },
          { id: "ev-t3", type: "pricing-card", label: "VIP", props: { name: "VIP", price: "$999", period: " + workshops", featured: false }, styles: {}, category: "Layout" },
        ]},
        { id: "ev-footer", type: "footer", label: "Footer", styles: { color: "#6366f1", padding: "48px 40px", borderTop: "1px solid #1e1b4b", textAlign: "center", backgroundColor: "#0f172a" }, components: [
          { id: "ev-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5", color: "#94a3b8" }, content: "© 2026 DevSummit. Organized by TechEvents Inc.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 19. Fitness & Gym ──
  {
    name: "Fitness & Gym",
    description: "High-energy fitness studio site with class schedules, trainer profiles, and membership plans",
    category: "business",
    thumbnail: "💪",
    tags: ["fitness", "gym", "health", "workout"],
    installs: 187,
    schema: {
      id: "page-fitness", name: "Fitness & Gym",
      sections: [
        { id: "fit-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#0f0f0f", color: "#ffffff" }, components: [
          { id: "fit-logo", type: "heading", label: "Logo", styles: { fontSize: "24px", fontWeight: "800", letterSpacing: "2px" }, content: "💪 IRONFIT", category: "Text" },
          { id: "fit-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500" }, content: "Classes   Trainers   Membership   Contact", category: "Text" },
        ]},
        { id: "fit-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", color: "#ffffff", background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)" }, components: [
          { id: "fit-h1", type: "heading", label: "Headline", styles: { fontSize: "72px", fontWeight: "900", lineHeight: "1.05" }, content: "Transform Your\nBody & Mind", category: "Text" },
          { id: "fit-sub", type: "paragraph", label: "Subtitle", styles: { color: "#94a3b8", margin: "24px auto 40px", fontSize: "18px", maxWidth: "560px" }, content: "State-of-the-art equipment, expert trainers, and 50+ weekly classes.", category: "Text" },
          { id: "fit-cta", type: "button", label: "CTA", styles: { color: "#0f0f0f", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "8px", backgroundColor: "#f59e0b" }, content: "Start Free Trial", category: "Basic" },
        ]},
        { id: "fit-classes", type: "body", label: "Classes", styles: { padding: "100px 40px", backgroundColor: "#0f0f0f", color: "#ffffff" }, components: [
          { id: "fit-cl-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Our Classes", category: "Text" },
          { id: "fit-cl1", type: "feature-card", label: "Class", props: { icon: "🏋️", title: "Strength Training", description: "Build muscle and increase power with guided weightlifting sessions." }, styles: {}, category: "Layout" },
          { id: "fit-cl2", type: "feature-card", label: "Class", props: { icon: "🧘", title: "Yoga & Flexibility", description: "Improve flexibility and find inner peace with expert instructors." }, styles: {}, category: "Layout" },
          { id: "fit-cl3", type: "feature-card", label: "Class", props: { icon: "🥊", title: "Boxing & HIIT", description: "High-intensity interval training combined with boxing techniques." }, styles: {}, category: "Layout" },
        ]},
        { id: "fit-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #1e293b", textAlign: "center", backgroundColor: "#0f0f0f" }, components: [
          { id: "fit-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.6" }, content: "© 2026 IRONFIT. All rights reserved.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 20. Real Estate ──
  {
    name: "Real Estate",
    description: "Professional real estate agency site with property listings, agent profiles, and contact forms",
    category: "business",
    thumbnail: "🏡",
    tags: ["real-estate", "property", "housing", "agent"],
    installs: 213,
    schema: {
      id: "page-realestate", name: "Real Estate",
      sections: [
        { id: "re-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
          { id: "re-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#1e3a5f" }, content: "🏡 HomeVista", category: "Text" },
          { id: "re-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Listings   Agents   Neighborhoods   Contact", category: "Text" },
        ]},
        { id: "re-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #1e3a5f 0%, #2d5a87 100%)", color: "#ffffff" }, components: [
          { id: "re-h1", type: "heading", label: "Headline", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08" }, content: "Find Your\nDream Home", category: "Text" },
          { id: "re-sub", type: "paragraph", label: "Subtitle", styles: { color: "#bfdbfe", margin: "24px auto 40px", fontSize: "18px", maxWidth: "520px" }, content: "Discover exceptional properties in the most sought-after neighborhoods.", category: "Text" },
          { id: "re-cta", type: "button", label: "CTA", styles: { color: "#1e3a5f", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#ffffff" }, content: "Browse Listings", category: "Basic" },
        ]},
        { id: "re-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#f8fafc" }, components: [
          { id: "re-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 HomeVista Realty. All rights reserved.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 21. Wedding ──
  {
    name: "Wedding",
    description: "Elegant wedding invitation site with couple story, event details, RSVP section, and registry links",
    category: "creative",
    thumbnail: "💍",
    tags: ["wedding", "invitation", "event", "love"],
    installs: 156,
    schema: {
      id: "page-wedding", name: "Wedding",
      sections: [
        { id: "wed-hero", type: "header", label: "Hero", styles: { padding: "160px 40px 140px", textAlign: "center", background: "linear-gradient(180deg, #fdf2f8 0%, #fff1f2 50%, #fdf2f8 100%)", color: "#881337" }, components: [
          { id: "wed-date", type: "paragraph", label: "Date", styles: { fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", opacity: "0.6", marginBottom: "24px" }, content: "September 15, 2026", category: "Text" },
          { id: "wed-h1", type: "heading", label: "Names", styles: { fontSize: "72px", fontWeight: "300", lineHeight: "1.1" }, content: "Emma & James", category: "Text" },
          { id: "wed-sub", type: "paragraph", label: "Subtitle", styles: { color: "#9f1239", margin: "20px auto 40px", fontSize: "18px", fontStyle: "italic" }, content: "We joyfully invite you to celebrate our wedding", category: "Text" },
        ]},
        { id: "wed-story", type: "body", label: "Our Story", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#ffffff" }, components: [
          { id: "wed-s-h", type: "heading", label: "Title", styles: { margin: "0 0 24px 0", fontSize: "36px", fontWeight: "300", color: "#881337" }, content: "Our Love Story", category: "Text" },
          { id: "wed-s-p", type: "paragraph", label: "Story", styles: { color: "#6b7280", margin: "0 auto", fontSize: "16px", maxWidth: "600px", lineHeight: "1.8" }, content: "We met on a rainy afternoon in October 2020 at a cozy bookshop downtown.", category: "Text" },
        ]},
        { id: "wed-rsvp", type: "body", label: "RSVP", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#ffffff" }, components: [
          { id: "wed-r-h", type: "heading", label: "RSVP", styles: { margin: "0 0 20px 0", fontSize: "36px", fontWeight: "300", color: "#881337" }, content: "RSVP", category: "Text" },
          { id: "wed-r-btn", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "600", borderRadius: "100px", backgroundColor: "#881337" }, content: "Respond Now", category: "Basic" },
        ]},
        { id: "wed-footer", type: "footer", label: "Footer", styles: { color: "#9f1239", padding: "48px 40px", textAlign: "center", backgroundColor: "#fdf2f8" }, components: [
          { id: "wed-f-text", type: "paragraph", label: "Footer", styles: { fontSize: "14px", fontStyle: "italic", opacity: "0.7" }, content: "With love, Emma & James ♡", category: "Text" },
        ]},
      ],
    },
  },
  // ── 22. Music & Band ──
  {
    name: "Music & Band",
    description: "Bold music artist site with album showcase, tour dates, merch section, and social links",
    category: "creative",
    thumbnail: "🎸",
    tags: ["music", "band", "artist", "tour", "album"],
    installs: 198,
    schema: {
      id: "page-music", name: "Music & Band",
      sections: [
        { id: "mus-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#000000", color: "#ffffff" }, components: [
          { id: "mus-logo", type: "heading", label: "Logo", styles: { fontSize: "24px", fontWeight: "900", letterSpacing: "3px" }, content: "🎸 ECHOES", category: "Text" },
          { id: "mus-links", type: "paragraph", label: "Nav", styles: { opacity: "0.6", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }, content: "Music   Tour   Videos   Merch   Contact", category: "Text" },
        ]},
        { id: "mus-hero", type: "body", label: "Hero", styles: { padding: "160px 40px 140px", textAlign: "center", background: "linear-gradient(180deg, #000000 0%, #1a0033 50%, #000000 100%)", color: "#ffffff" }, components: [
          { id: "mus-h1", type: "heading", label: "Headline", styles: { fontSize: "80px", fontWeight: "900", lineHeight: "1.0" }, content: "NEW ALBUM\nOUT NOW", category: "Text" },
          { id: "mus-sub", type: "paragraph", label: "Subtitle", styles: { color: "#a78bfa", margin: "24px auto 40px", fontSize: "18px", maxWidth: "500px" }, content: "\"Midnight Frequencies\" — 12 tracks of raw energy.", category: "Text" },
          { id: "mus-cta", type: "button", label: "CTA", styles: { color: "#000000", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "800", borderRadius: "100px", backgroundColor: "#a78bfa" }, content: "Listen Now", category: "Basic" },
        ]},
        { id: "mus-tour", type: "body", label: "Tour Dates", styles: { padding: "100px 40px", backgroundColor: "#0a0a0a", color: "#ffffff" }, components: [
          { id: "mus-t-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Tour Dates 2026", category: "Text" },
          { id: "mus-t1", type: "paragraph", label: "Date", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #333", textAlign: "center" }, content: "MAR 15 — Madison Square Garden, New York", category: "Text" },
          { id: "mus-t2", type: "paragraph", label: "Date", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #333", textAlign: "center" }, content: "APR 02 — The O2 Arena, London", category: "Text" },
        ]},
        { id: "mus-footer", type: "footer", label: "Footer", styles: { color: "#6b7280", padding: "48px 40px", textAlign: "center", backgroundColor: "#000000" }, components: [
          { id: "mus-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5", marginTop: "16px" }, content: "© 2026 ECHOES. All rights reserved.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 23. Non-Profit ──
  {
    name: "Non-Profit",
    description: "Impactful non-profit site with mission statement, impact statistics, volunteer signup, and donation CTA",
    category: "business",
    thumbnail: "🌍",
    tags: ["nonprofit", "charity", "volunteer", "donate"],
    installs: 142,
    schema: {
      id: "page-nonprofit", name: "Non-Profit",
      sections: [
        { id: "np-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
          { id: "np-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#065f46" }, content: "🌍 GreenHope", category: "Text" },
          { id: "np-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Mission   Impact   Volunteer   Donate", category: "Text" },
        ]},
        { id: "np-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #ecfdf5 100%)" }, components: [
          { id: "np-h1", type: "heading", label: "Headline", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08", color: "#065f46" }, content: "Building a Better\nWorld Together", category: "Text" },
          { id: "np-sub", type: "paragraph", label: "Subtitle", styles: { color: "#047857", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px" }, content: "Empowering communities through education, clean water, and sustainable development since 2005.", category: "Text" },
          { id: "np-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#065f46" }, content: "Donate Now", category: "Basic" },
        ]},
        { id: "np-impact", type: "body", label: "Impact", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
          { id: "np-i-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#065f46" }, content: "Our Impact", category: "Text" },
          { id: "np-i1", type: "feature-card", label: "Stat", props: { icon: "🎓", title: "50,000+ Students", description: "Quality education in underserved communities across 12 countries." }, styles: {}, category: "Layout" },
          { id: "np-i2", type: "feature-card", label: "Stat", props: { icon: "💧", title: "200+ Clean Wells", description: "Sustainable clean water systems serving over 100,000 people." }, styles: {}, category: "Layout" },
          { id: "np-i3", type: "feature-card", label: "Stat", props: { icon: "🌱", title: "1M Trees Planted", description: "Reforestation across Southeast Asia and Sub-Saharan Africa." }, styles: {}, category: "Layout" },
        ]},
        { id: "np-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#f8fafc" }, components: [
          { id: "np-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 GreenHope Foundation. 501(c)(3) Non-Profit.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 24. Education ──
  {
    name: "Education",
    description: "Modern online learning platform with course catalog, instructor profiles, and enrollment CTA",
    category: "tech",
    thumbnail: "📚",
    tags: ["education", "courses", "learning", "e-learning"],
    installs: 231,
    schema: {
      id: "page-education", name: "Education",
      sections: [
        { id: "edu-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
          { id: "edu-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#4f46e5" }, content: "📚 LearnHub", category: "Text" },
          { id: "edu-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Courses   Instructors   Pricing   Blog", category: "Text" },
        ]},
        { id: "edu-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #eef2ff 0%, #e0e7ff 50%, #eef2ff 100%)" }, components: [
          { id: "edu-h1", type: "heading", label: "Headline", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08", color: "#312e81" }, content: "Learn Without\nLimits", category: "Text" },
          { id: "edu-sub", type: "paragraph", label: "Subtitle", styles: { color: "#4338ca", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px" }, content: "500+ expert-led courses in tech, design, business, and more.", category: "Text" },
          { id: "edu-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#4f46e5" }, content: "Explore Courses", category: "Basic" },
        ]},
        { id: "edu-courses", type: "body", label: "Courses", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
          { id: "edu-c-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#312e81" }, content: "Popular Courses", category: "Text" },
          { id: "edu-c1", type: "feature-card", label: "Course", props: { icon: "💻", title: "Full-Stack Development", description: "Build modern web apps from frontend to backend. 40+ hours." }, styles: {}, category: "Layout" },
          { id: "edu-c2", type: "feature-card", label: "Course", props: { icon: "🎨", title: "UI/UX Design Mastery", description: "Learn design thinking, Figma, prototyping, and user research." }, styles: {}, category: "Layout" },
          { id: "edu-c3", type: "feature-card", label: "Course", props: { icon: "📈", title: "Data Science & AI", description: "Python, machine learning, neural networks, and real-world projects." }, styles: {}, category: "Layout" },
        ]},
        { id: "edu-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#ffffff" }, components: [
          { id: "edu-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 LearnHub. All rights reserved.", category: "Text" },
        ]},
      ],
    },
  },
  // ── 25. Medical & Healthcare ──
  {
    name: "Medical & Healthcare",
    description: "Professional healthcare site with services, doctor profiles, appointment booking, and patient trust stats",
    category: "business",
    thumbnail: "🏥",
    tags: ["medical", "healthcare", "doctor", "hospital", "clinic"],
    installs: 176,
    schema: {
      id: "page-medical", name: "Medical & Healthcare",
      sections: [
        { id: "med-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
          { id: "med-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#0e7490" }, content: "🏥 MediCare+", category: "Text" },
          { id: "med-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Services   Doctors   Appointments   Insurance   Contact", category: "Text" },
        ]},
        { id: "med-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #ecfeff 0%, #cffafe 50%, #ecfeff 100%)" }, components: [
          { id: "med-h1", type: "heading", label: "Headline", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08", color: "#164e63" }, content: "Your Health,\nOur Priority", category: "Text" },
          { id: "med-sub", type: "paragraph", label: "Subtitle", styles: { color: "#0e7490", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px" }, content: "Comprehensive healthcare with compassionate, patient-centered care.", category: "Text" },
          { id: "med-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#0e7490" }, content: "Book Appointment", category: "Basic" },
        ]},
        { id: "med-services", type: "body", label: "Services", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
          { id: "med-s-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#164e63" }, content: "Our Services", category: "Text" },
          { id: "med-s1", type: "feature-card", label: "Service", props: { icon: "🩺", title: "Primary Care", description: "Comprehensive health check-ups, preventive care, and chronic disease management." }, styles: {}, category: "Layout" },
          { id: "med-s2", type: "feature-card", label: "Service", props: { icon: "🫀", title: "Cardiology", description: "Advanced heart diagnostics, treatment plans, and cardiac rehabilitation." }, styles: {}, category: "Layout" },
          { id: "med-s3", type: "feature-card", label: "Service", props: { icon: "🧠", title: "Neurology", description: "Expert neurological assessment, brain health monitoring, and treatment." }, styles: {}, category: "Layout" },
        ]},
        { id: "med-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#ffffff" }, components: [
          { id: "med-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 MediCare+ Health System. All rights reserved.", category: "Text" },
        ]},
      ],
    },
  },
];

// ═══════════════════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════════════════

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse optional params
    const body = await req.json().catch(() => ({}));
    const mode = body.mode || "upsert"; // "upsert" (default) or "reset"
    const baseUrl = body.baseUrl || `${supabaseUrl.replace('.supabase.co', '')}.supabase.co/storage/v1/object/public/project-assets`;
    // Use a simple public base URL for preview images
    const previewBaseUrl = body.previewBaseUrl || "";

    // If reset mode, clear all existing templates first
    if (mode === "reset") {
      await supabase.from("templates").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    }

    // Get existing template names to avoid duplicates in upsert mode
    const { data: existing } = await supabase.from("templates").select("name");
    const existingNames = new Set((existing || []).map((t: any) => t.name));

    // Build insert rows with preview URLs
    const toInsert = templates
      .filter((t) => mode === "reset" || !existingNames.has(t.name))
      .map((t) => ({
        name: t.name,
        description: t.description,
        category: t.category,
        thumbnail: t.thumbnail,
        tags: t.tags,
        schema: t.schema,
        is_public: true,
        is_premium: false,
        author_id: null,
        installs: t.installs,
        preview_image_url: getPreviewUrl(t.name, previewBaseUrl),
      }));

    if (toInsert.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "All 25 templates already exist", inserted: 0, total: templates.length }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data, error } = await supabase
      .from("templates")
      .insert(toInsert)
      .select("id, name");

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        inserted: data?.length ?? 0,
        total: templates.length,
        mode,
        templates: data,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
