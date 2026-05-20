import { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FiAward, FiExternalLink, FiChevronRight, FiX, FiCheck, FiHeart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Volunteering.scss';

// Dynamic Fallback Volunteering Recognition layout
const DynamicVolunteerBadge = ({ role, organization, period }) => {
  return (
    <div className="dynamic-vol-canvas">
      <div className="vol-border-outer">
        <div className="vol-border-inner">
          <div className="vol-watermark">
            <FiHeart />
          </div>
          
          <div className="vol-header">
            <span className="vol-doc-type">VOLUNTEER SERVICE</span>
          </div>

          <div className="vol-body">
            <p className="vol-award-text">Honorable recognition to</p>
            <h2 className="vol-recipient-name">Yazeed Mshayekh</h2>
            <p className="vol-sub-text">for dedicated service as a</p>
            <h3 className="vol-role-title">{role}</h3>
            <p className="vol-org-text">at {organization}</p>
          </div>

          <div className="vol-footer">
            <div className="vol-period-block">
              <span className="vol-date-val">{period}</span>
              <span>Service Term</span>
            </div>
            <div className="vol-seal">
              <FiHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Volunteering() {
  const { volunteering } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();
  
  const [activeVolIndex, setActiveVolIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);

  const activeVol = volunteering[activeVolIndex];

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
    <section className="volunteering" id="volunteering">
      {/* Floating Indicator Pill */}
      <div 
        ref={triggerRef}
        className={`vol-floating-trigger ${isSidebarOpen ? 'active' : ''}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <div className="trigger-handle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="trigger-status-dot"></div>
        <span className="trigger-text">
          {activeVol.role.length > 20 ? `${activeVol.role.substring(0, 20)}...` : activeVol.role}
        </span>
      </div>

      {/* Slide-out Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              className="vol-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            
            <motion.div 
              ref={sidebarRef}
              className="vol-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onMouseLeave={() => setIsSidebarOpen(false)}
            >
              <div className="sidebar-header">
                <div className="header-title-sec">
                  <span className="nav-subtitle">VOLUNTEER NAVIGATOR</span>
                  <h3 className="nav-title">{activeVol.role}</h3>
                </div>
                <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
                  <FiX />
                </button>
              </div>

              <div className="sidebar-list">
                {volunteering.map((vol, index) => (
                  <div 
                    key={index} 
                    className={`sidebar-item ${index === activeVolIndex ? 'active' : ''}`}
                    onClick={() => {
                      setActiveVolIndex(index);
                    }}
                  >
                    <div className="item-logo-wrapper">
                      <FiHeart className="item-issuer-logo" />
                    </div>
                    <div className="item-status-dot"></div>
                    <span className="item-name">{vol.role}</span>
                    <FiChevronRight className="item-arrow" />
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="volunteering-container" ref={ref}>
        <div className="vol-section-header">
          <div className="title-wrapper">
            <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
              Volunteering. <span className="title-counter">{volunteering.length}</span>
            </h2>
            <p className="section-desc">
              Tech leadership, mentorship, community contributions, and technical volunteering records.
            </p>
          </div>
        </div>

        {/* Interactive Showcase Dashboard */}
        <div className={`vol-dashboard-card animate-scale ${isVisible ? 'visible' : ''}`}>
          <div className="vol-dashboard-grid">
            
            {/* Info Area (Left) */}
            <div className="vol-info-column">
              <div className="vol-badge-row">
                <span className="org-badge">{activeVol.organization}</span>
                <span className="period-badge">{activeVol.period}</span>
              </div>

              <h2 className="vol-main-title">{activeVol.role}</h2>
              
              <p className="vol-description">
                {activeVol.description}
              </p>

              {/* Highlights tags */}
              {activeVol.highlights?.length > 0 && (
                <div className="vol-skills-group">
                  <h4>CONTRIBUTION HIGHLIGHTS</h4>
                  <div className="vol-skills-tags">
                    {activeVol.highlights.map((tag) => (
                      <span key={tag} className="skill-tag">
                        <FiCheck className="tag-check" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Visual Frame / Recognition Preview (Right) */}
            <div className="vol-visual-column">
              <div className="vol-display-frame">
                <div className="vol-glass-container">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeVolIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="vol-render-wrapper"
                    >
                      {activeVol.image ? (
                        <img 
                          src={activeVol.image} 
                          alt={activeVol.organization} 
                          className="vol-image-view"
                          onClick={() => window.open(activeVol.image, '_blank')}
                        />
                      ) : (
                        <DynamicVolunteerBadge 
                          role={activeVol.role}
                          organization={activeVol.organization}
                          period={activeVol.period}
                        />
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
