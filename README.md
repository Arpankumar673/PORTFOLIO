# Premium Personal Portfolio - Supabase Edition

A modern, highly animated, professional portfolio website migrated to **Supabase** (PostgreSQL + Auth + Storage).

## 🚀 Migration Features

- **Database:** Replaced MongoDB with **Supabase PostgreSQL**.
- **Authentication:** Replaced custom JWT with **Supabase Auth** (Email/Password).
- **Backend:** Removed Express server (Direct frontend-to-Supabase integration).
- **Storage:** Integrated **Supabase Storage** for PDF resume management.
- **Security:** Implemented **Row Level Security (RLS)** for all data.

## 🛠️ Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, GSAP, Lenis, Lucide Icons.
- **Backend-as-a-Service:** Supabase (Auth, Database, Storage).

## 📋 Setup Instructions

### 1. Supabase Setup
1. Create a new project on [Supabase.com](https://supabase.com).
2. Go to **SQL Editor** and run the contents of `supabase_setup.sql` (found in root).
3. Go to **Storage**, create a new bucket named `resumes`, and make it **Public**.
4. Go to **Authentication** > **Users**, and manually add yourself as a user (email + password).

### 2. Frontend Configuration
1. Navigate to `frontend/`.
2. Create or update `.env.local` using `.env.example`.
3. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase Dashboard (**Project Settings > API**).

### 3. Installation & Run
1. Run `npm install` inside the `frontend/` directory.
2. Run `npm run dev` to start the development server.

### 4. Admin Dashboard
Visit `http://localhost:5173/login` to log in with your Supabase credentials and manage your data.

## 📁 Key Files
- `src/lib/supabaseClient.js`: Client initialization.
- `src/lib/services.js`: Database and Storage operations.
- `src/context/AuthContext.jsx`: Session management.
- `supabase_setup.sql`: Database schema and RLS policies.

---

Designed and Developed by Antigravity AI.
