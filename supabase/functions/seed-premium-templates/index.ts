import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Helpers ──────────────────────────────────────────────────
let counter = 0;
const uid = (prefix = "c") => `${prefix}-${Date.now()}-${++counter}-${Math.random().toString(36).slice(2, 8)}`;

const comp = (type: string, content: string, styles: Record<string, string> = {}, props: Record<string, any> = {}) => ({
  id: uid("comp"),
  type,
  content,
  styles,
  props,
  children: [],
});

const section = (type: string, label: string, styles: Record<string, string>, components: any[]) => ({
  id: uid("sec"),
  type,
  label,
  styles,
  components,
});

// ── Reusable Section Builders ────────────────────────────────
const nav = (brand: string, links: string[], cta = "Get Started", style: "light" | "dark" = "dark") =>
  section("header", "Navigation", {
    backgroundColor: style === "dark" ? "#0f172a" : "#ffffff",
    padding: "16px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: style === "dark" ? "1px solid #1e293b" : "1px solid #e5e7eb",
  }, [
    comp("heading-h4", brand, { color: style === "dark" ? "#ffffff" : "#0f172a", fontWeight: "800", fontSize: "22px", margin: "0" }),
    ...links.map(l => comp("link-button", l, { color: style === "dark" ? "#94a3b8" : "#475569", fontSize: "14px", fontWeight: "500", textDecoration: "none" })),
    comp("button", cta, { backgroundColor: "#6366f1", color: "#ffffff", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", border: "none" }),
  ]);

const hero = (eyebrow: string, title: string, subtitle: string, cta1: string, cta2: string, bg = "#0f172a", accent = "#6366f1") =>
  section("body", "Hero", {
    backgroundColor: bg,
    padding: "100px 40px",
    textAlign: "center",
  }, [
    comp("eyebrow", eyebrow, { color: accent, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }),
    comp("heading-h1", title, { color: bg === "#0f172a" ? "#ffffff" : "#0f172a", fontSize: "56px", fontWeight: "800", lineHeight: "1.1", maxWidth: "800px", margin: "0 auto 24px" }),
    comp("paragraph", subtitle, { color: bg === "#0f172a" ? "#94a3b8" : "#64748b", fontSize: "20px", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto 40px" }),
    comp("button", cta1, { backgroundColor: accent, color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontWeight: "600", fontSize: "16px", border: "none", marginRight: "12px" }),
    comp("button", cta2, { backgroundColor: "transparent", color: bg === "#0f172a" ? "#ffffff" : "#0f172a", padding: "14px 32px", borderRadius: "8px", fontWeight: "600", fontSize: "16px", border: "1px solid " + (bg === "#0f172a" ? "#334155" : "#d1d5db") }),
  ]);

const features = (title: string, subtitle: string, items: { icon: string; title: string; desc: string }[], bg = "#ffffff", cols = 3) =>
  section("body", "Features", {
    backgroundColor: bg,
    padding: "80px 40px",
  }, [
    comp("heading-h2", title, { color: bg === "#ffffff" ? "#0f172a" : "#ffffff", fontSize: "40px", fontWeight: "700", textAlign: "center", marginBottom: "12px" }),
    comp("paragraph", subtitle, { color: bg === "#ffffff" ? "#64748b" : "#94a3b8", fontSize: "18px", textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }),
    ...items.map(item => comp("card", "", {
      backgroundColor: bg === "#ffffff" ? "#f8fafc" : "#1e293b",
      padding: "32px",
      borderRadius: "16px",
      border: bg === "#ffffff" ? "1px solid #e2e8f0" : "1px solid #334155",
    }, {
      icon: item.icon,
      title: item.title,
      description: item.desc,
    })),
  ]);

const testimonials = (title: string, items: { quote: string; name: string; role: string; rating?: number }[], bg = "#f8fafc") =>
  section("body", "Testimonials", {
    backgroundColor: bg,
    padding: "80px 40px",
  }, [
    comp("heading-h2", title, { color: "#0f172a", fontSize: "40px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }),
    ...items.map(t => comp("testimonial-quote", `"${t.quote}"`, {
      backgroundColor: "#ffffff",
      padding: "32px",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    }, { author: `${t.name}, ${t.role}`, rating: t.rating || 5 })),
  ]);

const pricing = (title: string, subtitle: string, plans: { name: string; price: string; period: string; features: string; featured?: boolean }[]) =>
  section("body", "Pricing", {
    backgroundColor: "#0f172a",
    padding: "80px 40px",
  }, [
    comp("heading-h2", title, { color: "#ffffff", fontSize: "40px", fontWeight: "700", textAlign: "center", marginBottom: "12px" }),
    comp("paragraph", subtitle, { color: "#94a3b8", fontSize: "18px", textAlign: "center", marginBottom: "48px" }),
    ...plans.map(p => comp("card", "", {
      backgroundColor: p.featured ? "#6366f1" : "#1e293b",
      padding: "40px",
      borderRadius: "16px",
      border: p.featured ? "2px solid #818cf8" : "1px solid #334155",
    }, {
      name: p.name,
      price: p.price,
      period: p.period,
      description: p.features,
      featured: p.featured || false,
    })),
  ]);

const stats = (items: { value: string; label: string }[], bg = "#6366f1") =>
  section("body", "Stats", {
    backgroundColor: bg,
    padding: "60px 40px",
    display: "flex",
    justifyContent: "center",
    gap: "60px",
    textAlign: "center",
  }, items.map(s => comp("heading-h2", s.value, { color: "#ffffff", fontSize: "48px", fontWeight: "800", marginBottom: "8px" }, { subtitle: s.label })));

const cta = (title: string, subtitle: string, btnText: string, bg = "#0f172a", accent = "#6366f1") =>
  section("body", "CTA", {
    backgroundColor: bg,
    padding: "80px 40px",
    textAlign: "center",
  }, [
    comp("heading-h2", title, { color: "#ffffff", fontSize: "40px", fontWeight: "700", marginBottom: "16px" }),
    comp("paragraph", subtitle, { color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }),
    comp("button", btnText, { backgroundColor: accent, color: "#ffffff", padding: "16px 40px", borderRadius: "8px", fontWeight: "600", fontSize: "18px", border: "none" }),
  ]);

const footer = (brand: string, cols: { title: string; links: string[] }[], style: "dark" | "light" = "dark") =>
  section("footer", "Footer", {
    backgroundColor: style === "dark" ? "#0f172a" : "#f8fafc",
    padding: "60px 40px 30px",
    borderTop: style === "dark" ? "1px solid #1e293b" : "1px solid #e5e7eb",
  }, [
    comp("heading-h4", brand, { color: style === "dark" ? "#ffffff" : "#0f172a", fontWeight: "700", marginBottom: "24px" }),
    ...cols.flatMap(c => [
      comp("heading-h4", c.title, { color: style === "dark" ? "#e2e8f0" : "#334155", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }),
      ...c.links.map(l => comp("paragraph", l, { color: style === "dark" ? "#64748b" : "#94a3b8", fontSize: "14px", marginBottom: "6px" })),
    ]),
    comp("divider", "", { backgroundColor: style === "dark" ? "#1e293b" : "#e5e7eb", margin: "30px 0 20px" }),
    comp("small-text", `© 2026 ${brand}. All rights reserved.`, { color: "#64748b", textAlign: "center" }),
  ]);

const faqSection = (title: string, items: { q: string; a: string }[], bg = "#ffffff") =>
  section("body", "FAQ", {
    backgroundColor: bg,
    padding: "80px 40px",
  }, [
    comp("heading-h2", title, { color: "#0f172a", fontSize: "40px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }),
    ...items.map(f => comp("card", "", {
      backgroundColor: "#f8fafc",
      padding: "24px",
      borderRadius: "12px",
      marginBottom: "12px",
      border: "1px solid #e2e8f0",
    }, { title: f.q, description: f.a })),
  ]);

const team = (title: string, members: { name: string; role: string }[], bg = "#ffffff") =>
  section("body", "Team", {
    backgroundColor: bg,
    padding: "80px 40px",
  }, [
    comp("heading-h2", title, { color: "#0f172a", fontSize: "40px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }),
    ...members.map(m => comp("card", "", {
      backgroundColor: "#f8fafc",
      padding: "32px",
      borderRadius: "16px",
      textAlign: "center",
      border: "1px solid #e2e8f0",
    }, { title: m.name, description: m.role })),
  ]);

const newsletter = (title: string, subtitle: string, bg = "#f8fafc") =>
  section("body", "Newsletter", {
    backgroundColor: bg,
    padding: "60px 40px",
    textAlign: "center",
  }, [
    comp("heading-h3", title, { color: "#0f172a", fontSize: "28px", fontWeight: "700", marginBottom: "12px" }),
    comp("paragraph", subtitle, { color: "#64748b", marginBottom: "24px" }),
    comp("form", "Subscribe", { maxWidth: "400px", margin: "0 auto" }, { buttonText: "Subscribe", placeholder: "Enter your email" }),
  ]);

const gallery = (title: string, count = 6, bg = "#ffffff") =>
  section("body", "Gallery", {
    backgroundColor: bg,
    padding: "80px 40px",
  }, [
    comp("heading-h2", title, { color: "#0f172a", fontSize: "40px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }),
    ...Array.from({ length: count }, (_, i) => comp("image", `Gallery Image ${i + 1}`, {
      backgroundColor: "#e2e8f0",
      borderRadius: "12px",
      height: "250px",
      width: "100%",
    }, { alt: `Gallery image ${i + 1}` })),
  ]);

const contactSection = (title: string, subtitle: string, bg = "#ffffff") =>
  section("body", "Contact", {
    backgroundColor: bg,
    padding: "80px 40px",
  }, [
    comp("heading-h2", title, { color: "#0f172a", fontSize: "40px", fontWeight: "700", textAlign: "center", marginBottom: "12px" }),
    comp("paragraph", subtitle, { color: "#64748b", textAlign: "center", marginBottom: "40px" }),
    comp("form", "Contact Us", {
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f8fafc",
      padding: "40px",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
    }, { buttonText: "Send Message", fields: "name,email,message" }),
  ]);

const logoCloud = (title: string, logos: string[], bg = "#ffffff") =>
  section("body", "Trusted By", {
    backgroundColor: bg,
    padding: "40px",
    textAlign: "center",
  }, [
    comp("small-text", title, { color: "#94a3b8", fontSize: "13px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "24px" }),
    ...logos.map(l => comp("paragraph", l, { color: "#94a3b8", fontSize: "18px", fontWeight: "600", display: "inline-block", margin: "0 20px" })),
  ]);

// ═══════════════════════════════════════════════════════════════
// TEMPLATES
// ═══════════════════════════════════════════════════════════════

const allTemplates: any[] = [];

const add = (name: string, description: string, category: string, thumbnail: string, tags: string[], sections: any[], installBase = 100) => {
  allTemplates.push({
    name,
    description,
    category,
    thumbnail,
    tags,
    is_public: true,
    is_premium: false,
    installs: installBase + Math.floor(Math.random() * 200),
    schema: { id: `page-${uid("t")}`, name, sections },
  });
};

// ═══ SaaS ═══════════════════════════════════════════════════
add("SaaS Pro", "Modern SaaS landing page with pricing tiers and feature showcase", "saas", "🚀", ["saas", "startup", "product"], [
  nav("SaaSPro", ["Features", "Pricing", "Docs", "Blog"], "Start Free Trial"),
  hero("LAUNCH YOUR PRODUCT", "Build, Ship & Scale Your SaaS Faster", "The all-in-one platform for modern SaaS companies. From idea to IPO.", "Start Free Trial", "Watch Demo"),
  logoCloud("TRUSTED BY 10,000+ COMPANIES", ["Stripe", "Vercel", "Linear", "Notion", "Figma"]),
  features("Everything You Need", "Powerful features to help you build better products faster", [
    { icon: "⚡", title: "Lightning Fast", desc: "Sub-100ms response times with edge computing and CDN delivery." },
    { icon: "🔒", title: "Enterprise Security", desc: "SOC 2 Type II certified with end-to-end encryption." },
    { icon: "📊", title: "Real-time Analytics", desc: "Track every metric that matters with beautiful dashboards." },
    { icon: "🔌", title: "API First", desc: "RESTful and GraphQL APIs with comprehensive documentation." },
    { icon: "🤖", title: "AI Powered", desc: "Built-in machine learning for intelligent automation." },
    { icon: "🌍", title: "Global Scale", desc: "Deploy to 30+ regions worldwide with one click." },
  ]),
  stats([{ value: "10K+", label: "Active Users" }, { value: "99.99%", label: "Uptime" }, { value: "50M+", label: "API Calls/day" }, { value: "150+", label: "Countries" }]),
  pricing("Simple, Transparent Pricing", "No hidden fees. No surprises. Cancel anytime.", [
    { name: "Starter", price: "$29", period: "/month", features: "5 projects\n10K API calls\nEmail support\nBasic analytics" },
    { name: "Pro", price: "$79", period: "/month", features: "Unlimited projects\n100K API calls\nPriority support\nAdvanced analytics\nCustom domains", featured: true },
    { name: "Enterprise", price: "$299", period: "/month", features: "Unlimited everything\nDedicated support\nSLA guarantee\nSSO & SAML\nCustom integrations" },
  ]),
  testimonials("Loved by Developers", [
    { quote: "SaaS Pro cut our development time by 60%. The API is incredibly well-designed.", name: "Sarah Chen", role: "CTO at Vercel" },
    { quote: "We migrated our entire infrastructure in a weekend. Best decision we ever made.", name: "Marcus Johnson", role: "Lead Engineer at Stripe" },
    { quote: "The analytics dashboard alone is worth the price. Game-changing product.", name: "Emily Rodriguez", role: "PM at Linear" },
  ]),
  faqSection("Frequently Asked Questions", [
    { q: "How does the free trial work?", a: "You get 14 days of full access to all Pro features. No credit card required." },
    { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately." },
    { q: "Do you offer refunds?", a: "Yes, we offer a 30-day money-back guarantee on all plans." },
    { q: "Is there an API rate limit?", a: "Rate limits depend on your plan. Enterprise plans have no rate limits." },
  ]),
  cta("Ready to Ship Faster?", "Join 10,000+ developers building with SaaS Pro", "Start Free Trial →"),
  footer("SaaSPro", [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "API Docs"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
  ]),
]);

add("SaaS Dashboard", "Analytics dashboard SaaS with data visualization focus", "saas", "📊", ["saas", "dashboard", "analytics"], [
  nav("DataFlow", ["Dashboard", "Reports", "Integrations", "Docs"], "Try Free"),
  hero("ANALYTICS REIMAGINED", "Turn Data Into Decisions", "Beautiful, real-time dashboards that your entire team will actually use.", "Get Started Free", "See Live Demo"),
  features("Powerful Analytics Suite", "Everything you need to understand your data", [
    { icon: "📈", title: "Real-time Dashboards", desc: "Live data updates every second with customizable widgets and charts." },
    { icon: "🎯", title: "Goal Tracking", desc: "Set KPIs and track progress with automated alerts and notifications." },
    { icon: "🔗", title: "200+ Integrations", desc: "Connect your entire tech stack in minutes, not days." },
    { icon: "📱", title: "Mobile Ready", desc: "Full-featured mobile app for iOS and Android." },
  ]),
  stats([{ value: "2M+", label: "Data Points/sec" }, { value: "200+", label: "Integrations" }, { value: "5K+", label: "Teams" }, { value: "<50ms", label: "Query Time" }]),
  testimonials("What Teams Say", [
    { quote: "Finally, analytics our marketing team can actually use without asking engineering.", name: "Alex Kim", role: "VP Marketing" },
    { quote: "DataFlow replaced 5 different tools for us. The ROI was immediate.", name: "Priya Patel", role: "Head of Data" },
  ]),
  pricing("Choose Your Plan", "Start free, scale as you grow", [
    { name: "Free", price: "$0", period: "/month", features: "3 dashboards\n1K events/day\n7-day retention\nEmail support" },
    { name: "Growth", price: "$49", period: "/month", features: "Unlimited dashboards\n100K events/day\n1-year retention\nPriority support", featured: true },
    { name: "Scale", price: "$199", period: "/month", features: "Everything in Growth\n10M events/day\nUnlimited retention\nDedicated CSM\nSSO" },
  ]),
  newsletter("Stay Updated", "Get product updates and analytics tips delivered weekly"),
  cta("Start Analyzing Today", "Free 14-day trial. No credit card required.", "Create Free Account"),
  footer("DataFlow", [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "API"] },
    { title: "Resources", links: ["Documentation", "Blog", "Community", "Status"] },
    { title: "Company", links: ["About", "Careers", "Contact", "Press"] },
  ]),
]);

add("SaaS Collaboration", "Team collaboration platform landing page", "saas", "👥", ["saas", "collaboration", "teams"], [
  nav("TeamSync", ["Features", "Teams", "Pricing", "Enterprise"], "Start Free"),
  hero("WORK BETTER TOGETHER", "Where Teams Do Their Best Work", "Real-time collaboration, async communication, and project management — all in one place.", "Try For Free", "Book a Demo"),
  logoCloud("POWERING THE WORLD'S BEST TEAMS", ["Google", "Microsoft", "Amazon", "Meta", "Apple"]),
  features("Built for Modern Teams", "From startups to Fortune 500, teams love TeamSync", [
    { icon: "💬", title: "Channels & DMs", desc: "Organized conversations with threads, reactions, and rich formatting." },
    { icon: "📋", title: "Project Boards", desc: "Kanban, timeline, and list views to manage any workflow." },
    { icon: "📁", title: "File Sharing", desc: "Share, preview, and collaborate on files without leaving the app." },
    { icon: "🎥", title: "Video Calls", desc: "HD video meetings with screen sharing and recording." },
    { icon: "🔍", title: "Universal Search", desc: "Find anything across messages, files, and projects instantly." },
    { icon: "🤖", title: "AI Assistant", desc: "Summarize threads, draft messages, and automate workflows." },
  ]),
  stats([{ value: "500K+", label: "Teams" }, { value: "50M+", label: "Messages/day" }, { value: "99.99%", label: "Uptime" }]),
  testimonials("Teams Love TeamSync", [
    { quote: "We replaced Slack, Asana, and Zoom with one tool. Productivity went through the roof.", name: "David Park", role: "CEO at FastTrack" },
    { quote: "The AI assistant saves me 2 hours a day summarizing long threads. Incredible.", name: "Lisa Wong", role: "Engineering Manager" },
    { quote: "Onboarding new team members went from 2 weeks to 2 days.", name: "Tom Baker", role: "HR Director" },
  ]),
  cta("Transform How Your Team Works", "Free for teams up to 10. No credit card needed.", "Get Started Free →"),
  footer("TeamSync", [
    { title: "Product", links: ["Features", "Security", "Enterprise", "Pricing"] },
    { title: "Solutions", links: ["Engineering", "Design", "Marketing", "Sales"] },
    { title: "Support", links: ["Help Center", "API Docs", "Status", "Contact"] },
  ]),
]);

add("SaaS AI Platform", "AI/ML platform with modern dark theme", "saas", "🤖", ["saas", "ai", "machine-learning"], [
  nav("NeuralAI", ["Platform", "Models", "Pricing", "Research"], "Get API Key", "dark"),
  hero("THE FUTURE OF AI", "Build Intelligent Apps in Minutes", "Access state-of-the-art AI models through a simple API. No ML expertise required.", "Get API Key", "Read Docs", "#0a0a0a", "#8b5cf6"),
  features("Platform Capabilities", "Enterprise-grade AI infrastructure at your fingertips", [
    { icon: "🧠", title: "Foundation Models", desc: "GPT-4, Claude, Llama, and more — unified under one API." },
    { icon: "⚡", title: "Edge Inference", desc: "Run models at the edge with sub-10ms latency globally." },
    { icon: "🔧", title: "Fine-tuning", desc: "Custom train models on your data with zero ML experience needed." },
    { icon: "🛡️", title: "Safety & Guardrails", desc: "Built-in content filtering, PII detection, and bias monitoring." },
  ], "#0a0a0a"),
  stats([{ value: "1B+", label: "Inferences/day" }, { value: "50+", label: "AI Models" }, { value: "20ms", label: "Avg Latency" }, { value: "10K+", label: "Developers" }], "#8b5cf6"),
  pricing("Developer-Friendly Pricing", "Pay only for what you use. No minimum commitments.", [
    { name: "Hobby", price: "$0", period: "/month", features: "1K requests/day\n5 models\nCommunity support\nBasic analytics" },
    { name: "Pro", price: "$49", period: "/month", features: "100K requests/day\nAll models\nPriority support\nAdvanced analytics\nFine-tuning", featured: true },
    { name: "Enterprise", price: "Custom", period: "", features: "Unlimited requests\nCustom models\nDedicated support\nSLA & BAA\nOn-premise option" },
  ]),
  cta("Start Building with AI", "Free tier available. No credit card required.", "Get Your API Key →", "#0a0a0a", "#8b5cf6"),
  footer("NeuralAI", [
    { title: "Platform", links: ["Models", "API Reference", "SDKs", "Playground"] },
    { title: "Resources", links: ["Documentation", "Research", "Blog", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Security", "Contact"] },
  ]),
]);

// ═══ Agency ═══════════════════════════════════════════════════
add("Digital Agency", "Full-service digital agency with portfolio showcase", "agency", "🎨", ["agency", "creative", "design"], [
  nav("Pixel Studio", ["Work", "Services", "About", "Journal"], "Let's Talk", "light"),
  hero("DIGITAL AGENCY", "We Create Digital Experiences That Matter", "Award-winning design studio specializing in brand identity, web design, and digital products.", "View Our Work", "Get in Touch", "#ffffff", "#0f172a"),
  logoCloud("CLIENTS WE'VE WORKED WITH", ["Nike", "Apple", "Spotify", "Netflix", "Airbnb"]),
  features("Our Services", "From strategy to execution, we deliver end-to-end solutions", [
    { icon: "🎨", title: "Brand Identity", desc: "Logos, visual systems, and brand guidelines that make you stand out." },
    { icon: "💻", title: "Web Design", desc: "Beautiful, responsive websites that convert visitors into customers." },
    { icon: "📱", title: "App Design", desc: "Intuitive mobile experiences that users love and keep coming back to." },
    { icon: "📹", title: "Motion Design", desc: "Animations and videos that bring your brand story to life." },
    { icon: "📈", title: "Growth Strategy", desc: "Data-driven marketing strategies that drive measurable results." },
    { icon: "🔧", title: "Development", desc: "Clean, performant code built with modern technologies." },
  ], "#f8fafc"),
  gallery("Selected Work", 6),
  stats([{ value: "200+", label: "Projects" }, { value: "50+", label: "Awards" }, { value: "98%", label: "Client Retention" }, { value: "12", label: "Years" }], "#0f172a"),
  testimonials("Client Stories", [
    { quote: "Pixel Studio transformed our brand and doubled our conversion rates within 3 months.", name: "Jennifer Lee", role: "CMO at TechCorp", rating: 5 },
    { quote: "The best creative team we've ever worked with. They truly understand brand storytelling.", name: "Michael Torres", role: "Founder at Bloom", rating: 5 },
    { quote: "They don't just design — they solve business problems with creativity.", name: "Anna Kowalski", role: "CEO at Luxe", rating: 5 },
  ]),
  team("Meet Our Team", [
    { name: "Alex Rivera", role: "Creative Director" },
    { name: "Sam Chen", role: "Lead Designer" },
    { name: "Jordan Williams", role: "Head of Strategy" },
    { name: "Taylor Kim", role: "Tech Lead" },
  ]),
  cta("Let's Create Something Amazing", "Tell us about your project and we'll get back to you within 24 hours.", "Start a Project →"),
  footer("Pixel Studio", [
    { title: "Services", links: ["Branding", "Web Design", "App Design", "Development"] },
    { title: "Company", links: ["About", "Team", "Careers", "Journal"] },
    { title: "Connect", links: ["Twitter", "Dribbble", "Instagram", "LinkedIn"] },
  ]),
]);

add("Marketing Agency", "Performance marketing agency with results focus", "agency", "📈", ["agency", "marketing", "growth"], [
  nav("GrowthLab", ["Services", "Case Studies", "Results", "About"], "Free Audit"),
  hero("PERFORMANCE MARKETING", "We Grow Brands That Make an Impact", "Data-driven marketing agency delivering 10x ROI through paid ads, SEO, and content strategy.", "Get Free Audit", "See Results"),
  stats([{ value: "$50M+", label: "Revenue Generated" }, { value: "300%", label: "Avg ROI" }, { value: "150+", label: "Brands Grown" }, { value: "10x", label: "ROAS Average" }]),
  features("How We Grow Your Brand", "Full-funnel marketing strategies powered by data", [
    { icon: "🎯", title: "Paid Advertising", desc: "Google, Meta, TikTok ads managed by certified experts." },
    { icon: "🔍", title: "SEO & Content", desc: "Organic growth strategies that compound over time." },
    { icon: "📧", title: "Email Marketing", desc: "Automated flows that nurture leads and drive conversions." },
    { icon: "📊", title: "Analytics & CRO", desc: "Conversion optimization based on real user behavior data." },
  ]),
  testimonials("Client Results", [
    { quote: "GrowthLab scaled our e-commerce revenue from $1M to $10M in 18 months.", name: "Rachel Green", role: "CEO at StyleCo" },
    { quote: "Our cost per acquisition dropped 60% while volume increased 3x.", name: "James Wilson", role: "Head of Growth at Fintech" },
  ]),
  faqSection("Common Questions", [
    { q: "How long before we see results?", a: "Most clients see meaningful results within the first 30 days." },
    { q: "What's the minimum budget?", a: "We work with brands spending $10K+/month on advertising." },
    { q: "Do you offer reporting?", a: "Yes, weekly reports and monthly strategy reviews with your dedicated team." },
  ]),
  cta("Get Your Free Marketing Audit", "We'll analyze your current marketing and identify growth opportunities.", "Request Free Audit →"),
  footer("GrowthLab", [
    { title: "Services", links: ["Paid Ads", "SEO", "Email", "Social Media"] },
    { title: "Resources", links: ["Case Studies", "Blog", "Newsletter", "Tools"] },
    { title: "Company", links: ["About", "Team", "Careers", "Contact"] },
  ]),
]);

add("Web Dev Agency", "Modern web development agency", "agency", "💻", ["agency", "development", "web"], [
  nav("CodeCraft", ["Services", "Portfolio", "Process", "Team"], "Get Quote", "dark"),
  hero("WEB DEVELOPMENT", "We Build Web Apps That Scale", "Custom web applications, e-commerce platforms, and SaaS products built with cutting-edge technology.", "Get a Quote", "View Portfolio"),
  features("Technical Expertise", "Modern tech stack for modern businesses", [
    { icon: "⚛️", title: "React & Next.js", desc: "Server-rendered, blazing-fast web applications." },
    { icon: "📱", title: "React Native", desc: "Cross-platform mobile apps from a single codebase." },
    { icon: "☁️", title: "Cloud Architecture", desc: "AWS, GCP, and Azure infrastructure that auto-scales." },
    { icon: "🗄️", title: "Backend & APIs", desc: "Node.js, Python, Go — we pick the right tool for your needs." },
  ]),
  stats([{ value: "500+", label: "Apps Built" }, { value: "99.9%", label: "Uptime" }, { value: "15+", label: "Years" }, { value: "60+", label: "Engineers" }]),
  testimonials("Client Feedback", [
    { quote: "CodeCraft rebuilt our platform in 3 months. Performance improved 10x.", name: "Robert Zhang", role: "CTO at DataStream" },
    { quote: "They feel like an extension of our team. Communication is excellent.", name: "Maria Santos", role: "VP Eng at CloudBase" },
  ]),
  contactSection("Start Your Project", "Tell us about your idea and we'll provide a detailed proposal within 48 hours."),
  footer("CodeCraft", [
    { title: "Services", links: ["Web Apps", "Mobile Apps", "E-commerce", "Consulting"] },
    { title: "Technologies", links: ["React", "Node.js", "Python", "Cloud"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
  ]),
]);

add("Branding Agency", "Minimalist branding agency with editorial style", "agency", "✨", ["agency", "branding", "identity"], [
  nav("MONO", ["Work", "Process", "Studio", "Contact"], "Inquire", "light"),
  hero("BRANDING STUDIO", "Brands That Speak. Identities That Last.", "We craft visual identities for ambitious brands that want to be remembered.", "See Our Work", "Our Process", "#ffffff", "#000000"),
  gallery("Selected Branding Projects", 4),
  features("Our Approach", "Every brand deserves a thoughtful, strategic identity", [
    { icon: "🔬", title: "Research & Discovery", desc: "Deep understanding of your market, audience, and competitors." },
    { icon: "💡", title: "Strategy & Positioning", desc: "Clear brand positioning that differentiates you from the crowd." },
    { icon: "🎨", title: "Visual Identity", desc: "Logo, typography, color, and comprehensive brand guidelines." },
    { icon: "📦", title: "Brand Delivery", desc: "Complete asset library with usage guidelines and templates." },
  ], "#f8fafc"),
  testimonials("What Clients Say", [
    { quote: "MONO didn't just give us a logo — they gave us a complete brand world.", name: "Kate Murphy", role: "Founder at Bloom" },
    { quote: "Exceptional attention to detail and a deep understanding of what makes brands tick.", name: "Ian Foster", role: "CEO at Horizon" },
    { quote: "The brand guidelines they produced were the most thorough we've ever received.", name: "Sofia Reyes", role: "Marketing Director" },
  ]),
  cta("Let's Build Your Brand", "We take on 4 new clients per quarter. Let's see if we're a good fit.", "Start Inquiry →", "#000000", "#000000"),
  footer("MONO", [
    { title: "Studio", links: ["Work", "Process", "About", "Journal"] },
    { title: "Social", links: ["Instagram", "Behance", "Dribbble", "LinkedIn"] },
    { title: "Contact", links: ["hello@mono.studio", "New York, NY", "+1 (555) 123-4567"] },
  ]),
]);

// ═══ Portfolio ════════════════════════════════════════════════
add("Developer Portfolio", "Modern developer portfolio with project showcase", "portfolio", "👨‍💻", ["portfolio", "developer", "personal"], [
  nav("John.dev", ["Projects", "About", "Blog", "Resume"], "Contact", "dark"),
  hero("FULL-STACK DEVELOPER", "I Build Things for the Web", "Senior software engineer specializing in React, TypeScript, and cloud architecture.", "View Projects", "Download CV"),
  features("Tech Stack", "Technologies I work with daily", [
    { icon: "⚛️", title: "Frontend", desc: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion" },
    { icon: "🗄️", title: "Backend", desc: "Node.js, Python, Go, GraphQL, REST APIs" },
    { icon: "☁️", title: "Infrastructure", desc: "AWS, Docker, Kubernetes, CI/CD, Terraform" },
    { icon: "🗃️", title: "Databases", desc: "PostgreSQL, MongoDB, Redis, Elasticsearch" },
  ]),
  gallery("Featured Projects", 4),
  stats([{ value: "8+", label: "Years Experience" }, { value: "50+", label: "Projects" }, { value: "30+", label: "Open Source" }, { value: "5K+", label: "GitHub Stars" }]),
  testimonials("Recommendations", [
    { quote: "John is one of the most talented engineers I've had the pleasure of working with.", name: "Sarah Lead", role: "Engineering Director" },
    { quote: "His code quality and attention to detail are exceptional. Highly recommend.", name: "Mike CTO", role: "CTO at StartupX" },
  ]),
  contactSection("Get in Touch", "Interested in working together? Let's talk."),
  footer("John.dev", [
    { title: "Navigation", links: ["Projects", "About", "Blog", "Contact"] },
    { title: "Connect", links: ["GitHub", "LinkedIn", "Twitter", "Email"] },
  ]),
]);

add("Designer Portfolio", "Creative designer portfolio with gallery focus", "portfolio", "🎨", ["portfolio", "designer", "creative"], [
  nav("Jane Design", ["Portfolio", "About", "Process", "Contact"], "Hire Me", "light"),
  hero("UI/UX DESIGNER", "Designing Experiences People Love", "Senior product designer with 10+ years crafting intuitive digital experiences for top brands.", "View Portfolio", "About Me", "#ffffff", "#ec4899"),
  logoCloud("BRANDS I'VE DESIGNED FOR", ["Apple", "Google", "Spotify", "Airbnb", "Stripe"]),
  gallery("Selected Work", 6),
  features("Design Services", "From concept to polished product", [
    { icon: "🖌️", title: "UI Design", desc: "Pixel-perfect interfaces with modern aesthetics and attention to detail." },
    { icon: "🔬", title: "UX Research", desc: "User interviews, testing, and data-driven design decisions." },
    { icon: "📐", title: "Design Systems", desc: "Scalable component libraries and comprehensive style guides." },
    { icon: "✨", title: "Prototyping", desc: "Interactive prototypes that bring your vision to life." },
  ], "#fdf2f8"),
  stats([{ value: "200+", label: "Projects" }, { value: "10+", label: "Years" }, { value: "15", label: "Awards" }, { value: "50+", label: "Clients" }], "#ec4899"),
  testimonials("Kind Words", [
    { quote: "Jane's design intuition is unmatched. She elevated our entire product experience.", name: "Chris Product", role: "VP Product" },
    { quote: "Working with Jane was a dream. She delivered beyond our expectations.", name: "Emma Startup", role: "Founder at XYZ" },
  ]),
  contactSection("Let's Create Together", "Available for freelance projects and full-time opportunities."),
  footer("Jane Design", [
    { title: "Work", links: ["Portfolio", "Case Studies", "Dribbble", "Behance"] },
    { title: "Connect", links: ["Instagram", "Twitter", "LinkedIn", "Email"] },
  ]),
]);

add("Photographer Portfolio", "Photography portfolio with immersive gallery", "portfolio", "📸", ["portfolio", "photography", "visual"], [
  nav("Alex Photo", ["Portfolio", "About", "Services", "Contact"], "Book Session", "dark"),
  hero("PHOTOGRAPHER", "Capturing Moments That Last Forever", "Professional photographer specializing in portraits, weddings, and commercial photography.", "View Gallery", "Book a Session"),
  gallery("Recent Work", 8),
  features("Photography Services", "Professional photography for every occasion", [
    { icon: "👰", title: "Wedding Photography", desc: "Full-day coverage capturing every magical moment of your special day." },
    { icon: "👤", title: "Portraits", desc: "Professional headshots and creative portrait sessions." },
    { icon: "🏢", title: "Commercial", desc: "Product, food, and architectural photography for brands." },
    { icon: "🎉", title: "Events", desc: "Corporate events, parties, and milestone celebrations." },
  ]),
  testimonials("Client Reviews", [
    { quote: "Alex captured our wedding so beautifully. Every photo tells a story.", name: "Sarah & James", role: "Wedding Couple" },
    { quote: "Best investment for our brand's visual identity. Absolutely stunning work.", name: "Brand Manager", role: "Luxury Retail" },
  ]),
  pricing("Photography Packages", "Choose the perfect package for your needs", [
    { name: "Essential", price: "$500", period: "/session", features: "2-hour session\n50 edited photos\nOnline gallery\nDigital delivery" },
    { name: "Premium", price: "$1,200", period: "/session", features: "4-hour session\n150 edited photos\nOnline gallery\nPrint-ready files\nAlbum design", featured: true },
    { name: "Full Day", price: "$2,500", period: "/day", features: "8-hour coverage\n300+ edited photos\nOnline gallery\nPrint-ready files\nAlbum + prints" },
  ]),
  contactSection("Book Your Session", "Let's create something beautiful together."),
  footer("Alex Photo", [
    { title: "Services", links: ["Weddings", "Portraits", "Commercial", "Events"] },
    { title: "Connect", links: ["Instagram", "500px", "Pinterest", "Email"] },
  ]),
]);

add("Freelancer Portfolio", "Multi-purpose freelancer portfolio", "portfolio", "💼", ["portfolio", "freelancer", "multi-purpose"], [
  nav("Sam Creative", ["Work", "Skills", "Testimonials", "Contact"], "Hire Me", "dark"),
  hero("FREELANCER", "Creative Problem Solver for Hire", "I help startups and businesses build beautiful, functional digital products.", "See My Work", "Download Resume"),
  features("What I Do", "Versatile skills for diverse projects", [
    { icon: "💻", title: "Web Development", desc: "Custom websites and web apps using modern frameworks." },
    { icon: "🎨", title: "UI/UX Design", desc: "User-centered design that looks great and works even better." },
    { icon: "📱", title: "Mobile Apps", desc: "Cross-platform apps for iOS and Android." },
    { icon: "📊", title: "Consulting", desc: "Technical strategy and architecture consulting." },
  ]),
  stats([{ value: "100+", label: "Projects" }, { value: "5+", label: "Years" }, { value: "50+", label: "Happy Clients" }, { value: "4.9★", label: "Rating" }]),
  gallery("Portfolio Highlights", 4),
  testimonials("What Clients Say", [
    { quote: "Sam delivered a stunning website on time and under budget. Will hire again!", name: "Startup CEO", role: "Tech Startup" },
    { quote: "Excellent communicator and incredibly talented. A true professional.", name: "Agency Director", role: "Creative Agency" },
  ]),
  contactSection("Let's Work Together", "Tell me about your project and I'll get back within 24 hours."),
  footer("Sam Creative", [
    { title: "Pages", links: ["Work", "About", "Blog", "Contact"] },
    { title: "Social", links: ["GitHub", "LinkedIn", "Twitter", "Dribbble"] },
  ]),
]);

// ═══ E-commerce ══════════════════════════════════════════════
add("Fashion Store", "Modern fashion e-commerce with lookbook style", "ecommerce", "👗", ["ecommerce", "fashion", "clothing"], [
  nav("LUXE", ["Women", "Men", "Accessories", "Sale"], "Cart (0)", "light"),
  hero("NEW COLLECTION", "Effortless Style for Every Season", "Discover our curated collection of premium fashion essentials.", "Shop Collection", "View Lookbook", "#ffffff", "#000000"),
  features("Shop by Category", "Find your perfect look", [
    { icon: "👗", title: "Dresses", desc: "From casual to cocktail — find the perfect dress for any occasion." },
    { icon: "👕", title: "Tops & Shirts", desc: "Effortless basics and statement pieces." },
    { icon: "👖", title: "Bottoms", desc: "Jeans, trousers, and skirts for every style." },
    { icon: "👜", title: "Accessories", desc: "Bags, jewelry, and finishing touches." },
  ], "#f8fafc"),
  gallery("Trending Now", 6),
  stats([{ value: "50K+", label: "Happy Customers" }, { value: "500+", label: "Styles" }, { value: "Free", label: "Shipping 50+" }, { value: "30 Day", label: "Returns" }], "#000000"),
  testimonials("Customer Love", [
    { quote: "The quality is outstanding. My go-to online store for fashion.", name: "Emma Style", role: "Fashion Blogger" },
    { quote: "Fast shipping, beautiful packaging, and clothes that fit perfectly.", name: "Sophie R.", role: "Loyal Customer" },
    { quote: "Finally found a brand that balances quality and sustainability.", name: "Nina K.", role: "Eco Advocate" },
  ]),
  newsletter("Join the LUXE Club", "Get 15% off your first order plus exclusive access to new arrivals"),
  footer("LUXE", [
    { title: "Shop", links: ["New Arrivals", "Bestsellers", "Sale", "Gift Cards"] },
    { title: "Help", links: ["Size Guide", "Shipping", "Returns", "FAQ"] },
    { title: "Company", links: ["Our Story", "Sustainability", "Careers", "Press"] },
  ]),
]);

add("Electronics Store", "Tech electronics e-commerce store", "ecommerce", "📱", ["ecommerce", "electronics", "tech"], [
  nav("TechZone", ["Phones", "Laptops", "Audio", "Gaming"], "Cart (0)", "dark"),
  hero("NEXT-GEN TECH", "The Latest Tech, Delivered Fast", "Shop the newest smartphones, laptops, and gadgets with free next-day delivery.", "Shop Now", "Today's Deals"),
  features("Popular Categories", "Browse our most popular departments", [
    { icon: "📱", title: "Smartphones", desc: "iPhone, Samsung, Pixel — all the latest flagships." },
    { icon: "💻", title: "Laptops", desc: "MacBooks, ThinkPads, gaming laptops, and more." },
    { icon: "🎧", title: "Audio", desc: "Headphones, speakers, and home audio systems." },
    { icon: "🎮", title: "Gaming", desc: "Consoles, accessories, and gaming PCs." },
  ]),
  stats([{ value: "100K+", label: "Products" }, { value: "Free", label: "Next-Day Delivery" }, { value: "24/7", label: "Support" }, { value: "30 Day", label: "Returns" }]),
  testimonials("Customer Reviews", [
    { quote: "Best prices and fastest shipping. My go-to for all tech purchases.", name: "Chris T.", role: "Tech Enthusiast" },
    { quote: "Excellent customer service. They resolved my issue in minutes.", name: "Mike R.", role: "Regular Customer" },
  ]),
  newsletter("Tech Deals Alert", "Subscribe for exclusive deals and early access to new product launches"),
  cta("Download Our App", "Shop on the go with exclusive app-only deals and real-time order tracking.", "Get the App →"),
  footer("TechZone", [
    { title: "Shop", links: ["Phones", "Laptops", "Audio", "Gaming", "Deals"] },
    { title: "Support", links: ["Help Center", "Track Order", "Returns", "Warranty"] },
    { title: "Company", links: ["About", "Affiliate", "Blog", "Contact"] },
  ]),
]);

add("Food & Grocery", "Online grocery and food delivery store", "ecommerce", "🛒", ["ecommerce", "food", "grocery"], [
  nav("FreshMart", ["Produce", "Dairy", "Bakery", "Meal Kits"], "Cart (0)", "light"),
  hero("FARM TO TABLE", "Fresh Groceries Delivered to Your Door", "Order by 10pm, get it by 7am. Farm-fresh produce, organic options, and ready-to-cook meals.", "Start Shopping", "View Meal Kits", "#ffffff", "#16a34a"),
  features("Why FreshMart?", "The smarter way to grocery shop", [
    { icon: "🌱", title: "Farm Fresh", desc: "Sourced daily from local farms within 50 miles." },
    { icon: "🚚", title: "Same-Day Delivery", desc: "Free delivery on orders over $35." },
    { icon: "♻️", title: "Zero Waste", desc: "Eco-friendly packaging and composting program." },
    { icon: "👨‍🍳", title: "Meal Kits", desc: "Chef-designed recipes with pre-measured ingredients." },
  ], "#f0fdf4"),
  stats([{ value: "50K+", label: "Deliveries/week" }, { value: "2000+", label: "Products" }, { value: "200+", label: "Local Farms" }, { value: "$35+", label: "Free Delivery" }], "#16a34a"),
  testimonials("What Customers Say", [
    { quote: "The produce quality is incredible. Way better than the supermarket.", name: "Laura M.", role: "Home Cook" },
    { quote: "Meal kits saved our weeknight dinners. The recipes are so good!", name: "Family of 4", role: "Regular Customer" },
  ]),
  newsletter("Get Fresh Deals", "Weekly recipes and exclusive discounts delivered to your inbox"),
  footer("FreshMart", [
    { title: "Shop", links: ["Produce", "Dairy", "Bakery", "Meal Kits", "Organic"] },
    { title: "Help", links: ["Delivery Areas", "FAQ", "Contact", "App"] },
    { title: "About", links: ["Our Mission", "Local Farms", "Sustainability", "Careers"] },
  ]),
]);

add("Furniture Store", "Modern furniture and home decor e-commerce", "ecommerce", "🛋️", ["ecommerce", "furniture", "home"], [
  nav("HAVEN", ["Living", "Bedroom", "Dining", "Office"], "Cart (0)", "light"),
  hero("DESIGNED FOR LIVING", "Furniture That Feels Like Home", "Handcrafted, sustainable furniture designed for modern living spaces.", "Browse Collection", "Room Planner", "#ffffff", "#92400e"),
  gallery("Featured Collections", 6),
  features("The HAVEN Difference", "Quality you can feel, design you can see", [
    { icon: "🪵", title: "Sustainably Sourced", desc: "FSC-certified wood and eco-friendly materials." },
    { icon: "🛠️", title: "Handcrafted", desc: "Each piece is crafted by skilled artisans." },
    { icon: "🚚", title: "White Glove Delivery", desc: "We deliver, assemble, and place in your room." },
    { icon: "♻️", title: "Lifetime Warranty", desc: "Built to last with our lifetime craftsmanship guarantee." },
  ], "#fffbeb"),
  testimonials("Happy Homes", [
    { quote: "Our living room has never looked better. The quality is extraordinary.", name: "The Johnsons", role: "Chicago, IL" },
    { quote: "White glove delivery made everything so easy. Will be a lifelong customer.", name: "Maria G.", role: "Los Angeles, CA" },
    { quote: "Sustainable, beautiful, and built to last. Exactly what we wanted.", name: "The Patels", role: "Austin, TX" },
  ]),
  cta("Design Your Room", "Use our free 3D room planner to visualize furniture in your space.", "Try Room Planner →", "#92400e", "#f59e0b"),
  footer("HAVEN", [
    { title: "Shop", links: ["Living Room", "Bedroom", "Dining", "Office", "Outdoor"] },
    { title: "Services", links: ["Room Planner", "Interior Design", "Delivery", "Assembly"] },
    { title: "Company", links: ["Our Story", "Sustainability", "Showrooms", "Contact"] },
  ]),
]);

// ═══ Restaurant ══════════════════════════════════════════════
add("Fine Dining", "Upscale restaurant with reservation system", "restaurant", "🍽️", ["restaurant", "fine-dining", "culinary"], [
  nav("La Maison", ["Menu", "Wine", "Reservations", "Events"], "Reserve Table", "dark"),
  hero("FINE DINING", "A Culinary Journey Awaits", "Experience Michelin-starred cuisine in an intimate setting. Every dish tells a story.", "Reserve a Table", "View Menu"),
  features("The Experience", "More than a meal, it's a memory", [
    { icon: "👨‍🍳", title: "Chef's Table", desc: "8-course tasting menu curated by Chef Pierre Marcel." },
    { icon: "🍷", title: "Wine Pairing", desc: "Sommelier-selected wines from 200+ labels worldwide." },
    { icon: "🕯️", title: "Private Dining", desc: "Exclusive rooms for intimate gatherings of up to 20 guests." },
    { icon: "🌿", title: "Farm to Table", desc: "Ingredients sourced daily from our partner organic farms." },
  ]),
  gallery("Our Kitchen", 4),
  testimonials("Guest Reviews", [
    { quote: "The best dining experience of my life. Every course was a masterpiece.", name: "Food Critic", role: "The New York Times" },
    { quote: "Impeccable service, extraordinary food. A true culinary destination.", name: "Michelin Guide", role: "★★★" },
  ]),
  stats([{ value: "★★★", label: "Michelin Stars" }, { value: "#1", label: "In the City" }, { value: "15", label: "Years" }, { value: "200+", label: "Wine Labels" }]),
  contactSection("Make a Reservation", "For parties of 8 or more, please call us directly."),
  footer("La Maison", [
    { title: "Dining", links: ["Menu", "Wine List", "Chef's Table", "Events"] },
    { title: "Visit", links: ["Reservations", "Hours", "Location", "Parking"] },
    { title: "Follow Us", links: ["Instagram", "Facebook", "TripAdvisor"] },
  ]),
]);

add("Cafe & Bakery", "Cozy cafe and bakery website", "restaurant", "☕", ["restaurant", "cafe", "bakery"], [
  nav("The Daily Grind", ["Menu", "Bakery", "Catering", "About"], "Order Online", "light"),
  hero("CRAFT COFFEE & FRESH BAKES", "Start Your Morning Right", "Artisan coffee, freshly baked pastries, and a warm community space.", "View Menu", "Order Ahead", "#fef3c7", "#92400e"),
  features("What We Offer", "Made fresh daily with love", [
    { icon: "☕", title: "Specialty Coffee", desc: "Single-origin beans roasted in-house weekly." },
    { icon: "🥐", title: "Fresh Pastries", desc: "Croissants, muffins, and treats baked every morning." },
    { icon: "🥪", title: "Lunch Menu", desc: "Soups, salads, and artisan sandwiches." },
    { icon: "🎂", title: "Custom Cakes", desc: "Order custom cakes for any celebration." },
  ], "#fef3c7"),
  testimonials("What Regulars Say", [
    { quote: "Best coffee in town, hands down. The croissants are life-changing.", name: "Daily Regular", role: "Coffee Lover" },
    { quote: "Our go-to spot for Saturday brunch. The atmosphere is perfect.", name: "Weekend Couple", role: "Brunch Fans" },
  ]),
  newsletter("Join Our Mailing List", "Weekly specials, events, and a free pastry on your birthday"),
  footer("The Daily Grind", [
    { title: "Menu", links: ["Coffee", "Bakery", "Lunch", "Catering"] },
    { title: "Visit", links: ["Hours", "Location", "WiFi", "Parking"] },
    { title: "Connect", links: ["Instagram", "Facebook", "Yelp", "Email"] },
  ]),
]);

add("Pizza Restaurant", "Fun pizza restaurant with online ordering", "restaurant", "🍕", ["restaurant", "pizza", "fast-food"], [
  nav("Slice & Dice", ["Menu", "Build Your Own", "Deals", "Locations"], "Order Now", "dark"),
  hero("ARTISAN PIZZA", "Real Pizza. Real Ingredients. Real Good.", "Hand-tossed, wood-fired pizza made with imported Italian ingredients and local produce.", "Order Online", "View Menu"),
  features("Why Our Pizza?", "The secret is in the details", [
    { icon: "🔥", title: "Wood-Fired", desc: "Baked at 900°F in our imported Neapolitan ovens." },
    { icon: "🧀", title: "Fresh Mozzarella", desc: "Made in-house daily from whole milk." },
    { icon: "🍅", title: "San Marzano", desc: "Imported DOP San Marzano tomatoes for our sauce." },
    { icon: "🌿", title: "Local Toppings", desc: "Fresh vegetables and herbs from local farms." },
  ]),
  stats([{ value: "1M+", label: "Pizzas Served" }, { value: "4.9★", label: "Rating" }, { value: "20+", label: "Varieties" }, { value: "30 min", label: "Delivery" }]),
  testimonials("Happy Customers", [
    { quote: "The best pizza I've had outside of Naples. Absolutely incredible.", name: "Pizza Lover", role: "Foodie" },
    { quote: "Our family orders every Friday. The kids love building their own pizza!", name: "The Millers", role: "Family" },
  ]),
  cta("Hungry? Order Now!", "Free delivery on orders over $25. Ready in 30 minutes.", "Order Online →", "#dc2626", "#dc2626"),
  footer("Slice & Dice", [
    { title: "Menu", links: ["Classics", "Specialty", "Build Your Own", "Sides & Drinks"] },
    { title: "Info", links: ["Locations", "Hours", "Catering", "Gift Cards"] },
    { title: "Connect", links: ["Instagram", "TikTok", "Yelp", "Email"] },
  ]),
]);

add("Sushi Restaurant", "Elegant Japanese restaurant", "restaurant", "🍣", ["restaurant", "sushi", "japanese"], [
  nav("SAKURA", ["Menu", "Omakase", "Sake Bar", "Reserve"], "Book Table", "dark"),
  hero("JAPANESE CUISINE", "The Art of Sushi, Perfected", "Experience authentic Japanese cuisine crafted by master Chef Tanaka with 30 years of expertise.", "Reserve Table", "Explore Menu"),
  features("Our Specialties", "Tradition meets innovation", [
    { icon: "🍣", title: "Omakase", desc: "Chef's choice multi-course dining experience." },
    { icon: "🍶", title: "Sake Bar", desc: "50+ premium sake selections curated by our sommelier." },
    { icon: "🔪", title: "Live Sushi Bar", desc: "Watch master chefs prepare your sushi in front of you." },
    { icon: "🎎", title: "Private Tatami", desc: "Traditional tatami rooms for an authentic dining experience." },
  ]),
  gallery("Our Creations", 6),
  testimonials("Reviews", [
    { quote: "The omakase was a transcendent experience. Each piece was a work of art.", name: "Food Writer", role: "Eater Magazine" },
    { quote: "Best sushi in the city. The fish quality is unparalleled.", name: "Zagat Guide", role: "★★★★★" },
  ]),
  contactSection("Reservations", "Book your table or inquire about private dining events."),
  footer("SAKURA", [
    { title: "Dining", links: ["Menu", "Omakase", "Sake", "Lunch Specials"] },
    { title: "Visit", links: ["Reservations", "Private Events", "Gift Cards", "Hours"] },
    { title: "Follow", links: ["Instagram", "Facebook", "TripAdvisor"] },
  ]),
]);

// ═══ Education ═══════════════════════════════════════════════
add("Online Academy", "Online learning platform with course catalog", "education", "🎓", ["education", "courses", "e-learning"], [
  nav("LearnPro", ["Courses", "Paths", "Pricing", "For Teams"], "Start Learning"),
  hero("LEARN WITHOUT LIMITS", "Master New Skills with Expert-Led Courses", "Join 2M+ learners worldwide. Access 5000+ courses in tech, design, business, and more.", "Browse Courses", "Start Free Trial"),
  stats([{ value: "5000+", label: "Courses" }, { value: "2M+", label: "Students" }, { value: "500+", label: "Instructors" }, { value: "95%", label: "Completion Rate" }]),
  features("Learning Paths", "Structured curriculum to master any skill", [
    { icon: "💻", title: "Web Development", desc: "HTML to full-stack. From beginner to job-ready in 6 months." },
    { icon: "📊", title: "Data Science", desc: "Python, ML, AI — learn the most in-demand skills." },
    { icon: "🎨", title: "Design", desc: "UI/UX, graphic design, and motion graphics." },
    { icon: "💼", title: "Business", desc: "Marketing, management, finance, and entrepreneurship." },
  ]),
  testimonials("Student Success Stories", [
    { quote: "LearnPro helped me switch careers. I went from marketing to software engineering.", name: "Career Changer", role: "Now at Google" },
    { quote: "The project-based courses are incredible. I built a real portfolio while learning.", name: "Bootcamp Grad", role: "Junior Developer" },
    { quote: "Best investment in myself. The instructors are world-class.", name: "Lifelong Learner", role: "Product Manager" },
  ]),
  pricing("Choose Your Plan", "All plans include unlimited access to course materials", [
    { name: "Free", price: "$0", period: "/month", features: "10 free courses\nCommunity access\nBasic certificates" },
    { name: "Pro", price: "$29", period: "/month", features: "All 5000+ courses\nPremium certificates\nProject reviews\nMentor access", featured: true },
    { name: "Teams", price: "$49", period: "/user/mo", features: "Everything in Pro\nTeam analytics\nCustom paths\nAdmin dashboard\nSSO" },
  ]),
  cta("Start Learning Today", "7-day free trial. No credit card required. Cancel anytime.", "Get Started Free →"),
  footer("LearnPro", [
    { title: "Learn", links: ["All Courses", "Learning Paths", "Certificates", "Projects"] },
    { title: "Community", links: ["Forums", "Discord", "Events", "Blog"] },
    { title: "Company", links: ["About", "Careers", "Partners", "Contact"] },
  ]),
]);

add("University Website", "Modern university or college website", "education", "🏛️", ["education", "university", "academic"], [
  nav("Pacific University", ["Programs", "Admissions", "Campus", "Research"], "Apply Now", "dark"),
  hero("DISCOVER YOUR FUTURE", "Where Innovation Meets Tradition", "Ranked #15 nationally. 200+ programs. A community of scholars shaping tomorrow's leaders.", "Explore Programs", "Schedule Visit"),
  stats([{ value: "#15", label: "National Ranking" }, { value: "200+", label: "Programs" }, { value: "30K", label: "Students" }, { value: "95%", label: "Employment Rate" }]),
  features("Academic Programs", "World-class education across disciplines", [
    { icon: "🔬", title: "Sciences & Engineering", desc: "Cutting-edge research facilities and industry partnerships." },
    { icon: "💼", title: "Business School", desc: "Top-ranked MBA and undergraduate business programs." },
    { icon: "⚕️", title: "Health Sciences", desc: "Leading medical school with teaching hospital." },
    { icon: "🎭", title: "Arts & Humanities", desc: "Creative programs in a vibrant artistic community." },
  ]),
  gallery("Campus Life", 6),
  testimonials("Alumni Voices", [
    { quote: "Pacific University gave me the foundation to build a Fortune 500 company.", name: "Alumni CEO", role: "Class of 2010" },
    { quote: "The research opportunities here are unparalleled. It launched my career in biotech.", name: "PhD Graduate", role: "Class of 2018" },
  ]),
  newsletter("Stay Informed", "Get admissions updates, campus news, and event invitations"),
  footer("Pacific University", [
    { title: "Academics", links: ["Programs", "Departments", "Library", "Research"] },
    { title: "Admissions", links: ["Apply", "Visit", "Financial Aid", "International"] },
    { title: "Campus", links: ["Housing", "Athletics", "Events", "Map"] },
  ]),
]);

add("Coding Bootcamp", "Intensive coding bootcamp website", "education", "⌨️", ["education", "bootcamp", "coding"], [
  nav("CodeCamp", ["Programs", "Outcomes", "Financing", "Alumni"], "Apply Now"),
  hero("BECOME A DEVELOPER", "Launch Your Tech Career in 12 Weeks", "Intensive, project-based coding bootcamp with a 94% job placement rate. No experience needed.", "Apply Now", "Attend Info Session"),
  stats([{ value: "94%", label: "Job Placement" }, { value: "$85K", label: "Avg Starting Salary" }, { value: "3000+", label: "Graduates" }, { value: "12", label: "Weeks" }]),
  features("Our Programs", "Choose your path to a tech career", [
    { icon: "⚛️", title: "Full-Stack Web", desc: "React, Node.js, PostgreSQL — build complete web applications." },
    { icon: "📊", title: "Data Science", desc: "Python, ML, TensorFlow — analyze and predict with data." },
    { icon: "📱", title: "Mobile Development", desc: "React Native and Swift — build apps for iOS and Android." },
    { icon: "☁️", title: "DevOps", desc: "AWS, Docker, Kubernetes — master modern infrastructure." },
  ]),
  testimonials("Graduate Stories", [
    { quote: "I went from barista to software engineer in 4 months. CodeCamp changed my life.", name: "Career Changer", role: "Now at Amazon" },
    { quote: "The curriculum is intense but incredibly practical. I was job-ready on day one.", name: "Recent Grad", role: "Now at Meta" },
    { quote: "Best ROI on education I've ever seen. Paid for itself in 2 months.", name: "Bootcamp Alum", role: "Now at Stripe" },
  ]),
  faqSection("Common Questions", [
    { q: "Do I need prior coding experience?", a: "No! Our programs start from the fundamentals and progress quickly." },
    { q: "What financing options are available?", a: "We offer ISAs, loans, scholarships, and payment plans." },
    { q: "Is the bootcamp online or in-person?", a: "Both! Choose the format that works best for your schedule." },
    { q: "What kind of job support do you provide?", a: "Resume reviews, mock interviews, and direct introductions to hiring partners." },
  ]),
  cta("Your Future in Tech Starts Here", "Next cohort starts in 2 weeks. Limited spots available.", "Apply Now — Free →"),
  footer("CodeCamp", [
    { title: "Programs", links: ["Full-Stack", "Data Science", "Mobile", "DevOps"] },
    { title: "Resources", links: ["Blog", "Free Workshops", "Prep Course", "FAQ"] },
    { title: "Company", links: ["About", "Outcomes", "Careers", "Contact"] },
  ]),
]);

add("Language School", "Language learning school website", "education", "🌍", ["education", "language", "international"], [
  nav("LinguaWorld", ["Languages", "Programs", "Teachers", "Pricing"], "Free Trial"),
  hero("SPEAK THE WORLD", "Master Any Language with Native Speakers", "Live 1-on-1 lessons with certified native teachers. 30+ languages. Your schedule.", "Start Free Trial", "View Languages", "#ffffff", "#0ea5e9"),
  features("Available Languages", "Learn from native speakers worldwide", [
    { icon: "🇪🇸", title: "Spanish", desc: "Latin American and European Spanish with cultural immersion." },
    { icon: "🇫🇷", title: "French", desc: "Business and conversational French from Paris to Montreal." },
    { icon: "🇯🇵", title: "Japanese", desc: "From hiragana basics to business-level fluency." },
    { icon: "🇩🇪", title: "German", desc: "Technical and conversational German for all levels." },
  ]),
  stats([{ value: "30+", label: "Languages" }, { value: "500+", label: "Teachers" }, { value: "100K+", label: "Students" }, { value: "4.9★", label: "Rating" }], "#0ea5e9"),
  testimonials("Student Reviews", [
    { quote: "I became conversational in Spanish in 3 months. The teachers are amazing.", name: "Language Learner", role: "Now B2 Level" },
    { quote: "Flexible scheduling means I can learn Japanese while working full-time.", name: "Busy Professional", role: "Tech Worker" },
  ]),
  pricing("Simple Plans", "All plans include 1-on-1 live lessons with native speakers", [
    { name: "Starter", price: "$49", period: "/month", features: "4 lessons/month\n1 language\nHomework & review\nBasic support" },
    { name: "Regular", price: "$99", period: "/month", features: "12 lessons/month\n1 language\nPriority booking\nProgress tracking", featured: true },
    { name: "Intensive", price: "$199", period: "/month", features: "30 lessons/month\n2 languages\nDedicated tutor\nCertification prep" },
  ]),
  cta("Try Your First Lesson Free", "No commitment. Choose your language and start speaking today.", "Book Free Lesson →"),
  footer("LinguaWorld", [
    { title: "Languages", links: ["Spanish", "French", "Japanese", "German", "All 30+"] },
    { title: "Programs", links: ["1-on-1", "Group", "Business", "Kids"] },
    { title: "Company", links: ["About", "Teachers", "Blog", "Contact"] },
  ]),
]);

// ═══ Real Estate ═════════════════════════════════════════════
add("Real Estate Agency", "Property listings and agent profiles", "realestate", "🏠", ["real-estate", "property", "listings"], [
  nav("Prime Realty", ["Buy", "Sell", "Rent", "Agents"], "List Property", "dark"),
  hero("FIND YOUR DREAM HOME", "Luxury Properties in Prime Locations", "Browse exclusive listings curated by top agents. From penthouses to beachfront estates.", "Search Properties", "Sell Your Home"),
  stats([{ value: "$2B+", label: "Properties Sold" }, { value: "5000+", label: "Listings" }, { value: "200+", label: "Agents" }, { value: "98%", label: "Client Satisfaction" }]),
  features("Why Prime Realty?", "The smart way to buy and sell property", [
    { icon: "🏠", title: "Exclusive Listings", desc: "Access off-market properties not available anywhere else." },
    { icon: "👤", title: "Expert Agents", desc: "Top-rated agents with deep local market knowledge." },
    { icon: "📊", title: "Market Analysis", desc: "AI-powered property valuations and market insights." },
    { icon: "🔑", title: "Concierge Service", desc: "End-to-end support from search to closing." },
  ]),
  gallery("Featured Properties", 6),
  testimonials("Client Stories", [
    { quote: "Found our dream home in 2 weeks. The agent was incredibly knowledgeable.", name: "New Homeowners", role: "Miami, FL" },
    { quote: "Sold our property 20% above asking. Prime Realty's marketing was exceptional.", name: "Happy Seller", role: "New York, NY" },
  ]),
  team("Top Agents", [
    { name: "Amanda Ross", role: "Luxury Specialist — $500M+ in sales" },
    { name: "David Kim", role: "Investment Properties Expert" },
    { name: "Sarah Chen", role: "First-Time Buyer Specialist" },
    { name: "Mark Thompson", role: "Commercial Real Estate" },
  ]),
  contactSection("Get in Touch", "Whether you're buying, selling, or investing — we're here to help."),
  footer("Prime Realty", [
    { title: "Properties", links: ["Buy", "Rent", "New Construction", "Commercial"] },
    { title: "Services", links: ["Sell", "Property Management", "Mortgage", "Moving"] },
    { title: "Company", links: ["About", "Agents", "Careers", "Contact"] },
  ]),
]);

add("Property Management", "Property management company website", "realestate", "🏢", ["real-estate", "property-management", "rental"], [
  nav("UrbanNest", ["Services", "Listings", "Owners", "Tenants"], "Get Quote"),
  hero("PROPERTY MANAGEMENT", "We Manage. You Relax.", "Full-service property management for landlords. From tenant screening to maintenance — we handle it all.", "Get Free Quote", "Our Services"),
  stats([{ value: "10K+", label: "Units Managed" }, { value: "99%", label: "Occupancy Rate" }, { value: "24/7", label: "Maintenance" }, { value: "15+", label: "Years" }]),
  features("Full-Service Management", "Everything your property needs", [
    { icon: "🔍", title: "Tenant Screening", desc: "Comprehensive background, credit, and reference checks." },
    { icon: "💰", title: "Rent Collection", desc: "Automated rent collection with online tenant portal." },
    { icon: "🔧", title: "Maintenance", desc: "24/7 emergency maintenance with trusted vendor network." },
    { icon: "📋", title: "Financial Reports", desc: "Monthly statements and annual tax-ready reports." },
  ]),
  testimonials("Owner Reviews", [
    { quote: "UrbanNest increased our rental income by 15% while reducing vacancies to zero.", name: "Property Owner", role: "12-Unit Building" },
    { quote: "The online portal makes everything transparent. Best management company we've used.", name: "Investor", role: "Portfolio Owner" },
  ]),
  faqSection("Frequently Asked Questions", [
    { q: "What does management cost?", a: "Our fee is 8-10% of monthly rent, depending on portfolio size." },
    { q: "How do you screen tenants?", a: "We run credit, criminal, eviction, and employment verification checks." },
    { q: "How quickly can you fill vacancies?", a: "Average time to fill is 14 days with our marketing approach." },
  ]),
  cta("Get Your Free Property Analysis", "We'll evaluate your property and show you how to maximize returns.", "Request Free Analysis →"),
  footer("UrbanNest", [
    { title: "Services", links: ["Management", "Leasing", "Maintenance", "Accounting"] },
    { title: "Resources", links: ["Owner Portal", "Tenant Portal", "Blog", "FAQ"] },
    { title: "Company", links: ["About", "Team", "Careers", "Contact"] },
  ]),
]);

add("Real Estate Listing", "Single property showcase landing page", "realestate", "🏡", ["real-estate", "listing", "showcase"], [
  nav("Prime Realty", ["Details", "Gallery", "Floor Plan", "Contact"], "Schedule Tour"),
  hero("EXCLUSIVE LISTING", "Luxury Penthouse — 360° Ocean Views", "4 BD | 3.5 BA | 3,200 sqft — A rare opportunity in the heart of Miami Beach.", "Schedule Tour", "View Gallery"),
  gallery("Property Gallery", 8),
  features("Property Features", "Luxury amenities throughout", [
    { icon: "🏊", title: "Private Pool", desc: "Rooftop infinity pool with panoramic ocean views." },
    { icon: "🅿️", title: "3-Car Garage", desc: "Private enclosed garage with EV charging." },
    { icon: "🏋️", title: "Private Gym", desc: "Fully equipped home gym with sauna." },
    { icon: "🌊", title: "Beach Access", desc: "Direct private access to the beach." },
  ]),
  stats([{ value: "$4.5M", label: "Price" }, { value: "3,200", label: "Sq Ft" }, { value: "4 BD", label: "Bedrooms" }, { value: "3.5 BA", label: "Bathrooms" }], "#0f172a"),
  contactSection("Schedule a Private Tour", "Contact the listing agent to arrange a viewing."),
  footer("Prime Realty", [
    { title: "Property", links: ["Details", "Gallery", "Floor Plan", "Virtual Tour"] },
    { title: "Agent", links: ["Amanda Ross", "+1 (555) 123-4567", "amanda@primerealty.com"] },
  ]),
]);

add("Real Estate Investment", "Real estate investment platform", "realestate", "📈", ["real-estate", "investment", "crowdfunding"], [
  nav("PropFund", ["Investments", "How It Works", "Returns", "About"], "Start Investing"),
  hero("REAL ESTATE INVESTING", "Invest in Real Estate from $100", "Fractional ownership of premium properties. Earn passive income without the hassle of being a landlord.", "Start Investing", "How It Works"),
  stats([{ value: "$500M+", label: "Total Invested" }, { value: "12.5%", label: "Avg Annual Return" }, { value: "50K+", label: "Investors" }, { value: "$200M+", label: "Dividends Paid" }]),
  features("How It Works", "Start earning passive income in minutes", [
    { icon: "🔍", title: "Browse Properties", desc: "We vet every property. Only 3% make it to our platform." },
    { icon: "💵", title: "Invest Any Amount", desc: "Start from just $100. Fractional ownership for everyone." },
    { icon: "📊", title: "Earn Returns", desc: "Monthly dividends + property appreciation. Avg 12.5% annually." },
    { icon: "🏦", title: "Cash Out Anytime", desc: "Liquid secondary market to sell your shares when you want." },
  ]),
  testimonials("Investor Reviews", [
    { quote: "I've been earning 14% annually for 3 years. Better than any REIT.", name: "Passive Investor", role: "Since 2022" },
    { quote: "Finally, real estate investing accessible to regular people. Love this platform.", name: "First-Time Investor", role: "College Student" },
  ]),
  cta("Start Building Wealth", "Open a free account in 5 minutes and start investing in premium properties.", "Create Free Account →"),
  footer("PropFund", [
    { title: "Invest", links: ["Properties", "How It Works", "Returns", "Risks"] },
    { title: "Resources", links: ["Blog", "Education", "FAQ", "Calculator"] },
    { title: "Company", links: ["About", "Team", "Press", "Careers"] },
  ]),
]);

// ═══ Health & Fitness ════════════════════════════════════════
add("Fitness Studio", "Modern gym and fitness studio", "fitness", "💪", ["fitness", "gym", "health"], [
  nav("FORGE Fitness", ["Classes", "Memberships", "Trainers", "Schedule"], "Free Trial"),
  hero("FORGE YOUR BODY", "Transform Your Body. Transform Your Life.", "State-of-the-art equipment, expert trainers, and 50+ weekly classes.", "Get Free Trial", "View Schedule"),
  stats([{ value: "5000+", label: "Members" }, { value: "50+", label: "Classes/Week" }, { value: "20+", label: "Trainers" }, { value: "24/7", label: "Open" }]),
  features("Our Programs", "Something for every fitness level", [
    { icon: "🏋️", title: "Strength Training", desc: "Build muscle with expert-guided strength programs." },
    { icon: "🧘", title: "Yoga & Pilates", desc: "Improve flexibility, balance, and mental clarity." },
    { icon: "🥊", title: "Boxing & MMA", desc: "High-intensity combat fitness for maximum calorie burn." },
    { icon: "🚴", title: "Spin Classes", desc: "Immersive cycling classes with heart-pumping music." },
  ]),
  testimonials("Member Stories", [
    { quote: "Lost 30 lbs in 4 months. The trainers here actually care about your progress.", name: "Transformation", role: "-30 lbs" },
    { quote: "Best gym community I've ever been part of. I actually look forward to working out.", name: "Happy Member", role: "2 Year Member" },
  ]),
  pricing("Membership Plans", "No contracts. Cancel anytime.", [
    { name: "Basic", price: "$29", period: "/month", features: "Gym access\nLocker room\nFree WiFi\n2 classes/month" },
    { name: "Pro", price: "$59", period: "/month", features: "Unlimited classes\nSauna & spa\nGuest passes\nApp tracking", featured: true },
    { name: "Elite", price: "$99", period: "/month", features: "Everything in Pro\nPersonal trainer\nNutrition plan\nRecovery room" },
  ]),
  cta("Start Your Free 7-Day Trial", "Full access to everything. No credit card required.", "Claim Free Trial →"),
  footer("FORGE Fitness", [
    { title: "Programs", links: ["Strength", "Yoga", "Boxing", "Spin", "Swimming"] },
    { title: "Info", links: ["Schedule", "Trainers", "Pricing", "FAQ"] },
    { title: "Connect", links: ["Instagram", "YouTube", "TikTok", "Email"] },
  ]),
]);

add("Wellness Spa", "Luxury wellness and spa center", "fitness", "🧖", ["wellness", "spa", "relaxation"], [
  nav("Serenity Spa", ["Treatments", "Packages", "Memberships", "Book"], "Book Now", "light"),
  hero("FIND YOUR CALM", "Where Wellness Meets Luxury", "Escape the everyday with our signature spa treatments, thermal baths, and wellness programs.", "Book Treatment", "View Packages", "#fdf2f8", "#be185d"),
  features("Our Treatments", "Rejuvenate mind, body, and spirit", [
    { icon: "💆", title: "Massage Therapy", desc: "Swedish, deep tissue, hot stone, and aromatherapy massage." },
    { icon: "🧴", title: "Facials", desc: "Anti-aging, hydrating, and brightening facial treatments." },
    { icon: "🛁", title: "Hydrotherapy", desc: "Thermal baths, contrast therapy, and flotation tanks." },
    { icon: "🧘", title: "Meditation", desc: "Guided meditation and mindfulness sessions." },
  ], "#fdf2f8"),
  testimonials("Guest Experiences", [
    { quote: "The best spa experience I've ever had. I left feeling like a new person.", name: "Spa Guest", role: "First Visit" },
    { quote: "I come every month. It's my essential self-care ritual.", name: "Regular Member", role: "Monthly Member" },
  ]),
  pricing("Spa Packages", "Indulge with our curated experiences", [
    { name: "Relax", price: "$150", period: "/visit", features: "60-min massage\nSauna access\nHerbal tea\nRobe & slippers" },
    { name: "Rejuvenate", price: "$280", period: "/visit", features: "90-min massage\nFacial treatment\nFull spa access\nLunch included", featured: true },
    { name: "Transform", price: "$450", period: "/visit", features: "Full-day retreat\n3 treatments\nAll facilities\nGourmet meals\nWellness consultation" },
  ]),
  cta("Gift the Gift of Wellness", "Digital gift cards available. Perfect for any occasion.", "Buy Gift Card →", "#be185d", "#ec4899"),
  footer("Serenity Spa", [
    { title: "Treatments", links: ["Massage", "Facials", "Body", "Hydrotherapy"] },
    { title: "Visit", links: ["Packages", "Gift Cards", "Hours", "Location"] },
    { title: "Connect", links: ["Instagram", "Facebook", "Pinterest", "Email"] },
  ]),
]);

add("Nutrition Coach", "Personal nutrition and meal planning", "fitness", "🥗", ["fitness", "nutrition", "health"], [
  nav("NutriPlan", ["Programs", "Meal Plans", "About", "Results"], "Get Started"),
  hero("FUEL YOUR BODY", "Personalized Nutrition Plans That Actually Work", "Science-backed meal plans tailored to your goals, lifestyle, and food preferences.", "Get Your Plan", "See Results", "#ffffff", "#16a34a"),
  stats([{ value: "10K+", label: "Clients" }, { value: "95%", label: "Goal Achievement" }, { value: "500+", label: "Recipes" }, { value: "4.9★", label: "Rating" }], "#16a34a"),
  features("How It Works", "Your journey to better nutrition", [
    { icon: "📋", title: "Assessment", desc: "Comprehensive health and lifestyle questionnaire." },
    { icon: "🍽️", title: "Custom Plan", desc: "Personalized meal plan based on your goals and preferences." },
    { icon: "📱", title: "Daily Tracking", desc: "Easy-to-use app for tracking meals, macros, and progress." },
    { icon: "👩‍⚕️", title: "Weekly Check-ins", desc: "1-on-1 video calls with your certified nutritionist." },
  ]),
  testimonials("Client Transformations", [
    { quote: "Down 25 lbs and my energy levels are through the roof. Best decision ever.", name: "Weight Loss", role: "-25 lbs in 12 weeks" },
    { quote: "As an athlete, the performance nutrition plan improved my race times significantly.", name: "Athlete", role: "Marathon Runner" },
  ]),
  pricing("Choose Your Program", "All programs include personalized meal plans and recipes", [
    { name: "Basic", price: "$49", period: "/month", features: "Custom meal plan\n500+ recipes\nMacro tracking\nEmail support" },
    { name: "Premium", price: "$99", period: "/month", features: "Everything in Basic\nWeekly check-ins\nGrocery lists\nSupplement guide", featured: true },
    { name: "VIP", price: "$199", period: "/month", features: "Everything in Premium\nDaily support\nWorkout plan\nBiometric tracking" },
  ]),
  cta("Start Your Nutrition Journey", "Take our free 2-minute quiz and get your personalized plan.", "Take Free Quiz →"),
  footer("NutriPlan", [
    { title: "Programs", links: ["Weight Loss", "Muscle Gain", "Athletic", "Wellness"] },
    { title: "Resources", links: ["Blog", "Recipes", "Calculator", "FAQ"] },
    { title: "Company", links: ["About", "Team", "Testimonials", "Contact"] },
  ]),
]);

add("Yoga Studio", "Peaceful yoga studio website", "fitness", "🧘", ["fitness", "yoga", "mindfulness"], [
  nav("Inner Peace Yoga", ["Classes", "Workshops", "Teacher Training", "Schedule"], "Book Class", "light"),
  hero("FIND YOUR BALANCE", "Yoga for Every Body, Every Level", "Join our welcoming community for guided yoga, meditation, and breathwork practices.", "View Schedule", "Intro Offer $30", "#fefce8", "#854d0e"),
  features("Our Classes", "Something for everyone", [
    { icon: "🌅", title: "Vinyasa Flow", desc: "Dynamic, breath-linked movement for strength and flexibility." },
    { icon: "🕯️", title: "Yin Yoga", desc: "Deep, restful holds for flexibility and stress relief." },
    { icon: "🔥", title: "Hot Yoga", desc: "Heated room practice for deep detox and flexibility." },
    { icon: "🧘", title: "Meditation", desc: "Guided meditation and breathwork for mental clarity." },
  ], "#fefce8"),
  stats([{ value: "3K+", label: "Yogis" }, { value: "30+", label: "Classes/Week" }, { value: "15", label: "Teachers" }, { value: "10+", label: "Years" }], "#854d0e"),
  testimonials("Student Stories", [
    { quote: "Yoga changed my life. This studio has the most welcoming community.", name: "Regular Student", role: "3 Years" },
    { quote: "The teachers here are exceptional. I look forward to every class.", name: "New Student", role: "6 Months" },
  ]),
  pricing("Membership Options", "Drop-ins always welcome at $20/class", [
    { name: "Intro Offer", price: "$30", period: "/month", features: "Unlimited classes\nFirst month only\nAll class types\nMat rental" },
    { name: "Unlimited", price: "$99", period: "/month", features: "Unlimited classes\nWorkshop discounts\nGuest passes\nOnline library", featured: true },
    { name: "Annual", price: "$79", period: "/month", features: "Everything in Unlimited\n2 months free\nFree workshops\nTeacher training discount" },
  ]),
  newsletter("Mindful Living", "Weekly inspiration, class updates, and wellness tips"),
  footer("Inner Peace Yoga", [
    { title: "Practice", links: ["Classes", "Schedule", "Workshops", "Retreats"] },
    { title: "Learn", links: ["Teacher Training", "Blog", "Podcast", "Events"] },
    { title: "Visit", links: ["Location", "Hours", "Parking", "Contact"] },
  ]),
]);

// ═══ Travel ══════════════════════════════════════════════════
add("Travel Agency", "Luxury travel agency with trip packages", "travel", "✈️", ["travel", "luxury", "tourism"], [
  nav("Wanderlust", ["Destinations", "Packages", "Luxury", "About"], "Plan Trip"),
  hero("EXPLORE THE WORLD", "Curated Travel Experiences for the Discerning Traveler", "Handcrafted luxury itineraries to the world's most extraordinary destinations.", "Plan Your Trip", "View Destinations"),
  features("Popular Destinations", "Where will your next adventure take you?", [
    { icon: "🏝️", title: "Maldives", desc: "Private overwater villas and world-class diving." },
    { icon: "🗼", title: "Paris", desc: "Art, cuisine, and romance in the City of Light." },
    { icon: "🏔️", title: "Swiss Alps", desc: "Skiing, hiking, and luxury chalets." },
    { icon: "🌸", title: "Kyoto", desc: "Ancient temples, cherry blossoms, and tea ceremonies." },
  ]),
  gallery("Travel Inspiration", 6),
  stats([{ value: "100+", label: "Destinations" }, { value: "50K+", label: "Travelers" }, { value: "15+", label: "Years" }, { value: "4.9★", label: "Rating" }]),
  testimonials("Traveler Stories", [
    { quote: "Our Maldives trip was beyond anything we could have imagined. Every detail was perfect.", name: "Honeymoon Couple", role: "Maldives Trip" },
    { quote: "Wanderlust planned our family safari — the kids still talk about it every day.", name: "Family Adventure", role: "Kenya Safari" },
    { quote: "I've used many travel agencies, but none compare to the Wanderlust experience.", name: "Frequent Traveler", role: "Platinum Member" },
  ]),
  cta("Start Planning Your Dream Trip", "Tell us where you want to go and we'll create your perfect itinerary.", "Get Free Consultation →"),
  footer("Wanderlust", [
    { title: "Destinations", links: ["Asia", "Europe", "Africa", "Americas", "Oceania"] },
    { title: "Travel", links: ["Luxury", "Adventure", "Family", "Honeymoon"] },
    { title: "Company", links: ["About", "Team", "Press", "Contact"] },
  ]),
]);

add("Hotel & Resort", "Luxury hotel and resort website", "travel", "🏨", ["travel", "hotel", "resort"], [
  nav("Azure Resort", ["Rooms", "Dining", "Spa", "Activities"], "Book Now", "dark"),
  hero("PARADISE AWAITS", "Where Luxury Meets the Ocean", "5-star beachfront resort with world-class dining, spa, and endless ocean views.", "Book Your Stay", "Virtual Tour"),
  features("Resort Amenities", "Everything you need for the perfect getaway", [
    { icon: "🏊", title: "Infinity Pools", desc: "3 stunning pools including adults-only and family pools." },
    { icon: "🍽️", title: "5 Restaurants", desc: "From casual beach grills to Michelin-starred fine dining." },
    { icon: "🧖", title: "Full-Service Spa", desc: "Massages, facials, and wellness rituals." },
    { icon: "🏄", title: "Water Sports", desc: "Surfing, snorkeling, jet skiing, and sunset cruises." },
  ]),
  gallery("Experience Azure", 6),
  stats([{ value: "5★", label: "Rating" }, { value: "200+", label: "Rooms" }, { value: "#1", label: "Beach Resort" }, { value: "15", label: "Acres" }]),
  testimonials("Guest Reviews", [
    { quote: "The most beautiful resort I've ever stayed at. The staff went above and beyond.", name: "Luxury Traveler", role: "TripAdvisor Elite" },
    { quote: "Perfect honeymoon destination. We'll be back for our anniversary!", name: "Newlyweds", role: "Honeymoon" },
  ]),
  cta("Book Your Escape", "Special rate: Save 30% when you book 3+ nights. Limited availability.", "Check Availability →"),
  footer("Azure Resort", [
    { title: "Stay", links: ["Rooms & Suites", "Villas", "Packages", "Offers"] },
    { title: "Experience", links: ["Dining", "Spa", "Activities", "Events"] },
    { title: "Info", links: ["Location", "Getting Here", "FAQ", "Contact"] },
  ]),
]);

add("Adventure Tour", "Outdoor adventure and tours company", "travel", "🏔️", ["travel", "adventure", "outdoor"], [
  nav("Summit Adventures", ["Trips", "Destinations", "About", "Guides"], "Book Trip"),
  hero("LIVE ADVENTUROUSLY", "Epic Outdoor Adventures Await", "Guided hiking, climbing, and expedition trips to the world's most breathtaking destinations.", "View Trips", "Meet Our Guides"),
  features("Adventure Types", "Choose your next challenge", [
    { icon: "🥾", title: "Trekking", desc: "Multi-day treks through iconic trails worldwide." },
    { icon: "🧗", title: "Climbing", desc: "From beginner crags to Himalayan expeditions." },
    { icon: "🚣", title: "Rafting", desc: "White water rafting on the world's most thrilling rivers." },
    { icon: "🏕️", title: "Camping", desc: "Wilderness camping under the stars." },
  ]),
  stats([{ value: "500+", label: "Trips/Year" }, { value: "50+", label: "Countries" }, { value: "30+", label: "Expert Guides" }, { value: "100%", label: "Safety Record" }]),
  gallery("Recent Expeditions", 6),
  testimonials("Adventurer Stories", [
    { quote: "The Everest Base Camp trek was life-changing. The guides were phenomenal.", name: "Trekker", role: "Nepal Trip" },
    { quote: "Best adventure company out there. Professional, safe, and incredibly fun.", name: "Repeat Adventurer", role: "5 Trips" },
  ]),
  faqSection("Trip FAQ", [
    { q: "What fitness level is required?", a: "Each trip has a difficulty rating. We offer trips for all levels." },
    { q: "Is gear included?", a: "Most technical gear is provided. We send a full packing list upon booking." },
    { q: "What about safety?", a: "All guides are certified. We carry satellite communication and first aid." },
  ]),
  cta("Ready for Your Next Adventure?", "Small groups. Expert guides. Unforgettable experiences.", "Browse All Trips →"),
  footer("Summit Adventures", [
    { title: "Trips", links: ["Trekking", "Climbing", "Rafting", "Custom"] },
    { title: "Destinations", links: ["Nepal", "Patagonia", "Alps", "Africa"] },
    { title: "Company", links: ["About", "Guides", "Safety", "Contact"] },
  ]),
]);

add("Travel Blog", "Travel blog and journal website", "travel", "📝", ["travel", "blog", "journal"], [
  nav("Nomad Notes", ["Stories", "Guides", "Photography", "About"], "Subscribe", "light"),
  hero("TRAVEL STORIES", "Adventures from Around the Globe", "Follow along as I explore the world's hidden gems, local cultures, and off-the-beaten-path destinations.", "Read Latest", "Travel Guides", "#ffffff", "#f59e0b"),
  features("Explore by Region", "Stories from every corner of the world", [
    { icon: "🌏", title: "Southeast Asia", desc: "Thailand, Vietnam, Indonesia — budget-friendly paradise." },
    { icon: "🌍", title: "Europe", desc: "Hidden gems beyond the tourist trails." },
    { icon: "🌎", title: "South America", desc: "From Patagonia to the Amazon rainforest." },
    { icon: "🌍", title: "Africa", desc: "Safari, culture, and adventure on the wild continent." },
  ]),
  gallery("Recent Photography", 6),
  stats([{ value: "60+", label: "Countries" }, { value: "500+", label: "Articles" }, { value: "200K+", label: "Readers" }, { value: "5", label: "Years Traveling" }], "#f59e0b"),
  testimonials("Reader Love", [
    { quote: "Your guides helped me plan the most amazing Southeast Asia trip. Thank you!", name: "Reader", role: "Email" },
    { quote: "The best travel blog out there. Honest, practical, and inspiring.", name: "Fellow Traveler", role: "Comment" },
  ]),
  newsletter("Join the Journey", "Get weekly travel stories, tips, and exclusive destination guides"),
  footer("Nomad Notes", [
    { title: "Explore", links: ["Latest Stories", "Travel Guides", "Photography", "Videos"] },
    { title: "Popular", links: ["Budget Travel", "Solo Travel", "Food & Culture", "Adventure"] },
    { title: "Connect", links: ["Instagram", "YouTube", "Twitter", "Email"] },
  ]),
]);

// ═══ Blog ════════════════════════════════════════════════════
add("Tech Blog", "Modern technology blog with clean design", "blog", "💻", ["blog", "technology", "writing"], [
  nav("ByteSize", ["Articles", "Topics", "Podcast", "About"], "Subscribe", "dark"),
  hero("TECH INSIGHTS", "Where Technology Meets Clarity", "Deep dives into software engineering, AI, cloud, and the future of technology.", "Read Latest", "Subscribe"),
  features("Popular Topics", "Explore our most-read categories", [
    { icon: "⚛️", title: "Frontend", desc: "React, Vue, Svelte — frameworks and best practices." },
    { icon: "🤖", title: "AI & ML", desc: "Practical guides to machine learning and AI." },
    { icon: "☁️", title: "Cloud & DevOps", desc: "AWS, K8s, CI/CD — infrastructure at scale." },
    { icon: "🔒", title: "Security", desc: "Cybersecurity trends and best practices." },
  ]),
  stats([{ value: "1M+", label: "Readers/month" }, { value: "500+", label: "Articles" }, { value: "50K+", label: "Subscribers" }, { value: "5+", label: "Years" }]),
  testimonials("Reader Feedback", [
    { quote: "ByteSize is my go-to resource for staying current with tech trends.", name: "Senior Developer", role: "FAANG Engineer" },
    { quote: "The tutorials are incredibly well-written. Clear, concise, and practical.", name: "Junior Dev", role: "Bootcamp Grad" },
  ]),
  newsletter("Never Miss a Post", "Join 50K+ developers getting weekly tech insights"),
  footer("ByteSize", [
    { title: "Content", links: ["Articles", "Tutorials", "Podcast", "Newsletter"] },
    { title: "Topics", links: ["Frontend", "Backend", "DevOps", "AI"] },
    { title: "About", links: ["Team", "Write For Us", "Advertise", "Contact"] },
  ]),
]);

add("Personal Blog", "Minimalist personal blog", "blog", "✍️", ["blog", "personal", "writing"], [
  nav("Sarah Writes", ["Essays", "Journal", "Reading", "About"], "Subscribe", "light"),
  hero("WORDS & THOUGHTS", "Essays on Life, Work, and Everything Between", "Personal reflections, creative writing, and lessons learned along the way.", "Start Reading", "About Me", "#ffffff", "#6366f1"),
  features("Categories", "Browse by topic", [
    { icon: "💭", title: "Life Reflections", desc: "Honest essays about navigating modern life." },
    { icon: "💼", title: "Career & Work", desc: "Lessons from building a career in tech." },
    { icon: "📚", title: "Book Reviews", desc: "Thoughtful reviews and reading recommendations." },
    { icon: "✈️", title: "Travel Journals", desc: "Stories from adventures around the world." },
  ]),
  testimonials("Kind Words", [
    { quote: "Sarah's writing makes you feel less alone. Every essay resonates deeply.", name: "Loyal Reader", role: "3 Year Subscriber" },
    { quote: "The career essays helped me make a major life decision. Thank you.", name: "New Reader", role: "Found via Twitter" },
  ]),
  newsletter("Subscribe for New Essays", "I publish twice a month. No spam. Unsubscribe anytime."),
  footer("Sarah Writes", [
    { title: "Writing", links: ["Essays", "Journal", "Book Reviews", "Archive"] },
    { title: "Connect", links: ["Twitter", "Instagram", "Newsletter", "Email"] },
  ]),
]);

add("Magazine Blog", "Online magazine with editorial design", "blog", "📰", ["blog", "magazine", "editorial"], [
  nav("MODERN", ["Culture", "Tech", "Style", "Wellness"], "Subscribe", "light"),
  hero("THE MODERN MAGAZINE", "Culture • Technology • Style • Wellness", "Award-winning digital magazine covering the stories that shape our world.", "Read Now", "Subscribe", "#ffffff", "#dc2626"),
  features("Sections", "Explore our editorial categories", [
    { icon: "🎭", title: "Culture", desc: "Art, music, film, and the creators shaping our world." },
    { icon: "💡", title: "Technology", desc: "The tech trends and innovations changing how we live." },
    { icon: "👔", title: "Style", desc: "Fashion, design, and lifestyle for the modern era." },
    { icon: "🧠", title: "Wellness", desc: "Health, mindfulness, and the science of wellbeing." },
  ]),
  stats([{ value: "5M+", label: "Readers" }, { value: "100+", label: "Writers" }, { value: "10", label: "Awards" }, { value: "2019", label: "Founded" }]),
  testimonials("Press Quotes", [
    { quote: "MODERN is redefining digital publishing. Essential reading.", name: "The New York Times", role: "Media Review" },
    { quote: "Smart, beautiful, and unapologetically bold. A must-read.", name: "Wired Magazine", role: "Best of Web" },
  ]),
  newsletter("Join 500K+ Readers", "Get the best stories delivered to your inbox every morning"),
  footer("MODERN", [
    { title: "Read", links: ["Culture", "Technology", "Style", "Wellness"] },
    { title: "About", links: ["Masthead", "Write For Us", "Advertise", "Jobs"] },
    { title: "Follow", links: ["Instagram", "Twitter", "TikTok", "YouTube"] },
  ]),
]);

add("Newsletter Blog", "Newsletter-first publication", "blog", "📧", ["blog", "newsletter", "subscription"], [
  nav("The Signal", ["Issues", "Topics", "About", "Sponsors"], "Subscribe Free"),
  hero("SIGNAL > NOISE", "The Weekly Newsletter 100K+ Readers Trust", "Curated insights on business, technology, and culture. 5-minute read every Tuesday.", "Subscribe Free", "Read Latest Issue"),
  stats([{ value: "100K+", label: "Subscribers" }, { value: "52%", label: "Open Rate" }, { value: "200+", label: "Issues" }, { value: "Free", label: "Always" }]),
  features("What You Get", "Every Tuesday morning in your inbox", [
    { icon: "📊", title: "Market Insights", desc: "The trends and data points that matter this week." },
    { icon: "💡", title: "Big Ideas", desc: "One deep-dive essay on a topic worth thinking about." },
    { icon: "🔗", title: "Curated Links", desc: "The best articles, tools, and resources from around the web." },
    { icon: "📈", title: "Startup Spotlight", desc: "One promising startup you should know about." },
  ]),
  testimonials("Subscriber Love", [
    { quote: "The only newsletter I read every single week. Worth every minute.", name: "CEO", role: "Fortune 500" },
    { quote: "Consistently high quality. The Signal is how I stay informed.", name: "VC Partner", role: "Silicon Valley" },
  ]),
  newsletter("Join 100K+ Smart Readers", "Free. Weekly. Unsubscribe anytime. Read by CEOs, VCs, and builders."),
  footer("The Signal", [
    { title: "Newsletter", links: ["Latest Issue", "Archive", "Topics", "Sponsors"] },
    { title: "About", links: ["Team", "Mission", "Advertise", "FAQ"] },
    { title: "Follow", links: ["Twitter", "LinkedIn", "RSS"] },
  ]),
]);

// ═══ Wedding ═════════════════════════════════════════════════
add("Wedding Elegant", "Elegant wedding invitation website", "wedding", "💒", ["wedding", "invitation", "elegant"], [
  nav("Sarah & James", ["Our Story", "Details", "Gallery", "RSVP"], "RSVP Now", "light"),
  hero("WE'RE GETTING MARRIED", "Sarah & James", "June 15, 2026 • The Grand Estate, Napa Valley, California", "RSVP Now", "View Details", "#fef7f0", "#92400e"),
  features("Wedding Details", "Everything you need to know", [
    { icon: "⛪", title: "Ceremony", desc: "4:00 PM at the Garden Pavilion. Outdoor seating." },
    { icon: "🥂", title: "Reception", desc: "6:00 PM at the Grand Ballroom. Dinner and dancing." },
    { icon: "🏨", title: "Accommodations", desc: "Room block at The Grand Estate. Code: SARAHJAMES26" },
    { icon: "👗", title: "Dress Code", desc: "Black tie optional. Garden setting — heels not recommended." },
  ], "#fef7f0"),
  gallery("Our Love Story in Photos", 6),
  testimonials("From Our Friends", [
    { quote: "These two are the most incredible couple. So happy for them!", name: "Best Friend", role: "Maid of Honor" },
    { quote: "I knew from the first time they met that this was something special.", name: "College Roommate", role: "Best Man" },
  ]),
  contactSection("RSVP", "Please respond by May 1, 2026. We can't wait to celebrate with you!"),
  footer("Sarah & James", [
    { title: "Wedding", links: ["Our Story", "Details", "Gallery", "Registry"] },
    { title: "Travel", links: ["Hotels", "Directions", "Things to Do", "FAQ"] },
  ]),
]);

add("Wedding Modern", "Modern minimalist wedding site", "wedding", "💍", ["wedding", "modern", "minimal"], [
  nav("E + M", ["Story", "Event", "Photos", "RSVP"], "RSVP", "dark"),
  hero("JUNE 2026", "Emma + Michael", "Join us as we celebrate our love. Santa Monica, California.", "RSVP Now", "Event Details"),
  features("The Big Day", "What to expect", [
    { icon: "🌅", title: "Ceremony — 5PM", desc: "Sunset ceremony on the beach. Barefoot encouraged." },
    { icon: "🎉", title: "Party — 7PM", desc: "Dinner, cocktails, and dancing under the stars." },
    { icon: "🚐", title: "Transportation", desc: "Shuttle from The Beach Hotel departing at 4:30 PM." },
    { icon: "📸", title: "Photo Booth", desc: "Capture memories at our custom photo booth all night." },
  ]),
  gallery("Engagement Photos", 4),
  contactSection("RSVP by May 15, 2026", "Let us know if you can make it!"),
  footer("E + M", [
    { title: "Info", links: ["Details", "Registry", "FAQ", "Contact"] },
  ]),
]);

add("Wedding Rustic", "Rustic country wedding website", "wedding", "🌾", ["wedding", "rustic", "country"], [
  nav("Anna & Luke", ["Details", "Venue", "Gallery", "RSVP"], "RSVP", "light"),
  hero("COUNTRY WEDDING", "Anna & Luke", "August 20, 2026 • Willow Creek Farm, Vermont", "RSVP Now", "See the Venue", "#fefce8", "#713f12"),
  gallery("The Venue — Willow Creek Farm", 4),
  features("Wedding Weekend", "A full weekend celebration", [
    { icon: "🎤", title: "Friday — Welcome BBQ", desc: "Casual welcome dinner at the farm. 6:00 PM." },
    { icon: "⛪", title: "Saturday — Ceremony", desc: "Barn ceremony at 3:00 PM. Reception to follow." },
    { icon: "☕", title: "Sunday — Farewell Brunch", desc: "Farm-to-table brunch at 10:00 AM." },
    { icon: "🏕️", title: "Glamping Available", desc: "Luxury tents on-site. Book through our link." },
  ], "#fefce8"),
  contactSection("RSVP by July 1, 2026", "Please let us know about any dietary restrictions."),
  footer("Anna & Luke", [
    { title: "Weekend", links: ["Schedule", "Venue", "Accommodations", "FAQ"] },
    { title: "Registry", links: ["Target", "Crate & Barrel", "Honeymoon Fund"] },
  ]),
]);

add("Wedding Luxury", "Luxury destination wedding", "wedding", "👑", ["wedding", "luxury", "destination"], [
  nav("The Vanderbilts", ["Details", "Travel", "Registry", "RSVP"], "RSVP", "dark"),
  hero("BLACK TIE AFFAIR", "Victoria & Alexander", "December 31, 2026 • The Ritz-Carlton, Paris, France", "RSVP Now", "Travel Info"),
  features("Event Details", "A New Year's Eve celebration", [
    { icon: "⛪", title: "Ceremony — 4PM", desc: "Private chapel ceremony at The Ritz-Carlton." },
    { icon: "🍾", title: "Cocktail Hour — 5PM", desc: "Champagne reception in the Grand Salon." },
    { icon: "🍽️", title: "Dinner — 7PM", desc: "5-course French dinner by Michelin-starred chef." },
    { icon: "🎆", title: "Midnight — NYE", desc: "Countdown to midnight with fireworks over the Seine." },
  ]),
  gallery("Save the Date", 4),
  stats([{ value: "Paris", label: "France" }, { value: "Dec 31", label: "New Year's Eve" }, { value: "Black Tie", label: "Dress Code" }, { value: "250", label: "Guests" }], "#0f172a"),
  contactSection("RSVP by October 1, 2026", "Please include travel dates so we can assist with accommodations."),
  footer("The Vanderbilts", [
    { title: "Event", links: ["Details", "Travel & Hotels", "Things to Do in Paris"] },
    { title: "Registry", links: ["Tiffany & Co", "Williams Sonoma", "Honeymoon Fund"] },
  ]),
]);

// ═══ NonProfit ════════════════════════════════════════════════
add("Charity Organization", "Non-profit charity with donation focus", "nonprofit", "❤️", ["nonprofit", "charity", "donation"], [
  nav("HopeFoundation", ["Our Work", "Impact", "Get Involved", "About"], "Donate Now"),
  hero("MAKE A DIFFERENCE", "Every Dollar Changes a Life", "We provide clean water, education, and healthcare to communities in 30+ countries.", "Donate Now", "Our Impact"),
  stats([{ value: "2M+", label: "Lives Changed" }, { value: "30+", label: "Countries" }, { value: "95%", label: "Goes to Programs" }, { value: "15+", label: "Years" }]),
  features("Our Programs", "Tackling the root causes of poverty", [
    { icon: "💧", title: "Clean Water", desc: "Building wells and water systems for communities in need." },
    { icon: "📚", title: "Education", desc: "Schools, scholarships, and teacher training programs." },
    { icon: "⚕️", title: "Healthcare", desc: "Mobile clinics and community health worker training." },
    { icon: "🌱", title: "Sustainability", desc: "Agricultural training and economic empowerment." },
  ]),
  testimonials("Impact Stories", [
    { quote: "Thanks to HopeFoundation, our village now has clean water for the first time.", name: "Village Elder", role: "Kenya" },
    { quote: "The scholarship program changed my daughter's future. She's now in university.", name: "Grateful Parent", role: "Guatemala" },
  ]),
  cta("Help Us Change More Lives", "100% of public donations go directly to our programs.", "Donate Now →"),
  newsletter("Stay Connected", "Monthly updates on our impact and stories from the field"),
  footer("HopeFoundation", [
    { title: "Our Work", links: ["Programs", "Countries", "Impact", "Reports"] },
    { title: "Get Involved", links: ["Donate", "Volunteer", "Fundraise", "Partner"] },
    { title: "About", links: ["Team", "Financials", "Press", "Contact"] },
  ]),
]);

add("Environmental NGO", "Environmental protection organization", "nonprofit", "🌍", ["nonprofit", "environment", "climate"], [
  nav("EarthGuard", ["Campaigns", "Research", "Take Action", "About"], "Join Us"),
  hero("PROTECT OUR PLANET", "The Earth Doesn't Have a Backup Plan", "Fighting climate change, protecting ecosystems, and building a sustainable future.", "Take Action", "Our Campaigns", "#0f172a", "#16a34a"),
  stats([{ value: "10M+", label: "Trees Planted" }, { value: "500K", label: "Acres Protected" }, { value: "100+", label: "Campaigns" }, { value: "50+", label: "Countries" }]),
  features("Our Campaigns", "Taking on the biggest environmental challenges", [
    { icon: "🌳", title: "Reforestation", desc: "Planting 1 billion trees by 2030 to combat deforestation." },
    { icon: "🌊", title: "Ocean Protection", desc: "Fighting plastic pollution and protecting marine ecosystems." },
    { icon: "⚡", title: "Clean Energy", desc: "Advocating for 100% renewable energy worldwide." },
    { icon: "🐘", title: "Wildlife", desc: "Protecting endangered species and their habitats." },
  ]),
  testimonials("Supporter Voices", [
    { quote: "EarthGuard gives me hope that we can still make a difference for our planet.", name: "Monthly Donor", role: "5 Year Supporter" },
    { quote: "Their research directly influenced policy change in our country.", name: "Environmental Scientist", role: "Collaborator" },
  ]),
  cta("The Planet Needs You", "Join 2 million supporters taking action for the environment.", "Join the Movement →", "#16a34a", "#22c55e"),
  footer("EarthGuard", [
    { title: "Campaigns", links: ["Forests", "Oceans", "Climate", "Wildlife"] },
    { title: "Act", links: ["Donate", "Petition", "Volunteer", "Events"] },
    { title: "About", links: ["Mission", "Team", "Research", "Press"] },
  ]),
]);

add("Animal Shelter", "Animal rescue and adoption website", "nonprofit", "🐾", ["nonprofit", "animals", "adoption"], [
  nav("PawsHome", ["Adopt", "Foster", "Donate", "Events"], "Find a Pet", "light"),
  hero("FIND YOUR BEST FRIEND", "Every Pet Deserves a Loving Home", "Browse our adorable animals ready for adoption. Help us save more lives.", "Meet Our Pets", "How to Adopt", "#fef7f0", "#ea580c"),
  stats([{ value: "5000+", label: "Animals Adopted" }, { value: "200+", label: "In Our Care" }, { value: "500+", label: "Foster Families" }, { value: "0", label: "Kill Policy" }]),
  features("How You Can Help", "Many ways to make a difference", [
    { icon: "🏠", title: "Adopt", desc: "Give a forever home to a pet in need." },
    { icon: "🏡", title: "Foster", desc: "Provide temporary care until they find their family." },
    { icon: "💰", title: "Donate", desc: "Fund food, medical care, and shelter operations." },
    { icon: "🙋", title: "Volunteer", desc: "Walk dogs, socialize cats, and help at events." },
  ], "#fef7f0"),
  gallery("Pets Ready for Adoption", 6),
  testimonials("Happy Families", [
    { quote: "Adopting Max was the best decision we ever made. He's family now.", name: "Dog Parent", role: "Adopted 2024" },
    { quote: "The adoption process was so caring and thorough. We love our new cat!", name: "Cat Parent", role: "Adopted 2025" },
  ]),
  cta("Save a Life Today", "Every adoption opens a space for another animal in need.", "Browse Adoptable Pets →"),
  footer("PawsHome", [
    { title: "Adopt", links: ["Dogs", "Cats", "Other Pets", "Process"] },
    { title: "Support", links: ["Donate", "Foster", "Volunteer", "Events"] },
    { title: "About", links: ["Our Mission", "Team", "Success Stories", "Contact"] },
  ]),
]);

add("Education Nonprofit", "Youth education and mentorship nonprofit", "nonprofit", "📖", ["nonprofit", "education", "youth"], [
  nav("BrightFutures", ["Programs", "Impact", "Mentorship", "About"], "Get Involved"),
  hero("INVEST IN TOMORROW", "Every Child Deserves Access to Quality Education", "Providing free tutoring, mentorship, and scholarships to underserved youth.", "Support Our Mission", "See Our Impact"),
  stats([{ value: "50K+", label: "Students Served" }, { value: "2000+", label: "Mentors" }, { value: "95%", label: "Graduation Rate" }, { value: "20+", label: "Cities" }]),
  features("Our Programs", "Comprehensive support for student success", [
    { icon: "📚", title: "Free Tutoring", desc: "After-school and weekend tutoring in all subjects." },
    { icon: "👥", title: "Mentorship", desc: "Matched 1-on-1 with professional mentors." },
    { icon: "🎓", title: "Scholarships", desc: "$5M+ in college scholarships awarded annually." },
    { icon: "💻", title: "Digital Access", desc: "Free laptops and internet for qualifying families." },
  ]),
  testimonials("Student Stories", [
    { quote: "BrightFutures helped me become the first in my family to attend college.", name: "College Student", role: "Scholar 2024" },
    { quote: "My mentor showed me that my dreams were possible. I'm now studying engineering.", name: "High Schooler", role: "Mentee" },
  ]),
  cta("Help a Student Today", "Your donation provides books, tutoring, and hope.", "Donate Now →"),
  footer("BrightFutures", [
    { title: "Programs", links: ["Tutoring", "Mentorship", "Scholarships", "Digital Access"] },
    { title: "Get Involved", links: ["Donate", "Mentor", "Volunteer", "Events"] },
    { title: "About", links: ["Mission", "Team", "Impact Report", "Contact"] },
  ]),
]);

// ═══ Music ════════════════════════════════════════════════════
add("Artist Website", "Musician/band official website", "music", "🎵", ["music", "artist", "band"], [
  nav("NOVA", ["Music", "Tour", "Merch", "About"], "Listen Now", "dark"),
  hero("NEW ALBUM OUT NOW", "NOVA — Midnight Sky", "The highly anticipated album featuring 12 original tracks. Available on all platforms.", "Listen Now", "Tour Dates"),
  gallery("Music Videos", 4),
  features("Latest Releases", "Stream everywhere", [
    { icon: "💿", title: "Midnight Sky", desc: "New album — 12 tracks of pure energy." },
    { icon: "🎤", title: "Electric Dreams", desc: "Hit single — 50M+ streams and counting." },
    { icon: "🎸", title: "Live at MSG", desc: "Live album from our sold-out Madison Square Garden show." },
    { icon: "🎵", title: "Acoustic Sessions", desc: "Stripped-down versions of fan favorites." },
  ]),
  stats([{ value: "500M+", label: "Streams" }, { value: "5", label: "Albums" }, { value: "50+", label: "Countries Toured" }, { value: "1M+", label: "Monthly Listeners" }]),
  testimonials("Press Quotes", [
    { quote: "NOVA is the sound of the future. Midnight Sky is a masterpiece.", name: "Rolling Stone", role: "★★★★★" },
    { quote: "The live show is absolutely electrifying. A must-see.", name: "Pitchfork", role: "Best New Artist" },
  ]),
  newsletter("Join the Fanclub", "Exclusive content, presale access, and merch drops"),
  footer("NOVA", [
    { title: "Music", links: ["Albums", "Singles", "Videos", "Lyrics"] },
    { title: "Live", links: ["Tour Dates", "Tickets", "VIP Packages", "Past Shows"] },
    { title: "Connect", links: ["Instagram", "TikTok", "YouTube", "Spotify"] },
  ]),
]);

add("Music Producer", "Music producer and beatmaker portfolio", "music", "🎹", ["music", "producer", "beats"], [
  nav("BeatLab", ["Beats", "Services", "Credits", "Contact"], "License Beat", "dark"),
  hero("MUSIC PRODUCTION", "Premium Beats for Premium Artists", "Grammy-nominated producer with 500+ placements. License exclusive beats for your next hit.", "Browse Beats", "Custom Production"),
  stats([{ value: "500+", label: "Placements" }, { value: "2B+", label: "Total Streams" }, { value: "Grammy", label: "Nominated" }, { value: "200+", label: "Artists" }]),
  features("Services", "From beat licensing to full production", [
    { icon: "🎵", title: "Beat Store", desc: "Browse and license beats instantly. MP3, WAV, and stems." },
    { icon: "🎛️", title: "Custom Production", desc: "Exclusive beats tailored to your sound and vision." },
    { icon: "🎙️", title: "Mix & Master", desc: "Professional mixing and mastering services." },
    { icon: "📝", title: "Songwriting", desc: "Co-writing and toplining for your project." },
  ]),
  pricing("License Options", "All licenses include high-quality audio files", [
    { name: "Basic", price: "$29", period: "/beat", features: "MP3 file\n5K distribution\nSocial media use\nCredit required" },
    { name: "Premium", price: "$99", period: "/beat", features: "WAV + MP3\n100K distribution\nAll platforms\nMusic video", featured: true },
    { name: "Exclusive", price: "$499", period: "/beat", features: "Stems + WAV + MP3\nUnlimited distribution\nFull ownership\nNo credit needed" },
  ]),
  cta("Ready to Make a Hit?", "Browse 200+ beats or request custom production.", "Browse Beats →"),
  footer("BeatLab", [
    { title: "Music", links: ["Beat Store", "Free Beats", "Custom", "Catalog"] },
    { title: "Services", links: ["Production", "Mixing", "Mastering", "Songwriting"] },
    { title: "Connect", links: ["Instagram", "YouTube", "SoundCloud", "Email"] },
  ]),
]);

add("Record Label", "Independent record label website", "music", "📀", ["music", "label", "independent"], [
  nav("Pulse Records", ["Artists", "Releases", "Submit", "About"], "New Releases"),
  hero("INDEPENDENT MUSIC", "Where Artists Come First", "Boutique record label championing independent artists across all genres.", "Meet Our Artists", "Latest Releases"),
  features("Our Artists", "Diverse talent. Authentic music.", [
    { icon: "🎤", title: "NOVA", desc: "Electronic pop. 500M+ streams." },
    { icon: "🎸", title: "The Wild Ones", desc: "Indie rock. 3 studio albums." },
    { icon: "🎹", title: "Luna Martinez", desc: "Neo-soul & R&B. Grammy nominee." },
    { icon: "🎵", title: "DJ Apex", desc: "House & techno. Global festival circuit." },
  ]),
  stats([{ value: "50+", label: "Artists" }, { value: "200+", label: "Releases" }, { value: "2B+", label: "Total Streams" }, { value: "2010", label: "Founded" }]),
  testimonials("Artist Testimonials", [
    { quote: "Pulse Records gave me creative freedom AND commercial success. Rare combo.", name: "Artist", role: "Signed 2020" },
    { quote: "The best team in the independent music world. They truly care about artists.", name: "Band", role: "Signed 2018" },
  ]),
  cta("Submit Your Music", "We're always looking for fresh talent. Send us your demo.", "Submit Demo →"),
  footer("Pulse Records", [
    { title: "Music", links: ["Artists", "Releases", "Playlists", "Merch"] },
    { title: "Label", links: ["About", "Submit Demo", "Press", "Licensing"] },
    { title: "Follow", links: ["Instagram", "Spotify", "YouTube", "TikTok"] },
  ]),
]);

add("Music Festival", "Music festival event website", "music", "🎪", ["music", "festival", "event"], [
  nav("SONIC FEST", ["Lineup", "Tickets", "Info", "Gallery"], "Buy Tickets"),
  hero("SONIC FEST 2026", "3 Days. 50+ Artists. One Unforgettable Weekend.", "July 17-19, 2026 • Desert Valley, California", "Buy Tickets", "See Lineup"),
  features("Lineup Highlights", "World-class artists across 4 stages", [
    { icon: "⭐", title: "Headliners", desc: "NOVA • The Weekend • Dua Lipa • Kendrick Lamar" },
    { icon: "🎸", title: "Rock Stage", desc: "Arctic Monkeys • Fontaines D.C. • Wet Leg" },
    { icon: "🎹", title: "Electronic", desc: "Fred Again.. • Bicep • Peggy Gou" },
    { icon: "🎤", title: "Discovery", desc: "20+ emerging artists you need to hear." },
  ]),
  stats([{ value: "50+", label: "Artists" }, { value: "4", label: "Stages" }, { value: "3", label: "Days" }, { value: "30K", label: "Capacity" }]),
  pricing("Tickets", "Limited availability — don't miss out", [
    { name: "General", price: "$299", period: "/3-day", features: "All stages access\nGeneral camping\nFood vendors\nWater stations" },
    { name: "VIP", price: "$599", period: "/3-day", features: "Front-of-stage areas\nVIP lounge\nPremium camping\nFree merch", featured: true },
    { name: "Platinum", price: "$1,299", period: "/3-day", features: "All VIP benefits\nArtist meet & greet\nLuxury glamping\nConcierge service" },
  ]),
  faqSection("Festival FAQ", [
    { q: "Can I bring my own food?", a: "Outside food is not permitted, but we have 30+ food vendors." },
    { q: "Is re-entry allowed?", a: "Yes, wristbands allow unlimited re-entry." },
    { q: "What about parking?", a: "Free parking is available. Shuttles run from downtown." },
  ]),
  cta("Don't Miss Out", "Early bird pricing ends soon. Secure your spot now.", "Get Tickets →"),
  footer("SONIC FEST", [
    { title: "Festival", links: ["Lineup", "Schedule", "Map", "Rules"] },
    { title: "Tickets", links: ["Buy", "VIP", "Group Deals", "Refund Policy"] },
    { title: "Info", links: ["Getting There", "Camping", "FAQ", "Contact"] },
  ]),
]);

// ═══ Job Board ═══════════════════════════════════════════════
add("Job Board Platform", "Modern job listing platform", "jobboard", "💼", ["jobs", "hiring", "platform"], [
  nav("HireHub", ["Find Jobs", "Companies", "Salary", "For Employers"], "Post a Job"),
  hero("FIND YOUR DREAM JOB", "Where Top Talent Meets Great Companies", "50K+ jobs from the world's best companies. Remote, hybrid, and onsite.", "Search Jobs", "For Employers"),
  stats([{ value: "50K+", label: "Active Jobs" }, { value: "10K+", label: "Companies" }, { value: "2M+", label: "Job Seekers" }, { value: "500K+", label: "Hires Made" }]),
  features("Browse by Category", "Find the perfect role for your skills", [
    { icon: "💻", title: "Engineering", desc: "Software, hardware, data — 15K+ open roles." },
    { icon: "🎨", title: "Design", desc: "Product, UX, graphic design positions." },
    { icon: "📈", title: "Marketing", desc: "Growth, content, social media, and SEO roles." },
    { icon: "💼", title: "Business", desc: "Sales, operations, finance, and management." },
  ]),
  testimonials("Success Stories", [
    { quote: "Found my dream remote job in 2 weeks. The filtering tools are amazing.", name: "Software Engineer", role: "Now at Stripe" },
    { quote: "HireHub helped us hire 50+ engineers this year. Best recruiting platform.", name: "Head of Talent", role: "Series B Startup" },
  ]),
  pricing("For Employers", "Reach top talent with our job posting plans", [
    { name: "Single Post", price: "$99", period: "/post", features: "30-day listing\nBasic analytics\nCompany profile\nEmail support" },
    { name: "Pro", price: "$399", period: "/month", features: "10 job posts\nFeatured listings\nResume search\nAdvanced analytics", featured: true },
    { name: "Enterprise", price: "$999", period: "/month", features: "Unlimited posts\nATS integration\nDedicated account manager\nCustom branding" },
  ]),
  cta("Start Hiring or Get Hired", "Join millions of professionals and companies on HireHub.", "Get Started Free →"),
  footer("HireHub", [
    { title: "Job Seekers", links: ["Search Jobs", "Companies", "Salary Guide", "Career Tips"] },
    { title: "Employers", links: ["Post Job", "Pricing", "ATS", "Enterprise"] },
    { title: "Company", links: ["About", "Blog", "Press", "Contact"] },
  ]),
]);

add("Remote Jobs", "Remote-first job board", "jobboard", "🌍", ["jobs", "remote", "work-from-home"], [
  nav("RemoteOK", ["Jobs", "Companies", "Salary", "Blog"], "Post Remote Job"),
  hero("WORK FROM ANYWHERE", "The #1 Remote Job Board", "Find remote jobs at the world's best companies. No commute. No office. Just great work.", "Find Remote Jobs", "Post a Job"),
  stats([{ value: "25K+", label: "Remote Jobs" }, { value: "5K+", label: "Companies" }, { value: "100%", label: "Remote" }, { value: "150+", label: "Countries" }]),
  features("Remote Job Categories", "Work from anywhere in any field", [
    { icon: "💻", title: "Development", desc: "Frontend, backend, full-stack, mobile — all remote." },
    { icon: "🎨", title: "Design", desc: "UI/UX, product design, and creative roles." },
    { icon: "✍️", title: "Writing", desc: "Content, copywriting, technical writing positions." },
    { icon: "📊", title: "Data", desc: "Analytics, data science, and ML engineering." },
  ]),
  testimonials("Remote Workers Say", [
    { quote: "I'm writing this from Bali. Found my fully remote job here 6 months ago.", name: "Digital Nomad", role: "Product Designer" },
    { quote: "Remote work changed my life. I can finally live where I want.", name: "Remote Dev", role: "Full-Stack Engineer" },
  ]),
  cta("Your Remote Career Starts Here", "New remote jobs posted daily. Never miss an opportunity.", "Browse Remote Jobs →"),
  footer("RemoteOK", [
    { title: "Jobs", links: ["Development", "Design", "Marketing", "Sales"] },
    { title: "Resources", links: ["Remote Guide", "Salary Data", "Blog", "Newsletter"] },
    { title: "Post", links: ["Post Job ($99)", "Featured ($299)", "Enterprise"] },
  ]),
]);

add("Freelance Marketplace", "Freelancer hiring platform", "jobboard", "🤝", ["jobs", "freelance", "marketplace"], [
  nav("GigConnect", ["Find Talent", "Find Work", "How It Works", "Enterprise"], "Get Started"),
  hero("HIRE TOP FREELANCERS", "World-Class Talent on Demand", "Find and hire expert freelancers for any project. From 1-hour tasks to full-time contracts.", "Hire Talent", "Find Work"),
  stats([{ value: "500K+", label: "Freelancers" }, { value: "100K+", label: "Clients" }, { value: "$1B+", label: "Earned" }, { value: "4.8★", label: "Avg Rating" }]),
  features("Popular Categories", "Expert freelancers in every field", [
    { icon: "💻", title: "Development", desc: "Web, mobile, and software development experts." },
    { icon: "🎨", title: "Design", desc: "Logo, UI/UX, illustration, and branding." },
    { icon: "✍️", title: "Content", desc: "Writing, translation, and video production." },
    { icon: "📊", title: "Business", desc: "Consulting, finance, and virtual assistance." },
  ]),
  testimonials("Platform Reviews", [
    { quote: "GigConnect helped us find an amazing developer in 24 hours. Incredible.", name: "Startup Founder", role: "Client" },
    { quote: "I earn 3x more freelancing here than I did at my full-time job.", name: "Freelance Designer", role: "Top Rated" },
  ]),
  cta("Join the Future of Work", "Whether you're hiring or freelancing, get started in minutes.", "Create Free Account →"),
  footer("GigConnect", [
    { title: "Clients", links: ["How to Hire", "Categories", "Enterprise", "Trust & Safety"] },
    { title: "Freelancers", links: ["Find Work", "Create Profile", "Resources", "Community"] },
    { title: "Company", links: ["About", "Blog", "Press", "Careers"] },
  ]),
]);

add("Tech Careers", "Tech company careers page", "jobboard", "🚀", ["jobs", "tech", "careers"], [
  nav("TechCorp", ["About", "Teams", "Benefits", "Open Roles"], "Apply Now"),
  hero("JOIN OUR TEAM", "Build the Future of Technology", "We're hiring the world's best engineers, designers, and leaders. Remote-first. Global team.", "View Open Roles", "Life at TechCorp"),
  stats([{ value: "2000+", label: "Employees" }, { value: "30+", label: "Countries" }, { value: "100%", label: "Remote-First" }, { value: "$5B", label: "Valuation" }]),
  features("Why TechCorp?", "We invest in our people", [
    { icon: "💰", title: "Top Compensation", desc: "Competitive salary + equity. Transparent pay bands." },
    { icon: "🏠", title: "Remote-First", desc: "Work from anywhere. $5K/year home office budget." },
    { icon: "📚", title: "Learning Budget", desc: "$3K/year for courses, conferences, and books." },
    { icon: "🏥", title: "Health & Wellness", desc: "Premium health insurance, gym membership, mental health support." },
  ]),
  team("Leadership Team", [
    { name: "Alice Chen", role: "CEO & Co-founder" },
    { name: "Bob Williams", role: "CTO & Co-founder" },
    { name: "Carol Kim", role: "VP Engineering" },
    { name: "David Lee", role: "VP Design" },
  ]),
  testimonials("Team Voices", [
    { quote: "The engineering culture here is unlike anywhere I've worked. Truly world-class.", name: "Staff Engineer", role: "3 Years" },
    { quote: "I love that I can work from Portugal and still feel deeply connected to the team.", name: "Product Designer", role: "Remote, Lisbon" },
  ]),
  cta("Your Next Chapter Starts Here", "We're hiring across all teams. Find your role today.", "View All Positions →"),
  footer("TechCorp", [
    { title: "Careers", links: ["Open Roles", "Engineering", "Design", "Product"] },
    { title: "Life", links: ["Culture", "Benefits", "Remote Work", "DEI"] },
    { title: "Company", links: ["About", "Blog", "Press", "Contact"] },
  ]),
]);

// ═══ Event ═══════════════════════════════════════════════════
add("Tech Conference", "Technology conference website", "event", "🎤", ["event", "conference", "tech"], [
  nav("DevSummit 2026", ["Speakers", "Schedule", "Tickets", "Sponsors"], "Register Now"),
  hero("DEVSUMMIT 2026", "The Future of Software Engineering", "March 15-17, 2026 • San Francisco Convention Center • 5000+ Attendees", "Register Now", "View Speakers"),
  stats([{ value: "5000+", label: "Attendees" }, { value: "100+", label: "Speakers" }, { value: "50+", label: "Sessions" }, { value: "3", label: "Days" }]),
  features("Featured Tracks", "Deep dives into the hottest topics", [
    { icon: "🤖", title: "AI & Machine Learning", desc: "Latest advances in LLMs, computer vision, and AI ops." },
    { icon: "☁️", title: "Cloud Native", desc: "Kubernetes, serverless, and modern infrastructure." },
    { icon: "🔒", title: "Security", desc: "Zero trust, supply chain security, and compliance." },
    { icon: "⚛️", title: "Frontend", desc: "React Server Components, new frameworks, and web standards." },
  ]),
  team("Keynote Speakers", [
    { name: "Dr. Sarah AI", role: "Chief Scientist at OpenAI" },
    { name: "John Cloud", role: "VP Engineering at Google" },
    { name: "Emily Code", role: "Creator of Next.js" },
    { name: "Mike Secure", role: "CISO at Cloudflare" },
  ]),
  pricing("Tickets", "Early bird pricing available now", [
    { name: "General", price: "$399", period: "", features: "All sessions\nNetworking events\nLunch included\nRecordings access" },
    { name: "VIP", price: "$799", period: "", features: "General + Workshop\nVIP lounge\nSpeaker dinner\nPriority seating", featured: true },
    { name: "Team Pack", price: "$1,499", period: "/5 tickets", features: "5 General tickets\n20% discount\nTeam lounge\nGroup activities" },
  ]),
  faqSection("Conference FAQ", [
    { q: "Is there a virtual option?", a: "Yes! All sessions will be livestreamed for virtual ticket holders." },
    { q: "Are workshops included?", a: "Workshops require VIP tickets or a separate workshop pass ($199)." },
    { q: "Is there a code of conduct?", a: "Yes. We're committed to a safe, inclusive environment for all attendees." },
  ]),
  cta("Don't Miss DevSummit 2026", "Early bird pricing ends February 28. Save $100 per ticket.", "Register Now →"),
  footer("DevSummit 2026", [
    { title: "Event", links: ["Speakers", "Schedule", "Venue", "Hotels"] },
    { title: "Attend", links: ["Tickets", "Workshops", "Sponsors", "FAQ"] },
    { title: "Connect", links: ["Twitter", "LinkedIn", "YouTube", "Email"] },
  ]),
]);

add("Product Launch", "Product launch event page", "event", "🚀", ["event", "launch", "product"], [
  nav("LaunchPad", ["About", "Features", "Tickets", "FAQ"], "Get Tickets"),
  hero("PRODUCT LAUNCH", "The Next Big Thing in Tech", "Join us for the unveiling of a revolutionary product that will change everything. Be there first.", "Reserve Your Spot", "Learn More"),
  stats([{ value: "March 20", label: "2026" }, { value: "7:00 PM", label: "PST" }, { value: "Live +", label: "Virtual" }, { value: "Limited", label: "Seats" }]),
  features("What to Expect", "An evening of innovation and inspiration", [
    { icon: "🎭", title: "Live Demo", desc: "Be the first to see the product in action." },
    { icon: "🎤", title: "Keynote", desc: "Visionary talk from our CEO on the future of tech." },
    { icon: "🤝", title: "Networking", desc: "Connect with industry leaders and innovators." },
    { icon: "🎁", title: "Exclusive Access", desc: "Attendees get 6 months free access to the new product." },
  ]),
  testimonials("Previous Events", [
    { quote: "LaunchPad events are always spectacular. The energy is electric.", name: "Tech Reporter", role: "The Verge" },
    { quote: "I've attended 3 launches. Each one has blown my mind.", name: "Early Adopter", role: "Product Hunt" },
  ]),
  cta("Secure Your Spot", "Limited to 500 attendees. Virtual tickets also available.", "Get Tickets →"),
  footer("LaunchPad", [
    { title: "Event", links: ["Details", "Venue", "Speakers", "Schedule"] },
    { title: "Tickets", links: ["In-Person", "Virtual", "VIP", "FAQ"] },
    { title: "Follow", links: ["Twitter", "LinkedIn", "YouTube"] },
  ]),
]);

add("Workshop Event", "Educational workshop and training event", "event", "📚", ["event", "workshop", "training"], [
  nav("SkillUp Workshop", ["Workshops", "Instructors", "Schedule", "Register"], "Book Now"),
  hero("HANDS-ON LEARNING", "Master New Skills in a Weekend", "Intensive, project-based workshops led by industry experts. Small groups. Big impact.", "View Workshops", "Register Now"),
  features("Upcoming Workshops", "Learn by doing with expert guidance", [
    { icon: "⚛️", title: "React Masterclass", desc: "2-day deep dive into advanced React patterns. Apr 5-6." },
    { icon: "🎨", title: "Design Systems", desc: "Build a production design system from scratch. Apr 12-13." },
    { icon: "📊", title: "Data Visualization", desc: "D3.js and storytelling with data. Apr 19-20." },
    { icon: "🤖", title: "AI for Developers", desc: "Build AI-powered apps with OpenAI & LangChain. Apr 26-27." },
  ]),
  stats([{ value: "500+", label: "Workshops Held" }, { value: "15K+", label: "Graduates" }, { value: "4.9★", label: "Rating" }, { value: "12", label: "Max Class Size" }]),
  testimonials("Graduate Reviews", [
    { quote: "The React workshop taught me more in 2 days than 3 months of online courses.", name: "Developer", role: "Senior Engineer" },
    { quote: "Small class sizes mean you get real attention from the instructor. Worth every penny.", name: "Designer", role: "Product Designer" },
  ]),
  pricing("Workshop Pricing", "All materials and lunch included", [
    { name: "Single Workshop", price: "$499", period: "/weekend", features: "2-day workshop\nAll materials\nLunch included\nCertificate" },
    { name: "Bundle (3)", price: "$1,199", period: "/3 workshops", features: "Any 3 workshops\nAll materials\nLunch included\nCertificates\n20% savings", featured: true },
    { name: "Team (5+)", price: "$399", period: "/person", features: "Group discount\nPrivate session option\nCustom topics\nInvoice billing" },
  ]),
  cta("Level Up Your Skills", "Class sizes are limited to 12 students. Book early to secure your spot.", "Browse Workshops →"),
  footer("SkillUp Workshop", [
    { title: "Learn", links: ["Workshops", "Schedule", "Instructors", "Blog"] },
    { title: "For Teams", links: ["Corporate Training", "Custom Workshops", "Pricing"] },
    { title: "About", links: ["Our Story", "Careers", "FAQ", "Contact"] },
  ]),
]);

add("Charity Gala", "Charity fundraising gala event", "event", "🎭", ["event", "charity", "gala"], [
  nav("Hope Gala 2026", ["Event", "Auction", "Sponsors", "Tickets"], "Buy Tickets", "dark"),
  hero("ANNUAL HOPE GALA", "An Evening of Giving", "Join us for an unforgettable night of dinner, entertainment, and fundraising for children's education.", "Buy Tickets", "Become a Sponsor"),
  features("The Evening", "A night to remember", [
    { icon: "🥂", title: "Cocktail Hour — 6PM", desc: "Welcome drinks and live jazz in the Grand Foyer." },
    { icon: "🍽️", title: "Gala Dinner — 7PM", desc: "5-course dinner by award-winning chef." },
    { icon: "🎤", title: "Program — 8:30PM", desc: "Impact stories, live auction, and special performances." },
    { icon: "💃", title: "After Party — 10PM", desc: "Dancing and celebration into the night." },
  ]),
  stats([{ value: "$5M+", label: "Raised Last Year" }, { value: "500", label: "Guests" }, { value: "50+", label: "Auction Items" }, { value: "10th", label: "Annual" }]),
  pricing("Tickets", "All proceeds support children's education programs", [
    { name: "Individual", price: "$500", period: "", features: "Gala dinner\nOpen bar\nAuction participation\nEntertainment" },
    { name: "Couple", price: "$900", period: "", features: "2 dinner seats\nOpen bar\nPremium seating\nGift bag", featured: true },
    { name: "Table (10)", price: "$4,500", period: "", features: "10 seats\nPrime location\nCompany recognition\nVIP reception" },
  ]),
  cta("Be Part of the Change", "Your ticket directly funds education for children in need.", "Reserve Tickets →"),
  footer("Hope Gala 2026", [
    { title: "Event", links: ["Details", "Auction", "Entertainment", "Venue"] },
    { title: "Support", links: ["Tickets", "Sponsor", "Donate", "Volunteer"] },
    { title: "About", links: ["The Cause", "Past Events", "Impact", "Contact"] },
  ]),
]);

// ═══ Landing Page ════════════════════════════════════════════
add("App Landing Page", "Mobile app launch landing page", "landing", "📱", ["landing", "app", "mobile"], [
  nav("AppName", ["Features", "Screenshots", "Reviews", "Download"], "Download Free"),
  hero("YOUR LIFE, SIMPLIFIED", "The App That Does It All", "Productivity, health, finance — one beautiful app to manage your entire life.", "Download Free", "See Features"),
  features("Powerful Features", "Everything you need in one app", [
    { icon: "📋", title: "Task Management", desc: "Smart to-do lists with AI prioritization." },
    { icon: "💰", title: "Budget Tracking", desc: "Automatic expense categorization and insights." },
    { icon: "🏃", title: "Health Tracking", desc: "Steps, sleep, and nutrition in one place." },
    { icon: "📅", title: "Smart Calendar", desc: "AI-powered scheduling that adapts to your habits." },
  ]),
  stats([{ value: "2M+", label: "Downloads" }, { value: "4.9★", label: "App Store" }, { value: "#1", label: "Productivity" }, { value: "Free", label: "Forever" }]),
  testimonials("User Reviews", [
    { quote: "This app replaced 5 other apps for me. It's incredibly well-designed.", name: "App Store Review", role: "★★★★★" },
    { quote: "The AI features are game-changing. My productivity doubled.", name: "Power User", role: "Since 2024" },
    { quote: "Beautiful, fast, and actually useful. The best app I've downloaded this year.", name: "Tech Reviewer", role: "9to5Mac" },
  ]),
  cta("Download Free Today", "Available on iOS and Android. No credit card required.", "Get the App →"),
  footer("AppName", [
    { title: "Product", links: ["Features", "Pricing", "Updates", "Roadmap"] },
    { title: "Resources", links: ["Help Center", "Blog", "Community", "API"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  ]),
]);

add("Coming Soon", "Pre-launch coming soon page", "landing", "⏳", ["landing", "coming-soon", "pre-launch"], [
  nav("Stealth", ["About", "Team", "Updates"], "Get Notified", "dark"),
  hero("COMING SOON", "Something Amazing Is Brewing", "We're building the next generation of [product category]. Be the first to know when we launch.", "Join Waitlist", "Learn More"),
  stats([{ value: "50K+", label: "On Waitlist" }, { value: "Q2 2026", label: "Launch" }, { value: "$10M", label: "Raised" }, { value: "YC W26", label: "Backed By" }]),
  features("What We're Building", "A sneak peek at what's coming", [
    { icon: "🚀", title: "10x Faster", desc: "We're reimagining how [task] is done." },
    { icon: "🤖", title: "AI Native", desc: "Built from the ground up with AI at the core." },
    { icon: "🔒", title: "Privacy First", desc: "Your data stays yours. Always." },
    { icon: "🌍", title: "Global", desc: "Available worldwide from day one." },
  ]),
  newsletter("Join the Waitlist", "Be first in line. Early adopters get lifetime discounts."),
  footer("Stealth", [
    { title: "Updates", links: ["Blog", "Twitter", "Newsletter"] },
    { title: "Company", links: ["Team", "Investors", "Press", "Careers"] },
  ]),
]);

add("SaaS Landing", "High-converting SaaS landing page", "landing", "💎", ["landing", "saas", "conversion"], [
  nav("Supercharge", ["How It Works", "Features", "Pricing", "Reviews"], "Try Free"),
  hero("STOP WASTING TIME", "Automate Your Workflow in 5 Minutes", "Connect your tools. Set up automations. Reclaim 10+ hours every week. No code required.", "Start Free Trial", "Watch Demo"),
  logoCloud("INTEGRATES WITH", ["Slack", "Notion", "Google", "Salesforce", "HubSpot"]),
  features("How It Works", "Three simple steps to automation", [
    { icon: "1️⃣", title: "Connect Your Tools", desc: "Link your favorite apps in one click. 200+ integrations." },
    { icon: "2️⃣", title: "Build Workflows", desc: "Drag-and-drop builder. No coding skills needed." },
    { icon: "3️⃣", title: "Run on Autopilot", desc: "Set it and forget it. We handle the rest 24/7." },
  ]),
  stats([{ value: "10M+", label: "Automations Run" }, { value: "50K+", label: "Users" }, { value: "10 hrs", label: "Saved/Week" }, { value: "200+", label: "Integrations" }]),
  pricing("Simple Pricing", "Save 20% with annual billing", [
    { name: "Free", price: "$0", period: "/month", features: "100 tasks/month\n5 workflows\n3 integrations\nEmail support" },
    { name: "Pro", price: "$19", period: "/month", features: "10K tasks/month\nUnlimited workflows\nAll integrations\nPriority support", featured: true },
    { name: "Business", price: "$49", period: "/month", features: "100K tasks/month\nTeam features\nAdvanced logic\nDedicated CSM\nSSO" },
  ]),
  testimonials("User Stories", [
    { quote: "Supercharge saved our marketing team 15 hours per week. Unbelievable ROI.", name: "Marketing Director", role: "E-commerce" },
    { quote: "We automated our entire onboarding process. Setup took 20 minutes.", name: "HR Manager", role: "SaaS Startup" },
  ]),
  faqSection("Frequently Asked Questions", [
    { q: "Do I need coding skills?", a: "Not at all! Our visual builder makes automation accessible to everyone." },
    { q: "Is my data secure?", a: "Yes. SOC 2 certified, encrypted at rest and in transit, GDPR compliant." },
    { q: "Can I cancel anytime?", a: "Absolutely. No contracts. Cancel with one click." },
  ]),
  cta("Start Automating Today", "Free forever plan. Upgrade when you're ready.", "Create Free Account →"),
  footer("Supercharge", [
    { title: "Product", links: ["Features", "Integrations", "Pricing", "Enterprise"] },
    { title: "Resources", links: ["Templates", "University", "Blog", "API Docs"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  ]),
]);

add("Waitlist Page", "Viral waitlist with referral mechanics", "landing", "🔥", ["landing", "waitlist", "viral"], [
  nav("NextBig", [], "Join Waitlist", "dark"),
  hero("BE FIRST", "The Future of [Category] Is Almost Here", "We're building something that will change how you [task] forever. Get early access.", "Join Waitlist", "Learn More", "#0a0a0a", "#f59e0b"),
  stats([{ value: "100K+", label: "Waitlist" }, { value: "#1", label: "Product Hunt" }, { value: "$20M", label: "Funding" }, { value: "2026", label: "Launch" }], "#f59e0b"),
  features("Why Join Early?", "Early adopters get exclusive perks", [
    { icon: "🎁", title: "Lifetime Discount", desc: "First 1000 users get 50% off forever." },
    { icon: "⭐", title: "Founding Member", desc: "Exclusive badge and community access." },
    { icon: "🗳️", title: "Shape the Product", desc: "Vote on features and join beta testing." },
    { icon: "👥", title: "Refer & Skip", desc: "Refer friends to move up the waitlist." },
  ], "#0a0a0a"),
  newsletter("Join 100K+ on the Waitlist", "Enter your email for early access and exclusive updates"),
  footer("NextBig", [
    { title: "Info", links: ["About", "Team", "Press", "Contact"] },
    { title: "Social", links: ["Twitter", "LinkedIn", "Discord"] },
  ]),
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json().catch(() => ({}));
    const mode = body.mode || "upsert"; // "upsert" | "reset"

    if (mode === "reset") {
      await supabase.from("templates").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    }

    // Get existing names
    const { data: existing } = await supabase.from("templates").select("name");
    const existingNames = new Set((existing || []).map((t: any) => t.name));

    const toInsert = allTemplates.filter(t => !existingNames.has(t.name));

    if (toInsert.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "All templates already exist", total: allTemplates.length }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert in batches of 10
    const results: any[] = [];
    for (let i = 0; i < toInsert.length; i += 10) {
      const batch = toInsert.slice(i, i + 10);
      const { data, error } = await supabase.from("templates").insert(batch).select("id, name, category");
      if (error) throw error;
      if (data) results.push(...data);
    }

    return new Response(JSON.stringify({
      success: true,
      inserted: results.length,
      total: allTemplates.length,
      categories: [...new Set(allTemplates.map(t => t.category))],
      templates: results.map(r => ({ id: r.id, name: r.name, category: r.category })),
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
