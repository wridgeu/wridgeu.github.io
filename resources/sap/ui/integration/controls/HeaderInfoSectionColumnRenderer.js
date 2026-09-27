/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(e){"use strict";var n={apiVersion:2};n.render=function(e,n){e.openStart("div",n).class("sapUiIntHeaderInfoSectionColumn").openEnd();n.getRows().forEach(n=>{e.renderControl(n)});const o=n.getItems();if(o.length){e.openStart("div").class("sapUiIntHeaderInfoSectionItemsGroup").openEnd();o.forEach(n=>{e.renderControl(n)});e.close("div")}e.close("div")};return n});
//# sourceMappingURL=HeaderInfoSectionColumnRenderer.js.map