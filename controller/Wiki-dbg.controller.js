sap.ui.define(["../util/githubService", "../util/markdownService", "./Base.controller", "sap/m/ActionListItem", "sap/ui/model/json/JSONModel", "sap/ui/Device"], function (___util_githubService, ___util_markdownService, __BaseController, ActionListItem, JSONModel, Device) {
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
        busy: false
      });
      this.getView().setModel(this._viewStateModel, "viewState");
      this.getRouter().getRoute("RouteWiki").attachMatched(this._onRouteMatched.bind(this), this);
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
          //get sidebar from actual github-wiki
          return Promise.resolve(getWikiIndex()).then(function (wikiIndex) {
            //parse markdown to html
            const parsedMarkdown = markdownService.parse(wikiIndex);
            const matches = [...parsedMarkdown.matchAll(/\wiki\/(.*?)"/g)];
            // the view is cached, so re-entering the route would append duplicates
            _this2.byId("sidebar").destroyItems();
            matches.forEach(element => {
              _this2.byId("sidebar").addItem(new ActionListItem({
                text: `${element[1]}`,
                press: _this2.onSidebarSelection.bind(_this2, element[1], _this2._wikiContentModel, Device.system.phone)
              }));
            });
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
     * @param  {string} sMarkdownFileName name of markdown file
     */
    onSidebarSelection: function _onSidebarSelection(sMarkdownFileName, jsonModel, isOpenedOnPhone) {
      const _this3 = this;
      // a later tap supersedes this one; see the token checks below
      const token = ++this._selectionToken;
      // fix eslint issue in press event handler of ActionListItem:
      // see: https://stackoverflow.com/a/63488201
      // also: https://typescript-eslint.io/rules/no-floating-promises/
      void function () {
        try {
          _this3._viewStateModel.setProperty("/busy", true);
          return Promise.resolve(_finallyRethrows(function () {
            //get markdown page and encode - to %20
            return Promise.resolve(getSelectedContent(sMarkdownFileName)).then(function (markdownPage) {
              const editLink = getContentEditLink(sMarkdownFileName);
              const parsedMarkdown = markdownService.parse(markdownPage);
              if (token !== _this3._selectionToken) {
                return;
              }
              jsonModel.setData({
                markdown: `<div class="container">${parsedMarkdown}</div>`,
                title: sMarkdownFileName,
                edit: editLink
              });

              //improve UX by always starting at the top when opening up new content & jumping to new pane
              if (isOpenedOnPhone) _this3.byId("wikiSplit").toDetail(_this3.byId("markdownSection").getId(), "show");
              if (_this3.byId("markdownSection")) _this3.byId("markdownSection").scrollTo(0, 0);
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
      }();
    }
  });
  return WikiController;
});
//# sourceMappingURL=Wiki-dbg.controller.js.map
