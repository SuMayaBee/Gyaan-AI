import { NextResponse } from 'next/server';
import { extractTranscript, generateSummary } from '@/utils/videoSummarizer';

export async function POST(request) {
  try {
    console.log('Received video summarization request');
    const { videoUrl } = await request.json();
    console.log('Video URL:', videoUrl);
    
    if (!videoUrl) {
      console.log('No video URL provided');
      return NextResponse.json(
        { error: 'Please provide a YouTube video URL' },
        { status: 400 }
      );
    }

    console.log('Starting transcript extraction...');
    const transcript = await extractTranscript(videoUrl);
    console.log('Transcript extracted successfully');

    console.log('Starting summary generation...');
    const summary = await generateSummary(transcript);
    console.log('Summary generated successfully');
    
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Video summarization error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to summarize video' },
      { status: 500 }
    );
  }
}