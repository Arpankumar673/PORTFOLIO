import React from 'react';
import * as Icons from 'lucide-react';

const Twitter = Icons.Twitter || Icons.TwitterIcon || (() => null);
const Github = Icons.Github || Icons.GithubIcon || (() => null);
const Linkedin = Icons.Linkedin || Icons.LinkedinIcon || (() => null);
const Mail = Icons.Mail || Icons.MailIcon || (() => null);

const Footer = ({ socials }) => {
    return (
        <footer className="py-20 bg-background border-t border-white/5 flex flex-col items-center">
            <div className="container mx-auto px-6 flex flex-col items-center gap-12">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white mb-4">PORTFOLIO.</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">Built with Authority & Precision</p>
                </div>

                <div className="flex gap-8 md:gap-12">
                    {socials?.twitter && (
                        <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-white/30 hover:text-accent transition-all hover:scale-125 duration-300">
                            <Twitter size={24} />
                        </a>
                    )}
                    {socials?.github && (
                        <a href={socials.github} target="_blank" rel="noreferrer" className="text-white/30 hover:text-accent transition-all hover:scale-125 duration-300">
                            <Github size={24} />
                        </a>
                    )}
                    {socials?.linkedin && (
                        <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-white/30 hover:text-accent transition-all hover:scale-125 duration-300">
                            <Linkedin size={24} />
                        </a>
                    )}
                    {socials?.email && (
                        <a href={`mailto:${socials.email}`} className="text-white/30 hover:text-accent transition-all hover:scale-125 duration-300">
                            <Mail size={24} />
                        </a>
                    )}
                </div>

                <div className="text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/10">© {new Date().getFullYear()} ARPAN KUMAR. ALL MISSION RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
