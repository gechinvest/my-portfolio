# 🚀 Complete Portfolio Deployment Guide

This guide will walk you through deploying your portfolio **fully automatically**!

---

## Step 1: Set Up Supabase (Database Backend)

1. Go to [supabase.com](https://supabase.com) and create a **free account**
2. Click **"New Project"**
   - Name your project: `Geta-Tenaw-Portfolio`
   - Choose a database password (save this somewhere safe!)
   - Select your region
   - Click **"Create new project"** (it takes ~2 minutes to set up)
3. Once your project is ready, go to **SQL Editor** → **New Query**
4. Copy and paste this SQL, then click **Run**:
   ```sql
   CREATE TABLE IF NOT EXISTS portfolio (
     id SERIAL PRIMARY KEY,
     data JSONB NOT NULL DEFAULT '{}'::jsonb,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

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
         "description": "I\'m a passionate Full-Stack Developer and Cybersecurity Researcher who enjoys building reliable, secure systems and modern web applications. I focus on writing clean, scalable code and creating efficient solutions to real-world problems while continuously learning new technologies.",
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
         { "name": "Penetration Testing", "icon": "🛡️", "level": 75, "color": "#EF4444" },
         { "name": "Network Security", "icon": "🔒", "level": 70, "color": "#10B981" }
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
       },
       "admin": {
         "password": "admin123"
       }
     }'::jsonb
   )
   ON CONFLICT (id) DO NOTHING;
   ```
5. Now go to **Project Settings** → **API** (left sidebar)
   - Copy your **Project URL** (it looks like `https://xxxxxx.supabase.co`)
   - Copy your **anon/public key**

---

## Step 2: Deploy Your Frontend to Vercel (Free & Automatic)

1. **Create a GitHub Repo**:
   - Go to [github.com/new](https://github.com/new)
   - Name it `geta-tenaw-portfolio` (or any name you like)
   - Keep it **Public** or **Private** (either is fine)
   - Click **"Create repository"** (don't initialize with README or anything)
   - Follow GitHub's instructions to push your code (run these commands in your project folder):
     ```bash
     git remote add origin https://github.com/[YOUR-GITHUB-USERNAME]/[YOUR-REPO-NAME].git
     git branch -M main
     git push -u origin main
     ```

2. **Deploy to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign up or log in with your GitHub account
   - Click **"Import"** next to your new repository
   - In the **"Project Settings"** section:
     - Add these **Environment Variables**:
       - `VITE_SUPABASE_URL`: Paste your Supabase Project URL
       - `VITE_SUPABASE_ANON_KEY`: Paste your Supabase anon/public key
   - Click **"Deploy"**!

3. That's it! 🎉 Your portfolio will be live in ~1 minute!

---

## Step 3: Done!

Your portfolio is now fully deployed and working! Visit the URL Vercel gives you, and enjoy your professional portfolio!

### To update your portfolio:
1. Make changes locally
2. Commit and push to GitHub (`git add .`, `git commit -m "Update", git push`)
3. Vercel will **automatically redeploy** your changes!

### To customize your portfolio:
1. Visit your portfolio at `/admin` (e.g., `https://your-site.vercel.app/admin`)
2. Login with your password (default is `admin123` - change this!)
3. Edit every section, upload your own images, and make it yours!
