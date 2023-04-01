"use strict";

sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "./model/models", "sap/ui/core/ComponentSupport", "sap/ui/core/date/Gregorian"], function (UIComponent, sap_ui_Device, __deviceModelCreator, sap_ui_core_ComponentSupport, sap_ui_core_date_Gregorian) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const support = sap_ui_Device["support"];
  const deviceModelCreator = _interopRequireDefault(__deviceModelCreator); // import additional dependencies to bundle them properly
  /**
   * Configures the UI5 Module Loader to handle marked
   * and map marked to the default namespace.
   *
   * https://openui5.hana.ondemand.com/#/api/sap.ui.loader/methods/sap.ui.loader.config
   */
  sap.ui.loader.config({
    map: {
      "*": {
        marked: "sapmarco/projectpages/resources/thirdparty/marked/lib/marked.umd"
      }
    },
    shim: {
      "sapmarco/projectpages/resources/thirdparty/marked/lib/marked.umd": {
        amd: true,
        deps: [],
        exports: "marked"
      }
    }
  });

  /**
   * @namespace sapmarco.projectpages
   */
  const Component = UIComponent.extend("sapmarco.projectpages.Component", {
    metadata: {
      // marker to identify async content creation
      // makes async: true for rootView obsolete!
      interfaces: ["sap.ui.core.IAsyncContentCreation"],
      manifest: "json"
    },
    init: function _init() {
      // call the base component's init function
      UIComponent.prototype.init.call(this);

      // enable routing
      this.getRouter().initialize();

      // set the device model
      this.setModel(deviceModelCreator(), "device");
    },
    getContentDensityClass: function _getContentDensityClass() {
      if (this._contentDensityClass === undefined) {
        // check whether FLP has already set the content density class; do nothing in this case
        if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
          this._contentDensityClass = "";
        } else if (!support.touch) {
          // apply "compact" mode if touch is not supported
          this._contentDensityClass = "sapUiSizeCompact";
        } else {
          // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
          this._contentDensityClass = "sapUiSizeCozy";
        }
      }
      return this._contentDensityClass;
    }
  });
  return Component;
});