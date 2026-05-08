import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, ArrowLeft, Trophy, Zap, Ghost } from 'lucide-react';
import { GameEntry, Level } from '../types';

interface GamesSectionProps {
  onBack: () => void;
  level: Level | null;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onBack, level }) => {
  const [activeGame, setActiveGame] = useState<GameEntry | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'result'>('playing');

  const GAME_DATA: GameEntry[] = Array.from({ length: 30 }, (_, i) => ({
    id: `g-${i}`,
    title: i === 0 ? "So'z Boyligi: Mevalar" : i === 1 ? "Grammatika: Vaqtlar" : `Inglizcha O'yin #${i + 1}`,
    description: i % 2 === 0 ? "So'zlarni moslashtiring" : "Gaplarni tuzing",
    previewImage: i === 0 ? "https://images.unsplash.com/photo-1619566636858-adf3ef46400c?w=400&h=225&fit=crop" : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
    type: i % 2 === 0 ? 'word-match' : 'sentence-build'
  }));

  const handleStartGame = (game: GameEntry) => {
    setActiveGame(game);
    setScore(0);
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
              <p className="text-xl text-gray-500">O'yin o'nyab ingliz tilini osonroq o'rganing (30+ o'yinlar)</p>
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
      ) : (
        <WordMatchGame 
          game={activeGame} 
          onFinish={(finalScore) => {
            setScore(finalScore);
            setGameState('result');
          }} 
        />
      )}
    </div>
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
