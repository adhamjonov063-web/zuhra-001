import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, Star } from 'lucide-react';

interface WelcomeProps {
  onStart: (name: string) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl shadow-indigo-500/10 border border-gray-100 text-center"
      >
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl rotate-3">
          <GraduationCap size={40} />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-4">Xush kelibsiz!</h1>
        <p className="text-gray-500 mb-10 leading-relaxed text-lg">
          Ingliz tili dunyosiga ilk qadamingiz. Iltimos, ismingizni kiriting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Sizning ismingiz</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masalan: Adhamjon"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-500 outline-none transition-all text-lg font-semibold"
              autoFocus
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3"
          >
            O'rganishni boshlash <ArrowRight size={20} />
          </motion.button>
        </form>

        <div className="mt-12 flex items-center justify-center gap-2 text-amber-500 font-bold bg-amber-50 py-2 px-4 rounded-full w-fit mx-auto">
          <Star size={16} fill="currentColor" /> 2,300+ Lug'at & 60+ Video
        </div>
      </motion.div>
    </div>
  );
};
