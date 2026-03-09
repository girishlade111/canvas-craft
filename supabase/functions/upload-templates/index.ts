import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    // Accept single template or array of templates
    const templates: any[] = Array.isArray(body) ? body : body.templates ? body.templates : [body];

    if (!templates.length) {
      return new Response(JSON.stringify({ error: "No templates provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate each template
    const errors: string[] = [];
    const valid: any[] = [];

    for (let i = 0; i < templates.length; i++) {
      const t = templates[i];
      const missing: string[] = [];

      if (!t.name || typeof t.name !== "string") missing.push("name");
      if (!t.schema || typeof t.schema !== "object") missing.push("schema");
      if (!t.schema?.sections || !Array.isArray(t.schema.sections)) missing.push("schema.sections");

      if (missing.length) {
        errors.push(`Template[${i}] "${t.name || "unnamed"}": missing ${missing.join(", ")}`);
        continue;
      }

      valid.push({
        name: t.name.trim(),
        description: (t.description || "").trim(),
        category: t.category || "starter",
        thumbnail: t.thumbnail || "🗒️",
        tags: t.tags || [],
        is_public: t.is_public !== undefined ? t.is_public : true,
        is_premium: t.is_premium !== undefined ? t.is_premium : false,
        schema: t.schema,
        preview_image_url: t.preview_image_url || null,
        author_id: t.author_id || null,
      });
    }

    if (!valid.length) {
      return new Response(
        JSON.stringify({ success: false, errors, inserted: 0 }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Upsert in batches of 10
    const batchSize = 10;
    let inserted = 0;
    const insertErrors: string[] = [];

    for (let i = 0; i < valid.length; i += batchSize) {
      const batch = valid.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from("templates")
        .upsert(batch, { onConflict: "name" })
        .select("id, name");

      if (error) {
        insertErrors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
      } else {
        inserted += data?.length || batch.length;
      }
    }

    return new Response(
      JSON.stringify({
        success: insertErrors.length === 0,
        inserted,
        total_submitted: templates.length,
        validation_errors: errors.length ? errors : undefined,
        insert_errors: insertErrors.length ? insertErrors : undefined,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
