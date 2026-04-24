import { motion } from 'motion/react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = '',
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`inline-block ${
        disabled ? '' : 'animate-shine'
      } ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(200, 80, 0, 1) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      <style>
        {`
          @keyframes shine {
            0% {
              background-position: 100%;
            }
            100% {
              background-position: -100%;
            }
          }
          .animate-shine {
            animation: shine linear infinite;
          }
        `}
      </style>
      <span className="text-white text-inherit" style={{ WebkitTextFillColor: 'currentColor' }}>{text}</span>
    </div>
  );
}
