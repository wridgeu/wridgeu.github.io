/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./Button","./Select","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/delegate/ItemNavigation","sap/ui/core/ResizeHandler","sap/ui/core/ListItem","sap/ui/core/IconPool","./SegmentedButtonRenderer"],function(t,e,i,s,n,o,r,a,l,h){"use strict";var u=s.extend("sap.m.SegmentedButton",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent"],library:"sap.m",designtime:"sap/m/designtime/SegmentedButton.designtime",publicMethods:["createButton"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},selectedKey:{type:"string",group:"Data",defaultValue:"",bindable:"bindable"}},defaultAggregation:"buttons",aggregations:{buttons:{type:"sap.m.Button",multiple:true,singularName:"button",deprecated:true},items:{type:"sap.m.SegmentedButtonItem",multiple:true,singularName:"item",bindable:"bindable"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},associations:{selectedButton:{deprecated:true,type:"sap.m.Button",multiple:false},selectedItem:{type:"sap.m.SegmentedButtonItem",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{deprecated:true,parameters:{button:{type:"sap.m.Button"},id:{type:"string"},key:{type:"string"}}},selectionChange:{parameters:{item:{type:"sap.m.SegmentedButtonItem"}}}},dnd:{draggable:true,droppable:false}}});n.call(u.prototype);u.prototype.init=function(){this._aWidths=[];this._oItemNavigation=new o;this._oItemNavigation.setCycling(false);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});this.addDelegate(this._oItemNavigation);this.removeButton=function(t){var e=u.prototype.removeButton.call(this,t);this.setSelectedButton(this.getButtons()[0]);this._fireChangeEvent();return e}};u.prototype.onBeforeRendering=function(){var t=this._getVisibleButtons();this._bCustomButtonWidth=t.some(function(t){return t.getWidth()});if(this._sResizeListenerId){r.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.setSelectedKey(this.getProperty("selectedKey"));if(!this.getSelectedButton()){this._selectDefaultButton()}};u.prototype.onAfterRendering=function(){var t=this._getVisibleButtons(),e;if(!this._sResizeListenerId){e=this.getDomRef().parentNode;if(e){this._sResizeListenerId=r.register(e,this._handleContainerResize.bind(this))}}this._setItemNavigation();this._aWidths=this._getRenderedButtonWidths(t);this._updateWidth()};u.prototype._handleContainerResize=function(){var t=this._getVisibleButtons();this._clearAutoWidthAppliedToControl();this._aWidths=this._getRenderedButtonWidths(t);this._updateWidth()};u.prototype._clearAutoWidthAppliedToControl=function(){var t=this._getVisibleButtons(),e=t.length,i,s=0;if(!this.getWidth()){this.$().css("width","")}while(s<e){i=t[s];if(!i.getWidth()){i.$().css("width","")}s++}};u.prototype._getRenderedButtonWidths=function(t){return t.map(function(t){var e=t.getDomRef();return e&&e.getBoundingClientRect?e.getBoundingClientRect().width:t.$().outerWidth()})};u.prototype._getButtonWidth=function(t){var e=t.length,i,s=0,n=0,o=0,r,a,l=0;if(this._bCustomButtonWidth){while(l<e){i=t[l].getWidth();if(i){if(i.indexOf("%")!==-1){n+=parseInt(i.slice(0,-1))}else{o+=parseInt(i.slice(0,-2))}}else{s++}l++}if(s===0){return false}r=(100-n)/s;a=o/s;if(r<0){r=0}if(a<0){a=0}if(a>0){return"calc("+r+"% - "+a+"px)"}else{return r+"%"}}else{return 100/e+"%"}};u.prototype._updateWidth=function(){if(this.$().length===0||this.hasStyleClass("sapMSegmentedButtonNoAutoWidth")){return}var t=this.getWidth(),e=this._getVisibleButtons(),i=e.length,s=this._aWidths.length>0?Math.max.apply(Math,this._aWidths):0,n=100/i,o=this.$().parent().innerWidth(),r=this._getButtonWidth(e),a,l,h;if(!t){if(s*i>o){this.addStyleClass("sapMSegBFit")}else if(s>0){this.$().width(s*i+1);this.removeStyleClass("sapMSegBFit")}h=0;while(h<i){l=e[h];l.$().css("width",l.getWidth()?l.getWidth():r);h++}}else if(t&&!this._bCustomButtonWidth){h=0;while(h<i){e[h].$().css("width",n+"%");h++}}a=this.$().width();if(this._previousWidth!==undefined&&a!==this._previousWidth&&!this._bInOverflow){this.fireEvent("_containerWidthChanged")}this._previousWidth=a};u.prototype.exit=function(){if(this._sResizeListenerId){r.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}this._bCustomButtonWidth=null;this._aWidths=null};u.prototype._setItemNavigation=function(){var t,e=this.getDomRef();if(e){this._oItemNavigation.setRootDomRef(e);t=this.$().find(".sapMSegBBtn:not(.sapMSegBBtnDis)");this._oItemNavigation.setItemDomRefs(t);this._focusSelectedButton()}};u.prototype.getOverflowToolbarConfig=function(){return{canOverflow:true,listenForEvents:["select"],autoCloseEvents:["select"],propsUnrelatedToSize:["enabled","selectedKey"],invalidationEvents:["_containerWidthChanged"],onBeforeEnterOverflow:this._onBeforeEnterOverflow,onAfterExitOverflow:this._onAfterExitOverflow}};u.prototype._onBeforeEnterOverflow=function(t){t._toSelectMode()};u.prototype._onAfterExitOverflow=function(t){if(t._bForcedSelectMode){t._toSelectMode()}else{t._toNormalMode()}};u.prototype.getFormDoNotAdjustWidth=function(){return true};u.prototype.createButton=function(t,i,s,n){var o=new e;if(t!==null){o.setText(t)}if(i!==null){o.setIcon(i)}if(s||s===undefined){o.setEnabled(true)}else{o.setEnabled(false)}if(n){o.setTextDirection(n)}this.addButton(o);return o};(function(){u.prototype.addButton=function(e){if(e){t(e,this);this.addAggregation("buttons",e);this._syncSelect();this._fireChangeEvent()}return this};u.prototype.insertButton=function(e,i){if(e){t(e,this);this.insertAggregation("buttons",e,i);this._syncSelect();this._fireChangeEvent()}return this};function t(t,i){t.attachPress(function(t){i._buttonPressed(t)});t.attachEvent("_change",i._syncSelect,i);t.attachEvent("_change",i._fireChangeEvent,i);var s=e.prototype.setEnabled;t.setEnabled=function(e){t.$().toggleClass("sapMSegBBtnDis",!e).toggleClass("sapMFocusable",e);s.apply(t,arguments)};t.setVisible=function(t){e.prototype.setVisible.apply(this,arguments);i.invalidate()}}})();u.prototype.getSelectedKey=function(){var t=this.getButtons(),e=this.getItems(),i=this.getSelectedButton(),s=0;if(e.length>0){for(;s<t.length;s++){if(t[s]&&t[s].getId()===i){this.setProperty("selectedKey",e[s].getKey(),true);return e[s].getKey()}}}return""};u.prototype.setSelectedKey=function(t){var e=this.getButtons(),i=this.getItems(),s=0;if(!t){this.setProperty("selectedKey",t,true);return this}if(i.length>0&&e.length>0){for(;s<i.length;s++){if(i[s]&&i[s].getKey()===t){this.setSelectedItem(i[s]);break}}}this.setProperty("selectedKey",t,true);return this};u.prototype.removeButton=function(t){var e=this.removeAggregation("buttons",t);if(e){delete e.setEnabled;e.detachEvent("_change",this._syncSelect,this);e.detachEvent("_change",this._fireChangeEvent,this);this._syncSelect()}return e};u.prototype.removeAllButtons=function(){var t=this.getButtons();if(t){for(var e=0;e<t.length;e++){var i=t[e];if(i){delete i.setEnabled;this.removeAggregation("buttons",i);i.detachEvent("_change",this._syncSelect,this);i.detachEvent("_change",this._fireChangeEvent,this)}}this._syncSelect()}return t};u.prototype.addItem=function(t){this.addAggregation("items",t);this.addButton(t.oButton);return this};u.prototype.removeItem=function(t){var e;if(t!==null&&t!==undefined){e=this.removeAggregation("items",t);this.removeButton(t.oButton)}if(t&&t instanceof sap.m.SegmentedButtonItem&&this.getSelectedButton()===t.oButton.getId()){this.setSelectedKey("");this.setSelectedButton("");this.setSelectedItem("")}this.setSelectedItem(this.getItems()[0]);return e};u.prototype.insertItem=function(t,e){this.insertAggregation("items",t,e);this.insertButton(t.oButton,e);return this};u.prototype.removeAllItems=function(t){var e=this.removeAllAggregation("items",t);this.removeAllButtons();this.setSelectedKey("");this.setSelectedButton("");this.setSelectedItem("");return e};u.prototype._buttonPressed=function(t){var e=t.getSource(),i;if(this.getSelectedButton()!==e.getId()){this.getButtons().forEach(function(t){t.$().removeClass("sapMSegBBtnSel");t.$().attr("aria-selected",false)});i=this.getItems().filter(function(t){return t.oButton===e})[0];e.$().addClass("sapMSegBBtnSel");e.$().attr("aria-selected",true);this.setAssociation("selectedButton",e,true);this.setProperty("selectedKey",this.getSelectedKey(),true);this.setAssociation("selectedItem",i,true);this.fireSelectionChange({item:i});this.fireSelect({button:e,id:e.getId(),key:this.getSelectedKey()})}};u.prototype._selectDefaultButton=function(){var t=this._getVisibleButtons();if(t.length>0){this.setAssociation("selectedButton",t[0],true);if(this.getItems().length>0){this.setAssociation("selectedItem",this.getItems()[0],true)}}};u.prototype.setSelectedButton=function(t){var e=this.getSelectedButton(),i=this.getButtons();this.setAssociation("selectedButton",t);if(e!==this.getSelectedButton()){if(!this.getSelectedButton()&&i.length>1){this._selectDefaultButton()}this._focusSelectedButton()}this._syncSelect();return this};u.prototype.setSelectedItem=function(t){var e=typeof t==="string"&&t!==""?sap.ui.getCore().byId(t):t,i=e instanceof sap.m.SegmentedButtonItem,s=i?e.oButton:t;this.setAssociation("selectedItem",t,true);this.setSelectedButton(s);return this};u.prototype._focusSelectedButton=function(){var t=this.getButtons(),e=this.getSelectedButton(),i=0;for(;i<t.length;i++){if(t[i]&&t[i].getId()===e){this._oItemNavigation&&this._oItemNavigation.setFocusedIndex(i);break}}};u.prototype.onsappagedown=function(t){this._oItemNavigation.onsapend(t)};u.prototype.onsappageup=function(t){this._oItemNavigation.onsaphome(t)};u.prototype.onsapspace=function(t){t.preventDefault()};u.prototype._fnSelectFormFactory=function(){return new i(this.getId()+"-select").attachChange(this._selectChangeHandler,this).addStyleClass("sapMSegBSelectWrapper")};u.prototype._selectChangeHandler=function(t){var e=t.getParameter("selectedItem"),i=parseInt(e.getKey()),s=this.getButtons()[i],n=s.getId();s.firePress();this.setSelectedButton(n)};u.prototype._fireChangeEvent=function(){this.fireEvent("_change")};u.prototype._syncSelect=function(){var t=0,e=0,i,s,n=this.getAggregation("_select");if(!n){return}n.destroyItems();this._getVisibleButtons().forEach(function(o){i=o.getText();s=o.getIcon();n.addItem(new a({key:t.toString(),icon:s?s:"",text:i?i:o.getTooltip_AsString(),enabled:o.getEnabled()}));if(o.getId()===this.getSelectedButton()){e=t}t++},this);n.setSelectedKey(e.toString())};u.prototype._toSelectMode=function(){this._bInOverflow=true;this.addStyleClass("sapMSegBSelectWrapper");if(!this.getAggregation("_select")){this.setAggregation("_select",this._fnSelectFormFactory(),true)}this._syncSelect();this._syncAriaAssociations()};u.prototype._toNormalMode=function(){delete this._bInOverflow;this.removeStyleClass("sapMSegBSelectWrapper")};u.prototype._syncAriaAssociations=function(){var t=this.getAggregation("_select");this.getAriaLabelledBy().forEach(function(e){if(t.getAriaLabelledBy().indexOf(e)===-1){t.addAriaLabelledBy(e)}});this.getAriaDescribedBy().forEach(function(e){if(t.getAriaLabelledBy().indexOf(e)===-1){t.addAriaLabelledBy(e)}})};u.prototype._overwriteImageOnload=function(t){var e=this;if(t.onload===sap.m.Image.prototype.onload){t.onload=function(){if(sap.m.Image.prototype.onload){sap.m.Image.prototype.onload.apply(this,arguments)}window.setTimeout(function(){e._updateWidth()},20)}}};u.prototype._getIconAriaLabel=function(t){var e=l.getIconInfo(t.getSrc()),i="";if(e){i=e.text?e.text:e.name}return i};u.prototype._getVisibleButtons=function(){return this.getButtons().filter(function(t){return t.getVisible()})};u.prototype.clone=function(){var t=this.getSelectedButton(),e=this.removeAllAggregation("buttons"),i=s.prototype.clone.apply(this,arguments),n=e.map(function(t){return t.getId()}).indexOf(t),o;if(n>-1){i.setSelectedButton(i.getButtons()[n])}for(o=0;o<e.length;o++){this.addAggregation("buttons",e[o])}return i};return u});