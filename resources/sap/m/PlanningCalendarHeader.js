/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Control","./library","./Toolbar","./AssociativeOverflowToolbar","./Button","./AdditionalTextButton","./Popover","./Title","./ToolbarSpacer","./SegmentedButton","sap/ui/unified/Calendar","sap/ui/unified/calendar/CustomMonthPicker","sap/ui/unified/calendar/CustomYearPicker","sap/ui/unified/calendar/IndexPicker","sap/ui/core/Configuration","sap/ui/core/date/CalendarWeekNumbering","sap/ui/unified/calendar/CalendarDate","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/core/library","./PlanningCalendarHeaderRenderer"],function(e,t,i,r,o,a,n,s,p,c,l,h,d,u,_,g,P,y,f,C,T,k){"use strict";var v=i.ToolbarDesign;var m=t.extend("sap.m.PlanningCalendarHeader",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:""},startDate:{type:"object",group:"Data"},pickerText:{type:"string",group:"Data"},pickerTextInSecondaryType:{type:"string",group:"Data"},calendarWeekNumbering:{type:"sap.ui.core.date.CalendarWeekNumbering",group:"Appearance",defaultValue:null},_primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"},_secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"}},aggregations:{actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},_actionsToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_navigationToolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"},_calendarPicker:{type:"sap.ui.unified.Calendar",multiple:false,visibility:"hidden"},_monthPicker:{type:"sap.ui.unified.internal.CustomMonthPicker",multiple:false,visibility:"hidden"},_yearPicker:{type:"sap.ui.unified.internal.CustomYearPicker",multiple:false,visibility:"hidden"},_indexPicker:{type:"sap.ui.unified.calendar.IndexPicker",multiple:false,visibility:"hidden"}},events:{pressPrevious:{},pressToday:{},pressNext:{},dateSelect:{},cancel:{},viewChange:{}},associations:{currentPicker:{type:"sap.ui.core.Control",multiple:false}}},renderer:k});var A=3;m.prototype.init=function(){var t=this.getId(),i=t+"-NavToolbar",s=sap.ui.getCore().getLibraryResourceBundle("sap.m"),p=this.getProperty("_primaryCalendarType"),c,l,g,P;this.setAggregation("_actionsToolbar",new o(t+"-ActionsToolbar",{design:v.Transparent}).addStyleClass("sapMPCHeadActionsToolbar").addContent(this._getOrCreateTitleControl()).addContent(this._getOrCreateToolbarSpacer()).addContent(this._getOrCreateViewSwitch()));this._oPrevBtn=new a(i+"-PrevBtn",{icon:f.getIconURI("slim-arrow-left"),tooltip:s.getText("PCH_NAVIGATE_BACKWARDS"),press:function(){this.firePressPrevious()}.bind(this)});this._oTodayBtn=new a(i+"-TodayBtn",{text:s.getText("PLANNINGCALENDAR_TODAY"),ariaLabelledBy:C.getStaticId("sap.m","PCH_NAVIGATE_TO_TODAY"),press:function(){this.firePressToday()}.bind(this)});this._oNextBtn=new a(i+"-NextBtn",{icon:f.getIconURI("slim-arrow-right"),tooltip:s.getText("PCH_NAVIGATE_FORWARD"),press:function(){this.firePressNext()}.bind(this)});l=new h(t+"-Cal",{ariaLabelledBy:C.getStaticId("sap.m","PCH_RANGE_PICKER"),calendarWeekNumbering:this.getCalendarWeekNumbering(),primaryCalendarType:p});l.attachEvent("select",this._handlePickerDateSelect,this);l.attachEvent("cancel",this._handlePickerCancelEvent,this);this.setAggregation("_calendarPicker",l);this._oCalendarAfterRenderDelegate={onAfterRendering:function(){if(this._oPopup&&this._oPopup.isOpen()){l.focus()}}.bind(this)};l.addDelegate(this._oCalendarAfterRenderDelegate);this._oCalendar=l;this.setAssociation("currentPicker",l);g=new d(t+"-MonthCal",{ariaLabelledBy:C.getStaticId("sap.m","PCH_RANGE_PICKER"),primaryCalendarType:p});g.attachEvent("select",this._handlePickerDateSelect,this);g.attachEvent("cancel",this._handlePickerCancelEvent,this);this.setAggregation("_monthPicker",g);this._oMonthPicker=g;P=new u(t+"-YearCal",{ariaLabelledBy:C.getStaticId("sap.m","PCH_RANGE_PICKER"),primaryCalendarType:p});P.attachEvent("select",this._handlePickerDateSelect,this);P.attachEvent("cancel",this._handlePickerCancelEvent,this);this.setAggregation("_yearPicker",P);this._oYearPicker=P;var y=new _(t+"-IndexPicker");y.attachEvent("select",this._handleIndexPickerSelect,this);this.setAggregation("_indexPicker",y);this._oIndexPicker=y;this._oPickerBtn=new n(i+"-PickerBtn",{text:this.getPickerText(),additionalText:this.getPickerTextInSecondaryType(),ariaHasPopup:T.aria.HasPopup.Dialog,ariaLabelledBy:C.getStaticId("sap.m","PCH_SELECT_RANGE"),press:function(){if(this.fireEvent("_pickerButtonPress",{},true)){var t=this.getStartDate()||new Date,i=this.getAssociation("currentPicker");c=e.registry.get(i);if(c.displayDate){c.displayDate(t)}c.setCalendarWeekNumbering&&c.setCalendarWeekNumbering(this.getCalendarWeekNumbering());this._openCalendarPickerPopup(c)}}.bind(this)});this.setAggregation("_navigationToolbar",new r(i,{design:v.Transparent,content:[this._oPrevBtn,this._oTodayBtn,this._oNextBtn,this._oPickerBtn]}).addStyleClass("sapMPCHeadNavToolbar"))};m.prototype.exit=function(){this._getActionsToolbar().removeAllContent();if(this._oTitle){this._oTitle.destroy();this._oTitle=null}if(this._oToolbarSpacer){this._oToolbarSpacer.destroy();this._oToolbarSpacer=null}if(this._oViewSwitch){this._oViewSwitch.destroy();this._oViewSwitch=null}if(this._oPopup){if(this._oCalendarAfterRenderDelegate){this._oCalendar.removeDelegate(this._oCalendarAfterRenderDelegate)}this._oPopup.destroy();this._oPopup=null}if(this._oPrevBtn){this._oPrevBtn.destroy();this._oPrevBtn=null}if(this._oNextBtn){this._oNextBtn.destroy();this._oNextBtn=null}};m.prototype.onBeforeRendering=function(){var e=!!this.getActions().length||!!this.getTitle()||this._getOrCreateViewSwitch().getItems().length>1;var t=this.getProperty("_secondaryCalendarType");this._getActionsToolbar().setProperty("visible",e,true);this.setPrimaryCalendarTypeToPickers(this.getProperty("_primaryCalendarType"));if(t){this.setSecondaryCalendarTypeToPickers(t)}};m.prototype.setTitle=function(e){this._getOrCreateTitleControl().setText(e).setVisible(!!e);return this.setProperty("title",e)};m.prototype.addAction=function(e){if(!e){return this}this._getActionsToolbar().addContent(e);return this.addAggregation("actions",e)};m.prototype.insertAction=function(e,t){if(!e){return this}this._getActionsToolbar().insertContent(e,t+A);return this.insertAggregation("actions",e,t)};m.prototype.removeAction=function(e){if(!e){return this}this._getActionsToolbar().removeContent(e);return this.removeAggregation("actions",e)};m.prototype.removeAllActions=function(){var e=this._getActionsToolbar(),t=e.getContent();for(var i=A;i<t.length;i++){e.removeContent(t[i])}return this.removeAllAggregation("actions")};m.prototype.destroyActions=function(){var e=this._getActionsToolbar(),t=e.getContent(),i;for(var r=A;r<t.length;r++){i=e.removeContent(t[r]);i.destroy()}return this};m.prototype.updatePickerText=function(e){if(!e){return this}this.setPickerText(e.primaryType);this.setPickerTextInSecondaryType(e.secondaryType);return true};m.prototype.setPickerTextInSecondaryType=function(e){this.setProperty("pickerTextInSecondaryType",e);this._oPickerBtn.setAdditionalText(e);return this};m.prototype.setPickerText=function(e){if(!e){return this}this.setProperty("pickerText",e);this._oPickerBtn.setText(e);return this};m.prototype.setPrimaryCalendarTypeToPickers=function(e){this._oCalendar.setPrimaryCalendarType(e);this._oMonthPicker.setPrimaryCalendarType(e);this._oYearPicker.setPrimaryCalendarType(e)};m.prototype.setSecondaryCalendarTypeToPickers=function(e){this._oCalendar.setSecondaryCalendarType(e);this._oMonthPicker.setSecondaryCalendarType(e);this._oYearPicker.setSecondaryCalendarType(e)};m.prototype._getOrCreateTitleControl=function(){if(!this._oTitle){this._oTitle=new p(this.getId()+"-Title",{visible:false})}return this._oTitle};m.prototype._getOrCreateToolbarSpacer=function(){if(!this._oToolbarSpacer){this._oToolbarSpacer=new c(this.getId()+"-Spacer")}return this._oToolbarSpacer};m.prototype._getOrCreateViewSwitch=function(){if(!this._oViewSwitch){this._oViewSwitch=new l(this.getId()+"-ViewSwitch",{ariaLabelledBy:C.getStaticId("sap.m","PCH_VIEW_SWITCH")});this._oViewSwitch.attachEvent("selectionChange",this._handleViewSwitchChange,this);this.addDependent(this._oViewSwitch)}return this._oViewSwitch};m.prototype._convertViewSwitchToSelect=function(){this._oViewSwitch._bForcedSelectMode=true;this._oViewSwitch._toSelectMode()};m.prototype._convertViewSwitchToSegmentedButton=function(){this._oViewSwitch._bForcedSelectMode=false;this._oViewSwitch._toNormalMode()};m.prototype._getTodayButton=function(){return this._oTodayBtn};m.prototype._handlePickerDateSelect=function(){var t=this.getAssociation("currentPicker"),i=e.registry.get(t),r=i.getSelectedDates()[0].getStartDate();this.setStartDate(r);this._closeCalendarPickerPopup();this.fireDateSelect()};m.prototype._handleIndexPickerSelect=function(e){var t=this._oIndexPicker.getSelectedIndex();var i=new Date(this._oCalendar.getMinDate());var r=this._getRelativeInfo();i.setDate(i.getDate()+t*r.iIntervalSize);this.setStartDate(i);this._closeCalendarPickerPopup();this.fireDateSelect()};m.prototype._handleViewSwitchChange=function(e){this.fireViewChange(e.getParameters())};m.prototype._openCalendarPickerPopup=function(e){var t,i;if(!this._oPopup){this._oPopup=this._createPopup()}t=this._oPopup.getContent();if(t.length){i=this._oPopup.getContent()[0];if(i.isA("sap.ui.unified.internal.CustomYearPicker")){this.setAggregation("_yearPicker",this._oPopup.removeAllContent()[0])}else if(i.isA("sap.ui.unified.internal.CustomMonthPicker")){this.setAggregation("_monthPicker",this._oPopup.removeAllContent()[0])}else if(i.isA("sap.ui.unified.calendar.IndexPicker")){this.setAggregation("_indexPicker",this._oPopup.removeAllContent()[0])}else if(e!==i){this.setAggregation("_calendarPicker",this._oPopup.removeAllContent()[0])}}this._oPopup.addContent(e);this._oPopup.attachAfterOpen(function(){var e=this._oPopup.$();var t=Math.floor((e.width()-this._oPickerBtn.$().width())/2);this._oPopup.setOffsetX(g.getRTL()?t:-t);var i=this._oPickerBtn.$().height();this._oPopup.setOffsetY(this._oPopup._getCalculatedPlacement()==="Top"?i:-i);this._oPopup.getContent()[0].focus()},this);this._oPopup.openBy(this._oPickerBtn.getDomRef())};m.prototype._createPopup=function(){var e=new s({placement:"VerticalPreferredBottom",showHeader:false,showArrow:false,verticalScrolling:false});e.oPopup.setDurations(0,0);e.addDelegate({onsapescape:this.onsapescape},this);this._oPopup=e;return this._oPopup};m.prototype.onsapescape=function(){if(this._oPopup){this._closeCalendarPickerPopup();if(this._oPickerBtn.getDomRef()){this._oPickerBtn.getDomRef().focus()}}};m.prototype._closeCalendarPickerPopup=function(){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close()}};m.prototype._handlePickerCancelEvent=function(){var e=this._oPickerBtn.getDomRef();this.fireCancel();this._closeCalendarPickerPopup();e&&e.focus()};m.prototype._getActionsToolbar=function(){return this.getAggregation("_actionsToolbar")};m.prototype._getNavigationToolbar=function(){return this.getAggregation("_navigationToolbar")};return m});
//# sourceMappingURL=PlanningCalendarHeader.js.map