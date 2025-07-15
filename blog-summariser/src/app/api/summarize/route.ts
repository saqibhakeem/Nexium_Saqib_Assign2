import { NextRequest, NextResponse } from "next/server";
import { extract } from "@extractus/article-extractor";

// 🔧 Cleans up messy metadata from article content
function cleanText(text: string): string {
  return text
    .replace(/^\s*\d+\s*min read[\s\-–—]*/i, "")               // removes "11 min read"
    .replace(/^\s*\d+\s+(hours|days|weeks|months)\s+ago/i, "") // removes "2 days ago"
    .replace(/From the Maps of .*?Review/i, "")                // specific medium junk
    .replace(/follow the map/i, "")                            // remove random headers
    .replace(/<[^>]*>/g, "")                                   // strip any HTML tags
    .replace(/\n{2,}/g, "\n")                                  // normalize blank lines
    .replace(/\s+/g, " ")                                      // normalize spaces
    .trim();
}

// ✨ Basic summary: return first few meaningful sentences
function summarizeText(text: string, maxSentences = 3): string {
  const sentences = text.split(/[.!?]\s+/).filter(Boolean);
  return sentences.slice(0, maxSentences).join(". ") + ".";
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 📦 Extract article data
    const article = await extract(url);

    if (!article?.content) {
      return NextResponse.json({ error: "No content found" }, { status: 404 });
    }

    const raw = article.content || "";
    const cleaned = cleanText(raw);
    const summary = summarizeText(cleaned);

    return NextResponse.json({
      title: article.title,
      summary,
      fullText: cleaned,
    });
  } catch (err) {
    console.error("❌ Summarization failed:", err);
    return NextResponse.json({ error: "Failed to summarize blog" }, { status: 500 });
  }
}
