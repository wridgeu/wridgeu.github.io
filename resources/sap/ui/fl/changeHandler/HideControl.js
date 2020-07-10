/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t="visible";var i={};i.applyChange=function(e,t,i){e.setRevertData({originalValue:i.modifier.getVisible(t)});i.modifier.setVisible(t,false);return true};i.revertChange=function(t,i,r){var n=t.getRevertData();if(n){r.modifier.setVisible(i,n.originalValue);t.resetRevertData()}else{e.error("Attempt to revert an unapplied change.");return false}return true};i.completeChangeContent=function(){};i.getCondenserInfo=function(){return{classificationType:sap.ui.fl.ClassificationType.Reverse,uniqueKey:t}};return i},true);