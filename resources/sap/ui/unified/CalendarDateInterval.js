/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./calendar/CalendarUtils","./Calendar","./calendar/DatesRow","./calendar/MonthPicker","./calendar/YearPicker","./calendar/YearRangePicker","./calendar/CalendarDate","./library","sap/ui/Device","./CalendarDateIntervalRenderer","sap/base/util/deepEqual","sap/m/Popover","sap/ui/core/Core","sap/base/Log","sap/ui/thirdparty/jquery","./DateRange"],function(e,t,a,r,i,s,o,n,h,g,p,c,l,u,_,d){"use strict";var D=sap.ui.core.CalendarType;var f=t.extend("sap.ui.unified.CalendarDateInterval",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},days:{type:"int",group:"Appearance",defaultValue:7},showDayNamesLine:{type:"boolean",group:"Appearance",defaultValue:true},pickerPopup:{type:"boolean",group:"Appearance",defaultValue:false}},designtime:"sap/ui/unified/designtime/CalendarDateInterval.designtime"},renderer:g});f.prototype.init=function(){t.prototype.init.apply(this,arguments);this._iDaysMonthHead=35};f.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.apply(this,arguments);this._bPoupupMode=this.getPickerPopup();if(this._getSucessorsPickerPopup()){this.setProperty("_currentPicker","month")}};f.prototype._selectYearRange=function(){t.prototype._selectYearRange.apply(this,arguments);this.getAggregation("month")[0].setStartDate(this._getFocusedDate().toLocalJSDate())};f.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._oPopup){this._oPopup.destroy();this._oPopup=null}if(this._oCalendar){this._oCalendar.removeDelegate(this._oFocusCalendarDelegate);this._oCalendar.destroy();this._oCalendar=null}};f.prototype._initializeMonthPicker=function(){var e=this._createMonthPicker();e._bCalendar=true;this.setAggregation("monthPicker",e);e._setSelectedDatesControlOrigin(this)};f.prototype._initializeYearPicker=function(){var e=this._createYearPicker();e._bCalendar=true;this.setAggregation("yearPicker",e);e._setSelectedDatesControlOrigin(this)};f.prototype._initializeYearRangePicker=function(){this.setAggregation("yearRangePicker",this._createYearRangePicker())};f.prototype.setPickerPopup=function(e){this.setProperty("pickerPopup",e);var t=this.getAggregation("header"),a,r;if(e){if(this._getMonthPicker()){this._getMonthPicker().destroy()}if(this._getYearPicker()){this._getYearPicker().destroy()}t.setVisibleButton2(false);t.detachEvent("pressButton2",this._handleButton2,this);this._setHeaderText(this._getFocusedDate(true))}else{if(!this._getMonthPicker()){this.setAggregation("monthPicker",this._createMonthPicker())}if(!this._getYearPicker()){this.setAggregation("yearPicker",this._createYearPicker())}a=this._getMonthPicker();r=this._getYearPicker();a.setColumns(0);a.setMonths(6);r.setColumns(0);r.setYears(6);r._oMinDate.setYear(this._oMinDate.getYear());r._oMaxDate.setYear(this._oMaxDate.getYear());t.setVisibleButton2(true);t.detachEvent("pressButton2",this._handleButton2,this);t.attachEvent("pressButton2",this._handleButton2,this)}return this};f.prototype._createMonthPicker=function(){var e=new r(this.getId()+"--MP");e.attachEvent("select",this._selectMonth,this);e._bNoThemeChange=true;e.setColumns(0);e.setMonths(3);e.attachEvent("pageChange",y,this);return e};f.prototype._createYearPicker=function(){var e=new i(this.getId()+"--YP");e.attachEvent("select",this._selectYear,this);e.setColumns(0);e.setYears(3);e.attachEvent("pageChange",P,this);return e};f.prototype._createYearRangePicker=function(){var e=new s(this.getId()+"--YRP");e.attachEvent("select",this._selectYearRange,this);e.setPrimaryCalendarType(this.getPrimaryCalendarType());e.setYears(6);e.setRangeSize(this._getYearPicker().getYears());return e};f.prototype._adjustYearRangeDisplay=function(){var e=this.getAggregation("yearRangePicker");if(!this._getSucessorsPickerPopup()){switch(this.getPrimaryCalendarType()){case D.Gregorian:e.setColumns(3);e.setYears(3);break;default:e.setColumns(2);e.setYears(2)}}else{t.prototype._adjustYearRangeDisplay.call(this,arguments)}};f.prototype._getCalendar=function(){var e;if(!this._oCalendar){e=new t(this.getId()+"--Cal");e.attachEvent("select",this._handleCalendarPickerDateSelect,this);e.attachEvent("cancel",function(e){this._closeCalendarPicker(true);var t=this.getAggregation("header").getDomRef("B1");if(t){t.focus()}},this);this._oFocusCalendarDelegate={onAfterRendering:function(){this.focus()}};e.addDelegate(this._oFocusCalendarDelegate,e);this._oCalendar=e}return this._oCalendar};f.prototype._setAriaRole=function(e){var t=this.getAggregation("month")[0];t._setAriaRole(e);t.invalidate();return this};f.prototype._handleButton1=function(e){if(this.getPickerPopup()){this._showCalendarPicker();this._showOverlay()}else{this._showMonthPicker()}};f.prototype._showOverlay=function(){this.$("contentOver").css("display","")};f.prototype._hideOverlay=function(){this.$("contentOver").css("display","none")};f.prototype._setHeaderText=function(e){var a;if(this.getStartDate()){a=t.prototype._setHeaderText.apply(this,[o.fromLocalJSDate(this.getStartDate(),this.getPrimaryCalendarType())])}else{a=t.prototype._setHeaderText.apply(this,arguments)}var r,i=a.sAriaLabel,s=this.getAggregation("header");var n=this._getLocaleData();var h=o.fromLocalJSDate(new Date(e.toLocalJSDate().getTime()+(this._getDays()-1)*24*60*60*1e3),this.getPrimaryCalendarType());h.setDate(1);var g=n.getIntervalPattern().replace("{0}","").replace("{1}","");var p=this._oYearFormat.format(h.toUTCJSDate(),true);var c=a.sMonth;if(this.getPickerPopup()){if(n.oLocale.sLanguage.toLowerCase()==="ja"||n.oLocale.sLanguage.toLowerCase()==="zh"){if(p!=a.sYear){c=c.replace(g,g+p+" ");i=i.replace(g,g+p+" ")}r=a.sYear+" "+c;i=a.sYear+" "+i}else{if(p!=a.sYear){c=c.replace(g," "+a.sYear+g);i=i.replace(g," "+a.sYear+g)}r=c+" "+p;i=i+" "+p}s.setTextButton1(r,true);s.setAriaLabelButton1(i)}};f.prototype._showCalendarPicker=function(){var e=this.getStartDate(),t=this._getCalendar(),a=new d,r=new Date(e.getTime());r.setDate(r.getDate()+this._getDays()-1);a.setStartDate(e);a.setEndDate(r);t.displayDate(this._getFocusedDate().toLocalJSDate());t.removeAllSelectedDates();t.addSelectedDate(a);t.setMinDate(this.getMinDate());t.setMaxDate(this.getMaxDate());this._openPickerPopup(t)};f.prototype._handleCalendarPickerDateSelect=function(e){var t=this._getCalendar(),a=t.getSelectedDates()[0].getStartDate(),r=o.fromLocalJSDate(a);this._setStartDate(r);this._setFocusedDate(r);this._closeCalendarPicker()};f.prototype._closeCalendarPicker=function(e){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close()}if(!e){this._renderMonth()}this._getCalendar()._closePickers()};f.prototype._getDaysLarge=function(){return 10};f.prototype._createMonth=function(e){var t=new a(e);t._bCalendar=true;return t};f.prototype.setStartDate=function(t){e._checkJSDateObject(t);if(p(this.getStartDate(),t)){return this}var a=t.getFullYear();e._checkYearInValidRange(a);var r=o.fromLocalJSDate(t,this.getPrimaryCalendarType());if(e._isOutside(r,this._oMinDate,this._oMaxDate)){throw new Error("Date must be in valid range (minDate and maxDate); "+this)}var i=this.getMinDate();if(i&&t.getTime()<i.getTime()){u.warning("startDate < minDate -> minDate as startDate set",this);t=new Date(i.getTime())}var s=this.getMaxDate();if(s&&t.getTime()>s.getTime()){u.warning("startDate > maxDate -> maxDate as startDate set",this);t=new Date(s.getTime())}this.setProperty("startDate",t,true);r=o.fromLocalJSDate(t,this.getPrimaryCalendarType());this._oStartDate=r;var n=this.getAggregation("month")[0];n.setStartDate(t);this._updateHeader(r);var h=this._getFocusedDate(true).toLocalJSDate();if(!n.checkDateFocusable(h)){this._setFocusedDate(r);n.displayDate(t)}return this};f.prototype.getStartDate=function(){return this.getProperty("startDate")};f.prototype.setDays=function(e){var t=this.getAggregation("yearRangePicker");this.setProperty("days",e,true);e=this._getDays();var a=this.getAggregation("month")[0];a.setDays(e);if(!this.getPickerPopup()){var r=this._getMonthPicker();var i=Math.ceil(e/3);if(i>12){i=12}r.setMonths(i);var s=this._getYearPicker();var o=Math.floor(e/2);if(o>20){o=20}s.setYears(o);t.setRangeSize(o)}var n=this._getStartDate();this._updateHeader(n);if(this.getDomRef()){if(e>this._getDaysLarge()){this.$().addClass("sapUiCalIntLarge")}else{this.$().removeClass("sapUiCalIntLarge")}if(e>this._iDaysMonthHead){this.$().addClass("sapUiCalIntHead")}else{this.$().removeClass("sapUiCalIntHead")}}return this};f.prototype._getDays=function(){var e=this.getDays();if(h.system.phone&&e>8){return 8}else{return e}};f.prototype.setShowDayNamesLine=function(e){this.setProperty("showDayNamesLine",e,true);var t=this.getAggregation("month")[0];t.setShowDayNamesLine(e);return this};f.prototype._getShowMonthHeader=function(){var e=this._getDays();if(e>this._iDaysMonthHead){return true}else{return false}};f.prototype._getFocusedDate=function(e){if(!this._oFocusedDate||e){this._oFocusedDate=null;t.prototype._getFocusedDate.apply(this,arguments);var a=this.getStartDate();var r=this.getAggregation("month")[0];if(!a){this._setStartDate(this._oFocusedDate,false,true)}else if(!r.checkDateFocusable(this._oFocusedDate.toLocalJSDate())){this._oFocusedDate=o.fromLocalJSDate(a,this.getPrimaryCalendarType())}}return this._oFocusedDate};f.prototype.setMonths=function(e){if(e==1){return this.setProperty("months",e,false)}else{throw new Error("Property months not supported "+this)}};f.prototype.setFirstDayOfWeek=function(e){if(e==-1){return this.setProperty("firstDayOfWeek",e,false)}else{throw new Error("Property firstDayOfWeek not supported "+this)}};f.prototype.focusDate=function(e){var a=this.getAggregation("month")[0];if(!a.checkDateFocusable(e)){this._focusDateExtend(o.fromLocalJSDate(e,this.getPrimaryCalendarType()),true,true)}t.prototype.focusDate.apply(this,arguments);return this};f.prototype._focusOnShiftTab=function(){var e=this.getAggregation("header");if(this.getPickerPopup()&&e.getDomRef("B1")){e.getDomRef("B1").focus()}else if(!this.getPickerPopup()&&e.getDomRef("B2")){e.getDomRef("B2").focus()}};f.prototype.onsapescape=function(e){if(this.getPickerPopup()){this._closeCalendarPicker();this.fireCancel()}else{if(this._iMode===0){this.fireCancel()}this._closePickers()}this._updateHeadersButtons();this._setHeaderText(this._getFocusedDate())};f.prototype._focusDateExtend=function(e,t,a){if(t){var r=this.getAggregation("month")[0],i=r._oItemNavigation?r._oItemNavigation.getFocusedIndex():0,s=new o(e,this.getPrimaryCalendarType());s.setDate(s.getDate()-i);this._setStartDate(s,false,true);if(!a){return true}}return false};f.prototype._setMinMaxDateExtend=function(e){if(this._oStartDate){if(this._oStartDate.isBefore(this._oMinDate)){u.warning("start date < minDate -> minDate will be start date",this);this._setStartDate(new o(this._oMinDate,this.getPrimaryCalendarType()),true,true)}else{var t=new o(this._oStartDate);t.setDate(t.getDate()+this._getDays()-1);if(t.isAfter(this._oMaxDate)){u.warning("end date > maxDate -> start date will be changed",this);var a=new o(this._oMaxDate);a.setDate(a.getDate()-this._getDays()+1);this._setStartDate(a,true,true)}}}};f.prototype._updateHeader=function(e){this._setHeaderText(e);switch(this._iMode){case 0:this._togglePrevNext(e,true);break;case 1:this._togglePrevNext(e);break;case 2:case 3:this._togglePrevNexYearPicker();break}};f.prototype._togglePrevNext=function(a,r){if(this._iMode>1||this._iMode==1&&this.getPickerPopup()){return t.prototype._togglePrevNext.apply(this,arguments)}var i=this._oMaxDate.getYear();var s=this._oMinDate.getYear();var n=this._oMaxDate.getMonth();var h=this._oMinDate.getMonth();var g=this._oMinDate.getDate();var p=this._oMaxDate.getDate();var c=this.getAggregation("header");var l=this._getDays();var u;var _;var d;var D;var f;if(this._iMode==1&&!r){var y=this._getMonthPicker();var P=y.getMonths();var v=y.getProperty("_firstMonth");var m=v+P-1;u=a.getYear();if(v==0||u==s&&v<=h){c.setEnabledPrevious(false)}else{c.setEnabledPrevious(true)}if(m>10||u==i&&m>=n){c.setEnabledNext(false)}else{c.setEnabledNext(true)}return}_=this._getStartDate();d=new o(_,this.getPrimaryCalendarType());d.setDate(d.getDate()+l-1);if(e._isOutside(a,_,d)){_=new o(a,this.getPrimaryCalendarType());d=new o(_,this.getPrimaryCalendarType());d.setDate(d.getDate()+l-1)}u=_.getYear();D=_.getMonth();f=_.getDate();if(u<s||u==s&&(!r||D<h||D==h&&f<=g)){c.setEnabledPrevious(false)}else{c.setEnabledPrevious(true)}u=d.getYear();D=d.getMonth();f=d.getDate();if(u>i||u==i&&(!r||D>n||D==n&&f>=p)){c.setEnabledNext(false)}else{c.setEnabledNext(true)}};f.prototype._shiftStartFocusDates=function(e,t,a){e.setDate(e.getDate()+a);t.setDate(t.getDate()+a);this._setFocusedDate(t);this._setStartDate(e,true)};f.prototype._handlePrevious=function(e){var t=new o(this._getFocusedDate(),this.getPrimaryCalendarType()),a,r,i;switch(this._iMode){case 0:r=new o(this._getStartDate(),this.getPrimaryCalendarType());i=this._getDays();this._shiftStartFocusDates(r,t,i*-1);this._addMonthFocusDelegate();break;case 1:if(!this.getPickerPopup()){a=this._getMonthPicker();if(a.getMonths()<12){a.previousPage();this._togglePrevNext(t)}else{t.setYear(t.getYear()-1);var s=this._focusDateExtend(t,true,false);this._setFocusedDate(t);this._updateHeader(t);this._setDisabledMonths(t.getYear());if(s){this.fireStartDateChange()}}}break;case 2:if(!this.getPickerPopup()){this._getYearPicker().previousPage();P.call(this)}break;case 3:if(!this.getPickerPopup()){this.getAggregation("yearRangePicker").previousPage();P.call(this)}break}};f.prototype._handleNext=function(e){var t=new o(this._getFocusedDate(),this.getPrimaryCalendarType()),a,r,i;switch(this._iMode){case 0:r=new o(this._getStartDate(),this.getPrimaryCalendarType());i=this._getDays();this._shiftStartFocusDates(r,t,i);this._addMonthFocusDelegate();break;case 1:if(!this.getPickerPopup()){a=this._getMonthPicker();if(a.getMonths()<12){a.nextPage();this._togglePrevNext(t)}else{t.setYear(t.getYear()+1);var s=this._focusDateExtend(t,true,false);this._setFocusedDate(t);this._updateHeader(t);this._setDisabledMonths(t.getYear());if(s){this.fireStartDateChange()}}}break;case 2:if(!this.getPickerPopup()){this._getYearPicker().nextPage();P.call(this)}break;case 3:if(!this.getPickerPopup()){this.getAggregation("yearRangePicker").nextPage();P.call(this)}break}};f.prototype._getDisplayedMonths=function(e){var t=[];var a=e.getMonth();var r=this._getDays();t.push(a);if(r>this._getDaysLarge()){var i=new o(e,this.getPrimaryCalendarType());i.setDate(i.getDate()+r-1);var s=i.getMonth();while(a!=s){a=(a+1)%12;t.push(a)}}return t};f.prototype._getDisplayedSecondaryMonths=function(e,t){var a=this._getDays();var r=new o(this._getStartDate(),t);var i=r.getMonth();var s=new o(r,this.getPrimaryCalendarType());s.setDate(s.getDate()+a-1);s=new o(s,t);var n=s.getMonth();return{start:i,end:n}};f.prototype._openPickerPopup=function(e){if(!this._oPopup){var t=new c({placement:"VerticalPreferredBottom",showHeader:false,showArrow:false,verticalScrolling:false});t.oPopup.setDurations(0,0);t.addEventDelegate({onsapescape:function(e){this._oCalendar.onsapescape(e);this._hideOverlay()}},this);this._oPopup=t}this._oPopup.addContent(e);this._oPopup.attachAfterClose(function(){this._closeCalendarPicker(true);this._hideOverlay()},this);this._oPopup.attachAfterOpen(function(){var e=a.$("B1");var t=this._oPopup.$();var r=Math.floor((t.width()-e.width())/2);this._oPopup.setOffsetX(l.getConfiguration().getRTL()?r:-r);var i=e.height();this._oPopup.setOffsetY(this._oPopup._getCalculatedPlacement()==="Top"?i:-i)},this);var a=this.getAggregation("header");this._oPopup.openBy(a.getDomRef("B1"))};f.prototype._getMaxDateAlignedToMinDate=function(e,t){var a=new o(e,this.getPrimaryCalendarType());if(a.isBefore(t)){a=new o(t);a.setDate(a.getDate()+this._getDays()-1)}return a};f.prototype._getStartDateAlignedToMinAndMaxDate=function(e,t,a){var r=new o(a,this.getPrimaryCalendarType());if(r.isBefore(t)){r=new o(t,this.getPrimaryCalendarType())}else if(r.isAfter(e)){r=e}return r};f.prototype._calculateStartDate=function(e,t,a){var r=new o(e,this.getPrimaryCalendarType());r.setDate(r.getDate()-this._getDays()+1);r=this._getMaxDateAlignedToMinDate(r,t);a=this._getStartDateAlignedToMinAndMaxDate(r,t,a);return a};f.prototype._setStartDate=function(e,t,a){e=this._calculateStartDate(this._oMaxDate,this._oMinDate,e);var r=e.toLocalJSDate();this.setProperty("startDate",r,true);this._oStartDate=e;var i=this.getAggregation("month")[0];i.setStartDate(r);this._updateHeader(e);if(t){var s=this._getFocusedDate().toLocalJSDate();if(!i.checkDateFocusable(s)){this._setFocusedDate(e);i.setDate(r)}else{i.setDate(s)}}if(!a){this.fireStartDateChange()}};f.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=this._getFocusedDate()}return this._oStartDate};function y(e){var t=new o(this._getFocusedDate(),this.getPrimaryCalendarType());this._togglePrevNext(t)}function P(e){this._togglePrevNexYearPicker();this._updateHeadersYearPrimaryText(this._getYearString())}return f});