import { motion } from 'motion/react';

export const TitleSlide = () => {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-[1600px] mx-auto w-full relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[140px] lg:text-[200px] font-bold tracking-tighter mb-12 flex flex-col"
        >
          <span className="leading-none pb-2">The</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 leading-none pb-4 -mt-4 md:-mt-10">
            RAPTURE.
          </span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-24 h-px bg-amber-500/30 mb-4" />
        </motion.div>
      </div>
    </div>
  );
};
