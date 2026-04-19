import { useEffect, useState } from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Learning from '../components/Learning/Learning';
import Experience from '../components/Experience/Experience';
import SectionDivider from '../components/SectionDivider/SectionDivider';
import './Pages.scss';

const homeAnchors = [
  { id: 'about', label: 'About' },
  { id: 'currently-learning', label: 'Learning' },
  { id: 'watching', label: 'Watching' },
  { id: 'experience', label: 'Experience' },
];

export default function HomePage() {
  const [activeAnchor, setActiveAnchor] = useState(homeAnchors[0].id);

  useEffect(() => {
    const updateActiveAnchor = () => {
      const viewportFocus = window.innerHeight * 0.38;
      let bestId = homeAnchors[0].id;
      let bestDistance = Number.POSITIVE_INFINITY;

      homeAnchors.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportFocus);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      });

      setActiveAnchor(bestId);
    };

    updateActiveAnchor();
    window.addEventListener('scroll', updateActiveAnchor, { passive: true });
    window.addEventListener('resize', updateActiveAnchor);

    return () => {
      window.removeEventListener('scroll', updateActiveAnchor);
      window.removeEventListener('resize', updateActiveAnchor);
    };
  }, []);

  return (
    <>
      <Hero />
      <SectionDivider />
      <section className="page-intro">
        <div className="page-intro-container">
          <h2>
            <span className="code-comment">{'// '}</span>
            Main<span className="code-dot">.</span>focus
            <span className="code-parens">()</span>
          </h2>
          <p>
            This page gives a quick overview about who you are, what you build, and why your work matters.
          </p>
        </div>
      </section>
      <div className="home-quick-nav-wrap">
        <nav className="home-quick-nav container" aria-label="Home section navigation">
          {homeAnchors.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={activeAnchor === id ? 'active' : ''}>
              <span className="qnav-bracket">{'<'}</span>
              {label}
              <span className="qnav-bracket">{' />'}</span>
            </a>
          ))}
        </nav>
      </div>
      <About />
      <SectionDivider />
      <Learning />
      <SectionDivider />
      <Experience />
    </>
  );
}
