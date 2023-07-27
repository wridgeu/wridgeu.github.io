import hljs from "highlight.js/lib/core";
import js from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import shell from "highlight.js/lib/languages/shell";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import { marked } from "marked";

// Prevent Rollup "Unexpected token Error", some tokens within certain language definitions (i.e. arduino) throw rollup off
// Err: "rollup-plugin-inject: failed to parse '<path-to-file.js>' Consider restricting the plugin to particular files via options.include"
hljs.registerLanguage("javascript", js);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);

/**
 * Syntax Highlighting
 * @returns {string} highlighted code block
 */
marked.setOptions({
	highlight: function(string: string, lang?: string): string | void {
		if (lang && hljs.getLanguage(lang)) {
			return hljs.highlight(string, { language: lang }).value;
		}
	}
});

/**
 * Image Rendering
 * @returns {HTMLImageElement|string} Dynamic image HTML-Tag
 */
const renderer = {
	paragraph(text: string) {
		// transform <p>-tags that match the regex to <img>-tags
		const regEx = /\[\[.+?\.(?:jpg|gif|png)\]\]/g;
		// doesn't match our [[<something>.jpg]]-pattern
		if (!text.match(regEx)) return false;
		// remove whitespace (edge case) && remove '[[' and ']]'
		const image = text.trim() && text.substring(2, text.length - 2);
		// rebuild image path for raw github
		const imagePath = `https://raw.githubusercontent.com/wiki/wridgeu/wridgeu.github.io/${image}`;

		return `<img class="wikiImage" src="${imagePath}"></img>`;
	}
};

marked.use({ renderer });

/**
 * @namespace sapmarco.projectpages.util
 */
export { marked as markdownService };
