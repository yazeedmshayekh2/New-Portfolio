import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Experience.scss';

export default function Experience() {
  const { experience } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="experience" id="experience">
      <div className="experience-container" ref={ref}>
        <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
          My <span>Experience</span>
        </h2>

        <div className="timeline">
          {experience.map((item, i) => (
            <div
              key={i}
              className={`timeline-item animate-slide-left delay-${i + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className={`timeline-dot ${item.type}`} />
              <span className={`timeline-type ${item.type}`}>
                {item.type === 'work' ? '💼 Work' : '📚 Training'}
              </span>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-title">{item.title}</h3>
                  <span className="timeline-date">{item.date}</span>
                </div>
                <div className="timeline-company">
                  {item.company}
                  <span className="location">{item.location}</span>
                </div>
                <ul className="timeline-description">
                  {item.description.map((desc, j) => (
                    <li key={j}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
