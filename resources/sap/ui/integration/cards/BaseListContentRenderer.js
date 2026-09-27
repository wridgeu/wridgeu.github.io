/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(e){"use strict";var n=e.extend("sap.ui.integration.cards.BaseListContentRenderer",{apiVersion:2});n.renderContent=function(e,n){e.renderControl(n.getAggregation("_content"));n.getPaginator()?.render(e)};n.renderLoadingClass=function(n,r){if(r.getPaginator()?.isLoadingMore()){return}e.renderLoadingClass(n,r)};n.renderLoadingPlaceholder=function(n,r){if(r.getPaginator()?.isLoadingMore()){return}e.renderLoadingPlaceholder(n,r)};return n});
//# sourceMappingURL=BaseListContentRenderer.js.map