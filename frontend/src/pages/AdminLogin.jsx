import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as Icons from 'lucide-react';

const LogIn = Icons.LogIn || Icons.LogInIcon || (() => null);
const ShieldCheck = Icons.ShieldCheck || Icons.ShieldCheckIcon || (() => null);
const Key = Icons.Key || Icons.KeyIcon || (() => null);

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    // If already logged in and verified, skip login
    if (user) return <Navigate to="/admin-dashboard" />;

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithGoogle();
        } catch (err) {
            setError('ACCESS DENIED. Secure signal rejected.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#08080c] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Cinematic Gradients */}
            <div className="glow-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 blur-[180px]"></div>
            
            <div className="glass-premium w-full max-w-lg p-12 md:p-16 border-white/5 relative z-10 shadow-2xl rounded-[3.5rem] flex flex-col items-center">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mb-8 border border-accent/20 shadow-glow-orange-lg animate-pulse">
                        <ShieldCheck size={40} />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-md italic">Secure Link</h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent/60 mt-4 leading-none animate-pulse">Encryption Protocol: Active</p>
                </div>

                <div className="w-full space-y-10">
                    <p className="text-center text-white/30 text-xs font-bold italic px-8 line-clamp-2">
                        Authorized administrative clearance required to access the portfolio's core management systems.
                    </p>

                    <button 
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full group relative flex items-center justify-center gap-4 py-8 bg-white text-background font-black uppercase tracking-[0.4em] text-[11px] rounded-3xl hover:bg-accent hover:text-white transition-all duration-500 shadow-xl active:scale-95 disabled:opacity-50"
                    >
                        <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative flex items-center gap-4">
                            {loading ? 'Authenticating...' : 'Sign in with Google'}
                            <LogIn size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </span>
                    </button>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase rounded-2xl text-center">
                            {error}
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center border-t border-white/5 w-full pt-10">
                   <a href="/" className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-white transition-all duration-500 italic flex items-center justify-center gap-3 group">
                       <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> ABORT PROTOCOL
                   </a>
                </div>
            </div>

            {/* Matrix-like decorative elements */}
            <div className="absolute top-10 right-10 flex flex-col gap-4 opacity-10">
                <div className="w-32 h-1 bg-white/40 skew-x-[-45deg]"></div>
                <div className="w-48 h-1 bg-white/20 skew-x-[-45deg] self-end"></div>
            </div>
        </div>
    );
};

export default AdminLogin;
