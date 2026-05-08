import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, ArrowLeft, Trophy, Zap, Ghost, CheckCircle } from 'lucide-react';
import { GameEntry, Level } from '../types';

interface GamesSectionProps {
  onBack: () => void;
  level: Level | null;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onBack, level }) => {
  const [activeGame, setActiveGame] = useState<GameEntry | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'result'>('playing');

  const GAME_DATA: GameEntry[] = Array.from({ length: 30 }, (_, i) => ({
    id: `g-${i}`,
    title: i === 0 ? "So'z Boyligi: Mevalar" : i === 1 ? "Grammatika: Vaqtlar" : i === 2 ? "Gap Tuzish: Salomlashish" : `Inglizcha O'yin #${i + 1}`,
    description: i % 2 === 0 ? "So'zlarni moslashtiring" : "Gaplarni tuzing",
    previewImage: i === 0 ? "https://images.unsplash.com/photo-1619566636858-adf3ef46400c?w=400&h=225&fit=crop" : i === 2 ? "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=225&fit=crop" : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
    type: i % 2 === 0 ? 'word-match' : 'sentence-build'
  }));

  const handleStartGame = (game: GameEntry) => {
    setActiveGame(game);
    setGameState('playing');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <button 
        onClick={activeGame ? () => setActiveGame(null) : onBack}
        className="flex items-center gap-2 text-indigo-600 mb-12 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Orqaga
      </button>

      {!activeGame ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-pink-600 p-3 rounded-2xl text-white shadow-lg">
                    <Gamepad2 size={32} />
                 </div>
                 <h1 className="text-5xl font-black text-gray-900 tracking-tight">{level || 'Barcha'} O'yinlar</h1>
              </div>
              <p className="text-xl text-gray-500">O'yin o'ynab ingliz tilini osonroq o'rganing (30+ o'yinlar)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GAME_DATA.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 12) * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => handleStartGame(game)}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative aspect-[16/9]">
                  <img src={game.previewImage} alt={game.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest mb-1">
                      {game.type === 'word-match' ? <Zap size={14} className="text-amber-400" /> : <Ghost size={14} className="text-indigo-400" />}
                      {game.type}
                    </div>
                    <h3 className="text-white text-xl font-bold">{game.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex justify-between items-center">
                  <p className="text-gray-500 text-sm">{game.description}</p>
                  <div className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    O'YNASH
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : activeGame.type === 'word-match' ? (
        <WordMatchGame 
          game={activeGame} 
          onFinish={() => setGameState('result')} 
        />
      ) : (
        <SentenceBuildGame 
          game={activeGame}
          onFinish={() => setGameState('result')}
        />
      )}
    </div>
  );
};

const SentenceBuildGame = ({ game, onFinish }: { game: GameEntry, onFinish: () => void }) => {
  const sentences = [
    { uz: 'Mening ismim Adham', en: ['My', 'name', 'is', 'Adham'] },
    { uz: 'Men ingliz tilini o\'rganyapman', en: ['I', 'am', 'learning', 'English'] },
    { uz: 'Sizning ismingiz nima?', en: ['What', 'is', 'your', 'name?'] }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(() => [...sentences[0].en].sort(() => Math.random() - 0.5));
  const [wrong, setWrong] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleWordSelect = (word: string, idx: number) => {
    const newSelected = [...selectedWords, word];
    setSelectedWords(newSelected);
    setAvailableWords(availableWords.filter((_, i) => i !== idx));

    // Check if sentence is complete
    if (newSelected.length === sentences[currentIdx].en.length) {
      if (newSelected.join(' ') === sentences[currentIdx].en.join(' ')) {
        // Correct!
        if (currentIdx < sentences.length - 1) {
          setTimeout(() => {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            setSelectedWords([]);
            setAvailableWords([...sentences[nextIdx].en].sort(() => Math.random() - 0.5));
          }, 800);
        } else {
          setFinished(true);
        }
      } else {
        // Wrong sentence
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setSelectedWords([]);
          setAvailableWords([...sentences[currentIdx].en].sort(() => Math.random() - 0.5));
        }, 1000);
      }
    }
  };

  if (finished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Tabriklaymiz!</h2>
        <p className="text-gray-500 mb-8">Siz barcha gaplarni to'g'ri tuzdingiz.</p>
        <button onClick={onFinish} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Yopish</button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl"
    >
      <div className="text-center mb-12">
         <h2 className="text-3xl font-black text-gray-900 mb-2">{game.title}</h2>
         <p className="text-gray-500">O'zbekcha gapni ingliz tiliga so'zlar orqali tarjima qiling</p>
      </div>

      <div className="bg-indigo-50 p-8 rounded-3xl mb-12 text-center">
         <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">Tarjima qiling</h4>
         <p className="text-2xl font-bold text-indigo-900 italic">"{sentences[currentIdx].uz}"</p>
      </div>

      <div className={`min-h-[100px] p-6 border-b-4 ${wrong ? 'border-red-200 bg-red-50' : 'border-indigo-100 bg-gray-50'} rounded-2xl flex flex-wrap gap-3 mb-12 transition-colors`}>
         {selectedWords.map((word, i) => (
           <motion.div 
             initial={{ scale: 0 }} 
             animate={{ scale: 1 }} 
             key={i} 
             className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold"
           >
             {word}
           </motion.div>
         ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {availableWords.map((word, i) => (
          <button
            key={i}
            onClick={() => handleWordSelect(word, i)}
            className="bg-white border-2 border-gray-100 px-6 py-3 rounded-2xl font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
          >
            {word}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const WordMatchGame = ({ game, onFinish }: { game: GameEntry, onFinish: (s: number) => void }) => {
  const allWords = [
    { en: 'Apple', uz: 'Olma' },
    { en: 'Book', uz: 'Kitob' },
    { en: 'Sky', uz: 'Osmon' },
    { en: 'Car', uz: 'Mashina' },
    { en: 'Friend', uz: 'Do\'st' },
    { en: 'Water', uz: 'Suv' },
    { en: 'School', uz: 'Maktab' },
    { en: 'Tree', uz: 'Daraxt' },
    { en: 'Sun', uz: 'Quyosh' },
    { en: 'Moon', uz: 'Oy' }
  ];

  // Select 5 random words for this session
  const [words] = useState(() => [...allWords].sort(() => Math.random() - 0.5).slice(0, 5));
  const [shuffledUz] = useState(() => [...words].sort(() => Math.random() - 0.5));

  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedUz, setSelectedUz] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [wrong, setWrong] = useState<boolean>(false);

  const handleEnSelect = (word: string) => {
    if (matches.includes(word) || wrong) return;
    setSelectedEn(word);
    if (selectedUz) checkMatch(word, selectedUz);
  };

  const handleUzSelect = (word: string) => {
    const isMatched = matches.find(m => words.find(wordObj => wordObj.en === m)?.uz === word);
    if (isMatched || wrong) return;
    setSelectedUz(word);
    if (selectedEn) checkMatch(selectedEn, word);
  };

  const checkMatch = (en: string, uz: string) => {
    const pair = words.find(w => w.en === en);
    if (pair?.uz === uz) {
      const newMatches = [...matches, en];
      setMatches(newMatches);
      setSelectedEn(null);
      setSelectedUz(null);
      if (newMatches.length === words.length) {
        setTimeout(() => onFinish(newMatches.length * 20), 500);
      }
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setSelectedEn(null);
        setSelectedUz(null);
      }, 800);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          Interactive Training
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">{game.title}</h2>
        <p className="text-gray-500">Ingliz tilidagi so'zlarni ularning o'zbekcha tarjimasi bilan moslashtiring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-3">
          <h4 className="text-center font-black text-indigo-600 text-xs uppercase tracking-widest mb-4">English</h4>
          {words.map(w => (
            <button
              key={w.en}
              onClick={() => handleEnSelect(w.en)}
              disabled={matches.includes(w.en)}
              className={`w-full p-5 rounded-2xl border-2 font-bold transition-all text-lg ${
                matches.includes(w.en) ? 'bg-green-50 border-green-200 text-green-300' :
                selectedEn === w.en ? (wrong ? 'bg-red-50 border-red-500 text-red-600 animate-shake' : 'bg-indigo-50 border-indigo-500 text-indigo-600 scale-105 shadow-lg shadow-indigo-100') :
                'bg-gray-50 border-white text-gray-700 hover:border-indigo-200 hover:bg-white'
              }`}
            >
              {w.en}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="text-center font-black text-emerald-600 text-xs uppercase tracking-widest mb-4">Uzbek</h4>
          {shuffledUz.map(w => {
            const isMatched = matches.find(m => words.find(wordObj => wordObj.en === m)?.uz === w.uz);
            return (
              <button
                key={w.uz}
                onClick={() => handleUzSelect(w.uz)}
                disabled={!!isMatched}
                className={`w-full p-5 rounded-2xl border-2 font-bold transition-all text-lg ${
                  isMatched ? 'bg-green-50 border-green-200 text-green-300' :
                  selectedUz === w.uz ? (wrong ? 'bg-red-50 border-red-500 text-red-600 animate-shake' : 'bg-emerald-50 border-emerald-500 text-emerald-600 scale-105 shadow-lg shadow-emerald-100') :
                  'bg-gray-50 border-white text-gray-700 hover:border-emerald-200 hover:bg-white'
                }`}
              >
                {w.uz}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden max-w-md border-2 border-white shadow-inner">
           <motion.div 
             className="bg-green-500 h-full"
             animate={{ width: `${(matches.length / words.length) * 100}%` }}
           />
        </div>
        <div className="text-sm font-black text-gray-400 uppercase tracking-widest">
          Topilgan: {matches.length} / {words.length}
        </div>
      </div>
    </motion.div>
  );
};
