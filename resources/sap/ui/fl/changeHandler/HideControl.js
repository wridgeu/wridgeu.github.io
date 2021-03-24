/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/fl/changeHandler/JsControlTreeModifier"],function(e,t){"use strict";var r="visible";var n={};n.applyChange=function(e,t,r){e.setRevertData({originalValue:r.modifier.getVisible(t)});r.modifier.setVisible(t,false);return true};n.revertChange=function(t,r,n){var i=t.getRevertData();if(i){n.modifier.setVisible(r,i.originalValue);t.resetRevertData()}else{e.error("Attempt to revert an unapplied change.");return false}return true};n.completeChangeContent=function(){};n.getCondenserInfo=function(e){return{affectedControl:e.getSelector(),classification:sap.ui.fl.condenser.Classification.Reverse,uniqueKey:r}};n.getChangeVisualizationInfo=function(e,r){var n=e.getSelector();var i=t.bySelector(n,r);return{affectedControls:[n],displayControls:[i.getParent().getId()]}};return n},true);