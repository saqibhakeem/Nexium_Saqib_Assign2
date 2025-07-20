// src/app/api/summarize/route.ts
import { extractiveSummary } from '@/lib/summarize';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);
    console.log('Text content:', body.text);
    console.log('Type of text:', typeof body.text);
    
    // Extract the text content
    const { text } = body;
    
    // Validate that text exists and is a string
    if (!text) {
      return Response.json({ 
        error: 'No text content provided' 
      }, { status: 400 });
    }
    
    if (typeof text !== 'string') {
      return Response.json({ 
        error: `Expected string but got ${typeof text}` 
      }, { status: 400 });
    }
    
    // Call the extractive summary function
    const result = await extractiveSummary(text);
    
    console.log('Summary result:', result);
    
    return Response.json(result);
    
  } catch (error) {
    console.error('API route error:', error);
    return Response.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}