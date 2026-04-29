"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { isRateLimited, extractRetryAfterSeconds } from "@/lib/api-quota";

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    Write a high-end, professional cover letter for a ${data.jobTitle} position at ${data.companyName}.
    
    Candidate Details:
    - Industry: ${user.industry}
    - Experience: ${user.experience} years
    - Skills: ${user.skills?.join(", ")}
    - Professional Bio: ${user.bio}
    
    Job Context:
    ${data.jobDescription}
    
    Formatting Instructions:
    1. Standard Business Letter Format:
       - Date at the top
       - Proper Salutation (e.g., Dear Hiring Manager or Dear [Company Name] Team)
       - Introduction (Which role and where you found it)
       - Body Paragraph 1 (Why you are a fit - specific skills from candidate details)
       - Body Paragraph 2 (Why this company - based on job context)
       - Conclusion (Call to action/Interview request)
       - Professional Sign-off
    2. Tone: Professional, authoritative, yet enthusiastic.
    3. Length: 250-350 words.
    4. Markdown: Use bolding for impact and clear paragraph separation.
    
    Return ONLY the cover letter content in markdown.
  `;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const result = await model.generateContent(prompt);
      const content = result.response.text().trim();

      const coverLetter = await db.coverLetter.create({
        data: {
          content,
          jobDescription: data.jobDescription,
          companyName: data.companyName,
          jobTitle: data.jobTitle,
          status: "completed",
          userId: user.id,
        },
      });

      return coverLetter;
    } catch (error) {
      attempts++;
      const is503 = error.message?.includes("503") || error.message?.includes("Service Unavailable");
      
      if (is503 && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }

      if (isRateLimited(error) || attempts === maxAttempts) {
        const fallbackContent = generateFallbackCoverLetter(data, user);
        const coverLetter = await db.coverLetter.create({
          data: {
            content: fallbackContent,
            jobDescription: data.jobDescription,
            companyName: data.companyName,
            jobTitle: data.jobTitle,
            status: "completed",
            userId: user.id,
          },
        });
        return coverLetter;
      }
      throw error;
    }
  }
}

function generateFallbackCoverLetter(data, user) {
  return `**Date:** ${new Date().toLocaleDateString()}

**To,**
**Hiring Manager**
**${data.companyName}**

**Subject: Application for the position of ${data.jobTitle}**

Dear Hiring Manager,

I am writing to express my profound interest in the **${data.jobTitle}** position at **${data.companyName}**, as advertised. With over **${user.experience} years** of expertise in the **${user.industry}** sector and a specialized skill set including **${user.skills?.slice(0, 3).join(", ") || 'industry-leading technologies'}**, I am confident in my ability to deliver significant value to your esteemed organization.

Throughout my career, I have consistently demonstrated a commitment to excellence and a results-driven approach. My professional background—characterized by ${user.bio || 'a strong track record of success'}—aligns perfectly with the requirements of this role.

I am particularly impressed by ${data.companyName}'s reputation for innovation and look forward to the possibility of contributing my skills to your team. I have extensive experience in ${user.skills?.join(", ") || 'relevant fields'} which I believe will be highly beneficial for the current job requirements.

Thank you for your time and consideration. I am eager to discuss how my background can support the growth of **${data.companyName}** during a formal interview.

**Sincerely,**

**${user.fullName || 'Professional Candidate'}**
*${user.industry} Expert*`;
}

export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function updateCoverLetter(id, content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      content,
    },
  });
}