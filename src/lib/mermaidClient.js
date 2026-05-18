import mermaid from "mermaid";

/** Serialize all mermaid.render calls — concurrent renders share global state and often flake. */
let renderChain = Promise.resolve();

let configuredThemeKey = null;

function themeVariablesForSite(theme) {
  const light = theme === "light";
  return {
    primaryColor: "#0d7377",
    primaryTextColor: light ? "#1a1a1a" : "#e8eaed",
    secondaryColor: light ? "#e4e4e7" : "#2d3038",
    tertiaryColor: light ? "#f4f4f5" : "#1a1b22",
    lineColor: light ? "#52525b" : "#9aa0a6",
    mainBkg: light ? "#fafafa" : "#232329",
    nodeBorder: light ? "#a1a1aa" : "#5f6368",
    clusterBkg: light ? "#f4f4f5" : "#1e1f26",
    clusterBorder: light ? "#d4d4d8" : "#3c4048",
    titleColor: light ? "#18181b" : "#e8eaed",
  };
}

/**
 * Re-initialize only when light/dark changes. Calling initialize before every
 * render races Mermaid's internal singleton and breaks diagrams randomly.
 */
export function ensureMermaidConfigured(theme) {
  const mermaidTheme = theme === "light" ? "default" : "dark";
  const key = `${mermaidTheme}`;
  if (configuredThemeKey === key) return;
  configuredThemeKey = key;
  mermaid.initialize({
    startOnLoad: false,
    theme: mermaidTheme,
    securityLevel: "loose",
    fontFamily: "Fira Code, ui-monospace, system-ui, sans-serif",
    themeVariables: themeVariablesForSite(theme),
  });
}

/**
 * @param {string} renderId  Unique HTML id for this render (Mermaid uses it for temp DOM).
 * @param {string} chartText
 * @returns {Promise<{ svg: string, bindFunctions?: (element: Element) => void }>}
 */
export function queueMermaidRender(renderId, chartText) {
  const trimmed = chartText.trim();
  const job = renderChain.then(() => mermaid.render(renderId, trimmed));
  renderChain = job.catch(() => undefined);
  return job;
}
