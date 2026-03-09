import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const uid = (prefix = "c") => `${prefix}-${crypto.randomUUID().slice(0, 8)}`;

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

const section = (sType: string, label: string, styles: Record<string, string>, components: any[]) => ({
  id: uid("sec"),
  type: sType,
  label,
  styles: { padding: "60px 20px", ...styles },
  components,
});

const nav = (brand: string, links: string[], dark = false) => comp(
  "navbar", "",
  { backgroundColor: dark ? "#0f172a" : "#ffffff", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: dark ? "1px solid #1e293b" : "1px solid #e2e8f0" },
  { brandName: brand, links, sticky: true, textColor: dark ? "#ffffff" : "#0f172a" }
);

const footer = (brand: string, dark = true) => section("footer", "Footer",
  { backgroundColor: dark ? "#0f172a" : "#f8fafc", padding: "60px 40px 30px" },
  [
    comp("container", "", { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", maxWidth: "1200px", margin: "0 auto" }, {
      children: [
        comp("group", "", {}, { children: [
          comp("heading", brand, { fontSize: "24px", fontWeight: "800", color: dark ? "#ffffff" : "#0f172a", marginBottom: "16px" }),
          comp("paragraph", "Building amazing digital experiences with modern technology.", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", lineHeight: "1.6" }),
        ]}),
        comp("group", "", {}, { children: [
          comp("text", "Product", { fontSize: "14px", fontWeight: "700", color: dark ? "#ffffff" : "#0f172a", marginBottom: "16px" }),
          comp("text", "Features", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px" }),
          comp("text", "Pricing", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px" }),
        ]}),
        comp("group", "", {}, { children: [
          comp("text", "Company", { fontSize: "14px", fontWeight: "700", color: dark ? "#ffffff" : "#0f172a", marginBottom: "16px" }),
          comp("text", "About", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px" }),
          comp("text", "Blog", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px" }),
        ]}),
        comp("group", "", {}, { children: [
          comp("text", "Legal", { fontSize: "14px", fontWeight: "700", color: dark ? "#ffffff" : "#0f172a", marginBottom: "16px" }),
          comp("text", "Privacy", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px" }),
          comp("text", "Terms", { fontSize: "15px", color: dark ? "#94a3b8" : "#64748b", marginBottom: "12px" }),
        ]}),
      ],
    }),
    comp("divider", "", { backgroundColor: dark ? "#1e293b" : "#e2e8f0", height: "1px", margin: "40px 0 20px" }),
    comp("text", `© 2024 ${brand}. All rights reserved.`, { fontSize: "14px", color: dark ? "#64748b" : "#94a3b8", textAlign: "center" }),
  ]
);

const card = (icon: string, title: string, desc: string, bg = "#f8fafc") => comp("card", "",
  { backgroundColor: bg, padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", textAlign: "center" },
  { children: [
    comp("text", icon, { fontSize: "48px", marginBottom: "16px" }),
    comp("heading", title, { fontSize: "20px", fontWeight: "700", marginBottom: "12px", color: "#0f172a" }),
    comp("paragraph", desc, { fontSize: "15px", color: "#64748b", lineHeight: "1.6" }),
  ]}
);

const allTemplates: any[] = [];

const add = (name: string, desc: string, cat: string, thumb: string, tags: string[], sections: any[]) => {
  allTemplates.push({
    name,
    description: desc,
    category: cat,
    thumbnail: thumb,
    tags,
    is_public: true,
    is_premium: Math.random() > 0.6,
    installs: Math.floor(Math.random() * 400) + 100,
    schema: { id: `page-${name.toLowerCase().replace(/\s+/g, "-")}`, name, sections },
  });
};

// ═══════════════════════════════════════════════════════════════════
// SAAS TEMPLATES
// ═══════════════════════════════════════════════════════════════════

add("SaaS Cloud Storage", "Modern cloud storage platform with file management features", "saas", "☁️", ["cloud", "storage", "files", "backup"],
  [
    section("header", "Nav", { backgroundColor: "#0f172a" }, [nav("CloudVault", ["Features", "Pricing", "Security", "Login"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "☁️", { fontSize: "80px", marginBottom: "32px" }),
      comp("heading", "Your Files, Everywhere", { fontSize: "60px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Secure cloud storage with end-to-end encryption. Access your files from any device, anywhere.", { fontSize: "20px", color: "#93c5fd", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "Start Free", { backgroundColor: "#3b82f6", color: "#ffffff", padding: "18px 48px", borderRadius: "12px", fontSize: "18px", fontWeight: "700" }),
          comp("button", "See Plans", { backgroundColor: "transparent", color: "#ffffff", padding: "18px 48px", borderRadius: "12px", fontSize: "18px", border: "2px solid #3b82f6" }),
        ],
      }),
    ]),
    section("body", "Features", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("heading", "Why CloudVault?", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }, {
        children: [
          card("🔒", "End-to-End Encryption", "Your files are encrypted before they leave your device"),
          card("⚡", "Lightning Fast", "Upload and download at blazing speeds"),
          card("🔄", "Auto Sync", "Changes sync instantly across all devices"),
          card("📱", "Mobile Apps", "Native apps for iOS and Android"),
        ],
      }),
    ]),
    section("body", "Pricing", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("heading", "Simple Pricing", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "900px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#f8fafc", padding: "40px", borderRadius: "20px", textAlign: "center" }, {
            children: [
              comp("text", "Free", { fontSize: "24px", fontWeight: "700", marginBottom: "16px" }),
              comp("text", "5GB", { fontSize: "48px", fontWeight: "800", color: "#0f172a" }),
              comp("text", "storage", { fontSize: "16px", color: "#64748b", marginBottom: "32px" }),
              comp("button", "Get Started", { backgroundColor: "#e2e8f0", color: "#0f172a", padding: "14px 32px", borderRadius: "10px", width: "100%" }),
            ],
          }),
          comp("card", "", { backgroundColor: "#3b82f6", padding: "40px", borderRadius: "20px", textAlign: "center", transform: "scale(1.05)" }, {
            children: [
              comp("text", "Pro", { fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "16px" }),
              comp("text", "2TB", { fontSize: "48px", fontWeight: "800", color: "#ffffff" }),
              comp("text", "$9.99/mo", { fontSize: "16px", color: "#bfdbfe", marginBottom: "32px" }),
              comp("button", "Start Trial", { backgroundColor: "#ffffff", color: "#3b82f6", padding: "14px 32px", borderRadius: "10px", width: "100%", fontWeight: "600" }),
            ],
          }),
          comp("card", "", { backgroundColor: "#f8fafc", padding: "40px", borderRadius: "20px", textAlign: "center" }, {
            children: [
              comp("text", "Business", { fontSize: "24px", fontWeight: "700", marginBottom: "16px" }),
              comp("text", "Unlimited", { fontSize: "48px", fontWeight: "800", color: "#0f172a" }),
              comp("text", "$29.99/mo", { fontSize: "16px", color: "#64748b", marginBottom: "32px" }),
              comp("button", "Contact Sales", { backgroundColor: "#e2e8f0", color: "#0f172a", padding: "14px 32px", borderRadius: "10px", width: "100%" }),
            ],
          }),
        ],
      }),
    ]),
    footer("CloudVault"),
  ]
);

add("SaaS Invoicing", "Professional invoicing and billing platform", "saas", "🧾", ["invoicing", "billing", "finance", "payments"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("InvoiceFlow", ["Features", "Pricing", "Templates", "Login"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "💰 Get paid faster", { fontSize: "14px", color: "#059669", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "Professional Invoices in Seconds", { fontSize: "52px", fontWeight: "800", color: "#064e3b", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Create beautiful invoices, track payments, and get paid 3x faster with automated reminders.", { fontSize: "18px", color: "#047857", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Start Free", { backgroundColor: "#059669", color: "#ffffff", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
                  comp("button", "See Demo", { backgroundColor: "#ffffff", color: "#059669", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", border: "2px solid #059669" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "16px", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }, { src: "/placeholder.svg", alt: "Invoice Dashboard" }),
        ],
      }),
    ]),
    section("body", "Stats", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "$2B+", { fontSize: "48px", fontWeight: "800", color: "#059669" }), comp("text", "Invoiced", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "50K+", { fontSize: "48px", fontWeight: "800", color: "#059669" }), comp("text", "Businesses", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "3x", { fontSize: "48px", fontWeight: "800", color: "#059669" }), comp("text", "Faster Payments", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "99.9%", { fontSize: "48px", fontWeight: "800", color: "#059669" }), comp("text", "Uptime", { color: "#64748b" })] }),
        ],
      }),
    ]),
    footer("InvoiceFlow", false),
  ]
);

add("SaaS Helpdesk", "Customer support and ticketing platform", "saas", "🎫", ["helpdesk", "support", "tickets", "customer service"],
  [
    section("header", "Nav", { backgroundColor: "#7c3aed" }, [nav("SupportHub", ["Features", "Pricing", "Resources", "Login"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "🎫", { fontSize: "72px", marginBottom: "32px" }),
      comp("heading", "Customer Support Made Simple", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "All-in-one helpdesk software to manage tickets, live chat, and knowledge base.", { fontSize: "20px", color: "#e9d5ff", marginBottom: "48px" }),
      comp("button", "Start Free Trial", { backgroundColor: "#ffffff", color: "#7c3aed", padding: "18px 48px", borderRadius: "12px", fontSize: "18px", fontWeight: "700" }),
    ]),
    section("body", "Features", { backgroundColor: "#faf5ff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          card("💬", "Live Chat", "Real-time chat with customers on your website", "#ffffff"),
          card("📧", "Email Tickets", "Convert emails to tickets automatically", "#ffffff"),
          card("📚", "Knowledge Base", "Self-service portal for common questions", "#ffffff"),
          card("🤖", "AI Assistant", "Automate responses with AI", "#ffffff"),
          card("📊", "Analytics", "Track response times and satisfaction", "#ffffff"),
          card("🔗", "Integrations", "Connect with 100+ tools", "#ffffff"),
        ],
      }),
    ]),
    footer("SupportHub"),
  ]
);

add("SaaS Survey Tool", "Online survey and form builder platform", "saas", "📊", ["survey", "forms", "feedback", "research"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("FormGenius", ["Templates", "Features", "Pricing", "Login"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("heading", "Build Forms That Convert", { fontSize: "52px", fontWeight: "800", color: "#0f172a", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Create beautiful surveys, quizzes, and forms with our drag-and-drop builder. No coding required.", { fontSize: "18px", color: "#64748b", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Start Building", { backgroundColor: "#f97316", color: "#ffffff", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
                  comp("button", "See Templates", { backgroundColor: "#fff7ed", color: "#f97316", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }, { src: "/placeholder.svg", alt: "Form Builder" }),
        ],
      }),
    ]),
    section("body", "Templates", { backgroundColor: "#fff7ed", padding: "100px 40px" }, [
      comp("heading", "Start with a Template", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "📋", { fontSize: "40px", marginBottom: "12px" }), comp("text", "Contact Form", { fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "⭐", { fontSize: "40px", marginBottom: "12px" }), comp("text", "Feedback Survey", { fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "📝", { fontSize: "40px", marginBottom: "12px" }), comp("text", "Registration", { fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🎯", { fontSize: "40px", marginBottom: "12px" }), comp("text", "Lead Capture", { fontWeight: "600" })] }),
        ],
      }),
    ]),
    footer("FormGenius", false),
  ]
);

add("SaaS Social Scheduler", "Social media scheduling and management", "saas", "📱", ["social", "scheduling", "marketing", "automation"],
  [
    section("header", "Nav", { backgroundColor: "#0f172a" }, [nav("SocialPilot", ["Features", "Pricing", "Blog", "Login"], true)]),
    section("body", "Hero", { background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center", marginBottom: "32px" }, {
        children: ["📘", "📸", "🐦", "💼", "📌"].map(e => comp("text", e, { fontSize: "32px" })),
      }),
      comp("heading", "Schedule Posts Like a Pro", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Plan, schedule, and publish content across all your social channels from one dashboard.", { fontSize: "20px", color: "#94a3b8", marginBottom: "48px" }),
      comp("button", "Try Free for 14 Days", { backgroundColor: "#3b82f6", color: "#ffffff", padding: "18px 48px", borderRadius: "12px", fontSize: "18px", fontWeight: "700" }),
    ]),
    section("body", "Features", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          card("📅", "Visual Calendar", "See all your content at a glance"),
          card("🤖", "Auto-Posting", "Schedule weeks of content in advance"),
          card("📊", "Analytics", "Track engagement and growth"),
        ],
      }),
    ]),
    footer("SocialPilot"),
  ]
);

add("SaaS Password Manager", "Secure password and credential manager", "saas", "🔐", ["security", "passwords", "vault", "encryption"],
  [
    section("header", "Nav", { backgroundColor: "#1e1b4b" }, [nav("VaultPass", ["Features", "Pricing", "Security", "Download"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", padding: "140px 40px", textAlign: "center" }, [
      comp("text", "🔐", { fontSize: "80px", marginBottom: "32px" }),
      comp("heading", "One Password to Rule Them All", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Military-grade encryption for all your passwords. Access them anywhere, on any device.", { fontSize: "20px", color: "#a5b4fc", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "Get VaultPass Free", { backgroundColor: "#6366f1", color: "#ffffff", padding: "18px 48px", borderRadius: "12px", fontSize: "18px", fontWeight: "700" }),
        ],
      }),
    ]),
    section("body", "Security", { backgroundColor: "#0f0f1a", padding: "80px 40px" }, [
      comp("container", "", { display: "flex", justifyContent: "center", gap: "60px" }, {
        children: ["AES-256", "Zero-Knowledge", "2FA", "Biometric"].map(s => comp("text", s, { fontSize: "14px", color: "#94a3b8", padding: "12px 24px", border: "1px solid #334155", borderRadius: "8px" })),
      }),
    ]),
    footer("VaultPass"),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// AGENCY TEMPLATES
// ═══════════════════════════════════════════════════════════════════

add("Motion Design Agency", "Creative motion design and animation studio", "agency", "🎬", ["motion", "animation", "video", "creative"],
  [
    section("header", "Nav", { backgroundColor: "#000000" }, [nav("MOTION LAB", ["Work", "Services", "Showreel", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#000000", padding: "160px 40px", textAlign: "center" }, [
      comp("heading", "WE MAKE THINGS MOVE", { fontSize: "80px", fontWeight: "900", color: "#ffffff", letterSpacing: "-2px", marginBottom: "32px" }),
      comp("paragraph", "Motion design studio crafting animations for brands that want to stand out.", { fontSize: "20px", color: "#737373", marginBottom: "48px" }),
      comp("button", "PLAY SHOWREEL", { backgroundColor: "#ffffff", color: "#000000", padding: "20px 60px", fontSize: "14px", fontWeight: "700", letterSpacing: "2px", borderRadius: "50px" }),
    ]),
    section("body", "Services", { backgroundColor: "#0a0a0a", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("group", "", { borderTop: "1px solid #333", paddingTop: "32px" }, { children: [comp("text", "2D Animation", { fontSize: "24px", color: "#ffffff", fontWeight: "500" })] }),
          comp("group", "", { borderTop: "1px solid #333", paddingTop: "32px" }, { children: [comp("text", "3D Motion", { fontSize: "24px", color: "#ffffff", fontWeight: "500" })] }),
          comp("group", "", { borderTop: "1px solid #333", paddingTop: "32px" }, { children: [comp("text", "Visual Effects", { fontSize: "24px", color: "#ffffff", fontWeight: "500" })] }),
        ],
      }),
    ]),
    footer("MOTION LAB"),
  ]
);

add("SEO Agency", "Search engine optimization and digital marketing", "agency", "🔍", ["seo", "marketing", "search", "rankings"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("RankRise", ["Services", "Case Studies", "Pricing", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "📈 #1 SEO Agency", { fontSize: "14px", color: "#16a34a", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "Dominate Search Results", { fontSize: "52px", fontWeight: "800", color: "#0f172a", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Data-driven SEO strategies that boost your rankings and drive organic traffic.", { fontSize: "18px", color: "#64748b", marginBottom: "32px" }),
              comp("button", "Free SEO Audit", { backgroundColor: "#16a34a", color: "#ffffff", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
            ],
          }),
          comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }, {
            children: [
              comp("card", "", { backgroundColor: "#f0fdf4", padding: "24px", borderRadius: "12px" }, { children: [comp("text", "+312%", { fontSize: "32px", fontWeight: "800", color: "#16a34a" }), comp("text", "Organic Traffic", { color: "#64748b" })] }),
              comp("card", "", { backgroundColor: "#f0fdf4", padding: "24px", borderRadius: "12px" }, { children: [comp("text", "Page 1", { fontSize: "32px", fontWeight: "800", color: "#16a34a" }), comp("text", "Rankings", { color: "#64748b" })] }),
              comp("card", "", { backgroundColor: "#f0fdf4", padding: "24px", borderRadius: "12px" }, { children: [comp("text", "500+", { fontSize: "32px", fontWeight: "800", color: "#16a34a" }), comp("text", "Keywords", { color: "#64748b" })] }),
              comp("card", "", { backgroundColor: "#f0fdf4", padding: "24px", borderRadius: "12px" }, { children: [comp("text", "10x", { fontSize: "32px", fontWeight: "800", color: "#16a34a" }), comp("text", "ROI", { color: "#64748b" })] }),
            ],
          }),
        ],
      }),
    ]),
    footer("RankRise", false),
  ]
);

add("Content Agency", "Content marketing and copywriting agency", "agency", "✍️", ["content", "copywriting", "marketing", "writing"],
  [
    section("header", "Nav", { backgroundColor: "#fef7e4" }, [nav("WordCraft", ["Services", "Work", "Blog", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#fef7e4", padding: "120px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("heading", "Words That Sell", { fontSize: "64px", fontWeight: "300", color: "#1a1a1a", marginBottom: "32px", fontFamily: "Georgia, serif" }),
          comp("paragraph", "We craft compelling content that connects with your audience and drives conversions. From blogs to brand stories, we make words work.", { fontSize: "20px", color: "#525252", lineHeight: "1.7", marginBottom: "48px", fontFamily: "Georgia, serif" }),
          comp("button", "Let's Talk Content", { backgroundColor: "#1a1a1a", color: "#ffffff", padding: "18px 48px", borderRadius: "4px", fontSize: "16px", fontWeight: "500" }),
        ],
      }),
    ]),
    section("body", "Services", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("group", "", { textAlign: "center" }, { children: [comp("text", "📝", { fontSize: "40px", marginBottom: "16px" }), comp("text", "Blog Posts", { fontSize: "18px", fontWeight: "600" })] }),
          comp("group", "", { textAlign: "center" }, { children: [comp("text", "📄", { fontSize: "40px", marginBottom: "16px" }), comp("text", "Copywriting", { fontSize: "18px", fontWeight: "600" })] }),
          comp("group", "", { textAlign: "center" }, { children: [comp("text", "📧", { fontSize: "40px", marginBottom: "16px" }), comp("text", "Email Marketing", { fontSize: "18px", fontWeight: "600" })] }),
          comp("group", "", { textAlign: "center" }, { children: [comp("text", "📱", { fontSize: "40px", marginBottom: "16px" }), comp("text", "Social Content", { fontSize: "18px", fontWeight: "600" })] }),
        ],
      }),
    ]),
    footer("WordCraft", false),
  ]
);

add("PR Agency", "Public relations and media agency", "agency", "📰", ["pr", "media", "communications", "press"],
  [
    section("header", "Nav", { backgroundColor: "#0f172a" }, [nav("Amplify PR", ["Services", "Clients", "Press", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#0f172a", padding: "140px 40px", textAlign: "center" }, [
      comp("heading", "Shape Your Story", { fontSize: "64px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Strategic public relations that gets your brand in front of the right audiences.", { fontSize: "20px", color: "#94a3b8", marginBottom: "48px" }),
      comp("button", "Schedule Consultation", { backgroundColor: "#f59e0b", color: "#0f172a", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "700" }),
    ]),
    section("body", "Press", { backgroundColor: "#0f172a", padding: "60px 40px" }, [
      comp("text", "Featured In", { fontSize: "14px", color: "#64748b", textAlign: "center", marginBottom: "32px" }),
      comp("container", "", { display: "flex", justifyContent: "center", gap: "60px", opacity: "0.5" }, {
        children: ["Forbes", "TechCrunch", "WSJ", "Bloomberg", "Fast Company"].map(p => comp("text", p, { fontSize: "18px", color: "#94a3b8", fontWeight: "600" })),
      }),
    ]),
    footer("Amplify PR"),
  ]
);

add("Event Agency", "Event planning and production agency", "agency", "🎪", ["events", "production", "planning", "experiences"],
  [
    section("header", "Nav", { backgroundColor: "#ec4899" }, [nav("EventSpark", ["Services", "Portfolio", "About", "Contact"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)", padding: "140px 40px", textAlign: "center" }, [
      comp("text", "🎉", { fontSize: "80px", marginBottom: "32px" }),
      comp("heading", "Unforgettable Events", { fontSize: "64px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "From intimate gatherings to grand galas, we create experiences people remember forever.", { fontSize: "20px", color: "#fce7f3", marginBottom: "48px" }),
      comp("button", "Plan Your Event", { backgroundColor: "#ffffff", color: "#ec4899", padding: "18px 48px", borderRadius: "50px", fontSize: "16px", fontWeight: "700" }),
    ]),
    section("body", "Services", { backgroundColor: "#fdf2f8", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "💒", { fontSize: "40px", marginBottom: "16px" }), comp("text", "Weddings", { fontSize: "16px", fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🏢", { fontSize: "40px", marginBottom: "16px" }), comp("text", "Corporate", { fontSize: "16px", fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🎂", { fontSize: "40px", marginBottom: "16px" }), comp("text", "Private", { fontSize: "16px", fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🎪", { fontSize: "40px", marginBottom: "16px" }), comp("text", "Festivals", { fontSize: "16px", fontWeight: "600" })] }),
        ],
      }),
    ]),
    footer("EventSpark", false),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// PORTFOLIO TEMPLATES
// ═══════════════════════════════════════════════════════════════════

add("UI Designer Portfolio", "Modern UI/UX designer portfolio", "portfolio", "🎨", ["ui", "ux", "designer", "product"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("Sarah Kim", ["Work", "About", "Process", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#f8fafc", padding: "120px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "Product Designer", { fontSize: "14px", color: "#6366f1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }),
              comp("heading", "I design digital products that make people smile.", { fontSize: "48px", fontWeight: "700", color: "#0f172a", marginBottom: "24px", lineHeight: "1.2" }),
              comp("paragraph", "5+ years crafting user experiences for startups and Fortune 500 companies.", { fontSize: "17px", color: "#64748b", marginBottom: "32px" }),
              comp("button", "View Work", { backgroundColor: "#6366f1", color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600" }),
            ],
          }),
          comp("image", "", { width: "100%", aspectRatio: "1/1", borderRadius: "24px", backgroundColor: "#e2e8f0" }, { src: "/placeholder.svg", alt: "Sarah" }),
        ],
      }),
    ]),
    section("body", "Work", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px", maxWidth: "1000px", margin: "0 auto" }, {
        children: Array.from({ length: 4 }).map(() => comp("card", "", { backgroundColor: "#f8fafc", borderRadius: "16px", overflow: "hidden" }, {
          children: [comp("image", "", { width: "100%", aspectRatio: "16/10" }, { src: "/placeholder.svg" })],
        })),
      }),
    ]),
    footer("Sarah Kim", false),
  ]
);

add("Brand Designer Portfolio", "Creative brand designer portfolio", "portfolio", "🎯", ["brand", "identity", "designer", "creative"],
  [
    section("header", "Nav", { backgroundColor: "#1a1a1a" }, [nav("ALEX BRAND", ["Work", "About", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#1a1a1a", padding: "180px 40px" }, [
      comp("container", "", { maxWidth: "900px" }, {
        children: [
          comp("text", "BRAND DESIGNER & STRATEGIST", { fontSize: "12px", color: "#737373", letterSpacing: "4px", marginBottom: "40px" }),
          comp("heading", "I help brands find their voice and visual identity.", { fontSize: "56px", fontWeight: "300", color: "#ffffff", lineHeight: "1.2" }),
        ],
      }),
    ]),
    section("body", "Work", { backgroundColor: "#0f0f0f", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", maxWidth: "1200px", margin: "0 auto" }, {
        children: Array.from({ length: 4 }).map(() => comp("image", "", { width: "100%", aspectRatio: "4/3", backgroundColor: "#262626" }, { src: "/placeholder.svg" })),
      }),
    ]),
    footer("ALEX BRAND"),
  ]
);

add("Frontend Developer Portfolio", "Modern frontend developer portfolio", "portfolio", "⚛️", ["frontend", "react", "developer", "web"],
  [
    section("header", "Nav", { backgroundColor: "#0f172a" }, [nav("dev.mike", ["Projects", "Skills", "Blog", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#0f172a", padding: "140px 40px" }, [
      comp("container", "", { maxWidth: "700px" }, {
        children: [
          comp("text", "const greeting = () =>", { fontSize: "16px", color: "#6366f1", fontFamily: "monospace", marginBottom: "16px" }),
          comp("heading", "Hi, I'm Mike 👋", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "16px" }),
          comp("heading", "Frontend Developer", { fontSize: "40px", fontWeight: "300", color: "#94a3b8", marginBottom: "32px" }),
          comp("paragraph", "I build fast, accessible, and beautiful web applications with React, TypeScript, and modern CSS.", { fontSize: "18px", color: "#64748b", marginBottom: "40px", lineHeight: "1.7" }),
          comp("container", "", { display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }, {
            children: ["React", "TypeScript", "Next.js", "Tailwind", "Node.js"].map(s => comp("text", s, { fontSize: "14px", color: "#94a3b8", padding: "8px 16px", backgroundColor: "#1e293b", borderRadius: "6px" })),
          }),
          comp("container", "", { display: "flex", gap: "16px" }, {
            children: [
              comp("button", "View Projects", { backgroundColor: "#6366f1", color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600" }),
              comp("button", "GitHub", { backgroundColor: "#1e293b", color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600" }),
            ],
          }),
        ],
      }),
    ]),
    footer("dev.mike"),
  ]
);

add("Creative Director Portfolio", "Executive creative director portfolio", "portfolio", "🎭", ["creative", "director", "executive", "leadership"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("James Cole", ["Work", "About", "Speaking", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#ffffff", padding: "160px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("heading", "James Cole", { fontSize: "72px", fontWeight: "200", color: "#0f172a", marginBottom: "24px", letterSpacing: "-2px" }),
          comp("paragraph", "Creative Director with 15+ years leading award-winning campaigns for global brands.", { fontSize: "20px", color: "#64748b", lineHeight: "1.7", marginBottom: "48px" }),
          comp("container", "", { display: "flex", gap: "24px", justifyContent: "center" }, {
            children: [
              comp("text", "Ex-Ogilvy", { fontSize: "14px", color: "#94a3b8" }),
              comp("text", "Ex-Wieden+Kennedy", { fontSize: "14px", color: "#94a3b8" }),
              comp("text", "Ex-BBDO", { fontSize: "14px", color: "#94a3b8" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Awards", { backgroundColor: "#f8fafc", padding: "80px 40px" }, [
      comp("container", "", { display: "flex", justifyContent: "center", gap: "60px" }, {
        children: ["🏆 Cannes Lions x5", "🎖️ D&AD x3", "⭐ One Show x4"].map(a => comp("text", a, { fontSize: "16px", color: "#475569", fontWeight: "500" })),
      }),
    ]),
    footer("James Cole", false),
  ]
);

add("Data Scientist Portfolio", "Technical data science portfolio", "portfolio", "📊", ["data", "science", "ml", "analytics"],
  [
    section("header", "Nav", { backgroundColor: "#1e1b4b" }, [nav("Dr. Analytics", ["Projects", "Research", "Publications", "Contact"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", padding: "140px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto" }, {
        children: [
          comp("text", "📊 Data Scientist & ML Engineer", { fontSize: "14px", color: "#a5b4fc", marginBottom: "24px" }),
          comp("heading", "Dr. Emily Chen", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
          comp("paragraph", "Stanford PhD. Ex-Google AI. Building ML systems that solve real-world problems.", { fontSize: "18px", color: "#c7d2fe", marginBottom: "40px" }),
          comp("container", "", { display: "flex", gap: "12px", flexWrap: "wrap" }, {
            children: ["Python", "TensorFlow", "PyTorch", "SQL", "Spark", "AWS"].map(s => comp("text", s, { fontSize: "13px", color: "#a5b4fc", padding: "8px 16px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "6px" })),
          }),
        ],
      }),
    ]),
    section("body", "Stats", { backgroundColor: "#0f0d2a", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "50+", { fontSize: "40px", fontWeight: "800", color: "#a5b4fc" }), comp("text", "Publications", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "10K+", { fontSize: "40px", fontWeight: "800", color: "#a5b4fc" }), comp("text", "Citations", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "15+", { fontSize: "40px", fontWeight: "800", color: "#a5b4fc" }), comp("text", "Patents", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "3", { fontSize: "40px", fontWeight: "800", color: "#a5b4fc" }), comp("text", "Startups", { color: "#64748b" })] }),
        ],
      }),
    ]),
    footer("Dr. Analytics"),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// ECOMMERCE TEMPLATES
// ═══════════════════════════════════════════════════════════════════

add("Sneaker Store", "Modern sneaker and streetwear store", "ecommerce", "👟", ["sneakers", "streetwear", "fashion", "shoes"],
  [
    section("header", "Nav", { backgroundColor: "#0f0f0f" }, [nav("KICKZ", ["New Drops", "Men", "Women", "Sale", "Cart"], true)]),
    section("body", "Hero", { backgroundColor: "#0f0f0f", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🔥 NEW DROP", { fontSize: "14px", color: "#ef4444", fontWeight: "700", marginBottom: "16px" }),
              comp("heading", "Air Max Retro '97", { fontSize: "56px", fontWeight: "900", color: "#ffffff", marginBottom: "24px" }),
              comp("text", "$189", { fontSize: "36px", fontWeight: "800", color: "#ffffff", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Shop Now", { backgroundColor: "#ffffff", color: "#0f0f0f", padding: "16px 48px", borderRadius: "0", fontSize: "16px", fontWeight: "700" }),
                  comp("button", "View All", { backgroundColor: "transparent", color: "#ffffff", padding: "16px 48px", borderRadius: "0", fontSize: "16px", fontWeight: "600", border: "2px solid #ffffff" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", transform: "rotate(-15deg)" }, { src: "/placeholder.svg", alt: "Sneaker" }),
        ],
      }),
    ]),
    section("body", "Products", { backgroundColor: "#1a1a1a", padding: "80px 40px" }, [
      comp("heading", "Trending Now", { fontSize: "32px", fontWeight: "800", color: "#ffffff", marginBottom: "48px", textAlign: "center" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1200px", margin: "0 auto" }, {
        children: Array.from({ length: 4 }).map(() => comp("card", "", { backgroundColor: "#262626", borderRadius: "0", padding: "24px" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", "Air Jordan 1 High", { fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "8px" }),
            comp("text", "$175", { fontSize: "18px", fontWeight: "700", color: "#ef4444" }),
          ],
        })),
      }),
    ]),
    footer("KICKZ"),
  ]
);

add("Organic Food Store", "Natural and organic food store", "ecommerce", "🥬", ["organic", "food", "natural", "healthy"],
  [
    section("header", "Nav", { backgroundColor: "#f0fdf4" }, [nav("Nature's Best", ["Shop", "Recipes", "About", "Cart"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🌱 100% Organic", { fontSize: "14px", color: "#16a34a", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "Fresh from Farm to Table", { fontSize: "52px", fontWeight: "800", color: "#14532d", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Discover the finest organic produce, delivered fresh to your doorstep.", { fontSize: "18px", color: "#166534", marginBottom: "32px" }),
              comp("button", "Shop Now", { backgroundColor: "#16a34a", color: "#ffffff", padding: "16px 40px", borderRadius: "50px", fontSize: "16px", fontWeight: "600" }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Vegetables" }),
        ],
      }),
    ]),
    section("body", "Categories", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#f0fdf4", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🥬", { fontSize: "48px", marginBottom: "12px" }), comp("text", "Vegetables", { fontWeight: "600", color: "#14532d" })] }),
          comp("card", "", { backgroundColor: "#fef3c7", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🍎", { fontSize: "48px", marginBottom: "12px" }), comp("text", "Fruits", { fontWeight: "600", color: "#78350f" })] }),
          comp("card", "", { backgroundColor: "#fce7f3", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🥛", { fontSize: "48px", marginBottom: "12px" }), comp("text", "Dairy", { fontWeight: "600", color: "#9d174d" })] }),
          comp("card", "", { backgroundColor: "#fef2f2", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🥩", { fontSize: "48px", marginBottom: "12px" }), comp("text", "Meat", { fontWeight: "600", color: "#991b1b" })] }),
        ],
      }),
    ]),
    footer("Nature's Best", false),
  ]
);

add("Watch Store", "Luxury watch e-commerce", "ecommerce", "⌚", ["watches", "luxury", "timepieces", "accessories"],
  [
    section("header", "Nav", { backgroundColor: "#0a0a0a" }, [nav("CHRONOS", ["Collections", "New Arrivals", "About", "Cart"], true)]),
    section("body", "Hero", { backgroundColor: "#0a0a0a", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "SWISS CRAFTSMANSHIP", { fontSize: "12px", color: "#a3a3a3", letterSpacing: "4px", marginBottom: "32px" }),
      comp("heading", "Timeless Elegance", { fontSize: "72px", fontWeight: "200", color: "#ffffff", marginBottom: "24px", letterSpacing: "4px" }),
      comp("paragraph", "Discover our collection of handcrafted luxury timepieces", { fontSize: "18px", color: "#737373", marginBottom: "48px" }),
      comp("button", "Explore Collection", { backgroundColor: "#d4af37", color: "#0a0a0a", padding: "18px 56px", borderRadius: "0", fontSize: "14px", fontWeight: "500", letterSpacing: "2px" }),
    ]),
    section("body", "Featured", { backgroundColor: "#0f0f0f", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1000px", margin: "0 auto" }, {
        children: ["Submariner", "Daytona", "Royal Oak"].map(w => comp("group", "", { textAlign: "center" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "1/1", backgroundColor: "#1a1a1a", marginBottom: "24px" }, { src: "/placeholder.svg" }),
            comp("text", w, { fontSize: "18px", color: "#ffffff", marginBottom: "8px" }),
            comp("text", "From $12,500", { fontSize: "14px", color: "#d4af37" }),
          ],
        })),
      }),
    ]),
    footer("CHRONOS"),
  ]
);

add("Kids Toys Store", "Fun children's toy store", "ecommerce", "🧸", ["toys", "kids", "children", "games"],
  [
    section("header", "Nav", { backgroundColor: "#fef3c7" }, [nav("ToyBox", ["New", "Age Groups", "Brands", "Sale", "Cart"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)", padding: "80px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("text", "🎈 🧸 🎮 🎨 🚀", { fontSize: "48px", marginBottom: "32px" }),
          comp("heading", "Playtime Paradise!", { fontSize: "56px", fontWeight: "800", color: "#78350f", marginBottom: "24px" }),
          comp("paragraph", "Discover thousands of toys that inspire creativity and bring joy to children of all ages.", { fontSize: "18px", color: "#92400e", marginBottom: "40px" }),
          comp("button", "Shop by Age", { backgroundColor: "#f97316", color: "#ffffff", padding: "18px 48px", borderRadius: "50px", fontSize: "18px", fontWeight: "700" }),
        ],
      }),
    ]),
    section("body", "Categories", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#dbeafe", borderRadius: "24px", padding: "32px", textAlign: "center" }, { children: [comp("text", "👶", { fontSize: "48px", marginBottom: "12px" }), comp("text", "Baby", { fontWeight: "700", color: "#1e40af" })] }),
          comp("card", "", { backgroundColor: "#dcfce7", borderRadius: "24px", padding: "32px", textAlign: "center" }, { children: [comp("text", "🧩", { fontSize: "48px", marginBottom: "12px" }), comp("text", "Puzzles", { fontWeight: "700", color: "#166534" })] }),
          comp("card", "", { backgroundColor: "#fce7f3", borderRadius: "24px", padding: "32px", textAlign: "center" }, { children: [comp("text", "🎨", { fontSize: "48px", marginBottom: "12px" }), comp("text", "Arts", { fontWeight: "700", color: "#9d174d" })] }),
          comp("card", "", { backgroundColor: "#fef3c7", borderRadius: "24px", padding: "32px", textAlign: "center" }, { children: [comp("text", "🎮", { fontSize: "48px", marginBottom: "12px" }), comp("text", "Games", { fontWeight: "700", color: "#78350f" })] }),
        ],
      }),
    ]),
    footer("ToyBox", false),
  ]
);

add("Home Decor Store", "Modern home decor and interior store", "ecommerce", "🏠", ["home", "decor", "interior", "design"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("Habitat", ["Living", "Bedroom", "Kitchen", "Art", "Cart"])]),
    section("body", "Hero", { backgroundColor: "#f5f5f0", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: "1200px", margin: "0 auto" }, {
        children: [
          comp("group", "", { display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px" }, {
            children: [
              comp("text", "New Collection", { fontSize: "14px", color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "24px" }),
              comp("heading", "Modern Living Essentials", { fontSize: "48px", fontWeight: "400", color: "#262626", marginBottom: "24px", lineHeight: "1.2" }),
              comp("paragraph", "Curated pieces that transform your house into a home.", { fontSize: "17px", color: "#737373", marginBottom: "32px" }),
              comp("button", "Explore", { backgroundColor: "#262626", color: "#ffffff", padding: "16px 40px", borderRadius: "4px", fontSize: "14px", fontWeight: "500", width: "fit-content" }),
            ],
          }),
          comp("image", "", { width: "100%", height: "100%", objectFit: "cover" }, { src: "/placeholder.svg", alt: "Living Room" }),
        ],
      }),
    ]),
    section("body", "Products", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }, {
        children: ["Artisan Vase", "Linen Throw", "Ceramic Lamp", "Wall Mirror"].map(p => comp("group", "", {}, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "3/4", backgroundColor: "#f5f5f0", marginBottom: "16px" }, { src: "/placeholder.svg" }),
            comp("text", p, { fontSize: "16px", fontWeight: "500", marginBottom: "4px" }),
            comp("text", "$89", { fontSize: "14px", color: "#737373" }),
          ],
        })),
      }),
    ]),
    footer("Habitat", false),
  ]
);

add("Bookstore", "Modern online bookstore", "ecommerce", "📚", ["books", "reading", "literature", "library"],
  [
    section("header", "Nav", { backgroundColor: "#1e1b4b" }, [nav("PageTurner", ["Fiction", "Non-Fiction", "Kids", "Bestsellers", "Cart"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "📖 Book of the Month", { fontSize: "14px", color: "#a5b4fc", marginBottom: "16px" }),
              comp("heading", "Discover Your Next Great Read", { fontSize: "52px", fontWeight: "800", color: "#ffffff", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Over 1 million titles. Free shipping on orders over $35.", { fontSize: "18px", color: "#c7d2fe", marginBottom: "32px" }),
              comp("container", "", { display: "flex", backgroundColor: "#312e81", borderRadius: "12px", padding: "8px" }, {
                children: [
                  comp("input", "", { flex: "1", backgroundColor: "transparent", border: "none", padding: "12px", color: "#ffffff" }, { placeholder: "Search books..." }),
                  comp("button", "Search", { backgroundColor: "#6366f1", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", fontWeight: "600" }),
                ],
              }),
            ],
          }),
          comp("container", "", { display: "flex", gap: "-20px" }, {
            children: Array.from({ length: 3 }).map((_, i) => comp("image", "", { width: "180px", aspectRatio: "2/3", borderRadius: "8px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", transform: `rotate(${(i - 1) * 5}deg)` }, { src: "/placeholder.svg" })),
          }),
        ],
      }),
    ]),
    footer("PageTurner"),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// HEALTHCARE TEMPLATES
// ═══════════════════════════════════════════════════════════════════

add("Medical Clinic", "Professional medical clinic website", "healthcare", "🏥", ["medical", "clinic", "health", "doctor"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("CareFirst Clinic", ["Services", "Doctors", "Appointments", "Contact"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🏥 Trusted Healthcare", { fontSize: "14px", color: "#0891b2", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "Your Health, Our Priority", { fontSize: "52px", fontWeight: "800", color: "#164e63", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Comprehensive healthcare services with compassionate, patient-centered care.", { fontSize: "18px", color: "#0e7490", marginBottom: "32px" }),
              comp("container", "", { display: "flex", gap: "16px" }, {
                children: [
                  comp("button", "Book Appointment", { backgroundColor: "#0891b2", color: "#ffffff", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
                  comp("button", "Our Services", { backgroundColor: "#ffffff", color: "#0891b2", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", border: "2px solid #0891b2" }),
                ],
              }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Medical Team" }),
        ],
      }),
    ]),
    section("body", "Services", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("heading", "Our Services", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#164e63" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          card("🩺", "General Medicine", "Comprehensive primary care for all ages", "#ecfeff"),
          card("❤️", "Cardiology", "Heart health specialists", "#fef2f2"),
          card("🧠", "Neurology", "Brain and nervous system care", "#f5f3ff"),
          card("🦴", "Orthopedics", "Bone and joint specialists", "#fef3c7"),
        ],
      }),
    ]),
    footer("CareFirst Clinic", false),
  ]
);

add("Dental Practice", "Modern dental practice website", "healthcare", "🦷", ["dental", "dentist", "teeth", "smile"],
  [
    section("header", "Nav", { backgroundColor: "#ecfdf5" }, [nav("Smile Studio", ["Services", "Team", "Technology", "Book Now"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", padding: "100px 40px", textAlign: "center" }, [
      comp("text", "😁", { fontSize: "80px", marginBottom: "32px" }),
      comp("heading", "Your Perfect Smile Awaits", { fontSize: "56px", fontWeight: "800", color: "#064e3b", marginBottom: "24px" }),
      comp("paragraph", "Modern dentistry with gentle care. Pain-free procedures and stunning results.", { fontSize: "20px", color: "#047857", marginBottom: "48px" }),
      comp("button", "Book Your Visit", { backgroundColor: "#059669", color: "#ffffff", padding: "18px 48px", borderRadius: "50px", fontSize: "18px", fontWeight: "700" }),
    ]),
    section("body", "Services", { backgroundColor: "#ffffff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("card", "", { backgroundColor: "#f0fdf4", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "✨", { fontSize: "40px", marginBottom: "12px" }), comp("text", "Teeth Whitening", { fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#f0fdf4", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🦷", { fontSize: "40px", marginBottom: "12px" }), comp("text", "Implants", { fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#f0fdf4", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "😬", { fontSize: "40px", marginBottom: "12px" }), comp("text", "Braces", { fontWeight: "600" })] }),
          comp("card", "", { backgroundColor: "#f0fdf4", padding: "32px", borderRadius: "16px", textAlign: "center" }, { children: [comp("text", "🩹", { fontSize: "40px", marginBottom: "12px" }), comp("text", "Emergency", { fontWeight: "600" })] }),
        ],
      }),
    ]),
    footer("Smile Studio", false),
  ]
);

add("Mental Health", "Mental health and therapy practice", "healthcare", "🧠", ["mental health", "therapy", "counseling", "wellness"],
  [
    section("header", "Nav", { backgroundColor: "#faf5ff" }, [nav("MindWell", ["Services", "Therapists", "Resources", "Contact"])]),
    section("body", "Hero", { backgroundColor: "#faf5ff", padding: "120px 40px" }, [
      comp("container", "", { maxWidth: "700px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("text", "🧘", { fontSize: "64px", marginBottom: "32px" }),
          comp("heading", "Your Mental Health Matters", { fontSize: "52px", fontWeight: "700", color: "#581c87", marginBottom: "24px" }),
          comp("paragraph", "Professional therapy and counseling in a safe, supportive environment. Take the first step toward healing.", { fontSize: "18px", color: "#7e22ce", lineHeight: "1.7", marginBottom: "40px" }),
          comp("button", "Schedule Consultation", { backgroundColor: "#9333ea", color: "#ffffff", padding: "18px 48px", borderRadius: "50px", fontSize: "16px", fontWeight: "600" }),
        ],
      }),
    ]),
    section("body", "Services", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "900px", margin: "0 auto" }, {
        children: [
          card("💬", "Individual Therapy", "One-on-one sessions tailored to your needs", "#faf5ff"),
          card("👥", "Couples Counseling", "Strengthen your relationships", "#faf5ff"),
          card("🏠", "Family Therapy", "Navigate family challenges together", "#faf5ff"),
        ],
      }),
    ]),
    footer("MindWell", false),
  ]
);

add("Fitness & Gym", "Modern fitness center website", "healthcare", "💪", ["fitness", "gym", "workout", "training"],
  [
    section("header", "Nav", { backgroundColor: "#0f172a" }, [nav("IRONFIT", ["Classes", "Trainers", "Membership", "Join"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "140px 40px", textAlign: "center" }, [
      comp("text", "💪", { fontSize: "72px", marginBottom: "32px" }),
      comp("heading", "TRANSFORM YOUR BODY", { fontSize: "64px", fontWeight: "900", color: "#ffffff", letterSpacing: "2px", marginBottom: "24px" }),
      comp("paragraph", "State-of-the-art equipment. World-class trainers. Your fitness journey starts here.", { fontSize: "20px", color: "#94a3b8", marginBottom: "48px" }),
      comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
        children: [
          comp("button", "Start Free Trial", { backgroundColor: "#f97316", color: "#ffffff", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "700" }),
          comp("button", "View Classes", { backgroundColor: "transparent", color: "#ffffff", padding: "18px 48px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", border: "2px solid #475569" }),
        ],
      }),
    ]),
    section("body", "Stats", { backgroundColor: "#f97316", padding: "60px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "50+", { fontSize: "48px", fontWeight: "900", color: "#ffffff" }), comp("text", "Classes/Week", { color: "#fff7ed" })] }),
          comp("group", "", {}, { children: [comp("text", "20", { fontSize: "48px", fontWeight: "900", color: "#ffffff" }), comp("text", "Expert Trainers", { color: "#fff7ed" })] }),
          comp("group", "", {}, { children: [comp("text", "24/7", { fontSize: "48px", fontWeight: "900", color: "#ffffff" }), comp("text", "Open Access", { color: "#fff7ed" })] }),
          comp("group", "", {}, { children: [comp("text", "5K+", { fontSize: "48px", fontWeight: "900", color: "#ffffff" }), comp("text", "Members", { color: "#fff7ed" })] }),
        ],
      }),
    ]),
    footer("IRONFIT"),
  ]
);

add("Spa & Wellness", "Luxury spa and wellness center", "healthcare", "🧖", ["spa", "wellness", "relaxation", "beauty"],
  [
    section("header", "Nav", { backgroundColor: "#fdf4ff" }, [nav("Serenity Spa", ["Treatments", "Packages", "Gift Cards", "Book"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)", padding: "120px 40px", textAlign: "center" }, [
      comp("text", "🌸 ✨ 🧖", { fontSize: "48px", marginBottom: "32px" }),
      comp("heading", "Find Your Inner Peace", { fontSize: "56px", fontWeight: "300", color: "#701a75", marginBottom: "24px", fontFamily: "Georgia, serif" }),
      comp("paragraph", "Luxury spa treatments designed to rejuvenate your body, mind, and soul.", { fontSize: "20px", color: "#86198f", marginBottom: "48px", fontFamily: "Georgia, serif" }),
      comp("button", "Book Treatment", { backgroundColor: "#a21caf", color: "#ffffff", padding: "18px 56px", borderRadius: "4px", fontSize: "16px", fontWeight: "500" }),
    ]),
    section("body", "Treatments", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }, {
        children: [
          comp("group", "", { textAlign: "center", padding: "24px" }, { children: [comp("text", "💆", { fontSize: "48px", marginBottom: "16px" }), comp("text", "Massage", { fontSize: "18px", fontWeight: "500" }), comp("text", "From $80", { fontSize: "14px", color: "#a21caf" })] }),
          comp("group", "", { textAlign: "center", padding: "24px" }, { children: [comp("text", "🧖‍♀️", { fontSize: "48px", marginBottom: "16px" }), comp("text", "Facial", { fontSize: "18px", fontWeight: "500" }), comp("text", "From $65", { fontSize: "14px", color: "#a21caf" })] }),
          comp("group", "", { textAlign: "center", padding: "24px" }, { children: [comp("text", "💅", { fontSize: "48px", marginBottom: "16px" }), comp("text", "Manicure", { fontSize: "18px", fontWeight: "500" }), comp("text", "From $35", { fontSize: "14px", color: "#a21caf" })] }),
          comp("group", "", { textAlign: "center", padding: "24px" }, { children: [comp("text", "🛁", { fontSize: "48px", marginBottom: "16px" }), comp("text", "Body Wrap", { fontSize: "18px", fontWeight: "500" }), comp("text", "From $95", { fontSize: "14px", color: "#a21caf" })] }),
        ],
      }),
    ]),
    footer("Serenity Spa", false),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// REAL ESTATE TEMPLATES
// ═══════════════════════════════════════════════════════════════════

add("Real Estate Agency", "Modern real estate agency website", "real-estate", "🏠", ["real estate", "homes", "property", "listings"],
  [
    section("header", "Nav", { backgroundColor: "#0f172a" }, [nav("HomeFind", ["Buy", "Sell", "Rent", "Agents", "Contact"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "100px 40px" }, [
      comp("container", "", { maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("heading", "Find Your Dream Home", { fontSize: "56px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
          comp("paragraph", "Discover thousands of properties for sale and rent across the country.", { fontSize: "20px", color: "#94a3b8", marginBottom: "48px" }),
          comp("container", "", { backgroundColor: "#ffffff", borderRadius: "16px", padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "16px" }, {
            children: [
              comp("input", "", { padding: "16px", border: "1px solid #e2e8f0", borderRadius: "8px" }, { placeholder: "Location" }),
              comp("input", "", { padding: "16px", border: "1px solid #e2e8f0", borderRadius: "8px" }, { placeholder: "Property Type" }),
              comp("input", "", { padding: "16px", border: "1px solid #e2e8f0", borderRadius: "8px" }, { placeholder: "Price Range" }),
              comp("button", "Search", { backgroundColor: "#3b82f6", color: "#ffffff", padding: "16px 32px", borderRadius: "8px", fontWeight: "600" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Featured", { backgroundColor: "#f8fafc", padding: "100px 40px" }, [
      comp("heading", "Featured Properties", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#0f172a" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1100px", margin: "0 auto" }, {
        children: Array.from({ length: 3 }).map(() => comp("card", "", { backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "16/10" }, { src: "/placeholder.svg" }),
            comp("group", "", { padding: "24px" }, {
              children: [
                comp("text", "$750,000", { fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }),
                comp("text", "4 bed • 3 bath • 2,500 sqft", { fontSize: "14px", color: "#64748b", marginBottom: "8px" }),
                comp("text", "📍 Beverly Hills, CA", { fontSize: "14px", color: "#94a3b8" }),
              ],
            }),
          ],
        })),
      }),
    ]),
    footer("HomeFind"),
  ]
);

add("Luxury Real Estate", "High-end luxury property listings", "real-estate", "🏰", ["luxury", "mansion", "premium", "exclusive"],
  [
    section("header", "Nav", { backgroundColor: "#0a0a0a" }, [nav("PRESTIGE", ["Portfolio", "Services", "About", "Contact"], true)]),
    section("body", "Hero", { backgroundColor: "#0a0a0a", padding: "160px 40px", textAlign: "center" }, [
      comp("text", "LUXURY REAL ESTATE", { fontSize: "12px", color: "#a3a3a3", letterSpacing: "4px", marginBottom: "32px" }),
      comp("heading", "Exceptional Properties", { fontSize: "72px", fontWeight: "200", color: "#ffffff", marginBottom: "24px", letterSpacing: "2px" }),
      comp("paragraph", "Curated collection of the world's most prestigious estates", { fontSize: "18px", color: "#737373", marginBottom: "48px" }),
      comp("button", "View Portfolio", { backgroundColor: "#d4af37", color: "#0a0a0a", padding: "18px 56px", borderRadius: "0", fontSize: "14px", fontWeight: "500", letterSpacing: "2px" }),
    ]),
    section("body", "Properties", { backgroundColor: "#0f0f0f", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", maxWidth: "1200px", margin: "0 auto" }, {
        children: Array.from({ length: 4 }).map(() => comp("group", "", { position: "relative" }, {
          children: [
            comp("image", "", { width: "100%", aspectRatio: "16/9", backgroundColor: "#1a1a1a" }, { src: "/placeholder.svg" }),
            comp("group", "", { position: "absolute", bottom: "24px", left: "24px" }, {
              children: [
                comp("text", "$15,000,000", { fontSize: "24px", fontWeight: "300", color: "#ffffff" }),
                comp("text", "Malibu, California", { fontSize: "14px", color: "#d4af37" }),
              ],
            }),
          ],
        })),
      }),
    ]),
    footer("PRESTIGE"),
  ]
);

add("Property Management", "Property management company website", "real-estate", "🔑", ["property", "management", "rental", "landlord"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("PropManage", ["Services", "Landlords", "Tenants", "Contact"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "🔑 Full-Service Property Management", { fontSize: "14px", color: "#2563eb", fontWeight: "600", marginBottom: "16px" }),
              comp("heading", "We Handle Everything, You Relax", { fontSize: "48px", fontWeight: "800", color: "#1e3a8a", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "Expert property management services for landlords. Tenant screening, maintenance, rent collection, and more.", { fontSize: "17px", color: "#3b82f6", marginBottom: "32px" }),
              comp("button", "Get Free Quote", { backgroundColor: "#2563eb", color: "#ffffff", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "600" }),
            ],
          }),
          comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }, {
            children: [
              comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px" }, { children: [comp("text", "500+", { fontSize: "32px", fontWeight: "800", color: "#2563eb" }), comp("text", "Properties", { color: "#64748b" })] }),
              comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px" }, { children: [comp("text", "98%", { fontSize: "32px", fontWeight: "800", color: "#2563eb" }), comp("text", "Occupancy", { color: "#64748b" })] }),
              comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px" }, { children: [comp("text", "24/7", { fontSize: "32px", fontWeight: "800", color: "#2563eb" }), comp("text", "Support", { color: "#64748b" })] }),
              comp("card", "", { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px" }, { children: [comp("text", "15+", { fontSize: "32px", fontWeight: "800", color: "#2563eb" }), comp("text", "Years", { color: "#64748b" })] }),
            ],
          }),
        ],
      }),
    ]),
    footer("PropManage", false),
  ]
);

// ═══════════════════════════════════════════════════════════════════
// NONPROFIT TEMPLATES
// ═══════════════════════════════════════════════════════════════════

add("Charity Organization", "Nonprofit charity website", "nonprofit", "❤️", ["charity", "nonprofit", "donate", "cause"],
  [
    section("header", "Nav", { backgroundColor: "#ffffff" }, [nav("HopeFoundation", ["Our Work", "Get Involved", "Donate", "About"])]),
    section("body", "Hero", { background: "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)", padding: "100px 40px" }, [
      comp("container", "", { maxWidth: "800px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("text", "❤️", { fontSize: "64px", marginBottom: "32px" }),
          comp("heading", "Together, We Can Make a Difference", { fontSize: "52px", fontWeight: "800", color: "#991b1b", marginBottom: "24px" }),
          comp("paragraph", "Join us in our mission to provide hope and support to communities in need around the world.", { fontSize: "18px", color: "#b91c1c", marginBottom: "40px" }),
          comp("container", "", { display: "flex", gap: "16px", justifyContent: "center" }, {
            children: [
              comp("button", "Donate Now", { backgroundColor: "#dc2626", color: "#ffffff", padding: "18px 48px", borderRadius: "50px", fontSize: "16px", fontWeight: "700" }),
              comp("button", "Learn More", { backgroundColor: "#ffffff", color: "#dc2626", padding: "18px 48px", borderRadius: "50px", fontSize: "16px", fontWeight: "600", border: "2px solid #dc2626" }),
            ],
          }),
        ],
      }),
    ]),
    section("body", "Impact", { backgroundColor: "#ffffff", padding: "100px 40px" }, [
      comp("heading", "Our Impact", { fontSize: "40px", fontWeight: "800", textAlign: "center", marginBottom: "60px", color: "#991b1b" }),
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "1M+", { fontSize: "48px", fontWeight: "800", color: "#dc2626" }), comp("text", "Lives Touched", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "50+", { fontSize: "48px", fontWeight: "800", color: "#dc2626" }), comp("text", "Countries", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "$25M", { fontSize: "48px", fontWeight: "800", color: "#dc2626" }), comp("text", "Raised", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "500+", { fontSize: "48px", fontWeight: "800", color: "#dc2626" }), comp("text", "Volunteers", { color: "#64748b" })] }),
        ],
      }),
    ]),
    footer("HopeFoundation", false),
  ]
);

add("Environmental NGO", "Environmental conservation nonprofit", "nonprofit", "🌍", ["environment", "conservation", "green", "nature"],
  [
    section("header", "Nav", { backgroundColor: "#14532d" }, [nav("EarthGuard", ["Projects", "Take Action", "Donate", "About"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #14532d 0%, #166534 100%)", padding: "140px 40px", textAlign: "center" }, [
      comp("text", "🌍 🌱 🌳", { fontSize: "48px", marginBottom: "32px" }),
      comp("heading", "Protect Our Planet", { fontSize: "64px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }),
      comp("paragraph", "Fighting for a sustainable future through conservation, advocacy, and community action.", { fontSize: "20px", color: "#86efac", marginBottom: "48px" }),
      comp("button", "Join the Movement", { backgroundColor: "#22c55e", color: "#0f172a", padding: "18px 48px", borderRadius: "50px", fontSize: "16px", fontWeight: "700" }),
    ]),
    section("body", "Causes", { backgroundColor: "#f0fdf4", padding: "100px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "900px", margin: "0 auto" }, {
        children: [
          card("🌊", "Ocean Conservation", "Protecting marine ecosystems worldwide", "#ffffff"),
          card("🌳", "Reforestation", "Planting millions of trees globally", "#ffffff"),
          card("🐘", "Wildlife Protection", "Saving endangered species", "#ffffff"),
        ],
      }),
    ]),
    footer("EarthGuard"),
  ]
);

add("Education Nonprofit", "Educational nonprofit organization", "nonprofit", "📚", ["education", "nonprofit", "learning", "scholarship"],
  [
    section("header", "Nav", { backgroundColor: "#1e3a8a" }, [nav("LearnForAll", ["Programs", "Scholarships", "Volunteer", "Donate"], true)]),
    section("body", "Hero", { background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)", padding: "120px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }, {
        children: [
          comp("group", "", {}, {
            children: [
              comp("text", "📚 Education Changes Everything", { fontSize: "14px", color: "#93c5fd", marginBottom: "16px" }),
              comp("heading", "Every Child Deserves Quality Education", { fontSize: "48px", fontWeight: "800", color: "#ffffff", marginBottom: "24px", lineHeight: "1.1" }),
              comp("paragraph", "We provide scholarships, resources, and support to underserved students worldwide.", { fontSize: "18px", color: "#bfdbfe", marginBottom: "32px" }),
              comp("button", "Support a Student", { backgroundColor: "#fbbf24", color: "#1e3a8a", padding: "16px 40px", borderRadius: "10px", fontSize: "16px", fontWeight: "700" }),
            ],
          }),
          comp("image", "", { width: "100%", borderRadius: "24px" }, { src: "/placeholder.svg", alt: "Students" }),
        ],
      }),
    ]),
    section("body", "Stats", { backgroundColor: "#eff6ff", padding: "80px 40px" }, [
      comp("container", "", { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }, {
        children: [
          comp("group", "", {}, { children: [comp("text", "50K+", { fontSize: "40px", fontWeight: "800", color: "#1e3a8a" }), comp("text", "Students", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "100+", { fontSize: "40px", fontWeight: "800", color: "#1e3a8a" }), comp("text", "Schools", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "$10M", { fontSize: "40px", fontWeight: "800", color: "#1e3a8a" }), comp("text", "Scholarships", { color: "#64748b" })] }),
          comp("group", "", {}, { children: [comp("text", "30+", { fontSize: "40px", fontWeight: "800", color: "#1e3a8a" }), comp("text", "Countries", { color: "#64748b" })] }),
        ],
      }),
    ]),
    footer("LearnForAll"),
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

    if (mode === "reset") {
      await supabase.from("templates").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    }

    const { data: existing } = await supabase.from("templates").select("name");
    const existingNames = new Set((existing || []).map((t: any) => t.name));
    const newTemplates = allTemplates.filter((t) => !existingNames.has(t.name));

    let inserted = 0;
    for (let i = 0; i < newTemplates.length; i += 10) {
      const batch = newTemplates.slice(i, i + 10);
      const { error } = await supabase.from("templates").insert(batch);
      if (!error) inserted += batch.length;
    }

    const categories: Record<string, number> = {};
    for (const t of allTemplates) {
      categories[t.category] = (categories[t.category] || 0) + 1;
    }

    return new Response(
      JSON.stringify({ success: true, total: allTemplates.length, inserted, skipped: allTemplates.length - newTemplates.length, categories }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
