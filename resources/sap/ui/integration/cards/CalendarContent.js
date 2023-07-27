/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CalendarContentRenderer","sap/ui/core/ResizeHandler","sap/ui/integration/library","sap/ui/integration/cards/BaseContent","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/BindingResolver","sap/f/cards/loading/CalendarPlaceholder","sap/f/CalendarAppointmentInCard","sap/f/CalendarInCard","sap/f/PlanningCalendarInCardLegend","sap/m/library","sap/m/Button","sap/m/FlexBox","sap/ui/core/format/DateFormat","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/DateTypeRange","sap/ui/core/date/UniversalDate","sap/ui/unified/CalendarLegendItem","sap/ui/core/Configuration","sap/ui/core/date/UI5Date","sap/ui/unified/DateRange","sap/ui/core/Core"],function(t,e,a,i,n,s,o,r,l,p,d,g,m,h,c,u,f,D,_,I,C,y,S,A,v,T,b){"use strict";var L=a.CardActionArea;var M=i.extend("sap.ui.integration.cards.CalendarContent",{renderer:t,metadata:{library:"sap.ui.integration",properties:{visibleAppointmentsCount:{type:"int",group:"Data",defaultValue:2},noAppointmentsText:{type:"string",group:"Misc",defaultValue:null}},aggregations:{appointments:{type:"sap.f.CalendarAppointmentInCard",multiple:true,singularName:"appointment"}}}});M.prototype.changeMonth=function(t){var e=this._oCalendar,a=this._oCalendar.getSelectedDates()[0],i,n;i=a.getStartDate().getFullYear();n=new Date(i,t,1);e.focusDate(n);this.invalidate();this.getCardInstance().scheduleFireStateChanged()};M.prototype.changeDate=function(t){var e=this.getActions(),a=new T,i=this._oCalendar;a.setStartDate(t);i.destroySelectedDates();i.addAggregation("selectedDates",a);this._oFocusedDate=i.getSelectedDates()[0]?i.getSelectedDates()[0]:null;this.changeMonth(t.getMonth());e.fireAction(this,"DateChange",{selectedDate:t})};M.prototype._createCardContent=function(){this._oCalendar=new l(this.getId()+"-navigation",{startDateChange:function(t){var e=t.getSource()._getFocusedDate().toLocalJSDate();this._handleStartDateChange(e)}.bind(this),select:function(t){var e=t.getSource().getSelectedDates()[0].getStartDate();this._setParameters(t,t.getParameter("startDate"));this._refreshVisibleAppointments(e);this.invalidate();this._handleSelect(e)}.bind(this)});this._oLegend=new p(this.getId()+"-legend",{columnWidth:"7.5rem",standardItems:[]});this._oCalendar.setLegend(this._oLegend);this._oContent=new m(this.getId()+"-wrapper",{items:[this._oCalendar,this._oLegend]});this.setAggregation("_content",this._oContent);this._oFormatAria=h.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' "+x.call(this).getTimePattern("medium")})};M.prototype.init=function(){this._aVisibleAppointments=[];i.prototype.init.apply(this,arguments);this._createCardContent()};M.prototype.exit=function(){if(this._sTwoColumnsResizeListener){e.deregister(this._sTwoColumnsResizeListener);this._sTwoColumnsResizeListener=undefined}i.prototype.exit.apply(this,arguments);if(this._oAppointmentTemplate){this._oAppointmentTemplate.destroy();this._oAppointmentTemplate=null}if(this._oSpecialDateTemplate){this._oSpecialDateTemplate.destroy();this._oSpecialDateTemplate=null}if(this._oCalendarLegendItemTemplate){this._oCalendarLegendItemTemplate.destroy();this._oCalendarLegendItemTemplate=null}if(this._oAppointmentLegendItemTemplate){this._oAppointmentLegendItemTemplate.destroy();this._oAppointmentLegendItemTemplate=null}if(this._bDataInitiallyLoaded){this._bDataInitiallyLoaded=null}};M.prototype.onDataChanged=function(){var t=this._oCalendar.getSelectedDates()[0]&&this._oCalendar.getSelectedDates()[0].getStartDate();if(!t){return}if(!this._bDataInitiallyLoaded){this._handleSelect(t);this._handleStartDateChange(t);this._bDataInitiallyLoaded=true}this._setParameters();this._refreshVisibleAppointments(t);this.invalidate()};M.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.apply(this,arguments);var t=this._oCalendar.getSelectedDates().length?this._oCalendar.getSelectedDates()[0].getStartDate():this._oCalendar.getStartDate();this._setParameters();this._refreshVisibleAppointments(t);this.getModel("parameters").setProperty("/visibleItems",this._iVisibleItems);this.getModel("parameters").setProperty("/allItems",this._iAllItems)};M.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.call(this,arguments);if(!this._sTwoColumnsResizeListener){this._sTwoColumnsResizeListener=e.register(this,this.resizeHandler);this.resizeHandler({control:this,target:this.getDomRef()})}};M.prototype.resizeHandler=function(t){t.control.toggleStyleClass("sapMPCInCardTwoColumns",t.target.getBoundingClientRect().width>576)};M.prototype.createLoadingPlaceholder=function(t){var e=this.getCardInstance(),a=e.getContentMinItems(t);return new o({minItems:a!==null?a:2,maxLegendItems:t.maxLegendItems?parseInt(t.maxLegendItems):2,item:t.item?t.item.template:{},legendItem:t.legendItem?t.legendItem.template:{}})};M.prototype.applyConfiguration=function(){var t=this.getParsedConfiguration();this.fireEvent("_actionContentReady");if(!t){return}if(t.item){this._addItem(t.item)}if(t.specialDate){this._addSpecialDate(t.specialDate)}if(t.legendItem){this._addLegendItem(t.legendItem)}if(t.date){this._addDate(t.date)}if(t.maxItems){this._addMaxItems(t.maxItems)}if(t.maxLegendItems){this._addMaxLegendItems(t.maxLegendItems)}if(t.noItemsText){this._addNoItemsText(t.noItemsText)}if(t.moreItems&&t.moreItems.actions){this._oActions.attach({area:L.Content,actions:t.moreItems.actions,control:this._getMoreButton()})}};M.prototype._getStaticConfigurationLegendItems=function(t,e,a,i){var o=[];t.forEach(function(t,e){var r=Object.keys(a.legendItem.template),l={};r.forEach(function(t){var o=n.prependRelativePaths(a.legendItem.template[t],i.getBindingPath("items")+"/"+e);l[t]=s.resolveValue(o,this)}.bind(this));o.push(l)}.bind(this));e.forEach(function(t,e){var r=Object.keys(a.legendItem.template),l={};r.forEach(function(t){var o=n.prependRelativePaths(a.legendItem.template[t],i.getBindingPath("items")+"/"+e);l[t]=s.resolveValue(o,this)}.bind(this));o.push(l)}.bind(this));return o};M.prototype._getStaticConfigurationSpecialDates=function(t,e){var a=[];t.forEach(function(t,i){var o=this._oCalendar,r=t.getStartDate(),l=t.getEndDate(),p=o._getMonthPicker().getMonth()?o._getMonthPicker().getMonth():o._getFocusedDate().getMonth(),d=Number(o._getYearString()),g=r.getMonth()===p,m=l?l.getMonth()===p:false,h=r.getFullYear()===d,c=t.getEndDate()?t.getEndDate().getFullYear()===d:h,u=(g||m)&&(h||c),f,D;if(u){f=Object.keys(e.specialDate.template);var _={};f.forEach(function(t){_[t]=n.prependRelativePaths(e.specialDate.template[t],this._oCalendar.getBindingPath("specialDates")+"/"+i)}.bind(this));D=s.resolveValue(_,this);D.startDate=new Date(D.startDate).toISOString();if(D.endDate){D.endDate=new Date(D.endDate).toISOString()}a.push(D)}}.bind(this));return a};M.prototype._getStaticConfigurationAppointments=function(t,e,a,i){var o=[],r=false;t.forEach(function(t,l){var p=t.getStartDate(),d=t.getEndDate(),g,m,h=p>=e&&p<=a,c=d>=e&&d<=a,u=p<=e&&d>a,f=h||c||u;if(f){g=Object.keys(i.item.template);m={};g.forEach(function(t){var e=n.prependRelativePaths(i.item.template[t],this.getBindingPath("appointments")+"/"+l);m[t]=s.resolveValue(e,this)}.bind(this));m.startDate=new Date(m.startDate).toISOString();if(m.endDate){m.endDate=new Date(m.endDate).toISOString()}o.push(m);if(o.length>i.maxItems){r=true}}}.bind(this));return{resolvedItems:o,moreItems:r}};M.prototype.getStaticConfiguration=function(){var t=this.getParsedConfiguration(),e=this.getAppointments(),a=this._oCalendar.getSpecialDates(),i=this._oCalendar.getLegend(),n=b.byId(i),o=n.getItems(),r=n.getAppointmentItems(),l=this._oCalendar.getSelectedDates()[0]?this._oCalendar.getSelectedDates()[0].getStartDate():null,p=864e5,d=this._oCalendar.getSelectedDates()[0]?this._oCalendar.getSelectedDates()[0]:null,g=d.getStartDate?d.getStartDate().getTime()+p:null,m=d.getStartDate(),h=t.maxItems,c=t.maxLegendItems,u=t.noItemsText,f=false,D={},_,I,C,y,S;S=l?l.toISOString():null;S=S?S:t.date;_=this._getStaticConfigurationAppointments(e,m,g,t);y=_.resolvedItems;f=_.moreItems;I=this._getStaticConfigurationSpecialDates(a,t);C=this._getStaticConfigurationLegendItems(o,r,t,n);D.items=y;D.specialDates=I;D.legendItems=C;D.date=S;D.maxItems=h;D.maxLegendItems=c;D.noItemsText=u;if(f){D.moreItems=s.resolveValue(t.moreItems,this)}return D};M.prototype._setParameters=function(t,e){var a,i,n,s,o;if(e){a=e}else if(this._oCalendar.getSelectedDates().length){a=this._oCalendar.getSelectedDates()[0].getStartDate()}else{a=this._oCalendar.getStartDate()}i=v.getInstance(a.getFullYear(),a.getMonth(),a.getDate()).getTime();n=v.getInstance(a.getFullYear(),a.getMonth(),a.getDate()+1).getTime();s=this.getAppointments();if(s){o=s.filter(function(t){var e=t.getStartDate().getTime(),a=t.getEndDate().getTime();if(e>=i&&e<n||a>i&&a<=n||e<i&&a>n){return t}})}else{o=[]}this._iAllItems=o.length;this._iMaxItems=this.getVisibleAppointmentsCount();this._iVisibleItems=Math.min(this._iMaxItems,this._iAllItems);if(this.getModel("parameters")){this.getModel("parameters").setProperty("/visibleItems",this._iVisibleItems);this.getModel("parameters").setProperty("/allItems",this._iAllItems)}};M.prototype._refreshVisibleAppointments=function(t){this._aVisibleAppointments=this._calculateVisibleAppointments(this.getAppointments(),t)};M.prototype._calculateVisibleAppointments=function(t,e){var a=this._isAppointmentInSelectedDate(e);var i=function(t,a){var i=t.getEndDate(),n=v.getInstance();if(e.getDate()===n.getDate()&&e.getMonth()===n.getMonth()&&e.getFullYear()===n.getFullYear()){return this._iAllItems-a<this._iVisibleItems||i.getTime()>n.getTime()}return true};var n=t.filter(a,this).sort(this._sortByStartHourCB).filter(i,this).slice(0,this._iVisibleItems);return n};M.prototype._sortByStartHourCB=function(t,e){return t.getStartDate().getTime()-e.getStartDate().getTime()||e.getEndDate().getTime()-t.getEndDate().getTime()};M.prototype._isAppointmentInSelectedDate=function(t){return function(e){var a=e.getStartDate().getTime(),i=e.getEndDate().getTime(),n=t.getTime(),s=y.getInstance(v.getInstance(t.getTime())),o,r,l,p;s.setDate(s.getDate()+1);o=s.getTime()-1e3;r=a<n&&i>o;l=a>=n&&a<o;p=i>n&&i<=o;return r||l||p}};M.prototype._getVisibleAppointments=function(){return this._aVisibleAppointments};M.prototype.formatDate=function(t){var e=h.getDateTimeInstance({pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}).parse(t);if(!e){e=h.getInstance({pattern:"yyyy-MM-dd"}).parse(t)}return e};M.prototype._addItem=function(t){var e={title:t.template.title,text:t.template.text,type:t.template.type},a;if(t.template.startDate){e.startDate=n.formattedProperty(t.template.startDate,this.formatDate)}if(t.template.endDate){e.endDate=n.formattedProperty(t.template.endDate,this.formatDate)}if(t.template.icon&&t.template.icon.src){e.icon=n.formattedProperty(t.template.icon.src,function(t){return this._oIconFormatter.formatSrc(t)}.bind(this))}this._oAppointmentTemplate=new r(e);var i=this.getActions();i.attach({area:L.ContentItem,actions:t.template.actions,control:this,actionControl:this._oAppointmentTemplate,enabledPropertyName:"clickable",enabledPropertyValue:true,disabledPropertyValue:false});a={path:t.path,template:this._oAppointmentTemplate};this._bindAggregationToControl("appointments",this,a)};M.prototype._addSpecialDate=function(t){var e=t.template,a;if(e.startDate){e.startDate=n.formattedProperty(e.startDate,this.formatDate)}if(e.endDate){e.endDate=n.formattedProperty(e.endDate,this.formatDate)}this._oSpecialDateTemplate=new C(e);a={path:t.path,template:this._oSpecialDateTemplate};this._bindAggregationToControl("specialDates",this._oCalendar,a)};M.prototype._addLegendItem=function(t){var e={text:t.template.text,type:t.template.type},a={text:t.template.text,type:t.template.type},i,n;this._oCalendarLegendItemTemplate=new S(e);i={path:t.path,template:this._oCalendarLegendItemTemplate,filters:new f({path:"category",operator:D.Contains,value1:"calendar"})};this._bindAggregationToControl("items",this._oLegend,i);this._oAppointmentLegendItemTemplate=new S(a);n={path:t.path,template:this._oAppointmentLegendItemTemplate,filters:new f({path:"category",operator:D.Contains,value1:"appointment"})};this._bindAggregationToControl("appointmentItems",this._oLegend,n)};M.prototype._addDate=function(t){if(n.isBindingInfo(t)){if(!t){return}var e=new C;e.bindProperty("startDate",n.formattedProperty(t,this.formatDate));this._oCalendar.addSelectedDate(e)}else{this._oCalendar.addSelectedDate(new C({startDate:this.formatDate(t)}));var a=this.formatDate(t);this._handleSelect(a);this._handleStartDateChange(a);this._bDataInitiallyLoaded=true}};M.prototype._addMaxItems=function(t){if(n.isBindingInfo(t)){t&&this.bindProperty("visibleAppointmentsCount",t)}else{this.setVisibleAppointmentsCount(t)}};M.prototype._addMaxLegendItems=function(t){if(n.isBindingInfo(t)){t&&this._oLegend.bindProperty("visibleLegendItemsCount",t)}else{this._oLegend.setVisibleLegendItemsCount(t)}};M.prototype._addNoItemsText=function(t){if(n.isBindingInfo(t)){t&&this.bindProperty("noAppointmentsText",t)}else{this.setNoAppointmentsText(t)}};M.prototype._getMoreButton=function(){if(!this._oMoreAppsButton){this._oMoreAppsButton=new g({text:"More"})}return this._oMoreAppsButton};M.prototype._bNeedForMoreButton=function(){return this._iAllItems>this.getVisibleAppointmentsCount()};M.prototype._getCurrentAppointment=function(){var t=this._getVisibleAppointments(),e=v.getInstance(),a,i,n,s,o=this._oCalendar.getSelectedDates().length?this._oCalendar.getSelectedDates()[0].getStartDate():this._oCalendar.getStartDate();if(o.getDate()===e.getDate()&&o.getMonth()===e.getMonth()&&o.getFullYear()===e.getFullYear()){for(s=t.length-1;s>=0;s--){a=t[s];i=a.getStartDate().getTime();n=a.getEndDate().getTime();if(e.getTime()>i&&e.getTime()<n){return a}}}};M.prototype._handleStartDateChange=function(t){var e=this.getActions(),a=_.fromLocalJSDate(t),i=I._getFirstDateOfWeek(I._getFirstDateOfMonth(a)),n=new _(t.getFullYear(),t.getMonth()+1,1),s;n.setDate(n.getDate()-1);s=I._getFirstDateOfWeek(n);s.setDate(s.getDate()+6);e.fireAction(this,"MonthChange",{firstDate:i.toLocalJSDate(),lastDate:s.toLocalJSDate()})};M.prototype._handleSelect=function(t){var e=this.getActions();e.fireAction(this,"DateChange",{selectedDate:t})};function x(){if(!this._oLocaleData){var t=P.call(this);var e=new c(t);this._oLocaleData=u.getInstance(e)}return this._oLocaleData}function P(){if(!this._sLocale){this._sLocale=A.getFormatSettings().getFormatLocale().toString()}return this._sLocale}return M});
//# sourceMappingURL=CalendarContent.js.map