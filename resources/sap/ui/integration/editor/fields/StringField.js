/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/BaseField","sap/m/Input","sap/m/Text","sap/m/Title","sap/m/Select","sap/m/ComboBox","sap/m/Popover","sap/m/Button","sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/ui/core/ListItem","sap/m/List","sap/m/CustomListItem","sap/m/VBox","sap/base/util/each","sap/base/util/restricted/_debounce","sap/ui/core/Core","sap/ui/model/json/JSONModel","sap/ui/integration/editor/EditorResourceBundles","sap/base/util/deepClone","sap/ui/model/Sorter","sap/ui/core/SeparatorItem","sap/base/util/includes","sap/base/util/merge","sap/ui/core/CustomData"],function(e,t,a,n,r,s,i,l,u,o,g,d,p,c,v,f,h,T,_,S,L,I,O,P,m){"use strict";var y=/parameters\.([^\}\}]+)/g;var E=["TODAY_ISO","NOW_ISO","LOCALE"];var b=e.extend("sap.ui.integration.editor.fields.StringField",{metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer()});b.prototype.initVisualization=function(e){var n=e.visualization;if(!n){var i=e.value?e.value.match(y):undefined;var l,u,o;if(i&&i.length>0){i=i.filter(function(e){var t=e.substring(11);return!O(E,t)})}if(i&&i.length>0){l=i.map(function(e){if(this.isOrigLangField){return"items>"+e.substring(11)+"/_language/value"}return"items>"+e.substring(11)+"/value"}.bind(this));l.unshift("currentSettings>value");u={parts:l,formatter:function(e){var t=Array.prototype.slice.call(arguments,1);for(var a=0;a<t.length;a++){if(t[a]){e=e.replaceAll("{{"+i[a]+"}}",t[a])}}return e}};o=function(e){var t=e.getSource().getValue();var a=this.getBindingContext("currentSettings").sPath;var n=this.getModel("currentSettings");n.setProperty(a+"/value",t);var r=n.getBindings();var s=a.substring(a.lastIndexOf("/")+1);v(r,function(e,t){if(t.sPath==="/form/items/"+s+"/value"){t.checkUpdate(true)}})}.bind(this)}if(this.getMode()==="translation"){if(e.editable){n={type:t,settings:{value:{path:"currentSettings>value"},tooltip:{path:"currentSettings>value"},editable:e.editable,visible:e.visible,placeholder:e.placeholder}}}else{n={type:a,settings:{text:{path:"currentSettings>value"},tooltip:{path:"currentSettings>value"},visible:e.visible,wrapping:false}}}}else if(e.enum){var d=new g({key:{path:"currentSettings>"},text:{path:"currentSettings>"}});n={type:r,settings:{selectedKey:{path:"currentSettings>value"},forceSelection:false,editable:e.editable,visible:e.visible,showSecondaryValues:false,width:"100%",items:{path:"currentSettings>enum",template:d}}}}else if(e.values){var d=this.formatListItem(e.values.item);if(!e.values.item.key){e.values.item.key=e.values.item.text}n={type:s,settings:{busy:{path:"currentSettings>_loading"},selectedKey:{path:"currentSettings>value"},editable:e.editable,visible:e.visible,showSecondaryValues:true,width:"100%",items:{path:"",template:d}}};if(this.isFilterBackend()){n.settings.selectedKey={parts:["currentSettings>value","currentSettings>suggestValue"],formatter:function(e,t){if((!e||e==="")&&t){return t.replaceAll("''","'")}else{return e}}}}}else{n={type:t,settings:{value:{path:"currentSettings>value"},tooltip:{path:"currentSettings>value"},editable:e.editable,visible:e.visible,placeholder:e.placeholder}};if(l){delete n.settings.tooltip;n.settings.value=u;n.settings.change=o}}}this._visualization=n;this.attachAfterInit(this._afterInit)};b.prototype._afterInit=function(){var e=this.getAggregation("_field");if(e instanceof s){if(this.isFilterBackend()){this.onInput=f(this.onInput,500);e.oninput=this.onInput;e.attachSelectionChange(this.onSelectionChange)}}};b.prototype.onSelectionChange=function(e){var t=e.getParameter("selectedItem")||{};var a=t.getKey();var n=this.getBindingContext("currentSettings").sPath;var r=this.getModel("currentSettings");r.setProperty(n+"/value",a)};b.prototype.onInput=function(e){var t=e.target.value;var a=this.getBindingContext("currentSettings").sPath;var n=this.getModel("currentSettings");n.setProperty(a+"/suggestValue",t.replaceAll("'","''"));n.setProperty(a+"/_loading",true);n.setProperty(a+"/value","");var r=n.getBindings();var s=a.substring(a.lastIndexOf("/")+1);v(r,function(e,t){if(t.sPath==="/form/items/"+s+"/value"){t.checkUpdate(true)}});var i=e.srcControl;i.open();i.setValue(t);i.setSelection(null)};b.prototype.getOriginTranslatedValues=function(e){var t=[];var a=_.getInstance(e._resourceBundleURL);for(var n in a){var r=a[n];var s;if(e._translatedDefaultPlaceholder.startsWith("{i18n>")&&e._translatedDefaultPlaceholder.endsWith("}")){s=e._translatedDefaultPlaceholder.substring(6,e._translatedDefaultPlaceholder.length-1)}else if(e._translatedDefaultPlaceholder.startsWith("{{")&&e._translatedDefaultPlaceholder.endsWith("}}")){s=e._translatedDefaultPlaceholder.substring(2,e._translatedDefaultPlaceholder.length-2)}var i="";var l="";if(s&&r){var u=r.resourceBundle.getText(s,[],true);if(u!==undefined){i=u;l=u}}else{i=e._translatedDefaultPlaceholder;l=e._translatedDefaultPlaceholder}var o={key:n,desription:r.language,value:i,originValue:l,editable:true};t.push(o)}return t};b.prototype.openTranslationListPopup=function(e){var r=this;var s=e.getSource();var g=s.getParent();var v=g.getConfiguration();if(!r._aOriginTranslatedValues){r._aOriginTranslatedValues=g.getOriginTranslatedValues(v)}var f=S(r._aOriginTranslatedValues,500);var _=h.getLibraryResourceBundle("sap.ui.integration");f.forEach(function(e){if(v.valueTranslations&&v.valueTranslations[e.key]){e.value=v.valueTranslations[e.key];if(!O(r._aUpdatedLanguages,e.key)){e.originValue=e.value}}e.status=_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_LISTITEM_GROUP_NOTUPDATED");if(e.key===_.sLocale){e.editable=false}});var I={currentLanguage:{},isUpdated:false,translatedLanguages:[]};var y;if(f){f.forEach(function(e){if(O(r._aUpdatedLanguages,e.key)){e.value=v.valueTranslations[e.key];e.status=_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_LISTITEM_GROUP_UPDATED")}if(e.key===_.sLocale){e.value=s.getValue();I.currentLanguage=e}else{I.translatedLanguages.push(e)}})}if(!r._oTranslationPopover){var E=new d({items:{path:"languages>/translatedLanguages",template:new p({content:[new c({items:[new a({text:"{languages>desription}"}),new t({value:"{languages>value}",editable:"{languages>editable}"})]})],customData:[new m({key:"{languages>key}",value:"{languages>desription}"})]}),sorter:[new L({path:"status",descending:true,group:true})],groupHeaderFactory:r.getGroupHeader}});r._oTranslationPopover=new i({placement:"Right",contentWidth:"300px",contentHeight:"345px",customHeader:new c({items:[new n({text:_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_TITLE")}).addStyleClass("sapMPopoverTitle"),new n({text:_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_CURRENTLANGUAGE")}).addStyleClass("sapMHeaderTitle"),new c({items:[new a({text:"{languages>/currentLanguage/desription}"}),new t({value:"{languages>/currentLanguage/value}",editable:false})]}).addStyleClass("sapMCurrentLanguageVBox"),new n({text:_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_OTHERLANGUAGES")}).addStyleClass("sapMHeaderTitle")]}),content:E,footer:new u({content:[new o,new l({type:"Emphasized",text:_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_BUTTON_SAVE"),enabled:"{languages>/isUpdated}",press:function(){var e=r._oTranslationPopover.getModel("languages").getData();var t=S(v.valueTranslations,500);var a={};var n=[];e.translatedLanguages.forEach(function(e){if(e.value!==e.originValue){a[e.key]=e.value;n.push(e.key)}});if(e.currentLanguage.value!=e.currentLanguage.originValue){a[e.currentLanguage.key]=e.currentLanguage.value;n.push(e.currentLanguage.key)}if(a!=={}){v.valueTranslations=P(t,a);v._changed=true}if(n.length>0){r._aUpdatedLanguages=n}r._oTranslationPopover.close()}}),new l({text:_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_BUTTON_CANCEL"),press:function(){r._oTranslationPopover.close()}})]})}).addStyleClass("sapUiIntegrationFieldTranslation");y=new T(I);y.attachPropertyChange(function(e){var t=y.getData();var a=_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_LISTITEM_GROUP_UPDATED");var n=_.getText("EDITOR_FIELD_TRANSLATION_LIST_POPOVER_LISTITEM_GROUP_NOTUPDATED");var r=false;t.translatedLanguages.forEach(function(e){if(e.value!==e.originValue){e.status=a;r=true}else{e.status=n}});t.isUpdated=r;y.setData(t);y.checkUpdate(true)});r._oTranslationPopover.setModel(y,"languages")}else{y=r._oTranslationPopover.getModel("languages");y.setData(I);y.checkUpdate(true)}r._oTranslationPopover.openBy(s)};b.prototype.getGroupHeader=function(e){return new I({text:e.key})};return b});