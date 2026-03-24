import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as Icons from 'lucide-react';

const Twitter = Icons.Twitter || Icons.TwitterIcon || (() => null);
const Github = Icons.Github || Icons.GithubIcon || (() => null);
const Linkedin = Icons.Linkedin || Icons.LinkedinIcon || (() => null);

const Hero = ({ data, profileImage, role, socials }) => {
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(contentRef.current.children, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
        )
        .fromTo(imageRef.current, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' }, 
            '-=0.8'
        );
    }, []);

    const handleContactClick = (e) => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative w-full flex flex-col justify-start pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 overflow-hidden bg-background px-6 lg:px-20">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center z-10">
                
                {/* Image Section (Top on mobile) */}
                <div className="flex justify-center order-1 lg:order-2">
                    <div ref={imageRef} className="relative group">
                       <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] xl:w-[580px] xl:h-[580px] profile-glow p-2 md:p-4 rotate-2 group-hover:rotate-0 transition-transform duration-700">
                          <img 
                            src={profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop'} 
                            alt="Profile" 
                            className="w-full h-full object-cover rounded-full"
                          />
                       </div>
                       <div className="absolute -bottom-6 -right-6 w-20 h-20 md:w-32 md:h-32 bg-accent/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                </div>

                {/* Content Section */}
                <div ref={contentRef} className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/40 px-6 py-2 border border-white/5 bg-white/[0.03] rounded-full mb-10 flex items-center gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
                        Status: Available
                    </span>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 tracking-tighter leading-[1.05] text-white drop-shadow-2xl">
                        I'm <span className="text-accent drop-shadow-[0_0_20px_rgba(255,94,0,0.5)]">{data?.title || 'Arpan Kumar'}</span>
                    </h1>
                    
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-accent font-black uppercase tracking-[0.3em] mb-10 italic drop-shadow-md">
                        {role || 'Full-stack Web Developer'}
                    </p>

                    <p className="text-sm md:text-base lg:text-lg text-white/30 mb-12 max-w-lg leading-relaxed font-bold italic">
                        {data?.description || 'Building high-performance interactive digital products with an uncompromising focus on aesthetic and binary logic.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-16 w-full sm:w-auto">
                        <a 
                            href="#contact" 
                            onClick={handleContactClick}
                            className="btn-orange w-fit mx-auto lg:mx-0 px-14 py-6 text-xl shadow-glow-orange hover:shadow-glow-orange-lg text-center leading-none"
                        >
                            Let's Talk
                        </a>
                        <div className="flex gap-4 justify-center">
                            {socials?.github && <a href={socials.github} target="_blank" rel="noreferrer" className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-accent hover:text-white transition-all transform hover:-translate-y-2"><Github size={24} /></a>}
                            {socials?.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-accent hover:text-white transition-all transform hover:-translate-y-2"><Linkedin size={24} /></a>}
                            {socials?.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-accent hover:text-white transition-all transform hover:-translate-y-2"><Twitter size={24} /></a>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Blob Elements */}
            <div className="glow-blob top-0 left-0 w-[40vw] h-[40vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"></div>
            <div className="glow-blob bottom-0 right-0 w-[30vw] h-[30vw] translate-x-1/3 translate-y-1/3 opacity-[0.03]"></div>
        </section>
    );
};

export default Hero;
