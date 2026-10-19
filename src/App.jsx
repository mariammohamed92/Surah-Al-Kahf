import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import SlideSection from './components/SlideSection.jsx';
import SlideNavigation from './components/SlideNavigation.jsx';
import { KAHF_SLIDES } from './data/kahfData.js';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = KAHF_SLIDES.length - 1; i >= 0; i--) {
        const el = document.getElementById(`slide-${i + 1}`);
        if (el) {
          const top = el.offsetTop;
          if (triggerPosition >= top) {
            setCurrentSlideIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index) => {
    if (index < 0 || index >= KAHF_SLIDES.length) return;
    setCurrentSlideIndex(index);
    const element = document.getElementById(`slide-${index + 1}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#110519] text-[#fbebf4] bg-islamic-pattern font-cairo flex flex-col relative selection:bg-pink-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-16 pb-28">
        {KAHF_SLIDES.map((slide, idx) => (
          <SlideSection
            key={slide.id}
            slide={slide}
            isActive={idx === currentSlideIndex}
          />
        ))}
      </main>

      <SlideNavigation
        slides={KAHF_SLIDES}
        currentIndex={currentSlideIndex}
        onSelectSlide={scrollToSlide}
      />
    </div>
  );
}
