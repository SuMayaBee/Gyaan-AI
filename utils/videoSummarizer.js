import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';

/**
 * Fetches the transcript for a given YouTube URL.
 */
export async function extractTranscript(videoUrl) {
  try {
    console.log('Extracting transcript for URL:', videoUrl);
    const idMatch = videoUrl.match(/(?:v=|\.be\/)([\w-]{11})/);
    if (!idMatch) throw new Error('Invalid YouTube URL');
    
    const videoId = idMatch[1];
    console.log('Extracted video ID:', videoId);
    
    console.log('Fetching transcript...');
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log('Transcript fetched:', transcript ? 'Success' : 'Failed');
    
    if (!transcript || transcript.length === 0) {
      throw new Error('No transcript available for this video');
    }
    
    // transcript is an array of { text, duration, offset }
    const fullText = transcript.map(item => item.text).join(' ');
    console.log('Transcript length:', fullText.length);
    
    if (!fullText.trim()) {
      throw new Error('Transcript is empty');
    }
    
    return fullText;
  } catch (error) {
    console.error('Error extracting transcript:', error);
    throw new Error(error.message || 'Failed to extract transcript');
  }
}

/**
 * Generates a summary for the provided transcript using OpenAI.
 */
export async function generateSummary(transcript) {
  try {
    console.log('Generating summary for transcript...');
    if (!transcript || !transcript.trim()) {
      throw new Error('No transcript provided for summarization');
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log('Initializing OpenAI...');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    console.log('Creating completion...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes video transcripts.' },
        { role: 'user', content: `Please provide a comprehensive summary of the following video transcript:

${transcript}` }
      ],
      temperature: 0.7,
    });
    
    console.log('Summary generated successfully');
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error(error.message || 'Failed to generate summary');
  }
}