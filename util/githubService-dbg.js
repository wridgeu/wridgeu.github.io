"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * Fetch the markdown content
   * @returns {Promise<string>} content of markdown file
   */
  function getSelectedContent(requestedContent) {
    //return markdown content & encode '-' with %20
    return fetch(`https://raw.githubusercontent.com/wiki/wridgeu/wridgeu.github.io/${requestedContent.replace(/[-*?]/g, "%20")}.md`).then(response => response.text());
  }

  /**
   * Fetch the markdown table of contents (index) of
   * the github wiki
   * @returns {Promise<string>} content of markdown file
   */
  function getWikiIndex() {
    //return sidebar to use as initial entry point
    return fetch(`https://raw.githubusercontent.com/wiki/wridgeu/wridgeu.github.io/_Sidebar.md`).then(response => response.text());
  }
  function getContentEditLink(requestedContent) {
    return `https://github.com/wridgeu/wridgeu.github.io/wiki/${requestedContent}/_edit`;
  }

  /**
   * @namespace sapmarco.projectpages.util
   */
  var __exports = {
    __esModule: true
  };
  __exports.getWikiIndex = getWikiIndex;
  __exports.getSelectedContent = getSelectedContent;
  __exports.getContentEditLink = getContentEditLink;
  return __exports;
});
//# sourceMappingURL=githubService-dbg.js.map
