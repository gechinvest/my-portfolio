import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience'; 
import Socials from './pages/Socials';
import NotFound from './pages/NotFound';
import About from './components/About';
import Admin from './pages/Admin';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loader" />
      ) : (
        <>
          {!isAdminPage && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/socials" element={<Socials />} />
            <Route path='/skills' element={<Skills />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/experience' element={<Experience />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/admin' element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {!isAdminPage && <Footer />}
        </>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
