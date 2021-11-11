/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject"],function(t){"use strict";var e=t.extend("sap.ui.integration.util.DataProvider",{metadata:{library:"sap.ui.integration",properties:{settingsJson:{type:"string"},baseRuntimeUrl:{type:"string"}},events:{dataRequested:{parameters:{}},dataChanged:{parameters:{data:{type:"object"}}},error:{parameters:{message:{type:"string"}}}}}});e.prototype.setDestinations=function(t){this._oDestinations=t};e.prototype.setDependencies=function(t){this._aDependencies=t};e.prototype.setSettingsJson=function(t){this.setProperty("settingsJson",t);this.setSettings(JSON.parse(t));if(this._bActive){this._scheduleDataUpdate()}};e.prototype._getRuntimeUrl=function(t){if(t.startsWith("http://")||t.startsWith("https://")||t.startsWith("//")){return t}var e=t&&t.trim().replace(/^\//,"");return this.getBaseRuntimeUrl()+e};e.prototype.setSettings=function(t){this._oSettings=t};e.prototype.getSettings=function(){return this._oSettings};e.prototype.triggerDataUpdate=function(){var t,e;this.fireDataRequested();t=this._waitDependencies();e=t.then(this._triggerDataUpdate.bind(this));if(!this._pInitialRequestPromise){this._pInitialRequestPromise=e}return e};e.prototype._triggerDataUpdate=function(){this._bActive=true;return this.getData().then(function(t){this.fireDataChanged({data:t});this.onDataRequestComplete()}.bind(this)).catch(function(t){if(Array.isArray(t)&&t.length>0){this.fireError({message:t[0],jqXHR:t[1]})}else{this.fireError({message:t})}this.onDataRequestComplete()}.bind(this))};e.prototype.getData=function(){var t=this.getSettings();return new Promise(function(e,i){if(t.json){e(t.json)}else{i("Could not get card data.")}})};e.prototype.destroy=function(){if(this._iIntervalId){clearInterval(this._iIntervalId);this._iIntervalId=null}if(this._iDataUpdateCallId){clearTimeout(this._iDataUpdateCallId);this._iDataUpdateCallId=null}this._oSettings=null;t.prototype.destroy.apply(this,arguments)};e.prototype.getInitialRequestPromise=function(){return this._pInitialRequestPromise};e.prototype.onDataRequestComplete=function(){var t;if(!this._oSettings||!this._oSettings.updateInterval){return}t=parseInt(this._oSettings.updateInterval);if(isNaN(t)){return}setTimeout(function(){this.triggerDataUpdate()}.bind(this),t*1e3)};e.prototype._scheduleDataUpdate=function(){if(this._iDataUpdateCallId){clearTimeout(this._iDataUpdateCallId)}this._iDataUpdateCallId=setTimeout(this.triggerDataUpdate.bind(this),0)};e.prototype._waitDependencies=function(){var t=this._aDependencies||[],e=[];t.forEach(function(t){e.push(t.getInitialRequestPromise())});return Promise.all(e)};return e});