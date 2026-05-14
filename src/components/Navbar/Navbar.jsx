import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.scss';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLinkClick = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <nav className="navbar scrolled" id="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo" onClick={handleLinkClick}>
          YM<span style={{ opacity: 0.5 }}>.</span>
        </NavLink>

        <ul className="nav-links">
          {navLinks.map(({ label, href }) => (
            <li key={href} className="code-nav-item">
              <NavLink to={href} onClick={handleLinkClick}>
                <span className="syntax-bracket">{'<'}</span>
                <span className="nav-label">{label}</span>
                <span className="syntax-bracket">{' />'}</span>
              </NavLink>
            </li>
          ))}
          <li className="code-nav-item">
            <NavLink to="/coding-notes" onClick={handleLinkClick} className="coding-notes-link">
              <span className="syntax-keyword">import </span>
              <span className="nav-label">Notes</span>
            </NavLink>
          </li>
        </ul>

        <NavLink to="/contact" className="nav-cta">
          <span className="syntax-prompt">{'>_'}</span> initContact<span className="syntax-parens">()</span>
        </NavLink>

        <button 
          className="theme-toggle" 
          type="button"
          onClick={toggleTheme} 
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>

        <button
          type="button"
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ label, href }) => (
            <li key={href} className="code-nav-item">
              <NavLink to={href} onClick={handleLinkClick}>
                <span className="syntax-bracket">{'<'}</span>
                <span className="nav-label">{label}</span>
                <span className="syntax-bracket">{' />'}</span>
              </NavLink>
            </li>
          ))}
          <li className="code-nav-item">
            <NavLink to="/coding-notes" onClick={handleLinkClick} className="coding-notes-link">
              <span className="syntax-keyword">import </span>
              <span className="nav-label">Notes</span>
            </NavLink>
          </li>
          <li className="code-nav-item mobile-menu-cta-wrap">
            <NavLink to="/contact" className="mobile-menu-cta" onClick={handleLinkClick}>
              <span className="syntax-prompt">{'>_'}</span>
              <span>initContact</span>
              <span className="syntax-parens">()</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
