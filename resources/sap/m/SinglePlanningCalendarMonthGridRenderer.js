/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/Month","sap/ui/core/date/UniversalDate","sap/ui/core/IconPool","./PlanningCalendarLegend","sap/ui/core/InvisibleText","sap/ui/core/Core","sap/ui/unified/library"],function(e,a,t,n,l,i,s,r,o){"use strict";var p=o.CalendarDayType;var d={apiVersion:2};d.render=function(e,a){var t=a._getCoreLocaleData();var n=a._getDensitySizes();e.openStart("div",a);e.class("sapMSinglePCGrid");e.class("sapMSPCMonthGrid");e.openEnd();this.renderDayNames(e,a,t);e.openStart("div");e.class("sapMSinglePCGridContent");e.openEnd();this.renderCells(e,a,t,n);e.close("div");e.close("div")};d.renderCells=function(e,a,t,n){var l=a._getCells(),i=a._getVerticalLabels(),s=a._getColumns(),r=[],o=[],p,d,c,g,f=[],v,u,S,C;for(S=0;S<a._getRows();S++){u=0;e.openStart("div");e.attr("role","grid");e.class("sapMSPCMonthWeek");e.openEnd();e.openStart("div");e.class("sapMSPCMonthWeekNumber");e.openEnd();e.text(i[S]);e.close("div");for(C=0;C<s;C++){p=S*s+C;d=l[p];c=a._getAppointmetsForADay(d);g=a._getPreviousAppointmetsForADay(d);f.push(g);v=a._getMoreCountPerCell(p);r.push(v);o.push(c);u=Math.max(u,a._aAppsLevelsPerDay[p].length)}e.openStart("div");e.class("sapMSPCMonthDays");e.class("sapMSPCMonthDaysMax"+u);e.attr("role","row");e.openEnd();for(C=0;C<s;C++){p=S*s+C;d=l[p];this.renderDay(e,a,d,t,r[p],p)}e.openStart("div");e.class("sapMSinglePCBlockers");e.class("sapUiCalendarRowVisFilled");e.attr("role","list");e.openEnd();for(C=0;C<s;C++){p=S*s+C;d=l[p];if(C===0){this.renderAppointments(e,a,f[p],C,r[p],n,S)}this.renderAppointments(e,a,o[p],C,r[p],n,S)}e.close("div");e.close("div");e.close("div")}};d.renderDay=function(n,l,s,o,p,d){var c=l._getSpecialDates(),g=t.prototype._getDateTypes.call(l,s),f=l._getDateFormatter(),v=s.isSame(e.fromLocalJSDate(new Date)),u,S;n.openStart("div");n.class("sapMSPCMonthDay");if(v){n.class("sapMSPCMonthDayToday")}n.attr("role","gridcell");if(a._isWeekend(s,o)||!a._isSameMonthAndYear(s,e.fromLocalJSDate(l.getStartDate()))){n.class("nonWorkingTimeframe")}if(c){if(g&&g[0]){u=g[0];n.class("sapUiCalendarSpecialDay"+u.type);S=i.findLegendItemForItem(r.byId(l._sLegendId),u)}}n.attr("sap-ui-date",s.valueOf().toString());n.attr("tabindex",-1);n.attr("aria-labelledby",f.format(s.toLocalJSDate())+"-Descr");n.openEnd();this.renderDndPlaceholder(n,l.getAggregation("_appsPlaceholders")[d]);if(v){n.openStart("div");n.class("sapMSPCMonthNowMarker");n.openEnd()}n.openStart("div");n.class("specialDateIndicator");n.openEnd();n.close("div");n.openStart("div");n.class("sapMSPCMonthDayNumber");n.openEnd();n.text(s.getDate());n.close("div");if(p){n.openStart("div");n.class("sapMSPCMonthLnkMore");n.openEnd();n.renderControl(l._getMoreLink(p,s,d));n.close("div")}n.openStart("span",f.format(s.toLocalJSDate())+"-Descr");n.class("sapUiInvisibleText");n.openEnd();n.text(l._getCellStartInfo(s.toLocalJSDate()));if(l._sLegendId&&S){n.text(S)}n.close("span");if(v){n.close("div")}n.close("div")};d.renderAppointments=function(e,a,t,n,l,i,s){var r=a._getMaxAppointments(),o=l?r-2:r-1;for(var p=0;p<t.length;p++){if(t[p].level<=o){this.renderAppointment(e,a,t[p],n,i,s)}}};d.renderAppointment=function(e,a,t,n,l,i){var o=t.data,d=t.width,c=t.level,g=a._getColumns(),f=o.getTooltip_AsString(),v=o.getType(),u=o.getColor(),S=o.getTitle(),C=o.getText(),y=o.getIcon(),D=o.getId(),b=o.getParent().getEnableAppointmentsDragAndDrop(),h={role:"listitem",labelledby:{value:s.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},A=g-n-d,m=r.getConfiguration().getRTL(),M,I=r.getConfiguration().getTheme().indexOf("_hc")?2:1;A=A<0?0:A;if(S){h["labelledby"].value=h["labelledby"].value+" "+D+"-Title"}h["labelledby"].value=h["labelledby"].value+" "+D+"-Descr";if(C){h["labelledby"].value=h["labelledby"].value+" "+D+"-Text"}if(o.getTentative()){h["labelledby"].value=h["labelledby"].value+" "+s.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(o.getSelected()){h["labelledby"].value=h["labelledby"].value+" "+s.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}e.openStart("div",o.getId()+"-"+n+"_"+i);e.attr("draggable",b);e.attr("data-sap-ui-draggable",b);e.attr("data-sap-ui-related",o.getId());e.attr("data-sap-level",c);e.attr("data-sap-width",d);e.attr("tabindex",0);if(f){e.attr("title",f)}e.accessibilityState(o,h);e.class("sapMSinglePCAppointmentWrap");e.class("sapUiCalendarRowApps");if(!u&&v!==p.None){e.class("sapUiCalendarApp"+v)}if(u){if(r.getConfiguration().getRTL()){e.style("border-right-color",u)}else{e.style("border-left-color",u)}}e.style(m?"right":"left","calc("+n*100/g+"% + "+I+"px)");e.style(m?"left":"right","calc("+A*100/g+"% + "+I+"px)");e.style("top",c*l.appHeight+l.cellHeaderHeight+"rem");e.openEnd();e.openStart("div");e.class("sapUiCalendarApp");if(o.getSelected()){e.class("sapUiCalendarAppSel")}if(o.getTentative()){e.class("sapUiCalendarAppTent")}if(y){e.class("sapUiCalendarAppWithIcon")}e.openEnd();e.openStart("div");e.class("sapUiCalendarAppCont");if(u){e.style("background-color",o._getCSSColorForBackground(u))}e.openEnd();if(t.hasPrevious<0){M=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];e.icon("sap-icon://arrow-left",M,{title:null,role:"img"})}if(y){M=["sapUiCalendarAppIcon"];var P={};P["id"]=D+"-Icon";P["title"]=null;P["role"]="img";e.icon(y,M,P)}if(S){e.openStart("span",D+"-Title");e.class("sapUiCalendarAppTitle");e.openEnd();e.text(S,true);e.close("span")}if(t.hasNext<0){M=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];e.icon("sap-icon://arrow-right",M,{title:null,role:"img"})}e.openStart("span",D+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(a._getAppointmentAnnouncementInfo(o));e.close("span");e.close("div");e.close("div");e.close("div")};d.renderDayNames=function(t,n,l){var i=l.getFirstDayOfWeek(),s=n.getId(),o,p=r.getConfiguration().getCalendarType(),d=l.getDaysStandAlone("abbreviated",p),c=l.getDaysStandAlone("wide",p),g=a._getFirstDateOfWeek(e.fromLocalJSDate(n.getStartDate())),f;t.openStart("div",s+"-Names");t.class("sapMSPCMonthDayNames");t.openEnd();for(var v=0;v<7;v++){f=(v+i)%7;o=s+"-WH"+f;t.openStart("div",o);t.class("sapUiCalWH");if(v===0){t.class("sapUiCalFirstWDay")}if(a._isWeekend(g,l)){t.class("sapUiCalItemWeekEnd")}g.setDate(g.getDate()+1);t.accessibilityState(null,{role:"columnheader",label:c[f]});t.openEnd();t.text(d[f%7]);t.close("div")}t.close("div")};d.renderDndPlaceholder=function(e,a){e.openStart("div");e.class("sapMSinglePCOverlay");e.openEnd();e.renderControl(a);e.close("div")};return d},true);