/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(t,i){var s=sap.ui.getCore().getConfiguration().getAccessibility(),o=i.getRootMenu();if(i.oHoveredItem&&i.indexOfItem(i.oHoveredItem)<0){i.oHoveredItem=null}t.openStart("div",i);t.attr("tabindex",-1);t.attr("hideFocus",true);if(i.getTooltip_AsString()){t.attr("title",i.getTooltip_AsString())}if(s){t.accessibilityState(i,{disabled:null})}t.class("sapUiMnu");if(o.bUseTopStyle){t.class("sapUiMnuTop")}if(o.isCozy()){t.class("sapUiSizeCozy")}if(i.bCozySupported){t.class("sapUiMnuCozySupport")}t.openEnd();e.renderItems(t,i);t.close("div")};e.renderItems=function(e,t){var i=t.getItems(),s=sap.ui.getCore().getConfiguration().getAccessibility(),o=false,n=false,r=0,a=0,l,u;e.openStart("ul");e.attr("role","menu");e.class("sapUiMnuLst");for(l=0;l<i.length;l++){if(i[l].getIcon&&i[l].getIcon()){o=true}if(i[l].getSubmenu()){n=true}}if(!o){e.class("sapUiMnuNoIco")}if(!n){e.class("sapUiMnuNoSbMnu")}e.openEnd();r=0;for(l=0;l<i.length;l++){if(i[l].getVisible()&&i[l].render){r++}}for(l=0;l<i.length;l++){u=i[l];if(u.getVisible()&&u.render){a++;if(u.getStartsSection()){e.openStart("li");if(s){e.attr("role","separator")}e.class("sapUiMnuDiv");e.openEnd();e.openStart("div");e.class("sapUiMnuDivL");e.openEnd();e.close("div");e.voidStart("hr").voidEnd();e.openStart("div");e.class("sapUiMnuDivR");e.openEnd();e.close("div");e.close("li")}u.render(e,u,t,{bAccessible:s,iItemNo:a,iTotalItems:r})}}e.close("ul")};return e},true);