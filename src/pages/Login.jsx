import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as Icons from 'lucide-react';

const LogIn = Icons.LogIn || Icons.LogInIcon || (() => null);
const Lock = Icons.Lock || Icons.LockIcon || (() => null);
const Mail = Icons.Mail || Icons.MailIcon || (() => null);

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginUser, user } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/admin" />;

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await loginUser(credentials.email, credentials.password);
            navigate('/admin');
        } catch (err) {
            setError('ACCESS DENIED. Invalid Credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -z-10 animate-pulse"></div>

            <div className="glass-card w-full max-w-md p-12 border border-white/10 relative overflow-hidden group shadow-2xl shadow-primary/5">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/20 shadow-xl">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-4xl font-black gradient-text tracking-tighter uppercase mb-4">Security Access</h1>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-white/20 italic">Administrator Protocol</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="relative group/field">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 italic">Encrypted Email</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-primary transition-colors" />
                            <input 
                                type="email" 
                                className="w-full bg-transparent border-b border-white/10 pl-8 py-4 focus:outline-none focus:border-primary transition-all text-xl font-bold tracking-tight" 
                                placeholder="root@secure.io"
                                required
                                value={credentials.email}
                                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="relative group/field">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 italic">Security Token</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-primary transition-colors" />
                            <input 
                                type="password" 
                                className="w-full bg-transparent border-b border-white/10 pl-8 py-4 focus:outline-none focus:border-primary transition-all text-xl font-bold tracking-tight" 
                                placeholder="••••••••"
                                required
                                value={credentials.password}
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-6 bg-white text-dark font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-primary hover:text-white hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 group shadow-2xl shadow-primary/10"
                    >
                        {loading ? 'Decrypting...' : 'Initiate Access'}
                        <LogIn size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </form>

                <div className="mt-12 text-center">
                   <a href="/" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">&larr; ABORT MISSION (RETURN HOME)</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
