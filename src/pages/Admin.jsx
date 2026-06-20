import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

const Admin = () => {
  const { portfolioData, updatePortfolioData, isAdmin, login, logout, changeAdminPassword } = usePortfolio();
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [editingItem, setEditingItem] = useState(null);
  const [projectImagePreview, setProjectImagePreview] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [formData, setFormData] = useState({});
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const navigate = useNavigate();

  // Handle file input for profile image
  const handleProfileFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file input for project images
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImagePreview(reader.result);
        setFormData({ ...formData, projectImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleHeroUpdate = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    updatePortfolioData({
      ...portfolioData,
      hero: {
        name: formDataObj.get('name'),
        titles: formDataObj.get('titles').split(',').map(t => t.trim()),
        description: formDataObj.get('description'),
        profileImage: formData.profileImage || portfolioData.hero.profileImage
      }
    });
    setProfileImagePreview('');
    setFormData({});
    alert('Hero section updated!');
  };

  const handleAboutUpdate = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    updatePortfolioData({
      ...portfolioData,
      about: {
        description: formDataObj.get('description'),
        counters: portfolioData.about.counters
      }
    });
    alert('About section updated!');
  };

  const handleCounterUpdate = (index, field, value) => {
    const newCounters = [...portfolioData.about.counters];
    if (field === 'value') {
      newCounters[index].value = parseInt(value);
    } else {
      newCounters[index].label = value;
    }
    updatePortfolioData({
      ...portfolioData,
      about: { ...portfolioData.about, counters: newCounters }
    });
  };

  const addCounter = () => {
    updatePortfolioData({
      ...portfolioData,
      about: {
        ...portfolioData.about,
        counters: [...portfolioData.about.counters, { value: 0, label: 'New Counter' }]
      }
    });
  };

  const removeCounter = (index) => {
    updatePortfolioData({
      ...portfolioData,
      about: {
        ...portfolioData.about,
        counters: portfolioData.about.counters.filter((_, i) => i !== index)
      }
    });
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    const skill = {
      name: formDataObj.get('skillName'),
      icon: formDataObj.get('skillIcon'),
      level: parseInt(formDataObj.get('skillLevel')),
      color: formDataObj.get('skillColor')
    };

    if (editingItem !== null) {
      const newSkills = [...portfolioData.skills];
      newSkills[editingItem] = skill;
      updatePortfolioData({ ...portfolioData, skills: newSkills });
    } else {
      updatePortfolioData({
        ...portfolioData,
        skills: [...portfolioData.skills, skill]
      });
    }
    setEditingItem(null);
    e.target.reset();
  };

  const editSkill = (index) => {
    setEditingItem(index);
    setActiveSection('skills');
  };

  const deleteSkill = (index) => {
    updatePortfolioData({
      ...portfolioData,
      skills: portfolioData.skills.filter((_, i) => i !== index)
    });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    const project = {
      id: editingItem !== null ? portfolioData.projects[editingItem].id : Date.now(),
      title: formDataObj.get('projectTitle'),
      description: formDataObj.get('projectDescription'),
      image: formData.projectImage || formDataObj.get('projectImage'),
      tags: formDataObj.get('projectTags').split(',').map(t => t.trim()),
      category: formDataObj.get('projectCategory'),
      liveUrl: formDataObj.get('projectLiveUrl'),
      githubUrl: formDataObj.get('projectGithubUrl')
    };

    if (editingItem !== null) {
      const newProjects = [...portfolioData.projects];
      newProjects[editingItem] = project;
      updatePortfolioData({ ...portfolioData, projects: newProjects });
    } else {
      updatePortfolioData({
        ...portfolioData,
        projects: [...portfolioData.projects, project]
      });
    }
    setEditingItem(null);
    setProjectImagePreview('');
    setFormData({});
    e.target.reset();
  };

  const editProject = (index) => {
    setEditingItem(index);
    setActiveSection('projects');
    setProjectImagePreview(portfolioData.projects[index].image);
    setFormData({ projectImage: portfolioData.projects[index].image });
  };

  const deleteProject = (index) => {
    updatePortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.filter((_, i) => i !== index)
    });
  };

  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    const experience = {
      year: formDataObj.get('expYear'),
      title: formDataObj.get('expTitle'),
      company: formDataObj.get('expCompany'),
      description: formDataObj.get('expDescription'),
      icon: formDataObj.get('expIcon')
    };

    if (editingItem !== null) {
      const newExperience = [...portfolioData.experience];
      newExperience[editingItem] = experience;
      updatePortfolioData({ ...portfolioData, experience: newExperience });
    } else {
      updatePortfolioData({
        ...portfolioData,
        experience: [...portfolioData.experience, experience]
      });
    }
    setEditingItem(null);
    e.target.reset();
  };

  const editExperience = (index) => {
    setEditingItem(index);
    setActiveSection('experience');
  };

  const deleteExperience = (index) => {
    updatePortfolioData({
      ...portfolioData,
      experience: portfolioData.experience.filter((_, i) => i !== index)
    });
  };

  const handleContactUpdate = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    updatePortfolioData({
      ...portfolioData,
      contact: {
        email: formDataObj.get('contactEmail'),
        phone: formDataObj.get('contactPhone'),
        location: formDataObj.get('contactLocation'),
        socialLinks: portfolioData.contact.socialLinks
      }
    });
    alert('Contact section updated!');
  };

  const handleSocialLinkUpdate = (index, field, value) => {
    const newSocialLinks = [...portfolioData.contact.socialLinks];
    newSocialLinks[index][field] = value;
    updatePortfolioData({
      ...portfolioData,
      contact: { ...portfolioData.contact, socialLinks: newSocialLinks }
    });
  };

  const addSocialLink = () => {
    updatePortfolioData({
      ...portfolioData,
      contact: {
        ...portfolioData.contact,
        socialLinks: [...portfolioData.contact.socialLinks, { name: 'New Social', url: '', icon: '🔗' }]
      }
    });
  };

  const removeSocialLink = (index) => {
    updatePortfolioData({
      ...portfolioData,
      contact: {
        ...portfolioData.contact,
        socialLinks: portfolioData.contact.socialLinks.filter((_, i) => i !== index)
      }
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newAdminPassword !== confirmAdminPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newAdminPassword.length < 4) {
      alert('Password must be at least 4 characters!');
      return;
    }
    changeAdminPassword(newAdminPassword);
    setNewAdminPassword('');
    setConfirmAdminPassword('');
    alert('Admin password updated successfully!');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-dark-300 dark:to-dark-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 rounded-2xl w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center mb-6 gradient-text">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-dark-200/70 text-gray-900 dark:text-white"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-dark-300 dark:to-dark-200 py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
            >
              View Portfolio
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['hero', 'about', 'skills', 'projects', 'experience', 'contact', 'settings'].map(section => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section);
                setEditingItem(null);
              }}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeSection === section
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'glass text-gray-700 dark:text-gray-300 hover:bg-white/50'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div className="glass p-8 rounded-2xl">
          {activeSection === 'hero' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
              <form onSubmit={handleHeroUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={portfolioData.hero.name}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Titles (comma-separated)</label>
                  <input
                    type="text"
                    name="titles"
                    defaultValue={portfolioData.hero.titles.join(', ')}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    defaultValue={portfolioData.hero.description}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Profile Image</label>
                  <div className="flex gap-4 items-start">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileFileChange}
                      className="flex-1 px-4 py-2 rounded-lg border"
                    />
                  </div>
                  {(profileImagePreview || portfolioData.hero.profileImage) && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium mb-1">Preview</label>
                      <img
                        src={profileImagePreview || portfolioData.hero.profileImage}
                        alt="Profile preview"
                        className="w-32 h-32 object-cover rounded-full border"
                      />
                    </div>
                  )}
                </div>
                <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Save Hero
                </button>
              </form>
            </div>
          )}

          {activeSection === 'about' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">About Section</h2>
              <form onSubmit={handleAboutUpdate} className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    rows="6"
                    defaultValue={portfolioData.about.description}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Save Description
                </button>
              </form>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Counters</h3>
                <div className="space-y-4">
                  {portfolioData.about.counters.map((counter, i) => (
                    <div key={i} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Value</label>
                        <input
                          type="number"
                          value={counter.value}
                          onChange={(e) => handleCounterUpdate(i, 'value', e.target.value)}
                          className="w-full px-3 py-2 rounded border"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Label</label>
                        <input
                          type="text"
                          value={counter.label}
                          onChange={(e) => handleCounterUpdate(i, 'label', e.target.value)}
                          className="w-full px-3 py-2 rounded border"
                        />
                      </div>
                      <button
                        onClick={() => removeCounter(i)}
                        className="px-3 py-2 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addCounter}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add Counter
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'skills' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Skills</h2>
              <form onSubmit={handleSkillSubmit} className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-1">Skill Name</label>
                  <input
                    type="text"
                    name="skillName"
                    defaultValue={editingItem !== null ? portfolioData.skills[editingItem].name : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <input
                    type="text"
                    name="skillIcon"
                    defaultValue={editingItem !== null ? portfolioData.skills[editingItem].icon : 'SiReact'}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <input
                    type="color"
                    name="skillColor"
                    defaultValue={editingItem !== null ? portfolioData.skills[editingItem].color : '#000000'}
                    className="w-full h-12 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Level (0-100)</label>
                  <input
                    type="number"
                    name="skillLevel"
                    min="0"
                    max="100"
                    defaultValue={editingItem !== null ? portfolioData.skills[editingItem].level : 50}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    {editingItem !== null ? 'Update Skill' : 'Add Skill'}
                  </button>
                  {editingItem !== null && (
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="grid gap-4">
                {portfolioData.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl"
                      style={{ backgroundColor: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{skill.name}</h3>
                      <p className="text-sm text-gray-500">Level: {skill.level}%</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editSkill(i)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSkill(i)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'projects' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Projects</h2>
              <form onSubmit={handleProjectSubmit} className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Title</label>
                  <input
                    type="text"
                    name="projectTitle"
                    defaultValue={editingItem !== null ? portfolioData.projects[editingItem].title : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="projectDescription"
                    rows="4"
                    defaultValue={editingItem !== null ? portfolioData.projects[editingItem].description : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Project Image</label>
                  <div className="flex gap-4 items-start">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="flex-1 px-4 py-2 rounded-lg border"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-1">Or Image URL</label>
                    <input
                      type="text"
                      name="projectImage"
                      defaultValue={editingItem !== null ? portfolioData.projects[editingItem].image : ''}
                      className="w-full px-4 py-2 rounded-lg border"
                    />
                  </div>
                  {(projectImagePreview || (editingItem !== null && portfolioData.projects[editingItem].image)) && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium mb-1">Preview</label>
                      <img
                        src={projectImagePreview || (editingItem !== null ? portfolioData.projects[editingItem].image : '')}
                        alt="Project preview"
                        className="w-48 h-36 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="projectTags"
                    defaultValue={editingItem !== null ? portfolioData.projects[editingItem].tags.join(', ') : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    name="projectCategory"
                    defaultValue={editingItem !== null ? portfolioData.projects[editingItem].category : 'fullstack'}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Live URL</label>
                  <input
                    type="url"
                    name="projectLiveUrl"
                    defaultValue={editingItem !== null ? portfolioData.projects[editingItem].liveUrl : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub URL</label>
                  <input
                    type="url"
                    name="projectGithubUrl"
                    defaultValue={editingItem !== null ? portfolioData.projects[editingItem].githubUrl : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    {editingItem !== null ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingItem !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(null);
                        setProjectImagePreview('');
                      }}
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="grid gap-4">
                {portfolioData.projects.map((project, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-24 h-24 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{project.category}</p>
                      <p className="text-sm line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editProject(i)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(i)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'experience' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Experience</h2>
              <form onSubmit={handleExperienceSubmit} className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <input
                    type="text"
                    name="expYear"
                    defaultValue={editingItem !== null ? portfolioData.experience[editingItem].year : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="expTitle"
                    defaultValue={editingItem !== null ? portfolioData.experience[editingItem].title : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    name="expCompany"
                    defaultValue={editingItem !== null ? portfolioData.experience[editingItem].company : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="expDescription"
                    rows="4"
                    defaultValue={editingItem !== null ? portfolioData.experience[editingItem].description : ''}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    name="expIcon"
                    defaultValue={editingItem !== null ? portfolioData.experience[editingItem].icon : '🚀'}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    {editingItem !== null ? 'Update Experience' : 'Add Experience'}
                  </button>
                  {editingItem !== null && (
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="grid gap-4">
                {portfolioData.experience.map((exp, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="text-4xl">{exp.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{exp.title}</h3>
                      <p className="text-sm text-purple-500 mb-1">{exp.company} • {exp.year}</p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editExperience(i)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteExperience(i)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Section</h2>
              <form onSubmit={handleContactUpdate} className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    defaultValue={portfolioData.contact.email}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    defaultValue={portfolioData.contact.phone}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="contactLocation"
                    defaultValue={portfolioData.contact.location}
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Save Contact Info
                </button>
              </form>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Social Links</h3>
                <div className="space-y-4">
                  {portfolioData.contact.socialLinks.map((link, i) => (
                    <div key={i} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => handleSocialLinkUpdate(i, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded border"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">URL</label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleSocialLinkUpdate(i, 'url', e.target.value)}
                          className="w-full px-3 py-2 rounded border"
                        />
                      </div>
                      <div className="w-24">
                        <label className="block text-sm font-medium mb-1">Icon</label>
                        <input
                          type="text"
                          value={link.icon}
                          onChange={(e) => handleSocialLinkUpdate(i, 'icon', e.target.value)}
                          className="w-full px-3 py-2 rounded border"
                        />
                      </div>
                      <button
                        onClick={() => removeSocialLink(i)}
                        className="px-3 py-2 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSocialLink}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add Social Link
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Change Admin Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmAdminPassword}
                      onChange={(e) => setConfirmAdminPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Change Password
                  </button>
                </form>
              </div>
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Username/Name</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To change your displayed name, go to the "Hero" section above!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
