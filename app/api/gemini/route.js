import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client with your API key
// Note: In production, store this in environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { prompt, context } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Use a fallback if Gemini API key is not configured
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not configured. Using fallback response.");
      return NextResponse.json({
        response: generateFallbackResponse(prompt, context),
      });
    }

    // Access the generative model (updating to gemini-1.5-flash or gemini-1.5-pro)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a contextual prompt that incorporates the course material
    const contextualPrompt = `
      You are an educational AI assistant helping a student understand course material.
      
      COURSE MATERIAL CONTEXT:
      ${context || "No specific context provided."}
      
      USER QUERY:
      ${prompt}
      
      Please provide a helpful, educational response that explains concepts clearly and thoroughly.
      Use examples where appropriate, and relate your explanation to the course material.
      Keep your response concise but informative.
    `;

    // Generate content using Gemini with proper configuration
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: contextualPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    });
    
    // Extract the response text properly based on the API structure
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error generating AI response:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to generate AI response", 
        response: "I'm having trouble connecting to my knowledge base right now. Please try again later."
      },
      { status: 500 }
    );
  }
}

// Fallback function to generate responses when API key is not available
function generateFallbackResponse(prompt, context) {
  if (!context) return "I need more information about the course to help you.";

  const lowerPrompt = prompt.toLowerCase();
  
  // Extract course title from context
  const courseTitleMatch = context.match(/Course Title: (.*?)(?:\n|$)/);
  const courseTitle = courseTitleMatch ? courseTitleMatch[1].trim() : "this course";
  
  if (lowerPrompt.includes("explain") || lowerPrompt.includes("what is")) {
    return `In ${courseTitle}, this concept refers to a fundamental principle that helps understand the subject matter more deeply. The key is to understand how different elements interact and connect to form a cohesive framework.`;
  } 
  
  if (lowerPrompt.includes("example") || lowerPrompt.includes("application")) {
    return `A practical application of this concept can be seen in everyday life. For instance, when studying ${courseTitle}, these principles can be applied to solve real-world problems and develop innovative solutions.`;
  }
  
  if (lowerPrompt.includes("difference") || lowerPrompt.includes("compare")) {
    return `When comparing these concepts in ${courseTitle}, it's important to recognize their distinct characteristics while also understanding how they relate to each other within the broader framework of the subject.`;
  }
  
  if (lowerPrompt.includes("how to") || lowerPrompt.includes("steps")) {
    return `To approach this in ${courseTitle}, follow these general steps: 1) Identify the key variables, 2) Apply the relevant principles, 3) Analyze the relationships between components, and 4) Draw conclusions based on your analysis.`;
  }
  
  // Default response
  return `That's an interesting question about ${courseTitle}. This topic involves understanding the core principles and applying analytical thinking to develop a comprehensive understanding of the subject matter.`;
} 