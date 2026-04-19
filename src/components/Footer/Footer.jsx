import { NavLink } from 'react-router-dom';
import { portfolioData } from '../../data/portfolioData';
import './Footer.scss';

export default function Footer() {
  const { hero } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">YM<span className="logo-dot">.</span></span>
          <p className="footer-text">
            <span className="code-comment">{'// '}</span>
            © {year} {hero.name}
          </p>
        </div>

        <div className="footer-code-block">
          <span className="code-keyword">export</span>{' '}
          <span className="code-keyword">default</span>{' '}
          <span className="code-func">portfolio</span>
          <span className="code-parens">();</span>
        </div>

        <div className="footer-links">
          <NavLink to="/coding-notes">
            <span className="link-bracket">{'<'}</span>
            Notes
            <span className="link-bracket">{' />'}</span>
          </NavLink>
          <NavLink to="/projects">
            <span className="link-bracket">{'<'}</span>
            Projects
            <span className="link-bracket">{' />'}</span>
          </NavLink>
          <a href={hero.socials.github} target="_blank" rel="noopener noreferrer">
            <span className="link-bracket">{'<'}</span>
            GitHub
            <span className="link-bracket">{' />'}</span>
          </a>
          <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="link-bracket">{'<'}</span>
            LinkedIn
            <span className="link-bracket">{' />'}</span>
          </a>
          <a href={`mailto:${hero.socials.email}`}>
            <span className="link-bracket">{'<'}</span>
            Email
            <span className="link-bracket">{' />'}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
