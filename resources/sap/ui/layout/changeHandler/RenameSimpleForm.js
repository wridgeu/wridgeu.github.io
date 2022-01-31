/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(e,t,r){"use strict";var n={};n.applyChange=function(e,t,n){var o=n.modifier;var a=n.view;var i=n.appComponent;var l=e.getDefinition();var f=l.content.elementSelector||l.content.sRenameId;var c=o.bySelector(f,i,a);if(l.texts&&l.texts.formText&&this._isProvided(l.texts.formText.value)){if(!t){return Promise.reject(new Error("no Control provided for renaming"))}return o.getProperty(c,"text").then(function(t){e.setRevertData(t);var r=l.texts.formText.value;o.setProperty(c,"text",r)})}else{r.error("Change does not contain sufficient information to be applied: ["+l.layer+"]"+l.namespace+"/"+l.fileName+"."+l.fileType);return Promise.resolve()}};n.revertChange=function(e,t,n){var o=e.getRevertData();var a=n.appComponent;var i=e.getDefinition();var l=n.view;var f=n.modifier;var c=i.content.elementSelector||i.content.sRenameId;var s=f.bySelector(c,a,l);if(o||o===""){f.setProperty(s,"text",o);s.getParent().invalidate();e.resetRevertData()}else{r.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.")}};n.completeChangeContent=function(r,n,o){var a=r.getDefinition();if(!n.changeType){throw new Error("oSpecificChangeInfo.changeType attribute required")}if(n.renamedElement&&n.renamedElement.id){var i=sap.ui.getCore().byId(n.renamedElement.id);var l;if(n.changeType==="renameLabel"){l=i.getLabel()}else if(n.changeType==="renameTitle"){l=i.getTitle()}a.content.elementSelector=t.getSelector(l,o.appComponent);r.addDependentControl(l,"elementSelector",o)}else{throw new Error("oSpecificChangeInfo.renamedElement attribute required")}if(this._isProvided(n.value)){e.setTextInChange(a,"formText",n.value,"XFLD")}else{throw new Error("oSpecificChangeInfo.value attribute required")}};n._isProvided=function(e){return typeof e==="string"};n.getChangeVisualizationInfo=function(e,r){var n=e.getDefinition().content.elementSelector;var o=t.bySelector(n,r).getParent().getId();return{affectedControls:[o],payload:{originalLabel:e.getRevertData(),newLabel:e.getDefinition().texts.formText.value}}};return n},true);