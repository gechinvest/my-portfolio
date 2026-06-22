-- Supabase Portfolio Table Setup with Sample Data
-- Run this in your Supabase SQL Editor
-- THIS IS SAFE - IT WILL NOT DELETE YOUR EXISTING DATA

-- Create the portfolio table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample portfolio data (only if row with id=1 doesn't exist)
INSERT INTO portfolio (id, data)
VALUES (
  1,
  $$
  {
    "hero": {
      "name": "Geta Tenaw",
      "titles": ["Full Stack Developer", "Cybersecurity Researcher", "Tech Innovator"],
      "description": "Passionate about building secure, scalable web applications and exploring the latest in cybersecurity and AI.",
      "profileImage": ""
    },
    "about": {
      "description": "I'm a Full Stack Developer and Cybersecurity Researcher with 3+ years of experience. I specialize in React, Node.js, and secure coding practices.",
      "counters": [
        { "value": 3, "label": "Years Experience" },
        { "value": 20, "label": "Projects Completed" },
        { "value": 15, "label": "Technologies" }
      ]
    },
    "skills": [
      { "name": "React", "icon": "SiReact", "level": 90, "color": "#61DAFB" },
      { "name": "Node.js", "icon": "SiNodedotjs", "level": 85, "color": "#68A063" },
      { "name": "TypeScript", "icon": "SiTypescript", "level": 80, "color": "#3178C6" },
      { "name": "PostgreSQL", "icon": "SiPostgresql", "level": 75, "color": "#336791" },
      { "name": "JavaScript", "icon": "SiJavascript", "level": 95, "color": "#F7DF1E" },
      { "name": "HTML5", "icon": "SiHtml5", "level": 95, "color": "#E34F26" },
      { "name": "CSS3", "icon": "SiCss3", "level": 90, "color": "#1572B6" },
      { "name": "Tailwind CSS", "icon": "SiTailwindcss", "level": 85, "color": "#06B6D4" },
      { "name": "Git", "icon": "SiGit", "level": 80, "color": "#F05032" },
      { "name": "Penetration Testing", "icon": "ShieldCheck", "level": 75, "color": "#EF4444" }
    ],
    "projects": [
      {
        "id": 1,
        "title": "Portfolio Website",
        "description": "A modern, responsive portfolio website built with React and Supabase.",
        "image": "",
        "tags": ["React", "Supabase", "Tailwind CSS"],
        "category": "frontend",
        "liveUrl": "https://my-portfolio-7je2v8v5r-geta1.vercel.app",
        "githubUrl": "https://github.com/gechinvest/my-portfolio"
      },
      {
        "id": 2,
        "title": "Secure Chat App",
        "description": "End-to-end encrypted chat application with real-time messaging.",
        "image": "",
        "tags": ["React", "Node.js", "Socket.io", "AES-256"],
        "category": "fullstack",
        "liveUrl": "",
        "githubUrl": ""
      },
      {
        "id": 3,
        "title": "E-Commerce Dashboard",
        "description": "Analytics dashboard for e-commerce businesses with real-time data.",
        "image": "",
        "tags": ["React", "Chart.js", "Express", "MongoDB"],
        "category": "fullstack",
        "liveUrl": "",
        "githubUrl": ""
      }
    ],
    "experience": [
      {
        "year": "2024 - Present",
        "title": "Full Stack Developer",
        "company": "Tech Innovations Inc.",
        "description": "Developing and maintaining full-stack web applications, implementing security best practices.",
        "icon": "💻"
      },
      {
        "year": "2023 - 2024",
        "title": "Cybersecurity Research Intern",
        "company": "Security Labs",
        "description": "Conducted vulnerability assessments and penetration testing for web applications.",
        "icon": "🔐"
      }
    ],
    "contact": {
      "email": "geta.tenaw@example.com",
      "phone": "+123 456 7890",
      "location": "Addis Ababa, Ethiopia",
      "socialLinks": [
        { "name": "GitHub", "url": "https://github.com/gechinvest", "icon": "🐙" },
        { "name": "LinkedIn", "url": "https://linkedin.com/in/getatenaw", "icon": "💼" },
        { "name": "Twitter", "url": "https://twitter.com/getatenaw", "icon": "🐦" }
      ]
    },
    "admin": {
      "password": "admin123"
    }
  }
  $$::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS (recommended for security)
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (to avoid errors if they already exist)
DROP POLICY IF EXISTS "Allow public read access on portfolio" ON portfolio;
DROP POLICY IF EXISTS "Allow public write access on portfolio" ON portfolio;

-- Create RLS policies to allow public read/write access (since this is a portfolio)
CREATE POLICY "Allow public read access on portfolio"
  ON portfolio
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public write access on portfolio"
  ON portfolio
  FOR ALL
  USING (true)
  WITH CHECK (true);
