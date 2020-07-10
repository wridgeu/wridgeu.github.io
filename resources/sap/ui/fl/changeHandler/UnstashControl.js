/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t={};t.applyChange=function(e,t,n){var a=e.getContent();var r=n.modifier;var i=false;e.setRevertData({originalValue:n.modifier.getStashed(t)});var o=r.setStashed(t,i,n.appComponent)||t;if(a.parentAggregationName){var g=a.parentAggregationName;var s=r.getParent(o);r.removeAggregation(s,g,o);r.insertAggregation(s,g,o,a.index,n.view)}return o};t.revertChange=function(t,n,a){var r=t.getRevertData();if(r){a.modifier.setStashed(n,r.originalValue);t.resetRevertData()}else{e.error("Attempt to revert an unapplied change.");return false}return true};t.completeChangeContent=function(e,t){var n=e.getDefinition();if(t.content){n.content=t.content}};t.getCondenserInfo=function(){return{classificationType:sap.ui.fl.ClassificationType.Reverse,uniqueKey:"stashed"}};return t},true);