-- Supabase Portfolio Table Setup
-- Run this in your Supabase SQL Editor

-- Create the portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial portfolio data using dollar quoting (avoids apostrophe issues)
INSERT INTO portfolio (id, data)
VALUES (
  1,
  $$
  {
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
      "email": "amex44755@gmail.com",
      "phone": "+251969093096",
      "location": "Your City, Country",
      "socialLinks": [
        { "name": "GitHub", "url": "https://github.com/ame12-max", "icon": "FiGithub" },
        { "name": "LinkedIn", "url": "https://linkedin.com/in/amame12", "icon": "FiLinkedin" },
        { "name": "YouTube", "url": "https://youtube.com/@TechSpire2112", "icon": "FiYoutube" },
        { "name": "Telegram", "url": "https://t.me/Techspiree", "icon": "FaTelegram" },
        { "name": "Twitter", "url": "https://x.com/AmareA98775", "icon": "FiTwitter" },
        { "name": "Instagram", "url": "https://instagram.com/amex44755", "icon": "FiInstagram" },
        { "name": "WhatsApp", "url": "https://wa.me/+251969093096", "icon": "FaWhatsapp" },
        { "name": "Email", "url": "mailto:amex44755@gmail.com", "icon": "FiMail" },
        { "name": "Telegram Channel", "url": "https://t.me/techspire_tech", "icon": "FaTelegram" },
        { "name": "Facebook", "url": "https://facebook.com/techspire", "icon": "FaFacebook" }
      ]
    },
    "admin": {
      "password": "admin123"
    }
  }
  $$::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- IMPORTANT: After creating the table, you need to disable RLS or create policies
-- Option 1: Disable RLS entirely (not recommended for production, but easy for testing)
ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS enabled, create these policies instead:
-- CREATE POLICY "Enable read access for all users" ON portfolio FOR SELECT USING (true);
-- CREATE POLICY "Enable insert access for all users" ON portfolio FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable update access for all users" ON portfolio FOR UPDATE USING (true);
-- CREATE POLICY "Enable delete access for all users" ON portfolio FOR DELETE USING (true);
