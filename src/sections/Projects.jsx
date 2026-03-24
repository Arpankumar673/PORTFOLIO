import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExternalLink = Icons.ExternalLink || Icons.ExternalLinkIcon || (() => null);
const Github = Icons.Github || Icons.GithubIcon || Icons.GitHub || (() => null);
const Globe = Icons.Globe || Icons.GlobeIcon || (() => null);

const Projects = ({ projects = [] }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const cards = gsap.utils.toArray('.project-card');
        
        cards.forEach((card, i) => {
            gsap.fromTo(card, 
                { y: 100, opacity: 0, rotate: i % 2 === 0 ? -2 : 2 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    rotate: 0,
                    duration: 1.2, 
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                }
            );
        });
    }, [projects]);

    return (
        <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden bg-[#070707]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col mb-24 items-center text-center">
                    <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase whitespace-nowrap overflow-hidden">
                        Featured <span className="gradient-text italic">Work</span>
                    </h2>
                    <p className="text-white/30 text-sm font-medium uppercase tracking-[0.4em]">Crafting digital excellence and smooth UX/UI patterns.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((proj, idx) => (
                        <div key={proj.id} className="project-card flex flex-col group h-full">
                           <div className="relative aspect-video rounded-3xl overflow-hidden glass border border-white/5 mb-8">
                               {proj.image_url ? (
                                   <img 
                                       src={proj.image_url} 
                                       alt={proj.title} 
                                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                                   />
                               ) : (
                                   <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center p-12 text-center text-white/5 font-black uppercase text-4xl">PROJECT IMAGE</div>
                               )}
                               
                               <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6 backdrop-blur-sm">
                                   {proj.live_url && (
                                       <a href={proj.live_url} target="_blank" className="p-5 bg-primary text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl shadow-primary/30">
                                           <ExternalLink size={24} />
                                       </a>
                                   )}
                                   {proj.github_url && (
                                       <a href={proj.github_url} target="_blank" className="p-5 bg-white text-dark rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/30">
                                           <Github size={24} />
                                       </a>
                                   )}
                               </div>
                           </div>

                           <div className="flex justify-between items-start gap-6 px-4">
                               <div className="flex-1">
                                   <h3 className="text-3xl font-black mb-4 tracking-tighter group-hover:text-primary transition-colors">{proj.title}</h3>
                                   <p className="text-white/40 mb-6 text-sm leading-relaxed max-w-md font-medium">{proj.description}</p>
                                   <div className="flex flex-wrap gap-3">
                                       {proj.tech_stack?.split(',').map(tag => (
                                           <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-white/5 rounded-full border border-white/5 group-hover:border-primary/20 group-hover:text-primary transition-all">{tag.trim()}</span>
                                       ))}
                                   </div>
                               </div>
                               <div className="text-[10px] font-black text-white/10 italic">0{idx + 1}</div>
                           </div>
                        </div>
                    ))}

                    {projects.length === 0 && (
                        [1, 2, 3, 4].map(idx => (
                           <div key={idx} className="project-card glass-card p-10 h-[500px] flex items-center justify-center grayscale opacity-20">
                              <span className="text-4xl font-black italic">DUMMY {idx}</span>
                           </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
