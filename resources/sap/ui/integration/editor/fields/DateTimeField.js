/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/BaseField","sap/m/DateTimePicker","sap/ui/core/date/UI5Date","sap/ui/model/type/DateTime"],function(e,t,a,i){"use strict";var n=e.extend("sap.ui.integration.editor.fields.DateTimeField",{metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer()});n.prototype.initVisualization=function(e){var n=e.visualization;var r=e.formatter;if(e.value!==""){e.value=a.getInstance(e.value)}if(!n){n={type:t,settings:{value:{path:"currentSettings>value",type:new i(r)},editable:e.editable,width:"100%",change:function(e){if(e.getParameters().valid){var t=e.getSource();t.getBinding("value").setValue(t.getDateValue().toISOString());t.getBinding("value").checkUpdate()}else{var t=e.getSource();t.getBinding("value").setValue("");t.getBinding("value").checkUpdate(true)}}}}}this._visualization=n};return n});
//# sourceMappingURL=DateTimeField.js.map