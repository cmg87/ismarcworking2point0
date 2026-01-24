import { GoogleGenAI } from '@google/genai';

const getPrompt = (isWorking) => `Marc Habbouche is based in Charlotte, NC and works in event production. It's currently ${new Date().toLocaleTimeString()}.
  Marc is ${isWorking ? 'currently working hard' : 'currently taking a break or out exploring'}.
  Give a short, witty, 1-sentence status message for his "Is Marc Working?" website.
  Keep it professional but with some personality. Do not use quotes around the response.`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing GEMINI_API_KEY' }),
    };
  }

  try {
    const { isWorking } = JSON.parse(event.body || '{}');
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: getPrompt(Boolean(isWorking)),
      config: {
        temperature: 0.9,
        topK: 40,
        topP: 0.8,
      },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: response.text || (isWorking ? 'Marc is currently in the zone.' : 'Marc is currently recharging.'),
      }),
    };
  } catch (error) {
    console.error('Gemini function error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Gemini request failed', details: String(error?.message || error) }),
    };
  }
};
