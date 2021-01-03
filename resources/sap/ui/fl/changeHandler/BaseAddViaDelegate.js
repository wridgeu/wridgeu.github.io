/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/fl/apply/api/DelegateMediatorAPI","sap/base/util/merge","sap/base/util/ObjectPath"],function(e,t,n,r){"use strict";function o(e){return typeof e==="function"}function a(e){if(e.modelType){return e.modelType}else if(e.oDataServiceVersion){return"sap.ui.model.odata.v2.ODataModel"}}var i={createAddViaDelegateChangeHandler:function(i){function l(e){return e+i.fieldSuffix}function d(e,t){if(o(i[t])){return!!i[t]({changeDefinition:e})}return!!i[t]}function c(e){return d(e,"skipCreateLabel")}function f(e){return d(e,"skipCreateLayout")}function u(e,n){var r=n.modifier.bySelector(e.getSelector(),n.appComponent);var l=a(e.getDefinition().content);return t.getDelegateForControl({control:r,modifier:n.modifier,modelType:l,supportsDefault:i.supportsDefault}).then(function(t){var n=!o(t.instance.createLayout);return n||f(e.getDefinition())})}function g(e,t,r){var o=n({},t);o.fieldSelector.id=l(o.fieldSelector.id);return r.createControlForProperty(o).then(function(n){if(c(e)){return n}var o=t.modifier.getId(n.control);t.labelFor=o;return r.createLabel(t).then(function(e){return{label:e,control:n.control,valueHelp:n.valueHelp}})})}function p(e,t,a){var l=n({aggregationName:i.aggregationName,payload:t.payload||{}},a);var d=t.instance;return Promise.resolve().then(function(){if(o(d.createLayout)&&!f(e)){return d.createLayout(l)}}).then(function(t){if(r.get("control",t)){t.layoutControl=true;return t}return g(e,l,d)})}return{applyChange:function(r,o,l){var d=r.getDefinition();var c=l.appComponent;var f=d.content;var u=f.newFieldSelector;var g={appComponent:l.appComponent,view:l.view,fieldSelector:u,bindingPath:f.bindingPath,modifier:l.modifier,element:o};if(l.modifier.bySelector(u,c)){return e.markAsNotApplicable("Control to be created already exists:"+(u.id||u),true)}var s={newFieldSelector:u};r.setRevertData(s);var v=a(f);return t.getDelegateForControl({control:o,modifier:l.modifier,modelType:v,supportsDefault:i.supportsDefault}).then(function(e){return p(d,e,g)}).then(function(e){var t=n({},{control:o,innerControls:e,change:r},l);i.addProperty(t);if(e.valueHelp){var a=l.modifier.getSelector(l.modifier.getId(e.valueHelp),c);s.valueHelpSelector=a}})},revertChange:function(e,t,r){var a=r.appComponent;var l=r.modifier;var d=e.getRevertData().newFieldSelector;var c=e.getRevertData().valueHelpSelector;var f=l.bySelector(d,a);var u=e.getDependentControl(i.parentAlias,r)||t;l.removeAggregation(u,i.aggregationName,f);l.destroy(f);if(c){var g=l.bySelector(c,a);l.removeAggregation(u,"dependents",g);l.destroy(g)}var p=n({},{control:t,change:e},r);if(o(i.revertAdditionalControls)){i.revertAdditionalControls(p)}e.resetRevertData();return true},completeChangeContent:function(e,t,n){var r=n.appComponent;var a=e.getDefinition();if(!a.content){a.content={}}if(t.parentId){if(o(i.mapParentIdIntoChange)){i.mapParentIdIntoChange(e,t,n)}else{e.addDependentControl(t.parentId,i.parentAlias,n)}try{a.content.parentId=n.modifier.getSelector(t.parentId,r)}catch(e){}}else{throw new Error("mSpecificChangeInfo.parentId attribute required")}if(t.bindingPath){a.content.bindingPath=t.bindingPath}else{throw new Error("mSpecificChangeInfo.bindingPath attribute required")}if(t.newControlId){a.content.newFieldSelector=n.modifier.getSelector(t.newControlId,r)}else{throw new Error("mSpecificChangeInfo.newControlId attribute required")}if(t.index===undefined){throw new Error("mSpecificChangeInfo.targetIndex attribute required")}else{a.content.newFieldIndex=t.index}if(t.oDataServiceVersion){a.content.oDataServiceVersion=t.oDataServiceVersion}if(t.modelType&&i.supportsDefault){a.content.modelType=t.modelType}},getChangeVisualizationInfo:function(e){var t=e.getRevertData();if(t){return{affectedControls:[t.labelSelector]}}return{affectedControls:[e.getContent().newFieldSelector]}},getCondenserInfo:function(e,t){return u(e,t).then(function(t){if(!t){return undefined}if(!e.getContent().newFieldSelector||!e.getContent().parentId||!i.aggregationName){return undefined}return{affectedControl:e.getContent().newFieldSelector,classification:sap.ui.fl.condenser.Classification.Create,targetContainer:e.getContent().parentId,targetAggregation:i.aggregationName,setTargetIndex:function(e,t){e.getContent().newFieldIndex=t},getTargetIndex:function(e){return e.getContent().newFieldIndex}}})}}}};return i});