const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

let counter = 0;
const uid = (p = "c") => `${p}-${Date.now()}-${++counter}-${Math.random().toString(36).slice(2, 8)}`;

const comp = (type: string, content: string, styles: Record<string, string> = {}, props: Record<string, any> = {}) => ({
  id: uid(), type, category: "Basic", label: type, content, styles: { padding: "8px", ...styles }, props, children: [], isContainer: false,
});

const section = (type: string, label: string, styles: Record<string, string>, components: any[]) => ({
  id: uid("sec"), type, label, styles: { padding: "60px 5%", ...styles }, components,
});

const nav = (brand: string, links: string[], dark = false) => section("header", "Navigation", {
  padding: "16px 5%", display: "flex", justifyContent: "space-between", alignItems: "center",
  backgroundColor: dark ? "#0a0a0a" : "#ffffff", borderBottom: dark ? "1px solid #222" : "1px solid #e5e7eb",
}, [
  comp("text", brand, { fontSize: "22px", fontWeight: "800", color: dark ? "#ffffff" : "#111827" }),
  ...links.map(l => comp("text", l, { fontSize: "14px", color: dark ? "#a1a1aa" : "#6b7280", cursor: "pointer" })),
  comp("text", "Get Started", { fontSize: "14px", fontWeight: "600", backgroundColor: "#6366f1", color: "#ffffff", padding: "10px 24px", borderRadius: "8px", cursor: "pointer" }),
]);

const hero = (title: string, sub: string, cta: string, bg: string, color: string, accent: string) => section("body", "Hero", {
  padding: "120px 5%", backgroundColor: bg, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px",
}, [
  comp("text", title, { fontSize: "56px", fontWeight: "900", color, lineHeight: "1.1", maxWidth: "800px" }),
  comp("text", sub, { fontSize: "20px", color: color + "cc", maxWidth: "600px", lineHeight: "1.6" }),
  comp("text", cta, { fontSize: "16px", fontWeight: "700", backgroundColor: accent, color: "#ffffff", padding: "16px 40px", borderRadius: "12px", cursor: "pointer" }),
]);

const features = (title: string, items: { icon: string; t: string; d: string }[], bg: string, color: string) => section("body", "Features", {
  padding: "100px 5%", backgroundColor: bg, textAlign: "center",
}, [
  comp("text", title, { fontSize: "40px", fontWeight: "800", color, marginBottom: "60px" }),
  ...items.map(i => comp("text", `${i.icon}\n${i.t}\n${i.d}`, {
    fontSize: "15px", color, backgroundColor: bg === "#ffffff" ? "#f9fafb" : "#ffffff0a",
    padding: "32px", borderRadius: "16px", border: bg === "#ffffff" ? "1px solid #e5e7eb" : "1px solid #333",
    whiteSpace: "pre-line", lineHeight: "1.8", maxWidth: "320px",
  })),
]);

const testimonials = (items: { q: string; n: string; r: string }[], bg: string, color: string) => section("body", "Testimonials", {
  padding: "100px 5%", backgroundColor: bg, textAlign: "center",
}, [
  comp("text", "What Our Clients Say", { fontSize: "36px", fontWeight: "800", color, marginBottom: "48px" }),
  ...items.map(i => comp("text", `"${i.q}"\n\n- ${i.n}, ${i.r}`, {
    fontSize: "16px", color, backgroundColor: bg === "#ffffff" ? "#f8fafc" : "#ffffff08",
    padding: "32px", borderRadius: "16px", whiteSpace: "pre-line", lineHeight: "1.7",
    border: bg === "#ffffff" ? "1px solid #e5e7eb" : "1px solid #333", maxWidth: "380px",
  })),
]);

const pricing = (plans: { name: string; price: string; features: string[]; accent?: boolean }[], bg: string, color: string) => section("body", "Pricing", {
  padding: "100px 5%", backgroundColor: bg, textAlign: "center",
}, [
  comp("text", "Simple, Transparent Pricing", { fontSize: "40px", fontWeight: "800", color, marginBottom: "60px" }),
  ...plans.map(p => comp("text", `${p.name}\n${p.price}/mo\n\n${p.features.join("\n")}`, {
    fontSize: "15px", color: p.accent ? "#ffffff" : color,
    backgroundColor: p.accent ? "#6366f1" : (bg === "#ffffff" ? "#f9fafb" : "#ffffff0a"),
    padding: "40px 32px", borderRadius: "20px", whiteSpace: "pre-line", lineHeight: "2",
    border: p.accent ? "none" : (bg === "#ffffff" ? "1px solid #e5e7eb" : "1px solid #333"),
    maxWidth: "340px",
  })),
]);

const ctaSection = (title: string, sub: string, btn: string, bg: string, color: string, accent: string) => section("body", "CTA", {
  padding: "100px 5%", backgroundColor: bg, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
}, [
  comp("text", title, { fontSize: "44px", fontWeight: "900", color }),
  comp("text", sub, { fontSize: "18px", color: color + "bb" }),
  comp("text", btn, { fontSize: "16px", fontWeight: "700", backgroundColor: accent, color: "#ffffff", padding: "16px 40px", borderRadius: "12px", cursor: "pointer" }),
]);

const footer = (brand: string, dark = false) => section("footer", "Footer", {
  padding: "48px 5%", backgroundColor: dark ? "#050505" : "#f9fafb",
  borderTop: dark ? "1px solid #222" : "1px solid #e5e7eb", textAlign: "center",
}, [
  comp("text", brand, { fontSize: "18px", fontWeight: "700", color: dark ? "#ffffff" : "#111827" }),
  comp("text", "Privacy Policy  |  Terms of Service  |  Contact", { fontSize: "13px", color: dark ? "#71717a" : "#9ca3af" }),
  comp("text", `\u00a9 2026 ${brand}. All rights reserved.`, { fontSize: "12px", color: dark ? "#52525b" : "#d1d5db" }),
]);

const stats = (items: { val: string; label: string }[], bg: string, color: string) => section("body", "Stats", {
  padding: "80px 5%", backgroundColor: bg, textAlign: "center", display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap",
}, items.map(i => comp("text", `${i.val}\n${i.label}`, {
  fontSize: "16px", color, whiteSpace: "pre-line", lineHeight: "2",
})));

const team = (members: { name: string; role: string; emoji: string }[], bg: string, color: string) => section("body", "Team", {
  padding: "100px 5%", backgroundColor: bg, textAlign: "center",
}, [
  comp("text", "Meet Our Team", { fontSize: "40px", fontWeight: "800", color, marginBottom: "48px" }),
  ...members.map(m => comp("text", `${m.emoji}\n${m.name}\n${m.role}`, {
    fontSize: "15px", color, whiteSpace: "pre-line", lineHeight: "2",
    padding: "24px", borderRadius: "16px", backgroundColor: bg === "#ffffff" ? "#f9fafb" : "#ffffff08",
  })),
]);

const allTemplates: any[] = [];
const add = (name: string, desc: string, cat: string, thumb: string, tags: string[], sections: any[]) => {
  allTemplates.push({
    name, description: desc, category: cat, thumbnail: thumb, tags, is_public: true,
    is_premium: Math.random() > 0.6, installs: Math.floor(Math.random() * 800) + 50,
    schema: { id: `page-${name.toLowerCase().replace(/\s+/g, "-")}`, name, sections },
  });
};

// ═══════════════════════════════════════════════════
// SaaS Templates (8)
// ═══════════════════════════════════════════════════

add("DevOps Dashboard Pro", "Professional DevOps monitoring and deployment platform", "SaaS", "🔧", ["devops", "monitoring", "dashboard"],
  [nav("DevOpsHub", ["Features", "Integrations", "Pricing", "Docs"], true),
   hero("Ship Faster With Confidence", "Monitor deployments, track incidents, and automate your CI/CD pipeline from a single dashboard.", "Start Free Trial", "#0a0a0a", "#ffffff", "#10b981"),
   features("Everything You Need", [
     { icon: "🚀", t: "One-Click Deploy", d: "Push to production with automated rollbacks and health checks." },
     { icon: "📊", t: "Real-time Metrics", d: "Monitor CPU, memory, and network across all your services." },
     { icon: "🔔", t: "Smart Alerts", d: "Get notified before issues become outages with ML-powered alerts." },
     { icon: "🔗", t: "200+ Integrations", d: "Connect with GitHub, GitLab, AWS, GCP, Azure and more." },
   ], "#0a0a0a", "#ffffff"),
   stats([{ val: "99.99%", label: "Uptime SLA" }, { val: "2.4M", label: "Deployments/mo" }, { val: "15K+", label: "Teams" }, { val: "<50ms", label: "Alert Latency" }], "#111827", "#ffffff"),
   pricing([
     { name: "Starter", price: "$0", features: ["5 services", "Basic monitoring", "Community support"] },
     { name: "Pro", price: "$49", features: ["Unlimited services", "Advanced metrics", "Priority support", "Custom alerts"], accent: true },
     { name: "Enterprise", price: "$199", features: ["SSO/SAML", "Dedicated support", "SLA guarantee", "Custom integrations"] },
   ], "#0a0a0a", "#ffffff"),
   ctaSection("Ready to Automate?", "Join 15,000+ engineering teams shipping with confidence.", "Get Started Free", "#10b981", "#ffffff", "#059669"),
   footer("DevOpsHub", true)]);

add("AI Writing Studio", "AI-powered content creation and writing assistant platform", "SaaS", "✍️", ["ai", "writing", "content"],
  [nav("WriteAI", ["Features", "Templates", "Pricing", "Blog"]),
   hero("Write 10x Faster With AI", "Generate blog posts, marketing copy, and social content that sounds authentically you.", "Try Free - No Credit Card", "#ffffff", "#111827", "#8b5cf6"),
   features("Powerful AI Writing Tools", [
     { icon: "📝", t: "Blog Generator", d: "Full-length SEO-optimized articles in minutes, not hours." },
     { icon: "💬", t: "Brand Voice AI", d: "Train AI on your brand voice for consistent messaging everywhere." },
     { icon: "🎯", t: "SEO Optimizer", d: "Built-in keyword research and content optimization suggestions." },
     { icon: "🌍", t: "30+ Languages", d: "Create and translate content for global audiences instantly." },
   ], "#ffffff", "#111827"),
   testimonials([
     { q: "WriteAI cut our content production time by 80%. We now publish daily instead of weekly.", n: "Sarah Chen", r: "Head of Content at TechCo" },
     { q: "The brand voice feature is incredible. Every piece sounds like our team wrote it.", n: "Marcus Johnson", r: "CMO at GrowthLab" },
   ], "#f8fafc", "#111827"),
   pricing([
     { name: "Free", price: "$0", features: ["5,000 words/mo", "3 templates", "Basic editor"] },
     { name: "Creator", price: "$29", features: ["50,000 words/mo", "All templates", "Brand voice", "SEO tools"], accent: true },
     { name: "Business", price: "$99", features: ["Unlimited words", "Team collaboration", "API access", "Priority support"] },
   ], "#ffffff", "#111827"),
   footer("WriteAI")]);

add("FinTrack Analytics", "Financial analytics and reporting SaaS platform", "SaaS", "📈", ["finance", "analytics", "reporting"],
  [nav("FinTrack", ["Product", "Solutions", "Pricing", "Resources"], true),
   hero("Financial Intelligence, Simplified", "Real-time financial dashboards, automated reporting, and AI-powered forecasting for modern businesses.", "Request Demo", "#0f172a", "#ffffff", "#3b82f6"),
   features("Built for Finance Teams", [
     { icon: "📊", t: "Live Dashboards", d: "Real-time P&L, cash flow, and balance sheet visualization." },
     { icon: "🤖", t: "AI Forecasting", d: "Predict revenue trends with 95% accuracy using machine learning." },
     { icon: "📋", t: "Auto Reports", d: "Generate board-ready reports with one click. Export to PDF or Excel." },
     { icon: "🔒", t: "Bank-Grade Security", d: "SOC 2 Type II certified with end-to-end encryption." },
   ], "#0f172a", "#ffffff"),
   stats([{ val: "$2.8B", label: "Assets Tracked" }, { val: "4,200+", label: "Companies" }, { val: "95%", label: "Forecast Accuracy" }], "#1e293b", "#ffffff"),
   ctaSection("Take Control of Your Finances", "Start your 14-day free trial. No credit card required.", "Start Free Trial", "#3b82f6", "#ffffff", "#2563eb"),
   footer("FinTrack", true)]);

add("TeamSync Collaboration", "Modern team collaboration and project management platform", "SaaS", "👥", ["collaboration", "project-management", "teams"],
  [nav("TeamSync", ["Features", "Use Cases", "Pricing", "Enterprise"]),
   hero("Where Great Teams Do Great Work", "Combine tasks, docs, and real-time chat in one beautiful workspace. No more app-switching.", "Get Started Free", "#ffffff", "#111827", "#f59e0b"),
   features("One Workspace, Infinite Possibilities", [
     { icon: "✅", t: "Smart Tasks", d: "Kanban, list, timeline, and calendar views. Automate repetitive workflows." },
     { icon: "📄", t: "Living Docs", d: "Collaborative documents with real-time editing and version history." },
     { icon: "💬", t: "Instant Chat", d: "Threaded conversations attached to tasks, docs, or channels." },
     { icon: "📹", t: "Video Huddles", d: "Quick video calls without leaving your workspace." },
   ], "#ffffff", "#111827"),
   testimonials([
     { q: "We replaced Slack, Notion, and Asana with TeamSync. Our team has never been more aligned.", n: "Alex Rivera", r: "VP Engineering at ScaleUp" },
     { q: "The unified workspace concept is brilliant. Context switching dropped 60%.", n: "Priya Patel", r: "Product Lead at InnovateCo" },
   ], "#fffbeb", "#111827"),
   pricing([
     { name: "Free", price: "$0", features: ["10 users", "Basic tasks", "5GB storage"] },
     { name: "Team", price: "$12/user", features: ["Unlimited users", "Advanced views", "50GB storage", "Integrations"], accent: true },
     { name: "Enterprise", price: "Custom", features: ["SSO/SAML", "Unlimited storage", "Admin console", "Dedicated CSM"] },
   ], "#ffffff", "#111827"),
   footer("TeamSync")]);

add("CloudVault Storage", "Secure cloud storage and file management platform", "SaaS", "☁️", ["cloud", "storage", "security"],
  [nav("CloudVault", ["Features", "Security", "Pricing", "Docs"], true),
   hero("Your Files. Encrypted. Everywhere.", "Military-grade encryption meets beautiful simplicity. Store, share, and collaborate on files with zero-knowledge security.", "Start Secure Storage", "#0a0a0a", "#ffffff", "#06b6d4"),
   features("Security Without Compromise", [
     { icon: "🔐", t: "Zero-Knowledge Encryption", d: "Only you can decrypt your files. Not even we can see them." },
     { icon: "🔄", t: "Instant Sync", d: "Changes sync across all devices in real-time with conflict resolution." },
     { icon: "👥", t: "Secure Sharing", d: "Share files with expiring links, passwords, and download limits." },
     { icon: "🗄️", t: "Smart Organization", d: "AI-powered tagging and search across millions of files." },
   ], "#0a0a0a", "#ffffff"),
   stats([{ val: "256-bit", label: "AES Encryption" }, { val: "99.999%", label: "Durability" }, { val: "500M+", label: "Files Secured" }], "#111827", "#ffffff"),
   ctaSection("Protect What Matters", "Get 10GB free. Upgrade anytime.", "Get Started Free", "#06b6d4", "#ffffff", "#0891b2"),
   footer("CloudVault", true)]);

add("HelpDesk Central", "Customer support ticketing and knowledge base platform", "SaaS", "🎧", ["support", "helpdesk", "customer-service"],
  [nav("HelpDesk", ["Features", "Pricing", "Integrations", "Academy"]),
   hero("Delight Customers at Scale", "AI-powered support that resolves 40% of tickets automatically. Beautiful inbox, smart routing, and powerful analytics.", "Start Free Trial", "#ffffff", "#111827", "#ec4899"),
   features("Support That Scales", [
     { icon: "🤖", t: "AI Auto-Resolve", d: "Intelligent responses that handle common questions instantly." },
     { icon: "📬", t: "Unified Inbox", d: "Email, chat, social, and phone - all in one beautiful view." },
     { icon: "📚", t: "Knowledge Base", d: "Self-service portal that reduces ticket volume by 50%." },
     { icon: "📈", t: "Deep Analytics", d: "CSAT, response times, resolution rates - track what matters." },
   ], "#ffffff", "#111827"),
   testimonials([
     { q: "Response times dropped from 4 hours to 12 minutes. Our CSAT score hit 98%.", n: "Jennifer Wong", r: "Support Director at FastShip" },
     { q: "The AI auto-resolve feature is magic. It handles 45% of our tickets perfectly.", n: "David Kim", r: "CTO at CloudBase" },
   ], "#fdf2f8", "#111827"),
   ctaSection("Better Support Starts Today", "14-day free trial. Full access. No credit card.", "Try HelpDesk Free", "#ec4899", "#ffffff", "#db2777"),
   footer("HelpDesk")]);

add("DataPipe ETL Platform", "Modern data integration and ETL pipeline builder", "SaaS", "🔀", ["data", "etl", "integration"],
  [nav("DataPipe", ["Product", "Connectors", "Pricing", "Docs"], true),
   hero("Connect Any Data, Anywhere", "Visual ETL pipeline builder with 300+ connectors. Transform, validate, and load data without writing code.", "Start Building Free", "#0f172a", "#ffffff", "#a855f7"),
   features("Modern Data Infrastructure", [
     { icon: "🔌", t: "300+ Connectors", d: "Databases, APIs, SaaS apps, files - connect everything." },
     { icon: "🎨", t: "Visual Builder", d: "Drag-and-drop pipeline editor with real-time data preview." },
     { icon: "⚡", t: "Blazing Fast", d: "Process millions of rows per second with parallel execution." },
     { icon: "🛡️", t: "Data Quality", d: "Built-in validation, deduplication, and anomaly detection." },
   ], "#0f172a", "#ffffff"),
   stats([{ val: "300+", label: "Connectors" }, { val: "1B+", label: "Rows/Day" }, { val: "2,800+", label: "Data Teams" }], "#1e293b", "#ffffff"),
   pricing([
     { name: "Developer", price: "$0", features: ["5 pipelines", "100K rows/mo", "Community connectors"] },
     { name: "Team", price: "$199", features: ["50 pipelines", "10M rows/mo", "All connectors", "Scheduling"], accent: true },
     { name: "Scale", price: "$799", features: ["Unlimited pipelines", "Unlimited rows", "SLA", "Dedicated infra"] },
   ], "#0f172a", "#ffffff"),
   footer("DataPipe", true)]);

add("FormStack Builder", "Advanced form builder with logic and integrations", "SaaS", "📋", ["forms", "surveys", "no-code"],
  [nav("FormStack", ["Features", "Templates", "Pricing", "Integrations"]),
   hero("Beautiful Forms That Convert", "Build stunning forms, surveys, and quizzes with conditional logic, payments, and 100+ integrations.", "Create Your First Form", "#ffffff", "#111827", "#14b8a6"),
   features("Forms That Work Hard", [
     { icon: "🎨", t: "Drag & Drop Builder", d: "Build beautiful forms in minutes with our visual editor." },
     { icon: "🧠", t: "Smart Logic", d: "Show/hide fields, skip pages, and calculate scores dynamically." },
     { icon: "💳", t: "Accept Payments", d: "Stripe, PayPal, and Square integration built right in." },
     { icon: "📊", t: "Rich Analytics", d: "Completion rates, drop-off points, and response analytics." },
   ], "#ffffff", "#111827"),
   stats([{ val: "50M+", label: "Forms Created" }, { val: "2B+", label: "Responses" }, { val: "98.5%", label: "Uptime" }], "#f0fdfa", "#111827"),
   ctaSection("Start Building Better Forms", "Free forever plan. No credit card needed.", "Get Started Free", "#14b8a6", "#ffffff", "#0d9488"),
   footer("FormStack")]);

// ═══════════════════════════════════════════════════
// Agency Templates (7)
// ═══════════════════════════════════════════════════

add("Pixel Perfect Studio", "Premium UX/UI design agency portfolio", "Agency", "🎯", ["ux", "ui", "design-agency"],
  [nav("Pixel Perfect", ["Work", "Services", "Process", "Contact"]),
   hero("We Design Experiences People Love", "Award-winning UX/UI design studio crafting digital products for startups and Fortune 500 companies.", "View Our Work", "#ffffff", "#111827", "#f43f5e"),
   features("Our Expertise", [
     { icon: "📱", t: "Product Design", d: "End-to-end design from research to polished interfaces." },
     { icon: "🎨", t: "Design Systems", d: "Scalable component libraries that keep teams consistent." },
     { icon: "🧪", t: "User Research", d: "Data-driven insights through testing and analytics." },
     { icon: "🚀", t: "Rapid Prototyping", d: "Interactive prototypes that validate ideas before code." },
   ], "#ffffff", "#111827"),
   stats([{ val: "200+", label: "Products Designed" }, { val: "12", label: "Design Awards" }, { val: "98%", label: "Client Retention" }], "#fff1f2", "#111827"),
   testimonials([
     { q: "Pixel Perfect transformed our app. User engagement increased 340% after the redesign.", n: "Tom Harris", r: "CEO at FinLeap" },
     { q: "Their design system saved us months of development time. Incredible attention to detail.", n: "Lisa Zhang", r: "CTO at MedTech" },
   ], "#ffffff", "#111827"),
   ctaSection("Let's Create Something Amazing", "Book a free 30-minute design consultation.", "Book a Call", "#f43f5e", "#ffffff", "#e11d48"),
   footer("Pixel Perfect")]);

add("Growth Engine Marketing", "Performance marketing and growth agency", "Agency", "📊", ["marketing", "growth", "performance"],
  [nav("Growth Engine", ["Services", "Case Studies", "Results", "Contact"], true),
   hero("Marketing That Moves Metrics", "Data-driven growth strategies that have generated $500M+ in revenue for our clients.", "See Our Results", "#0a0a0a", "#ffffff", "#22c55e"),
   features("Full-Stack Growth", [
     { icon: "🎯", t: "Paid Acquisition", d: "Google, Meta, TikTok ads managed by certified experts." },
     { icon: "📈", t: "SEO & Content", d: "Organic growth strategies that compound over time." },
     { icon: "📧", t: "Email & CRM", d: "Lifecycle marketing that turns leads into loyal customers." },
     { icon: "🔬", t: "CRO & Testing", d: "A/B testing and optimization that maximizes every visitor." },
   ], "#0a0a0a", "#ffffff"),
   stats([{ val: "$500M+", label: "Revenue Generated" }, { val: "340%", label: "Avg ROAS" }, { val: "85+", label: "Active Clients" }], "#111827", "#ffffff"),
   ctaSection("Ready to Grow?", "Get a free growth audit and strategy session.", "Get Free Audit", "#22c55e", "#ffffff", "#16a34a"),
   footer("Growth Engine", true)]);

add("Arch Vision Architecture", "Modern architecture and interior design firm", "Agency", "🏗️", ["architecture", "interior-design", "construction"],
  [nav("Arch Vision", ["Projects", "Services", "Studio", "Contact"]),
   hero("Architecture That Inspires", "Award-winning architectural design blending innovation, sustainability, and timeless aesthetics.", "Explore Projects", "#ffffff", "#111827", "#78716c"),
   features("Our Services", [
     { icon: "🏠", t: "Residential Design", d: "Bespoke homes that reflect your lifestyle and vision." },
     { icon: "🏢", t: "Commercial Spaces", d: "Office, retail, and hospitality environments that perform." },
     { icon: "🌿", t: "Sustainable Design", d: "LEED-certified green buildings with minimal environmental impact." },
     { icon: "🎨", t: "Interior Architecture", d: "Curated interiors that balance beauty and functionality." },
   ], "#ffffff", "#111827"),
   testimonials([
     { q: "Arch Vision created our dream home. Every detail was considered and beautifully executed.", n: "Robert & Sarah Miller", r: "Homeowners" },
   ], "#fafaf9", "#111827"),
   ctaSection("Let's Build Your Vision", "Schedule a consultation to discuss your project.", "Schedule Consultation", "#78716c", "#ffffff", "#57534e"),
   footer("Arch Vision")]);

add("Nexus Digital Consultancy", "Digital transformation and technology consulting", "Agency", "💡", ["consulting", "digital-transformation", "technology"],
  [nav("Nexus Digital", ["Services", "Industries", "Insights", "Contact"], true),
   hero("Navigate Digital Transformation", "Strategic consulting that helps enterprises modernize technology, optimize operations, and accelerate growth.", "Explore Solutions", "#0f172a", "#ffffff", "#f97316"),
   features("Our Practice Areas", [
     { icon: "☁️", t: "Cloud Migration", d: "Seamless transition to cloud-native infrastructure." },
     { icon: "🤖", t: "AI Strategy", d: "Identify and implement high-impact AI opportunities." },
     { icon: "🔄", t: "Process Automation", d: "Streamline operations with intelligent automation." },
     { icon: "📱", t: "Digital Products", d: "Build customer-facing digital experiences that delight." },
   ], "#0f172a", "#ffffff"),
   stats([{ val: "150+", label: "Enterprise Clients" }, { val: "$2.1B", label: "Value Created" }, { val: "97%", label: "Success Rate" }], "#1e293b", "#ffffff"),
   ctaSection("Transform Your Business", "Book a discovery session with our senior consultants.", "Book Discovery Call", "#f97316", "#ffffff", "#ea580c"),
   footer("Nexus Digital", true)]);

add("Vibe Creative Agency", "Bold creative agency for brand identity and campaigns", "Agency", "🎨", ["branding", "creative", "campaigns"],
  [nav("VIBE", ["Work", "Capabilities", "Culture", "Contact"]),
   hero("Brands That Make Noise", "We create bold identities, campaigns, and experiences that make brands impossible to ignore.", "See Our Work", "#ffffff", "#111827", "#e11d48"),
   features("What We Do", [
     { icon: "✨", t: "Brand Identity", d: "Logos, visual systems, and brand guidelines that stand out." },
     { icon: "📸", t: "Campaign Creative", d: "Multi-channel campaigns that drive awareness and action." },
     { icon: "🎬", t: "Video Production", d: "Commercials, social content, and brand films." },
     { icon: "🌐", t: "Digital Experience", d: "Websites and apps that are works of art." },
   ], "#ffffff", "#111827"),
   ctaSection("Let's Make Something Bold", "Tell us about your brand and vision.", "Start a Project", "#e11d48", "#ffffff", "#be123c"),
   footer("VIBE")]);

add("Quantum Labs R&D", "Research and development technology lab", "Agency", "🔬", ["r-and-d", "innovation", "technology"],
  [nav("Quantum Labs", ["Research", "Publications", "Partners", "Careers"], true),
   hero("Inventing Tomorrow's Technology", "Pioneering research in quantum computing, AI, and advanced materials to solve humanity's greatest challenges.", "Our Research", "#0a0a0a", "#ffffff", "#7c3aed"),
   features("Research Areas", [
     { icon: "⚛️", t: "Quantum Computing", d: "Building practical quantum systems for real-world problems." },
     { icon: "🧠", t: "Neural Interfaces", d: "Non-invasive brain-computer interfaces for accessibility." },
     { icon: "🔋", t: "Energy Storage", d: "Next-generation battery technology for a sustainable future." },
     { icon: "🧬", t: "Computational Biology", d: "AI-driven drug discovery and protein engineering." },
   ], "#0a0a0a", "#ffffff"),
   stats([{ val: "47", label: "Patents" }, { val: "120+", label: "Publications" }, { val: "15", label: "Industry Partners" }], "#111827", "#ffffff"),
   team([
     { name: "Dr. Elena Vasquez", role: "Chief Scientist", emoji: "👩‍🔬" },
     { name: "Dr. James Park", role: "Quantum Lead", emoji: "👨‍🔬" },
     { name: "Dr. Amira Hassan", role: "AI Director", emoji: "👩‍💻" },
   ], "#0a0a0a", "#ffffff"),
   footer("Quantum Labs", true)]);

add("Ember Social Media Agency", "Social media management and influencer marketing", "Agency", "🔥", ["social-media", "influencer", "marketing"],
  [nav("Ember", ["Services", "Case Studies", "Clients", "Contact"]),
   hero("Set Social Media on Fire", "Full-service social media management and influencer partnerships that build communities and drive conversions.", "Get a Strategy Call", "#ffffff", "#111827", "#f97316"),
   features("Our Social Toolkit", [
     { icon: "📱", t: "Content Strategy", d: "Data-driven content calendars tailored to each platform." },
     { icon: "🤝", t: "Influencer Partnerships", d: "Access to 10,000+ verified creators across all niches." },
     { icon: "📊", t: "Analytics & Reporting", d: "Real-time dashboards tracking reach, engagement, and ROI." },
     { icon: "🎬", t: "Video Production", d: "Scroll-stopping Reels, TikToks, and YouTube content." },
   ], "#ffffff", "#111827"),
   stats([{ val: "2.5B+", label: "Impressions/Year" }, { val: "400%", label: "Avg Engagement Lift" }, { val: "200+", label: "Brands Managed" }], "#fff7ed", "#111827"),
   ctaSection("Ignite Your Social Presence", "Free social media audit for qualified brands.", "Get Free Audit", "#f97316", "#ffffff", "#ea580c"),
   footer("Ember")]);

// ═══════════════════════════════════════════════════
// Portfolio Templates (7)
// ═══════════════════════════════════════════════════

add("Motion Designer Portfolio", "Kinetic portfolio for motion graphics artists", "Portfolio", "🎬", ["motion", "animation", "video"],
  [nav("MOTION.", ["Reel", "Projects", "About", "Hire Me"], true),
   hero("I Make Things Move", "Motion designer specializing in brand animations, explainer videos, and immersive visual experiences.", "Watch My Reel", "#0a0a0a", "#ffffff", "#f43f5e"),
   features("What I Create", [
     { icon: "🎬", t: "Brand Animation", d: "Logo reveals, brand stories, and identity animations." },
     { icon: "📖", t: "Explainer Videos", d: "Complex ideas made simple through engaging animation." },
     { icon: "✨", t: "UI Animation", d: "Micro-interactions and transitions for digital products." },
     { icon: "🎮", t: "3D Motion", d: "Cinema 4D and Blender for immersive 3D experiences." },
   ], "#0a0a0a", "#ffffff"),
   testimonials([
     { q: "The brand animation was perfect. It captured our essence in 30 seconds.", n: "Kate Morris", r: "Brand Director at Luxe" },
   ], "#111827", "#ffffff"),
   ctaSection("Let's Create Something Moving", "Available for freelance and contract work.", "Get in Touch", "#f43f5e", "#ffffff", "#e11d48"),
   footer("MOTION.", true)]);

add("Architect Portfolio", "Minimalist portfolio for architects", "Portfolio", "📐", ["architecture", "design", "minimal"],
  [nav("STUDIO ARK", ["Projects", "Philosophy", "Awards", "Contact"]),
   hero("Designing Spaces That Breathe", "Architectural practice focused on sustainable, human-centered design that harmonizes with nature.", "View Projects", "#ffffff", "#111827", "#78716c"),
   features("Featured Projects", [
     { icon: "🏠", t: "Cliffside Residence", d: "Cantilevered home overlooking the Pacific. Award-winning sustainable design." },
     { icon: "🏢", t: "Urban Commons", d: "Mixed-use community space revitalizing downtown with green architecture." },
     { icon: "🏛️", t: "Cultural Center", d: "Public library and gallery celebrating local heritage through modern form." },
     { icon: "🌿", t: "Garden Pavilion", d: "Meditation retreat blending indoor and outdoor living seamlessly." },
   ], "#ffffff", "#111827"),
   stats([{ val: "15", label: "Awards Won" }, { val: "48", label: "Projects Completed" }, { val: "12", label: "Years Experience" }], "#fafaf9", "#111827"),
   footer("STUDIO ARK")]);

add("Illustrator Portfolio", "Colorful portfolio for illustrators and visual artists", "Portfolio", "🎨", ["illustration", "art", "visual"],
  [nav("DRAW.", ["Gallery", "Commissions", "Shop", "About"]),
   hero("Illustrations That Tell Stories", "Editorial, children's book, and brand illustration bringing ideas to life with color and character.", "View Gallery", "#fffbeb", "#111827", "#f59e0b"),
   features("Illustration Styles", [
     { icon: "📰", t: "Editorial", d: "Magazine and newspaper illustrations for top publications." },
     { icon: "📚", t: "Children's Books", d: "Whimsical, imaginative illustrations for young readers." },
     { icon: "🎨", t: "Brand Illustration", d: "Custom illustration systems for digital products and brands." },
     { icon: "🖼️", t: "Fine Art Prints", d: "Limited edition prints available in the online shop." },
   ], "#ffffff", "#111827"),
   ctaSection("Commission an Illustration", "Let's bring your vision to life with custom artwork.", "Start a Commission", "#f59e0b", "#ffffff", "#d97706"),
   footer("DRAW.")]);

add("Music Producer Portfolio", "Dark portfolio for music producers and audio engineers", "Portfolio", "🎵", ["music", "production", "audio"],
  [nav("SOUNDCRAFT", ["Discography", "Studio", "Gear", "Contact"], true),
   hero("Crafting Sounds That Resonate", "Grammy-nominated producer with 200+ credits spanning hip-hop, electronic, and indie genres.", "Listen Now", "#0a0a0a", "#ffffff", "#a855f7"),
   features("Production Services", [
     { icon: "🎙️", t: "Recording", d: "State-of-the-art studio with vintage and modern gear." },
     { icon: "🎛️", t: "Mixing", d: "Industry-standard mixing for any genre or format." },
     { icon: "🎚️", t: "Mastering", d: "Final polish for streaming, vinyl, and broadcast." },
     { icon: "🎹", t: "Beat Production", d: "Custom beats and instrumentals for artists." },
   ], "#0a0a0a", "#ffffff"),
   stats([{ val: "200+", label: "Credits" }, { val: "3", label: "Grammy Noms" }, { val: "15", label: "Years Active" }], "#111827", "#ffffff"),
   ctaSection("Book Studio Time", "Available for sessions, mixing, and production work.", "Book Now", "#a855f7", "#ffffff", "#9333ea"),
   footer("SOUNDCRAFT", true)]);

add("3D Artist Portfolio", "Portfolio for 3D artists and CGI creators", "Portfolio", "🎮", ["3d", "cgi", "visualization"],
  [nav("VERTEX", ["Gallery", "Process", "Clients", "Contact"], true),
   hero("Photorealistic 3D That Amazes", "Creating stunning CGI, product visualizations, and architectural renders that blur the line between real and digital.", "View Gallery", "#111827", "#ffffff", "#06b6d4"),
   features("3D Services", [
     { icon: "📦", t: "Product Visualization", d: "Photorealistic 3D renders for e-commerce and marketing." },
     { icon: "🏗️", t: "Arch Visualization", d: "Immersive architectural renderings and walkthroughs." },
     { icon: "🎮", t: "Game Assets", d: "Optimized 3D models and environments for games." },
     { icon: "🌐", t: "WebGL & AR", d: "Interactive 3D experiences for web and augmented reality." },
   ], "#111827", "#ffffff"),
   ctaSection("Bring Your Vision to 3D", "Let's discuss your next project.", "Start a Project", "#06b6d4", "#ffffff", "#0891b2"),
   footer("VERTEX", true)]);

add("Copywriter Portfolio", "Clean portfolio for copywriters and content strategists", "Portfolio", "✏️", ["copywriting", "content", "writing"],
  [nav("WORDSMITH", ["Work", "Services", "Testimonials", "Contact"]),
   hero("Words That Work Overtime", "Conversion-focused copywriter helping SaaS companies turn visitors into customers with strategic messaging.", "See My Work", "#ffffff", "#111827", "#10b981"),
   features("Writing Services", [
     { icon: "🌐", t: "Website Copy", d: "Homepage, landing pages, and product pages that convert." },
     { icon: "📧", t: "Email Sequences", d: "Nurture and sales sequences with proven frameworks." },
     { icon: "📝", t: "Blog Content", d: "SEO-optimized articles that build authority and traffic." },
     { icon: "🎯", t: "Brand Messaging", d: "Positioning, taglines, and voice guidelines." },
   ], "#ffffff", "#111827"),
   testimonials([
     { q: "Our landing page conversion rate doubled after the rewrite. Worth every penny.", n: "Mike Chen", r: "Founder at AppFlow" },
     { q: "She captures brand voice perfectly. Our email open rates jumped 40%.", n: "Emma Stone", r: "Marketing Lead at DataCo" },
   ], "#f0fdf4", "#111827"),
   ctaSection("Let's Write Your Success Story", "Free 15-minute strategy call to discuss your project.", "Book Strategy Call", "#10b981", "#ffffff", "#059669"),
   footer("WORDSMITH")]);

add("Data Scientist Portfolio", "Technical portfolio for data scientists and ML engineers", "Portfolio", "🧮", ["data-science", "machine-learning", "analytics"],
  [nav("DATA.MIND", ["Projects", "Publications", "Skills", "Contact"], true),
   hero("Turning Data Into Decisions", "Senior data scientist with expertise in NLP, computer vision, and predictive analytics for Fortune 500 companies.", "View Projects", "#0f172a", "#ffffff", "#3b82f6"),
   features("Key Projects", [
     { icon: "🧠", t: "NLP Sentiment Engine", d: "Real-time sentiment analysis processing 1M tweets/hour with 94% accuracy." },
     { icon: "👁️", t: "Defect Detection CV", d: "Computer vision system reducing manufacturing defects by 73%." },
     { icon: "📈", t: "Demand Forecasting", d: "ML model predicting retail demand with 91% accuracy, saving $12M annually." },
     { icon: "🤖", t: "Recommendation Engine", d: "Collaborative filtering system increasing e-commerce revenue by 28%." },
   ], "#0f172a", "#ffffff"),
   stats([{ val: "50+", label: "ML Models Deployed" }, { val: "8", label: "Publications" }, { val: "$50M+", label: "Business Impact" }], "#1e293b", "#ffffff"),
   footer("DATA.MIND", true)]);

// ═══════════════════════════════════════════════════
// Ecommerce Templates (7)
// ═══════════════════════════════════════════════════

add("Artisan Coffee Shop", "Premium coffee brand e-commerce store", "Ecommerce", "☕", ["coffee", "artisan", "food-drink"],
  [nav("ROAST & CO", ["Shop", "Subscriptions", "Our Story", "Brewing Guides"]),
   hero("Coffee Worth Waking Up For", "Single-origin, small-batch roasted coffee delivered fresh to your door every week.", "Shop Now", "#faf5f0", "#3c2415", "#8b5e3c"),
   features("Why Roast & Co", [
     { icon: "🌱", t: "Direct Trade", d: "We pay farmers 3x fair trade prices for exceptional beans." },
     { icon: "🔥", t: "Roasted Fresh", d: "Every bag roasted within 48 hours of your order." },
     { icon: "📦", t: "Free Shipping", d: "Complimentary shipping on all subscription orders." },
     { icon: "♻️", t: "Eco Packaging", d: "100% compostable bags and carbon-neutral delivery." },
   ], "#ffffff", "#3c2415"),
   testimonials([
     { q: "Best coffee I have ever had delivered to my home. The Ethiopian Yirgacheffe is incredible.", n: "James Rodriguez", r: "Coffee Enthusiast" },
   ], "#faf5f0", "#3c2415"),
   ctaSection("Start Your Coffee Journey", "First bag 50% off with code HELLO50.", "Shop Coffee", "#8b5e3c", "#ffffff", "#6d4a2e"),
   footer("ROAST & CO")]);

add("Luxury Skincare Brand", "High-end skincare e-commerce experience", "Ecommerce", "✨", ["skincare", "beauty", "luxury"],
  [nav("LUMIERE", ["Shop", "Routines", "Ingredients", "About"], true),
   hero("Science Meets Luxury", "Clinical-grade skincare with luxurious textures and clean, sustainably-sourced ingredients.", "Discover Your Routine", "#0a0a0a", "#ffffff", "#c9a96e"),
   features("The Lumiere Difference", [
     { icon: "🔬", t: "Clinically Proven", d: "Every product tested in independent clinical trials." },
     { icon: "🌿", t: "Clean Ingredients", d: "No parabens, sulfates, or synthetic fragrances." },
     { icon: "♻️", t: "Refillable System", d: "Beautiful glass bottles with convenient refill pods." },
     { icon: "🧪", t: "Potent Formulas", d: "Maximum concentration actives for visible results." },
   ], "#0a0a0a", "#ffffff"),
   testimonials([
     { q: "After 4 weeks my skin has never looked better. The Vitamin C serum is life-changing.", n: "Victoria Park", r: "Beauty Editor" },
     { q: "Finally a luxury brand that is also clean and sustainable. 10/10 would recommend.", n: "Mia Thompson", r: "Skincare Influencer" },
   ], "#111827", "#ffffff"),
   ctaSection("Reveal Your Best Skin", "Free shipping on orders over $75. 30-day returns.", "Shop Now", "#c9a96e", "#0a0a0a", "#b8943d"),
   footer("LUMIERE", true)]);

add("Premium Eyewear Store", "Designer eyewear and sunglasses shop", "Ecommerce", "👓", ["eyewear", "fashion", "accessories"],
  [nav("OPTIC", ["Sunglasses", "Eyeglasses", "Virtual Try-On", "Stores"]),
   hero("See the World Differently", "Handcrafted eyewear combining Italian acetate, Japanese titanium, and timeless design.", "Shop Collection", "#ffffff", "#111827", "#1e293b"),
   features("Crafted With Care", [
     { icon: "🇮🇹", t: "Italian Acetate", d: "Premium acetate from Mazzucchelli, hand-polished to perfection." },
     { icon: "🔍", t: "Virtual Try-On", d: "See how frames look on you with AR technology." },
     { icon: "👁️", t: "Prescription Ready", d: "Upload your prescription for custom lenses." },
     { icon: "🏥", t: "Insurance Accepted", d: "We work with all major vision insurance providers." },
   ], "#ffffff", "#111827"),
   ctaSection("Find Your Perfect Frame", "Home try-on: pick 5 frames, try free for 5 days.", "Start Try-On", "#1e293b", "#ffffff", "#0f172a"),
   footer("OPTIC")]);

add("Organic Pet Food Store", "Natural and organic pet food e-commerce", "Ecommerce", "🐾", ["pets", "organic", "food"],
  [nav("PAWSOME", ["Dogs", "Cats", "Supplements", "Blog"]),
   hero("Real Food for Real Pets", "Vet-formulated, human-grade pet food made with organic ingredients your furry friend will love.", "Shop by Pet", "#f0fdf4", "#111827", "#16a34a"),
   features("The Pawsome Promise", [
     { icon: "🥩", t: "Human-Grade", d: "Every ingredient meets human food safety standards." },
     { icon: "🌾", t: "Grain-Free Options", d: "Allergen-friendly formulas for sensitive pets." },
     { icon: "👨‍⚕️", t: "Vet Approved", d: "Every recipe formulated with board-certified veterinary nutritionists." },
     { icon: "🚚", t: "Auto-Ship & Save", d: "Set your schedule and save 20% on every delivery." },
   ], "#ffffff", "#111827"),
   testimonials([
     { q: "My dog's coat has never been shinier. He goes crazy for the salmon recipe.", n: "Amy Peterson", r: "Pet Parent" },
   ], "#f0fdf4", "#111827"),
   ctaSection("Feed Them Better", "First order 30% off. Free shipping over $49.", "Shop Now", "#16a34a", "#ffffff", "#15803d"),
   footer("PAWSOME")]);

add("Handmade Jewelry Store", "Artisan handcrafted jewelry e-commerce", "Ecommerce", "💎", ["jewelry", "handmade", "artisan"],
  [nav("AURA", ["Necklaces", "Rings", "Earrings", "Custom"], true),
   hero("Jewelry as Unique as You", "Handcrafted with ethically-sourced gemstones and recycled precious metals. Every piece tells a story.", "Shop Collection", "#1a1a2e", "#ffffff", "#d4a574"),
   features("Craftsmanship & Values", [
     { icon: "💎", t: "Ethically Sourced", d: "Conflict-free gemstones traceable to the mine." },
     { icon: "♻️", t: "Recycled Metals", d: "14k and 18k gold from 100% recycled sources." },
     { icon: "✋", t: "Handcrafted", d: "Each piece made by skilled artisans in our studio." },
     { icon: "📜", t: "Lifetime Warranty", d: "Free repairs, resizing, and cleaning for life." },
   ], "#1a1a2e", "#ffffff"),
   ctaSection("Find Your Signature Piece", "Complimentary gift wrapping on every order.", "Shop Now", "#d4a574", "#1a1a2e", "#c4955e"),
   footer("AURA", true)]);

add("Sustainable Fashion Brand", "Eco-friendly fashion e-commerce store", "Ecommerce", "🌿", ["fashion", "sustainable", "eco-friendly"],
  [nav("TERRA", ["Women", "Men", "About Our Impact", "Journal"]),
   hero("Fashion That Doesn't Cost the Earth", "Sustainable essentials made from organic cotton, recycled materials, and plant-based fabrics.", "Shop Sustainably", "#ffffff", "#111827", "#059669"),
   features("Our Impact", [
     { icon: "🌍", t: "Carbon Neutral", d: "Every order shipped with zero carbon footprint." },
     { icon: "💧", t: "Water Saved", d: "Our processes use 80% less water than conventional fashion." },
     { icon: "🧵", t: "Fair Wages", d: "Living wages for every person in our supply chain." },
     { icon: "📊", t: "Full Transparency", d: "See the true cost breakdown of every garment." },
   ], "#ffffff", "#111827"),
   stats([{ val: "500K+", label: "Trees Planted" }, { val: "2M", label: "Liters Water Saved" }, { val: "0", label: "Waste to Landfill" }], "#f0fdf4", "#111827"),
   ctaSection("Wear Your Values", "10% off your first order. Free returns always.", "Shop Now", "#059669", "#ffffff", "#047857"),
   footer("TERRA")]);

add("Premium Tea Shop", "Specialty tea e-commerce with subscription model", "Ecommerce", "🍵", ["tea", "specialty", "subscription"],
  [nav("STEEP", ["Collections", "Subscribe", "Tea Guide", "Our Farms"]),
   hero("Tea, Elevated", "Rare and single-estate teas sourced directly from the world's finest gardens. Curated for the discerning palate.", "Explore Teas", "#fefce8", "#422006", "#854d0e"),
   features("The Steep Experience", [
     { icon: "🌏", t: "Direct from Farms", d: "Relationships with 40+ tea gardens across 12 countries." },
     { icon: "🍃", t: "Freshest Possible", d: "Teas shipped within weeks of harvest, not months." },
     { icon: "📦", t: "Curated Boxes", d: "Monthly discovery boxes of rare and seasonal teas." },
     { icon: "📚", t: "Tea Education", d: "Brewing guides, tasting notes, and origin stories." },
   ], "#ffffff", "#422006"),
   ctaSection("Begin Your Tea Journey", "Discovery box: 5 premium teas for $29.", "Order Discovery Box", "#854d0e", "#ffffff", "#713f12"),
   footer("STEEP")]);

// ═══════════════════════════════════════════════════
// Blog Templates (6)
// ═══════════════════════════════════════════════════

add("Startup Insider Blog", "Tech startup news and analysis blog", "Blog", "🚀", ["startup", "tech", "venture-capital"],
  [nav("Startup Insider", ["Latest", "Funding", "Interviews", "Newsletter"]),
   hero("Where Founders Get Smarter", "Daily analysis of startup fundraising, product launches, and the strategies behind the world's fastest-growing companies.", "Read Latest", "#ffffff", "#111827", "#6366f1"),
   features("Popular Categories", [
     { icon: "💰", t: "Funding Rounds", d: "Breaking coverage of seed to Series D announcements." },
     { icon: "🎤", t: "Founder Interviews", d: "In-depth conversations with successful entrepreneurs." },
     { icon: "📊", t: "Market Analysis", d: "Data-driven insights on emerging markets and trends." },
     { icon: "🛠️", t: "Builder's Toolkit", d: "Tools, frameworks, and tactics for building startups." },
   ], "#ffffff", "#111827"),
   ctaSection("Join 50,000+ Founders", "Get the best startup insights delivered weekly.", "Subscribe Free", "#6366f1", "#ffffff", "#4f46e5"),
   footer("Startup Insider")]);

add("Wellness & Mindfulness Blog", "Health, wellness, and meditation blog", "Blog", "🧘", ["wellness", "meditation", "health"],
  [nav("Inner Peace", ["Articles", "Meditation", "Nutrition", "Community"]),
   hero("Your Guide to Mindful Living", "Evidence-based wellness advice, guided meditations, and holistic health practices for modern life.", "Start Reading", "#faf5ff", "#111827", "#a855f7"),
   features("Explore Topics", [
     { icon: "🧠", t: "Mental Health", d: "Research-backed strategies for anxiety, stress, and resilience." },
     { icon: "🧘", t: "Meditation", d: "Guided practices from 5-minute breaks to deep sessions." },
     { icon: "🥗", t: "Mindful Eating", d: "Nutrition advice focused on nourishment, not restriction." },
     { icon: "😴", t: "Sleep Science", d: "Optimize your sleep for better health and performance." },
   ], "#ffffff", "#111827"),
   ctaSection("Start Your Wellness Journey", "Free 7-day mindfulness challenge delivered by email.", "Join Challenge", "#a855f7", "#ffffff", "#9333ea"),
   footer("Inner Peace")]);

add("Design Inspiration Blog", "UI/UX design trends and inspiration", "Blog", "🎨", ["design", "ui-ux", "inspiration"],
  [nav("DesignDrop", ["Inspiration", "Tutorials", "Tools", "Podcast"], true),
   hero("Daily Design Inspiration", "Curated UI/UX showcases, design tutorials, and the latest tools shaping the future of digital design.", "Get Inspired", "#0a0a0a", "#ffffff", "#f43f5e"),
   features("Browse By Topic", [
     { icon: "📱", t: "Mobile Design", d: "Best-in-class mobile app interfaces and patterns." },
     { icon: "🌐", t: "Web Design", d: "Stunning website designs across all industries." },
     { icon: "🎨", t: "Design Systems", d: "Component libraries and system design breakdowns." },
     { icon: "🛠️", t: "Tool Reviews", d: "Honest reviews of the latest design and prototyping tools." },
   ], "#0a0a0a", "#ffffff"),
   ctaSection("Never Miss Great Design", "Join 30,000+ designers getting weekly inspiration.", "Subscribe", "#f43f5e", "#ffffff", "#e11d48"),
   footer("DesignDrop", true)]);

add("Personal Finance Blog", "Money management and investing advice", "Blog", "💰", ["finance", "investing", "money"],
  [nav("MoneyWise", ["Investing", "Budgeting", "Retirement", "Tools"]),
   hero("Take Control of Your Money", "Practical financial advice for millennials and Gen Z. No jargon, no gatekeeping, just clear money guidance.", "Start Learning", "#ffffff", "#111827", "#10b981"),
   features("Popular Topics", [
     { icon: "📈", t: "Investing 101", d: "From index funds to crypto - understand your options." },
     { icon: "💳", t: "Debt Freedom", d: "Strategies to pay off debt and stay debt-free." },
     { icon: "🏠", t: "Home Buying", d: "First-time buyer guides, mortgage tips, and market analysis." },
     { icon: "🎯", t: "FIRE Movement", d: "Financial independence strategies and early retirement planning." },
   ], "#ffffff", "#111827"),
   stats([{ val: "500K+", label: "Monthly Readers" }, { val: "1,200+", label: "Articles" }, { val: "4.9/5", label: "Reader Rating" }], "#f0fdf4", "#111827"),
   ctaSection("Get Smarter About Money", "Free weekly newsletter with actionable money tips.", "Subscribe Free", "#10b981", "#ffffff", "#059669"),
   footer("MoneyWise")]);

add("Foodie Recipe Blog", "Beautiful food and recipe blog", "Blog", "🍳", ["food", "recipes", "cooking"],
  [nav("Savory Stories", ["Recipes", "Meal Plans", "Techniques", "Shop"]),
   hero("Recipes Worth Sharing", "Restaurant-quality recipes made simple. Step-by-step instructions, video tutorials, and meal planning tools.", "Browse Recipes", "#fffbeb", "#111827", "#d97706"),
   features("What's Cooking", [
     { icon: "⏱️", t: "Quick Meals", d: "Delicious dinners ready in 30 minutes or less." },
     { icon: "🥗", t: "Healthy Living", d: "Nutritious recipes that never sacrifice flavor." },
     { icon: "🎂", t: "Baking & Desserts", d: "From sourdough bread to French pastries." },
     { icon: "🌍", t: "World Cuisines", d: "Authentic recipes from Italian to Thai to Mexican." },
   ], "#ffffff", "#111827"),
   ctaSection("Join the Kitchen Community", "Free weekly meal plan with shopping list.", "Get Meal Plans", "#d97706", "#ffffff", "#b45309"),
   footer("Savory Stories")]);

add("Travel Adventure Blog", "Adventure travel and photography blog", "Blog", "🌍", ["travel", "adventure", "photography"],
  [nav("Wanderlust", ["Destinations", "Guides", "Photography", "Gear"], true),
   hero("Adventures Worth Taking", "Off-the-beaten-path travel guides, stunning photography, and honest reviews from a decade of full-time travel.", "Explore Destinations", "#0f172a", "#ffffff", "#0ea5e9"),
   features("Popular Destinations", [
     { icon: "🏔️", t: "Mountain Treks", d: "Himalaya, Andes, Alps - epic trekking guides and tips." },
     { icon: "🏝️", t: "Hidden Islands", d: "Undiscovered island paradises away from tourist crowds." },
     { icon: "🏛️", t: "Cultural Deep Dives", d: "Immersive cultural experiences beyond the guidebook." },
     { icon: "📸", t: "Photo Guides", d: "Best spots, timing, and camera settings for epic shots." },
   ], "#0f172a", "#ffffff"),
   ctaSection("Plan Your Next Adventure", "Free destination guide when you subscribe.", "Get Free Guide", "#0ea5e9", "#ffffff", "#0284c7"),
   footer("Wanderlust", true)]);

// ═══════════════════════════════════════════════════
// Landing Page Templates (6)
// ═══════════════════════════════════════════════════

add("App Launch Landing Page", "Mobile app pre-launch and waitlist page", "Landing Page", "📱", ["app", "launch", "waitlist"],
  [nav("AppName", ["Features", "Screenshots", "FAQ"]),
   hero("The App That Changes Everything", "Join 25,000+ people on the waitlist for the most anticipated productivity app of 2026.", "Join the Waitlist", "#ffffff", "#111827", "#6366f1"),
   features("Why You'll Love It", [
     { icon: "⚡", t: "Lightning Fast", d: "Built with performance-first architecture. Zero lag." },
     { icon: "🔒", t: "Privacy First", d: "End-to-end encryption. Your data stays yours." },
     { icon: "🎨", t: "Beautiful Design", d: "Thoughtfully designed for iOS and Android." },
     { icon: "🔄", t: "Seamless Sync", d: "Works across all your devices in real-time." },
   ], "#ffffff", "#111827"),
   stats([{ val: "25K+", label: "Waitlist" }, { val: "#1", label: "Product Hunt" }, { val: "4.9", label: "Beta Rating" }], "#eef2ff", "#111827"),
   ctaSection("Be the First to Know", "Get early access when we launch.", "Join Waitlist", "#6366f1", "#ffffff", "#4f46e5"),
   footer("AppName")]);

add("SaaS Product Launch", "Product launch and feature announcement page", "Landing Page", "🎉", ["product-launch", "saas", "announcement"],
  [nav("ProductX", ["What's New", "Features", "Pricing"], true),
   hero("Introducing ProductX 3.0", "The biggest update in our history. AI-powered automation, real-time collaboration, and a completely redesigned experience.", "See What's New", "#0a0a0a", "#ffffff", "#f59e0b"),
   features("Major New Features", [
     { icon: "🤖", t: "AI Copilot", d: "Your intelligent assistant that learns your workflow and suggests actions." },
     { icon: "👥", t: "Real-time Collab", d: "Work together with your team in the same workspace, simultaneously." },
     { icon: "📊", t: "Advanced Analytics", d: "New dashboard with custom reports and predictive insights." },
     { icon: "🔌", t: "API v3", d: "Completely rebuilt API with webhooks and 200+ endpoints." },
   ], "#0a0a0a", "#ffffff"),
   ctaSection("Upgrade to 3.0 Today", "Free for all existing Pro and Enterprise customers.", "Upgrade Now", "#f59e0b", "#0a0a0a", "#d97706"),
   footer("ProductX", true)]);

add("Event Registration Page", "Conference and event registration landing page", "Landing Page", "🎪", ["event", "conference", "registration"],
  [nav("TechSummit 2026", ["Speakers", "Schedule", "Sponsors", "Register"]),
   hero("TechSummit 2026", "The world's premier technology conference. 3 days, 200+ speakers, 10,000 attendees. San Francisco, Oct 15-17.", "Register Now - Early Bird", "#ffffff", "#111827", "#e11d48"),
   features("What to Expect", [
     { icon: "🎤", t: "200+ Speakers", d: "Industry leaders from Google, Apple, OpenAI, and more." },
     { icon: "🛠️", t: "50+ Workshops", d: "Hands-on sessions covering AI, cloud, security, and design." },
     { icon: "🤝", t: "Networking", d: "AI-matched networking connecting you with the right people." },
     { icon: "🎪", t: "Startup Alley", d: "100 hand-picked startups showcasing breakthrough technology." },
   ], "#ffffff", "#111827"),
   pricing([
     { name: "General", price: "$599", features: ["All keynotes", "Expo access", "Lunch included"] },
     { name: "VIP", price: "$1,299", features: ["All sessions", "Workshop access", "VIP lounge", "Speaker dinner"], accent: true },
     { name: "Team (5+)", price: "$449/ea", features: ["All VIP benefits", "Team dashboard", "Group seating"] },
   ], "#ffffff", "#111827"),
   ctaSection("Secure Your Spot", "Early bird pricing ends August 31.", "Register Now", "#e11d48", "#ffffff", "#be123c"),
   footer("TechSummit 2026")]);

add("Newsletter Landing Page", "Email newsletter subscription page", "Landing Page", "📧", ["newsletter", "email", "subscription"],
  [nav("The Weekly Byte", ["Archive", "About", "Sponsor"]),
   hero("The Newsletter Smart People Read", "Join 75,000+ professionals getting a weekly dose of curated tech insights, startup news, and career advice.", "Subscribe Free", "#f8fafc", "#111827", "#0ea5e9"),
   features("What You'll Get", [
     { icon: "📰", t: "Curated News", d: "The 5 most important tech stories you need to know." },
     { icon: "💡", t: "Deep Dives", d: "Original analysis on trends shaping the industry." },
     { icon: "🔧", t: "Tool of the Week", d: "Discover a new tool that will boost your productivity." },
     { icon: "🎯", t: "Career Tips", d: "Actionable advice for growing your tech career." },
   ], "#ffffff", "#111827"),
   testimonials([
     { q: "The only newsletter I read every single week. Concise, insightful, and actionable.", n: "Chris Anderson", r: "VP Engineering" },
     { q: "Replaced 10 other newsletters for me. Best curation in tech.", n: "Nina Patel", r: "Product Manager" },
   ], "#f8fafc", "#111827"),
   ctaSection("Join 75,000+ Subscribers", "Free forever. Unsubscribe anytime. No spam.", "Subscribe Now", "#0ea5e9", "#ffffff", "#0284c7"),
   footer("The Weekly Byte")]);

add("Crowdfunding Campaign Page", "Product crowdfunding and pre-order page", "Landing Page", "🎯", ["crowdfunding", "pre-order", "product"],
  [nav("TechGadget", ["Product", "Specs", "FAQ", "Back Us"]),
   hero("The Future of Smart Home", "TechGadget: AI-powered home hub that learns your habits and automates your life. Back us on day one.", "Back This Project", "#ffffff", "#111827", "#22c55e"),
   features("Product Highlights", [
     { icon: "🧠", t: "AI-Powered", d: "Learns your routines and automates lighting, climate, and security." },
     { icon: "🔊", t: "Spatial Audio", d: "6-speaker array with room-calibrated sound." },
     { icon: "📱", t: "Universal Hub", d: "Controls 500+ smart home devices from one place." },
     { icon: "🔒", t: "Private by Design", d: "All processing on-device. No cloud, no data selling." },
   ], "#ffffff", "#111827"),
   stats([{ val: "$1.2M", label: "Raised" }, { val: "8,400", label: "Backers" }, { val: "2,400%", label: "Funded" }], "#f0fdf4", "#111827"),
   pricing([
     { name: "Early Bird", price: "$149", features: ["1 TechGadget", "Free shipping", "Q1 2026 delivery"] },
     { name: "Bundle", price: "$249", features: ["2 TechGadgets", "Free shipping", "Bonus accessories", "Q1 2026 delivery"], accent: true },
     { name: "Starter Kit", price: "$399", features: ["3 TechGadgets", "Smart sensors pack", "Priority shipping"] },
   ], "#ffffff", "#111827"),
   ctaSection("Don't Miss Out", "Campaign ends in 12 days. Limited early bird slots remain.", "Back Now", "#22c55e", "#ffffff", "#16a34a"),
   footer("TechGadget")]);

add("Webinar Registration Page", "Professional webinar and online event page", "Landing Page", "🎥", ["webinar", "online-event", "registration"],
  [nav("MasterClass Live", ["Topics", "Speakers", "Schedule", "Register"], true),
   hero("Free Masterclass: Scale to $10M ARR", "Learn the exact playbook used by 50+ SaaS founders to scale from $1M to $10M ARR in 18 months.", "Reserve Your Seat", "#0f172a", "#ffffff", "#eab308"),
   features("What You'll Learn", [
     { icon: "🎯", t: "GTM Strategy", d: "The go-to-market framework that actually works at scale." },
     { icon: "📈", t: "Growth Loops", d: "How to build compounding growth engines that reduce CAC." },
     { icon: "👥", t: "Team Building", d: "When and who to hire at each revenue milestone." },
     { icon: "💰", t: "Fundraising", d: "How to raise on your terms (or bootstrap profitably)." },
   ], "#0f172a", "#ffffff"),
   stats([{ val: "5,000+", label: "Registered" }, { val: "90 min", label: "Duration" }, { val: "FREE", label: "Cost" }], "#1e293b", "#ffffff"),
   ctaSection("Seats Are Limited", "Live on March 20, 2026 at 11am PT. Replay available.", "Register Free", "#eab308", "#0f172a", "#ca8a04"),
   footer("MasterClass Live", true)]);

// ═══════════════════════════════════════════════════
// Restaurant Templates (6)
// ═══════════════════════════════════════════════════

add("Fine Dining Restaurant", "Upscale fine dining restaurant website", "Restaurant", "🍷", ["fine-dining", "upscale", "cuisine"],
  [nav("MAISON", ["Menu", "Reservations", "Private Events", "Wine"], true),
   hero("An Unforgettable Culinary Journey", "Michelin-starred French-Japanese fusion in the heart of Manhattan. Tasting menus crafted with seasonal ingredients.", "Reserve a Table", "#0a0a0a", "#ffffff", "#c9a96e"),
   features("The Experience", [
     { icon: "🌟", t: "Tasting Menu", d: "8-course seasonal tasting menu with optional wine pairing." },
     { icon: "🍷", t: "Wine Cellar", d: "2,000+ labels curated by our award-winning sommelier." },
     { icon: "🎭", t: "Private Dining", d: "Intimate rooms for celebrations of up to 24 guests." },
     { icon: "👨‍🍳", t: "Chef's Table", d: "Watch Chef Tanaka create your meal in the open kitchen." },
   ], "#0a0a0a", "#ffffff"),
   testimonials([
     { q: "The most exquisite dining experience in New York. Every course was a masterpiece.", n: "The New York Times", r: "Restaurant Review" },
   ], "#111827", "#ffffff"),
   ctaSection("Reserve Your Experience", "Reservations open 30 days in advance.", "Book a Table", "#c9a96e", "#0a0a0a", "#b8943d"),
   footer("MAISON", true)]);

add("Fast Casual Restaurant", "Modern fast-casual dining chain website", "Restaurant", "🌯", ["fast-casual", "healthy", "bowls"],
  [nav("BOWL'D", ["Menu", "Locations", "Order Online", "Catering"]),
   hero("Fresh Bowls, Made Your Way", "Customizable grain bowls, salads, and wraps made with locally-sourced ingredients. Ready in 5 minutes.", "Order Now", "#ffffff", "#111827", "#16a34a"),
   features("Why Bowl'd", [
     { icon: "🥬", t: "Farm Fresh", d: "Ingredients sourced from local farms within 100 miles." },
     { icon: "⚡", t: "Ready in 5 Min", d: "Made fresh to order in our open kitchen, fast." },
     { icon: "🎨", t: "Build Your Own", d: "Choose base, protein, toppings, and signature sauces." },
     { icon: "📱", t: "Order Ahead", d: "Skip the line. Order on our app for pickup or delivery." },
   ], "#ffffff", "#111827"),
   stats([{ val: "50+", label: "Locations" }, { val: "100%", label: "Organic Greens" }, { val: "4.8", label: "App Rating" }], "#f0fdf4", "#111827"),
   ctaSection("Hungry? Order Now", "Free delivery on your first order with code FRESH.", "Order Online", "#16a34a", "#ffffff", "#15803d"),
   footer("BOWL'D")]);

add("Italian Trattoria", "Authentic Italian family restaurant", "Restaurant", "🍝", ["italian", "trattoria", "family"],
  [nav("La Famiglia", ["Menu", "About", "Catering", "Reservations"]),
   hero("Authentic Italian, Made With Love", "Three generations of family recipes. Handmade pasta, wood-fired pizza, and the warmest hospitality in town.", "View Menu", "#fefce8", "#422006", "#b45309"),
   features("Our Specialties", [
     { icon: "🍝", t: "Fresh Pasta", d: "Made in-house daily using traditional Italian techniques." },
     { icon: "🍕", t: "Wood-Fired Pizza", d: "Neapolitan-style pizza from our imported Italian oven." },
     { icon: "🍷", t: "Italian Wines", d: "Carefully selected wines from small Italian vineyards." },
     { icon: "🍰", t: "Homemade Desserts", d: "Tiramisu, panna cotta, and cannoli made fresh daily." },
   ], "#ffffff", "#422006"),
   testimonials([
     { q: "Best Italian food outside of Italy. The homemade pappardelle is absolutely divine.", n: "Marco Rossi", r: "Food Critic" },
   ], "#fefce8", "#422006"),
   ctaSection("Join Us for Dinner", "Walk-ins welcome. Reservations recommended for weekends.", "Make Reservation", "#b45309", "#ffffff", "#92400e"),
   footer("La Famiglia")]);

add("Sushi Bar", "Modern Japanese sushi restaurant", "Restaurant", "🍣", ["japanese", "sushi", "modern"],
  [nav("OMAKASE", ["Menu", "Omakase", "Sake Bar", "Reserve"], true),
   hero("The Art of Sushi", "Master chef with 30 years experience serving the finest Edomae-style sushi. Limited to 12 seats per evening.", "Reserve a Seat", "#0a0a0a", "#ffffff", "#dc2626"),
   features("The Omakase Experience", [
     { icon: "🐟", t: "Daily Market Fish", d: "Flown in from Tsukiji Market, Tokyo. Every morning." },
     { icon: "🍚", t: "Perfect Rice", d: "Aged red vinegar rice, the foundation of exceptional sushi." },
     { icon: "🍶", t: "Sake Pairing", d: "Rare sakes paired to complement each course." },
     { icon: "🔪", t: "Counter Seating", d: "Watch the chef's artistry up close at our hinoki counter." },
   ], "#0a0a0a", "#ffffff"),
   ctaSection("12 Seats. One Experience.", "Reservations required. Seatings at 6pm and 8:30pm.", "Reserve Now", "#dc2626", "#ffffff", "#b91c1c"),
   footer("OMAKASE", true)]);

add("Bakery & Cafe", "Artisan bakery and coffee shop website", "Restaurant", "🥐", ["bakery", "cafe", "pastry"],
  [nav("Flour & Fold", ["Menu", "Order Online", "Catering", "Our Story"]),
   hero("Baked Fresh Every Morning", "Artisan sourdough, French pastries, and specialty coffee. Made with organic flour and local ingredients since 2015.", "See Today's Menu", "#faf5f0", "#3c2415", "#a16207"),
   features("Our Craft", [
     { icon: "🍞", t: "Sourdough", d: "48-hour fermented sourdough with our 10-year-old starter." },
     { icon: "🥐", t: "French Pastries", d: "Croissants, pain au chocolat, and seasonal specials." },
     { icon: "☕", t: "Specialty Coffee", d: "Single-origin beans roasted locally, brewed with care." },
     { icon: "🎂", t: "Custom Cakes", d: "Wedding and celebration cakes made to order." },
   ], "#ffffff", "#3c2415"),
   ctaSection("Order for Pickup", "Order before 8am for same-day pickup.", "Order Now", "#a16207", "#ffffff", "#854d0e"),
   footer("Flour & Fold")]);

add("Cocktail Bar & Lounge", "Upscale cocktail bar and nightlife venue", "Restaurant", "🍸", ["cocktail-bar", "lounge", "nightlife"],
  [nav("ELIXIR", ["Cocktails", "Events", "Private Hire", "Find Us"], true),
   hero("Where Mixology Meets Art", "Award-winning cocktail bar featuring molecular mixology, rare spirits, and an atmosphere like no other.", "View Cocktail Menu", "#1a1a2e", "#ffffff", "#a855f7"),
   features("The Elixir Experience", [
     { icon: "🧪", t: "Molecular Cocktails", d: "Innovative techniques creating drinks that surprise and delight." },
     { icon: "🥃", t: "Rare Spirits", d: "500+ spirits including vintage whiskeys and mezcals." },
     { icon: "🎵", t: "Live Music", d: "Jazz, soul, and electronic acts every Thursday-Saturday." },
     { icon: "🎉", t: "Private Events", d: "Exclusive hire for parties of 20-150 guests." },
   ], "#1a1a2e", "#ffffff"),
   ctaSection("Book Your Night Out", "Walk-ins welcome. Table reservations for groups of 6+.", "Reserve a Table", "#a855f7", "#ffffff", "#9333ea"),
   footer("ELIXIR", true)]);

// ═══════════════════════════════════════════════════
// Education Templates (6)
// ═══════════════════════════════════════════════════

add("Online Coding Academy", "Interactive coding bootcamp and courses platform", "Education", "💻", ["coding", "bootcamp", "programming"],
  [nav("CodeCraft Academy", ["Courses", "Bootcamps", "Career Services", "Community"], true),
   hero("Learn to Code. Land a Job.", "Project-based coding bootcamps with job guarantee. From zero to software engineer in 16 weeks.", "Explore Programs", "#0f172a", "#ffffff", "#22c55e"),
   features("Learning Paths", [
     { icon: "🌐", t: "Full-Stack Web", d: "React, Node.js, PostgreSQL. Build 12 real projects." },
     { icon: "📱", t: "Mobile Development", d: "iOS and Android with React Native and Swift." },
     { icon: "🤖", t: "AI & Machine Learning", d: "Python, TensorFlow, and real-world ML projects." },
     { icon: "☁️", t: "Cloud & DevOps", d: "AWS, Docker, Kubernetes, and CI/CD pipelines." },
   ], "#0f172a", "#ffffff"),
   stats([{ val: "95%", label: "Job Placement" }, { val: "$92K", label: "Avg Starting Salary" }, { val: "10,000+", label: "Alumni" }], "#1e293b", "#ffffff"),
   testimonials([
     { q: "I went from barista to software engineer in 4 months. CodeCraft changed my life.", n: "Jordan Lee", r: "Software Engineer at Stripe" },
   ], "#0f172a", "#ffffff"),
   ctaSection("Start Your Tech Career", "Apply now. Scholarships available.", "Apply Now", "#22c55e", "#ffffff", "#16a34a"),
   footer("CodeCraft Academy", true)]);

add("Language Learning Platform", "Online language courses and tutoring", "Education", "🌍", ["language", "learning", "tutoring"],
  [nav("LinguaFlow", ["Languages", "How It Works", "Pricing", "Blog"]),
   hero("Speak Any Language Fluently", "AI-powered language learning with native tutors. 40+ languages available. Conversation-first methodology.", "Start Free Trial", "#ffffff", "#111827", "#3b82f6"),
   features("The LinguaFlow Method", [
     { icon: "💬", t: "Conversation First", d: "Start speaking from day one with AI conversation partners." },
     { icon: "👩‍🏫", t: "Native Tutors", d: "1-on-1 video sessions with certified native speakers." },
     { icon: "🧠", t: "Spaced Repetition", d: "AI-optimized review schedule for permanent retention." },
     { icon: "🏆", t: "Certifications", d: "Earn recognized certificates at each proficiency level." },
   ], "#ffffff", "#111827"),
   pricing([
     { name: "Free", price: "$0", features: ["AI chat partner", "Basic lessons", "1 language"] },
     { name: "Premium", price: "$14.99", features: ["All languages", "4 tutor sessions/mo", "Offline access", "Certificates"], accent: true },
     { name: "Immersive", price: "$49.99", features: ["Unlimited tutoring", "Group classes", "Cultural content", "Priority support"] },
   ], "#ffffff", "#111827"),
   ctaSection("Your First Lesson is Free", "No credit card required. Start in 2 minutes.", "Start Learning", "#3b82f6", "#ffffff", "#2563eb"),
   footer("LinguaFlow")]);

add("Professional Development Platform", "Corporate training and upskilling platform", "Education", "📚", ["corporate-training", "upskilling", "professional"],
  [nav("SkillBridge", ["For Individuals", "For Teams", "Catalog", "Enterprise"], true),
   hero("Level Up Your Career", "Expert-led courses in leadership, data, design, and technology. Trusted by Fortune 500 companies worldwide.", "Browse Courses", "#0a0a0a", "#ffffff", "#f59e0b"),
   features("Popular Categories", [
     { icon: "📊", t: "Data & Analytics", d: "SQL, Python, Tableau, and business intelligence." },
     { icon: "🎯", t: "Leadership", d: "Management, strategy, and executive communication." },
     { icon: "🎨", t: "Design Thinking", d: "Innovation frameworks and creative problem solving." },
     { icon: "🔒", t: "Cybersecurity", d: "Security fundamentals, compliance, and risk management." },
   ], "#0a0a0a", "#ffffff"),
   stats([{ val: "500+", label: "Courses" }, { val: "2M+", label: "Learners" }, { val: "350+", label: "Enterprise Clients" }], "#111827", "#ffffff"),
   ctaSection("Invest in Your Growth", "7-day free trial. Cancel anytime.", "Start Free Trial", "#f59e0b", "#0a0a0a", "#d97706"),
   footer("SkillBridge", true)]);

add("Kids STEM Academy", "STEM education platform for children", "Education", "🔭", ["stem", "kids", "science"],
  [nav("STEM Explorers", ["Programs", "Ages", "Summer Camp", "Parents"]),
   hero("Making Science Fun Since 2018", "Hands-on STEM classes for kids ages 5-14. Robotics, coding, chemistry, and engineering adventures.", "Find a Class", "#eff6ff", "#111827", "#3b82f6"),
   features("Programs by Age", [
     { icon: "🧪", t: "Little Scientists (5-7)", d: "Fun experiments exploring physics, chemistry, and biology." },
     { icon: "🤖", t: "Robot Builders (8-10)", d: "Build and program robots with LEGO and Arduino." },
     { icon: "💻", t: "Young Coders (9-12)", d: "Game development with Scratch, Python, and JavaScript." },
     { icon: "🚀", t: "STEM Leaders (11-14)", d: "Advanced projects in AI, 3D printing, and electronics." },
   ], "#ffffff", "#111827"),
   testimonials([
     { q: "My daughter went from saying she hates math to building robots. Incredible program.", n: "Lisa Park", r: "Parent" },
   ], "#eff6ff", "#111827"),
   ctaSection("Enroll for the Spring Semester", "Classes start April 1. Sibling discounts available.", "Register Now", "#3b82f6", "#ffffff", "#2563eb"),
   footer("STEM Explorers")]);

add("Music School Online", "Online music lessons and courses platform", "Education", "🎵", ["music", "lessons", "instruments"],
  [nav("Harmony Hub", ["Instruments", "Teachers", "Group Classes", "Pricing"]),
   hero("Learn Music From World-Class Teachers", "1-on-1 video lessons with conservatory-trained instructors. Piano, guitar, vocals, drums, and 20+ instruments.", "Book a Free Lesson", "#ffffff", "#111827", "#8b5cf6"),
   features("What We Offer", [
     { icon: "🎹", t: "Piano & Keys", d: "Classical, jazz, pop - all levels from beginner to advanced." },
     { icon: "🎸", t: "Guitar", d: "Acoustic, electric, bass - rock, blues, classical, and more." },
     { icon: "🎤", t: "Voice", d: "Vocal technique, breathing, performance, and songwriting." },
     { icon: "🥁", t: "Drums & Percussion", d: "Drum kit, hand drums, and electronic percussion." },
   ], "#ffffff", "#111827"),
   stats([{ val: "50K+", label: "Students" }, { val: "200+", label: "Teachers" }, { val: "4.9/5", label: "Avg Rating" }], "#f5f3ff", "#111827"),
   ctaSection("Your First Lesson is Free", "No commitment. No credit card. Just music.", "Book Free Lesson", "#8b5cf6", "#ffffff", "#7c3aed"),
   footer("Harmony Hub")]);

add("Test Prep Platform", "Standardized test preparation courses", "Education", "📝", ["test-prep", "sat", "gre"],
  [nav("ScoreMax", ["SAT", "GRE", "GMAT", "Free Practice"], true),
   hero("Crush Your Target Score", "AI-adaptive test prep that identifies your weaknesses and creates a personalized study plan. Guaranteed score improvement.", "Start Free Practice", "#0f172a", "#ffffff", "#ef4444"),
   features("Why Students Choose ScoreMax", [
     { icon: "🧠", t: "AI-Adaptive", d: "Questions adapt to your level for maximum learning efficiency." },
     { icon: "📈", t: "Score Guarantee", d: "Improve your score or get a full refund. Period." },
     { icon: "📊", t: "Analytics Dashboard", d: "Track progress, identify weak areas, and optimize study time." },
     { icon: "👩‍🏫", t: "Expert Tutors", d: "On-demand access to 99th percentile tutors." },
   ], "#0f172a", "#ffffff"),
   stats([{ val: "+200pts", label: "Avg SAT Improvement" }, { val: "98%", label: "Score Guarantee Met" }, { val: "300K+", label: "Students" }], "#1e293b", "#ffffff"),
   pricing([
     { name: "Self-Study", price: "$49", features: ["Full question bank", "AI adaptation", "Practice tests"] },
     { name: "Premium", price: "$149", features: ["Everything in Self-Study", "Video lessons", "5 tutor sessions", "Score guarantee"], accent: true },
     { name: "Elite", price: "$399", features: ["Unlimited tutoring", "Custom study plan", "Priority support", "Essay review"] },
   ], "#0f172a", "#ffffff"),
   ctaSection("Start Improving Today", "Free diagnostic test + personalized study plan.", "Take Free Test", "#ef4444", "#ffffff", "#dc2626"),
   footer("ScoreMax", true)]);

// ═══════════════════════════════════════════════════
// HTTP Handler
// ═══════════════════════════════════════════════════

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mode = "upsert" } = await req.json().catch(() => ({}));
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    if (mode === "reset") await sb.from("templates").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const { data: existing } = await sb.from("templates").select("name");
    const existingNames = new Set((existing || []).map((r: any) => r.name));
    const newTemplates = allTemplates.filter(t => !existingNames.has(t.name));

    let inserted = 0;
    for (let i = 0; i < newTemplates.length; i += 10) {
      const batch = newTemplates.slice(i, i + 10);
      const { error } = await sb.from("templates").insert(batch);
      if (!error) inserted += batch.length;
    }

    const cats: Record<string, number> = {};
    allTemplates.forEach(t => { cats[t.category] = (cats[t.category] || 0) + 1; });

    return new Response(JSON.stringify({
      success: true, total: allTemplates.length, inserted, skipped: allTemplates.length - inserted, categories: cats,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
