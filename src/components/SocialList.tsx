
import React from 'react';
import { SOCIAL_LINKS, CONTACT_ACTIONS } from '../constants';

interface SocialListProps {
  onMessageClick: () => void;
}

const SocialList: React.FC<SocialListProps> = ({ onMessageClick }) => {
  return (
    <div className="w-full max-w-md mx-auto px-6 space-y-8 mt-6">
      {/* Primary Social Links - Large Cards */}
      <div className="space-y-4">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-5 glass rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 group hover:-translate-y-1 active:scale-[0.98] shadow-2xl shadow-black/40 hover:shadow-blue-500/10 hover:shadow-2xl hover:scale-[1.01]`}
          >
            <div className="flex items-center gap-5">
              <div className={`text-2xl text-white/50 transition-all duration-300 group-hover:scale-110 ${link.color}`}>
                <i className={link.icon}></i>
              </div>
              <div>
                <span className="block font-bold text-white/90 group-hover:text-white transition-colors tracking-tight text-lg">{link.name}</span>
              </div>
            </div>
            <div className="text-white/10 group-hover:text-white/40 transition-all group-hover:translate-x-1">
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </a>
        ))}
      </div>

      {/* Contact Quick Actions - Prominent Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {CONTACT_ACTIONS.map((action) => (
          <a
            key={action.id}
            href={action.url}
            className="flex flex-col items-center justify-center p-6 glass rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 group active:scale-95 gap-3 shadow-xl shadow-black/40 hover:shadow-purple-500/10 hover:-translate-y-0.5"
          >
            <div className={`text-2xl text-white/40 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${action.color}`}>
              <i className={action.icon}></i>
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white/90 transition-colors">{action.name}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={onMessageClick}
        className="w-full glass rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 group active:scale-[0.98] shadow-2xl shadow-black/40 hover:shadow-emerald-500/10 hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-center gap-3 px-6 py-5">
          <i className="fa-solid fa-message text-white/50 group-hover:text-emerald-300 transition-colors"></i>
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70 group-hover:text-white">Message Now</span>
        </div>
      </button>
    </div>
  );
};

export default SocialList;
