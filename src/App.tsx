/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

import { SideNav } from './components/SideNav';
import { TitleSlide } from './components/slides/TitleSlide';
import { PatternSlide } from './components/slides/PatternSlide';
import { DescentSlide } from './components/slides/DescentSlide';
import { SeparationSlide } from './components/slides/SeparationSlide';
import { ConditionSlide } from './components/slides/ConditionSlide';
import { PositionSlide } from './components/slides/PositionSlide';
import { PossessorSlide } from './components/slides/PossessorSlide';
import { SecuritySlide } from './components/slides/SecuritySlide';
import { CursorOrbit } from './components/CursorOrbit';
import { MobileView } from './components/MobileView';
import { VerseProvider } from './context/VerseContext';
import { VerseModal } from './components/VerseModal';

const slides = [
  TitleSlide,
  PatternSlide,
  DescentSlide,
  SeparationSlide,
  ConditionSlide,
  PositionSlide,
  PossessorSlide,
  SecuritySlide
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Treat anything smaller than 1024px as mobile/tablet
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: false
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = document.body.clientWidth / 1920;
      const scaleY = document.body.clientHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };
    
    handleResize();
    
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(handleResize);
    });
    
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  }, []);

  if (isMobile) {
    return (
      <VerseProvider>
        <MobileView />
        <VerseModal />
      </VerseProvider>
    );
  }

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <VerseProvider>
      <div {...swipeHandlers} className="fixed inset-0 bg-[#050505] text-white overflow-hidden font-sans selection:bg-blue-500/30 flex items-center justify-center select-text">
        
        {/* Global Ambient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-amber-900/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-yellow-900/10 blur-[120px]"
        />
      </div>

      <CursorOrbit />
      
      <SideNav 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
        slides={slides} 
      />
      
      {/* Scaled Presentation Stage */}
      <div 
        style={{ 
          width: 1920, 
          height: 1080, 
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }} 
        className="relative flex-shrink-0 z-10"
      >
        {/* Page Number Indicator */}
        <div className="absolute bottom-4 left-6 md:bottom-8 md:left-40 z-50 text-white/50 font-mono text-sm md:text-lg">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>

        {/* Persistent Header Logo */}
        <AnimatePresence>
          {currentSlide > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 left-6 md:top-12 md:left-40 z-50 flex items-center gap-2 md:gap-4"
            >
              <span className="font-semibold tracking-wide text-lg md:text-2xl text-white/90">The Rapture</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent Logo (Top Right) - Removed IBM */}
        <div className="absolute top-6 right-6 md:top-12 md:right-12 z-50 flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300">
          {/* IBM Logo removed */}
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1.5 bg-white/5 w-full z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-600 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full absolute inset-0"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-12 z-50 pointer-events-none">
          <div className="flex gap-2 md:gap-6 pointer-events-auto">
            <button 
              onClick={toggleFullscreen}
              className="p-3 md:p-5 rounded-full glass-panel hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4 md:w-6 md:h-6" /> : <Maximize className="w-4 h-4 md:w-6 md:h-6" />}
            </button>
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-3 md:p-5 rounded-full glass-panel hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="p-3 md:p-5 rounded-full glass-panel hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
        <VerseModal />
      </div>
    </div>
  </VerseProvider>
);
}
