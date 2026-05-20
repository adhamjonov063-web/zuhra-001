import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Play, CheckCircle, Gamepad2, History } from 'lucide-react';
import { Level, AppView } from '../types';

interface NavbarProps {
  currentLevel: Level | null;
  currentView: AppView;
  userName: string | null;
  onBackToLevels: () => void;
  onSetView: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLevel, currentView, userName, onBackToLevels, onSetView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={onBackToLevels}
      >
        <div className="bg-indigo-600 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
          <GraduationCap size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:inline">English Master</span>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
           <NavButton 
             active={currentView === 'Home' || currentView === 'Course'} 
             onClick={onBackToLevels}
             icon={<BookOpen size={18} />}
             label="Kurslar"
           />
           <NavButton 
             active={currentView === 'Videos'} 
             onClick={() => onSetView('Videos')}
             icon={<Play size={18} />}
             label="Videolar"
           />
           <NavButton 
             active={currentView === 'Games'} 
             onClick={() => onSetView('Games')}
             icon={<Gamepad2 size={18} />}
             label="O'yinlar"
           />
           <NavButton 
             active={currentView === 'History'} 
             onClick={() => onSetView('History')}
             icon={<History size={18} />}
             label="Tarix"
           />
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">O'quvchi</p>
            <p className="font-bold text-gray-900 leading-tight">{userName}</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm">
            {userName?.[0]?.toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
      active 
      ? 'bg-white text-indigo-600 shadow-sm' 
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface LevelCardProps {
  id: Level;
  name: string;
  description: string;
  color: string;
  onClick: () => void;
}

export const LevelCard: React.FC<LevelCardProps> = ({ id, name, description, color, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 cursor-pointer flex flex-col items-start gap-6 group hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
    >
      <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
         <BookOpen size={32} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-4 flex items-center gap-2 text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        O'rganishni boshlash <Play size={16} fill="currentColor" />
      </div>
    </motion.div>
  );
};
