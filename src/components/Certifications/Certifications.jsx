import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FiAward, FiExternalLink, FiImage } from 'react-icons/fi';
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
              className={`cert-card cert-card--${cert.theme || 'default'} ${cert.image ? 'has-image' : 'no-image'} animate-scale delay-${(i % 3) + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="cert-header">
                {cert.image ? (
                  <img src={cert.image} alt={cert.name} className="cert-cover" loading="lazy" />
                ) : (
                  <div className="cert-icon-wrapper"><FiAward /></div>
                )}
              </div>
              <div className="cert-content">
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                {cert.issuedOn && <p className="cert-meta">Issued: {cert.issuedOn}</p>}
                
                {cert.highlights?.length > 0 && (
                  <div className="cert-tags">
                    {cert.highlights.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                )}
                
                {cert.credentialUrl && (
                  <div className="cert-footer">
                    <a href={cert.credentialUrl} className="cert-link" target="_blank" rel="noopener noreferrer">
                      View credential <FiExternalLink />
                    </a>
                  </div>
                )}
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
              className={`achievement-card achievement-card--${ach.theme || 'default'} ${ach.image ? 'has-image' : 'no-image'} animate-slide-left delay-${i + 5} ${isVisible ? 'visible' : ''}`}
            >
              <div className="achievement-header">
                {ach.image ? (
                  <img src={ach.image} alt={ach.title} className="achievement-cover" loading="lazy" />
                ) : (
                  <div className="achievement-icon-wrapper"><FiImage /></div>
                )}
              </div>
              <div className="achievement-content">
                <h4 className="achievement-title">{ach.title}</h4>
                {ach.event && <p className="achievement-event">{ach.event}</p>}
                <p className="achievement-desc">{ach.description}</p>
                
                {(ach.date || ach.awardUrl) && (
                  <div className="achievement-footer">
                    {ach.date && <span className="achievement-date">{ach.date}</span>}
                    {ach.awardUrl && (
                      <a href={ach.awardUrl} target="_blank" rel="noopener noreferrer" className="achievement-link">
                        Read more <FiExternalLink />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
