sap.ui.define(["../util/githubService", "../util/markdownService", "./Base.controller", "sap/m/ActionListItem", "sap/ui/model/json/JSONModel", "sap/ui/Device"], function (___util_githubService, ___util_markdownService, __BaseController, ActionListItem, JSONModel, Device) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
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
    onInit: function _onInit() {
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
      this._wikiContentModel = new JSONModel({
        markdown: "",
        title: "",
        edit: ""
      });
      this.getView().setModel(this._wikiContentModel, "convertedmarkdown");
      this.getRouter().getRoute("RouteWiki").attachMatched(this._onRouteMatched.bind(this), this);
    },
    onThemeSwap: function _onThemeSwap() {
      this.toggleTheme();
    },
    _onRouteMatched: function _onRouteMatched() {
      try {
        const _this = this;
        return Promise.resolve(_this._initializeSidebar()).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    },
    _initializeSidebar: function _initializeSidebar() {
      try {
        const _this2 = this;
        //get sidebar from actual github-wiki
        return Promise.resolve(getWikiIndex()).then(function (wikiIndex) {
          //parse markdown to html
          const parsedMarkdown = markdownService.parse(wikiIndex);
          const matches = [...parsedMarkdown.matchAll(/\wiki\/(.*?)\"/g)];
          matches.forEach(element => {
            _this2.byId("sidebar").addItem(new ActionListItem({
              text: `${element[1]}`,
              press: _this2.onSidebarSelection.bind(_this2, element[1], _this2._wikiContentModel, Device.system.phone)
            }));
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    onSidebarSelection: function _onSidebarSelection(sMarkdownFileName, jsonModel, isOpenedOnPhone) {
      const _this3 = this;
      // fix eslint issue in press event handler of ActionListItem:
      // see: https://stackoverflow.com/a/63488201
      // also: https://typescript-eslint.io/rules/no-floating-promises/
      void function () {
        try {
          //get markdown page and encode - to %20
          return Promise.resolve(getSelectedContent(sMarkdownFileName)).then(function (markdownPage) {
            const editLink = getContentEditLink(sMarkdownFileName);
            jsonModel.setData({
              markdown: `<div class="container">${markdownService.parse(markdownPage)}</div>`,
              title: sMarkdownFileName,
              edit: editLink
            });

            //improve UX by always starting at the top when opening up new content & jumping to new pane
            if (isOpenedOnPhone) setTimeout(() => {
              _this3.byId("responsiveSplitter")._activatePage(1);
            }, 0);
            if (_this3.byId("markdownSection")) _this3.byId("markdownSection").scrollTo(0, 0);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }();
    }
  });
  return WikiController;
});