/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/ObjectPath","sap/base/util/isEmptyObject","sap/ui/fl/Change"],function(a,t,e){"use strict";function n(a,t){a[t]=a[t]||{variants:[],changes:[],defaultVariant:undefined,standardVariant:undefined};return a[t]}function r(a,t,r,s){var i=a[t].map(function(a){var t=new e(a);t.setState(e.states.PERSISTED);return t});i.forEach(function(a){r[a.getId()]=a;var e=a.getSelector().persistencyKey;switch(t){case"defaultVariants":n(s,e)["defaultVariant"]=a;break;case"standardVariants":n(s,e)["standardVariant"]=a;break;default:n(s,e)[t].push(a)}})}return function(a){var t={};var e={};e._getOrCreate=n.bind(undefined,e);if(a.storageResponse.changes.comp){["variants","changes","defaultVariants","standardVariants"].forEach(function(n){r(a.storageResponse.changes.comp,n,t,e)})}return{map:e,byId:t}}});