import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Certifications.scss';

export default function Certifications() {
  const { certifications, achievements } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="certifications" id="certifications">
      <div className="certifications-container" ref={ref}>
        <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
          Certifications & <span>Awards</span>
        </h2>

        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className={`cert-card animate-scale delay-${(i % 3) + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="cert-icon">🏆</div>
              <div className="cert-info">
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className={`achievements-title animate-blur delay-4 ${isVisible ? 'visible' : ''}`}>
          Notable <span>Achievements</span>
        </h3>

        <div className="achievements-grid">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className={`achievement-card animate-slide-left delay-${i + 5} ${isVisible ? 'visible' : ''}`}
            >
              <span className="achievement-icon">🥇</span>
              <div className="achievement-info">
                <h4 className="achievement-title">{ach.title}</h4>
                <p className="achievement-desc">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
