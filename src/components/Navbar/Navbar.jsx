import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar scrolled" id="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo" onClick={handleLinkClick}>
          YM<span style={{ opacity: 0.5 }}>.</span>
        </NavLink>

        <ul className="nav-links">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <NavLink to={href} onClick={handleLinkClick}>
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/coding-notes" onClick={handleLinkClick} className="coding-notes-link">
              Coding Notes
            </NavLink>
          </li>
        </ul>

        <NavLink to="/contact" className="nav-cta">Get In Touch</NavLink>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <NavLink to={href} onClick={handleLinkClick}>{label}</NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/coding-notes" onClick={handleLinkClick} className="coding-notes-link">
              Coding Notes
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
