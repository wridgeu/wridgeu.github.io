/*
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","../utils/TableUtils","sap/ui/core/Element","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,o,a,i){"use strict";var r=o.extend("sap.ui.table.rowmodes.RowMode",{metadata:{library:"sap.ui.table",abstract:true,properties:{rowCount:{type:"int",defaultValue:10,group:"Appearance"},fixedTopRowCount:{type:"int",defaultValue:0,group:"Appearance"},fixedBottomRowCount:{type:"int",defaultValue:0,group:"Appearance"}}}});var n={};r.prototype.init=function(){this._bFiredRowsUpdatedAfterRendering=false;this._bListeningForFirstRowsUpdatedAfterRendering=false;this._bNoDataDisabled=false;this.updateTableAsync=t.throttle(this.updateTable,50,{asyncLeading:true})};r.prototype.exit=function(){this.detachEvents();this.cancelAsyncOperations();this.deregisterHooks()};r.prototype.setParent=function(){this.detachEvents();this.cancelAsyncOperations();this.deregisterHooks();o.prototype.setParent.apply(this,arguments);this.attachEvents();this.registerHooks()};r.prototype.attachEvents=function(){t.addDelegate(this.getTable(),n,this)};r.prototype.detachEvents=function(){t.removeDelegate(this.getTable(),n)};r.prototype.cancelAsyncOperations=function(){var e=this.getTable();if(e){clearTimeout(e._mTimeouts.refreshRowsCreateRows)}this.updateTableAsync.cancel()};r.prototype.registerHooks=function(){var e=this.getTable();var o=t.Hook.Keys;t.Hook.register(e,o.Table.RowsUnbound,this._onTableRowsUnbound,this);t.Hook.register(e,o.Table.UpdateRows,this._onTableUpdateRows,this)};r.prototype.deregisterHooks=function(){var e=this.getTable();var o=t.Hook.Keys;t.Hook.deregister(e,o.Table.RowsUnbound,this._onTableRowsUnbound,this);t.Hook.deregister(e,o.Table.UpdateRows,this._onTableUpdateRows,this)};r.prototype.getMinRequestLength=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getMinRequestLength")};r.prototype.getComputedRowCounts=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getComputedRowCounts")};r.prototype.getTableStyles=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getTableStyles")};r.prototype.getTableBottomPlaceholderStyles=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getTableBottomPlaceholderStyles")};r.prototype.getRowContainerStyles=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getRowContainerStyles")};r.prototype.getTable=function(){var e=this.getParent();return t.isA(e,"sap.ui.table.Table")?e:null};r.prototype.updateTable=function(e){var t=this.getTable();if(!t){return}this.updateTableAsync.cancel();var o=this.updateTableRows();if(t._bInvalid){return}this.applyTableStyles();this.applyRowContainerStyles();this.applyTableBottomPlaceholderStyles();if(o||t.getRows().some(function(e){return e.getDomRef()==null})){this.renderTableRows()}if(o||t.getRows().length>0){this.fireRowsUpdated(e)}};r.prototype.getBaseRowContentHeight=function(){return 0};r.prototype.getBaseRowHeightOfTable=function(){var e=this.getTable();return e?e._getBaseRowHeight():0};r.prototype.getDefaultRowContentHeightOfTable=function(){var e=this.getTable();return e?e._getDefaultRowContentHeight():0};r.prototype.getTotalRowCountOfTable=function(){var e=this.getTable();return e?e._getTotalRowCount():0};r.prototype._onTableRowsUnbound=function(){clearTimeout(this.getTable()._mTimeouts.refreshRowsCreateRows);this.updateTable(t.RowsUpdateReason.Unbind)};r.prototype._onTableUpdateRows=function(e){var t=this.getTable();clearTimeout(t._mTimeouts.refreshRowsCreateRows);this.updateTableAsync(e)};r.prototype.applyTableStyles=function(e){var t=this.getTableStyles();if(e){e.style("height",t.height);e.style("min-height",t.minHeight);e.style("max-height",t.maxHeight);return}var o=this.getTable();var a=o?o.getDomRef():null;if(a){a.style.height=t.height;a.style.minHeight=t.minHeight;a.style.maxHeight=t.maxHeight}};r.prototype.applyTableBottomPlaceholderStyles=function(e){var t=this.getTableBottomPlaceholderStyles();if(e){e.style("height",t.height);return}var o=this.getTable();var a=o?o.getDomRef("placeholder-bottom"):null;if(a){a.style.height=t.height}};r.prototype.applyRowContainerStyles=function(e){var t=this.getRowContainerStyles();if(e){e.style("height",t.height);e.style("min-height",t.minHeight);e.style("max-height",t.maxHeight);return}var o=this.getTable();var a=o?o.getDomRef("tableCCnt"):null;if(a){a.style.height=t.height;a.style.minHeight=t.minHeight;a.style.maxHeight=t.maxHeight}};r.prototype.sanitizeRowCounts=function(e,t,o){e=Math.max(0,e);t=Math.max(0,t);o=Math.max(0,o);if(t+o>=e){o=Math.max(0,o-Math.max(0,t+o-(e-1)));t=Math.max(0,t-Math.max(0,t+o-(e-1)))}return{count:e,scrollable:e-t-o,fixedTop:t,fixedBottom:o}};r.prototype.renderRowStyles=function(e){};r.prototype.renderCellContentStyles=function(e){};r.prototype.initTableRowsAfterDataRequested=function(e){var t=this.getTable();var o=t.getBinding("rows");clearTimeout(t._mTimeouts.refreshRowsCreateRows);if(!o||e<=0||t.getRows().length>0){return}o.attachEventOnce("dataRequested",function(){clearTimeout(t._mTimeouts.refreshRowsCreateRows);t._mTimeouts.refreshRowsCreateRows=setTimeout(function(){if(t.getRows().length>0){return}var o=s(t,e),a;for(var i=0;i<o.length;i++){a=o[i];a.setRowBindingContext(null,t);t.addAggregation("rows",a,true)}t._bRowAggregationInvalid=false},0)})};r.prototype.updateTableRows=function(){var e=this.getTable();var o=e.getRows();var a=this.getComputedRowCounts().count;var i;var r=false;if(t.isNoDataVisible(e)&&!e.getBinding("rows")){a=0}else if(t.isVariableRowHeightEnabled(e)){a=a+1}if(e._bRowAggregationInvalid){r=o.length>0;e.destroyAggregation("rows",e._bInvalid?"KeepDom":true);o=[]}if(a===o.length){l(this,o);return r}t.dynamicCall(e._getSyncExtension,function(e){e.syncRowCount(a)});if(o.length<a){var n=s(e,a-o.length);o=o.concat(n);l(this,o);for(i=0;i<n.length;i++){e.addAggregation("rows",n[i],true)}}else{for(i=o.length-1;i>=a;i--){e.removeAggregation("rows",i,true)}o.splice(a);l(this,o)}r=true;e._bRowAggregationInvalid=false;return r};r.prototype.renderTableRows=function(){var e=this.getTable();var t=e?e.getDomRef("tableCCnt"):null;if(!t){return}var o=i.Event("BeforeRendering");o.setMarked("renderRows");o.srcControl=e;e._handleEvent(o);var a=sap.ui.getCore().createRenderManager();var r=e.getRenderer();r.renderTableCCnt(a,e);a.flush(t,false,false);a.destroy();var n=i.Event("AfterRendering");n.setMarked("renderRows");n.srcControl=e;e._handleEvent(n);var s=e.getRows().length>0;var l=e.getDomRef();l.querySelector(".sapUiTableCtrlBefore").setAttribute("tabindex",s?"0":"-1");l.querySelector(".sapUiTableCtrlAfter").setAttribute("tabindex",s?"0":"-1")};r.prototype.getRowContexts=function(e,t){var o=this.getTable();if(!o){return[]}return o._getRowContexts(e,t===true)};r.prototype.fireRowsUpdated=function(e){var o=this.getTable();if(!o||!o._bContextsAvailable){return}if(!this._bFiredRowsUpdatedAfterRendering){e=t.RowsUpdateReason.Render;if(!this._bListeningForFirstRowsUpdatedAfterRendering){this._bListeningForFirstRowsUpdatedAfterRendering=true;o.attachEvent("_rowsUpdated",function(){this._bFiredRowsUpdatedAfterRendering=true;this._bListeningForFirstRowsUpdatedAfterRendering=false}.bind(this))}}o._fireRowsUpdated(e)};r.prototype.disableFixedRows=function(){if(this.bFixedRowsDisabled===true){return}Object.defineProperty(this,"bFixedRowsDisabled",{value:true});function e(){a.error("This mode does not support fixed rows",this)}this.setProperty("fixedTopRowCount",0,true);this.setFixedTopRowCount=e;this.setProperty("fixedBottomRowCount",0,true);this.setFixedBottomRowCount=e};r.prototype.disableNoData=function(){var e=this.getTable();var o;if(this._bNoDataDisabled){return}o=e?t.isNoDataVisible(e):false;this._bNoDataDisabled=true;if(!e){return}if(o&&e.getRows().length===0){e.invalidate()}else if(!e._bInvalid){e._updateNoData()}};r.prototype.enableNoData=function(){var e=this.getTable();if(!this._bNoDataDisabled){return}this._bNoDataDisabled=false;if(e&&!e._bInvalid){e._updateNoData()}};function s(e,t){var o=[];var a=e.getRows().length;for(var i=0;i<t;i++){o.push(e._getRowClone(a+i))}return o}function l(e,t){var o=e.getTable();var a=e.getRowContexts(t.length);if(!o||t.length===0){return}for(var i=0;i<t.length;i++){t[i].setRowBindingContext(a[i],o)}}n.onBeforeRendering=function(e){var t=e&&e.isMarked("renderRows");if(!t){this._bFiredRowsUpdatedAfterRendering=false}};return r});