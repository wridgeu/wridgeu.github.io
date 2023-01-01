sap.ui.define(["./Base.controller"], function (__BaseController) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace sapmarco.projectpages.controller
   */
  const ShellController = BaseController.extend("sapmarco.projectpages.controller.ShellController", {});
  return ShellController;
});