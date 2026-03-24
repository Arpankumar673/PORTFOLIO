-- SETUP THE PROJECT IMAGES BUCKET
-- Run this in your Supabase SQL Editor

-- 1. Create Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Security Policies (RLS)
-- Allow Public to View
CREATE POLICY "Public Read Project Images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

-- Allow Admin to Manage
CREATE POLICY "Admin All Project Images" 
ON storage.objects FOR ALL 
TO authenticated 
USING (bucket_id = 'project-images');

-- 3. Ensure Project Table is Correct
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    tech_stack TEXT,
    github_url TEXT,
    live_url TEXT,
    image_url TEXT
);

-- Enable RLS on Table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin All Projects" ON projects FOR ALL TO authenticated USING (true);
