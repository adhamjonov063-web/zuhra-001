import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { DICTIONARY_DATA } from '../data/dictionary';
import { Search, ArrowLeft, Volume2, BookMarked, Layers } from 'lucide-react';
import { Level } from '../types';

interface DictionarySectionProps {
  onBack: () => void;
}

export const DictionarySection: React.FC<DictionarySectionProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'All'>('All');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 50;

  const filteredData = useMemo(() => {
    return DICTIONARY_DATA.filter(item => {
      const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.translation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [searchTerm, selectedLevel]);

  const paginatedData = filteredData.slice(0, page * ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 mb-12 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Bosh sahifaga
      </button>

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
             <div className="bg-amber-600 p-3 rounded-2xl text-white shadow-lg">
                <BookMarked size={32} />
             </div>
             <h1 className="text-5xl font-black text-gray-900 tracking-tight">Lug'at</h1>
          </div>
          <p className="text-xl text-gray-500">2,300+ dan ortiq eng ko'p ishlatiladigan inglizcha so'zlar</p>
        </div>
        
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="So'zlarni qidirish..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Junior', 'Middle', 'Senior', 'Master'].map(lvl => (
          <button
            key={lvl}
            onClick={() => {
              setSelectedLevel(lvl as any);
              setPage(1);
            }}
            className={`px-6 py-2 rounded-full text-sm font-bold border transition-all shrink-0 ${
              selectedLevel === lvl 
              ? 'bg-amber-600 text-white border-amber-600' 
              : 'bg-white text-gray-500 border-gray-100 hover:border-amber-500'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {paginatedData.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (idx % 10) * 0.05 }}
            key={`${item.word}-${idx}`}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-amber-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                <Volume2 size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">{item.word}</h3>
                <p className="text-indigo-600 font-bold">{item.translation}</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-lg">
              <p className="text-gray-500 italic text-sm">Example: {item.example}</p>
            </div>

            <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100 text-gray-400 group-hover:bg-amber-100 group-hover:text-amber-700 group-hover:border-amber-200 transition-colors`}>
              {item.level}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredData.length > paginatedData.length && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setPage(p => p + 1)}
            className="bg-white px-12 py-4 rounded-2xl font-bold border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-gray-900 flex items-center gap-2 mx-auto"
          >
            Yana yuklash (Load More) <Layers size={18} />
          </button>
        </div>
      )}

      {filteredData.length === 0 && (
        <div className="text-center py-24 text-gray-400">
           Hech qanday so'z topilmadi...
        </div>
      )}
    </div>
  );
};
