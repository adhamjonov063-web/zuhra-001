import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle, RotateCcw, AlertCircle, PlayCircle, Star, Zap } from 'lucide-react';
import { GameEntry, Level } from '../types';

interface CarGameProps {
  game: GameEntry & { level: Level };
  onFinish: () => void;
}

const WORDS_POOL: Record<Level, { en: string; uz: string; hint: string }[]> = {
  Junior: [
    { en: 'Apple', uz: 'olma', hint: 'Meva turi, dumaloq va qizil/yashil' },
    { en: 'Book', uz: 'kitob', hint: 'O\'qish uchun mo\'ljallangan sahifalar to\'plami' },
    { en: 'Car', uz: 'mashina', hint: 'To\'rt gildirakli transport vositasi' },
    { en: 'Water', uz: 'suv', hint: 'Hayot manbai bo\'lgan rangsiz suyuqlik' },
    { en: 'Tree', uz: 'daraxt', hint: 'Yaproqli va shoxli katta o\'simlik' }
  ],
  Middle: [
    { en: 'Acquire', uz: 'egallamoq', hint: 'Biror narsani o\'ziniki qilib olmoq, sotib olmoq' },
    { en: 'Beneficial', uz: 'foydali', hint: 'Yaxshilik yoki manfaat keltiradigan sharoit' },
    { en: 'Capable', uz: 'qobiliyatli', hint: 'Biror ishni bajara oladigan, usta' },
    { en: 'Efficient', uz: 'samarali', hint: 'Kam vaqt va kuch sarflab katta natija beruvchi' },
    { en: 'Hazard', uz: 'xavf', hint: 'Salbiy oqibatlarga olib kelishi mumkin bo\'lgan narsa' }
  ],
  Senior: [
    { en: 'Abundant', uz: 'serob', hint: 'Juda ko\'p miqdordagi, to\'kin' },
    { en: 'Genuine', uz: 'haqiqiy', hint: 'Soxta bo\'lmagan, rostakam' },
    { en: 'Inevitable', uz: 'muqarrar', hint: 'Sodir bo\'lishi aniq bo\'lgan, qochib qutulib bo\'lmas' },
    { en: 'Fascinating', uz: 'maftunkor', hint: 'O\'ziga jalb qiladigan, sehrli' },
    { en: 'Subjunctive', uz: 'istak mayli', hint: 'Noreal yoki orzu qilingan holat mayli' }
  ],
  Master: [
    { en: 'Ambiguous', uz: 'noaniq', hint: 'Bir nechta ma\'noga ega bo\'lgan, tushunarsiz' },
    { en: 'Seldom', uz: 'kamdan-kam', hint: 'Deyarli hech qachon sodir bo\'lmaydigan' },
    { en: 'Deficit', uz: 'kamomad', hint: 'Kerakli narsaning yetishmasligi, zarar' },
    { en: 'Inversion', uz: 'inversiya', hint: 'Grammatikada so\'zlar tartibining buzilishi' },
    { en: 'Emphasis', uz: 'urg\'u', hint: 'Fikrni kuchaytirib ko\'rsatish, ahamiyat' }
  ]
};

export const CarGame: React.FC<CarGameProps> = ({ game, onFinish }) => {
  const currentLevelWords = WORDS_POOL[game.level] || WORDS_POOL.Junior;

  // Stages: 'countdown' | 'driving' | 'traffic-light' | 'finished'
  const [stage, setStage] = useState<'countdown' | 'driving' | 'traffic-light' | 'finished'>('countdown');
  const [countdown, setCountdown] = useState<number | string>(3);
  const [passedLights, setPassedLights] = useState(0);
  const [score, setScore] = useState(0);
  const [drivingProgress, setDrivingProgress] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  // Active word
  const activeWord = currentLevelWords[currentWordIdx % currentLevelWords.length];

  // Countdown cycle
  useEffect(() => {
    if (stage === 'countdown') {
      const timer = setInterval(() => {
        if (countdown === 3) setCountdown(2);
        else if (countdown === 2) setCountdown(1);
        else if (countdown === 1) setCountdown('GO!');
        else {
          clearInterval(timer);
          setStage('driving');
          setDrivingProgress(0);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [stage, countdown]);

  // Driving progress loop (moves the car for 5 seconds)
  useEffect(() => {
    if (stage === 'driving') {
      const interval = setInterval(() => {
        setDrivingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage('traffic-light');
            setInputValue('');
            return 100;
          }
          return prev + 2; // Increments over ~2.5 seconds or 5 seconds
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [stage]);

  // Handle typing translation
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const correctTranslation = activeWord.uz.toLowerCase().trim();
    const userTranslation = inputValue.toLowerCase().trim();

    if (userTranslation === correctTranslation) {
      // Correct translation!
      setScore((s) => s + 20);
      setPassedLights((p) => p + 1);
      
      if (passedLights + 1 >= 5) {
        setStage('finished');
      } else {
        // Accelerate car, change to driving
        setStage('countdown');
        setCountdown(3);
        setCurrentWordIdx((prev) => prev + 1);
      }
    } else {
      // Wrong translation
      setWrong(true);
      setTimeout(() => setWrong(false), 800);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-[3.5rem] p-8 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden min-h-[550px] flex flex-col justify-between">
      {/* Background neon grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />

      {/* Header with Title and Level */}
      <div className="relative z-10 flex justify-between items-center border-b border-slate-800 pb-6 mb-4">
        <div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-black rounded-full uppercase tracking-widest border border-indigo-500/20 mr-2">
            MOSHINA O'YINI
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-black rounded-full uppercase tracking-widest border border-amber-500/20">
            {game.level}
          </span>
        </div>
        <div className="flex gap-6 text-sm font-black">
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase">Ball</span>
            <span className="text-xl text-indigo-400">{score} XP</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase">Raund</span>
            <span className="text-xl text-green-400">{passedLights}/5</span>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative py-6">
        {/* Game Visualizer Box - Persistent for countdown, driving, and traffic-light */}
        {stage !== 'finished' && (
          <div className="w-full max-w-2xl mx-auto bg-slate-950 rounded-[2.5rem] p-1 border-2 border-slate-800 shadow-2xl relative overflow-hidden mb-6">
            <style>{`
              @keyframes road-flow-animation {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: 45; }
              }
              .road-dashes-active {
                animation: road-flow-animation 0.35s linear infinite;
              }
              @keyframes car-idle-shake {
                0%, 100% { transform: translate(0px, 0px); }
                50% { transform: translate(0px, -1.5px); }
              }
              @keyframes car-driving-shake {
                0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
                20% { transform: translate(-0.8px, -1.2px) rotate(-0.3deg); }
                40% { transform: translate(0.8px, -0.4px) rotate(0.4deg); }
                60% { transform: translate(-0.5px, -1.0px) rotate(-0.2deg); }
                80% { transform: translate(0.5px, -1.8px) rotate(0.3deg); }
              }
              .car-style-idle {
                animation: car-idle-shake 0.8s ease-in-out infinite;
              }
              .car-style-active {
                animation: car-driving-shake 0.1s linear infinite;
              }
            `}</style>

            <div className="relative w-full aspect-[2/1] bg-slate-950 overflow-hidden rounded-[2.3rem]">
              <svg viewBox="0 0 600 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#020617" />
                    <stop offset="60%" stopColor="#0b0f19" />
                    <stop offset="100%" stopColor="#1e1b4b" />
                  </linearGradient>
                  <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020408" />
                  </linearGradient>
                  <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="neonGlowRed" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="neonGlowYellow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="neonGlowGreen" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Sky background */}
                <rect x="0" y="0" width="600" height="300" fill="url(#skyGrad)" />
                
                {/* Stars representation */}
                <g opacity="0.6">
                  <circle cx="80" cy="30" r="1" fill="#fff" />
                  <circle cx="150" cy="15" r="1.5" fill="#fff" />
                  <circle cx="280" cy="40" r="1" fill="#fff" />
                  <circle cx="390" cy="20" r="1" fill="#fff" />
                  <circle cx="510" cy="35" r="1.5" fill="#fff" />
                  <circle cx="560" cy="15" r="0.8" fill="#fff" />
                </g>

                {/* Mountains on horizon */}
                <path d="M0 110 Q140 80 290 105 T600 110 L600 120 L0 120 Z" fill="#111030" opacity="0.6" />
                <path d="M0 115 Q90 95 240 112 T600 115 L600 120 L0 120 Z" fill="#1b1544" opacity="0.8" />

                {/* Ground surface */}
                <rect x="0" y="120" width="600" height="180" fill="#030712" />

                {/* Perspective Road */}
                <path d="M300 120 L30 300 L570 300 Z" fill="url(#roadGrad)" stroke="#1e293b" strokeWidth="1" />

                {/* Left and Right Glowing Neon highway shoulder lines */}
                <line x1="300" y1="120" x2="30" y2="300" stroke="#06b6d4" strokeWidth="3.5" style={{ filter: 'drop-shadow(0 0 4px #06b6d4)' }} />
                <line x1="300" y1="120" x2="570" y2="300" stroke="#06b6d4" strokeWidth="3.5" style={{ filter: 'drop-shadow(0 0 4px #06b6d4)' }} />

                {/* Additional lane marking helper guidelines */}
                <line x1="300" y1="120" x2="210" y2="300" stroke="#1e293b" strokeWidth="1" strokeDasharray="3, 3" />
                <line x1="300" y1="120" x2="390" y2="300" stroke="#1e293b" strokeWidth="1" strokeDasharray="3, 3" />

                {/* Animated Road Center Dash Lines */}
                <path d="M300 120 L300 310" stroke="#f59e0b" strokeWidth="3.5" 
                      strokeDasharray="25, 20" 
                      className={stage === 'driving' ? 'road-dashes-active' : ''} />

                {/* Approaching Traffic Light (Svetofor) with quadratic perspective interpolation */}
                {(() => {
                  const lightProgress = stage === 'traffic-light' ? 100 : (stage === 'countdown' ? 0 : drivingProgress);
                  const p = lightProgress / 100;
                  const pQuad = p * p; // Simulate foreshortening compression
                  
                  // Coordinate mappings
                  const lightY = 120 + pQuad * 105; 
                  const lightX = 305 + pQuad * 155; 
                  const lightScale = 0.05 + pQuad * 1.15;
                  const lightOpacity = stage === 'countdown' ? 0.3 : (p < 0.05 ? p / 0.05 : 1);

                  const isRed = stage === 'traffic-light';
                  const isYellow = stage === 'driving' && drivingProgress > 80;
                  const isGreen = stage === 'countdown' || (stage === 'driving' && drivingProgress <= 80);

                  return (
                    <g transform={`translate(${lightX}, ${lightY}) scale(${lightScale})`} style={{ opacity: lightOpacity }}>
                      {/* Metal post supporting the light box */}
                      <rect x="-4" y="0" width="8" height="180" fill="#475569" stroke="#1e293b" strokeWidth="1" />
                      {/* Main traffic light enclosure */}
                      <rect x="-16" y="-62" width="32" height="72" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      
                      {/* Glowing Red Aura and Light */}
                      {isRed && <circle cx="0" cy="-47" r="14" fill="url(#neonGlowRed)" />}
                      <circle cx="0" cy="-47" r="7" fill={isRed ? '#f87171' : '#1e293b'} stroke={isRed ? '#ef4444' : '#0f172a'} strokeWidth="1" />

                      {/* Glowing Yellow Aura and Light */}
                      {isYellow && <circle cx="0" cy="-27" r="14" fill="url(#neonGlowYellow)" />}
                      <circle cx="0" cy="-27" r="7" fill={isYellow ? '#facc15' : '#1e293b'} stroke={isYellow ? '#eab308' : '#0f172a'} strokeWidth="1" />

                      {/* Glowing Green Aura and Light */}
                      {isGreen && <circle cx="0" cy="-7" r="14" fill="url(#neonGlowGreen)" />}
                      <circle cx="0" cy="-7" r="7" fill={isGreen ? '#4ade80' : '#1e293b'} stroke={isGreen ? '#22c55e' : '#0f172a'} strokeWidth="1" />
                    </g>
                  );
                })()}

                {/* Modern sports car seen from high-detail Rear View */}
                {(() => {
                  const isDrivingState = stage === 'driving';
                  const isStoppedState = stage === 'traffic-light';
                  const carClass = isDrivingState ? 'car-style-active' : 'car-style-idle';

                  return (
                    <g transform="translate(300, 245)" className={carClass}>
                      {/* Rear tire glow shadow */}
                      <ellipse cx="0" cy="35" rx="55" ry="8" fill="#000" opacity="0.6" />

                      {/* Fat racing tires */}
                      <rect x="-56" y="16" width="22" height="22" rx="4" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
                      <rect x="34" y="16" width="22" height="22" rx="4" fill="#090d16" stroke="#1e293b" strokeWidth="1" />

                      {/* Tail bottom diffuser & exhaust fins */}
                      <path d="M-40 24 L40 24 L35 34 L-35 34 Z" fill="#111827" />
                      <line x1="-18" y1="24" x2="-18" y2="34" stroke="#000" strokeWidth="2.5" />
                      <line x1="0" y1="24" x2="0" y2="34" stroke="#000" strokeWidth="2.5" />
                      <line x1="18" y1="24" x2="18" y2="34" stroke="#000" strokeWidth="2.5" />

                      {/* Jet thrust flames (cyan reactive fire when accelerating) */}
                      {isDrivingState && (
                        <g opacity="0.9">
                          <path d="M-28 26 L-25 44 L-22 26 Z" fill="url(#fireGrad)" />
                          <circle cx="-25" cy="27" r="4.5" fill="#38bdf8" />
                          <path d="M22 26 L25 44 L28 26 Z" fill="url(#fireGrad)" />
                          <circle cx="25" cy="27" r="4.5" fill="#38bdf8" />
                        </g>
                      )}

                      {/* Aggressive luxury modern chassis curves */}
                      {/* Main fenders (deep metallic indigo) */}
                      <path d="M-56 16 L-51 -6 Q-41 -11 -30 -13 L30 -13 Q41 -11 51 -6 L56 16 L44 23 L-44 23 Z" fill="#312e81" stroke="#4338ca" strokeWidth="2" />
                      <path d="M-52 14 L-49 -5 Q-39 -9 -28 -11 L28 -11 Q39 -9 49 -5 L52 14 Z" fill="#1e1b4b" />

                      {/* Cyber rear window */}
                      <path d="M-34 -13 L-24 -36 L24 -36 L34 -13 Z" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
                      <path d="M-30 -15 L-22 -34 L22 -34 L30 -15 Z" fill="#111827" />
                      <path d="M-8 -34 L12 -34 L-2 -15 L-22 -15 Z" fill="#ffffff" opacity="0.1" />

                      {/* Sport aerodynamic Spoiler Wing */}
                      <path d="M-58 -18 L-50 -25 L50 -25 L58 -18 Z" fill="#0c0a21" stroke="#6366f1" strokeWidth="2" />
                      <rect x="-40" y="-18" width="4.5" height="7" fill="#111827" />
                      <rect x="35" y="-18" width="4.5" height="7" fill="#111827" />

                      {/* Cyber Thin Neon Red LED Lightbar across the trunk (Porsche / Audi styling) */}
                      <rect x="-48" y="-3" width="96" height="7" rx="3" fill="#090d16" stroke="#111827" strokeWidth="1" />
                      {/* Glowing LED stripe */}
                      <rect x="-46" y="-2" width="92" height="5" rx="2.5" 
                            fill={isStoppedState ? '#ef4444' : '#f43f5e'} 
                            style={{ filter: isStoppedState ? 'drop-shadow(0 0 12px #ef4444) drop-shadow(0 0 4px #ef4444)' : 'drop-shadow(0 0 5px #f43f5e)' }} />

                      {/* Tech details: License plate with active game level code */}
                      <rect x="-14" y="6" width="28" height="11" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                      <rect x="-11" y="8" width="22" height="7" rx="1" fill="#f59e0b" />
                      <text x="0" y="13.5" fill="#020617" fontSize="5.5px" fontWeight="950" textAnchor="middle" fontFamily="monospace" letterSpacing="0.2">
                        {game.level.substring(0, 3).toUpperCase()}-500
                      </text>
                    </g>
                  );
                })()}
              </svg>

              {/* Absolute countdown overlay directly centered inside the Road screen */}
              {stage === 'countdown' && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center">
                  <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-[0.2em] mb-1">Dvigatel O't Oldirildi!</span>
                  <span className="text-xl md:text-2xl font-black text-slate-200 tracking-wider mb-2 uppercase">Moshina yo'lga chiqmoqda</span>
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-505 font-mono"
                  >
                    {countdown}
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {stage === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-4"
            >
              <p className="text-sm font-medium text-slate-400 max-w-sm italic">
                Raund {passedLights + 1}. Tezlik darajasini oshirish uchun ingliz tili tarjimalarini aniq tering!
              </p>
            </motion.div>
          )}

          {stage === 'driving' && (
            <motion.div
              key="driving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md flex flex-col items-center gap-6"
            >
              <div className="text-center">
                 <h3 className="text-xl font-black text-indigo-400 tracking-wide uppercase">
                    YO'L TUGASHI YAQLINLASHMOQDA!
                 </h3>
                 <span className="text-xs text-slate-400 block font-bold tracking-widest mt-1 uppercase">Tezlik: 120 km/soat | Raund {passedLights + 1}/5</span>
              </div>

              {/* Progress Bar of current driving stretch */}
              <div className="w-full">
                <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                   <span>Svetoforgacha Masofa</span>
                   <span className="text-cyan-400 font-mono">{100 - drivingProgress}m</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-[2px] border border-slate-800 shadow-inner">
                   <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-100" style={{ width: `${drivingProgress}%` }} />
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'traffic-light' && (
            <motion.div
              key="traffic-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl space-y-5"
            >
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 relative shadow-inner">
                 <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] block mb-1">
                   Svetofor: QIZIL CHIROQ! (Raund {passedLights + 1}/5)
                 </span>
                 <h3 className="text-sm font-bold text-slate-300">
                   Chiroq yashil yonishi va moshina yo'lini davom ettirishi uchun tarjimani tez va aniq tering!
                 </h3>

                 {/* Word display */}
                 <div className="mt-4 p-4 bg-slate-900 rounded-2xl flex flex-col items-center justify-center border border-slate-800">
                   <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-1">Ingliz tilida</span>
                   <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 select-all font-mono tracking-normal">{activeWord.en}</span>
                 </div>

                 {/* Hint Box */}
                 <div className="mt-3 text-xs font-semibold text-slate-400 flex items-start gap-2 bg-slate-900/40 p-3 rounded-xl border border-slate-800/40">
                   <HelpCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                   <span><strong>Yordam (Hint):</strong> {activeWord.hint} (Boshlanish harfi: <strong>{activeWord.uz[0].toUpperCase()}</strong>, jami <strong>{activeWord.uz.length}</strong> ta harf)</span>
                 </div>
              </div>

              {/* Typing Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="relative">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="O'zbekcha tarjimasini yozing..."
                      autoFocus
                      className={`w-full bg-slate-950 border-2 ${wrong ? 'border-red-500 animate-shake' : 'border-slate-850 focus:border-indigo-500'} rounded-2xl p-4 pr-32 text-lg font-bold tracking-wide outline-none placeholder-slate-700 transition-colors text-white`}
                    />
                    {inputValue.trim() !== '' && (
                      <button 
                        type="submit"
                        className="absolute right-2.5 top-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-5 py-2 rounded-xl transition-all shadow-lg text-xs tracking-wider"
                      >
                        TEKSHIRISH
                      </button>
                    )}
                 </div>
                 
                 {/* Quick helper keypad - scrambled letters */}
                 <div>
                   <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block mb-1.5">Harflar yordamchisi:</span>
                   <div className="flex flex-wrap gap-2">
                      {Array.from(activeWord.uz).sort(() => 0.5 - Math.random()).map((char, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => setInputValue(prev => prev + char)}
                          className="bg-slate-800/60 border border-slate-700/80 hover:border-indigo-500 hover:bg-slate-700 text-sm font-black text-slate-200 w-9 h-9 rounded-lg transition-all active:scale-95"
                        >
                          {char}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setInputValue('')}
                        className="bg-slate-900 border border-slate-800 hover:bg-red-950/40 hover:border-red-800 text-[10px] font-black text-red-400 px-3 h-9 rounded-lg transition-all ml-auto uppercase"
                      >
                        TOZALASH
                      </button>
                   </div>
                 </div>
              </form>

              {wrong && (
                 <div className="p-3 bg-red-950/30 border border-red-900 rounded-xl text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>Noto'g'ri tarjima! Yozuvni qaytadan tekshiring. (Iltimos, so'z shakliga diqqat qiling: <strong>{activeWord.uz}</strong>)</span>
                 </div>
              )}
            </motion.div>
          )}

          {stage === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-10 max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-green-500/10 border-2 border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle size={56} />
              </div>
              <h2 className="text-3xl font-black mb-2 tracking-tight">Vazifa Bajarildi!</h2>
              <p className="text-slate-400 mb-8 font-medium">Siz barcha 5 ta svetofor qizil chirog'ini inglizcha so'z tarjimalari bilan muvaffaqiyatli bug'lab, yashilga yo'naltirdingiz!</p>
              
              <div className="bg-slate-950 p-6 rounded-2xl mb-8 border border-slate-800 grid grid-cols-2 gap-4">
                 <div className="text-center border-r border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">To'plangan Ball</span>
                    <span className="text-3xl font-black text-indigo-400">+{score} XP</span>
                 </div>
                 <div className="text-center">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Tirbandlikni bartaraf etish</span>
                    <span className="text-3xl font-black text-green-400">100%</span>
                 </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setStage('countdown');
                    setCountdown(3);
                    setPassedLights(0);
                    setScore(0);
                    setDrivingProgress(0);
                    setCurrentWordIdx(0);
                  }}
                  className="flex-1 bg-slate-800 border border-slate-700 hover:bg-slate-700 py-3.5 rounded-xl font-bold transition-all text-sm uppercase tracking-wider"
                >
                  Qayta O'ynash
                </button>
                <button
                  onClick={onFinish}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3.5 rounded-xl font-bold transition-all shadow-lg text-sm uppercase tracking-wider text-white"
                >
                  Yopish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
