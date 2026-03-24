import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const X = Icons.X || Icons.XIcon || (() => null);
const Github = Icons.Github || Icons.GithubIcon || (() => null);
const ExternalLink = Icons.ExternalLink || Icons.ExternalLinkIcon || (() => null);
const Code = Icons.Code || Icons.CodeIcon || (() => null);

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-2xl" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className="relative w-full max-w-5xl glass-premium border-white/5 bg-[#121212]/95 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-4 bg-white/5 hover:bg-accent hover:text-white rounded-full transition-all z-20 shadow-lg active:scale-90"
                >
                    <X size={24} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 h-auto">
                    {/* Media side */}
                    <div className="lg:col-span-6 h-64 sm:h-80 md:h-[400px] lg:h-auto bg-surface relative overflow-hidden flex items-center justify-center lg:rounded-l-[3.5rem]">
                        {project.image_url ? (
                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-white/5 font-black uppercase text-3xl italic tracking-tighter">Project Archive Node</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Info side */}
                    <div className="lg:col-span-6 p-10 sm:p-14 lg:p-20 flex flex-col justify-center gap-8">
                        <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.5em] text-accent flex items-center gap-3">
                            <Code size={14} /> Mission Specification
                        </span>
                        
                        <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-tight drop-shadow-md">
                           {project.title}
                        </h3>

                        <p className="text-sm md:text-base lg:text-lg text-white/40 leading-relaxed italic font-bold max-w-lg mb-4">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-4">
                           {project.tech_stack?.split(',').map(tag => (
                               <span key={tag} className="px-5 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-accent/80 hover:bg-accent hover:text-white transition-all duration-300">
                                  {tag.trim()}
                                </span>
                           ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 mt-6">
                            {project.live_url && (
                                <a href={project.live_url} target="_blank" rel="noreferrer" className="btn-orange flex items-center justify-center gap-4 py-5 flex-1 shadow-glow-orange hover:shadow-glow-orange-lg text-lg">
                                    View Live <ExternalLink size={20} />
                                </a>
                            )}
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noreferrer" className="bg-white text-background flex items-center justify-center gap-4 py-5 flex-1 rounded-full font-black uppercase tracking-widest text-lg hover:bg-accent hover:text-white transition-all shadow-xl active:scale-95">
                                    Source Code <Github size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Projects = ({ projects = [] }) => {
    const sectionRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (projects.length > 0) {
            const cards = gsap.utils.toArray('.project-item');
            cards.forEach((card) => {
               gsap.fromTo(card, 
                  { y: 40, opacity: 0 }, 
                  { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                    }
                  }
               );
            });
        }
    }, [projects]);

    return (
        <section id="projects" ref={sectionRef} className="py-24 md:py-32 lg:py-48 relative overflow-hidden bg-background px-6 lg:px-20">
            <div className="container mx-auto">
                <div className="flex flex-col mb-24 md:mb-32 items-center text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter uppercase whitespace-nowrap italic leading-tight text-white italic">
                        Latest <span className="text-accent underline underline-offset-8 decoration-8 drop-shadow-[0_0_20px_rgba(255,94,0,0.5)]">Projects</span>
                    </h2>
                    <p className="text-xs md:text-sm lg:text-base text-white/30 uppercase tracking-[0.4em] italic font-black">Click on a project node to view detailed specifications</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 max-w-7xl mx-auto">
                    {projects.map((proj, i) => (
                        <div 
                            key={proj.id || i} 
                            onClick={() => setSelectedProject(proj)}
                            className="project-item group flex flex-col cursor-pointer transition-all duration-1000 hover:-translate-y-4"
                        >
                            <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden glass-premium border-white/5 ring-1 ring-white/5 group-hover:ring-accent group-hover:shadow-glow-orange-lg transition-all duration-1000 shadow-2xl">
                               {proj.image_url ? (
                                   <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-1000" />
                               ) : (
                                   <div className="w-full h-full bg-surface flex items-center justify-center p-12 text-white/5 font-black uppercase text-3xl italic tracking-tighter group-hover:text-accent/20 transition-all">Archived Node Preview</div>
                               )}
                               <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent group-hover:opacity-0 transition-opacity"></div>
                               <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-accent/80 to-transparent">
                                   <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px]">
                                       View Specifications &rarr;
                                   </div>
                               </div>
                            </div>

                            <div className="mt-10 flex flex-col items-center">
                                <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white group-hover:text-accent transition-all duration-500 text-center italic leading-none md:max-w-[280px]">
                                    {proj.title}
                                </h3>
                                <div className="mt-6 w-12 h-1.5 bg-white/5 rounded-full group-hover:bg-accent group-hover:w-32 transition-all duration-700 shadow-xl"></div>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && <div className="col-span-full py-40 text-center text-white/5 font-black uppercase tracking-[1em] italic">Scanning archive nodes...</div>}
                </div>
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            <div className="glow-blob top-1/2 left-[-20%] w-[50vw] h-[50vw] opacity-[0.03] pointer-events-none"></div>
        </section>
    );
};

export default Projects;
