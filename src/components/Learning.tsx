import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PlayCircle, FileText, HelpCircle, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { Lesson, QuizQuestion } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onClick: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCompleted, onClick }) => {
  const Icon = lesson.type === 'video' ? PlayCircle : lesson.type === 'grammar' ? FileText : HelpCircle;
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-indigo-200 transition-colors shadow-sm"
    >
      <div className={`p-3 rounded-xl ${isCompleted ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
        {isCompleted ? <CheckCircle size={24} /> : <Icon size={24} />}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900">{lesson.title}</h4>
        <p className="text-sm text-gray-500 line-clamp-1">{lesson.description}</p>
      </div>
      <ChevronRight className="text-gray-300" size={20} />
    </motion.div>
  );
};

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

export const LessonContent = ({ lesson, onComplete, onBack }: LessonContentProps) => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 mb-8 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Orqaga listga
      </button>

      {!showQuiz ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <header>
             <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{lesson.title}</h1>
             <p className="text-xl text-gray-500">{lesson.description}</p>
          </header>

          {lesson.type === 'video' && lesson.videoUrl && (
            <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black">
              <iframe 
                src={lesson.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <article className="prose prose-indigo max-w-none bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
              {lesson.content}
            </div>
          </article>

          {lesson.quiz && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQuiz(true)}
              className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-bold text-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
            >
              Bilimingizni sinab ko'ring (Test) <ChevronRight />
            </motion.button>
          )}
        </motion.div>
      ) : (
        <QuizView 
          quiz={lesson.quiz || []} 
          onComplete={onComplete} 
          onExit={() => setShowQuiz(false)} 
        />
      )}
    </div>
  );
};

interface QuizViewProps {
  quiz: QuizQuestion[];
  onComplete: () => void;
  onExit: () => void;
}

const QuizView = ({ quiz, onComplete, onExit }: QuizViewProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = quiz[currentStep];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < quiz.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setFinished(true);
      onComplete();
    }
  };

  if (finished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-xl max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tabriklaymiz!</h2>
        <p className="text-gray-500 mb-8">Siz ushbu darsni muvaffaqiyatli yakunladingiz.</p>
        <div className="text-4xl font-black text-indigo-600 mb-8">Natija: {score} / {quiz.length}</div>
        <button 
          onClick={onExit}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
        >
          Darslar ro'yxatiga qaytish
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Savol {currentStep + 1} / {quiz.length}</span>
        <button onClick={onExit} className="text-gray-400 hover:text-gray-600">Yopish</button>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
        {currentQuestion.question}
      </h2>

      <div className="space-y-4 mb-8">
        {currentQuestion.options.map((opt, idx) => {
          let styles = "bg-gray-50 border-gray-100";
          if (isAnswered) {
             if (idx === currentQuestion.correctAnswer) styles = "bg-green-100 border-green-300 text-green-800 ring-2 ring-green-200";
             else if (idx === selectedOption) styles = "bg-red-100 border-red-300 text-red-800 ring-2 ring-red-200";
          } else if (selectedOption === idx) {
             styles = "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100";
          }

          return (
            <motion.button
              key={idx}
              whileHover={!isAnswered ? { scale: 1.01 } : {}}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-semibold text-lg flex items-center justify-between ${styles}`}
            >
              {opt}
              {isAnswered && idx === currentQuestion.correctAnswer && <CheckCircle size={20} />}
            </motion.button>
          );
        })}
      </div>

      {isAnswered && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-900 text-sm"
        >
          <p className="font-bold mb-1">Tushuntirish:</p>
          {currentQuestion.explanation}
        </motion.div>
      )}

      {isAnswered && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          {currentStep === quiz.length - 1 ? 'Tugatish' : 'Keyingi savol'} <ChevronRight size={20} />
        </motion.button>
      )}
    </div>
  );
};
