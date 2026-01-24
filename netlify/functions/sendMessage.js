const formatPhone = (digits) => {
  if (!digits) {
    return '';
  }
  const cleaned = digits.replace(/\D/g, '').slice(0, 10);
  if (cleaned.length !== 10) {
    return '';
  }
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.TEXTBELT_API_KEY;
  const recipientNumber = process.env.TEXTBELT_TO_NUMBER;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Missing TEXTBELT_API_KEY' }),
    };
  }
  if (!recipientNumber) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Missing TEXTBELT_TO_NUMBER' }),
    };
  }

  try {
    const { name, callbackNumber, message } = JSON.parse(event.body || '{}');
    const trimmedName = String(name || '').trim();
    const trimmedMessage = String(message || '').trim();
    const phoneDigits = String(callbackNumber || '').replace(/\D/g, '');
    const formattedPhone = formatPhone(phoneDigits);

    if (!trimmedName) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Name is required' }),
      };
    }

    if (!formattedPhone) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Callback number must be 10 digits' }),
      };
    }

    if (trimmedMessage.length > 120) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Message exceeds 120 characters' }),
      };
    }

    const text = [
      `New message request from ${trimmedName}.`,
      `Callback: ${formattedPhone}.`,
      trimmedMessage ? `Message: ${trimmedMessage}` : 'Message: (none)',
    ].join(' ');

    const response = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: recipientNumber,
        message: text,
        key: apiKey,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.success) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: data?.error || 'Text message failed' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Textbelt function error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Textbelt request failed' }),
    };
  }
};
