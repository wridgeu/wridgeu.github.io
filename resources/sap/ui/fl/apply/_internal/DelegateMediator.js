/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/merge","sap/base/util/restricted/_pick","sap/ui/fl/Utils","sap/ui/core/util/reflection/JsControlTreeModifier"],function(e,t,r,n,a){"use strict";var i={};i._mDefaultDelegateItems={};i.types={READONLY:"readonly",WRITEONLY:"writeonly",COMPLETE:"complete"};function o(e,t){if(t){return t}if(e.getModel){var r=e.getModel();if(!r){return undefined}return r.getMetadata().getName()}}function u(e,t){t=o(e,t);var r=i._mDefaultDelegateItems[t];return(r||[]).map(function(e){e.payload={};return e})}function l(t,r,a){if(!a.length){return Promise.resolve([])}var i=[];a.forEach(function(a){i.push(function(i){return n.requireAsync(a.name).then(function(e){a.instance=e||{};i.push(a);return i}).catch(function(n){e.error("Failed to load the delegate for the control "+t.getId(r)+"\n"+n.message);return i})})});return i.reduce(function(e,t){return e.then(t)},Promise.resolve([]))}function s(e){return e&&typeof e==="function"}function f(e){return e.delegateType===i.types.COMPLETE||s(e.instance.getPropertyInfo)&&(s(e.instance.createLabel)||s(e.instance.createLayout))}function c(e){return e.delegateType===i.types.READONLY||s(e.instance.getPropertyInfo)}function d(e){return e.delegateType===i.types.WRITEONLY||s(e.instance.createLabel)||s(e.instance.createLayout)}function p(e,t){e.names.push(t.name);if(t.requiredLibraries){e.requiredLibraries=Object.assign(e.requiredLibraries||{},t.requiredLibraries)}if(t.payload&&!e.payload){e.payload=t.payload}return e}function g(e,n){e=p(e,n);return t(e,{instance:r(n.instance,["getPropertyInfo","getRepresentedProperties"])})}function m(e,n){e=p(e,n);return t(e,{instance:r(n.instance,["createLabel","createControlForProperty","createLayout"])})}function y(e,n){e=p(e,n);return t(e,r(n,"instance"))}function T(e){var t={names:[],instance:{},modelType:e.length&&e[0].modelType};var r=true;var n=true;for(var a=e.length-1;a>=0;a--){var i=e[a];if(f(i)){if(r&&n){t=y(t,i)}else if(r){t=g(t,i)}else if(n){t=m(t,i)}break}else if(c(i)&&r){t=g(t,i);r=false}else if(d(i)&&n){t=m(t,i);n=false}}return e.length?t:undefined}function h(e,t){return new Promise(function(r,n){if(!e){n(new Error("The control parameter is missing"))}if(!t){n(new Error("The modifier parameter is missing"))}if(!e){n(new Error("The input control should be available"))}if(t===a&&(!e.isA||!e.isA("sap.ui.base.ManagedObject"))){n(new Error("The input control should be a managed object"))}r()})}function D(e){return Object.values(i.types).some(function(t){return t===e.delegateType})}function b(e){var t=i._mDefaultDelegateItems[e.modelType]||[];var r=t.map(function(e){return e.delegateType});return r.indexOf(i.types.COMPLETE)>-1||r.indexOf(e.delegateType)>-1||e.delegateType===i.types.COMPLETE&&r.length}i.getKnownDefaultDelegateLibraries=function(){return["sap.ui.comp"]};i.getRequiredLibrariesForDefaultDelegate=function(e,t,r){r=o(t,r);var n=i._mDefaultDelegateItems[r]||[];return n.reduce(function(t,r){var n=e.indexOf(r.name)>-1;return t.concat(Object.keys(n&&r.requiredLibraries||{}))},[])};i.isDelegateRegistered=function(e){return!!i._mDefaultDelegateItems[e]};i.registerDefaultDelegate=function(e){if(!(e.modelType&&e.delegate)){throw new Error("'modelType' and 'delegate' properties are required for registration!")}e.delegateType=e.delegateType||i.types.COMPLETE;if(e.delegateType&&!D(e)){throw new Error("default 'delegateType': "+e.delegateType+" is invalid!")}if(b(e)){throw new Error("modelType "+e.modelType+"is already defined!")}if(!i._mDefaultDelegateItems[e.modelType]){i._mDefaultDelegateItems[e.modelType]=[]}i._mDefaultDelegateItems[e.modelType].push({name:e.delegate,requiredLibraries:e.requiredLibraries,delegateType:e.delegateType,modelType:e.modelType})};i.getDelegateForControl=function(e,t,r,n){return h(e,t).then(function(){return t.getFlexDelegate(e)}).then(function(a){var i=n&&u(e,r)||[];if(a){i.push(a)}return l(t,e,i)}).then(T.bind(this))};i.clear=function(){i._mDefaultDelegateItems={}};return i});