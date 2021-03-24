/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Change","sap/ui/fl/apply/_internal/flexObjects/CompVariant"],function(a,n){"use strict";function e(a,n){a[n]=a[n]||{variants:[],changes:[],defaultVariant:undefined,standardVariant:undefined};return a[n]}function t(t,r,s,i){var u=r==="variants"?n:a;var d=t[r].map(function(n){var e=new u(n);e.setState(a.states.PERSISTED);return e});d.forEach(function(a){s[a.getId()]=a;var n=a.getSelector().persistencyKey;switch(r){case"defaultVariants":e(i,n)["defaultVariant"]=a;break;case"standardVariants":e(i,n)["standardVariant"]=a;break;default:e(i,n)[r].push(a)}})}return function(a){var n={};var r={};r._getOrCreate=e.bind(undefined,r);if(a.storageResponse.changes.comp){["variants","changes","defaultVariants","standardVariants"].forEach(function(e){t(a.storageResponse.changes.comp,e,n,r)})}return{map:r,byId:n}}});