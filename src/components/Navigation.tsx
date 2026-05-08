import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Play, CheckCircle } from 'lucide-react';
import { Level, AppView } from '../types';

interface NavbarProps {
  currentLevel: Level | null;
  currentView: AppView;
  userName: string | null;
  onBackToLevels: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLevel, currentView, userName, onBackToLevels }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={onBackToLevels}
      >
        <div className="bg-indigo-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
          <GraduationCap size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">English Master</span>
      </div>
      
      <div className="flex items-center gap-6">
        {userName && (
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Salom,</span>
            <span className="text-sm font-bold text-gray-900">{userName}</span>
          </div>
        )}

        {(currentLevel || currentView !== 'Home') && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            {currentLevel && (
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold border border-indigo-100">
                {currentLevel}
              </span>
            )}
            <button 
              onClick={onBackToLevels}
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium"
            >
              Bosh sahifa
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

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
