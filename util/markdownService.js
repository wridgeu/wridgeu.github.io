sap.ui.define(["highlight.js/lib/core", "highlight.js/lib/languages/javascript", "highlight.js/lib/languages/xml", "highlight.js/lib/languages/css", "highlight.js/lib/languages/shell", "highlight.js/lib/languages/bash", "highlight.js/lib/languages/json", "marked"], function (__hljs, __js, __xml, __css, __shell, __bash, __json, __marked) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const hljs = _interopRequireDefault(__hljs);
  const js = _interopRequireDefault(__js);
  const xml = _interopRequireDefault(__xml);
  const css = _interopRequireDefault(__css);
  const shell = _interopRequireDefault(__shell);
  const bash = _interopRequireDefault(__bash);
  const json = _interopRequireDefault(__json);
  const marked = __marked["marked"]; // Prevent Rollup "Unexpected token Error", some tokens within certain language definitions (i.e. arduino) throw rollup off
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
    highlight: function (string, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(string, {
          language: lang
        }).value;
      }
    }
  });

  /**
   * Image Rendering
   * @returns {HTMLImageElement|string} Dynamic image HTML-Tag
   */
  const renderer = {
    paragraph(text) {
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
  marked.use({
    renderer
  });

  /**
   * @namespace sapmarco.projectpages.util
   */
  var __exports = {
    __esModule: true
  };
  __exports.markdownService = marked;
  return __exports;
});