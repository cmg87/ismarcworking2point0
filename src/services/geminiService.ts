
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';
let cachedClient: import('@google/genai').GoogleGenAI | null = null;

const getClient = async () => {
  if (!apiKey) {
    return null;
  }

  if (!cachedClient) {
    const { GoogleGenAI } = await import('@google/genai');
    cachedClient = new GoogleGenAI({ apiKey });
  }

  return cachedClient;
};

export const getWittyStatus = async (isWorking: boolean): Promise<string> => {
  try {
    const client = await getClient();
    if (!client) {
      console.warn('Gemini disabled: missing API key.');
      return isWorking ? "Marc is currently in the zone." : "Marc is currently recharging.";
    }

    const prompt = `Marc Habbouche is based in Charlotte, NC and works in event production. It's currently ${new Date().toLocaleTimeString()}. 
      Marc is ${isWorking ? 'currently working hard' : 'currently taking a break or out exploring'}. 
      Give a short, witty, 1-sentence status message for his "Is Marc Working?" website. 
      Keep it professional but with some personality. Do not use quotes around the response.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
      config: {
        temperature: 0.9,
        topK: 40,
        topP: 0.8,
      }
    });

    console.log('Gemini response:', response);
    return response.text || (isWorking ? "Marc is currently in the zone." : "Marc is currently recharging.");
  } catch (error) {
    console.error("Gemini Error:", error);
    return isWorking ? "The code is flowing." : "Taking a brief intermission.";
  }
};
