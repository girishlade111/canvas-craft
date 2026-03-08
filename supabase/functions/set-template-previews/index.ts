import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Maps template name keywords to preview image filenames
const PREVIEW_MAP: Record<string, string> = {
  "saas": "saas-preview.jpg",
  "startup": "saas-preview.jpg",
  "portfolio": "portfolio-preview.jpg",
  "creative": "portfolio-preview.jpg",
  "photography": "portfolio-preview.jpg",
  "agency": "agency-preview.jpg",
  "corporate": "agency-preview.jpg",
  "ecommerce": "ecommerce-preview.jpg",
  "e-commerce": "ecommerce-preview.jpg",
  "shop": "ecommerce-preview.jpg",
  "store": "ecommerce-preview.jpg",
  "blog": "blog-preview.jpg",
  "personal blog": "blog-preview.jpg",
  "restaurant": "restaurant-preview.jpg",
  "food": "restaurant-preview.jpg",
  "delivery": "restaurant-preview.jpg",
  "cafe": "restaurant-preview.jpg",
  "fitness": "fitness-preview.jpg",
  "gym": "fitness-preview.jpg",
  "health": "fitness-preview.jpg",
  "real estate": "realestate-preview.jpg",
  "property": "realestate-preview.jpg",
  "travel": "travel-preview.jpg",
  "tourism": "travel-preview.jpg",
  "wedding": "wedding-preview.jpg",
  "dashboard": "dashboard-preview.jpg",
  "analytics": "dashboard-preview.jpg",
  "admin": "dashboard-preview.jpg",
  "job": "jobboard-preview.jpg",
  "career": "jobboard-preview.jpg",
  "hiring": "jobboard-preview.jpg",
  "event": "event-preview.jpg",
  "conference": "event-preview.jpg",
  "music": "music-preview.jpg",
  "band": "music-preview.jpg",
  "landing": "landing-preview.jpg",
  "education": "education-preview.jpg",
  "course": "education-preview.jpg",
  "enterprise": "enterprise-preview.jpg",
  "corporate": "enterprise-preview.jpg",
  "non-profit": "nonprofit-preview.jpg",
  "nonprofit": "nonprofit-preview.jpg",
  "charity": "nonprofit-preview.jpg",
  "community": "community-preview.jpg",
  "forum": "community-preview.jpg",
  "blank": "landing-preview.jpg",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Get the base URL from request or use a provided one
    const { baseUrl } = await req.json().catch(() => ({ baseUrl: null }));
    
    // Fetch all templates without preview images
    const { data: templates, error: fetchError } = await supabase
      .from("templates")
      .select("id, name, category, preview_image_url")
      .eq("is_public", true);

    if (fetchError) throw fetchError;

    let updated = 0;
    for (const template of templates || []) {
      // Skip if already has a preview image
      if (template.preview_image_url) continue;

      const nameLower = template.name.toLowerCase();
      let matchedFile: string | null = null;

      // Try to match by name keywords
      for (const [keyword, file] of Object.entries(PREVIEW_MAP)) {
        if (nameLower.includes(keyword)) {
          matchedFile = file;
          break;
        }
      }

      // Fallback: try to match by category
      if (!matchedFile) {
        const catLower = template.category.toLowerCase();
        for (const [keyword, file] of Object.entries(PREVIEW_MAP)) {
          if (catLower.includes(keyword)) {
            matchedFile = file;
            break;
          }
        }
      }

      if (matchedFile) {
        const previewUrl = baseUrl
          ? `${baseUrl}/templates/${matchedFile}`
          : `/templates/${matchedFile}`;

        const { error: updateError } = await supabase
          .from("templates")
          .update({ preview_image_url: previewUrl })
          .eq("id", template.id);

        if (!updateError) updated++;
      }
    }

    return new Response(
      JSON.stringify({ success: true, updated, total: templates?.length ?? 0 }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
