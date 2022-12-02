sap.ui.define(["./Base.controller"], function (__BaseController) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace sapmarco.projectpages.controller
   */
  const HomeController = BaseController.extend("sapmarco.projectpages.controller.HomeController", {
    onInit: function _onInit() {
      this._ownerComponent = this.getOwnerComponent();
      this.getView().addStyleClass(this._ownerComponent.getContentDensityClass());
    },
    onUI5IconPress: async function _onUI5IconPress() {
      await this.openVersionDialog(this.getView());
    },
    onWiki: function _onWiki() {
      this.navTo("RouteWiki");
    },
    onUI5con: function _onUI5con() {
      this.navTo("RouteUI5Con");
    }
  });
  return HomeController;
});