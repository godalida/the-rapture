import { motion } from 'motion/react';
import { Target, UserCheck, Star, Shield } from 'lucide-react';
import { BibleVerse } from '../../BibleVerse';

export const MobilePossessorSlide = () => {
  const points = [
    { title: "The Choice", desc: "Eph 1:4–5, Rom 9:11–13, Jacob vs Esau", icon: <Target className="w-5 h-5 text-amber-400" /> },
    { title: "The Seed", desc: "John 17:12, Peter vs Judas", icon: <UserCheck className="w-5 h-5 text-yellow-500" /> },
    { title: "Laugh of Faith", desc: "Gen 17:17", icon: <Star className="w-5 h-5 text-amber-300" /> },
    { title: "The Refusal", desc: "Gen 14:22–23", icon: <Shield className="w-5 h-5 text-yellow-600" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen w-full px-6 py-12 relative bg-[#000000]">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[40%] bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
          The Elected
        </div>
        <h2 className="text-4xl font-black tracking-tight text-white mb-4">
          Who is the <br/><span className="text-metallic-gold">Possessor?</span>
        </h2>
      </motion.div>

      <div className="space-y-4">
        {points.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
            </div>
            <BibleVerse text={item.desc} className="text-white/40 text-sm leading-relaxed" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
