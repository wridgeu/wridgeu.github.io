/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/Device","./InputBase","./DateTimeField","./Button","./ResponsivePopover","sap/ui/core/date/UniversalDate","./library","sap/ui/core/Control","sap/ui/core/library","./DatePickerRenderer","sap/base/util/deepEqual","sap/base/assert","sap/base/Log","sap/ui/core/IconPool","./InstanceManager","sap/ui/unified/Calendar","sap/ui/unified/DateRange","sap/ui/unified/DateTypeRange","sap/ui/unified/calendar/CustomMonthPicker","sap/ui/unified/calendar/CustomYearPicker","sap/ui/unified/library","sap/ui/dom/jquery/cursorPos"],function(t,e,a,i,s,o,n,r,p,u,l,h,d,g,f,c,_,y,D,m,C,v){"use strict";var T=u.CalendarType;var P=sap.ui.getCore().getLibraryResourceBundle("sap.m");var b=i.extend("sap.m.DatePicker",{metadata:{library:"sap.m",properties:{displayFormatType:{type:"string",group:"Appearance",defaultValue:""},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null},showFooter:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{specialDates:{type:"sap.ui.core.Element",multiple:true,singularName:"specialDate"},_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},associations:{legend:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{parameters:{dateRange:{type:"sap.ui.unified.DateRange"},afterPopupOpened:{type:"boolean"}}}},designtime:"sap/m/designtime/DatePicker.designtime",dnd:{draggable:false,droppable:true}}});b.prototype.init=function(){i.prototype.init.apply(this,arguments);this._bIntervalSelection=false;this._bOnlyCalendar=true;this._bValid=true;this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1);this._oMaxDate=new Date(9999,11,31,23,59,59,999);var t=this.addEndIcon({id:this.getId()+"-icon",src:this.getIconSrc(),noTabStop:true,tooltip:P.getText("OPEN_PICKER_TEXT")});this._bShouldClosePicker=false;t.addEventDelegate({onmousedown:function(t){this._bShouldClosePicker=!!this.isOpen()}},this);t.attachPress(function(){this.toggleOpen(this._bShouldClosePicker)},this)};b.prototype.isValidValue=function(){return this._bValid};b.prototype.isOpen=function(){return this._oPopup&&this._oPopup.isOpen()};b.prototype.toggleOpen=function(t){if(this.getEditable()&&this.getEnabled()){if(t){V.call(this)}else{S.call(this)}}};b.prototype.getIconSrc=function(){return f.getIconURI("appointment-2")};b.prototype.exit=function(){a.prototype.exit.apply(this,arguments);if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close()}delete this._oPopup}if(this._getCalendar()){this._getCalendar().destroy();delete this._getCalendar()}if(this._iInvalidateCalendar){clearTimeout(this._iInvalidateCalendar)}this._sUsedDisplayPattern=undefined;this._sUsedDisplayCalendarType=undefined;this._oDisplayFormat=undefined;this._sUsedValuePattern=undefined;this._sUsedValueCalendarType=undefined;this._oValueFormat=undefined};b.prototype.invalidate=function(t){if(!t||t!=this._getCalendar()){p.prototype.invalidate.apply(this,arguments);this._iInvalidateCalendar=setTimeout(F.bind(this),0)}};b.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.apply(this,arguments);this._checkMinMaxDate();var t=this._getValueHelpIcon();if(t){t.setProperty("visible",this.getEditable(),true)}};b.prototype.setWidth=function(t){return a.prototype.setWidth.call(this,t||"100%")};b.prototype.getWidth=function(t){return this.getProperty("width")||"100%"};b.prototype.applyFocusInfo=function(t){this._bFocusNoPopup=true;if(!e.support.touch||e.system.desktop){a.prototype.applyFocusInfo.apply(this,arguments)}};b.prototype.onfocusin=function(e){if(!t(e.target).hasClass("sapUiIcon")){a.prototype.onfocusin.apply(this,arguments)}this._bFocusNoPopup=undefined};b.prototype.onsapshow=function(t){this.toggleOpen(this.isOpen());t.preventDefault()};b.prototype.onsaphide=b.prototype.onsapshow;b.prototype.onsappageup=function(t){var e=this._getCalendarConstructor().getMetadata().getName();t.preventDefault();if(e!="sap.ui.unified.Calendar"){return}this._increaseDate(1,"day")};b.prototype.onsappageupmodifiers=function(t){var e=this._getCalendarConstructor().getMetadata().getName();t.preventDefault();if(!t.ctrlKey&&t.shiftKey){if(e=="sap.ui.unified.internal.CustomYearPicker"){return}this._increaseDate(1,"month")}else{this._increaseDate(1,"year")}};b.prototype.onsappagedown=function(t){var e=this._getCalendarConstructor().getMetadata().getName();t.preventDefault();if(e!="sap.ui.unified.Calendar"){return}this._increaseDate(-1,"day")};b.prototype.onsappagedownmodifiers=function(t){var e=this._getCalendarConstructor().getMetadata().getName();t.preventDefault();if(!t.ctrlKey&&t.shiftKey){if(e=="sap.ui.unified.internal.CustomYearPicker"){return}this._increaseDate(-1,"month")}else{this._increaseDate(-1,"year")}};b.prototype.onkeypress=function(t){if(!t.charCode||t.metaKey||t.ctrlKey){return}var e=this._getFormatter(true);var a=String.fromCharCode(t.charCode);if(a&&e.sAllowedCharacters&&e.sAllowedCharacters.indexOf(a)<0){t.preventDefault()}};b.prototype._getValueHelpIcon=function(){var t=this.getAggregation("_endIcon");return t&&t[0]};b.prototype._dateValidation=function(t){this._bValid=true;if(t&&(t.getTime()<this._oMinDate.getTime()||t.getTime()>this._oMaxDate.getTime())){this._bValid=false;d(this._bValid,"Date must be in valid range")}this.setProperty("dateValue",t);return t};b.prototype.setMinDate=function(t){if(!this._isValidDate(t)){throw new Error("Date must be a JavaScript date object; "+this)}if(h(this.getMinDate(),t)){return this}if(t){var e=t.getFullYear();if(e<1||e>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this)}this._oMinDate=new Date(t.getTime());var a=this.getDateValue();if(a&&a.getTime()<t.getTime()){this._bValid=false;g.warning("DateValue not in valid date range",this)}}else{this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1)}this.setProperty("minDate",t);if(this._getCalendar()){this._getCalendar().setMinDate(t)}this._oMinDate.setHours(0,0,0,0);return this};b.prototype.setMaxDate=function(t){if(!this._isValidDate(t)){throw new Error("Date must be a JavaScript date object; "+this)}if(h(this.getMaxDate(),t)){return this}if(t){var e=t.getFullYear();if(e<1||e>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this)}this._oMaxDate=new Date(t.getTime());var a=this.getDateValue();if(a&&a.getTime()>t.getTime()){this._bValid=false;g.warning("DateValue not in valid date",this)}}else{this._oMaxDate=new Date(9999,11,31,23,59,59,999)}this.setProperty("maxDate",t);if(this._getCalendar()){this._getCalendar().setMaxDate(t)}this._oMaxDate.setHours(23,59,59,999);return this};b.prototype._checkMinMaxDate=function(){if(this._oMinDate.getTime()>this._oMaxDate.getTime()){g.warning("minDate > MaxDate -> dates switched",this);var t=new Date(this._oMinDate.getTime());var e=new Date(this._oMaxDate.getTime());this._oMinDate=new Date(e.getTime());this._oMaxDate=new Date(t.getTime());this.setProperty("minDate",e,true);this.setProperty("maxDate",t,true);if(this._getCalendar()){this._getCalendar().setMinDate(e);this._getCalendar().setMaxDate(t)}}var a=this.getDateValue();if(a&&(a.getTime()<this._oMinDate.getTime()||a.getTime()>this._oMaxDate.getTime())){this._bValid=false;g.error("dateValue "+a.toString()+"(value="+this.getValue()+") does not match "+"min/max date range("+this._oMinDate.toString()+" - "+this._oMaxDate.toString()+"). App. "+"developers should take care to maintain dateValue/value accordingly.",this)}};b.prototype.getDisplayFormatType=function(){return this.getProperty("displayFormatType")};b.prototype._handleDateValidation=function(t){this._bValid=true;if(!t||t.getTime()<this._oMinDate.getTime()||t.getTime()>this._oMaxDate.getTime()){this._bValid=false;g.warning("Value can not be converted to a valid date",this)}var e=this._formatValue(t,true);if(e!==this.getValue()){this.setLastValue(e)}this.setProperty("value",e);this.setProperty("dateValue",t)};b.prototype.setDisplayFormatType=function(t){if(t){var e=false;for(var a in T){if(a==t){e=true;break}}if(!e){throw new Error(t+" is not a valid calendar type"+this)}}this.setProperty("displayFormatType",t,true);this.setDisplayFormat(this.getDisplayFormat());return this};b.prototype.setSecondaryCalendarType=function(t){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",t,true);if(this._getCalendar()){this._getCalendar().setSecondaryCalendarType(t)}return this};b.prototype.setShowFooter=function(t){var e=this._oPopup,a=this._getCalendar();this.setProperty("showFooter",t);if(!e||!a){return this}e._getButtonFooter().setVisible(t);return this};b.prototype.addSpecialDate=function(t){I.call(this,t);this.addAggregation("specialDates",t,true);F.call(this);return this};b.prototype.insertSpecialDate=function(t,e){I.call(this,t);this.insertAggregation("specialDates",t,e,true);F.call(this);return this};b.prototype.removeSpecialDate=function(t){var e=this.removeAggregation("specialDates",t,true);F.call(this);return e};b.prototype.removeAllSpecialDates=function(){var t=this.removeAllAggregation("specialDates",true);F.call(this);return t};b.prototype.destroySpecialDates=function(){this.destroyAggregation("specialDates",true);F.call(this);return this};b.prototype.setLegend=function(t){this.setAssociation("legend",t,true);var e=this.getLegend();if(e){var a=sap.ui.require("sap/ui/unified/CalendarLegend");t=sap.ui.getCore().byId(e);if(t&&!(typeof a=="function"&&t instanceof a)){throw new Error(t+" is not an sap.ui.unified.CalendarLegend. "+this)}}if(this._getCalendar()){this._getCalendar().setLegend(e)}return this};b.prototype.onChange=function(t){if(!this.getEditable()||!this.getEnabled()){return}var e=this._$input.val(),a=this._formatValue(this.getDateValue()),i;if(e==a&&this._bValid){return}if(this.getShowFooter()&&this._oPopup&&!e){this._oPopup.getBeginButton().setEnabled(false)}this._bValid=true;if(e!=""){i=this._parseValue(e,true);if(!i||i.getTime()<this._oMinDate.getTime()||i.getTime()>this._oMaxDate.getTime()){this._bValid=false;i=undefined}else{e=this._formatValue(i)}}if(this.getDomRef()&&this._$input.val()!==e){this._$input.val(e);this._curpos=this._$input.cursorPos()}if(i){e=this._formatValue(i,true)}if(this.getLastValue()!==e||i&&this.getDateValue()&&i.getFullYear()!==this.getDateValue().getFullYear()){this.setLastValue(e);this.setProperty("value",e,true);var s=this.getValue();if(this._bValid&&e==s){this.setProperty("dateValue",i,true)}e=s;if(this.isOpen()){if(this._bValid){i=this.getDateValue()}this._getCalendar().focusDate(i);var o=this._oDateRange.getStartDate();if(!o&&i||o&&i&&o.getTime()!=i.getTime()){this._oDateRange.setStartDate(new Date(i.getTime()))}else if(o&&!i){this._oDateRange.setStartDate(undefined)}}this.fireChangeEvent(e,{valid:this._bValid})}};b.prototype._getInputValue=function(t){t=typeof t=="undefined"?this._$input.val():t.toString();var e=this._parseValue(t,true);t=this._formatValue(e,true);return t};b.prototype.updateDomValue=function(t){if(this.isActive()&&this._$input.val()!==t){this._bCheckDomValue=true;t=typeof t=="undefined"?this._$input.val():t.toString();this._curpos=this._$input.cursorPos();var e=this._parseValue(t,true);t=this._formatValue(e);this._$input.val(t);if(document.activeElement===this._$input[0]){this._$input.cursorPos(this._curpos)}}return this};b.prototype._storeInputSelection=function(t){if((e.browser.msie||e.browser.edge)&&!e.support.touch){this._oInputSelBeforePopupOpen={iStart:t.selectionStart,iEnd:t.selectionEnd};t.selectionStart=0;t.selectionEnd=0}};b.prototype._restoreInputSelection=function(t){if((e.browser.msie||e.browser.edge)&&!e.support.touch){t.selectionStart=this._oInputSelBeforePopupOpen.iStart;t.selectionEnd=this._oInputSelBeforePopupOpen.iEnd}};function S(){this._createPopup();this._createPopupContent();var t;var e=this.getBinding("value");if(e&&e.oType&&e.oType.oOutputFormat){t=e.oType.oOutputFormat.oFormatOptions.calendarType}else if(e&&e.oType&&e.oType.oFormat){t=e.oType.oFormat.oFormatOptions.calendarType}if(!t){t=this.getDisplayFormatType()}if(t){this._getCalendar().setPrimaryCalendarType(t)}var a=this._bValid?this._formatValue(this.getDateValue()):this.getValue();if(a!=this._$input.val()){this.onChange()}this._fillDateRange();this._openPopup();this.fireNavigate({dateRange:this._getVisibleDatesRange(this._getCalendar()),afterPopupOpened:true})}b.prototype._createPopup=function(){var t,a;if(!this._oPopup){this._oPopup=new o(this.getId()+"-RP",{showCloseButton:false,showArrow:false,showHeader:false,placement:r.PlacementType.VerticalPreferedBottom,beginButton:new s({type:r.ButtonType.Emphasized,text:P.getText("DATEPICKER_SELECTION_CONFIRM"),press:this._handleOKButton.bind(this)}),afterOpen:w.bind(this),afterClose:M.bind(this)}).addStyleClass("sapMRPCalendar");if(this.getShowFooter()){this._oPopup.addStyleClass("sapMLandscapePadding")}this._oPopup._getPopup().setAutoClose(true);if(e.system.phone){t=this.$("inner").attr("aria-labelledby");a=t?document.getElementById(t).getAttribute("aria-label"):"";this._oPopup.setTitle(a);this._oPopup.setShowHeader(true);this._oPopup.setShowCloseButton(true)}else{this._oPopup._getPopup().setDurations(0,0);this._oPopup.setEndButton(new s({text:P.getText("DATEPICKER_SELECTION_CANCEL"),press:this._handleCancelButton.bind(this)}))}this.setAggregation("_popup",this._oPopup,true)}};b.prototype._openPopup=function(){if(!this._oPopup){return}this._storeInputSelection(this._$input.get(0));this._oPopup._getPopup().setAutoCloseAreas([this.getDomRef()]);this._oPopup.openBy(this)};b.prototype._getVisibleDatesRange=function(t){var e=t._getVisibleDays();return new y({startDate:e[0].toLocalJSDate(),endDate:e[e.length-1].toLocalJSDate()})};b.prototype._createPopupContent=function(){var t=this._getCalendarConstructor();if(!this._getCalendar()){this._oCalendar=new t(this.getId()+"-cal",{intervalSelection:this._bIntervalSelection,minDate:this.getMinDate(),maxDate:this.getMaxDate(),legend:this.getLegend(),startDateChange:function(){this.fireNavigate({dateRange:this._getVisibleDatesRange(this._getCalendar())})}.bind(this)});this._oDateRange=new y;this._getCalendar().addSelectedDate(this._oDateRange);this._getCalendar()._setSpecialDatesControlOrigin(this);this._getCalendar().attachCancel(V,this);this._getCalendar().setPopupMode(true);if(this.$().closest(".sapUiSizeCompact").length>0){this._getCalendar().addStyleClass("sapUiSizeCompact")}if(this._bSecondaryCalendarTypeSet){this._getCalendar().setSecondaryCalendarType(this.getSecondaryCalendarType())}if(this._bOnlyCalendar){this._getCalendar().attachSelect(this._handleCalendarSelect,this);this._getCalendar().attachEvent("_renderMonth",E,this);this._oPopup._getButtonFooter().setVisible(this.getShowFooter());this._getCalendar()._bSkipCancelButtonRendering=true;this._oPopup.addContent(this._getCalendar());if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}}}};b.prototype._getCalendarConstructor=function(){var t=this._getFormatter(true).aFormatArray.map(function(t){return t.type.toLowerCase()}),e=t.indexOf("day")>=0,a=t.indexOf("month")>=0||t.indexOf("monthstandalone")>=0,i=t.indexOf("year")>=0;if(e&&a&&i){return _}else if(a&&i){return m}else if(i){return C}else{g.warning("Not valid date pattern! Default Calendar constructor function is returned",this);return _}};b.prototype._fillDateRange=function(){var t=this.getDateValue();if(t&&t.getTime()>=this._oMinDate.getTime()&&t.getTime()<=this._oMaxDate.getTime()){this._getCalendar().focusDate(new Date(t.getTime()));if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=t.getTime()){this._oDateRange.setStartDate(new Date(t.getTime()))}}else{var e=this.getInitialFocusedDateValue();var a=e?e:new Date;var i=this._oMaxDate.getTime();if(a.getTime()<this._oMinDate.getTime()||a.getTime()>i){a=this._oMinDate}this._getCalendar().focusDate(a);if(this._oDateRange.getStartDate()){this._oDateRange.setStartDate(undefined)}}};b.prototype.getAccessibilityInfo=function(){var t=this.getRenderer();var e=a.prototype.getAccessibilityInfo.apply(this,arguments);var i=this.getValue()||"";if(this._bValid){var s=this.getDateValue();if(s){i=this._formatValue(s)}}e.type=P.getText("ACC_CTR_TYPE_DATEINPUT");e.description=[i,t.getLabelledByAnnouncement(this),t.getDescribedByAnnouncement(this)].join(" ").trim();return e};b.prototype._selectDate=function(){var t=this.getDateValue(),a=this._getSelectedDate(),i="";if(!h(a,t)){this.setDateValue(new Date(a.getTime()));i=this.getValue();this.fireChangeEvent(i,{valid:true});this._focusInput()}else if(!this._bValid){i=this._formatValue(a);if(i!=this._$input.val()){this._bValid=true;if(this.getDomRef()){this._$input.val(i);this.setLastValue(i)}i=this._formatValue(a,true);this.setProperty("value",i,true);this.fireChangeEvent(i,{valid:true});this._focusInput()}}else if(e.system.desktop||!e.support.touch){this.focus()}this._oPopup.close()};b.prototype._handleCalendarSelect=function(){if(this.getShowFooter()){this._oPopup.getBeginButton().setEnabled(true);return}this._selectDate()};b.prototype._focusInput=function(){if(this.getDomRef()&&(e.system.desktop||!e.support.touch)){this._curpos=this._$input.val().length;this._$input.cursorPos(this._curpos)}return this};b.prototype._getCalendar=function(){return this._oCalendar};b.prototype._getSelectedDate=function(){var t=this._getCalendar().getSelectedDates(),e;if(t.length>0){e=t[0].getStartDate()}return e};b.prototype._handleOKButton=function(){this._selectDate()};b.prototype._handleCancelButton=function(){if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}this._oPopup.close()};function V(t){if(this.isOpen()){this._oPopup.close();if(e.system.desktop||!e.support.touch){this.focus()}}}b.prototype._increaseDate=function(t,e){var a=this.getDateValue();var i=this._$input.cursorPos();if(a&&this.getEditable()&&this.getEnabled()){var s;var o=this.getBinding("value");if(o&&o.oType&&o.oType.oOutputFormat){s=o.oType.oOutputFormat.oFormatOptions.calendarType}else if(o&&o.oType&&o.oType.oFormat){s=o.oType.oFormat.oFormatOptions.calendarType}if(!s){s=this.getDisplayFormatType()}var r=n.getInstance(new Date(a.getTime()),s);a=n.getInstance(new Date(a.getTime()),s);switch(e){case"day":r.setDate(r.getDate()+t);break;case"month":r.setMonth(r.getMonth()+t);var p=(a.getMonth()+t)%12;if(p<0){p=12+p}while(r.getMonth()!=p){r.setDate(r.getDate()-1)}break;case"year":r.setFullYear(r.getFullYear()+t);while(r.getMonth()!=a.getMonth()){r.setDate(r.getDate()-1)}break;default:break}if(r.getTime()<this._oMinDate.getTime()){r=new n(this._oMinDate.getTime())}else if(r.getTime()>this._oMaxDate.getTime()){r=new n(this._oMaxDate.getTime())}if(!h(this.getDateValue(),r.getJSDate())){this.setDateValue(new Date(r.getTime()));this._curpos=i;this._$input.cursorPos(this._curpos);var u=this.getValue();this.fireChangeEvent(u,{valid:true})}}};b.prototype._getSpecialDates=function(){var t=this.getSpecialDates();for(var e=0;e<t.length;e++){var a=t[e].getSecondaryType()===v.CalendarDayType.NonWorking&&t[e].getType()!==v.CalendarDayType.NonWorking;if(a){var i=new D;i.setType(t[e].getSecondaryType());i.setStartDate(t[e].getStartDate());if(t[e].getEndDate()){i.setEndDate(t[e].getEndDate())}t.push(i)}}return t};function w(){this.addStyleClass(a.ICON_PRESSED_CSS_CLASS);this._renderedDays=this._getCalendar().$("-Month0-days").find(".sapUiCalItem").length;this.$("inner").attr("aria-owns",this.getId()+"-cal");this.$("inner").attr("aria-expanded",true);c.addPopoverInstance(this._oPopup);this._getCalendar().focus()}function M(){if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}this.removeStyleClass(a.ICON_PRESSED_CSS_CLASS);this.$("inner").attr("aria-expanded",false);this._restoreInputSelection(this._$input.get(0));this._getCalendar()._closedPickers();c.removePopoverInstance(this._oPopup)}function E(t){var e=t.getParameter("days"),a=this._oPopup._getPopup();if(e>this._renderedDays){this._renderedDays=e;a._applyPosition(a._oLastPosition)}}function I(t){var e=sap.ui.require("sap/ui/unified/DateTypeRange");if(t&&!(e&&t instanceof e)){throw new Error(t+'is not valid for aggregation "specialDates" of '+this)}}function F(){if(this.isOpen()){this._getCalendar()._bDateRangeChanged=false;this._getCalendar().invalidate()}}return b});