import { Link, Navigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import { codingNotes } from '../data/codingNotesData';
import './Pages.scss';

export default function CodingNoteArticlePage() {
  const { slug } = useParams();
  const note = codingNotes.find((item) => item.slug === slug);

  if (!note) {
    return <Navigate to="/coding-notes" replace />;
  }

  return (
    <section className="coding-note-article">
      <div className="container">
        <Link to="/coding-notes" className="note-back-link" style={{ fontFamily: "'Fira Code', monospace" }}>
          <FiArrowLeft />
          <span style={{ color: "#7c3aed", fontWeight: "bold" }}>cd</span> <span style={{ color: "rgba(255,255,255,0.6)" }}>../coding-notes</span>
        </Link>

        <article className="article-card">
          <div className="article-top-meta">
            <span>{note.category}</span>
            <span>
              <FiClock />
              {note.readTime}
            </span>
            <span>{note.publishedAt}</span>
          </div>

          <h1 className="hero-name" style={{ marginBottom: "1.5rem", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.2 }}>
            <span className="code-punctuation" style={{ color: "rgba(255,255,255,0.2)" }}>{'<'}</span>
            <span className="gradient">{note.title}</span>
            <span className="code-punctuation" style={{ color: "rgba(255,255,255,0.2)" }}>{' />'}</span>
          </h1>
          <p className="article-excerpt" style={{ fontFamily: "'Fira Code', monospace", color: "rgba(0, 212, 255, 0.8)", fontSize: "0.95rem" }}>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>{'/**'}</span><br/>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>{' * '}</span>{note.excerpt}<br/>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>{' */'}</span>
          </p>

          {note.tags?.length > 0 && (
            <div className="article-tags">
              {note.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className="article-body">
            {note.body.map((paragraph, idx) => (
              <p key={`${note.slug}-${idx}`}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

