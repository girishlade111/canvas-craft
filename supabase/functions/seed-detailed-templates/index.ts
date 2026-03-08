import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/* ================================================================
   SHARED SECTION BUILDERS
   ================================================================ */
let _uid = 0;
const uid = (prefix: string) => `${prefix}-${++_uid}-${Date.now().toString(36)}`;

// ── Navigation ──
const nav = (logo: string, links: string, ctaText: string, style: "light" | "dark" | "transparent" = "light") => {
  const isDark = style === "dark";
  const isTrans = style === "transparent";
  return {
    id: uid("nav"),
    type: "header",
    label: "Navigation",
    styles: {
      display: "flex",
      padding: "16px 40px",
      alignItems: "center",
      justifyContent: "space-between",
      ...(isDark ? { backgroundColor: "#0f172a", color: "#ffffff" } : {}),
      ...(isTrans ? { backgroundColor: "transparent", color: "#ffffff", position: "absolute", width: "100%", zIndex: "50" } : {}),
      ...(!isDark && !isTrans ? { backgroundColor: "#ffffff", borderBottom: "1px solid #f1f5f9" } : {}),
    },
    components: [
      { id: uid("logo"), type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "800" }, content: logo, category: "Text" },
      { id: uid("nav-l"), type: "paragraph", label: "Nav Links", styles: { opacity: "0.7", fontSize: "14px", fontWeight: "500" }, content: links, category: "Text" },
      { id: uid("nav-cta"), type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "10px 28px", fontSize: "13px", fontWeight: "700", borderRadius: "100px", backgroundColor: isDark || isTrans ? "#6366f1" : "#0f172a" }, content: ctaText, category: "Basic" },
    ],
  };
};

// ── Hero ──
const hero = (headline: string, sub: string, cta: string, opts: { bg?: string; color?: string; badge?: string; align?: string; padding?: string } = {}) => {
  const comps: any[] = [];
  if (opts.badge) comps.push({ id: uid("badge"), type: "badge", label: "Badge", styles: {}, content: opts.badge, category: "Text" });
  comps.push(
    { id: uid("h1"), type: "heading", label: "Headline", styles: { margin: "20px 0", fontSize: "64px", fontWeight: "800", lineHeight: "1.08", letterSpacing: "-0.03em" }, content: headline, category: "Text" },
    { id: uid("sub"), type: "paragraph", label: "Subtitle", styles: { color: opts.color === "#ffffff" ? "rgba(255,255,255,0.7)" : "#6b7280", margin: "0 auto 40px", fontSize: "20px", maxWidth: "620px", lineHeight: "1.7" }, content: sub, category: "Text" },
    { id: uid("cta"), type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "12px", backgroundColor: "#6366f1" }, content: cta, category: "Basic" }
  );
  return {
    id: uid("hero"),
    type: "body",
    label: "Hero",
    styles: { padding: opts.padding || "120px 40px 100px", textAlign: opts.align || "center", background: opts.bg || "linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)", color: opts.color || "#0f172a" },
    components: comps,
  };
};

// ── Features (3 cards) ──
const features = (title: string, items: { icon: string; title: string; desc: string }[], opts: { bg?: string } = {}) => ({
  id: uid("feat"),
  type: "body",
  label: "Features",
  styles: { padding: "100px 40px", backgroundColor: opts.bg || "#f8fafc" },
  components: [
    { id: uid("feat-h"), type: "heading", label: "Title", styles: { margin: "0 0 56px 0", fontSize: "42px", textAlign: "center", fontWeight: "800", letterSpacing: "-0.02em" }, content: title, category: "Text" },
    ...items.map((it) => ({
      id: uid("fc"),
      type: "feature-card",
      label: "Feature",
      props: { icon: it.icon, title: it.title, description: it.desc },
      styles: {},
      category: "Layout",
    })),
  ],
});

// ── Testimonials ──
const testimonials = (title: string, items: { quote: string; name: string; role: string }[], opts: { bg?: string; color?: string } = {}) => ({
  id: uid("test"),
  type: "body",
  label: "Testimonials",
  styles: { padding: "100px 40px", backgroundColor: opts.bg || "#ffffff", color: opts.color || "#0f172a", textAlign: "center" },
  components: [
    { id: uid("test-h"), type: "heading", label: "Title", styles: { fontSize: "38px", fontWeight: "800", marginBottom: "56px", letterSpacing: "-0.02em" }, content: title, category: "Text" },
    ...items.map((t) => ({
      id: uid("tq"),
      type: "card",
      label: "Testimonial",
      styles: { padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "20px", textAlign: "left", backgroundColor: opts.bg === "#0f172a" ? "#1e293b" : "#f8fafc" },
      children: [
        { id: uid("q"), type: "paragraph", label: "Quote", styles: { fontSize: "16px", lineHeight: "1.7", fontStyle: "italic", marginBottom: "16px", color: opts.color === "#ffffff" ? "rgba(255,255,255,0.8)" : "#374151" }, content: `"${t.quote}"`, category: "Text" },
        { id: uid("n"), type: "paragraph", label: "Name", styles: { fontWeight: "700", fontSize: "14px", marginBottom: "2px" }, content: t.name, category: "Text" },
        { id: uid("r"), type: "paragraph", label: "Role", styles: { fontSize: "13px", color: opts.color === "#ffffff" ? "rgba(255,255,255,0.5)" : "#9ca3af" }, content: t.role, category: "Text" },
      ],
      category: "Layout",
    })),
  ],
});

// ── Stats ──
const stats = (items: { value: string; label: string }[], opts: { bg?: string; color?: string } = {}) => ({
  id: uid("stats"),
  type: "body",
  label: "Stats",
  styles: { padding: "80px 40px", backgroundColor: opts.bg || "#0f172a", color: opts.color || "#ffffff", textAlign: "center", display: "flex", justifyContent: "center", gap: "80px", flexWrap: "wrap" },
  components: items.map((s) => ({
    id: uid("st"),
    type: "card",
    label: "Stat",
    styles: { textAlign: "center" },
    children: [
      { id: uid("sv"), type: "heading", label: "Value", styles: { fontSize: "48px", fontWeight: "800", marginBottom: "8px" }, content: s.value, category: "Text" },
      { id: uid("sl"), type: "paragraph", label: "Label", styles: { fontSize: "14px", opacity: "0.7", textTransform: "uppercase", letterSpacing: "2px" }, content: s.label, category: "Text" },
    ],
    category: "Layout",
  })),
});

// ── CTA Banner ──
const ctaBanner = (title: string, sub: string, btnText: string, opts: { bg?: string } = {}) => ({
  id: uid("cta-b"),
  type: "body",
  label: "CTA",
  styles: { padding: "100px 40px", textAlign: "center", background: opts.bg || "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)", color: "#ffffff" },
  components: [
    { id: uid("cta-h"), type: "heading", label: "Title", styles: { fontSize: "44px", fontWeight: "800", marginBottom: "20px", letterSpacing: "-0.02em" }, content: title, category: "Text" },
    { id: uid("cta-s"), type: "paragraph", label: "Sub", styles: { fontSize: "18px", maxWidth: "560px", margin: "0 auto 36px", opacity: "0.9", lineHeight: "1.7" }, content: sub, category: "Text" },
    { id: uid("cta-btn"), type: "button", label: "CTA", styles: { color: "#6366f1", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "12px", backgroundColor: "#ffffff" }, content: btnText, category: "Basic" },
  ],
});

// ── Pricing (3 tiers) ──
const pricing = (title: string, tiers: { name: string; price: string; features: string; highlighted?: boolean }[]) => ({
  id: uid("price"),
  type: "body",
  label: "Pricing",
  styles: { padding: "100px 40px", backgroundColor: "#ffffff", textAlign: "center" },
  components: [
    { id: uid("price-h"), type: "heading", label: "Title", styles: { fontSize: "42px", fontWeight: "800", marginBottom: "56px", letterSpacing: "-0.02em" }, content: title, category: "Text" },
    ...tiers.map((t) => ({
      id: uid("tier"),
      type: "card",
      label: t.name,
      styles: {
        padding: "40px 32px",
        borderRadius: "20px",
        border: t.highlighted ? "2px solid #6366f1" : "1px solid #e2e8f0",
        textAlign: "center",
        marginBottom: "20px",
        backgroundColor: t.highlighted ? "#f5f3ff" : "#ffffff",
        boxShadow: t.highlighted ? "0 20px 40px rgba(99,102,241,0.12)" : "none",
      },
      children: [
        { id: uid("tn"), type: "heading", label: "Plan", styles: { fontSize: "20px", fontWeight: "700", marginBottom: "8px" }, content: t.name, category: "Text" },
        { id: uid("tp"), type: "heading", label: "Price", styles: { fontSize: "48px", fontWeight: "800", marginBottom: "24px", color: "#6366f1" }, content: t.price, category: "Text" },
        { id: uid("tf"), type: "paragraph", label: "Features", styles: { fontSize: "14px", lineHeight: "2.2", color: "#6b7280" }, content: t.features, category: "Text" },
        { id: uid("tb"), type: "button", label: "CTA", styles: { color: t.highlighted ? "#ffffff" : "#6366f1", border: t.highlighted ? "none" : "2px solid #6366f1", padding: "14px 40px", fontSize: "14px", fontWeight: "700", borderRadius: "12px", backgroundColor: t.highlighted ? "#6366f1" : "transparent", marginTop: "24px" }, content: "Get Started", category: "Basic" },
      ],
      category: "Layout",
    })),
  ],
});

// ── Team ──
const team = (title: string, members: { name: string; role: string; emoji: string }[]) => ({
  id: uid("team"),
  type: "body",
  label: "Team",
  styles: { padding: "100px 40px", backgroundColor: "#f8fafc", textAlign: "center" },
  components: [
    { id: uid("team-h"), type: "heading", label: "Title", styles: { fontSize: "42px", fontWeight: "800", marginBottom: "56px" }, content: title, category: "Text" },
    ...members.map((m) => ({
      id: uid("tm"),
      type: "card",
      label: m.name,
      styles: { textAlign: "center", padding: "32px", borderRadius: "16px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", marginBottom: "16px" },
      children: [
        { id: uid("ta"), type: "paragraph", label: "Avatar", styles: { fontSize: "48px", marginBottom: "12px" }, content: m.emoji, category: "Text" },
        { id: uid("tname"), type: "heading", label: "Name", styles: { fontSize: "18px", fontWeight: "700", marginBottom: "4px" }, content: m.name, category: "Text" },
        { id: uid("trole"), type: "paragraph", label: "Role", styles: { fontSize: "13px", color: "#9ca3af" }, content: m.role, category: "Text" },
      ],
      category: "Layout",
    })),
  ],
});

// ── Gallery / Portfolio grid ──
const gallery = (title: string, items: { emoji: string; label: string }[]) => ({
  id: uid("gal"),
  type: "body",
  label: "Gallery",
  styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#ffffff" },
  components: [
    { id: uid("gal-h"), type: "heading", label: "Title", styles: { fontSize: "42px", fontWeight: "800", marginBottom: "48px" }, content: title, category: "Text" },
    ...items.map((g) => ({
      id: uid("gi"),
      type: "card",
      label: g.label,
      styles: { padding: "48px 24px", borderRadius: "16px", backgroundColor: "#f8fafc", border: "1px solid #f1f5f9", textAlign: "center", marginBottom: "16px" },
      children: [
        { id: uid("ge"), type: "paragraph", label: "Emoji", styles: { fontSize: "48px", marginBottom: "12px" }, content: g.emoji, category: "Text" },
        { id: uid("gl"), type: "paragraph", label: "Label", styles: { fontWeight: "600", fontSize: "14px" }, content: g.label, category: "Text" },
      ],
      category: "Layout",
    })),
  ],
});

// ── FAQ ──
const faq = (title: string, items: { q: string; a: string }[]) => ({
  id: uid("faq"),
  type: "body",
  label: "FAQ",
  styles: { padding: "100px 40px", backgroundColor: "#ffffff", maxWidth: "720px", margin: "0 auto" },
  components: [
    { id: uid("faq-h"), type: "heading", label: "Title", styles: { fontSize: "38px", fontWeight: "800", marginBottom: "48px", textAlign: "center" }, content: title, category: "Text" },
    ...items.map((f) => ({
      id: uid("fqi"),
      type: "card",
      label: "FAQ",
      styles: { padding: "24px 0", borderBottom: "1px solid #f1f5f9" },
      children: [
        { id: uid("fq"), type: "heading", label: "Q", styles: { fontSize: "17px", fontWeight: "700", marginBottom: "8px" }, content: f.q, category: "Text" },
        { id: uid("fa"), type: "paragraph", label: "A", styles: { fontSize: "15px", lineHeight: "1.7", color: "#6b7280" }, content: f.a, category: "Text" },
      ],
      category: "Layout",
    })),
  ],
});

// ── Newsletter ──
const newsletter = (title: string, sub: string, opts: { bg?: string } = {}) => ({
  id: uid("news"),
  type: "body",
  label: "Newsletter",
  styles: { padding: "80px 40px", textAlign: "center", backgroundColor: opts.bg || "#f0f9ff" },
  components: [
    { id: uid("news-h"), type: "heading", label: "Title", styles: { fontSize: "32px", fontWeight: "800", marginBottom: "12px" }, content: title, category: "Text" },
    { id: uid("news-s"), type: "paragraph", label: "Sub", styles: { fontSize: "16px", color: "#6b7280", marginBottom: "28px", maxWidth: "480px", margin: "0 auto 28px" }, content: sub, category: "Text" },
    { id: uid("news-i"), type: "form-input", label: "Email", props: { placeholder: "Enter your email", type: "email" }, styles: { maxWidth: "360px", margin: "0 auto 12px" }, category: "Form" },
    { id: uid("news-b"), type: "button", label: "Subscribe", styles: { color: "#ffffff", border: "none", padding: "14px 40px", fontSize: "14px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#6366f1" }, content: "Subscribe", category: "Basic" },
  ],
});

// ── Footer ──
const footer = (style: "light" | "dark" = "light") => {
  const isDark = style === "dark";
  return {
    id: uid("footer"),
    type: "footer",
    label: "Footer",
    styles: {
      color: isDark ? "#94a3b8" : "#64748b",
      padding: "64px 40px 32px",
      textAlign: "center",
      backgroundColor: isDark ? "#020617" : "#f8fafc",
      borderTop: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
    },
    components: [
      { id: uid("fl"), type: "paragraph", label: "Links", styles: { opacity: "0.7", fontSize: "13px", marginBottom: "20px", letterSpacing: "0.5px" }, content: "Home   About   Services   Blog   Contact   Privacy   Terms", category: "Text" },
      { id: uid("fs"), type: "social-icons", label: "Social", props: { size: "28", layout: "horizontal" }, styles: {}, category: "Widgets" },
      { id: uid("fd"), type: "divider", label: "Divider", styles: { width: "100%", height: "1px", margin: "24px 0", backgroundColor: isDark ? "#1e293b" : "#e2e8f0" }, category: "Basic" },
      { id: uid("fc"), type: "paragraph", label: "Copyright", styles: { opacity: "0.5", fontSize: "12px" }, content: "© 2026 All rights reserved.", category: "Text" },
    ],
  };
};

// ── Services ──
const services = (title: string, items: { icon: string; name: string; desc: string; price?: string }[], opts: { bg?: string } = {}) => ({
  id: uid("svc"),
  type: "body",
  label: "Services",
  styles: { padding: "100px 40px", backgroundColor: opts.bg || "#ffffff", textAlign: "center" },
  components: [
    { id: uid("svc-h"), type: "heading", label: "Title", styles: { fontSize: "42px", fontWeight: "800", marginBottom: "56px" }, content: title, category: "Text" },
    ...items.map((s) => ({
      id: uid("si"),
      type: "card",
      label: s.name,
      styles: { padding: "36px", borderRadius: "16px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", marginBottom: "16px", textAlign: "left" },
      children: [
        { id: uid("sic"), type: "paragraph", label: "Icon", styles: { fontSize: "36px", marginBottom: "16px" }, content: s.icon, category: "Text" },
        { id: uid("sin"), type: "heading", label: "Name", styles: { fontSize: "20px", fontWeight: "700", marginBottom: "8px" }, content: s.name, category: "Text" },
        { id: uid("sid"), type: "paragraph", label: "Desc", styles: { fontSize: "14px", lineHeight: "1.7", color: "#6b7280", marginBottom: s.price ? "12px" : "0" }, content: s.desc, category: "Text" },
        ...(s.price ? [{ id: uid("sip"), type: "paragraph", label: "Price", styles: { fontSize: "18px", fontWeight: "800", color: "#6366f1" }, content: s.price, category: "Text" }] : []),
      ],
      category: "Layout",
    })),
  ],
});

// ── Contact ──
const contact = (title: string, sub: string) => ({
  id: uid("contact"),
  type: "body",
  label: "Contact",
  styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#f8fafc" },
  components: [
    { id: uid("ct-h"), type: "heading", label: "Title", styles: { fontSize: "38px", fontWeight: "800", marginBottom: "12px" }, content: title, category: "Text" },
    { id: uid("ct-s"), type: "paragraph", label: "Sub", styles: { fontSize: "16px", color: "#6b7280", marginBottom: "36px", maxWidth: "480px", margin: "0 auto 36px" }, content: sub, category: "Text" },
    { id: uid("ct-n"), type: "form-input", label: "Name", props: { placeholder: "Your Name" }, styles: { maxWidth: "480px", margin: "0 auto 12px" }, category: "Form" },
    { id: uid("ct-e"), type: "form-input", label: "Email", props: { placeholder: "Your Email", type: "email" }, styles: { maxWidth: "480px", margin: "0 auto 12px" }, category: "Form" },
    { id: uid("ct-m"), type: "form-input", label: "Message", props: { placeholder: "Your Message" }, styles: { maxWidth: "480px", margin: "0 auto 12px", minHeight: "120px" }, category: "Form" },
    { id: uid("ct-b"), type: "button", label: "Send", styles: { color: "#ffffff", border: "none", padding: "16px 48px", fontSize: "14px", fontWeight: "700", borderRadius: "12px", backgroundColor: "#6366f1" }, content: "Send Message", category: "Basic" },
  ],
});

// ── Product grid section ──
const productShowcase = (title: string, items: { emoji: string; name: string; price: string; desc: string }[]) => ({
  id: uid("prod"),
  type: "body",
  label: "Products",
  styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#ffffff" },
  components: [
    { id: uid("prod-h"), type: "heading", label: "Title", styles: { fontSize: "42px", fontWeight: "800", marginBottom: "56px" }, content: title, category: "Text" },
    ...items.map((p) => ({
      id: uid("pi"),
      type: "card",
      label: p.name,
      styles: { padding: "24px", borderRadius: "16px", border: "1px solid #f1f5f9", textAlign: "center", marginBottom: "16px", backgroundColor: "#fafafa" },
      children: [
        { id: uid("pe"), type: "paragraph", label: "Image", styles: { fontSize: "56px", marginBottom: "16px" }, content: p.emoji, category: "Text" },
        { id: uid("pn"), type: "heading", label: "Name", styles: { fontSize: "18px", fontWeight: "700", marginBottom: "4px" }, content: p.name, category: "Text" },
        { id: uid("pd"), type: "paragraph", label: "Desc", styles: { fontSize: "13px", color: "#9ca3af", marginBottom: "12px" }, content: p.desc, category: "Text" },
        { id: uid("pp"), type: "paragraph", label: "Price", styles: { fontSize: "22px", fontWeight: "800", color: "#6366f1" }, content: p.price, category: "Text" },
      ],
      category: "Layout",
    })),
  ],
});

// ── Menu section (food) ──
const menuSection = (title: string, items: { name: string; desc: string; price: string }[], opts: { bg?: string } = {}) => ({
  id: uid("menu"),
  type: "body",
  label: "Menu",
  styles: { padding: "80px 40px", backgroundColor: opts.bg || "#ffffff" },
  components: [
    { id: uid("menu-h"), type: "heading", label: "Title", styles: { fontSize: "36px", fontWeight: "700", marginBottom: "40px", textAlign: "center", fontFamily: "serif" }, content: title, category: "Text" },
    ...items.map((m) => ({
      id: uid("mi"),
      type: "card",
      label: m.name,
      styles: { padding: "20px 0", borderBottom: "1px dotted #d1d5db", display: "flex", justifyContent: "space-between", alignItems: "center" },
      children: [
        { id: uid("mn"), type: "heading", label: "Name", styles: { fontSize: "17px", fontWeight: "600" }, content: m.name, category: "Text" },
        { id: uid("md"), type: "paragraph", label: "Desc", styles: { fontSize: "13px", color: "#9ca3af", marginTop: "4px" }, content: m.desc, category: "Text" },
        { id: uid("mp"), type: "paragraph", label: "Price", styles: { fontSize: "18px", fontWeight: "700", color: "#b45309" }, content: m.price, category: "Text" },
      ],
      category: "Layout",
    })),
  ],
});

/* ================================================================
   PREVIEW URL HELPER
   ================================================================ */
const PREVIEW_MAP: Record<string, string> = {
  saas: "saas-preview.jpg", landing: "landing-preview.jpg", portfolio: "portfolio-preview.jpg",
  ecommerce: "ecommerce-preview.jpg", blog: "blog-preview.jpg", agency: "agency-preview.jpg",
  enterprise: "enterprise-preview.jpg", restaurant: "restaurant-preview.jpg", dashboard: "dashboard-preview.jpg",
  community: "community-preview.jpg", fitness: "fitness-preview.jpg", education: "education-preview.jpg",
  music: "music-preview.jpg", travel: "travel-preview.jpg", wedding: "wedding-preview.jpg",
  event: "event-preview.jpg", nonprofit: "nonprofit-preview.jpg", realestate: "realestate-preview.jpg",
  jobboard: "jobboard-preview.jpg",
};
const matchPreview = (name: string, category: string): string | null => {
  const lower = (name + " " + category).toLowerCase();
  for (const [kw, file] of Object.entries(PREVIEW_MAP)) {
    if (lower.includes(kw)) return `/templates/${file}`;
  }
  return null;
};

/* ================================================================
   TEMPLATE DEFINITIONS — 4-5 per category
   ================================================================ */
const allTemplates: any[] = [];
const add = (name: string, description: string, category: string, thumbnail: string, tags: string[], sections: any[], installBase = 100) => {
  _uid = 0; // Reset per template for clean IDs
  const builtSections = sections.map((fn: any) => (typeof fn === "function" ? fn() : fn));
  allTemplates.push({
    name,
    description,
    category,
    thumbnail,
    is_public: true,
    is_premium: false,
    tags,
    installs: installBase + Math.floor(Math.random() * 300),
    schema: { id: `page-${name.toLowerCase().replace(/\s+/g, "-")}`, name, sections: builtSections },
  });
};

// ═══════════════════════════════════════
// STARTER (5 templates)
// ═══════════════════════════════════════
add("Starter Blank Pro", "Clean blank canvas with professional navigation, hero placeholder, and footer ready for customization", "starter", "📄",
  ["starter", "blank", "minimal"],
  [
    () => nav("🚀 MyApp", "Home   About   Contact", "Get Started"),
    () => hero("Start Building\nSomething Amazing", "A clean canvas ready for your ideas. Add sections, drag components, and bring your vision to life.", "Start Building"),
    () => features("Quick Start Features", [
      { icon: "🎨", title: "Drag & Drop", desc: "Intuitive visual editor with 500+ components to build any layout." },
      { icon: "⚡", title: "Lightning Fast", desc: "Optimized performance with lazy loading and code splitting." },
      { icon: "📱", title: "Fully Responsive", desc: "Looks perfect on every device from mobile to 4K displays." },
    ]),
    () => footer("light"),
  ], 50
);

add("Starter Portfolio Card", "Minimal personal card layout with intro, skills, social links, and contact form", "starter", "👤",
  ["starter", "personal", "card", "portfolio"],
  [
    () => nav("✦ John Doe", "About   Skills   Contact", "Hire Me"),
    () => hero("Hi, I'm John 👋", "A creative developer passionate about building beautiful digital experiences. Let's create something extraordinary together.", "View My Work", { bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#ffffff" }),
    () => features("My Skills", [
      { icon: "💻", title: "Frontend Development", desc: "React, TypeScript, Next.js — building performant, accessible web applications." },
      { icon: "🎨", title: "UI/UX Design", desc: "Figma, prototyping, and design systems that scale." },
      { icon: "🔧", title: "Backend & APIs", desc: "Node.js, PostgreSQL, GraphQL — robust server-side solutions." },
    ]),
    () => contact("Let's Work Together", "Have a project in mind? I'd love to hear about it."),
    () => footer("light"),
  ], 80
);

add("Starter Blog", "Simple blog starter with featured post, recent articles, newsletter signup, and about section", "starter", "📝",
  ["starter", "blog", "content", "writing"],
  [
    () => nav("✍️ MyBlog", "Articles   Categories   About   Subscribe", "New Post"),
    () => hero("Stories Worth Reading", "Exploring ideas at the intersection of technology, design, and human experience.", "Read Latest", { bg: "#ffffff" }),
    () => features("Popular Categories", [
      { icon: "💡", title: "Technology", desc: "Latest trends in AI, web development, and emerging tech." },
      { icon: "🎨", title: "Design", desc: "UI/UX principles, typography, color theory, and visual storytelling." },
      { icon: "📈", title: "Productivity", desc: "Workflows, tools, and habits for getting more done." },
    ]),
    () => newsletter("Stay in the Loop", "Get the best articles delivered to your inbox every week. No spam, ever."),
    () => footer("light"),
  ], 70
);

add("Starter Dashboard", "Admin dashboard starter with stats overview, feature cards, and modern navigation", "starter", "📊",
  ["starter", "dashboard", "admin", "analytics"],
  [
    () => nav("📊 Dashboard", "Overview   Analytics   Users   Settings", "Upgrade"),
    () => stats([
      { value: "12,847", label: "Total Users" },
      { value: "$48.2K", label: "Revenue" },
      { value: "99.9%", label: "Uptime" },
      { value: "4.8★", label: "Rating" },
    ]),
    () => features("Platform Features", [
      { icon: "📈", title: "Real-time Analytics", desc: "Monitor your metrics with live dashboards and custom reports." },
      { icon: "👥", title: "Team Management", desc: "Invite team members, assign roles, and collaborate seamlessly." },
      { icon: "🔒", title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption and SSO." },
    ]),
    () => ctaBanner("Upgrade to Pro", "Unlock advanced analytics, unlimited team members, and priority support.", "Upgrade Now"),
    () => footer("dark"),
  ], 90
);

add("Starter Coming Soon", "Pre-launch landing with countdown feel, email capture, and social links", "starter", "⏳",
  ["starter", "coming-soon", "launch", "waitlist"],
  [
    () => nav("✦ LaunchSoon", "About   FAQ", "Notify Me"),
    () => hero("Something Big\nis Coming", "We're building the next generation of creative tools. Be the first to know when we launch.", "Join the Waitlist", { bg: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)", color: "#ffffff", badge: "🚀 Launching Q2 2026" }),
    () => stats([
      { value: "5,200+", label: "Waitlist Signups" },
      { value: "28", label: "Days to Launch" },
      { value: "12", label: "Beta Partners" },
    ]),
    () => faq("Common Questions", [
      { q: "When will you launch?", a: "We're targeting Q2 2026 for our public launch. Beta access starts earlier for waitlist members." },
      { q: "Is it free to join the waitlist?", a: "Absolutely! Joining the waitlist is completely free and gets you early access." },
      { q: "What makes this different?", a: "We're combining AI-powered design with an intuitive drag-and-drop builder for the first time." },
    ]),
    () => footer("dark"),
  ], 60
);

// ═══════════════════════════════════════
// BUSINESS (5 templates)
// ═══════════════════════════════════════
add("Consulting Firm", "Professional consulting website with services, team profiles, case studies, testimonials, and contact", "business", "🏢",
  ["business", "consulting", "corporate", "professional"],
  [
    () => nav("◆ Apex Consulting", "Services   Team   Case Studies   Contact", "Free Consultation"),
    () => hero("Strategic Consulting\nfor Modern Business", "We help organizations transform, grow, and achieve operational excellence with data-driven strategies.", "Book a Call", { bg: "linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)" }),
    () => stats([
      { value: "500+", label: "Clients Served" },
      { value: "98%", label: "Client Retention" },
      { value: "$2.1B", label: "Revenue Generated" },
      { value: "15+", label: "Years Experience" },
    ]),
    () => services("Our Services", [
      { icon: "📊", name: "Strategy & Planning", desc: "Comprehensive business strategy development with market analysis and competitive positioning.", price: "From $5,000" },
      { icon: "🔄", name: "Digital Transformation", desc: "End-to-end digital transformation including process automation and technology adoption.", price: "From $15,000" },
      { icon: "📈", name: "Growth Advisory", desc: "Revenue optimization, market expansion, and scaling strategies for high-growth companies.", price: "From $8,000" },
      { icon: "🤝", name: "Change Management", desc: "Organizational restructuring, culture building, and leadership development programs.", price: "From $10,000" },
    ]),
    () => team("Leadership Team", [
      { name: "Alexandra Chen", role: "Managing Partner", emoji: "👩‍💼" },
      { name: "Marcus Rivera", role: "Strategy Director", emoji: "👨‍💼" },
      { name: "Sarah Johnson", role: "Operations Lead", emoji: "👩‍💻" },
      { name: "David Kim", role: "Analytics Head", emoji: "👨‍🔬" },
    ]),
    () => testimonials("Client Success Stories", [
      { quote: "Apex transformed our operations and increased revenue by 340% in just 18 months.", name: "Emily Foster", role: "CEO, TechVentures Inc." },
      { quote: "The strategic insights were invaluable. They don't just consult — they partner with you.", name: "Robert Chen", role: "Founder, ScaleUp Labs" },
      { quote: "Best investment we've made. The ROI exceeded our most optimistic projections.", name: "Lisa Patel", role: "COO, GrowthPoint" },
    ]),
    () => ctaBanner("Ready to Transform Your Business?", "Schedule a free 30-minute strategy call with our senior consultants.", "Book Free Consultation"),
    () => footer("dark"),
  ], 280
);

add("Law Office", "Professional law firm website with practice areas, attorney profiles, case results, and consultation form", "business", "⚖️",
  ["business", "legal", "law", "attorney"],
  [
    () => nav("⚖️ Sterling & Associates", "Practice Areas   Attorneys   Results   Contact", "Free Consultation"),
    () => hero("Justice.\nIntegrity.\nResults.", "Over 30 years of legal excellence. Our attorneys fight tirelessly for the outcomes you deserve.", "Schedule Consultation", { bg: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)", color: "#ffffff" }),
    () => stats([
      { value: "5,000+", label: "Cases Won" },
      { value: "$800M+", label: "Recovered" },
      { value: "30+", label: "Years Experience" },
      { value: "98%", label: "Success Rate" },
    ]),
    () => services("Practice Areas", [
      { icon: "🏛️", name: "Corporate Law", desc: "Mergers, acquisitions, compliance, and corporate governance for businesses of all sizes." },
      { icon: "🏠", name: "Real Estate Law", desc: "Commercial and residential transactions, disputes, zoning, and property development." },
      { icon: "👨‍👩‍👧‍👦", name: "Family Law", desc: "Divorce, custody, adoption, and family dispute resolution with compassion and discretion." },
      { icon: "💼", name: "Employment Law", desc: "Workplace discrimination, wrongful termination, contracts, and labor compliance." },
    ]),
    () => team("Our Attorneys", [
      { name: "James Sterling", role: "Senior Partner — Corporate", emoji: "👨‍⚖️" },
      { name: "Maria Gonzalez", role: "Partner — Family Law", emoji: "👩‍⚖️" },
      { name: "Thomas Wright", role: "Associate — Real Estate", emoji: "🧑‍⚖️" },
    ]),
    () => testimonials("Client Testimonials", [
      { quote: "Sterling & Associates handled our complex merger flawlessly. Exceptional legal expertise.", name: "Mark Thompson", role: "CEO, Nexus Corp" },
      { quote: "They fought for my family when we needed it most. Compassionate and brilliant.", name: "Amanda Liu", role: "Private Client" },
    ]),
    () => contact("Request a Consultation", "Tell us about your case. All consultations are confidential."),
    () => footer("dark"),
  ], 220
);

add("Accounting Firm", "Professional accounting website with services, team, tax calculators, testimonials, and scheduling", "business", "🧮",
  ["business", "accounting", "finance", "tax"],
  [
    () => nav("🧮 Summit Financial", "Services   About   Resources   Contact", "Get a Quote"),
    () => hero("Expert Financial\nGuidance You Can Trust", "Tax planning, bookkeeping, and strategic financial advisory for businesses and individuals.", "Schedule Free Consultation"),
    () => services("Our Services", [
      { icon: "📋", name: "Tax Preparation", desc: "Comprehensive personal and business tax preparation with maximum deduction strategies.", price: "From $299" },
      { icon: "📚", name: "Bookkeeping", desc: "Monthly bookkeeping, reconciliation, and financial reporting for small businesses.", price: "From $499/mo" },
      { icon: "💰", name: "Financial Planning", desc: "Retirement planning, investment advisory, and wealth management strategies.", price: "Custom" },
      { icon: "🏢", name: "Business Advisory", desc: "Entity structuring, cash flow optimization, and growth strategy consulting.", price: "From $1,500" },
    ]),
    () => stats([
      { value: "2,500+", label: "Clients" },
      { value: "$12M+", label: "Tax Savings" },
      { value: "25+", label: "Years" },
      { value: "100%", label: "Compliance" },
    ]),
    () => testimonials("What Clients Say", [
      { quote: "Summit saved us over $80,000 in taxes last year. Their strategies are phenomenal.", name: "Patricia Lee", role: "Business Owner" },
      { quote: "Finally found accountants who explain things in plain English. Highly recommended.", name: "James Cooper", role: "Freelancer" },
      { quote: "They caught errors our previous firm missed for years. True professionals.", name: "David Martin", role: "CFO, MedTech Solutions" },
    ]),
    () => faq("Common Questions", [
      { q: "When should I start tax planning?", a: "Ideally at the beginning of the fiscal year, but it's never too late. We can help optimize your situation any time." },
      { q: "Do you work with small businesses?", a: "Absolutely! We serve businesses of all sizes, from sole proprietors to mid-market companies." },
      { q: "How do virtual consultations work?", a: "We offer secure video calls and screen sharing for document review. Most clients prefer this format." },
    ]),
    () => contact("Get Your Free Quote", "Tell us about your financial needs and we'll prepare a customized proposal."),
    () => footer("light"),
  ], 190
);

add("Real Estate Agency", "Premium real estate website with property listings, agent profiles, market stats, and search", "business", "🏠",
  ["business", "realestate", "property", "housing"],
  [
    () => nav("🏠 Pinnacle Realty", "Listings   Agents   Neighborhoods   Sell   Contact", "List Your Home"),
    () => hero("Find Your\nDream Home", "Discover exceptional properties in the most desirable neighborhoods. Your perfect home awaits.", "Browse Listings", { bg: "linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)", color: "#ffffff" }),
    () => stats([
      { value: "1,200+", label: "Homes Sold" },
      { value: "$2.8B", label: "Total Volume" },
      { value: "14", label: "Days Avg. Sale" },
      { value: "4.9★", label: "Client Rating" },
    ]),
    () => gallery("Featured Properties", [
      { emoji: "🏡", label: "Modern Villa — $1.2M" },
      { emoji: "🏢", label: "Downtown Penthouse — $2.4M" },
      { emoji: "🏘️", label: "Family Estate — $890K" },
      { emoji: "🏗️", label: "New Construction — $650K" },
      { emoji: "🌳", label: "Country Retreat — $780K" },
      { emoji: "🏙️", label: "City Loft — $520K" },
    ]),
    () => team("Top Agents", [
      { name: "Jessica Palmer", role: "Luxury Specialist — $180M+ sold", emoji: "👩‍💼" },
      { name: "Michael Torres", role: "Commercial Expert — 15 yrs", emoji: "👨‍💼" },
      { name: "Rachel Kim", role: "First-Time Buyers — 500+ clients", emoji: "👩" },
    ]),
    () => testimonials("Happy Homeowners", [
      { quote: "Jessica found us our dream home in just 2 weeks. The process was seamless and stress-free.", name: "The Anderson Family", role: "Buyers" },
      { quote: "Sold our home for 15% above asking price. Pinnacle's marketing strategy is unmatched.", name: "Carlos Ramirez", role: "Seller" },
    ]),
    () => ctaBanner("Thinking of Selling?", "Get a free home valuation and market analysis from our expert agents.", "Get Free Valuation"),
    () => footer("dark"),
  ], 260
);

add("Insurance Agency", "Comprehensive insurance website with coverage options, quotes, claims process, and FAQ", "business", "🛡️",
  ["business", "insurance", "protection", "coverage"],
  [
    () => nav("🛡️ Guardian Insurance", "Coverage   Claims   About   FAQ", "Get a Quote"),
    () => hero("Protection for\nWhat Matters Most", "Comprehensive insurance solutions tailored to your life. Get peace of mind with Guardian.", "Get Free Quote", { bg: "linear-gradient(180deg, #1e3a5f 0%, #0f172a 100%)", color: "#ffffff", badge: "⭐ Rated #1 in Customer Satisfaction" }),
    () => services("Coverage Options", [
      { icon: "🏠", name: "Home Insurance", desc: "Protect your most valuable asset with comprehensive coverage including natural disasters and liability.", price: "From $89/mo" },
      { icon: "🚗", name: "Auto Insurance", desc: "Full coverage, collision, and liability options with accident forgiveness and roadside assistance.", price: "From $45/mo" },
      { icon: "❤️", name: "Life Insurance", desc: "Term and whole life policies to secure your family's financial future.", price: "From $25/mo" },
      { icon: "💼", name: "Business Insurance", desc: "General liability, professional indemnity, and workers' compensation for businesses.", price: "Custom" },
    ]),
    () => stats([{ value: "250K+", label: "Policyholders" }, { value: "$4.2B", label: "Claims Paid" }, { value: "99.1%", label: "Claims Approved" }, { value: "24/7", label: "Support" }]),
    () => testimonials("Policyholder Stories", [
      { quote: "When disaster struck, Guardian was there within hours. They covered everything and made the process painless.", name: "Jennifer White", role: "Homeowner" },
      { quote: "Saved 40% switching to Guardian with better coverage. Should have switched years ago.", name: "Michael Chang", role: "Family Plan" },
    ]),
    () => faq("Insurance FAQ", [
      { q: "How quickly can I get covered?", a: "Most policies can be activated within 24 hours of approval. Some are instant." },
      { q: "Can I bundle multiple policies?", a: "Yes! Bundling home and auto saves up to 25%. Business bundles also available." },
      { q: "How do I file a claim?", a: "Through our app, website, or 24/7 phone line. Most claims are processed within 48 hours." },
    ]),
    () => ctaBanner("Get Your Free Quote in 60 Seconds", "No obligation. No hidden fees. Just straightforward protection.", "Start My Quote"),
    () => footer("dark"),
  ], 200
);

// ═══════════════════════════════════════
// CREATIVE (5 templates)
// ═══════════════════════════════════════
add("Design Studio", "Creative agency portfolio with project showcase, process overview, team, and contact", "creative", "🎨",
  ["creative", "design", "agency", "studio"],
  [
    () => nav("🎨 Pixel Studio", "Work   Process   Team   Contact", "Start a Project"),
    () => hero("We Design\nDigital Experiences", "A creative studio crafting beautiful brands, websites, and products that people love.", "See Our Work", { bg: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%)", color: "#ffffff" }),
    () => gallery("Selected Work", [
      { emoji: "🌐", label: "Fintech App Redesign" },
      { emoji: "📱", label: "E-commerce Mobile App" },
      { emoji: "🎯", label: "SaaS Dashboard" },
      { emoji: "🏷️", label: "Brand Identity System" },
      { emoji: "📊", label: "Data Visualization" },
      { emoji: "🛍️", label: "Luxury E-commerce" },
    ]),
    () => features("Our Process", [
      { icon: "🔍", title: "1. Discovery", desc: "Deep dive into your brand, audience, goals, and competitive landscape." },
      { icon: "✏️", title: "2. Design", desc: "Wireframes, prototypes, and high-fidelity designs with iterative feedback." },
      { icon: "🚀", title: "3. Deliver", desc: "Pixel-perfect development, testing, and launch with ongoing support." },
    ]),
    () => testimonials("Client Love", [
      { quote: "Pixel Studio didn't just redesign our product — they reimagined our entire user experience. Conversions up 280%.", name: "Sarah Kim", role: "VP Product, Finova" },
      { quote: "The most creative and detail-oriented team I've ever worked with. Worth every penny.", name: "Alex Rivera", role: "Founder, Bloom" },
      { quote: "They understand design at a business level. Our brand has never been stronger.", name: "Emma Chen", role: "CMO, Elevate" },
    ]),
    () => team("The Creatives", [
      { name: "Maya Rodriguez", role: "Creative Director", emoji: "👩‍🎨" },
      { name: "Leo Kim", role: "Lead Designer", emoji: "👨‍🎨" },
      { name: "Sofia Chen", role: "UX Researcher", emoji: "🧑‍💻" },
      { name: "Jake Williams", role: "Motion Designer", emoji: "🎬" },
    ]),
    () => ctaBanner("Have a Project in Mind?", "Let's create something extraordinary together. First consultation is on us.", "Start a Project"),
    () => footer("dark"),
  ], 310
);

add("Photography Portfolio", "Stunning photographer portfolio with galleries, services, pricing, about, and booking", "creative", "📸",
  ["creative", "photography", "portfolio", "visual"],
  [
    () => nav("📸 Lena Visuals", "Portfolio   Services   About   Book", "Book a Session"),
    () => hero("Capturing Life's\nMost Beautiful Moments", "Award-winning photography for weddings, portraits, events, and commercial projects.", "View Portfolio", { bg: "#0f172a", color: "#ffffff" }),
    () => gallery("Portfolio Highlights", [
      { emoji: "💒", label: "Wedding Stories" },
      { emoji: "👤", label: "Portrait Sessions" },
      { emoji: "🎉", label: "Event Coverage" },
      { emoji: "🏢", label: "Commercial Work" },
      { emoji: "🌅", label: "Landscape Art" },
      { emoji: "👶", label: "Family Portraits" },
    ]),
    () => services("Photography Packages", [
      { icon: "💍", name: "Wedding Photography", desc: "Full-day coverage, engagement shoot, 500+ edited photos, premium album.", price: "From $3,500" },
      { icon: "👤", name: "Portrait Session", desc: "1-hour session, 2 outfit changes, 30 retouched images, digital gallery.", price: "From $350" },
      { icon: "🏢", name: "Commercial/Brand", desc: "Product photography, headshots, brand imagery with commercial license.", price: "From $1,200" },
      { icon: "🎉", name: "Event Coverage", desc: "Corporate events, parties, conferences. 4-8 hour packages available.", price: "From $800" },
    ]),
    () => testimonials("Client Stories", [
      { quote: "Lena captured our wedding day more beautifully than we could have imagined. Every photo is a work of art.", name: "Sarah & James", role: "Wedding Clients" },
      { quote: "The headshots transformed our company's brand. Professional, creative, and so easy to work with.", name: "Tech Startup", role: "Brand Client" },
    ]),
    () => ctaBanner("Ready to Create Something Beautiful?", "Limited availability for 2026. Book your session today.", "Check Availability"),
    () => footer("dark"),
  ], 240
);

add("Freelancer Portfolio", "Modern freelance developer/designer portfolio with projects, skills, rates, and testimonials", "creative", "💼",
  ["creative", "freelancer", "developer", "portfolio"],
  [
    () => nav("◆ Alex.dev", "Projects   Skills   Rates   Contact", "Hire Me"),
    () => hero("Full-Stack Developer\n& UI Designer", "I build beautiful, performant web applications. Currently available for freelance projects.", "View Projects", { badge: "✅ Available for hire" }),
    () => gallery("Recent Projects", [
      { emoji: "🛒", label: "E-commerce Platform" },
      { emoji: "📱", label: "Mobile Banking App" },
      { emoji: "🎮", label: "Gaming Dashboard" },
      { emoji: "📊", label: "Analytics Suite" },
    ]),
    () => features("Technical Skills", [
      { icon: "⚛️", title: "Frontend", desc: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion — pixel-perfect implementations." },
      { icon: "🔧", title: "Backend", desc: "Node.js, Python, PostgreSQL, Redis, GraphQL — scalable server architectures." },
      { icon: "☁️", title: "DevOps", desc: "AWS, Docker, CI/CD, monitoring — production-ready deployments." },
    ]),
    () => pricing("Engagement Models", [
      { name: "Hourly", price: "$150/hr", features: "Flexible engagement\nIdeal for small tasks\nMinimum 10 hours\nAsync communication" },
      { name: "Monthly Retainer", price: "$8,000/mo", features: "Dedicated 20hrs/week\nPriority scheduling\nDirect Slack access\nWeekly check-ins", highlighted: true },
      { name: "Project-Based", price: "Custom", features: "Fixed scope & price\nMilestone payments\nDetailed timeline\nFull documentation" },
    ]),
    () => testimonials("Client Reviews", [
      { quote: "Alex delivered a complex React application ahead of schedule. Code quality was exceptional.", name: "Maria Santos", role: "CTO, DataFlow" },
      { quote: "Rare to find someone equally strong in design and development. An absolute pleasure to work with.", name: "Tom Bradley", role: "Founder, StartupXYZ" },
    ]),
    () => contact("Let's Build Something Great", "Tell me about your project and I'll get back to you within 24 hours."),
    () => footer("dark"),
  ], 270
);

add("Music Artist", "Dynamic musician/band website with discography, tour dates, merchandise, media, and newsletter", "creative", "🎵",
  ["creative", "music", "artist", "band", "entertainment"],
  [
    () => nav("🎵 NOVA", "Music   Tour   Merch   Videos   Contact", "Listen Now", "dark"),
    () => hero("New Album Out Now", "Experience the sound of tomorrow. 'Midnight Echoes' — 12 tracks of pure sonic bliss. Available everywhere.", "Stream Now", { bg: "linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f43f5e 100%)", color: "#ffffff", badge: "🔥 #1 on Billboard" }),
    () => gallery("Discography", [
      { emoji: "💿", label: "Midnight Echoes (2026)" },
      { emoji: "💿", label: "Neon Dreams (2025)" },
      { emoji: "💿", label: "Electric Soul (2024)" },
      { emoji: "💿", label: "First Light (2023)" },
    ]),
    () => services("Upcoming Tour", [
      { icon: "📍", name: "New York — Madison Square Garden", desc: "March 15, 2026 — Doors open 7:00 PM", price: "From $75" },
      { icon: "📍", name: "Los Angeles — The Forum", desc: "March 22, 2026 — Doors open 7:00 PM", price: "From $85" },
      { icon: "📍", name: "London — O2 Arena", desc: "April 5, 2026 — Doors open 6:30 PM", price: "From £65" },
      { icon: "📍", name: "Tokyo — Tokyo Dome", desc: "April 18, 2026 — Doors open 6:00 PM", price: "From ¥8,500" },
    ]),
    () => productShowcase("Merch Store", [
      { emoji: "👕", name: "Tour T-Shirt", price: "$35", desc: "Limited edition Midnight Echoes tour design" },
      { emoji: "🧢", name: "Logo Cap", price: "$28", desc: "Embroidered NOVA logo, adjustable fit" },
      { emoji: "🎒", name: "Tour Hoodie", price: "$65", desc: "Premium heavyweight hoodie with back print" },
      { emoji: "💿", name: "Vinyl LP", price: "$42", desc: "180g vinyl with exclusive bonus track" },
    ]),
    () => newsletter("Join the Fan Club", "Get early access to tickets, exclusive merch drops, and behind-the-scenes content.", { bg: "#0f172a" }),
    () => footer("dark"),
  ], 300
);

add("Architecture Firm", "Elegant architecture portfolio with projects, design philosophy, awards, team, and contact", "creative", "🏛️",
  ["creative", "architecture", "design", "building"],
  [
    () => nav("△ Forma Architects", "Projects   Philosophy   Awards   Team   Contact", "Start a Project", "transparent"),
    () => hero("Architecture That\nInspires Life", "Award-winning architectural design blending innovation, sustainability, and timeless beauty.", "View Projects", { bg: "linear-gradient(180deg, #1c1917 0%, #292524 100%)", color: "#ffffff", padding: "160px 40px 120px" }),
    () => gallery("Featured Projects", [
      { emoji: "🏢", label: "The Glass Tower — NYC" },
      { emoji: "🏛️", label: "Museum of Light — Paris" },
      { emoji: "🏡", label: "Hillside Residence — Malibu" },
      { emoji: "🏗️", label: "Innovation Campus — Berlin" },
      { emoji: "⛪", label: "Community Center — Tokyo" },
      { emoji: "🌿", label: "Eco Villa — Bali" },
    ]),
    () => features("Design Philosophy", [
      { icon: "🌱", title: "Sustainable Design", desc: "Every project targets LEED Platinum. We believe great architecture must serve the planet." },
      { icon: "💡", title: "Innovation First", desc: "Pushing boundaries with parametric design, smart materials, and computational methods." },
      { icon: "🤝", title: "Human-Centered", desc: "Spaces designed around how people actually live, work, and connect." },
    ]),
    () => stats([
      { value: "120+", label: "Projects Completed" },
      { value: "15", label: "International Awards" },
      { value: "8", label: "Countries" },
      { value: "25", label: "Team Members" },
    ]),
    () => testimonials("Client Perspectives", [
      { quote: "Forma didn't just design a building — they created a living, breathing experience. Absolutely transformative.", name: "Victoria Sterling", role: "Private Residence, Malibu" },
      { quote: "Their vision for our corporate campus exceeded every expectation. A masterpiece of modern architecture.", name: "Klaus Weber", role: "CEO, TechCorp Berlin" },
    ]),
    () => ctaBanner("Let's Create Something Iconic", "Every great building starts with a conversation. Tell us about your vision.", "Schedule Consultation"),
    () => footer("dark"),
  ], 250
);

// ═══════════════════════════════════════
// MARKETING (5 templates)
// ═══════════════════════════════════════
add("Product Launch", "High-conversion product launch page with countdown, features, social proof, pricing, and FAQ", "marketing", "🚀",
  ["marketing", "launch", "product", "conversion"],
  [
    () => nav("🚀 LaunchPad", "Features   Pricing   FAQ   Reviews", "Pre-Order Now"),
    () => hero("The Future of\nProductivity is Here", "Introducing LaunchPad — the all-in-one workspace that replaces 10 tools. Pre-order and save 50%.", "Pre-Order — $49 (was $99)", { bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)", color: "#ffffff", badge: "🎉 Pre-Launch Special — 50% Off" }),
    () => stats([
      { value: "10,000+", label: "Pre-Orders" },
      { value: "4.9/5", label: "Beta Rating" },
      { value: "500+", label: "Beta Testers" },
      { value: "50%", label: "Launch Discount" },
    ]),
    () => features("Why LaunchPad?", [
      { icon: "⚡", title: "10x Faster Workflows", desc: "AI-powered automation handles repetitive tasks so you can focus on what matters." },
      { icon: "🔗", title: "All-in-One Platform", desc: "Replace Slack, Notion, Asana, and more with a single unified workspace." },
      { icon: "🔒", title: "Enterprise Security", desc: "SOC 2 Type II certified with end-to-end encryption and SSO support." },
    ]),
    () => testimonials("Beta Tester Reviews", [
      { quote: "This replaced 7 tools for our team. Our productivity increased 3x in the first month.", name: "Jason Lee", role: "Engineering Lead, Stripe" },
      { quote: "The AI features are genuinely useful, not gimmicky. This is the future of work tools.", name: "Priya Patel", role: "PM, Google" },
      { quote: "I've been waiting for something like this for years. Pre-ordered immediately.", name: "Mark Chen", role: "Founder, IndieHackers" },
    ]),
    () => pricing("Choose Your Plan", [
      { name: "Starter", price: "$49", features: "5 team members\n10 projects\nCore features\nEmail support" },
      { name: "Pro", price: "$99", features: "Unlimited members\nUnlimited projects\nAI assistant\nPriority support", highlighted: true },
      { name: "Enterprise", price: "Custom", features: "Dedicated instance\nCustom integrations\nSLA guarantee\n24/7 support" },
    ]),
    () => faq("Frequently Asked Questions", [
      { q: "When does LaunchPad officially launch?", a: "We're launching in Q1 2026. Pre-order customers get early access 2 weeks before public launch." },
      { q: "Can I get a refund on my pre-order?", a: "Absolutely. Full refund available any time before launch. No questions asked." },
      { q: "Is there a free trial?", a: "Yes! Every plan comes with a 14-day free trial. No credit card required." },
      { q: "What integrations do you support?", a: "We integrate with 200+ tools including Slack, GitHub, Figma, Google Workspace, and more." },
    ]),
    () => ctaBanner("Don't Miss the Launch Price", "Pre-order now and lock in 50% off forever. Limited time offer.", "Pre-Order Now — Save 50%"),
    () => footer("dark"),
  ], 350
);

add("Lead Generation", "Lead capture page with value proposition, trust badges, form, testimonials, and urgency", "marketing", "🎯",
  ["marketing", "leads", "capture", "funnel"],
  [
    () => nav("🎯 GrowthEngine", "How It Works   Results   Testimonials", "Get My Free Report"),
    () => hero("Get 3x More Leads\nWithout Spending More", "Download our free 47-page playbook used by 10,000+ marketers to triple their conversion rates.", "Download Free Playbook", { badge: "📥 47,000+ Downloads" }),
    () => stats([
      { value: "3x", label: "Avg Lead Increase" },
      { value: "47K+", label: "Downloads" },
      { value: "92%", label: "Recommend It" },
      { value: "Free", label: "No CC Required" },
    ]),
    () => features("What You'll Learn", [
      { icon: "📊", title: "Data-Driven Funnels", desc: "Build conversion funnels backed by data from 10,000+ A/B tests across industries." },
      { icon: "🎯", title: "Targeting Strategies", desc: "Advanced audience segmentation techniques that reduce CAC by up to 60%." },
      { icon: "🔄", title: "Automation Playbooks", desc: "Set-and-forget automation sequences that nurture leads while you sleep." },
    ]),
    () => testimonials("Success Stories", [
      { quote: "This playbook helped us go from 200 to 1,400 monthly leads. The ROI is insane.", name: "Chris Davis", role: "CMO, SaaS Co" },
      { quote: "Implemented chapter 3 alone and our conversion rate jumped from 2% to 7%. Game-changer.", name: "Anna Park", role: "Marketing Director, E-com Brand" },
    ]),
    () => contact("Get Your Free Copy", "Enter your email and we'll send the playbook instantly. No spam, unsubscribe anytime."),
    () => footer("light"),
  ], 320
);

add("Webinar Registration", "Event registration page with speaker bios, agenda, countdown, social proof, and sign-up form", "marketing", "🎙️",
  ["marketing", "webinar", "event", "registration"],
  [
    () => nav("🎙️ MasterClass Live", "Speakers   Agenda   Register", "Reserve My Spot"),
    () => hero("Free Live Masterclass:\nScale to $1M ARR", "Join 3 industry experts for a 90-minute deep dive into SaaS growth strategies that actually work.", "Reserve My Free Spot", { bg: "linear-gradient(135deg, #059669 0%, #10b981 100%)", color: "#ffffff", badge: "📅 March 25, 2026 — 2:00 PM EST" }),
    () => stats([{ value: "3", label: "Expert Speakers" }, { value: "90", label: "Minutes" }, { value: "2,400", label: "Registered" }, { value: "FREE", label: "Price" }]),
    () => team("Your Speakers", [
      { name: "Dr. Sarah Chen", role: "Growth Advisor — Scaled 3 companies to $10M+", emoji: "👩‍🏫" },
      { name: "Marcus Johnson", role: "CEO, SaaSMetrics — $50M ARR", emoji: "👨‍💼" },
      { name: "Elena Rossi", role: "VP Growth, TechCorp — ex-Stripe", emoji: "👩‍💻" },
    ]),
    () => features("What You'll Learn", [
      { icon: "📈", title: "Growth Frameworks", desc: "Proven playbooks for moving from $0 to $100K, $100K to $1M, and beyond." },
      { icon: "🎯", title: "Customer Acquisition", desc: "The exact channels and strategies top SaaS companies use to acquire customers profitably." },
      { icon: "💰", title: "Pricing Optimization", desc: "How to price your SaaS for maximum growth without leaving money on the table." },
    ]),
    () => testimonials("Past Attendees Say", [
      { quote: "The strategies shared in this masterclass helped us 5x our MRR in 6 months. Incredible value for a free event.", name: "Dan Miller", role: "Founder, CloudApp" },
      { quote: "I've paid $5,000 for courses with less actionable content. This masterclass is a must-attend.", name: "Lisa Zhang", role: "Growth Lead, Startup" },
    ]),
    () => ctaBanner("Seats Are Limited", "Only 500 live spots available. Register now to secure your seat and get the replay.", "Reserve My Free Spot"),
    () => footer("dark"),
  ], 290
);

add("App Download", "Mobile app landing page with screenshots, features, ratings, download buttons, and testimonials", "marketing", "📱",
  ["marketing", "app", "mobile", "download"],
  [
    () => nav("📱 Tempo", "Features   Reviews   Download", "Download Free"),
    () => hero("Your Time,\nPerfectly Managed", "The #1 rated time management app. Beautifully designed, incredibly powerful, completely free.", "Download for iOS & Android", { bg: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)", badge: "⭐ 4.9 stars — 100K+ ratings" }),
    () => features("Why 2M+ People Love Tempo", [
      { icon: "🧠", title: "AI Smart Scheduling", desc: "Tempo learns your habits and automatically suggests the optimal time for every task." },
      { icon: "🎯", title: "Focus Mode", desc: "Block distractions with one tap. Customizable sessions with ambient sounds." },
      { icon: "📊", title: "Deep Analytics", desc: "Understand where your time goes with beautiful weekly and monthly reports." },
    ]),
    () => stats([
      { value: "2M+", label: "Downloads" },
      { value: "4.9★", label: "App Store" },
      { value: "#1", label: "Productivity" },
      { value: "150+", label: "Countries" },
    ]),
    () => testimonials("User Reviews", [
      { quote: "Tempo completely changed how I manage my day. I'm 2x more productive and less stressed.", name: "Jordan Smith", role: "Designer" },
      { quote: "The AI scheduling is eerily good. It knows when I'm most productive before I do.", name: "Aisha Khan", role: "Entrepreneur" },
      { quote: "Deleted 5 other apps after installing Tempo. It does everything and does it beautifully.", name: "Ryan Park", role: "Developer" },
    ]),
    () => faq("App FAQ", [
      { q: "Is Tempo really free?", a: "Yes! The core app is 100% free forever. Tempo Pro adds AI features and team sync for $4.99/mo." },
      { q: "Does it sync across devices?", a: "Seamlessly. Your data syncs in real-time across iOS, Android, web, and desktop." },
      { q: "Can I import from other apps?", a: "Yes — one-tap import from Todoist, Apple Reminders, Google Calendar, and 20+ more." },
    ]),
    () => ctaBanner("Start Managing Your Time Better", "Join 2 million+ people who've transformed their productivity with Tempo.", "Download Free"),
    () => footer("light"),
  ], 340
);

add("Newsletter Landing", "Newsletter subscription page with archives, social proof, featured issues, and sign-up", "marketing", "📧",
  ["marketing", "newsletter", "email", "subscription"],
  [
    () => nav("📧 The Brief", "Archives   About   Subscribe", "Subscribe Free"),
    () => hero("The Weekly Brief\nfor Busy Builders", "Join 25,000+ founders and operators getting the most important startup insights every Tuesday.", "Subscribe — It's Free", { badge: "📬 25,000+ Subscribers" }),
    () => stats([{ value: "25K+", label: "Subscribers" }, { value: "62%", label: "Open Rate" }, { value: "Every Tues", label: "Delivery" }, { value: "Free", label: "Forever" }]),
    () => features("What You'll Get", [
      { icon: "📊", title: "Market Analysis", desc: "Deep dives into market trends, funding rounds, and emerging opportunities." },
      { icon: "🧠", title: "Founder Insights", desc: "Exclusive interviews and lessons learned from successful founders." },
      { icon: "🔧", title: "Tool Reviews", desc: "Honest reviews of the latest tools, apps, and services for builders." },
    ]),
    () => testimonials("Reader Reviews", [
      { quote: "The only newsletter I actually read every week. Concise, insightful, and always actionable.", name: "Kate Morrison", role: "CEO, TechFund" },
      { quote: "This newsletter has replaced my morning news scroll. Better signal, zero noise.", name: "Raj Patel", role: "Investor" },
    ]),
    () => newsletter("Join 25,000+ Readers", "One email per week. Unsubscribe anytime. No spam, ever."),
    () => footer("light"),
  ], 280
);

// ═══════════════════════════════════════
// E-COMMERCE (5 templates)
// ═══════════════════════════════════════
add("Fashion Boutique", "Luxury fashion store with seasonal collections, lookbook, product grid, reviews, and newsletter", "commerce", "👗",
  ["ecommerce", "fashion", "luxury", "boutique"],
  [
    () => nav("ATELIER", "New Arrivals   Women   Men   Accessories", "Shop Now", "light"),
    () => hero("Autumn/Winter\nCollection 2026", "Timeless elegance meets contemporary design. Discover pieces crafted with exceptional materials.", "Shop the Collection", { bg: "linear-gradient(135deg, #fdf4ff 0%, #faf5ff 50%, #f5f3ff 100%)" }),
    () => gallery("Shop by Category", [
      { emoji: "👗", label: "Dresses" },
      { emoji: "👔", label: "Tailoring" },
      { emoji: "👜", label: "Accessories" },
      { emoji: "👟", label: "Footwear" },
      { emoji: "🧣", label: "Outerwear" },
      { emoji: "💎", label: "Jewelry" },
    ]),
    () => productShowcase("New Arrivals", [
      { emoji: "👗", name: "Silk Wrap Dress", price: "$420", desc: "100% mulberry silk, hand-finished in Italy" },
      { emoji: "🧥", name: "Cashmere Overcoat", price: "$890", desc: "Scottish cashmere, double-breasted, unlined" },
      { emoji: "👜", name: "Leather Tote", price: "$680", desc: "Full-grain Italian leather, brass hardware" },
      { emoji: "👟", name: "Suede Chelsea Boots", price: "$350", desc: "Hand-lasted, Goodyear welted construction" },
    ]),
    () => testimonials("Customer Love", [
      { quote: "The quality is extraordinary. I've never felt fabric this luxurious. Worth every penny.", name: "Charlotte W.", role: "Verified Buyer" },
      { quote: "Atelier is my go-to for investment pieces. Elegant, timeless, impeccably made.", name: "Sophie L.", role: "Verified Buyer" },
    ]),
    () => newsletter("Join the Inner Circle", "Be first to know about new collections, private sales, and exclusive events.", { bg: "#faf5ff" }),
    () => footer("light"),
  ], 310
);

add("Electronics Store", "Modern electronics store with featured products, categories, deals, specifications, and reviews", "commerce", "🔌",
  ["ecommerce", "electronics", "tech", "gadgets"],
  [
    () => nav("⚡ TechVolt", "New   Laptops   Phones   Audio   Deals", "Cart (0)", "dark"),
    () => hero("Next-Gen Tech\nAt Best Prices", "Premium electronics with free shipping, 30-day returns, and expert support.", "Shop Deals", { bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#ffffff", badge: "🔥 Spring Sale — Up to 40% Off" }),
    () => gallery("Shop by Category", [
      { emoji: "💻", label: "Laptops & PCs" },
      { emoji: "📱", label: "Smartphones" },
      { emoji: "🎧", label: "Audio" },
      { emoji: "⌚", label: "Wearables" },
      { emoji: "🎮", label: "Gaming" },
      { emoji: "📷", label: "Cameras" },
    ]),
    () => productShowcase("Featured Deals", [
      { emoji: "💻", name: "UltraBook Pro 16\"", price: "$1,299", desc: "M3 chip, 32GB RAM, 1TB SSD — was $1,799" },
      { emoji: "🎧", name: "Studio Headphones", price: "$279", desc: "Active noise canceling, 40hr battery — was $399" },
      { emoji: "📱", name: "Galaxy Ultra 26", price: "$999", desc: "6.8\" AMOLED, 200MP camera — was $1,199" },
      { emoji: "⌚", name: "SmartWatch Series X", price: "$349", desc: "Health monitoring, GPS, 5-day battery — was $449" },
    ]),
    () => features("Why Shop With Us", [
      { icon: "🚚", title: "Free Express Shipping", desc: "Free 2-day shipping on orders over $50. Same-day delivery available in select cities." },
      { icon: "🔄", title: "30-Day Easy Returns", desc: "Not satisfied? Return any product within 30 days for a full refund. No questions asked." },
      { icon: "🛡️", title: "Extended Warranty", desc: "Free 2-year warranty on all products. Optional 5-year protection plans available." },
    ]),
    () => testimonials("Customer Reviews", [
      { quote: "Fastest delivery I've ever experienced. Product was exactly as described. Will shop here again.", name: "Mike R.", role: "Verified Buyer ⭐⭐⭐⭐⭐" },
      { quote: "Their customer support helped me choose the perfect laptop. Amazing pre-sale service.", name: "Priya S.", role: "Verified Buyer ⭐⭐⭐⭐⭐" },
    ]),
    () => newsletter("Get Exclusive Deals", "Subscribe for early access to flash sales, new product drops, and tech guides."),
    () => footer("dark"),
  ], 280
);

add("Organic Grocery", "Natural grocery store with product categories, farm-to-table story, subscription boxes, and recipes", "commerce", "🥬",
  ["ecommerce", "grocery", "organic", "food"],
  [
    () => nav("🌿 FreshRoots", "Shop   Subscriptions   Recipes   About", "Cart (0)"),
    () => hero("Farm-Fresh Organic\nDelivered to Your Door", "100% organic produce, pantry staples, and artisan goods from local farms. Free delivery on first order.", "Shop Now — Free Delivery", { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", badge: "🌱 Certified Organic" }),
    () => gallery("Shop by Category", [
      { emoji: "🥬", label: "Fresh Produce" },
      { emoji: "🥩", label: "Meat & Seafood" },
      { emoji: "🧀", label: "Dairy & Eggs" },
      { emoji: "🍞", label: "Bakery" },
      { emoji: "🫙", label: "Pantry Staples" },
      { emoji: "🍷", label: "Beverages" },
    ]),
    () => productShowcase("Weekly Favorites", [
      { emoji: "🥑", name: "Organic Avocado Box", price: "$12.99", desc: "6 perfectly ripe Hass avocados" },
      { emoji: "🍓", name: "Berry Mix Basket", price: "$16.99", desc: "Strawberries, blueberries, raspberries" },
      { emoji: "🥚", name: "Farm Fresh Eggs", price: "$8.99", desc: "Pasture-raised, dozen" },
      { emoji: "🍯", name: "Raw Local Honey", price: "$14.99", desc: "Unfiltered wildflower, 16oz" },
    ]),
    () => features("The FreshRoots Difference", [
      { icon: "🌱", title: "100% Organic", desc: "Every product is certified organic. No pesticides, no GMOs, no compromises." },
      { icon: "🚜", title: "Local Farms", desc: "We partner with 50+ local farms within 100 miles for maximum freshness." },
      { icon: "♻️", title: "Zero Waste", desc: "All packaging is compostable or recyclable. We're carbon neutral since 2024." },
    ]),
    () => services("Subscription Boxes", [
      { icon: "🥗", name: "Weekly Veggie Box", desc: "Seasonal selection of 8-10 organic vegetables for the week.", price: "$29.99/week" },
      { icon: "🍎", name: "Fruit & Snack Box", desc: "Fresh fruits plus organic snacks and dried goods.", price: "$34.99/week" },
      { icon: "🍳", name: "Family Essentials", desc: "Complete weekly groceries for a family of 4: produce, dairy, meat, pantry.", price: "$89.99/week" },
    ]),
    () => testimonials("Happy Customers", [
      { quote: "The produce quality is incredible — you can taste the difference. My family won't go back to regular groceries.", name: "Maria J.", role: "Weekly Subscriber" },
      { quote: "The subscription box is so convenient. Fresh, organic food on my doorstep every Monday.", name: "Tom K.", role: "Monthly Member" },
    ]),
    () => footer("light"),
  ], 250
);

add("Handmade Marketplace", "Artisan marketplace with maker profiles, product categories, gift guides, and featured items", "commerce", "🧶",
  ["ecommerce", "handmade", "artisan", "marketplace", "crafts"],
  [
    () => nav("🧶 Artisan Co.", "Shop   Makers   Gift Guide   About", "Cart (0)"),
    () => hero("Handcrafted With\nLove & Passion", "Discover unique, handmade products from talented artisans around the world. Every purchase supports independent makers.", "Explore Collection", { bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)" }),
    () => gallery("Shop by Craft", [
      { emoji: "🏺", label: "Ceramics & Pottery" },
      { emoji: "🧶", label: "Textiles & Fiber" },
      { emoji: "🪵", label: "Woodworking" },
      { emoji: "💎", label: "Jewelry" },
      { emoji: "🕯️", label: "Candles & Soaps" },
      { emoji: "🎨", label: "Art & Prints" },
    ]),
    () => productShowcase("Featured Items", [
      { emoji: "🏺", name: "Hand-Thrown Vase", price: "$85", desc: "Stoneware with natural glaze by Studio Clay" },
      { emoji: "🧣", name: "Alpaca Wool Scarf", price: "$120", desc: "Hand-woven in Peru, natural dyes" },
      { emoji: "🪵", name: "Walnut Cutting Board", price: "$65", desc: "Live-edge black walnut, food-safe finish" },
      { emoji: "🕯️", name: "Soy Candle Set", price: "$42", desc: "Hand-poured, essential oils, 3-pack" },
    ]),
    () => features("Why Artisan Co.", [
      { icon: "👐", title: "100% Handmade", desc: "Every item is crafted by hand by independent artisans. No mass production." },
      { icon: "🌍", title: "Global Artisans", desc: "We work with 500+ makers across 30 countries, supporting traditional crafts." },
      { icon: "🎁", title: "Gift-Ready", desc: "Beautiful packaging included. Add a personal message for the perfect gift." },
    ]),
    () => team("Featured Makers", [
      { name: "Maria Santos", role: "Ceramicist — Lisbon, Portugal", emoji: "🇵🇹" },
      { name: "Takeshi Yamamoto", role: "Woodworker — Kyoto, Japan", emoji: "🇯🇵" },
      { name: "Elena Petrov", role: "Textile Artist — Prague, Czechia", emoji: "🇨🇿" },
      { name: "Lucas Okafor", role: "Jewelry Maker — Lagos, Nigeria", emoji: "🇳🇬" },
    ]),
    () => testimonials("Customer Reviews", [
      { quote: "The vase I ordered is the most beautiful thing in my home. You can feel the love that went into making it.", name: "Rachel M.", role: "Verified Buyer" },
      { quote: "I buy all my gifts from Artisan Co. now. Unique, meaningful, and always incredible quality.", name: "Daniel S.", role: "Repeat Customer" },
    ]),
    () => newsletter("Join the Artisan Community", "Get first access to new maker collections, workshop events, and exclusive drops."),
    () => footer("light"),
  ], 230
);

add("Subscription Box", "Subscription box service with plans, past boxes, reviews, gifting options, and how-it-works", "commerce", "📦",
  ["ecommerce", "subscription", "box", "recurring"],
  [
    () => nav("📦 CrateJoy", "Plans   Past Boxes   Gift   Reviews", "Subscribe Now"),
    () => hero("Monthly Surprises\nDelivered to You", "Curated boxes of premium products tailored to your interests. Unbox happiness every month.", "Choose Your Box", { bg: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e8eaf6 100%)", badge: "🎁 First Box 50% Off" }),
    () => features("How It Works", [
      { icon: "1️⃣", title: "Choose Your Plan", desc: "Pick from 5 themed boxes: Foodie, Beauty, Tech, Wellness, or Mystery." },
      { icon: "2️⃣", title: "We Curate", desc: "Our team hand-picks 5-8 premium products worth 3x your subscription price." },
      { icon: "3️⃣", title: "Unbox & Enjoy", desc: "Get your box on the 15th of every month. Keep what you love, share the rest." },
    ]),
    () => pricing("Subscription Plans", [
      { name: "Monthly", price: "$39/mo", features: "5-8 premium items\nFree shipping\nCancel anytime\n$100+ retail value" },
      { name: "6-Month Plan", price: "$34/mo", features: "5-8 premium items\nFree shipping\nSave $30 total\nBonus item each box", highlighted: true },
      { name: "Annual Plan", price: "$29/mo", features: "5-8 premium items\nFree shipping\nSave $120/year\nExclusive annual gift" },
    ]),
    () => gallery("Past Boxes", [
      { emoji: "🍫", label: "Feb: Gourmet Chocolate" },
      { emoji: "🧴", label: "Jan: Winter Skincare" },
      { emoji: "☕", label: "Dec: Coffee Lovers" },
      { emoji: "🕯️", label: "Nov: Cozy Night In" },
    ]),
    () => testimonials("Subscriber Reviews", [
      { quote: "Every box feels like Christmas morning. The curation is incredible — they really know my taste.", name: "Jessica L.", role: "12-month subscriber" },
      { quote: "Gifted this to my mom and she calls me every month to rave about it. Best gift ever.", name: "Mike T.", role: "Gift subscriber" },
      { quote: "The value is insane. I've discovered so many brands I now buy from regularly.", name: "Amy R.", role: "6-month subscriber" },
    ]),
    () => ctaBanner("Start Your Subscription Today", "First box is 50% off. Free shipping always. Cancel anytime.", "Get 50% Off First Box"),
    () => footer("light"),
  ], 260
);

// ═══════════════════════════════════════
// CONTENT (4 templates)
// ═══════════════════════════════════════
add("Magazine", "Digital magazine with featured articles, categories, author spotlights, trending topics, and subscription", "content", "📰",
  ["content", "magazine", "editorial", "news"],
  [
    () => nav("📰 The Pulse", "Latest   Technology   Culture   Business   Subscribe", "Subscribe"),
    () => hero("Stories That Shape\nthe Future", "Award-winning journalism covering technology, culture, and the ideas that matter most.", "Read Latest Issue", { bg: "#ffffff" }),
    () => features("Trending Topics", [
      { icon: "🤖", title: "AI & Society", desc: "How artificial intelligence is reshaping work, creativity, and human connection." },
      { icon: "🌍", title: "Climate Innovation", desc: "Breakthrough technologies and policies in the fight against climate change." },
      { icon: "💡", title: "Future of Work", desc: "Remote culture, 4-day weeks, and the radical rethinking of how we work." },
    ]),
    () => team("Featured Writers", [
      { name: "Amara Johnson", role: "Tech Editor — ex-Wired, MIT TR", emoji: "✍️" },
      { name: "Liam Chen", role: "Culture Critic — Pulitzer Nominee", emoji: "📝" },
      { name: "Sofia Reyes", role: "Business Correspondent — 15 years", emoji: "📊" },
    ]),
    () => stats([{ value: "500K+", label: "Monthly Readers" }, { value: "50+", label: "Awards Won" }, { value: "15", label: "Countries" }, { value: "2010", label: "Founded" }]),
    () => testimonials("Reader Favorites", [
      { quote: "The Pulse is the only publication that consistently makes me think differently about the world.", name: "Paul Graham", role: "Reader" },
      { quote: "Brilliantly researched, beautifully written. This is journalism at its finest.", name: "Jane Doe", role: "Subscriber since 2015" },
    ]),
    () => newsletter("Never Miss a Story", "Get the week's best stories delivered to your inbox. Free for all readers."),
    () => footer("dark"),
  ], 300
);

add("Podcast Website", "Podcast landing with episode player, show notes, guest list, sponsorship info, and subscribe links", "content", "🎙️",
  ["content", "podcast", "audio", "show"],
  [
    () => nav("🎙️ Deep Dive", "Episodes   Guests   About   Sponsor", "Listen Now"),
    () => hero("Conversations That\nGo Deeper", "Weekly interviews with founders, scientists, and artists exploring ideas that shape our world.", "Latest Episode", { bg: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)", color: "#ffffff", badge: "🏆 Top 10 Tech Podcast" }),
    () => stats([{ value: "5M+", label: "Total Downloads" }, { value: "200+", label: "Episodes" }, { value: "#7", label: "Apple Podcasts" }, { value: "4.9★", label: "Average Rating" }]),
    () => gallery("Recent Episodes", [
      { emoji: "🧠", label: "#204: The Future of AI with Sam Altman" },
      { emoji: "🚀", label: "#203: Building SpaceX — Inside Story" },
      { emoji: "🎨", label: "#202: Why Design Matters More Than Ever" },
      { emoji: "💰", label: "#201: From $0 to $100M ARR" },
    ]),
    () => team("Notable Guests", [
      { name: "Satya Nadella", role: "CEO, Microsoft", emoji: "🧑‍💼" },
      { name: "Brené Brown", role: "Author & Researcher", emoji: "👩‍🏫" },
      { name: "Naval Ravikant", role: "Entrepreneur & Investor", emoji: "🧘" },
      { name: "Lex Fridman", role: "AI Researcher & Podcaster", emoji: "🤖" },
    ]),
    () => features("Where to Listen", [
      { icon: "🍎", title: "Apple Podcasts", desc: "Subscribe on Apple Podcasts for automatic downloads and notifications." },
      { icon: "🎵", title: "Spotify", desc: "Stream every episode on Spotify. Add to your library for easy access." },
      { icon: "📺", title: "YouTube", desc: "Watch full video episodes and clips on our YouTube channel." },
    ]),
    () => testimonials("Listener Reviews", [
      { quote: "Deep Dive is the highlight of my commute. Every episode leaves me with at least 3 new ideas.", name: "Sarah K.", role: "Apple Podcasts Review" },
      { quote: "The best interview podcast out there. The questions are thoughtful and the conversations are genuine.", name: "Alex M.", role: "Spotify Review" },
    ]),
    () => newsletter("Get Episode Alerts", "Never miss an episode. Get show notes and exclusive content every Thursday."),
    () => footer("dark"),
  ], 280
);

add("Online Course", "Course landing page with curriculum, instructor bio, student outcomes, pricing, and enrollment", "content", "🎓",
  ["content", "education", "course", "learning"],
  [
    () => nav("🎓 SkillForge", "Curriculum   Instructor   Reviews   Enroll", "Enroll Now"),
    () => hero("Master Full-Stack\nDevelopment in 12 Weeks", "A comprehensive, project-based course that takes you from beginner to job-ready developer.", "Enroll Now — $599", { bg: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)", color: "#ffffff", badge: "⭐ 4.9/5 from 3,000+ students" }),
    () => stats([{ value: "3,000+", label: "Graduates" }, { value: "92%", label: "Job Placement" }, { value: "$85K", label: "Avg Starting Salary" }, { value: "12", label: "Weeks" }]),
    () => features("What You'll Learn", [
      { icon: "⚛️", title: "Frontend Mastery", desc: "React, TypeScript, Next.js, Tailwind CSS — build production-grade UIs." },
      { icon: "🔧", title: "Backend Development", desc: "Node.js, Express, PostgreSQL, REST APIs, authentication, and deployment." },
      { icon: "🚀", title: "Real Projects", desc: "Build 5 portfolio-worthy projects including a full SaaS app and e-commerce platform." },
    ]),
    () => team("Your Instructor", [
      { name: "Dr. Emily Zhang", role: "Ex-Google Senior Engineer — 15 years experience — Stanford CS PhD", emoji: "👩‍🏫" },
    ]),
    () => pricing("Choose Your Path", [
      { name: "Self-Paced", price: "$399", features: "Full curriculum access\n12 projects\nCommunity forum\nCertificate" },
      { name: "Mentored", price: "$599", features: "Everything in Self-Paced\nWeekly 1:1 mentoring\nCode reviews\nJob prep support", highlighted: true },
      { name: "Bootcamp", price: "$1,499", features: "Live cohort (12 weeks)\nDaily live sessions\n1:1 career coaching\nJob guarantee" },
    ]),
    () => testimonials("Student Success", [
      { quote: "I went from marketing to a $95K developer role in 4 months. This course changed my life.", name: "Jake Wilson", role: "Now: Software Engineer, Stripe" },
      { quote: "The project-based approach is incredible. My portfolio from this course landed me 5 interviews.", name: "Priya Sharma", role: "Now: Frontend Dev, Shopify" },
      { quote: "Best investment I've ever made. The mentorship was worth 10x the price alone.", name: "Carlos Rivera", role: "Now: Full-Stack Dev, Startup" },
    ]),
    () => faq("Course FAQ", [
      { q: "Do I need prior coding experience?", a: "No! The course starts from absolute basics. Complete beginners are welcome." },
      { q: "How much time should I dedicate per week?", a: "Plan for 15-20 hours per week for optimal progress. Self-paced allows flexibility." },
      { q: "What's the job guarantee?", a: "Bootcamp students who don't land a job within 6 months get a full refund." },
      { q: "Do I get a certificate?", a: "Yes, all paths include a verified certificate of completion." },
    ]),
    () => ctaBanner("Start Your Developer Journey Today", "Join 3,000+ graduates who transformed their careers. Next cohort starts March 15.", "Enroll Now"),
    () => footer("dark"),
  ], 320
);

add("Documentation Site", "Technical docs site with guides, API reference, search, versioning, and community links", "content", "📖",
  ["content", "documentation", "docs", "technical"],
  [
    () => nav("📖 DevDocs", "Guides   API Reference   Changelog   Community", "Get API Key"),
    () => hero("Developer\nDocumentation", "Everything you need to integrate, customize, and build with our platform. From quick start to advanced APIs.", "Quick Start Guide", { bg: "#f8fafc" }),
    () => features("Getting Started", [
      { icon: "⚡", title: "Quick Start", desc: "Get up and running in under 5 minutes with our step-by-step installation guide." },
      { icon: "📚", title: "Tutorials", desc: "Follow along with practical tutorials for common integration patterns and use cases." },
      { icon: "🔑", title: "API Reference", desc: "Complete API documentation with examples in JavaScript, Python, Ruby, and Go." },
    ]),
    () => gallery("Popular Guides", [
      { emoji: "🔐", label: "Authentication & SSO" },
      { emoji: "📊", label: "Webhooks & Events" },
      { emoji: "🔄", label: "Data Sync & Import" },
      { emoji: "🎨", label: "UI Customization" },
      { emoji: "🧪", label: "Testing & Debugging" },
      { emoji: "🚀", label: "Deployment Guide" },
    ]),
    () => stats([{ value: "200+", label: "API Endpoints" }, { value: "4", label: "SDK Languages" }, { value: "99.99%", label: "API Uptime" }, { value: "< 50ms", label: "Avg Response" }]),
    () => features("Developer Tools", [
      { icon: "🛠️", title: "SDKs & Libraries", desc: "Official SDKs for JavaScript, Python, Ruby, and Go. Community libraries for 10+ more." },
      { icon: "🧪", title: "Sandbox Environment", desc: "Test API calls in our interactive sandbox without affecting production data." },
      { icon: "💬", title: "Community Forum", desc: "Get help from our team and 5,000+ developers in the community forum." },
    ]),
    () => newsletter("Developer Updates", "Get notified about API changes, new features, and deprecation notices."),
    () => footer("dark"),
  ], 250
);

// ═══════════════════════════════════════
// TECH (5 templates)
// ═══════════════════════════════════════
add("AI Platform", "AI/ML platform landing with features, use cases, model showcase, pricing, and developer docs", "tech", "🤖",
  ["tech", "ai", "machine-learning", "saas"],
  [
    () => nav("🤖 NeuralForge", "Models   Use Cases   Pricing   Docs   API", "Try Free", "dark"),
    () => hero("Build AI-Powered\nProducts in Minutes", "Access state-of-the-art models through a simple API. From text to image to code — one platform, unlimited possibilities.", "Get Free API Key", { bg: "radial-gradient(ellipse at top, #1e1b4b 0%, #020617 60%)", color: "#ffffff", badge: "🚀 Now with GPT-5 & Claude 4 Support" }),
    () => stats([{ value: "10B+", label: "API Calls/Month" }, { value: "50+", label: "AI Models" }, { value: "99.99%", label: "Uptime" }, { value: "< 100ms", label: "Latency" }]),
    () => features("Capabilities", [
      { icon: "💬", title: "Natural Language", desc: "Text generation, summarization, translation, sentiment analysis, and conversational AI." },
      { icon: "🖼️", title: "Vision & Image", desc: "Image generation, editing, recognition, OCR, and multi-modal understanding." },
      { icon: "🔊", title: "Audio & Speech", desc: "Speech-to-text, text-to-speech, music generation, and audio analysis." },
    ]),
    () => gallery("Use Cases", [
      { emoji: "📝", label: "Content Generation" },
      { emoji: "🛒", label: "E-commerce AI" },
      { emoji: "🏥", label: "Healthcare AI" },
      { emoji: "📊", label: "Data Analysis" },
      { emoji: "🎮", label: "Game AI" },
      { emoji: "🤝", label: "Customer Support" },
    ]),
    () => pricing("Simple, Transparent Pricing", [
      { name: "Starter", price: "Free", features: "1,000 API calls/day\n5 models\nCommunity support\nBasic analytics" },
      { name: "Pro", price: "$49/mo", features: "100K API calls/day\nAll 50+ models\nPriority support\nAdvanced analytics", highlighted: true },
      { name: "Enterprise", price: "Custom", features: "Unlimited calls\nCustom models\nDedicated support\nSLA guarantee" },
    ]),
    () => testimonials("Developer Reviews", [
      { quote: "NeuralForge's API is the cleanest I've worked with. We integrated AI features in a single afternoon.", name: "Chen Wei", role: "CTO, DataFlow" },
      { quote: "Replaced 3 different AI providers with NeuralForge. Better models, simpler API, lower cost.", name: "Maria Santos", role: "ML Engineer, Startup" },
    ]),
    () => ctaBanner("Start Building with AI Today", "Free tier includes 1,000 API calls per day. No credit card required.", "Get Free API Key"),
    () => footer("dark"),
  ], 380
);

add("DevTools Platform", "Developer tools landing with features, integrations, CLI showcase, community, and pricing", "tech", "🛠️",
  ["tech", "devtools", "developer", "platform"],
  [
    () => nav("🛠️ DevForge", "Features   Integrations   CLI   Pricing   Docs", "Start Free", "dark"),
    () => hero("Ship Faster.\nBreak Nothing.", "The complete developer platform for building, testing, and deploying modern applications.", "Start Free — No CC Required", { bg: "linear-gradient(180deg, #020617 0%, #0f172a 100%)", color: "#ffffff", badge: "⭐ Loved by 100K+ developers" }),
    () => stats([{ value: "100K+", label: "Developers" }, { value: "5M+", label: "Deployments" }, { value: "200+", label: "Integrations" }, { value: "< 3s", label: "Deploy Time" }]),
    () => features("Core Features", [
      { icon: "🚀", title: "Instant Deployments", desc: "Push to git and your app is live in under 3 seconds. Automatic rollbacks on failure." },
      { icon: "🔍", title: "Real-time Monitoring", desc: "Full observability with logs, metrics, and traces. Catch issues before your users do." },
      { icon: "🤖", title: "AI Code Review", desc: "Automated code review powered by AI. Catches bugs, security issues, and performance problems." },
    ]),
    () => gallery("Integrations", [
      { emoji: "🐙", label: "GitHub" },
      { emoji: "🦊", label: "GitLab" },
      { emoji: "📦", label: "Docker" },
      { emoji: "☁️", label: "AWS" },
      { emoji: "🔷", label: "Azure" },
      { emoji: "🟢", label: "Vercel" },
    ]),
    () => testimonials("Developer Love", [
      { quote: "DevForge cut our deployment time from 15 minutes to 3 seconds. That alone was worth the price.", name: "Jake Chen", role: "Lead Engineer, Fintech Startup" },
      { quote: "The AI code review catches things our entire team misses. It's like having a senior dev reviewing every PR.", name: "Aisha Patel", role: "VP Engineering, SaaS Co" },
    ]),
    () => pricing("Plans", [
      { name: "Hobby", price: "Free", features: "3 projects\n100 deploys/month\nCommunity support\nBasic monitoring" },
      { name: "Pro", price: "$20/mo", features: "Unlimited projects\nUnlimited deploys\nPriority support\nAI code review", highlighted: true },
      { name: "Team", price: "$15/user/mo", features: "Everything in Pro\nTeam management\nAudit logs\nSSO & SAML" },
    ]),
    () => ctaBanner("Start Shipping Faster Today", "Join 100,000+ developers who deploy with confidence.", "Get Started Free"),
    () => footer("dark"),
  ], 350
);

add("Cybersecurity", "Security company website with services, threat assessment, compliance, team, and incident response", "tech", "🔒",
  ["tech", "security", "cybersecurity", "enterprise"],
  [
    () => nav("🔒 CyberShield", "Services   Solutions   About   Incident Response", "Get Assessment", "dark"),
    () => hero("Protect Your\nDigital Assets", "Enterprise-grade cybersecurity solutions. Threat detection, incident response, and compliance — all in one platform.", "Free Security Assessment", { bg: "linear-gradient(135deg, #020617 0%, #0c4a6e 100%)", color: "#ffffff", badge: "🛡️ Trusted by Fortune 500 companies" }),
    () => stats([{ value: "500+", label: "Enterprise Clients" }, { value: "99.97%", label: "Threat Detection" }, { value: "< 5min", label: "Response Time" }, { value: "SOC 2", label: "Certified" }]),
    () => services("Security Services", [
      { icon: "🔍", name: "Threat Detection & Monitoring", desc: "24/7 real-time monitoring with AI-powered threat detection across your entire infrastructure." },
      { icon: "🚨", name: "Incident Response", desc: "Expert incident response team available around the clock. Average containment in under 5 minutes." },
      { icon: "📋", name: "Compliance & Audit", desc: "SOC 2, HIPAA, GDPR, PCI-DSS compliance management with automated reporting." },
      { icon: "🧪", name: "Penetration Testing", desc: "Regular pen testing and vulnerability assessments to identify weaknesses before attackers do." },
    ]),
    () => features("Why CyberShield", [
      { icon: "🤖", title: "AI-Powered Detection", desc: "Our ML models analyze millions of events per second to detect threats in real-time." },
      { icon: "🌐", title: "Global SOC", desc: "Security operations centers in 5 countries provide true 24/7/365 coverage." },
      { icon: "🏆", title: "Industry Leaders", desc: "Named a Gartner Magic Quadrant Leader for 5 consecutive years." },
    ]),
    () => testimonials("Client Trust", [
      { quote: "CyberShield detected and contained a sophisticated attack in under 3 minutes. They saved our company.", name: "James Morrison", role: "CISO, Global Bank" },
      { quote: "The compliance automation alone saved us 500+ hours annually. Incredible platform.", name: "Lisa Chen", role: "VP Security, HealthCo" },
    ]),
    () => ctaBanner("Is Your Organization Secure?", "Get a free comprehensive security assessment. No obligation, completely confidential.", "Request Free Assessment"),
    () => footer("dark"),
  ], 300
);

add("Cloud Hosting", "Cloud hosting platform with plans, features, global infrastructure, uptime stats, and migration help", "tech", "☁️",
  ["tech", "cloud", "hosting", "infrastructure"],
  [
    () => nav("☁️ NimbusCloud", "Products   Pricing   Regions   Docs   Status", "Start Free", "dark"),
    () => hero("Cloud Infrastructure\nThat Just Works", "Reliable, fast, affordable cloud hosting. Deploy in 30+ regions with 99.99% uptime guaranteed.", "Deploy in 60 Seconds", { bg: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #4f46e5 100%)", color: "#ffffff", badge: "☁️ 99.99% Uptime SLA" }),
    () => stats([{ value: "99.99%", label: "Uptime SLA" }, { value: "32", label: "Global Regions" }, { value: "500K+", label: "Deployments" }, { value: "$0.004", label: "/GB Bandwidth" }]),
    () => features("Cloud Products", [
      { icon: "💻", title: "Compute", desc: "Virtual machines from $4/mo. Auto-scaling, spot instances, and dedicated hardware available." },
      { icon: "💾", title: "Storage", desc: "Object storage, block volumes, and managed databases. 99.999999999% durability." },
      { icon: "🌐", title: "Networking", desc: "Global CDN, load balancers, private networking, and DDoS protection included." },
    ]),
    () => pricing("Simple Pricing", [
      { name: "Starter", price: "$5/mo", features: "1 vCPU / 1GB RAM\n25GB SSD\n1TB bandwidth\nShared CPU" },
      { name: "Professional", price: "$20/mo", features: "4 vCPU / 8GB RAM\n100GB SSD\n5TB bandwidth\nDedicated CPU", highlighted: true },
      { name: "Enterprise", price: "$80/mo", features: "16 vCPU / 64GB RAM\n500GB SSD\n10TB bandwidth\nMetal performance" },
    ]),
    () => gallery("Global Regions", [
      { emoji: "🇺🇸", label: "US East & West" },
      { emoji: "🇪🇺", label: "EU Frankfurt & London" },
      { emoji: "🇯🇵", label: "Asia Tokyo & Singapore" },
      { emoji: "🇦🇺", label: "Australia Sydney" },
    ]),
    () => testimonials("Customer Stories", [
      { quote: "Migrated from AWS and cut our cloud bill by 60%. Performance is identical or better.", name: "Tom Harris", role: "CTO, SaaS Startup" },
      { quote: "The simplicity is unmatched. We deployed a production cluster in under 10 minutes.", name: "Yuki Tanaka", role: "DevOps Lead, Gaming Co" },
    ]),
    () => ctaBanner("Start Building on NimbusCloud", "Free $200 credit for new accounts. No credit card required to start.", "Claim $200 Free Credit"),
    () => footer("dark"),
  ], 330
);

add("Blockchain Platform", "Web3/blockchain platform with features, tokenomics, roadmap, community, and whitepaper", "tech", "⛓️",
  ["tech", "blockchain", "web3", "crypto", "defi"],
  [
    () => nav("⛓️ ChainForge", "Technology   Tokenomics   Roadmap   Community", "Launch App", "dark"),
    () => hero("The Next Generation\nBlockchain Protocol", "Ultra-fast, scalable, and environmentally sustainable. Built for the decentralized future.", "Launch App", { bg: "radial-gradient(ellipse at center, #312e81 0%, #020617 70%)", color: "#ffffff", badge: "🔗 Mainnet Live — 50,000+ TPS" }),
    () => stats([{ value: "50K+", label: "TPS" }, { value: "0.001s", label: "Finality" }, { value: "$0.0001", label: "Avg Tx Cost" }, { value: "1M+", label: "Wallets" }]),
    () => features("Technology", [
      { icon: "⚡", title: "Lightning Fast", desc: "50,000+ transactions per second with sub-millisecond finality. No compromise on security." },
      { icon: "🌱", title: "Carbon Negative", desc: "Proof-of-stake consensus using 99.9% less energy than proof-of-work chains." },
      { icon: "🔧", title: "Developer First", desc: "Full EVM compatibility, Rust & Solidity support, comprehensive SDKs and documentation." },
    ]),
    () => gallery("Ecosystem", [
      { emoji: "💰", label: "DeFi Protocols" },
      { emoji: "🖼️", label: "NFT Marketplace" },
      { emoji: "🎮", label: "GameFi" },
      { emoji: "🏛️", label: "DAOs & Governance" },
      { emoji: "🌉", label: "Cross-chain Bridge" },
      { emoji: "💎", label: "Staking & Yield" },
    ]),
    () => services("Roadmap 2026", [
      { icon: "Q1", name: "Mainnet V2 Launch", desc: "Sharding implementation, 100K+ TPS, enhanced smart contract capabilities." },
      { icon: "Q2", name: "Cross-Chain Bridge", desc: "Native bridges to Ethereum, Solana, and Polygon with instant finality." },
      { icon: "Q3", name: "Developer Grants", desc: "$50M ecosystem fund for developers building on ChainForge." },
      { icon: "Q4", name: "Mobile SDK", desc: "Native mobile SDKs for iOS and Android with wallet integration." },
    ]),
    () => testimonials("Community Voices", [
      { quote: "ChainForge is what Ethereum should have been. Fast, cheap, and actually usable for real applications.", name: "Vitalik Fan", role: "DeFi Developer" },
      { quote: "We migrated our NFT marketplace to ChainForge. Gas fees dropped 99% and transactions are instant.", name: "NFT Studio", role: "Digital Art Platform" },
    ]),
    () => ctaBanner("Join the Decentralized Future", "Start building on ChainForge today. $50M in ecosystem grants available.", "Read Whitepaper"),
    () => footer("dark"),
  ], 290
);

// ═══════════════════════════════════════
// FOOD & DRINK (5 templates)
// ═══════════════════════════════════════
add("Fine Dining Restaurant", "Elegant restaurant website with menu, chef's story, reservations, gallery, reviews, and events", "food", "🍽️",
  ["food", "restaurant", "dining", "fine-dining"],
  [
    () => nav("✦ Lumière", "Menu   Chef   Reservations   Events   Gallery", "Reserve a Table"),
    () => hero("A Culinary Journey\nAwaits You", "Michelin-starred dining experience blending French technique with local ingredients. Reservations recommended.", "Reserve Your Table", { bg: "linear-gradient(180deg, #1c1917 0%, #292524 100%)", color: "#ffffff" }),
    () => menuSection("Tasting Menu", [
      { name: "Amuse-Bouche", desc: "Seasonal micro-greens, truffle foam, edible flowers", price: "—" },
      { name: "Hokkaido Scallop", desc: "Seared scallop, cauliflower purée, brown butter, caviar", price: "$38" },
      { name: "Wagyu A5 Tenderloin", desc: "Japanese wagyu, bone marrow jus, roasted root vegetables", price: "$95" },
      { name: "Chocolate Soufflé", desc: "Valrhona dark chocolate, vanilla bean ice cream, gold leaf", price: "$24" },
    ]),
    () => team("Meet Chef Laurent", [
      { name: "Chef Laurent Dubois", role: "Executive Chef — 2 Michelin Stars — Trained at Le Cordon Bleu, Paris", emoji: "👨‍🍳" },
    ]),
    () => gallery("Restaurant Gallery", [
      { emoji: "🍽️", label: "Dining Room" },
      { emoji: "🍷", label: "Wine Cellar" },
      { emoji: "👨‍🍳", label: "Open Kitchen" },
      { emoji: "🌿", label: "Garden Terrace" },
    ]),
    () => testimonials("Guest Reviews", [
      { quote: "An unforgettable dining experience. Every dish was a masterpiece of flavor and presentation.", name: "Michelin Guide", role: "★★" },
      { quote: "The tasting menu was transcendent. Chef Laurent is a true artist. Worth every penny.", name: "Food & Wine Magazine", role: "Top 50 Restaurant" },
    ]),
    () => ctaBanner("Reserve Your Experience", "Seatings available Thursday through Sunday. Private dining available for special occasions.", "Make a Reservation"),
    () => footer("dark"),
  ], 310
);

add("Coffee Shop", "Artisan coffee shop with menu, bean origins, brewing guides, locations, loyalty program, and merch", "food", "☕",
  ["food", "coffee", "cafe", "artisan"],
  [
    () => nav("☕ Roast & Co.", "Menu   Our Beans   Brewing   Locations   Shop", "Order Ahead"),
    () => hero("Crafted with\nPassion, Poured with Love", "Specialty coffee roasted in-house daily. From single-origin beans to perfect pour-overs.", "View Menu", { bg: "linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)", color: "#ffffff" }),
    () => menuSection("Coffee Menu", [
      { name: "Signature Espresso", desc: "Double shot, Ethiopian Yirgacheffe, notes of blueberry & dark chocolate", price: "$4.50" },
      { name: "Pour-Over", desc: "Single origin, hand-brewed Hario V60, rotating seasonal bean", price: "$6.00" },
      { name: "Cold Brew", desc: "24-hour steep, Colombian blend, served over ice with oat milk option", price: "$5.50" },
      { name: "Matcha Latte", desc: "Ceremonial grade Uji matcha, steamed oat milk, honey option", price: "$5.00" },
    ]),
    () => features("Our Beans", [
      { icon: "🇪🇹", title: "Ethiopia Yirgacheffe", desc: "Light roast. Bright acidity with notes of blueberry, jasmine, and citrus." },
      { icon: "🇨🇴", title: "Colombia Huila", desc: "Medium roast. Balanced body with caramel sweetness and nutty finish." },
      { icon: "🇬🇹", title: "Guatemala Antigua", desc: "Dark roast. Rich, full-bodied with dark chocolate and smoky undertones." },
    ]),
    () => gallery("Our Locations", [
      { emoji: "📍", label: "Downtown — 123 Main St" },
      { emoji: "📍", label: "Arts District — 456 Gallery Ave" },
      { emoji: "📍", label: "University — 789 Campus Dr" },
      { emoji: "📍", label: "Waterfront — 321 Harbor Blvd" },
    ]),
    () => productShowcase("Merch & Beans", [
      { emoji: "☕", name: "Signature Blend (12oz)", price: "$18", desc: "Our best-selling house blend, whole bean" },
      { emoji: "🫗", name: "Pour-Over Kit", price: "$45", desc: "Hario V60, filters, and 250g of beans" },
      { emoji: "🧢", name: "Roast & Co. Cap", price: "$28", desc: "Embroidered logo, washed cotton" },
      { emoji: "🍵", name: "Ceramic Mug", price: "$22", desc: "Handmade 12oz, matte glaze" },
    ]),
    () => testimonials("What People Say", [
      { quote: "The best coffee in the city, hands down. I drive 30 minutes for their pour-over.", name: "James L.", role: "Regular Customer" },
      { quote: "The atmosphere is perfect for work. Great WiFi, amazing coffee, friendly baristas.", name: "Sarah K.", role: "Remote Worker" },
    ]),
    () => newsletter("Join the Coffee Club", "Get 10% off your first order + weekly brewing tips and new bean announcements."),
    () => footer("light"),
  ], 270
);

add("Bakery & Pastry", "Charming bakery website with daily specials, menu, custom cakes, catering, story, and ordering", "food", "🧁",
  ["food", "bakery", "pastry", "cakes"],
  [
    () => nav("🧁 Sweet Flour", "Menu   Custom Cakes   Catering   Our Story   Order", "Order Online"),
    () => hero("Baked Fresh\nEvery Morning", "Artisan breads, pastries, and custom cakes made with love and the finest ingredients since 2015.", "View Today's Menu", { bg: "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #ffe4e6 100%)" }),
    () => menuSection("Today's Specials", [
      { name: "Sourdough Boule", desc: "72-hour fermented, organic flour, crispy crust", price: "$8.50" },
      { name: "Almond Croissant", desc: "Twice-baked, house-made frangipane, toasted almonds", price: "$5.50" },
      { name: "Seasonal Fruit Tart", desc: "Vanilla custard, fresh berries, shortcrust pastry", price: "$7.00" },
      { name: "Chocolate Éclair", desc: "Choux pastry, Belgian chocolate cream, ganache glaze", price: "$6.00" },
    ]),
    () => services("Custom Cakes", [
      { icon: "🎂", name: "Wedding Cakes", desc: "Multi-tiered masterpieces tailored to your theme. Free tasting included.", price: "From $350" },
      { icon: "🎉", name: "Birthday Cakes", desc: "Custom designs for all ages. Fondant or buttercream, any theme.", price: "From $65" },
      { icon: "🏢", name: "Corporate Events", desc: "Pastry platters, mini desserts, and branded treats for your events.", price: "From $120" },
    ]),
    () => features("Our Promise", [
      { icon: "🌾", title: "Premium Ingredients", desc: "Organic flour, European butter, free-range eggs, and real vanilla." },
      { icon: "👩‍🍳", title: "Handcrafted Daily", desc: "Every item is made from scratch each morning. Never frozen, always fresh." },
      { icon: "💚", title: "Dietary Options", desc: "Gluten-free, vegan, and sugar-free options available daily." },
    ]),
    () => testimonials("Customer Love", [
      { quote: "Their sourdough is the best I've ever had. We buy two loaves every weekend without fail.", name: "The Martinez Family", role: "Weekly Regulars" },
      { quote: "The wedding cake was absolutely stunning and delicious. Our guests are still talking about it.", name: "Emily & Josh", role: "Wedding Clients" },
    ]),
    () => ctaBanner("Order for Pickup or Delivery", "Order by 6 PM for next-day pickup. Free delivery on orders over $50.", "Order Online"),
    () => footer("light"),
  ], 240
);

add("Food Delivery", "Food delivery app/service landing with restaurant partners, how it works, app download, and promos", "food", "🛵",
  ["food", "delivery", "app", "service"],
  [
    () => nav("🛵 QuickBite", "Restaurants   How It Works   Become a Partner   Download", "Order Now"),
    () => hero("Delicious Food\nDelivered Fast", "Your favorite restaurants, delivered to your door in 30 minutes or less. First order free!", "Order Now — Free Delivery", { bg: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)", color: "#ffffff", badge: "🎉 First Order FREE — Use Code: WELCOME" }),
    () => stats([{ value: "2,000+", label: "Restaurants" }, { value: "< 30min", label: "Avg Delivery" }, { value: "500K+", label: "Happy Customers" }, { value: "4.8★", label: "App Rating" }]),
    () => features("How It Works", [
      { icon: "1️⃣", title: "Browse & Order", desc: "Choose from 2,000+ restaurants. Filter by cuisine, rating, delivery time, or dietary needs." },
      { icon: "2️⃣", title: "Real-time Tracking", desc: "Watch your order from kitchen to doorstep with live GPS tracking." },
      { icon: "3️⃣", title: "Enjoy!", desc: "Hot food delivered to your door. Rate your experience and earn reward points." },
    ]),
    () => gallery("Popular Cuisines", [
      { emoji: "🍕", label: "Pizza & Italian" },
      { emoji: "🍣", label: "Japanese & Sushi" },
      { emoji: "🌮", label: "Mexican" },
      { emoji: "🍜", label: "Asian Fusion" },
      { emoji: "🥗", label: "Healthy & Salads" },
      { emoji: "🍔", label: "Burgers & American" },
    ]),
    () => testimonials("Customer Reviews", [
      { quote: "QuickBite is incredibly fast. My pad thai arrived in 22 minutes, still steaming hot!", name: "Rachel T.", role: "Regular User" },
      { quote: "The restaurant selection is amazing. I've discovered so many great local spots through this app.", name: "Mike S.", role: "Foodie" },
    ]),
    () => ctaBanner("Download the App", "Available on iOS and Android. Get $10 off your first 3 orders.", "Download Free"),
    () => footer("light"),
  ], 300
);

add("Brewery & Taproom", "Craft brewery website with beer lineup, taproom info, tours, events, merch, and distribution", "food", "🍺",
  ["food", "brewery", "beer", "craft", "taproom"],
  [
    () => nav("🍺 Iron Peak Brewing", "Our Beers   Taproom   Tours   Events   Shop", "Visit Us"),
    () => hero("Craft Beer.\nBold Flavors.\nLocal Roots.", "Small-batch craft beer brewed with passion in the heart of the mountains since 2018.", "See Our Lineup", { bg: "linear-gradient(180deg, #1c1917 0%, #44403c 100%)", color: "#ffffff" }),
    () => menuSection("Beer Lineup", [
      { name: "Summit IPA", desc: "West Coast IPA — Citrus, pine, tropical fruit. 6.8% ABV", price: "$7" },
      { name: "Powder Day Pilsner", desc: "Czech-style pilsner — Crisp, clean, biscuit malt. 4.8% ABV", price: "$6" },
      { name: "Dark Ridge Stout", desc: "Imperial stout — Coffee, chocolate, roasted barley. 9.2% ABV", price: "$8" },
      { name: "Wildflower Sour", desc: "Fruited sour — Raspberry, lemon, tart finish. 5.1% ABV", price: "$7" },
    ]),
    () => features("Visit Us", [
      { icon: "🍺", title: "Taproom", desc: "Open Thu-Sun, 20 beers on tap, food trucks on weekends. Dog-friendly patio." },
      { icon: "🏭", title: "Brewery Tours", desc: "See how we brew. Saturdays at 2 PM, includes 4 tastings. $15 per person." },
      { icon: "🎉", title: "Private Events", desc: "Host your next event in our taproom. Catering and custom beer packages available." },
    ]),
    () => stats([{ value: "24", label: "Beers Brewed" }, { value: "15", label: "Awards Won" }, { value: "2018", label: "Est." }, { value: "100%", label: "Independent" }]),
    () => productShowcase("Merch & To-Go", [
      { emoji: "🍺", name: "Mixed 12-Pack", price: "$28", desc: "4 of our most popular beers" },
      { emoji: "🧢", name: "Trucker Hat", price: "$25", desc: "Embroidered logo, mesh back" },
      { emoji: "🍻", name: "Growler Fill", price: "$18", desc: "64oz, your choice of tap beer" },
      { emoji: "👕", name: "Brewery Tee", price: "$30", desc: "Soft cotton, front & back print" },
    ]),
    () => testimonials("Beer Lovers Say", [
      { quote: "Summit IPA is the best IPA in the state. I make the drive every weekend just for it.", name: "Dave M.", role: "Beer Enthusiast" },
      { quote: "Amazing taproom atmosphere. The brewery tour was fascinating and the tastings were generous.", name: "Sarah & Tom", role: "Visitors" },
    ]),
    () => ctaBanner("Visit the Taproom", "Open Thursday-Sunday. Live music every Friday. Food trucks on weekends.", "Get Directions"),
    () => footer("dark"),
  ], 250
);

// ═══════════════════════════════════════
// SOCIAL (4 templates)
// ═══════════════════════════════════════
add("Community Platform", "Online community with membership tiers, forums overview, events, leaderboard, and join flow", "social", "👥",
  ["social", "community", "forum", "membership"],
  [
    () => nav("👥 HiveSpace", "Community   Events   Leaderboard   Resources", "Join Free"),
    () => hero("Where Builders\nConnect & Grow", "Join 50,000+ creators, developers, and entrepreneurs sharing knowledge and building together.", "Join the Community — Free", { bg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)", color: "#ffffff", badge: "🎉 50,000+ Members" }),
    () => stats([{ value: "50K+", label: "Members" }, { value: "500+", label: "Daily Posts" }, { value: "100+", label: "Events/Month" }, { value: "30+", label: "Countries" }]),
    () => features("Community Features", [
      { icon: "💬", title: "Discussion Forums", desc: "Topic-based channels for tech, design, business, and more. Get answers fast." },
      { icon: "📅", title: "Weekly Events", desc: "AMAs, workshops, hackathons, and networking events with industry leaders." },
      { icon: "🏆", title: "Leaderboard & Badges", desc: "Earn points for contributions. Top members get exclusive perks and recognition." },
    ]),
    () => pricing("Membership Tiers", [
      { name: "Free", price: "$0", features: "Forum access\nMonthly events\nPublic channels\nMember directory" },
      { name: "Pro", price: "$19/mo", features: "Everything Free +\nPrivate channels\nWeekly mastermind\n1:1 matching", highlighted: true },
      { name: "VIP", price: "$49/mo", features: "Everything Pro +\nMentor access\nJob board\nSponsored projects" },
    ]),
    () => testimonials("Member Stories", [
      { quote: "HiveSpace connected me with my co-founder. We've since raised $2M and have 10 employees.", name: "Alex Park", role: "Founder, TechCo" },
      { quote: "The weekly masterminds are gold. I've grown my freelance business 5x since joining.", name: "Maria Lopez", role: "Freelance Designer" },
    ]),
    () => ctaBanner("Join 50,000+ Builders", "Free forever. Upgrade anytime. The best community for ambitious builders.", "Join Free — No CC Required"),
    () => footer("dark"),
  ], 300
);

add("Dating App Landing", "Modern dating app landing with features, success stories, safety features, download, and FAQ", "social", "💕",
  ["social", "dating", "app", "relationships"],
  [
    () => nav("💕 Spark", "How It Works   Safety   Success Stories   Download", "Download Free"),
    () => hero("Find Your Person.\nNot Just a Match.", "Spark uses deep compatibility science to connect you with people who truly get you. Dating, reimagined.", "Download Free", { bg: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ef4444 100%)", color: "#ffffff", badge: "💍 10,000+ Couples & Counting" }),
    () => stats([{ value: "2M+", label: "Users" }, { value: "10K+", label: "Couples Made" }, { value: "87%", label: "Match Rate" }, { value: "4.8★", label: "App Rating" }]),
    () => features("Why Spark is Different", [
      { icon: "🧠", title: "Compatibility Science", desc: "Our algorithm analyzes 36 dimensions of personality, values, and lifestyle for deeper matches." },
      { icon: "🎥", title: "Video Dates", desc: "Built-in video calling lets you connect face-to-face before meeting in person." },
      { icon: "🛡️", title: "Safety First", desc: "Photo verification, background checks, and 24/7 moderation keep our community safe." },
    ]),
    () => testimonials("Love Stories", [
      { quote: "I was skeptical about dating apps, but Spark matched me with my now-fiancé on day three. The compatibility quiz works!", name: "Rachel & Tom", role: "Engaged after 8 months" },
      { quote: "After years of bad matches on other apps, Spark found someone who actually shares my values. We've been together a year.", name: "Jordan & Alex", role: "Together 1 year" },
    ]),
    () => faq("Common Questions", [
      { q: "Is Spark free?", a: "Yes! Core features are free. Spark Premium ($14.99/mo) adds unlimited likes, read receipts, and priority matching." },
      { q: "How is Spark different from other apps?", a: "We prioritize compatibility over superficial swiping. Our 36-dimension algorithm finds genuinely compatible matches." },
      { q: "Is my data safe?", a: "Absolutely. End-to-end encryption, GDPR compliant, and we never sell your data." },
    ]),
    () => ctaBanner("Your Person is Waiting", "Download Spark free. Create your profile in 2 minutes. Start matching tonight.", "Download for iOS & Android"),
    () => footer("light"),
  ], 280
);

add("Event Platform", "Event discovery and ticketing platform with categories, featured events, organizer tools, and pricing", "social", "🎉",
  ["social", "events", "ticketing", "platform"],
  [
    () => nav("🎉 EventHub", "Discover   Create Event   Organizers   Pricing", "Create Event"),
    () => hero("Discover Amazing\nEvents Near You", "From concerts to conferences, find and book tickets for the events that matter to you.", "Explore Events", { bg: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)", color: "#ffffff", badge: "🎫 100K+ Events Listed" }),
    () => gallery("Browse by Category", [
      { emoji: "🎵", label: "Music & Concerts" },
      { emoji: "💼", label: "Business & Networking" },
      { emoji: "🎨", label: "Arts & Culture" },
      { emoji: "🏃", label: "Sports & Fitness" },
      { emoji: "🍕", label: "Food & Drink" },
      { emoji: "🎓", label: "Education & Workshops" },
    ]),
    () => features("For Event Organizers", [
      { icon: "🎫", title: "Easy Ticketing", desc: "Sell tickets in minutes. Multiple tiers, early bird pricing, and group discounts." },
      { icon: "📊", title: "Analytics Dashboard", desc: "Real-time sales data, attendee insights, and marketing performance tracking." },
      { icon: "📧", title: "Marketing Tools", desc: "Email campaigns, social media integration, and promotional codes built in." },
    ]),
    () => stats([{ value: "100K+", label: "Events" }, { value: "5M+", label: "Tickets Sold" }, { value: "50K+", label: "Organizers" }, { value: "180+", label: "Countries" }]),
    () => pricing("Organizer Plans", [
      { name: "Free Events", price: "Free", features: "Unlimited free events\nBasic analytics\nEmail notifications\nMobile check-in" },
      { name: "Essentials", price: "2% + $0.79/ticket", features: "Everything Free +\nCustom branding\nAdvanced analytics\nPriority support", highlighted: true },
      { name: "Professional", price: "Custom", features: "Everything Essentials +\nDedicated manager\nAPI access\nCustom integrations" },
    ]),
    () => testimonials("Organizer Stories", [
      { quote: "EventHub helped us sell out our conference in record time. The tools are incredibly intuitive.", name: "Tech Conference", role: "5,000 attendees" },
      { quote: "Went from 50 to 500 attendees per event after switching to EventHub. The marketing tools are game-changing.", name: "Local Meetup Organizer", role: "Monthly Events" },
    ]),
    () => ctaBanner("Create Your Next Event", "List your event in minutes. Free for free events. Start selling tickets today.", "Create Event Free"),
    () => footer("dark"),
  ], 310
);

add("Social Network Landing", "Social media app landing with features, user stats, content showcase, safety, and download", "social", "🌐",
  ["social", "network", "app", "platform"],
  [
    () => nav("🌐 Circles", "Features   Safety   Community   Download", "Join Circles"),
    () => hero("Social Media\nThat Respects You", "No ads. No algorithms. Just genuine connections with the people and communities you care about.", "Join 1M+ Users", { bg: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)", color: "#ffffff", badge: "🛡️ Ad-Free & Privacy-First" }),
    () => stats([{ value: "1M+", label: "Users" }, { value: "0", label: "Ads Shown" }, { value: "100%", label: "User-Owned Data" }, { value: "4.9★", label: "App Rating" }]),
    () => features("Why Circles", [
      { icon: "🚫", title: "No Ads, Ever", desc: "We're subscription-funded. Your feed is pure content from people you follow. Period." },
      { icon: "🔐", title: "Privacy by Default", desc: "End-to-end encryption, no data selling, no tracking. You own your data completely." },
      { icon: "🎯", title: "Chronological Feed", desc: "See posts in order. No engagement-maximizing algorithms. Just authentic content." },
    ]),
    () => gallery("Community Spaces", [
      { emoji: "🎨", label: "Creative Arts" },
      { emoji: "💻", label: "Tech & Coding" },
      { emoji: "📚", label: "Book Club" },
      { emoji: "🏋️", label: "Fitness" },
      { emoji: "🎵", label: "Music" },
      { emoji: "🌿", label: "Sustainability" },
    ]),
    () => pricing("Simple Plans", [
      { name: "Free", price: "$0", features: "Basic profile\n5 Circles\nDirect messages\nChronological feed" },
      { name: "Supporter", price: "$5/mo", features: "Unlimited Circles\nVideo posts\nCustom themes\nPriority features", highlighted: true },
      { name: "Creator", price: "$12/mo", features: "Everything Supporter +\nAnalytics\nMonetization tools\nVerified badge" },
    ]),
    () => testimonials("User Voices", [
      { quote: "Finally, a social network that doesn't make me feel terrible. Circles is a breath of fresh air.", name: "Emily R.", role: "User since day 1" },
      { quote: "Deleted Instagram and Twitter. Circles gives me everything I want without the toxicity.", name: "Marcus J.", role: "Creator" },
    ]),
    () => ctaBanner("Join the Movement", "1 million+ people have chosen a better social network. Will you?", "Download Circles Free"),
    () => footer("dark"),
  ], 290
);

/* ================================================================
   HTTP HANDLER
   ================================================================ */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Parse optional mode
    let mode = "upsert"; // default: skip existing
    try {
      const body = await req.json();
      if (body?.mode) mode = body.mode;
    } catch { /* no body is fine */ }

    // Get existing template names
    const { data: existing } = await supabase
      .from("templates")
      .select("name");
    const existingNames = new Set((existing || []).map((t: any) => t.name));

    if (mode === "reset") {
      // Delete all templates first
      await supabase.from("templates").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      existingNames.clear();
    }

    // Filter new templates
    const toInsert = allTemplates
      .filter((t) => !existingNames.has(t.name))
      .map((t) => ({
        ...t,
        preview_image_url: matchPreview(t.name, t.category),
      }));

    if (toInsert.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "All templates already exist", count: allTemplates.length }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert in batches of 10
    let inserted = 0;
    for (let i = 0; i < toInsert.length; i += 10) {
      const batch = toInsert.slice(i, i + 10);
      const { error } = await supabase.from("templates").insert(batch);
      if (error) throw error;
      inserted += batch.length;
    }

    return new Response(
      JSON.stringify({ success: true, inserted, total: allTemplates.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
