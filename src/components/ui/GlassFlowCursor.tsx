import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';

export function GlassFlowCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'button' || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).tagName.toLowerCase() === 'a') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  const scale = useSpring(isHovering ? 1.5 : 1, springConfig);
  
  return (
    <>
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block",
          "bg-white backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        )}
        style={{
          x: useTransform(cursorX, v => (v as unknown as number) - 32),
          y: useTransform(cursorY, v => (v as unknown as number) - 32),
          scale,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-pri rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          x: useTransform(cursorX, v => (v as unknown as number) - 8),
          y: useTransform(cursorY, v => (v as unknown as number) - 8),
        }}
        animate={{
          scale: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
