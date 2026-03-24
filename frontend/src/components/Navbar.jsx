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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center">
        {/* Logo Section */}
        <div 
            onClick={handleLogoClick}
            className="group cursor-pointer flex items-center gap-3 select-none"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-glow-orange group-hover:rotate-[360deg] transition-all duration-700">
            <ShieldCheck size={24} />
          </div>
          <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase text-white group-hover:text-accent transition-colors">PORTFOLIO.</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-10 xl:gap-14 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[10px] xl:text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-accent transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500"></span>
            </a>
          ))}
          <a href="#contact" className="btn-orange px-8 py-3 text-[10px] xl:text-[11px] font-black uppercase tracking-widest leading-none">Let's Talk</a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:text-accent transition-all duration-300 active:scale-95"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-0 top-[88px] w-full h-screen bg-[#0a0a0a] z-40 transition-all duration-700 lg:hidden ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
         <div className="flex flex-col items-center justify-center h-4/5 gap-12 px-10">
            {navLinks.map((link, i) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white hover:text-accent transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {link.name}
                </a>
            ))}
            <div className="w-full h-px bg-white/5 mt-6"></div>
            <a 
               href="#contact" 
                onClick={() => setIsOpen(false)}
               className="btn-orange w-full py-6 text-xl font-black uppercase tracking-[0.5em] text-center"
            >
                Let's Talk
            </a>
         </div>
         {/* Background Visuals for Drawer */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-blob opacity-[0.05]"></div>
      </div>
    </nav>
  );
};

export default Navbar;
