/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/Storage","sap/ui/fl/Utils","sap/base/Log"],function(t,e,n){"use strict";function r(){var t=e.getUshellContainer();if(t){return e.getUShellService("UserInfo").then(function(t){var e=t.getUser();return e&&e.getId()}).catch(function(t){n.error("Error getting service from Unified Shell: "+t.message)})}return Promise.resolve()}var i=function(t){if(!t){throw new Error("no flex settings provided")}this._oSettings=t};i.attachEvent=function(t,e){i._oEventProvider.attachEvent(t,e)};i.detachEvent=function(t,e){i._oEventProvider.detachEvent(t,e)};i.getInstance=function(){if(i._instance){return Promise.resolve(i._instance)}if(i._oLoadSettingsPromise){return i._oLoadSettingsPromise}return i._loadSettings()};i._loadSettings=function(){var e;var o=t.loadFeatures().then(function(t){e=t;return r()}).then(function(t){if(!e){n.error("The request for flexibility settings failed; A default response is generated and returned to consuming APIs");e={isKeyUser:false,isKeyUserTranslationEnabled:false,isVariantSharingEnabled:false,isVariantPersonalizationEnabled:true,isAtoAvailable:false,isAtoEnabled:false,isAppVariantSaveAsEnabled:false,isCondensingEnabled:false,isProductiveSystem:true,isPublicLayerAvailable:false,isVariantAdaptationEnabled:false,versioning:{},_bFlexChangeMode:false,_bFlexibilityAdaptationButtonAllowed:false}}e.userId=t;return i._storeInstance(e)});i._oLoadSettingsPromise=o;return o};i._storeInstance=function(t){if(!i._instance){i._instance=new i(t)}return i._instance};i.getInstanceOrUndef=function(){return i._instance};i.getDefaultLayerPermissions=function(){return{VENDOR:true,CUSTOMER_BASE:true,CUSTOMER:true,PUBLIC:false,USER:false}};i.getDeveloperModeLayerPermissions=function(){return{VENDOR:true,CUSTOMER_BASE:true,CUSTOMER:false,PUBLIC:false,USER:false}};i.prototype._getBooleanProperty=function(t){return this._oSettings[t]||false};i.prototype.isKeyUser=function(){return this._getBooleanProperty("isKeyUser")};i.prototype.isKeyUserTranslationEnabled=function(){return this._getBooleanProperty("isKeyUserTranslationEnabled")};i.prototype.isPublicLayerAvailable=function(){return this._getBooleanProperty("isPublicLayerAvailable")};i.prototype.isVariantAdaptationEnabled=function(){return this._getBooleanProperty("isVariantAdaptationEnabled")};i.prototype.isAppVariantSaveAsEnabled=function(){return this._getBooleanProperty("isAppVariantSaveAsEnabled")};i.prototype.isVersioningEnabled=function(t){return!!(this._oSettings.versioning[t]||this._oSettings.versioning["ALL"])};i.prototype.isModelS=function(){return this._getBooleanProperty("isAtoAvailable")};i.prototype.isAtoEnabled=function(){return this._getBooleanProperty("isAtoEnabled")};i.prototype.isAtoAvailable=function(){return this._getBooleanProperty("isAtoAvailable")};i.prototype.isProductiveSystem=function(){return this._getBooleanProperty("isProductiveSystem")};i.prototype.isVariantSharingEnabled=function(){return this._getBooleanProperty("isVariantSharingEnabled")};i.prototype.isPublicFlVariantEnabled=function(){return this._getBooleanProperty("isPublicFlVariantEnabled")};i.prototype.isVariantPersonalizationEnabled=function(){return this._getBooleanProperty("isVariantPersonalizationEnabled")};i.prototype.isCondensingEnabled=function(){return this._getBooleanProperty("isCondensingEnabled")};i.prototype.isSystemWithTransports=function(){return!!(this._oSettings.system&&this._oSettings.client)};i.prototype.isProductiveSystemWithTransports=function(){return this.isProductiveSystem()&&this.isSystemWithTransports()};i.prototype.getSystem=function(){return this._oSettings.system};i.prototype.getClient=function(){return this._oSettings.client};i.prototype._getHostname=function(){return document.location.hostname};i.prototype.isCustomerSystem=function(){var t=this._oSettings.systemType;var e={CUSTOMER:true,SAP:false}[t];var n=this._getHostname();return e!==undefined?e:!(n.endsWith(".sap"+".corp")||n==="localhost"||n==="127.0.0.1")};i.prototype.getUserId=function(){return this._oSettings.userId};return i},true);