
export const getWittyStatus = async (isWorking: boolean): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/geminiStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isWorking }),
    });

    if (!response.ok) {
      throw new Error(`Gemini function error: ${response.status}`);
    }

    const data = await response.json();
    if (!data?.text) {
      throw new Error('Gemini function returned empty response');
    }

    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return isWorking ? "Marc is currently in the zone." : "Marc is currently recharging.";
  }
};
