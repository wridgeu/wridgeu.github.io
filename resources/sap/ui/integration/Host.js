/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/ui/core/Element","sap/ui/core/Configuration"],function(e,t,r){"use strict";var n=t.extend("sap.ui.integration.Host",{metadata:{library:"sap.ui.integration",properties:{actions:{type:"sap.ui.integration.CardMenuAction[]"},resolveDestination:{type:"function",invalidate:false,parameters:{destinationName:{type:"string"},card:{type:"sap.ui.integration.widgets.Card"}}}},events:{action:{allowPreventDefault:true,parameters:{card:{type:"sap.ui.core.Control"},actionConfig:{type:"object"},actionSource:{type:"sap.ui.core.Control"},parameters:{type:"object"},type:{type:"sap.ui.integration.CardActionType"}}},cardConfigurationChange:{parameters:{card:{type:"sap.ui.core.Control"},changes:{type:"object"}}},cardStateChanged:{parameters:{card:{type:"sap.ui.core.Control"}}},message:{parameters:{data:{type:"object"}}}}}});n.prototype.init=function(){this._handlePostMessageBound=this._handlePostMessage.bind(this)};n.prototype.getDestination=function(e,t){var r=this.getResolveDestination(),n;if(typeof r!=="function"){return Promise.reject("Could not resolve destination '"+e+"'. There is no 'resolveDestination' callback function configured in the host.")}n=r(e,t);if(n===null||n===undefined){return Promise.reject("Destination '"+e+"' could not be resolved by the host.")}if(n instanceof Promise){return n}return Promise.resolve(n)};n.prototype.getCsrfToken=function(e){return Promise.resolve()};n.prototype.csrfTokenFetched=function(e,t){};n.prototype.csrfTokenExpired=function(e){};n.prototype.getContextValue=function(e){if(!e){return Promise.resolve(null)}return Promise.resolve(null)};n.prototype.getDestinations=function(){return Promise.resolve([])};n.prototype.getContexts=function(){return Promise.resolve({})};n.prototype.useExperimentalCaching=function(){this.bUseExperimentalCaching=true;this.subscribeForMessages()};n.prototype.stopUsingExperimentalCaching=function(){this.bUseExperimentalCaching=false;this.unsubscribeForMessages()};n.prototype.modifyRequestHeaders=function(e,t,r){if(this.bUseExperimentalCaching){return this._prepareCacheHeaders(e,t)}return e};n.prototype.modifyRequest=function(e,t,n){var o;if(r.getStatisticsEnabled()){o=new URL(e.url,window.location.href);o.searchParams.set("sap-statistics","true");e.url=o.href}return e};n.prototype._prepareCacheHeaders=function(e,t){var r=t.request.cache,n=[];if(r.enabled===false){n.push("max-age=0");n.push("no-store")}else{n.push("max-age="+parseInt(r.maxAge||0));if(r.staleWhileRevalidate){n.push("x-stale-while-revalidate")}}if(n.length){e["Cache-Control"]=n.join(", ")}e["x-sap-card"]="true";e["x-use-cryptocache"]="true";return e};n.prototype.subscribeForMessages=function(){if(!navigator||!navigator.serviceWorker){return}navigator.serviceWorker.addEventListener("message",this._handlePostMessageBound)};n.prototype.unsubscribeForMessages=function(){if(!navigator||!navigator.serviceWorker){return}navigator.serviceWorker.removeEventListener("message",this._handlePostMessageBound)};n.prototype._handlePostMessage=function(e){this.fireMessage({data:e.data})};return n});
//# sourceMappingURL=Host.js.map