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
    name: '',
    titles: ['Developer'],
    description: '',
    profileImage: ''
  },
  about: {
    description: '',
    counters: [
      { value: 0, label: 'Years Experience' },
      { value: 0, label: 'Projects Completed' },
      { value: 0, label: 'Technologies' }
    ]
  },
  skills: [],
  projects: [],
  experience: [],
  contact: {
    email: '',
    phone: '',
    location: '',
    socialLinks: []
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
  const [dbStatus, setDbStatus] = useState('checking'); // 'checking', 'connected', 'disconnected', 'error'
  const [lastSync, setLastSync] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    if (supabase) {
      try {
        console.log('📡 Fetching portfolio data from Supabase...');
        const { data, error } = await supabase
          .from('portfolio')
          .select('data, updated_at')
          .eq('id', 1)
          .single();

        if (error) {
          console.error('❌ Error fetching from Supabase:', error);
          console.error('💡 Make sure you have created the portfolio table in your Supabase dashboard!');
          console.error('📋 Check the supabase-setup.sql file in your project for instructions.');
          setDbStatus('error');
        } else if (data) {
          console.log('✅ Successfully fetched data from Supabase');
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
          setDbStatus('connected');
          setLastSync(data.updated_at);
        } else {
          console.log('⚠️ No data found in Supabase, using local data');
          setDbStatus('disconnected');
        }
      } catch (err) {
        console.error('❌ Supabase fetch failed:', err);
        setDbStatus('error');
      }
    } else {
      console.log('⚠️ Supabase not configured, using localStorage only');
      setDbStatus('disconnected');
    }
    setLoading(false);
  };

  const updatePortfolioData = async (newData) => {
    console.log('💾 Updating portfolio data...');
    setPortfolioData(newData);
    localStorage.setItem('portfolioData', JSON.stringify(newData));
    
    if (supabase) {
      try {
        console.log('📡 Syncing to Supabase...');
        const { error } = await supabase
          .from('portfolio')
          .upsert({ id: 1, data: newData });

        if (error) {
          console.error('❌ Error updating Supabase:', error);
          console.error('💡 Make sure your portfolio table exists and RLS policies allow updates!');
          setDbStatus('error');
        } else {
          console.log('✅ Successfully synced to Supabase');
          setDbStatus('connected');
          setLastSync(new Date().toISOString());
        }
      } catch (err) {
        console.error('❌ Supabase update failed:', err);
        setDbStatus('error');
      }
    } else {
      console.log('⚠️ Supabase not configured, changes saved locally only');
    }
  };

  // Function to sync local data to Supabase (useful after setting up the table)
  const syncLocalToSupabase = async () => {
    if (!supabase) {
      console.error('❌ Supabase not configured');
      return false;
    }
    
    try {
      console.log('📤 Syncing local data to Supabase...');
      const { error } = await supabase
        .from('portfolio')
        .upsert({ id: 1, data: portfolioData });

      if (error) {
        console.error('❌ Error syncing to Supabase:', error);
        return false;
      }
      
      console.log('✅ Successfully synced local data to Supabase!');
      setDbStatus('connected');
      setLastSync(new Date().toISOString());
      return true;
    } catch (err) {
      console.error('❌ Sync failed:', err);
      return false;
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-dark-300 dark:to-dark-200">
        <div className="text-2xl font-bold gradient-text mb-4">Loading Portfolio...</div>
        <div className="text-gray-600 dark:text-gray-400">
          {dbStatus === 'checking' && 'Checking database connection...'}
          {dbStatus === 'disconnected' && 'Using local storage'}
          {dbStatus === 'error' && 'Database error, using local storage'}
        </div>
      </div>
    );
  }

  return (
    <PortfolioContext.Provider value={{ 
      portfolioData, 
      updatePortfolioData, 
      isAdmin, 
      login, 
      logout,
      changeAdminPassword,
      dbStatus,
      lastSync,
      syncLocalToSupabase,
      fetchPortfolioData
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};
