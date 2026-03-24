import React from 'react';
import * as Icons from 'lucide-react';

const Mail = Icons.Mail || Icons.MailIcon || (() => null);
const Github = Icons.Github || Icons.GithubIcon || Icons.GitHub || (() => null);
const Twitter = Icons.Twitter || Icons.TwitterIcon || Icons.X || (() => null);
const Linkedin = Icons.Linkedin || Icons.LinkedinIcon || Icons.LinkedIn || (() => null);
const Heart = Icons.Heart || Icons.HeartIcon || (() => null);

const Footer = () => {
    return (
      <footer className="py-20 bg-[#070707] text-white border-t border-white/5 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
  
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="flex flex-col gap-4 text-center md:text-left">
                <h3 className="text-3xl font-black gradient-text tracking-tighter uppercase">PORTFOLIO.</h3>
                <p className="text-white/40 max-w-sm text-sm font-medium leading-relaxed uppercase tracking-widest italic">
                  "Innovating the digital horizon one line at a time."
                </p>
             </div>
  
             <div className="flex items-center gap-6">
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary hover:-translate-y-2 transition-all duration-300 border border-white/5"><Twitter size={18} /></a>
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary hover:-translate-y-2 transition-all duration-300 border border-white/5"><Github size={18} /></a>
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary hover:-translate-y-2 transition-all duration-300 border border-white/5"><Linkedin size={18} /></a>
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary hover:-translate-y-2 transition-all duration-300 border border-white/5"><Mail size={18} /></a>
             </div>
          </div>
  
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">
                &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED. CRAFTED WITH <Heart size={10} className="inline text-red-500 mx-1" fill="currentColor" />
             </p>
  
             <div className="flex gap-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 cursor-pointer hover:text-white transition-colors">Terms of Use</span>
             </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
