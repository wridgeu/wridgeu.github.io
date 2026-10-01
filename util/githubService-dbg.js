sap.ui.define([], function () {
  "use strict";

  /**
   * Fetch the markdown content
   * @returns {Promise<string>} content of markdown file
   */
  const getSelectedContent = function (requestedContent) {
    try {
      // pushed pages are stored with spaces, pages created in the web editor with hyphens
      const spaced = requestedContent.replace(/[-*?]/g, " ");
      return Promise.resolve(fetch(`${WIKI_RAW_URL}${encodeURIComponent(spaced)}.md`)).then(function (response) {
        function _temp2() {
          return response.text();
        }
        const _temp = function () {
          if (response.status === 404 && spaced !== requestedContent) {
            return Promise.resolve(fetch(`${WIKI_RAW_URL}${encodeURIComponent(requestedContent)}.md`)).then(function (_fetch) {
              response = _fetch;
            });
          }
        }();
        return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  /**
   * Fetch the markdown table of contents (index) of
   * the github wiki
   * @returns {Promise<string>} content of markdown file
   */
  const WIKI_RAW_URL = "https://raw.githubusercontent.com/wiki/wridgeu/wridgeu.github.io/";
  const WIKI_PAGE_URL = "https://github.com/wridgeu/wridgeu.github.io/wiki/";
  function getWikiIndex() {
    //return sidebar to use as initial entry point
    return fetch(`${WIKI_RAW_URL}_Sidebar.md`).then(response => response.text());
  }
  function getContentEditLink(requestedContent) {
    return `${WIKI_PAGE_URL}${requestedContent}/_edit`;
  }

  /**
   * @namespace sapmarco.projectpages.util
   */
  var __exports = {
    __esModule: true
  };
  __exports.WIKI_RAW_URL = WIKI_RAW_URL;
  __exports.WIKI_PAGE_URL = WIKI_PAGE_URL;
  __exports.getWikiIndex = getWikiIndex;
  __exports.getSelectedContent = getSelectedContent;
  __exports.getContentEditLink = getContentEditLink;
  return __exports;
});
//# sourceMappingURL=githubService-dbg.js.map
