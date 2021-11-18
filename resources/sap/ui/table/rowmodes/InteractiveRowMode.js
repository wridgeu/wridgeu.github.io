/*
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","./RowMode","../utils/TableUtils","sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e,o,i,n){"use strict";var r=e.extend("sap.ui.table.rowmodes.InteractiveRowMode",{metadata:{library:"sap.ui.table",final:true,properties:{rowCount:{type:"int",defaultValue:10,group:"Appearance"},minRowCount:{type:"int",defaultValue:5,group:"Appearance"},fixedTopRowCount:{type:"int",defaultValue:0,group:"Appearance"},fixedBottomRowCount:{type:"int",defaultValue:0,group:"Appearance"},rowContentHeight:{type:"int",defaultValue:0,group:"Appearance"}}},constructor:function(t){Object.defineProperty(this,"bLegacy",{value:typeof t==="boolean"?t:false});e.apply(this,arguments)}});var a={};var s={};r.prototype.attachEvents=function(){e.prototype.attachEvents.apply(this,arguments);o.addDelegate(this.getTable(),a,this)};r.prototype.detachEvents=function(){e.prototype.detachEvents.apply(this,arguments);o.removeDelegate(this.getTable(),a)};r.prototype.registerHooks=function(){e.prototype.registerHooks.apply(this,arguments);o.Hook.register(this.getTable(),o.Hook.Keys.Table.RefreshRows,this._onTableRefreshRows,this)};r.prototype.deregisterHooks=function(){e.prototype.deregisterHooks.apply(this,arguments);o.Hook.deregister(this.getTable(),o.Hook.Keys.Table.RefreshRows,this._onTableRefreshRows,this)};r.prototype.getRowCount=function(){if(this.bLegacy){var t=this.getTable();return t?t.getVisibleRowCount():0}return this.getProperty("rowCount")};r.prototype.getFixedTopRowCount=function(){if(this.bLegacy){var t=this.getTable();return t?t.getFixedRowCount():0}return this.getProperty("fixedTopRowCount")};r.prototype.getFixedBottomRowCount=function(){if(this.bLegacy){var t=this.getTable();return t?t.getFixedBottomRowCount():0}return this.getProperty("fixedBottomRowCount")};r.prototype.getMinRowCount=function(){if(this.bLegacy){var t=this.getTable();return t?t.getMinAutoRowCount():0}return this.getProperty("minRowCount")};r.prototype.getRowContentHeight=function(){if(this.bLegacy){var t=this.getTable();return t?t.getRowHeight():0}return this.getProperty("rowContentHeight")};r.prototype.getMinRequestLength=function(){return this.getConfiguredRowCount()};r.prototype.getComputedRowCounts=function(){var t=this.getConfiguredRowCount();var e=this.getFixedTopRowCount();var o=this.getFixedBottomRowCount();return this.computeStandardizedRowCounts(t,e,o)};r.prototype.getTableStyles=function(){return{height:"auto"}};r.prototype.getTableBottomPlaceholderStyles=function(){return undefined};r.prototype.getRowContainerStyles=function(){var t=this.getComputedRowCounts().count*this.getBaseRowHeightOfTable()+"px";if(this.bLegacy&&!o.isVariableRowHeightEnabled(this.getTable())){return{minHeight:t}}else{return{height:t}}};r.prototype.renderRowStyles=function(t){var e=this.getRowContentHeight();if(e>0){t.style("height",this.getBaseRowHeightOfTable()+"px")}};r.prototype.renderCellContentStyles=function(t){var e=this.getRowContentHeight();if(this.bLegacy){return}if(e<=0){e=this.getDefaultRowContentHeightOfTable()}if(e>0){t.style("max-height",e+"px")}};r.prototype.getBaseRowContentHeight=function(){return Math.max(0,this.getRowContentHeight())};r.prototype._onTableRefreshRows=function(){var t=this.getConfiguredRowCount();if(t>0){this.initTableRowsAfterDataRequested(t);this.getRowContexts(t,true)}};r.prototype.getConfiguredRowCount=function(){return Math.max(0,this.getMinRowCount(),this.getRowCount())};a.onBeforeRendering=function(t){var e=t&&t.isMarked("renderRows");if(this.bLegacy){this.getTable().setVisibleRowCount(this.getComputedRowCounts().count)}if(!e){this.updateTable(o.RowsUpdateReason.Render)}};a.onAfterRendering=function(t){var e=this.getTable();var i=t&&t.isMarked("renderRows");if(!i&&e.getRows().length>0){this.fireRowsUpdated(o.RowsUpdateReason.Render)}};a.onmousedown=function(t){var e=this.getTable();if(t.button===0&&t.target===e.getDomRef("sb")){s.initInteractiveResizing(e,this,t)}};s.initInteractiveResizing=function(t,e,o){var i=n(document.body);var r=t.$("sb");var a=n(document);var u=r.offset();var p=r.height();var g=r.width();var h=t._isTouchEvent(o);var l=document.createElement("div");l.style.width=g+"px";l.style.height=p+"px";l.style.left=u.left+"px";l.style.top=u.top+"px";l.className="sapUiTableInteractiveResizerGhost";l.id=t.getId()+"-ghost";i.append(l);var f=document.createElement("div");f.style.top="0px";f.style.bottom="0px";f.style.left="0px";f.style.right="0px";f.style.position="absolute";f.id=t.getId()+"-rzoverlay";r.append(f);a.on((h?"touchend":"mouseup")+".sapUiTableInteractiveResize",s.exitInteractiveResizing.bind(t,e));a.on((h?"touchmove":"mousemove")+".sapUiTableInteractiveResize",s.onMouseMoveWhileInteractiveResizing.bind(t));t._disableTextSelection()};s.exitInteractiveResizing=function(t,e){var o=n(document);var i=this.$();var r=this.$("ghost");var a=s.getEventPosition(this,e).y;var u=a-i.find(".sapUiTableCCnt").offset().top-r.height()-i.find(".sapUiTableFtr").height();var p=Math.floor(u/t.getBaseRowHeightOfTable());var g=Math.max(1,p,t.getMinRowCount());if(t.bLegacy){g=Math.max(g,t.getFixedTopRowCount()+t.getFixedBottomRowCount()+1);this.setVisibleRowCount(g)}t.setRowCount(g);r.remove();this.$("rzoverlay").remove();o.off("touchend.sapUiTableInteractiveResize");o.off("touchmove.sapUiTableInteractiveResize");o.off("mouseup.sapUiTableInteractiveResize");o.off("mousemove.sapUiTableInteractiveResize");this._enableTextSelection()};s.onMouseMoveWhileInteractiveResizing=function(t){var e=s.getEventPosition(this,t).y;var o=this.$().offset().top;if(e>o){this.$("ghost").css("top",e+"px")}};s.getEventPosition=function(t,e){var o;function i(o){if(!t._isTouchEvent(o)){return null}var i=["touches","targetTouches","changedTouches"];for(var n=0;n<i.length;n++){var r=i[n];if(e[r]&&e[r][0]){return e[r][0]}if(e.originalEvent[r]&&e.originalEvent[r][0]){return e.originalEvent[r][0]}}return null}o=i(e)||e;return{x:o.pageX,y:o.pageY}};return r});