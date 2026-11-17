// Supabase Edge Function: ai-resource-assistant
// Handles natural language queries, resource discovery, and syllabus/notes summarization using Gemini API

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

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
    const { action, query, documentText, subject } = await req.json();

    if (!GEMINI_API_KEY) {
      // Graceful fallback response when API key is not yet configured in local demo
      return new Response(
        JSON.stringify({
          success: true,
          answer: `[AI Assistant] For "${query || subject}": Recommended resources include previous year solved question papers, unit-wise handwritten lecture notes, and formula quick-sheets. Always verify syllabus references with your department.`,
          sources: ["AIT_DSA_EndSem_2025_Solved.pdf", "OS_Complete_Notes_Unit1_5.pdf"],
          isSimulated: true,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Call Gemini API server-side
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const prompt = action === 'summarize'
      ? `You are an academic student assistant for CampusConnect. Summarize the following study document concisely into key concepts, exam high-yield formulas, and practice tips:\n\n${documentText}`
      : `You are an academic student assistant for CampusConnect. Help this engineering/college student with their query: "${query}". Subject context: "${subject || 'General'}". Provide actionable, structured bullet points.`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

    return new Response(JSON.stringify({ success: true, answer }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
