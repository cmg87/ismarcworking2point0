
import React, { useState, useEffect } from 'react';
import { getWittyStatus } from '@/services/geminiService';

interface StatusCardProps {
  isWorking: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ isWorking }) => {
  const [aiMessage, setAiMessage] = useState<string>('Detecting productivity...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    const fetchStatus = async () => {
      setLoading(true);
      const msg = await getWittyStatus(isWorking);
      if (!isCurrent) {
        return;
      }
      setAiMessage(msg);
      setLoading(false);
    };
    fetchStatus();

    return () => {
      isCurrent = false;
    };
  }, [isWorking]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-6">
      <div className="relative group">
        <div className={`absolute -inset-1 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000 ${isWorking ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
        <h1 className="relative text-8xl md:text-9xl font-display font-black tracking-tighter select-none">
          {isWorking ? 'YES.' : 'NO.'}
        </h1>
      </div>
      
      <div className="mt-8 glass rounded-2xl p-6 max-w-md w-full border border-white/5 shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-0.5 transition-all duration-500">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-2 h-2 rounded-full ${isWorking ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Status Update</span>
        </div>
        <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed">
          {loading ? (
            <span className="inline-flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
            </span>
          ) : aiMessage}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
