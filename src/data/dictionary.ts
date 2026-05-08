import { DictionaryEntry, Level } from '../types';

const levels: Level[] = ['Junior', 'Middle', 'Senior', 'Master'];

const commonWords = [
  { word: "Abundant", translation: "Mo'l-ko'l", example: "The country has abundant natural resources.", level: "Senior" },
  { word: "Acquire", translation: "Egalallamoq", example: "I managed to acquire all the necessary skills.", level: "Middle" },
  { word: "Beneficial", translation: "Foydali", example: "Regular exercise is beneficial for your health.", level: "Middle" },
  { word: "Capable", translation: "Qobiliyatli", example: "She is capable of doing much more.", level: "Junior" },
  { word: "Deficit", translation: "Kamomad", example: "The trade deficit reached record levels.", level: "Master" },
  { word: "Efficient", translation: "Samarali", example: "This is a more efficient way to work.", level: "Middle" },
  { word: "Fascinating", translation: "Ma'ftunkor", example: "I found the movie absolutely fascinating.", level: "Senior" },
  { word: "Genuine", translation: "Haqiqiy", example: "Is the painting a genuine Picasso?", level: "Senior" },
  { word: "Hazard", translation: "Xavf", example: "Smoking is a serious health hazard.", level: "Middle" },
  { word: "Inevitable", translation: "Muqarrar", example: "Change is inevitable in life.", level: "Master" },
  // ... and many more
];

// Generate 2300 entries by repeating and slightly modifying for demo purposes
// In a real app, this would be a static JSON file loaded from an API
export const DICTIONARY_DATA: DictionaryEntry[] = [
  ...commonWords.map(w => ({ ...w, level: w.level as Level })),
  ...Array.from({ length: 2290 }, (_, i) => ({
    word: `Word_${i + 1}`,
    translation: `Tarjima_${i + 1}`,
    example: `Example sentence for word ${i + 1}.`,
    level: levels[i % 4]
  }))
];
