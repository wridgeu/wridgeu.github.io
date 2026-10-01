sap.ui.define(["../util/githubService", "../util/markdownService", "./Base.controller", "sap/ui/model/json/JSONModel", "sap/ui/Device"], function (___util_githubService, ___util_markdownService, __BaseController, JSONModel, Device) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  function _finallyRethrows(body, finalizer) {
    try {
      var result = body();
    } catch (e) {
      return finalizer(true, e);
    }
    if (result && result.then) {
      return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
    }
    return finalizer(false, result);
  }
  const WIKI_PAGE_URL = ___util_githubService["WIKI_PAGE_URL"];
  const getSelectedContent = ___util_githubService["getSelectedContent"];
  const getWikiIndex = ___util_githubService["getWikiIndex"];
  const getContentEditLink = ___util_githubService["getContentEditLink"];
  const markdownService = ___util_markdownService["markdownService"];
  const BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace sapmarco.projectpages.controller
   */
  const WikiController = BaseController.extend("sapmarco.projectpages.controller.WikiController", {
    constructor: function constructor() {
      BaseController.prototype.constructor.apply(this, arguments);
      this._selectionToken = 0;
    },
    onInit: function _onInit() {
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
      this._wikiContentModel = new JSONModel({
        markdown: "",
        title: "",
        edit: ""
      });
      this.getView().setModel(this._wikiContentModel, "convertedmarkdown");
      this._viewStateModel = new JSONModel({
        busy: false,
        pages: []
      });
      this.getView().setModel(this._viewStateModel, "viewState");
      this.getRouter().getRoute("RouteWiki").attachMatched(this._onRouteMatched, this);
    },
    /**
     * Event-handler for theme toggle
     */
    onThemeSwap: function _onThemeSwap() {
      this.toggleTheme();
    },
    /**
     * On phone, step back from the content to the sidebar instead of leaving the wiki.
     */
    onNavBack: function _onNavBack() {
      const split = this.byId("wikiSplit");
      if (!split.isMasterShown()) {
        split.toMaster(this.byId("sidebarPage").getId(), "show");
        return;
      }
      BaseController.prototype.onNavBack.call(this);
    },
    /**
     * Event-handler for route matched
     */
    _onRouteMatched: function _onRouteMatched() {
      try {
        const _this = this;
        return Promise.resolve(_this._initializeSidebar()).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Initialization of sidebar
     */
    _initializeSidebar: function _initializeSidebar() {
      try {
        const _this2 = this;
        _this2._viewStateModel.setProperty("/busy", true);
        const _temp = _finallyRethrows(function () {
          return Promise.resolve(getWikiIndex()).then(function (wikiIndex) {
            // read real links, so anchors, titles and autolinks need no special casing
            const sidebar = new DOMParser().parseFromString(markdownService.parse(wikiIndex), "text/html");
            const pages = [...sidebar.querySelectorAll(`a[href^="${WIKI_PAGE_URL}"]`)].map(link => ({
              name: decodeURIComponent(link.href.slice(WIKI_PAGE_URL.length).split(/[#?]/)[0])
            }));
            _this2._viewStateModel.setProperty("/pages", pages);
          });
        }, function (_wasThrown, _result) {
          _this2._viewStateModel.setProperty("/busy", false);
          if (_wasThrown) throw _result;
          return _result;
        });
        return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Event-handler for sidebar item press
     */
    onSidebarSelection: function _onSidebarSelection(event) {
      const name = event.getSource().getBindingContext("viewState").getProperty("name");
      void this._showPage(name);
    },
    _showPage: function _showPage(sMarkdownFileName) {
      try {
        const _this3 = this;
        // a later tap supersedes this one; see the token checks below
        const token = ++_this3._selectionToken;
        _this3._viewStateModel.setProperty("/busy", true);
        return Promise.resolve(_finallyRethrows(function () {
          return Promise.resolve(getSelectedContent(sMarkdownFileName)).then(function (markdownPage) {
            const parsedMarkdown = markdownService.parse(markdownPage);
            if (token !== _this3._selectionToken) {
              return;
            }
            _this3._wikiContentModel.setData({
              markdown: parsedMarkdown,
              title: sMarkdownFileName,
              edit: getContentEditLink(sMarkdownFileName)
            });

            //improve UX by always starting at the top when opening up new content & jumping to new pane
            const markdownSection = _this3.byId("markdownSection");
            if (Device.system.phone) {
              _this3.byId("wikiSplit").toDetail(markdownSection.getId(), "show");
            }
            markdownSection.scrollTo(0, 0);
          });
        }, function (_wasThrown2, _result2) {
          if (token === _this3._selectionToken) {
            _this3._viewStateModel.setProperty("/busy", false);
          }
          if (_wasThrown2) throw _result2;
          return _result2;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  });
  return WikiController;
});
//# sourceMappingURL=Wiki-dbg.controller.js.map
