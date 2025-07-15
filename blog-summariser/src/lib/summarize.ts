export function summarizeText(fullText: string): string {
  if (!fullText) return "";

  const sentences = fullText
    .split(/(?<=[.؟!])\s+/) // Split on punctuation + space
    .filter((s) => s.length > 50); // Remove too-short junk

  // Take top 4 long sentences as a "summary"
  const summary = sentences.slice(0, 4).join(" ");

  return summary.trim();
}
