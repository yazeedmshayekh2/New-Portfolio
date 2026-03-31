import { useState, useEffect } from 'react';
import './Navbar.scss';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section tracking
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#hero" className="logo" onClick={handleLinkClick}>
          YM<span style={{ opacity: 0.5 }}>.</span>
        </a>

        <ul className="nav-links">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta">Get In Touch</a>

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
              <a href={href} onClick={handleLinkClick}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
