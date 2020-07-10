/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t="visible";var r={};r.applyChange=function(e,r,i){e.setRevertData({originalValue:i.modifier.getProperty(r,t)});i.modifier.setVisible(r,true);return true};r.revertChange=function(t,r,i){var n=t.getRevertData();if(n){i.modifier.setVisible(r,n.originalValue);t.resetRevertData()}else{e.error("Attempt to revert an unapplied change.");return false}return true};r.completeChangeContent=function(){};r.getCondenserInfo=function(){return{classificationType:sap.ui.fl.ClassificationType.Reverse,uniqueKey:t}};return r},true);