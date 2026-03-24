import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Keyboard Shortcut Hook
const StealthShortcut = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleKeys = (e) => {
            // CTRL + SHIFT + A
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                navigate('/admin-login');
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [navigate]);
    return null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/admin-login" />;
    return children;
};

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-background text-text selection:bg-accent/40">
       <div className="glow-blob top-[10%] left-[5%] w-[600px] h-[600px] opacity-[0.2]"></div>
       <div className="glow-blob bottom-[20%] right-[10%] w-[500px] h-[500px] opacity-[0.1]"></div>
       <div className="relative z-10">{children}</div>
    </div>
  );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <StealthShortcut />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/admin-dashboard" element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default App;
