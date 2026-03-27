import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CursorOrbit = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the follower
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Core Center Dot (The Logos) */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1),0_0_40px_rgba(217,119,6,0.6)]" />

      {/* Inner Divine Ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: 360 
        }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "linear" }
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-amber-400/40"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
      </motion.div>

      {/* Middle Ethereal Ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: -360 
        }}
        transition={{ 
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 15, repeat: Infinity, ease: "linear" }
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/10"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-white/40 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      </motion.div>
      
      {/* Outer Glory Pulse */}
      <motion.div
        animate={{ 
          scale: [0.8, 1.5],
          opacity: [0.4, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeOut" 
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-amber-400/20 bg-amber-500/5"
      />
    </motion.div>
  );
};
