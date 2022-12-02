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
    _onRouteMatched: async function _onRouteMatched() {
      await this._initializeSidebar();
    },
    _initializeSidebar: async function _initializeSidebar() {
      //get sidebar from actual github-wiki
      const wikiIndex = await getWikiIndex();
      //parse markdown to html
      const parsedMarkdown = markdownService.parse(wikiIndex);
      const matches = [...parsedMarkdown.matchAll(/\wiki\/(.*?)\"/g)];
      matches.forEach(element => {
        this.byId("sidebar").addItem(new ActionListItem({
          text: `${element[1]}`,
          press: this.onSidebarSelection.bind(this, element[1], this._wikiContentModel, Device.system.phone)
        }));
      });
    },
    onSidebarSelection: function _onSidebarSelection(sMarkdownFileName, jsonModel, isOpenedOnPhone) {
      // fix eslint issue in press event handler of ActionListItem:
      // see: https://stackoverflow.com/a/63488201
      // also: https://typescript-eslint.io/rules/no-floating-promises/
      void (async () => {
        //get markdown page and encode - to %20
        const markdownPage = await getSelectedContent(sMarkdownFileName);
        const editLink = getContentEditLink(sMarkdownFileName);
        jsonModel.setData({
          markdown: `<div class="container">${markdownService.parse(markdownPage)}</div>`,
          title: sMarkdownFileName,
          edit: editLink
        });

        //improve UX by always starting at the top when opening up new content & jumping to new pane
        if (isOpenedOnPhone) setTimeout(() => {
          this.byId("responsiveSplitter")._activatePage(1);
        }, 0);
        if (this.byId("markdownSection")) this.byId("markdownSection").scrollTo(0, 0);
      })();
    }
  });
  return WikiController;
});