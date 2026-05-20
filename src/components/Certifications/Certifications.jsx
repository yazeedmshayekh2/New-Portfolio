import { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FiAward, FiExternalLink, FiChevronRight, FiX, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Certifications.scss';

// Dynamically glob-import all images/SVGs from the new src/assets/issuers directory
const issuerLogoFiles = import.meta.glob('/src/assets/issuers/*.{svg,png,jpg,jpeg}', { eager: true });

// Inline SVGs for Issuer Logos to keep it clean and self-contained, with dynamic file overrides
const IssuerLogo = ({ issuer, customUrl, className = "" }) => {
  // If an explicit image link/import is provided in the data, use it directly!
  if (customUrl) {
    return <img src={customUrl} alt={issuer} className={className} style={{ objectFit: 'contain' }} />;
  }

  const norm = issuer.toUpperCase();
  const searchKey = issuer.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Look for a matching physical logo file in the new src/assets/issuers directory
  const matchedPath = Object.keys(issuerLogoFiles).find(path => {
    const filename = path.split('/').pop().split('.')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    return filename === searchKey || searchKey.includes(filename) || filename.includes(searchKey);
  });

  if (matchedPath) {
    const assetUrl = issuerLogoFiles[matchedPath].default || issuerLogoFiles[matchedPath];
    return <img src={assetUrl} alt={issuer} className={className} style={{ objectFit: 'contain' }} />;
  }

  // 2. Fall back to elegant inline SVGs if no physical logo file exists
  if (norm.includes("DEEPLEARNING")) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#ff3f3f' }}>
        <path d="M80 50 C80 66.5685 66.5685 80 50 80 C33.4315 80 20 66.5685 20 50 C20 33.4315 33.4315 20 50 20 C60.27 20 69.31 25.18 74.65 33" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
        <path d="M68 50 C68 59.9411 59.9411 68 50 68 C40.0589 68 32 59.9411 32 50 C32 40.0589 40.0589 32 50 32 C54.88 32 59.3 33.95 62.53 37.1" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="50" cy="50" r="10" fill="var(--accent-cyan)" />
      </svg>
    );
  }
  if (norm.includes("STANFORD")) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: '#8c1515' }}>
        <polygon points="50,10 90,80 10,80" opacity="0.15" />
        <path d="M50 15 L85 75 H15 Z" stroke="currentColor" strokeWidth="5" fill="none" />
        <path d="M47 30 H53 V60 H47 Z M47 65 H53 V71 H47 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="3" fill="none" />
      </svg>
    );
  }
  if (norm.includes("CORRELATION")) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 20 H80 V40 H20 Z" fill="currentColor" opacity="0.3" />
        <path d="M20 50 H80 V70 H20 Z" fill="currentColor" opacity="0.6" />
        <path d="M20 80 H60 V90 H20 Z" fill="var(--accent-cyan)" />
        <circle cx="80" cy="85" r="8" fill="var(--accent-violet)" />
      </svg>
    );
  }
  if (norm.includes("BRITISH") || norm.includes("COUNCIL")) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="12" />
        <circle cx="75" cy="25" r="12" />
        <circle cx="25" cy="75" r="12" />
        <circle cx="75" cy="75" r="12" />
        <circle cx="50" cy="50" r="16" fill="var(--accent-cyan)" />
      </svg>
    );
  }
  if (norm.includes("TAHALUF")) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" stroke="currentColor" strokeWidth="4" />
        <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="var(--accent-cyan)" opacity="0.7" />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
      </svg>
    );
  }
  if (norm.includes("SHAI")) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 20 C30 20, 50 10, 70 20 C90 30, 90 70, 70 80 C50 90, 30 80, 30 80 Z" stroke="currentColor" strokeWidth="4" />
        <path d="M40 35 C40 35, 50 30, 60 35 C70 40, 70 60, 60 65 C50 70, 40 65, 40 65 Z" fill="var(--accent-cyan)" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  return <FiAward className={className} />;
};

// Dynamic Fallback Certificate layout for courses without dedicated images
const DynamicCertificateLayout = ({ certName, courseName, issuer, date, status }) => {
  const isCompleted = status !== "In Progress" && status !== "Upcoming";
  return (
    <div className={`dynamic-cert-canvas ${!isCompleted ? 'in-progress-canvas' : ''}`}>
      <div className="cert-border-outer">
        <div className="cert-border-inner">
          <div className="cert-watermark">
            <svg viewBox="0 0 100 100" fill="currentColor" opacity="0.03">
              <circle cx="50" cy="50" r="45" />
              <polygon points="50,10 90,80 10,80" />
            </svg>
          </div>
          
          <div className="cert-header-sec">
            <div className="cert-issuer-badge">
              <IssuerLogo issuer={issuer} className="cert-logo-svg" />
              <span>{issuer}</span>
            </div>
            <div className="cert-doc-type">{isCompleted ? "CERTIFICATE OF COMPLETION" : "COURSE IN PROGRESS"}</div>
          </div>

          <div className="cert-body-sec">
            <p className="cert-award-text">{isCompleted ? "This is to certify that" : "This course is actively being pursued by"}</p>
            <h2 className="cert-recipient-name">Yazeed Mshayekh</h2>
            <p className="cert-sub-text">{isCompleted ? "has successfully completed the course/program" : "as part of their professional development pathway"}</p>
            <h3 className="cert-course-title">{courseName || certName}</h3>
            {!isCompleted ? (
              <div className="cert-progress-badge">
                <span className="status-dot pulsing"></span>
                <span>IN PROGRESS</span>
              </div>
            ) : (
              <p className="cert-desc-text">
                An online non-credit course authorized by {issuer} and offered through Coursera.
              </p>
            )}
          </div>

          <div className="cert-footer-sec">
            <div className="cert-signature-block">
              <div className="signature-line"></div>
              <span>Authorized Signature</span>
            </div>
            <div className="cert-date-block">
              <span className="cert-date-val">{isCompleted ? (date || "2024 / 2025") : "ACTIVE"}</span>
              <span>{isCompleted ? "Date of Issue" : "Current Status"}</span>
            </div>
            <div className="cert-seal">
              <div className="seal-inner">
                {isCompleted ? <FiAward /> : <span className="seal-loader"></span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Specialization in progress overview roadmap layout
const SpecializationInProgressView = ({ cert, onSelectCourse }) => {
  const courses = cert.courses || [];
  const completedCount = courses.filter(c => c.status === "Completed" || (!c.status && c.image)).length;
  const totalCount = courses.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="specialization-in-progress-view">
      <div className="sip-header">
        <div className="sip-badge">
          <span className="status-dot pulsing-amber"></span>
          <span>SPECIALIZATION IN PROGRESS</span>
        </div>
        <h3 className="sip-title">{cert.name}</h3>
        <p className="sip-issuer">Authorized by {cert.issuer}</p>
      </div>

      <div className="sip-progress-section">
        <div className="sip-progress-meta">
          <span className="sip-progress-label">Overall Progress</span>
          <span className="sip-progress-value">{completedCount} of {totalCount} Courses ({percent}%)</span>
        </div>
        <div className="sip-progress-bar-container">
          <div className="sip-progress-bar" style={{ width: `${percent}%` }}></div>
        </div>
      </div>

      <div className="sip-courses-list-header">
        <h4>CURRICULUM ROADMAP</h4>
      </div>

      <div className="sip-courses-list">
        {courses.map((course, idx) => {
          const isCompleted = course.status === "Completed" || (!course.status && course.image);
          const isInProgress = course.status === "In Progress";
          const isUpcoming = course.status === "Upcoming";
          
          return (
            <div 
              key={idx} 
              className={`sip-course-item ${isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'upcoming'}`}
              onClick={() => onSelectCourse(idx)}
            >
              <div className="sip-course-status-icon">
                {isCompleted ? (
                  <div className="status-icon-circle completed">
                    <FiCheck />
                  </div>
                ) : isInProgress ? (
                  <div className="status-icon-circle in-progress">
                    <span className="spinner-dot"></span>
                  </div>
                ) : (
                  <div className="status-icon-circle upcoming">
                    <span className="lock-dot"></span>
                  </div>
                )}
              </div>
              <div className="sip-course-info">
                <span className="sip-course-name">{course.name}</span>
                <span className="sip-course-status-text">
                  {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Upcoming"}
                </span>
              </div>
              {isCompleted && (course.image || course.credentialUrl) && (
                <div className="sip-course-view-link" title="Click to view certificate">
                  <FiAward />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Certifications() {
  const { certifications, achievements } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();
  
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [activeSubImageIndex, setActiveSubImageIndex] = useState(null); // null = Main Cert, number = Course Cert
  const [activeAchIndex, setActiveAchIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);
  const dashboardRef = useRef(null);

  const activeCert = certifications[activeCertIndex];
  const activeAch = achievements[activeAchIndex];

  // Close sidebar on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className={`certifications ${isSidebarOpen ? 'sidebar-open' : ''}`} id="certifications">
      {/* Floating Indicator Pill */}
      <div 
        ref={triggerRef}
        className={`cert-floating-trigger ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <div className="trigger-handle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="trigger-status-dot"></div>
        <span className="trigger-text">
          {activeCert.name.length > 22 ? `${activeCert.name.substring(0, 22)}...` : activeCert.name}
        </span>
      </div>

      {/* Slide-out Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div 
              className="cert-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            
            <motion.div 
              ref={sidebarRef}
              className="cert-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="sidebar-header">
                <div className="header-title-sec">
                  <span className="nav-subtitle">CERT NAVIGATOR</span>
                  <h3 className="nav-title">{activeCert.name}</h3>
                </div>
                <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
                  <FiX />
                </button>
              </div>

              <div className="sidebar-list">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className={`sidebar-item ${index === activeCertIndex ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCertIndex(index);
                      setActiveSubImageIndex(null); // Reset to main image on cert change
                      setIsSidebarOpen(false); // Hide sidebar
                      
                      // Smooth scroll focus
                      if (dashboardRef.current) {
                        dashboardRef.current.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'center'
                        });
                      }
                    }}
                  >
                    <div className="item-logos-container">
                      {cert.issuer.split(/&|and/i).map((part, idx) => {
                        const customUrl = cert.logoUrls ? cert.logoUrls[idx] : (idx === 0 ? cert.logoUrl : undefined);
                        return (
                          <div key={idx} className="item-logo-wrapper" title={part.trim()}>
                            <IssuerLogo issuer={part.trim()} customUrl={customUrl} className="item-issuer-logo" />
                          </div>
                        );
                      })}
                    </div>
                    <div className={`item-status-dot ${cert.status === 'In Progress' ? 'in-progress' : ''}`}></div>
                    <div className="item-details-meta">
                      <span className="item-name">{cert.name}</span>
                      {cert.status === 'In Progress' && (
                        <span className="item-status-badge">IN PROGRESS</span>
                      )}
                    </div>
                    <FiChevronRight className="item-arrow" />
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="certifications-container" ref={ref}>
        <div className="certs-section-header">
          <div className="title-wrapper">
            <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
              Certifications. <span className="title-counter">{certifications.length}</span>
            </h2>
            <p className="section-desc">
              Professional credentials, specializations, and continuous learning records in Artificial Intelligence, Data Science, and Systems Engineering.
            </p>
          </div>
        </div>

        {/* Interactive Showcase Dashboard */}
        <div ref={dashboardRef} className={`cert-dashboard-card animate-scale ${isVisible ? 'visible' : ''}`}>
          <div className="cert-dashboard-grid">
            
            {/* Info Area (Left) */}
            <div className="cert-info-column">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCertIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="cert-info-inner"
                >
                  <div className="cert-brand-header">
                    <div className="brand-logos-container">
                      {activeCert.issuer.split(/&|and/i).map((part, idx) => {
                        const customUrl = activeCert.logoUrls ? activeCert.logoUrls[idx] : (idx === 0 ? activeCert.logoUrl : undefined);
                        return (
                          <div key={idx} className="brand-logo-wrapper" title={part.trim()}>
                            <IssuerLogo issuer={part.trim()} customUrl={customUrl} className="brand-issuer-logo" />
                          </div>
                        );
                      })}
                    </div>
                     <div className="brand-meta">
                      <span className="brand-issuer-name">{activeCert.issuerShort || activeCert.issuer}</span>
                      <div className="brand-cert-status-wrapper">
                        <span className="brand-cert-type">{activeCert.type || "SPECIALIZATION"}</span>
                        {activeCert.status === "In Progress" && (
                          <span className="brand-status-badge in-progress">IN PROGRESS</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <h2 className="cert-main-title">{activeCert.name}</h2>
                  
                  <p className="cert-description">
                    {activeCert.description || "Comprehensive curriculum training in machine learning concepts, models, and real-world implementation patterns."}
                  </p>

                  {/* Highlights tags */}
                  {activeCert.highlights?.length > 0 && (
                    <div className="cert-skills-group">
                      <h4>ACQUIRED SKILLS</h4>
                      <div className="cert-skills-tags">
                        {activeCert.highlights.map((tag) => (
                          <span key={tag} className="skill-tag">
                            <FiCheck className="tag-check" /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                   {/* Specialization Courses Gallery */}
                  {activeCert.courses?.length > 0 && (
                    <div className="cert-gallery-group">
                      <h4>SPECIALIZATION COURSES</h4>
                      <div className="cert-thumbnails-grid">
                        {/* Thumbnail for Main Certificate */}
                        <div 
                          className={`thumbnail-card ${activeSubImageIndex === null ? 'active' : ''}`}
                          onClick={() => setActiveSubImageIndex(null)}
                        >
                          <div className="thumb-preview">
                            {activeCert.image ? (
                              <img src={activeCert.image} alt="Main Specialization" />
                            ) : activeCert.status === "In Progress" ? (
                              <div className="thumb-in-progress-main">
                                <span className="status-dot pulsing-amber"></span>
                                <FiAward />
                              </div>
                            ) : (
                              <div className="thumb-fallback"><FiAward /></div>
                            )}
                          </div>
                          <span className="thumb-label">
                            {activeCert.status === "In Progress" ? "Overview" : "Full Certificate"}
                          </span>
                        </div>

                        {/* Thumbnails for Courses */}
                        {activeCert.courses.map((course, idx) => (
                          <div 
                            key={idx}
                            className={`thumbnail-card ${activeSubImageIndex === idx ? 'active' : ''}`}
                            onClick={() => setActiveSubImageIndex(idx)}
                          >
                            <div className="thumb-preview">
                              {course.image ? (
                                <img src={course.image} alt={course.name} />
                              ) : (
                                <DynamicCertificateLayout 
                                  certName={activeCert.name}
                                  courseName={course.name}
                                  issuer={activeCert.issuer}
                                  date={activeCert.issuedOn}
                                  status={course.status}
                                />
                              )}
                            </div>
                            <span className="thumb-label">{course.name.length > 20 ? `${course.name.substring(0, 20)}...` : course.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeCert.credentialUrl && (
                    <div className="cert-action-footer">
                      <a 
                        href={activeCert.credentialUrl} 
                        className="btn-primary" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Credential <FiExternalLink />
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual Frame / Certificate Preview (Right) */}
            <div className="cert-visual-column">
              <div className="cert-display-frame">
                <div className="cert-glass-container">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCertIndex}-${activeSubImageIndex === null ? 'main' : `course-${activeSubImageIndex}`}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="cert-render-wrapper"
                    >
                       {activeSubImageIndex === null ? (
                        // Display Main Certificate Image or Fallback
                        activeCert.image ? (
                          <img 
                            src={activeCert.image} 
                            alt={activeCert.name} 
                            className="certificate-image-view"
                            onClick={() => window.open(activeCert.image, '_blank')}
                          />
                        ) : activeCert.status === "In Progress" ? (
                          <SpecializationInProgressView 
                            cert={activeCert}
                            onSelectCourse={(idx) => setActiveSubImageIndex(idx)}
                          />
                        ) : (
                          <DynamicCertificateLayout 
                            certName={activeCert.name}
                            issuer={activeCert.issuer}
                            date={activeCert.issuedOn}
                          />
                        )
                      ) : (
                        // Display Selected Course Image or Fallback dynamic layout
                        activeCert.courses[activeSubImageIndex].image ? (
                          <img 
                            src={activeCert.courses[activeSubImageIndex].image} 
                            alt={activeCert.courses[activeSubImageIndex].name} 
                            className="certificate-image-view"
                            onClick={() => window.open(activeCert.courses[activeSubImageIndex].image, '_blank')}
                          />
                        ) : (
                          <DynamicCertificateLayout 
                            certName={activeCert.name}
                            courseName={activeCert.courses[activeSubImageIndex].name}
                            issuer={activeCert.issuer}
                            date={activeCert.issuedOn}
                            status={activeCert.courses[activeSubImageIndex].status}
                          />
                        )
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="frame-glow-effect"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Notable Achievements Dashboard */}
        <h3 className={`achievements-title animate-blur delay-4 ${isVisible ? 'visible' : ''}`}>
          Notable <span>Achievements</span>
        </h3>

        <div className={`ach-dashboard-card animate-scale delay-5 ${isVisible ? 'visible' : ''}`}>
          <div className="ach-selector-tabs">
            {achievements.map((ach, idx) => (
              <button 
                key={idx}
                className={`ach-tab-btn ${idx === activeAchIndex ? 'active' : ''}`}
                onClick={() => setActiveAchIndex(idx)}
              >
                <span className="tab-num">0{idx + 1}.</span>
                <span className="tab-title">{ach.title} ({ach.event})</span>
              </button>
            ))}
          </div>

          <div className="ach-dashboard-grid">
            {/* Left Content Column */}
            <div className="ach-info-column">
              <div className="ach-badge-row">
                <span className="rank-badge">{activeAch.title}</span>
                <span className="date-badge">{activeAch.date}</span>
              </div>

              <h2 className="ach-main-title">{activeAch.event}</h2>
              <p className="ach-description">{activeAch.description}</p>

              {activeAch.awardUrl && (
                <div className="ach-action-footer">
                  <a 
                    href={activeAch.awardUrl} 
                    className="btn-primary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read official announcement <FiExternalLink />
                  </a>
                </div>
              )}
            </div>

            {/* Right Media Column */}
            <div className="ach-visual-column">
              <div className="ach-display-frame">
                <div className="ach-glass-container">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeAchIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="ach-render-wrapper"
                    >
                      {activeAch.image ? (
                        <img 
                          src={activeAch.image} 
                          alt={activeAch.event} 
                          className="achievement-image-view"
                          onClick={() => window.open(activeAch.image, '_blank')}
                        />
                      ) : (
                        <div className="achievement-fallback-view">
                          <svg viewBox="0 0 100 100" className="trophy-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 20 H70 V40 C70 50, 60 60, 50 60 C40 60, 30 50, 30 40 Z" fill="var(--accent-violet)" opacity="0.3" stroke="var(--accent-violet)" strokeWidth="4" />
                            <path d="M50 60 V80 M40 80 H60" stroke="currentColor" strokeWidth="6" />
                            <path d="M20 25 C20 25, 10 25, 10 35 C10 45, 20 45, 20 45" stroke="var(--accent-violet)" strokeWidth="4" />
                            <path d="M80 25 C80 25, 90 25, 90 35 C90 45, 80 45, 80 45" stroke="var(--accent-violet)" strokeWidth="4" />
                            <circle cx="50" cy="40" r="10" fill="var(--accent-cyan)" />
                          </svg>
                          <span>Honorary Award</span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="frame-glow-effect"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
