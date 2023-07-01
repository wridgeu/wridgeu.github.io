/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/IllustratedMessageType","./BaseContent","./WebPageContentRenderer","sap/ui/core/Core","sap/ui/integration/util/BindingHelper"],function(e,t,i,r,n){"use strict";var o="_frameLoaded";var a=15*1e3;var s=t.extend("sap.ui.integration.cards.WebPageContent",{metadata:{properties:{minHeight:{type:"sap.ui.core.CSSSize",defaultValue:i.MIN_WEB_PAGE_CONTENT_HEIGHT,bindable:true},src:{type:"sap.ui.core.URI",defaultValue:"",bindable:true},sandbox:{type:"string",defaultValue:"",bindable:true}},library:"sap.ui.integration"},renderer:i});s.prototype.init=function(){t.prototype.init.apply(this,arguments);this._onFrameLoadedBound=this._onFrameLoaded.bind(this);this._sPrevSrc=this.getSrc()};s.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._iLoadTimeout){clearTimeout(this._iLoadTimeout)}};s.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.apply(this,arguments);if(this.getDomRef()){this.getDomRef("frame").removeEventListener("load",this._onFrameLoadedBound)}};s.prototype.onAfterRendering=function(){t.prototype.onAfterRendering.apply(this,arguments);if(this.getDomRef("frame")){this.getDomRef("frame").addEventListener("load",this._onFrameLoadedBound);this._checkSrc()}};s.prototype.applyConfiguration=function(){var e=this.getParsedConfiguration();this.fireEvent("_actionContentReady");if(!e){return}var t=n.formattedProperty(e.src,function(e){return this._oIconFormatter.formatSrc(e)}.bind(this));if(t){this.bindSrc(t)}if(typeof e.sandbox==="object"){this.bindSandbox(n.reuse(e.sandbox))}else{this.setSandbox(e.sandbox)}if(typeof e.minHeight==="object"){this.bindMinHeight(n.reuse(e.minHeight))}else{this.setMinHeight(e.minHeight)}};s.prototype._checkSrc=function(){var t=this.getCardInstance(),i=this.getSrc();if(!t){return}if(i===""){this.handleError({illustrationType:e.ErrorScreen,title:t.getTranslatedText("CARD_WEB_PAGE_EMPTY_URL_ERROR"),description:t.getTranslatedText("CARD_ERROR_CONFIGURATION_DESCRIPTION")});return}if(!i.startsWith("https://")){this.handleError({illustrationType:e.ErrorScreen,title:t.getTranslatedText("CARD_WEB_PAGE_HTTPS_URL_ERROR"),description:t.getTranslatedText("CARD_ERROR_REQUEST_ACCESS_DENIED_DESCRIPTION")});return}if(this._sPrevSrc!==i){this._raceFrameLoad();this._sPrevSrc=i}};s.prototype._raceFrameLoad=function(){this.awaitEvent(o);this._iLoadTimeout=setTimeout(function(){var t=a/1e3,i=this.getCardInstance();this.handleError({illustrationType:e.ReloadScreen,title:i.getTranslatedText("CARD_WEB_PAGE_TIMEOUT_ERROR",[t]),details:"Failed to load '"+this.getSrc()+"' after "+t+" seconds."})}.bind(this),a)};s.prototype._onFrameLoaded=function(){this.fireEvent(o);clearTimeout(this._iLoadTimeout)};return s});
//# sourceMappingURL=WebPageContent.js.map