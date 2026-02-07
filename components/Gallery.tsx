
import React from 'react';
import ScrollReveal from './ScrollReveal';

interface Photo {
  src: string;
  label: string;
}

interface GalleryProps {
  onPhotoClick: (photo: Photo) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onPhotoClick }) => {
  const photos: Photo[] = [
    {
      src: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:cfc297c8ff2baa99c05e48256a9916b4/directUpload/baru-2.jpeg',
      label: 'Moments of Grace'
    },
    {
      src: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:45dbb839c1229e0f090b6f343c7c6718/directUpload/baru-1.jpeg',
      label: 'Eternal Promise'
    },
    {
      src: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:08b911f5f8a4b3423ca8cf192847f5d2/directUpload/baru-4.jpeg',
      label: 'Serenity'
    },
    {
      src: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:f8ec528df805d0eecaa65f206340c8e8/directUpload/baru-3.jpeg',
      label: 'Pure Joy'
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="gallery">
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
       
       <div className="max-w-xl mx-auto relative z-10">
          <ScrollReveal animation="fade-up">
              <div className="text-center mb-16">
                  <span className="font-sans text-[9px] uppercase tracking-[0.6em] text-[#A89F91] font-bold block mb-4">The Collection</span>
                  <h2 className="font-display italic text-4xl text-[#5A4A42] tracking-tight">Gallery of Love</h2>
                  <div className="flex items-center justify-center gap-4 mt-6">
                      <div className="w-12 h-[0.5px] bg-[#E6E2D6]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A89F91]/30"></div>
                      <div className="w-12 h-[0.5px] bg-[#E6E2D6]"></div>
                  </div>
              </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12">
              {photos.map((photo, idx) => (
                  <ScrollReveal 
                    key={idx} 
                    animation={idx % 2 === 0 ? "slide-right" : "slide-left"} 
                    delay={0.1 * idx}
                    duration={1.8}
                    className={`relative ${idx % 2 !== 0 ? 'mt-12' : ''}`}
                  >
                      <div 
                        className="group relative cursor-pointer active:scale-95 transition-transform duration-300"
                        onClick={() => onPhotoClick(photo)}
                      >
                          <div className="aspect-[2/3] w-full overflow-hidden rounded-t-[5rem] rounded-b-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-[6px] border-white relative z-10 transition-all duration-700 hover:shadow-2xl">
                              <img 
                                src={photo.src} 
                                alt={photo.label} 
                                className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
                                 <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center text-white border border-white/30 scale-50 group-hover:scale-100 transition-transform duration-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                                 </div>
                              </div>
                          </div>
                          <div className={`absolute -inset-2 border border-[#A89F91]/20 rounded-t-[5rem] rounded-b-2xl -z-0 transition-transform duration-700 group-hover:translate-x-1 group-hover:translate-y-1 ${idx % 2 === 0 ? '-translate-x-1 -translate-y-1' : 'translate-x-1 -translate-y-1'}`}></div>
                      </div>
                  </ScrollReveal>
              ))}
          </div>

          <ScrollReveal animation="fade-up" delay={0.5}>
              <div className="mt-24 text-center">
                  <div className="inline-block relative">
                      <p className="font-script text-2xl text-[#A89F91] relative z-10">Capture every moment</p>
                      <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#E6E2D6]/40 -z-0 -rotate-1"></div>
                  </div>
              </div>
          </ScrollReveal>
       </div>
    </section>
  );
};

export default Gallery;
