import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Helper function to create a simple podcast script
function createPodcastScript(fileName, prompt) {
  return `
Host: Welcome to our research paper breakdown podcast! Today, we're going to discuss ${fileName} in a beginner-friendly way.

Host: Our listener asked: "${prompt}"

Expert: I'd be happy to help explain this paper! Let's break it down into simple terms that everyone can understand.

Host: That's great! Could you start by giving us a brief overview?

Expert: Of course! This paper is about exploring new ways to make complex research more accessible to beginners. 
The key points we'll discuss are the main findings, methodology, and practical implications.

Host: That sounds perfect for our listeners. What would you say is the most interesting finding?

Expert: One fascinating aspect is how the research approaches making technical concepts more understandable. 
It's like building a bridge between complex academic ideas and everyday understanding.

Host: Thank you for that clear explanation! Any final thoughts for our listeners?

Expert: Yes! Remember that every complex topic can be broken down into simpler parts. 
Don't be intimidated by academic papers - they're just detailed explorations of interesting ideas!

Host: Thank you for tuning in to our research paper breakdown! Keep learning and exploring!
`;
}

export async function POST(request) {
  try {
    console.log('1. Starting PDF to Podcast request');
    
    const formData = await request.formData();
    const file = formData.get('pdf');
    const prompt = formData.get('prompt');
    
    if (!file || !prompt) {
      return NextResponse.json(
        { error: 'Missing PDF file or prompt' },
        { status: 400 }
      );
    }

    console.log('2. Received:', {
      fileName: file?.name,
      fileType: file?.type,
      fileSize: file?.size,
      prompt: prompt
    });

    // Generate podcast script
    const script = createPodcastScript(file.name, prompt);

    // Return the script to be converted to speech in the frontend
    return NextResponse.json({
      success: true,
      message: 'Podcast script generated successfully',
      script: script
    });

  } catch (error) {
    console.error('Error in PDF to Podcast API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
} 