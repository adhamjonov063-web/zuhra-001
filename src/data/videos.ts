import { VideoEntry } from '../types';

const categories: (VideoEntry['category'])[] = ['Junior', 'Middle', 'Senior', 'Master', 'General'];

export const VIDEOS: VideoEntry[] = Array.from({ length: 60 }, (_, i) => ({
  id: `v-${i + 1}`,
  title: `Ingliz tili darsi #${i + 1}: ${
    i < 15 ? 'Boshlang\'ich' : i < 30 ? 'O\'rta' : i < 45 ? 'Yuqori' : 'Master'
  } mavzu`,
  url: `https://www.youtube.com/embed/${['75p-N9YKqNo', 'hshS6Zp4f60', '89VpUjX0d30', 'm_NUE0057U8'][i % 4]}`,
  thumbnail: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop`,
  category: categories[Math.floor(i / 12)]
}));
