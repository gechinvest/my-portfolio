import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import {
  SiReact, SiNodedotjs, SiExpress, SiMysql,
  SiJavascript, SiHtml5, SiCss, SiTailwindcss,
  SiGit, SiMongodb
} from 'react-icons/si';
import { FaShieldAlt, FaLock } from 'react-icons/fa';

const IconComponent = ({ iconName, color, size = 48 }) => {
  const iconMap = {
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiMysql,
    SiJavascript,
    SiHtml5,
    SiCss3: SiCss,
    SiTailwindcss,
    SiGit,
    SiMongodb,
    ShieldCheck: FaShieldAlt,
    Lock: FaLock
  };

  const Icon = iconMap[iconName] || SiReact;
  return <Icon size={size} style={{ color }} />;
};

const Skills = () => {
  const { portfolioData } = usePortfolio();

  return (
    <section id="skills" className="py-20 bg-white/80 dark:bg-dark-300/80 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Tech <span className="gradient-text">Stack</span>
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {portfolioData.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl flex flex-col items-center"
            >
              <IconComponent iconName={skill.icon} color={skill.color} size={48} />
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{skill.name}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
