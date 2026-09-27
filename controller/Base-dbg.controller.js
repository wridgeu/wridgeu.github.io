sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/ui/core/Theming", "sap/ui/core/UIComponent", "../classes/VersionDialog"], function (Controller, History, Theming, UIComponent, __VersionDialog) {
  "use strict";

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
    /**
     * @returns {void}
     */
    toggleTheme: function _toggleTheme() {
      if (Theming.getTheme() === this._sLightTheme) {
        Theming.setTheme(this._sDarkTheme);
      } else {
        Theming.setTheme(this._sLightTheme);
      }
    },
    /**
     * @param  {string} psTarget Target
     * @param  {object} pmParameters Parameters
     * @param  {boolean} pbReplace Replace routing hash?
     * @returns {void}
     */
    navTo: function _navTo(psTarget, pmParameters, targetInfo, pbReplace) {
      this.getRouter().navTo(psTarget, pmParameters, targetInfo, pbReplace);
    },
    /**
     * @returns {sap.ui.core.routing.Router} UIComponent router via context
     */
    getRouter: function _getRouter() {
      return UIComponent.getRouterFor(this);
    },
    /**
     * @param {typeof sap.ui.core.mvc.View} view
     * @returns {Promise<void>}
     */
    openVersionDialog: function _openVersionDialog(view) {
      try {
        return Promise.resolve(new VersionDialog(view).open()).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Event-handler for backwards navigation
     * @returns {void}
     */
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
//# sourceMappingURL=Base-dbg.controller.js.map
