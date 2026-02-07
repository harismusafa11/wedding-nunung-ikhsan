
import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [activeId, setActiveId] = useState('home');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 20;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const sectionIds = ['home', 'couple', 'event', 'gallery', 'rsvp', 'gifts'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/> },
    { id: 'couple', label: 'Mempelai', icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/> },
    { id: 'event', label: 'Acara', icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/> },
    { id: 'gallery', label: 'Galeri', icon: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/> },
    { id: 'rsvp', label: 'RSVP', icon: <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/> },
    { id: 'gifts', label: 'Kado', icon: <path d="M20 12V8H4v4m16 0c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m16 0v7c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-7m1-5h14V5c0-1.1-.9-2-2-2h-3.09c-.21-1.15-1.22-2-2.41-2s-2.2.85-2.41 2H6c-1.1 0-2 .9-2 2v2z"/> }
  ];

  return (
    <div className="nav-fixed w-full max-w-[430px] px-4 pointer-events-none">
        <div className="bg-[#5A4A42]/90 backdrop-blur-xl rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.2)] py-2.5 px-3 flex justify-between items-center pointer-events-auto mx-auto border border-white/15 relative overflow-hidden">
            {navItems.map(item => {
                const isActive = activeId === item.id;
                return (
                  <button 
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`flex flex-col items-center gap-0.5 transition-all duration-500 relative px-2 py-1 rounded-2xl ${isActive ? 'text-white' : 'text-[#E6E2D6]/60 hover:text-[#E6E2D6]'}`}
                  >
                      <div className={`p-1.5 rounded-full transition-all duration-500 ${isActive ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'group-hover:bg-white/10'}`}>
                        <svg className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={isActive ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
                            {item.icon}
                        </svg>
                      </div>
                      <span className={`text-[7px] uppercase tracking-[0.15em] font-bold transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 h-auto mt-0.5' : 'opacity-0 -translate-y-1 h-0 overflow-hidden'}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                      )}
                  </button>
                );
            })}
        </div>
    </div>
  );
};

export default Navigation;
