import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VIDEOS } from '../data/videos';
import { Play, Search, ArrowLeft, Filter, X } from 'lucide-react';
import { VideoEntry, Level } from '../types';

interface VideoSectionProps {
  onBack: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);

  const filteredVideos = VIDEOS.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 mb-12 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Bosh sahifaga
      </button>

      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Video Kutubxona</h1>
          <p className="text-xl text-gray-500">60 ta qiziqarli va foydali darslar to'plami</p>
        </div>
        
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Darslarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Junior', 'Middle', 'Senior', 'Master', 'General'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold border transition-all shrink-0 ${
              selectedCategory === cat 
              ? 'bg-gray-900 text-white border-gray-900' 
              : 'bg-white text-gray-500 border-gray-100 hover:border-indigo-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <motion.div
            layout
            key={video.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all cursor-pointer group"
            onClick={() => setActiveVideo(video)}
          >
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                  <Play fill="currentColor" size={32} />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                {video.category}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white"
            >
              <X size={32} />
            </button>
            <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
              <iframe 
                src={activeVideo.url}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
