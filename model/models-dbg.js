"use strict";

sap.ui.define(["sap/ui/Device", "sap/ui/model/json/JSONModel"], function (Device, JSONModel) {
  /**
   * @namespace sapmarco.projectpages.model
   * @returns {JSONModel}
   */
  var __exports = function () {
    return new JSONModel(Device).setDefaultBindingMode('OneWay');
  };
  return __exports;
});