-- FINAL SUPABASE SCHEMA
-- Execute this to enable profile image storage and RLS

-- Ensure the About table is ready (using existing or creating new)
CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    title TEXT DEFAULT 'Samantha Smith',
    description TEXT,
    email TEXT,
    resume_url TEXT,
    profile_image TEXT DEFAULT 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop'
);

-- Ensure RLS is enabled
ALTER TABLE about ENABLE ROW LEVEL SECURITY;

-- Policy to allow public viewing
CREATE POLICY "Public Read About" ON about FOR SELECT USING (true);

-- Policy to allow authenticated admin management
CREATE POLICY "Admin All About" ON about FOR ALL TO authenticated USING (true);

-- STORAGE SETUP
-- Manual Step: Create a bucket named 'profile-images' in Supabase Storage.
-- Then run these policies (or use Supabase Storage Dashboard):
/*
  STORAGE POLICIES for 'profile-images' bucket:
  1. Allow Authenticated users to Upload, Update, Delete.
  2. Allow Public to Read.
*/
