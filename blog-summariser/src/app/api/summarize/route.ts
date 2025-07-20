


export async function extractiveSummary(content: string, maxSentences: number = 5) {
  try {
    // Clean and split into sentences
    const sentences = content
      .replace(/\s+/g, ' ')
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 200) // Filter reasonable sentence lengths
      .slice(0, 50); // Limit to first 50 sentences for performance

    if (sentences.length === 0) {
      return {
        summary: 'Unable to extract meaningful sentences from the content.',
        method: 'extractive',
        success: false
      };
    }

    // Simple scoring: prefer sentences with common important words
    const importantWords = [
      'important', 'key', 'main', 'significant', 'conclusion', 'result',
      'finding', 'discover', 'reveal', 'show', 'prove', 'demonstrate',
      'first', 'second', 'third', 'finally', 'however', 'therefore',
      'because', 'since', 'although', 'while', 'moreover', 'furthermore'
    ];

    const scoredSentences = sentences.map((sentence, index) => {
      let score = 0;
      
      // Position scoring (earlier sentences often more important)
      score += (sentences.length - index) / sentences.length * 2;
      
      // Length scoring (prefer medium-length sentences)
      const idealLength = 100;
      const lengthScore = 1 - Math.abs(sentence.length - idealLength) / idealLength;
      score += lengthScore;
      
      // Important words scoring
      const lowerSentence = sentence.toLowerCase();
      importantWords.forEach(word => {
        if (lowerSentence.includes(word)) {
          score += 1;
        }
      });
      
      // Avoid sentences with too many numbers or special characters
      const specialCharRatio = (sentence.match(/[^\w\s]/g) || []).length / sentence.length;
      if (specialCharRatio > 0.3) score -= 2;

      return { sentence, score, index };
    });

    // Select top sentences
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSentences)
      .sort((a, b) => a.index - b.index) // Restore original order
      .map(item => item.sentence);

      
   

    return {
      summary: topSentences.join('. ') + '.',
      method: 'extractive',
      success: true
    };
  } catch (error) {
    console.error('Extractive summarization error:', error);
    return {
      summary: 'Error occurred during summarization.',
      method: 'extractive',
      success: false
    };
  }
}
