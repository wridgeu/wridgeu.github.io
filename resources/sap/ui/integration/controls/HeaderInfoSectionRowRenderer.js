/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(e){"use strict";var n={apiVersion:2};n.render=function(e,n){e.openStart("div",n).class("sapUiIntHeaderInfoSectionRow").class(`sapUiIntHeaderInfoSectionItemJustify${n.getJustifyContent()}`).openEnd();n.getColumns().forEach(n=>{e.renderControl(n)});const t=n.getItems();if(t.length){e.openStart("div").class("sapUiIntHeaderInfoSectionItemsGroup").openEnd();t.forEach(n=>{e.renderControl(n)});e.close("div")}e.close("div")};return n});
//# sourceMappingURL=HeaderInfoSectionRowRenderer.js.map