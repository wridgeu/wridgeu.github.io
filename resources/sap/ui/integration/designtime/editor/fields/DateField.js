/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/editor/fields/BaseField","sap/m/DatePicker"],function(e,t){"use strict";var i=e.extend("sap.ui.integration.designtime.editor.fields.DateField",{renderer:e.getMetadata().getRenderer()});i.prototype.initVisualization=function(e){var i=e.visualization;if(!i){i={type:t,settings:{dateValue:{path:"currentSettings>value",formatter:function(e){return new Date(e)}},editable:{path:"currentSettings>editable"},valueFormat:"YYYY-MM-dd",width:"16rem",change:function(e){if(e.getParameters().valid){var t=e.getSource();t.getBinding("dateValue").setRawValue(t.getValue());t.getBinding("dateValue").checkUpdate()}else{var t=e.getSource();t.getBinding("dateValue").setRawValue("")}}}}}this._visualization=i};return i});