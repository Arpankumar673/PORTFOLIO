-- 1. Create the 'services' table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'Code'
);

-- 2. ENABLE RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 3. DEFINE POLICIES
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
CREATE POLICY "Admin All Services" ON services FOR ALL TO authenticated USING (true);

-- 4. SEED DATA (Optional, for initial look)
INSERT INTO services (title, description, icon) VALUES 
('Frontend Development', 'Building ultra-responsive, high-performance web applications with React, Tailwind, and GSAP.', 'Layout'),
('Backend Architecture', 'Designing robust, secure, and scalable server-side systems using Node.js and Supabase.', 'Database'),
('UI/UX Motion Design', 'Creating emotionally resonant user interfaces with cinematic animations and smooth micro-interactions.', 'Framer');
