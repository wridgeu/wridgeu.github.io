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
  const getSelectedContent = ___util_githubService["getSelectedContent"];
  function _catch(body, recover) {
    try {
      var result = body();
    } catch (e) {
      return recover(e);
    }
    if (result && result.then) {
      return result.then(void 0, recover);
    }
    return result;
  }
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
     * Event-handler for route matched; `#/wiki/<page>` opens that page
     */
    _onRouteMatched: function _onRouteMatched(event) {
      try {
        const _this = this;
        function _temp3() {
          const _temp = function () {
            if (_this._page) {
              return Promise.resolve(_this._showPage(_this._page)).then(function () {});
            }
          }();
          if (_temp && _temp.then) return _temp.then(function () {});
        }
        _this._page = event.getParameter("arguments").page;
        // the sidebar is the route table: a deep link waits for it, and fails with it
        const _temp2 = function () {
          if (!_this._viewStateModel.getProperty("/pages").length) {
            return Promise.resolve(_this._initializeSidebar()).then(function () {});
          }
        }();
        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2));
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
        const _temp4 = _finallyRethrows(function () {
          return Promise.resolve(getWikiIndex()).then(function (wikiIndex) {
            // read the rendered links, which markdownService already turned into wiki routes
            const sidebar = new DOMParser().parseFromString(markdownService.parse(wikiIndex), "text/html");
            const pages = [...sidebar.querySelectorAll('a[href^="#/wiki/"]')].map(link => ({
              name: decodeURIComponent(link.getAttribute("href").slice("#/wiki/".length))
            }));
            _this2._viewStateModel.setProperty("/pages", pages);
          });
        }, function (_wasThrown, _result) {
          _this2._viewStateModel.setProperty("/busy", false);
          if (_wasThrown) throw _result;
          return _result;
        });
        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Event-handler for sidebar item press
     */
    onSidebarSelection: function _onSidebarSelection(event) {
      const name = event.getSource().getBindingContext("viewState").getProperty("name");
      if (name === this._page) {
        // unchanged hash fires no route match, e.g. re-tapping on phone after stepping back
        void this._showPage(name);
        return;
      }
      // replace, so the back button leaves the wiki instead of walking every page read
      this.navTo("RouteWiki", {
        page: name
      }, undefined, true);
    },
    _showPage: function _showPage(sMarkdownFileName) {
      try {
        const _this3 = this;
        // a later tap supersedes this one; see the token checks below
        const token = ++_this3._selectionToken;
        _this3._viewStateModel.setProperty("/busy", true);
        return Promise.resolve(_finallyRethrows(function () {
          function _temp7() {
            if (token !== _this3._selectionToken) {
              return;
            }
            if (markdown === undefined) {
              // keep the hash, so the URL still shows what was asked for
              void _this3.getRouter().getTargets().display("TargetNotFound");
              return;
            }
            _this3._wikiContentModel.setData({
              markdown,
              title: sMarkdownFileName,
              edit
            });

            //improve UX by always starting at the top when opening up new content & jumping to new pane
            const markdownSection = _this3.byId("markdownSection");
            if (Device.system.phone) {
              _this3.byId("wikiSplit").toDetail(markdownSection.getId(), "show");
            }
            markdownSection.scrollTo(0, 0);
          }
          const pages = _this3._viewStateModel.getProperty("/pages");
          let markdown;
          let edit = "";
          const _temp6 = _catch(function () {
            function _temp5(content) {
              if (content !== undefined) {
                markdown = markdownService.parse(content);
                edit = getContentEditLink(sMarkdownFileName);
              }
            }
            const _pages$some = pages.some(p => p.name === sMarkdownFileName);
            // only pages the sidebar lists are routable; anything else never reaches GitHub
            return _pages$some ? Promise.resolve(getSelectedContent(sMarkdownFileName)).then(_temp5) : _temp5(undefined);
          }, function () {
            // the i18n model loads async, so the bundle may still be a promise
            return Promise.resolve(_this3.getOwnerComponent().getModel("i18n").getResourceBundle()).then(function (bundle) {
              markdown = `<p>${bundle.getText("wikiPageLoadError")}</p>`;
            });
          });
          return _temp6 && _temp6.then ? _temp6.then(_temp7) : _temp7(_temp6);
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
