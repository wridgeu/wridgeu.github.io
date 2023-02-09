/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/viz/VizBase","sap/m/Select","sap/ui/core/ListItem","sap/ui/model/json/JSONModel","sap/ui/core/IconPool","sap/base/util/merge","sap/ui/core/Core","sap/base/util/deepClone"],function(e,t,o,i,n,s,l,a){"use strict";var r=l.getLibraryResourceBundle("sap.ui.integration"),d;var c=e.extend("sap.ui.integration.editor.fields.viz.IconSelect",{metadata:{library:"sap.ui.integration",properties:{value:{type:"string",defaultValue:"sap-icon://accept"},allowFile:{type:"boolean",defaultValue:true},allowNone:{type:"boolean",defaultValue:true}}},renderer:{apiVersion:2}});c.prototype._initIconModel=function(){var e=n.getIconNames();e=e.sort(function(e,t){return e.toLowerCase().localeCompare(t.toLowerCase())});var t=[];if(!d){e.filter(function(e){var o=n.getIconInfo(e).text||("-"+e).replace(/-(.)/gi,function(e,t){return" "+t.toUpperCase()}).substring(1);t.push({icon:"sap-icon://"+e,key:"sap-icon://"+e,text:o,tooltip:o,enabled:true})});d=a(t,500)}else{t=a(d,500)}t=[{icon:"",text:r.getText("EDITOR_ICON_NONE"),tooltip:"",key:"",enabled:true},{icon:"sap-icon://upload",text:r.getText("EDITOR_ICON_CHOOSE"),tooltip:"",key:"file",enabled:true},{icon:"sap-icon://download",text:r.getText("EDITOR_ICON_SELECTED"),tooltip:"",key:"selected",enabled:false}].concat(t);this._oIconModel=new i(t);this._oIconModel.setSizeLimit(t.length)};c.prototype.onInit=function(){if(r&&r.sLocale!==l.getConfiguration().getLanguage()){r=l.getLibraryResourceBundle("sap.ui.integration")}if(!this._oIconModel){this._initIconModel()}var e=new o({icon:"{iconlist>icon}",text:"{iconlist>text}",tooltip:"{iconlist>tooltip}",key:"{iconlist>key}",enabled:"{iconlist>enabled}"});this._oFileUpload=document.createElement("INPUT");this._oFileUpload.type="file";this._oFileUpload.accept=".png,.jpg,.jpeg,.svg";this._boundFileUploadChange=this._fileUploadChange.bind(this);this._oFileUpload.addEventListener("change",this._boundFileUploadChange);this._oControl=new t({width:"100%",items:{path:"iconlist>/",template:e},change:function(e){var t=e.getSource(),o=e.getSource().getSelectedKey();if(o==="file"){t._customImage=null;this._oFileUpload.click();this._boundFocusBack=this._focusBack.bind(this);t.getDomRef("hiddenSelect").addEventListener("focus",this._boundFocusBack)}else{this.setValue(o)}}.bind(this)});this._oControl.setModel(this._oIconModel,"iconlist");var i=this._oControl.open;this._oControl.open=function(){i&&i.apply(this,arguments);this.getPicker().addStyleClass("sapUiIntegrationIconSelectList");this.getPicker().setContentHeight("400px")};this._oControl.addDelegate({onAfterRendering:function(){var e=this._oControl.getDomRef("labelIcon");if(e){var t=this._oControl._customImage;if(t){e.style.backgroundImage="url('"+t+"')";e.classList.add("sapMSelectListItemIconCustom")}else{e.style.backgroundImage="unset";e.classList.remove("sapMSelectListItemIconCustom")}}}.bind(this)});this._oControl.addDelegate({onsappageup:function(){if(this._oControl.isOpen()){var e=this._oControl.getSelectedIndex();this._oControl.setSelectedIndex(e-50)}}.bind(this),onsappagedown:function(){if(this._oControl.isOpen()){var e=this._oControl.getSelectedIndex();if(e<3){this._oControl.setSelectedIndex(29)}else{this._oControl.setSelectedIndex(e+50)}}}.bind(this),onsapup:function(){if(this._oControl.isOpen()){var e=this.getAllowFile();var t=this.getAllowNone();var o=this._oIconModel.getProperty("/2/enabled");var i=this._oControl.getSelectedIndex();if(i>11+2){this._oControl.setSelectedIndex(i-11)}else if(i>=3){if(t&&!e){this._oControl.setSelectedIndex(0)}else if(o){this._oControl.setSelectedIndex(2)}else{this._oControl.setSelectedIndex(3)}}}}.bind(this),onsapdown:function(){if(this._oControl.isOpen()){var e=this._oControl.getSelectedIndex();if(e>1){this._oControl.setSelectedIndex(e+11)}}}.bind(this),onsapleft:function(){if(this._oControl.isOpen()){this._oControl.onsapup.apply(this._oControl,arguments)}}.bind(this),onsapright:function(){if(this._oControl.isOpen()){this._oControl.onsapdown.apply(this._oControl,arguments)}}.bind(this)},true)};c.prototype.applyStyle=function(e){e.class("sapUiIntegrationIconSelect");if(this._oControl&&this._oControl.getWidth){e.style("width",this._oControl.getWidth())}};c.prototype._fileUploadChange=function(){var e=new window.FileReader;e.onload=function(){this.setValue(e.result);this._oControl.invalidate()}.bind(this);if(this._oFileUpload.files.length===1){e.readAsDataURL(this._oFileUpload.files[0])}};c.prototype._focusBack=function(){this._oControl.getDomRef("hiddenSelect").removeEventListener("focus",this._boundFocusBack);setTimeout(function(){this.setValue(this.getValue())}.bind(this),150)};c.prototype.bindPropertyToControl=function(e,t){if(e==="editable"){var o=s({},t);this._oControl.bindProperty("editable",o)}};c.prototype.setValue=function(e){this.setProperty("value",e,true);if(e&&e.indexOf("data:image/")===0){this._oControl._customImage=e;this._oIconModel.setProperty("/2/enabled",true);this._oControl.setSelectedKey("selected")}else{this._oControl._customImage=null;this._oIconModel.setProperty("/2/enabled",false);this._oControl.setSelectedKey(e)}this._oControl.invalidate();return this};c.prototype.setAllowFile=function(e){this.setProperty("allowFile",e,true);e=this.getAllowFile();this._oIconModel.setProperty("/1/enabled",e);return this};c.prototype.setAllowNone=function(e){this.setProperty("allowNone",e,true);e=this.getAllowNone();this._oIconModel.setProperty("/0/enabled",e);return this};return c});
//# sourceMappingURL=IconSelect.js.map