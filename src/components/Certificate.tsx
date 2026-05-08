import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Download, Share2, Star, ShieldCheck, GraduationCap } from 'lucide-react';

interface CertificateProps {
  userName: string;
  onBack: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ userName, onBack }) => {
  const today = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-white border-[16px] border-double border-indigo-600 p-8 md:p-16 rounded-sm shadow-2xl relative overflow-hidden"
      >
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full -ml-32 -mb-32 opacity-50" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-200">
               <GraduationCap size={48} />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-400 uppercase tracking-[0.3em]">Muvaffaqiyat Sertifikati</h1>
          
          <div className="space-y-4">
            <p className="text-xl text-gray-500 font-medium">Ushbu sertifikat tantanali ravishda topshiriladi:</p>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 font-serif border-b-4 border-indigo-600 inline-block px-12 py-2">
              {userName}
            </h2>
          </div>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <span className="font-bold text-indigo-600">English Master Pro</span> platformasidagi barcha Junior, Middle, Senior va Master bosqichlarini muvaffaqiyatli yakunlagani va ingliz tili bo'yicha yuqori bilimga ega bo'lgani uchun tasdiqlanadi.
          </p>

          <div className="grid grid-cols-2 mt-12 gap-12 pt-12 border-t border-gray-100">
            <div className="text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Sana</p>
              <p className="text-lg font-bold text-gray-900">{today}</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="w-24 h-24 bg-amber-50 rounded-full border-2 border-amber-200 flex items-center justify-center text-amber-600 mb-2">
                <ShieldCheck size={48} />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rasmiy Muhre</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 flex gap-4">
        <button 
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          onClick={() => window.print()}
        >
          <Download size={20} /> Yuklab olish (PDF)
        </button>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 border border-gray-100 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    </div>
  );
};
