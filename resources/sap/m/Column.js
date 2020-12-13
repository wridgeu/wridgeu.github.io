/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Element","sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device","sap/ui/thirdparty/jquery"],function(t,e,i,r,n,o){"use strict";var s=t.PopinDisplay;var a=r.VerticalAlign;var p=r.TextAlign;var h=r.SortOrder;var u=e.extend("sap.m.Column",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},hAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin},vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:a.Inherit},styleClass:{type:"string",group:"Appearance",defaultValue:null},visible:{type:"boolean",group:"Appearance",defaultValue:true},minScreenWidth:{type:"string",group:"Behavior",defaultValue:null},demandPopin:{type:"boolean",group:"Behavior",defaultValue:false},popinHAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin,deprecated:true},popinDisplay:{type:"sap.m.PopinDisplay",group:"Appearance",defaultValue:s.Block},mergeDuplicates:{type:"boolean",group:"Behavior",defaultValue:false},mergeFunctionName:{type:"string",group:"Misc",defaultValue:"getText"},sortIndicator:{type:"sap.ui.core.SortOrder",group:"Appearance",defaultValue:h.None},importance:{type:"sap.ui.core.Priority",group:"Behavior",defaultValue:"None"},autoPopinWidth:{type:"float",group:"Behavior",defaultValue:8}},defaultAggregation:"header",aggregations:{header:{type:"sap.ui.core.Control",multiple:false},footer:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/m/designtime/Column.designtime"}});u.prototype._index=-1;u.prototype._screen="";u.prototype._media=null;u.prototype._bForcedColumn=false;u.prototype.exit=function(){this._clearMedia()};u.prototype.getTable=function(){var t=this.getParent();if(t&&t.isA("sap.m.Table")){return t}};u.prototype.informTable=function(t,e,i){var r=this.getTable();if(r){var n="onColumn"+t;if(r[n]){r[n](this,e,i)}}};u.prototype.ontouchstart=function(t){this._bTouchStartMarked=t.isMarked()};u.prototype.ontap=function(t){if(!this._bTouchStartMarked&&!t.isMarked()){this.informTable("Press")}};u.prototype.onsapspace=function(t){if(t.srcControl===this){this.informTable("Press");t.preventDefault()}};u.prototype.onsapenter=u.prototype.onsapspace;u.prototype.invalidate=function(){var t=this.getParent();if(!t||!t.bOutput){return}e.prototype.invalidate.apply(this,arguments)};u.prototype._clearMedia=function(){if(this._media&&this._minWidth){this._detachMediaContainerWidthChange(this._notifyResize,this,this.getId());n.media.removeRangeSet(this.getId());this._media=null}};u.prototype._addMedia=function(){delete this._bShouldAddMedia;if(this._minWidth){n.media.initRangeSet(this.getId(),[parseFloat(this._minWidth)]);this._attachMediaContainerWidthChange(this._notifyResize,this,this.getId());this._media=this._getCurrentMediaContainerRange(this.getId());if(this._media){this._media.matches=!!this._media.from}}};u.prototype._notifyResize=function(t){if(this._media.from===t.from){return}this._media=t;this._media.matches=!!t.from;setTimeout(function(){this.fireEvent("media",this);this.informTable("Resize")}.bind(this),0)};u.prototype._validateMinWidth=function(e){if(!e){return}if(Object.prototype.toString.call(e)!="[object String]"){throw new Error('expected string for property "minScreenWidth" of '+this)}if(Object.keys(t.ScreenSizes).indexOf(e.toLowerCase())!=-1){return}if(!/^\d+(\.\d+)?(px|em|rem)$/i.test(e)){throw new Error('invalid CSS size("px", "em", "rem" required) or sap.m.ScreenSize enumeration for property "minScreenWidth" of '+this)}};u.prototype._isWidthPredefined=function(e){var i=this,r=e.replace(/[^a-z]/gi,""),n=parseFloat(t.BaseFontSize)||16;o.each(t.ScreenSizes,function(t,o){if(r!="px"){o/=n}if(o+r==e){i._minWidth=this+"px";i._screen=t;return false}});if(this._minWidth){return true}if(r=="px"){this._minWidth=e}else{this._minWidth=parseFloat(e)*n+"px"}};u.prototype.getCssAlign=function(t){t=t||this.getHAlign();if(t===p.Begin||t===p.End||t===p.Initial){t=i.getTextAlign(t)}return t.toLowerCase()};u.prototype.getStyleClass=function(t){var e=this.getProperty("styleClass");if(!t){return e}if(this._screen&&(!this.getDemandPopin()||!window.matchMedia)){e+=" sapMSize-"+this._screen}else if(this._media&&!this._media.matches){e+=" sapMListTblNone"}return e.trim()};u.prototype.setIndex=function(t){this._index=+t};u.prototype.setOrder=function(t){this._order=+t};u.prototype.getOrder=function(){return this.hasOwnProperty("_order")?this._order:this.getInitialOrder()};u.prototype.setInitialOrder=function(t){this._initialOrder=+t};u.prototype.getInitialOrder=function(){if(this.hasOwnProperty("_initialOrder")){return this._initialOrder}var t=this.getTable();if(!t){return-1}return t.indexOfColumn(this)};u.prototype.setDisplay=function(t,e){if(!t||this._index<0){return}var i=this._index+1,r=this.getParent(),n=e&&!this.isHidden()?"table-cell":"none",o=t.querySelector("tr > th:nth-child("+i+")"),s=t.querySelectorAll("tr > td:nth-child("+i+")"),a=s.length;o.style.display=n;o.setAttribute("aria-hidden",!e);for(i=0;i<a;i++){s[i].style.display=n;s[i].setAttribute("aria-hidden",!e)}if(r&&r.setTableHeaderVisibility){setTimeout(function(){r.setTableHeaderVisibility(e)},0)}};u.prototype.setWidth=function(t){var e=this.getTable();if(!e){return this.setProperty("width",t)}if(this.getWidth()===t){return this}var i=e.shouldRenderDummyColumn();this.informTable("WidthChanged",t);if(i!==e.shouldRenderDummyColumn()){return this.setProperty("width",t)}var r=e.getAutoPopinMode();this.setProperty("width",t,r);if(r){var n=this.$();n.css("width",t);n.attr("data-sap-width",t)}this.informTable("RecalculateAutoPopin",true);return this};u.prototype.setImportance=function(t){if(this.getImportance()===t){return this}this.setProperty("importance",t,true);this.informTable("RecalculateAutoPopin",true);return this};u.prototype.setAutoPopinWidth=function(t){if(this.getAutoPopinWidth()===t){return this}this.setProperty("autoPopinWidth",t,true);this.informTable("RecalculateAutoPopin",true);return this};u.prototype.setVisible=function(t){if(t==this.getVisible()){return this}var e=this.getParent(),i=e&&e.getTableDomRef&&e.getTableDomRef(),r=i&&this._index>=0;this.setProperty("visible",t,r);if(r){this.informTable("RecalculateAutoPopin",true);this.setDisplay(i,t)}return this};u.prototype._setMinScreenWidth=function(e){this._clearMedia();this._minWidth=0;this._screen="";if(e){e=e.toLowerCase();var i=t.ScreenSizes[e];if(i){this._screen=e;this._minWidth=i+"px"}else{this._isWidthPredefined(e)}var r=this.getTable();if(r&&r.isActive()){this._addMedia()}else{this._bShouldAddMedia=true}}};u.prototype.setMinScreenWidth=function(t){if(t==this.getMinScreenWidth()){return this}this._validateMinWidth(t);this._setMinScreenWidth(t);var e=this.getTable();if(!e){return this.setProperty("minScreenWidth",t)}return this.setProperty("minScreenWidth",t,e.getAutoPopinMode())};u.prototype.setDemandPopin=function(t){if(t==this.getDemandPopin()){return this}if(!this.getMinScreenWidth()){return this.setProperty("demandPopin",t,true)}return this.setProperty("demandPopin",t)};u.prototype.setSortIndicator=function(t){this.setProperty("sortIndicator",t,true);this.$().attr("aria-sort",this.getSortIndicator().toLowerCase());return this};u.prototype.isPopin=function(){if(!this.getDemandPopin()){return false}var t=this.getTable();if(t){var e=t.getHiddenInPopin()||[];var i=e.some(function(t){return this.getImportance()===t},this);if(i){return false}}if(this._media){return!this._media.matches}return false};u.prototype.isHidden=function(){if(this._media){return!this._media.matches}if(this._screen&&this._minWidth){return parseFloat(this._minWidth)>window.innerWidth}return false};u.prototype.setLastValue=function(t){if(this.getMergeDuplicates()){this._lastValue=t}return this};u.prototype.clearLastValue=function(){return this.setLastValue(NaN)};u.prototype.getLastValue=function(){return this._lastValue};u.prototype.onItemsRemoved=function(){this.clearLastValue()};u.prototype.getFocusDomRef=function(){var t=this.getParent();if(t&&t.bActiveHeaders){var i=this.getDomRef();if(i){return i.firstChild}}return e.prototype.getFocusDomRef.apply(this,arguments)};u.prototype.getCalculatedMinScreenWidth=function(){return parseInt(this._minWidth)||0};u.prototype.setForcedColumn=function(t){if(this._bForcedColumn==t){return}this._bForcedColumn=t;this._setMinScreenWidth(t?"":this.getMinScreenWidth())};return u});