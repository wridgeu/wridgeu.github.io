/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t="visible";var r={};r.applyChange=function(e,r,n){e.setRevertData({originalValue:n.modifier.getProperty(r,t)});n.modifier.setVisible(r,true);return true};r.revertChange=function(t,r,n){var i=t.getRevertData();if(i){n.modifier.setVisible(r,i.originalValue);t.resetRevertData()}else{e.error("Attempt to revert an unapplied change.");return false}return true};r.completeChangeContent=function(){};r.getCondenserInfo=function(e){return{affectedControl:e.getSelector(),classification:sap.ui.fl.condenser.Classification.Reverse,uniqueKey:t}};return r},true);