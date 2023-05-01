/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/integration/library"],function(e,t){"use strict";var n=t.CardPreviewMode;var a=e.extend("sap.ui.integration.cards.BaseContentRenderer",{apiVersion:2});a.DEFAULT_MIN_HEIGHT="5rem";a.render=function(e,t){var a="sapFCard",r=t.getMetadata().getName(),i=r.slice(r.lastIndexOf(".")+1),s=t.getCardInstance(),o=t.isLoading(),g=s&&s.getPreviewMode()===n.Abstract,d=t.getAggregation("_messageContainer");a+=i;e.openStart("div",t).class(a).class("sapFCardBaseContent");if(t.hasListeners("press")){e.class("sapFCardClickable")}if(s&&s.getHeight()==="auto"){var c=this.getMinHeight(t.getParsedConfiguration(),t,s);e.style("min-height",c)}if(o||g){e.class("sapFCardContentLoading")}e.openEnd();if(o||g){e.renderControl(t.getAggregation("_loadingPlaceholder"))}if(d){e.renderControl(d)}this.renderContent(e,t);e.close("div")};a.renderContent=function(e,t){e.renderControl(t.getAggregation("_content"))};a.getMinHeight=function(e,t){return this.DEFAULT_MIN_HEIGHT};a.isCompact=function(e){var t=e,n=e.getParent();if(!e.getDomRef()&&n&&n.isA("sap.f.ICard")){t=n}return t.$().closest(".sapUiSizeCompact").hasClass("sapUiSizeCompact")};return a});
//# sourceMappingURL=BaseContentRenderer.js.map