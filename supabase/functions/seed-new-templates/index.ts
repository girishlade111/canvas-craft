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
      name: "Fitness & Gym",
      description: "High-energy fitness studio site with class schedules, trainer profiles, membership plans, and motivational CTAs",
      category: "business",
      thumbnail: "💪",
      is_public: true, is_premium: false,
      tags: ["fitness", "gym", "health", "workout"],
      installs: 187,
      schema: {
        id: "page-fitness", name: "Fitness & Gym",
        sections: [
          { id: "fit-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#0f0f0f", color: "#ffffff" }, components: [
            { id: "fit-logo", type: "heading", label: "Logo", styles: { fontSize: "24px", fontWeight: "800", letterSpacing: "2px" }, content: "💪 IRONFIT", category: "Text" },
            { id: "fit-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500" }, content: "Classes   Trainers   Membership   Contact", category: "Text" }
          ]},
          { id: "fit-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", color: "#ffffff", background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)" }, components: [
            { id: "fit-h1", type: "heading", label: "Headline", styles: { fontSize: "72px", fontWeight: "900", lineHeight: "1.05", letterSpacing: "-0.02em" }, content: "Transform Your\nBody & Mind", category: "Text" },
            { id: "fit-sub", type: "paragraph", label: "Subtitle", styles: { color: "#94a3b8", margin: "24px auto 40px", fontSize: "18px", maxWidth: "560px", lineHeight: "1.6" }, content: "State-of-the-art equipment, expert trainers, and 50+ weekly classes. Your fitness journey starts here.", category: "Text" },
            { id: "fit-cta", type: "button", label: "CTA", styles: { color: "#0f0f0f", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "8px", backgroundColor: "#f59e0b" }, content: "Start Free Trial", category: "Basic" }
          ]},
          { id: "fit-classes", type: "body", label: "Classes", styles: { padding: "100px 40px", backgroundColor: "#0f0f0f", color: "#ffffff" }, components: [
            { id: "fit-cl-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Our Classes", category: "Text" },
            { id: "fit-cl1", type: "feature-card", label: "Class", props: { icon: "🏋️", title: "Strength Training", description: "Build muscle and increase power with guided weightlifting sessions." }, styles: {}, category: "Layout" },
            { id: "fit-cl2", type: "feature-card", label: "Class", props: { icon: "🧘", title: "Yoga & Flexibility", description: "Improve flexibility and find inner peace with expert yoga instructors." }, styles: {}, category: "Layout" },
            { id: "fit-cl3", type: "feature-card", label: "Class", props: { icon: "🥊", title: "Boxing & HIIT", description: "High-intensity interval training combined with boxing techniques." }, styles: {}, category: "Layout" }
          ]},
          { id: "fit-pricing", type: "body", label: "Membership", styles: { padding: "100px 40px", backgroundColor: "#1a1a2e", color: "#ffffff" }, components: [
            { id: "fit-pr-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Membership Plans", category: "Text" },
            { id: "fit-pr1", type: "pricing-card", label: "Basic", props: { name: "Basic", price: "$29", period: "/month", featured: false }, styles: {}, category: "Layout" },
            { id: "fit-pr2", type: "pricing-card", label: "Pro", props: { name: "Pro", price: "$59", period: "/month", featured: true }, styles: {}, category: "Layout" },
            { id: "fit-pr3", type: "pricing-card", label: "Elite", props: { name: "Elite", price: "$99", period: "/month", featured: false }, styles: {}, category: "Layout" }
          ]},
          { id: "fit-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #1e293b", textAlign: "center", backgroundColor: "#0f0f0f" }, components: [
            { id: "fit-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.6" }, content: "© 2026 IRONFIT. All rights reserved.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Real Estate",
      description: "Professional real estate agency site with property listings, agent profiles, neighborhood guides, and contact forms",
      category: "business",
      thumbnail: "🏡",
      is_public: true, is_premium: false,
      tags: ["real-estate", "property", "housing", "agent"],
      installs: 213,
      schema: {
        id: "page-realestate", name: "Real Estate",
        sections: [
          { id: "re-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
            { id: "re-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#1e3a5f" }, content: "🏡 HomeVista", category: "Text" },
            { id: "re-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Listings   Agents   Neighborhoods   Contact", category: "Text" }
          ]},
          { id: "re-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #1e3a5f 0%, #2d5a87 100%)", color: "#ffffff" }, components: [
            { id: "re-h1", type: "heading", label: "Headline", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08" }, content: "Find Your\nDream Home", category: "Text" },
            { id: "re-sub", type: "paragraph", label: "Subtitle", styles: { color: "#bfdbfe", margin: "24px auto 40px", fontSize: "18px", maxWidth: "520px", lineHeight: "1.6" }, content: "Discover exceptional properties in the most sought-after neighborhoods. Your perfect home is waiting.", category: "Text" },
            { id: "re-cta", type: "button", label: "CTA", styles: { color: "#1e3a5f", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#ffffff" }, content: "Browse Listings", category: "Basic" }
          ]},
          { id: "re-features", type: "body", label: "Services", styles: { padding: "100px 40px", backgroundColor: "#f8fafc" }, components: [
            { id: "re-f-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#1e3a5f" }, content: "Why Choose Us", category: "Text" },
            { id: "re-f1", type: "feature-card", label: "Feature", props: { icon: "🔑", title: "Expert Agents", description: "Certified agents with decades of local market expertise." }, styles: {}, category: "Layout" },
            { id: "re-f2", type: "feature-card", label: "Feature", props: { icon: "📊", title: "Market Insights", description: "Real-time market data and analysis for informed decisions." }, styles: {}, category: "Layout" },
            { id: "re-f3", type: "feature-card", label: "Feature", props: { icon: "🏠", title: "Virtual Tours", description: "Explore properties with immersive 3D virtual walkthroughs." }, styles: {}, category: "Layout" }
          ]},
          { id: "re-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#f8fafc" }, components: [
            { id: "re-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 HomeVista Realty. All rights reserved.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Wedding",
      description: "Elegant wedding invitation site with couple story, event details, RSVP section, and registry links",
      category: "creative",
      thumbnail: "💍",
      is_public: true, is_premium: false,
      tags: ["wedding", "invitation", "event", "love"],
      installs: 156,
      schema: {
        id: "page-wedding", name: "Wedding",
        sections: [
          { id: "wed-hero", type: "header", label: "Hero", styles: { padding: "160px 40px 140px", textAlign: "center", background: "linear-gradient(180deg, #fdf2f8 0%, #fff1f2 50%, #fdf2f8 100%)", color: "#881337" }, components: [
            { id: "wed-date", type: "paragraph", label: "Date", styles: { fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", opacity: "0.6", marginBottom: "24px" }, content: "September 15, 2026", category: "Text" },
            { id: "wed-h1", type: "heading", label: "Names", styles: { fontSize: "72px", fontWeight: "300", lineHeight: "1.1", letterSpacing: "-0.02em" }, content: "Emma & James", category: "Text" },
            { id: "wed-sub", type: "paragraph", label: "Subtitle", styles: { color: "#9f1239", margin: "20px auto 40px", fontSize: "18px", maxWidth: "480px", lineHeight: "1.6", fontStyle: "italic" }, content: "We joyfully invite you to celebrate our wedding", category: "Text" }
          ]},
          { id: "wed-story", type: "body", label: "Our Story", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#ffffff" }, components: [
            { id: "wed-s-h", type: "heading", label: "Title", styles: { margin: "0 0 24px 0", fontSize: "36px", fontWeight: "300", color: "#881337" }, content: "Our Love Story", category: "Text" },
            { id: "wed-s-p", type: "paragraph", label: "Story", styles: { color: "#6b7280", margin: "0 auto", fontSize: "16px", maxWidth: "600px", lineHeight: "1.8" }, content: "We met on a rainy afternoon in October 2020 at a cozy bookshop downtown. What started as a conversation about our favorite novels turned into coffee, then dinner, and now — forever.", category: "Text" }
          ]},
          { id: "wed-details", type: "body", label: "Event Details", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#fdf2f8" }, components: [
            { id: "wed-d-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "36px", fontWeight: "300", color: "#881337" }, content: "Wedding Details", category: "Text" },
            { id: "wed-d1", type: "feature-card", label: "Ceremony", props: { icon: "⛪", title: "Ceremony — 3:00 PM", description: "Grace Cathedral, 1100 California St, San Francisco" }, styles: {}, category: "Layout" },
            { id: "wed-d2", type: "feature-card", label: "Reception", props: { icon: "🥂", title: "Reception — 6:00 PM", description: "The Palace Hotel Grand Ballroom, 2 New Montgomery St" }, styles: {}, category: "Layout" },
            { id: "wed-d3", type: "feature-card", label: "Dress Code", props: { icon: "👔", title: "Black Tie Optional", description: "Formal attire. Dancing shoes strongly encouraged!" }, styles: {}, category: "Layout" }
          ]},
          { id: "wed-rsvp", type: "body", label: "RSVP", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#ffffff" }, components: [
            { id: "wed-r-h", type: "heading", label: "RSVP", styles: { margin: "0 0 20px 0", fontSize: "36px", fontWeight: "300", color: "#881337" }, content: "RSVP", category: "Text" },
            { id: "wed-r-p", type: "paragraph", label: "Text", styles: { color: "#6b7280", margin: "0 auto 36px", maxWidth: "480px", fontSize: "16px", lineHeight: "1.6" }, content: "Kindly respond by August 1, 2026. We can't wait to celebrate with you!", category: "Text" },
            { id: "wed-r-btn", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "600", borderRadius: "100px", backgroundColor: "#881337" }, content: "Respond Now", category: "Basic" }
          ]},
          { id: "wed-footer", type: "footer", label: "Footer", styles: { color: "#9f1239", padding: "48px 40px", textAlign: "center", backgroundColor: "#fdf2f8" }, components: [
            { id: "wed-f-text", type: "paragraph", label: "Footer", styles: { fontSize: "14px", fontStyle: "italic", opacity: "0.7" }, content: "With love, Emma & James ♡", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Music & Band",
      description: "Bold music artist site with album showcase, tour dates, merch section, and social links",
      category: "creative",
      thumbnail: "🎸",
      is_public: true, is_premium: false,
      tags: ["music", "band", "artist", "tour", "album"],
      installs: 198,
      schema: {
        id: "page-music", name: "Music & Band",
        sections: [
          { id: "mus-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#000000", color: "#ffffff" }, components: [
            { id: "mus-logo", type: "heading", label: "Logo", styles: { fontSize: "24px", fontWeight: "900", letterSpacing: "3px" }, content: "🎸 ECHOES", category: "Text" },
            { id: "mus-links", type: "paragraph", label: "Nav", styles: { opacity: "0.6", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }, content: "Music   Tour   Videos   Merch   Contact", category: "Text" }
          ]},
          { id: "mus-hero", type: "body", label: "Hero", styles: { padding: "160px 40px 140px", textAlign: "center", background: "linear-gradient(180deg, #000000 0%, #1a0033 50%, #000000 100%)", color: "#ffffff" }, components: [
            { id: "mus-h1", type: "heading", label: "Headline", styles: { fontSize: "80px", fontWeight: "900", lineHeight: "1.0", letterSpacing: "-0.03em" }, content: "NEW ALBUM\nOUT NOW", category: "Text" },
            { id: "mus-sub", type: "paragraph", label: "Subtitle", styles: { color: "#a78bfa", margin: "24px auto 40px", fontSize: "18px", maxWidth: "500px" }, content: "\"Midnight Frequencies\" — 12 tracks of raw energy. Stream everywhere.", category: "Text" },
            { id: "mus-cta", type: "button", label: "CTA", styles: { color: "#000000", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "800", borderRadius: "100px", backgroundColor: "#a78bfa" }, content: "Listen Now", category: "Basic" }
          ]},
          { id: "mus-tour", type: "body", label: "Tour Dates", styles: { padding: "100px 40px", backgroundColor: "#0a0a0a", color: "#ffffff" }, components: [
            { id: "mus-t-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800" }, content: "Tour Dates 2026", category: "Text" },
            { id: "mus-t1", type: "paragraph", label: "Date", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #333", textAlign: "center" }, content: "MAR 15 — Madison Square Garden, New York", category: "Text" },
            { id: "mus-t2", type: "paragraph", label: "Date", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #333", textAlign: "center" }, content: "APR 02 — The O2 Arena, London", category: "Text" },
            { id: "mus-t3", type: "paragraph", label: "Date", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #333", textAlign: "center" }, content: "APR 20 — Olympia, Paris", category: "Text" },
            { id: "mus-t4", type: "paragraph", label: "Date", styles: { padding: "16px 0", fontSize: "15px", borderBottom: "1px solid #333", textAlign: "center" }, content: "MAY 10 — Tokyo Dome, Tokyo", category: "Text" }
          ]},
          { id: "mus-merch", type: "body", label: "Merch", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#1a0033", color: "#ffffff" }, components: [
            { id: "mus-m-h", type: "heading", label: "Title", styles: { margin: "0 0 20px 0", fontSize: "40px", fontWeight: "800" }, content: "Official Merch", category: "Text" },
            { id: "mus-m-p", type: "paragraph", label: "Text", styles: { color: "#a78bfa", margin: "0 auto 36px", maxWidth: "460px", fontSize: "16px" }, content: "Limited edition tour merch and exclusive vinyl pressings.", category: "Text" },
            { id: "mus-m-btn", type: "button", label: "CTA", styles: { color: "#1a0033", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "100px", backgroundColor: "#ffffff" }, content: "Shop Now", category: "Basic" }
          ]},
          { id: "mus-footer", type: "footer", label: "Footer", styles: { color: "#6b7280", padding: "48px 40px", textAlign: "center", backgroundColor: "#000000" }, components: [
            { id: "mus-social", type: "social-icons", label: "Social", props: { size: "28", layout: "horizontal" }, styles: {}, category: "Widgets" },
            { id: "mus-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5", marginTop: "16px" }, content: "© 2026 ECHOES. All rights reserved.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Non-Profit",
      description: "Impactful non-profit site with mission statement, impact statistics, volunteer signup, and donation CTA",
      category: "business",
      thumbnail: "🌍",
      is_public: true, is_premium: false,
      tags: ["nonprofit", "charity", "volunteer", "donate"],
      installs: 142,
      schema: {
        id: "page-nonprofit", name: "Non-Profit",
        sections: [
          { id: "np-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
            { id: "np-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#065f46" }, content: "🌍 GreenHope", category: "Text" },
            { id: "np-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Mission   Impact   Volunteer   Donate", category: "Text" }
          ]},
          { id: "np-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #ecfdf5 100%)" }, components: [
            { id: "np-h1", type: "heading", label: "Headline", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08", color: "#065f46" }, content: "Building a Better\nWorld Together", category: "Text" },
            { id: "np-sub", type: "paragraph", label: "Subtitle", styles: { color: "#047857", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px", lineHeight: "1.6" }, content: "Empowering communities through education, clean water, and sustainable development since 2005.", category: "Text" },
            { id: "np-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#065f46" }, content: "Donate Now", category: "Basic" }
          ]},
          { id: "np-impact", type: "body", label: "Impact", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
            { id: "np-i-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#065f46" }, content: "Our Impact", category: "Text" },
            { id: "np-i1", type: "feature-card", label: "Stat", props: { icon: "🎓", title: "50,000+ Students", description: "Quality education in underserved communities across 12 countries." }, styles: {}, category: "Layout" },
            { id: "np-i2", type: "feature-card", label: "Stat", props: { icon: "💧", title: "200+ Clean Wells", description: "Sustainable clean water systems serving over 100,000 people." }, styles: {}, category: "Layout" },
            { id: "np-i3", type: "feature-card", label: "Stat", props: { icon: "🌱", title: "1M Trees Planted", description: "Reforestation across Southeast Asia and Sub-Saharan Africa." }, styles: {}, category: "Layout" }
          ]},
          { id: "np-volunteer", type: "body", label: "Volunteer", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#065f46", color: "#ffffff" }, components: [
            { id: "np-v-h", type: "heading", label: "CTA", styles: { margin: "0 0 20px 0", fontSize: "44px", fontWeight: "800" }, content: "Join Our Mission", category: "Text" },
            { id: "np-v-p", type: "paragraph", label: "Text", styles: { color: "#a7f3d0", margin: "0 auto 36px", maxWidth: "480px", fontSize: "16px", lineHeight: "1.6" }, content: "Whether you volunteer your time or donate, every contribution makes a difference.", category: "Text" },
            { id: "np-v-btn", type: "button", label: "CTA", styles: { color: "#065f46", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#ffffff" }, content: "Become a Volunteer", category: "Basic" }
          ]},
          { id: "np-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#f8fafc" }, components: [
            { id: "np-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 GreenHope Foundation. 501(c)(3) Non-Profit.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Education",
      description: "Modern online learning platform with course catalog, instructor profiles, and enrollment CTA",
      category: "tech",
      thumbnail: "📚",
      is_public: true, is_premium: false,
      tags: ["education", "courses", "learning", "e-learning"],
      installs: 231,
      schema: {
        id: "page-education", name: "Education",
        sections: [
          { id: "edu-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
            { id: "edu-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#4f46e5" }, content: "📚 LearnHub", category: "Text" },
            { id: "edu-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Courses   Instructors   Pricing   Blog", category: "Text" }
          ]},
          { id: "edu-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #eef2ff 0%, #e0e7ff 50%, #eef2ff 100%)" }, components: [
            { id: "edu-h1", type: "heading", label: "Headline", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08", color: "#312e81" }, content: "Learn Without\nLimits", category: "Text" },
            { id: "edu-sub", type: "paragraph", label: "Subtitle", styles: { color: "#4338ca", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px", lineHeight: "1.6" }, content: "500+ expert-led courses in tech, design, business, and more. Start learning today.", category: "Text" },
            { id: "edu-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#4f46e5" }, content: "Explore Courses", category: "Basic" }
          ]},
          { id: "edu-courses", type: "body", label: "Courses", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
            { id: "edu-c-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#312e81" }, content: "Popular Courses", category: "Text" },
            { id: "edu-c1", type: "feature-card", label: "Course", props: { icon: "💻", title: "Full-Stack Development", description: "Build modern web apps from frontend to backend. 40+ hours." }, styles: {}, category: "Layout" },
            { id: "edu-c2", type: "feature-card", label: "Course", props: { icon: "🎨", title: "UI/UX Design Mastery", description: "Learn design thinking, Figma, prototyping, and user research." }, styles: {}, category: "Layout" },
            { id: "edu-c3", type: "feature-card", label: "Course", props: { icon: "📈", title: "Data Science & AI", description: "Python, machine learning, neural networks, and real-world projects." }, styles: {}, category: "Layout" }
          ]},
          { id: "edu-stats", type: "body", label: "Stats", styles: { padding: "80px 40px", textAlign: "center", backgroundColor: "#4f46e5", color: "#ffffff" }, components: [
            { id: "edu-st-h", type: "heading", label: "Stats", styles: { fontSize: "36px", fontWeight: "800", marginBottom: "8px" }, content: "100K+ Students — 500+ Courses — 50+ Countries", category: "Text" },
            { id: "edu-st-p", type: "paragraph", label: "Text", styles: { color: "#c7d2fe", fontSize: "16px" }, content: "Join the fastest-growing learning community on the web.", category: "Text" }
          ]},
          { id: "edu-pricing", type: "body", label: "Pricing", styles: { padding: "100px 40px", backgroundColor: "#f8fafc" }, components: [
            { id: "edu-pr-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#312e81" }, content: "Simple Pricing", category: "Text" },
            { id: "edu-pr1", type: "pricing-card", label: "Free", props: { name: "Free", price: "$0", period: "/month", featured: false }, styles: {}, category: "Layout" },
            { id: "edu-pr2", type: "pricing-card", label: "Pro", props: { name: "Pro", price: "$19", period: "/month", featured: true }, styles: {}, category: "Layout" },
            { id: "edu-pr3", type: "pricing-card", label: "Team", props: { name: "Teams", price: "$49", period: "/month", featured: false }, styles: {}, category: "Layout" }
          ]},
          { id: "edu-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#ffffff" }, components: [
            { id: "edu-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 LearnHub. All rights reserved.", category: "Text" }
          ]}
        ]
      }
    },
    {
      name: "Medical & Healthcare",
      description: "Professional healthcare site with services, doctor profiles, appointment booking, and patient trust stats",
      category: "business",
      thumbnail: "🏥",
      is_public: true, is_premium: false,
      tags: ["medical", "healthcare", "doctor", "hospital", "clinic"],
      installs: 176,
      schema: {
        id: "page-medical", name: "Medical & Healthcare",
        sections: [
          { id: "med-nav", type: "header", label: "Navigation", styles: { display: "flex", padding: "16px 40px", alignItems: "center", justifyContent: "space-between", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }, components: [
            { id: "med-logo", type: "heading", label: "Logo", styles: { fontSize: "22px", fontWeight: "700", color: "#0e7490" }, content: "🏥 MediCare+", category: "Text" },
            { id: "med-links", type: "paragraph", label: "Nav", styles: { opacity: "0.7", fontSize: "13px", fontWeight: "500", color: "#374151" }, content: "Services   Doctors   Appointments   Insurance   Contact", category: "Text" }
          ]},
          { id: "med-hero", type: "body", label: "Hero", styles: { padding: "140px 40px 120px", textAlign: "center", background: "linear-gradient(180deg, #ecfeff 0%, #cffafe 50%, #ecfeff 100%)" }, components: [
            { id: "med-h1", type: "heading", label: "Headline", styles: { fontSize: "64px", fontWeight: "800", lineHeight: "1.08", color: "#164e63" }, content: "Your Health,\nOur Priority", category: "Text" },
            { id: "med-sub", type: "paragraph", label: "Subtitle", styles: { color: "#0e7490", margin: "24px auto 40px", fontSize: "18px", maxWidth: "540px", lineHeight: "1.6" }, content: "Comprehensive healthcare with compassionate, patient-centered care. Book your appointment today.", category: "Text" },
            { id: "med-cta", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#0e7490" }, content: "Book Appointment", category: "Basic" }
          ]},
          { id: "med-services", type: "body", label: "Services", styles: { padding: "100px 40px", backgroundColor: "#ffffff" }, components: [
            { id: "med-s-h", type: "heading", label: "Title", styles: { margin: "0 0 48px 0", fontSize: "40px", textAlign: "center", fontWeight: "800", color: "#164e63" }, content: "Our Services", category: "Text" },
            { id: "med-s1", type: "feature-card", label: "Service", props: { icon: "🩺", title: "Primary Care", description: "Comprehensive health check-ups, preventive care, and chronic disease management." }, styles: {}, category: "Layout" },
            { id: "med-s2", type: "feature-card", label: "Service", props: { icon: "🫀", title: "Cardiology", description: "Advanced heart diagnostics, treatment plans, and cardiac rehabilitation." }, styles: {}, category: "Layout" },
            { id: "med-s3", type: "feature-card", label: "Service", props: { icon: "🧠", title: "Neurology", description: "Expert neurological assessment, brain health monitoring, and treatment." }, styles: {}, category: "Layout" }
          ]},
          { id: "med-trust", type: "body", label: "Trust", styles: { padding: "80px 40px", textAlign: "center", backgroundColor: "#0e7490", color: "#ffffff" }, components: [
            { id: "med-tr-h", type: "heading", label: "Stats", styles: { fontSize: "36px", fontWeight: "800", marginBottom: "8px" }, content: "25+ Years — 100K+ Patients — 50+ Specialists", category: "Text" },
            { id: "med-tr-p", type: "paragraph", label: "Text", styles: { color: "#a5f3fc", fontSize: "16px" }, content: "Trusted by families across the region for quality healthcare.", category: "Text" }
          ]},
          { id: "med-cta-bottom", type: "body", label: "CTA", styles: { padding: "100px 40px", textAlign: "center", backgroundColor: "#ecfeff" }, components: [
            { id: "med-cta-h", type: "heading", label: "CTA", styles: { margin: "0 0 20px 0", fontSize: "44px", fontWeight: "800", color: "#164e63" }, content: "Ready to get started?", category: "Text" },
            { id: "med-cta-p", type: "paragraph", label: "Text", styles: { color: "#0e7490", margin: "0 auto 36px", maxWidth: "480px", fontSize: "16px", lineHeight: "1.6" }, content: "Schedule your first appointment online or call us at (555) 123-4567.", category: "Text" },
            { id: "med-cta-b", type: "button", label: "CTA", styles: { color: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", backgroundColor: "#0e7490" }, content: "Book Now", category: "Basic" }
          ]},
          { id: "med-footer", type: "footer", label: "Footer", styles: { color: "#64748b", padding: "48px 40px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#ffffff" }, components: [
            { id: "med-f-text", type: "paragraph", label: "Copyright", styles: { fontSize: "12px", opacity: "0.5" }, content: "© 2026 MediCare+ Health System. All rights reserved.", category: "Text" }
          ]}
        ]
      }
    }
  ];

  const toInsert = templates.filter(t => !existingNames.has(t.name));

  if (toInsert.length === 0) {
    return new Response(JSON.stringify({ message: "All 7 templates already exist", count: 0 }), {
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
