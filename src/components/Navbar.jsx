import React from 'react';
import { BookOpen } from 'lucide-react';
import AudioPlayer from './AudioPlayer.jsx';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#140620]/95 border-b border-pink-500/25 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        
        <div className="flex items-center justify-center">
          <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-600/30 to-pink-500/20 border border-pink-500/40 shadow-sm flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 p-[1.5px] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#1c082a] rounded-[10px] flex items-center justify-center text-pink-300">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" />
              </div>
            </div>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent leading-tight tracking-wide">
              سورة الكهف (قصة ذي القرنين)
            </h1>
          </div>
        </div>

        <AudioPlayer />

      </div>
    </header>
  );
}
