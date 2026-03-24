import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Menu = Icons.Menu || Icons.MenuIcon || (() => null);
const X = Icons.X || Icons.XIcon || (() => null);
const ShieldCheck = Icons.ShieldCheck || Icons.ShieldCheckIcon || (() => null);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 5) {
      navigate('/admin-login');
      setClickCount(0);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center">
          {/* Logo Section */}
          <div onClick={handleLogoClick} className="group cursor-pointer flex items-center gap-3 select-none">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-glow-orange group-hover:rotate-[360deg] transition-all duration-700">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase text-white group-hover:text-accent transition-colors">PORTFOLIO.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-10 xl:gap-14 items-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[10px] xl:text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-accent transition-all duration-300 relative group">
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
            <a href="#contact" className="btn-orange px-8 py-3 text-[10px] xl:text-[11px] font-black uppercase tracking-widest leading-none">Let's Talk</a>
          </div>

          {/* Mobile Toggle Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative z-[60] p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:text-accent transition-all duration-300 active:scale-95">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[55] transition-opacity duration-500 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>

      {/* Mobile Drawer Menu (Slide from right) */}
      <div className={`fixed top-0 right-0 w-[280px] sm:w-[320px] h-screen bg-[#08080c] z-[58] transition-transform duration-500 ease-in-out lg:hidden border-l border-white/5 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="flex flex-col h-full pt-32 px-10">
            <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                    <a 
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-black uppercase tracking-tighter italic text-white/40 hover:text-accent transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {link.name}
                    </a>
                ))}
            </div>
            
            <div className="mt-12 pt-12 border-t border-white/5">
                <a 
                   href="#contact" 
                   onClick={() => setIsOpen(false)}
                   className="btn-orange w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] text-center"
                >
                    Let's Talk
                </a>
            </div>

            {/* Matrix Decoration */}
            <div className="mt-auto pb-10 flex flex-col gap-2 opacity-10">
                <div className="w-full h-px bg-white/20 skew-x-[-45deg]"></div>
                <div className="w-1/2 h-px bg-white/40 skew-x-[-45deg] self-end"></div>
            </div>
         </div>
         {/* Background Visuals for Drawer */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full glow-blob opacity-[0.03] -z-10"></div>
      </div>
    </>
  );
};

export default Navbar;
