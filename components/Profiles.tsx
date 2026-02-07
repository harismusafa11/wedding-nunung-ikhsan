
import React from 'react';
import { BRIDE, GROOM } from '../constants';
import ScrollReveal from './ScrollReveal';

const Profiles: React.FC = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-transparent">
      <div className="text-center mb-12 relative z-10">
           <ScrollReveal animation="fade-up">
             <img src="https://img.icons8.com/ios-glyphs/30/A89F91/wedding-rings.png" className="mx-auto mb-4 opacity-50" alt="icon" />
             <p className="font-script text-4xl text-[#5A4A42]">The Couple</p>
             <p className="font-serif text-sm italic text-[#A89F91] mt-2 px-4">"Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan."</p>
           </ScrollReveal>
      </div>

      <div className="space-y-16 relative z-10">
            {/* Groom (Ikhsan) - Sekarang di Atas */}
            <div className="flex flex-col items-center text-center">
                <ScrollReveal animation="slide-left" delay={0.2} duration={1.5}>
                     <div className="relative w-52 h-64 mb-6 group">
                        <div className="absolute inset-0 border-[0.5px] border-[#A89F91] rounded-t-full rounded-b-[2rem] -translate-x-3 translate-y-3 transition-transform group-hover:-translate-x-4 group-hover:translate-y-4 duration-500"></div>
                        <div className="absolute inset-0 rounded-t-full rounded-b-[2rem] overflow-hidden shadow-xl">
                            <img src={GROOM.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={GROOM.name} />
                        </div>
                    </div>
                </ScrollReveal>
                
                <ScrollReveal animation="fade-up" delay={0.4}>
                    <h3 className="font-display italic text-3xl text-[#5A4A42] mb-1">{GROOM.name}</h3>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#A89F91] mb-4 font-bold">Mempelai Pria</p>
                    <div className="text-[#5A4A42] text-sm font-serif leading-relaxed px-4 opacity-80">
                        <p>Putra tercinta dari</p>
                        <p className="font-bold">{GROOM.father} & {GROOM.mother}</p>
                    </div>
                    <a href={`https://instagram.com/${GROOM.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[10px] bg-white/70 backdrop-blur-sm shadow-sm border border-[#E6E2D6] px-4 py-1.5 rounded-full text-[#A89F91] hover:text-[#5A4A42] transition-colors font-sans tracking-wider">{GROOM.instagram}</a>
                </ScrollReveal>
            </div>

            {/* Bride (Nunung) - Sekarang di Bawah */}
            <div className="flex flex-col items-center text-center">
                <ScrollReveal animation="slide-right" delay={0.4} duration={1.5}>
                    <div className="relative w-52 h-64 mb-6 group">
                        <div className="absolute inset-0 border-[0.5px] border-[#A89F91] rounded-t-full rounded-b-[2rem] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-500"></div>
                        <div className="absolute inset-0 rounded-t-full rounded-b-[2rem] overflow-hidden shadow-xl">
                            <img src={BRIDE.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={BRIDE.name} />
                        </div>
                    </div>
                </ScrollReveal>
                
                <ScrollReveal animation="fade-up" delay={0.6}>
                    <h3 className="font-display italic text-3xl text-[#5A4A42] mb-1">{BRIDE.name}</h3>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#A89F91] mb-4 font-bold">Mempelai Wanita</p>
                    <div className="text-[#5A4A42] text-sm font-serif leading-relaxed px-4 opacity-80">
                        <p>Putri tercinta dari</p>
                        <p className="font-bold">{BRIDE.father} & {BRIDE.mother}</p>
                    </div>
                    <a href={`https://instagram.com/${BRIDE.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[10px] bg-white/70 backdrop-blur-sm shadow-sm border border-[#E6E2D6] px-4 py-1.5 rounded-full text-[#A89F91] hover:text-[#5A4A42] transition-colors font-sans tracking-wider">{BRIDE.instagram}</a>
                </ScrollReveal>
            </div>
      </div>
    </section>
  );
};

export default Profiles;
