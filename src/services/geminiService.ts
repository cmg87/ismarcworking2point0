
export const getWittyStatus = async (isWorking: boolean): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/geminiStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isWorking }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const details = data?.details ? ` - ${data.details}` : '';
      throw new Error(`Gemini function error: ${response.status}${details}`);
    }

    if (!data?.text) {
      throw new Error('Gemini function returned empty response');
    }

    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return isWorking ? "Marc is currently in the zone." : "Marc is currently recharging.";
  }
};
