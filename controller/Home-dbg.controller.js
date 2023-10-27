"use strict";

sap.ui.define(["./Base.controller"], function (__BaseController) {
  "use strict";

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
    onUI5IconPress: function _onUI5IconPress() {
      try {
        const _this = this;
        return Promise.resolve(_this.openVersionDialog(_this.getView())).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
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
//# sourceMappingURL=Home-dbg.controller.js.map
