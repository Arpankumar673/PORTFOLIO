-- 1. Create the dedicated 'profile' table
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    image_url TEXT
);

-- 2. Enable RLS
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Access
CREATE POLICY "Public Read Profile" ON profile FOR SELECT USING (true);

-- 4. Admin Write Access
CREATE POLICY "Admin All Profile" ON profile FOR ALL TO authenticated USING (true);

-- 5. Seed the table with ID 1 (important for upsert)
INSERT INTO profile (id, image_url) 
VALUES (1, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;
