import { memo, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiCheck, FiCopy } from "react-icons/fi";
import MermaidDiagram from "./MermaidDiagram.jsx";
import {
  buildHeadingId,
  getMermaidChartFromPreChildren,
  getNodeText,
  listMermaidBlockKeys,
  shortHash,
  slugify,
} from "../utils/codingNoteMarkdown.js";

const REMARK_PLUGINS = [remarkGfm];

function CodingNoteMarkdown({
  noteSlug,
  markdownContent,
  copiedCodeKey,
  onCopyCode,
}) {
  const mermaidKeyList = useMemo(
    () => listMermaidBlockKeys(markdownContent, noteSlug),
    [markdownContent, noteSlug],
  );
  const mermaidKeyDrainRef = useRef(mermaidKeyList);
  mermaidKeyDrainRef.current = [...mermaidKeyList];

  const components = useMemo(() => {
    const renderedHeadingCounts = {};
    const renderHeading = (level, children) => {
      const title = getNodeText(children).trim();
      const key = `${level}:${slugify(title)}`;
      const occurrence = (renderedHeadingCounts[key] || 0) + 1;
      renderedHeadingCounts[key] = occurrence;
      const id = buildHeadingId(noteSlug, level, title, occurrence);
      const Tag = `h${level}`;
      return <Tag id={id}>{children}</Tag>;
    };

    return {
      h1: ({ children }) => renderHeading(1, children),
      h2: ({ children }) => renderHeading(2, children),
      h3: ({ children }) => renderHeading(3, children),
      h4: ({ children }) => renderHeading(4, children),
      h5: ({ children }) => renderHeading(5, children),
      h6: ({ children }) => renderHeading(6, children),
      img: ({ src, alt }) => (
        <img
          className="article-inline-image"
          src={src || ""}
          alt={alt || "Blog visual"}
          loading="lazy"
        />
      ),
      pre: ({ children }) => {
        const mermaidChart = getMermaidChartFromPreChildren(children);
        if (mermaidChart) {
          const k =
            mermaidKeyDrainRef.current.shift() ??
            `${noteSlug}-mermaid-fallback-${shortHash(mermaidChart)}`;
          return <MermaidDiagram key={k} chart={mermaidChart} />;
        }
        const codeText = getNodeText(children).replace(/\n$/, "");
        const codeKey = `${noteSlug}-${slugify(codeText.slice(0, 40) || "code")}`;
        const isCopied = copiedCodeKey === codeKey;
        return (
          <div className="article-code-wrap">
            <button
              type="button"
              className={`article-code-copy ${isCopied ? "is-copied" : ""}`}
              onClick={() => onCopyCode(codeText, codeKey)}
            >
              {isCopied ? <FiCheck /> : <FiCopy />}
              <span>{isCopied ? "Copied" : "Copy"}</span>
            </button>
            <pre className="article-code-block">{children}</pre>
          </div>
        );
      },
      code: ({ className, children }) => (
        <code className={className}>{children}</code>
      ),
    };
    // markdownContent must invalidate when the article body changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteSlug, markdownContent, copiedCodeKey, onCopyCode]);

  return (
    <ReactMarkdown remarkPlugins={REMARK_PLUGINS} components={components}>
      {markdownContent}
    </ReactMarkdown>
  );
}

export default memo(CodingNoteMarkdown);
