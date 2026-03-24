import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const Loading = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to('.loading-dot', {
      scale: 1.5,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    }).to('.loading-dot', {
      scale: 1,
      opacity: 0.3,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.in',
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

       <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter uppercase text-white drop-shadow-[0_0_15px_rgba(255,94,0,0.4)]">INITIALIZING.</h2>

       <div className="flex gap-4">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`loading-dot w-3 h-3 rounded-full bg-accent opacity-30 shadow-[0_0_15px_rgba(255,94,0,0.6)]`}
            ></div>
          ))}
       </div>

       <p className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 animate-pulse">Establishing Signal...</p>
    </div>
  );
};

export default Loading;
