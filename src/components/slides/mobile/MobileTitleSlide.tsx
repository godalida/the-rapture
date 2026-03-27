import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const MobileTitleSlide = () => {
  return (
    <div className="flex flex-col min-h-screen w-full relative bg-[#000000] overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="flex flex-col items-center w-full gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] block ml-1">The</span>
              <h1 className="text-7xl font-black tracking-[-0.06em] text-white leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-900">
                  RAPTURE.
                </span>
              </h1>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-8 w-full mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-white/10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
