
import { GoogleGenAI } from "@google/genai";



export const getWittyStatus = async (isWorking: boolean): Promise<string> => {
  const fallback = isWorking ? "Making things happen. Probably with a coffee." : "Off the clock. On to something good.";
  if (!process.env.API_KEY) return fallback;
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Marc Habbouche is based in Charlotte, NC and works in event production. It's currently ${new Date().toLocaleTimeString()}. 
      Marc is ${isWorking ? 'currently working hard' : 'currently taking a break or out exploring'}. 
      Give a short, witty, 1-sentence status message for his "Is Marc Working?" website. 
      Keep it professional but with some personality. Do not use quotes around the response.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
        topK: 40,
        topP: 0.8,
      }
    });

    return response.text || (isWorking ? "Marc is currently in the zone." : "Marc is currently recharging.");
  } catch (error) {
    console.error("Gemini Error:", error);
    return fallback;
  }
};
