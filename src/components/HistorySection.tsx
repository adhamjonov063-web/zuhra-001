import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { History, UserCheck, Calendar, CheckCircle2, AlertTriangle, ArrowLeft, Users, Trash2, Award } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';

interface HistorySectionProps {
  onBack: () => void;
  activeUser: string;
  progress: Record<string, boolean>;
}

interface LoginLog {
  id: string;
  username: string;
  loginTime: string;
  solvedLessonsCount: number;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ onBack, activeUser, progress }) => {
  const [historyLogs, setHistoryLogs] = useState<LoginLog[]>([]);

  const totalLessons = 100; // Exactly 100 topics
  const questionsPerLesson = 15; // Exactly 15 questions per lesson
  const totalQuestions = totalLessons * questionsPerLesson; // 1500 total questions

  const activeSolvedLessons = Object.keys(progress).filter(key => progress[key]).length;
  const activeSolvedQuestions = activeSolvedLessons * questionsPerLesson;
  const activeUnsolvedQuestions = Math.max(0, totalQuestions - activeSolvedQuestions);

  useEffect(() => {
    // Generate or fetch history from localStorage
    const saved = localStorage.getItem('english_master_login_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LoginLog[];
        // Sync active user's current progress in history list if they exist in latest log
        const updated = parsed.map(log => {
          if (log.username.toLowerCase() === activeUser.toLowerCase()) {
            return { ...log, solvedLessonsCount: activeSolvedLessons };
          }
          return log;
        });
        setHistoryLogs(updated);
        localStorage.setItem('english_master_login_history', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    } else {
      // Seed initial dummy logs representing other students for high-fidelity interactive look
      const dateNow = new Date();
      const initialLogs: LoginLog[] = [
        {
          id: 'log-1',
          username: activeUser,
          loginTime: dateNow.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }) + ' ' + dateNow.toLocaleDateString('uz-UZ'),
          solvedLessonsCount: activeSolvedLessons
        },
        {
          id: 'log-2',
          username: 'Shaxzod Alimov',
          loginTime: '09:42, 20.05.2026',
          solvedLessonsCount: 42
        },
        {
          id: 'log-3',
          username: 'Zuhra Toshpulatova',
          loginTime: '18:15, 19.05.2026',
          solvedLessonsCount: 78
        },
        {
          id: 'log-4',
          username: 'Anvar Karimov',
          loginTime: '11:04, 18.05.2026',
          solvedLessonsCount: 15
        }
      ];
      setHistoryLogs(initialLogs);
      localStorage.setItem('english_master_login_history', JSON.stringify(initialLogs));
    }
  }, [activeUser, activeSolvedLessons, progress]);

  // Handle clearing of logs
  const handleClearLogs = () => {
    const freshLogs = [{
      id: `log-${Date.now()}`,
      username: activeUser,
      loginTime: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('uz-UZ'),
      solvedLessonsCount: activeSolvedLessons
    }];
    setHistoryLogs(freshLogs);
    localStorage.setItem('english_master_login_history', JSON.stringify(freshLogs));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 mb-12 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Orqaga
      </button>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
             <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <History size={32} />
             </div>
             <h1 className="text-5xl font-black text-gray-900 tracking-tight">Tizim Tarixi</h1>
          </div>
          <p className="text-xl text-gray-500">Tizimga kirgan foydalanuvchilar va testlar yechilishi statistikasi tarixi</p>
        </div>
        
        <button
          onClick={handleClearLogs}
          className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-5 py-3 rounded-2xl font-bold transition-all text-sm"
        >
          <Trash2 size={16} /> Tarixni tozalash
        </button>
      </div>

      {/* Main Stats Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
         {/* Active User Main Card */}
         <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
            <div className="z-10">
               <span className="bg-white/10 text-indigo-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  Aktiv Foydalanuvchi
               </span>
               <h3 className="text-3xl font-black mb-1 flex items-center gap-2">
                 <UserCheck className="text-emerald-400" /> {activeUser}
               </h3>
               <p className="text-indigo-200 text-sm mb-6">Siz tizimda muvaffaqiyatli dars va o'yinlar olib bormoqdasiz.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
               <div>
                  <span className="text-[10px] text-indigo-200 uppercase font-bold block mb-1">Mavzular</span>
                  <span className="text-2xl font-black">{activeSolvedLessons} / {totalLessons}</span>
               </div>
               <div>
                  <span className="text-[10px] text-indigo-200 uppercase font-bold block mb-1">Foiz</span>
                  <span className="text-2xl font-black">{Math.round((activeSolvedLessons / totalLessons) * 100)}%</span>
               </div>
            </div>
         </div>

         {/* Solved Questions (Yechilganlar) Card */}
         <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-gray-400 text-xs font-black uppercase tracking-[0.1em] block mb-1">Jami Yechilgan Savollar</span>
                <span className="text-5xl font-black text-emerald-600">{activeSolvedQuestions} ta</span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
            </div>

            <div className="space-y-3">
               <div className="flex justify-between text-xs text-gray-500 font-bold">
                  <span>Mavzulardagi testlar</span>
                  <span>{activeSolvedLessons * questionsPerLesson} / {totalQuestions}</span>
               </div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(activeSolvedQuestions / totalQuestions) * 100}%` }} />
               </div>
               <p className="text-xs text-gray-400 italic">Har bir mavzu 15 ta maxsus test savollarini o'z ichiga oladi.</p>
            </div>
         </div>

         {/* Unsolved Questions (Yechilmaganlar) Card */}
         <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-gray-400 text-xs font-black uppercase tracking-[0.1em] block mb-1">Yechilmagan Savollar</span>
                <span className="text-5xl font-black text-rose-500">{activeUnsolvedQuestions} ta</span>
              </div>
              <div className="bg-rose-50 p-3 rounded-2xl text-rose-600">
                <AlertTriangle size={24} />
              </div>
            </div>

            <div className="space-y-3">
               <div className="flex justify-between text-xs text-gray-500 font-bold">
                  <span>Qolgan testlar foizi</span>
                  <span>{Math.round((activeUnsolvedQuestions / totalQuestions) * 100)}% uncompleted</span>
               </div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(activeUnsolvedQuestions / totalQuestions) * 100}%` }} />
               </div>
               <p className="text-xs text-gray-400 italic">Mavzularni tugatib, yechilmagan savollarni nolga yetkazing!</p>
            </div>
         </div>
      </div>

      {/* History Log Table Section */}
      <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm">
         <div className="flex items-center gap-3 mb-8">
            <Users className="text-indigo-600" size={24} />
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Kirishlar va Kurs Faolligi Loglari</h3>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider font-extrabold">
                     <th className="py-4 px-6">Tizimga Kirgan Shaxs</th>
                     <th className="py-4 px-6">Kirish Vaqti</th>
                     <th className="py-4 px-6">Tugallangan Mavzular</th>
                     <th className="py-4 px-6">Yechilgan Savollar</th>
                     <th className="py-4 px-6">Yechilmagan Savollar</th>
                     <th className="py-4 px-6 text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                  {historyLogs.map((log) => {
                     const solvedQ = log.solvedLessonsCount * questionsPerLesson;
                     const unsolvedQ = totalQuestions - solvedQ;
                     const isCurrentActive = log.username.toLowerCase() === activeUser.toLowerCase();

                     return (
                        <tr key={log.id} className={`hover:bg-slate-50/50 transition-colors ${isCurrentActive ? 'bg-indigo-50/20' : ''}`}>
                           <td className="py-5 px-6 font-bold text-gray-900 flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black ${isCurrentActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                 {log.username[0].toUpperCase()}
                              </div>
                              <div>
                                 <span>{log.username}</span>
                                 {isCurrentActive && <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-extrabold rounded">SIZ (AKTIV)</span>}
                              </div>
                           </td>
                           <td className="py-5 px-6 font-mono text-xs text-gray-500">
                              <span className="flex items-center gap-1.5"><Calendar size={14} /> {log.loginTime}</span>
                           </td>
                           <td className="py-5 px-6 font-bold text-slate-800">{log.solvedLessonsCount} / 100 та</td>
                           <td className="py-5 px-6 font-bold text-emerald-600">✓ {solvedQ} ta yechilgan</td>
                           <td className="py-5 px-6 font-bold text-rose-500">✗ {unsolvedQ} ta qoldi</td>
                           <td className="py-5 px-6 text-center">
                              {log.solvedLessonsCount >= 100 ? (
                                 <span className="inline-flex gap-1 items-center px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-extrabold">
                                   <Award size={12} /> Master
                                 </span>
                              ) : (
                                 <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold">
                                   O'rganmoqda
                                 </span>
                              )}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
