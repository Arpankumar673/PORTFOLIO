-- SUPABASE SECURITY SCHEMA & RLS POLICIES
-- Execute this in your Supabase SQL Editor

-- 1. Create Tables (If not already created)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    tech_stack TEXT
);

CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT DEFAULT 'Frontend',
    percentage INTEGER DEFAULT 80
);

CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    email TEXT,
    resume_url TEXT,
    profile_image TEXT
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL
);

-- 2. ENABLE RLS (Essential for Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 3. DEFINE POLICIES

-- PROJECTS: Public Read, Admin Write
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin All Projects" ON projects FOR ALL TO authenticated USING (true);

-- SKILLS: Public Read, Admin Write
CREATE POLICY "Public Read Skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin All Skills" ON skills FOR ALL TO authenticated USING (true);

-- ABOUT: Public Read, Admin Update
CREATE POLICY "Public Read About" ON about FOR SELECT USING (true);
CREATE POLICY "Admin Update About" ON about FOR ALL TO authenticated USING (true);

-- MESSAGES: Public Insert, Admin Read/Delete
CREATE POLICY "Public Insert Messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Manage Messages" ON messages FOR ALL TO authenticated USING (true);

-- 4. STORAGE BUCKETS (Create buckets manually if needed, or through CLI)
-- Ensure 'resumes' and 'project-images' buckets exist.

-- Storage Policies (Enable RLS on Storage)
-- Public can read images, only Admin can upload/delete.
-- Bucket 'resumes' and 'project-images' should be public for reading.
