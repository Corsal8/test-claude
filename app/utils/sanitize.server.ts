import sanitizeHtml from "sanitize-html";
import hljs from "highlight.js";

const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "strong",
  "em",
  "s",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "img",
  "span",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height"],
  "*": ["class"],
};

function decodeEntities(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function hljsHighlight(lang: string | undefined, rawCode: string, fallback: string): string {
  const code = decodeEntities(rawCode);
  try {
    const result =
      lang && hljs.getLanguage(lang)
        ? hljs.highlight(code, { language: lang })
        : hljs.highlightAuto(code);
    const langClass = result.language ?? "plaintext";
    return `<pre><code class="hljs language-${langClass}">${result.value}</code></pre>`;
  } catch {
    return fallback;
  }
}

function highlightCodeBlocks(html: string): string {
  // Pass 1: TipTap format — <pre><code class="language-X">...</code></pre>
  // Output uses "hljs language-X" so it won't re-match in pass 2.
  let result = html.replace(
    /<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/gi,
    (match, lang: string | undefined, rawCode: string) =>
      hljsHighlight(lang, rawCode, match),
  );

  // Pass 2: Lexical format — <code class="language-X" ...>...</code> (no <pre> wrapper).
  // Only matches class="language-..." (not "hljs language-..." already handled above).
  result = result.replace(
    /<code\b[^>]*\bclass="language-([^"]*)"[^>]*>([\s\S]*?)<\/code>/gi,
    (match, lang: string, rawCode: string) =>
      hljsHighlight(lang, rawCode, match),
  );

  return result;
}

export function sanitizePostContent(html: string): string {
  return sanitizeHtml(highlightCodeBlocks(html), {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["https", "http", "mailto"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
          ...(attribs.href?.startsWith("http") ? { target: "_blank" } : {}),
        },
      }),
    },
  });
}
