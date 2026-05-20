/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, LevelCard } from './components/Navigation';
import { LessonCard, LessonContent } from './components/Learning';
import { Welcome } from './components/Welcome';
import { AlphabetSection } from './components/AlphabetSection';
import { VideoSection } from './components/VideoSection';
import { DictionarySection } from './components/DictionarySection';
import { GamesSection } from './components/GamesSection';
import { TeamSection } from './components/TeamSection';
import { Certificate } from './components/Certificate';
import { HistorySection } from './components/HistorySection';
import { CURRICULUM } from './data/curriculum';
import { VIDEOS } from './data/videos';
import { Level, Lesson, AppView } from './types';
import { Sparkles, Trophy, BookOpen, Star, PlayCircle, BookMarked, Type, Gamepad2, Users, ArrowRight, History } from 'lucide-react';

const BACKGROUNDS = [
  'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]',
  'bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [background-size:6rem_4rem]',
  'bg-[radial-gradient(circle_at_2px_2px,#e2e8f0_1px,transparent_0)] [background-size:24px_24px]',
  'bg-[#fdfbfb] [background-image:linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)]',
  'bg-slate-50 [background-image:radial-gradient(#cbd5e1_0.5px,transparent_0.5px)] [background-size:10px_10px]'
];

export default function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('Home');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [bgIndex] = useState(() => Math.floor(Math.random() * BACKGROUNDS.length));

  // Initialize from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('english_master_username');
    const savedProgress = localStorage.getItem('english_master_progress');
    
    if (savedName) setUserName(savedName);
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const totalLessonsCount = useMemo(() => CURRICULUM.reduce((acc, lvl) => acc + lvl.lessons.length, 0), []);
  const completedLessonsCount = Object.keys(progress).length;
  const isAllCompleted = completedLessonsCount > 0 && completedLessonsCount >= totalLessonsCount;

  const handleStart = (name: string) => {
    setUserName(name);
    localStorage.setItem('english_master_username', name);
  };

  const handleCompleteLesson = (lessonId: string) => {
    const newProgress = { ...progress, [lessonId]: true };
    setProgress(newProgress);
    localStorage.setItem('english_master_progress', JSON.stringify(newProgress));
  };

  const handleBackToHome = () => {
    setCurrentView('Home');
    setCurrentLevel(null);
    setCurrentLesson(null);
  };

  if (!isLoaded) return null;

  if (!userName) {
    return <Welcome onStart={handleStart} />;
  }

  const selectedLevelData = CURRICULUM.find(l => l.id === currentLevel);

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-1000 ${BACKGROUNDS[bgIndex]}`}>
      <Navbar 
        userName={userName}
        currentView={currentView}
        currentLevel={currentLevel} 
        onBackToLevels={handleBackToHome}
        onSetView={setCurrentView}
      />

      <main className="pb-20">
        <AnimatePresence mode="wait">
          {currentView === 'Home' && !currentLevel ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-7xl mx-auto px-6 pt-12 md:pt-16"
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md text-indigo-700 rounded-full text-sm font-bold border border-indigo-100 mb-6 shadow-sm"
                >
                  <Sparkles size={16} /> Bugun o'rganish uchun ajoyib kun, {userName}!
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
                  Nima o'rganmoqchisiz?
                </h1>
                
                {isAllCompleted && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentView('Certificate')}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-full mx-auto font-black shadow-lg shadow-amber-200 border-2 border-white mb-8"
                  >
                    <Trophy size={20} /> Sertifikatni olish
                  </motion.button>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                 <QuickNavCard 
                    title="Alifbo" 
                    desc="Harflar va tovushlar" 
                    icon={<Type size={32} />} 
                    color="bg-pink-500" 
                    onClick={() => setCurrentView('Alphabet')}
                 />
                 <QuickNavCard 
                    title="Video Darslar" 
                    desc="60+ o'rganish videolari" 
                    icon={<PlayCircle size={32} />} 
                    color="bg-indigo-600" 
                    onClick={() => setCurrentView('Videos')}
                 />
                 <QuickNavCard 
                    title="Lug'at" 
                    desc="2,300+ sara so'zlar" 
                    icon={<BookMarked size={32} />} 
                    color="bg-amber-600" 
                    onClick={() => setCurrentView('Dictionary')}
                 />
                 <QuickNavCard 
                    title="O'yinlar" 
                    desc="30+ interaktiv darslar" 
                    icon={<Gamepad2 size={32} />} 
                    color="bg-emerald-600" 
                    onClick={() => setCurrentView('Games')}
                 />
              </div>

              <div className="mb-20">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-12 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-gray-100" />
                  Kurs Bosqichlari
                  <span className="flex-1 h-[2px] bg-gray-100" />
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CURRICULUM.map((level) => (
                    <LevelCard
                      key={level.id}
                      id={level.id}
                      name={level.name}
                      description={level.description}
                      color={level.color}
                      onClick={() => {
                        setCurrentLevel(level.id);
                        setCurrentView('Course');
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-[3rem] p-12 text-center text-white overflow-hidden relative mb-12">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
                 <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-4">Jamoaviy o'rganish</h2>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">Do'stlar bilan jamoa tuzing, ballar yig'ing va reytingda yuqori o'rinlarni egallang!</p>
                    <button 
                      onClick={() => setCurrentView('Team')}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all"
                    >
                      <Users size={20} /> Jamoaga qo'shilish
                    </button>
                 </div>
              </div>

              <div className="mb-20">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight">Tanlangan Videolar</h3>
                   <button 
                     onClick={() => setCurrentView('Videos')}
                     className="text-indigo-600 font-bold hover:underline flex items-center gap-2"
                   >
                     Hammasini ko'rish <ArrowRight size={16} />
                   </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {VIDEOS.slice(0, 4).map((video) => (
                    <motion.div 
                      key={video.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentView('Videos')}
                      className="cursor-pointer group"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
                        <img src={video.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                           <PlayCircle className="text-white opacity-80" size={32} />
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{video.title}</h4>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : currentView === 'Alphabet' ? (
            <AlphabetSection key="alphabet" onBack={handleBackToHome} />
          ) : currentView === 'Videos' ? (
            <VideoSection key="videos" onBack={handleBackToHome} />
          ) : currentView === 'Dictionary' ? (
            <DictionarySection key="dictionary" onBack={handleBackToHome} />
          ) : currentView === 'Games' ? (
            <GamesSection key="games" onBack={handleBackToHome} level={currentLevel} />
          ) : currentView === 'Team' ? (
            <TeamSection key="team" onBack={handleBackToHome} userName={userName} />
          ) : currentView === 'History' ? (
            <HistorySection key="history" onBack={handleBackToHome} activeUser={userName} progress={progress} />
          ) : currentView === 'Certificate' ? (
            <Certificate key="certificate" userName={userName} onBack={handleBackToHome} />
          ) : !currentLesson ? (
            <motion.div
              key="lessons-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto mt-12 px-6"
            >
              <div className="mb-12 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${selectedLevelData?.color} opacity-10 rounded-bl-full`} />
                <h2 className="text-4xl font-black text-gray-900 mb-4">{selectedLevelData?.name}</h2>
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-gray-50 rounded-full text-xs font-black text-gray-400 border border-gray-100 uppercase tracking-widest">
                    Daraja: {selectedLevelData?.id}
                  </div>
                  <div className="text-green-600 font-bold text-sm">
                    {Object.keys(progress).filter(p => p.startsWith(selectedLevelData?.id.toLowerCase()[0] || '')).length} / {selectedLevelData?.lessons.length} tugallandi
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Darslar ro'yxati</h3>
                {selectedLevelData?.lessons.map((lesson) => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    isCompleted={!!progress[lesson.id]}
                    onClick={() => setCurrentLesson(lesson)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="lesson-player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LessonContent 
                lesson={currentLesson} 
                onBack={() => setCurrentLesson(null)}
                onComplete={() => handleCompleteLesson(currentLesson.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const QuickNavCard = ({ title, desc, icon, color, onClick }: any) => (
  <motion.button
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-6 group hover:shadow-xl hover:shadow-indigo-500/5 transition-all w-full"
  >
    <div className={`${color} w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-black text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 font-medium">{desc}</p>
    </div>
  </motion.button>
);
