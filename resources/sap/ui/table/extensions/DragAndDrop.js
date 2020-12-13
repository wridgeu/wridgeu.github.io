/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils","sap/ui/core/library"],function(t,e,o){"use strict";var r="sap.ui.table";var i=o.dnd.DropPosition;var a={getSessionData:function(t,e){return t.getComplexData(r+(e==null?"":"-"+e))},setSessionData:function(t,e,o){t.setComplexData(r+(o==null?"":"-"+o),e)},getInstanceSessionData:function(t,e){return this.getSessionData(t,e.getId())},setInstanceSessionData:function(t,e,o){this.setSessionData(t,o,e.getId())}};var n={ondragstart:function(t){var e=t.dragSession;if(!e||!e.getDragControl()){return}var o=e.getDragControl();var r={};if(o.isA("sap.ui.table.Row")){if(o.isEmpty()||o.isGroupHeader()||o.isSummary()){t.preventDefault();return}else{r.draggedRowContext=o.getRowBindingContext()}}a.setInstanceSessionData(e,this,r)},ondragenter:function(t){var o=t.dragSession;if(!o||!o.getDropControl()){return}var r=a.getInstanceSessionData(o,this);var n=o.getDragControl();var s=o.getDropControl();if(!r){r={}}if(s.isA("sap.ui.table.Row")){var l=r.draggedRowContext;var g=s.getRowBindingContext();var f=o.getDropInfo().getDropPosition();if(s.isEmpty()&&f===i.On&&e.hasData(this)||l&&l===g||s.isGroupHeader()||s.isSummary()){t.setMarked("NonDroppable")}else{if(!g){var u=this.getRows()[e.getNonEmptyRowCount(this)-1];o.setDropControl(u||this)}if(o.getDropControl()!==this){var d=this.getDomRef().classList.contains("sapUiTableVScr");var p=this.getDomRef("sapUiTableCnt").getBoundingClientRect();o.setIndicatorConfig({width:p.width-(d?16:0),left:p.left+(this._bRtlMode&&d?16:0)})}}}else if(s.isA("sap.ui.table.Column")){var p=this.getDomRef("sapUiTableCnt").getBoundingClientRect();o.setIndicatorConfig({height:p.height-(this._getScrollExtension().isHorizontalScrollbarVisible()?16:0)})}else if(n===s){t.setMarked("NonDroppable")}if(!r.verticalScrollEdge){var v=window.pageYOffset;var c=this.getDomRef("table").getBoundingClientRect();r.verticalScrollEdge={bottom:c.bottom+v,top:c.top+v}}var h=window.pageXOffset;var D=this.getDomRef("sapUiTableCtrlScr").getBoundingClientRect();r.horizontalScrollEdge={left:D.left+h,right:D.right+h};a.setInstanceSessionData(o,this,r)},ondragover:function(t){var e=t.dragSession;if(!e){return}var o=a.getInstanceSessionData(e,this);if(!o){return}var r=32;var i=50;var n=e.getDropControl();var s=this._getScrollExtension();var l=s.getVerticalScrollbar();var g=s.getHorizontalScrollbar();var f=o.verticalScrollEdge;var u=o.horizontalScrollEdge;if(f&&l&&n!==this){var d=t.pageY;if(d>=f.top-i&&d<=f.top+i){l.scrollTop-=r}else if(d<=f.bottom+i&&d>=f.bottom-i){l.scrollTop+=r}}if(u&&g&&n!==this){var p=t.pageX;if(p>=u.left-i&&p<=u.left+i){g.scrollLeft-=r}else if(p<=u.right+i&&p>=u.right-i){g.scrollLeft+=r}}},onlongdragover:function(t){var o=t.dragSession;if(!o){return}var r=e.getCell(this,t.target);var i=e.getCellInfo(r).rowIndex;var a=i==null?null:this.getRows()[i];var n=o.getDropControl();if(a&&(n==a||!n)){e.Grouping.toggleGroupHeader(this,a.getIndex(),true)}}};var s=t.extend("sap.ui.table.extensions.DragAndDrop",{_init:function(t,o,r){this._oDelegate=n;e.addDelegate(t,this._oDelegate,t);return"DragAndDropExtension"},_debug:function(){this._ExtensionDelegate=n},destroy:function(){var e=this.getTable();if(e){e.removeEventDelegate(this._oDelegate)}this._oDelegate=null;t.prototype.destroy.apply(this,arguments)}});return s});