import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Award = Icons.Award || Icons.AwardIcon || (() => null);
const ExternalLink = Icons.ExternalLink || Icons.ExternalLinkIcon || (() => null);
const X = Icons.X || Icons.XIcon || (() => null);

const Certificates = ({ certificates }) => {
    const sectionRef = useRef(null);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        if (!certificates || certificates.length === 0) return;

        const certs = sectionRef.current.querySelectorAll('.cert-card');
        
        certs.forEach((cert, i) => {
            gsap.fromTo(cert, 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    delay: i * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cert,
                        start: 'top 90%',
                    }
                }
            );
        });
    }, [certificates]);

    if (!certificates || certificates.length === 0) return null;

    return (
        <section id="certificates" ref={sectionRef} className="py-24 md:py-32 bg-[#080808] relative overflow-hidden px-6 lg:px-20">
            <div className="container mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.6em] text-accent mb-6 flex items-center gap-4 italic justify-center">
                       <Award size={14} /> Knowledge Nodes
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white leading-[1.1]">
                        Verified Credentials
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {certificates.map(cert => (
                        <div 
                            key={cert.id} 
                            onClick={() => setSelectedCert(cert)}
                            className="cert-card glass-premium p-6 rounded-[2.5rem] border-white/5 relative group cursor-pointer hover:bg-white/[0.04] transition-all hover:scale-[1.02]"
                        >
                            <div className="aspect-[4/3] bg-white/5 rounded-2xl overflow-hidden mb-6 relative shadow-2xl">
                                {cert.image_url ? (
                                    <img 
                                        src={cert.image_url} 
                                        alt={cert.title} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10 gap-4">
                                        <Award size={48} />
                                        <span className="text-[10px] font-black uppercase">Archive Missing</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ExternalLink size={32} className="text-white drop-shadow-lg" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-start gap-4">
                                    <h4 className="text-lg font-black uppercase tracking-tighter line-clamp-2 leading-[1.2]">{cert.title}</h4>
                                    <span className="text-accent text-[8px] font-black uppercase tracking-widest py-1 px-3 bg-accent/10 rounded-full flex-shrink-0">{cert.date}</span>
                                </div>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{cert.issuer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Terminal */}
            {selectedCert && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-3xl" 
                        onClick={() => setSelectedCert(null)}
                    ></div>
                    
                    <div className="relative glass-premium border-white/10 rounded-[3rem] max-w-5xl w-full max-h-full overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-500">
                        <button 
                            onClick={() => setSelectedCert(null)}
                            className="absolute top-8 right-8 w-14 h-14 bg-white/5 hover:bg-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all z-20"
                        >
                            <X size={28} />
                        </button>

                        <div className="p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
                            <div className="w-full md:w-2/3 aspect-[4/3] bg-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                {selectedCert.image_url ? (
                                    <img src={selectedCert.image_url} alt={selectedCert.title} className="w-full h-full object-contain" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-white/5 gap-10">
                                        <Award size={128} />
                                        <span className="text-xl font-black uppercase tracking-[0.5em]">No Visual Uplink</span>
                                    </div>
                                )}
                            </div>

                            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left space-y-10">
                                <div>
                                    <h2 className="text-accent text-xs font-black uppercase tracking-[0.5em] mb-4 italic">Verification Node</h2>
                                    <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter uppercase">{selectedCert.title}</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-white font-black text-lg uppercase">{selectedCert.issuer}</p>
                                    <p className="text-white/40 font-bold italic">Authenticated: {selectedCert.date}</p>
                                </div>
                                
                                {selectedCert.verify_link && (
                                    <a 
                                        href={selectedCert.verify_link} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="btn-orange w-full md:w-fit px-10 py-5 text-sm flex items-center justify-center gap-4 shadow-glow-orange-lg"
                                    >
                                        Verify Credentials <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certificates;
