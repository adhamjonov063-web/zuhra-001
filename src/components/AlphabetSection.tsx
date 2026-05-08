import React from 'react';
import { motion } from 'motion/react';
import { ALPHABET_DATA } from '../data/alphabet';
import { Volume2, ArrowLeft } from 'lucide-react';

interface AlphabetSectionProps {
  onBack: () => void;
}

export const AlphabetSection: React.FC<AlphabetSectionProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 mb-12 font-medium hover:underline group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Bosh sahifaga qaytish
      </button>

      <div className="mb-16 text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Ingliz tili Alifbosi</h1>
        <p className="text-xl text-gray-500">26 ta harf va ularning to'g'ri talaffuzi</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {ALPHABET_DATA.map((item, idx) => (
          <motion.div
            key={item.letter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.02 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-pointer"
          >
            <div className="text-6xl font-black text-indigo-600 group-hover:scale-110 transition-transform font-serif select-none">
              {item.letter}
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 mb-1">{item.pronunciation}</div>
              <div className="text-sm text-gray-400 italic">{item.example}</div>
            </div>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Volume2 size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
