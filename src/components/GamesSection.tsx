import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, ArrowLeft, Trophy, Zap, Ghost } from 'lucide-react';
import { GameEntry, Level } from '../types';

interface GamesSectionProps {
  onBack: () => void;
  level: Level | null;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onBack, level }) => {
  const GAME_DATA: GameEntry[] = Array.from({ length: 30 }, (_, i) => ({
    id: `g-${i}`,
    title: `Inglizcha O'yin #${i + 1}`,
    description: i % 2 === 0 ? "So'zlarni moslashtiring" : "Gaplarni tuzing",
    previewImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
    type: i % 2 === 0 ? 'word-match' : 'sentence-build'
  }));
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 mb-12 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Orqaga
      </button>

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
             <div className="bg-pink-600 p-3 rounded-2xl text-white shadow-lg">
                <Gamepad2 size={32} />
             </div>
             <h1 className="text-5xl font-black text-gray-900 tracking-tight">{level || 'Barcha'} O'yinlar</h1>
          </div>
          <p className="text-xl text-gray-500">O'yin o'ynab ingliz tilini osonroq o'rganing (30+ o'yinlar)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAME_DATA.map((game, idx) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (idx % 12) * 0.05 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="relative aspect-[16/9]">
              <img src={game.previewImage} alt={game.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest mb-1">
                  {game.type === 'word-match' ? <Zap size={14} className="text-amber-400" /> : <Ghost size={14} className="text-indigo-400" />}
                  {game.type}
                </div>
                <h3 className="text-white text-xl font-bold">{game.title}</h3>
              </div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <p className="text-gray-500 text-sm">{game.description}</p>
              <div className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                READY
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
