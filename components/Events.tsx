
import React from 'react';
import { EVENTS } from '../constants';
import ScrollReveal from './ScrollReveal';

const BotanicalCorner = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-20 h-20 pointer-events-none opacity-10 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" stroke="#5A4A42" strokeWidth="0.5" className="w-full h-full">
      <path d="M10,90 Q20,40 50,30 T90,10" />
      <path d="M15,85 Q25,50 45,40" />
      <circle cx="90" cy="10" r="1.5" fill="#5A4A42" />
      <circle cx="82" cy="18" r="1.2" fill="#5A4A42" />
      <circle cx="75" cy="25" r="1" fill="#5A4A42" />
    </svg>
  </div>
);

const Events: React.FC = () => {
  const generateCalendarLink = (event: typeof EVENTS[0]) => {
    const title = `The Wedding of Ikhsan & Nunung - ${event.type}`;
    const dateStr = "20260326";
    const startTime = event.type === 'Akad Nikah' ? "080000" : "090000";
    const endTime = "150000";
    const details = `Menghadiri acara ${event.type} Ikhsan & Nunung. Lokasi: ${event.address}`;
    const location = event.location;
    
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dateStr}T${startTime}Z/${dateStr}T${endTime}Z&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-transparent" id="event">
      <style>{`
        .paper-texture { background-image: url('https://www.transparenttextures.com/patterns/handmade-paper.png'); }
        .inner-border-event {
          position: absolute;
          inset: 15px;
          border: 0.5px solid rgba(90, 74, 66, 0.15);
          pointer-events: none;
          z-index: 5;
        }
        .event-card-container {
          perspective: 1000px;
        }
        .event-card {
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        .event-card:hover {
          transform: translateY(-10px) rotateX(2deg) rotateY(1deg);
          box-shadow: 0 30px 60px rgba(90, 74, 66, 0.15);
        }
        .shimmer-sweep {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-25deg);
          transition: 0.75s;
          pointer-events: none;
        }
        .event-card:hover .shimmer-sweep {
          left: 150%;
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float-icon {
          animation: float-icon 3s ease-in-out infinite;
        }
      `}</style>

      <ScrollReveal animation="blur-in" duration={1.5}>
          <div className="flex justify-center mb-20 relative z-10">
              <div className="bg-white/50 backdrop-blur-md px-10 py-8 shadow-xl border border-white/50 relative group text-center max-w-[320px] w-full rounded-2xl paper-texture overflow-hidden hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-2 border border-[#A89F91]/20 rounded-xl pointer-events-none"></div>
                  <h2 className="font-display text-[2.4rem] text-[#5A4A42] leading-tight mb-3">Acara Spesial</h2>
                  <div className="flex items-center justify-center gap-3">
                      <div className="h-[0.5px] w-4 bg-[#A89F91]/40"></div>
                      <p className="font-sans text-[10px] text-[#A89F91] tracking-[0.5em] uppercase font-medium">Save The Date</p>
                      <div className="h-[0.5px] w-4 bg-[#A89F91]/40"></div>
                  </div>
              </div>
          </div>
      </ScrollReveal>

      <div className="space-y-16 max-w-md mx-auto relative z-10">
          {EVENTS.map((event, idx) => (
              <ScrollReveal key={idx} animation={idx % 2 === 0 ? "slide-right" : "slide-left"} delay={0.2} duration={1.5}>
                  <div className="event-card-container">
                    <div className="event-card bg-white/60 backdrop-blur-md border border-white/70 rounded-[3rem] p-10 text-center shadow-lg relative group paper-texture overflow-hidden">
                        <div className="shimmer-sweep"></div>
                        <div className="inner-border-event rounded-[2.5rem]"></div>
                        <BotanicalCorner className="top-2 left-2" />
                        <BotanicalCorner className="bottom-2 right-2 rotate-180" />

                        <div className="relative z-10">
                            <div className="mb-6 flex justify-center">
                                <div className="w-12 h-12 rounded-full bg-[#E6E2D6]/40 flex items-center justify-center animate-float-icon">
                                    <svg className="w-6 h-6 text-[#5A4A42] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                            </div>

                            <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#A89F91] font-bold mb-4 block group-hover:tracking-[0.5em] transition-all duration-700">Bagian {idx + 1}</span>
                            <h3 className="font-display italic text-4xl text-[#5A4A42] mb-8 group-hover:scale-105 transition-transform duration-700">{event.type}</h3>
                            
                            <div className="space-y-6 mb-10">
                                 <div className="relative inline-block px-8 py-3 group/date">
                                      <div className="absolute inset-x-0 top-0 h-[0.5px] bg-[#E6E2D6]/60 scale-x-0 group-hover/date:scale-x-100 transition-transform duration-700"></div>
                                      <div className="absolute inset-x-0 bottom-0 h-[0.5px] bg-[#E6E2D6]/60 scale-x-0 group-hover/date:scale-x-100 transition-transform duration-700"></div>
                                      <div className="absolute inset-0 border-t border-b border-[#E6E2D6]/60"></div>
                                      <p className="font-serif text-xl font-bold text-[#5A4A42]">{event.date}</p>
                                 </div>
                                 
                                 <div className="space-y-1 transform transition-transform duration-700 group-hover:translate-y-[-2px]">
                                      <p className="text-sm font-sans uppercase tracking-widest text-[#A89F91] font-semibold">{event.time}</p>
                                      <p className="text-lg font-serif italic text-[#5A4A42]">{event.location}</p>
                                 </div>

                                 <p className="text-xs text-[#7D7D7D] px-6 leading-relaxed italic font-serif opacity-80 group-hover:opacity-100 transition-opacity duration-700">{event.address}</p>
                            </div>

                            <div className="flex flex-col gap-4 mb-8">
                               <a 
                                  href={generateCalendarLink(event)} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="inline-flex items-center justify-center gap-3 bg-white/70 border border-white text-[#5A4A42] px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all shadow-sm hover:shadow-md hover:bg-white active:scale-95"
                               >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                  Simpan ke Kalender
                               </a>
                            </div>

                            <div className="w-full h-52 rounded-[2rem] overflow-hidden border border-white/50 shadow-inner mb-8 relative group/map">
                              <iframe 
                                  width="100%" 
                                  height="100%" 
                                  frameBorder="0" 
                                  scrolling="no" 
                                  src={event.mapEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                  title="Map Preview"
                                  className="filter grayscale-[30%] opacity-90 transition-all duration-1000 group-hover/map:grayscale-0 group-hover/map:scale-110"
                                  loading="lazy"
                              ></iframe>
                              <div className="absolute inset-0 bg-black/5 group-hover/map:bg-transparent transition-colors duration-700 pointer-events-none"></div>
                            </div>

                            <a 
                              href={event.mapUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-3 bg-[#5A4A42] text-white px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#3E332E] hover:tracking-[0.4em] transition-all duration-500 shadow-xl active:scale-95"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                Buka Google Maps
                            </a>
                        </div>
                    </div>
                  </div>
              </ScrollReveal>
          ))}
      </div>
    </section>
  );
};

export default Events;
