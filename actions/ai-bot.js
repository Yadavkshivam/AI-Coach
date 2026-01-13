"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function askBot(message) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const prompt = `

    You are a friendly AI assistant inside a this app.
    Answer clearly in points and in simple language .
    Give the response in bullet point and ask for elaborate 
    use emoji 

    User Question:
    ${message}
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();

    return reply;
  } catch (error) {
    console.error("Bot Error:", error);
    throw new Error("Bot failed to respond");
  }
}