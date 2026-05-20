import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Learning from '../components/Learning/Learning';
import Experience from '../components/Experience/Experience';
import SectionDivider from '../components/SectionDivider/SectionDivider';
import { codingNotes } from '../data/codingNotesData';
import './Pages.scss';

const homeAnchors = [
  { id: 'about', label: 'About' },
  { id: 'currently-learning', label: 'Learning' },
  { id: 'watching', label: 'Watching' },
  { id: 'experience', label: 'Experience' },
];

export default function HomePage() {
  const [activeAnchor, setActiveAnchor] = useState(homeAnchors[0].id);
  const latestNote = codingNotes[codingNotes.length - 1];

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
      <section className="page-intro">
        <div className="page-intro-container">
          <h2>
            <span className="code-comment">{'// '}</span>
            New<span className="code-dot">.</span>Notes
            <span className="code-parens">()</span>
          </h2>
          <p>
            Here's the latest note I've been working on:
          </p>
          {latestNote && (
            <Link to={`/coding-notes/${latestNote.slug}`} className="home-new-note-banner">
              <span className="new-pill">NEW NOTE</span>
              <span>{latestNote.title}</span>
              <span className="new-note-date">{latestNote.publishedAt}</span>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
