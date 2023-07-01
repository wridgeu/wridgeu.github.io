/*
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Text","./Title","./Label","./Column","./Button","./Dialog","./ColumnListItem","./Table","./Toolbar","./Bar","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectRegistry","sap/base/Log","sap/base/util/deepExtend","sap/m/library","sap/ui/Device","sap/ui/model/Sorter","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/m/SearchField","sap/ui/core/Configuration","sap/ui/core/library"],function(t,e,o,i,n,s,a,l,r,h,u,p,c,d,g,_,m,f,I,b,S,T,C){"use strict";var y=g.ButtonType;var D=g.ListMode;var w=g.WrappingType;var P=C.TitleLevel;var v=u.extend("sap.m.TablePersoDialog",{constructor:function(t,e){u.apply(this,arguments)},metadata:{deprecated:true,properties:{contentWidth:{type:"sap.ui.core.CSSSize"},contentHeight:{type:"sap.ui.core.CSSSize",since:"1.22"},persoMap:{type:"object"},columnInfoCallback:{type:"object",since:"1.22"},initialColumnState:{type:"object",since:"1.22"},hasGrouping:{type:"boolean",since:"1.22"},showSelectAll:{type:"boolean",since:"1.22"},showResetAll:{type:"boolean",since:"1.22"}},aggregations:{persoService:{type:"Object",multiple:false,deprecated:true}},associations:{persoDialogFor:"sap.m.Table"},events:{confirm:{},cancel:{}},library:"sap.m"}});p.apply(v,{onDuplicate:function(t,e,o){if(e._sapui_candidateForDestroy){c.debug("destroying dangling template "+e+" when creating new object with same ID");e.destroy()}else{var i="adding TablePersoDialog with duplicate id '"+t+"'";if(T.getNoDuplicateIds()){c.error(i);throw new Error("Error: "+i)}else{c.warning(i)}}}});v.prototype.init=function(){var u=this,p=0;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oP13nModel=new b;this._oP13nModel.setSizeLimit(Number.MAX_VALUE);this._oColumnItemTemplate=new a(this.getId()+"-cli",{selected:"{Personalization>visible}",type:"Active",cells:[new o({wrapping:true,wrappingType:w.Hyphenated,text:"{Personalization>text}"})],press:function(t){this._oSelectedItem=t.oSource;this._fnUpdateArrowButtons.call(this)}.bind(this)}).addStyleClass("sapMPersoDialogLI");this._oButtonUp=new n(this.getId()+"-buttonUp",{icon:"sap-icon://navigation-up-arrow",enabled:false,tooltip:u._oRb.getText("PERSODIALOG_UP"),press:function(){u._moveItem(-1)}});this._oButtonDown=new n(this.getId()+"-buttonDown",{icon:"sap-icon://navigation-down-arrow",enabled:false,tooltip:u._oRb.getText("PERSODIALOG_DOWN"),press:function(){u._moveItem(1)}});this._fnUpdateArrowButtons=function(){if(this.getHasGrouping()){return}var t=this._oInnerTable.getModel("Personalization").getProperty("/aColumns");var e,o;if(!this._oSelectedItem||this._oInnerTable.getItems().length==0){e=false;o=false;this._oSelectedItem=null}else{var i=t.indexOf(this._oSelectedItem.getBindingContext("Personalization").getObject());e=i>0?true:false;o=i<t.length-1?true:false}this._updateMarkedItem();u._oButtonUp.setEnabled(e);u._oButtonDown.setEnabled(o)}.bind(this);this._fnAfterDialogOpen=function(){u._fnUpdateArrowButtons.call(u)};this._oInnerTable=new l(this.getId()+"-colTable",{noDataText:this._oRb.getText("PERSODIALOG_NO_DATA"),mode:D.MultiSelect,width:"100%",sticky:["ColumnHeaders"],columns:[new i({header:new t({text:this._oRb.getText("PERSODIALOG_SELECT_ALL")})})]});this._oSearchField=new S(this.getId()+"-searchField",{width:"100%",liveChange:function(t){var e=t.getSource().getValue(),o=e?300:0;clearTimeout(p);if(o){p=setTimeout(function(){u._executeSearch()},o)}else{u._executeSearch()}},search:function(){u._executeSearch()}});this._resetAllButton=new n(this.getId()+"-buttonUndo",{text:this._oRb.getText("VIEWSETTINGS_RESET"),press:function(){this._resetAll()}.bind(this)}).addStyleClass("sapMPersoDialogResetBtn");var c=new h({contentLeft:new e(this.getId()+"-Dialog-title",{text:this._oRb.getText("PERSODIALOG_COLUMNS_TITLE"),level:P.H1}),contentRight:this._resetAllButton});var d=new r(this.getId()+"-toolbar",{active:false,content:[this._oSearchField,this._oButtonUp,this._oButtonDown]});this._oDialog=new s(this.getId()+"-Dialog",{title:this._oRb.getText("PERSODIALOG_COLUMNS_TITLE"),customHeader:c,draggable:true,resizable:true,stretch:_.system.phone,horizontalScrolling:false,verticalScrolling:true,initialFocus:_.system.desktop?this._oInnerTable:null,content:[this._oInnerTable],subHeader:d,beginButton:new n(this.getId()+"-buttonOk",{text:this._oRb.getText("PERSODIALOG_OK"),press:function(){u._oDialog.close();u._oSelectedItem=null;u._oSearchField.setValue("");u.fireConfirm()},type:y.Emphasized}),endButton:new n(this.getId()+"-buttonCancel",{text:this._oRb.getText("PERSODIALOG_CANCEL"),press:function(){u._oDialog.close();u._oSelectedItem=null;u._oSearchField.setValue("");u.fireCancel()}}),afterOpen:this._fnAfterDialogOpen}).addStyleClass("sapMPersoDialog");this._oDialog.setTitle=function(t){this.setProperty("title",t);this.getCustomHeader().getContentLeft()[0].setText(t)}};v.prototype._updateMarkedItem=function(){if(!this._oSelectedItem){this._oSelectedItem=this._oInnerTable&&this._oInnerTable.getItems().length>0?this._oInnerTable.getItems()[0]:null}if(this._oSelectedItem){this._oInnerTable.getItems().forEach(function(t){if(t.hasStyleClass("sapMPersoDialogItemSelected")){t.removeStyleClass("sapMPersoDialogItemSelected")}});this._oSelectedItem.addStyleClass("sapMPersoDialogItemSelected")}};v.prototype.retrievePersonalizations=function(){return this._oP13nModel.getData()};v.prototype.open=function(){var t=null;if(this.getHasGrouping()){t=[new m("group",false,true)]}this._readCurrentSettingsFromTable();this._oDialog.setModel(this._oP13nModel,"Personalization");this._oInnerTable.bindAggregation("items",{path:"Personalization>/aColumns",key:"text",sorter:t,template:this._oColumnItemTemplate});if(!this._oInnerTable.getSelectedItem()){var e=this._oInnerTable.getItems();if(this.getHasGrouping()){e=e.filter(function(t){return t.getMetadata().getName()!="sap.m.GroupHeaderListItem"})}if(e.length>0){this._sLastSelectedItemId=e[0].getBindingContext("Personalization").getProperty("id")}}this._fnUpdateArrowButtons.call(this);this._oDialog.open()};v.prototype.setContentHeight=function(t){t=t?t:"28rem";this.setProperty("contentHeight",t,true);this._oDialog.setContentHeight(t);return this};v.prototype.setContentWidth=function(t){t=t?t:"25rem";this.setProperty("contentWidth",t,true);this._oDialog.setContentWidth(t);return this};v.prototype.exit=function(){this._oRb=null;this._oP13nModel=null;this._oSelectedItem=null;if(this._oColumnItemTemplate){this._oColumnItemTemplate.destroy();this._oColumnItemTemplate=null}if(this._oInnerTable){this._oInnerTable.destroy();this._oInnerTable=null}if(this._oSearchField){this._oSearchField.destroy();this._oSearchField=null}if(this._oDialog){this._oDialog.destroy();this._oDialog=null}if(this._oButtonDown){this._oButtonDown.destroy();this._oButtonDown=null}if(this._oButtonUp){this._oButtonUp.destroy();this._oButtonUp=null}};v.prototype._resetAll=function(){if(this.getInitialColumnState()){var t=d([],this.getInitialColumnState()),e=this;var o=this._oInnerTable.getSelectedItem();this._sLastSelectedItemId=o&&o.getBindingContext("Personalization")&&o.getBindingContext("Personalization").getProperty("id");if(this._mColumnCaptions){t.forEach(function(t){t.text=e._mColumnCaptions[t.id]})}this._oP13nModel.getData().aColumns=t;this._oP13nModel.updateBindings();sap.ui.getCore().applyChanges()}};v.prototype._moveItem=function(t){var e=this._oSelectedItem;if(!e){return}var o=this._oInnerTable.getItems();var i=this._oInnerTable.getModel("Personalization").getProperty("/aColumns");var n=i.indexOf(e.getBindingContext("Personalization").getObject());var s=n+t;s=i.indexOf(o[s].getBindingContext("Personalization").getObject());if(s==n){return}i.splice(s,0,i.splice(n,1)[0]);i.forEach(function(t,e){t.order=e});this._oInnerTable.getModel("Personalization").setProperty("/aColumns",i);this._oSelectedItem=o[s];this._scrollToItem(this._oSelectedItem);this._fnUpdateArrowButtons.call(this);if(this._oButtonDown.getEnabled()||this._oButtonUp.getEnabled()){if(!this._oButtonDown.getEnabled()){setTimeout(function(){this._oButtonUp&&this._oButtonUp.focus()}.bind(this),0)}if(!this._oButtonUp.getEnabled()){setTimeout(function(){this._oButtonDown&&this._oButtonDown.focus()}.bind(this),0)}}else{this._oSearchField.focus()}};v.prototype._scrollToItem=function(t){sap.ui.getCore().applyChanges();if(t.getDomRef()){var e=this._oInnerTable.getItems().indexOf(t);var o=t.getDomRef().getBoundingClientRect();var i=this._oDialog.getDomRef("cont").getBoundingClientRect();var n=i.top;var s=i.bottom;var a=o.top;if(a<n+18){this._oInnerTable.scrollToIndex(e)}else if(a>s-18){this._oInnerTable.scrollToIndex(e)}}};v.prototype._readCurrentSettingsFromTable=function(){var t=sap.ui.getCore().byId(this.getPersoDialogFor()),e=this,o=this.getColumnInfoCallback().call(this,t,this.getPersoMap());this._oP13nModel.setData({aColumns:o});this._mColumnCaptions={};o.forEach(function(t){e._mColumnCaptions[t.id]=t.text})};v.prototype._executeSearch=function(){var t=this._oSearchField.getValue(),e=new f("text",I.Contains,t),o=this._oInnerTable.getBinding("items");o.filter([e]);this._fnUpdateArrowButtons.call(this);return this};v.prototype.setHasGrouping=function(t){this.setProperty("hasGrouping",t,true);var e=this._oDialog.getSubHeader();if(!t){if(e.getContent().length===1){e.addContent(this._oButtonDown);e.addContent(this._oButtonUp)}}else{e.removeContent(this._oButtonUp);e.removeContent(this._oButtonDown)}return this};v.prototype.setShowSelectAll=function(e){this.setProperty("showSelectAll",e,true);var o=e?this._oRb.getText("PERSODIALOG_SELECT_ALL"):this._oRb.getText("PERSODIALOG_COLUMNS_TITLE");this._oInnerTable.getColumns()[0].setHeader(new t({text:o}));this._oInnerTable.bPreventMassSelection=!e;return this};v.prototype.setShowResetAll=function(t){this.setProperty("showResetAll",t,true);this._resetAllButton.setVisible(t);return this};return v});
//# sourceMappingURL=TablePersoDialog.js.map