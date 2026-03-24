-- --- HARD RESET SCHEMA ---

-- 1. DROP EXISTING TABLES (Optional but helps reset)
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS about;
DROP TABLE IF EXISTS messages;

-- 2. CREATE TABLES
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  tech_stack TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Frontend',
  percentage INTEGER DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE about (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  email TEXT,
  resume_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. INSERT INITIAL ABOUT DATA
INSERT INTO about (id, title, description, email) 
VALUES (1, 'Premium Developer', 'I design and build high-performance digital experiences.', 'your@email.com')
ON CONFLICT (id) DO NOTHING;

-- 4. ENABLE RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES (Public View, Auth Edit)

-- Projects
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin All Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Skills
CREATE POLICY "Public Read Skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin All Skills" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- About
CREATE POLICY "Public Read About" ON about FOR SELECT USING (true);
CREATE POLICY "Admin All About" ON about FOR ALL USING (auth.role() = 'authenticated');

-- Messages
CREATE POLICY "Public Insert Messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Messages" ON messages FOR ALL USING (auth.role() = 'authenticated');

-- 6. STORAGE BUCKET (Run in SQL or via Dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true) ON CONFLICT (id) DO NOTHING;
