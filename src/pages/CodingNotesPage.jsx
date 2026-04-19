import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { FiArrowRight, FiBookOpen, FiClock, FiSearch, FiX } from 'react-icons/fi';
import { codingNotes } from '../data/codingNotesData';
import './Pages.scss';

const NOTES_PER_PAGE = 10;

export default function CodingNotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
  const [isClearing, setIsClearing] = useState(false);

  const sortedNotes = useMemo(() => [...codingNotes].reverse(), []);
  const suggestionPool = useMemo(() => {
    const entries = sortedNotes.flatMap((note) => [note.title, note.category, ...(note.tags || [])]);
    return [...new Set(entries)];
  }, [sortedNotes]);

  const suggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return suggestionPool.slice(0, 6);
    return suggestionPool
      .filter((item) => item.toLowerCase().includes(query) && item.toLowerCase() !== query)
      .slice(0, 6);
  }, [searchTerm, suggestionPool]);
  const inlineCompletion = useMemo(() => {
    const query = searchTerm.toLowerCase();
    if (!query) return '';
    return suggestionPool.find((item) => item.toLowerCase().startsWith(query) && item.toLowerCase() !== query) || '';
  }, [searchTerm, suggestionPool]);

  const filteredNotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return sortedNotes;

    return sortedNotes.filter((note) => {
      const searchable = [
        note.title,
        note.excerpt,
        note.category,
        note.publishedAt,
        ...(note.tags || []),
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(query);
    });
  }, [searchTerm, sortedNotes]);

  const totalPages = Math.max(1, Math.ceil(filteredNotes.length / NOTES_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setActiveSuggestionIdx(0);
  }, [searchTerm, suggestions.length]);

  const pageNotes = useMemo(() => {
    const start = (currentPage - 1) * NOTES_PER_PAGE;
    return filteredNotes.slice(start, start + NOTES_PER_PAGE);
  }, [filteredNotes, currentPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);
  const applySuggestion = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handleClearSearch = () => {
    setIsClearing(true);
    setSearchTerm('');
    setCurrentPage(1);
    window.setTimeout(() => setIsClearing(false), 260);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Tab') {
      if (!inlineCompletion && !suggestions.length) return;
      event.preventDefault();
      applySuggestion(inlineCompletion || suggestions[activeSuggestionIdx] || suggestions[0]);
      return;
    }

    if (!suggestions.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSuggestionIdx((idx) => (idx + 1) % suggestions.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestionIdx((idx) => (idx - 1 + suggestions.length) % suggestions.length);
      return;
    }

    if (event.key === 'Enter' && suggestions[activeSuggestionIdx]) {
      event.preventDefault();
      applySuggestion(suggestions[activeSuggestionIdx]);
    }
  };

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
        <div className="notes-grid">
          <div className="note-featured-badge" style={{ fontFamily: "'Fira Code', monospace" }}>
            <FiBookOpen />
            <span>@latest-first</span>
          </div>
          <div className="notes-search-row">
            <div className={`notes-search-shell ${isClearing ? 'is-clearing' : ''}`}>
              <span className="search-code-prefix">const query = </span>
              <FiSearch className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 120)}
                placeholder="'title | category | tags'"
                aria-label="Search notes"
              />
              {inlineCompletion && (
                <span className="search-inline-ghost" aria-hidden="true">
                  <span className="search-inline-prefix">{searchTerm}</span>
                  {inlineCompletion.slice(searchTerm.length)}
                </span>
              )}
              {searchTerm && (
                <button type="button" className={`search-clear-btn ${isClearing ? 'is-clearing' : ''}`} onClick={handleClearSearch} aria-label="Clear search">
                  <FiX />
                </button>
              )}
            </div>
            <span className="search-results-count">{filteredNotes.length} result{filteredNotes.length === 1 ? '' : 's'}</span>
            {isSearchFocused && suggestions.length > 0 && (
              <div className="search-suggestions">
                <div className="search-suggestions-hint">Press Tab to autocomplete</div>
                {suggestions.map((suggestion, idx) => (
                  <button
                    type="button"
                    key={suggestion}
                    className={idx === activeSuggestionIdx ? 'is-active' : ''}
                    onMouseDown={() => applySuggestion(suggestion)}
                  >
                    <span className="suggestion-prefix">&gt;</span>
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="notes-results-track" key={`${currentPage}-${searchTerm || 'all'}`}>
            {pageNotes.map((note, idx) => (
              <article className="note-card" key={note.slug}>
                {note.image && (
                  <img className="note-cover" src={note.image} alt={note.title} loading="lazy" />
                )}
                {idx === 0 && currentPage === 1 && <span className="new-note-tag">Newest</span>}
                <div className="note-icon" style={{ fontFamily: "'Fira Code', monospace" }}>{note.category.slice(0, 2).toUpperCase()}</div>
                <h3>{note.title}</h3>
                <p>{note.excerpt}</p>
                <div className="note-meta">
                  <span>{note.category}</span>
                  <span>{note.readTime}</span>
                  <span>
                    <FiClock />
                    {note.publishedAt}
                  </span>
                </div>
                <Link to={`/coding-notes/${note.slug}`} className="note-read-link" style={{ fontFamily: "'Fira Code', monospace" }}>
                  <span style={{ color: "#7c3aed" }}>await</span> <span style={{ color: "#00d4ff" }}>open</span><span style={{ color: "rgba(255,255,255,0.3)" }}>()</span>
                  <FiArrowRight />
                </Link>
              </article>
            ))}
          </div>

          {pageNotes.length === 0 && (
            <div className="notes-empty-state">
              No notes found for "{searchTerm}".
            </div>
          )}

          {filteredNotes.length > NOTES_PER_PAGE && (
            <div className="notes-pagination" aria-label="Coding notes pagination">
              <div className="pagination-status">
                <span className="pagination-status-label">Page</span>
                <span className="pagination-status-value">{currentPage} / {totalPages}</span>
              </div>
              <button type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                <span className="pagination-arrow" aria-hidden="true">{"<"}</span>
                <span>Previous</span>
              </button>
              {pageNumbers.map((page) => (
                <button
                  type="button"
                  key={page}
                  className={page === currentPage ? 'is-active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button type="button" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                <span>Next</span>
                <span className="pagination-arrow" aria-hidden="true">{">"}</span>
              </button>
            </div>
          )}

          <aside className="notes-author-guide">
            <h4>Add your own note</h4>
            <p>Edit <code>src/data/codingNotesData.js</code> and add a new object with <code>slug</code>, <code>title</code>, <code>excerpt</code>, <code>category</code>, <code>readTime</code>, <code>publishedAt</code>, <code>tags</code>, and <code>markdown</code>.</p>
            <p>Use Markdown headings (<code>##</code>) to auto-build the article topic sidebar. You can also include code blocks, lists, tables, quotes, and inline images.</p>
            <p>For images, place files in <code>public/</code> (example: <code>public/my-blog-cover.jpg</code>) then set <code>image: '/my-blog-cover.jpg'</code>.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
