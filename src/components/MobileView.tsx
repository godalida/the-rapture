import React, { useRef, ReactNode, RefObject } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MobileTitleSlide } from './slides/mobile/MobileTitleSlide';
import { MobilePatternSlide } from './slides/mobile/MobilePatternSlide';
import { MobileDescentSlide } from './slides/mobile/MobileDescentSlide';
import { MobileSeparationSlide } from './slides/mobile/MobileSeparationSlide';
import { MobileConditionSlide } from './slides/mobile/MobileConditionSlide';
import { MobilePositionSlide } from './slides/mobile/MobilePositionSlide';
import { MobilePossessorSlide } from './slides/mobile/MobilePossessorSlide';
import { MobileSecuritySlide } from './slides/mobile/MobileSecuritySlide';

const slides = [
  MobileTitleSlide,
  MobilePatternSlide,
  MobileDescentSlide,
  MobileSeparationSlide,
  MobileConditionSlide,
  MobilePositionSlide,
  MobilePossessorSlide,
  MobileSecuritySlide
];

const ParallaxSlide: React.FC<{ children: ReactNode, containerRef: RefObject<HTMLElement> }> = ({ children, containerRef }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000]">
      <motion.div style={{ y, opacity }} className="w-full">
        {children}
      </motion.div>
    </section>
  );
};

export const MobileView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="fixed inset-0 w-full overflow-y-auto bg-[#000000] snap-y snap-mandatory">
      {slides.map((Slide, index) => (
        <div key={index} className="snap-start">
          <ParallaxSlide containerRef={containerRef}>
            <Slide />
          </ParallaxSlide>
        </div>
      ))}
    </div>
  );
};
