/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CalendarContentRenderer","sap/ui/core/ResizeHandler","sap/ui/integration/library","sap/ui/integration/cards/BaseContent","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/BindingResolver","sap/f/cards/loading/CalendarPlaceholder","sap/f/CalendarAppointmentInCard","sap/f/CalendarInCard","sap/f/PlanningCalendarInCardLegend","sap/m/library","sap/m/Button","sap/m/FlexBox","sap/ui/core/format/DateFormat","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/DateTypeRange","sap/ui/core/date/UniversalDate","sap/ui/unified/CalendarLegendItem","sap/ui/core/Configuration","sap/ui/core/date/UI5Date","sap/ui/unified/DateRange","sap/ui/core/Core"],function(t,e,a,i,n,s,o,r,l,p,d,g,h,m,c,u,f,D,_,I,C,y,S,A,T,b,v){"use strict";var L=a.CardActionArea;var M=i.extend("sap.ui.integration.cards.CalendarContent",{renderer:t,metadata:{library:"sap.ui.integration",properties:{visibleAppointmentsCount:{type:"int",group:"Data",defaultValue:2},noAppointmentsText:{type:"string",group:"Misc",defaultValue:null}},aggregations:{appointments:{type:"sap.f.CalendarAppointmentInCard",multiple:true,singularName:"appointment"}}}});M.prototype.changeMonth=function(t){this._oCalendar._getMonthPicker().setMonth(t);this._oCalendar._selectMonth();this.invalidate();this.getCardInstance().fireStateChanged()};M.prototype.changeDate=function(t){var e=this.getActions(),a=new b,i=this._oCalendar;a.setStartDate(t);i.destroySelectedDates();i.addAggregation("selectedDates",a);this._oFocusedDate=i.getSelectedDates()[0]?i.getSelectedDates()[0]:null;i.addSelectedDate(a);i._getYearPicker().setYear(t.getFullYear());i._getYearPicker().fireSelect();i._selectYear();this.changeMonth(t.getMonth());e.fireAction(this,"DateChange",{selectedDate:t})};M.prototype._createCardContent=function(){this._oCalendar=new l(this.getId()+"-navigation",{startDateChange:function(t){var e=t.getSource()._getFocusedDate().toLocalJSDate();this._handleStartDateChange(e)}.bind(this),select:function(t){var e=t.getSource().getSelectedDates()[0].getStartDate();this._setParameters(t,t.getParameter("startDate"));this._refreshVisibleAppointments(e);this.invalidate();this._handleSelect(e)}.bind(this)});this._oLegend=new p(this.getId()+"-legend",{columnWidth:"7.5rem",standardItems:[]});this._oCalendar.setLegend(this._oLegend);this._oContent=new h(this.getId()+"-wrapper",{items:[this._oCalendar,this._oLegend]});this.setAggregation("_content",this._oContent);this._oFormatAria=m.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' "+P.call(this).getTimePattern("medium")})};M.prototype.init=function(){this._aVisibleAppointments=[];i.prototype.init.apply(this,arguments);this._createCardContent()};M.prototype.exit=function(){if(this._sTwoColumnsResizeListener){e.deregister(this._sTwoColumnsResizeListener);this._sTwoColumnsResizeListener=undefined}i.prototype.exit.apply(this,arguments);if(this._oAppointmentTemplate){this._oAppointmentTemplate.destroy();this._oAppointmentTemplate=null}if(this._oSpecialDateTemplate){this._oSpecialDateTemplate.destroy();this._oSpecialDateTemplate=null}if(this._oCalendarLegendItemTemplate){this._oCalendarLegendItemTemplate.destroy();this._oCalendarLegendItemTemplate=null}if(this._oAppointmentLegendItemTemplate){this._oAppointmentLegendItemTemplate.destroy();this._oAppointmentLegendItemTemplate=null}if(this._bDataInitiallyLoaded){this._bDataInitiallyLoaded=null}};M.prototype.onDataChanged=function(){var t=this._oCalendar.getSelectedDates()[0]&&this._oCalendar.getSelectedDates()[0].getStartDate();if(!t){return}if(!this._bDataInitiallyLoaded){this._handleSelect(t);this._handleStartDateChange(t);this._bDataInitiallyLoaded=true}this._setParameters();this._refreshVisibleAppointments(t);this.invalidate()};M.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.apply(this,arguments);var t=this._oCalendar.getSelectedDates().length?this._oCalendar.getSelectedDates()[0].getStartDate():this._oCalendar.getStartDate();this._setParameters();this._refreshVisibleAppointments(t);this.getModel("parameters").setProperty("/visibleItems",this._iVisibleItems);this.getModel("parameters").setProperty("/allItems",this._iAllItems)};M.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.call(this,arguments);if(!this._sTwoColumnsResizeListener){this._sTwoColumnsResizeListener=e.register(this,this.resizeHandler);this.resizeHandler({control:this,target:this.getDomRef()})}};M.prototype.resizeHandler=function(t){t.control.toggleStyleClass("sapMPCInCardTwoColumns",t.target.getBoundingClientRect().width>576)};M.prototype.createLoadingPlaceholder=function(t){var e=this.getCardInstance(),a=e.getContentMinItems(t);return new o({minItems:a!==null?a:2,maxLegendItems:t.maxLegendItems?parseInt(t.maxLegendItems):2,item:t.item?t.item.template:{},legendItem:t.legendItem?t.legendItem.template:{}})};M.prototype.applyConfiguration=function(){var t=this.getParsedConfiguration();this.fireEvent("_actionContentReady");if(!t){return}if(t.item){this._addItem(t.item)}if(t.specialDate){this._addSpecialDate(t.specialDate)}if(t.legendItem){this._addLegendItem(t.legendItem)}if(t.date){this._addDate(t.date)}if(t.maxItems){this._addMaxItems(t.maxItems)}if(t.maxLegendItems){this._addMaxLegendItems(t.maxLegendItems)}if(t.noItemsText){this._addNoItemsText(t.noItemsText)}if(t.moreItems&&t.moreItems.actions){this._oActions.attach({area:L.Content,actions:t.moreItems.actions,control:this._getMoreButton()})}};M.prototype.getStaticConfiguration=function(){var t=this.getParsedConfiguration(),e=this.getAppointments(),a=this._oCalendar.getSpecialDates(),i=this._oCalendar.getLegend(),o=v.byId(i),r=o.getItems(),l=o.getAppointmentItems(),p=this._oCalendar.getSelectedDates()[0]?this._oCalendar.getSelectedDates()[0].getStartDate():null,d=this._oCalendar.getSelectedDates()[0]?this._oCalendar.getSelectedDates()[0]:null,g=d.getStartDate?d.getStartDate().getTime()+864e5:null,h=d.getStartDate(),m=t.maxItems,c=t.maxLegendItems,u=t.noItemsText,f=[],D=[],_=[],I=false,C;C=p?p.toISOString():null;C=C?C:t.date;e.forEach(function(e,a){var i=e.getStartDate(),o=e.getEndDate(),r,l,p=i>=h&&i<=g,d=o>=h&&o<=g,m=i<=h&&o>g,c=p||d||m;if(c){r=Object.keys(t.item.template);l={};r.forEach(function(e){var i=n.prependRelativePaths(t.item.template[e],this.getBindingPath("appointments")+"/"+a);l[e]=s.resolveValue(i,this)}.bind(this));l.startDate=new Date(l.startDate).toISOString();if(l.endDate){l.endDate=new Date(l.endDate).toISOString()}f.push(l);if(f.length>t.maxItems){I=true}}}.bind(this));a.forEach(function(e,a){var i=this._oCalendar,o=e.getStartDate(),r=e.getEndDate(),l=i._getMonthPicker().getMonth()?i._getMonthPicker().getMonth():i._getFocusedDate().getMonth(),p=Number(i._getYearString()),d=o.getMonth()===l,g=r?r.getMonth()===l:false,h=o.getFullYear()===p,m=e.getEndDate()?e.getEndDate().getFullYear()===p:h,c=(d||g)&&(h||m),u,f;if(c){u=Object.keys(t.specialDate.template);var _={};u.forEach(function(e){_[e]=n.prependRelativePaths(t.specialDate.template[e],this._oCalendar.getBindingPath("specialDates")+"/"+a)}.bind(this));f=s.resolveValue(_,this);f.startDate=new Date(f.startDate).toISOString();if(f.endDate){f.endDate=new Date(f.endDate).toISOString()}D.push(f)}}.bind(this));r.forEach(function(e,a){var i=Object.keys(t.legendItem.template),r={};i.forEach(function(e){var i=n.prependRelativePaths(t.legendItem.template[e],o.getBindingPath("items")+"/"+a);r[e]=s.resolveValue(i,this)}.bind(this));_.push(r)}.bind(this));l.forEach(function(e,a){var i=Object.keys(t.legendItem.template),r={};i.forEach(function(e){var i=n.prependRelativePaths(t.legendItem.template[e],o.getBindingPath("items")+"/"+a);r[e]=s.resolveValue(i,this)}.bind(this));_.push(r)}.bind(this));var y={};y.items=f;y.specialDates=D;y.legendItems=_;y.date=C;y.maxItems=m;y.maxLegendItems=c;y.noItemsText=u;if(I){y.moreItems=s.resolveValue(t.moreItems,this)}return y};M.prototype._setParameters=function(t,e){var a,i,n,s,o;if(e){a=e}else if(this._oCalendar.getSelectedDates().length){a=this._oCalendar.getSelectedDates()[0].getStartDate()}else{a=this._oCalendar.getStartDate()}i=T.getInstance(a.getFullYear(),a.getMonth(),a.getDate()).getTime();n=T.getInstance(a.getFullYear(),a.getMonth(),a.getDate()+1).getTime();s=this.getAppointments();if(s){o=s.filter(function(t){var e=t.getStartDate().getTime(),a=t.getEndDate().getTime();if(e>=i&&e<n||a>i&&a<=n||e<i&&a>n){return t}})}else{o=[]}this._iAllItems=o.length;this._iMaxItems=this.getVisibleAppointmentsCount();this._iVisibleItems=Math.min(this._iMaxItems,this._iAllItems);if(this.getModel("parameters")){this.getModel("parameters").setProperty("/visibleItems",this._iVisibleItems);this.getModel("parameters").setProperty("/allItems",this._iAllItems)}};M.prototype._refreshVisibleAppointments=function(t){this._aVisibleAppointments=this._calculateVisibleAppointments(this.getAppointments(),t)};M.prototype._calculateVisibleAppointments=function(t,e){var a=this._isAppointmentInSelectedDate(e);var i=function(t,a){var i=t.getEndDate(),n=T.getInstance();if(e.getDate()===n.getDate()&&e.getMonth()===n.getMonth()&&e.getFullYear()===n.getFullYear()){return this._iAllItems-a<this._iVisibleItems||i.getTime()>n.getTime()}return true};var n=t.filter(a,this).sort(this._sortByStartHourCB).filter(i,this).slice(0,this._iVisibleItems);return n};M.prototype._sortByStartHourCB=function(t,e){return t.getStartDate().getTime()-e.getStartDate().getTime()||e.getEndDate().getTime()-t.getEndDate().getTime()};M.prototype._isAppointmentInSelectedDate=function(t){return function(e){var a=e.getStartDate().getTime(),i=e.getEndDate().getTime(),n=t.getTime(),s=y.getInstance(T.getInstance(t.getTime())),o,r,l,p;s.setDate(s.getDate()+1);o=s.getTime()-1e3;r=a<n&&i>o;l=a>=n&&a<o;p=i>n&&i<=o;return r||l||p}};M.prototype._getVisibleAppointments=function(){return this._aVisibleAppointments};M.prototype.formatDate=function(t){var e=m.getDateTimeInstance({pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}).parse(t);if(!e){e=m.getInstance({pattern:"yyyy-MM-dd"}).parse(t)}return e};M.prototype._addItem=function(t){var e={title:t.template.title,text:t.template.text,type:t.template.type},a;if(t.template.startDate){e.startDate=n.formattedProperty(t.template.startDate,this.formatDate)}if(t.template.endDate){e.endDate=n.formattedProperty(t.template.endDate,this.formatDate)}if(t.template.icon&&t.template.icon.src){e.icon=n.formattedProperty(t.template.icon.src,function(t){return this._oIconFormatter.formatSrc(t)}.bind(this))}this._oAppointmentTemplate=new r(e);var i=this.getActions();i.attach({area:L.ContentItem,actions:t.template.actions,control:this,actionControl:this._oAppointmentTemplate,enabledPropertyName:"clickable",enabledPropertyValue:true,disabledPropertyValue:false});a={path:t.path,template:this._oAppointmentTemplate};this._bindAggregationToControl("appointments",this,a)};M.prototype._addSpecialDate=function(t){var e=t.template,a;if(e.startDate){e.startDate=n.formattedProperty(e.startDate,this.formatDate)}if(e.endDate){e.endDate=n.formattedProperty(e.endDate,this.formatDate)}this._oSpecialDateTemplate=new C(e);a={path:t.path,template:this._oSpecialDateTemplate};this._bindAggregationToControl("specialDates",this._oCalendar,a)};M.prototype._addLegendItem=function(t){var e={text:t.template.text,type:t.template.type},a={text:t.template.text,type:t.template.type},i,n;this._oCalendarLegendItemTemplate=new S(e);i={path:t.path,template:this._oCalendarLegendItemTemplate,filters:new f({path:"category",operator:D.Contains,value1:"calendar"})};this._bindAggregationToControl("items",this._oLegend,i);this._oAppointmentLegendItemTemplate=new S(a);n={path:t.path,template:this._oAppointmentLegendItemTemplate,filters:new f({path:"category",operator:D.Contains,value1:"appointment"})};this._bindAggregationToControl("appointmentItems",this._oLegend,n)};M.prototype._addDate=function(t){if(n.isBindingInfo(t)){if(!t){return}var e=new C;e.bindProperty("startDate",n.formattedProperty(t,this.formatDate));this._oCalendar.addSelectedDate(e)}else{this._oCalendar.addSelectedDate(new C({startDate:this.formatDate(t)}));var a=this.formatDate(t);this._handleSelect(a);this._handleStartDateChange(a);this._bDataInitiallyLoaded=true}};M.prototype._addMaxItems=function(t){if(n.isBindingInfo(t)){t&&this.bindProperty("visibleAppointmentsCount",t)}else{this.setVisibleAppointmentsCount(t)}};M.prototype._addMaxLegendItems=function(t){if(n.isBindingInfo(t)){t&&this._oLegend.bindProperty("visibleLegendItemsCount",t)}else{this._oLegend.setVisibleLegendItemsCount(t)}};M.prototype._addNoItemsText=function(t){if(n.isBindingInfo(t)){t&&this.bindProperty("noAppointmentsText",t)}else{this.setNoAppointmentsText(t)}};M.prototype._getMoreButton=function(){if(!this._oMoreAppsButton){this._oMoreAppsButton=new g({text:"More"})}return this._oMoreAppsButton};M.prototype._bNeedForMoreButton=function(){return this._iAllItems>this.getVisibleAppointmentsCount()};M.prototype._getCurrentAppointment=function(){var t=this._getVisibleAppointments(),e=T.getInstance(),a,i,n,s,o=this._oCalendar.getSelectedDates().length?this._oCalendar.getSelectedDates()[0].getStartDate():this._oCalendar.getStartDate();if(o.getDate()===e.getDate()&&o.getMonth()===e.getMonth()&&o.getFullYear()===e.getFullYear()){for(s=t.length-1;s>=0;s--){a=t[s];i=a.getStartDate().getTime();n=a.getEndDate().getTime();if(e.getTime()>i&&e.getTime()<n){return a}}}};M.prototype._handleStartDateChange=function(t){var e=this.getActions(),a=_.fromLocalJSDate(t),i=I._getFirstDateOfWeek(I._getFirstDateOfMonth(a)),n=new _(t.getFullYear(),t.getMonth()+1,1),s;n.setDate(n.getDate()-1);s=I._getFirstDateOfWeek(n);s.setDate(s.getDate()+6);e.fireAction(this,"MonthChange",{firstDate:i.toLocalJSDate(),lastDate:s.toLocalJSDate()})};M.prototype._handleSelect=function(t){var e=this.getActions();e.fireAction(this,"DateChange",{selectedDate:t})};function P(){if(!this._oLocaleData){var t=x.call(this);var e=new c(t);this._oLocaleData=u.getInstance(e)}return this._oLocaleData}function x(){if(!this._sLocale){this._sLocale=A.getFormatSettings().getFormatLocale().toString()}return this._sLocale}return M});
//# sourceMappingURL=CalendarContent.js.map