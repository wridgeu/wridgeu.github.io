/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Change"],function(a){"use strict";function n(a,n){a[n]=a[n]||{variants:[],changes:[],defaultVariant:undefined,standardVariant:undefined};return a[n]}function e(e,t,r,s){var i=e[t].map(function(n){var e=new a(n);e.setState(a.states.PERSISTED);return e});i.forEach(function(a){r[a.getId()]=a;var e=a.getSelector().persistencyKey;switch(t){case"defaultVariants":n(s,e)["defaultVariant"]=a;break;case"standardVariants":n(s,e)["standardVariant"]=a;break;default:n(s,e)[t].push(a)}})}return function(a){var t={};var r={};r._getOrCreate=n.bind(undefined,r);if(a.storageResponse.changes.comp){["variants","changes","defaultVariants","standardVariants"].forEach(function(n){e(a.storageResponse.changes.comp,n,t,r)})}return{map:r,byId:t}}});