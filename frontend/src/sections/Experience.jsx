import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Briefcase = Icons.Briefcase || Icons.BriefcaseIcon || (() => null);

const Experience = ({ experience }) => {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        if (!experience || experience.length === 0) return;

        const cards = sectionRef.current.querySelectorAll('.experience-card');
        
        cards.forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                }
            );
        });

        gsap.fromTo(lineRef.current,
            { height: 0 },
            { 
                height: '100%', 
                duration: 2, 
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    scrub: true
                }
            }
        );
    }, [experience]);

    if (!experience || experience.length === 0) return null;

    return (
        <section id="experience" ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden px-6 lg:px-20">
            <div className="container mx-auto">
                <div className="flex flex-col items-center mb-20 text-center">
                    <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.6em] text-accent mb-6 flex items-center gap-4 italic justify-center">
                       <Briefcase size={14} /> Career Chronicle
                    </h2>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-white leading-[1.1]">
                        Professional Journey
                    </h3>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block">
                        <div ref={lineRef} className="w-full bg-accent shadow-glow-orange origin-top"></div>
                    </div>

                    <div className="space-y-12 md:space-y-20">
                        {experience.map((exp, i) => (
                            <div key={exp.id} className={`experience-card relative flex flex-col md:flex-row gap-8 md:gap-20 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* Timeline Dot */}
                                <div className="absolute left-4 md:left-1/2 top-10 w-4 h-4 bg-accent rounded-full border-4 border-background -translate-x-1/2 hidden md:block z-10 shadow-glow-orange"></div>

                                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <span className="text-accent font-black tracking-widest text-xs py-2 px-4 bg-accent/10 rounded-full inline-block mb-4">{exp.duration}</span>
                                    <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2">{exp.role}</h4>
                                    <p className="text-xl font-bold text-white/40 italic mb-6">{exp.company}</p>
                                </div>

                                <div className="flex-1">
                                    <div className="glass-premium p-8 rounded-[2rem] border-white/5 relative group hover:bg-white/[0.03] transition-all">
                                        {exp.logo_url && (
                                            <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden mb-6 flex items-center justify-center p-3">
                                                <img src={exp.logo_url} alt={exp.company} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                                            </div>
                                        )}
                                        <p className="text-white/60 text-sm leading-relaxed font-medium italic">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="glow-blob top-[20%] right-[-10%] w-[500px] h-[500px] opacity-[0.03]"></div>
        </section>
    );
};

export default Experience;
