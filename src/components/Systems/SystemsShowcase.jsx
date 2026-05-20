import { useState, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'motion/react';
import { FiArrowRight, FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';
import './SystemsShowcase.scss';

/* ─── Data for the three core projects ─── */
const coreSystems = [
  {
    id: 'attendify',
    name: 'Attendify',
    category: 'Computer Vision',
    subtitle: 'Automated Attendance System',
    description:
      'Achieved 99.7% facial recognition accuracy using YOLOv9 and ResNet-50, deployed via Flask with a responsive web frontend.',
    image: '/Attendify3.png',
    tech: ['YOLOv9', 'ResNet-50', 'Flask', 'Python', 'Siamese-Network', 'MongoDB'],
    github: 'https://github.com/yazeedmshayekh2/Attendify',
    accent: '#22d3a7',
  },
  {
    id: 'silentvoice',
    name: 'SilentVoice',
    category: 'NLP',
    subtitle: 'Real-time ASL Translation',
    description:
      'Built real-time ASL-to-text translation using Transformer and Conformer architectures, deployed via Gradio for live gesture recognition.',
    image: '/SilentVoice.png',
    tech: ['Transformer', 'Conformer', 'Gradio', 'MediaPipe'],
    github:
      'https://github.com/yazeedmshayekh2/Continuous-American-Sign-Language-Translation',
    accent: '#38bdf8',
  },
  {
    id: 'corereports',
    name: 'CoreReports',
    category: 'AI Agents',
    subtitle: 'Automated Dynamic Reporting',
    description:
      'Multi-agent AI system for autonomous insurance data analysis and intelligent report generation, built on CrewAI Flows with FastAPI.',
    image: '/CoreReports.png',
    tech: ['CrewAI', 'FastAPI', 'Chart.js', 'Postgres', 'Grafana', 'Multi-Agent AI'],
    github: '',
    accent: '#f5a623',
  },
];

/* ─── Page 1: Immersive Landing ─── */
function LandingPage({ onEnter }) {
  return (
    <motion.div
      className="systems-landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated background particles */}
      <div className="landing-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0.5],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * -300 - 50],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeOut',
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${30 + Math.random() * 50}%`,
            }}
          />
        ))}
      </div>

      <div className="landing-content">
        <motion.div
          className="landing-code-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="tag-bracket">{'<'}</span>
          <span className="tag-name">PersonalInfo</span>
          <span className="tag-bracket">{' />'}</span>
        </motion.div>

        <motion.h1
          className="landing-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="title-line">Personal</span>
          <span className="title-line gradient-text">Information</span>
          <span className="title-line">&amp; Background</span>
        </motion.h1>

        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Discover my journey — education, experience, projects, and everything
          that defines me as a developer.
        </motion.p>

        <motion.button
          className="view-systems-btn"
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="btn-text">
            <span className="btn-keyword">await </span>
            viewProfile
            <span className="btn-parens">()</span>
          </span>
          <motion.span
            className="btn-arrow"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiArrowRight />
          </motion.span>
        </motion.button>

        {/* Preview cards floating */}
        <motion.div
          className="landing-preview-row"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {coreSystems.map((sys, i) => (
            <motion.div
              key={sys.id}
              className="preview-card"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
              style={{ '--accent': sys.accent }}
            >
              <img src={sys.image} alt={sys.name} />
              <span className="preview-name">{sys.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── System Card (used on Page 2) ─── */
function SystemCard({ system, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={`system-card ${isEven ? 'layout-left' : 'layout-right'}`}
      style={{ opacity, y: springY, scale: springScale }}
    >
      <div className="system-card-visual">
        <motion.div
          className="system-image-wrap"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
          style={{ '--accent': system.accent }}
        >
          <img src={system.image} alt={system.name} loading="lazy" />
          <div className="image-glow" />
        </motion.div>
      </div>

      <div className="system-card-content">
        <div className="system-category-badge" style={{ '--accent': system.accent }}>
          <span className="badge-dot" />
          {system.category}
        </div>

        <h3 className="system-name">{system.name}</h3>
        <p className="system-subtitle">{system.subtitle}</p>
        <p className="system-description">{system.description}</p>

        <div className="system-tech-grid">
          {system.tech.map((t) => (
            <span key={t} className="tech-pill">
              {t}
            </span>
          ))}
        </div>

        {system.github && (
          <a
            href={system.github}
            target="_blank"
            rel="noopener noreferrer"
            className="system-link"
          >
            <FiGithub /> View Source
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Graduation Section ─── */
function GraduationSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const { education } = portfolioData;

  return (
    <motion.section
      ref={ref}
      className="graduation-section"
      style={{ opacity, y: springY }}
    >
      <div className="graduation-container">
        <div className="graduation-visual">
          <motion.div
            className="graduation-logo-wrap"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <img src="/JU.png" alt="University of Jordan" />
            <div className="logo-ring" />
            <div className="logo-ring logo-ring--outer" />
          </motion.div>
        </div>

        <div className="graduation-content">
          <div className="grad-badge">
            <span className="grad-badge-icon">🎓</span>
            <span>Class Rank: <strong>3rd</strong></span>
          </div>

          <h3 className="grad-title">
            <span className="code-keyword">class </span>
            Education
            <span className="code-dot">.</span>
            <span className="gradient-text">Graduate</span>
          </h3>

          <div className="grad-degree">{education.degree}</div>

          <div className="grad-details">
            <div className="grad-detail-item">
              <span className="grad-icon">🏛️</span>
              <span>{education.university}</span>
            </div>
            <div className="grad-detail-item">
              <span className="grad-icon">📍</span>
              <span>{education.location}</span>
            </div>
            <div className="grad-detail-item">
              <span className="grad-icon">📅</span>
              <span>{education.period}</span>
            </div>
            <div className="grad-detail-item">
              <span className="grad-icon">⭐</span>
              <span>GPA: {education.gpa}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ─── About Mini Section ─── */
function AboutMiniSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const { about, languages } = portfolioData;

  return (
    <motion.section
      ref={ref}
      className="showcase-section about-mini"
      style={{ opacity, y: springY }}
    >
      <h2 className="showcase-section-title">
        <span className="code-comment">{'// '}</span>
        About <span className="gradient-text">Me</span>
      </h2>

      <div className="about-mini-grid">
        <div className="about-mini-text">
          <div className="code-block-mini">
            <span className="code-keyword">function </span>
            <span className="code-fn">buildSolutions</span>
            <span className="code-parens">() {'{'}</span>
          </div>
          <p className="about-quote">{about.description}</p>
          <div className="code-close">{'}'}</div>
        </div>

        <div className="about-mini-stats">
          {about.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="mini-stat"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="mini-stat-number">{stat.number}</div>
              <div className="mini-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="about-languages-row">
        {languages.map((lang, i) => (
          <div key={i} className="lang-chip">
            <span>{lang.name === 'Arabic' ? '🇯🇴' : '🇬🇧'}</span>
            <span className="lang-chip-name">{lang.name}</span>
            <span className="lang-chip-level">{lang.level}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ─── Learning Mini Section ─── */
function LearningMiniSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const { currentlyLearning, youtubePlaylists } = portfolioData;

  return (
    <motion.section
      ref={ref}
      className="showcase-section learning-mini"
      style={{ opacity, y: springY }}
    >
      <h2 className="showcase-section-title">
        <span className="code-comment">{'// '}</span>
        Currently <span className="gradient-text">Learning</span>
      </h2>

      <div className="learning-mini-grid">
        {currentlyLearning.map((item, i) => (
          <motion.div
            key={i}
            className="learning-mini-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="lmc-icon">{item.icon}</div>
            <div className="lmc-info">
              <h4>{item.name}</h4>
              <p>{item.fullName}</p>
            </div>
            <span className={`lmc-status ${item.status === 'In Progress' ? 'active' : 'upcoming'}`}>
              <span className="status-dot" />
              {item.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Watching sub-section */}
      <h3 className="showcase-subsection-title">
        <span className="code-comment">{'// '}</span>
        📺 What I'm <span className="gradient-text">Watching</span>
      </h3>

      <div className="watching-mini-grid">
        {youtubePlaylists.map((pl, i) => (
          <motion.a
            key={i}
            href={pl.url}
            target="_blank"
            rel="noopener noreferrer"
            className="watching-mini-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="wmc-icon">{pl.icon}</div>
            <div className="wmc-info">
              <h4>{pl.title}</h4>
              <span className="wmc-channel">{pl.channel}</span>
            </div>
            <FiExternalLink className="wmc-link-icon" />
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}

/* ─── Experience Mini Section ─── */
function ExperienceMiniSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const { experience } = portfolioData;

  return (
    <motion.section
      ref={ref}
      className="showcase-section experience-mini"
      style={{ opacity, y: springY }}
    >
      <h2 className="showcase-section-title">
        <span className="code-comment">{'// '}</span>
        My <span className="gradient-text">Experience</span>
      </h2>

      <div className="experience-timeline-mini">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            className="exp-mini-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={`exp-mini-dot ${item.type}`} />
            <div className="exp-mini-card">
              <div className="exp-mini-header">
                <span className={`exp-type-badge ${item.type}`}>
                  {item.type === 'work' ? (
                    <>
                      <span className="type-kw">async</span> work()
                    </>
                  ) : (
                    <>
                      <span className="type-kw">import</span> training
                    </>
                  )}
                </span>
                <span className="exp-date">{item.date}</span>
              </div>
              <h4 className="exp-mini-title">{item.title}</h4>
              <div className="exp-mini-company">
                {item.company}
                <span className="exp-location">{item.location}</span>
              </div>
              <ul className="exp-mini-desc">
                {item.description.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ─── Scroll Progress Indicator ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);

  // Smooth spring for the fill bar width
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });
  const width = useTransform(springProgress, [0, 1], ['0%', '100%']);

  // Live integer percentage for the counter
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setPct(Math.round(v * 100));
  });

  return (
    <div className="scroll-progress-anchor">
      <motion.div
        className="scroll-progress-pill"
        initial={{ opacity: 0, y: -8, scale: 0.92 }}
        animate={{ opacity: pct > 1 ? 1 : 0, y: pct > 1 ? 0 : -8, scale: pct > 1 ? 1 : 0.92 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Pulsing live dot */}
        <span className="spp-dot" />

        {/* Track + glowing fill */}
        <div className="spp-track">
          <motion.div className="spp-fill" style={{ width }} />
          <motion.div className="spp-glow" style={{ width }} />
        </div>

        {/* Percentage label */}
        <span className="spp-label">{pct}%</span>
      </motion.div>
    </div>
  );
}

/* ─── Main PersonalShowcase Component ─── */
export default function SystemsShowcase() {
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef(null);

  const handleEnter = useCallback(() => {
    setShowContent(true);
    // Scroll to top of page when entering content view
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleBack = useCallback(() => {
    setShowContent(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="systems-showcase" ref={containerRef}>
      <AnimatePresence mode="wait">
        {!showContent ? (
          <LandingPage key="landing" onEnter={handleEnter} />
        ) : (
          <motion.div
            key="systems"
            className="systems-page"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrollProgress />

            {/* Page header */}
            <motion.div
              className="systems-page-header"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="header-code-tag">
                <span className="code-comment">{'// '}</span>
                <span className="code-keyword">export default </span>
                Personal
                <span className="code-dot">.</span>
                <span className="gradient-text">information</span>
                <span className="code-parens">()</span>
              </div>
              <h1 className="systems-page-title">
                Personal <span className="gradient-text">Information</span>
              </h1>
              <p className="systems-page-desc">
                A comprehensive look at my background, education, projects, and the
                experiences that have shaped my career in software engineering and AI.
              </p>
            </motion.div>

            {/* Graduation section */}
            <GraduationSection />

            {/* System cards */}
            <div className="systems-grid">
              {coreSystems.map((system, i) => (
                <SystemCard key={system.id} system={system} index={i} />
              ))}
            </div>

            {/* Divider */}
            <div className="showcase-divider">
              <div className="divider-line" />
              <span className="divider-label">
                <span className="code-comment">{'// '}</span>
                more about me
              </span>
              <div className="divider-line" />
            </div>

            {/* About, Learning, Experience sections */}
            <AboutMiniSection />
            <LearningMiniSection />
            <ExperienceMiniSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
