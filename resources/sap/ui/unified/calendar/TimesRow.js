/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/LocaleData","sap/ui/core/delegate/ItemNavigation","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","sap/ui/unified/library","sap/ui/core/format/DateFormat","sap/ui/core/Locale","./TimesRowRenderer","sap/ui/dom/containsOrEquals","sap/base/util/deepEqual","sap/ui/thirdparty/jquery","sap/ui/unified/DateRange","sap/ui/core/Configuration"],function(e,t,a,i,r,s,n,o,l,g,u,h,c,p){"use strict";var f=e.extend("sap.ui.unified.calendar.TimesRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},items:{type:"int",group:"Appearance",defaultValue:12},intervalMinutes:{type:"int",group:"Appearance",defaultValue:60},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}},renderer:l});f.prototype.init=function(){this._oFormatYyyyMMddHHmm=n.getInstance({pattern:"yyyyMMddHHmm",calendarType:this.getProperty("primaryCalendarType")});this._oFormatLong=n.getDateTimeInstance({style:"long/short",calendarType:this.getProperty("primaryCalendarType")});this._oFormatDate=n.getDateInstance({style:"medium",calendarType:this.getProperty("primaryCalendarType")});this._mouseMoveProxy=h.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified")};f.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};f.prototype.onAfterRendering=function(){d.call(this)};f.prototype.onsapfocusleave=function(e){if(!e.relatedControlId||!g(this.getDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){if(this._bMouseMove){M.call(this,true);C.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;b.call(this)}if(this._bMousedownChange){this._bMousedownChange=false;b.call(this)}}};f.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("selectedDates");return e};f.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("selectedDates");return e};f.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("specialDates");return e};f.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("specialDates");return e};f.prototype.setIntervalMinutes=function(e){if(e>=720){throw new Error("Only intervals < 720 minutes are allowed; "+this)}if(1440%e>0){throw new Error("A day must be divisible by the interval size; "+this)}this.setProperty("intervalMinutes",e,false);this._oFormatTime=undefined;return this};f.prototype.setDate=function(e){D.call(this,e,false);return this.setProperty("date",e)};f.prototype._getDate=function(){if(!this._oUTCDate){this._oUTCDate=i._createUniversalUTCDate(new Date,undefined,true)}return this._oUTCDate};f.prototype.setStartDate=function(e){i._checkJSDateObject(e);var t=e.getFullYear();i._checkYearInValidRange(t);var a=i._createUniversalUTCDate(e,undefined,true);this.setProperty("startDate",e);this._oUTCStartDate=this._getIntervalStart(a);if(this.getDomRef()){var r=i._createLocalDate(this._getDate(),true);this._bNoRangeCheck=true;this.displayDate(e);this._bNoRangeCheck=false;if(r&&this.checkDateFocusable(r)){this.displayDate(r)}}return this};f.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=i._createUniversalUTCDate(new Date,undefined,true);this._oUTCStartDate=this._getIntervalStart(this._oUTCStartDate)}return this._oUTCStartDate};f.prototype.displayDate=function(e){D.call(this,e,true);return this};f.prototype._getLocale=function(){var e=this.getParent();if(e&&e.getLocale){return e.getLocale()}else if(!this._sLocale){this._sLocale=p.getFormatSettings().getFormatLocale().toString()}return this._sLocale};f.prototype._getLocaleData=function(){var e=this.getParent();if(e&&e._getLocaleData){return e._getLocaleData()}else if(!this._oLocaleData){var a=this._getLocale();var i=new o(a);this._oLocaleData=t.getInstance(i)}return this._oLocaleData};f.prototype._getFormatLong=function(){var e=this._getLocale();if(this._oFormatLong.oLocale.toString()!=e){var t=new o(e);this._oFormatLong=n.getDateTimeInstance({style:"long/short",calendarType:this.getProperty("primaryCalendarType")},t)}return this._oFormatLong};f.prototype._getFormatTime=function(){var e=this._getLocale();if(!this._oFormatTime||this._oFormatTime.oLocale.toString()!=e){var t=new o(e);var a=this.getIntervalMinutes();var i=this._getLocaleData();var r;var s=i.getTimePattern("short");this._oFormatTimeAmPm=undefined;if(a%60==0){r=S(s);if(s.search("a")>=0){this._oFormatTimeAmPm=n.getTimeInstance({pattern:"a",calendarType:this.getProperty("primaryCalendarType")},t)}}else{r=s;r=r.replace("HH","H");r=r.replace("hh","h");if(r.search("a")>=0){this._oFormatTimeAmPm=n.getTimeInstance({pattern:"a",calendarType:this.getProperty("primaryCalendarType")},t);r=r.replace("a","").trim()}}this._oFormatTime=n.getTimeInstance({pattern:r,calendarType:this.getProperty("primaryCalendarType")},t)}return this._oFormatTime};f.prototype._getFormatDate=function(){var e=this._getLocale();if(this._oFormatDate.oLocale.toString()!=e){var t=new o(e);this._oFormatDate=n.getDateInstance({style:"medium",calendarType:this.getProperty("primaryCalendarType")},t)}return this._oFormatDate};f.prototype.getIntervalSelection=function(){var e=this.getParent();if(e&&e.getIntervalSelection){return e.getIntervalSelection()}else{return this.getProperty("intervalSelection")}};f.prototype.getSingleSelection=function(){var e=this.getParent();if(e&&e.getSingleSelection){return e.getSingleSelection()}else{return this.getProperty("singleSelection")}};f.prototype.getSelectedDates=function(){var e=this.getParent();if(e&&e.getSelectedDates){return e.getSelectedDates()}else{return this.getAggregation("selectedDates",[])}};f.prototype.getSpecialDates=function(){var e=this.getParent();if(e&&e.getSpecialDates){return e.getSpecialDates()}else{return this.getAggregation("specialDates",[])}};f.prototype._getShowHeader=function(){var e=this.getParent();if(e&&e._getShowItemHeader){return e._getShowItemHeader()}else{return this.getProperty("showHeader")}};f.prototype.getIntervalMinutes=function(){var e=this.getParent();if(e&&e.getIntervalMinutes){return e.getIntervalMinutes()}else{return this.getProperty("intervalMinutes")}};f.prototype.getAriaLabelledBy=function(){var e=this.getParent();if(e&&e.getAriaLabelledBy){return e.getAriaLabelledBy()}else{return this.getAssociation("ariaLabelledBy",[])}};f.prototype._setLegendControlOrigin=function(e){this._oLegendControlOrigin=e};f.prototype.getLegend=function(){var e=this.getParent();if(this._oLegendControlOrigin){return this._oLegendControlOrigin.getLegend()}if(e&&e.getLegend){return e.getLegend()}else{return this.getAssociation("ariaLabelledBy",[])}};f.prototype._checkDateSelected=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t=0;var a=this.getSelectedDates();var s=new r(e.getTime());s=this._getIntervalStart(s);var n=s.getTime();for(var o=0;o<a.length;o++){var l=a[o];var g=l.getStartDate();var u=0;if(g){g=i._createUniversalUTCDate(g,undefined,true);g=this._getIntervalStart(g);u=g.getTime()}var h=l.getEndDate();var c=0;if(h){h=i._createUniversalUTCDate(h,undefined,true);h=this._getIntervalStart(h);c=h.getTime()}if(n==u&&!h){t=1;break}else if(n==u&&h){t=2;if(h&&n==c){t=5}break}else if(h&&n==c){t=3;break}else if(h&&n>u&&n<c){t=4;break}if(this.getSingleSelection()){break}}return t};f.prototype._getDateType=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t;var a=this.getSpecialDates();var s=new r(e.getTime());s=this._getIntervalStart(s);var n=s.getTime();for(var o=0;o<a.length;o++){var l=a[o];var g=l.getStartDate();var u=0;if(g){g=i._createUniversalUTCDate(g,undefined,true);g=this._getIntervalStart(g);u=g.getTime()}var h=l.getEndDate();var c=0;if(h){h=i._createUniversalUTCDate(h,undefined,true);h=this._getIntervalStart(h);h.setUTCMinutes(h.getUTCMinutes()+this.getIntervalMinutes()-1);c=h.getTime()}else if(g.getUTCHours()==0&&g.getUTCMinutes()==0&&g.getUTCSeconds()==0&&g.getUTCMilliseconds()==0){h=new r(g.getTime());h.setUTCDate(h.getUTCDate()+1);c=h.getTime()}if(n==u&&!h||n>=u&&n<=c){t={type:l.getType(),tooltip:l.getTooltip_AsString(),color:l.getColor()};break}}return t};f.prototype._checkTimeEnabled=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t=e.getTime();var a=this.getParent();if(a&&a._oMinDate&&a._oMaxDate){if(t<a._oMinDate.getTime()||t>a._oMaxDate.getTime()){return false}}return true};f.prototype._handleMouseMove=function(e){if(!this.$().is(":visible")){M.call(this,true)}var t=h(e.target);if(t.hasClass("sapUiCalItemText")){t=t.parent()}if(t.hasClass("sapUiCalItem")){var a=this._getDate();var i=new r(this._oFormatYyyyMMddHHmm.parse(t.attr("data-sap-time"),true).getTime());if(i.getTime()!=a.getTime()){this._oUTCDate=i;C.call(this,i,true);this._bMoveChange=true}}};f.prototype.onmouseup=function(e){if(this._bMouseMove){M.call(this,true);var t=this._getDate();var a=this._oItemNavigation.getItemDomRefs();for(var i=0;i<a.length;i++){var s=h(a[i]);if(s.attr("data-sap-time")==this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true)){s.trigger("focus");break}}if(this._bMoveChange){var n=h(e.target);if(n.hasClass("sapUiCalItemText")){n=n.parent()}if(n.hasClass("sapUiCalItem")){t=new r(this._oFormatYyyyMMddHHmm.parse(n.attr("data-sap-time"),true).getTime())}C.call(this,t);this._bMoveChange=false;this._bMousedownChange=false;b.call(this)}}if(this._bMousedownChange){this._bMousedownChange=false;b.call(this)}};f.prototype.onsapselect=function(e){var t=C.call(this,this._getDate());if(t){b.call(this)}e.stopPropagation();e.preventDefault()};f.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};f.prototype.onsappageupmodifiers=function(e){var t=new r(this._getDate().getTime());var a=t.getUTCDate();if(e.metaKey||e.ctrlKey){t.setUTCDate(a-7)}else{t.setUTCDate(a-1)}this.fireFocus({date:i._createLocalDate(t,true),notVisible:true});e.preventDefault()};f.prototype.onsappagedownmodifiers=function(e){var t=new r(this._getDate().getTime());var a=t.getUTCDate();if(e.metaKey||e.ctrlKey){t.setUTCDate(a+7)}else{t.setUTCDate(a+1)}this.fireFocus({date:i._createLocalDate(t,true),notVisible:true});e.preventDefault()};f.prototype.checkDateFocusable=function(e){i._checkJSDateObject(e);if(this._bNoRangeCheck){return false}var t=this._getStartDate();var a=new r(t.getTime());a.setUTCMinutes(a.getUTCMinutes()+this.getItems()*this.getIntervalMinutes());var s=i._createUniversalUTCDate(e,undefined,true);if(s.getTime()>=t.getTime()&&s.getTime()<a.getTime()){return true}else{return false}};f.prototype.applyFocusInfo=function(e){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this};f.prototype._getIntervalStart=function(e){var t=e.getTime();var a=new r(e.getTime());a.setUTCHours(0);a.setUTCMinutes(0);a.setUTCSeconds(0);a.setUTCMilliseconds(0);var i=this.getIntervalMinutes();while(a.getTime()<=t){a.setUTCMinutes(a.getUTCMinutes()+i)}var s=new r(a.getTime());s.setUTCMinutes(s.getUTCMinutes()-i);return s};f.prototype._setAriaRole=function(e){this._ariaRole=e;return this};f.prototype._getAriaRole=function(){return this._ariaRole?this._ariaRole:"gridcell"};f.prototype._updateItemARIASelected=function(e,t){var a=this._getAriaRole();if(a==="gridcell"){e.attr("aria-selected",t)}return this};function d(){var e=this._getDate();var t=this._oFormatYyyyMMddHHmm.format(e.getJSDate(),true);var i=0;var r=this.$("times").get(0);var s=this.$("times").children(".sapUiCalItem");for(var n=0;n<s.length;n++){var o=h(s[n]);if(o.attr("data-sap-time")===t){i=n;break}}if(!this._oItemNavigation){this._oItemNavigation=new a;this._oItemNavigation.attachEvent(a.Events.AfterFocus,m,this);this._oItemNavigation.attachEvent(a.Events.FocusAgain,v,this);this._oItemNavigation.attachEvent(a.Events.BorderReached,_,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true)}this._oItemNavigation.setRootDomRef(r);this._oItemNavigation.setItemDomRefs(s);this._oItemNavigation.setFocusedIndex(i);this._oItemNavigation.setPageSize(s.length)}function m(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}var s=this._getDate();var n=new r(s.getTime());var o=this._oItemNavigation.getItemDomRefs();var l=h(o[t]);n=new r(this._oFormatYyyyMMddHHmm.parse(l.attr("data-sap-time"),true).getTime());this._oUTCDate=n;this.fireFocus({date:i._createLocalDate(n,true),notVisible:false});if(a.type=="mousedown"){y.call(this,a,n,t)}}function v(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}if(a.type=="mousedown"){var i=this._getDate();y.call(this,a,i,t)}}function _(e){var t=e.getParameter("event");var a=this.getItems();var s=this.getIntervalMinutes();var n=this._getDate();var o=new r(n.getTime());if(t.type){switch(t.type){case"sapnext":case"sapnextmodifiers":o.setUTCMinutes(o.getUTCMinutes()+s);break;case"sapprevious":case"sappreviousmodifiers":o.setUTCMinutes(o.getUTCMinutes()-s);break;case"sappagedown":o.setUTCMinutes(o.getUTCMinutes()+s*a);break;case"sappageup":o.setUTCMinutes(o.getUTCMinutes()-s*a);break;default:break}this.fireFocus({date:i._createLocalDate(o,true),notVisible:true})}}function y(e,t,a){if(e.button){return}var i=C.call(this,t);if(i){this._bMousedownChange=true}if(this._bMouseMove){M.call(this,true);this._bMoveChange=false}else if(this.getIntervalSelection()&&this.$().is(":visible")){I.call(this,true)}e.preventDefault();e.setMark("cancelAutoClose")}function D(e,t){i._checkJSDateObject(e);var a=e.getFullYear();i._checkYearInValidRange(a);var r=true;if(!u(this.getDate(),e)){var s=i._createUniversalUTCDate(e,undefined,true);s=this._getIntervalStart(s);r=this.checkDateFocusable(e);if(!this._bNoRangeCheck&&!r){throw new Error("Date must be in visible date range; "+this)}this.setProperty("date",e);this._oUTCDate=s}if(this.getDomRef()){if(r){T.call(this,this._oUTCDate,t)}else{this.setDate(e)}}}function T(e,t){var a=this._oFormatYyyyMMddHHmm.format(e.getJSDate(),true);var i=this._oItemNavigation.getItemDomRefs();var r;for(var s=0;s<i.length;s++){r=h(i[s]);if(r.attr("data-sap-time")==a){if(document.activeElement!=i[s]){if(t){this._oItemNavigation.setFocusedIndex(s)}else{this._oItemNavigation.focusItem(s)}}break}}}function C(e,t){if(!this._checkTimeEnabled(e)){return false}var a=this.getSelectedDates();var r;var s=0;var n=this.getParent();var o=this;var l;if(n&&n.getSelectedDates){o=n}if(this.getSingleSelection()){if(a.length>0){r=a[0];l=r.getStartDate();if(l){l=i._createUniversalUTCDate(l,undefined,true);l=this._getIntervalStart(l)}}else{r=new c;o.addAggregation("selectedDates",r)}if(this.getIntervalSelection()&&(!r.getEndDate()||t)&&l){var g;if(e.getTime()<l.getTime()){g=l;l=e;if(!t){r.setProperty("startDate",i._createLocalDate(new Date(l.getTime()),true));r.setProperty("endDate",i._createLocalDate(new Date(g.getTime()),true))}}else if(e.getTime()>=l.getTime()){g=e;if(!t){r.setProperty("endDate",i._createLocalDate(new Date(g.getTime()),true))}}}else{r.setProperty("startDate",i._createLocalDate(new Date(e.getTime()),true));r.setProperty("endDate",undefined)}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection")}else{var u=this._checkDateSelected(e);if(u>0){for(s=0;s<a.length;s++){l=a[s].getStartDate();if(l){l=i._createUniversalUTCDate(l,undefined,true);l=this._getIntervalStart(l);if(e.getTime()==l.getTime()){o.removeAggregation("selectedDates",s);break}}}}else{r=new c({startDate:i._createLocalDate(new Date(e.getTime()),true)});o.addAggregation("selectedDates",r)}}}return true}function b(){if(this._bMouseMove){M.call(this,true)}this.fireSelect()}function I(){h(window.document).on("mousemove",this._mouseMoveProxy);this._bMouseMove=true}function M(){h(window.document).off("mousemove",this._mouseMoveProxy);this._bMouseMove=undefined}function S(e){var t;if(e.toUpperCase().indexOf("K")>-1){t=e.indexOf("k")>-1?"k":"K"}else{t=e.indexOf("h")>-1?"h":"H"}return t}return f});