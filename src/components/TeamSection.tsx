import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Trophy, MessageSquare, ArrowLeft } from 'lucide-react';

interface TeamSectionProps {
  onBack: () => void;
  userName: string;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onBack, userName }) => {
  const [teamName, setTeamName] = useState('');
  const [joined, setJoined] = useState(false);

  const mockTeams = [
    { name: "Oxford Scholars", members: 12, points: 2450 },
    { name: "Language Ninjas", members: 8, points: 1890 },
    { name: "Global Speakers", members: 15, points: 3100 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 mb-12 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Orqaga
      </button>

      {!joined ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-3xl text-white shadow-xl mb-6">
               <Users size={40} />
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-4">Jamoaga qo'shiling</h1>
            <p className="text-xl text-gray-500">O'rganish do'stlar bilan yanada qiziqarli!</p>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Yangi jamoa yaratish</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Jamoa nomi..."
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-emerald-500 outline-none font-bold"
                />
                <button 
                  onClick={() => teamName && setJoined(true)}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all font-serif"
                >
                  Yaratish
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-100">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Mavjud jamoalar</h3>
               <div className="space-y-3">
                  {mockTeams.map(team => (
                    <div key={team.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                          <Users size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{team.name}</h4>
                          <p className="text-xs text-gray-400 font-bold">{team.members} a'zo • {team.points} ball</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setTeamName(team.name); setJoined(true); }}
                        className="text-emerald-600 font-bold text-sm bg-white px-4 py-2 rounded-xl border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        Qo'shilish
                      </button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className="flex items-center justify-between bg-emerald-600 p-12 rounded-[3.5rem] text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
               <span className="text-xs font-black uppercase tracking-[0.3em] opacity-70">Sizning jamoangiz</span>
               <h2 className="text-5xl font-black mt-2">{teamName}</h2>
               <div className="mt-6 flex items-center gap-6">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => <div key={i} className={`w-10 h-10 rounded-full border-2 border-emerald-600 ${['bg-indigo-300', 'bg-amber-300', 'bg-pink-300', 'bg-emerald-300'][i-1]} flex items-center justify-center text-xs font-black`}>{i}</div>)}
                  </div>
                  <span className="text-sm font-bold opacity-80">+ 8 boshqa a'zolar</span>
               </div>
            </div>
            <div className="hidden md:block relative z-10 text-right">
                <div className="text-6xl font-black">#4</div>
                <div className="text-xs font-black uppercase tracking-widest opacity-70">Reytingda</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="col-span-2 space-y-6">
                <h3 className="text-xl font-black text-gray-900 pl-2 flex items-center gap-2"><MessageSquare /> Guruh suhbati</h3>
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 min-h-[400px] flex flex-col">
                   <div className="flex-1 space-y-4">
                      <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none w-fit">
                         <p className="text-xs font-bold text-indigo-600 mb-1">Murod</p>
                         <p className="text-sm">Bugungi darslarni kim tugatdi?</p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-2xl rounded-tr-none w-fit ml-auto text-right">
                         <p className="text-xs font-bold text-emerald-600 mb-1">Siz ({userName})</p>
                         <p className="text-sm">Men "Present Perfect" darsini tugatdim.</p>
                      </div>
                   </div>
                   <div className="mt-8 flex gap-3">
                      <input type="text" placeholder="Xabarni yozing..." className="flex-1 bg-gray-50 border-none outline-none px-6 py-4 rounded-2xl font-medium" />
                      <button className="bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold">Yuborish</button>
                   </div>
                </div>
             </div>
             <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-900 pl-2 flex items-center gap-2"><Trophy /> Top o'quvchilar</h3>
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 space-y-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                        <div className="w-8 h-8 font-black text-gray-300 italic text-xl">#{i}</div>
                        <div className="flex-1 font-bold text-gray-700">User_{i}00</div>
                        <div className="text-indigo-600 font-black">{1000 - i*100} BP</div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
