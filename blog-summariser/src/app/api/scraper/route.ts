import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return Response.json({ error: 'No URL provided.' }, { status: 400 });
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(url);
      if (!['http:', 'https:'].includes(validUrl.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return Response.json({ error: 'Invalid URL format.' }, { status: 400 });
    }

    // Fetch the webpage with proper headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(15000), // 15 second timeout
    });

    if (!response.ok) {
      return Response.json({ 
        error: `Failed to fetch URL. Status: ${response.status}` 
      }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract title - try multiple selectors
    let title = '';
    const titleSelectors = [
      'h1',
      'title',
      '[data-testid="headline"]',
      '.post-title',
      '.entry-title',
      '.article-title',
      '.headline'
    ];

    for (const selector of titleSelectors) {
      const element = $(selector).first();
      if (element.length && element.text().trim()) {
        title = element.text().trim();
        break;
      }
    }

    // Extract content - try multiple content selectors
    let content = '';
    const contentSelectors = [
      'article',
      '[role="main"]',
      '.post-content',
      '.entry-content',
      '.article-content',
      '.content',
      'main',
      '.post-body',
      '.story-body'
    ];

    for (const selector of contentSelectors) {
      const element = $(selector).first();
      if (element.length) {
        // Remove unwanted elements
        element.find('script, style, nav, header, footer, aside, .advertisement, .ads, .social-share, .comments').remove();
        
        const text = element.text().trim();
        if (text && text.length > 100) { // Ensure we have substantial content
          content = text;
          break;
        }
      }
    }

    // Fallback: extract from body if no content found
    if (!content) {
      $('script, style, nav, header, footer, aside, .advertisement, .ads').remove();
      content = $('body').text().trim();
    }

    // Clean up content
    content = content
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();

    // Fallback title from meta tags or URL
    if (!title) {
      title = $('meta[property="og:title"]').attr('content') || 
              $('meta[name="twitter:title"]').attr('content') || 
              $('title').text() ||
              validUrl.pathname.split('/').pop()?.replace(/[-_]/g, ' ') || 
              'Untitled';
    }

    return Response.json({ 
      title: title.substring(0, 200), // Limit title length
      content: content.substring(0, 50000), // Limit content length
      url: url,
      success: true
    });

  } catch (error) {
    console.error("❌ Scraper Error:", error);
    
    // Handle specific error types
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return Response.json({ 
        error: 'Network error: Unable to fetch the URL. The site might be blocking requests or temporarily unavailable.' 
      }, { status: 400 });
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      return Response.json({ 
        error: 'Request timeout: The website took too long to respond.' 
      }, { status: 408 });
    }

    return Response.json({ 
      error: 'Scraping failed. The website might be using JavaScript rendering or blocking automated requests.' 
    }, { status: 500 });
  }
}