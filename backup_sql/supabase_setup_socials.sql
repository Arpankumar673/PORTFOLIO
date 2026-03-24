-- 1. Create Social Links table
CREATE TABLE IF NOT EXISTS social_links (
    id SERIAL PRIMARY KEY,
    twitter TEXT,
    github TEXT,
    linkedin TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- 3. Define Policies
CREATE POLICY "Public Read Social Links" ON social_links FOR SELECT USING (true);
CREATE POLICY "Admin All Social Links" ON social_links FOR ALL TO authenticated USING (true);

-- 4. Initial Seed Record
INSERT INTO social_links (id, twitter, github, linkedin, email) 
VALUES (1, 'https://twitter.com/arpan', 'https://github.com/arpankumar673', 'https://linkedin.com/in/arpan', 'arpan112230@gmail.com')
ON CONFLICT (id) DO NOTHING;
