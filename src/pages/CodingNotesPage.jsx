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
          <h1>Coding Notes</h1>
          <p>
            A blog-style page for sharing engineering notes, AI experiments, and implementation lessons.
          </p>
        </div>
      </div>

      <div className="notes-layout container">
        <article className="note-featured">
          <div className="note-featured-badge">
            <FiBookOpen />
            Featured Note
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
          <Link to={`/coding-notes/${featured.slug}`} className="note-read-link">
            Read Note
            <FiArrowRight />
          </Link>
        </article>

        <div className="notes-grid">
          {rest.map((note) => (
            <article className="note-card" key={note.slug}>
              <div className="note-icon">{note.category.slice(0, 2).toUpperCase()}</div>
              <h3>{note.title}</h3>
              <p>{note.excerpt}</p>
              <div className="note-meta">
                <span>{note.category}</span>
                <span>{note.readTime}</span>
              </div>
              <Link to={`/coding-notes/${note.slug}`} className="note-read-link">
                Open
                <FiArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
