import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
const { Database, verbose } = sqlite3;
const db = verbose();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'portfolio.db');
const database = new Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
  database.serialize(() => {
    database.run(`CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const defaultData = JSON.stringify({
      hero: {
        name: 'Geta Tenaw',
        titles: ['Fullstack Developer', 'Cybersecurity Researcher', 'Problem Solver', 'Tech Innovator'],
        description: 'I craft secure digital experiences and build robust systems. Specializing in full-stack development and cybersecurity research.',
        profileImage: '/src/assets/profile.png'
      },
      about: {
        description: 'I\'m a passionate Full-Stack Developer and Cybersecurity Researcher who enjoys building reliable, secure systems and modern web applications. I focus on writing clean, scalable code and creating efficient solutions to real-world problems while continuously learning new technologies.',
        counters: [
          { value: 2, label: 'Years Experience' },
          { value: 25, label: 'Projects Completed' },
          { value: 10, label: 'Technologies' }
        ]
      },
      skills: [
        { name: 'React', icon: 'SiReact', level: 90, color: '#61DAFB' },
        { name: 'Node.js', icon: 'SiNodedotjs', level: 85, color: '#68A063' },
        { name: 'Express', icon: 'SiExpress', level: 80, color: '#808080' },
        { name: 'MySQL', icon: 'SiMysql', level: 75, color: '#00758F' },
        { name: 'JavaScript', icon: 'SiJavascript', level: 95, color: '#F7DF1E' },
        { name: 'HTML5', icon: 'SiHtml5', level: 95, color: '#E44D26' },
        { name: 'CSS3', icon: 'SiCss3', level: 90, color: '#1572B6' },
        { name: 'Tailwind', icon: 'SiTailwindcss', level: 85, color: '#38B2AC' },
        { name: 'Git', icon: 'SiGit', level: 80, color: '#F1502F' },
        { name: 'MongoDB', icon: 'SiMongodb', level: 70, color: '#4DB33D' },
        { name: 'Penetration Testing', icon: 'ShieldCheck', level: 75, color: '#EF4444' },
        { name: 'Network Security', icon: 'Lock', level: 70, color: '#10B981' }
      ],
      projects: [
        {
          id: Date.now(),
          title: 'Video Editor Portfolio',
          description: 'A responsive portfolio website for a video editor showcasing projects and skills.',
          image: '',
          tags: ['React', 'Express', 'Resend Mail API', 'Tailwind CSS'],
          category: 'frontend',
          liveUrl: 'https://epicedits-siol.vercel.app/',
          githubUrl: 'https://github.com/ame12-max/video-editor-porifolio'
        }
      ],
      experience: [
        {
          year: '2025 - Present',
          title: 'Fullstack Developer & Cybersecurity Researcher',
          company: 'Personal Projects',
          description: 'Designing and building secure fullstack web applications. Conducting cybersecurity research, penetration testing, and vulnerability assessments.',
          icon: '🔐'
        }
      ],
      contact: {
        email: 'your.email@example.com',
        phone: '+123 456 7890',
        location: 'Your City, Country',
        socialLinks: [
          { name: 'GitHub', url: 'https://github.com', icon: '💻' },
          { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' }
        ]
      }
    });

    database.get('SELECT * FROM portfolio WHERE id = 1', (err, row) => {
      if (err) {
        console.error('Error checking for existing data:', err);
      } else if (!row) {
        database.run('INSERT INTO portfolio (data) VALUES (?)', [defaultData], (err) => {
          if (err) {
            console.error('Error inserting default data:', err);
          } else {
            console.log('Default portfolio data inserted');
          }
        });
      }
    });
  });
}

app.get('/api/portfolio', (req, res) => {
  database.get('SELECT data FROM portfolio WHERE id = 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch portfolio data' });
    } else if (row) {
      res.json(JSON.parse(row.data));
    } else {
      res.status(404).json({ error: 'Portfolio data not found' });
    }
  });
});

app.put('/api/portfolio', (req, res) => {
  const newData = JSON.stringify(req.body);
  database.run(
    'UPDATE portfolio SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
    [newData],
    (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to update portfolio data' });
      } else {
        res.json({ message: 'Portfolio data updated successfully' });
      }
    }
  );
});

app.post('/api/contact', (req, res) => {
  res.json({ message: 'Contact form received!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
