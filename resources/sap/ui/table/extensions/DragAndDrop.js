/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils","sap/ui/core/library"],function(t,e,o){"use strict";var i="sap.ui.table";var r=o.dnd.DropPosition;var a={getSessionData:function(t,e){return t.getComplexData(i+(e==null?"":"-"+e))},setSessionData:function(t,e,o){t.setComplexData(i+(o==null?"":"-"+o),e)},getInstanceSessionData:function(t,e){return this.getSessionData(t,e.getId())},setInstanceSessionData:function(t,e,o){this.setSessionData(t,o,e.getId())}};var n={ondragstart:function(t){var e=t.dragSession;if(!e||!e.getDragControl()){return}var o=e.getDragControl();var i={};if(o.isA("sap.ui.table.Row")){if(o.isEmpty()||o.isGroupHeader()||o.isSummary()){t.preventDefault();return}else{i.draggedRowContext=o.getRowBindingContext()}}a.setInstanceSessionData(e,this,i)},ondragenter:function(t){var o=t.dragSession;if(!o||!o.getDropControl()){return}var i=a.getInstanceSessionData(o,this);var n=o.getDragControl();var s=o.getDropControl();if(!i){i={}}if(s.isA("sap.ui.table.Row")){var l=i.draggedRowContext;var g=s.getRowBindingContext();var f=o.getDropInfo().getDropPosition();if(s.isEmpty()&&f===r.On&&e.hasData(this)||l&&l===g||s.isGroupHeader()||s.isSummary()){t.setMarked("NonDroppable")}else{if(!g){var d=this.getRows()[e.getNonEmptyRowCount(this)-1];o.setDropControl(d||this)}if(o.getDropControl()!==this){var p=this.getDomRef().classList.contains("sapUiTableVScr");var v=this.getDomRef("sapUiTableCnt").getBoundingClientRect();o.setIndicatorConfig({width:v.width-(p?16:0),left:v.left+(this._bRtlMode&&p?16:0)})}}}else if(s.isA("sap.ui.table.Column")){var v=this.getDomRef("sapUiTableCnt").getBoundingClientRect();o.setIndicatorConfig({height:v.height-(this._getScrollExtension().isHorizontalScrollbarVisible()?16:0)})}else if(n===s){t.setMarked("NonDroppable")}if(!i.verticalScrollEdge){var c=window.pageYOffset;var u=this.getDomRef("table").getBoundingClientRect();i.verticalScrollEdge={bottom:u.bottom+c,top:u.top+c}}var D=window.pageXOffset;var h=this.getDomRef("sapUiTableCtrlScr").getBoundingClientRect();i.horizontalScrollEdge={left:h.left+D,right:h.right+D};a.setInstanceSessionData(o,this,i)},ondragover:function(t){var e=t.dragSession;if(!e){return}var o=a.getInstanceSessionData(e,this);if(!o){return}var i=32;var r=50;var n=e.getDropControl();var s=this._getScrollExtension();var l=s.getVerticalScrollbar();var g=s.getHorizontalScrollbar();var f=o.verticalScrollEdge;var d=o.horizontalScrollEdge;if(f&&l&&n!==this){var p=t.pageY;if(p>=f.top-r&&p<=f.top+r){l.scrollTop-=i}else if(p<=f.bottom+r&&p>=f.bottom-r){l.scrollTop+=i}}if(d&&g&&n!==this){var v=t.pageX;if(v>=d.left-r&&v<=d.left+r){g.scrollLeft-=i}else if(v<=d.right+r&&v>=d.right-r){g.scrollLeft+=i}}},onlongdragover:function(t){var o=t.dragSession;if(!o){return}var i=e.getCell(this,t.target);var r=e.getCellInfo(i).rowIndex;var a=r==null?null:this.getRows()[r];var n=o.getDropControl();if(a&&(n===a||!n)){a.expand()}}};var s=t.extend("sap.ui.table.extensions.DragAndDrop",{_init:function(t,o,i){this._oDelegate=n;e.addDelegate(t,this._oDelegate,t);return"DragAndDropExtension"},_debug:function(){this._ExtensionDelegate=n},destroy:function(){var e=this.getTable();if(e){e.removeEventDelegate(this._oDelegate)}this._oDelegate=null;t.prototype.destroy.apply(this,arguments)}});return s});