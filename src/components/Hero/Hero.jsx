import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';
import './Hero.scss';

export default function Hero() {
  const { hero } = portfolioData;
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const tagline = hero.taglines[currentTagline];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === tagline) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTagline((prev) => (prev + 1) % hero.taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? tagline.substring(0, prev.length - 1)
          : tagline.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagline, hero.taglines]);

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-greeting">Hello, I'm</span>
          <h1 className="hero-name">
            {hero.name.split(' ')[0]}{' '}
            <span className="gradient">{hero.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="hero-title-wrapper">
            <span className="hero-title-static">I'm a</span>
            <span className="hero-title-dynamic">{displayText}</span>
          </div>
          <p className="hero-description">{hero.summary}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              <FiArrowRight /> Let's Talk
            </a>
            <a href={hero.cvLink} className="btn-outline" download>
              <FiDownload /> Download CV
            </a>
          </div>
          <div className="hero-socials">
            <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={`mailto:${hero.socials.email}`} aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-avatar">
            <div className="avatar-ring" />
            <div className="avatar-image">
              <span>👨‍💻</span>
            </div>
            <div className="avatar-badge">
              <span className="status-dot" />
              Available for work
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
