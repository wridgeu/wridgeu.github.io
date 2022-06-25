/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/Editor","sap/ui/core/Core","sap/ui/integration/widgets/Card","sap/ui/integration/editor/Merger","sap/ui/model/json/JSONModel","sap/base/util/merge","sap/ui/model/resource/ResourceModel","sap/ui/integration/editor/EditorResourceBundles","sap/base/util/LoaderExtensions","sap/ui/core/theming/Parameters","sap/ui/dom/includeStylesheet"],function(e,t,i,r,a,n,s,o,d,g,u){"use strict";var _=t.getLibraryResourceBundle("sap.ui.integration");var l=e.extend("sap.ui.integration.designtime.editor.CardEditor",{metadata:{library:"sap.ui.integration",properties:{card:{type:"any",defaultValue:null}},aggregations:{_extension:{type:"sap.ui.integration.Extension",multiple:false,visibility:"hidden"}}},renderer:e.getMetadata().getRenderer().render});l.prototype.hasPreview=function(){var e=this.getAggregation("_preview");if(e&&e.getSettings()&&e.getSettings().preview&&e.getSettings().preview.modes==="None"){return false}return true};l.prototype._updatePreview=function(){var e=this.getAggregation("_preview");if(e&&e.update&&e._getCurrentMode()!=="None"){e.update()}};l.prototype.setCard=function(e,r){if(e===this.getProperty("card")){return this}if(this._oEditorCard){this._oEditorCard.destroy()}this.setProperty("card",e,r);if(typeof e==="string"){try{e=JSON.parse(e)}catch(i){var a=t.byId(e);if(!a){var n=document.getElementById(e);if(n&&n.tagName&&n.tagName==="ui-integration-card"){a=n._getControl()}}e=a}}if(e&&e.isA&&e.isA("sap.ui.integration.widgets.Card")){e={manifest:e.getManifest(),manifestChanges:e.getManifestChanges(),host:e.getHost(),baseUrl:e.getBaseUrl()}}if(typeof e==="object"){this._oEditorCard=new i(e);this._oEditorCard.onBeforeRendering();this._oEditorCard.attachEventOnce("_cardReady",function(){this.setJson(e,r)}.bind(this))}};l.prototype.createManifest=function(e,t){this._isManifestReady=false;if(this._oEditorManifest){this._oEditorManifest.destroy()}this.destroyAggregation("_extension");var i=r.layers[this.getMode()];this._oEditorManifest=this._oEditorCard._oCardManifest;this._registerManifestModulePath();var d=this._oEditorManifest._oInitialJson;this._oInitialManifestModel=new a(d);this.setProperty("json",d,t);var g;if(this._beforeLayerManifestChanges){g=r.mergeDelta(d,[this._beforeLayerManifestChanges])}else{g=d}var u=n({},g);this._beforeManifestModel=new a(u);if(i<r.layers["translation"]&&this._currentLayerManifestChanges){g=r.mergeDelta(g,[this._currentLayerManifestChanges])}this._manifestModel=new a(g);this._isManifestReady=true;this.fireManifestReady();var _=this._oEditorManifest.get("/sap.app/i18n");var l=this.getBaseUrl()+_;if(_&&o.getResourceBundleURL()!==l){o.setResourceBundleURL(l)}this._createContextModel();if(this._oEditorManifest&&this._oEditorManifest.getResourceBundle()){var p=this._oEditorManifest.getResourceBundle();var c=new s({bundle:p});this.setModel(c,"i18n");if(this._oResourceBundle){c.enhance(this._oResourceBundle)}this._oResourceBundle=c.getResourceBundle()}return this._loadExtension().then(function(){this._initInternal()}.bind(this))};l.prototype._initPreview=function(){var e=this._oDesigntimeInstance.getSettings()||{};e.preview=e.preview||{};e.preview.position=this.getPreviewPosition();return new Promise(function(t,i){sap.ui.require(["sap/ui/integration/designtime/editor/CardPreview"],function(i){var r=new i({settings:e,card:this._oEditorCard});this.setAggregation("_preview",r);t()}.bind(this))}.bind(this))};l.prototype._loadExtension=function(){return new Promise(function(e,t){var i=this._oEditorCard.getAggregation("_extension");this.setAggregation("_extension",i);e()}.bind(this))};l.prototype._mergeContextData=function(e){var t={};t["empty"]=l._contextEntries.empty;for(var i in e){t[i]=e[i]}t["card.internal"]=l._contextEntries["card.internal"];return t};l._contextEntries={empty:{label:_.getText("CARDEDITOR_CONTEXT_EMPTY_VAL"),type:"string",description:_.getText("CARDEDITOR_CONTEXT_EMPTY_DESC"),placeholder:"",value:""},"card.internal":{label:_.getText("CARDEDITOR_CONTEXT_CARD_INTERNAL_VAL"),todayIso:{type:"string",label:_.getText("CARDEDITOR_CONTEXT_CARD_TODAY_VAL"),description:_.getText("CARDEDITOR_CONTEXT_CARD_TODAY_DESC"),tags:[],placeholder:_.getText("CARDEDITOR_CONTEXT_CARD_TODAY_VAL"),customize:["format.dataTime"],value:"{{parameters.TODAY_ISO}}"},nowIso:{type:"string",label:_.getText("CARDEDITOR_CONTEXT_CARD_NOW_VAL"),description:_.getText("CARDEDITOR_CONTEXT_CARD_NOW_DESC"),tags:[],placeholder:_.getText("CARDEDITOR_CONTEXT_CARD_NOW_VAL"),customize:["dateFormatters"],value:"{{parameters.NOW_ISO}}"},currentLanguage:{type:"string",label:_.getText("CARDEDITOR_CONTEXT_CARD_LANG_VAL"),description:_.getText("CARDEDITOR_CONTEXT_CARD_LANG_VAL"),tags:["technical"],customize:["languageFormatters"],placeholder:_.getText("CARDEDITOR_CONTEXT_CARD_LANG_VAL"),value:"{{parameters.LOCALE}}"}}};l._languages={};l._appendThemeVars=function(){var e=["sapUiButtonHoverBackground","sapUiBaseBG","sapUiContentLabelColor","sapUiTileSeparatorColor","sapUiHighlight","sapUiListSelectionBackgroundColor","sapUiNegativeText","sapUiCriticalText","sapUiPositiveText","sapUiChartScrollbarBorderColor"];var t=g.get({name:e,callback:function(e){}});if(t){for(var i in t){document.body.style.setProperty("--"+i,t[i])}}};l.init=function(){this.init=function(){};l._appendThemeVars();t.attachThemeChanged(function(){l._appendThemeVars()});var e=sap.ui.require.toUrl("sap.ui.integration.editor.css.Editor".replace(/\./g,"/")+".css");u(e);d.loadResource("sap/ui/integration/editor/languages.json",{dataType:"json",failOnError:false,async:true}).then(function(e){l._languages=e})};l.init();return l});