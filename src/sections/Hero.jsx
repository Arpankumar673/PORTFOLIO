import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as Icons from 'lucide-react';

const ArrowRight = Icons.ArrowRight || Icons.ArrowRightIcon || (() => null);
const Download = Icons.Download || Icons.DownloadIcon || (() => null);

const Hero = ({ data }) => {
    const textRef = useRef(null);
    const mainTitleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(mainTitleRef.current, 
            { y: 100, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out' }
        )
        .fromTo(subtitleRef.current, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 
            '-=0.8'
        )
        .fromTo(ctaRef.current, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }, 
            '-=0.6'
        );
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="home">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            
            <div className="container mx-auto px-6 text-center z-10">
                <div className="inline-block px-6 py-2 glass border border-white/5 rounded-full mb-8 hover:scale-105 transition-transform cursor-default">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">Developer Portfolio v1.0</span>
                </div>

                <h1 
                    ref={mainTitleRef}
                    className="text-7xl md:text-9xl font-black mb-8 tracking-tighter"
                >
                    {data?.title || 'Creative Specialist'} <br />
                    <span className="gradient-text italic opacity-90 drop-shadow-2xl">Digital Architect.</span>
                </h1>
                
                <p 
                    ref={subtitleRef}
                    className="text-lg md:text-2xl text-white/40 mb-14 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest italic"
                >
                    {data?.description || 'Building immersive immersive digital experiences with modern web technologies and award-winning GSAP animations.'}
                </p>

                <div 
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <a 
                        href="#projects" 
                        className="group flex items-center gap-4 px-10 py-5 bg-white text-dark rounded-full font-bold hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl shadow-white/10"
                    >
                        View Projects
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                    {data?.resume_url && (
                        <a 
                            href={data.resume_url} 
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-4 px-10 py-5 glass border border-white/10 rounded-full font-bold hover:bg-white/5 hover:scale-110 active:scale-95 transition-all duration-300"
                        >
                            Resume
                            <Download size={20} className="animate-bounce" />
                        </a>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-10 animate-bounce cursor-default select-none pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Scroll Down</span>
                <div className="w-1 h-20 bg-gradient-to-b from-white to-transparent rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
            </div>
        </section>
    );
};

export default Hero;
