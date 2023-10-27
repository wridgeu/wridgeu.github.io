/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/base/util/merge"],function(t,e,o,n){"use strict";var i=t.extend("sap.ui.integration.editor.fields.viz.VizBase",{metadata:{library:"sap.ui.integration",properties:{value:{type:"string",defaultValue:""},editable:{type:"boolean",defaultValue:true}},aggregations:{_control:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},renderer:{apiVersion:1,render:function(t,e){var o=e.getAggregation("_control");t.openStart("div",e);e.applyStyle(t);t.openEnd();t.renderControl(o);t.close("div")}}});i.prototype.init=function(){this.onInit();this.setAggregation("_control",this._oControl)};i.prototype.bindProperty=function(e,o){t.prototype.bindProperty.apply(this,arguments);this.bindPropertyToControl(e,o);return this};i.prototype.onInit=function(){};i.prototype.applyStyle=function(t){};i.prototype.bindPropertyToControl=function(t,e){};return i});
//# sourceMappingURL=VizBase.js.map