import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FiMessageSquare, FiUser } from 'react-icons/fi';
import './Recommendations.scss';

export default function Recommendations() {
  const { recommendations } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="recommendations-section" id="recommendations">
      <div className="recommendations-container" ref={ref}>
        <div className="rec-header">
          <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
            Recommendations.
          </h2>
          <p className="section-desc">
            Feedback and professional references from mentors, colleagues, and academic instructors.
          </p>
        </div>

        <div className="recommendations-grid">
          {recommendations.map((rec, idx) => (
            <div 
              key={idx}
              className={`recommendation-card animate-slide-left delay-${idx + 3} ${isVisible ? 'visible' : ''}`}
            >
              <div className="quote-icon-wrap">
                <FiMessageSquare className="quote-icon" />
              </div>
              <p className="recommendation-text">
                "{rec.text}"
              </p>
              <div className="recommendation-author">
                <div className="author-avatar">
                  <FiUser className="avatar-icon" />
                </div>
                <div className="author-meta">
                  <h4 className="author-name">{rec.name}</h4>
                  <span className="author-role">{rec.role}</span>
                  <span className="author-institution">{rec.institution}</span>
                  <span className="recommendation-date">{rec.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
