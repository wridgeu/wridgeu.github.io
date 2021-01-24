/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(e){"use strict";var t=e.extend("sap.ui.integration.cards.ListContentRenderer",{apiVersion:2});t.renderContent=function(e,t){e.renderControl(t.getAggregation("_content"));if(t.getAggregation("_legend")){e.renderControl(t.getAggregation("_legend"))}};t.hideContent=function(t){e.hideContent(t);if(t.getAggregation("_legend")){t.getAggregation("_legend").addStyleClass("sapFCardContentHidden")}};t.getMinHeight=function(e,t){if(!e){return this.DEFAULT_MIN_HEIGHT}if(!e.maxItems||!e.item){return this.DEFAULT_MIN_HEIGHT}var n=this.isCompact(t),i=parseInt(e.maxItems)||0,r=e.item,g=n?2:2.75;if(r.description||r.chart){g=5}if(r.description&&r.chart){g=6}return i*g+"rem"};return t});