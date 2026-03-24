import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillItem = ({ skill, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [count, setCount] = useState(0);
    const itemRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (itemRef.current) observer.observe(itemRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const end = parseInt(skill.percentage);
        if (start === end) return;

        const duration = 1500; // ms
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, skill.percentage]);

    return (
        <div ref={itemRef} className="skill-item group w-full">
            <div className="flex justify-between items-end mb-4">
                <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-white group-hover:text-accent transition-colors duration-300">
                    {skill.name}
                </span>
                <span className="text-xs md:text-sm font-black text-accent tabular-nums">
                    {count}%
                </span>
            </div>
            
            <div className="relative h-[6px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                    className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(255,94,0,0.5)] rounded-full transition-all duration-[1500ms] ease-out-expo"
                    style={{ 
                        width: isVisible ? `${skill.percentage}%` : '0%',
                        transitionProperty: 'width',
                        transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' 
                    }}
                ></div>
                
                <div 
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"
                    style={{ animationDelay: `${index * 0.2}s` }}
                ></div>
            </div>
        </div>
    );
};

const Skills = ({ skills = [] }) => {
    const sectionRef = useRef(null);

    return (
        <section id="skills" ref={sectionRef} className="py-24 md:py-32 lg:py-48 bg-background relative overflow-hidden px-6 lg:px-20">
            <div className="container mx-auto">
                <div className="flex flex-col mb-16 md:mb-24 items-center text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase italic text-white">
                        Skills
                    </h2>
                    <p className="text-xs md:text-sm text-white/30 uppercase tracking-[0.4em] italic font-black">My technical expertise</p>
                </div>

                <div className="max-w-3xl mx-auto flex flex-col gap-10 md:gap-12">
                    {skills.map((skill, index) => (
                        <SkillItem key={skill.id || index} skill={skill} index={index} />
                    ))}

                    {skills.length === 0 && (
                        <div className="py-24 text-center text-white/5 font-black uppercase tracking-[0.5em] italic">
                            Initializing technical core...
                        </div>
                    )}
                </div>
            </div>

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
