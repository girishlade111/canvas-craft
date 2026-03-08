import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/* ================================================================
   ELEMENT BUILDER HELPERS
   ================================================================ */
let _id = 0;
const uid = (p: string) => `${p}-${++_id}-${Date.now().toString(36)}`;

const comp = (type: string, label: string, content: string, styles: Record<string, string>, extra: Record<string, any> = {}) => ({
  id: uid(type),
  type,
  label,
  content,
  category: extra.category || "Text",
  styles,
  ...(extra.props ? { props: extra.props } : {}),
  ...(extra.children ? { children: extra.children } : {}),
});

/* ================================================================
   INTERACTIVE ELEMENT DEFINITIONS
   ================================================================ */
const elements: any[] = [];

const add = (
  name: string,
  description: string,
  category: string,
  subcategory: string,
  thumbnail: string,
  animation_type: string,
  compatible_sections: string[],
  tags: string[],
  schema: any[],
  preview_css?: string
) => {
  _id = 0;
  elements.push({
    name,
    description,
    category,
    subcategory,
    thumbnail,
    animation_type,
    element_schema: { components: schema },
    preview_css: preview_css || null,
    compatible_sections,
    tags,
    is_public: true,
    is_premium: false,
    installs: 50 + Math.floor(Math.random() * 200),
  });
};

// ════════════════════════════════════════
// ANIMATED HERO ELEMENTS
// ════════════════════════════════════════

add("Fade-In Hero Title", "Large hero headline with smooth fade-in and upward slide animation", "hero", "titles",
  "✨", "fade-in", ["header", "body"], ["hero", "title", "fade", "animated"],
  [
    comp("heading", "Animated Title", "Welcome to the Future", {
      fontSize: "72px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-0.03em",
      opacity: "0", animation: "fadeInUp 0.8s ease-out forwards",
    }),
    comp("paragraph", "Subtitle", "Building the next generation of digital experiences", {
      fontSize: "20px", color: "#6b7280", marginTop: "16px", maxWidth: "560px",
      opacity: "0", animation: "fadeInUp 0.8s ease-out 0.2s forwards",
    }),
  ],
  `@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`
);

add("Typewriter Hero", "Hero text with typewriter animation effect and blinking cursor", "hero", "titles",
  "⌨️", "typewriter", ["header", "body"], ["hero", "typewriter", "text", "animated"],
  [
    comp("heading", "Typewriter Text", "Build. Ship. Grow.", {
      fontSize: "64px", fontWeight: "800", fontFamily: "monospace",
      borderRight: "3px solid #6366f1", paddingRight: "8px",
      animation: "typing 3s steps(16) forwards, blink 0.7s step-end infinite",
      overflow: "hidden", whiteSpace: "nowrap", width: "0",
    }),
  ],
  `@keyframes typing { from { width: 0; } to { width: 100%; } } @keyframes blink { 50% { border-color: transparent; } }`
);

add("Gradient Text Hero", "Eye-catching animated gradient flowing through hero text", "hero", "titles",
  "🌈", "gradient", ["header", "body"], ["hero", "gradient", "colorful", "animated"],
  [
    comp("heading", "Gradient Title", "Create Something\nExtraordinary", {
      fontSize: "68px", fontWeight: "800", lineHeight: "1.08",
      background: "linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #6366f1)",
      backgroundSize: "300% 100%",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      animation: "gradientShift 4s ease infinite",
    }),
  ],
  `@keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`
);

add("Scale-In Hero Block", "Hero section that scales in from center with bounce effect", "hero", "blocks",
  "🔲", "scale", ["body"], ["hero", "scale", "bounce", "animated"],
  [
    comp("card", "Hero Block", "", {
      padding: "80px 48px", textAlign: "center", borderRadius: "24px",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", color: "#ffffff",
      animation: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      transform: "scale(0.8)", opacity: "0",
    }, {
      category: "Layout",
      children: [
        comp("heading", "Title", "Launch Your Vision", { fontSize: "48px", fontWeight: "800", marginBottom: "16px" }),
        comp("paragraph", "Sub", "Everything you need to build and grow", { fontSize: "18px", opacity: "0.9", marginBottom: "32px" }),
        comp("button", "CTA", "Get Started Free", { color: "#6366f1", backgroundColor: "#ffffff", border: "none", padding: "16px 40px", fontSize: "15px", fontWeight: "700", borderRadius: "12px" }, { category: "Basic" }),
      ],
    }),
  ],
  `@keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }`
);

add("Parallax Hero Image", "Hero with parallax-style layered text and depth effect", "hero", "blocks",
  "🏔️", "parallax", ["body"], ["hero", "parallax", "depth", "layered"],
  [
    comp("heading", "Background Text", "INNOVATE", {
      fontSize: "160px", fontWeight: "900", color: "rgba(99,102,241,0.06)", textAlign: "center",
      position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      letterSpacing: "20px", whiteSpace: "nowrap",
    }),
    comp("heading", "Foreground Title", "The Future is Now", {
      fontSize: "56px", fontWeight: "800", textAlign: "center", position: "relative", zIndex: "2",
      animation: "fadeInUp 0.8s ease-out forwards", opacity: "0",
    }),
    comp("paragraph", "Subtitle", "Pioneering solutions for tomorrow's challenges", {
      fontSize: "18px", color: "#6b7280", textAlign: "center", position: "relative", zIndex: "2",
      marginTop: "16px", animation: "fadeInUp 0.8s ease-out 0.3s forwards", opacity: "0",
    }),
  ],
  `@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`
);

// ════════════════════════════════════════
// ANIMATED BUTTONS
// ════════════════════════════════════════

add("Pulse Glow Button", "CTA button with pulsing glow shadow animation", "buttons", "cta",
  "💡", "pulse", ["header", "body", "footer"], ["button", "pulse", "glow", "cta"],
  [
    comp("button", "Pulse Button", "Start Free Trial", {
      color: "#ffffff", backgroundColor: "#6366f1", border: "none",
      padding: "18px 48px", fontSize: "16px", fontWeight: "700", borderRadius: "12px",
      animation: "pulseGlow 2s ease-in-out infinite",
      boxShadow: "0 0 20px rgba(99,102,241,0.4)",
    }, { category: "Basic" }),
  ],
  `@keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.4); } 50% { box-shadow: 0 0 40px rgba(99,102,241,0.8); } }`
);

add("Slide-Fill Button", "Button with color fill sliding in from left on hover", "buttons", "hover",
  "➡️", "slide", ["header", "body", "footer"], ["button", "slide", "hover", "fill"],
  [
    comp("button", "Slide Button", "Learn More →", {
      color: "#6366f1", backgroundColor: "transparent",
      border: "2px solid #6366f1", padding: "16px 44px",
      fontSize: "15px", fontWeight: "700", borderRadius: "10px",
      backgroundImage: "linear-gradient(90deg, #6366f1 50%, transparent 50%)",
      backgroundSize: "200% 100%", backgroundPosition: "right",
      transition: "all 0.4s ease",
    }, { category: "Basic" }),
  ],
  `.slide-fill-btn:hover { background-position: left; color: #ffffff; }`
);

add("Magnetic Button", "Button that follows cursor with a magnetic pull effect", "buttons", "interactive",
  "🧲", "magnetic", ["header", "body"], ["button", "magnetic", "interactive", "cursor"],
  [
    comp("button", "Magnetic Button", "Explore Now", {
      color: "#ffffff", backgroundColor: "#0f172a", border: "none",
      padding: "20px 56px", fontSize: "16px", fontWeight: "700", borderRadius: "100px",
      transition: "transform 0.3s ease", cursor: "pointer",
    }, { category: "Basic" }),
  ]
);

add("Shimmer Button", "Button with an animated shimmer/shine effect across surface", "buttons", "effects",
  "✨", "shimmer", ["header", "body", "footer"], ["button", "shimmer", "shine", "effect"],
  [
    comp("button", "Shimmer Button", "Get Premium Access", {
      color: "#ffffff", backgroundColor: "#6366f1", border: "none",
      padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "12px",
      position: "relative", overflow: "hidden",
      backgroundImage: "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s ease-in-out infinite",
    }, { category: "Basic" }),
  ],
  `@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`
);

add("Bounce Arrow Button", "CTA with bouncing arrow icon that draws attention", "buttons", "cta",
  "⬇️", "bounce", ["body", "footer"], ["button", "bounce", "arrow", "scroll"],
  [
    comp("button", "Bounce Button", "Scroll Down ↓", {
      color: "#6366f1", backgroundColor: "transparent", border: "2px solid #6366f1",
      padding: "14px 36px", fontSize: "14px", fontWeight: "700", borderRadius: "100px",
      animation: "bounceBtn 2s ease infinite",
    }, { category: "Basic" }),
  ],
  `@keyframes bounceBtn { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`
);

// ════════════════════════════════════════
// ANIMATED CARDS
// ════════════════════════════════════════

add("Hover Lift Card", "Card that lifts with enhanced shadow on hover", "cards", "hover",
  "📦", "hover-lift", ["body"], ["card", "hover", "lift", "shadow"],
  [
    comp("card", "Lift Card", "", {
      padding: "36px", borderRadius: "20px", backgroundColor: "#ffffff",
      border: "1px solid #f1f5f9", textAlign: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Icon", "🚀", { fontSize: "48px", marginBottom: "16px" }),
        comp("heading", "Title", "Lightning Fast", { fontSize: "20px", fontWeight: "700", marginBottom: "8px" }),
        comp("paragraph", "Description", "Optimized for speed with instant loading and smooth interactions.", { fontSize: "14px", color: "#6b7280", lineHeight: "1.7" }),
      ],
    }),
  ],
  `.hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }`
);

add("Flip Card", "Card that flips to reveal back content on hover", "cards", "interactive",
  "🔄", "flip", ["body"], ["card", "flip", "3d", "interactive", "hover"],
  [
    comp("card", "Flip Card Front", "", {
      padding: "48px 32px", borderRadius: "20px",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      color: "#ffffff", textAlign: "center", minHeight: "240px",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      backfaceVisibility: "hidden", transition: "transform 0.6s ease",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Icon", "🎯", { fontSize: "48px", marginBottom: "16px" }),
        comp("heading", "Title", "Our Mission", { fontSize: "24px", fontWeight: "700" }),
        comp("paragraph", "Hint", "Hover to learn more →", { fontSize: "12px", opacity: "0.7", marginTop: "12px" }),
      ],
    }),
    comp("card", "Flip Card Back", "", {
      padding: "48px 32px", borderRadius: "20px",
      backgroundColor: "#0f172a", color: "#ffffff", textAlign: "center", minHeight: "240px",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      backfaceVisibility: "hidden", transform: "rotateY(180deg)",
      position: "absolute", top: "0", left: "0", width: "100%", height: "100%",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Description", "We're on a mission to democratize web development, making beautiful websites accessible to everyone regardless of technical skill.", {
          fontSize: "15px", lineHeight: "1.8", maxWidth: "280px",
        }),
      ],
    }),
  ],
  `.flip-container:hover .flip-front { transform: rotateY(180deg); } .flip-container:hover .flip-back { transform: rotateY(0); }`
);

add("Stagger Cards", "Multiple cards that appear one-by-one with staggered animation", "cards", "entrance",
  "📊", "stagger", ["body"], ["card", "stagger", "entrance", "sequential"],
  [
    ...[
      { icon: "⚡", title: "Performance", desc: "Blazing fast load times with optimized rendering." },
      { icon: "🔒", title: "Security", desc: "Enterprise-grade security with encrypted data." },
      { icon: "🎨", title: "Customizable", desc: "Fully customizable with hundreds of options." },
    ].map((item, i) =>
      comp("card", item.title, "", {
        padding: "32px", borderRadius: "16px", backgroundColor: "#ffffff",
        border: "1px solid #f1f5f9", textAlign: "center",
        opacity: "0", animation: `fadeInUp 0.5s ease-out ${i * 0.15}s forwards`,
      }, {
        category: "Layout",
        children: [
          comp("paragraph", "Icon", item.icon, { fontSize: "40px", marginBottom: "12px" }),
          comp("heading", "Title", item.title, { fontSize: "18px", fontWeight: "700", marginBottom: "8px" }),
          comp("paragraph", "Desc", item.desc, { fontSize: "13px", color: "#6b7280", lineHeight: "1.6" }),
        ],
      })
    ),
  ],
  `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`
);

add("Tilt 3D Card", "Card with 3D perspective tilt effect that follows mouse movement", "cards", "interactive",
  "📐", "tilt", ["body"], ["card", "3d", "tilt", "perspective", "interactive"],
  [
    comp("card", "3D Tilt Card", "", {
      padding: "40px", borderRadius: "20px", backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0", textAlign: "center",
      transformStyle: "preserve-3d", perspective: "1000px",
      transition: "transform 0.3s ease", cursor: "pointer",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Icon", "💎", { fontSize: "56px", marginBottom: "20px", transform: "translateZ(30px)" }),
        comp("heading", "Title", "Premium Quality", { fontSize: "22px", fontWeight: "700", marginBottom: "10px", transform: "translateZ(20px)" }),
        comp("paragraph", "Desc", "Experience the finest craftsmanship and attention to every detail.", { fontSize: "14px", color: "#6b7280", lineHeight: "1.7", transform: "translateZ(10px)" }),
      ],
    }),
  ]
);

add("Glass Morphism Card", "Frosted glass effect card with blur backdrop and subtle border", "cards", "effects",
  "🪟", "glass", ["body", "header"], ["card", "glass", "blur", "modern", "frosted"],
  [
    comp("card", "Glass Card", "", {
      padding: "36px", borderRadius: "20px",
      backgroundColor: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      color: "#ffffff", textAlign: "center",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Icon", "☁️", { fontSize: "48px", marginBottom: "16px" }),
        comp("heading", "Title", "Cloud Native", { fontSize: "20px", fontWeight: "700", marginBottom: "8px" }),
        comp("paragraph", "Desc", "Built for the cloud with auto-scaling and global distribution.", { fontSize: "14px", opacity: "0.85", lineHeight: "1.7" }),
      ],
    }),
  ]
);

// ════════════════════════════════════════
// ANIMATED TEXT ELEMENTS
// ════════════════════════════════════════

add("Counter Animation", "Animated number counter that counts up to a target value", "text", "numbers",
  "🔢", "counter", ["body"], ["counter", "number", "stats", "animated"],
  [
    comp("card", "Counter Group", "", {
      display: "flex", gap: "60px", justifyContent: "center", flexWrap: "wrap", textAlign: "center",
    }, {
      category: "Layout",
      children: [
        ...[
          { value: "10,000+", label: "Users" },
          { value: "$2.5M", label: "Revenue" },
          { value: "99.9%", label: "Uptime" },
          { value: "4.9★", label: "Rating" },
        ].map((s) => comp("card", s.label, "", { textAlign: "center" }, {
          category: "Layout",
          children: [
            comp("heading", "Value", s.value, { fontSize: "48px", fontWeight: "800", animation: "fadeInUp 0.6s ease-out forwards", opacity: "0" }),
            comp("paragraph", "Label", s.label, { fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "2px", marginTop: "4px" }),
          ],
        })),
      ],
    }),
  ],
  `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`
);

add("Highlight Text", "Text with animated highlight/underline drawing effect", "text", "decorative",
  "🖍️", "highlight", ["body", "header"], ["text", "highlight", "underline", "draw"],
  [
    comp("heading", "Highlighted Text", "The best way to predict the future", {
      fontSize: "44px", fontWeight: "800", lineHeight: "1.3", textAlign: "center",
      textDecoration: "none", position: "relative", display: "inline-block",
    }),
    comp("paragraph", "Marker", "", {
      position: "absolute", bottom: "4px", left: "0", height: "12px",
      backgroundColor: "rgba(99,102,241,0.2)", width: "0",
      animation: "drawHighlight 1s ease-out 0.5s forwards",
      borderRadius: "4px",
    }),
  ],
  `@keyframes drawHighlight { from { width: 0; } to { width: 100%; } }`
);

add("Reveal Text", "Text that reveals character by character with a mask animation", "text", "entrance",
  "👀", "reveal", ["body", "header"], ["text", "reveal", "mask", "entrance"],
  [
    comp("heading", "Reveal Title", "Innovation Starts Here", {
      fontSize: "56px", fontWeight: "800", overflow: "hidden",
      animation: "revealText 1s ease-out forwards",
    }),
  ],
  `@keyframes revealText { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }`
);

add("Glitch Text", "Cyberpunk-style glitch text effect with RGB offset", "text", "effects",
  "📺", "glitch", ["body", "header"], ["text", "glitch", "cyberpunk", "effect"],
  [
    comp("heading", "Glitch Text", "SYSTEM_ONLINE", {
      fontSize: "60px", fontWeight: "900", fontFamily: "monospace",
      textTransform: "uppercase", letterSpacing: "4px", textAlign: "center",
      animation: "glitch 2s infinite", position: "relative",
    }),
  ],
  `@keyframes glitch { 0%, 100% { text-shadow: 2px 0 #ff0000, -2px 0 #00ffff; } 25% { text-shadow: -2px 2px #ff0000, 2px -2px #00ffff; } 50% { text-shadow: 2px -2px #ff0000, -2px 2px #00ffff; } 75% { text-shadow: -2px -2px #ff0000, 2px 2px #00ffff; } }`
);

// ════════════════════════════════════════
// ANIMATED SECTIONS / BANNERS
// ════════════════════════════════════════

add("Animated Gradient Banner", "Full-width banner with smooth animated gradient background", "banners", "background",
  "🎨", "gradient-bg", ["body", "header"], ["banner", "gradient", "animated", "background"],
  [
    comp("card", "Gradient Banner", "", {
      padding: "80px 40px", textAlign: "center", borderRadius: "24px",
      background: "linear-gradient(-45deg, #6366f1, #ec4899, #f59e0b, #10b981)",
      backgroundSize: "400% 400%",
      animation: "gradientBg 8s ease infinite", color: "#ffffff",
    }, {
      category: "Layout",
      children: [
        comp("heading", "Title", "Limited Time Offer", { fontSize: "44px", fontWeight: "800", marginBottom: "12px" }),
        comp("paragraph", "Sub", "Get 50% off all plans this week only. Don't miss out!", { fontSize: "18px", opacity: "0.9", marginBottom: "28px" }),
        comp("button", "CTA", "Claim Discount →", { color: "#6366f1", backgroundColor: "#ffffff", border: "none", padding: "16px 40px", fontSize: "15px", fontWeight: "700", borderRadius: "12px" }, { category: "Basic" }),
      ],
    }),
  ],
  `@keyframes gradientBg { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`
);

add("Floating Particles Section", "Section with floating particle-like dots animation", "banners", "background",
  "🫧", "particles", ["body"], ["section", "particles", "floating", "ambient"],
  [
    comp("card", "Particle Section", "", {
      padding: "100px 40px", textAlign: "center", position: "relative",
      backgroundColor: "#0f172a", color: "#ffffff", borderRadius: "24px", overflow: "hidden",
    }, {
      category: "Layout",
      children: [
        ...[0, 1, 2, 3, 4, 5].map((i) =>
          comp("paragraph", `Dot ${i}`, "●", {
            position: "absolute", fontSize: `${8 + i * 4}px`, color: "rgba(99,102,241,0.3)",
            top: `${10 + i * 15}%`, left: `${5 + i * 16}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
          })
        ),
        comp("heading", "Title", "Built for Scale", { fontSize: "48px", fontWeight: "800", marginBottom: "16px", position: "relative", zIndex: "2" }),
        comp("paragraph", "Sub", "Infrastructure that grows with your ambition", { fontSize: "18px", opacity: "0.7", position: "relative", zIndex: "2" }),
      ],
    }),
  ],
  `@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }`
);

add("Scroll Reveal Section", "Content section that reveals on scroll with slide-up animation", "banners", "entrance",
  "📜", "scroll-reveal", ["body"], ["section", "scroll", "reveal", "entrance"],
  [
    comp("card", "Reveal Section", "", {
      padding: "80px 40px", textAlign: "center",
      opacity: "0", animation: "slideReveal 0.8s ease-out forwards",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Label", "WHY CHOOSE US", {
          fontSize: "12px", fontWeight: "700", letterSpacing: "3px", color: "#6366f1", marginBottom: "16px", textTransform: "uppercase",
        }),
        comp("heading", "Title", "Trusted by 10,000+ Teams", { fontSize: "44px", fontWeight: "800", marginBottom: "20px" }),
        comp("paragraph", "Desc", "We provide the tools, infrastructure, and support you need to ship products faster and more reliably.", {
          fontSize: "17px", color: "#6b7280", lineHeight: "1.8", maxWidth: "640px", margin: "0 auto",
        }),
      ],
    }),
  ],
  `@keyframes slideReveal { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }`
);

add("Marquee Banner", "Auto-scrolling marquee text banner for announcements", "banners", "scroll",
  "📢", "marquee", ["header", "body", "footer"], ["marquee", "scroll", "announcement", "ticker"],
  [
    comp("card", "Marquee", "", {
      overflow: "hidden", whiteSpace: "nowrap", padding: "14px 0",
      backgroundColor: "#6366f1", color: "#ffffff",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Scroll Text", "🎉 New Feature Launch — 50% Off All Plans — Free Trial Available — Join 10,000+ Happy Customers — 🎉 New Feature Launch — 50% Off All Plans — Free Trial Available — Join 10,000+ Happy Customers —", {
          display: "inline-block", fontSize: "14px", fontWeight: "600", letterSpacing: "1px",
          animation: "marquee 20s linear infinite",
        }),
      ],
    }),
  ],
  `@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`
);

// ════════════════════════════════════════
// ANIMATED TESTIMONIALS
// ════════════════════════════════════════

add("Slide-In Testimonial", "Testimonial card that slides in from the side", "testimonials", "entrance",
  "💬", "slide-in", ["body"], ["testimonial", "slide", "quote", "animated"],
  [
    comp("card", "Testimonial", "", {
      padding: "40px", borderRadius: "20px", backgroundColor: "#f8fafc",
      border: "1px solid #f1f5f9", maxWidth: "600px", margin: "0 auto",
      opacity: "0", animation: "slideInLeft 0.6s ease-out forwards",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Stars", "⭐⭐⭐⭐⭐", { fontSize: "20px", marginBottom: "16px" }),
        comp("paragraph", "Quote", '"This product completely transformed how our team works. We shipped 3x faster in the first month alone."', {
          fontSize: "17px", lineHeight: "1.8", fontStyle: "italic", color: "#374151", marginBottom: "20px",
        }),
        comp("paragraph", "Author", "— Sarah Chen, CTO at TechFlow", {
          fontSize: "14px", fontWeight: "600", color: "#6366f1",
        }),
      ],
    }),
  ],
  `@keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }`
);

add("Fade Rotate Testimonial", "Testimonial with fade and subtle rotation entrance", "testimonials", "entrance",
  "🔄", "fade-rotate", ["body"], ["testimonial", "rotate", "fade", "animated"],
  [
    comp("card", "Rotate Testimonial", "", {
      padding: "48px", borderRadius: "24px",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      color: "#ffffff", textAlign: "center", maxWidth: "560px", margin: "0 auto",
      opacity: "0", animation: "fadeRotateIn 0.7s ease-out forwards",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Avatar", "👩‍💻", { fontSize: "48px", marginBottom: "16px" }),
        comp("paragraph", "Quote", '"The best tool I\'ve ever used for building websites. Period. Nothing else comes close."', {
          fontSize: "18px", lineHeight: "1.8", marginBottom: "20px", opacity: "0.95",
        }),
        comp("paragraph", "Name", "Emily Park", { fontWeight: "700", fontSize: "16px" }),
        comp("paragraph", "Role", "Lead Designer, Spotify", { fontSize: "13px", opacity: "0.7" }),
      ],
    }),
  ],
  `@keyframes fadeRotateIn { from { opacity: 0; transform: rotate(-2deg) scale(0.95); } to { opacity: 1; transform: rotate(0) scale(1); } }`
);

// ════════════════════════════════════════
// ANIMATED NAVIGATION
// ════════════════════════════════════════

add("Animated Sticky Nav", "Navigation bar with slide-down entrance and blur backdrop", "navigation", "headers",
  "📌", "sticky", ["header"], ["nav", "sticky", "animated", "blur"],
  [
    comp("card", "Sticky Nav", "", {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 40px", backgroundColor: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)",
      animation: "slideDown 0.4s ease-out",
    }, {
      category: "Layout",
      children: [
        comp("heading", "Logo", "⚡ Brand", { fontSize: "20px", fontWeight: "800" }),
        comp("paragraph", "Links", "Home   Features   Pricing   Blog   Contact", { fontSize: "14px", color: "#6b7280", fontWeight: "500" }),
        comp("button", "CTA", "Sign Up", { color: "#ffffff", backgroundColor: "#6366f1", border: "none", padding: "10px 28px", fontSize: "13px", fontWeight: "700", borderRadius: "10px" }, { category: "Basic" }),
      ],
    }),
  ],
  `@keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`
);

add("Hamburger Menu Nav", "Mobile-ready nav with animated hamburger icon transformation", "navigation", "mobile",
  "☰", "hamburger", ["header"], ["nav", "hamburger", "mobile", "menu"],
  [
    comp("card", "Mobile Nav", "", {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 24px", backgroundColor: "#ffffff", borderBottom: "1px solid #f1f5f9",
    }, {
      category: "Layout",
      children: [
        comp("heading", "Logo", "◆ App", { fontSize: "20px", fontWeight: "800" }),
        comp("paragraph", "Menu Icon", "☰", { fontSize: "28px", cursor: "pointer", transition: "transform 0.3s ease" }),
      ],
    }),
  ]
);

// ════════════════════════════════════════
// ANIMATED FOOTERS
// ════════════════════════════════════════

add("Animated Wave Footer", "Footer with animated wave SVG divider on top", "footers", "decorative",
  "🌊", "wave", ["footer"], ["footer", "wave", "animated", "decorative"],
  [
    comp("paragraph", "Wave SVG", "〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️", {
      fontSize: "24px", color: "#6366f1", overflow: "hidden", lineHeight: "1",
      animation: "waveMove 3s ease-in-out infinite", whiteSpace: "nowrap",
    }),
    comp("card", "Footer Content", "", {
      padding: "48px 40px", backgroundColor: "#0f172a", color: "#94a3b8", textAlign: "center",
    }, {
      category: "Layout",
      children: [
        comp("heading", "Brand", "⚡ Company", { fontSize: "22px", fontWeight: "800", color: "#ffffff", marginBottom: "16px" }),
        comp("paragraph", "Links", "Home   About   Services   Blog   Careers   Contact", { fontSize: "13px", marginBottom: "20px", opacity: "0.7" }),
        comp("paragraph", "Copyright", "© 2026 Company Inc. All rights reserved.", { fontSize: "12px", opacity: "0.5" }),
      ],
    }),
  ],
  `@keyframes waveMove { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-20px); } }`
);

add("Fade-Up Footer", "Footer with staggered fade-up entrance for each element", "footers", "entrance",
  "⬆️", "fade-up", ["footer"], ["footer", "fade", "stagger", "entrance"],
  [
    comp("card", "Animated Footer", "", {
      padding: "64px 40px 32px", backgroundColor: "#020617", color: "#94a3b8", textAlign: "center",
    }, {
      category: "Layout",
      children: [
        comp("heading", "Brand", "✦ Brand Name", { fontSize: "24px", fontWeight: "800", color: "#ffffff", marginBottom: "24px", opacity: "0", animation: "fadeInUp 0.5s ease-out forwards" }),
        comp("paragraph", "Tagline", "Building the future, one pixel at a time.", { fontSize: "15px", marginBottom: "32px", opacity: "0", animation: "fadeInUp 0.5s ease-out 0.1s forwards" }),
        comp("paragraph", "Links", "Product   Features   Pricing   Company   Blog   Support", { fontSize: "13px", marginBottom: "24px", letterSpacing: "0.5px", opacity: "0", animation: "fadeInUp 0.5s ease-out 0.2s forwards" }),
        comp("paragraph", "Social", "𝕏   LinkedIn   GitHub   YouTube", { fontSize: "13px", marginBottom: "24px", opacity: "0", animation: "fadeInUp 0.5s ease-out 0.3s forwards" }),
        comp("paragraph", "Divider", "", { height: "1px", backgroundColor: "#1e293b", margin: "0 0 20px 0", opacity: "0", animation: "fadeInUp 0.5s ease-out 0.4s forwards" }),
        comp("paragraph", "Copyright", "© 2026 Brand Name. All rights reserved. | Privacy Policy | Terms of Service", { fontSize: "11px", opacity: "0", animation: "fadeInUp 0.5s ease-out 0.5s forwards" }),
      ],
    }),
  ],
  `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`
);

// ════════════════════════════════════════
// INTERACTIVE FORMS
// ════════════════════════════════════════

add("Animated Contact Form", "Contact form with animated focus states and smooth field transitions", "forms", "contact",
  "📨", "focus-animate", ["body", "footer"], ["form", "contact", "animated", "focus"],
  [
    comp("card", "Contact Form", "", {
      padding: "48px", borderRadius: "24px", backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0", maxWidth: "480px", margin: "0 auto",
      boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
    }, {
      category: "Layout",
      children: [
        comp("heading", "Title", "Get in Touch", { fontSize: "28px", fontWeight: "800", marginBottom: "8px", textAlign: "center" }),
        comp("paragraph", "Sub", "We'd love to hear from you", { fontSize: "14px", color: "#6b7280", marginBottom: "28px", textAlign: "center" }),
        comp("form-input", "Name", "", { marginBottom: "16px", transition: "all 0.3s ease" }, { category: "Form", props: { placeholder: "Your Name", type: "text" } }),
        comp("form-input", "Email", "", { marginBottom: "16px", transition: "all 0.3s ease" }, { category: "Form", props: { placeholder: "your@email.com", type: "email" } }),
        comp("form-input", "Message", "", { marginBottom: "24px", minHeight: "120px", transition: "all 0.3s ease" }, { category: "Form", props: { placeholder: "Your message...", type: "textarea" } }),
        comp("button", "Submit", "Send Message →", {
          color: "#ffffff", backgroundColor: "#6366f1", border: "none",
          padding: "16px 40px", fontSize: "15px", fontWeight: "700", borderRadius: "12px",
          width: "100%", transition: "all 0.3s ease",
        }, { category: "Basic" }),
      ],
    }),
  ]
);

add("Animated Newsletter Signup", "Newsletter signup with animated input focus and success state", "forms", "newsletter",
  "📮", "newsletter", ["body", "footer"], ["form", "newsletter", "signup", "animated"],
  [
    comp("card", "Newsletter Block", "", {
      padding: "60px 40px", textAlign: "center", borderRadius: "24px",
      background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #fdf4ff 100%)",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Icon", "📧", { fontSize: "48px", marginBottom: "16px" }),
        comp("heading", "Title", "Stay Updated", { fontSize: "32px", fontWeight: "800", marginBottom: "8px" }),
        comp("paragraph", "Sub", "Join 25,000+ subscribers getting weekly insights.", { fontSize: "15px", color: "#6b7280", marginBottom: "28px" }),
        comp("form-input", "Email", "", { maxWidth: "320px", margin: "0 auto 12px", borderRadius: "12px", transition: "all 0.3s ease" }, { category: "Form", props: { placeholder: "Enter your email", type: "email" } }),
        comp("button", "Subscribe", "Subscribe Free →", {
          color: "#ffffff", backgroundColor: "#6366f1", border: "none",
          padding: "14px 40px", fontSize: "14px", fontWeight: "700", borderRadius: "12px",
          animation: "pulseGlow 3s ease-in-out infinite",
        }, { category: "Basic" }),
        comp("paragraph", "Privacy", "No spam. Unsubscribe anytime.", { fontSize: "11px", color: "#9ca3af", marginTop: "12px" }),
      ],
    }),
  ],
  `@keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 10px rgba(99,102,241,0.3); } 50% { box-shadow: 0 0 25px rgba(99,102,241,0.6); } }`
);

// ════════════════════════════════════════
// PRICING / CTA ELEMENTS
// ════════════════════════════════════════

add("Animated Pricing Toggle", "Pricing card with animated highlight and popular badge", "pricing", "cards",
  "💰", "highlight", ["body"], ["pricing", "animated", "highlight", "popular"],
  [
    comp("card", "Pricing Card", "", {
      padding: "40px 32px", borderRadius: "24px", textAlign: "center",
      border: "2px solid #6366f1", backgroundColor: "#f5f3ff", position: "relative",
      animation: "pulseRing 3s ease-in-out infinite",
      boxShadow: "0 20px 40px rgba(99,102,241,0.12)",
    }, {
      category: "Layout",
      children: [
        comp("badge", "Popular", "⭐ Most Popular", { position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#6366f1", color: "#ffffff", padding: "4px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: "700" }),
        comp("heading", "Plan", "Professional", { fontSize: "22px", fontWeight: "700", marginBottom: "8px", marginTop: "8px" }),
        comp("heading", "Price", "$49/mo", { fontSize: "52px", fontWeight: "800", color: "#6366f1", marginBottom: "24px" }),
        comp("paragraph", "Features", "Unlimited projects\n100GB storage\nPriority support\nAdvanced analytics\nCustom domains\nAPI access", { fontSize: "14px", lineHeight: "2.4", color: "#6b7280" }),
        comp("button", "CTA", "Start Free Trial", { color: "#ffffff", backgroundColor: "#6366f1", border: "none", padding: "16px 44px", fontSize: "15px", fontWeight: "700", borderRadius: "12px", marginTop: "28px", width: "100%" }, { category: "Basic" }),
      ],
    }),
  ],
  `@keyframes pulseRing { 0%, 100% { box-shadow: 0 20px 40px rgba(99,102,241,0.12); } 50% { box-shadow: 0 20px 60px rgba(99,102,241,0.25); } }`
);

add("Animated CTA Banner", "Full-width CTA with animated background and floating elements", "pricing", "cta",
  "🎯", "animated-bg", ["body"], ["cta", "banner", "animated", "conversion"],
  [
    comp("card", "CTA Banner", "", {
      padding: "100px 40px", textAlign: "center", borderRadius: "32px",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
      color: "#ffffff", position: "relative", overflow: "hidden",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "FloatDot1", "✦", { position: "absolute", fontSize: "24px", top: "20%", left: "10%", opacity: "0.2", animation: "float 4s ease-in-out infinite" }),
        comp("paragraph", "FloatDot2", "✦", { position: "absolute", fontSize: "16px", top: "60%", right: "15%", opacity: "0.15", animation: "float 5s ease-in-out 1s infinite" }),
        comp("paragraph", "FloatDot3", "✦", { position: "absolute", fontSize: "20px", bottom: "20%", left: "25%", opacity: "0.1", animation: "float 3.5s ease-in-out 0.5s infinite" }),
        comp("heading", "Title", "Ready to Get Started?", { fontSize: "48px", fontWeight: "800", marginBottom: "16px", position: "relative", zIndex: "2" }),
        comp("paragraph", "Sub", "Join thousands of teams shipping faster with our platform.", { fontSize: "18px", opacity: "0.9", marginBottom: "32px", position: "relative", zIndex: "2" }),
        comp("button", "Primary CTA", "Start Free — No CC Required", { color: "#6366f1", backgroundColor: "#ffffff", border: "none", padding: "18px 48px", fontSize: "15px", fontWeight: "700", borderRadius: "12px", position: "relative", zIndex: "2" }, { category: "Basic" }),
      ],
    }),
  ],
  `@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }`
);

// ════════════════════════════════════════
// ANIMATED DIVIDERS & DECORATIVE
// ════════════════════════════════════════

add("Animated Gradient Divider", "Colorful gradient line divider with shimmer animation", "decorative", "dividers",
  "〰️", "shimmer", ["body", "header", "footer"], ["divider", "gradient", "shimmer", "line"],
  [
    comp("paragraph", "Gradient Divider", "", {
      height: "4px", borderRadius: "4px", maxWidth: "200px", margin: "40px auto",
      background: "linear-gradient(90deg, #6366f1, #ec4899, #6366f1)",
      backgroundSize: "200% 100%",
      animation: "shimmerLine 2s ease-in-out infinite",
    }),
  ],
  `@keyframes shimmerLine { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`
);

add("Pulsing Dot Separator", "Three pulsing dots as a section separator", "decorative", "dividers",
  "•••", "pulse", ["body"], ["separator", "dots", "pulse", "minimal"],
  [
    comp("card", "Dot Separator", "", {
      display: "flex", justifyContent: "center", gap: "12px", padding: "40px 0",
    }, {
      category: "Layout",
      children: [0, 1, 2].map((i) =>
        comp("paragraph", `Dot ${i}`, "●", {
          fontSize: "10px", color: "#6366f1", animation: `pulseDot 1.5s ease-in-out ${i * 0.2}s infinite`,
        })
      ),
    }),
  ],
  `@keyframes pulseDot { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }`
);

add("Animated Scroll Indicator", "Bouncing scroll indicator arrow for hero sections", "decorative", "indicators",
  "⬇", "bounce", ["body", "header"], ["scroll", "indicator", "bounce", "arrow"],
  [
    comp("card", "Scroll Indicator", "", {
      textAlign: "center", padding: "20px 0",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Arrow", "↓", {
          fontSize: "24px", color: "#6366f1", animation: "bounceDown 2s ease infinite",
        }),
        comp("paragraph", "Label", "Scroll to explore", {
          fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "2px", marginTop: "8px",
        }),
      ],
    }),
  ],
  `@keyframes bounceDown { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(12px); opacity: 0.5; } }`
);

add("Loading Skeleton", "Animated skeleton loading placeholder for content areas", "decorative", "loading",
  "💀", "skeleton", ["body"], ["skeleton", "loading", "placeholder", "animated"],
  [
    comp("card", "Skeleton Block", "", {
      padding: "24px", borderRadius: "16px", backgroundColor: "#ffffff", border: "1px solid #f1f5f9",
    }, {
      category: "Layout",
      children: [
        comp("paragraph", "Skeleton Line 1", "", { height: "24px", borderRadius: "8px", backgroundColor: "#f1f5f9", marginBottom: "12px", animation: "skeletonPulse 1.5s ease infinite", width: "60%" }),
        comp("paragraph", "Skeleton Line 2", "", { height: "16px", borderRadius: "6px", backgroundColor: "#f1f5f9", marginBottom: "8px", animation: "skeletonPulse 1.5s ease 0.1s infinite", width: "100%" }),
        comp("paragraph", "Skeleton Line 3", "", { height: "16px", borderRadius: "6px", backgroundColor: "#f1f5f9", marginBottom: "8px", animation: "skeletonPulse 1.5s ease 0.2s infinite", width: "80%" }),
        comp("paragraph", "Skeleton Circle", "", { height: "48px", width: "48px", borderRadius: "50%", backgroundColor: "#f1f5f9", marginTop: "16px", animation: "skeletonPulse 1.5s ease 0.3s infinite" }),
      ],
    }),
  ],
  `@keyframes skeletonPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }`
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
    let mode = "upsert";
    try { const b = await req.json(); if (b?.mode) mode = b.mode; } catch { /* ok */ }

    const { data: existing } = await supabase.from("interactive_elements").select("name");
    const existingNames = new Set((existing || []).map((e: any) => e.name));

    if (mode === "reset") {
      await supabase.from("interactive_elements").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      existingNames.clear();
    }

    const toInsert = elements.filter((e) => !existingNames.has(e.name));
    if (toInsert.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "All elements exist", count: elements.length }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let inserted = 0;
    for (let i = 0; i < toInsert.length; i += 10) {
      const batch = toInsert.slice(i, i + 10);
      const { error } = await supabase.from("interactive_elements").insert(batch);
      if (error) throw error;
      inserted += batch.length;
    }

    return new Response(JSON.stringify({ success: true, inserted, total: elements.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
