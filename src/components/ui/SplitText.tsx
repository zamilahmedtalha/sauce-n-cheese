import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className = '', delay = 0.05 }: SplitTextProps) {
  const words = text.split(' ');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((letter, letterIndex) => {
            const index = words.slice(0, wordIndex).join('').length + letterIndex;
            return (
              <motion.span
                key={letterIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: index * delay,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex !== words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
