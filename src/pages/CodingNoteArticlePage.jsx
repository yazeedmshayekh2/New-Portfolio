import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowLeft, FiCheck, FiClock, FiCopy, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { codingNotes } from '../data/codingNotesData';
import './Pages.scss';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getNodeText(children) {
  if (Array.isArray(children)) {
    return children.map((child) => getNodeText(child)).join('');
  }
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (children?.props?.children) {
    return getNodeText(children.props.children);
  }
  return '';
}

function buildHeadingId(noteSlug, level, title, occurrence) {
  return `${noteSlug}-md-h${level}-${slugify(title)}-${occurrence}`;
}

function extractMarkdownHeadings(markdown, noteSlug) {
  const lines = markdown.split('\n');
  const headings = [];
  let inCodeFence = false;
  const seen = {};

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inCodeFence = !inCodeFence;
      return;
    }
    if (inCodeFence) return;

    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) return;

    const level = Math.min(Math.max(match[1].length, 1), 6);
    const title = match[2].trim();
    const key = `${level}:${slugify(title)}`;
    const occurrence = (seen[key] || 0) + 1;
    seen[key] = occurrence;
    headings.push({
      id: buildHeadingId(noteSlug, level, title, occurrence),
      title,
      level,
    });
  });

  return headings;
}

export default function CodingNoteArticlePage() {
  const { slug } = useParams();
  const note = codingNotes.find((item) => item.slug === slug);
  const [readProgress, setReadProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState('');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [copiedCodeKey, setCopiedCodeKey] = useState('');
  const [clickedSectionId, setClickedSectionId] = useState('');
  const clickPriorityUntilRef = useRef(0);
  const isCompleted = readProgress >= 100;
  const markdownContent = note?.markdown?.trim() || '';
  const hasMarkdown = markdownContent.length > 0;

  const sections = useMemo(() => {
    if (hasMarkdown) {
      const headings = extractMarkdownHeadings(markdownContent, note.slug);
      if (headings.length) return headings;
      return [{ id: `${note.slug}-md-overview`, title: 'Overview', level: 1 }];
    }

    if (note?.sections?.length) {
      return note.sections.map((section, idx) => ({
        ...section,
        id: `${note.slug}-section-${idx + 1}-${slugify(section.title)}`,
        level: 2,
      }));
    }

    const bodyParagraphs = note?.body || [];
    if (!bodyParagraphs.length) return [];

    return [
      {
        id: `${note.slug}-section-overview`,
        title: 'Overview',
        paragraphs: bodyParagraphs,
        level: 2,
      },
    ];
  }, [note, hasMarkdown, markdownContent]);

  if (!note) {
    return <Navigate to="/coding-notes" replace />;
  }

  useEffect(() => {
    const updateReadingUI = () => {
      const articleCard = document.querySelector('.article-card');
      if (!articleCard) return;

      const rect = articleCard.getBoundingClientRect();
      const topOffset = 120;
      const totalScrollable = Math.max(rect.height - (window.innerHeight - topOffset), 1);
      const consumed = Math.min(Math.max(topOffset - rect.top, 0), totalScrollable);
      const progress = Math.round((consumed / totalScrollable) * 100);
      setReadProgress(Math.min(100, Math.max(0, progress)));

      const articleBody = document.getElementById('article-reading-body');
      if (!articleBody) return;
      const headings = Array.from(articleBody.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      if (!headings.length) return;
      if (Date.now() < clickPriorityUntilRef.current) return;
      const threshold = 150;
      const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= threshold);
      const active = passed.length ? passed[passed.length - 1] : headings[0];
      const activeIdx = headings.indexOf(active);
      setActiveSectionId(sections[activeIdx]?.id || active.id || '');
    };

    updateReadingUI();
    window.addEventListener('scroll', updateReadingUI, { passive: true });
    window.addEventListener('resize', updateReadingUI);

    return () => {
      window.removeEventListener('scroll', updateReadingUI);
      window.removeEventListener('resize', updateReadingUI);
    };
  }, [sections]);

  useEffect(() => {
    document.body.classList.toggle('reading-focus-mode', isFocusMode);
    return () => document.body.classList.remove('reading-focus-mode');
  }, [isFocusMode]);

  const handleCopyCode = async (code, codeKey) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeKey(codeKey);
      window.setTimeout(() => setCopiedCodeKey(''), 1400);
    } catch {
      setCopiedCodeKey('');
    }
  };
  const handleTocClick = (event, targetIndex) => {
    event.preventDefault();
    const articleBody = document.getElementById('article-reading-body');
    if (!articleBody) return;
    const headings = Array.from(articleBody.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const element = headings[targetIndex];
    if (!element) return;
    const clickedId = sections[targetIndex]?.id || '';
    clickPriorityUntilRef.current = Date.now() + 800;
    setActiveSectionId(clickedId);
    setClickedSectionId(clickedId);
    element.classList.add('toc-target-highlight');
    window.setTimeout(() => {
      element.classList.remove('toc-target-highlight');
      setClickedSectionId('');
    }, 1200);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const renderedHeadingCounts = {};
  const renderHeading = (level, children) => {
    const title = getNodeText(children).trim();
    const key = `${level}:${slugify(title)}`;
    const occurrence = (renderedHeadingCounts[key] || 0) + 1;
    renderedHeadingCounts[key] = occurrence;
    const id = buildHeadingId(note.slug, level, title, occurrence);
    const Tag = `h${level}`;
    return <Tag id={id}>{children}</Tag>;
  };

  useEffect(() => {
    if (!isFocusMode) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFocusMode]);

  return (
    <section className={`coding-note-article ${isFocusMode ? 'focus-mode' : ''}`}>
      {!isFocusMode && (
        <>
          <div className={`article-read-progress ${isCompleted ? 'is-complete' : ''}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={readProgress}>
            <div className="article-read-progress-fill" style={{ width: `${readProgress}%` }} />
          </div>
          <div className={`article-read-pill ${isCompleted ? 'is-complete' : ''}`} aria-hidden="true">
            <span className="read-pill-label">&lt;read_progress /&gt;</span>
            <span className="read-pill-value">{isCompleted ? '100% DONE' : `${readProgress}%`}</span>
          </div>
        </>
      )}
      <div className="container">
        <div className="article-toolbar">
          {!isFocusMode && (
            <Link to="/coding-notes" className="note-back-link" style={{ fontFamily: "'Fira Code', monospace" }}>
              <FiArrowLeft />
              <span style={{ color: "#7c3aed", fontWeight: "bold" }}>cd</span> <span style={{ color: "rgba(255,255,255,0.6)" }}>../coding-notes</span>
            </Link>
          )}
          {!isFocusMode && (
            <button
              type="button"
              className={`focus-mode-toggle ${isFocusMode ? 'is-active' : ''}`}
              onClick={() => setIsFocusMode((prev) => !prev)}
            >
              <FiMaximize2 />
              <span>Focus mode</span>
            </button>
          )}
        </div>
        {isFocusMode && (
          <button type="button" className="focus-mode-exit-floating" onClick={() => setIsFocusMode(false)}>
            <FiMinimize2 />
            <span>Exit focus (Esc)</span>
          </button>
        )}

        <div className="article-layout">
          <article className="article-card">
            {note.image && (
              <img className="article-cover" src={note.image} alt={note.title} loading="lazy" />
            )}
            {!isFocusMode && <div className="article-top-meta">
              <span>{note.category}</span>
              <span>
                <FiClock />
                {note.readTime}
              </span>
              <span>{note.publishedAt}</span>
              <span>{readProgress}% read</span>
            </div>}

            <h1 className="hero-name" style={{ marginBottom: "1.5rem", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.2 }}>
              <span className="code-punctuation" style={{ color: "rgba(255,255,255,0.2)" }}>{'<'}</span>
              <span className="gradient">{note.title}</span>
              <span className="code-punctuation" style={{ color: "rgba(255,255,255,0.2)" }}>{' />'}</span>
            </h1>
            <p className="article-excerpt" style={{ fontFamily: "'Fira Code', monospace", color: "rgba(0, 212, 255, 0.8)", fontSize: "0.95rem" }}>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>{'/*'}</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>{' '}</span>{note.excerpt}
              <span style={{ color: "rgba(255,255,255,0.2)" }}>{' */'}</span>
            </p>

            {note.tags?.length > 0 && (
              <div className="article-tags">
                {note.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}

            <div className="article-body" id="article-reading-body">
              {hasMarkdown ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => renderHeading(1, children),
                    h2: ({ children }) => renderHeading(2, children),
                    h3: ({ children }) => renderHeading(3, children),
                    h4: ({ children }) => renderHeading(4, children),
                    h5: ({ children }) => renderHeading(5, children),
                    h6: ({ children }) => renderHeading(6, children),
                    img: ({ src, alt }) => <img className="article-inline-image" src={src || ''} alt={alt || 'Blog visual'} loading="lazy" />,
                    pre: ({ children }) => {
                      const codeText = getNodeText(children).replace(/\n$/, '');
                      const codeKey = `${note.slug}-${slugify(codeText.slice(0, 40) || 'code')}`;
                      const isCopied = copiedCodeKey === codeKey;
                      return (
                        <div className="article-code-wrap">
                          <button
                            type="button"
                            className={`article-code-copy ${isCopied ? 'is-copied' : ''}`}
                            onClick={() => handleCopyCode(codeText, codeKey)}
                          >
                            {isCopied ? <FiCheck /> : <FiCopy />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                          <pre className="article-code-block">{children}</pre>
                        </div>
                      );
                    },
                    code: ({ className, children }) => <code className={className}>{children}</code>,
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              ) : (
                sections.map((section) => (
                  <section key={section.id} className="article-section-block">
                    <h2 id={section.id}>{section.title}</h2>
                    {section.image && (
                      <img className="article-inline-image" src={section.image} alt={section.imageAlt || section.title} loading="lazy" />
                    )}
                    {section.paragraphs?.map((paragraph, idx) => (
                      <p key={`${section.id}-${idx}`}>{paragraph}</p>
                    ))}
                  </section>
                ))
              )}
            </div>
          </article>

          {!isFocusMode && (
            <aside className="article-sidebar">
              <h3>On this page</h3>
              <nav aria-label="Article sections">
                {sections.map((section, idx) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`toc-level-${section.level || 2} ${activeSectionId === section.id ? 'active' : ''} ${clickedSectionId === section.id ? 'is-clicked' : ''}`}
                    onClick={(event) => handleTocClick(event, idx)}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

