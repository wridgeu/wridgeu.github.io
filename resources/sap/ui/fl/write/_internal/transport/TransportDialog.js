/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/List","sap/m/InputListItem","sap/m/Button","sap/m/ComboBox","sap/m/Dialog","sap/m/Input","sap/m/MessageToast","sap/ui/core/ListItem","sap/ui/fl/write/_internal/transport/Transports"],function(t,e,s,r,o,a,n,i,u){"use strict";var l=o.extend("sap.ui.fl.write._internal.transport.TransportDialog",{metadata:{library:"sap.ui.fl",properties:{pkg:{type:"string",group:"Misc",defaultValue:null},transports:{type:"any",group:"Misc",defaultValue:null},lrepObject:{type:"any",group:"Misc",defaultValue:null},hidePackage:{type:"boolean",group:"Misc",defaultValue:null}},events:{ok:{},cancel:{}}},renderer:{apiVersion:2}});l.prototype.init=function(){o.prototype.init.apply(this);this._oResources=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");this.setTitle(this._oResources.getText("TRANSPORT_DIALOG_TITLE"));this._oPackageLabel=null;this._oPackage=this._createPackageField();this._oTransport=this._createTransportCombo();this.addContent(this._createContentList());this._createButtons();this.setEscapeHandler(function(t){this.fireCancel();t.resolve()}.bind(this))};l.prototype._createContentList=function(){this._oPackageListItem=new e({label:this._oResources.getText("TRANSPORT_DIALOG_PACKAGE"),content:[this._oPackage]});this._oTransportListItem=new e({label:this._oResources.getText("TRANSPORT_DIALOG_TRANSPORT"),content:[this._oTransport]});return new t({items:[this._oPackageListItem,this._oTransportListItem]})};l.prototype._createButtons=function(){var t=this;this.addButton(new s({text:this._oResources.getText("TRANSPORT_DIALOG_LOCAL_OBJECT"),tooltip:this._oResources.getText("TRANSPORT_DIALOG_LOCAL_OBJECT"),press:function(){t._onLocal()}}));this.addButton(new s({text:this._oResources.getText("TRANSPORT_DIALOG_OK"),tooltip:this._oResources.getText("TRANSPORT_DIALOG_OK"),enabled:false,press:function(){t._onOkay()}}));this.addButton(new s({text:this._oResources.getText("TRANSPORT_DIALOG_CANCEL"),tooltip:this._oResources.getText("TRANSPORT_DIALOG_CANCEL"),press:function(){t.fireCancel();t.close();t.destroy()}}))};l.prototype._onLocal=function(){this.fireOk({selectedTransport:"",selectedPackage:this.getPkg()||"$TMP",dialog:true});this.close();this.destroy()};l.prototype._onOkay=function(){var t=this._oTransport.getSelectedKey();if(this._checkOkay(t)){this.fireOk({selectedTransport:t,selectedPackage:this.getPkg()||this._oPackage.getValue(),dialog:true});this.close();this.destroy()}else{this.getButtons()[1].setEnabled(false);this._oTransport.setValueState(sap.ui.core.ValueState.Error);this._oTransport.setValueStateText(this.getTitle())}};l.prototype._checkOkay=function(t){if(t){return true}return false};l.prototype._createTransportCombo=function(){var t=this;return new r({showSecondaryValues:true,enabled:false,tooltip:this._oResources.getText("TRANSPORT_DIALOG_TRANSPORT_TT"),width:"100%",selectionChange:function(){if(t._oPackageListItem.getVisible()&&!t._oPackage.getValue()){return}t.getButtons()[1].setEnabled(true);t._oTransport.setValueState(sap.ui.core.ValueState.None)},change:function(e){var s=function(t){if(t&&e.mParameters.newValue!==t.getText()||!t){return true}return false};if(e&&e.mParameters&&e.mParameters.newValue){if(s(t._oTransport.getSelectedItem())){t.getButtons()[1].setEnabled(false);t._oTransport.setValueState(sap.ui.core.ValueState.Error);t._oTransport.setValueStateText(t._oResources.getText("TRANSPORT_DIALOG_TRANSPORT_TT"))}}}})};l.prototype._createPackageField=function(){var t=this;return new a({tooltip:this._oResources.getText("TRANSPORT_DIALOG_PACKAGE_TT"),width:"100%",change:function(){var e;var s;s=t._createObjectInfo();e=u.getTransports(s);e.then(function(e){t._onPackageChangeSuccess(e)},function(e){t._onPackageChangeError(e)})},liveChange:function(e){if(e.mParameters.liveValue&&e.mParameters.liveValue.length>3){t._oTransport.setEnabled(true)}}})};l.prototype._createObjectInfo=function(){var t;var e={package:this._oPackage.getValue()||""};t=this.getProperty("lrepObject");if(t){if(t.name){e.name=t.name}if(t.type){e.type=t.type}if(t.namespace){e.namespace=t.namespace}}return e};l.prototype._onPackageChangeSuccess=function(t){if(t){if(t.localonly){this._oTransport.setEnabled(false);this.getButtons()[1].setEnabled(true)}else if(t.transports&&t.transports.length>0){this._oTransport.setEnabled(true);this._setTransports(t)}else if(t.errorCode){this.getButtons()[1].setEnabled(false);this._oPackage.setValueState(sap.ui.core.ValueState.Error);this._oPackage.setValueStateText(this._oResources.getText("TRANSPORT_DIALOG_"+t.errorCode));this._setTransports(t)}else{n.show(this._oResources.getText("TRANSPORT_DIALOG_NO_TRANSPORTS"))}}};l.prototype._setTransports=function(t){var e;var s;e=this._hasLock(t.transports);if(e){s=[e]}else{s=t.transports}this.setTransports(s);if(s&&s.length===1){this._oTransport.setValue(s[0].description,true);this.getButtons()[1].setEnabled(true)}if(!s||s.length===0){this._oTransport.setSelectedKey(null);this._oTransport.setValueState(sap.ui.core.ValueState.None);this.getButtons()[1].setEnabled(false)}};l.prototype._onPackageChangeError=function(t){n.show(t);this.setTransports([])};l.prototype._hasLock=function(t){var e;var s=t.length;while(s--){e=t[s];if(e.locked){return e}}return null};l.prototype.setPkg=function(t){if(t&&!this.getProperty("pkg")){this.setProperty("pkg",t);this._oPackage.setValue(t);this._oPackage.setEnabled(false);this._oTransport.setEnabled(true);this.setTitle(this._oResources.getText("TRANSPORT_DIALOG_TITLE_SIMPLE"));this.getButtons()[0].setVisible(false)}return this};l.prototype.setTransports=function(t){var e;var s=0;var r;if(t){this.setProperty("transports",t);this._oTransport.removeAllItems();s=t.length;for(e=0;e<s;e++){r=t[e];this._oTransport.addItem(new i({key:r.transportId,text:r.transportId,additionalText:r.description}))}if(s===1){this._oTransport.setSelectedKey(t[0].transportId);this.getButtons()[1].setEnabled(true)}if(s>0){this._oTransport.setEnabled(true)}}return this};l.prototype.setLrepObject=function(t){if(t&&!this.getProperty("lrepObject")){this.setProperty("lrepObject",t)}return this};l.prototype.setHidePackage=function(t){this.setProperty("hidePackage",t);this._oPackageListItem.setVisible(!t);if(t){this.getButtons()[0].setEnabled(t);this.setTitle(this._oResources.getText("TRANSPORT_DIALOG_TITLE_SIMPLE"))}return this};return l},true);