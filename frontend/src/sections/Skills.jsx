import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ skills = [] }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const skillsElements = gsap.utils.toArray('.skill-item');
        skillsElements.forEach((el, i) => {
            gsap.fromTo(el, 
                { x: -20, opacity: 0 }, 
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    delay: i * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                    }
                }
            );
        });
    }, [skills]);

    return (
        <section id="skills" ref={sectionRef} className="py-24 md:py-32 lg:py-48 bg-background relative overflow-hidden px-6 lg:px-20">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="flex flex-col mb-16 md:mb-24 items-center text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase italic text-white">
                        Skills
                    </h2>
                    <p className="text-xs md:text-sm text-white/30 uppercase tracking-[0.4em] italic font-black">My technical expertise</p>
                </div>

                {/* Skills List Redesign */}
                <div className="max-w-3xl mx-auto flex flex-col gap-10 md:gap-12">
                    {skills.map((skill, index) => (
                        <div 
                            key={skill.id || index} 
                            className="skill-item group w-full"
                        >
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-white group-hover:text-accent transition-colors duration-300">
                                    {skill.name}
                                </span>
                                <span className="text-xs md:text-sm font-black text-accent tabular-nums">
                                    {skill.percentage}%
                                </span>
                            </div>
                            
                            {/* Premium Progress Bar */}
                            <div className="relative h-[6px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(255,94,0,0.5)] rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${skill.percentage}%` }}
                                ></div>
                                
                                {/* Inner Glow Reflect */}
                                <div 
                                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                ></div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State Overlay */}
                    {skills.length === 0 && (
                        <div className="py-24 text-center text-white/5 font-black uppercase tracking-[0.5em] italic">
                            Initializing technical core...
                        </div>
                    )}
                </div>
            </div>

            {/* Background Cinematic Blobs */}
            <div className="glow-blob top-1/2 left-[-10%] w-[30vw] h-[30vw] opacity-[0.03] pointer-events-none"></div>
            <div className="glow-blob bottom-10 right-[-5%] w-[20vw] h-[20vw] opacity-[0.02] pointer-events-none"></div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}} />
        </section>
    );
};

export default Skills;
