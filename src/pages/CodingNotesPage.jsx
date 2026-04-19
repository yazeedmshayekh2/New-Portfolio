import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen, FiClock } from 'react-icons/fi';
import { codingNotes } from '../data/codingNotesData';
import './Pages.scss';

export default function CodingNotesPage() {
  const featured = codingNotes.find((n) => n.featured) || codingNotes[0];
  const rest = codingNotes.filter((n) => n.slug !== featured.slug);

  return (
    <section className="coding-notes-page">
      <div className="page-intro page-intro--compact">
        <div className="page-intro-container">
          <div className="page-header-code" style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>
            <span style={{ color: "#7c3aed", fontWeight: "bold" }}>import</span>{' '}
            <span style={{ color: "rgba(255,255,255,0.3)" }}>{'{'}</span>{' '}
            <span style={{ color: "#00d4ff", fontWeight: "500" }}>notes</span>{' '}
            <span style={{ color: "rgba(255,255,255,0.3)" }}>{'}'}</span>{' '}
            <span style={{ color: "#7c3aed", fontWeight: "bold" }}>from</span>{' '}
            <span style={{ color: "#10b981" }}>'@brain/knowledge'</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>;</span>
          </div>
          <h1 className="hero-name" style={{ display: 'inline-block', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            <span className="code-keyword" style={{ color: "#7c3aed", fontWeight: "bold" }}>export default class</span>{" "}
            <span className="gradient">Coding_Notes</span>
          </h1>
          <p>
            <span style={{ color: "rgba(0, 212, 255, 0.5)", fontFamily: "'Fira Code', monospace" }}>// </span>
            A technical blog for sharing engineering notes, AI experiments, and implementation lessons.
          </p>
        </div>
      </div>

      <div className="notes-layout container">
        <article className="note-featured">
          <div className="note-featured-badge" style={{ fontFamily: "'Fira Code', monospace" }}>
            <FiBookOpen />
            <span>@featured</span>
          </div>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <div className="note-meta">
            <span>{featured.category}</span>
            <span>
              <FiClock />
              {featured.readTime}
            </span>
            <span>{featured.publishedAt}</span>
          </div>
          <Link to={`/coding-notes/${featured.slug}`} className="note-read-link" style={{ fontFamily: "'Fira Code', monospace" }}>
            <span style={{ color: "#7c3aed" }}>await</span> <span style={{ color: "#00d4ff" }}>readNote</span><span style={{ color: "rgba(255,255,255,0.3)" }}>()</span>
            <FiArrowRight />
          </Link>
        </article>

        <div className="notes-grid">
          {rest.map((note) => (
            <article className="note-card" key={note.slug}>
              <div className="note-icon" style={{ fontFamily: "'Fira Code', monospace" }}>{note.category.slice(0, 2).toUpperCase()}</div>
              <h3>{note.title}</h3>
              <p>{note.excerpt}</p>
              <div className="note-meta">
                <span>{note.category}</span>
                <span>{note.readTime}</span>
              </div>
              <Link to={`/coding-notes/${note.slug}`} className="note-read-link" style={{ fontFamily: "'Fira Code', monospace" }}>
                <span style={{ color: "#7c3aed" }}>await</span> <span style={{ color: "#00d4ff" }}>open</span><span style={{ color: "rgba(255,255,255,0.3)" }}>()</span>
                <FiArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
