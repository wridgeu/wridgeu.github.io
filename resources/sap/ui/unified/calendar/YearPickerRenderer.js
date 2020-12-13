/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/core/date/UniversalDate","sap/ui/core/InvisibleText"],function(e,t,a){"use strict";var i={apiVersion:2};i.render=function(e,t){var a=t.getTooltip_AsString();e.openStart("div",t);e.class("sapUiCalYearPicker");if(a){e.attr("title",a)}e.accessibilityState(t,this.getAccessibilityState(t));e.openEnd();this.renderCells(e,t);e.close("div")};i.getAccessibilityState=function(e){return{role:"grid",readonly:"true",multiselectable:e.getIntervalSelection(),roledescription:sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("YEAR_PICKER"),describedby:e._bCalendar?a.getStaticId("sap.ui.unified","CALENDAR_YEAR_RANGE_PICKER_OPEN_HINT"):""}};i.renderCells=function(a,i){var r=new e(i._getDate(),i.getPrimaryCalendarType()),l=i.getYears(),s=i.getId(),n=i.getColumns(),c="",d=false,o=false,u,p,f,g,S,y;r.setYear(r.getYear()-Math.floor(l/2));u=i._checkFirstDate(r);if(!u.isSame(r)){r=u;o=true}if(n>0){c=100/n+"%"}else{c=100/l+"%"}for(y=0;y<l;y++){S=i._oFormatYyyymmdd.format(r.toUTCJSDate(),true);g={role:"gridcell"};d=true;if(o){d=i._checkDateEnabled(r)}if(n>0&&y%n==0){a.openStart("div");a.accessibilityState(null,{role:"row"});a.openEnd()}a.openStart("div",s+"-y"+S);a.class("sapUiCalItem");p=i._fnShouldApplySelection(r);f=i._fnShouldApplySelectionBetween(r);if(p){a.class("sapUiCalItemSel");g["selected"]=true}if(f){a.class("sapUiCalItemSelBetween");g["selected"]=true}if(!p&&!f){g["selected"]=false}if(!d){a.class("sapUiCalItemDsbl");g["disabled"]=true}a.attr("tabindex","-1");a.attr("data-sap-year-start",S);a.style("width",c);a.accessibilityState(null,g);a.openEnd();a.text(i._oYearFormat.format(t.getInstance(r.toUTCJSDate(),r.getCalendarType())));a.close("div");r.setYear(r.getYear()+1);if(n>0&&(y+1)%n==0){a.close("div")}}};return i},true);