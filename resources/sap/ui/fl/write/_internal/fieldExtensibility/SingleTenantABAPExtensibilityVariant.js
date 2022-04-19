/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/fieldExtensibility/ABAPExtensibilityVariant","sap/ui/fl/write/_internal/fieldExtensibility/UriParser","sap/ui/fl/write/_internal/fieldExtensibility/Utils"],function(e,t,i){"use strict";var n="/sap/opu/odata/SAP/APS_CUSTOM_FIELD_MAINTENANCE_SRV/";var s={None:-1,Both:0,Fields:1,Logic:2};var r=[{semanticObject:"CustomField",action:"develop"},{semanticObject:"CustomField",action:"manage"},{semanticObject:"CustomLogic",action:"maintain"}];var o=["BTN_FREP_CCF","BTN_ADD_FIELD","BTN_ADD_LOGIC"];var a=e.extend("sap.ui.fl.write._internal.fieldExtensibility.SingleTenantABAPExtensibilityVariant",{_iExtensibilityType:s.None,getExtensionData:function(){return this._oExtensionDataPromise.then(function(e){if(this._containsData(e)){return this._convertBusinessContextsToExtensionData(e)}return null}.bind(this))},getNavigationUri:function(){return this._oExtensionDataPromise.then(function(e){if(this._containsData(e)&&this._iExtensibilityType!==s.None){return i.getNavigationUriForIntent({target:r[this._iExtensibilityType],params:{businessContexts:e.map(function(e){return e.BusinessContext}),serviceVersion:this._mServiceInfo.serviceVersion,serviceName:this._mServiceInfo.serviceName,entityType:this._mBindingInfo.entityTypeName}})}Promise.resolve(null)}.bind(this))},getTexts:function(){return this._oExtensionDataPromise.then(function(e){if(this._containsData(e)){return{tooltip:i.getText(o[this._iExtensibilityType]),headerText:i.getText("BUSINESS_CONTEXT_TITLE")}}return null}.bind(this))},isActive:function(){return this._oExtensionDataPromise.then(function(e){return this._containsData(e)}.bind(this))},_adjustExtensibilityTypeByAuthorizations:function(e,t){if(e[t]){return t}else if(e[s.Both]){return s.Both}else if(t===s.Both){if(e[s.Fields]){return s.Fields}else if(e[s.Logic]){return s.Logic}}return s.None},_containsData:function(e){return Boolean(e&&e.length>0)},_convertBusinessContextsToExtensionData:function(e){var t=e.map(function(e){return{description:e.BusinessContextDescription,businessContext:e.BusinessContext}});return{extensionData:t}},_determineExtensionData:function(){return new Promise(function(e,n){i.isNavigationSupportedForIntents(r).then(function(r){var o=r.some(function(e){return e===true});if(o){i.executeRequest(this._getExtensionDataServiceUri(),this._getExtensionDataServiceParameters()).then(function(i){if(i.errorOccurred===false){var o=this._extractBusinessContextsFromResponse(i.result);this._iExtensibilityType=this._determineExtensibilityType(r,o);if(this._iExtensibilityType!==s.None){e(o)}else{e(null)}}else if(i.statusCode===404&&this._mServiceInfo.serviceType===t.mServiceType.v4){e(null)}else{n(i)}}.bind(this))}else{e(null)}}.bind(this))}.bind(this))},_determineExtensibilityType:function(e,t){var i=this._determineExtensibilityTypeFromBusinessContexts(t);if(i!==s.None){return this._adjustExtensibilityTypeByAuthorizations(e,i)}return i},_determineExtensibilityTypeFromBusinessContexts:function(e){var t=false;var i=false;e.forEach(function(e){if(e.hasOwnProperty("SupportsLogicEnhancements")===false||e.SupportsLogicEnhancements===true){t=true}if(e.hasOwnProperty("SupportsStructuralEnhancements")===false||e.SupportsStructuralEnhancements===true){i=true}});if(t&&i){return s.Both}else if(!t&&i){return s.Fields}else if(t&&!i){return s.Logic}return null},_extractBusinessContextsFromResponse:function(e){return e.results||[]},_getExtensionDataServiceParameters:function(){var e={EntitySetName:"",EntityTypeName:this._mBindingInfo.entityTypeName};if(this._mServiceInfo.serviceType===t.mServiceType.v4){e.ResourcePath=t.sODataV4ResourcePathPrefix+this._mServiceInfo.serviceName+"/"+this._mServiceInfo.serviceVersion}else{e.ServiceName=this._mServiceInfo.serviceName;e.ServiceVersion=this._mServiceInfo.serviceVersion}return e},_getExtensionDataServiceUri:function(){if(this._mServiceInfo.serviceType===t.mServiceType.v4){return n+"GetBusinessContextsByResourcePath"}return n+"GetBusinessContextsByEntityType"}});return a});