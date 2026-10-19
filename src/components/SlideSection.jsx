import React, { useState } from 'react';
import { motion } from 'motion/react';

export function formatIslamicText(text) {
  if (!text || typeof text !== 'string') return text;

  const regex = /(﴿[^﴾]+﴾|«[^»]+»|آياتها 110 آية|110 آية|عَشْرَ آيَاتٍ)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith('﴿') && part.endsWith('﴾')) {
      return (
        <span
          key={idx}
          className="text-pink-300 font-bold font-quran text-[1.12em] px-2 py-0.5 bg-pink-950/60 rounded-xl border border-pink-500/40 inline-block my-1 leading-loose shadow-[0_0_12px_rgba(236,72,153,0.3)]"
        >
          {part}
        </span>
      );
    }

    if (part.startsWith('«') && part.endsWith('»')) {
      return (
        <span
          key={idx}
          className="text-fuchsia-200 font-semibold px-2 py-1 bg-purple-950/70 rounded-xl border border-fuchsia-500/35 inline-block my-1 leading-relaxed shadow-[0_0_10px_rgba(217,70,239,0.25)]"
        >
          {part}
        </span>
      );
    }

    if (part === 'آياتها 110 آية' || part === '110 آية' || part === 'عَشْرَ آيَاتٍ') {
      return (
        <span
          key={idx}
          className="text-pink-300 font-extrabold px-2 py-0.5 rounded-lg bg-pink-500/25 border border-pink-500/50 inline-block mx-1 shadow-sm"
        >
          {part}
        </span>
      );
    }

    return part;
  });
}

export default function SlideSection({ slide, isActive }) {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const hasSections = slide.sections && slide.sections.length > 0;
  const currentSection = hasSections ? slide.sections[activeSectionIdx] : null;

  const displayImage = currentSection ? currentSection.image : slide.image;

  return (
    <motion.section
      id={`slide-${slide.slideNumber}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl bg-[#1a0827]/90 border border-pink-500/25 p-4 sm:p-6 lg:p-8 shadow-xl backdrop-blur-md ${
        isActive ? 'ring-2 ring-pink-500/40 shadow-[0_0_30px_rgba(236,72,153,0.2)]' : ''
      }`}
    >
      <div className="mb-4 sm:mb-6 pb-3 border-b border-pink-500/20 flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-l from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
          {slide.title}
        </h2>
        <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xs sm:text-base flex items-center justify-center shadow-md border border-pink-400/40 shrink-0">
          {slide.slideNumber}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
        
        <div className="block sm:hidden w-full overflow-hidden rounded-2xl border border-pink-500/30 shadow-md bg-[#12051d]">
          <img
            src={displayImage}
            alt=""
            className="w-full h-40 object-cover"
            loading="lazy"
          />
        </div>

        <div className="w-full sm:w-7/12 flex-1 space-y-3 sm:space-y-4">
          
          {slide.content && slide.content.map((item, idx) => (
            <div key={idx}>
              {item.type === 'heading' ? (
                <div className="text-center py-1 sm:py-2 text-lg sm:text-2xl font-bold font-quran text-pink-300">
                  {item.text}
                </div>
              ) : (
                <div className="bg-[#240c35]/85 border border-pink-500/20 rounded-2xl p-3.5 sm:p-5 shadow-sm">
                  <p className="text-[13px] sm:text-base leading-relaxed text-gray-100 font-medium">
                    {formatIslamicText(item.text)}
                  </p>
                </div>
              )}
            </div>
          ))}

          {slide.introText && (
            <div className="bg-[#240c35]/85 border border-pink-500/20 rounded-2xl p-3.5 sm:p-5">
              <p className="text-[13px] sm:text-base leading-relaxed text-gray-100 font-medium">
                {formatIslamicText(slide.introText)}
              </p>
            </div>
          )}

          {hasSections && (
            <div className="space-y-3 sm:space-y-4">
              
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {slide.sections.map((sec, idx) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionIdx(idx)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                      activeSectionIdx === idx
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                        : 'bg-purple-950/70 text-purple-300 hover:text-white border border-purple-500/20'
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>

              {/* نصوص القسم المختار بدقة تامة */}
              <div className="bg-[#240c35]/85 border border-pink-500/25 rounded-2xl p-3.5 sm:p-5 space-y-2.5 sm:space-y-3">
                <h3 className="text-sm sm:text-lg font-bold text-pink-300">
                  {currentSection?.title}
                </h3>
                {currentSection?.texts.map((txt, tIdx) => (
                  <p key={tIdx} className="text-[13px] sm:text-base leading-relaxed text-gray-100 font-medium">
                    {formatIslamicText(txt)}
                  </p>
                ))}
              </div>

            </div>
          )}

        </div>

        <div className="hidden sm:block sm:w-5/12 shrink-0 sm:sticky sm:top-24">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-pink-500/30 shadow-[0_8px_30px_rgba(236,72,153,0.25)] bg-[#12051d]">
            <img
              src={displayImage}
              alt=""
              className="w-full h-auto aspect-[4/3] md:aspect-[16/11] object-cover transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>

      </div>

    </motion.section>
  );
}
