import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Projects.scss';

const iconMap = {
  camera: '📷',
  chart: '📊',
  hand: '🤟',
  shield: '🛡️',
  scan: '🔍',
  car: '🚗',
  brain: '🧠',
  book: '📖',
  language: '🗣️',
};

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProjectName, setActiveProjectName] = useState(projects[0]?.name || '');
  const [ref, isVisible] = useScrollAnimation();

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  const activeProject =
    filteredProjects.find((p) => p.name === activeProjectName) || filteredProjects[0];

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    const nextList = category === 'All' ? projects : projects.filter((p) => p.category === category);
    setActiveProjectName(nextList[0]?.name || '');
  };

  const cycleProject = (step) => {
    const currentIndex = filteredProjects.findIndex((p) => p.name === activeProject?.name);
    const nextIndex = (currentIndex + step + filteredProjects.length) % filteredProjects.length;
    setActiveProjectName(filteredProjects[nextIndex].name);
  };

  return (
    <section className="projects" id="projects">
      <div className="projects-container" ref={ref}>
        <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
          Featured <span>Projects</span>
        </h2>

        <div className={`project-filters animate-on-scroll delay-1 ${isVisible ? 'visible' : ''}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className={`projects-showcase animate-on-scroll delay-2 ${isVisible ? 'visible' : ''}`}>
            <aside className="projects-tabs">
              {filteredProjects.map((project) => (
                <button
                  key={project.name}
                  className={`switch-tab ${activeProject?.name === project.name ? 'active' : ''}`}
                  onClick={() => setActiveProjectName(project.name)}
                >
                  <span className="switch-tab-title">{project.name}</span>
                  <span className="switch-tab-meta">{project.category}</span>
                </button>
              ))}
            </aside>

            <article className={`project-card project-card--single project-card--${activeProject.theme || 'default'} animate-scale delay-3 ${isVisible ? 'visible' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.name}
                  className="project-inner"
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`project-hero ${activeProject.image ? 'has-image' : 'no-image'} project-hero--${activeProject.theme || 'default'}`}>
                    {activeProject.image ? (
                      <img src={activeProject.image} alt={activeProject.name} className="project-cover-img" loading="lazy" />
                    ) : (
                      <div className="project-hero-icon">{iconMap[activeProject.icon] || '🤖'}</div>
                    )}
                    <div className="project-hero-overlay"></div>
                    
                    <div className="project-hero-content">
                      <span className="project-category">{activeProject.category}</span>
                      <h3 className="project-name">{activeProject.name}</h3>
                      <p className="project-subtitle">{activeProject.subtitle}</p>
                    </div>
                  </div>

                  <div className="project-details">
                    <div className="project-actions">
                      <div className="project-tech">
                        {activeProject.tech.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        {activeProject.github && (
                          <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="action-btn" aria-label={`${activeProject.name} GitHub`}>
                            <FiGithub /> <span>Code</span>
                          </a>
                        )}
                        {activeProject.demo && (
                          <a href={activeProject.demo} target="_blank" rel="noopener noreferrer" className="action-btn" aria-label={`${activeProject.name} Demo`}>
                            <FiExternalLink /> <span>Live Demo</span>
                          </a>
                        )}
                        {activeProject.caseStudyUrl && (
                          <a href={activeProject.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="action-btn case-link" aria-label={`${activeProject.name} Case Study`}>
                            <span>Case Study</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="project-description-block">
                      <h4>About the Project</h4>
                      <p className="project-description">{activeProject.description}</p>
                      {activeProject.longDescription && (
                        <p className="project-long-description">{activeProject.longDescription}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {filteredProjects.length > 1 && (
                <div className="project-nav-buttons">
                  <button type="button" onClick={() => cycleProject(-1)} aria-label="Previous project">
                    <FiArrowLeft />
                    Previous
                  </button>
                  <button type="button" onClick={() => cycleProject(1)} aria-label="Next project">
                    Next
                    <FiArrowRight />
                  </button>
                </div>
              )}
            </article>
          </div>
        ) : (
          <p className="projects-empty">No projects found for this category yet.</p>
        )}
      </div>
    </section>
  );
}
