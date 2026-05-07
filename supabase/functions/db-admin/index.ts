import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_TABLES = ["products", "user_roles"];

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } }
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action, table, payload, id, idColumn = "id" } = body as {
      action: "list" | "insert" | "update" | "delete" | "tables";
      table?: string;
      payload?: Record<string, unknown>;
      id?: string;
      idColumn?: string;
    };

    if (action === "tables") {
      return json({ tables: ALLOWED_TABLES });
    }

    if (!table || !ALLOWED_TABLES.includes(table)) {
      return json({ error: "Invalid table" }, 400);
    }

    if (action === "list") {
      const { data, error } = await admin.from(table).select("*").limit(1000);
      if (error) throw error;
      return json({ rows: data });
    }
    if (action === "insert") {
      const { data, error } = await admin.from(table).insert(payload as any).select();
      if (error) throw error;
      return json({ row: data?.[0] });
    }
    if (action === "update") {
      if (!id) return json({ error: "id required" }, 400);
      const { data, error } = await admin.from(table).update(payload as any).eq(idColumn, id).select();
      if (error) throw error;
      return json({ row: data?.[0] });
    }
    if (action === "delete") {
      if (!id) return json({ error: "id required" }, 400);
      const { error } = await admin.from(table).delete().eq(idColumn, id);
      if (error) throw error;
      return json({ ok: true });
    }
    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
