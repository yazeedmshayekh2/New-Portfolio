import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaChevronDown } from 'react-icons/fa';
import { FiDownload, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.scss';

const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Personal', href: '/systems' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Projects', href: '/projects' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleLinkClick = () => {
    setMenuOpen(false);
    setMoreOpen(false);
    setMobileMoreOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setMoreOpen(false);
    setMobileMoreOpen(false);
  }, [location]);

  const isSubRouteActive = () => {
    return ['/volunteering', '/recommendations', '/skills'].includes(location.pathname);
  };

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
          {mainNavLinks.map(({ label, href }) => (
            <li key={href} className="code-nav-item">
              <NavLink to={href} onClick={handleLinkClick}>
                <span className="syntax-bracket">{'<'}</span>
                <span className="nav-label">{label}</span>
                <span className="syntax-bracket">{' />'}</span>
              </NavLink>
            </li>
          ))}

          <li className="code-nav-item">
            <NavLink to="/contact" onClick={handleLinkClick}>
              <span className="syntax-bracket">{'<'}</span>
              <span className="nav-label">Contact</span>
              <span className="syntax-bracket">{' />'}</span>
            </NavLink>
          </li>

          {/* MORE Dropdown */}
          <li
            ref={dropdownRef}
            className={`code-nav-item more-dropdown-container ${isSubRouteActive() ? 'parent-active' : ''}`}
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className={`more-toggle-btn ${moreOpen ? 'open' : ''}`}
              onClick={() => setMoreOpen(!moreOpen)}
              type="button"
            >
              <span className="nav-label">More</span>
              <FaChevronDown className="chevron-icon" />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  className="dropdown-menu-card"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="dropdown-list">
                    {/* <li>
                      <NavLink to="/volunteering" className="dropdown-item" onClick={handleLinkClick}>
                        VOLUNTEERING
                      </NavLink>
                    </li> */}
                    {/* <li>
                      <NavLink to="/recommendations" className="dropdown-item" onClick={handleLinkClick}>
                        RECOMMENDATIONS
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink to="/skills" className="dropdown-item" onClick={handleLinkClick}>
                        SKILLS
                      </NavLink>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li className="dropdown-section-title">RESUME</li>
                    <li>
                      <a
                        href="/Yazeed_Mshayekh_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-item sub-item"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsResumeOpen(true);
                          handleLinkClick();
                        }}
                      >
                        DISPLAY
                      </a>
                    </li>
                    <li>
                      <a
                        href="/Yazeed_Mshayekh_CV.pdf"
                        download="Yazeed_Mshayekh_CV.pdf"
                        className="dropdown-item sub-item"
                        onClick={handleLinkClick}
                      >
                        DOWNLOAD
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="code-nav-item">
            <NavLink to="/coding-notes" onClick={handleLinkClick} className="coding-notes-link">
              <span className="syntax-keyword">import </span>
              <span className="nav-label">Notes</span>
            </NavLink>
          </li>
        </ul>

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

        {/* Mobile Menu */}
        <ul className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {mainNavLinks.map(({ label, href }) => (
            <li key={href} className="code-nav-item">
              <NavLink to={href} onClick={handleLinkClick}>
                <span className="syntax-bracket">{'<'}</span>
                <span className="nav-label">{label}</span>
                <span className="syntax-bracket">{' />'}</span>
              </NavLink>
            </li>
          ))}

          <li className="code-nav-item">
            <NavLink to="/contact" onClick={handleLinkClick}>
              <span className="syntax-bracket">{'<'}</span>
              <span className="nav-label">Contact</span>
              <span className="syntax-bracket">{' />'}</span>
            </NavLink>
          </li>

          {/* Mobile Collapsible More */}
          <li className="code-nav-item mobile-more-container">
            <button
              className={`mobile-more-btn ${mobileMoreOpen ? 'open' : ''}`}
              onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
            >
              <span>More</span>
              <FaChevronDown className="chevron-icon" />
            </button>

            {mobileMoreOpen && (
              <ul className="mobile-sub-menu">
                {/* <li>
                  <NavLink to="/volunteering" onClick={handleLinkClick}>VOLUNTEERING</NavLink>
                </li> */}
                {/* <li>
                  <NavLink to="/recommendations" onClick={handleLinkClick}>RECOMMENDATIONS</NavLink>
                </li> */}
                <li>
                  <NavLink to="/skills" onClick={handleLinkClick}>SKILLS</NavLink>
                </li>
                <li className="mobile-divider"></li>
                <li className="mobile-section-title">RESUME</li>
                <li>
                  <a
                    href="/Yazeed_Mshayekh_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsResumeOpen(true);
                      handleLinkClick();
                    }}
                  >
                    DISPLAY
                  </a>
                </li>
                <li>
                  <a href="/Yazeed_Mshayekh_CV.pdf" download="Yazeed_Mshayekh_CV.pdf" onClick={handleLinkClick}>DOWNLOAD</a>
                </li>
              </ul>
            )}
          </li>

          <li className="code-nav-item">
            <NavLink to="/coding-notes" onClick={handleLinkClick} className="coding-notes-link">
              <span className="syntax-keyword">import </span>
              <span className="nav-label">Notes</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="resume-modal-overlay">
            <motion.div
              className="resume-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeOpen(false)}
            />
            <motion.div
              className="resume-modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            >
              <div className="resume-modal-header">
                <div className="header-left">
                  <span className="resume-modal-title">RESUME PREVIEW</span>
                </div>
                <div className="header-right">
                  <a
                    href="/Yazeed_Mshayekh_CV.pdf"
                    download="Yazeed_Mshayekh_CV.pdf"
                    className="resume-download-btn"
                  >
                    <FiDownload /> DOWNLOAD PDF
                  </a>
                  <button className="resume-close-btn" onClick={() => setIsResumeOpen(false)}>
                    <FiX />
                  </button>
                </div>
              </div>
              <div className="resume-modal-body">
                <iframe
                  src="/Yazeed_Mshayekh_CV.pdf"
                  title="Resume Preview"
                  className="resume-iframe"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
