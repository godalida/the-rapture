import { motion } from 'motion/react';
import { Eye, Cloud, Zap, AlertTriangle } from 'lucide-react';
import { BibleVerse } from '../BibleVerse';

export const ConditionSlide = () => {
  const points = [
    { 
      title: "The 5 Elijahs", 
      desc: "Tishbite, Elisha, John Baptist, WMB, Two Witnesses", 
      icon: <Zap className="w-7 h-7 text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/20"
    },
    { 
      title: "Noah/Lot Conditions", 
      desc: "Luke 17:26–30", 
      icon: <AlertTriangle className="w-7 h-7 text-orange-400" />,
      iconBg: "bg-orange-500/10 border-orange-500/20"
    },
    { 
      title: "If Thou See Me", 
      desc: "2 Kings 2:10, Amos 3:7, Matt 17:12", 
      icon: <Eye className="w-7 h-7 text-yellow-400" />,
      iconBg: "bg-yellow-500/10 border-yellow-500/20"
    },
    { 
      title: "The 1963 Cloud", 
      desc: "The Sign of the Son of Man", 
      icon: <Cloud className="w-7 h-7 text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/20"
    }
  ];

  return (
    <div className="flex flex-col justify-center h-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', x: -30 }}
          animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 text-amber-300 text-xs md:text-sm font-medium mb-6 md:mb-8 border border-amber-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            The Recognition
          </div>
          <h2 className="text-3xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 md:mb-8 text-white leading-[1.1]">
            How to <br/><span className="text-metallic-gold">Recognize?</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
            Recognition is the key.
          </p>
        </motion.div>

        <div className="space-y-3 md:space-y-4">
          {points.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + (i * 0.15), ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 md:gap-6 glass-panel p-4 md:p-6 rounded-2xl md:rounded-3xl hover:bg-white/[0.04] transition-colors border border-white/5 group"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                {item.icon}
              </div>
              <div className="pt-1">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2 tracking-tight">{item.title}</h3>
                <BibleVerse text={item.desc} className="text-gray-400 text-sm md:text-base font-light leading-relaxed" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
