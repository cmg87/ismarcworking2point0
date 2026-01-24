
import React, { useMemo, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import BackgroundEffects from './components/BackgroundEffects';
import StatusCard from './components/StatusCard';
import SocialList from './components/SocialList';
import { MARC_DETAILS } from './constants';

const App: React.FC = () => {
  const [isWorking, setIsWorking] = useState<boolean>(true);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const estParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        weekday: 'short',
        hour: 'numeric',
        hour12: false,
      }).formatToParts(now);

      const dayPart = estParts.find((part) => part.type === 'weekday')?.value ?? '';
      const hourPart = estParts.find((part) => part.type === 'hour')?.value ?? '';
      const hour = Number.parseInt(hourPart, 10);
      const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(dayPart);

      // Mon-Fri, 8 AM to 7:59 PM Eastern Time
      const workHours = isWeekday && hour >= 8 && hour < 20;
      setIsWorking(workHours);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showQrCode || qrCodeDataUrl) {
      return;
    }

    const generateQrCode = async () => {
      try {
        const dataUrl = await QRCode.toDataURL('https://ismarcworking.com/', {
          margin: 1,
          width: 220,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        });
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error('QR code generation failed:', error);
      }
    };

    generateQrCode();
  }, [showQrCode, qrCodeDataUrl]);

  const formattedPhone = useMemo(() => {
    const digits = formPhone.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) {
      return digits;
    }
    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }, [formPhone]);

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    setFormPhone(digits);
  };

  const handleMessageSubmit = async () => {
    setFormError(null);
    setFormSuccess(null);

    const trimmedName = formName.trim();
    const trimmedMessage = formMessage.trim();
    if (!trimmedName) {
      setFormError('Name is required.');
      return;
    }
    if (formPhone.length !== 10) {
      setFormError('Callback number must be 10 digits.');
      return;
    }
    if (trimmedMessage.length > 120) {
      setFormError('Message must be 120 characters or fewer.');
      return;
    }

    setFormSubmitting(true);
    try {
      const response = await fetch('/.netlify/functions/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          callbackNumber: formPhone,
          message: trimmedMessage,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        const details = data?.error ? ` (${data.error})` : '';
        throw new Error(`Message failed${details}`);
      }

      setFormSuccess('Message sent. We will respond soon.');
      setFormName('');
      setFormPhone('');
      setFormMessage('');
    } catch (error) {
      console.error('Message error:', error);
      setFormError('Unable to send message right now.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const downloadVCard = () => {
    const link = document.createElement('a');
    link.href = MARC_DETAILS.vcardUrl;
    link.setAttribute('download', 'MarcHabbouche.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Is Marc Working?',
        text: 'Digital Business Card for Marc Habbouche',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pb-24 pt-16 selection:bg-blue-500/30 overflow-x-hidden">
      <BackgroundEffects />

      {/* Profile Header */}
      <header className="flex flex-col items-center gap-6 mb-8 animate-fadeIn glass-panel rounded-3xl px-6 py-10">
        <div className="relative group cursor-pointer" onClick={() => setShowQrCode(true)}>
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-700">
            <img 
              src={MARC_DETAILS.avatar} 
              alt={MARC_DETAILS.name}
              className="relative w-36 h-36 rounded-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Marc+Habbouche&background=0D8ABC&color=fff&size=128';
              }}
            />
          </div>
        </div>
        <div className="text-center px-8">
          <h2 className="text-4xl font-display font-black text-white tracking-tighter">{MARC_DETAILS.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px w-4 bg-blue-500/50"></div>
            <p className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">{MARC_DETAILS.role}</p>
            <div className="h-px w-4 bg-blue-500/50"></div>
          </div>
          <p className="mt-6 text-white/40 text-sm max-w-[280px] leading-relaxed font-medium">
            {MARC_DETAILS.bio}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full animate-fadeInUp">
        <StatusCard isWorking={isWorking} />
        
        <div className="flex flex-col gap-10">
          <SocialList onMessageClick={() => setShowMessageForm(true)} />
          
          <div className="w-full max-w-md mx-auto px-6 grid grid-cols-2 gap-4">
            <button 
              onClick={downloadVCard}
              className="py-5 glass rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-500 font-black text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 group shadow-xl shadow-black/40 overflow-hidden relative hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <i className="fa-solid fa-address-card opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all"></i>
              Save Contact
            </button>
            <button 
              onClick={handleShare}
              className="py-5 glass rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-500 font-black text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 group shadow-xl shadow-black/40 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <i className="fa-solid fa-share-nodes opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all"></i>
              Share Card
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 pb-12 flex flex-col items-center gap-3">
        <div className="text-[11px] text-white/10 uppercase tracking-[0.4em] font-black flex items-center gap-4">
          <div className="h-[1px] w-8 bg-white/5"></div>
          Is Marc Working?
          <div className="h-[1px] w-8 bg-white/5"></div>
        </div>
        <div className="text-[9px] text-white/5 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Marc Habbouche • Charlotte, NC
        </div>
      </footer>

      {/* Status Toggle Switch (Sticky) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsWorking(!isWorking)}
          className="w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-white/20 hover:text-white/60 transition-all shadow-2xl hover:bg-white/5 hover:scale-110 active:scale-90 group backdrop-blur-3xl"
          title="Toggle Manual Status (Demo)"
        >
          <i className={`fa-solid ${isWorking ? 'fa-briefcase' : 'fa-moon'} text-lg group-hover:rotate-12 transition-transform`}></i>
        </button>
      </div>

      {showQrCode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
          onClick={() => setShowQrCode(false)}
        >
          <div
            className="w-full max-w-xs glass rounded-2xl border border-white/10 p-6 text-center shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-4">
              Scan To Visit
            </div>
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="QR code for https://ismarcworking.com"
                className="mx-auto rounded-xl bg-white p-2"
              />
            ) : (
              <div className="mx-auto flex h-[236px] w-[236px] items-center justify-center rounded-xl bg-white/10 text-xs text-white/60">
                Generating QR...
              </div>
            )}
            <button
              className="mt-5 w-full py-3 rounded-xl border border-white/10 bg-white/[0.05] text-[10px] font-black tracking-[0.3em] uppercase text-white/70 hover:text-white hover:bg-white/[0.08] transition"
              onClick={() => setShowQrCode(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showMessageForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
          onClick={() => setShowMessageForm(false)}
        >
          <div
            className="w-full max-w-md glass rounded-2xl border border-white/10 p-6 text-left shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-4">
              Message Marc
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                  Name
                </label>
                <input
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                  Callback Number
                </label>
                <input
                  value={formattedPhone}
                  onChange={(event) => handlePhoneChange(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                  placeholder="(555) 123-4567"
                  inputMode="tel"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                  Message (optional)
                </label>
                <textarea
                  value={formMessage}
                  onChange={(event) => setFormMessage(event.target.value)}
                  maxLength={120}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                  placeholder="How can Marc help?"
                />
                <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
                  {formMessage.length}/120
                </div>
              </div>
            </div>

            {formError && (
              <div className="mt-4 text-xs text-red-300">{formError}</div>
            )}
            {formSuccess && (
              <div className="mt-4 text-xs text-emerald-300">{formSuccess}</div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl border border-white/10 bg-white/[0.05] text-[10px] font-black tracking-[0.3em] uppercase text-white/70 hover:text-white hover:bg-white/[0.08] transition"
                onClick={() => setShowMessageForm(false)}
                type="button"
              >
                Close
              </button>
              <button
                className="flex-1 py-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-[10px] font-black tracking-[0.3em] uppercase text-emerald-200 hover:text-white hover:bg-emerald-400/20 transition disabled:opacity-50"
                onClick={handleMessageSubmit}
                type="button"
                disabled={formSubmitting}
              >
                {formSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default App;
