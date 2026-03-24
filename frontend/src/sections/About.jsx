import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const User = Icons.User || Icons.UserIcon || (() => null);
const Download = Icons.Download || Icons.DownloadIcon || (() => null);
const Briefcase = Icons.Briefcase || Icons.BriefcaseIcon || (() => null);

const About = ({ data, profileImage, role }) => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(contentRef.current.children, 
            { x: 50, opacity: 0 }, 
            { 
               x: 0, 
               opacity: 1, 
               duration: 1, 
               stagger: 0.2, 
               ease: 'power3.out',
               scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
               }
            }
        );
        gsap.fromTo(imageRef.current, 
            { scale: 0.9, opacity: 0 }, 
            { 
               scale: 1, 
               opacity: 1, 
               duration: 1.5, 
               ease: 'power4.out',
               scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
               }
            }
        );
    }, []);

    const handleHireMeClick = (e) => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="about" ref={sectionRef} className="py-24 md:py-32 lg:py-48 bg-background relative overflow-hidden px-6 lg:px-20">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                
                {/* Aesthetic Visual Side */}
                <div ref={imageRef} className="relative order-2 lg:order-1 flex justify-center lg:justify-end">
                    <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-none">
                        <div className="aspect-square bg-white/[0.02] border border-white/5 rounded-[3rem] p-4 lg:p-8 transform rotate-3 group-hover:rotate-0 transition-all duration-1000 overflow-hidden shadow-2xl">
                            <img src={profileImage || 'https://via.placeholder.com/600'} alt="Dossier Visual" className="w-full h-full object-cover rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" />
                        </div>
                        <div className="absolute top-10 -right-10 w-48 h-48 bg-accent/10 blur-[80px] rounded-full"></div>
                    </div>
                </div>

                {/* Narrative Side */}
                <div ref={contentRef} className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
                    <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.6em] text-accent mb-8 flex items-center gap-4 italic">
                       <User size={14} /> About Me
                    </h2>

                    <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-10 tracking-tighter uppercase leading-[1.1] text-white">
                        About
                    </h3>

                    <p className="text-lg sm:text-xl lg:text-2xl text-white/60 mb-10 leading-relaxed font-bold italic max-w-xl">
                        {data?.description || 'Experienced developer with a specialized focus on modern web ecosystems and interactive brand intelligence.'}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-12 w-full max-w-md">
                        <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-white/[0.05] transition-all">
                            <span className="text-3xl font-black text-white mb-2 block group-hover:text-accent transition-colors">04+</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Years Mastery</span>
                        </div>
                        <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-white/[0.05] transition-all">
                            <span className="text-3xl font-black text-white mb-2 block group-hover:text-accent transition-colors">50+</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Nodes Deployed</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                        <button 
                            onClick={handleHireMeClick}
                            className="btn-orange w-fit mx-auto lg:mx-0 px-14 py-6 text-xl shadow-glow-orange group leading-none"
                        >
                            Hire Me <Briefcase className="ml-4 group-hover:translate-y-[-2px] transition-transform" />
                        </button>
                        {data?.resume_url && (
                             <a 
                                href={data.resume_url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-fit mx-auto lg:mx-0 flex items-center justify-center gap-4 px-14 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-tighter italic rounded-full hover:bg-white/10 transition-all text-xl shadow-xl leading-none"
                             >
                                Download CV <Download size={22} className="text-accent"/>
                             </a>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="glow-blob bottom-[-10%] left-[-5%] w-[400px] h-[400px] opacity-[0.05] pointer-events-none"></div>
        </section>
    );
};

export default About;
