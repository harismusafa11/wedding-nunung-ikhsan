
import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Profiles from './components/Profiles';
import Events from './components/Events';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Gifts from './components/Gifts';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';
import FloatingFlowers from './components/FloatingFlowers';
import { BRIDE, GROOM, COUPLE_PHOTO } from './constants';

const TRANSITION_VIDEO_URL = "https://ml5dafx6yq9i.i.optimole.com/files/id:097ca3bf35be820f0ca1402b8c03a0b0/directUpload/grok-video-63c899ea-63f0-4384-a788-deda8ebb02fc.mp4";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<null | {src: string, label: string}>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return Math.min(oldProgress + Math.random() * 25, 100);
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('to');
    if (guest) setGuestName(guest);
  }, []);

  const handleOpenInvitation = () => {
    setIsTransitioning(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; 
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setTimeout(() => {
          setIsOpen(true);
          window.scrollTo(0, 0);
        }, 1200);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 2200);
      }).catch(() => {
        setIsOpen(true);
        setIsTransitioning(false);
      });
    } else {
      setIsOpen(true);
      setIsTransitioning(false);
    }
  };

  return (
    <div className="mobile-frame">
        <style>{`
          .btn-luxury {
            position: relative;
            background: #5A4A42;
            color: #E6E2D6;
            padding: 1.1rem 3.2rem;
            border-radius: 999px;
            text-transform: uppercase;
            letter-spacing: 0.4em;
            font-weight: 700;
            font-size: 10px;
            box-shadow: 0 10px 30px rgba(90, 74, 66, 0.4);
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.1);
          }
          .btn-luxury::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            transform: rotate(45deg);
            animation: shimmer 3s infinite;
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
          }
          .btn-luxury:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 40px rgba(90, 74, 66, 0.5);
            background: #4A3A32;
          }
          .btn-glow {
            position: absolute;
            inset: -4px;
            border-radius: 999px;
            background: linear-gradient(90deg, #A89F91, #E6E2D6, #A89F91);
            z-index: -1;
            opacity: 0.3;
            filter: blur(8px);
            animation: pulse-glow 2s infinite;
          }
          @keyframes pulse-glow {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.05); opacity: 0.4; }
          }
          .dust-particle {
            position: absolute;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.3;
            filter: blur(1px);
          }
          @keyframes float-particle {
            0% { transform: translate(0, 0); opacity: 0; }
            20% { opacity: 0.4; }
            80% { opacity: 0.4; }
            100% { transform: translate(100px, -100vh); opacity: 0; }
          }
          .light-leak-cover {
            position: absolute;
            width: 150%;
            height: 150%;
            background: radial-gradient(circle at center, rgba(150, 123, 182, 0.1) 0%, transparent 70%);
            filter: blur(80px);
            pointer-events: none;
            mix-blend-mode: screen;
            animation: leak-move 15s infinite alternate;
          }
          @keyframes leak-move {
            0% { transform: translate(-10%, -10%) scale(1); }
            100% { transform: translate(10%, 10%) scale(1.1); }
          }
          @keyframes photo-shimmer {
            0% { transform: translateX(-150%) skewX(-25deg); }
            100% { transform: translateX(150%) skewX(-25deg); }
          }
          .photo-shimmer-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 40%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: photo-shimmer 4s infinite ease-in-out;
            pointer-events: none;
            z-index: 20;
          }
          @keyframes photo-breathe-slow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-photo-breathe {
            animation: photo-breathe-slow 10s ease-in-out infinite;
          }
        `}</style>

        {isOpen && <FloatingFlowers />}
        
        <div className={`fixed inset-0 z-[1000] transition-opacity duration-500 pointer-events-none w-full max-w-[430px] mx-auto overflow-hidden bg-black/5 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
            <video
              ref={videoRef}
              src={TRANSITION_VIDEO_URL}
              className="w-full h-full object-cover"
              playsInline
              muted
              preload="auto"
            />
        </div>

        {/* LOADING SCREEN */}
        {isLoading && (
          <div className="fixed inset-0 z-[1100] bg-[#FDFBF7] flex flex-col items-center justify-center w-full max-w-[430px] mx-auto">
             <div className="relative z-10 flex flex-col items-center gap-8 text-center px-8">
                <h2 className="font-display italic text-5xl text-[#5A4A42] animate-float-gentle">I & N</h2>
                <div className="w-48 h-[1px] bg-[#E6E2D6] relative overflow-hidden rounded-full">
                  <div className="absolute inset-y-0 left-0 bg-[#A89F91] transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#A89F91] opacity-70">Memuat {Math.round(progress)}%</p>
             </div>
          </div>
        )}

        <MusicPlayer autoPlay={isOpen} />
        
        {/* COVER PAGE */}
        {!isOpen && (
          <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center text-center transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100'} w-full max-w-[430px] mx-auto overflow-hidden bg-transparent`}>
              
              {/* LAYER 1: Deep Background */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:e391cbafd7785bc8e124e5239e57ed26/directUpload/image-4.jpg')" }}
              ></div>

              {/* LAYER 2: Light Leak Cover */}
              <div className="light-leak-cover z-[1]"></div>
              <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-100/10 blur-[100px] rounded-full z-[1]"></div>

              {/* LAYER 3: Dust Particles */}
              <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="dust-particle" 
                    style={{
                      width: Math.random() * 4 + 2 + 'px',
                      height: Math.random() * 4 + 2 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + 100 + '%',
                      animation: `float-particle ${Math.random() * 10 + 10}s linear infinite`,
                      animationDelay: `-${Math.random() * 20}s`
                    }}
                  />
                ))}
              </div>

              {/* LAYER 4: Foreground Content */}
              <div className="relative z-10 px-6 w-full h-full flex flex-col justify-between py-[10vh]">
                  <div className="flex flex-col items-center gap-6 md:gap-8">
                      {/* Photo Arch with Enhanced Luxury Effects */}
                      <div className="relative w-[45vw] max-w-[200px] aspect-[4/5] animate-float-gentle group">
                          {/* 1. Outer Glow Arch */}
                          <div className="absolute -inset-6 bg-white/10 blur-3xl rounded-full scale-110 pointer-events-none"></div>
                          
                          {/* 2. Glass Frame Border */}
                          <div className="absolute -inset-1 border border-white/40 rounded-t-full rounded-b-[3.5rem] pointer-events-none z-20"></div>
                          
                          {/* 3. Main Arched Container */}
                          <div className="absolute inset-0 rounded-t-full rounded-b-[3rem] overflow-hidden bg-white shadow-[0_30px_70px_rgba(0,0,0,0.18)] border-[6px] border-white z-10 ring-1 ring-black/5">
                               
                               {/* Shimmering Light Sweep */}
                               <div className="photo-shimmer-effect"></div>
                               
                               <div className="w-full h-full rounded-t-full rounded-b-[2.2rem] overflow-hidden relative">
                                  {/* 4. The Photo with slow breathing animation */}
                                  <img 
                                    src={COUPLE_PHOTO} 
                                    className="w-full h-full object-cover animate-photo-breathe" 
                                    alt="Couple" 
                                  />
                                  
                                  {/* Soft Vignette and Inner Gradient */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"></div>
                                  
                                  {/* 5. Inner Hairline Gold Border */}
                                  <div className="absolute inset-2 border-[0.5px] border-white/30 rounded-t-full rounded-b-[2rem] pointer-events-none"></div>
                               </div>
                          </div>
                      </div>

                      <div className="space-y-3 mt-4">
                           <p className="font-sans text-[9px] tracking-[0.6em] text-[#A89F91] uppercase font-bold opacity-80">The Wedding of</p>
                           <h1 className="font-display italic text-[clamp(2.2rem,11vw,3rem)] text-[#5A4A42] leading-tight drop-shadow-sm">{GROOM.nickname} & {BRIDE.nickname}</h1>
                      </div>
                  </div>

                  <div className="w-full flex flex-col items-center gap-8 md:gap-12">
                       <div className="bg-white/75 backdrop-blur-xl px-6 py-8 md:px-8 md:py-10 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-white/80 w-full max-w-[280px] md:max-w-[300px] relative overflow-hidden group">
                          <div className="absolute inset-2 md:inset-3 border border-[#A89F91]/10 rounded-[2.2rem] md:rounded-[2.5rem] pointer-events-none"></div>
                          
                          <div className="space-y-3 md:space-y-4 relative z-10">
                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-[#A89F91] font-bold block opacity-60">Kepada Yth.</span>
                            <div className="w-6 h-[0.5px] bg-[#A89F91]/30 mx-auto"></div>
                            <h3 className="font-serif text-[1.4rem] md:text-[1.6rem] font-bold text-[#5A4A42] tracking-widest capitalize line-clamp-2">{guestName}</h3>
                          </div>
                       </div>
                       
                       <div className="relative group">
                          <div className="btn-glow"></div>
                          <button onClick={handleOpenInvitation} disabled={isTransitioning} className="btn-luxury scale-90 md:scale-100">
                            {isTransitioning ? 'Membuka...' : 'Buka Undangan'}
                          </button>
                       </div>
                  </div>
              </div>

              {/* LAYER 5: Decorative Overlay */}
              <div className="absolute top-10 right-0 w-24 h-24 opacity-10 z-[15] pointer-events-none">
                  <svg viewBox="0 0 100 100" fill="none" stroke="#5A4A42" strokeWidth="0.5" className="w-full h-full rotate-90">
                    <path d="M10,90 Q50,40 90,10" />
                    <circle cx="90" cy="10" r="2" fill="#5A4A42" />
                  </svg>
              </div>
          </div>
        )}

        {isOpen && (
          <div className="content-scroller transition-opacity duration-1000 opacity-100">
              <div id="home"><Hero /></div>
              {/* Fix: Component name 'intro' changed to 'Intro' for proper JSX rendering */}
              <Intro guestName={guestName} />
              <div id="couple"><Profiles /></div>
              <div id="event"><Events /></div>
              <div id="gallery"><Gallery onPhotoClick={setSelectedGalleryPhoto} /></div>
              <div id="rsvp"><RSVP /></div>
              <div id="gifts"><Gifts /></div>
              <Footer />
          </div>
        )}

        {selectedGalleryPhoto && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 w-full max-w-[430px] mx-auto" onClick={() => setSelectedGalleryPhoto(null)}>
             <div className="absolute inset-0 bg-[#5A4A42]/95 backdrop-blur-xl"></div>
             <div className="relative z-[2010] max-w-full max-h-full flex flex-col items-center">
                <button onClick={() => setSelectedGalleryPhoto(null)} className="absolute -top-12 right-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
                <div className="bg-white p-1 rounded-2xl shadow-2xl overflow-hidden">
                   <img src={selectedGalleryPhoto.src} className="max-w-[85vw] max-h-[70vh] object-contain rounded-lg" alt="Gallery" />
                </div>
             </div>
          </div>
        )}

        {isOpen && !isLoading && <Navigation />}
    </div>
  );
};

export default App;
