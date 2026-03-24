import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Rocket = Icons.Rocket || Icons.RocketIcon || (() => null);
const Menu = Icons.Menu || Icons.MenuIcon || (() => null);
const X = Icons.X || Icons.XIcon || (() => null);
const Monitor = Icons.Monitor || Icons.MonitorIcon || (() => null);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/#projects' },
        { name: 'Skills', path: '/#skills' },
        { name: 'Contact', path: '/#contact' },
    ];

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
            ${isScrolled ? 'py-4 glass border-b border-white/5 shadow-2xl shadow-primary/5' : 'py-8'}`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center text-white">
                <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary group-hover:rotate-[360deg] transition-all duration-700 rounded-xl flex items-center justify-center text-dark">
                        <Rocket size={20} fill="currentColor" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">PORTFOLIO.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.path} 
                            className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all hover:scale-105"
                        >
                            {link.name}
                        </a>
                    ))}
                    {user ? (
                        <Link 
                            to="/admin" 
                            className="px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className="text-white/20 hover:text-white transition-colors">
                            <Monitor size={16} />
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button 
                  className="md:hidden text-white w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10" 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-[100%] left-0 w-full glass border-t border-white/5 p-8 transition-all duration-500 
                ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                <div className="flex flex-col gap-6 text-center">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.path} 
                            className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-[1px] bg-white/5 w-full my-2"></div>
                    {user && (
                        <Link 
                            to="/admin" 
                            className="text-primary font-black uppercase tracking-tighter text-xl" 
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
