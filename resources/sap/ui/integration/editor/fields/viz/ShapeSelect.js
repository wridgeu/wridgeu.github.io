/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/viz/VizBase","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/base/util/merge"],function(e,t,i,n){"use strict";var r=e.extend("sap.ui.integration.editor.fields.viz.ShapeSelect",{metadata:{library:"sap.ui.integration",properties:{value:{type:"string",defaultValue:"Circle"}}},renderer:e.getMetadata().getRenderer()});r.prototype.onInit=function(){this._oControl=new t({items:[new i({icon:"sap-icon://circle-task",key:"Circle"}),new i({icon:"sap-icon://border",key:"Square"})]})};r.prototype.applyStyle=function(e){e.addClass("sapUiIntegrationShapeSelect")};r.prototype.bindPropertyToControl=function(e,t){if(e==="editable"){var i=n({},t);this._oControl.bindProperty("enabled",i)}if(e==="value"){var i=n({},t);this._oControl.bindProperty("selectedKey",i)}};return r});