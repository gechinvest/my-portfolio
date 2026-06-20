# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** and fill in the details:
   - Name: `Portfolio`
   - Database Password: Choose a secure password (save this!)
   - Region: Choose the closest one to you
3. Click **Create new project** (it takes a few minutes to provision)

## Step 2: Create the Portfolio Table

Once your project is ready:

1. Go to **SQL Editor** → **New Query**
2. Paste this SQL code:

```sql
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default portfolio data
INSERT INTO portfolio (id, data)
VALUES (
  1,
  '{
    "hero": {
      "name": "Geta Tenaw",
      "titles": ["Fullstack Developer", "Cybersecurity Researcher", "Problem Solver", "Tech Innovator"],
      "description": "I craft secure digital experiences and build robust systems. Specializing in full-stack development and cybersecurity research.",
      "profileImage": ""
    },
    "about": {
      "description": "I'm a passionate Full-Stack Developer and Cybersecurity Researcher who enjoys building reliable, secure systems and modern web applications. I focus on writing clean, scalable code and creating efficient solutions to real-world problems while continuously learning new technologies.",
      "counters": [
        { "value": 2, "label": "Years Experience" },
        { "value": 25, "label": "Projects Completed" },
        { "value": 10, "label": "Technologies" }
      ]
    },
    "skills": [
      { "name": "React", "icon": "SiReact", "level": 90, "color": "#61DAFB" },
      { "name": "Node.js", "icon": "SiNodedotjs", "level": 85, "color": "#68A063" },
      { "name": "Express", "icon": "SiExpress", "level": 80, "color": "#808080" },
      { "name": "MySQL", "icon": "SiMysql", "level": 75, "color": "#00758F" },
      { "name": "JavaScript", "icon": "SiJavascript", "level": 95, "color": "#F7DF1E" },
      { "name": "HTML5", "icon": "SiHtml5", "level": 95, "color": "#E44D26" },
      { "name": "CSS3", "icon": "SiCss3", "level": 90, "color": "#1572B6" },
      { "name": "Tailwind", "icon": "SiTailwindcss", "level": 85, "color": "#38B2AC" },
      { "name": "Git", "icon": "SiGit", "level": 80, "color": "#F1502F" },
      { "name": "MongoDB", "icon": "SiMongodb", "level": 70, "color": "#4DB33D" },
      { "name": "Penetration Testing", "icon": "ShieldCheck", "level": 75, "color": "#EF4444" },
      { "name": "Network Security", "icon": "Lock", "level": 70, "color": "#10B981" }
    ],
    "projects": [
      {
        "id": 1,
        "title": "Video Editor Portfolio",
        "description": "A responsive portfolio website for a video editor showcasing projects and skills.",
        "image": "",
        "tags": ["React", "Express", "Resend Mail API", "Tailwind CSS"],
        "category": "frontend",
        "liveUrl": "https://epicedits-siol.vercel.app/",
        "githubUrl": "https://github.com/ame12-max/video-editor-porifolio"
      }
    ],
    "experience": [
      {
        "year": "2025 - Present",
        "title": "Fullstack Developer & Cybersecurity Researcher",
        "company": "Personal Projects",
        "description": "Designing and building secure fullstack web applications. Conducting cybersecurity research, penetration testing, and vulnerability assessments.",
        "icon": "🔐"
      }
    ],
    "contact": {
      "email": "your.email@example.com",
      "phone": "+123 456 7890",
      "location": "Your City, Country",
      "socialLinks": [
        { "name": "GitHub", "url": "https://github.com", "icon": "💻" },
        { "name": "LinkedIn", "url": "https://linkedin.com", "icon": "💼" }
      ]
    }
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;
```

3. Click **Run** to execute it!

## Step 3: Enable Row Level Security (RLS) - Optional but Recommended

1. Go to **Table Editor**
2. Click on the `portfolio` table
3. Go to **RLS Policies** → **Enable RLS**

## Step 4: Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy:
   - Project URL
   - anon/public key

## Step 5: Configure Your .env File

Create a `.env.local` (or rename `.env`) file in your project root:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```
