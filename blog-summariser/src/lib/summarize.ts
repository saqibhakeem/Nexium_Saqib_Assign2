export async function extractiveSummary(content: string, maxSentences: number = 5) {
  try {
    // Input validation
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return {
        summary: 'No valid content provided for summarization.',
        method: 'extractive',
        success: false
      };
    }

    // Clean and split into sentences - simplified approach
    const sentences = content
      .replace(/\s+/g, ' ')
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 200 && s.split(' ').length > 4)
      .slice(0, 50); // Limit for performance

    console.log(`Found ${sentences.length} sentences after filtering`);

    if (sentences.length === 0) {
      return {
        summary: 'Unable to extract meaningful sentences from the content.',
        method: 'extractive',
        success: false
      };
    }

    // Expanded important words with categories
    const importantWords = {
      structural: ['first', 'second', 'third', 'finally', 'conclusion', 'summary', 'overview'],
      logical: ['however', 'therefore', 'because', 'since', 'although', 'while', 'moreover', 'furthermore', 'thus', 'hence'],
      emphasis: ['important', 'key', 'main', 'significant', 'critical', 'essential', 'major', 'primary'],
      findings: ['result', 'finding', 'discover', 'reveal', 'show', 'prove', 'demonstrate', 'indicate', 'suggest', 'found'],
      quantifiers: ['most', 'many', 'several', 'numerous', 'various', 'multiple', 'all', 'every']
    };

    const scoredSentences = sentences.map((sentence, index) => {
      let score = 0;
      const lowerSentence = sentence.toLowerCase();
      const words = lowerSentence.split(/\s+/);

      // Position scoring (earlier sentences often more important)
      score += (sentences.length - index) / sentences.length * 2;

      // Length scoring (prefer medium-length sentences)
      const idealLength = 120;
      const lengthScore = Math.max(0, 1 - Math.abs(sentence.length - idealLength) / idealLength);
      score += lengthScore * 1.5;

      // Important words scoring with category weights
      Object.entries(importantWords).forEach(([category, wordsList]) => {
        const categoryWeight = {
          structural: 2.0,
          logical: 1.5,
          emphasis: 2.5,
          findings: 2.0,
          quantifiers: 1.0
        }[category] || 1.0;

        wordsList.forEach(word => {
          if (lowerSentence.includes(word)) {
            score += categoryWeight;
          }
        });
      });

      // Word frequency scoring (avoid very common words)
      const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
      const contentWords = words.filter(word => !commonWords.includes(word) && word.length > 3);
      const contentRatio = contentWords.length / words.length;
      score += contentRatio * 1.5;

      // Avoid sentences with excessive numbers or special characters
      const specialCharRatio = (sentence.match(/[^\w\s.,!?-]/g) || []).length / sentence.length;
      if (specialCharRatio > 0.2) score -= 2;

      // Boost sentences with proper nouns (capitalized words)
      const properNouns = sentence.match(/\b[A-Z][a-z]+/g) || [];
      score += Math.min(properNouns.length * 0.5, 2); // Cap the boost

      // Penalize very short sentences
      if (words.length < 5) score -= 1;

      // Penalize sentences that are likely titles or headers (all caps, very short)
      if (sentence === sentence.toUpperCase() && words.length < 8) score -= 3;

      return { sentence, score, index };
    });

    // Select top sentences
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(maxSentences, sentences.length))
      .sort((a, b) => a.index - b.index) // Restore original order
      .map(item => item.sentence);

    console.log(`Selected ${topSentences.length} sentences for summary`);

    // Ensure proper sentence endings
    const cleanedSentences = topSentences.map(sentence => {
      if (!/[.!?]$/.test(sentence)) {
        return sentence + '.';
      }
      return sentence;
    });

    const summary = cleanedSentences.join(' ');

    return {
      summary,
      method: 'extractive',
      success: true,
      metadata: {
        originalSentenceCount: sentences.length,
        selectedSentenceCount: topSentences.length,
        averageScore: scoredSentences.reduce((sum, item) => sum + item.score, 0) / scoredSentences.length
      }
    };

  } catch (error) {
    console.error('Extractive summarization error:', error);
    return {
      summary: 'Error occurred during summarization.',
      method: 'extractive',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}