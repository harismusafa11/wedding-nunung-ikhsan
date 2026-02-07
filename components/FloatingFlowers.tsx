
import React, { useMemo } from 'react';

const FloatingFlowers: React.FC = () => {
  // Menghasilkan data kelopak bunga secara acak sekali saja saat render pertama
  const petals = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 15}px`,
      duration: `${Math.random() * 10 + 15}s`,
      delay: `${Math.random() * 10}s`,
      opacity: Math.random() * 0.4 + 0.2,
      rotation: `${Math.random() * 360}deg`,
      type: Math.floor(Math.random() * 3), // 3 jenis kelopak berbeda
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, 20vh) rotate(90deg); }
          50% { transform: translate(-15px, 45vh) rotate(180deg); }
          75% { transform: translate(20px, 70vh) rotate(270deg); }
          100% { transform: translate(0, 100vh) rotate(360deg); }
        }
        .petal {
          position: absolute;
          filter: blur(0.5px);
        }
      `}</style>
      
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            top: '-50px',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `drift ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotation})`,
          }}
        >
          {p.type === 0 && (
            <svg viewBox="0 0 24 24" fill="#A89F91" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 15 7 15 11C15 15 12 18 12 18C12 18 9 15 9 11C9 7 12 2 12 2Z" />
            </svg>
          )}
          {p.type === 1 && (
            <svg viewBox="0 0 24 24" fill="#5A4A42" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 8 18 6 15C4 12 4 10 4 8C4 6 5 4 7 4C9 4 11 6 12 8C13 6 15 4 17 4C19 4 20 6 20 8C20 10 20 12 18 15C16 18 12 21 12 21Z" />
            </svg>
          )}
          {p.type === 2 && (
            <svg viewBox="0 0 24 24" fill="#E6E2D6" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.5 9H21L15.5 13L18 20L12 15L6 20L8.5 13L3 9H9.5L12 2Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingFlowers;
