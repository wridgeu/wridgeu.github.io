/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/Device","sap/ui/core/Element","sap/ui/core/format/TimezoneUtil","sap/ui/core/format/DateFormat","./InputBase","./DateTimeField","./Button","./ResponsivePopover","sap/ui/core/date/UniversalDate","./library","sap/ui/core/Control","sap/ui/core/library","./DatePickerRenderer","sap/base/util/deepEqual","sap/base/assert","sap/base/Log","sap/ui/core/IconPool","./InstanceManager","sap/ui/unified/Calendar","sap/ui/unified/DateRange","sap/ui/unified/DateTypeRange","sap/ui/unified/calendar/CustomMonthPicker","sap/ui/unified/calendar/CustomYearPicker","sap/ui/core/LabelEnablement","sap/ui/unified/library","sap/ui/core/Configuration","sap/ui/core/date/CalendarWeekNumbering","sap/ui/dom/jquery/cursorPos"],function(jQuery,e,t,a,i,s,r,o,n,p,l,u,h,d,g,f,c,_,y,D,m,C,v,P,T,b,V,S){"use strict";var w=h.CalendarType;var M=sap.ui.getCore().getLibraryResourceBundle("sap.m");var R=r.extend("sap.m.DatePicker",{metadata:{library:"sap.m",properties:{displayFormatType:{type:"string",group:"Appearance",defaultValue:""},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null},showFooter:{type:"boolean",group:"Misc",defaultValue:false},showCurrentDateButton:{type:"boolean",group:"Behavior",defaultValue:false},hideInput:{type:"boolean",group:"Misc",defaultValue:false},calendarWeekNumbering:{type:"sap.ui.core.date.CalendarWeekNumbering",group:"Appearance",defaultValue:null}},aggregations:{specialDates:{type:"sap.ui.core.Element",multiple:true,singularName:"specialDate"},_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},associations:{legend:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{parameters:{dateRange:{type:"sap.ui.unified.DateRange"},afterPopupOpened:{type:"boolean"}}},afterValueHelpOpen:{},afterValueHelpClose:{}},designtime:"sap/m/designtime/DatePicker.designtime",dnd:{draggable:false,droppable:true}},renderer:d});R.prototype.init=function(){r.prototype.init.apply(this,arguments);this._bIntervalSelection=false;this._bOnlyCalendar=true;this._bValid=true;this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1);this._oMaxDate=new Date(9999,11,31,23,59,59,999);var e=this.addEndIcon({id:this.getId()+"-icon",src:this.getIconSrc(),noTabStop:true,decorative:false,useIconTooltip:false,alt:M.getText("OPEN_PICKER_TEXT")});this._bShouldClosePicker=false;e.addEventDelegate({onmousedown:function(e){this._bShouldClosePicker=!!this.isOpen()}},this);e.attachPress(function(){this.toggleOpen(this._bShouldClosePicker)},this)};R.prototype.isValidValue=function(){return this._bValid};R.prototype.isOpen=function(){return this._oPopup&&this._oPopup.isOpen()};R.prototype.toggleOpen=function(e){if(this.getEditable()&&this.getEnabled()){if(e){F.call(this)}else{E.call(this)}}};R.prototype.getIconSrc=function(){return _.getIconURI("appointment-2")};R.prototype.exit=function(){s.prototype.exit.apply(this,arguments);if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close()}delete this._oPopup}if(this._getCalendar()){if(this._oCalendarAfterRenderDelegate){this._getCalendar().removeDelegate(this._oCalendarAfterRenderDelegate)}this._getCalendar().destroy();delete this._getCalendar()}if(this._iInvalidateCalendar){clearTimeout(this._iInvalidateCalendar)}this._sUsedDisplayPattern=undefined;this._sUsedDisplayCalendarType=undefined;this._oDisplayFormat=undefined;this._sUsedValuePattern=undefined;this._sUsedValueCalendarType=undefined;this._oValueFormat=undefined};R.prototype.invalidate=function(e){if(!e||e!=this._getCalendar()){u.prototype.invalidate.apply(this,arguments);this._iInvalidateCalendar=setTimeout(B.bind(this),0)}};R.prototype.onBeforeRendering=function(){r.prototype.onBeforeRendering.apply(this,arguments);this._checkMinMaxDate();var e=this._getValueHelpIcon();if(e){e.setProperty("visible",this.getEditable(),true)}};R.prototype.setDisplayFormat=function(e){this.setProperty("displayFormat",e);if(this._oCalendar){this._oCalendar.removeDelegate(this._oCalendarAfterRenderDelegate);this._oCalendar.destroy();this._oCalendar=null;this._createPopupContent()}return this};R.prototype.setWidth=function(e){return s.prototype.setWidth.call(this,e||"100%")};R.prototype.getWidth=function(e){return this.getProperty("width")||"100%"};R.prototype.applyFocusInfo=function(t){this._bFocusNoPopup=true;if(!e.support.touch||e.system.desktop){s.prototype.applyFocusInfo.apply(this,arguments)}};R.prototype.onfocusin=function(e){if(!jQuery(e.target).hasClass("sapUiIcon")){r.prototype.onfocusin.apply(this,arguments)}this._bFocusNoPopup=undefined};R.prototype.onsapshow=function(e){this.toggleOpen(this.isOpen());e.preventDefault()};R.prototype.onsaphide=R.prototype.onsapshow;R.prototype.onsappageup=function(e){var t=this._getCalendarConstructor().getMetadata().getName();e.preventDefault();if(t!="sap.ui.unified.Calendar"){return}this._increaseDate(1,"day")};R.prototype.onsappageupmodifiers=function(e){var t=this._getCalendarConstructor().getMetadata().getName();e.preventDefault();if(!e.ctrlKey&&e.shiftKey){if(t=="sap.ui.unified.internal.CustomYearPicker"){return}this._increaseDate(1,"month")}else{this._increaseDate(1,"year")}};R.prototype.onsappagedown=function(e){var t=this._getCalendarConstructor().getMetadata().getName();e.preventDefault();if(t!="sap.ui.unified.Calendar"){return}this._increaseDate(-1,"day")};R.prototype.onsappagedownmodifiers=function(e){var t=this._getCalendarConstructor().getMetadata().getName();e.preventDefault();if(!e.ctrlKey&&e.shiftKey){if(t=="sap.ui.unified.internal.CustomYearPicker"){return}this._increaseDate(-1,"month")}else{this._increaseDate(-1,"year")}};R.prototype.onkeypress=function(e){if(!e.charCode||e.metaKey||e.ctrlKey){return}var t=this._getFormatter(true);var a=String.fromCharCode(e.charCode);if(a&&t.sAllowedCharacters&&t.sAllowedCharacters.indexOf(a)<0){e.preventDefault()}};R.prototype._getValueHelpIcon=function(){var e=this.getAggregation("_endIcon");return e&&e[0]};R.prototype._dateValidation=function(e){this._bValid=true;if(e&&(e.getTime()<this._oMinDate.getTime()||e.getTime()>this._oMaxDate.getTime())){this._bValid=false;f(this._bValid,"Date must be in valid range")}this.setProperty("dateValue",e);return e};R.prototype.setMinDate=function(e){if(!this._isValidDate(e)){throw new Error("Date must be a JavaScript date object; "+this)}if(g(this.getMinDate(),e)){return this}if(e){var t=e.getFullYear();if(t<1||t>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this)}this._oMinDate=new Date(e.getTime());var a=this.getDateValue();if(a&&a.getTime()<e.getTime()){this._bValid=false;this._bOutOfAllowedRange=true;c.warning("DateValue not in valid date range",this)}}else{this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1)}this.setProperty("minDate",e);if(this._getCalendar()){this._getCalendar().setMinDate(e)}this._oMinDate.setHours(0,0,0,0);return this};R.prototype.setMaxDate=function(e){if(!this._isValidDate(e)){throw new Error("Date must be a JavaScript date object; "+this)}if(g(this.getMaxDate(),e)){return this}if(e){var t=e.getFullYear();if(t<1||t>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this)}this._oMaxDate=new Date(e.getTime());var a=this.getDateValue();if(a&&a.getTime()>e.getTime()){this._bValid=false;this._bOutOfAllowedRange=true;c.warning("DateValue not in valid date",this)}}else{this._oMaxDate=new Date(9999,11,31,23,59,59,999)}this.setProperty("maxDate",e);if(this._getCalendar()){this._getCalendar().setMaxDate(e)}this._oMaxDate.setHours(23,59,59,999);return this};R.prototype.setCurrentDateButton=function(e){var t=this._getCalendar();t&&t.setCurrentDateButton(e);return this.setProperty("showCurrentDateButton",e)};R.prototype._checkMinMaxDate=function(){if(this._oMinDate.getTime()>this._oMaxDate.getTime()){c.warning("minDate > MaxDate -> dates switched",this);var e=new Date(this._oMinDate.getTime());var t=new Date(this._oMaxDate.getTime());this._oMinDate=new Date(t.getTime());this._oMaxDate=new Date(e.getTime());this.setProperty("minDate",t,true);this.setProperty("maxDate",e,true);if(this._getCalendar()){this._getCalendar().setMinDate(t);this._getCalendar().setMaxDate(e)}}var a=this.getDateValue();if(a&&(a.getTime()<this._oMinDate.getTime()||a.getTime()>this._oMaxDate.getTime())){this._bValid=false;c.error("dateValue "+a.toString()+"(value="+this.getValue()+") does not match "+"min/max date range("+this._oMinDate.toString()+" - "+this._oMaxDate.toString()+"). App. "+"developers should take care to maintain dateValue/value accordingly.",this)}};R.prototype.getDisplayFormatType=function(){return this.getProperty("displayFormatType")};R.prototype._handleDateValidation=function(e){this._bValid=true;if(!e||e.getTime()<this._oMinDate.getTime()||e.getTime()>this._oMaxDate.getTime()){this._bValid=false;c.warning("Value can not be converted to a valid date",this)}var t=this._formatValue(e,true);if(t!==this.getValue()){this.setLastValue(t)}this.setProperty("value",t);this.setProperty("dateValue",e)};R.prototype.setDisplayFormatType=function(e){if(e){var t=false;for(var a in w){if(a==e){t=true;break}}if(!t){throw new Error(e+" is not a valid calendar type"+this)}}this.setProperty("displayFormatType",e,true);this.setDisplayFormat(this.getDisplayFormat());return this};R.prototype.setSecondaryCalendarType=function(e){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",e,true);if(this._getCalendar()){this._getCalendar().setSecondaryCalendarType(e)}return this};R.prototype.setShowFooter=function(e){var t=this._oPopup,a=this._getCalendar();this.setProperty("showFooter",e);if(!t||!a){return this}t._getButtonFooter().setVisible(e);return this};R.prototype.addSpecialDate=function(e){A.call(this,e);this.addAggregation("specialDates",e,true);B.call(this);return this};R.prototype.insertSpecialDate=function(e,t){A.call(this,e);this.insertAggregation("specialDates",e,t,true);B.call(this);return this};R.prototype.removeSpecialDate=function(e){var t=this.removeAggregation("specialDates",e,true);B.call(this);return t};R.prototype.removeAllSpecialDates=function(){var e=this.removeAllAggregation("specialDates",true);B.call(this);return e};R.prototype.destroySpecialDates=function(){this.destroyAggregation("specialDates",true);B.call(this);return this};R.prototype.setLegend=function(e){this.setAssociation("legend",e,true);var t=this.getLegend();if(t){var a=sap.ui.require("sap/ui/unified/CalendarLegend");e=sap.ui.getCore().byId(t);if(e&&!(typeof a=="function"&&e instanceof a)){throw new Error(e+" is not an sap.ui.unified.CalendarLegend. "+this)}}if(this._getCalendar()){this._getCalendar().setLegend(t)}return this};R.prototype.onChange=function(e){if(!this.getEditable()||!this.getEnabled()){return}var t=this._$input.val(),a=this._formatValue(this.getDateValue()),i;if(t==a&&this._bValid){return}if(this.getShowFooter()&&this._oPopup&&!t){this._oPopup.getBeginButton().setEnabled(false)}this._bValid=true;if(t!=""){i=this._parseValue(t,true);if(!i||i.getTime()<this._oMinDate.getTime()||i.getTime()>this._oMaxDate.getTime()){this._bValid=false;i=undefined}else{t=this._formatValue(i)}}if(this.getDomRef()&&this._$input.val()!==t){this._$input.val(t);this._curpos=this._$input.cursorPos()}if(i){t=this._formatValue(i,true)}if(this.getLastValue()!==t||i&&this.getDateValue()&&i.getFullYear()!==this.getDateValue().getFullYear()){this.setLastValue(t);this.setProperty("value",t,true);var s=this.getValue();if(this._bValid&&t==s){this.setProperty("dateValue",i,true)}t=s;if(this.isOpen()){if(this._bValid){i=this.getDateValue()}this._getCalendar().focusDate(i);var r=this._oDateRange.getStartDate();if(!r&&i||r&&i&&r.getTime()!=i.getTime()){this._oDateRange.setStartDate(new Date(i.getTime()))}else if(r&&!i){this._oDateRange.setStartDate(undefined)}}this.fireChangeEvent(t,{valid:this._bValid})}};R.prototype.updateDomValue=function(e){if(this.isActive()&&this._$input.val()!==e){this._bCheckDomValue=true;e=typeof e=="undefined"?this._$input.val():e.toString();this._curpos=this._$input.cursorPos();var t=this._parseValue(e,true);e=this._formatValue(t);if(this._bPreferUserInteraction){this.handleInputValueConcurrency(e)}else{this._$input.val(e);if(document.activeElement===this._$input[0]){this._$input.cursorPos(this._curpos)}}}return this};function E(e){this._createPopup();this._createPopupContent();var t;var a=this.getBinding("value");if(a&&a.oType&&a.oType.oOutputFormat){t=a.oType.oOutputFormat.oFormatOptions.calendarType}else if(a&&a.oType&&a.oType.oFormat){t=a.oType.oFormat.oFormatOptions.calendarType}if(!t){t=this.getDisplayFormatType()}if(t){this._getCalendar().setPrimaryCalendarType(t)}var i=this._bValid?this._formatValue(this.getDateValue()):this.getValue();if(i!=this._$input.val()){this.onChange()}this._fillDateRange();this._openPopup(e);this.fireNavigate({dateRange:this._getVisibleDatesRange(this._getCalendar()),afterPopupOpened:true})}R.prototype._createPopup=function(){var a="";if(!this._oPopup){this._oPopup=new n(this.getId()+"-RP",{showCloseButton:false,showArrow:false,showHeader:false,placement:l.PlacementType.VerticalPreferedBottom,contentWidth:this.$().closest(".sapUiSizeCompact").length>0?"18rem":"21rem",beginButton:new o({type:l.ButtonType.Emphasized,text:M.getText("DATEPICKER_SELECTION_CONFIRM"),press:this._handleOKButton.bind(this)}),afterOpen:I.bind(this),afterClose:x.bind(this)}).addStyleClass("sapMRPCalendar");if(this.getShowFooter()){this._oPopup.addStyleClass("sapMLandscapePadding")}this._oPopup._getPopup().setAutoClose(true);if(e.system.phone){a=T.getReferencingLabels(this).concat(this.getAriaLabelledBy()).reduce(function(e,a){var i=t.registry.get(a);return e+" "+(i.getText?i.getText():"")},"").trim();this._oPopup.setTitle(a);this._oPopup.setShowHeader(true);this._oPopup.setShowCloseButton(true)}else{this._oPopup._getPopup().setDurations(0,0);this._oPopup.setEndButton(new o({text:M.getText("DATEPICKER_SELECTION_CANCEL"),press:this._handleCancelButton.bind(this)}))}this.setAggregation("_popup",this._oPopup,true)}};R.prototype._openPopup=function(e){if(!this._oPopup){return}if(!e){e=this.getDomRef()}this._oPopup._getPopup().setExtraContent([e]);this._oPopup.openBy(e||this)};R.prototype.openBy=function(e){E.call(this,e)};R.prototype._getVisibleDatesRange=function(e){var t=e._getVisibleDays();return new m({startDate:t[0].toLocalJSDate(),endDate:t[t.length-1].toLocalJSDate()})};R.prototype._createPopupContent=function(){var e=this._getCalendarConstructor();if(!this._getCalendar()){this._oCalendar=new e(this.getId()+"-cal",{intervalSelection:this._bIntervalSelection,minDate:this.getMinDate(),maxDate:this.getMaxDate(),legend:this.getLegend(),calendarWeekNumbering:this.getCalendarWeekNumbering(),startDateChange:function(){this.fireNavigate({dateRange:this._getVisibleDatesRange(this._getCalendar())})}.bind(this)});this._oCalendar.setShowCurrentDateButton(this.getShowCurrentDateButton());this._oDateRange=new m;this._getCalendar().addSelectedDate(this._oDateRange);this._getCalendar()._setSpecialDatesControlOrigin(this);this._getCalendar().attachCancel(F,this);if(this.$().closest(".sapUiSizeCompact").length>0){this._getCalendar().addStyleClass("sapUiSizeCompact")}if(this._bSecondaryCalendarTypeSet){this._getCalendar().setSecondaryCalendarType(this.getSecondaryCalendarType())}if(this._bOnlyCalendar){this._getCalendar().attachSelect(this._handleCalendarSelect,this);this._getCalendar().attachEvent("_renderMonth",O,this);this._oPopup._getButtonFooter().setVisible(this.getShowFooter());this._getCalendar()._bSkipCancelButtonRendering=true;if(!this._oPopup.getContent().length){var t=this._getValueStateHeader();this._oPopup.addContent(this._getValueStateHeader());t.setPopup(this._oPopup._oControl)}this._oPopup.addContent(this._getCalendar());if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}}this._attachAfterRenderingDelegate()}};R.prototype._attachAfterRenderingDelegate=function(){this._oCalendarAfterRenderDelegate={onAfterRendering:function(){var e=this._oPopup&&this._oPopup._getPopup();e&&e._oLastPosition&&e._applyPosition(e._oLastPosition);if(this._oPopup.isOpen()){this._oCalendar.focus()}}.bind(this)};this._oCalendar.addDelegate(this._oCalendarAfterRenderDelegate)};R.prototype._getCalendarConstructor=function(){var e=this._getFormatter(true).aFormatArray.map(function(e){return e.type.toLowerCase()}),t=e.indexOf("day")>=0,a=e.indexOf("month")>=0||e.indexOf("monthstandalone")>=0,i=e.indexOf("year")>=0;if(t&&a&&i){return D}else if(a&&i){return v}else if(i){return P}else{c.warning("Not valid date pattern! Default Calendar constructor function is returned",this);return D}};R.prototype._fillDateRange=function(){var e;var t=this.getDateValue();if(t&&t.getTime()>=this._oMinDate.getTime()&&t.getTime()<=this._oMaxDate.getTime()){e=this._getPickerParser().format(t,this._getTimezone(true));t=this._getPickerParser().parse(e,a.getLocalTimezone())[0];this._getCalendar().focusDate(new Date(t.getTime()));if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=t.getTime()){this._oDateRange.setStartDate(new Date(t.getTime()))}}else{var i=this.getInitialFocusedDateValue();var s=i?i:new Date;e=this._getPickerParser().format(s,this._getTimezone(true));s=this._getPickerParser().parse(e,a.getLocalTimezone())[0];if(s.getTime()<this._oMinDate.getTime()){s=this._oMinDate}else if(s.getTime()>this._oMaxDate.getTime()){s=this._oMaxDate}this._getCalendar().focusDate(s);if(this._oDateRange.getStartDate()){this._oDateRange.setStartDate(undefined)}}};R.prototype.getAccessibilityInfo=function(){var e=this.getRenderer();var t=s.prototype.getAccessibilityInfo.apply(this,arguments);var a=this.getValue()||"";if(this._bValid){var i=this.getDateValue();if(i){a=this._formatValue(i)}}t.type=M.getText("ACC_CTR_TYPE_DATEINPUT");t.description=[a,e.getLabelledByAnnouncement(this),e.getDescribedByAnnouncement(this)].join(" ").trim();return t};R.prototype._selectDate=function(){var t=this.getDateValue(),i=this._getSelectedDate(),s="";var r=this._getPickerParser().format(i,a.getLocalTimezone());var o=this._getPickerParser().parse(r,this._getTimezone(true));i=o&&o[0];if(!g(i,t)){this.setDateValue(new Date(i.getTime()));s=this.getValue();this.fireChangeEvent(s,{valid:true});this._focusInput()}else if(!this._bValid){s=this._formatValue(i);if(s!=this._$input.val()){this._bValid=true;if(this.getDomRef()){this._$input.val(s);this.setLastValue(s)}s=this._formatValue(i,true);this.setProperty("value",s,true);this.fireChangeEvent(s,{valid:true});this._focusInput()}}else if(e.system.desktop||!e.support.touch){this.focus()}this._oPopup.close()};R.prototype._handleCalendarSelect=function(){if(this.getShowFooter()){this._oPopup.getBeginButton().setEnabled(true);return}this._selectDate()};R.prototype._getTimezone=function(e){return V.getTimezone()};R.prototype._focusInput=function(){if(this.getDomRef()&&(e.system.desktop||!e.support.touch)){this._curpos=this._$input.val().length;this._$input.cursorPos(this._curpos)}return this};R.prototype._getCalendar=function(){return this._oCalendar};R.prototype._getSelectedDate=function(){var e=this._getCalendar().getSelectedDates(),t;if(e.length>0){t=e[0].getStartDate()}return t};R.prototype._handleOKButton=function(){this._selectDate()};R.prototype._handleCancelButton=function(){if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}this._oPopup.close()};function F(t){if(this.isOpen()){this._oPopup.close();if(e.system.desktop||!e.support.touch){this.focus()}}}R.prototype._increaseDate=function(e,t){var a=this.getDateValue();var i=this._$input.cursorPos();if(a&&this.getEditable()&&this.getEnabled()){var s;var r=this.getBinding("value");if(r&&r.oType&&r.oType.oOutputFormat){s=r.oType.oOutputFormat.oFormatOptions.calendarType}else if(r&&r.oType&&r.oType.oFormat){s=r.oType.oFormat.oFormatOptions.calendarType}if(!s){s=this.getDisplayFormatType()}var o=p.getInstance(new Date(a.getTime()),s);a=p.getInstance(new Date(a.getTime()),s);switch(t){case"day":o.setDate(o.getDate()+e);break;case"month":o.setMonth(o.getMonth()+e);var n=(a.getMonth()+e)%12;if(n<0){n=12+n}while(o.getMonth()!=n){o.setDate(o.getDate()-1)}break;case"year":o.setFullYear(o.getFullYear()+e);while(o.getMonth()!=a.getMonth()){o.setDate(o.getDate()-1)}break;default:break}if(o.getTime()<this._oMinDate.getTime()){o=new p(this._oMinDate.getTime())}else if(o.getTime()>this._oMaxDate.getTime()){o=new p(this._oMaxDate.getTime())}if(!g(this.getDateValue(),o.getJSDate())){this.setDateValue(new Date(o.getTime()));this._curpos=i;this._$input.cursorPos(this._curpos);var l=this.getValue();this.fireChangeEvent(l,{valid:true})}}};R.prototype._getSpecialDates=function(){var e=this.getSpecialDates();for(var t=0;t<e.length;t++){var a=e[t].getSecondaryType()===b.CalendarDayType.NonWorking&&e[t].getType()!==b.CalendarDayType.NonWorking;if(a){var i=new C;i.setType(e[t].getSecondaryType());i.setStartDate(e[t].getStartDate());if(e[t].getEndDate()){i.setEndDate(e[t].getEndDate())}e.push(i)}}return e};function I(){this.addStyleClass(s.ICON_PRESSED_CSS_CLASS);this._renderedDays=this._getCalendar().$("-Month0-days").find(".sapUiCalItem").length;y.addPopoverInstance(this._oPopup);this._oCalendar.focus();this.fireAfterValueHelpOpen()}function x(){if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}this.removeStyleClass(s.ICON_PRESSED_CSS_CLASS);this._getCalendar()._closePickers();y.removePopoverInstance(this._oPopup);this.fireAfterValueHelpClose()}function O(e){var t=e.getParameter("days"),a=this._oPopup._getPopup();if(t>this._renderedDays){this._renderedDays=t;a._applyPosition(a._oLastPosition)}}function A(e){var t=sap.ui.require("sap/ui/unified/DateTypeRange");if(e&&!(t&&e instanceof t)){throw new Error(e+'is not valid for aggregation "specialDates" of '+this)}}function B(){if(this.isOpen()){this._getCalendar()._bDateRangeChanged=false;this._getCalendar().invalidate()}}R.prototype._getPickerParser=function(){if(!this._calendarParser){this._calendarParser=i.getDateTimeWithTimezoneInstance({showTimezone:false})}return this._calendarParser};return R});
//# sourceMappingURL=DatePicker.js.map