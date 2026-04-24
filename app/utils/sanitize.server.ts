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

function extractText(rawHtml: string): string {
  return rawHtml
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, ""); // strip span tags, keep text content
}

function highlightCodeBlocks(html: string): string {
  // Pass 1: TipTap / legacy format — <pre><code class="language-X">...</code></pre>
  let result = html.replace(
    /<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/gi,
    (match, lang: string | undefined, rawCode: string) =>
      hljsHighlight(lang, rawCode, match),
  );

  // Pass 2: Lexical format — <pre spellcheck="false" [data-language="X"]>...</pre>
  // CodeNode.exportDOM produces a <pre> with spellcheck="false" and an optional
  // data-language attribute. Children are <span> text nodes and <br> line breaks.
  result = result.replace(
    /<pre\b[^>]*\bspellcheck="false"[^>]*>([\s\S]*?)<\/pre>/gi,
    (match, rawHtml: string) => {
      const langMatch = match.match(/\bdata-language="([^"]*)"/i);
      const lang = langMatch?.[1] || undefined;
      return hljsHighlight(lang, extractText(rawHtml), match);
    },
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
