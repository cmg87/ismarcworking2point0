
import React from 'react';
import { SOCIAL_LINKS, CONTACT_ACTIONS } from '../constants';

const SocialList: React.FC = () => {
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
            className={`flex items-center justify-between p-5 glass rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 group hover:-translate-y-1 active:scale-[0.98] shadow-2xl shadow-black/40`}
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
            className="flex flex-col items-center justify-center p-6 glass rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 group active:scale-95 gap-3 shadow-xl shadow-black/40"
          >
            <div className={`text-2xl text-white/40 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${action.color}`}>
              <i className={action.icon}></i>
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white/90 transition-colors">{action.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialList;
