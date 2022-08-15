/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/Grid","./BasePanel","sap/ui/core/ListItem","sap/m/CustomListItem","sap/m/ComboBox","sap/m/List","sap/m/HBox","sap/m/library","sap/m/Button","sap/base/util/merge","sap/ui/core/library"],function(t,e,n,i,r,o,s,a,u,h,l){"use strict";var g=l.ValueState;var p=e.extend("sap.m.p13n.QueryPanel",{metadata:{library:"sap.m",properties:{queryLimit:{type:"int",defaultValue:-1}}},renderer:{apiVersion:2}});var d=a.ListType;var m=a.FlexJustifyContent;var _=a.ButtonType;p.prototype.init=function(){e.prototype.init.apply(this,arguments);this._bFocusOnRearrange=false;this.setEnableReorder(true);this.addStyleClass("sapMP13nQueryPanel")};p.prototype.setP13nData=function(t){e.prototype.setP13nData.apply(this,arguments);this._oListControl.removeAllItems();if(t instanceof Array){t.forEach(function(t){if(t[this.PRESENCE_ATTRIBUTE]){this._addQueryRow(t)}}.bind(this));this._addQueryRow()}return this};p.prototype.getP13nData=function(t){var e=[];this._oListControl.getItems().forEach(function(t){var n=t.getContent()[0].getContent()[0]._key;if(n){var i=this._getP13nModel().getProperty("/items").find(function(t){return t.name==n});e.push(i)}}.bind(this));if(!t){this._getP13nModel().getProperty("/items").forEach(function(t){if(e.indexOf(t)===-1){e.push(t)}})}return h([],e)};p.prototype._allEntriesUsed=function(){return this.getP13nData().length===this.getP13nData(true).length};p.prototype._moveTableItem=function(t,e){var n=this._oListControl.getItems().indexOf(t);var i=this._oListControl.getItems().length-1;var r=this.getQueryLimit();if((n!==i||this._allEntriesUsed())&&(r===-1||e<r)){this._oListControl.removeItem(t);this._oListControl.insertItem(t,e);this._updateEnableOfMoveButtons(t,false);this._getP13nModel().checkUpdate(true);this.fireChange({reason:this.CHANGE_REASON_MOVE,item:this._getModelEntry(t)})}};p.prototype._updateEnableOfMoveButtons=function(t,n){e.prototype._updateEnableOfMoveButtons.apply(this,arguments);if(this._oListControl.getItems().indexOf(t)===this._oListControl.getItems().length-2&&!this._allEntriesUsed()){this._getMoveDownButton().setEnabled(false)}};p.prototype._createInnerListControl=function(){return new o(this.getId()+"-innerP13nList",{itemPress:[this._onItemPressed,this],dragDropConfig:this._getDragDropConfig()})};p.prototype._getModelEntry=function(t){var e=t.getContent()[0].getContent()[0]._key;var n=this._getP13nModel().getProperty("/items").find(function(t){return t.name==e});return n};p.prototype._getAvailableItems=function(t){var e=this._getP13nModel().getProperty("/items");var i=[];e.forEach(function(t,e){i.push(new n({key:t.name,text:t.label,enabled:{path:this.P13N_MODEL+">/items/"+e+"/"+this.PRESENCE_ATTRIBUTE,formatter:function(t){var e=this.getParent();var n=e.getSelectedItem();var i=n&&e.getItems().indexOf(n);var r=this.getBindingPath("enabled");var o=parseInt(r.split("/")[2]);return!t||i===o}}}))}.bind(this));return i};p.prototype._addQueryRow=function(t){var e=this.getQueryLimit()>-1;var n=this.getQueryLimit()<=this._oListControl.getItems().length;if(e&&n&&!t||this._allEntriesUsed()){return}t=t?t:{name:null};var r=this._createQueryRowGrid(t);var o=new i({type:d.Active,content:[r]});if(this.getEnableReorder()&&(this.getQueryLimit()===-1||this.getQueryLimit()>1&&this._oListControl.getItems().length<this.getQueryLimit())){this._addHover(o)}o.getContent()[0].getContent()[0]._key=t.name;this._oListControl.addItem(o);var s=!!t.name;var a=this._createRemoveButton(s);o.getContent()[0].addContent(a);return o};p.prototype._createQueryRowGrid=function(e){var n=this._createKeySelect(e.name);return new t({containerQuery:true,defaultSpan:"XL6 L6 M6 S6",content:[n]}).addStyleClass("sapUiTinyMargin")};p.prototype._handleActivated=function(t){var e=t.getContent()[0];if(e){var n=e.getContent().length-1;var i=t.getContent()[0].getContent()[n];if(t&&i.getItems().length<2){i.insertItem(this._getMoveUpButton(),0);i.insertItem(this._getMoveDownButton(),1);this._updateEnableOfMoveButtons(t,false)}}};p.prototype._getPlaceholderText=function(){return""};p.prototype._getRemoveButtonTooltipText=function(){return""};p.prototype._createKeySelect=function(t){var e=this;var n=new r({width:"14rem",enabled:{path:this.P13N_MODEL+">/items/",formatter:function(t){if(e.getQueryLimit()<0){return true}var n=e.getP13nData(true).map(function(t){return t.name});var i=this._key;var r=n.indexOf(i)+1;return r<=e.getQueryLimit()}},items:this._getAvailableItems(t),selectedKey:t,placeholder:this._getPlaceholderText(),selectionChange:function(t){var e=t.getSource();var n=e.getSelectedItem();if(!n){this._selectKey(e)}}.bind(this),change:function(t){var e=t.getSource();var n=t.getParameter("newValue");this._selectKey(e);e.setValueState(n&&!e.getSelectedItem()?g.Error:g.None)}.bind(this)});return n};p.prototype._selectKey=function(t){var e=t.getSelectedKey();var n=t._key;var i=t.getParent().getParent();var r=this._oListControl.getItems().length-1==this._oListControl.getItems().indexOf(i);var o=i.getContent()[0].getContent();var s=o[o.length-1];s.setVisible(!(r&&e==""));if(n){this._updatePresence(n,false,undefined)}t._key=e;this._updatePresence(e,true,this._oListControl.getItems().indexOf(i));if(e!==""&&r){this._addQueryRow()}};p.prototype._createRemoveButton=function(t){var e=new s({justifyContent:m.End,width:"100%",visible:t,items:[new u({type:_.Transparent,icon:"sap-icon://decline",press:function(t){var e=t.getSource().getParent().getParent().getParent();var n=this._oListControl.getItems().length;var i=n===1||n==this.getP13nData(true).length;this._oListControl.removeItem(e);this._updatePresence(e.getContent()[0].getContent()[0]._key,false,undefined);if(i){this._addQueryRow()}else{var r=this._oListControl.getItems().length-1;this._oListControl.getItems()[r].getContent()[0].getContent()[0].focus()}this._getP13nModel().checkUpdate(true)}.bind(this)})]});if(this._getRemoveButtonTooltipText()){e.getItems()[0].setTooltip(this._getRemoveButtonTooltipText())}return e};p.prototype._moveSelectedItem=function(){this._oSelectedItem=this._getMoveUpButton().getParent().getParent().getParent();e.prototype._moveSelectedItem.apply(this,arguments)};p.prototype._updatePresence=function(t,e,n){var i=this._getP13nModel().getProperty("/items");var r=i.filter(function(e){return e.name===t});if(r[0]){r[0][this.PRESENCE_ATTRIBUTE]=e}this._getP13nModel().setProperty("/items",i);this.fireChange({reason:e?this.CHANGE_REASON_ADD:this.CHANGE_REASON_REMOVE,item:r[0]})};return p});