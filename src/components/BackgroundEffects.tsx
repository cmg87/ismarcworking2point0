
import React from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';

const BackgroundEffects: React.FC = () => {
  const { scrollY } = useScroll();
  const baseColor = useTransform(scrollY, [0, 300], ['#05060b', '#1b1e4b']);
  const glowColor = useTransform(scrollY, [0, 300], ['#2563eb', '#ec4899']);
  const gradient = useMotionTemplate`
    radial-gradient(circle at 15% 10%, ${glowColor}44, transparent 45%),
    radial-gradient(circle at 85% 15%, ${glowColor}33, transparent 50%),
    linear-gradient(160deg, ${baseColor}, #05060b 55%)
  `;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <motion.div className="absolute inset-0" style={{ backgroundImage: gradient }} />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
    </div>
  );
};

export default BackgroundEffects;
