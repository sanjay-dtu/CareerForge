"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { isRateLimited, extractRetryAfterSeconds } from "@/lib/api-quota";

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      As an expert professional resume writer for the ${user.industry} industry, your task is to rewrite the following ${type}.
      
      Current Content: "${current}"
      
      Instructions:
      1. Use strong action verbs (e.g., "Spearheaded", "Architected", "Optimized").
      2. Quantify achievements where possible (e.g., "Increased efficiency by 20%", "Managed a team of 5").
      3. Use industry-specific terminology appropriate for ${user.industry}.
      4. Ensure the tone is professional, confident, and concise.
      5. Focus on results and impact rather than just tasks.
      6. Limit the response to a single, high-impact paragraph.
      
      Return ONLY the improved text. No explanations, no markdown formatting (except bolding for impact if needed), and no conversational filler.
    `;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const improvedContent = response.text().trim();
      return improvedContent;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error.message);
      
      const is503 = error.message?.includes("503") || error.message?.includes("Service Unavailable");
      
      if (is503 && attempts < maxAttempts) {
        // Wait for 2 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }

      if (isRateLimited(error)) {
        return generateFallbackImprovement(current, type, user.industry);
      }
      
      if (attempts === maxAttempts) {
        throw new Error("AI service is currently at high capacity. Please try again in a few seconds.");
      }
    }
  }
}

function generateFallbackImprovement(current, type, industry) {
  const improvements = [
    `Strategically ${current.toLowerCase()} in the ${industry} sector, leveraging advanced methodologies to drive operational excellence and achieve high-impact business objectives.`,
    `Optimized ${current.toLowerCase()} by implementing industry-standard ${industry} practices, resulting in enhanced performance and streamlined workflows.`,
    `Spearheaded the ${current.toLowerCase()} process for ${industry} projects, ensuring top-tier quality and measurable growth across key performance indicators.`,
    `Transformed ${current.toLowerCase()} initiatives through expert ${industry} knowledge and data-driven strategies to deliver superior results.`
  ];
  
  return improvements[Math.floor(Math.random() * improvements.length)];
}