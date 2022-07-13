/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./UniversalDate","../CalendarType","./_Calendars"],function(t,e,r){"use strict";var n=t.extend("sap.ui.core.date.Buddhist",{constructor:function(){var t=arguments;if(t.length>1){t=u(t)}this.oDate=this.createDate(Date,t);this.sCalendarType=e.Buddhist}});n.UTC=function(){var t=u(arguments);return Date.UTC.apply(Date,t)};n.now=function(){return Date.now()};function a(r){var n=t.getEraStartDate(e.Buddhist,0).year,a=r.year-n+1;if(r.year<1941&&r.month<3){a-=1}if(r.year===null){a=undefined}return{year:a,month:r.month,day:r.day}}function i(r){var n=t.getEraStartDate(e.Buddhist,0).year,a=r.year+n-1;if(a<1941&&r.month<3){a+=1}if(r.year===null){a=undefined}return{year:a,month:r.month,day:r.day}}function u(t){var e,r;e={year:t[0],month:t[1],day:t[2]!==undefined?t[2]:1};r=i(e);t[0]=r.year;return t}n.prototype._getBuddhist=function(){var t={year:this.oDate.getFullYear(),month:this.oDate.getMonth(),day:this.oDate.getDate()};return a(t)};n.prototype._setBuddhist=function(t){var e=i(t);return this.oDate.setFullYear(e.year,e.month,e.day)};n.prototype._getUTCBuddhist=function(){var t={year:this.oDate.getUTCFullYear(),month:this.oDate.getUTCMonth(),day:this.oDate.getUTCDate()};return a(t)};n.prototype._setUTCBuddhist=function(t){var e=i(t);return this.oDate.setUTCFullYear(e.year,e.month,e.day)};n.prototype.getYear=function(){return this._getBuddhist().year};n.prototype.getFullYear=function(){return this._getBuddhist().year};n.prototype.getUTCFullYear=function(){return this._getUTCBuddhist().year};n.prototype.setYear=function(t){var e=this._getBuddhist();e.year=t;return this._setBuddhist(e)};n.prototype.setFullYear=function(t,e,r){var n=this._getBuddhist();n.year=t;if(e!==undefined){n.month=e}if(r!==undefined){n.day=r}return this._setBuddhist(n)};n.prototype.setUTCFullYear=function(t,e,r){var n=this._getUTCBuddhist();n.year=t;if(e!==undefined){n.month=e}if(r!==undefined){n.day=r}return this._setUTCBuddhist(n)};r.set(e.Buddhist,n);return n});