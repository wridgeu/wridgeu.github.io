/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","./library","sap/ui/unified/CalendarDateInterval","sap/ui/unified/CalendarDateIntervalRenderer","sap/ui/unified/DateRange"],function(e,t,a,i,s,r){"use strict";var o=i.extend("sap.ui.unified.CalendarWeekInterval",{renderer:s});o.prototype._getDaysLarge=function(){return 6};o.prototype._handleFocus=function(a){var s=!!a.getParameter("_outsideBorder"),r,o,n;if(s){r=a.getParameter("date");this._oFocusDateWeek=t.fromLocalJSDate(r);o=e._getFirstDateOfWeek(this._oFocusDateWeek);n=this.getAggregation("month")[0];if(n.getDomRef()){this._setStartDate(o,false,true)}}return i.prototype._handleFocus.apply(this,arguments)};o.prototype._focusDateExtend=function(e,t,a){var s,r;if(!this._oFocusDateWeek){return i.prototype._focusDateExtend.apply(this,arguments)}s=this.getAggregation("month")[0];r=this._oFocusDateWeek.toLocalJSDate();this._setFocusedDate(this._oFocusDateWeek);s.setDate(r);this._oFocusDateWeek=null;return!a};o.prototype._dateMatchesVisibleRange=function(e){var a=this.getDays(),i=t.fromLocalJSDate(e),s=t.fromLocalJSDate(this.getStartDate()),r=t.fromLocalJSDate(this.getStartDate());r.setDate(r.getDate()+a);return i.isSameOrAfter(s)&&i.isBefore(r)};o.prototype._showCalendarPicker=function(){var e=this._getFocusedDate(),a=this._getStartDate(),i=this._getCalendarPicker(),s=new r,o;o=new t(a);o.setDate(o.getDate()+this._getDays()-1);s.setStartDate(a.toLocalJSDate());s.setEndDate(o.toLocalJSDate());i.displayDate(e.toLocalJSDate(),false);i.removeAllSelectedDates();i.addSelectedDate(s);i.setMinDate(this.getMinDate());i.setMaxDate(this.getMaxDate());this._openPickerPopup(i);this._showOverlay()};o.prototype._handleCalendarPickerDateSelect=function(a){var i=this._getCalendarPicker(),s=i.getSelectedDates()[0].getStartDate(),r=t.fromLocalJSDate(s),o;if(this._dateMatchesVisibleRange(r.toLocalJSDate())){this._oFocusDateWeek=r;this._focusDate(this._oFocusDateWeek,false,true)}else{o=e._getFirstDateOfWeek(r);this._setStartDate(o);this._oFocusDateWeek=r;this._focusDate(this._oFocusDateWeek,false,true)}this._closeCalendarPicker(true)};o.prototype._calculateStartDate=function(e,a,i){var e=new t(this._oMaxDate,this.getPrimaryCalendarType());e=this._getMaxDateAlignedToMinDate(e,this._oMinDate);i=this._getStartDateAlignedToMinAndMaxDate(e,this._oMinDate,i);return i};return o});