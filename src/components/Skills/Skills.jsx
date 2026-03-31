import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Skills.scss';

const categoryIcons = {
  brain: '🧠',
  data: '📈',
  code: '🐍',
  database: '🗄️',
  terminal: '💻',
  devops: '⚙️',
};

export default function Skills() {
  const { skills } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="skills" id="skills">
      <div className="skills-container" ref={ref}>
        <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
          Tech <span>Stack</span>
        </h2>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`skill-category animate-scale delay-${(i % 3) + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="category-header">
                <div className="category-icon">
                  {categoryIcons[group.icon] || '🔧'}
                </div>
                <h3 className="category-name">{group.category}</h3>
              </div>
              <div className="category-items">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
