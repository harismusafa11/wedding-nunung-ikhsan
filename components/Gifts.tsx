
import React from 'react';
import ScrollReveal from './ScrollReveal';

interface BankCardProps {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoType: 'BCA' | 'CIMB';
}

const BankCard: React.FC<BankCardProps> = ({ bankName, accountNumber, accountHolder, logoType }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening berhasil disalin!');
  };

  return (
    <div className="relative w-full max-w-[340px] aspect-[1.586/1] rounded-2xl p-6 shadow-2xl overflow-hidden transition-all duration-700 mx-auto group border border-white/20">
      {/* Metallic Background with Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D1D1D1] via-[#FDFDFD] to-[#A9A9A9] z-0"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] z-0"></div>
      
      {/* Decorative Shine Overlay */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/30 to-transparent rotate-45 pointer-events-none group-hover:translate-x-1/4 transition-transform duration-1000"></div>

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between text-left">
        <div className="flex justify-between items-center h-8">
          <span className="font-mono text-sm md:text-base font-bold tracking-tight text-[#444] uppercase">{bankName}</span>
          
          {logoType === 'BCA' && (
            <div className="bg-[#003594] px-2.5 py-1 rounded shadow-sm">
               <span className="text-white font-black italic text-xs md:text-sm">BCA</span>
            </div>
          )}
          {logoType === 'CIMB' && (
            <div className="bg-[#ED1C24] px-2 py-1 rounded shadow-sm flex items-center gap-1.5">
               <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#ED1C24] rotate-45"></div>
               </div>
               <span className="text-white font-bold text-[9px] tracking-tight leading-none">CIMB NIAGA</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Chip EMV Simulation */}
          <div className="w-12 h-9 bg-gradient-to-br from-[#F3D066] via-[#E4A52E] to-[#B8860B] rounded-md border border-black/10 relative overflow-hidden shadow-inner">
             <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                <div className="border border-black/20"></div><div className="border border-black/20"></div><div className="border border-black/20"></div>
             </div>
          </div>

          <div className="space-y-3">
             <p className="font-mono text-xl md:text-2xl font-bold tracking-[0.05em] text-[#222] select-all leading-none">
                {accountNumber.replace(/(\d{4})/g, '$1 ').trim()}
             </p>
             
             <button 
                onClick={() => copyToClipboard(accountNumber)}
                className="inline-flex items-center gap-1.5 bg-[#5A4A42]/80 hover:bg-[#5A4A42] text-white px-4 py-2 rounded-xl text-[10px] font-bold transition-all shadow-sm active:scale-95"
             >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                Salin Nomor Rekening
             </button>
          </div>
        </div>

        <div className="pt-2 border-t border-black/5">
           <p className="font-mono text-xs tracking-widest text-[#333] font-bold uppercase truncate">
             {accountHolder}
           </p>
        </div>
      </div>
    </div>
  );
};

const Gifts: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden" id="gifts">
      <div className="max-w-xl mx-auto text-center space-y-16">
        <ScrollReveal animation="fade-up">
            <div className="space-y-4">
              <h2 className="font-serif text-4xl text-[#5A4A42]">Wedding Gift</h2>
              <div className="w-12 h-[1px] bg-[#A89F91] mx-auto"></div>
              <p className="text-[#7D7D7D] italic font-serif text-sm max-w-xs mx-auto leading-relaxed">
                Tanda kasih dan doa restu Anda dapat dikirimkan melalui rekening di bawah ini:
              </p>
            </div>
        </ScrollReveal>

        <div className="space-y-12">
          {/* Kartu Nunung - Muncul dari Kiri ke Kanan */}
          <div className="w-full">
            <ScrollReveal animation="slide-left" delay={0.2} duration={1.5}>
                <div className="space-y-4">
                    <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#A89F91] font-bold">Rekening Mempelai Wanita</p>
                    <BankCard 
                      bankName="BANK BCA" 
                      accountNumber="3560497902" 
                      accountHolder="NUNUNG SETIANI" 
                      logoType="BCA" 
                    />
                </div>
            </ScrollReveal>
          </div>

          {/* Kartu Ikhsan - Muncul dari Kanan ke Kiri */}
          <div className="w-full">
            <ScrollReveal animation="slide-right" delay={0.4} duration={1.5}>
                <div className="space-y-4">
                    <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#A89F91] font-bold">Rekening Mempelai Pria</p>
                    <BankCard 
                      bankName="BANK CIMB NIAGA" 
                      accountNumber="708137111300" 
                      accountHolder="ROHMAT NUR IKHSAN" 
                      logoType="CIMB" 
                    />
                </div>
            </ScrollReveal>
          </div>
        </div>
        
        <ScrollReveal animation="fade-up" delay={0.6}>
            <div className="pt-12 opacity-40 flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#5A4A42]/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#5A4A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 16v2m3-6v6m3-8v8m9-10a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-[9px] font-sans uppercase tracking-[0.4em] text-[#5A4A42] font-bold">Terima Kasih Atas Doa Restunya</p>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Gifts;
