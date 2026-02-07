
import React from 'react';
import { BRIDE, GROOM } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 bg-transparent text-center relative overflow-hidden">
      
      <div className="max-w-2xl mx-auto space-y-10 relative z-10">
        <div className="space-y-4">
          <p className="font-display italic text-3xl text-[#4A4A4A]">Terima Kasih</p>
          <p className="text-sm text-[#7D7D7D] font-serif max-w-xs mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
        </div>

        <div className="space-y-2">
          <p className="uppercase tracking-[0.3em] text-[10px] text-[#B08968] font-bold">Kami yang berbahagia</p>
          {/* Ikhsan & Nunung */}
          <h2 className="font-display italic text-3xl text-[#4A4A4A] tracking-tight">{GROOM.nickname} & {BRIDE.nickname}</h2>
        </div>

        <div className="pt-12 text-[9px] text-[#7D7D7D] uppercase tracking-[0.2em] opacity-60 font-sans">
          <p>&copy; 2025 Cream Matthiola Invitation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
