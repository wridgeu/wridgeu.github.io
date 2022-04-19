/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/fl/changeHandler/JsControlTreeModifier"],function(e,t){"use strict";var n="visible";var r={};r.applyChange=function(e,t,n){var r=n.modifier;return Promise.resolve().then(r.getVisible.bind(r,t)).then(function(n){e.setRevertData({originalValue:n});r.setVisible(t,false)})};r.revertChange=function(t,n,r){var i=t.getRevertData();return Promise.resolve().then(function(){if(i){r.modifier.setVisible(n,i.originalValue);t.resetRevertData()}else{e.error("Attempt to revert an unapplied change.")}})};r.completeChangeContent=function(){};r.getCondenserInfo=function(e){return{affectedControl:e.getSelector(),classification:sap.ui.fl.condenser.Classification.Reverse,uniqueKey:n}};r.getChangeVisualizationInfo=function(e,n){var r=e.getSelector();var i=t.bySelector(r,n);return{affectedControls:[r],displayControls:[i.getParent().getId()]}};return r},true);