/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/BaseField","sap/m/Input","sap/ui/model/type/Integer"],function(e,t,a){"use strict";var i=e.extend("sap.ui.integration.editor.fields.IntegerField",{metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer()});i.prototype.initVisualization=function(e){var i=e.visualization;var r=e.formatter;if(!i){i={type:t,settings:{value:{path:"currentSettings>value",type:new a(r)},editable:e.editable,type:"Number",parseError:function(e){var t=e.getSource(),a=null;if(t.getValue()!==""){if(e.getParameters()&&e.getParameters().exception&&e.getParameters().exception.message){a=e.getParameters().exception.message}else{a=e.getId()}t.getParent()._showValueState("error",a)}else{t.getParent()._showValueState("none","")}}}}}else if(i.type==="Slider"){i.type="sap/m/Slider"}this._visualization=i};return i});
//# sourceMappingURL=IntegerField.js.map