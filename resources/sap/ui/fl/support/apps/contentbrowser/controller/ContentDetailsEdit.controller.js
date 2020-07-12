/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/fl/support/apps/contentbrowser/lrepConnector/LRepConnector","sap/ui/fl/support/apps/contentbrowser/utils/DataUtils","sap/ui/fl/Layer","sap/m/Dialog","sap/m/Text","sap/m/Button","sap/m/Input","sap/m/library"],function(e,t,n,a,o,i,s,r,l){"use strict";var c=l.ButtonType;return e.extend("sap.ui.fl.support.apps.contentbrowser.controller.ContentDetailsEdit",{oSelectedContentModel:undefined,oDataUtils:n,onInit:function(){this._initAndBindSelectedContentModel();var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("ContentDetailsEdit").attachMatched(this._onRouteMatched,this)},_initAndBindSelectedContentModel:function(){this.oSelectedContentModel=new sap.ui.model.json.JSONModel;this.getView().setModel(this.oSelectedContentModel,"selectedContent")},_onRouteMatched:function(e){var n=this;var a=e.getParameter("arguments");var o={};o.layer=a.layer;o.namespace=decodeURIComponent(a.namespace);o.fileName=a.fileName;o.fileType=a.fileType;if(o.namespace[o.namespace.length-1]!=="/"){o.namespace+="/"}var i=o.namespace+o.fileName+"."+o.fileType;var s=n.getView().getContent()[0];s.setBusy(true);return t.getContent(o.layer,i,null,null,true).then(n._onContentReceived.bind(n,o,s,i),function(){s.setBusy(false)})},_onContentReceived:function(e,a,o,i){var s=this;return t.getContent(e.layer,o,true).then(function(t){e.data=n.formatData(i,e.fileType);e.metadata=t;s.oSelectedContentModel.setData(e);a.setBusy(false)},function(){a.setBusy(false)})},onSave:function(){var e=this;var t=this.getView().getModel("selectedContent");var n=t.getData();var l;var p;var u;var d;var f;n.metadata.some(function(e){if(e.name==="layer"){l=e.value;return true}});n.metadata.some(function(e){if(e.name==="transportId"){p=e.value;return true}});try{u=JSON.parse(n.data).packageName}catch(e){}if(l===a.USER||l==="LOAD"||l==="VENDOR_LOAD"||!p&&(!u||u==="$TMP")){d=undefined;this._saveFile(l,n.namespace,n.fileName,n.fileType,n.data,d,f)}else if(p==="ATO_NOTIFICATION"){d=p;this._saveFile(l,n.namespace,n.fileName,n.fileType,n.data,d,f)}else{var m=!!(l===a.VENDOR||l===a.CUSTOMER_BASE);var v=new r({visible:m,placeholder:"Package name (Only necessary for cross client content)"});var y=new r({placeholder:"Transport ID or ATO_NOTIFICATION"});var h=new o({title:"{i18n>transportInput}",type:"Message",content:[new i({text:"{i18n>transportInputDescription}"}),v,y],beginButton:new s({text:"{i18n>confirm}",type:c.Reject,press:function(){f=v.getValue();d=y.getValue();h.close();e._saveFile(l,n.namespace,n.fileName,n.fileType,n.data,d,f)}}),endButton:new s({text:"{i18n>cancel}",press:function(){h.close()}}),afterClose:function(){h.destroy()}});this.getView().addDependent(h);h.open()}},_saveFile:function(e,n,a,o,i,s,r){return t.saveFile(e,n,a,o,i,s,r).then(this._navToDisplayMode.bind(this))},onCancel:function(){this._navToDisplayMode()},_navToDisplayMode:function(){var e=this.getView().getModel("selectedContent");var t=e.getData();var n=sap.ui.core.UIComponent.getRouterFor(this);n.navTo("ContentDetailsFlip",{layer:t.layer,namespace:encodeURIComponent(t.namespace),fileName:t.fileName,fileType:t.fileType})}})});