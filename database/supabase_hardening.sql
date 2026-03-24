/**
 * SUPABASE SECURITY SCHEMA - PRODUCTION LEVEL AUTHENTICATION LOCK
 * TARGET: arpan112230@gmail.com
 */

-- 1. DROP EXISTING RELAXED POLICIES
DROP POLICY IF EXISTS "Admin All Projects" ON projects;
DROP POLICY IF EXISTS "Admin All Services" ON services;
DROP POLICY IF EXISTS "Admin All Skills" ON skills;
DROP POLICY IF EXISTS "Admin All Messages" ON messages;
DROP POLICY IF EXISTS "Admin All Social Links" ON social_links;
DROP POLICY IF EXISTS "Admin All About" ON about;
DROP POLICY IF EXISTS "Admin All Profile" ON profile;

-- 2. CREATE RIGID EMAIL-BACKED POLICIES
-- Only the owner (arpan112230@gmail.com) can modify data.

-- Projects
CREATE POLICY "Strict Email Owner Projects" ON projects
FOR ALL TO authenticated
USING (auth.jwt() ->> 'email' = 'arpan112230@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'arpan112230@gmail.com');

-- Services
CREATE POLICY "Strict Email Owner Services" ON services
FOR ALL TO authenticated
USING (auth.jwt() ->> 'email' = 'arpan112230@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'arpan112230@gmail.com');

-- Skills
CREATE POLICY "Strict Email Owner Skills" ON skills
FOR ALL TO authenticated
USING (auth.jwt() ->> 'email' = 'arpan112230@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'arpan112230@gmail.com');

-- About
CREATE POLICY "Strict Email Owner About" ON about
FOR ALL TO authenticated
USING (auth.jwt() ->> 'email' = 'arpan112230@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'arpan112230@gmail.com');

-- Social Links
CREATE POLICY "Strict Email Owner Socials" ON social_links
FOR ALL TO authenticated
USING (auth.jwt() ->> 'email' = 'arpan112230@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'arpan112230@gmail.com');

-- Messages
CREATE POLICY "Strict Email Owner Messages" ON messages
FOR ALL TO authenticated
USING (auth.jwt() ->> 'email' = 'arpan112230@gmail.com');

-- Profile
CREATE POLICY "Strict Email Owner Profile" ON profile
FOR ALL TO authenticated
USING (auth.jwt() ->> 'email' = 'arpan112230@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'arpan112230@gmail.com');

-- 3. STORAGE BUCKET LOCKDOWN
-- Use the same logic for storage buckets (profile-images, project-images, resumes)
-- Note: 'authenticated' here is also restricted by DB policies above when URL is saved.
