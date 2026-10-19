import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function SlideNavigation({ slides, currentIndex, onSelectSlide }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <div className="bg-[#1b0829]/95 border border-pink-500/40 backdrop-blur-xl px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => currentIndex > 0 && onSelectSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="p-1 rounded-full text-pink-300 hover:text-white disabled:opacity-30"
          title="السابق"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSelectSlide(idx)}
              className={`transition-all rounded-full flex items-center justify-center ${
                idx === currentIndex
                  ? 'w-7 sm:w-8 h-6 sm:h-7 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-md scale-110'
                  : 'w-5 sm:w-6 h-5 sm:h-6 bg-purple-950 text-purple-300/80 text-[10px]'
              }`}
              title={s.title}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => currentIndex < slides.length - 1 && onSelectSlide(currentIndex + 1)}
          disabled={currentIndex === slides.length - 1}
          className="p-1 rounded-full text-pink-300 hover:text-white disabled:opacity-30"
          title="التالي"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
