import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '../context/PortfolioContext';

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeFilter, setActiveFilter] = useState('all');
  const { portfolioData } = usePortfolio();

  const filteredProjects = activeFilter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(project => project.category === activeFilter);

  const categories = ['all', ...new Set(portfolioData.projects.map(p => p.category))];

  return (
    <section id="projects" ref={ref} className="py-20 bg-white/80 dark:bg-dark-300/80 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent works that showcase my skills and experience in web development and cybersecurity.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'glass text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-dark-200/50'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                <div className="relative overflow-hidden h-48">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-4xl">💻</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-center py-2 rounded-lg transition-all duration-300"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 glass text-gray-700 dark:text-gray-300 text-center py-2 rounded-lg hover:bg-white/50 dark:hover:bg-dark-200/50 transition-all duration-300"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
