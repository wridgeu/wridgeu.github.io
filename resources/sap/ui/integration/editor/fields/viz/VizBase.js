/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/base/util/merge"],function(t,e,o,n){"use strict";const i=1;var r=t.extend("sap.ui.integration.editor.fields.viz.VizBase",{metadata:{library:"sap.ui.integration",properties:{value:{type:"string",defaultValue:""},editable:{type:"boolean",defaultValue:true}},aggregations:{_control:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},renderer:{apiVersion:i,render:function(t,e){var o=e.getAggregation("_control");t.openStart("div",e);e.applyStyle(t);t.openEnd();t.renderControl(o);t.close("div")}}});r.prototype.init=function(){this.onInit();this.setAggregation("_control",this._oControl)};r.prototype.bindProperty=function(e,o){t.prototype.bindProperty.apply(this,arguments);this.bindPropertyToControl(e,o);return this};r.prototype.onInit=function(){};r.prototype.applyStyle=function(t){};r.prototype.bindPropertyToControl=function(t,e){};return r});
//# sourceMappingURL=VizBase.js.map