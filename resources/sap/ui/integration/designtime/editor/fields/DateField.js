/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/editor/fields/BaseField","sap/m/DatePicker"],function(e,t){"use strict";var i=e.extend("sap.ui.integration.designtime.editor.fields.DateField",{renderer:e.getMetadata().getRenderer()});i.prototype.initVisualization=function(e){var i=e.visualization;var a=e.formatter;if(e.value!==""){e.value=new Date(e.value)}if(!i){i={type:t,settings:{value:{path:"currentSettings>value",type:"sap.ui.model.type.Date",formatOptions:a},editable:e.editable,width:"16rem",change:function(e){if(e.getParameters().valid){var t=e.getSource();t.getBinding("value").setValue(t.getDateValue());t.getBinding("value").checkUpdate()}else{var t=e.getSource();t.getBinding("value").setValue("")}}}}}this._visualization=i};return i});