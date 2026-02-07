
import React, { useState, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

interface IntroProps {
  guestName: string;
}

const BotanicalCorner = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-24 h-24 pointer-events-none opacity-15 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" stroke="#5A4A42" strokeWidth="0.5" className="w-full h-full">
      <path d="M10,90 Q20,40 50,30 T90,10" />
      <path d="M15,85 Q25,50 45,40" />
      <circle cx="90" cy="10" r="1.5" fill="#5A4A42" />
      <circle cx="82" cy="18" r="1.2" fill="#5A4A42" />
      <circle cx="75" cy="25" r="1" fill="#5A4A42" />
      <circle cx="68" cy="33" r="1.2" fill="#5A4A42" />
    </svg>
  </div>
);

const Intro: React.FC<IntroProps> = ({ guestName }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="py-24 px-6 flex flex-col items-center justify-center relative bg-transparent">
      <style>{`
        .parallax-container { perspective: 1000px; }
        .parallax-card { transition: transform 0.1s ease-out; transform-style: preserve-3d; }
        .paper-texture { 
          background-image: url('https://www.transparenttextures.com/patterns/handmade-paper.png');
        }
        .inner-border {
          position: absolute;
          inset: 12px;
          border: 0.5px solid rgba(150, 123, 182, 0.2);
          pointer-events: none;
          z-index: 5;
        }
      `}</style>

      <div className="max-w-md w-full text-center space-y-20 relative z-10">
        {/* Kartu Ayat Quran */}
        <ScrollReveal animation="blur-in" delay={0.1} duration={2}>
            <div className="relative group">
                <div className="absolute -inset-2 border border-[#967BB6]/20 rounded-t-[140px] rounded-b-3xl -z-10 transform translate-y-2"></div>
                <div className="bg-white/70 backdrop-blur-xl p-10 md:p-12 rounded-t-[140px] rounded-b-3xl shadow-[0_25px_60px_rgba(150,123,182,0.1)] border border-white/60 relative overflow-hidden paper-texture">
                    <div className="inner-border rounded-t-[130px] rounded-b-2xl"></div>
                    <BotanicalCorner className="top-2 right-2 rotate-90" />
                    <BotanicalCorner className="bottom-2 left-2 -rotate-90" />
                    
                    <div className="relative z-10">
                        <p className="font-serif text-[22px] md:text-2xl text-[#4B3F52] leading-[2.2] mb-8 font-normal tracking-wide">
                          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
                        </p>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-12 h-[0.5px] bg-[#967BB6]/40"></div>
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#967BB6]/60"></div>
                            <div className="w-12 h-[0.5px] bg-[#967BB6]/40"></div>
                        </div>
                        <p className="text-sm md:text-base font-serif italic text-[#6D6D6D] mb-10 leading-relaxed px-4">
                          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
                        </p>
                        <div className="inline-block relative">
                            <p className="font-sans font-bold text-[#967BB6] text-[9px] uppercase tracking-[0.5em] px-8 py-2 bg-white/50 rounded-full border border-[#967BB6]/20">QS. Ar-Rum: 21</p>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollReveal>

        {/* Kartu Sambutan Tamu - Statis */}
        <ScrollReveal animation="fade-up" delay={0.5}>
          <div className="parallax-container w-full">
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="parallax-card bg-white/50 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl border border-white/60 relative overflow-hidden group cursor-default paper-texture"
              style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
            >
              <div className="inner-border rounded-[2rem]"></div>
              <BotanicalCorner className="top-2 left-2" />
              <BotanicalCorner className="bottom-2 right-2 rotate-180" />

              <div className="relative z-10">
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#A89F91] font-bold block mb-6">Pesan Spesial Untuk</span>
                <h2 className="font-display italic text-3xl text-[#5A4A42] mb-8">{guestName}</h2>
                
                <div className="relative flex items-center justify-center">
                    <p className="font-serif italic text-lg text-[#6D6D6D] leading-relaxed">
                      "Kehadiran Anda adalah kado terindah bagi kami. Doa restu Anda adalah restu yang paling berarti dalam melangkah ke jenjang kehidupan yang baru."
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-[#E6E2D6]/40">
                  <p className="font-script text-2xl text-[#967BB6]">Ikhsan & Nunung</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Intro;
