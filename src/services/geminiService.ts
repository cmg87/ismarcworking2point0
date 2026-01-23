
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getWittyStatus = async (isWorking: boolean): Promise<string> => {
  try {
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
    return isWorking ? "The code is flowing." : "Taking a brief intermission.";
  }
};
