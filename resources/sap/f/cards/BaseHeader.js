/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/IntervalTrigger","sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDate","sap/ui/core/InvisibleText","sap/m/Text"],function(t,e,a,i,r,s,o){"use strict";var n=6e4;var p=t.extend("sap.f.cards.BaseHeader",{metadata:{library:"sap.f",abstract:true,properties:{dataTimestamp:{type:"string",defaultValue:""},dataTimestampUpdating:{type:"boolean",defaultValue:false,visibility:"hidden"},focusable:{type:"boolean",defaultValue:true,visibility:"hidden"}},aggregations:{_dataTimestamp:{type:"sap.m.Text",multiple:false,visibility:"hidden"},toolbar:{type:"sap.ui.core.Control",multiple:false},_error:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});p.prototype.init=function(){this._oRb=e.getLibraryResourceBundle("sap.f");this._oToolbarDelegate={onfocusin:this._onToolbarFocusin,onfocusout:this._onToolbarFocusout}};p.prototype.exit=function(){this._removeTimestampListener();if(this._oToolbarDelegate){this._oToolbarDelegate=null}this._oRb=null};p.prototype.onBeforeRendering=function(){var t=this.getToolbar();if(t){t.addStyleClass("sapFCardHeaderToolbar");t.removeEventDelegate(this._oToolbarDelegate,this)}};p.prototype.onAfterRendering=function(){var t=this.getToolbar();if(t){t.addEventDelegate(this._oToolbarDelegate,this)}};p.prototype.getFocusDomRef=function(){return this.getDomRef("focusable")};p.prototype.ontap=function(t){var e=t.srcControl;if(e&&e.getId().indexOf("overflowButton")>-1){return}if(this._isInteractive()){this.firePress()}};p.prototype.onsapselect=function(){if(this._isInteractive()){this.firePress()}};p.prototype._onToolbarFocusin=function(){var t=this.getDomRef();if(t){this.getDomRef().classList.add("sapFCardHeaderToolbarFocused")}};p.prototype._onToolbarFocusout=function(){var t=this.getDomRef();if(t){this.getDomRef().classList.remove("sapFCardHeaderToolbarFocused")}};p.prototype.setDataTimestamp=function(t){var e=this.getDataTimestamp();if(e&&!t){this.destroyAggregation("_dataTimestamp");this._removeTimestampListener()}this.setProperty("dataTimestamp",t);if(t){this._updateDataTimestamp();this._addTimestampListener()}return this};p.prototype.setDataTimestampUpdating=function(t){var e=this._createDataTimestamp();this.setProperty("dataTimestampUpdating",t);if(t){e.setText("updating...");e.addStyleClass("sapFCardDataTimestampUpdating");this._removeTimestampListener()}else{e.removeStyleClass("sapFCardDataTimestampUpdating")}return this};p.prototype._createDataTimestamp=function(){var t=this.getAggregation("_dataTimestamp");if(!t){t=new o({wrapping:false,textAlign:"End"});t.addStyleClass("sapFCardDataTimestamp");this.setAggregation("_dataTimestamp",t)}return t};p.prototype._updateDataTimestamp=function(){var t=this._createDataTimestamp(),e=this.getDataTimestamp(),a,s,o;if(!e){t.setText("");return}a=i.getDateTimeInstance({relative:true});s=new r(e);o=a.format(s);if(s.getTime()+59e3>(new Date).getTime()){o="now"}t.setText(o);t.removeStyleClass("sapFCardDataTimestampUpdating")};p.prototype._addTimestampListener=function(){p.getTimestampIntervalTrigger().addListener(this._updateDataTimestamp,this);this._bHasTimestampListener=true};p.prototype._removeTimestampListener=function(){if(!this._bHasTimestampListener){return}p.getTimestampIntervalTrigger().removeListener(this._updateDataTimestamp,this);this._bHasTimestampListener=false};p.getTimestampIntervalTrigger=function(){if(!p._oTimestampIntervalTrigger){p._oTimestampIntervalTrigger=new a(n)}return p._oTimestampIntervalTrigger};p.prototype.getAriaRole=function(){return"group"};p.prototype.getTitleAriaRole=function(){return"heading"};p.prototype.getFocusableElementAriaRole=function(){return this.hasListeners("press")?"button":null};p.prototype.getAriaHeadingLevel=function(){return"3"};p.prototype.getAriaRoleDescription=function(){return this.hasListeners("press")?this._oRb.getText("ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER"):this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD_HEADER")};p.prototype._isInsideGridContainer=function(){var t=this.getParent();if(!t){return false}t=t.getParent();if(!t){return false}return t.isA("sap.f.GridContainer")};p.prototype._isInteractive=function(){return this.hasListeners("press")};return p});