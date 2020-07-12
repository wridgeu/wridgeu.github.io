/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/Utils","sap/ui/fl/apply/_internal/changes/Utils"],function(e,n,t){"use strict";var i={};var r="unclassified";var a={lastOneWins:o,reverse:f};function o(e,n,t){if(!e.has(n)){e.set(n,[])}var i=e.get(n);i.pop();i.push(t)}function f(e,n,t){if(!e.has(n)){e.set(n,new Map)}var i=e.get(n);var r=Array.from(i.keys());if(r.length!==0&&r.indexOf(t.getChangeType())===-1){i.delete(r[0])}else{o(i,t.getChangeType(),t)}}function s(e,n,t){if(!e.has(n.classificationType)){e.set(n.classificationType,new Map)}var i=e.get(n.classificationType);a[n.classificationType](i,n.uniqueKey,t)}function u(e,n,t){if(!e.has(n)){e.set(n,[])}var i=e.get(n);i.push(t)}function c(i,r){var a=e.getControlIdBySelector(r.getSelector(),i);var o=sap.ui.getCore().byId(a);var f={modifier:e,appComponent:i,view:n.getViewForControl(o)};var s=t.getControlIfTemplateAffected(r,o,f);return t.getChangeHandler(r,s,f)}function l(e,n,t){return c(e,t).then(function(e){var i=e!==undefined&&typeof e.getCondenserInfo==="function"?e.getCondenserInfo(t):undefined;if(i!==undefined){s(n,i,t)}else{u(n,r,t)}})}function p(e,n,t){var i=t.getSelector().id;if(!n.has(i)){n.set(i,new Map)}var r=n.get(i);return l(e,r,t).then(function(){var e=Array.from(r.keys());if(e.length===0){n.delete(i)}})}function d(e,n){var t=Array.from(e.keys());t.forEach(function(t){var i=e.get(t);if(i instanceof Map){d(i,n)}else{i.forEach(function(e){n.push(e)})}})}function v(e){var n=[];d(e,n);return n}function g(e,n){n.sort(function(n,t){return e.indexOf(n)-e.indexOf(t)})}i.condense=function(e,n){var t=new Map;return n.reduce(function(n,i){return n.then(p.bind(this,e,t,i))}.bind(this),Promise.resolve()).then(function(){var e=v(t);g(n,e);return e})};return i});