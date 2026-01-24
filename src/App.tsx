
import React, { useState, useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import StatusCard from './components/StatusCard';
import SocialList from './components/SocialList';
import { MARC_DETAILS } from './constants';

const App: React.FC = () => {
  const [isWorking, setIsWorking] = useState<boolean>(true);

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
      <header className="flex flex-col items-center gap-6 mb-8 animate-fadeIn">
        <div className="relative group cursor-pointer" onClick={handleShare}>
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 shadow-2xl">
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
          <SocialList />
          
          <div className="w-full max-w-md mx-auto px-6 grid grid-cols-2 gap-4">
            <button 
              onClick={downloadVCard}
              className="py-5 glass rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all font-black text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 group shadow-xl shadow-black/40 overflow-hidden relative"
            >
              <i className="fa-solid fa-address-card opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all"></i>
              Save Contact
            </button>
            <button 
              onClick={handleShare}
              className="py-5 glass rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all font-black text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 group shadow-xl shadow-black/40"
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
