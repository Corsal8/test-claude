import sanitizeHtml from "sanitize-html";
import hljs from "highlight.js";

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "strong", "em", "s", "code", "pre",
  "ul", "ol", "li",
  "blockquote",
  "a",
  "img",
  "span",
  "table", "thead", "tbody", "tr", "th", "td",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height"],
  "*": ["class"],
};

function highlightCodeBlocks(html: string): string {
  return html.replace(
    /<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/gi,
    (match, lang: string | undefined, rawCode: string) => {
      const code = rawCode
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      try {
        const result =
          lang && hljs.getLanguage(lang)
            ? hljs.highlight(code, { language: lang })
            : hljs.highlightAuto(code);
        const langClass = result.language ?? "plaintext";
        return `<pre><code class="hljs language-${langClass}">${result.value}</code></pre>`;
      } catch {
        return match;
      }
    }
  );
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
