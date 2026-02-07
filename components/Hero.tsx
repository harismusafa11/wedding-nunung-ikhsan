
import React, { useState, useEffect } from 'react';
import { BRIDE, GROOM, WEDDING_DATE, HERO_PHOTO } from '../constants';
import ScrollReveal from './ScrollReveal';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const CountdownUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span 
          key={value} 
          className="text-4xl md:text-5xl font-display font-light text-[#5A4A42] animate-number-pop block leading-none"
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[7px] md:text-[8px] uppercase tracking-[0.5em] text-[#A89F91] font-bold mt-3 -mr-[0.5em] text-center">{label}</span>
    </div>
  );

  return (
    <section className="relative min-h-[110vh] flex flex-col items-center pt-16 pb-20 overflow-hidden px-4 bg-transparent">
      <style>{`
        @keyframes number-pop {
          0% { transform: scale(0.9); opacity: 0; filter: blur(4px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0px); }
        }
        @keyframes pulse-light {
          0%, 100% { opacity: 0.15; transform: scale(1) translate(0, 0); }
          50% { opacity: 0.3; transform: scale(1.1) translate(10px, -10px); }
        }
        @keyframes photo-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          20% { opacity: 0.5; }
          40% { transform: translateX(150%) skewX(-20deg); opacity: 0; }
          100% { transform: translateX(150%) skewX(-20deg); opacity: 0; }
        }
        @keyframes border-trace {
          0% { border-color: rgba(168, 159, 145, 0.2); }
          50% { border-color: rgba(168, 159, 145, 0.6); }
          100% { border-color: rgba(168, 159, 145, 0.2); }
        }
        .animate-number-pop { animation: number-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .light-leak {
          background: radial-gradient(circle at center, #FFD700 0%, #967BB6 40%, transparent 70%);
          filter: blur(60px);
          animation: pulse-light 12s ease-in-out infinite;
        }
        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer-sweep 6s infinite ease-in-out;
          pointer-events: none;
          z-index: 15;
        }
        .parallax-bg { transform: translateY(${scrollY * 0.2}px); }
        .parallax-fg { transform: translateY(${scrollY * -0.1}px); }
        .hairline-sep {
          width: 0.5px;
          height: 32px;
          background-color: rgba(168, 159, 145, 0.3);
          margin-bottom: 12px;
        }
        .photo-arch-main {
           animation: photo-breathe 8s ease-in-out infinite;
        }
      `}</style>

      {/* LAYER 1: Background Initials */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] overflow-hidden select-none parallax-bg">
        <h1 className="font-display italic text-[35rem] leading-none whitespace-nowrap text-[#5A4A42]">I & N</h1>
      </div>

      {/* LAYER 2: Light Leak Effect */}
      <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] light-leak z-10 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[100vw] h-[100vw] light-leak z-10 pointer-events-none opacity-10" style={{ animationDelay: '-5s' }}></div>

      {/* LAYER 3: Main Content */}
      <div className="w-full text-center space-y-6 md:space-y-8 relative z-20 flex flex-col items-center">
         <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#A89F91] font-bold">The Wedding Celebration of</p>
         </ScrollReveal>
         
         <div className="relative py-1 w-full px-2">
             <div className="space-y-0">
                <ScrollReveal animation="blur-in" delay={0.4} duration={1.5}>
                    <h1 className="font-display italic font-normal text-[clamp(3.5rem,15vw,4.5rem)] leading-[1.1] text-[#5A4A42] tracking-tight">{GROOM.nickname}</h1>
                </ScrollReveal>
                
                <ScrollReveal animation="fade-in" delay={0.8} duration={2}>
                    <div className="font-script text-4xl md:text-5xl text-[#A89F91] -my-2 md:-my-3 opacity-90 drop-shadow-sm">&</div>
                </ScrollReveal>
                
                <ScrollReveal animation="blur-in" delay={1.1} duration={1.5}>
                    <h1 className="font-display italic font-normal text-[clamp(3.5rem,15vw,4.5rem)] leading-[1.1] text-[#5A4A42] tracking-tight">{BRIDE.nickname}</h1>
                </ScrollReveal>
             </div>
         </div>

         {/* Enhanced Hero Photo with Frame and Effects */}
         <ScrollReveal animation="zoom-in" delay={0.5} duration={1.8}>
             <div className="relative mx-auto w-[min(70vw,260px)] aspect-[4/5] my-4 group">
                
                {/* 1. Outer Glowing Arch */}
                <div className="absolute -inset-6 border border-[#A89F91]/20 rounded-t-full rounded-b-[3.5rem] pointer-events-none opacity-60 animate-[pulse_4s_ease-in-out_infinite]"></div>
                
                {/* 2. Soft Shadow Glow */}
                <div className="absolute inset-0 bg-[#A89F91]/15 rounded-t-full rounded-b-[2.5rem] blur-[40px] scale-110 pointer-events-none"></div>
                
                {/* 3. The Main Arched Frame */}
                <div className="absolute inset-0 bg-white p-1.5 rounded-t-full rounded-b-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.12)] z-10 overflow-hidden border border-white/80 ring-1 ring-black/5">
                    
                    {/* Shimmering sweeping light effect */}
                    <div className="shimmer-overlay"></div>

                    <div className="w-full h-full rounded-t-full rounded-b-[2rem] overflow-hidden bg-[#FDFBF7] relative">
                        {/* 4. The Photo with breathing zoom animation */}
                        <img 
                          src={HERO_PHOTO} 
                          className="w-full h-full object-cover photo-arch-main" 
                          alt="Couple" 
                        />
                        
                        {/* Soft Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5A4A42]/30 via-transparent to-transparent opacity-60"></div>
                        
                        {/* 5. Inner Glass Border */}
                        <div className="absolute inset-3 border border-white/30 rounded-t-full rounded-b-[1.8rem] pointer-events-none z-20"></div>
                    </div>
                </div>

                {/* 6. Decorative Floating Leaves behind bottom corner */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 opacity-30 z-0 select-none">
                    <svg viewBox="0 0 100 100" fill="none" stroke="#5A4A42" strokeWidth="1">
                        <path d="M10,90 Q30,50 90,10" />
                        <circle cx="90" cy="10" r="3" fill="#5A4A42" />
                        <path d="M30,70 L50,85" />
                        <path d="M50,50 L70,65" />
                    </svg>
                </div>
             </div>
         </ScrollReveal>

         {/* Elegant Date Block */}
         <ScrollReveal animation="fade-up" delay={1.0}>
             <div className="flex items-center justify-center gap-4 md:gap-8 mt-2">
                <div className="text-center">
                  <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#A89F91] font-bold mb-0.5">Kamis</p>
                  <p className="font-display text-lg text-[#5A4A42]">Maret</p>
                </div>
                <div className="text-4xl md:text-5xl font-display italic text-[#5A4A42] px-4 border-l border-r border-[#E6E2D6] leading-none py-1">26</div>
                <div className="text-center">
                  <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#A89F91] font-bold mb-0.5">Tahun</p>
                  <p className="font-display text-lg text-[#5A4A42]">2026</p>
                </div>
             </div>
         </ScrollReveal>

         {/* Editorial Countdown Timer */}
         <ScrollReveal animation="fade-up" delay={1.4}>
             <div className="mt-14 flex flex-col items-center w-full max-w-[400px]">
                <div className="relative flex items-end justify-center gap-4 md:gap-8 px-4 py-2">
                    <CountdownUnit value={timeLeft.days} label="Hari" />
                    <div className="hairline-sep"></div>
                    <CountdownUnit value={timeLeft.hours} label="Jam" />
                    <div className="hairline-sep"></div>
                    <CountdownUnit value={timeLeft.minutes} label="Menit" />
                    <div className="hairline-sep"></div>
                    <CountdownUnit value={timeLeft.seconds} label="Detik" />
                </div>
                
                <div className="mt-16 flex flex-col items-center gap-3 opacity-30">
                    <span className="text-[8px] uppercase tracking-[0.6em] text-[#5A4A42] font-bold">Gulir Perlahan</span>
                    <div className="relative w-4 h-7 border border-[#5A4A42]/40 rounded-full flex justify-center p-1">
                        <div className="w-0.5 h-1.5 bg-[#5A4A42] rounded-full animate-bounce"></div>
                    </div>
                </div>
             </div>
         </ScrollReveal>
      </div>

      {/* LAYER 4: Foreground Botanical Elements */}
      <div className="absolute top-20 left-0 w-32 h-32 opacity-15 pointer-events-none z-30 parallax-fg">
        <svg viewBox="0 0 100 100" fill="none" stroke="#5A4A42" strokeWidth="0.5" className="w-full h-full">
           <path d="M0,100 Q10,40 40,30 T100,0" />
           <path d="M5,95 Q15,50 35,40" />
           <circle cx="95" cy="5" r="1.5" fill="#5A4A42" />
        </svg>
      </div>
      <div className="absolute bottom-40 right-0 w-40 h-40 opacity-15 pointer-events-none z-30 parallax-fg rotate-180">
        <svg viewBox="0 0 100 100" fill="none" stroke="#5A4A42" strokeWidth="0.5" className="w-full h-full">
           <path d="M0,100 Q10,40 40,30 T100,0" />
           <path d="M5,95 Q15,50 35,40" />
           <circle cx="95" cy="5" r="1.5" fill="#5A4A42" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
