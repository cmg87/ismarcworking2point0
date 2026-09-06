import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

export default function ContactTools() {
  const [mode, setMode] = useState<'qr' | 'message' | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [qr, setQr] = useState('');
  const [qrError, setQrError] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (mode && !dialog.current?.open) dialog.current?.showModal();
    if (!mode && dialog.current?.open) dialog.current.close();
  }, [mode]);
  useEffect(() => {
    if (mode !== 'qr' || qr) return;
    let active = true;
    setQrError(false);
    QRCode.toDataURL('https://ismarcworking.com/', { width: 240, margin: 2, color: { dark: '#111310', light: '#ffffff' } })
      .then(url => { if (active) setQr(url); })
      .catch(() => { if (active) setQrError(true); });
    return () => { active = false; };
  }, [mode, qr]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    const digits = phone.replace(/\D/g, '');
    if (!name.trim()) { setFeedback('Please enter your name.'); return; }
    if (digits.length !== 10) { setFeedback('Enter a 10-digit callback number.'); return; }
    if (message.trim().length > 120) { setFeedback('Keep your message to 120 characters.'); return; }
    setSending(true); setFeedback('');
    try {
      const response = await fetch('/.netlify/functions/sendMessage', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), callbackNumber: digits, message: message.trim() }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) throw new Error('Message failed');
      setFeedback('Message sent. Marc will get back to you.');
      setName(''); setPhone(''); setMessage('');
    } catch { setFeedback('Unable to send right now. Please try calling or emailing Marc.'); }
    finally { setSending(false); }
  }

  return <>
    <div className="contact-tools">
      <button onClick={() => { setFeedback(''); setMode('message'); }}>Send a message</button>
      <span aria-hidden="true">/</span>
      <button onClick={() => setMode('qr')}>Show QR code</button>
    </div>
    <dialog ref={dialog} className="contact-dialog" onClose={() => setMode(null)} aria-labelledby="contact-dialog-title">
      <div className="dialog-top"><span className="eyebrow">LET'S CONNECT</span><button type="button" className="dialog-close" onClick={() => setMode(null)} aria-label="Close dialog">×</button></div>
      <h2 id="contact-dialog-title">{mode === 'qr' ? 'Keep in touch.' : 'Message Marc.'}</h2>
      {mode === 'qr' ? <div className="qr-content">
        {qr ? <img src={qr} alt="QR code linking to ismarcworking.com" width="240" height="240"/> : <p role="status">{qrError ? 'Couldn’t generate the code. Use Share card instead.' : 'Generating QR code…'}</p>}
        <p>Scan to open Marc’s card.</p>
      </div> : <form onSubmit={send}>
        <label htmlFor="contact-name">Your name</label><input id="contact-name" autoComplete="name" required value={name} onChange={e => setName(e.target.value)}/>
        <label htmlFor="contact-phone">Callback number</label><input id="contact-phone" type="tel" autoComplete="tel-national" inputMode="tel" required placeholder="(555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)}/>
        <label htmlFor="contact-message">Message <span>(optional)</span></label><textarea id="contact-message" maxLength={120} rows={3} placeholder="How can Marc help?" value={message} onChange={e => setMessage(e.target.value)}/>
        <div className="character-count">{message.length}/120</div>
        <p className="form-feedback" role="status">{feedback}</p>
        <button className="button button-metal" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
      </form>}
    </dialog>
  </>;
}
