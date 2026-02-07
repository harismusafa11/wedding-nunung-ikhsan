
import React from 'react';
import { STORY_TIMELINE } from '../constants';
import ScrollReveal from './ScrollReveal';

const Story: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
                <p className="font-script text-3xl text-[#5A4A42]">Love Story</p>
                <h2 className="font-serif text-3xl text-[#5A4A42] mt-2">Perjalanan Kami</h2>
                <div className="w-16 h-[0.5px] bg-[#A89F91] mx-auto mt-4"></div>
            </div>
        </ScrollReveal>

        <div className="relative">
            {/* Center Line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[0.5px] bg-[#A89F91]/30"></div>

            <div className="space-y-12">
                {STORY_TIMELINE.map((story, idx) => (
                    <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        {/* Dot Marker */}
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 flex items-center justify-center z-10">
                            <div className="w-3 h-3 bg-[#A89F91] rounded-full ring-8 ring-[#FDFBF7]"></div>
                        </div>
                        
                        {/* Spacer for mobile alignment */}
                        <div className="w-10 md:hidden"></div>

                        {/* Image Side */}
                        <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-12">
                            <ScrollReveal animation={idx % 2 === 0 ? "slide-right" : "slide-left"} delay={0.2}>
                                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lg border-[4px] border-white ring-1 ring-[#E6E2D6]/50">
                                    <img src={story.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt={story.title} />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-12 text-left md:text-center bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-[#E6E2D6]/30">
                             <ScrollReveal animation="fade-up" delay={0.4}>
                                 <div className="space-y-2">
                                    <span className="block text-[#A89F91] font-sans font-bold text-[10px] uppercase tracking-[0.3em]">{story.year}</span>
                                    <h3 className="font-serif text-2xl text-[#5A4A42]">{story.title}</h3>
                                    <p className="text-[#7D7D7D] text-sm leading-relaxed font-serif italic">"{story.description}"</p>
                                 </div>
                             </ScrollReveal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
