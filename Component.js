"use strict";sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models","sap/ui/core/ComponentSupport","sap/ui/core/date/Gregorian"],function(t,e,s,n,i){"use strict";function o(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const a=o(s);const c=t.extend("sapmarco.projectpages.Component",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"],manifest:"json"},init:function e(){t.prototype.init.call(this);this.getRouter().initialize();this.setModel(a(),"device")},getContentDensityClass:function t(){if(this._contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._contentDensityClass=""}else if(!e.support.touch){this._contentDensityClass="sapUiSizeCompact"}else{this._contentDensityClass="sapUiSizeCozy"}}return this._contentDensityClass}});return c});
//# sourceMappingURL=Component.js.map