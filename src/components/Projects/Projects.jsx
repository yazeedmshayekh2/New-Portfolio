import { useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
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
  const [ref, isVisible] = useScrollAnimation();

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <div
              key={project.name}
              className={`project-card animate-scale delay-${(i % 3) + 2} ${isVisible ? 'visible' : ''}`}
            >
              <div className="project-header">
                <div className="project-icon">
                  {iconMap[project.icon] || '🤖'}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} GitHub`}>
                      <FiGithub />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} Demo`}>
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-body">
                <span className="project-category">{project.category}</span>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
