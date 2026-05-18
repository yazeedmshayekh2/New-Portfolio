import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import {
  ensureMermaidConfigured,
  queueMermaidRender,
} from "../lib/mermaidClient.js";

function newRenderId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `mmd-${crypto.randomUUID().replace(/-/g, "")}`;
  }
  return `mmd-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Renders a Mermaid diagram from fenced ```mermaid blocks in coding-note markdown.
 * Renders are serialized globally and Mermaid is configured once per theme to avoid
 * intermittent empty/partial SVGs from concurrent render() + repeated initialize().
 */
export default function MermaidDiagram({ chart }) {
  const { theme } = useTheme();
  const hostRef = useRef(null);
  const bindRef = useRef(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const renderId = newRenderId();

    const run = async () => {
      setError(null);
      setSvg("");
      ensureMermaidConfigured(theme);

      try {
        const { svg: out, bindFunctions } = await queueMermaidRender(
          renderId,
          chart,
        );
        if (cancelled) return;
        bindRef.current = bindFunctions;
        setSvg(out);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || String(e));
          setSvg("");
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [chart, theme]);

  useEffect(() => {
    if (!svg || !hostRef.current) return;
    const id = requestAnimationFrame(() => {
      bindRef.current?.(hostRef.current);
    });
    return () => cancelAnimationFrame(id);
  }, [svg]);

  if (error) {
    return (
      <figure
        className="article-mermaid article-mermaid--error"
        role="figure"
        aria-label="Diagram could not be rendered"
      >
        <pre className="article-mermaid__error-pre">{error}</pre>
      </figure>
    );
  }

  if (!svg) {
    return (
      <figure
        className="article-mermaid article-mermaid--loading"
        aria-busy="true"
        aria-label="Loading diagram"
      >
        <div className="article-mermaid__skeleton" />
      </figure>
    );
  }

  return (
    <figure className="article-mermaid" role="figure" aria-label="Diagram">
      <div
        ref={hostRef}
        className="article-mermaid__host"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  );
}
