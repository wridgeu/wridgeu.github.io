/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(t){"use strict";var e=t.extend("sap.ui.integration.cards.ListContentRenderer",{apiVersion:2});e.renderContent=function(t,e){t.renderControl(e.getAggregation("_content"));if(e.getAggregation("_legend")){t.renderControl(e.getAggregation("_legend"))}};e.getMinHeight=function(t,e){if(!t||!t.maxItems||!t.item){return this.DEFAULT_MIN_HEIGHT}var n=this.getItemMinHeight(t,e),i=parseInt(t.maxItems)||0;return i*n+"rem"};e.getItemMinHeight=function(t,e){if(!t||!t.item){return 0}var n=this.isCompact(e),i=t.item,r=n?2:2.75,a;if(i.description||i.chart){r=5}if(i.description&&i.chart){r=6}if(i.attributes){a=Math.ceil(i.attributes.length/2);r+=a*1.5}if(i.actionsStrip){r+=n?2.5:3.25}return r};return e});