import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Unique ID generator
const uid = (prefix = "c") => `${prefix}-${crypto.randomUUID().slice(0, 8)}`;

// Component builder
const comp = (type: string, content: string, styles: Record<string, string> = {}, props: Record<string, any> = {}) => ({
  id: uid(),
  type,
  category: "Basic",
  label: type,
  content,
  styles: { padding: "16px", ...styles },
  props,
  children: [],
});

// Section builder
const section = (sectionType: string, label: string, styles: Record<string, string>, components: any[]) => ({
  id: uid("sec"),
  type: sectionType,
  label,
  styles: { padding: "60px 20px", ...styles },
  components,
});

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const modernNav = (brand: string, links: string[], dark = false) => comp(
  "navbar",
  "",
  {
    backgroundColor: dark ? "#0f172a" : "#ffffff",
    padding: "16px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: dark ? "1px solid #1e293b" : "1px solid #e2e8f0",
  },
  {
    brandName: brand,
    links,
    sticky: true,
    textColor: dark ? "#ffffff" : "#0f172a",
  }
);

const heroSection = (
  headline: string,
  subheadline: string,
  ctaText: string,
  bgColor: string,
  textColor: string,
  gradient?: string
) => [
  comp("heading", headline, {
    fontSize: "56px",
    fontWeight: "800",
    color: textColor,
    textAlign: "center",
    marginBottom: "24px",
    lineHeight: "1.1",
    maxWidth: "900px",
    margin: "0 auto 24px",
  }),
  comp("paragraph", subheadline, {
    fontSize: "20px",
    color: textColor,
    opacity: "0.8",
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
  }),
  comp("button", ctaText, {
    backgroundColor: gradient || "#6366f1",
    color: "#ffffff",
    padding: "16px 40px",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
  }),
];

const featureCard = (icon: string, title: string, desc: string, bgColor = "#f8fafc") => comp(
  "card",
  "",
  {
    backgroundColor: bgColor,
    padding: "32px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    textAlign: "center",
  },
  {
    children: [
      comp("text", icon, { fontSize: "48px", marginBottom: "16px" }),
      comp("heading", title, { fontSize: "20px", fontWeight: "700", marginBottom: "12px", color: "#0f172a" }),
      comp("paragraph", desc, { fontSize: "15px", color: "#64748b", lineHeight: "1.6" }),
    ],
  }
);

const testimonialCard = (quote: string, name: string, role: string, avatar: string) => comp(
  "card",
  "",
  {
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "1px solid #f1f5f9",
  },
  {
    children: [
      comp("paragraph", `"${quote}"`, { fontSize: "16px", color: "#475569", fontStyle: "italic", marginBottom: "24px", lineHeight: "1.7" }),
      comp("text", avatar, { fontSize: "40px", marginBottom: "8px" }),
      comp("text", name, { fontSize: "16px", fontWeight: "700", color: "#0f172a" }),
      comp("text", role, { fontSize: "14px", color: "#64748b" }),
    ],
  }
);

const pricingCard = (name: string, price: string, period: string, features: string[], featured = false, ctaText = "Get Started") => comp(
  "card",
  "",
  {
    backgroundColor: featured ? "#6366f1" : "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    border: featured ? "none" : "2px solid #e2e8f0",
    textAlign: "center",
    transform: featured ? "scale(1.05)" : "none",
    boxShadow: featured ? "0 20px 40px rgba(99, 102, 241, 0.3)" : "none",
  },
  {
    children: [
      comp("text", name, { fontSize: "24px", fontWeight: "700", color: featured ? "#ffffff" : "#0f172a", marginBottom: "16px" }),
      comp("text", price, { fontSize: "48px", fontWeight: "800", color: featured ? "#ffffff" : "#0f172a" }),
      comp("text", period, { fontSize: "16px", color: featured ? "rgba(255,255,255,0.7)" : "#64748b", marginBottom: "32px" }),
      ...features.map(f => comp("text", `✓ ${f}`, { fontSize: "15px", color: featured ? "rgba(255,255,255,0.9)" : "#475569", marginBottom: "12px" })),
      comp("button", ctaText, {
        backgroundColor: featured ? "#ffffff" : "#6366f1",
        color: featured ? "#6366f1" : "#ffffff",
        padding: "14px 32px",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        marginTop: "24px",
        width: "100%",
      }),
    ],
  }
);

const footerSection = (brand: string, dark = true) => section(
  "footer",
  "Footer",
  {
    backgroundColor: dark ? "#0f172a" : "#f8fafc",
    padding: "60px 40px 30px",
  },
  [
    comp("container", "", { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", maxWidth: "1200px", margin: "0 auto" }, {
      children: [
        comp("group", "", {}, {
          children: [
            comp("heading", brand, { fontSize: "24px", fontWeight: "800", color: dark ? "#ffffff" : "#0f172a", marginBottom: "16px" }),
            comp("paragraph", "Building the future of digital experiences with cutting-edge technology and innovative design.", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", lineHeight: "1.6", maxWidth: "300px" }),
          ],
        }),
        comp("group", "", {}, {
          children: [
            comp("text", "Product", { fontSize: "14px", fontWeight: "700", color: dark ? "#ffffff" : "#0f172a", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }),
            comp("text", "Features", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
            comp("text", "Pricing", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
            comp("text", "Integrations", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
          ],
        }),
        comp("group", "", {}, {
          children: [
            comp("text", "Company", { fontSize: "14px", fontWeight: "700", color: dark ? "#ffffff" : "#0f172a", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }),
            comp("text", "About", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
            comp("text", "Blog", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
            comp("text", "Careers", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
          ],
        }),
        comp("group", "", {}, {
          children: [
            comp("text", "Legal", { fontSize: "14px", fontWeight: "700", color: dark ? "#ffffff" : "#0f172a", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }),
            comp("text", "Privacy", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
            comp("text", "Terms", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
            comp("text", "Security", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px", cursor: "pointer" }),
          ],
        }),
      ],
    }),
    comp("divider", "", { backgroundColor: dark ? "#1e293b" : "#e2e8f0", height: "1px", margin: "40px 0 20px" }),
    comp("text", `© 2024 ${brand}. All rights reserved.`, { fontSize: "14px", color: dark ? "#64748b" : "#94a3b8", textAlign: "center" }),
  ]
);

const statsSection = (stats: { value: string; label: string }[], bgColor = "#f8fafc") => section(
  "body",
  "Stats",
  { backgroundColor: bgColor, padding: "80px 40px" },
  [
    comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }, {
      children: stats.map(s => comp("group", "", {}, {
        children: [
          comp("text", s.value, { fontSize: "48px", fontWeight: "800", color: "#6366f1", marginBottom: "8px" }),
          comp("text", s.label, { fontSize: "16px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }),
        ],
      })),
    }),
  ]
);

const ctaSection = (headline: string, subtext: string, btnText: string, gradient = "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)") => section(
  "body",
  "CTA",
  { background: gradient, padding: "100px 40px", textAlign: "center" },
  [
    comp("heading", headline, { fontSize: "42px", fontWeight: "800", color: "#ffffff", marginBottom: "20px", maxWidth: "700px", margin: "0 auto 20px" }),
    comp("paragraph", subtext, { fontSize: "18px", color: "rgba(255,255,255,0.8)", marginBottom: "40px", maxWidth: "500px", margin: "0 auto 40px" }),
    comp("button", btnText, { backgroundColor: "#ffffff", color: "#6366f1", padding: "16px 40px", borderRadius: "12px", fontSize: "18px", fontWeight: "700", border: "none" }),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// TEMPLATE DEFINITIONS BY CATEGORY
// ═══════════════════════════════════════════════════════════════════

const allTemplates: any[] = [];

const add = (
  name: string,
  description: string,
  category: string,
  thumbnail: string,
  tags: string[],
  sections: any[],
  installBase = 100
) => {
  allTemplates.push({
    name,
    description,
    category,
    thumbnail,
    tags,
    is_public: true,
    is_premium: Math.random() > 0.7,
    installs: Math.floor(Math.random() * 500) + installBase,
    schema: {
      id: `page-${name.toLowerCase().replace(/\s+/g, "-")}`,
      name,
      sections,
    },
  });
};

// ═══════════════════════════════════════════════════════════════════
// SAAS TEMPLATES (10)
// ═══════════════════════════════════════════════════════════════════

add(
  "SaaS Analytics Pro",
  "Modern analytics dashboard SaaS landing page with gradient hero and interactive stats",
  "saas",
  "📊",
  ["analytics", "dashboard", "data", "modern"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("AnalyticsPro", ["Features", "Pricing", "Docs", "Login"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "📊", { fontSize: "64px", marginBottom: "24px" }),
      ...heroSection("Transform Data Into Actionable Insights", "Real-time analytics platform that helps you understand your users, optimize conversions, and grow your business faster.", "Start Free Trial", "#0f172a", "#ffffff"),
      comp("container", "", { display: "flex", gap: "40px", justifyContent: "center", marginTop: "60px" }, {
        children: [
          comp("image", "", { width: "800px", height: "450px", borderRadius: "16px", boxShadow: "0 25px 50px rgba(0,0,0,0.5)", border: "1px solid #334155" }, { src: "/placeholder.svg", alt: "Dashboard Preview" }),
        ],
      }),
    ]),
    section("body", "Trusted By", { backgroundColor: "#0f172a", padding: "60px 40px" }, [
      comp("text", "Trusted by 10,000+ companies worldwide", { fontSize: "14px", color: "#64748b", textAlign: "center", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "30px" }),
      comp("container", "", { display: "flex", justifyContent: "center", gap: "60px", opacity: "0.5" }, {
        children: ["Google", "Microsoft", "Meta", "Amazon", "Apple"].map(c => comp("text", c, { fontSize: "20px", color: "#94a3b8", fontWeight: "600" })),
      }),
    ]),
    section("body", "Features", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("heading", "Powerful Features", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "16px", color: "#0f172a" }),
      comp("paragraph", "Everything you need to understand your data", { fontSize: "18px", color: "#64748b", textAlign: "center", marginBottom: "60px" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          featureCard("⚡", "Real-time Analytics", "Track user behavior as it happens with millisecond precision"),
          featureCard("🎯", "Conversion Tracking", "Understand your funnel and optimize every step"),
          featureCard("🔮", "Predictive Insights", "AI-powered predictions for future trends"),
          featureCard("📱", "Cross-platform", "Track users across web, mobile, and IoT devices"),
          featureCard("🔒", "Privacy First", "GDPR compliant with built-in consent management"),
          featureCard("🔌", "200+ Integrations", "Connect with your favorite tools seamlessly"),
        ],
      }),
    ]),
    statsSection([
      { value: "10M+", label: "Events Tracked Daily" },
      { value: "99.99%", label: "Uptime SLA" },
      { value: "150+", label: "Countries" },
      { value: "<50ms", label: "Avg Response" },
    ]),
    section("body", "Pricing", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("heading", "Simple, Transparent Pricing", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1000px", margin: "0 auto", alignItems: "center" }, {
        children: [
          pricingCard("Starter", "$29", "/month", ["10K monthly events", "5 team members", "30-day retention", "Email support"]),
          pricingCard("Professional", "$99", "/month", ["100K monthly events", "Unlimited members", "1-year retention", "Priority support", "Custom dashboards"], true),
          pricingCard("Enterprise", "Custom", "contact us", ["Unlimited events", "Dedicated CSM", "SLA guarantee", "On-premise option"]),
        ],
      }),
    ]),
    ctaSection("Ready to unlock your data?", "Join thousands of companies making smarter decisions", "Start Free Trial"),
    footerSection("AnalyticsPro"),
  ]
);

add(
  "SaaS Project Manager",
  "Clean project management SaaS with Kanban-style hero and team collaboration focus",
  "saas",
  "📋",
  ["project", "management", "team", "collaboration"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }, [modernNav("ProjectFlow", ["Features", "Templates", "Pricing", "Login"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "✨ NEW: AI Task Assistant", { fontSize: "14px", color: "#6366f1", fontWeight: "600", backgroundColor: "#eef2ff", padding: "8px 16px", borderRadius: "20px", display: "inline-block", marginBottom: "24px" }),
              comp("heading", "Manage Projects Like Never Before", { fontSize: "52px", fontWeight: "800", color: "#0f172a", lineHeight: "1.1", marginBottom: "24px" }),
              comp("paragraph", "The all-in-one project management platform that helps teams plan, track, and deliver work faster.", { fontSize: "18px", color: "#64748b", lineHeight: "1.7", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Start Free", { backgroundColor: "#6366f1", color: "#ffffff", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", border: "none" }),
                  comp("button", "Watch Demo", { backgroundColor: "#f1f5f9", color: "#0f172a", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", border: "none" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "16px", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }, { src: "/placeholder.svg", alt: "Kanban Board" }),
        ],
      }),
    ]),
    section("body", "Features Grid", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px", maxWidth: "900px", margin: "0 auto" }, {
        children: [
          featureCard("📊", "Kanban Boards", "Visualize workflow with drag-and-drop boards"),
          featureCard("📅", "Timeline View", "Plan projects with Gantt-style timelines"),
          featureCard("💬", "Team Chat", "Communicate in context with built-in messaging"),
          featureCard("📁", "File Sharing", "Share and collaborate on documents"),
        ],
      }),
    ]),
    section("body", "Testimonials", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("heading", "Loved by Teams Everywhere", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          testimonialCard("ProjectFlow transformed how our team works. We shipped 2x faster within the first month.", "Sarah Chen", "Engineering Lead @ Stripe", "👩‍💻"),
          testimonialCard("Finally, a project tool that's actually enjoyable to use. Our team adoption was instant.", "Marcus Johnson", "Product Manager @ Airbnb", "👨‍💼"),
          testimonialCard("The AI features save us hours every week on task management and planning.", "Emma Wilson", "CEO @ TechStart", "👩‍🚀"),
        ],
      }),
    ]),
    ctaSection("Start managing projects better today", "Free 14-day trial • No credit card required", "Get Started Free"),
    footerSection("ProjectFlow"),
  ]
);

add(
  "SaaS Email Marketing",
  "Email marketing platform with clean design and conversion-focused layout",
  "saas",
  "📧",
  ["email", "marketing", "automation", "campaigns"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("MailForge", ["Features", "Pricing", "Templates", "Login"], true)]),
    section("body", "Hero", { background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "📧", { fontSize: "72px", marginBottom: "32px" }),
      comp("heading", "Email Marketing That Actually Works", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px", maxWidth: "800px", margin: "0 auto 24px" }),
      comp("paragraph", "Create beautiful emails, automate campaigns, and grow your audience with AI-powered insights.", { fontSize: "20px", color: "#a5b4fc", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("input", "", { backgroundColor: "#ffffff", padding: "16px 24px", borderRadius: "10px 0 0 10px", border: "none", width: "300px", fontSize: "16px" }, { placeholder: "Enter your email" }),
          comp("button", "Start Free", { backgroundColor: "#6366f1", color: "#ffffff", padding: "16px 32px", borderRadius: "0 10px 10px 0", fontSize: "16px", fontWeight: "600", border: "none" }),
        ],
      }),
      comp("text", "Free forever for up to 1,000 subscribers", { fontSize: "14px", color: "#64748b", marginTop: "16px" }),
    ]),
    statsSection([
      { value: "50K+", label: "Active Users" },
      { value: "2B+", label: "Emails Sent" },
      { value: "45%", label: "Avg Open Rate" },
      { value: "4.9★", label: "User Rating" },
    ], "#1e1b4b"),
    section("body", "Features", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("heading", "Everything You Need", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          featureCard("🎨", "Drag & Drop Editor", "Create stunning emails without coding"),
          featureCard("🤖", "AI Copywriting", "Generate engaging content instantly"),
          featureCard("⚡", "Automation", "Set up powerful email sequences"),
          featureCard("📊", "Analytics", "Track opens, clicks, and conversions"),
          featureCard("👥", "Segmentation", "Target the right audience"),
          featureCard("🔗", "Integrations", "Connect with 100+ tools"),
        ],
      }),
    ]),
    ctaSection("Ready to grow your audience?", "Join 50,000+ marketers using MailForge", "Start Free Trial"),
    footerSection("MailForge"),
  ]
);

add(
  "SaaS CRM Platform",
  "Customer relationship management with sales pipeline focus",
  "saas",
  "🤝",
  ["crm", "sales", "pipeline", "customers"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("SalesHub", ["Products", "Solutions", "Pricing", "Resources", "Login"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("heading", "Close More Deals, Faster", { fontSize: "52px", fontWeight: "800", color: "#0f172a", lineHeight: "1.1", marginBottom: "24px" }),
              comp("paragraph", "The modern CRM that helps sales teams track leads, manage pipelines, and close deals with AI-powered insights.", { fontSize: "18px", color: "#475569", lineHeight: "1.7", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Start Free Trial", { backgroundColor: "#16a34a", color: "#ffffff", padding: "16px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
                  comp("button", "Book Demo", { backgroundColor: "#ffffff", color: "#16a34a", padding: "16px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", border: "2px solid #16a34a" }),
                ],
              }),
              comp("container", "", { display: "flex", gap: "32px", marginTop: "40px" }, {
                children: [
                  comp("text", "✓ Free 14-day trial", { fontSize: "14px", color: "#16a34a", fontWeight: "500" }),
                  comp("text", "✓ No credit card", { fontSize: "14px", color: "#16a34a", fontWeight: "500" }),
                  comp("text", "✓ Cancel anytime", { fontSize: "14px", color: "#16a34a", fontWeight: "500" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "16px", boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }, { src: "/placeholder.svg", alt: "CRM Dashboard" }),
        ],
      }),
    ]),
    section("body", "Features", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          featureCard("🎯", "Lead Scoring", "Prioritize hot leads automatically"),
          featureCard("📈", "Pipeline View", "Visual deal tracking"),
          featureCard("📞", "Call Tracking", "Log calls with one click"),
          featureCard("📧", "Email Sync", "Automatic email logging"),
        ],
      }),
    ]),
    ctaSection("Transform your sales process", "Start closing more deals today", "Start Free Trial", "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"),
    footerSection("SalesHub", false),
  ]
);

add(
  "SaaS Developer Tools",
  "API and developer tools platform with code-focused design",
  "saas",
  "👨‍💻",
  ["developer", "api", "tools", "code"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("DevStack", ["Docs", "API", "Pricing", "Blog", "Sign In"], true)]),
    section("body", "Hero", { backgroundColor: "#0f172a", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "< />", { fontSize: "64px", color: "#22c55e", fontFamily: "monospace", marginBottom: "32px" }),
      comp("heading", "Build Faster with DevStack", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "The complete developer platform with APIs, SDKs, and tools to ship products faster.", { fontSize: "20px", color: "#94a3b8", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }),
      comp("container", "", { backgroundColor: "#1e293b", borderRadius: "12px", padding: "24px", maxWidth: "600px", margin: "0 auto", fontFamily: "monospace" }, {
        children: [
          comp("text", "$ npm install @devstack/sdk", { fontSize: "16px", color: "#22c55e", textAlign: "left" }),
        ],
      }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center", marginTop: "40px" }, {
        children: [
          comp("button", "Get API Key", { backgroundColor: "#22c55e", color: "#0f172a", padding: "14px 32px", borderRadius: "8px", fontSize: "16px", fontWeight: "600" }),
          comp("button", "Read Docs", { backgroundColor: "transparent", color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", border: "1px solid #334155" }),
        ],
      }),
    ]),
    section("body", "Features", { backgroundColor: "#0f172a", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          featureCard("⚡", "99.99% Uptime", "Enterprise-grade reliability", "#1e293b"),
          featureCard("🔐", "SOC 2 Compliant", "Bank-level security", "#1e293b"),
          featureCard("🌍", "Global CDN", "Low latency worldwide", "#1e293b"),
        ],
      }),
    ]),
    footerSection("DevStack"),
  ]
);

add(
  "SaaS Video Platform",
  "Video hosting and streaming platform with media-rich design",
  "saas",
  "🎬",
  ["video", "streaming", "hosting", "media"],
  [
    section("header", "Navigation", { backgroundColor: "#18181b" }, [modernNav("StreamCloud", ["Features", "Pricing", "Enterprise", "Login"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #7c3aed 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "🎬", { fontSize: "72px", marginBottom: "32px" }),
      comp("heading", "Video Hosting Made Simple", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Upload, transcode, and deliver videos globally with enterprise-grade infrastructure.", { fontSize: "20px", color: "#a1a1aa", marginBottom: "40px" }),
      comp("button", "Start Free Trial", { backgroundColor: "#7c3aed", color: "#ffffff", padding: "16px 40px", borderRadius: "12px", fontSize: "18px", fontWeight: "600" }),
    ]),
    section("body", "Stats", { backgroundColor: "#18181b", padding: "60px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "4K", { fontSize: "48px", fontWeight: "800", color: "#7c3aed" }), comp("text", "Resolution", { color: "#71717a" })] }),
          comp("group", "", {}, { children: [comp("text", "150+", { fontSize: "48px", fontWeight: "800", color: "#7c3aed" }), comp("text", "Countries", { color: "#71717a" })] }),
          comp("group", "", {}, { children: [comp("text", "<1s", { fontSize: "48px", fontWeight: "800", color: "#7c3aed" }), comp("text", "Start Time", { color: "#71717a" })] }),
          comp("group", "", {}, { children: [comp("text", "99.9%", { fontSize: "48px", fontWeight: "800", color: "#7c3aed" }), comp("text", "Uptime", { color: "#71717a" })] }),
        ],
      }),
    ]),
    footerSection("StreamCloud"),
  ]
);

add(
  "SaaS HR Platform",
  "Human resources and people management platform",
  "saas",
  "👥",
  ["hr", "people", "management", "hiring"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("PeopleOS", ["Products", "Solutions", "Pricing", "Login"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("heading", "People Management, Simplified", { fontSize: "52px", fontWeight: "800", color: "#0f172a", marginBottom: "24px" }),
              comp("paragraph", "The modern HR platform that helps you hire, onboard, and retain top talent.", { fontSize: "18px", color: "#475569", marginBottom: "32px" }),
              comp("button", "Book a Demo", { backgroundColor: "#f59e0b", color: "#ffffff", padding: "16px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "16px" }, { src: "/placeholder.svg", alt: "HR Dashboard" }),
        ],
      }),
    ]),
    section("body", "Features", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          featureCard("📋", "Recruiting", "Streamlined hiring workflow"),
          featureCard("🎓", "Onboarding", "Automated new hire setup"),
          featureCard("📊", "Performance", "360° reviews and goals"),
          featureCard("💰", "Payroll", "Global payroll made easy"),
        ],
      }),
    ]),
    footerSection("PeopleOS", false),
  ]
);

add(
  "SaaS Security Platform",
  "Cybersecurity and compliance platform with trust-focused design",
  "saas",
  "🔒",
  ["security", "compliance", "cybersecurity", "trust"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("SecureShield", ["Products", "Solutions", "Resources", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#0f172a", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "🛡️", { fontSize: "72px", marginBottom: "32px" }),
      comp("heading", "Enterprise Security, Simplified", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Protect your organization with AI-powered threat detection and automated compliance.", { fontSize: "20px", color: "#94a3b8", marginBottom: "40px" }),
      comp("button", "Request Demo", { backgroundColor: "#3b82f6", color: "#ffffff", padding: "16px 40px", borderRadius: "12px", fontSize: "18px", fontWeight: "600" }),
    ]),
    section("body", "Certifications", { backgroundColor: "#0f172a", padding: "60px 40px" }, [
      comp("container", "", { display: "flex", justifyContent: "center", gap: "60px" }, {
        children: ["SOC 2", "ISO 27001", "GDPR", "HIPAA", "PCI DSS"].map(c => comp("text", c, { fontSize: "16px", color: "#64748b", fontWeight: "600", padding: "12px 24px", border: "1px solid #334155", borderRadius: "8px" })),
      }),
    ]),
    footerSection("SecureShield"),
  ]
);

add(
  "SaaS Scheduling",
  "Appointment and calendar scheduling platform",
  "saas",
  "📅",
  ["scheduling", "calendar", "appointments", "booking"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("CalBook", ["Features", "Integrations", "Pricing", "Login"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)", padding: "100px 40px", textAlign: "center" }, [
      comp("text", "📅", { fontSize: "64px", marginBottom: "24px" }),
      comp("heading", "Scheduling Made Effortless", { fontSize: "52px", fontWeight: "800", color: "#0f172a", marginBottom: "24px" }),
      comp("paragraph", "Let clients book time with you automatically. No more back-and-forth emails.", { fontSize: "18px", color: "#475569", marginBottom: "40px" }),
      comp("button", "Sign Up Free", { backgroundColor: "#7c3aed", color: "#ffffff", padding: "16px 40px", borderRadius: "12px", fontSize: "18px", fontWeight: "600" }),
    ]),
    footerSection("CalBook", false),
  ]
);

add(
  "SaaS Document Platform",
  "Document creation and collaboration platform",
  "saas",
  "📄",
  ["documents", "collaboration", "writing", "team"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("DocFlow", ["Product", "Templates", "Pricing", "Sign In"], true)]),
    section("body", "Hero", { background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "📝", { fontSize: "64px", marginBottom: "24px" }),
      comp("heading", "Beautiful Documents, Together", { fontSize: "52px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Create, collaborate, and share stunning documents with your team in real-time.", { fontSize: "18px", color: "#94a3b8", marginBottom: "40px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "Try Free", { backgroundColor: "#6366f1", color: "#ffffff", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
          comp("button", "See Examples", { backgroundColor: "transparent", color: "#ffffff", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", border: "1px solid #475569" }),
        ],
      }),
    ]),
    footerSection("DocFlow"),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// AGENCY TEMPLATES (8)
// ═══════════════════════════════════════════════════════════════════

add(
  "Digital Agency Bold",
  "Bold and creative digital agency with striking typography",
  "agency",
  "🎨",
  ["creative", "digital", "bold", "modern"],
  [
    section("header", "Navigation", { backgroundColor: "#000000" }, [modernNav("STUDIO X", ["Work", "Services", "About", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#000000", padding: "150px 40px", textAlign: "center" }, [
      comp("heading", "We Create Digital Experiences", { fontSize: "80px", fontWeight: "900", color: "#ffffff", letterSpacing: "-3px", marginBottom: "32px", textTransform: "uppercase" }),
      comp("paragraph", "Award-winning digital agency crafting brands, websites, and experiences that matter.", { fontSize: "20px", color: "#737373", marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px" }),
      comp("button", "VIEW WORK", { backgroundColor: "#ffffff", color: "#000000", padding: "18px 48px", fontSize: "14px", fontWeight: "700", letterSpacing: "2px", border: "none" }),
    ]),
    section("body", "Work Grid", { backgroundColor: "#0a0a0a", padding: "100px 40px" }, [
      comp("heading", "Selected Work", { fontSize: "48px", fontWeight: "800", color: "#ffffff", textAlign: "center", marginBottom: "60px" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          comp("image", "", { aspectRatio: "16/10", backgroundColor: "#1a1a1a", borderRadius: "0" }, { src: "/placeholder.svg", alt: "Project 1" }),
          comp("image", "", { aspectRatio: "16/10", backgroundColor: "#1a1a1a", borderRadius: "0" }, { src: "/placeholder.svg", alt: "Project 2" }),
          comp("image", "", { aspectRatio: "16/10", backgroundColor: "#1a1a1a", borderRadius: "0" }, { src: "/placeholder.svg", alt: "Project 3" }),
          comp("image", "", { aspectRatio: "16/10", backgroundColor: "#1a1a1a", borderRadius: "0" }, { src: "/placeholder.svg", alt: "Project 4" }),
        ],
      }),
    ]),
    section("body", "Services", { backgroundColor: "#000000", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          comp("group", "", { borderLeft: "2px solid #ffffff", paddingLeft: "24px" }, {
            children: [
              comp("text", "01", { fontSize: "14px", color: "#737373", marginBottom: "16px" }),
              comp("heading", "Brand Strategy", { fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }),
              comp("paragraph", "Building brands that resonate with audiences.", { fontSize: "15px", color: "#737373" }),
            ],
          }),
          comp("group", "", { borderLeft: "2px solid #ffffff", paddingLeft: "24px" }, {
            children: [
              comp("text", "02", { fontSize: "14px", color: "#737373", marginBottom: "16px" }),
              comp("heading", "Web Design", { fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }),
              comp("paragraph", "Creating stunning digital experiences.", { fontSize: "15px", color: "#737373" }),
            ],
          }),
          comp("group", "", { borderLeft: "2px solid #ffffff", paddingLeft: "24px" }, {
            children: [
              comp("text", "03", { fontSize: "14px", color: "#737373", marginBottom: "16px" }),
              comp("heading", "Development", { fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }),
              comp("paragraph", "Building robust digital solutions.", { fontSize: "15px", color: "#737373" }),
            ],
          }),
          comp("group", "", { borderLeft: "2px solid #ffffff", paddingLeft: "24px" }, {
            children: [
              comp("text", "04", { fontSize: "14px", color: "#737373", marginBottom: "16px" }),
              comp("heading", "Motion Design", { fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }),
              comp("paragraph", "Bringing brands to life through motion.", { fontSize: "15px", color: "#737373" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("STUDIO X"),
  ]
);

add(
  "Agency Minimal Clean",
  "Clean minimal agency design with lots of whitespace",
  "agency",
  "✨",
  ["minimal", "clean", "whitespace", "elegant"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("Blanc", ["Projects", "About", "Services", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "150px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto" }, {
        children: [
          comp("paragraph", "Design Studio", { fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "32px" }),
          comp("heading", "We design products that people love to use.", { fontSize: "64px", fontWeight: "300", color: "#0f172a", lineHeight: "1.2", marginBottom: "48px" }),
          comp("text", "↓ Scroll to explore", { fontSize: "14px", color: "#94a3b8", cursor: "pointer" }),
        ],
      }),
    ]),
    section("body", "About", { backgroundColor: "#f8fafc", padding: "120px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("paragraph", "About Us", { fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "24px" }),
              comp("paragraph", "We're a small design studio focused on creating meaningful digital experiences. Our approach combines strategy, design, and technology.", { fontSize: "18px", color: "#475569", lineHeight: "1.8" }),
            ],
          }),
          comp("image", "", { aspectRatio: "4/3", backgroundColor: "#e2e8f0", borderRadius: "4px" }, { src: "/placeholder.svg", alt: "Studio" }),
        ],
      }),
    ]),
    footerSection("Blanc", false),
  ]
);

add(
  "Creative Agency Gradient",
  "Gradient-rich creative agency with vibrant colors",
  "agency",
  "🌈",
  ["gradient", "colorful", "creative", "vibrant"],
  [
    section("header", "Navigation", { backgroundColor: "transparent" }, [modernNav("Prism", ["Work", "About", "Careers", "Contact"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", padding: "150px 40px", textAlign: "center" }, [
      comp("heading", "Where Creativity Meets Technology", { fontSize: "64px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "We're a full-service creative agency helping brands stand out in the digital landscape.", { fontSize: "20px", color: "rgba(255,255,255,0.9)", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "See Our Work", { backgroundColor: "#ffffff", color: "#667eea", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600" }),
          comp("button", "Get in Touch", { backgroundColor: "transparent", color: "#ffffff", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600", border: "2px solid #ffffff" }),
        ],
      }),
    ]),
    section("body", "Clients", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("text", "Trusted by leading brands", { fontSize: "14px", color: "#94a3b8", textAlign: "center", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "40px" }),
      comp("container", "", { display: "flex", justifyContent: "center", gap: "80px", opacity: "0.4" }, {
        children: ["Nike", "Apple", "Google", "Meta", "Amazon"].map(c => comp("text", c, { fontSize: "24px", color: "#0f172a", fontWeight: "700" })),
      }),
    ]),
    footerSection("Prism", false),
  ]
);

add(
  "Marketing Agency Pro",
  "Results-driven marketing agency with data focus",
  "agency",
  "📈",
  ["marketing", "data", "results", "growth"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("GrowthLab", ["Services", "Case Studies", "Pricing", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#0f172a", padding: "120px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🚀 Performance Marketing Agency", { fontSize: "14px", color: "#22c55e", fontWeight: "600", marginBottom: "24px" }),
              comp("heading", "Scale Your Business with Data-Driven Marketing", { fontSize: "48px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
              comp("paragraph", "We've helped 500+ brands increase their ROI by an average of 340% through strategic digital marketing.", { fontSize: "18px", color: "#94a3b8", marginBottom: "32px" }),
              comp("button", "Get Free Audit", { backgroundColor: "#22c55e", color: "#0f172a", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "700" }),
            ],
          }),
          comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }, {
            children: [
              comp("card", "", { backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px" }, {
                children: [
                  comp("text", "340%", { fontSize: "36px", fontWeight: "800", color: "#22c55e" }),
                  comp("text", "Average ROI", { fontSize: "14px", color: "#94a3b8" }),
                ],
              }),
              comp("card", "", { backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px" }, {
                children: [
                  comp("text", "$50M+", { fontSize: "36px", fontWeight: "800", color: "#22c55e" }),
                  comp("text", "Ad Spend Managed", { fontSize: "14px", color: "#94a3b8" }),
                ],
              }),
              comp("card", "", { backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px" }, {
                children: [
                  comp("text", "500+", { fontSize: "36px", fontWeight: "800", color: "#22c55e" }),
                  comp("text", "Clients Served", { fontSize: "14px", color: "#94a3b8" }),
                ],
              }),
              comp("card", "", { backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px" }, {
                children: [
                  comp("text", "15+", { fontSize: "36px", fontWeight: "800", color: "#22c55e" }),
                  comp("text", "Years Experience", { fontSize: "14px", color: "#94a3b8" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("GrowthLab"),
  ]
);

add(
  "Branding Agency",
  "Brand identity and strategy focused agency",
  "agency",
  "🎯",
  ["branding", "identity", "strategy", "design"],
  [
    section("header", "Navigation", { backgroundColor: "#fef7e4" }, [modernNav("Brandmark", ["Work", "Process", "About", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#fef7e4", padding: "140px 40px" }, [
      comp("container", "", { maxWidth: "1000px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("heading", "We Build Brands That Stand the Test of Time", { fontSize: "60px", fontWeight: "800", color: "#1a1a1a", marginBottom: "32px", lineHeight: "1.1" }),
          comp("paragraph", "Strategic brand identity and design for companies that want to make a lasting impression.", { fontSize: "20px", color: "#6b7280", marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px" }),
          comp("button", "Start a Project", { backgroundColor: "#1a1a1a", color: "#ffffff", padding: "18px 48px", borderRadius: "0", fontSize: "16px", fontWeight: "600" }),
        ],
      }),
    ]),
    section("body", "Services", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "60px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "01", { fontSize: "48px", fontWeight: "200", color: "#d1d5db", marginBottom: "16px" }),
              comp("heading", "Brand Strategy", { fontSize: "24px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }),
              comp("paragraph", "Define your brand's purpose, positioning, and personality.", { fontSize: "15px", color: "#6b7280", lineHeight: "1.7" }),
            ],
          }),
          comp("group", "", {}, {
            children: [
              comp("text", "02", { fontSize: "48px", fontWeight: "200", color: "#d1d5db", marginBottom: "16px" }),
              comp("heading", "Visual Identity", { fontSize: "24px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }),
              comp("paragraph", "Create a distinctive visual language for your brand.", { fontSize: "15px", color: "#6b7280", lineHeight: "1.7" }),
            ],
          }),
          comp("group", "", {}, {
            children: [
              comp("text", "03", { fontSize: "48px", fontWeight: "200", color: "#d1d5db", marginBottom: "16px" }),
              comp("heading", "Brand Guidelines", { fontSize: "24px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }),
              comp("paragraph", "Document your brand for consistent application.", { fontSize: "15px", color: "#6b7280", lineHeight: "1.7" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("Brandmark", false),
  ]
);

add(
  "UX Design Agency",
  "User experience focused design agency",
  "agency",
  "🎨",
  ["ux", "ui", "design", "user experience"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("UXStudio", ["Work", "Services", "Process", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "120px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "UX / UI DESIGN AGENCY", { fontSize: "12px", color: "#6366f1", fontWeight: "700", letterSpacing: "2px", marginBottom: "24px" }),
              comp("heading", "Designing Products People Actually Want to Use", { fontSize: "48px", fontWeight: "800", color: "#0f172a", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "We combine user research, strategic thinking, and beautiful design to create digital products that delight users and drive business results.", { fontSize: "17px", color: "#64748b", lineHeight: "1.7", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "View Our Work", { backgroundColor: "#6366f1", color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600" }),
                  comp("button", "Our Process", { backgroundColor: "#f1f5f9", color: "#0f172a", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", backgroundColor: "#f1f5f9", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "UX Design" }),
        ],
      }),
    ]),
    footerSection("UXStudio", false),
  ]
);

add(
  "Web Development Agency",
  "Technical web development focused agency",
  "agency",
  "💻",
  ["development", "web", "technical", "code"],
  [
    section("header", "Navigation", { backgroundColor: "#0a0a0a" }, [modernNav("CodeCraft", ["Services", "Portfolio", "Tech Stack", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#0a0a0a", padding: "140px 40px", textAlign: "center" }, [
      comp("text", "</> ", { fontSize: "48px", color: "#10b981", fontFamily: "monospace", marginBottom: "32px" }),
      comp("heading", "We Build the Web of Tomorrow", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Custom web applications, e-commerce solutions, and scalable platforms built with modern technologies.", { fontSize: "18px", color: "#6b7280", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "Start a Project", { backgroundColor: "#10b981", color: "#0a0a0a", padding: "16px 40px", borderRadius: "8px", fontSize: "16px", fontWeight: "600" }),
          comp("button", "Our Stack", { backgroundColor: "transparent", color: "#ffffff", padding: "16px 40px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", border: "1px solid #374151" }),
        ],
      }),
    ]),
    section("body", "Tech", { backgroundColor: "#0a0a0a", padding: "60px 40px" }, [
      comp("container", "", { display: "flex", justifyContent: "center", gap: "48px" }, {
        children: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "PostgreSQL"].map(t => comp("text", t, { fontSize: "14px", color: "#6b7280", fontWeight: "500" })),
      }),
    ]),
    footerSection("CodeCraft"),
  ]
);

add(
  "Social Media Agency",
  "Social media marketing and content agency",
  "agency",
  "📱",
  ["social", "media", "content", "marketing"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("SocialPulse", ["Services", "Work", "Pricing", "Contact"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("heading", "Make Your Brand Go Viral", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "We create scroll-stopping content and strategic campaigns that grow your audience and drive engagement.", { fontSize: "18px", color: "rgba(255,255,255,0.9)", marginBottom: "48px" }),
      comp("button", "Get Started", { backgroundColor: "#ffffff", color: "#8b5cf6", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "700" }),
    ]),
    section("body", "Stats", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "10M+", { fontSize: "40px", fontWeight: "800", color: "#8b5cf6" }), comp("text", "Followers Grown", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "500+", { fontSize: "40px", fontWeight: "800", color: "#8b5cf6" }), comp("text", "Campaigns", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "25%", { fontSize: "40px", fontWeight: "800", color: "#8b5cf6" }), comp("text", "Avg Engagement", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "200+", { fontSize: "40px", fontWeight: "800", color: "#8b5cf6" }), comp("text", "Happy Clients", { color: "#64748b" })] }),
        ],
      }),
    ]),
    footerSection("SocialPulse", false),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// PORTFOLIO TEMPLATES (8)
// ═══════════════════════════════════════════════════════════════════

add(
  "Designer Portfolio Dark",
  "Dark mode designer portfolio with bold typography",
  "portfolio",
  "🖤",
  ["designer", "dark", "bold", "creative"],
  [
    section("header", "Navigation", { backgroundColor: "#000000" }, [modernNav("Alex Design", ["Work", "About", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#000000", padding: "200px 40px" }, [
      comp("container", "", { maxWidth: "900px" }, {
        children: [
          comp("paragraph", "Designer & Creative Director", { fontSize: "16px", color: "#737373", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "32px" }),
          comp("heading", "I design digital products that people love.", { fontSize: "72px", fontWeight: "200", color: "#ffffff", lineHeight: "1.1", marginBottom: "48px" }),
          comp("button", "View My Work", { backgroundColor: "#ffffff", color: "#000000", padding: "16px 40px", borderRadius: "0", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "2px" }),
        ],
      }),
    ]),
    section("body", "Work", { backgroundColor: "#0a0a0a", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", maxWidth: "1200px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#1a1a1a", aspectRatio: "16/10", position: "relative", overflow: "hidden" }, {
            children: [
              comp("image", "", { width: "100%", height: "100%", objectFit: "cover" }, { src: "/placeholder.svg" }),
            ],
          }),
          comp("card", "", { backgroundColor: "#1a1a1a", aspectRatio: "16/10" }, { children: [comp("image", "", { width: "100%", height: "100%" }, { src: "/placeholder.svg" })] }),
          comp("card", "", { backgroundColor: "#1a1a1a", aspectRatio: "16/10" }, { children: [comp("image", "", { width: "100%", height: "100%" }, { src: "/placeholder.svg" })] }),
          comp("card", "", { backgroundColor: "#1a1a1a", aspectRatio: "16/10" }, { children: [comp("image", "", { width: "100%", height: "100%" }, { src: "/placeholder.svg" })] }),
        ],
      }),
    ]),
    footerSection("Alex Design"),
  ]
);

add(
  "Developer Portfolio",
  "Technical developer portfolio with code aesthetics",
  "portfolio",
  "👨‍💻",
  ["developer", "code", "technical", "engineering"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("dev.john", ["Projects", "Skills", "Blog", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#0f172a", padding: "140px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto" }, {
        children: [
          comp("text", "👋 Hey, I'm", { fontSize: "18px", color: "#64748b", marginBottom: "16px" }),
          comp("heading", "John Smith", { fontSize: "72px", fontWeight: "800", color: "#ffffff", marginBottom: "16px" }),
          comp("heading", "Full Stack Developer", { fontSize: "48px", fontWeight: "300", color: "#6366f1", marginBottom: "32px" }),
          comp("paragraph", "I build scalable web applications with React, Node.js, and cloud technologies. Currently open to new opportunities.", { fontSize: "18px", color: "#94a3b8", lineHeight: "1.7", marginBottom: "40px" }),
          comp("container", "", { display: "flex", gap: "16px" }, {
            children: [
              comp("button", "View Projects", { backgroundColor: "#6366f1", color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600" }),
              comp("button", "Download CV", { backgroundColor: "transparent", color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", border: "1px solid #334155" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Skills", { backgroundColor: "#0f172a", padding: "80px 40px" }, [
      comp("container", "", { display: "flex", flexWrap: "wrap", gap: "12px", maxWidth: "800px", margin: "0 auto", justifyContent: "center" }, {
        children: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL", "Tailwind CSS", "Git"].map(s => comp("text", s, { fontSize: "14px", color: "#94a3b8", padding: "8px 20px", backgroundColor: "#1e293b", borderRadius: "6px" })),
      }),
    ]),
    footerSection("dev.john"),
  ]
);

add(
  "Photographer Portfolio",
  "Visual-first photographer portfolio with grid gallery",
  "portfolio",
  "📷",
  ["photographer", "visual", "gallery", "minimal"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("Sarah Lens", ["Portfolio", "About", "Prints", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { maxWidth: "1400px", margin: "0 auto" }, {
        children: [
          comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }, {
            children: Array.from({ length: 9 }).map((_, i) => comp("image", "", { aspectRatio: "1/1", backgroundColor: "#f1f5f9" }, { src: "/placeholder.svg", alt: `Photo ${i + 1}` })),
          }),
        ],
      }),
    ]),
    section("body", "About", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("container", "", { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("text", "👩‍🎨", { fontSize: "48px", marginBottom: "24px" }),
          comp("heading", "Sarah Lens", { fontSize: "36px", fontWeight: "600", color: "#0f172a", marginBottom: "16px" }),
          comp("paragraph", "Portrait & lifestyle photographer based in New York. Capturing authentic moments and emotions through my lens.", { fontSize: "16px", color: "#64748b", lineHeight: "1.8", marginBottom: "32px" }),
          comp("button", "Get in Touch", { backgroundColor: "#0f172a", color: "#ffffff", padding: "14px 40px", borderRadius: "4px", fontSize: "14px", fontWeight: "500" }),
        ],
      }),
    ]),
    footerSection("Sarah Lens", false),
  ]
);

add(
  "Illustrator Portfolio",
  "Colorful illustrator portfolio with playful design",
  "portfolio",
  "🎨",
  ["illustrator", "colorful", "playful", "art"],
  [
    section("header", "Navigation", { backgroundColor: "#fef7cd" }, [modernNav("Maya Art", ["Work", "Shop", "About", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#fef7cd", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("heading", "Hi! I'm Maya", { fontSize: "56px", fontWeight: "800", color: "#1a1a1a", marginBottom: "16px" }),
              comp("heading", "I draw things ✏️", { fontSize: "48px", fontWeight: "400", color: "#f59e0b", marginBottom: "32px" }),
              comp("paragraph", "Freelance illustrator specializing in editorial, children's books, and brand illustrations. Let's create something beautiful together!", { fontSize: "17px", color: "#525252", lineHeight: "1.7", marginBottom: "32px" }),
              comp("button", "See My Work", { backgroundColor: "#1a1a1a", color: "#ffffff", padding: "16px 40px", borderRadius: "50px", fontSize: "15px", fontWeight: "600" }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Maya" }),
        ],
      }),
    ]),
    section("body", "Work", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }, {
        children: Array.from({ length: 6 }).map((_, i) => comp("card", "", { backgroundColor: "#fef3c7", aspectRatio: "4/3", borderRadius: "16px" }, { children: [comp("image", "", { width: "100%", height: "100%", borderRadius: "16px" }, { src: "/placeholder.svg" })] })),
      }),
    ]),
    footerSection("Maya Art", false),
  ]
);

add(
  "Writer Portfolio",
  "Clean writer/journalist portfolio with focus on content",
  "portfolio",
  "✍️",
  ["writer", "journalist", "content", "minimal"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("James Wright", ["Writing", "About", "Newsletter", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "140px 40px" }, [
      comp("container", "", { maxWidth: "700px", margin: "0 auto" }, {
        children: [
          comp("heading", "James Wright", { fontSize: "64px", fontWeight: "400", color: "#0f172a", marginBottom: "24px", fontFamily: "Georgia, serif" }),
          comp("paragraph", "Writer, journalist, and author. I write about technology, culture, and the human experience. My work has appeared in The New York Times, Wired, and The Atlantic.", { fontSize: "18px", color: "#475569", lineHeight: "1.8", marginBottom: "32px", fontFamily: "Georgia, serif" }),
          comp("container", "", { display: "flex", gap: "24px" }, {
            children: [
              comp("text", "Twitter", { fontSize: "14px", color: "#6366f1", textDecoration: "underline", cursor: "pointer" }),
              comp("text", "LinkedIn", { fontSize: "14px", color: "#6366f1", textDecoration: "underline", cursor: "pointer" }),
              comp("text", "Substack", { fontSize: "14px", color: "#6366f1", textDecoration: "underline", cursor: "pointer" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Featured", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("container", "", { maxWidth: "700px", margin: "0 auto" }, {
        children: [
          comp("text", "Featured Writing", { fontSize: "14px", color: "#64748b", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "40px" }),
          comp("group", "", { borderBottom: "1px solid #e2e8f0", paddingBottom: "32px", marginBottom: "32px" }, {
            children: [
              comp("text", "The New York Times", { fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }),
              comp("heading", "The Future of Work is Already Here", { fontSize: "24px", fontWeight: "400", color: "#0f172a", marginBottom: "12px", fontFamily: "Georgia, serif" }),
              comp("paragraph", "How remote work is reshaping our cities, relationships, and sense of identity.", { fontSize: "15px", color: "#64748b", fontFamily: "Georgia, serif" }),
            ],
          }),
          comp("group", "", { borderBottom: "1px solid #e2e8f0", paddingBottom: "32px", marginBottom: "32px" }, {
            children: [
              comp("text", "Wired", { fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }),
              comp("heading", "Inside the Mind of an AI", { fontSize: "24px", fontWeight: "400", color: "#0f172a", marginBottom: "12px", fontFamily: "Georgia, serif" }),
              comp("paragraph", "What happens when machines start to think—and what it means for humanity.", { fontSize: "15px", color: "#64748b", fontFamily: "Georgia, serif" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("James Wright", false),
  ]
);

add(
  "3D Artist Portfolio",
  "Modern 3D artist portfolio with dark theme",
  "portfolio",
  "🎮",
  ["3d", "artist", "gaming", "visualization"],
  [
    section("header", "Navigation", { backgroundColor: "#0a0a0a" }, [modernNav("Kai 3D", ["Work", "Showreel", "About", "Hire Me"], true)]),
    section("body", "Hero", { background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)", padding: "160px 40px", textAlign: "center" }, [
      comp("heading", "3D ARTIST & MOTION DESIGNER", { fontSize: "14px", color: "#6366f1", letterSpacing: "4px", marginBottom: "32px" }),
      comp("heading", "Creating Digital Realities", { fontSize: "72px", fontWeight: "800", color: "#ffffff", marginBottom: "32px" }),
      comp("paragraph", "Specializing in character design, environments, and motion graphics for games and film.", { fontSize: "18px", color: "#a1a1aa", marginBottom: "48px" }),
      comp("button", "Watch Showreel", { backgroundColor: "#6366f1", color: "#ffffff", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "600" }),
    ]),
    section("body", "Work", { backgroundColor: "#0a0a0a", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "1200px", margin: "0 auto" }, {
        children: Array.from({ length: 6 }).map(() => comp("image", "", { aspectRatio: "16/9", backgroundColor: "#1a1a2e", borderRadius: "8px" }, { src: "/placeholder.svg" })),
      }),
    ]),
    footerSection("Kai 3D"),
  ]
);

add(
  "Architect Portfolio",
  "Minimal architect portfolio with large project images",
  "portfolio",
  "🏛️",
  ["architect", "minimal", "projects", "design"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("Studio Arc", ["Projects", "Process", "About", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "100px 40px 60px" }, [
      comp("container", "", { maxWidth: "1200px", margin: "0 auto" }, {
        children: [
          comp("heading", "Architecture that inspires", { fontSize: "64px", fontWeight: "300", color: "#0f172a", marginBottom: "48px", maxWidth: "600px" }),
          comp("image", "", { width: "100%", aspectRatio: "21/9", backgroundColor: "#f1f5f9" }, { src: "/placeholder.svg", alt: "Featured Project" }),
        ],
      }),
    ]),
    section("body", "Projects", { backgroundColor: "#ffffff", padding: "60px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", maxWidth: "1200px", margin: "0 auto" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "4/3", backgroundColor: "#f1f5f9", marginBottom: "16px" }, { src: "/placeholder.svg" }),
              comp("text", "Residential / 2024", { fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }),
              comp("heading", "Mountain House", { fontSize: "24px", fontWeight: "400", color: "#0f172a" }),
            ],
          }),
          comp("group", "", {}, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "4/3", backgroundColor: "#f1f5f9", marginBottom: "16px" }, { src: "/placeholder.svg" }),
              comp("text", "Commercial / 2023", { fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }),
              comp("heading", "Urban Office Complex", { fontSize: "24px", fontWeight: "400", color: "#0f172a" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("Studio Arc", false),
  ]
);

add(
  "Video Editor Portfolio",
  "Dynamic video editor portfolio with showreel focus",
  "portfolio",
  "🎬",
  ["video", "editor", "motion", "film"],
  [
    section("header", "Navigation", { backgroundColor: "#000000" }, [modernNav("Cut Studio", ["Work", "Showreel", "About", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#000000", padding: "100px 40px 60px" }, [
      comp("container", "", { maxWidth: "1200px", margin: "0 auto" }, {
        children: [
          comp("container", "", { position: "relative", aspectRatio: "16/9", backgroundColor: "#1a1a1a", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }, {
            children: [
              comp("button", "▶ Play Showreel", { backgroundColor: "#ffffff", color: "#000000", padding: "20px 48px", borderRadius: "50px", fontSize: "16px", fontWeight: "600" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Info", { backgroundColor: "#000000", padding: "60px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("heading", "Emily Chen", { fontSize: "48px", fontWeight: "300", color: "#ffffff", marginBottom: "24px" }),
              comp("paragraph", "Award-winning video editor and colorist with 10+ years of experience in commercials, music videos, and documentary films.", { fontSize: "16px", color: "#737373", lineHeight: "1.8" }),
            ],
          }),
          comp("group", "", {}, {
            children: [
              comp("text", "Clients", { fontSize: "12px", color: "#525252", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }),
              comp("paragraph", "Nike, Apple, Netflix, HBO, Spotify, Adobe, BMW, Coca-Cola, Sony Music", { fontSize: "16px", color: "#a3a3a3", lineHeight: "2" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("Cut Studio"),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// ECOMMERCE TEMPLATES (8)
// ═══════════════════════════════════════════════════════════════════

add(
  "Fashion Store Luxury",
  "High-end fashion e-commerce with minimal aesthetic",
  "ecommerce",
  "👗",
  ["fashion", "luxury", "minimal", "clothing"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("LUXE", ["Women", "Men", "Accessories", "Sale", "Cart"])]),
    section("body", "Hero", { backgroundColor: "#f5f5f0", padding: "0" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "80vh" }, {
        children: [
          comp("group", "", { display: "flex", alignItems: "center", justifyContent: "center", padding: "60px" }, {
            children: [
              comp("group", "", {}, {
                children: [
                  comp("text", "NEW COLLECTION", { fontSize: "12px", color: "#737373", letterSpacing: "3px", marginBottom: "24px" }),
                  comp("heading", "Spring Summer 2024", { fontSize: "56px", fontWeight: "300", color: "#1a1a1a", marginBottom: "32px", lineHeight: "1.1" }),
                  comp("button", "Shop Now", { backgroundColor: "#1a1a1a", color: "#ffffff", padding: "18px 48px", borderRadius: "0", fontSize: "14px", fontWeight: "400", letterSpacing: "2px" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", height: "100%", objectFit: "cover" }, { src: "/placeholder.svg", alt: "Collection" }),
        ],
      }),
    ]),
    section("body", "Categories", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1200px", margin: "0 auto" }, {
        children: [
          comp("group", "", { position: "relative" }, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "3/4", backgroundColor: "#f5f5f0" }, { src: "/placeholder.svg" }),
              comp("text", "Women", { position: "absolute", bottom: "24px", left: "24px", fontSize: "18px", color: "#ffffff", fontWeight: "500" }),
            ],
          }),
          comp("group", "", { position: "relative" }, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "3/4", backgroundColor: "#f5f5f0" }, { src: "/placeholder.svg" }),
              comp("text", "Men", { position: "absolute", bottom: "24px", left: "24px", fontSize: "18px", color: "#ffffff", fontWeight: "500" }),
            ],
          }),
          comp("group", "", { position: "relative" }, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "3/4", backgroundColor: "#f5f5f0" }, { src: "/placeholder.svg" }),
              comp("text", "Accessories", { position: "absolute", bottom: "24px", left: "24px", fontSize: "18px", color: "#ffffff", fontWeight: "500" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("LUXE", false),
  ]
);

add(
  "Electronics Store",
  "Modern electronics store with product showcase",
  "ecommerce",
  "📱",
  ["electronics", "tech", "gadgets", "modern"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("TechHub", ["Shop", "Deals", "Support", "Cart"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🔥 HOT DEAL", { fontSize: "14px", color: "#f97316", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "Galaxy Pro Max 256GB", { fontSize: "48px", fontWeight: "800", color: "#ffffff", marginBottom: "16px" }),
              comp("container", "", { display: "flex", gap: "16px", alignItems: "baseline", marginBottom: "24px" }, {
                children: [
                  comp("text", "$999", { fontSize: "36px", fontWeight: "800", color: "#22c55e" }),
                  comp("text", "$1,199", { fontSize: "20px", color: "#64748b", textDecoration: "line-through" }),
                ],
              }),
              comp("paragraph", "The most powerful smartphone with 200MP camera, 5000mAh battery, and next-gen AI features.", { fontSize: "16px", color: "#94a3b8", marginBottom: "32px" }),
              comp("button", "Add to Cart", { backgroundColor: "#22c55e", color: "#ffffff", padding: "16px 48px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", backgroundColor: "#1e293b", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Phone" }),
        ],
      }),
    ]),
    section("body", "Products", { backgroundColor: "#f8fafc", padding: "80px 40px" }, [
      comp("heading", "Trending Products", { fontSize: "32px", fontWeight: "800", textAlign: "center", marginBottom: "48px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1200px", margin: "0 auto" }, {
        children: Array.from({ length: 4 }).map((_, i) => comp("card", "", { backgroundColor: "#ffffff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", backgroundColor: "#f1f5f9", borderRadius: "12px", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", `Product ${i + 1}`, { fontSize: "16px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }),
            comp("text", "$299", { fontSize: "18px", fontWeight: "700", color: "#22c55e" }),
          ],
        })),
      }),
    ]),
    footerSection("TechHub"),
  ]
);

add(
  "Furniture Store",
  "Scandinavian furniture store with clean design",
  "ecommerce",
  "🛋️",
  ["furniture", "home", "scandinavian", "minimal"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("Nordic Home", ["Living", "Bedroom", "Office", "Outdoor", "Cart"])]),
    section("body", "Hero", { backgroundColor: "#f7f7f5", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("image", "", { width: "100%", aspectRatio: "4/3", borderRadius: "8px" }, { src: "/placeholder.svg", alt: "Furniture" }),
          comp("group", "", {}, {
            children: [
              comp("text", "New Arrival", { fontSize: "12px", color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }),
              comp("heading", "Oslo Lounge Chair", { fontSize: "48px", fontWeight: "400", color: "#262626", marginBottom: "24px" }),
              comp("paragraph", "Handcrafted with premium oak and Kvadrat fabric. Designed for lasting comfort and timeless style.", { fontSize: "16px", color: "#737373", lineHeight: "1.7", marginBottom: "32px" }),
              comp("text", "$1,290", { fontSize: "28px", fontWeight: "500", color: "#262626", marginBottom: "32px" }),
              comp("button", "Add to Cart", { backgroundColor: "#262626", color: "#ffffff", padding: "16px 48px", borderRadius: "4px", fontSize: "14px", fontWeight: "500" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Categories", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1200px", margin: "0 auto" }, {
        children: ["Living Room", "Bedroom", "Kitchen", "Office"].map(cat => comp("group", "", { textAlign: "center" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", backgroundColor: "#f7f7f5", borderRadius: "8px", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", cat, { fontSize: "16px", fontWeight: "500", color: "#262626" }),
          ],
        })),
      }),
    ]),
    footerSection("Nordic Home", false),
  ]
);

add(
  "Beauty & Cosmetics Store",
  "Elegant beauty store with soft colors",
  "ecommerce",
  "💄",
  ["beauty", "cosmetics", "skincare", "elegant"],
  [
    section("header", "Navigation", { backgroundColor: "#fdf2f8" }, [modernNav("Glow Beauty", ["Skincare", "Makeup", "Haircare", "Sets", "Cart"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "✨ Best Seller", { fontSize: "14px", color: "#ec4899", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "Radiance Serum Collection", { fontSize: "48px", fontWeight: "700", color: "#831843", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Discover our award-winning vitamin C serum that transforms your skin in just 7 days.", { fontSize: "17px", color: "#9d174d", lineHeight: "1.7", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Shop Now", { backgroundColor: "#ec4899", color: "#ffffff", padding: "16px 40px", borderRadius: "50px", fontSize: "15px", fontWeight: "600" }),
                  comp("button", "Learn More", { backgroundColor: "transparent", color: "#ec4899", padding: "16px 40px", borderRadius: "50px", fontSize: "15px", fontWeight: "600", border: "2px solid #ec4899" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Products" }),
        ],
      }),
    ]),
    section("body", "Products", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("heading", "Best Sellers", { fontSize: "36px", fontWeight: "700", textAlign: "center", marginBottom: "48px", color: "#831843" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }, {
        children: ["Vitamin C Serum", "Hydrating Cream", "Eye Repair", "Night Mask"].map(p => comp("card", "", { backgroundColor: "#fdf2f8", borderRadius: "20px", padding: "24px", textAlign: "center" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "16px", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", p, { fontSize: "16px", fontWeight: "600", color: "#831843", marginBottom: "8px" }),
            comp("text", "$48", { fontSize: "18px", fontWeight: "700", color: "#ec4899" }),
          ],
        })),
      }),
    ]),
    footerSection("Glow Beauty", false),
  ]
);

add(
  "Food Delivery Store",
  "Modern food delivery with appetizing visuals",
  "ecommerce",
  "🍕",
  ["food", "delivery", "restaurant", "ordering"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("FoodDash", ["Menu", "Deals", "Track Order", "Cart"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("heading", "Craving Something Delicious?", { fontSize: "52px", fontWeight: "800", color: "#78350f", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Order from 1000+ restaurants and get it delivered in under 30 minutes.", { fontSize: "18px", color: "#92400e", marginBottom: "32px" }),
              comp("container", "", { display: "flex", backgroundColor: "#ffffff", borderRadius: "12px", padding: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }, {
                children: [
                  comp("input", "", { flex: "1", border: "none", padding: "12px 16px", fontSize: "16px" }, { placeholder: "Enter your address" }),
                  comp("button", "Find Food", { backgroundColor: "#f59e0b", color: "#ffffff", padding: "12px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", border: "none" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Food" }),
        ],
      }),
    ]),
    section("body", "Categories", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "flex", gap: "24px", justifyContent: "center" }, {
        children: ["🍕 Pizza", "🍔 Burgers", "🍣 Sushi", "🥗 Salads", "🍜 Noodles", "🍰 Desserts"].map(cat => comp("button", cat, { backgroundColor: "#fef3c7", color: "#78350f", padding: "16px 32px", borderRadius: "50px", fontSize: "16px", fontWeight: "600", border: "none" })),
      }),
    ]),
    footerSection("FoodDash", false),
  ]
);

add(
  "Jewelry Store",
  "Elegant jewelry store with dark luxury theme",
  "ecommerce",
  "💎",
  ["jewelry", "luxury", "gold", "elegant"],
  [
    section("header", "Navigation", { backgroundColor: "#0f0f0f" }, [modernNav("AURUM", ["Collections", "Engagement", "Fine Jewelry", "Gifts"], true)]),
    section("body", "Hero", { backgroundColor: "#0f0f0f", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "EXCLUSIVE COLLECTION", { fontSize: "12px", color: "#d4af37", letterSpacing: "4px", marginBottom: "32px" }),
      comp("heading", "Timeless Elegance", { fontSize: "72px", fontWeight: "300", color: "#ffffff", marginBottom: "24px", fontFamily: "Georgia, serif" }),
      comp("paragraph", "Handcrafted jewelry for life's most precious moments", { fontSize: "18px", color: "#737373", marginBottom: "48px" }),
      comp("button", "Explore Collection", { backgroundColor: "#d4af37", color: "#0f0f0f", padding: "18px 56px", borderRadius: "0", fontSize: "14px", fontWeight: "500", letterSpacing: "2px" }),
    ]),
    section("body", "Products", { backgroundColor: "#0f0f0f", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1000px", margin: "0 auto" }, {
        children: ["Diamond Ring", "Gold Necklace", "Pearl Earrings"].map(p => comp("group", "", { textAlign: "center" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", backgroundColor: "#1a1a1a", marginBottom: "24px" }, { src: "/placeholder.svg" }),
            comp("text", p, { fontSize: "18px", fontWeight: "400", color: "#ffffff", marginBottom: "8px" }),
            comp("text", "From $2,500", { fontSize: "14px", color: "#d4af37" }),
          ],
        })),
      }),
    ]),
    footerSection("AURUM"),
  ]
);

add(
  "Sports & Fitness Store",
  "Dynamic sports store with energetic design",
  "ecommerce",
  "🏃",
  ["sports", "fitness", "athletic", "active"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("ATHLETE", ["Men", "Women", "Footwear", "Equipment", "Cart"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "NEW RELEASE", { fontSize: "14px", color: "#f97316", fontWeight: "700", marginBottom: "16px" }),
              comp("heading", "UltraBoost Pro X", { fontSize: "56px", fontWeight: "900", color: "#ffffff", marginBottom: "24px" }),
              comp("paragraph", "Revolutionary cushioning technology for maximum performance. Built for champions.", { fontSize: "18px", color: "#94a3b8", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px", alignItems: "center" }, {
                children: [
                  comp("text", "$189", { fontSize: "36px", fontWeight: "800", color: "#f97316" }),
                  comp("button", "Shop Now", { backgroundColor: "#f97316", color: "#ffffff", padding: "16px 40px", borderRadius: "8px", fontSize: "16px", fontWeight: "700" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1" }, { src: "/placeholder.svg", alt: "Shoes" }),
        ],
      }),
    ]),
    section("body", "Categories", { backgroundColor: "#f8fafc", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }, {
        children: ["Running", "Training", "Basketball", "Football"].map(cat => comp("card", "", { backgroundColor: "#ffffff", borderRadius: "16px", padding: "32px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "12px", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", cat, { fontSize: "18px", fontWeight: "700", color: "#0f172a" }),
          ],
        })),
      }),
    ]),
    footerSection("ATHLETE"),
  ]
);

add(
  "Pet Store",
  "Friendly pet store with playful design",
  "ecommerce",
  "🐕",
  ["pets", "animals", "supplies", "friendly"],
  [
    section("header", "Navigation", { backgroundColor: "#ecfdf5" }, [modernNav("PawShop", ["Dogs", "Cats", "Food", "Toys", "Cart"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🐾 Premium Pet Care", { fontSize: "16px", color: "#059669", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "Everything Your Pet Needs", { fontSize: "48px", fontWeight: "800", color: "#064e3b", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "From healthy food to fun toys, we've got everything to keep your furry friends happy and healthy.", { fontSize: "17px", color: "#047857", marginBottom: "32px" }),
              comp("button", "Shop Now", { backgroundColor: "#059669", color: "#ffffff", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600" }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Pets" }),
        ],
      }),
    ]),
    section("body", "Products", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("heading", "Best Sellers", { fontSize: "32px", fontWeight: "800", textAlign: "center", marginBottom: "48px", color: "#064e3b" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }, {
        children: ["Premium Dog Food", "Cat Toys Bundle", "Cozy Pet Bed", "Health Treats"].map(p => comp("card", "", { backgroundColor: "#ecfdf5", borderRadius: "16px", padding: "20px", textAlign: "center" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "12px", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", p, { fontSize: "15px", fontWeight: "600", color: "#064e3b", marginBottom: "8px" }),
            comp("text", "$29.99", { fontSize: "18px", fontWeight: "700", color: "#059669" }),
          ],
        })),
      }),
    ]),
    footerSection("PawShop", false),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// BLOG TEMPLATES (6)
// ═══════════════════════════════════════════════════════════════════

add(
  "Tech Blog Modern",
  "Modern tech blog with clean reading experience",
  "blog",
  "💻",
  ["tech", "modern", "articles", "news"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("TechBytes", ["Articles", "Tutorials", "Reviews", "Newsletter"], true)]),
    section("body", "Hero", { backgroundColor: "#0f172a", padding: "100px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("heading", "TechBytes", { fontSize: "64px", fontWeight: "900", color: "#ffffff", marginBottom: "24px" }),
          comp("paragraph", "The latest in tech news, tutorials, and reviews. Stay ahead of the curve.", { fontSize: "18px", color: "#94a3b8", marginBottom: "40px" }),
          comp("container", "", { display: "flex", backgroundColor: "#1e293b", borderRadius: "12px", padding: "8px", maxWidth: "500px", margin: "0 auto" }, {
            children: [
              comp("input", "", { flex: "1", backgroundColor: "transparent", border: "none", padding: "12px", color: "#ffffff", fontSize: "15px" }, { placeholder: "Subscribe to newsletter" }),
              comp("button", "Subscribe", { backgroundColor: "#6366f1", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Featured", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("text", "FEATURED", { fontSize: "12px", color: "#6366f1", fontWeight: "700", letterSpacing: "2px", marginBottom: "24px" }),
          comp("container", "", { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px" }, {
            children: [
              comp("card", "", { backgroundColor: "#f8fafc", borderRadius: "16px", overflow: "hidden" }, {
                children: [
                  comp("image", "", { width: "100%", aspectRatio: "16/9" }, { src: "/placeholder.svg" }),
                  comp("group", "", { padding: "24px" }, {
                    children: [
                      comp("text", "AI & Machine Learning", { fontSize: "12px", color: "#6366f1", fontWeight: "600", marginBottom: "12px" }),
                      comp("heading", "The Future of AI in 2024: What to Expect", { fontSize: "24px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }),
                      comp("text", "Jan 15, 2024 • 8 min read", { fontSize: "13px", color: "#64748b" }),
                    ],
                  }),
                ],
              }),
              comp("group", "", { display: "flex", flexDirection: "column", gap: "16px" }, {
                children: [
                  comp("card", "", { backgroundColor: "#f8fafc", borderRadius: "12px", padding: "20px" }, {
                    children: [
                      comp("text", "Web Dev", { fontSize: "11px", color: "#6366f1", fontWeight: "600", marginBottom: "8px" }),
                      comp("heading", "React 19: New Features", { fontSize: "16px", fontWeight: "600", color: "#0f172a" }),
                    ],
                  }),
                  comp("card", "", { backgroundColor: "#f8fafc", borderRadius: "12px", padding: "20px" }, {
                    children: [
                      comp("text", "Startups", { fontSize: "11px", color: "#6366f1", fontWeight: "600", marginBottom: "8px" }),
                      comp("heading", "How to Raise Your Series A", { fontSize: "16px", fontWeight: "600", color: "#0f172a" }),
                    ],
                  }),
                  comp("card", "", { backgroundColor: "#f8fafc", borderRadius: "12px", padding: "20px" }, {
                    children: [
                      comp("text", "Reviews", { fontSize: "11px", color: "#6366f1", fontWeight: "600", marginBottom: "8px" }),
                      comp("heading", "MacBook Pro M3 Review", { fontSize: "16px", fontWeight: "600", color: "#0f172a" }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("TechBytes"),
  ]
);

add(
  "Lifestyle Blog",
  "Beautiful lifestyle blog with photography focus",
  "blog",
  "🌸",
  ["lifestyle", "photography", "wellness", "travel"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("Bloom", ["Home", "Travel", "Wellness", "Style", "About"])]),
    section("body", "Hero", { backgroundColor: "#fdf2f8", padding: "80px 40px" }, [
      comp("container", "", { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("text", "✨ Welcome to", { fontSize: "14px", color: "#ec4899", marginBottom: "16px" }),
          comp("heading", "Bloom", { fontSize: "72px", fontWeight: "300", color: "#831843", marginBottom: "24px", fontFamily: "Georgia, serif" }),
          comp("paragraph", "A journal of beautiful living, mindful wellness, and adventures around the world.", { fontSize: "17px", color: "#9d174d", lineHeight: "1.8", fontFamily: "Georgia, serif" }),
        ],
      }),
    ]),
    section("body", "Posts", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "4/5", borderRadius: "8px", marginBottom: "20px" }, { src: "/placeholder.svg" }),
              comp("text", "TRAVEL", { fontSize: "11px", color: "#ec4899", letterSpacing: "2px", marginBottom: "8px" }),
              comp("heading", "A Week in Santorini", { fontSize: "20px", fontWeight: "400", color: "#0f172a", marginBottom: "8px", fontFamily: "Georgia, serif" }),
              comp("text", "March 12, 2024", { fontSize: "13px", color: "#94a3b8" }),
            ],
          }),
          comp("group", "", {}, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "4/5", borderRadius: "8px", marginBottom: "20px" }, { src: "/placeholder.svg" }),
              comp("text", "WELLNESS", { fontSize: "11px", color: "#ec4899", letterSpacing: "2px", marginBottom: "8px" }),
              comp("heading", "Morning Rituals for Inner Peace", { fontSize: "20px", fontWeight: "400", color: "#0f172a", marginBottom: "8px", fontFamily: "Georgia, serif" }),
              comp("text", "March 8, 2024", { fontSize: "13px", color: "#94a3b8" }),
            ],
          }),
          comp("group", "", {}, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "4/5", borderRadius: "8px", marginBottom: "20px" }, { src: "/placeholder.svg" }),
              comp("text", "STYLE", { fontSize: "11px", color: "#ec4899", letterSpacing: "2px", marginBottom: "8px" }),
              comp("heading", "Spring Wardrobe Essentials", { fontSize: "20px", fontWeight: "400", color: "#0f172a", marginBottom: "8px", fontFamily: "Georgia, serif" }),
              comp("text", "March 1, 2024", { fontSize: "13px", color: "#94a3b8" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("Bloom", false),
  ]
);

add(
  "Finance Blog",
  "Professional finance and investing blog",
  "blog",
  "📈",
  ["finance", "investing", "money", "professional"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("WealthWise", ["Markets", "Investing", "Personal Finance", "Crypto"], true)]),
    section("body", "Hero", { backgroundColor: "#0f172a", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "48px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#1e293b", borderRadius: "16px", overflow: "hidden" }, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "16/9" }, { src: "/placeholder.svg" }),
              comp("group", "", { padding: "32px" }, {
                children: [
                  comp("text", "FEATURED", { fontSize: "11px", color: "#22c55e", fontWeight: "700", letterSpacing: "2px", marginBottom: "16px" }),
                  comp("heading", "The Complete Guide to Building a Diversified Portfolio in 2024", { fontSize: "28px", fontWeight: "700", color: "#ffffff", marginBottom: "16px" }),
                  comp("paragraph", "Learn how to balance risk and reward with a properly diversified investment strategy.", { fontSize: "15px", color: "#94a3b8", marginBottom: "16px" }),
                  comp("text", "By James Miller • 15 min read", { fontSize: "13px", color: "#64748b" }),
                ],
              }),
            ],
          }),
          comp("group", "", {}, {
            children: [
              comp("text", "TRENDING", { fontSize: "11px", color: "#22c55e", fontWeight: "700", letterSpacing: "2px", marginBottom: "24px" }),
              comp("group", "", { borderBottom: "1px solid #334155", paddingBottom: "20px", marginBottom: "20px" }, {
                children: [
                  comp("heading", "Bitcoin Hits New All-Time High", { fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "8px" }),
                  comp("text", "5 hours ago", { fontSize: "12px", color: "#64748b" }),
                ],
              }),
              comp("group", "", { borderBottom: "1px solid #334155", paddingBottom: "20px", marginBottom: "20px" }, {
                children: [
                  comp("heading", "Fed Signals Rate Cuts Coming", { fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "8px" }),
                  comp("text", "8 hours ago", { fontSize: "12px", color: "#64748b" }),
                ],
              }),
              comp("group", "", { paddingBottom: "20px" }, {
                children: [
                  comp("heading", "Tech Stocks Rally Continues", { fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "8px" }),
                  comp("text", "12 hours ago", { fontSize: "12px", color: "#64748b" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("WealthWise"),
  ]
);

add(
  "Food & Recipe Blog",
  "Delicious food blog with recipe cards",
  "blog",
  "🍳",
  ["food", "recipes", "cooking", "culinary"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("Savory Stories", ["Recipes", "Cuisines", "Tips", "About"])]),
    section("body", "Hero", { backgroundColor: "#fef7e4", padding: "80px 40px", textAlign: "center" }, [
      comp("text", "🍳", { fontSize: "64px", marginBottom: "24px" }),
      comp("heading", "Savory Stories", { fontSize: "56px", fontWeight: "700", color: "#78350f", marginBottom: "16px" }),
      comp("paragraph", "Delicious recipes, cooking tips, and culinary adventures from around the world.", { fontSize: "18px", color: "#92400e", marginBottom: "40px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: ["Quick Meals", "Vegetarian", "Desserts", "Asian"].map(cat => comp("button", cat, { backgroundColor: "#ffffff", color: "#78350f", padding: "12px 24px", borderRadius: "50px", fontSize: "14px", fontWeight: "500", border: "1px solid #fcd34d" })),
      }),
    ]),
    section("body", "Recipes", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("heading", "Latest Recipes", { fontSize: "32px", fontWeight: "700", textAlign: "center", marginBottom: "48px", color: "#78350f" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "4/3" }, { src: "/placeholder.svg" }),
              comp("group", "", { padding: "20px" }, {
                children: [
                  comp("text", "⏱️ 30 min • Easy", { fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }),
                  comp("heading", "Creamy Tuscan Chicken", { fontSize: "18px", fontWeight: "600", color: "#78350f" }),
                ],
              }),
            ],
          }),
          comp("card", "", { backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "4/3" }, { src: "/placeholder.svg" }),
              comp("group", "", { padding: "20px" }, {
                children: [
                  comp("text", "⏱️ 45 min • Medium", { fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }),
                  comp("heading", "Homemade Pasta Carbonara", { fontSize: "18px", fontWeight: "600", color: "#78350f" }),
                ],
              }),
            ],
          }),
          comp("card", "", { backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }, {
            children: [
              comp("image", "", { width: "100%", aspectRatio: "4/3" }, { src: "/placeholder.svg" }),
              comp("group", "", { padding: "20px" }, {
                children: [
                  comp("text", "⏱️ 20 min • Easy", { fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }),
                  comp("heading", "Thai Basil Stir Fry", { fontSize: "18px", fontWeight: "600", color: "#78350f" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("Savory Stories", false),
  ]
);

add(
  "Personal Blog Minimal",
  "Simple personal blog with focus on writing",
  "blog",
  "✍️",
  ["personal", "minimal", "writing", "thoughts"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("Emma's Journal", ["Writing", "About", "Newsletter"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "120px 40px" }, [
      comp("container", "", { maxWidth: "600px", margin: "0 auto" }, {
        children: [
          comp("text", "👋 Hi, I'm Emma", { fontSize: "18px", color: "#64748b", marginBottom: "24px" }),
          comp("heading", "I write about design, technology, and life.", { fontSize: "48px", fontWeight: "400", color: "#0f172a", lineHeight: "1.3", marginBottom: "32px", fontFamily: "Georgia, serif" }),
          comp("paragraph", "Welcome to my little corner of the internet where I share thoughts, learnings, and occasional musings.", { fontSize: "17px", color: "#64748b", lineHeight: "1.8", fontFamily: "Georgia, serif" }),
        ],
      }),
    ]),
    section("body", "Posts", { backgroundColor: "#f8fafc", padding: "80px 40px" }, [
      comp("container", "", { maxWidth: "600px", margin: "0 auto" }, {
        children: [
          comp("group", "", { borderBottom: "1px solid #e2e8f0", paddingBottom: "40px", marginBottom: "40px" }, {
            children: [
              comp("text", "March 15, 2024", { fontSize: "13px", color: "#94a3b8", marginBottom: "12px" }),
              comp("heading", "On the Art of Doing Nothing", { fontSize: "24px", fontWeight: "400", color: "#0f172a", marginBottom: "12px", fontFamily: "Georgia, serif" }),
              comp("paragraph", "In our hyper-productive culture, we've forgotten how to simply be. Here's why doing nothing might be the most productive thing you can do.", { fontSize: "15px", color: "#64748b", lineHeight: "1.7", fontFamily: "Georgia, serif" }),
            ],
          }),
          comp("group", "", { borderBottom: "1px solid #e2e8f0", paddingBottom: "40px", marginBottom: "40px" }, {
            children: [
              comp("text", "March 8, 2024", { fontSize: "13px", color: "#94a3b8", marginBottom: "12px" }),
              comp("heading", "Design Systems in Practice", { fontSize: "24px", fontWeight: "400", color: "#0f172a", marginBottom: "12px", fontFamily: "Georgia, serif" }),
              comp("paragraph", "After building design systems for five years, here are the lessons I wish I knew from the start.", { fontSize: "15px", color: "#64748b", lineHeight: "1.7", fontFamily: "Georgia, serif" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("Emma's Journal", false),
  ]
);

add(
  "News Magazine",
  "News and magazine style blog layout",
  "blog",
  "📰",
  ["news", "magazine", "journalism", "media"],
  [
    section("header", "Navigation", { backgroundColor: "#dc2626" }, [modernNav("DAILY HERALD", ["World", "Politics", "Business", "Tech", "Culture"], true)]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "40px 40px" }, [
      comp("container", "", { maxWidth: "1200px", margin: "0 auto" }, {
        children: [
          comp("container", "", { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "24px" }, {
            children: [
              comp("group", "", {}, {
                children: [
                  comp("image", "", { width: "100%", aspectRatio: "16/9", marginBottom: "16px" }, { src: "/placeholder.svg" }),
                  comp("text", "BREAKING", { fontSize: "11px", color: "#dc2626", fontWeight: "700", marginBottom: "8px" }),
                  comp("heading", "Global Leaders Meet for Historic Climate Summit", { fontSize: "32px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }),
                  comp("paragraph", "World leaders gather to discuss ambitious new targets for carbon emissions reduction.", { fontSize: "15px", color: "#64748b" }),
                ],
              }),
              comp("group", "", {}, {
                children: [
                  comp("image", "", { width: "100%", aspectRatio: "4/3", marginBottom: "12px" }, { src: "/placeholder.svg" }),
                  comp("text", "POLITICS", { fontSize: "10px", color: "#dc2626", fontWeight: "700", marginBottom: "6px" }),
                  comp("heading", "Senate Passes Landmark Bill", { fontSize: "18px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }),
                  comp("text", "2 hours ago", { fontSize: "12px", color: "#94a3b8" }),
                ],
              }),
              comp("group", "", {}, {
                children: [
                  comp("image", "", { width: "100%", aspectRatio: "4/3", marginBottom: "12px" }, { src: "/placeholder.svg" }),
                  comp("text", "BUSINESS", { fontSize: "10px", color: "#dc2626", fontWeight: "700", marginBottom: "6px" }),
                  comp("heading", "Markets Surge on Fed News", { fontSize: "18px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }),
                  comp("text", "4 hours ago", { fontSize: "12px", color: "#94a3b8" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("DAILY HERALD"),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// LANDING PAGE TEMPLATES (6)
// ═══════════════════════════════════════════════════════════════════

add(
  "App Launch Landing",
  "Mobile app launch landing page with download focus",
  "landing",
  "📲",
  ["app", "mobile", "launch", "download"],
  [
    section("header", "Navigation", { backgroundColor: "transparent" }, [modernNav("AppName", ["Features", "Pricing", "Download"], true)]),
    section("body", "Hero", { background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "📲 Now Available on iOS & Android", { fontSize: "14px", color: "#a5b4fc", marginBottom: "32px" }),
      comp("heading", "Your Life, Organized", { fontSize: "64px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "The all-in-one app that helps you manage tasks, track habits, and achieve your goals.", { fontSize: "20px", color: "#c7d2fe", marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "🍎 App Store", { backgroundColor: "#ffffff", color: "#0f172a", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: "600" }),
          comp("button", "▶ Google Play", { backgroundColor: "#ffffff", color: "#0f172a", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: "600" }),
        ],
      }),
      comp("image", "", { maxWidth: "300px", margin: "60px auto 0" }, { src: "/placeholder.svg", alt: "App Screenshot" }),
    ]),
    section("body", "Features", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          featureCard("✅", "Task Management", "Organize your to-dos with smart lists and reminders"),
          featureCard("📊", "Habit Tracking", "Build better habits with visual progress tracking"),
          featureCard("🎯", "Goal Setting", "Set and achieve goals with milestone tracking"),
        ],
      }),
    ]),
    ctaSection("Ready to get organized?", "Download free today", "Get the App"),
    footerSection("AppName"),
  ]
);

add(
  "Product Launch Landing",
  "Product launch landing with bold visuals",
  "landing",
  "🚀",
  ["product", "launch", "startup", "bold"],
  [
    section("header", "Navigation", { backgroundColor: "#000000" }, [modernNav("PRODUCT X", ["Features", "Specs", "Buy Now"], true)]),
    section("body", "Hero", { backgroundColor: "#000000", padding: "140px 40px", textAlign: "center" }, [
      comp("text", "INTRODUCING", { fontSize: "14px", color: "#737373", letterSpacing: "4px", marginBottom: "32px" }),
      comp("heading", "PRODUCT X", { fontSize: "96px", fontWeight: "900", color: "#ffffff", marginBottom: "24px", letterSpacing: "-4px" }),
      comp("paragraph", "Revolutionary. Powerful. Yours.", { fontSize: "24px", color: "#a3a3a3", marginBottom: "48px" }),
      comp("image", "", { maxWidth: "600px", margin: "0 auto" }, { src: "/placeholder.svg", alt: "Product" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center", marginTop: "60px" }, {
        children: [
          comp("button", "Pre-Order Now", { backgroundColor: "#ffffff", color: "#000000", padding: "18px 48px", borderRadius: "0", fontSize: "16px", fontWeight: "600" }),
          comp("button", "Learn More", { backgroundColor: "transparent", color: "#ffffff", padding: "18px 48px", borderRadius: "0", fontSize: "16px", fontWeight: "600", border: "1px solid #404040" }),
        ],
      }),
    ]),
    section("body", "Specs", { backgroundColor: "#0a0a0a", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "50W", { fontSize: "48px", fontWeight: "700", color: "#ffffff" }), comp("text", "Power Output", { fontSize: "14px", color: "#737373" })] }),
          comp("group", "", {}, { children: [comp("text", "24h", { fontSize: "48px", fontWeight: "700", color: "#ffffff" }), comp("text", "Battery Life", { fontSize: "14px", color: "#737373" })] }),
          comp("group", "", {}, { children: [comp("text", "5G", { fontSize: "48px", fontWeight: "700", color: "#ffffff" }), comp("text", "Connectivity", { fontSize: "14px", color: "#737373" })] }),
          comp("group", "", {}, { children: [comp("text", "256GB", { fontSize: "48px", fontWeight: "700", color: "#ffffff" }), comp("text", "Storage", { fontSize: "14px", color: "#737373" })] }),
        ],
      }),
    ]),
    footerSection("PRODUCT X"),
  ]
);

add(
  "Coming Soon Landing",
  "Coming soon teaser page with countdown",
  "landing",
  "⏰",
  ["coming soon", "teaser", "launch", "waitlist"],
  [
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }, [
      comp("container", "", { textAlign: "center", maxWidth: "600px" }, {
        children: [
          comp("text", "✨", { fontSize: "64px", marginBottom: "32px" }),
          comp("heading", "Something Big is Coming", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
          comp("paragraph", "We're working on something amazing. Be the first to know when we launch.", { fontSize: "18px", color: "#94a3b8", marginBottom: "48px" }),
          comp("container", "", { display: "flex", gap: "40px", justifyContent: "center", marginBottom: "60px" }, {
            children: [
              comp("group", "", { textAlign: "center" }, { children: [comp("text", "14", { fontSize: "48px", fontWeight: "700", color: "#ffffff" }), comp("text", "Days", { fontSize: "14px", color: "#64748b" })] }),
              comp("group", "", { textAlign: "center" }, { children: [comp("text", "08", { fontSize: "48px", fontWeight: "700", color: "#ffffff" }), comp("text", "Hours", { fontSize: "14px", color: "#64748b" })] }),
              comp("group", "", { textAlign: "center" }, { children: [comp("text", "42", { fontSize: "48px", fontWeight: "700", color: "#ffffff" }), comp("text", "Minutes", { fontSize: "14px", color: "#64748b" })] }),
              comp("group", "", { textAlign: "center" }, { children: [comp("text", "15", { fontSize: "48px", fontWeight: "700", color: "#ffffff" }), comp("text", "Seconds", { fontSize: "14px", color: "#64748b" })] }),
            ],
          }),
          comp("container", "", { display: "flex", backgroundColor: "#1e293b", borderRadius: "12px", padding: "8px", maxWidth: "450px", margin: "0 auto" }, {
            children: [
              comp("input", "", { flex: "1", backgroundColor: "transparent", border: "none", padding: "14px", color: "#ffffff", fontSize: "16px" }, { placeholder: "Enter your email" }),
              comp("button", "Notify Me", { backgroundColor: "#6366f1", color: "#ffffff", padding: "14px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: "600" }),
            ],
          }),
        ],
      }),
    ]),
  ]
);

add(
  "Event Landing",
  "Event or conference landing page",
  "landing",
  "🎤",
  ["event", "conference", "summit", "tickets"],
  [
    section("header", "Navigation", { backgroundColor: "#18181b" }, [modernNav("SUMMIT 2024", ["Speakers", "Schedule", "Tickets", "Venue"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #7c3aed 100%)", padding: "140px 40px", textAlign: "center" }, [
      comp("text", "MARCH 15-17, 2024 • SAN FRANCISCO", { fontSize: "14px", color: "#a5b4fc", letterSpacing: "2px", marginBottom: "32px" }),
      comp("heading", "Tech Summit 2024", { fontSize: "72px", fontWeight: "900", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Join 5,000+ innovators, founders, and visionaries for the biggest tech event of the year.", { fontSize: "20px", color: "#a1a1aa", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "Get Tickets", { backgroundColor: "#7c3aed", color: "#ffffff", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "700" }),
          comp("button", "View Schedule", { backgroundColor: "transparent", color: "#ffffff", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", border: "1px solid #52525b" }),
        ],
      }),
    ]),
    section("body", "Speakers", { backgroundColor: "#18181b", padding: "100px 40px" }, [
      comp("heading", "Featured Speakers", { fontSize: "40px", fontWeight: "800", color: "#ffffff", textAlign: "center", marginBottom: "60px" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("group", "", { textAlign: "center" }, { children: [comp("image", "", { width: "120px", height: "120px", borderRadius: "50%", margin: "0 auto 16px", backgroundColor: "#27272a" }, { src: "/placeholder.svg" }), comp("text", "Sarah Chen", { fontSize: "18px", fontWeight: "600", color: "#ffffff" }), comp("text", "CEO, TechCorp", { fontSize: "14px", color: "#71717a" })] }),
          comp("group", "", { textAlign: "center" }, { children: [comp("image", "", { width: "120px", height: "120px", borderRadius: "50%", margin: "0 auto 16px", backgroundColor: "#27272a" }, { src: "/placeholder.svg" }), comp("text", "Mark Johnson", { fontSize: "18px", fontWeight: "600", color: "#ffffff" }), comp("text", "CTO, Startup Inc", { fontSize: "14px", color: "#71717a" })] }),
          comp("group", "", { textAlign: "center" }, { children: [comp("image", "", { width: "120px", height: "120px", borderRadius: "50%", margin: "0 auto 16px", backgroundColor: "#27272a" }, { src: "/placeholder.svg" }), comp("text", "Lisa Wang", { fontSize: "18px", fontWeight: "600", color: "#ffffff" }), comp("text", "Founder, AI Lab", { fontSize: "14px", color: "#71717a" })] }),
          comp("group", "", { textAlign: "center" }, { children: [comp("image", "", { width: "120px", height: "120px", borderRadius: "50%", margin: "0 auto 16px", backgroundColor: "#27272a" }, { src: "/placeholder.svg" }), comp("text", "David Lee", { fontSize: "18px", fontWeight: "600", color: "#ffffff" }), comp("text", "VP, BigTech", { fontSize: "14px", color: "#71717a" })] }),
        ],
      }),
    ]),
    footerSection("SUMMIT 2024"),
  ]
);

add(
  "Waitlist Landing",
  "Product waitlist landing with social proof",
  "landing",
  "📝",
  ["waitlist", "beta", "early access", "signup"],
  [
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "120px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🚀 Early Access", { fontSize: "14px", color: "#6366f1", fontWeight: "600", backgroundColor: "#eef2ff", padding: "8px 16px", borderRadius: "20px", display: "inline-block", marginBottom: "24px" }),
              comp("heading", "Join 10,000+ People on Our Waitlist", { fontSize: "48px", fontWeight: "800", color: "#0f172a", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Be among the first to experience the future of productivity. Get early access, exclusive features, and special pricing.", { fontSize: "17px", color: "#64748b", lineHeight: "1.7", marginBottom: "32px" }),
              comp("container", "", { display: "flex", backgroundColor: "#f1f5f9", borderRadius: "12px", padding: "8px", marginBottom: "24px" }, {
                children: [
                  comp("input", "", { flex: "1", backgroundColor: "transparent", border: "none", padding: "14px", fontSize: "16px" }, { placeholder: "Enter your email" }),
                  comp("button", "Join Waitlist", { backgroundColor: "#6366f1", color: "#ffffff", padding: "14px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: "600" }),
                ],
              }),
              comp("container", "", { display: "flex", gap: "24px" }, {
                children: [
                  comp("text", "✓ No credit card", { fontSize: "13px", color: "#64748b" }),
                  comp("text", "✓ Free early access", { fontSize: "13px", color: "#64748b" }),
                  comp("text", "✓ Cancel anytime", { fontSize: "13px", color: "#64748b" }),
                ],
              }),
            ],
          }),
          comp("container", "", { backgroundColor: "#f8fafc", borderRadius: "24px", padding: "40px" }, {
            children: [
              comp("container", "", { display: "flex", marginBottom: "32px" }, {
                children: Array.from({ length: 5 }).map(() => comp("image", "", { width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #ffffff", marginLeft: "-12px", backgroundColor: "#e2e8f0" }, { src: "/placeholder.svg" })),
              }),
              comp("text", ""This is exactly what I've been waiting for. Can't wait to get access!"", { fontSize: "16px", color: "#475569", fontStyle: "italic", marginBottom: "16px" }),
              comp("text", "— Sarah, Product Designer", { fontSize: "14px", color: "#94a3b8" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("Product", false),
  ]
);

add(
  "Webinar Landing",
  "Webinar registration landing page",
  "landing",
  "🎥",
  ["webinar", "online", "registration", "live"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("WebinarPro", ["About", "Speakers", "Register"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🔴 LIVE WEBINAR", { fontSize: "14px", color: "#f87171", fontWeight: "700", marginBottom: "16px" }),
              comp("heading", "Master AI in 60 Minutes", { fontSize: "48px", fontWeight: "800", color: "#ffffff", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Learn how to leverage AI tools to 10x your productivity. Live Q&A session included.", { fontSize: "18px", color: "#94a3b8", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "24px", marginBottom: "32px" }, {
                children: [
                  comp("text", "📅 March 20, 2024", { fontSize: "15px", color: "#ffffff" }),
                  comp("text", "⏰ 2:00 PM EST", { fontSize: "15px", color: "#ffffff" }),
                ],
              }),
              comp("button", "Register Now - Free", { backgroundColor: "#3b82f6", color: "#ffffff", padding: "18px 48px", borderRadius: "10px", fontSize: "16px", fontWeight: "700" }),
            ],
          }),
          comp("card", "", { backgroundColor: "#1e293b", borderRadius: "16px", padding: "40px" }, {
            children: [
              comp("heading", "Register Now", { fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "24px" }),
              comp("input", "", { width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#ffffff", marginBottom: "16px", fontSize: "15px" }, { placeholder: "Full Name" }),
              comp("input", "", { width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#ffffff", marginBottom: "16px", fontSize: "15px" }, { placeholder: "Email Address" }),
              comp("input", "", { width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#ffffff", marginBottom: "24px", fontSize: "15px" }, { placeholder: "Company" }),
              comp("button", "Reserve My Spot", { width: "100%", backgroundColor: "#3b82f6", color: "#ffffff", padding: "16px", borderRadius: "8px", fontSize: "16px", fontWeight: "600" }),
              comp("text", "🔒 Your info is secure and won't be shared", { fontSize: "12px", color: "#64748b", textAlign: "center", marginTop: "16px" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("WebinarPro"),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// RESTAURANT TEMPLATES (5)
// ═══════════════════════════════════════════════════════════════════

add(
  "Fine Dining Restaurant",
  "Elegant fine dining restaurant website",
  "restaurant",
  "🍽️",
  ["fine dining", "elegant", "upscale", "gourmet"],
  [
    section("header", "Navigation", { backgroundColor: "#0f0f0f" }, [modernNav("LE BLANC", ["Menu", "Reservations", "Private Dining", "About"], true)]),
    section("body", "Hero", { backgroundColor: "#0f0f0f", padding: "160px 40px", textAlign: "center" }, [
      comp("text", "EST. 1987", { fontSize: "12px", color: "#a3a3a3", letterSpacing: "4px", marginBottom: "32px" }),
      comp("heading", "LE BLANC", { fontSize: "80px", fontWeight: "200", color: "#ffffff", letterSpacing: "8px", marginBottom: "24px" }),
      comp("paragraph", "An unforgettable culinary journey through French cuisine", { fontSize: "18px", color: "#737373", marginBottom: "48px", fontFamily: "Georgia, serif" }),
      comp("button", "Reserve a Table", { backgroundColor: "transparent", color: "#ffffff", padding: "18px 56px", borderRadius: "0", fontSize: "14px", fontWeight: "400", border: "1px solid #404040", letterSpacing: "2px" }),
    ]),
    section("body", "About", { backgroundColor: "#0a0a0a", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("image", "", { width: "100%", aspectRatio: "3/4" }, { src: "/placeholder.svg", alt: "Interior" }),
          comp("group", "", {}, {
            children: [
              comp("text", "OUR STORY", { fontSize: "12px", color: "#737373", letterSpacing: "3px", marginBottom: "24px" }),
              comp("paragraph", "For over three decades, Le Blanc has been serving exquisite French cuisine in an atmosphere of timeless elegance. Our Michelin-starred chef creates dishes that celebrate the finest seasonal ingredients.", { fontSize: "17px", color: "#a3a3a3", lineHeight: "1.9", fontFamily: "Georgia, serif" }),
            ],
          }),
        ],
      }),
    ]),
    footerSection("LE BLANC"),
  ]
);

add(
  "Casual Restaurant",
  "Modern casual dining restaurant",
  "restaurant",
  "🍔",
  ["casual", "modern", "bistro", "family"],
  [
    section("header", "Navigation", { backgroundColor: "#fef7e4" }, [modernNav("The Bistro", ["Menu", "Order Online", "Locations", "About"])]),
    section("body", "Hero", { backgroundColor: "#fef7e4", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("heading", "Good Food, Good Mood", { fontSize: "56px", fontWeight: "800", color: "#78350f", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Fresh, locally-sourced ingredients crafted into dishes that bring people together.", { fontSize: "18px", color: "#92400e", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "See Menu", { backgroundColor: "#78350f", color: "#ffffff", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600" }),
                  comp("button", "Order Now", { backgroundColor: "transparent", color: "#78350f", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600", border: "2px solid #78350f" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Food" }),
        ],
      }),
    ]),
    section("body", "Menu", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("heading", "Our Favorites", { fontSize: "36px", fontWeight: "800", textAlign: "center", marginBottom: "48px", color: "#78350f" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1000px", margin: "0 auto" }, {
        children: ["Signature Burger", "Truffle Pasta", "Grilled Salmon"].map(item => comp("card", "", { backgroundColor: "#fef7e4", borderRadius: "16px", overflow: "hidden" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "4/3" }, { src: "/placeholder.svg" }),
            comp("group", "", { padding: "20px" }, {
              children: [
                comp("heading", item, { fontSize: "18px", fontWeight: "700", color: "#78350f", marginBottom: "8px" }),
                comp("text", "$24", { fontSize: "16px", fontWeight: "600", color: "#f59e0b" }),
              ],
            }),
          ],
        })),
      }),
    ]),
    footerSection("The Bistro", false),
  ]
);

add(
  "Sushi Restaurant",
  "Japanese sushi restaurant website",
  "restaurant",
  "🍣",
  ["sushi", "japanese", "asian", "seafood"],
  [
    section("header", "Navigation", { backgroundColor: "#1a1a1a" }, [modernNav("SAKURA", ["Menu", "Omakase", "Reservations", "About"], true)]),
    section("body", "Hero", { backgroundColor: "#1a1a1a", padding: "140px 40px", textAlign: "center" }, [
      comp("text", "鮨", { fontSize: "80px", color: "#c41e3a", marginBottom: "32px" }),
      comp("heading", "SAKURA", { fontSize: "64px", fontWeight: "300", color: "#ffffff", letterSpacing: "12px", marginBottom: "24px" }),
      comp("paragraph", "Authentic Japanese Sushi Experience", { fontSize: "18px", color: "#737373", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "View Menu", { backgroundColor: "#c41e3a", color: "#ffffff", padding: "16px 40px", borderRadius: "4px", fontSize: "14px", fontWeight: "500" }),
          comp("button", "Reserve Table", { backgroundColor: "transparent", color: "#ffffff", padding: "16px 40px", borderRadius: "4px", fontSize: "14px", fontWeight: "500", border: "1px solid #404040" }),
        ],
      }),
    ]),
    section("body", "Featured", { backgroundColor: "#0f0f0f", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "900px", margin: "0 auto" }, {
        children: ["Omakase", "Nigiri Set", "Sashimi"].map(item => comp("group", "", { textAlign: "center" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "4px", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", item, { fontSize: "16px", color: "#ffffff", letterSpacing: "2px" }),
          ],
        })),
      }),
    ]),
    footerSection("SAKURA"),
  ]
);

add(
  "Pizza Restaurant",
  "Italian pizzeria website",
  "restaurant",
  "🍕",
  ["pizza", "italian", "pizzeria", "authentic"],
  [
    section("header", "Navigation", { backgroundColor: "#dc2626" }, [modernNav("NAPOLI", ["Menu", "Order", "Catering", "Locations"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🇮🇹 AUTHENTIC NEAPOLITAN", { fontSize: "14px", color: "#fecaca", marginBottom: "16px" }),
              comp("heading", "Pizza Made with Passion", { fontSize: "52px", fontWeight: "800", color: "#ffffff", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Hand-tossed dough, San Marzano tomatoes, fresh mozzarella. Baked in a 900°F wood-fired oven.", { fontSize: "17px", color: "#fecaca", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Order Now", { backgroundColor: "#ffffff", color: "#dc2626", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "700" }),
                  comp("button", "See Menu", { backgroundColor: "transparent", color: "#ffffff", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600", border: "2px solid #ffffff" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "50%" }, { src: "/placeholder.svg", alt: "Pizza" }),
        ],
      }),
    ]),
    footerSection("NAPOLI"),
  ]
);

add(
  "Cafe & Bakery",
  "Cozy cafe and bakery website",
  "restaurant",
  "☕",
  ["cafe", "bakery", "coffee", "pastry"],
  [
    section("header", "Navigation", { backgroundColor: "#fdf2f8" }, [modernNav("Sweet Crumb", ["Menu", "Order", "Catering", "About"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)", padding: "100px 40px" }, [
      comp("container", "", { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("text", "☕ 🥐 🧁", { fontSize: "48px", marginBottom: "32px" }),
          comp("heading", "Sweet Crumb", { fontSize: "56px", fontWeight: "700", color: "#9d174d", marginBottom: "24px" }),
          comp("paragraph", "Artisan coffee and freshly baked pastries in a cozy neighborhood cafe.", { fontSize: "18px", color: "#be185d", marginBottom: "40px" }),
          comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
            children: [
              comp("button", "View Menu", { backgroundColor: "#ec4899", color: "#ffffff", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600" }),
              comp("button", "Order Ahead", { backgroundColor: "#ffffff", color: "#ec4899", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600", border: "2px solid #ec4899" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Menu", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: ["Espresso", "Croissants", "Sourdough", "Cakes"].map(item => comp("card", "", { backgroundColor: "#fdf2f8", borderRadius: "16px", padding: "24px", textAlign: "center" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "12px", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", item, { fontSize: "16px", fontWeight: "600", color: "#9d174d" }),
          ],
        })),
      }),
    ]),
    footerSection("Sweet Crumb", false),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// EDUCATION TEMPLATES (5)
// ═══════════════════════════════════════════════════════════════════

add(
  "Online Course Platform",
  "Modern online learning platform",
  "education",
  "🎓",
  ["courses", "learning", "online", "education"],
  [
    section("header", "Navigation", { backgroundColor: "#0f172a" }, [modernNav("LearnHub", ["Courses", "Pricing", "For Business", "Login"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #6366f1 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🚀 Trusted by 500,000+ learners", { fontSize: "14px", color: "#a5b4fc", marginBottom: "24px" }),
              comp("heading", "Learn In-Demand Skills", { fontSize: "52px", fontWeight: "800", color: "#ffffff", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Expert-led courses in tech, design, business, and more. Learn at your own pace with lifetime access.", { fontSize: "18px", color: "#94a3b8", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Explore Courses", { backgroundColor: "#6366f1", color: "#ffffff", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
                  comp("button", "Start Free Trial", { backgroundColor: "transparent", color: "#ffffff", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", border: "1px solid #475569" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "16px" }, { src: "/placeholder.svg", alt: "Learning" }),
        ],
      }),
    ]),
    section("body", "Categories", { backgroundColor: "#f8fafc", padding: "80px 40px" }, [
      comp("heading", "Popular Categories", { fontSize: "32px", fontWeight: "800", textAlign: "center", marginBottom: "48px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          featureCard("💻", "Programming", "500+ courses"),
          featureCard("🎨", "Design", "300+ courses"),
          featureCard("📈", "Business", "250+ courses"),
          featureCard("🤖", "AI & ML", "150+ courses"),
        ],
      }),
    ]),
    footerSection("LearnHub"),
  ]
);

add(
  "Coding Bootcamp",
  "Intensive coding bootcamp website",
  "education",
  "💻",
  ["coding", "bootcamp", "programming", "career"],
  [
    section("header", "Navigation", { backgroundColor: "#000000" }, [modernNav("CodeCamp", ["Programs", "Financing", "Outcomes", "Apply"], true)]),
    section("body", "Hero", { backgroundColor: "#000000", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "< 12 WEEKS TO A NEW CAREER />", { fontSize: "14px", color: "#22c55e", fontFamily: "monospace", marginBottom: "32px" }),
      comp("heading", "Become a Software Engineer", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Intensive, immersive coding bootcamp with 95% job placement rate. Pay only when you get hired.", { fontSize: "18px", color: "#737373", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "Apply Now", { backgroundColor: "#22c55e", color: "#000000", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "700" }),
          comp("button", "Curriculum", { backgroundColor: "transparent", color: "#ffffff", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", border: "1px solid #374151" }),
        ],
      }),
    ]),
    section("body", "Stats", { backgroundColor: "#0a0a0a", padding: "60px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "95%", { fontSize: "48px", fontWeight: "800", color: "#22c55e" }), comp("text", "Job Placement", { fontSize: "14px", color: "#737373" })] }),
          comp("group", "", {}, { children: [comp("text", "$85K", { fontSize: "48px", fontWeight: "800", color: "#22c55e" }), comp("text", "Avg Salary", { fontSize: "14px", color: "#737373" })] }),
          comp("group", "", {}, { children: [comp("text", "500+", { fontSize: "48px", fontWeight: "800", color: "#22c55e" }), comp("text", "Hiring Partners", { fontSize: "14px", color: "#737373" })] }),
          comp("group", "", {}, { children: [comp("text", "5000+", { fontSize: "48px", fontWeight: "800", color: "#22c55e" }), comp("text", "Graduates", { fontSize: "14px", color: "#737373" })] }),
        ],
      }),
    ]),
    footerSection("CodeCamp"),
  ]
);

add(
  "Language School",
  "Language learning school website",
  "education",
  "🌍",
  ["language", "school", "learning", "international"],
  [
    section("header", "Navigation", { backgroundColor: "#ffffff" }, [modernNav("LinguaWorld", ["Languages", "Programs", "Online", "Contact"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🌍 15+ Languages Available", { fontSize: "14px", color: "#6366f1", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "Speak the World", { fontSize: "52px", fontWeight: "800", color: "#0f172a", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Learn a new language with native speakers. Flexible schedules, immersive methods, and proven results.", { fontSize: "17px", color: "#475569", marginBottom: "32px" }),
              comp("button", "Start Learning", { backgroundColor: "#6366f1", color: "#ffffff", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
            ],
          }),
          comp("container", "", { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }, {
            children: ["🇪🇸 Spanish", "🇫🇷 French", "🇩🇪 German", "🇯🇵 Japanese"].map(lang => comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }, {
              children: [comp("text", lang, { fontSize: "18px", fontWeight: "600", color: "#0f172a" })],
            })),
          }),
        ],
      }),
    ]),
    footerSection("LinguaWorld", false),
  ]
);

add(
  "University Website",
  "Modern university landing page",
  "education",
  "🏛️",
  ["university", "college", "academic", "higher education"],
  [
    section("header", "Navigation", { backgroundColor: "#1e3a5f" }, [modernNav("State University", ["Admissions", "Academics", "Campus Life", "Research"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "WELCOME TO", { fontSize: "14px", color: "#93c5fd", letterSpacing: "3px", marginBottom: "24px" }),
      comp("heading", "State University", { fontSize: "64px", fontWeight: "700", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Where innovation meets tradition. Preparing tomorrow's leaders since 1892.", { fontSize: "20px", color: "#bfdbfe", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "Apply Now", { backgroundColor: "#f59e0b", color: "#0f172a", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "700" }),
          comp("button", "Virtual Tour", { backgroundColor: "transparent", color: "#ffffff", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", border: "2px solid #ffffff" }),
        ],
      }),
    ]),
    section("body", "Stats", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "25,000+", { fontSize: "40px", fontWeight: "800", color: "#1e3a5f" }), comp("text", "Students", { fontSize: "14px", color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "200+", { fontSize: "40px", fontWeight: "800", color: "#1e3a5f" }), comp("text", "Programs", { fontSize: "14px", color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "#15", { fontSize: "40px", fontWeight: "800", color: "#1e3a5f" }), comp("text", "National Ranking", { fontSize: "14px", color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "95%", { fontSize: "40px", fontWeight: "800", color: "#1e3a5f" }), comp("text", "Employment Rate", { fontSize: "14px", color: "#64748b" })] }),
        ],
      }),
    ]),
    footerSection("State University"),
  ]
);

add(
  "Kids Learning",
  "Fun educational website for kids",
  "education",
  "🧒",
  ["kids", "children", "fun", "interactive"],
  [
    section("header", "Navigation", { backgroundColor: "#fef3c7" }, [modernNav("FunLearn", ["Games", "Lessons", "Parents", "Subscribe"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)", padding: "80px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("text", "🎮 🎨 📚 🧮", { fontSize: "64px", marginBottom: "32px" }),
          comp("heading", "Learning is Fun!", { fontSize: "56px", fontWeight: "800", color: "#78350f", marginBottom: "24px" }),
          comp("paragraph", "Educational games, interactive lessons, and fun activities for kids ages 3-12!", { fontSize: "20px", color: "#92400e", marginBottom: "40px" }),
          comp("button", "Start Playing Free", { backgroundColor: "#f97316", color: "#ffffff", padding: "20px 48px", borderRadius: "50px", fontSize: "18px", fontWeight: "700" }),
        ],
      }),
    ]),
    section("body", "Subjects", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "900px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#fef3c7", borderRadius: "24px", padding: "32px", textAlign: "center" }, { children: [comp("text", "🔢", { fontSize: "48px", marginBottom: "16px" }), comp("text", "Math", { fontSize: "18px", fontWeight: "700", color: "#78350f" })] }),
          comp("card", "", { backgroundColor: "#dcfce7", borderRadius: "24px", padding: "32px", textAlign: "center" }, { children: [comp("text", "📖", { fontSize: "48px", marginBottom: "16px" }), comp("text", "Reading", { fontSize: "18px", fontWeight: "700", color: "#166534" })] }),
          comp("card", "", { backgroundColor: "#dbeafe", borderRadius: "24px", padding: "32px", textAlign: "center" }, { children: [comp("text", "🔬", { fontSize: "48px", marginBottom: "16px" }), comp("text", "Science", { fontSize: "18px", fontWeight: "700", color: "#1e40af" })] }),
          comp("card", "", { backgroundColor: "#fce7f3", borderRadius: "24px", padding: "32px", textAlign: "center" }, { children: [comp("text", "🎨", { fontSize: "48px", marginBottom: "16px" }), comp("text", "Art", { fontSize: "18px", fontWeight: "700", color: "#9d174d" })] }),
        ],
      }),
    ]),
    footerSection("FunLearn", false),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// HTTP HANDLER
// ═══════════════════════════════════════════════════════════════════

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mode = "upsert" } = await req.json().catch(() => ({}));

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Optionally reset existing templates
    if (mode === "reset") {
      await supabase.from("templates").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    }

    // Get existing template names to avoid duplicates
    const { data: existing } = await supabase.from("templates").select("name");
    const existingNames = new Set((existing || []).map((t: any) => t.name));

    // Filter new templates
    const newTemplates = allTemplates.filter((t) => !existingNames.has(t.name));

    // Insert in batches
    const batchSize = 10;
    let inserted = 0;
    for (let i = 0; i < newTemplates.length; i += batchSize) {
      const batch = newTemplates.slice(i, i + batchSize);
      const { error } = await supabase.from("templates").insert(batch);
      if (error) {
        console.error("Batch insert error:", error);
      } else {
        inserted += batch.length;
      }
    }

    // Count by category
    const categories: Record<string, number> = {};
    for (const t of allTemplates) {
      categories[t.category] = (categories[t.category] || 0) + 1;
    }

    return new Response(
      JSON.stringify({
        success: true,
        total: allTemplates.length,
        inserted,
        skipped: allTemplates.length - newTemplates.length,
        categories,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
