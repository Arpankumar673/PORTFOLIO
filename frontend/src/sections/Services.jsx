import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = ({ services = [] }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.service-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        }
      );
    });
  }, [services]);

  const getIcon = (name) => {
    const IconComponent = Icons[name] || Icons.ShieldCheck;
    return <IconComponent size={32} className="md:size-[40px]" />;
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 lg:py-48 relative overflow-hidden bg-background px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-tight text-white">
            Our <span className="text-accent underline underline-offset-8 decoration-8 drop-shadow-[0_0_20px_rgba(255,94,0,0.5)]">Services</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-white/30 uppercase tracking-[0.4em] italic font-black">Turning complex ideas into simple, powerful solutions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="service-card group glass-premium p-10 md:p-14 lg:p-16 border-white/5 bg-white/[0.02] hover:bg-accent/5 rounded-[3rem] transition-all duration-700 hover:-translate-y-4 hover:shadow-glow-orange-lg relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mb-10 md:mb-12 transition-all group-hover:scale-110 shadow-lg group-hover:rotate-[360deg] duration-1000">
                {getIcon(service.icon)}
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 md:mb-8 tracking-tighter uppercase italic group-hover:text-white transition-colors text-white">
                {service.title}
              </h3>

              <p className="text-base md:text-lg text-white/30 leading-relaxed font-bold italic group-hover:text-white/60 transition-colors">
                {service.description}
              </p>

              {/* Decorative Corner Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.03] -skew-x-[30deg] translate-x-16 -translate-y-16"></div>
            </div>
          ))}
          {services.length === 0 && <div className="col-span-full py-32 text-center text-white/10 font-black uppercase tracking-[1em] italic">Scanning for signals...</div>}
        </div>
      </div>
      <div className="glow-blob top-1/2 left-0 w-[40vw] h-[40vw] opacity-[0.03] pointer-events-none"></div>
    </section>
  );
};

export default Services;
