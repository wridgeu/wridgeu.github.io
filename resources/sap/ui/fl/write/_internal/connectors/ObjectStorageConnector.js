/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/apply/_internal/connectors/ObjectStorageUtils","sap/ui/fl/apply/_internal/connectors/ObjectStorageConnector"],function(e,t,r,n){"use strict";function o(e,t){var r=true;if(e.selectorIds){if(t.selector){r=e.selectorIds.indexOf(t.selector.id)>-1}else{r=false}}if(r&&e.changeTypes){r=e.changeTypes.indexOf(t.changeType)>-1}return r}function i(e,t){if(!e.creation){var r=Date.now()+t;e.creation=new Date(r).toISOString()}return e}var a=e({},t,{oStorage:undefined,layers:n.layers,write:function(e){var t=e.flexObjects.map(function(e,t){var n=r.createFlexObjectKey(e);e=i(e,++t);var o=this.oStorage._itemsStoredAsObjects?e:JSON.stringify(e);return this.oStorage.setItem(n,o)}.bind(this));return Promise.all(t).then(function(){})},update:function(e){var t=e.flexObject;var n=r.createFlexObjectKey(e.flexObject);var o=this.oStorage._itemsStoredAsObjects?t:JSON.stringify(t);var i=this.oStorage.setItem(n,o);return Promise.resolve(i)},reset:function(e){return r.forEachObjectInStorage({storage:this.oStorage,reference:e.reference,layer:e.layer},function(t){if(o(e,t.changeDefinition)){return this.oStorage.removeItem(t.key)}}.bind(this))},remove:function(e){var t=r.createFlexObjectKey(e.flexObject);this.oStorage.removeItem(t);var n=this.oStorage.removeItem(t);return Promise.resolve(n)},loadFeatures:function(){return Promise.resolve({isKeyUser:true,isVariantSharingEnabled:true})},getFlexInfo:function(e){e.storage=this.oStorage;return r.getAllFlexObjects(e).then(function(e){return{isResetEnabled:e.length>0}})}});return a});