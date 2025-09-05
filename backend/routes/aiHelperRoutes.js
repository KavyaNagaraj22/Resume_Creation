import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Updated model name to match API version
const GEMINI_MODEL = "models/gemini-1.5-pro-latest";

router.post("/generate-summary", async (req, res) => {
  const { jobTitle, experience, skills } = req.body;

  if (!jobTitle || !Array.isArray(skills) || skills.length === 0 || !experience) {
    return res.status(400).json({
      error: "Missing required fields: jobTitle, experience, and skills.",
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `
      Write a concise, professional resume objective for someone applying as a "${jobTitle}".
      Their experience: "${experience}".
      Their skills include: ${skills.join(", ")}.
      Make it clear, confident, and suitable for a modern resume.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    res.json({ summary: text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Gemini summary generation failed." });
  }
});

export default router;
