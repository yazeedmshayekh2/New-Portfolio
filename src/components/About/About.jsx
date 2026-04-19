import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './About.scss';

export default function About() {
  const { about, education, languages } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="about" id="about">
      <div className="about-container" ref={ref}>
        <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
          <span className="code-comment">{'// '}</span>About <span>Me</span>
        </h2>

        <div className="about-grid">
          <div className={`about-text animate-slide-left delay-1 ${isVisible ? 'visible' : ''}`}>
            <h3 className="about-heading">
              <span className="code-keyword">function </span>
              buildSolutions
              <span className="code-parens">() {'{'}</span>
            </h3>
            <div className="about-code-block">
              <span className="code-return">return </span>
              <span className="code-string">"{about.description}"</span>
            </div>
            <span className="about-closing-brace">{'}'}</span>

            <div className="about-education">
              <div className="edu-label">
                <span className="code-keyword">class </span>Education
              </div>
              <div className="edu-degree">{education.degree}</div>
              <div className="edu-details">
                <span>🎓 {education.university}</span>
                <span className="separator">|</span>
                <span>📍 {education.location}</span>
                <span className="separator">|</span>
                <span>📅 {education.period}</span>
                <span className="separator">|</span>
                <span>⭐ GPA: {education.gpa}</span>
              </div>
            </div>
          </div>

          <div className="about-stats">
            {about.stats.map((stat, i) => (
              <div
                key={i}
                className={`stat-card animate-scale delay-${i + 2} ${isVisible ? 'visible' : ''}`}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}

            <div className={`about-languages animate-on-scroll delay-6 ${isVisible ? 'visible' : ''}`}>
              {languages.map((lang, i) => (
                <div key={i} className="lang-card">
                  <span className="lang-icon">{lang.name === 'Arabic' ? '🇯🇴' : '🇬🇧'}</span>
                  <div className="lang-info">
                    <div className="lang-name">{lang.name}</div>
                    <div className="lang-level">{lang.level}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
