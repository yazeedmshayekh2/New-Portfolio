import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ThreeBackground from './components/ThreeBackground/ThreeBackground';
import HomePage from './pages/HomePage';
import CertificatesPage from './pages/CertificatesPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import CodingNotesPage from './pages/CodingNotesPage';
import CodingNoteArticlePage from './pages/CodingNoteArticlePage';

import './styles/_base.scss';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/coding-notes" element={<CodingNotesPage />} />
          <Route path="/coding-notes/:slug" element={<CodingNoteArticlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="app">
      {/* Ambient glow effects */}
      <div className="glow-blob glow-blob--cyan" />
      <div className="glow-blob glow-blob--violet" />
      <ThreeBackground />

      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}
