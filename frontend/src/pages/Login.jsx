import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as Icons from 'lucide-react';

const LogIn = Icons.LogIn || Icons.LogInIcon;
const Lock = Icons.Lock || Icons.LockIcon;
const Mail = Icons.Mail || Icons.MailIcon;


const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, loginUser } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/admin" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await loginUser(credentials.email, credentials.password);
            navigate('/admin');
        } catch (err) {
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="w-full max-w-md glass-card p-10 mx-6">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black gradient-text uppercase mb-2">Supabase Auth</h1>
                    <p className="text-white/40 text-sm">Secure admin login for your portfolio.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="email" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 focus:outline-none focus:border-primary/50 transition-colors" 
                            placeholder="Admin Email"
                            required
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="password" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 focus:outline-none focus:border-primary/50 transition-colors" 
                            placeholder="Password"
                            required
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>

                    {error && <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                        <LogIn size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
