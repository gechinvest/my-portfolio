import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (fallback to localStorage if no env vars)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const PortfolioContext = createContext();

// Default portfolio data
const defaultPortfolioData = {
  hero: {
    name: 'Geta Tenaw',
    titles: ['Fullstack Developer', 'Cybersecurity Researcher', 'Problem Solver', 'Tech Innovator'],
    description: 'I craft secure digital experiences and build robust systems. Specializing in full-stack development and cybersecurity research.',
    profileImage: ''
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
      id: 1,
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
    email: 'amex44755@gmail.com',
    phone: '+251969093096',
    location: 'Your City, Country',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/ame12-max', icon: 'FiGithub' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/amame12', icon: 'FiLinkedin' },
      { name: 'YouTube', url: 'https://youtube.com/@TechSpire2112', icon: 'FiYoutube' },
      { name: 'Telegram', url: 'https://t.me/Techspiree', icon: 'FaTelegram' },
      { name: 'Twitter', url: 'https://x.com/AmareA98775', icon: 'FiTwitter' },
      { name: 'Instagram', url: 'https://instagram.com/amex44755', icon: 'FiInstagram' },
      { name: 'WhatsApp', url: 'https://wa.me/+251969093096', icon: 'FaWhatsapp' },
      { name: 'Email', url: 'mailto:amex44755@gmail.com', icon: 'FiMail' },
      { name: 'Telegram Channel', url: 'https://t.me/techspire_tech', icon: 'FaTelegram' },
      { name: 'Facebook', url: 'https://facebook.com/techspire', icon: 'FaFacebook' }
    ]
  },
  admin: {
    password: 'admin123'
  }
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : defaultPortfolioData;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('data')
          .eq('id', 1)
          .single();

        if (error) {
          console.error('Error fetching from Supabase:', error);
        } else if (data) {
          // Ensure admin password exists in data
          const updatedData = {
            ...defaultPortfolioData,
            ...data.data,
            admin: {
              ...defaultPortfolioData.admin,
              ...data.data.admin
            }
          };
          setPortfolioData(updatedData);
          localStorage.setItem('portfolioData', JSON.stringify(updatedData));
        }
      } catch (err) {
        console.error('Supabase fetch failed:', err);
      }
    }
    setLoading(false);
  };

  const updatePortfolioData = async (newData) => {
    setPortfolioData(newData);
    localStorage.setItem('portfolioData', JSON.stringify(newData));
    
    if (supabase) {
      try {
        const { error } = await supabase
          .from('portfolio')
          .upsert({ id: 1, data: newData });

        if (error) {
          console.error('Error updating Supabase:', error);
        }
      } catch (err) {
        console.error('Supabase update failed:', err);
      }
    }
  };

  const login = (password) => {
    const currentPassword = portfolioData.admin?.password || 'admin123';
    if (password === currentPassword) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const changeAdminPassword = (newPassword) => {
    const updatedData = {
      ...portfolioData,
      admin: {
        ...portfolioData.admin,
        password: newPassword
      }
    };
    updatePortfolioData(updatedData);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <PortfolioContext.Provider value={{ 
      portfolioData, 
      updatePortfolioData, 
      isAdmin, 
      login, 
      logout,
      changeAdminPassword
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};
