// Supabase Edge Function: moderation-workflow
// Handles privileged moderator actions, content hiding, user warnings, and audit logging

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { reportId, action, targetType, targetId, reason, notes } = await req.json();

    // Verify moderator privileges
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const userClient = createClient(SUPABASE_URL!, authHeader);
    const { data: { user } } = await userClient.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || (profile.role !== "moderator" && profile.role !== "admin")) {
      return new Response(JSON.stringify({ error: "Forbidden: Moderator role required" }), { status: 403 });
    }

    // Apply action
    if (action === "hide_content") {
      if (targetType === "post") {
        await supabase.from("posts").update({ deleted_at: new Date().toISOString() }).eq("id", targetId);
      } else if (targetType === "comment") {
        await supabase.from("comments").update({ deleted_at: new Date().toISOString() }).eq("id", targetId);
      } else if (targetType === "resource") {
        await supabase.from("resources").update({ moderation_status: "rejected" }).eq("id", targetId);
      }
    }

    // Log moderation action
    await supabase.from("moderation_actions").insert({
      report_id: reportId,
      moderator_id: user.id,
      action,
      target_type: targetType,
      target_id: targetId,
      reason,
      internal_notes: notes,
    });

    // Update report status
    if (reportId) {
      await supabase.from("reports").update({
        status: action === "dismiss" ? "dismissed" : "action_taken",
        updated_at: new Date().toISOString(),
      }).eq("id", reportId);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
