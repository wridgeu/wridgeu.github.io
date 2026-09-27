/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/BaseField","sap/m/Input","sap/ui/model/type/Float"],function(e,t,i){"use strict";var a=e.extend("sap.ui.integration.editor.fields.NumberField",{metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer()});a.prototype.initVisualization=function(e){var a=e.visualization;var r=e.formatter;if(!a){a={type:t,settings:{value:{path:"currentSettings>value",type:new i(r)},editable:e.editable,type:"Number"}}}this._visualization=a};return a});
//# sourceMappingURL=NumberField.js.map