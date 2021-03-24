/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/editor/fields/BaseField","sap/m/Input"],function(e,t){"use strict";var i=e.extend("sap.ui.integration.designtime.editor.fields.IntegerField",{renderer:e.getMetadata().getRenderer()});i.prototype.initVisualization=function(e){var i=e.visualization;var a=e.formatter;if(!i){i={type:t,settings:{value:{path:"currentSettings>value",type:"sap.ui.model.type.Integer",formatOptions:a},editable:{path:"currentSettings>editable"}}}}this._visualization=i};return i});