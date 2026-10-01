import { Marked, Renderer, type Tokens, type RendererThis } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js/lib/core";
import js from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import shell from "highlight.js/lib/languages/shell";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";
import { WIKI_RAW_URL } from "./githubService";

// Register only the languages in use; 'plaintext' is the fallback.
hljs.registerLanguage("javascript", js);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("plaintext", plaintext);

const marked = new Marked(
	markedHighlight({
		emptyLangClass: "hljs",
		langPrefix: "hljs language-",
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : "plaintext";
			return hljs.highlight(code, { language }).value;
		},
	}),
);

const renderer = {
	// wiki '[[<file>.jpg]]' syntax -> <img>; false falls back to the default renderer
	paragraph(token: Tokens.Paragraph) {
		const imageSyntax = /\[\[.+?\.(?:jpg|gif|png)\]\]/;
		if (!imageSyntax.test(token.text)) {
			return false;
		}
		const image = token.text.trim().slice(2, -2);
		return `<img class="wikiImage" src="${WIKI_RAW_URL}${image}">`;
	},
	// open links in a new tab so the SPA stays put; the stock renderer escapes href/title
	link(this: RendererThis, token: Tokens.Link) {
		return Renderer.prototype.link.call(this, token).replace("<a ", '<a target="_blank" rel="noopener noreferrer" ');
	},
};

marked.use({ renderer });

// ponytail: unbounded memo, fine for the wiki's small fixed page set
const parseCache = new Map<string, string>();

const markdownService = {
	parse(markdown: string): string {
		const cached = parseCache.get(markdown);
		if (cached !== undefined) {
			return cached;
		}
		const html = marked.parse(markdown) as string;
		parseCache.set(markdown, html);
		return html;
	},
};

/**
 * @namespace sapmarco.projectpages.util
 */
export { markdownService };
