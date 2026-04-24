import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  tilt?: number;
  overlap?: string;
  refraction?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tilt = 15, overlap, refraction, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{
          y: -10,
          rotateX: tilt ? tilt / 2 : 0,
          rotateY: tilt ? -tilt / 2 : 0,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          marginTop: overlap ? overlap : undefined,
          transformPerspective: 1000,
          transformStyle: "preserve-3d"
        }}
        className={cn(
          "rounded-xl overflow-hidden bg-white shadow-xl border border-black/5 transition-colors relative",
          refraction && "refraction-glass",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";
