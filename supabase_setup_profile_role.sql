-- PATCH: ADD ROLE TO PROFILE TABLE
-- Execute this in your Supabase SQL Editor

-- 1. Add the role column if it doesn't exist
ALTER TABLE profile ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'Full-stack Web Developer';

-- 2. Update existing ID 1 with a default value
UPDATE profile SET role = 'Full-stack Web Developer' WHERE id = 1 AND role IS NULL;

-- 3. Verify RLS (Safety)
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Profile" ON profile;
CREATE POLICY "Public Read Profile" ON profile FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Profile" ON profile;
CREATE POLICY "Admin All Profile" ON profile FOR ALL TO authenticated USING (true);
