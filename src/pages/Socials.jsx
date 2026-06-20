import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiYoutube, FiInstagram, FiTwitter, FiLink } from 'react-icons/fi';
import { FaTelegram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import Background3D from '../components/Background3D';

// Icon mapping for socials
const getIconComponent = (iconName) => {
  switch(iconName) {
    case 'FiGithub': case 'github': case '💻': return FiGithub;
    case 'FiLinkedin': case 'linkedin': case '💼': return FiLinkedin;
    case 'FiYoutube': case 'youtube': return FiYoutube;
    case 'FaTelegram': case 'telegram': return FaTelegram;
    case 'FiTwitter': case 'twitter': return FiTwitter;
    case 'FiInstagram': case 'instagram': return FiInstagram;
    case 'FaWhatsapp': case 'whatsapp': return FaWhatsapp;
    case 'FiMail': case 'email': case 'mail': return FiMail;
    case 'FaFacebook': case 'facebook': return FaFacebook;
    default: return FiLink;
  }
};

const getIconColor = (name) => {
  switch(name.toLowerCase()) {
    case 'github': return '#333';
    case 'linkedin': return '#0A66C2';
    case 'youtube': return '#FF0000';
    case 'telegram': return '#26A5E4';
    case 'twitter': case 'x': return '#1DA1F2';
    case 'instagram': return '#E4405F';
    case 'whatsapp': return '#25D366';
    case 'email': case 'mail': return '#EA4335';
    case 'facebook': return '#1877F2';
    default: return '#6366F1';
  }
};

const Socials = () => {
  const { portfolioData } = usePortfolio();
  const socialLinks = portfolioData.contact.socialLinks;

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <Background3D />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect with <span className="gradient-text">{portfolioData.hero.name}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find me on all your favorite platforms. Let's create something amazing together!
          </p>
        </motion.div>

        {socialLinks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {socialLinks.map((social, index) => {
              const IconComponent = getIconComponent(social.icon);
              return (
                <motion.a
                  key={index}
                  href={social.url.startsWith('http://') || social.url.startsWith('https://') || social.url.startsWith('mailto:') ? social.url : 'https://' + social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-6 rounded-2xl flex flex-col items-center justify-center group"
                >
                  <IconComponent
                    className="text-5xl mb-3 transition-transform group-hover:scale-110"
                    style={{ color: getIconColor(social.name) }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{social.name}</span>
                </motion.a>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No social links yet. Add some in the admin dashboard!</p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 glass text-gray-800 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Socials;
