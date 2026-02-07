
import React, { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
  autoPlay?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state with autoPlay prop when invitation opens
  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [autoPlay]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-[70] pointer-events-none">
      <div className="flex justify-end pointer-events-auto">
        <button 
          onClick={togglePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg border border-white/40 backdrop-blur-md ${isPlaying ? 'bg-[#5A4A42] text-white animate-spin-slow scale-110' : 'bg-white/80 text-[#5A4A42] opacity-80'}`}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          <audio 
            ref={audioRef} 
            loop 
            src="https://ml5dafx6yq9i.i.optimole.com/files/id:b5f40ab0b601e9c421c5663b530b6686/directUpload/Terbuang-Dalam-Waktu-OST-Film-SORE-Romantic-Saxophone-Cover-by-Desmond-Amos.mp3" 
          />
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            {!isPlaying && (
              <rect x="4" y="11" width="16" height="2" rx="1" transform="rotate(45 12 12)" className="fill-red-500/80" />
            )}
          </svg>
        </button>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
