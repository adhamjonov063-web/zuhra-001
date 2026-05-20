export type Level = 'Junior' | 'Middle' | 'Senior' | 'Master';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'grammar' | 'vocabulary' | 'video';
  content: string;
  videoUrl?: string;
  quiz?: QuizQuestion[];
}

export interface VideoEntry {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  category: Level | 'General';
}

export interface DictionaryEntry {
  word: string;
  translation: string;
  example: string;
  level: Level;
}

export interface AlphabetEntry {
  letter: string;
  pronunciation: string;
  example: string;
  audioUrl?: string;
}

export interface CourseLevel {
  id: Level;
  name: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export type AppView = 'Home' | 'Alphabet' | 'Videos' | 'Dictionary' | 'Course' | 'Games' | 'Team' | 'History' | 'Certificate';

export interface GameEntry {
  id: string;
  title: string;
  description: string;
  previewImage: string;
  type: 'word-match' | 'fill-blank' | 'sentence-build' | 'car-game';
}

export type AppState = {
  userName: string | null;
  currentView: AppView;
  currentLevel: Level | null;
  currentLesson: Lesson | null;
  progress: Record<string, boolean>;
  teamName: string | null;
  backgroundSeed: number;
};
