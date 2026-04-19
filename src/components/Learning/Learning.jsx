import { FiExternalLink } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Learning.scss';

export default function Learning() {
  const { currentlyLearning, youtubePlaylists } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="learning" id="learning">
      <div className="learning-container" ref={ref}>
        <span id="currently-learning" className="home-anchor" aria-hidden="true" />
        <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
          <span className="code-comment">{'// '}</span>Currently <span>Learning</span>
        </h2>

        {/* Azure Certifications */}
        <div className="learning-grid">
          {currentlyLearning.map((item, i) => (
            <div
              key={i}
              className={`learning-card animate-scale delay-${i + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="learning-card-header">
                <div className="learning-card-icon">{item.icon}</div>
                <div className="learning-card-meta">
                  <h3 className="learning-card-name">{item.name}</h3>
                  <p className="learning-card-full">{item.fullName}</p>
                </div>
              </div>
              <span
                className={`learning-card-status ${
                  item.status === 'In Progress' ? 'in-progress' : 'upcoming'
                }`}
              >
                <span className="status-dot" />
                <span className="status-keyword">status</span>: {item.status}
              </span>
              <p className="learning-card-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* YouTube Playlists */}
        <span id="watching" className="home-anchor" aria-hidden="true" />
        <h3 className={`learning-subtitle animate-blur delay-3 ${isVisible ? 'visible' : ''}`}>
          <span className="code-comment">{'// '}</span>📺 What I'm <span>Watching</span>
        </h3>

        <div className="playlists-grid">
          {youtubePlaylists.map((playlist, i) => (
            <a
              key={i}
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`playlist-card animate-slide-left delay-${i + 4} ${isVisible ? 'visible' : ''}`}
            >
              <div className="playlist-header">
                <div className="playlist-icon">{playlist.icon}</div>
                <div className="playlist-info">
                  <h4 className="playlist-title">{playlist.title}</h4>
                  <span className="playlist-channel">{playlist.channel}</span>
                </div>
              </div>
              <p className="playlist-desc">{playlist.description}</p>
              <span className="playlist-badge">▶ stream<span className="badge-parens">()</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
