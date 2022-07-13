/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/MultiInput","sap/m/Token","sap/ui/core/Core","sap/ui/integration/util/BindingHelper","sap/ui/core/ListItem","sap/base/util/ObjectPath","sap/base/util/deepEqual","sap/base/util/deepClone"],function(e,t,i,s,a,n,r,o,l){"use strict";var u="sap/ui/integration/editor/fields/viz";var g=e.extend("sap.ui.integration.editor.fields.BaseField",{metadata:{library:"sap.ui.integration",properties:{configuration:{type:"object"},specialButton:{type:"object"},mode:{type:"string"},host:{type:"object"},visible:{type:"boolean",defaultValue:true}},aggregations:{_field:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_dynamicField:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{_messageIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_messageStrip:{type:"sap.m.MessageStrip",multiple:false,visibility:"hidden"}},events:{afterInit:{}}},renderer:function(e,t){var i=t.getAggregation("_field"),s=t._getDynamicField();e.openStart("div");e.addClass("sapUiIntegrationEditorItemField");if(i&&i.getWidth){}if(!t.getVisible()){e.addStyle("display","none")}e.writeElementData(t);e.openEnd();if(t.getVisible()){e.openStart("span");e.openEnd();e.openStart("span");e.addClass("sapUiIntegrationEditorEditor");if(t._hasDynamicValue()){e.addStyle("width","1px");e.addStyle("opacity","0")}else{e.addStyle("width","100%")}e.openEnd();e.renderControl(i);e.close("span");e.close("span");if(t._hasDynamicValue()){e.openStart("span");e.addClass("sapUiIntegrationEditorSettings");e.openEnd();e.openStart("span");e.addClass("sapUiIntegrationEditorSettingsField");e.addStyle("width","100%");e.addStyle("opacity","1");e.openEnd();e.renderControl(s);e.close("span")}e.openStart("div");e.writeAttribute("id",t.getId()+"-ms");e.addStyle("height","0");e.openEnd();e.close("div")}e.close("div")}});g.prototype.init=function(){this._readyPromise=new Promise(function(e){this._fieldResolver=e}.bind(this))};g.prototype.getMessagestrip=function(){var e=this.getAssociation("_messageStrip");return s.byId(e)};g.prototype.getMessageIcon=function(){var e=this.getAssociation("_messageIcon");return s.byId(e)};g.prototype._removeValidationMessage=function(){var e=this.control,t=e.getParent().getMessageIcon();if(t){t.setVisible(false)}if(e.getEnabled()){e.setEnabled(false)}};g.prototype.getResourceBundle=function(){return this.getModel("i18n").getResourceBundle()};g.prototype.setConfiguration=function(e,t){if(e!==this.getConfiguration()){this._sanitizeValidationSettings(e);this.setProperty("configuration",e,t);if(e){Promise.resolve().then(function(){this.initEditor(e)}.bind(this))}}return this};g.prototype._sanitizeValidationSettings=function(e){e.validations=e.validations||[];if(e.validation&&e.validations&&Array.isArray(e.validations)){e.validations.push(e.validation);delete e.validation}if(e.validation&&!e.validations){e.validations=[e.validation];delete e.validation}if(e.required){e.validations.unshift({required:true,type:"error"})}};g.prototype.deleteTranslationValuesInTexts=function(e){var t=this;var i=t.getConfiguration();var s="/texts";var a=this._settingsModel.getData();if(!a||!a.texts){return}var n=l(a.texts,500);if(e){if(n[e]){delete n[e][i.manifestpath];if(o(n[e],{})){delete n[e]}if(o(n,{})){delete a.texts;this._settingsModel.setData(a)}else{this._settingsModel.setProperty(s,n)}}}else{for(var r in n){t.deleteTranslationValuesInTexts(r)}}};g.prototype._triggerValidation=function(e){if(o(e,this._preChangedValue)&&this._messageFrom==="validation"){return}this._preChangedValue=e;var t=this.getConfiguration();var i=false;if(t.required){i=true}else if(t.type==="string"&&e){i=true}else if((t.type==="integer"||t.type==="number")&&!isNaN(e)){if(e!==""){i=true}}else if(t.type==="boolean"){i=true}else if(t.type==="string[]"&&Array.isArray(e)){i=true}if(t.validations&&Array.isArray(t.validations)&&i){for(var s=0;s<t.validations.length;s++){if(!this._handleValidation(t.validations[s],e)){return false}}this._hideValueState()}return true};g.validations={string:{maxLength:function(e,t){return e.length<=t},maxLengthTxt:"EDITOR_VAL_MAXLENGTH",minLength:function(e,t){return e.length>=t},minLengthTxt:"EDITOR_VAL_MINLENGTH",pattern:function(e,t){var i=new RegExp(t);return i.test(e)},patternTxt:"EDITOR_VAL_NOMATCH",required:function(e,t){return t&&!!e},requiredTxt:"EDITOR_VAL_TEXTREQ",validateTxt:"EDITOR_VAL_NOMATCH"},"string[]":{maxLength:function(e,t){return Array.isArray(e)&&e.length<=t},maxLengthTxt:"EDITOR_VAL_LISTMAXLENGTH",minLength:function(e,t){return Array.isArray(e)&&e.length>=t},minLengthTxt:"EDITOR_VAL_LISTMINLENGTH",required:function(e,t){return Array.isArray(e)&&e.length>0},requiredTxt:"EDITOR_VAL_LISTREQ"},integer:{maximum:function(e,t,i){if(i.exclusiveMaximum){i._txt="maximumExclusiveTxt";return e<t}return e<=t},maximumTxt:"EDITOR_VAL_MAX",maximumExclusiveTxt:"EDITOR_VAL_MAX_E",minimum:function(e,t,i){if(i.exclusiveMinimum){i._txt="minimumExclusiveTxt";return e>t}return e>=t},minimumTxt:"EDITOR_VAL_MIN",minimumExclusiveTxt:"EDITOR_VAL_MIN_E",multipleOf:function(e,t){return e%t===0},multipleOfTxt:"EDITOR_VAL_MULTIPLE",required:function(e,t){return!isNaN(e)&&e!==""},requiredTxt:"EDITOR_VAL_NUMBERREQ",validateTxt:"EDITOR_VAL_NOMATCH"},number:{maximum:function(e,t,i){if(i.exclusiveMaximum){i._txt="maximumExclusiveTxt";return e<t}return e<=t},maximumTxt:"EDITOR_VAL_MAX",maximumExclusiveTxt:"EDITOR_VAL_MAX_E",minimum:function(e,t,i){if(i.exclusiveMinimum){i._txt="minimumExclusiveTxt";return e>t}return e>=t},minimumTxt:"EDITOR_VAL_MIN",minimumExclusiveTxt:"EDITOR_VAL_MAX_E",multipleOf:function(e,t){return e%t===0},multipleOfTxt:"EDITOR_VAL_MULTIPLE",required:function(e,t){return!isNaN(e)&&e!==""},requiredTxt:"EDITOR_VAL_NUMBERREQ",validateTxt:"EDITOR_VAL_NOMATCH"}};g.prototype._requestData=function(e){var t=this.control.getParent();var i=t.getConfiguration();var s=t._oDataProviderFactory.create(e.data);t.getModel("currentSettings").setProperty(i._settingspath+"/_loading",true);var a=s.getData();return a.then(function(s){t.getModel("currentSettings").setProperty(i._settingspath+"/_loading",false);var a=e.data.path||"/";if(a.startsWith("/")){a=a.substring(1)}if(a.endsWith("/")){a=a.substring(0,a.length-1)}var n=a.split("/");var o=r.get(n,s);return o})};g.prototype._handleValidation=function(e,t){var i=this.getConfiguration(),s=g.validations[i.type];var a=function(a,n){var r;if(typeof e.message==="function"){r=e.message(t,i,n)}else{r=e.message}if(!r){if(e._txt){r=this.getResourceBundle().getText(s[e._txt],[e[a]])}else{r=this.getResourceBundle().getText(s[a+"Txt"],[e[a]])}}this._showValueState(e.type||"error",r)}.bind(this);if(e["validate"]){var n={control:this.getAggregation("_field"),requestData:this._requestData,removeValidationMessage:this._removeValidationMessage};var r=e["validate"];Promise.resolve(r(t,i,n)).then(function(e){var t=e.isValid;if(typeof t==="undefined"){t=e}var i=e.data?e.data:undefined;if(!t){a("validate",i);return false}else{this._hideValueState(true,false);return true}}.bind(this))}else{for(var o in e){if(s){var l=s[o];e._txt="";if(l){if(!l(t,e[o],e)){a(o);return false}}}}}return true};g.prototype.onAfterRendering=function(){this._applyMessage();var e=this.getMessagestrip();if(e&&e.getDomRef()){e.getDomRef().style.opacity="0"}};g.prototype._applyMessage=function(){var e=s.byId(this.getAssociation("_messageIcon"));if(this.getAssociation("_messageIcon")&&e){var t=e.getDomRef();if(t){t.classList.remove("error");t.classList.remove("warning");t.classList.remove("success");if(this._message){t.classList.add(this._message.type)}}}if(this._message&&(this._message.type==="error"||this._message.type==="warning")){var i=this._message.type==="error"?"Error":"Warning";this._setCurrentProperty("hasError",true);this._setCurrentProperty("errorType",i)}else{this._setCurrentProperty("hasError",false);this._setCurrentProperty("errorType","None")}};g.prototype._showValueState=function(e,t,i){var s=this.getAggregation("_field"),a=e.substring(0,1).toUpperCase()+e.substring(1);this._message={enum:a,type:e,message:t,atControl:false};this._messageFrom="validation";if(i){this._messageFrom="request"}var n=this.getMessagestrip();if(s&&s.setValueState){this._message.atControl=true;if(s.setShowValueStateMessage){s.setShowValueStateMessage(false)}s.setValueState(a);s.setValueStateText(t)}else if(n&&n.getVisible()&&s.getMetadata().getName()!=="sap.m.Switch"){this._showMessage()}this._applyMessage()};g.prototype._hideValueState=function(e,t){if(!this.getParent()){return}var i=this.getMessagestrip();if(this._message){if(e&&this._messageFrom==="request"||!e&&this._messageFrom==="validation"){var s=this.getAggregation("_field");this._message={enum:"Success",type:"success",message:"Corrected",atControl:this._message.atControl};this._messageFrom="validation";if(e){this._messageFrom="request"}if(this._messageto){clearTimeout(this._messageto)}this._messageto=setTimeout(function(){this._messageto=null;this._applyMessage();if(!this._message&&s.setValueState){s.setValueState("None")}}.bind(this),1500);this._applyMessage();if(i){if(i.getDomRef()){i.getDomRef().style.opacity="0"}i.onAfterRendering=null}if(s.setValueState){s.setValueState("Success")}if(s.setValueStateText){s.setValueStateText("")}this._message=null}if(!this._message&&e&&t){this._triggerValidation(this.getConfiguration().value)}}};g.prototype.onfocusin=function(e){if(e&&e.target.classList.contains("sapMBtn")){return}this._showMessage()};g.prototype.onfocusout=function(e){this._hideMessage()};g.prototype._showMessage=function(){if(!this.getParent()){return}var e=this.getMessagestrip();if(this._message&&e){e.applySettings({type:this._message.enum,text:this._message.message});var t=this;e.onAfterRendering=function(){e.getDomRef().style.zIndex="1";e.getDomRef().style.opacity="1";t.getDomRef("ms")&&t.getDomRef("ms").appendChild(e.getDomRef());var i=t.getAggregation("_field");if(t._message&&!t._message.atControl){e.getDomRef().style.marginTop="0";e.getDomRef().style.marginLeft="0"}var s=i.getDomRef()?i.getDomRef().offsetWidth-5:100;if(s<=100){s=i.getParent().getDomRef()?i.getParent().getDomRef().offsetWidth-35:100}e.getDomRef().style.width=s+"px"};e.rerender()}};g.prototype._hideMessage=function(){var e=this.getMessagestrip();var t=this.getAggregation("_field"),i=t.getDomRef()&&t.getDomRef().contains(window.document.activeElement);if(e){if(!i&&e.getDomRef()){e.getDomRef().style.opacity="0";e.getDomRef().style.zIndex="-1"}e.onAfterRendering=null}};g.prototype.initEditor=function(t){var i;this._settingsModel=this.getModel("currentSettings");this.initVisualization&&this.initVisualization(t);if(this._visualization.editor){i=this._visualization.editor}else if(this._visualization.type){if(typeof this._visualization.type==="string"){if(this._visualization.type.indexOf("/")===-1){this._visualization.type=u+"/"+this._visualization.type;this._visualization.settings=this._visualization.settings||{value:"{currentSettings>value}",editable:t.editable}}sap.ui.require([this._visualization.type],function(e){this._visualization.type=e;this.initEditor(t)}.bind(this));return}i=new this._visualization.type(this._visualization.settings||{})}if(i instanceof e){this.setAggregation("_field",i);if(i.attachChange){i.attachChange(function(e){if(e.mParameters.value===""){var t=this.getConfiguration();if(t.type==="string[]"){this._triggerValidation(t.value)}else{this._triggerValidation(e.getParameter("value"))}}}.bind(this))}var s=this._settingsModel.bindProperty("value",this.getBindingContext("currentSettings"));s.attachChange(function(){this._triggerValidation(t.value)}.bind(this));this._triggerValidation(t.value)}var a=this.getMode();t.allowSettings=t.allowSettings||t.allowSettings!==false&&a==="admin";t.allowDynamicValues=t.allowDynamicValues||t.allowDynamicValues!==false;t._changeDynamicValues=t.visible&&t.editable&&(t.allowDynamicValues||t.allowSettings)&&a!=="translation";if(t._changeDynamicValues){this._getDynamicField()}this._applySettings(t);this.fireAfterInit()};g.prototype.initVisualization=function(){};g.prototype._hasDynamicValue=function(){var e=this._getCurrentProperty("value");var t=typeof e==="string"&&(e.indexOf("{context>")===0||e.indexOf("{{parameters")===0);this._setCurrentProperty("_hasDynamicValue",t);return t};g.prototype._hasSettings=function(){var e=this.getConfiguration();if(e._next){var t=e.hasOwnProperty("visibleToUser")?e.visibleToUser:true;var i=e.hasOwnProperty("editableToUser")?e.editableToUser:true;var s=e._next.visible===false?false:e._next.editable;var a=e.hasOwnProperty("allowDynamicValues")?e.allowDynamicValues:true;e._hasSettings=e._next.visible===!t||s===!i||e._next.allowDynamicValues===!a}else{e._hasSettings=false;if(e.hasOwnProperty("editableToUser")||e.hasOwnProperty("visibleToUser")){e._next={}}if(e.hasOwnProperty("editableToUser")){e._next.editable=e.editableToUser}if(e.hasOwnProperty("visibleToUser")){e._next.visible=e.visibleToUser}}return e._hasSettings};g.prototype._getDynamicField=function(){var e=this.getAggregation("_dynamicField");if(!e){var e=new t({showValueHelp:false});this.setAggregation("_dynamicField",e)}return e};g.prototype._hideDynamicField=function(){var e=this._getDynamicField(),t=this.getAggregation("_field");if(e.getDomRef()){var i=e.getDomRef().parentNode.style;i.width="1px";i.opacity=0;i=t.getDomRef().parentNode.style;t.getDomRef().style.visibility="visible";i.width="100%";i.opacity=1}};g.prototype._showDynamicField=function(){var e=this._getDynamicField(),t=this.getAggregation("_field");if(e.getDomRef()){var i=e.getDomRef().parentNode.style;i.width="100%";i.opacity=1;i=t.getDomRef().parentNode.style;t.getDomRef().style.visibility="hidden";i.width="1px";i.opacity=0}};g.prototype._setCurrentProperty=function(e,t){if(this._getCurrentProperty(e)!==t){this._settingsModel.setProperty(e,t,this.getBindingContext("currentSettings"))}};g.prototype._getCurrentProperty=function(e){return this._settingsModel.getProperty(e,this.getBindingContext("currentSettings"))};g.prototype._applySettings=function(e){var t=this._getDynamicField(),s=this.getModel("contextflat")._getValueObject(e.value);t.removeAllTokens();if(!this._getCurrentProperty("_changeDynamicValues")){t.setEnabled(false)}if(s&&s.path!=="empty"){if(s.object.value&&s.object.value.indexOf("{{")==0){this._setCurrentProperty("value",s.object.value)}else{this._setCurrentProperty("value",s.value)}t.addToken(new i({text:s.object.label,delete:function(){this._setCurrentProperty("value","");var e=this.getAggregation("_field");e.setValue("");e.fireChange();if(!this._hasDynamicValue()){this._hideDynamicField()}this._applyButtonStyles();window.setTimeout(function(){this.getAggregation("_field").focus()}.bind(this),100)}.bind(this)}));var a=this.getConfiguration();if(a.type==="string"&&a.translatable){this.deleteTranslationValuesInTexts()}}else{this._setCurrentProperty("value",e.value);this._setCurrentProperty("_changed",e._changed);this._hideDynamicField()}this._setCurrentProperty("_next",e._next);this._applyButtonStyles();if(!this._hasDynamicValue()){this._hideDynamicField()}else{this._showDynamicField()}this._fieldResolver&&this._fieldResolver();this._fieldResolver=null};g.prototype._cancelSettings=function(){this._applyButtonStyles();if(!this._hasDynamicValue()){this._hideDynamicField()}};g.prototype._applyButtonStyles=function(){if(!this._settingsButton){return}if(!this._hasDynamicValue()){this._settingsButton.removeStyleClass("dynamicvalue")}else{this._settingsButton.addStyleClass("dynamicvalue")}if(!this._hasSettings()){this._settingsButton.removeStyleClass("settings")}else{this._settingsButton.addStyleClass("settings")}};g.prototype.isFilterBackend=function(){var e=this.getConfiguration();var t=false;if(e&&e.values&&e.values.data){if(e.values.data.request&&e.values.data.request.parameters&&e.values.data.request.parameters.$filter&&e.values.data.request.parameters.$filter.indexOf("{currentSettings>suggestValue}")>-1){t=true}else if(e.values.data.request&&e.values.data.request.url&&e.values.data.request.url.indexOf("{currentSettings>suggestValue}")>-1){t=true}}return t};g.prototype.formatListItem=function(e){var t=new n;for(var i in e){t.bindProperty(i,a.createBindingInfos(e[i]))}return t};g.prototype.getPreviewPosition=function(){return this._settingsModel.getProperty("/preview/position")};return g});