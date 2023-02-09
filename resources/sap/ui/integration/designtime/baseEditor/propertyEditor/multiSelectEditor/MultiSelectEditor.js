/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor"],function(e){"use strict";var t=e.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.multiSelectEditor.MultiSelectEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.multiSelectEditor.MultiSelectEditor",metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer().render});t.configMetadata=Object.assign({},e.configMetadata,{allowBindings:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowCustomValues:{defaultValue:false,mergeStrategy:"mostRestrictiveWins",mostRestrictiveValue:true}});t.prototype.getDefaultValidators=function(){var t=this.getConfig();return Object.assign({},e.prototype.getDefaultValidators.call(this),{isValidBinding:{type:"isValidBinding",isEnabled:t.allowBindings},notABinding:{type:"notABinding",isEnabled:!t.allowBindings},isSelectedKey:{type:"isSelectedKey",config:{keys:function(e){return e.getConfig().items.map(function(e){return e.key})}},isEnabled:!t.allowCustomValues}})};t.prototype._onSelectionFinish=function(e){var t=e.getParameter("selectedItems");t=t.map(function(e){return e.getKey()});this.setValue(t)};return t});
//# sourceMappingURL=MultiSelectEditor.js.map