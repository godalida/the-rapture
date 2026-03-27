import { useState } from 'react';
import { motion } from 'motion/react';
import { slideTitles } from '../constants';

interface SideNavProps {
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  slides: any[];
}

export const SideNav = ({ currentSlide, setCurrentSlide, slides }: SideNavProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.nav 
      className="hidden md:flex fixed left-0 top-0 h-full z-50 flex-col justify-center gap-2 bg-black/40 backdrop-blur-xl border-r border-white/10"
      initial={{ width: 60, padding: 12 }}
      animate={{ width: isHovered ? 256 : 60, padding: isHovered ? 24 : 12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`text-white/30 text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 px-4 whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        Presentation
      </div>
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`text-left rounded-lg transition-all duration-300 flex items-center ${
            isHovered ? 'px-4 py-2.5 gap-3 justify-start' : 'p-2 justify-center'
          } ${
            currentSlide === index ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          {isHovered ? (
            <>
              <span className="text-[10px] font-mono opacity-50">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-sm font-medium tracking-tight whitespace-nowrap transition-opacity duration-300 opacity-100">
                {slideTitles[index]}
              </span>
            </>
          ) : (
            <div className={`rounded-full transition-all duration-300 ${currentSlide === index ? 'w-2.5 h-2.5 bg-white' : 'w-1.5 h-1.5 bg-white/10'}`} />
          )}
        </button>
      ))}
    </motion.nav>
  );
};
