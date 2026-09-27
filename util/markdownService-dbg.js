sap.ui.define(["sapmarco/projectpages/thirdparty/marked", "sapmarco/projectpages/thirdparty/marked-highlight", "sapmarco/projectpages/thirdparty/highlight.js/lib/core", "sapmarco/projectpages/thirdparty/highlight.js/lib/languages/javascript", "sapmarco/projectpages/thirdparty/highlight.js/lib/languages/xml", "sapmarco/projectpages/thirdparty/highlight.js/lib/languages/css", "sapmarco/projectpages/thirdparty/highlight.js/lib/languages/shell", "sapmarco/projectpages/thirdparty/highlight.js/lib/languages/bash", "sapmarco/projectpages/thirdparty/highlight.js/lib/languages/json", "sapmarco/projectpages/thirdparty/highlight.js/lib/languages/plaintext"], function (__marked, __marked_highlight, __hljs, __js, __xml, __css, __shell, __bash, __json, __plaintext) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Marked = __marked["Marked"];
  const Renderer = __marked["Renderer"];
  const markedHighlight = __marked_highlight["markedHighlight"];
  const hljs = _interopRequireDefault(__hljs);
  const js = _interopRequireDefault(__js);
  const xml = _interopRequireDefault(__xml);
  const css = _interopRequireDefault(__css);
  const shell = _interopRequireDefault(__shell);
  const bash = _interopRequireDefault(__bash);
  const json = _interopRequireDefault(__json);
  const plaintext = _interopRequireDefault(__plaintext); // Register only the languages in use; 'plaintext' is the fallback.
  hljs.registerLanguage("javascript", js);
  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("css", css);
  hljs.registerLanguage("shell", shell);
  hljs.registerLanguage("bash", bash);
  hljs.registerLanguage("json", json);
  hljs.registerLanguage("plaintext", plaintext);
  const marked = new Marked(markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, {
        language
      }).value;
    }
  }));
  const renderer = {
    // wiki '[[<file>.jpg]]' syntax -> <img>; false falls back to the default renderer
    paragraph(token) {
      const imageSyntax = /\[\[.+?\.(?:jpg|gif|png)\]\]/;
      if (!imageSyntax.test(token.text)) {
        return false;
      }
      const image = token.text.trim().slice(2, -2);
      const imagePath = `https://raw.githubusercontent.com/wiki/wridgeu/wridgeu.github.io/${image}`;
      return `<img class="wikiImage" src="${imagePath}">`;
    },
    // open links in a new tab so the SPA stays put; the stock renderer escapes href/title
    link(token) {
      return Renderer.prototype.link.call(this, token).replace("<a ", '<a target="_blank" rel="noopener noreferrer" ');
    }
  };
  marked.use({
    renderer
  });

  // ponytail: unbounded memo, fine for the wiki's small fixed page set
  const parseCache = new Map();
  const markdownService = {
    parse(markdown) {
      const cached = parseCache.get(markdown);
      if (cached !== undefined) {
        return cached;
      }
      const html = marked.parse(markdown);
      parseCache.set(markdown, html);
      return html;
    }
  };

  /**
   * @namespace sapmarco.projectpages.util
   */
  var __exports = {
    __esModule: true
  };
  __exports.markdownService = markdownService;
  return __exports;
});
//# sourceMappingURL=markdownService-dbg.js.map
