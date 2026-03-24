import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

const ADMIN_EMAIL = "arpan112230@gmail.com";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAdminAccess = async (sessionUser) => {
        if (sessionUser && sessionUser.email !== ADMIN_EMAIL) {
            console.error("Access Denied: Non-admin account detected.");
            await supabase.auth.signOut();
            setUser(null);
            return false;
        }
        setUser(sessionUser);
        return true;
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                checkAdminAccess(session.user);
            }
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                await checkAdminAccess(session.user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/admin-dashboard`
            }
        });
        if (error) throw error;
        return data;
    };

    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, logoutUser, isAdmin: user?.email === ADMIN_EMAIL }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
