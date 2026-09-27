/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer","sap/ui/integration/util/BindingResolver"],function(e,t){"use strict";var n="2px";var r=e.extend("sap.ui.integration.cards.WebPageContentRenderer",{apiVersion:2,MIN_WEB_PAGE_CONTENT_HEIGHT:"150px"});r.renderContent=function(e,t){e.openStart("iframe",t.getId()+"-frame").class("sapUiIntWPCFrame");if(!t.getOverflowWithShowMore()){e.style("height","calc("+t.getMinHeight()+" - "+n+")")}if(t._bSrcChecked){e.attr("src",t.getSrc())}e.attr("tabindex","0");if(!t.getOmitSandbox()){e.attr("sandbox",t.getSandbox())}if(t.getAllow()){e.attr("allow",t.getAllow())}if(t.getAllowFullscreen()){e.attr("allowfullscreen",t.getAllowFullscreen())}e.openEnd().close("iframe")};r.getMinHeight=function(e,n){if(e.minHeight){return t.resolveValue(e.minHeight,n)}return r.MIN_WEB_PAGE_CONTENT_HEIGHT};r.renderLoadingPlaceholder=function(e,t){e.renderControl(t.getAggregation("_loadingPlaceholder"))};return r});
//# sourceMappingURL=WebPageContentRenderer.js.map