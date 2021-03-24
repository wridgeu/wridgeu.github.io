/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/table/Row"],function(e){"use strict";var i={apiVersion:2};i.render=function(e,i){e.openStart("div",i);e.class("sapUiTableAction");if(!i.getRow()){e.style("display","none")}if(!i.getVisible()){e.class("sapUiTableActionHidden")}var t=i.getTooltip_AsString();if(t){e.attr("title",t)}e.openEnd();var n=i.getAggregation("_icons");e.renderControl(n[0]);e.renderControl(n[1]);e.close("div")};return i},true);