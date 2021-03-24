/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(e){"use strict";var t=e.extend("sap.ui.integration.cards.ListContentRenderer",{apiVersion:2});t.renderContent=function(e,t){e.renderControl(t.getAggregation("_content"));if(t.getAggregation("_legend")){e.renderControl(t.getAggregation("_legend"))}};t.getMinHeight=function(e,t){if(!e){return this.DEFAULT_MIN_HEIGHT}if(!e.maxItems||!e.item){return this.DEFAULT_MIN_HEIGHT}var n=this.isCompact(t),r=parseInt(e.maxItems)||0,i=e.item,o=n?2:2.75;if(i.description||i.chart){o=5}if(i.description&&i.chart){o=6}return r*o+"rem"};return t});