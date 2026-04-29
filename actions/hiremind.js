"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";

export async function chatWithHireMind(messages) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized: Please log in again.");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("API Configuration Error: GEMINI_API_KEY is missing.");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using the EXACT same model name found in your existing services (gemini-2.5-flash)
    // Even though it's unconventional, it seems to be what your environment expects.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
    });

    const lastMessage = messages[messages.length - 1].content;
    
    const systemPrompt = `You are HireMind AI, a premium career coach on the CareerForge platform. 
    Provide helpful, professional career advice. Be concise and impactful.`;

    const result = await model.generateContent([
      { text: systemPrompt },
      ...messages.map(m => ({ text: `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}` })),
      { text: "Assistant: " }
    ]);

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("HireMind Error:", error);
    
    // Fallback to gemini-pro if 2.5-flash fails
    if (error.message?.includes("404")) {
       try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const lastMessage = messages[messages.length - 1].content;
          const result = await model.generateContent(lastMessage);
          return result.response.text();
       } catch (fallbackError) {
          throw new Error("AI Model not found. Please verify your Gemini API model access.");
       }
    }

    throw new Error(`AI Error: ${error.message || "Connection failed"}`);
  }
}
