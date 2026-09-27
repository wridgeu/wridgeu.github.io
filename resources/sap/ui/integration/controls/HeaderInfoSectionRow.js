/*!
* OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/core/Control","sap/ui/integration/types/HeaderInfoSectionJustifyContent","./HeaderInfoSectionRowRenderer"],function(e,t,n){"use strict";var i=e.extend("sap.ui.integration.controls.HeaderInfoSectionRow",{metadata:{library:"sap.ui.integration",properties:{justifyContent:{type:"sap.ui.integration.types.HeaderInfoSectionJustifyContent",group:"Appearance",defaultValue:t.SpaceBetween}},defaultAggregation:"items",aggregations:{columns:{type:"sap.ui.core.Control",multiple:true},items:{type:"sap.ui.core.Control",multiple:true}}},renderer:n});return i});
//# sourceMappingURL=HeaderInfoSectionRow.js.map