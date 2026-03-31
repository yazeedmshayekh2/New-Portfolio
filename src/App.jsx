import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Certifications from './components/Certifications/Certifications';
import Learning from './components/Learning/Learning';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import SectionDivider from './components/SectionDivider/SectionDivider';

import './styles/_base.scss';

export default function App() {
  return (
    <div className="app">
      {/* Ambient glow effects */}
      <div className="glow-blob glow-blob--cyan" />
      <div className="glow-blob glow-blob--violet" />

      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Learning />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
