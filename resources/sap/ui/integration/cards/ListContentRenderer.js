/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(e){"use strict";var t=e.extend("sap.ui.integration.cards.ListContentRenderer",{apiVersion:2});t.renderContent=function(e,t){e.renderControl(t.getAggregation("_content"));if(t.getAggregation("_legend")){e.renderControl(t.getAggregation("_legend"))}};t.getMinHeight=function(e,t){if(!e||!e.maxItems||!e.item){return this.DEFAULT_MIN_HEIGHT}var n=this.getItemMinHeight(e,t),i=parseInt(e.maxItems)||0;return i*n+"rem"};t.getItemMinHeight=function(e,t){if(!e||!e.item){return 0}var n=this.isCompact(t),i=e.item,r=n?2:2.75;if(i.description||i.chart){r=5}if(i.description&&i.chart){r=6}if(i.actionsStrip){r+=n?2.5:3.25}return r};return t});