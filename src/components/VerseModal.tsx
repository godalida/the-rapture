import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Loader2, ZoomIn, ZoomOut } from 'lucide-react';
import { useVerse } from '../context/VerseContext';

interface Verse {
  verse: number;
  text: string;
}

interface VerseData {
  reference: string;
  verses: Verse[];
  translation_name: string;
}

export const VerseModal: React.FC = () => {
  const { currentVerse, isOpen, closeVerse } = useVerse();
  const [data, setData] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightRange, setHighlightRange] = useState<{ start: number; end: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 is default, can go from 0.8 to 1.5

  useEffect(() => {
    if (currentVerse && isOpen) {
      setLoading(true);
      setError(null);
      setData(null);
      setZoomLevel(1); // Reset zoom when opening new verse

      // Parse reference: "Book Chapter:Start-End"
      // Example: "2 Pet 3:3-4" or "John 3:16"
      const cleanedRef = currentVerse.split(',')[0].trim().replace('–', '-');
      const match = cleanedRef.match(/^([1-3]? ?[A-Za-z ]+) ([0-9]+):([0-9]+)(?:-([0-9]+))?$/);

      if (match) {
        const [_, book, chapter, startStr, endStr] = match;
        const start = parseInt(startStr);
        const end = endStr ? parseInt(endStr) : start;
        setHighlightRange({ start, end });

        // Fetch the whole chapter
        fetch(`https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`)
          .then(res => {
            if (!res.ok) throw new Error('Scripture not found.');
            return res.json();
          })
          .then(json => {
            setData(json);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      } else {
        // Fallback for non-standard references
        fetch(`https://bible-api.com/${encodeURIComponent(cleanedRef)}?translation=kjv`)
          .then(res => {
            if (!res.ok) throw new Error('Scripture not found.');
            return res.json();
          })
          .then(json => {
            setData(json);
            setLoading(false);
            setHighlightRange(null);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }
  }, [currentVerse, isOpen]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.8));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.7));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVerse}
            className="absolute inset-0 bg-black/60 backdrop-blur-3xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[95vw] h-[90vh] bg-black/40 border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col select-text"
          >
            {/* Ambient background inside modal */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 blur-[180px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-yellow-500/5 blur-[180px] rounded-full" />
            </div>

            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-6 md:p-10 border-b border-white/5 bg-black/20 backdrop-blur-md relative z-20">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-6"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl md:text-4xl font-bold text-white tracking-tighter">
                    {data?.reference || currentVerse}
                  </h3>
                  <p className="text-amber-500/50 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black mt-1">
                    Holy Bible • King James Version
                  </p>
                </div>
              </motion.div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
                  <button 
                    onClick={handleZoomOut}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-1" />
                  <button 
                    onClick={handleZoomIn}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                <button 
                  onClick={closeVerse}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white/40 group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-8 md:p-24 relative z-10">
              <div className="max-w-6xl mx-auto w-full">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-8 py-20 text-amber-500/30">
                    <Loader2 className="w-16 h-16 animate-spin" />
                    <span className="text-xs uppercase tracking-[0.5em] font-black animate-pulse">Illuminating Scriptures</span>
                  </div>
                ) : error ? (
                  <div className="text-center space-y-6 py-20">
                    <p className="text-red-400/80 text-2xl font-light">{error}</p>
                    <button 
                      onClick={closeVerse}
                      className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all text-sm uppercase tracking-widest font-bold"
                    >
                      Return to Presentation
                    </button>
                  </div>
                ) : data ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-12"
                  >
                    <div className="flex flex-wrap gap-x-4 gap-y-8 leading-[1.6] font-serif">
                      {data.verses.map((v, idx) => {
                        const isHighlighted = highlightRange 
                          ? v.verse >= highlightRange.start && v.verse <= highlightRange.end
                          : false;
                        
                        return (
                          <span 
                            key={idx} 
                            style={{ 
                              fontSize: isHighlighted 
                                ? `${zoomLevel * (window.innerWidth < 768 ? 1.5 : 3)}rem` 
                                : `${zoomLevel * (window.innerWidth < 768 ? 1.1 : 1.8)}rem` 
                            }}
                            className={`inline transition-all duration-500 ${
                              isHighlighted 
                                ? 'font-medium py-8 my-6 block w-full border-l-4 border-amber-500/40 pl-10 md:pl-20' 
                                : 'text-white/30 font-light'
                            }`}
                          >
                            <sup className={`mr-4 font-sans font-bold tracking-tighter ${isHighlighted ? 'text-amber-500' : 'text-white/20'}`} style={{ fontSize: '0.45em' }}>
                              {v.verse}
                            </sup>
                            <span className={isHighlighted ? 'text-metallic-gold' : 'text-metallic-silver'}>
                              {v.text.trim()}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                    
                    <div className="pt-24 pb-12 flex flex-col items-center gap-4">
                      <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                      <span className="text-[10px] uppercase tracking-[0.6em] text-white/10 font-black">End of Chapter</span>
                    </div>
                  </motion.div>
                ) : null}
              </div>
            </div>
            
            {/* Bottom accent */}
            <div className="h-2 w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-30 shrink-0" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
