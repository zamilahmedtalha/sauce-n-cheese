import React from 'react';
import { motion } from 'motion/react';

export function FuzzyOverlay() {
  return (
    <motion.div
      initial={{ transform: 'translateX(-10%) translateY(-10%)' }}
      animate={{
        transform: 'translateX(10%) translateY(10%)',
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: 'linear',
        repeatType: 'mirror',
      }}
      className="pointer-events-none fixed inset-0 z-[99999] opacity-[0.03]"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
      }}
    />
  );
}
