import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: existing } = await supabase.from("templates").select("name");
  const existingNames = new Set((existing || []).map((t: any) => t.name));

  const templates = [
    {
      name: "Travel & Tourism",
      description: "Stunning travel agency site with destination showcases, trip packages, traveler testimonials, and booking CTAs",
      category: "business",
      thumbnail: "✈️",
      is_public: true, is_premium: false,
      tags: ["travel", "tourism", "vacation", "booking", "destinations"],
      installs: 167,
      schema: {
        id: "page-travel", name: "Travel & Tourism",
        sections: [
          { id: "trv-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
            { id: "trv-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#0369a1" }, content: "✈️ Wanderlust", category: "Text" },
            { id: "trv-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Destinations   Packages   About   Blog   Contact", category: "Text" }
          ]},
          { id: "trv-hero", type: "body", label: "Hero", styles: { padding: "160px 40px 140px", textAlign: "center", background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 100%)", color: "#ffffff" }, components: [
            { id: "trv-h1", type: "heading", label: "Headline", styles: { fontSize: "72px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-0.02em" }, content: "Explore the World\nYour Way", category: "Text" },
            { id: "trv-sub", type: "paragraph", label: "Subtitle", styles: { color: "#bae6fd", margin: "24px auto 40px", fontSize: "18px", maxWidth: "560px", lineHeight: "1.6" }, content: "Curated travel experiences to 100+ destinations. From tropical beaches to mountain adventures — your dream trip awaits.", category: "Text" },
            { id: "trv-cta", type: "button", label: "CTA", styles: { color: "#0369a1", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#ffffff" }, content: "Explore Destinations", category: "Basic" }
          ]},
          { id: "trv-dest", type: "body", label: "Destinations", styles: { padding: "100px 40px", backgroundColor: "#f0f9ff" }, components: [
            { id: "trv-d-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#0c4a6e" }, content: "Top Destinations", category: "Text" },
            { id: "trv-d1", type: "feature-card", label: "Destination", props: { icon: "🏝️", title: "Bali, Indonesia", description: "Pristine beaches, ancient temples, and lush rice terraces. From $1,299/person." }, styles: {}, category: "Layout" },
            { id: "trv-d2", type: "feature-card", label: "Destination", props: { icon: "🗼", title: "Paris, France", description: "The City of Light — art, cuisine, and romance. From $1,599/person." }, styles: {}, category: "Layout" },
            { id: "trv-d3", type: "feature-card", label: "Destination", props: { icon: "🏔️", title: "Swiss Alps", description: "Breathtaking mountain scenery and world-class skiing. From $1,899/person." }, styles: {}, category: "Layout" }
          ]},
          { id: "trv-why", type: "body", label: "Why Us", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
            { id: "trv-w-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#0c4a6e" }, content: "Why Travel With Us", category: "Text" },
            { id: "trv-w1", type: "feature-card", label: "Feature", props: { icon: "🎯", title: "Personalized Itineraries", description: "Every trip is custom-designed to match your interests and travel style." }, styles: {}, category: "Layout" },
            { id: "trv-w2", type: "feature-card", label: "Feature", props: { icon: "🛡️", title: "Travel Protection", description: "Comprehensive insurance and 24/7 emergency support worldwide." }, styles: {}, category: "Layout" },
            { id: "trv-w3", type: "feature-card", label: "Feature", props: { icon: "💎", title: "Exclusive Access", description: "VIP experiences, private tours, and hidden gems only locals know." }, styles: {}, category: "Layout" }
          ]},
          { id: "trv-cta2", type: "body", label: "CTA", styles: { padding: "100px 40px", textAlign: "center", background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)" }, components: [
            { id: "trv-c-h", type: "heading", label: "CTA", styles: { margin: "0 0 20px 0", fontSize: "44px", fontWeight: "800", color: "#0c4a6e" }, content: "Ready for your next adventure?", category: "Text" },
            { id: "trv-c-p", type: "paragraph", label: "Text", styles: { color: "#0369a1", margin: "0 auto 36px", maxWidth: "480px", fontSize: "16px", lineHeight: "1.6" }, content: "Get a free consultation with our travel experts and start planning today.", category: "Text" },
            { id: "trv-c-b", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#0369a1" }, content: "Plan My Trip", category: "Basic" }
          ]},
          { id: "trv-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#f8fafc" }, components: [
            { id: "trv-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 Wanderlust Travel Co. All rights reserved. IATA Accredited.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Restaurant Delivery",
      description: "Modern food delivery and restaurant ordering site with menu categories, featured dishes, delivery info, and order CTAs",
      category: "food",
      thumbnail: "🍕",
      is_public: true, is_premium: false,
      tags: ["restaurant", "delivery", "food", "ordering", "takeout"],
      installs: 234,
      schema: {
        id: "page-delivery", name: "Restaurant Delivery",
        sections: [
          { id: "del-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
            { id: "del-logo", type: "heading", label: "Logo", styles: { fontSize: "24px", fontWeight: "800", color: "#dc2626" }, content: "🍕 FreshBite", category: "Text" },
            { id: "del-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Menu   Specials   Delivery   About   Track Order", category: "Text" }
          ]},
          { id: "del-hero", type: "body", label: "Hero", styles: { padding: "120px 40px 100px", textAlign: "center", background: "linear-gradient(180deg, #fef2f2 0%, #fee2e2 50%, #fef2f2 100%)" }, components: [
            { id: "del-h1", type: "heading", label: "Headline", styles: { fontSize: "68px", fontWeight: "900", lineHeight: "1.05", color: "#991b1b" }, content: "Delicious Food\nAt Your Door", category: "Text" },
            { id: "del-sub", type: "paragraph", label: "Subtitle", styles: { color: "#dc2626", margin: "24px auto 40px", fontSize: "18px", maxWidth: "520px", lineHeight: "1.6" }, content: "Fresh ingredients, bold flavors, delivered in 30 minutes or less. Free delivery on your first order!", category: "Text" },
            { id: "del-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#dc2626" }, content: "Order Now — Free Delivery", category: "Basic" }
          ]},
          { id: "del-menu", type: "body", label: "Menu", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
            { id: "del-m-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#991b1b" }, content: "Our Menu", category: "Text" },
            { id: "del-m1", type: "feature-card", label: "Category", props: { icon: "🍕", title: "Artisan Pizzas", description: "Hand-tossed dough, San Marzano tomatoes, and premium toppings. From $12." }, styles: {}, category: "Layout" },
            { id: "del-m2", type: "feature-card", label: "Category", props: { icon: "🍔", title: "Gourmet Burgers", description: "Wagyu beef, brioche buns, house-made sauces, and crispy fries. From $14." }, styles: {}, category: "Layout" },
            { id: "del-m3", type: "feature-card", label: "Category", props: { icon: "🥗", title: "Fresh Salads & Bowls", description: "Farm-fresh greens, grains, and protein — healthy never tasted so good. From $10." }, styles: {}, category: "Layout" }
          ]},
          { id: "del-how", type: "body", label: "How It Works", styles: { padding: "100px 40px", backgroundColor: "#fef2f2" }, components: [
            { id: "del-hw-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#991b1b" }, content: "How It Works", category: "Text" },
            { id: "del-hw1", type: "feature-card", label: "Step", props: { icon: "📱", title: "1. Browse & Order", description: "Pick your favorites from our menu and customize to your taste." }, styles: {}, category: "Layout" },
            { id: "del-hw2", type: "feature-card", label: "Step", props: { icon: "👨‍🍳", title: "2. We Prepare", description: "Our chefs craft your meal fresh, using only the finest ingredients." }, styles: {}, category: "Layout" },
            { id: "del-hw3", type: "feature-card", label: "Step", props: { icon: "🚴", title: "3. Fast Delivery", description: "Hot, fresh food at your door in 30 minutes or it's on us." }, styles: {}, category: "Layout" }
          ]},
          { id: "del-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#ffffff" }, components: [
            { id: "del-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 FreshBite. Open daily 11AM–11PM. Free delivery over $25.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "SaaS Dashboard",
      description: "Clean SaaS analytics dashboard landing page with feature highlights, integrations, metrics showcase, and pricing",
      category: "tech",
      thumbnail: "📊",
      is_public: true, is_premium: false,
      tags: ["saas", "dashboard", "analytics", "metrics", "software"],
      installs: 289,
      schema: {
        id: "page-saas-dash", name: "SaaS Dashboard",
        sections: [
          { id: "sd-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#09090b", color: "#ffffff" }, components: [
            { id: "sd-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700" }, content: "📊 Metrica", category: "Text" },
            { id: "sd-links", type: "paragraph", label: "Nav", styles: { opacity: "0.6", fontSize: "13px", fontWeight: "500" }, content: "Features   Integrations   Pricing   Docs   Login", category: "Text" }
          ]},
          { id: "sd-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #09090b 0%, #18181b 50%, #09090b 100%)", color: "#ffffff" }, components: [
            { id: "sd-badge", type: "paragraph", label: "Badge", styles: { fontSize: "13px", color: "#a78bfa", marginBottom: "20px", letterSpacing: "1px", fontWeight: "600" }, content: "✨ Now with AI-powered insights", category: "Text" },
            { id: "sd-h1", type: "heading", label: "Headline", styles: { fontSize: "68px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-0.03em" }, content: "Your data.\nBeautifully clear.", category: "Text" },
            { id: "sd-sub", type: "paragraph", label: "Subtitle", styles: { color: "#a1a1aa", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px", lineHeight: "1.6" }, content: "Real-time dashboards, custom reports, and AI insights — all in one platform. No SQL required.", category: "Text" },
            { id: "sd-cta", type: "button", label: "CTA", styles: { color: "#09090b", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#ffffff" }, content: "Start Free Trial", category: "Basic" }
          ]},
          { id: "sd-features", type: "body", label: "Features", styles: { padding: "100px 40px", backgroundColor: "#09090b", color: "#ffffff" }, components: [
            { id: "sd-f-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Built for modern teams", category: "Text" },
            { id: "sd-f1", type: "feature-card", label: "Feature", props: { icon: "📈", title: "Real-Time Analytics", description: "Live dashboards that update in milliseconds. Monitor KPIs as they happen." }, styles: {}, category: "Layout" },
            { id: "sd-f2", type: "feature-card", label: "Feature", props: { icon: "🤖", title: "AI Insights", description: "Automated anomaly detection and natural language queries over your data." }, styles: {}, category: "Layout" },
            { id: "sd-f3", type: "feature-card", label: "Feature", props: { icon: "🔌", title: "200+ Integrations", description: "Connect Postgres, Stripe, Google Analytics, Mixpanel, and more in one click." }, styles: {}, category: "Layout" }
          ]},
          { id: "sd-stats", type: "body", label: "Stats", styles: { padding: "80px 40px", textAlign: "center", background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)", color: "#ffffff" }, components: [
            { id: "sd-st-h", type: "heading", label: "Stats", styles: { fontSize: "36px", fontWeight: "800", marginBottom: "8px" }, content: "10K+ Teams — 50M+ Events/day — 99.99% Uptime", category: "Text" },
            { id: "sd-st-p", type: "paragraph", label: "Text", styles: { color: "#ede9fe", fontSize: "16px" }, content: "Trusted by startups and Fortune 500 companies alike.", category: "Text" }
          ]},
          { id: "sd-pricing", type: "body", label: "Pricing", styles: { padding: "100px 40px", backgroundColor: "#18181b", color: "#ffffff" }, components: [
            { id: "sd-pr-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Simple, transparent pricing", category: "Text" },
            { id: "sd-pr1", type: "pricing-card", label: "Starter", props: { name: "Starter", price: "$0", period: "/month", featured: false }, styles: {}, category: "Layout" },
            { id: "sd-pr2", type: "pricing-card", label: "Pro", props: { name: "Pro", price: "$49", period: "/month", featured: true }, styles: {}, category: "Layout" },
            { id: "sd-pr3", type: "pricing-card", label: "Enterprise", props: { name: "Enterprise", price: "Custom", period: "", featured: false }, styles: {}, category: "Layout" }
          ]},
          { id: "sd-footer", type: "footer", label: "Footer", styles: { color: "#71717a", padding: "48px 40px", borderTop: "1px solid #27272a", textAlign: "center", backgroundColor: "#09090b" }, components: [
            { id: "sd-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.6" }, content: "© 2026 Metrica Inc. SOC 2 Compliant. GDPR Ready.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Personal Blog",
      description: "Minimal personal blog with author bio, featured posts, newsletter signup, and clean reading experience",
      category: "content",
      thumbnail: "✍️",
      is_public: true, is_premium: false,
      tags: ["blog", "personal", "writing", "journal", "newsletter"],
      installs: 195,
      schema: {
        id: "page-personal-blog", name: "Personal Blog",
        sections: [
          { id: "pb-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "20px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff" }, components: [
            { id: "pb-logo", type: "heading", label: "Logo", styles: { fontSize: "20px", fontWeight: "600", color: "#1c1917" }, content: "✍️ sarah writes", category: "Text" },
            { id: "pb-links", type: "paragraph", label: "Nav", styles: { opacity: "0.5", fontSize: "14px", fontWeight: "400", color: "#1c1917" }, content: "Essays   Projects   About   Newsletter", category: "Text" }
          ]},
          { id: "pb-hero", type: "body", label: "Hero", styles: { padding: "100px 40px 80px", maxWidth: "680px", margin: "0 auto", backgroundColor: "#ffffff" }, components: [
            { id: "pb-h1", type: "heading", label: "Headline", styles: { fontSize: "48px", fontWeight: "700", lineHeight: "1.15", color: "#1c1917", letterSpacing: "-0.02em" }, content: "Hi, I'm Sarah 👋", category: "Text" },
            { id: "pb-bio", type: "paragraph", label: "Bio", styles: { color: "#57534e", margin: "20px 0 0 0", fontSize: "18px", lineHeight: "1.8" }, content: "I write about technology, design, and the art of building things on the internet. Currently a senior engineer at a startup in San Francisco. Previously at Google and Stripe.", category: "Text" }
          ]},
          { id: "pb-posts", type: "body", label: "Latest Posts", styles: { padding: "60px 40px 80px", maxWidth: "680px", margin: "0 auto", backgroundColor: "#ffffff" }, components: [
            { id: "pb-p-h", type: "heading", label: "Title", styles: { margin: "0 0 32px 0", fontSize: "24px", fontWeight: "600", color: "#1c1917" }, content: "Latest Essays", category: "Text" },
            { id: "pb-p1", type: "paragraph", label: "Post", styles: { padding: "20px 0", fontSize: "16px", borderBottom: "1px solid #e7e5e4", color: "#1c1917", lineHeight: "1.6" }, content: "Why I Quit Big Tech to Join a 5-Person Startup — Mar 2, 2026", category: "Text" },
            { id: "pb-p2", type: "paragraph", label: "Post", styles: { padding: "20px 0", fontSize: "16px", borderBottom: "1px solid #e7e5e4", color: "#1c1917", lineHeight: "1.6" }, content: "The Case for Boring Technology in 2026 — Feb 18, 2026", category: "Text" },
            { id: "pb-p3", type: "paragraph", label: "Post", styles: { padding: "20px 0", fontSize: "16px", borderBottom: "1px solid #e7e5e4", color: "#1c1917", lineHeight: "1.6" }, content: "Design Systems Are a Team Sport — Jan 30, 2026", category: "Text" },
            { id: "pb-p4", type: "paragraph", label: "Post", styles: { padding: "20px 0", fontSize: "16px", borderBottom: "1px solid #e7e5e4", color: "#1c1917", lineHeight: "1.6" }, content: "A Year of Reading: My Top 12 Books from 2025 — Jan 5, 2026", category: "Text" }
          ]},
          { id: "pb-newsletter", type: "body", label: "Newsletter", styles: { padding: "80px 40px", textAlign: "center", backgroundColor: "#fafaf9" }, components: [
            { id: "pb-n-h", type: "heading", label: "Title", styles: { margin: "0 0 12px 0", fontSize: "28px", fontWeight: "600", color: "#1c1917" }, content: "Subscribe to my newsletter", category: "Text" },
            { id: "pb-n-p", type: "paragraph", label: "Text", styles: { color: "#78716c", margin: "0 auto 28px", maxWidth: "420px", fontSize: "15px", lineHeight: "1.6" }, content: "A monthly email with essays, book recommendations, and things I'm thinking about. No spam, unsubscribe anytime.", category: "Text" },
            { id: "pb-n-btn", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "14px 36px", fontSize: "14px", fontWeight: "600", borderRadius: "8px", backgroundColor: "#1c1917" }, content: "Subscribe", category: "Basic" }
          ]},
          { id: "pb-footer", type: "footer", label: "Footer", styles: { color: "#a8a29e", padding: "40px", textAlign: "center", backgroundColor: "#ffffff" }, components: [
            { id: "pb-f-text", type: "paragraph", label: "Footer", styles: { fontSize: "13px" }, content: "© 2026 Sarah Chen. Built with love and too much coffee.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Job Board",
      description: "Professional job board with featured listings, company logos, category filters, and job seeker/employer CTAs",
      category: "tech",
      thumbnail: "💼",
      is_public: true, is_premium: false,
      tags: ["jobs", "careers", "hiring", "recruitment", "board"],
      installs: 178,
      schema: {
        id: "page-jobboard", name: "Job Board",
        sections: [
          { id: "jb-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
            { id: "jb-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#111827" }, content: "💼 HireFlow", category: "Text" },
            { id: "jb-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Browse Jobs   Companies   Salary Guide   Post a Job", category: "Text" }
          ]},
          { id: "jb-hero", type: "body", label: "Hero", styles: { padding: "120px 40px 100px", textAlign: "center", background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)" }, components: [
            { id: "jb-h1", type: "heading", label: "Headline", styles: { fontSize: "60px", fontWeight: "800", lineHeight: "1.08", color: "#111827", letterSpacing: "-0.02em" }, content: "Find Your Next\nGreat Opportunity", category: "Text" },
            { id: "jb-sub", type: "paragraph", label: "Subtitle", styles: { color: "#6b7280", margin: "24px auto 40px", fontSize: "18px", maxWidth: "520px", lineHeight: "1.6" }, content: "10,000+ jobs from top companies. Remote, hybrid, and on-site positions updated daily.", category: "Text" },
            { id: "jb-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#111827" }, content: "Browse All Jobs", category: "Basic" }
          ]},
          { id: "jb-categories", type: "body", label: "Categories", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
            { id: "jb-c-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "36px", textAlign: "center", fontWeight: "800", color: "#111827" }, content: "Browse by Category", category: "Text" },
            { id: "jb-c1", type: "feature-card", label: "Category", props: { icon: "💻", title: "Engineering", description: "1,200+ roles in frontend, backend, DevOps, ML, and more." }, styles: {}, category: "Layout" },
            { id: "jb-c2", type: "feature-card", label: "Category", props: { icon: "🎨", title: "Design", description: "800+ roles in product design, UX research, and brand." }, styles: {}, category: "Layout" },
            { id: "jb-c3", type: "feature-card", label: "Category", props: { icon: "📈", title: "Marketing & Sales", description: "600+ roles in growth, content, partnerships, and revenue." }, styles: {}, category: "Layout" }
          ]},
          { id: "jb-featured", type: "body", label: "Featured Jobs", styles: { padding: "100px 40px", backgroundColor: "#f9fafb" }, components: [
            { id: "jb-fj-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "36px", textAlign: "center", fontWeight: "800", color: "#111827" }, content: "Featured Positions", category: "Text" },
            { id: "jb-fj1", type: "paragraph", label: "Job", styles: { padding: "20px 24px", fontSize: "15px", borderBottom: "1px solid #e5e7eb", backgroundColor: "#ffffff", borderRadius: "12px", marginBottom: "12px", color: "#111827" }, content: "Senior Frontend Engineer — Stripe — Remote — $180K–$220K", category: "Text" },
            { id: "jb-fj2", type: "paragraph", label: "Job", styles: { padding: "20px 24px", fontSize: "15px", borderBottom: "1px solid #e5e7eb", backgroundColor: "#ffffff", borderRadius: "12px", marginBottom: "12px", color: "#111827" }, content: "Product Designer — Figma — San Francisco — $160K–$200K", category: "Text" },
            { id: "jb-fj3", type: "paragraph", label: "Job", styles: { padding: "20px 24px", fontSize: "15px", borderBottom: "1px solid #e5e7eb", backgroundColor: "#ffffff", borderRadius: "12px", marginBottom: "12px", color: "#111827" }, content: "Head of Growth — Linear — Remote (EU) — €140K–€170K", category: "Text" },
            { id: "jb-fj4", type: "paragraph", label: "Job", styles: { padding: "20px 24px", fontSize: "15px", backgroundColor: "#ffffff", borderRadius: "12px", color: "#111827" }, content: "Staff ML Engineer — OpenAI — San Francisco — $250K–$350K", category: "Text" }
          ]},
          { id: "jb-employer", type: "body", label: "Employers", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#111827", color: "#ffffff" }, components: [
            { id: "jb-e-h", type: "heading", label: "CTA", styles: { margin: "0 0 20px 0", fontSize: "40px", fontWeight: "800" }, content: "Hiring? Post a job today.", category: "Text" },
            { id: "jb-e-p", type: "paragraph", label: "Text", styles: { color: "#9ca3af", margin: "0 auto 36px", maxWidth: "460px", fontSize: "16px", lineHeight: "1.6" }, content: "Reach 500K+ qualified candidates. Featured listings get 3x more applications.", category: "Text" },
            { id: "jb-e-btn", type: "button", label: "CTA", styles: { color: "#111827", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#ffffff" }, content: "Post a Job — $299", category: "Basic" }
          ]},
          { id: "jb-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#f9fafb" }, components: [
            { id: "jb-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 HireFlow. Connecting talent with opportunity.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Event & Conference",
      description: "Dynamic event conference site with speaker lineup, schedule, ticket tiers, venue info, sponsor logos, and countdown",
      category: "marketing",
      thumbnail: "🎤",
      is_public: true, is_premium: false,
      tags: ["event", "conference", "summit", "speakers", "tickets"],
      installs: 153,
      schema: {
        id: "page-event", name: "Event & Conference",
        sections: [
          { id: "ev-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#0f172a", color: "#ffffff" }, components: [
            { id: "ev-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700" }, content: "🎤 DevSummit '26", category: "Text" },
            { id: "ev-links", type: "paragraph", label: "Nav", styles: { opacity: "0.6", fontSize: "13px", fontWeight: "500" }, content: "Speakers   Schedule   Tickets   Venue   Sponsors", category: "Text" }
          ]},
          { id: "ev-hero", type: "body", label: "Hero", styles: { padding: "160px 40px 140px", textAlign: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)", color: "#ffffff" }, components: [
            { id: "ev-date", type: "paragraph", label: "Date", styles: { fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase", color: "#818cf8", marginBottom: "20px", fontWeight: "600" }, content: "June 15–17, 2026  •  San Francisco", category: "Text" },
            { id: "ev-h1", type: "heading", label: "Headline", styles: { fontSize: "72px", fontWeight: "900", lineHeight: "1.02", letterSpacing: "-0.03em" }, content: "The Future of\nDeveloper Tools", category: "Text" },
            { id: "ev-sub", type: "paragraph", label: "Subtitle", styles: { color: "#a5b4fc", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px", lineHeight: "1.6" }, content: "3 days, 50+ speakers, 2000+ developers. The biggest developer conference of the year.", category: "Text" },
            { id: "ev-cta", type: "button", label: "CTA", styles: { color: "#0f172a", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#818cf8" }, content: "Get Early Bird Tickets — $199", category: "Basic" }
          ]},
          { id: "ev-speakers", type: "body", label: "Speakers", styles: { padding: "100px 40px", backgroundColor: "#0f172a", color: "#ffffff" }, components: [
            { id: "ev-s-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Featured Speakers", category: "Text" },
            { id: "ev-s1", type: "feature-card", label: "Speaker", props: { icon: "👩‍💻", title: "Sarah Chen", description: "CTO at Vercel — \"The Next Wave of Edge Computing\"" }, styles: {}, category: "Layout" },
            { id: "ev-s2", type: "feature-card", label: "Speaker", props: { icon: "👨‍💻", title: "Alex Rivera", description: "Co-founder of Linear — \"Building Products That Last\"" }, styles: {}, category: "Layout" },
            { id: "ev-s3", type: "feature-card", label: "Speaker", props: { icon: "👩‍🔬", title: "Dr. Maya Patel", description: "AI Research Lead at DeepMind — \"AI-Assisted Development\"" }, styles: {}, category: "Layout" }
          ]},
          { id: "ev-schedule", type: "body", label: "Schedule", styles: { padding: "100px 40px", backgroundColor: "#1e1b4b", color: "#ffffff" }, components: [
            { id: "ev-sc-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "36px", textAlign: "center", fontWeight: "800" }, content: "Schedule Highlights", category: "Text" },
            { id: "ev-sc1", type: "paragraph", label: "Event", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #312e81", textAlign: "center" }, content: "Day 1 — Keynotes & AI/ML Track — 9:00 AM – 6:00 PM", category: "Text" },
            { id: "ev-sc2", type: "paragraph", label: "Event", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #312e81", textAlign: "center" }, content: "Day 2 — Workshops & DevTools Track — 9:00 AM – 6:00 PM", category: "Text" },
            { id: "ev-sc3", type: "paragraph", label: "Event", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #312e81", textAlign: "center" }, content: "Day 3 — Hackathon & Closing Party — 10:00 AM – 10:00 PM", category: "Text" }
          ]},
          { id: "ev-tickets", type: "body", label: "Tickets", styles: { padding: "100px 40px", backgroundColor: "#0f172a", color: "#ffffff" }, components: [
            { id: "ev-t-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Get Your Ticket", category: "Text" },
            { id: "ev-t1", type: "pricing-card", label: "Community", props: { name: "Community", price: "$199", period: " early bird", featured: false }, styles: {}, category: "Layout" },
            { id: "ev-t2", type: "pricing-card", label: "Pro", props: { name: "Pro", price: "$499", period: " all access", featured: true }, styles: {}, category: "Layout" },
            { id: "ev-t3", type: "pricing-card", label: "VIP", props: { name: "VIP", price: "$999", period: " + workshops", featured: false }, styles: {}, category: "Layout" }
          ]},
          { id: "ev-footer", type: "footer", label: "Footer", styles: { color: "#6366f1", padding: "48px 40px", borderTop: "1px solid #1e1b4b", textAlign: "center", backgroundColor: "#0f172a" }, components: [
            { id: "ev-social", type: "social-icons", label: "Social", props: { size: "28", layout: "horizontal" }, styles: {}, category: "Widgets" },
            { id: "ev-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5", color: "#94a3b8", marginTop: "16px" }, content: "© 2026 DevSummit. Organized by TechEvents Inc.", category: "Text" }
          ]}
        ]
      }
    }
  ];

  const toInsert = templates.filter(t => !existingNames.has(t.name));

  if (toInsert.length === 0) {
    return new Response(JSON.stringify({ message: "All templates already exist", count: 0 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const { data, error } = await supabase.from("templates").insert(toInsert).select("id, name");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ success: true, inserted: data.length, templates: data }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});
