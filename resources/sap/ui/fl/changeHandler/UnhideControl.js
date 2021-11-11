/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t="visible";var n={};n.applyChange=function(e,n,r){var i=r.modifier;return Promise.resolve().then(i.getProperty.bind(i,n,t)).then(function(t){e.setRevertData({originalValue:t});r.modifier.setVisible(n,true)})};n.revertChange=function(t,n,r){var i=t.getRevertData();if(i){r.modifier.setVisible(n,i.originalValue);t.resetRevertData()}else{e.error("Attempt to revert an unapplied change.")}};n.completeChangeContent=function(){};n.getCondenserInfo=function(e){return{affectedControl:e.getSelector(),classification:sap.ui.fl.condenser.Classification.Reverse,uniqueKey:t}};return n},true);