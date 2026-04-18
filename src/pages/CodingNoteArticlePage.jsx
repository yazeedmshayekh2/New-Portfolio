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
        <Link to="/coding-notes" className="note-back-link">
          <FiArrowLeft />
          Back to Notes
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

          <h1>{note.title}</h1>
          <p className="article-excerpt">{note.excerpt}</p>

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

