/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/Element","sap/ui/core/Control","sap/ui/core/ListItem","sap/ui/core/library","sap/ui/core/Renderer","sap/ui/core/message/MessageMixin","sap/m/DynamicDateFormat","sap/m/DynamicDateUtil","sap/ui/core/IconPool","sap/ui/core/Icon","sap/ui/core/LabelEnablement","sap/ui/core/format/DateFormat","sap/ui/core/format/TimezoneUtil","sap/ui/base/ManagedObjectObserver","sap/ui/Device","./Label","./GroupHeaderListItem","./StandardListItem","./StandardListItemRenderer","./Button","./List","./Input","./InputRenderer","./Toolbar","./ResponsivePopover","./Page","./NavContainer","./DynamicDateRangeRenderer","./StandardDynamicDateOption","./library","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Focusable"],function(t,e,i,o,n,a,r,s,p,u,l,h,g,c,_,d,f,y,m,v,T,I,O,A,D,E,b,P,S,R,C,V){"use strict";var L=n.ValueState,N=C.ToolbarDesign,F=C.ToolbarStyle,B=C.ListType,x=C.ListMode,M=C.ListSeparators,H=sap.ui.getCore().getLibraryResourceBundle("sap.m");var Y=i.extend("sap.m.DynamicDateRange",{metadata:{library:"sap.m",properties:{value:{type:"object"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:L.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},required:{type:"boolean",group:"Misc",defaultValue:false},enableGroupHeaders:{type:"boolean",group:"Behavior",defaultValue:true},formatter:{type:"object"},options:{type:"string[]",group:"Behavior",defaultValue:["DATE","TODAY","YESTERDAY","TOMORROW","FIRSTDAYWEEK","LASTDAYWEEK","FIRSTDAYMONTH","LASTDAYMONTH","FIRSTDAYQUARTER","LASTDAYQUARTER","FIRSTDAYYEAR","LASTDAYYEAR","DATERANGE","DATETIMERANGE","FROM","TO","FROMDATETIME","TODATETIME","YEARTODATE","DATETOYEAR","LASTDAYS","LASTWEEKS","LASTMONTHS","LASTQUARTERS","LASTYEARS","NEXTDAYS","NEXTWEEKS","NEXTMONTHS","NEXTQUARTERS","NEXTYEARS","TODAYFROMTO","THISWEEK","LASTWEEK","NEXTWEEK","SPECIFICMONTH","SPECIFICMONTHINYEAR","THISMONTH","LASTMONTH","NEXTMONTH","THISQUARTER","LASTQUARTER","NEXTQUARTER","QUARTER1","QUARTER2","QUARTER3","QUARTER4","THISYEAR","LASTYEAR","NEXTYEAR","DATETIME"]}},aggregations:{_input:{type:"sap.m.Input",multiple:false,visibility:"hidden"},_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"object"},valid:{type:"boolean"}}}}},renderer:S});r.call(Y.prototype);Y.prototype.init=function(){this._oInput=new K(this.getId()+"-input",{showValueHelp:true,valueHelpIconSrc:u.getIconURI("sap-icon://check-availability"),valueHelpRequest:this._toggleOpen.bind(this),showSuggestion:true,suggest:this._handleSuggest.bind(this)});this._oListItemDelegate=undefined;this._onBeforeInputRenderingDelegate={onBeforeRendering:function(){this._oInput._getValueHelpIcon().setVisible(true)}};this._oInput._getValueHelpIcon().setTooltip(H.getText("INPUT_VALUEHELP_BUTTON"));this._oInput.addDelegate(this._onBeforeInputRenderingDelegate,this);this.setAggregation("_input",this._oInput,false);this._oInput._setControlOrigin(this);this._oInput.attachChange(this._handleInputChange,this);this.oValueObserver=new _(function(){delete this.oBoundValueFormatter}.bind(this));this.oValueObserver.observe(this,{bindings:["value"]})};Y.prototype.exit=function(){this._oInput.removeDelegate(this._onBeforeInputRenderingDelegate);this._onBeforeInputRenderingDelegate=undefined;this.oValueObserver.destroy();this._infoDatesFooter=undefined;this.aInputControls=undefined;this._removeAllListItemDelegates()};Y.prototype._removeAllListItemDelegates=function(){if(this._oOptionsList){this._oOptionsList.getItems().forEach(function(t){t.removeDelegate(this._oListItemDelegate)},this)}};Y.prototype.onBeforeRendering=function(){this._updateInputValue(this.getValue());this._oInput.setEditable(this.getEditable());this._oInput.setEnabled(this.getEnabled());this._oInput.setRequired(this.getRequired());this._oInput.setName(this.getName());this._oInput.setWidth(this.getWidth());this._oInput.setPlaceholder(this.getPlaceholder());this._oInput.setValueState(this.getValueState());this._oInput.setValueStateText(this.getValueStateText())};Y.prototype.setValue=function(t){var e=t&&t.operator;t=this._substitudeValue(t);this.setProperty("value",t);this._oSelectedOption=p.getOption(e);this._updateInputValue(t);return this};Y.prototype._toggleOpen=function(){if(this._oPopup&&this._oPopup.isOpen()){this._closePopup()}else{this.open()}};Y.prototype.open=function(){if(this.getEditable()&&this.getEnabled()){this._createPopup();this._createPopupContent();if(!this._oListItemDelegate){this._oListItemDelegate={onsapshow:this._closePopup.bind(this),onsaphide:this._closePopup.bind(this)}}this._removeAllListItemDelegates();this._oOptionsList.destroyAggregation("items");this._collectValueHelpItems(this._getOptions(),true).map(function(t){if(typeof t==="string"){return this._createHeaderListItem(t)}if(t.getKey()==="FROMDATETIME"){t._bAdditionalTimeText=!!this._findOption("FROM")}else if(t.getKey()==="TODATETIME"){t._bAdditionalTimeText=!!this._findOption("TO")}else if(t.getKey()==="DATETIMERANGE"){t._bAdditionalTimeText=!!this._findOption("DATERANGE")}return this._createListItem(t)},this).forEach(function(t){t.addDelegate(this._oListItemDelegate,this);this._oOptionsList.addItem(t)},this);this._oNavContainer.to(this._oNavContainer.getPages()[0]);this._openPopup()}};Y.prototype._findOption=function(t){return this._getOptions().find(function(e){return e.getKey()===t})};Y.prototype.addOption=function(t){var e=this.getOptions();if(e.indexOf(t)===-1){e.push(t)}this.setOptions(e)};Y.prototype.getFocusDomRef=function(){return this.getAggregation("_input")&&this.getAggregation("_input").getFocusDomRef()};Y.prototype._updateInputValue=function(t){var e;if(t&&t.operator!=="PARSEERROR"){e=this._enhanceInputValue(this._formatValue(t),t);this._oInput.setValue(e)}else if(t===undefined){this._oInput.setValue("")}};Y.prototype._handleSuggest=function(t){if(this._oPopup&&this._oPopup.isOpen()){this._closePopup()}var e=t.getParameter("suggestValue");this._oInput.removeAllSuggestionItems();var i=this._getOptions().filter(function(t){var i={operator:t.getKey(),values:[]},o=t.getValueHelpUITypes(this);if(o.length&&o[0].getType()){return false}var n=p.getOption(i.operator).format(i,this._getFormatter()).toLowerCase();var a=n.indexOf(e.toLowerCase());return a===0||a>0&&n[a-1]===" "},this);this._collectValueHelpItems(i,true).forEach(function(t){if(t.getKey){var e={operator:t.getKey(),values:[]};this._addSuggestionItem(e)}else{this._addSuggestionGroupItem(t)}},this);var o=e.match(/\d+/);if(!o){return}i=this._getOptions().filter(function(t){return t.getValueHelpUITypes(this).length===1&&t.getValueHelpUITypes(this)[0].getType()==="int"},this);this._collectValueHelpItems(i,false).forEach(function(t){if(t.getKey){var e={operator:t.getKey(),values:[parseInt(o[0])]};this._addSuggestionItem(e)}else{this._addSuggestionGroupItem(t)}},this)};Y.prototype._getOptions=function(){var t=this.getOptions();var e=t.map(function(t){return p.getOption(t)},this);return e.filter(function(t){return!!t})};Y.prototype._getDatesLabelFormatter=function(){var t,e=this._oSelectedOption?this._oSelectedOption.getValueHelpUITypes():[],i=e&&e.length?e[0].getType():"";if(!this._oDatesLabelFormatter){switch(i){case"datetime":t=Object.create(this._getFormatter()._dateTimeFormatter.oFormatOptions);t.singleIntervalValue=true;t.interval=true;this._oDatesLabelFormatter=g.getDateTimeInstance(t);break;default:t=Object.create(this._getFormatter()._dateFormatter.oFormatOptions);t.singleIntervalValue=true;t.interval=true;this._oDatesLabelFormatter=g.getInstance(t)}}return this._oDatesLabelFormatter};Y.prototype._destroyInputControls=function(){if(!this.aInputControls){return}this.aInputControls.forEach(function(t){t.destroy()});this.aInputControls=undefined};Y.prototype._addSuggestionItem=function(t){var e=p.toDates(t).map(function(t){return this._convertDate(t)},this);var i=new o({text:p.getOption(t.operator).format(t,this._getFormatter()),additionalText:this._getDatesLabelFormatter().format(e)});this._oInput.addSuggestionItem(i)};Y.prototype._addSuggestionGroupItem=function(t){this._oInput.addSuggestionItemGroup({text:t})};Y.prototype._handleInputChange=function(t){var e=t.getParameter("value");var i=this._parseValue(this._stripValue(e));var o=this.getValue();var n=e.trim()===""||!!i;if(!n){this.setValue({operator:"PARSEERROR",values:[H.getText("DDR_WRONG_VALUE"),e]})}else{this.setValue(i)}this.fireChange({value:this.getValue(),prevValue:o,valid:n})};Y.prototype._enhanceInputValue=function(t,e){if(p.getOption(e.operator).enhanceFormattedValue()||e.operator==="LASTDAYS"&&e.values[0]<=1||e.operator==="NEXTDAYS"&&e.values[0]<=1){return t+" ("+this._toDatesString(e)+")"}return t};Y.prototype._stripValue=function(t){var e=t.indexOf("(");var i=t.lastIndexOf(")");var o=t;if(e!==-1&&i!==-1&&e<i){o=t.slice(0,e)+t.slice(i+1);o=o.trim()}return o};Y.prototype._toDatesString=function(t){var e=p.toDates(t).map(function(t){return this._convertDate(t)},this);return this._getDatesLabelFormatter().format(e)};Y.prototype._convertDate=function(t){var e=this._getPickerParser().format(t,c.getLocalTimezone());var i=this._getPickerParser().parse(e,sap.ui.getCore().getConfiguration().getTimezone());var o=i?new Date(i[0].getTime()):i;return o};Y.prototype._reverseConvertDate=function(t){var e=this._getPickerParser().format(t,sap.ui.getCore().getConfiguration().getTimezone());var i=this._getPickerParser().parse(e,c.getLocalTimezone());var o=i?new Date(i[0].getTime()):i;return o};Y.prototype._getPickerParser=function(){if(!this._calendarParser){this._calendarParser=g.getDateTimeWithTimezoneInstance({showTimezone:false})}return this._calendarParser};Y.prototype._createPopup=function(){if(!this._oPopup){this._oPopup=new E(this.getId()+"-RP",{contentHeight:"512px",contentWidth:"320px",showCloseButton:false,showArrow:false,showHeader:false,placement:C.PlacementType.VerticalPreferedBottom,ariaLabelledBy:[t.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")]});this._oPopup.addStyleClass("sapMDDRPopover");if(d.system.phone){this._oPopup.addStyleClass("sapUiNoContentPadding")}else{this._oPopup._oControl._getSingleNavContent=function(){return null}}this._oPopup.attachAfterOpen(function(){var t=this._oNavContainer.getPages()[0];this._applyNavContainerPageFocus(t);this.invalidate()},this);this._oPopup.attachAfterClose(function(){this._oPreviousSelectedOption=this._oSelectedOption;this._setFooterVisibility(false);this.invalidate()},this);this._oPopup.setBeginButton(new T({type:C.ButtonType.Emphasized,text:H.getText("DYNAMIC_DATE_RANGE_CONFIRM"),press:this._applyValue.bind(this)}));this._oPopup.setEndButton(new T({text:H.getText("DYNAMIC_DATE_RANGE_CANCEL"),press:function(){this._oSelectedOption=this._oPreviousSelectedOption;this._oDatesLabelFormatter=null;this._closePopup()}.bind(this)}));this._setFooterVisibility(false);this._oPopup._getPopup().setAutoClose(true);this.setAggregation("_popup",this._oPopup,true)}};Y.prototype._collectValueHelpItems=function(t,e){var i;var o;var n=[];var a=t;var r=p.getStandardKeys();a.sort(function(t,e){var i=t.getGroup()-e.getGroup();if(i){return i}return r.indexOf(t.getKey())-r.indexOf(e.getKey())});if(e){a=a.reduce(function(t,e){if(R.LastXKeys.indexOf(e.getKey())!==-1){if(i){return t}i=true}if(R.NextXKeys.indexOf(e.getKey())!==-1){if(o){return t}o=true}t.push(e);return t},[])}if(this.getEnableGroupHeaders()){a=a.reduce(function(t,e){var i=e.getGroupHeader();if(n.indexOf(i)===-1){n.push(i);t.push(i)}t.push(e);return t},[])}return a};Y.prototype._createListItem=function(t){var e=this._isFixedOption(t);return new U(this.getId()+"-option-"+t.getKey().replaceAll(" ",""),{type:e?B.Active:B.Navigation,title:t.getText(this),wrapping:true,optionKey:t.getKey(),press:this._handleOptionPress.bind(this)})};Y.prototype._createHeaderListItem=function(t){var e=new y;e.setTitle(t);e._bGroupHeader=true;return e};Y.prototype._handleOptionPress=function(t){var e=t.getSource().getOptionKey(),i=p.getOption(e);if(this._oPreviousSelectedOption&&this._oPreviousSelectedOption.getKey()!==e){this._oDatesLabelFormatter=null}this._oPreviousSelectedOption=this._oSelectedOption;this._oSelectedOption=i;if(this._isFixedOption(i)){this._applyValue()}else{var o=this._createInfoDatesFooter();this._destroyInputControls();this.aInputControls=i.createValueHelpUI(this,this._updateInternalControls.bind(this));var n=this._oNavContainer.getPages()[1];n.removeAllContent();this.aInputControls.forEach(function(t){n.addContent(t)});n.setFooter(o);n.setTitle(i.getText(this));this._setFooterVisibility(true);this._updateInternalControls(i);this._oNavContainer.to(n)}};Y.prototype._isFixedOption=function(t){return!t.getValueHelpUITypes(this).length};Y.prototype._createInfoDatesFooter=function(){this._infoDatesFooter=new D({design:N.Info,style:F.Clear,content:[new f({text:H.getText("DDR_INFO_DATES_EMPTY_HINT")})]});return this._infoDatesFooter};Y.prototype._getDatesLabel=function(){return this._infoDatesFooter.getContent()[0]};Y.prototype._updateDatesLabel=function(){var t=this._oSelectedOption.getValueHelpOutput(this),e,i;if(!t||!t.operator||!p.getOption(t.operator)){return}e=p.toDates(t).map(function(t){return this._convertDate(t)},this);if(e){if(this._oSelectedOption.getKey()==="FROMDATETIME"||this._oSelectedOption.getKey()==="TODATETIME"||this._oSelectedOption.getKey()==="FROM"||this._oSelectedOption.getKey()==="TO"){e.push(null)}i=this._getDatesLabelFormatter().format(e);this._getDatesLabel().setText(H.getText("DDR_INFO_DATES",[i]))}};Y.prototype._setApplyButtonEnabled=function(t){if(!this._oPopup){return}var e=this._oPopup.getBeginButton();if(e.getVisible()){e.setEnabled(t)}};Y.prototype._updateInternalControls=function(t){var e=t.validateValueHelpUI(this);if(e){this._updateDatesLabel()}this._setApplyButtonEnabled(e)};Y.prototype._setFooterVisibility=function(t){var e;if(!this._oPopup){return}e=this._oPopup.getAggregation("_popup");if(d.system.phone){this._oPopup.getBeginButton().setVisible(t)}else{e.getFooter().setVisible(t)}e.invalidate();return this};Y.prototype._createPopupContent=function(){var t=new b({showHeader:false,showNavButton:false}),e=new b({showHeader:true,showNavButton:true}).addStyleClass("sapMDynamicDateRangePopover");e.attachNavButtonPress(function(){this._setFooterVisibility(false);this._oNavContainer.back()},this);if(d.system.phone){t.setShowHeader(true);t.setTitle(this._getOptionsPageTitleText())}if(!this._oOptionsList){this._oOptionsList=new I({showSeparators:M.None,mode:x.None})}if(!this._oNavContainer){this._oNavContainer=new P({autoFocus:false});this._oNavContainer.addPage(t);this._oNavContainer.setInitialPage(t);this._oNavContainer.addPage(e);this._oNavContainer.attachAfterNavigate(this._navContainerAfterNavigate,this);this._oPopup.addContent(this._oNavContainer)}this._oNavContainer.getPages()[0].removeAllContent();this._oNavContainer.getPages()[0].addContent(this._oOptionsList);return this._oOptionsList};Y.prototype._applyNavContainerPageFocus=function(t){var e=this.getValue(),i=this._oNavContainer.getPages()[0],o;if(t===i&&e){o=this._oOptionsList.getItems().find(function(t){return t.isA("sap.m.DynamicDateRangeListItem")&&t.getOptionKey()===e.operator})}if(!o){o=V(t.getDomRef().querySelector("section")).firstFocusableDomRef()}o.focus();this._reApplyFocusToElement(t,e)};Y.prototype._reApplyFocusToElement=function(t,e){};Y.prototype._getOptionsPageTitleText=function(){return h.getReferencingLabels(this).concat(this.getAriaLabelledBy()).reduce(function(t,i){var o=e.registry.get(i);return t+" "+(o.getText?o.getText():"")},"").trim()};Y.prototype._navContainerAfterNavigate=function(t){var e=this._oNavContainer.getPages()[1],i=t.getParameters()["to"];if(i===e){this.aInputControls.forEach(function(t){if(t.$().firstFocusableDomRef()){t.addAriaLabelledBy&&t.addAriaLabelledBy(i.getAggregation("_internalHeader"));if(!this._isCalendarBasedControl(t)&&t.addAriaDescribedBy){t.addAriaDescribedBy(i.getFooter().getContent()[0])}}},this)}if(this._oPopup&&this._oPopup.isOpen()){this._applyNavContainerPageFocus(i)}else{this.focus()}};Y.prototype._isCalendarBasedControl=function(t){return t.isA("sap.ui.unified.Calendar")||t.isA("sap.ui.unified.calendar.CustomMonthPicker")||t.isA("sap.ui.unified.calendar.MonthPicker")||t.isA("sap.ui.unified.calendar.YearPicker")||t.isA("sap.ui.unified.calendar.YearRangePicker")||t.isA("sap.ui.unified.calendar.Month")};Y.prototype._openPopup=function(){if(!this._oPopup){return}this._oPopup._getPopup().setAutoCloseAreas([this._oInput.getDomRef()]);this._oPopup.openBy(this._oInput)};Y.prototype._applyValue=function(){this._oOutput=this._oSelectedOption.getValueHelpOutput(this);this._oOutput.values=this._oOutput.values.map(function(t){if(t instanceof Date){return this._convertDate(t)}return t},this);var t=this.getValue();this.setValue(this._oOutput);this.fireChange({prevValue:t,value:this.getValue(),valid:true});this._closePopup()};Y.prototype._closePopup=function(){this._setFooterVisibility(false);this._oNavContainer.to(this._oNavContainer.getPages()[0]);this._oPopup.close()};Y.prototype._getFormatter=function(){var t=this.getFormatter(),e;if(t){return t}if(this.oBoundValueFormatter){return this.oBoundValueFormatter}e=this.getBinding("value");if(e&&e.getType()){this.oBoundValueFormatter=s.getInstance(e.getType().oFormatOptions);return this.oBoundValueFormatter}if(!this.oDefaultFormatter){this.oDefaultFormatter=s.getInstance()}return this.oDefaultFormatter};Y.prototype._formatValue=function(t){return p.getOption(t.operator).format(t,this._getFormatter())};Y.prototype._parseValue=function(t){var e=p.parse(t,this._getFormatter(),this.getOptions()).filter(function(t){return this.getOptions().indexOf(t.operator)!==-1},this);return e.length?e[0]:null};Y.prototype._substitudeValue=function(t){var e,i,o;if(!t||!t.operator||!t.values){return t}e=t.operator;i=t.values;if(e==="LASTDAYS"&&i[0]===1){o={operator:"YESTERDAY",values:[]}}else if(e==="NEXTDAYS"&&i[0]===1){o={operator:"TOMORROW",values:[]}}else if((e==="LASTDAYS"||e==="NEXTDAYS")&&i[0]===0){o={operator:"TODAY",values:[]}}return o?o:t};var w=a.extend(A);w.apiVersion=2;w.writeInnerAttributes=function(t,e){t.attr("type","text")};w.getAccessibilityState=function(t){var e=A.getAccessibilityState(t),i=t._getControlOrigin(),o=i.getAriaLabelledBy(),a=h.getReferencingLabels(i),r=i.getAriaDescribedBy().join(" "),s;s=a.concat(o).join(" ");if(r){e.describedby=r}if(s){e.labelledby=s}e.roledescription=H.getText("ACC_CTR_TYPE_DYNAMIC_DATE_RANGE");e.role=this.getAriaRole();e.haspopup=n.aria.HasPopup.ListBox.toLowerCase();e.autocomplete="list";e.controls=i._oPopup&&i._oPopup.getDomRef()?i._oPopup.getDomRef().id:undefined;return e};var K=O.extend("sap.m.internal.DynamicDateRangeInput",{metadata:{library:"sap.m"},renderer:w});K.prototype._setControlOrigin=function(t){this._oOriginControl=t;return this._oOriginControl};K.prototype._getControlOrigin=function(){return this._oOriginControl};K.prototype.preventChangeOnFocusLeave=function(t){return this.bFocusoutDueRendering};K.prototype.shouldSuggetionsPopoverOpenOnMobile=function(t){var e=t.srcControl instanceof l;return this.isMobileDevice()&&this.getEditable()&&this.getEnabled()&&this.getShowSuggestion()&&!e&&!this._bClearButtonPressed};K.prototype.onfocusin=function(t){O.prototype.onfocusin.apply(this,arguments);if(this._getControlOrigin()._oPopup&&this._getControlOrigin()._oPopup.isOpen()){this._getControlOrigin()._closePopup()}};var U=m.extend("sap.m.DynamicDateRangeListItem",{metadata:{library:"sap.m",properties:{optionKey:{type:"string",group:"Misc",defaultValue:null}}},renderer:v});U.prototype.getNavigationControl=function(){var t=m.prototype.getNavigationControl.apply(this,arguments),e=this.getOptionKey(),i=p.getOption(e).getValueTypes(),o=["SPECIFICMONTH","DATE","DATERANGE","FROM","TO"].includes(e),n=i&&i.length&&i[0]==="datetime",a;if(o||n){t.addStyleClass("sapMDDRDateOption");a=o?u.getIconURI("appointment-2"):u.getIconURI("date-time")}else{a=u.getIconURI("slim-arrow-right")}t.setSrc(a);return t};return Y});