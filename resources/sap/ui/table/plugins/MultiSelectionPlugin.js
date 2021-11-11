/*
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SelectionPlugin","./SelectionModelSelection","./BindingSelection","../library","../utils/TableUtils","sap/ui/core/Icon","sap/ui/core/IconPool","sap/base/Log"],function(e,t,i,n,o,r,l,s){"use strict";var a=n.SelectionMode;var c=e.extend("sap.ui.table.plugins.MultiSelectionPlugin",{metadata:{library:"sap.ui.table",properties:{limit:{type:"int",group:"Behavior",defaultValue:200},enableNotification:{type:"boolean",group:"Behavior",defaultValue:false},showHeaderSelector:{type:"boolean",group:"Appearance",defaultValue:true},selectionMode:{type:"sap.ui.table.SelectionMode",group:"Behavior",defaultValue:a.MultiToggle}},events:{selectionChange:{parameters:{indices:{type:"int[]"},limitReached:{type:"boolean"},customPayload:{type:"object"}}}}}});c.prototype.init=function(){e.prototype.init.apply(this,arguments);var t=new r({src:l.getIconURI(o.ThemeParameters.clearSelectionIcon),useIconTooltip:false});t.addStyleClass("sapUiTableSelectClear");this._bLimitReached=false;this._bLimitDisabled=this.getLimit()===0;this.oInnerSelectionPlugin=null;this.oDeselectAllIcon=t;this._oNotificationPopover=null};c.prototype.exit=function(){if(this.oDeselectAllIcon){this.oDeselectAllIcon.destroy();this.oDeselectAllIcon=null}if(this._oNotificationPopover){this._oNotificationPopover.destroy();this._oNotificationPopover=null}};c.prototype.onActivate=function(t){e.prototype.onActivate.apply(this,arguments);this.oInnerSelectionPlugin=t._createLegacySelectionPlugin();this.oInnerSelectionPlugin.attachSelectionChange(this._onSelectionChange,this);t.addAggregation("_hiddenDependents",this.oInnerSelectionPlugin);t.setProperty("selectionMode",this.getSelectionMode())};c.prototype.onDeactivate=function(t){e.prototype.onDeactivate.apply(this,arguments);t.detachFirstVisibleRowChanged(this.onFirstVisibleRowChange,this);if(this._oNotificationPopover){this._oNotificationPopover.close()}if(this.oInnerSelectionPlugin){this.oInnerSelectionPlugin.destroy();this.oInnerSelectionPlugin=null}};c.prototype.getRenderConfig=function(){return{headerSelector:{type:this._bLimitDisabled?"toggle":"clear",icon:this.oDeselectAllIcon,visible:this.getSelectionMode()===a.MultiToggle&&this.getShowHeaderSelector(),enabled:this._bLimitDisabled||this.getSelectedCount()>0}}};c.prototype.onHeaderSelectorPress=function(){var e=this.getRenderConfig();if(!e.headerSelector.visible||!e.headerSelector.enabled){return}if(e.headerSelector.type==="toggle"){h(this)}else if(e.headerSelector.type==="clear"){this.clearSelection()}};c.prototype.onKeyboardShortcut=function(e){if(e==="toggle"){if(this._bLimitDisabled){h(this)}}else if(e==="clear"){this.clearSelection()}};function h(e){if(e.getSelectableCount()>e.getSelectedCount()){e.selectAll()}else{e.clearSelection()}}c.prototype.setSelectionMode=function(e){var t=this.getSelectionMode();var i=this.getParent();if(i){i.setProperty("selectionMode",e,true)}this.setProperty("selectionMode",e);if(this.getSelectionMode()!==t){this.clearSelection()}return this};c.prototype.setLimit=function(e){if(typeof e==="number"&&e<0){s.warning("The limit must be greater than or equal to 0",this);return this}this.setProperty("limit",e,!!this.getLimit()===!!e);this._bLimitDisabled=e===0;return this};c.prototype.setEnableNotification=function(e){this.setProperty("enableNotification",e,true);return this};c.prototype.isLimitReached=function(){return this._bLimitReached};c.prototype.setLimitReached=function(e){this._bLimitReached=e};c.prototype.selectAll=function(e){if(!this._bLimitDisabled){return Promise.reject(new Error("Not possible if the limit is enabled"))}var t=this.getSelectableCount();if(t===0){return Promise.reject(new Error("Nothing to select"))}return this.addSelectionInterval(0,this._getHighestSelectableIndex(),e)};function u(e,t,i,n){var o=e._getHighestSelectableIndex();if(t<0&&i<0||t>o&&i>o){return Promise.reject(new Error("Out of range"))}t=Math.min(Math.max(0,t),o);i=Math.min(Math.max(0,i),o);var r=e.getLimit();var l=i<t;var s=l?i:t;var a;if(n&&e.isIndexSelected(t)){if(l){t--}else if(t!==i){t++;s++}}a=Math.abs(i-t)+1;if(!e._bLimitDisabled){e.setLimitReached(a>r);if(e.isLimitReached()){if(l){i=t-r+1}else{i=t+r-1}a=r+1}}return d(e.getTableBinding(),s,a).then(function(){return{indexFrom:t,indexTo:i}})}c.prototype.setSelectionInterval=function(e,t,i){var n=this.getSelectionMode();if(n===a.None){return Promise.reject(new Error("SelectionMode is '"+a.None+"'"))}if(n===a.Single){e=t}return u(this,e,t,false).then(function(e){this._oCustomEventPayloadTmp=i;this.oInnerSelectionPlugin.setSelectionInterval(e.indexFrom,e.indexTo);delete this._oCustomEventPayloadTmp;return this._scrollTableToIndex(e.indexTo,e.indexFrom>e.indexTo)}.bind(this))};c.prototype.setSelectedIndex=function(e,t){return this.setSelectionInterval(e,e,t)};c.prototype.addSelectionInterval=function(e,t,i){var n=this.getSelectionMode();if(n===a.None){return Promise.reject(new Error("SelectionMode is '"+a.None+"'"))}if(n===a.Single){return this.setSelectionInterval(t,t)}if(n===a.MultiToggle){return u(this,e,t,true).then(function(e){this._oCustomEventPayloadTmp=i;this.oInnerSelectionPlugin.addSelectionInterval(e.indexFrom,e.indexTo);delete this._oCustomEventPayloadTmp;return this._scrollTableToIndex(e.indexTo,e.indexFrom>e.indexTo)}.bind(this))}};c.prototype._scrollTableToIndex=function(e,t){var i=this.getParent();if(!i||!this.isLimitReached()){return Promise.resolve()}var n=i.getFirstVisibleRow();var o=i._getRowCounts();var r=n+o.scrollable-1;var l=false;if(e<n||e>r){var s=t?e-o.fixedTop-1:e-o.scrollable-o.fixedTop+2;l=i._setFirstVisibleRowIndex(Math.max(0,s))}this._showNotificationPopoverAtIndex(e);return new Promise(function(e){if(l){i.attachEventOnce("rowsUpdated",e)}else{e()}})};c.prototype._showNotificationPopoverAtIndex=function(e){var t=this;var i=this._oNotificationPopover;var n=this.getParent();var l=n.getRows()[e-n._getFirstRenderedRowIndex()];var s=o.getResourceText("TBL_SELECT_LIMIT_TITLE");var a=o.getResourceText("TBL_SELECT_LIMIT",[this.getLimit()]);if(!this.getEnableNotification()){return Promise.resolve()}return new Promise(function(e){sap.ui.require(["sap/m/Popover","sap/m/Bar","sap/m/Title","sap/m/Text","sap/m/HBox","sap/ui/core/library","sap/m/library"],function(o,c,h,u,d,p,f){if(!i){i=new o(t.getId()+"-notificationPopover",{customHeader:[new c({contentMiddle:[new d({items:[new r({src:"sap-icon://message-warning",color:p.IconColor.Critical}).addStyleClass("sapUiTinyMarginEnd"),new h({text:s,level:p.TitleLevel.H2})],renderType:f.FlexRendertype.Bare,justifyContent:f.FlexJustifyContent.Center,alignItems:f.FlexAlignItems.Center})]})],content:new u({text:a})});i.addStyleClass("sapUiContentPadding");t._oNotificationPopover=i}else{i.getContent()[0].setText(a)}n.detachFirstVisibleRowChanged(t.onFirstVisibleRowChange,t);n.attachFirstVisibleRowChanged(t.onFirstVisibleRowChange,t);var g=l.getDomRefs().rowSelector;if(g){i.attachEventOnce("afterOpen",e);i.openBy(g)}else{e()}})})};c.prototype.onFirstVisibleRowChange=function(){if(!this._oNotificationPopover){return}var e=this.getParent();if(e){e.detachFirstVisibleRowChanged(this.onFirstVisibleRowChange,this)}this._oNotificationPopover.close()};function d(e,t,i){return new Promise(function(n){p(e,t,i,n)})}function p(e,t,i,n){var o=e.getContexts(t,i,0,true);var r=false;for(var l=0;l<o.length;l++){if(!o[l]){r=true;break}}if(!r&&!o.dataRequested){n(o);return}e.attachEventOnce("dataReceived",function(){if(o.length==i){n(o)}else{p(e,t,i,n)}})}c.prototype.clearSelection=function(e){if(this.oInnerSelectionPlugin){this.setLimitReached(false);this._oCustomEventPayloadTmp=e;this.oInnerSelectionPlugin.clearSelection();delete this._oCustomEventPayloadTmp}};c.prototype.getSelectedIndex=function(){if(this.oInnerSelectionPlugin){return this.oInnerSelectionPlugin.getSelectedIndex()}return-1};c.prototype.getSelectedIndices=function(){if(this.oInnerSelectionPlugin){return this.oInnerSelectionPlugin.getSelectedIndices()}return[]};c.prototype.getSelectableCount=function(){if(this.oInnerSelectionPlugin){return this.oInnerSelectionPlugin.getSelectableCount()}return 0};c.prototype.getSelectedCount=function(){if(this.oInnerSelectionPlugin){return this.oInnerSelectionPlugin.getSelectedCount()}return 0};c.prototype.isIndexSelectable=function(e){if(this.oInnerSelectionPlugin){return this.oInnerSelectionPlugin.isIndexSelectable(e)}return false};c.prototype.isIndexSelected=function(e){if(this.oInnerSelectionPlugin){return this.oInnerSelectionPlugin.isIndexSelected(e)}return false};c.prototype.removeSelectionInterval=function(e,t,i){if(this.oInnerSelectionPlugin){this.setLimitReached(false);this._oCustomEventPayloadTmp=i;this.oInnerSelectionPlugin.removeSelectionInterval(e,t);delete this._oCustomEventPayloadTmp}};c.prototype._onSelectionChange=function(e){var t=e.getParameter("rowIndices");this.fireSelectionChange({rowIndices:t,limitReached:this.isLimitReached(),customPayload:typeof this._oCustomEventPayloadTmp==="object"?this._oCustomEventPayloadTmp:null})};c.prototype._getHighestSelectableIndex=function(){if(this.oInnerSelectionPlugin){return this.oInnerSelectionPlugin._getHighestSelectableIndex()}return 0};c.prototype.onThemeChanged=function(){this.oDeselectAllIcon.setSrc(l.getIconURI(o.ThemeParameters.clearSelectionIcon))};return c});