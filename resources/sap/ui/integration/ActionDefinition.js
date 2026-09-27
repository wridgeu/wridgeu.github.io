/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/Element"],function(e,t){"use strict";var i=e.ButtonType;var a=t.extend("sap.ui.integration.ActionDefinition",{metadata:{library:"sap.ui.integration",properties:{type:{type:"sap.ui.integration.CardActionType"},text:{type:"string",defaultValue:""},icon:{type:"sap.ui.core.URI"},buttonType:{type:"sap.m.ButtonType",defaultValue:i.Transparent},enabled:{type:"boolean",defaultValue:true},visible:{type:"boolean",defaultValue:true},parameters:{type:"object"},startsSection:{type:"boolean",defaultValue:false}},events:{press:{}},associations:{_menuItem:{type:"sap.m.MenuItem",multiple:false,visibility:"hidden"}},aggregations:{actionDefinitions:{type:"sap.ui.integration.ActionDefinition",multiple:true}}}});return a});
//# sourceMappingURL=ActionDefinition.js.map