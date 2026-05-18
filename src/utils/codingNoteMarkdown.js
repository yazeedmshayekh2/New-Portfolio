export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getNodeText(children) {
  if (Array.isArray(children)) {
    return children.map((child) => getNodeText(child)).join("");
  }
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (children?.props?.children) {
    return getNodeText(children.props.children);
  }
  return "";
}

export function buildHeadingId(noteSlug, level, title, occurrence) {
  return `${noteSlug}-md-h${level}-${slugify(title)}-${occurrence}`;
}

export function shortHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

export function getMermaidChartFromPreChildren(children) {
  const first = Array.isArray(children) ? children[0] : children;
  const cls = first?.props?.className;
  if (typeof cls !== "string" || !cls.includes("language-mermaid")) {
    return null;
  }
  return getNodeText(first.props.children).replace(/\n$/, "");
}

/** Stable React keys for each ```mermaid fence (byte offset in normalized markdown). */
export function listMermaidBlockKeys(markdown, slug) {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const keys = [];
  const re = /^```mermaid\s*$/gm;
  let m;
  while ((m = re.exec(normalized)) !== null) {
    keys.push(`${slug}-mermaid@${m.index}`);
  }
  return keys;
}

export function extractMarkdownHeadings(markdown, noteSlug) {
  const lines = markdown.split("\n");
  const headings = [];
  let inCodeFence = false;
  const seen = {};

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
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
