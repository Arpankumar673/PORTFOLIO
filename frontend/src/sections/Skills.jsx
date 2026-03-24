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
                { scale: 0.8, opacity: 0 }, 
                { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 0.6, 
                    delay: i * 0.05,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 95%',
                    }
                }
            );
        });
    }, [skills]);

    return (
        <section id="skills" ref={sectionRef} className="py-24 md:py-32 lg:py-48 bg-background relative overflow-hidden px-6 lg:px-20">
            <div className="container mx-auto">
                <div className="flex flex-col mb-24 md:mb-32 items-center text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter uppercase italic text-white">
                        Technical <span className="text-accent underline underline-offset-8 decoration-8 drop-shadow-[0_0_20px_rgba(255,94,0,0.5)]">DNA</span>
                    </h2>
                    <p className="text-xs md:text-sm lg:text-base text-white/30 uppercase tracking-[0.4em] italic font-black">Decrypting professional capabilities into executable signals</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-10 max-w-7xl mx-auto">
                    {skills.map((skill, index) => (
                        <div 
                            key={skill.id || index} 
                            className="skill-item group relative aspect-square glass-premium border-white/5 rounded-3xl md:rounded-[2.5rem] flex flex-col items-center justify-center p-8 transition-all duration-500 hover:scale-110 hover:bg-accent/5 hover:shadow-glow-orange-lg hover:border-accent"
                        >
                            <div className="text-3xl md:text-4xl lg:text-5xl font-black text-accent group-hover:text-white transition-colors mb-4 drop-shadow-md">
                                {skill.percentage}%
                            </div>
                            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/20 group-hover:text-accent transition-all leading-tight text-center px-4">
                                {skill.name}
                            </h4>

                            {/* Decorative Radial Background */}
                            <div className="absolute inset-0 bg-radial-accent opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </div>
                    ))}
                    {skills.length === 0 && <div className="col-span-full py-24 text-center text-white/5 font-black uppercase tracking-[1em] italic">Mapping DNA Nodes...</div>}
                </div>
            </div>
            <div className="glow-blob top-1/2 right-[-10%] w-[35vw] h-[35vw] opacity-[0.04] pointer-events-none"></div>
        </section>
    );
};

export default Skills;
