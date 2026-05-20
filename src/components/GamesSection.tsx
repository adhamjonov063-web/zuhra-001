import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, ArrowLeft, Trophy, Zap, Ghost, CheckCircle, Car } from 'lucide-react';
import { GameEntry, Level } from '../types';
import { CarGame } from './CarGame';

interface GamesSectionProps {
  onBack: () => void;
  level: Level | null;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onBack, level }) => {
  const [activeGame, setActiveGame] = useState<GameEntry & { level: Level }>({ id: '', title: '', description: '', previewImage: '', type: 'word-match', level: 'Junior' });
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'result'>('playing');

  const levels: Level[] = ['Junior', 'Middle', 'Senior', 'Master'];
  const GAME_DATA: (GameEntry & { level: Level })[] = levels.flatMap((lvl) => 
    Array.from({ length: 8 }, (_, i) => ({
      id: `g-${lvl}-${i}`,
      title: i === 0 ? `${lvl} So'z Boyligi` : i === 1 ? `${lvl} Grammatika` : i === 2 ? `${lvl} Trafik (Moshina) O'yini` : `${lvl} O'yin #${i + 1}`,
      description: i === 2 ? "Qizil chiroqda to'xtab, tarjimani yozing!" : (i % 2 === 0 ? "So'zlarni moslashtiring" : "Gaplarni tuzing"),
      previewImage: i === 0 ? "https://images.unsplash.com/photo-1619566636858-adf3ef46400c?w=400&h=225&fit=crop" : i === 2 ? "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=225&fit=crop" : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
      type: i === 2 ? 'car-game' : (i % 2 === 0 ? 'word-match' : 'sentence-build'),
      level: lvl
    }))
  );

  const filteredGames = level ? GAME_DATA.filter(g => g.level === level) : GAME_DATA;

  const handleStartGame = (game: GameEntry & { level: Level }) => {
    setActiveGame(game);
    setIsGameRunning(true);
    setGameState('playing');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <button 
        onClick={isGameRunning ? () => setIsGameRunning(false) : onBack}
        className="flex items-center gap-2 text-indigo-600 mb-12 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Orqaga
      </button>

      {!isGameRunning ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-pink-600 p-3 rounded-2xl text-white shadow-lg">
                    <Gamepad2 size={32} />
                 </div>
                 <h1 className="text-5xl font-black text-gray-900 tracking-tight">{level || 'Barcha'} O'yinlar</h1>
              </div>
              <p className="text-xl text-gray-500">Darajangizga mos o'yin o'ynab ingliz tilini organing (30+ o'yinlar)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game, idx) => (
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
                      {game.type === 'word-match' ? <Zap size={14} className="text-amber-400" /> : game.type === 'car-game' ? <Car size={14} className="text-cyan-400" /> : <Ghost size={14} className="text-indigo-400" />}
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded ml-auto text-[10px]">{game.level}</span>
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
      ) : activeGame.type === 'car-game' ? (
        <CarGame
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

const SentenceBuildGame = ({ game, onFinish }: { game: GameEntry & { level: Level }, onFinish: () => void }) => {
  const sentencesByLevel: Record<Level, { uz: string; en: string[] }[]> = {
    Junior: [
      { uz: 'Mening ismim Adham', en: ['My', 'name', 'is', 'Adham'] },
      { uz: 'Men maktabga boraman', en: ['I', 'go', 'to', 'school'] },
      { uz: 'U yaxshi qiz', en: ['She', 'is', 'a', 'good', 'girl'] }
    ],
    Middle: [
      { uz: 'Men darslarimni tugatdim', en: ['I', 'have', 'finished', 'my', 'lessons'] },
      { uz: 'Kitob aka-ukam tomonidan yozilgan', en: ['The', 'book', 'was', 'written', 'by', 'my', 'brother'] },
      { uz: 'Ular hozir kino ko\'rishmoqda', en: ['They', 'are', 'watching', 'a', 'movie', 'now'] }
    ],
    Senior: [
      { uz: 'Agar ko\'proq oqiganimda, hozir muvaffaqiyatli bo\'lardim', en: ['If', 'I', 'had', 'studied', 'harder,', 'I', 'would', 'be', 'successful', 'now'] },
      { uz: 'Bu bino o\'tgan asrda qurilgan bo\'lishi kerak', en: ['This', 'building', 'must', 'have', 'been', 'built', 'last', 'century'] },
      { uz: 'U kelishi bilan biz ovqatlanishni boshlaymiz', en: ['As', 'soon', 'as', 'he', 'arrives,', 'we', 'will', 'start', 'eating'] }
    ],
    Master: [
      { uz: 'Hech qachon bunday go\'zal quyosh botishini ko\'rmaganman', en: ['Never', 'have', 'I', 'seen', 'such', 'a', 'beautiful', 'sunset'] },
      { uz: 'U shunchalik aqlliki, hamma narsani tushunadi', en: ['So', 'intelligent', 'is', 'he', 'that', 'he', 'understands', 'everything'] },
      { uz: 'Kamdan-kam hollarda u o\'z uyiga tashrif buyuradi', en: ['Seldom', 'does', 'he', 'visit', 'his', 'hometown'] }
    ]
  };

  const currentLevelSentences = sentencesByLevel[game.level];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(() => [...currentLevelSentences[0].en].sort(() => Math.random() - 0.5));
  const [wrong, setWrong] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleWordSelect = (word: string, idx: number) => {
    const newSelected = [...selectedWords, word];
    setSelectedWords(newSelected);
    setAvailableWords(availableWords.filter((_, i) => i !== idx));

    if (newSelected.length === currentLevelSentences[currentIdx].en.length) {
      if (newSelected.join(' ') === currentLevelSentences[currentIdx].en.join(' ')) {
        if (currentIdx < currentLevelSentences.length - 1) {
          setTimeout(() => {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            setSelectedWords([]);
            setAvailableWords([...currentLevelSentences[nextIdx].en].sort(() => Math.random() - 0.5));
          }, 800);
        } else {
          setFinished(true);
        }
      } else {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setSelectedWords([]);
          setAvailableWords([...currentLevelSentences[currentIdx].en].sort(() => Math.random() - 0.5));
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
         <div className="inline-flex gap-2 mb-4">
           <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-full uppercase tracking-widest">{game.level} LEVEL</span>
         </div>
         <h2 className="text-3xl font-black text-gray-900 mb-2">{game.title}</h2>
         <p className="text-gray-500">O'zbekcha gapni ingliz tiliga so'zlar orqali tarjima qiling (Difficulty: {game.level})</p>
      </div>

      <div className="bg-indigo-50 p-8 rounded-3xl mb-12 text-center">
         <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">Tarjima qiling</h4>
         <p className="text-2xl font-bold text-indigo-900 italic">"{currentLevelSentences[currentIdx].uz}"</p>
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

const WordMatchGame = ({ game, onFinish }: { game: GameEntry & { level: Level }, onFinish: () => void }) => {
  const wordsByLevel: Record<Level, { en: string; uz: string }[]> = {
    Junior: [
      { en: 'Apple', uz: 'Olma' }, { en: 'Book', uz: 'Kitob' }, { en: 'Car', uz: 'Mashina' }, { en: 'House', uz: 'Uy' }, { en: 'Friend', uz: 'Do\'st' }
    ],
    Middle: [
      { en: 'Acquire', uz: 'Egalallamoq' }, { en: 'Beneficial', uz: 'Foydali' }, { en: 'Capable', uz: 'Qobiliyatli' }, { en: 'Efficient', uz: 'Samarali' }, { en: 'Hazard', uz: 'Xavf' }
    ],
    Senior: [
      { en: 'Abundant', uz: 'Mo\'l-ko\'l' }, { en: 'Fascinating', uz: 'Ma\'ftunkor' }, { en: 'Genuine', uz: 'Haqiqiy' }, { en: 'Inevitable', uz: 'Muqarrar' }, { en: 'Hazard', uz: 'Xavf' }
    ],
    Master: [
      { en: 'Deficit', uz: 'Kamomad' }, { en: 'Inversion', uz: 'Inversiya' }, { en: 'Emphasis', uz: 'Urg\'u' }, { en: 'Ambiguous', uz: 'Noaniq' }, { en: 'Seldom', uz: 'Kamdan-kam' }
    ]
  };

  const gameWords = wordsByLevel[game.level];
  const [words] = useState(() => [...gameWords].sort(() => Math.random() - 0.5));
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
        setTimeout(() => onFinish(), 500);
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
        <div className="inline-flex gap-2 mb-4">
           <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-black rounded-full uppercase tracking-widest">{game.level} LEVEL</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">{game.title}</h2>
        <p className="text-gray-500">So'zlarni mos tarjimasi bilan bog'lang (Difficulty: {game.level})</p>
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
