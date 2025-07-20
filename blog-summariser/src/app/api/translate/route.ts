// app/api/translate/route.ts

// MyMemory Translation API (Free, no API key needed)
async function translateToUrduMyMemory(text: string) {
  try {
    const encodedText = encodeURIComponent(text);
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|ur`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Translation App)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `MyMemory API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return {
        translatedText: data.responseData.translatedText,
        service: 'mymemory',
        success: true,
      };
    } else {
      console.error('MyMemory response:', data);
      throw new Error(
        `MyMemory failed: ${data.responseDetails || 'Invalid response'}`
      );
    }
  } catch (error) {
    console.error('MyMemory translation error:', error);
    throw error;
  }
}

// LibreTranslate API (Free, no API key needed)
async function translateToUrduLibre(text: string) {
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Translation App)',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'ur',
        format: 'text',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LibreTranslate error response:', errorText);
      throw new Error(
        `LibreTranslate API error: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const html = await response.text();
      console.error('LibreTranslate returned HTML:', html.substring(0, 500));
      throw new Error('LibreTranslate returned non-JSON response');
    }

    const data = await response.json();

    if (!data.translatedText) {
      throw new Error('LibreTranslate: No translation in response');
    }

    return {
      translatedText: data.translatedText,
      service: 'libretranslate',
      success: true,
    };
  } catch (error) {
    console.error('LibreTranslate error:', error);
    throw error;
  }
}

// Google Translate (Alternative free option)
async function translateToUrduGoogle(text: string) {
  try {
    // Using Google Translate's public endpoint (may be rate limited)
    const encodedText = encodeURIComponent(text);
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodedText}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Translation App)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google Translate error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return {
        translatedText: data[0][0][0],
        service: 'google',
        success: true,
      };
    } else {
      throw new Error('Google Translate: Invalid response format');
    }
  } catch (error) {
    console.error('Google Translate error:', error);
    throw error;
  }
}

// OpenAI Translation (requires API key)


// Main translation function with fallbacks
async function translateToUrdu(
  text: string,
  preferredService: string = 'auto'
) {
  const services = [
    { name: 'mymemory', fn: translateToUrduMyMemory },
    { name: 'google', fn: translateToUrduGoogle },
    { name: 'libretranslate', fn: translateToUrduLibre },
  ];

  // If user specified a service, try it first
  if (preferredService !== 'auto') {
    const preferredServiceObj = services.find(
      (s) => s.name === preferredService
    );
    if (preferredServiceObj) {
      try {
        console.log(`Trying preferred service: ${preferredService}`);
        return await preferredServiceObj.fn(text);
      } catch (error) {
        console.log(
          `${preferredService} failed:`,
          error instanceof Error ? error.message : error
        );
        console.log('Trying fallback services...');
      }
    }
  }

  // Try services in order until one works
  let lastError: Error | null = null;

  for (const service of services) {
    try {
      // Skip OpenAI if no API key is available
      if (service.name === 'openai' && !process.env.OPENAI_API_KEY) {
        console.log('Skipping OpenAI - no API key configured');
        continue;
      }

      console.log(`Attempting translation with ${service.name}...`);
      const result = await service.fn(text);
      console.log(`✅ Translation successful using ${service.name}`);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.log(`❌ ${service.name} translation failed: ${errorMessage}`);
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }

  throw new Error(
    `All translation services failed. Last error: ${lastError?.message}`
  );
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json().catch(() => ({}));
    const { text, service = 'auto' } = body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return Response.json(
        {
          error: 'No valid text provided for translation.',
          success: false,
        },
        { status: 400 }
      );
    }

    if (text.trim().length === 0) {
      return Response.json(
        {
          error: 'Text cannot be empty.',
          success: false,
        },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return Response.json(
        {
          error: 'Text too long. Maximum 5000 characters allowed.',
          success: false,
        },
        { status: 400 }
      );
    }

    console.log(
      `🔄 Starting translation for text: "${text}${
        text.length > 50 ? '...' : ''
      }"`
    );
    console.log(`🎯 Preferred service: ${service}`);

    const result = await translateToUrdu(text, service);

    console.log(`✅ Translation completed successfully with ${result.service}`);

    return Response.json(
      {
        originalText: text,
        translatedText: result.translatedText,
        service: result.service,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('❌ Translation API Error:', errorMessage);

    return Response.json(
      {
        error: `Translation failed: ${errorMessage}`,
        success: false,
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint for health check
export async function GET() {
  return Response.json({
    message: 'Translation API is running',
    availableServices: ['mymemory', 'google', 'libretranslate', 'openai'],
    status: 'healthy',
  });
}
