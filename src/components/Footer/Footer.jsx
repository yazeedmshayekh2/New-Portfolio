import { portfolioData } from '../../data/portfolioData';
import './Footer.scss';

export default function Footer() {
  const { hero } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="footer-logo">YM.</span>
        <p className="footer-text">
          © {year} {hero.name}. Built with <span className="heart">♥</span>
        </p>
        <div className="footer-links">
          <a href={hero.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${hero.socials.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
