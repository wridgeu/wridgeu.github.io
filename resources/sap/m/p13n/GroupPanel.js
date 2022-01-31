/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./QueryPanel","sap/m/HBox","sap/m/CheckBox","sap/ui/layout/Grid"],function(e,t,r,a){"use strict";var n=e.extend("sap.m.p13n.GroupPanel",{metadata:{properties:{enableShowField:{type:"boolean",defaultValue:false}}},renderer:{apiVersion:2}});n.prototype.PRESENCE_ATTRIBUTE="grouped";n.prototype.CHANGE_REASON_SHOWIFGROUPED="showifgrouped";n.prototype._createQueryRowGrid=function(e){var t=e.name;var r=this._createKeySelect(t);var n=new a({containerQuery:true,defaultSpan:this.getEnableShowField()?"XL4 L4 M4 S4":"XL6 L6 M6 S6",content:[r]}).addStyleClass("sapUiTinyMargin");if(this.getEnableShowField()){var o=this._createCheckBox(e);n.addContent(o)}return n};n.prototype._createCheckBox=function(e){var a=e.name;var n=new t({alignItems:"Center",items:[new r({enabled:a?true:false,selected:e.hasOwnProperty("showIfGrouped")?e.showIfGrouped:true,select:function(e){var t=e.getSource().getParent().getParent().getParent().getParent().getParent().getParent();var r=e.oSource.getParent().getParent().getContent()[0].getSelectedItem().getKey();this._changeShowIfGrouped(r,e.getParameter("selected"));t.fireChange({reason:"change",item:{name:r,grouped:true,showIfGrouped:e.getParameter("selected")}})}.bind(this),text:this._getResourceText("p13n.GROUP_CHECKBOX")})]});return n};n.prototype._changeShowIfGrouped=function(e,t){var r=this._getP13nModel().getProperty("/items").filter(function(t){return t.name===e});r[0].showIfGrouped=t;this.fireChange({reason:this.CHANGE_REASON_SHOWIFGROUPED,item:r[0]})};n.prototype._selectKey=function(t){e.prototype._selectKey.apply(this,arguments);var r=t.getSource().getParent().getParent();var a=t.getParameter("selectedItem").getKey();r.getContent()[0].getContent()[1].getItems()[0].setEnabled(a!==this.NONE_KEY)};return n});