import { Link, Navigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiCopy,
  FiList,
  FiMaximize2,
  FiMinimize2,
  FiX,
} from "react-icons/fi";
import CodingNoteMarkdown from "../components/CodingNoteMarkdown.jsx";
import { codingNotes } from "../data/codingNotesData";
import {
  extractMarkdownHeadings,
  slugify,
} from "../utils/codingNoteMarkdown.js";
import "./Pages.scss";

export default function CodingNoteArticlePage() {
  const { slug } = useParams();
  const note = codingNotes.find((item) => item.slug === slug);
  const [readProgress, setReadProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [copiedCodeKey, setCopiedCodeKey] = useState("");
  const [clickedSectionId, setClickedSectionId] = useState("");
  const [tocSheetOpen, setTocSheetOpen] = useState(false);
  const tocSheetCloseRef = useRef(null);
  const clickPriorityUntilRef = useRef(0);
  const isCompleted = readProgress >= 100;
  const markdownContent = note?.markdown?.trim() || "";
  const hasMarkdown = markdownContent.length > 0;

  const sections = useMemo(() => {
    if (!note) return [];

    if (hasMarkdown) {
      const headings = extractMarkdownHeadings(markdownContent, note.slug);
      if (headings.length) return headings;
      return [{ id: `${note.slug}-md-overview`, title: "Overview", level: 1 }];
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
        title: "Overview",
        paragraphs: bodyParagraphs,
        level: 2,
      },
    ];
  }, [note, hasMarkdown, markdownContent]);

  const activeSectionTitle = useMemo(() => {
    const hit = sections.find((s) => s.id === activeSectionId);
    return hit?.title || sections[0]?.title || "";
  }, [sections, activeSectionId]);

  const tocCurrentPreview = useMemo(() => {
    const t = activeSectionTitle || "Sections";
    return t.length > 42 ? `${t.slice(0, 39)}…` : t;
  }, [activeSectionTitle]);

  useEffect(() => {
    const updateReadingUI = () => {
      const articleCard = document.querySelector(".article-card");
      if (!articleCard) return;

      const rect = articleCard.getBoundingClientRect();
      const topOffset = 120;
      const totalScrollable = Math.max(
        rect.height - (window.innerHeight - topOffset),
        1,
      );
      const consumed = Math.min(
        Math.max(topOffset - rect.top, 0),
        totalScrollable,
      );
      const progress = Math.round((consumed / totalScrollable) * 100);
      setReadProgress(Math.min(100, Math.max(0, progress)));

      const articleBody = document.getElementById("article-reading-body");
      if (!articleBody) return;
      const headings = Array.from(
        articleBody.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      );
      if (!headings.length) return;
      if (Date.now() < clickPriorityUntilRef.current) return;
      const threshold = Math.min(
        150,
        Math.max(96, Math.round(window.innerHeight * 0.16)),
      );
      const passed = headings.filter(
        (heading) => heading.getBoundingClientRect().top <= threshold,
      );
      const active = passed.length ? passed[passed.length - 1] : headings[0];
      const activeIdx = headings.indexOf(active);
      setActiveSectionId(sections[activeIdx]?.id || active.id || "");
    };

    updateReadingUI();
    window.addEventListener("scroll", updateReadingUI, { passive: true });
    window.addEventListener("resize", updateReadingUI);

    return () => {
      window.removeEventListener("scroll", updateReadingUI);
      window.removeEventListener("resize", updateReadingUI);
    };
  }, [sections]);

  useEffect(() => {
    document.body.classList.toggle("reading-focus-mode", isFocusMode);
    return () => document.body.classList.remove("reading-focus-mode");
  }, [isFocusMode]);

  const handleCopyCode = useCallback(async (code, codeKey) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeKey(codeKey);
      window.setTimeout(() => setCopiedCodeKey(""), 1400);
    } catch {
      setCopiedCodeKey("");
    }
  }, []);
  const handleTocClick = (event, targetIndex) => {
    event.preventDefault();
    const articleBody = document.getElementById("article-reading-body");
    if (!articleBody) return;
    const headings = Array.from(
      articleBody.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    );
    const element = headings[targetIndex];
    if (!element) return;
    const clickedId = sections[targetIndex]?.id || "";
    clickPriorityUntilRef.current = Date.now() + 800;
    setActiveSectionId(clickedId);
    setClickedSectionId(clickedId);
    element.classList.add("toc-target-highlight");
    window.setTimeout(() => {
      element.classList.remove("toc-target-highlight");
      setClickedSectionId("");
    }, 1200);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleTocNavClick = (event, targetIndex) => {
    handleTocClick(event, targetIndex);
    setTocSheetOpen(false);
  };

  useEffect(() => {
    if (!tocSheetOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setTocSheetOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => tocSheetCloseRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [tocSheetOpen]);

  useEffect(() => {
    if (!isFocusMode) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFocusMode(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFocusMode]);

  if (!note) {
    return <Navigate to="/coding-notes" replace />;
  }

  return (
    <section
      className={`coding-note-article ${isFocusMode ? "focus-mode" : ""}`}
    >
      {!isFocusMode && (
        <>
          <div
            className={`article-read-progress ${isCompleted ? "is-complete" : ""}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={readProgress}
          >
            <div
              className="article-read-progress-fill"
              style={{ width: `${readProgress}%` }}
            />
          </div>
          <div
            className={`article-read-pill ${isCompleted ? "is-complete" : ""}`}
            aria-hidden="true"
          >
            <span className="read-pill-label">&lt;read_progress /&gt;</span>
            <span className="read-pill-value">
              {isCompleted ? "100% DONE" : `${readProgress}%`}
            </span>
          </div>
        </>
      )}
      <div className="container">
        <div className="article-toolbar">
          {!isFocusMode && (
            <Link
              to="/coding-notes"
              className="note-back-link"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <FiArrowLeft />
              <span style={{ color: "#f5a623", fontWeight: "bold" }}>
                cd
              </span>{" "}
              <span style={{ color: "rgba(var(--text-primary-rgb), 0.6)" }}>
                ../coding-notes
              </span>
            </Link>
          )}
          {!isFocusMode && (
            <button
              type="button"
              className={`focus-mode-toggle ${isFocusMode ? "is-active" : ""}`}
              onClick={() => setIsFocusMode((prev) => !prev)}
            >
              <FiMaximize2 />
              <span>Focus mode</span>
            </button>
          )}
        </div>
        {isFocusMode && (
          <button
            type="button"
            className="focus-mode-exit-floating"
            onClick={() => setIsFocusMode(false)}
          >
            <FiMinimize2 />
            <span>Exit focus (Esc)</span>
          </button>
        )}

        {!isFocusMode && sections.length > 0 && (
          <div
            className={`article-toc-mobile ${tocSheetOpen ? "is-open" : ""}`}
          >
            <button
              type="button"
              className="article-toc-mobile__trigger"
              aria-expanded={tocSheetOpen}
              aria-controls="article-toc-sheet-panel"
              onClick={() => setTocSheetOpen((open) => !open)}
            >
              <FiList className="article-toc-mobile__icon" aria-hidden />
              <span className="article-toc-mobile__label">On this page</span>
              <span
                className="article-toc-mobile__current"
                title={activeSectionTitle}
              >
                {tocCurrentPreview}
              </span>
              <FiChevronDown
                className="article-toc-mobile__chevron"
                aria-hidden
              />
            </button>

            <div
              className={`article-toc-sheet ${tocSheetOpen ? "is-open" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-hidden={!tocSheetOpen}
              aria-labelledby="article-toc-sheet-title"
            >
              <div
                className="article-toc-sheet__backdrop"
                aria-hidden="true"
                onClick={() => setTocSheetOpen(false)}
              />
              <div
                id="article-toc-sheet-panel"
                className="article-toc-sheet__panel"
                onClick={(e) => e.stopPropagation()}
              >
                <header className="article-toc-sheet__header">
                  <h2 id="article-toc-sheet-title">On this page</h2>
                  <button
                    ref={tocSheetCloseRef}
                    type="button"
                    className="article-toc-sheet__close"
                    aria-label="Close"
                    onClick={() => setTocSheetOpen(false)}
                  >
                    <FiX />
                  </button>
                </header>
                <nav
                  className="article-toc-sheet__nav"
                  aria-label="Article sections"
                >
                  {sections.map((section, idx) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`toc-level-${section.level || 2} ${activeSectionId === section.id ? "active" : ""} ${clickedSectionId === section.id ? "is-clicked" : ""}`}
                      onClick={(event) => handleTocNavClick(event, idx)}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        <div className="article-layout">
          <article className="article-card">
            {note.image && (
              <img
                className="article-cover"
                src={note.image}
                alt={note.title}
                loading="lazy"
              />
            )}
            {!isFocusMode && (
              <div className="article-top-meta">
                <span>{note.category}</span>
                <span>
                  <FiClock />
                  {note.readTime}
                </span>
                <span>{note.publishedAt}</span>
                <span>{readProgress}% read</span>
              </div>
            )}

            <h1
              className="hero-name"
              style={{
                marginBottom: "1.5rem",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                lineHeight: 1.2,
              }}
            >
              <span
                className="code-punctuation"
                style={{ color: "rgba(var(--text-primary-rgb), 0.5)" }}
              >
                {"<"}
              </span>
              <span className="gradient">{note.title}</span>
              <span
                className="code-punctuation"
                style={{ color: "rgba(var(--text-primary-rgb), 0.5)" }}
              >
                {" />"}
              </span>
            </h1>
            <p
              className="article-excerpt"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: "rgba(0, 118, 76, 0.9)",
                fontSize: "0.95rem",
              }}
            >
              <span style={{ color: "rgba(var(--text-primary-rgb), 0.5)" }}>
                {"/*"}
              </span>
              <span style={{ color: "rgba(var(--text-primary-rgb), 0.5)" }}>
                {" "}
              </span>
              {note.excerpt}
              <span style={{ color: "rgba(var(--text-primary-rgb), 0.5)" }}>
                {" */"}
              </span>
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
                <CodingNoteMarkdown
                  noteSlug={note.slug}
                  markdownContent={markdownContent}
                  copiedCodeKey={copiedCodeKey}
                  onCopyCode={handleCopyCode}
                />
              ) : (
                sections.map((section) => (
                  <section key={section.id} className="article-section-block">
                    <h2 id={section.id}>{section.title}</h2>
                    {section.image && (
                      <img
                        className="article-inline-image"
                        src={section.image}
                        alt={section.imageAlt || section.title}
                        loading="lazy"
                      />
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
                    className={`toc-level-${section.level || 2} ${activeSectionId === section.id ? "active" : ""} ${clickedSectionId === section.id ? "is-clicked" : ""}`}
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
