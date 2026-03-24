import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="bg-[#050505] min-h-screen text-white">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<Dashboard />} />
                        {/* Fallback */}
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
