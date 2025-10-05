
import { GoogleGenAI } from "@google/genai";
import type { InnovatorData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


const createPrompt = (data: InnovatorData): string => {
  return `
I am an innovator working in the following domain:
"${data.domain}"

The primary thing I feel is missing for my innovation to be fully realized is:
"${data.missingPiece}"

The support and resources that would help me bridge this gap are:
"${data.supportNeeded}"

Based on this information, please generate an "Innovator's Blueprint" for me. The blueprint should be encouraging and actionable. Structure it with the following markdown sections:

### 💡 Core Innovation Analysis
Briefly synthesize my domain and its potential significance. Frame it in a positive and empowering light.

### 🚧 The Critical Gap
Analyze the "one thing missing." Is it a technological hurdle, a market-fit issue, a resource constraint, or a perception problem? Offer a nuanced perspective on this bottleneck.

### 🚀 Strategic Support Roadmap
Based on the requested support, create a bulleted list of concrete, actionable steps. Break down the "support needed" into a practical roadmap.

### ✨ Path Forward
Conclude with a motivating summary that reaffirms the value of my work and encourages me to take the first step from the roadmap.
`;
};

export const generateBlueprint = async (data: InnovatorData): Promise<string> => {
    try {
        const prompt = createPrompt(data);
        const systemInstruction = "You are a compassionate and insightful strategic advisor for brilliant innovators. Your goal is to help them articulate their vision, identify roadblocks, and chart a path forward. You must respond in well-structured markdown with clear headings.";
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topP: 0.95,
            },
        });

        const text = response.text;
        if (!text) {
            throw new Error("Received an empty response from the AI.");
        }

        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate blueprint. Please check your connection or API key.");
    }
};
