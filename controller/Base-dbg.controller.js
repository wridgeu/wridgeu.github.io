sap.ui.define(["sap/ui/core/Core", "sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/ui/core/UIComponent", "../classes/VersionDialog"], function (Core, Controller, History, UIComponent, __VersionDialog) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const VersionDialog = _interopRequireDefault(__VersionDialog);
  /**
   * @namespace sapmarco.projectpages.controller
   */
  const BaseController = Controller.extend("sapmarco.projectpages.controller.BaseController", {
    constructor: function constructor() {
      Controller.prototype.constructor.apply(this, arguments);
      this._sLightTheme = "sap_horizon";
      this._sDarkTheme = "sap_horizon_dark";
    },
    toggleTheme: function _toggleTheme() {
      if (Core.getConfiguration().getTheme() === this._sLightTheme) {
        Core.applyTheme(this._sDarkTheme);
      } else {
        Core.applyTheme(this._sLightTheme);
      }
    },
    navTo: function _navTo(psTarget, pmParameters, targetInfo, pbReplace) {
      this.getRouter().navTo(psTarget, pmParameters, targetInfo, pbReplace);
    },
    getRouter: function _getRouter() {
      return UIComponent.getRouterFor(this);
    },
    openVersionDialog: function _openVersionDialog(view) {
      try {
        return Promise.resolve(new VersionDialog(view).open()).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    },
    onNavBack: function _onNavBack() {
      const sPreviousHash = History.getInstance().getPreviousHash();
      if (sPreviousHash !== undefined) {
        window.history.back();
      } else {
        this.getRouter().navTo("RouteMain", {}, {}, true /*no history*/);
      }
    }
  });
  return BaseController;
});