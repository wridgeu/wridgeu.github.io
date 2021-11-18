/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Element","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/changes/Utils","sap/ui/fl/apply/_internal/flexState/changes/DependencyHandler","sap/ui/fl/Utils"],function(e,n,t,r,i,a,o){"use strict";var s=new o.FakePromise;function l(e,n){var t=e.getSelector&&e.getSelector();if(!t||!t.id&&!t.name){return Promise.reject(Error("No selector in change found or no selector ID."))}return n.modifier.bySelectorTypeIndependent(t,n.appComponent,n.view).then(function(t){if(!t){throw Error("A flexibility change tries to change a nonexistent control.")}var r=e.getDependentControlSelectorList();r.forEach(function(e){var t=n.modifier.bySelector(e,n.appComponent,n.view);if(!t){throw new Error("A dependent selector control of the flexibility change is not available.")}});return t})}function c(e,n,t,a,o){var s=i.getControlIfTemplateAffected(n,e,o);var l=o.modifier;var c=r.sync.hasChangeApplyFinishedCustomData(s.control,n,l);var u=n.isApplyProcessFinished();if(u&&!c){var p=i.checkIfDependencyIsStillValidSync.bind(null,o.appComponent,l,t);a._oChangePersistence.copyDependenciesFromInitialChangesMapSync(n,p,o.appComponent);n.setInitialApplyState()}else if(!u&&c){n.setRevertData(r.sync.getParsedRevertDataFromCustomData(e,n));n.markFinished()}}function u(e){return e.modifier.targets==="xmlTree"}function p(e,n,t,a,s){var l=u(s);var c=i.getControlIfTemplateAffected(n,e,s);var p=s.modifier;return r.hasChangeApplyFinishedCustomData(c.control,n,p).then(function(c){var u=n.isApplyProcessFinished();var p=s.modifier;var d=s.appComponent;if(u&&!c){var f=new o.FakePromise;if(!l){var g=i.checkIfDependencyIsStillValid.bind(null,d,p,t);f=f.then(function(){return a._oChangePersistence.copyDependenciesFromInitialChangesMap(n,g,d)})}return f.then(n.setInitialApplyState.bind(n))}else if(!u&&c){return r.getParsedRevertDataFromCustomData(e,n,p).then(function(e){n.setRevertData(e);n.markFinished()})}else if(u&&c){n.markFinished()}return undefined})}function d(e,n){var t;if(u(n)&&e.getDefinition().jsOnly){t="Change cannot be applied in XML. Retrying in JS."}if(t){e.setInitialApplyState();throw Error(t)}}function f(e,t,i,a){return Promise.resolve().then(function(){if(i instanceof n){t.control=i}if(t.control){return a.modifier.updateAggregation(t.originalControl,e.getContent().boundAggregation)}return undefined}).then(function(){return r.addAppliedCustomData(t.control,e,a,u(a))}).then(function(){var n={success:true};e.markFinished(n);return n})}function g(e,n,t,i){var a=u(i);var s={success:false,error:e};var l=n.getId();var c="Change ''{0}'' could not be applied.";var p=e instanceof Error;var d=r.getCustomDataIdentifier(false,p,a);switch(d){case r.notApplicableChangesCustomDataKey:o.formatAndLogMessage("info",[c,e.message],[l]);break;case r.failedChangesCustomDataKeyXml:o.formatAndLogMessage("warning",[c,"Merge error detected while processing the XML tree."],[l],e.stack);break;case r.failedChangesCustomDataKeyJs:o.formatAndLogMessage("error",[c,"Merge error detected while processing the JS control tree."],[l],e.stack);break}return r.addFailedCustomData(t.control,n,i,d).then(function(){if(a){n.setInitialApplyState()}else{n.markFinished(s)}return s})}function h(n,t){var r=t.getDefinition();var i=r.changeType;var a=r.selector.id;var o=r.namespace+r.fileName+"."+r.fileType;var s="A flexibility change could not be applied.";s+="\nThe displayed UI might not be displayed as intedend.";if(n.message){s+="\n   occurred error message: '"+n.message+"'"}s+="\n   type of change: '"+i+"'";s+="\n   LRep location of the change: "+o;s+="\n   id of targeted control: '"+a+"'.";e.warning(s,undefined,"sap.ui.fl.apply._internal.changes.Applier")}function m(e,n,r){var i={appComponent:r,modifier:t};var a=t.bySelector(e.originalSelectorToBeAdjusted,r);var o=n.getBindingInfo(e.getContent().boundAggregation).template;if(a.getParent()){var s=[];var l=a;do{s.push({aggregation:l.sParentAggregationName,index:l.getParent().getAggregation(l.sParentAggregationName).indexOf(l)});l=l.getParent()}while(l.getParent());s.reverse();s.forEach(function(e){o=o.getAggregation(e.aggregation)[e.index]})}e.addDependentControl(o,"originalSelector",i)}var v={addPreConditionForInitialChangeApplying:function(e){s=s.then(function(){return e})},applyChangeOnControl:function(e,n,t){var r=i.getControlIfTemplateAffected(e,n,t);return i.getChangeHandler(e,r,t).then(function(n){d(e,t);return n}).then(function(n){if(e.hasApplyProcessStarted()){return e.addPromiseForApplyProcessing().then(function(n){e.markFinished();return n})}else if(!e.isApplyProcessFinished()){return(new o.FakePromise).then(function(){e.startApplying();return n.applyChange(e,r.control,t)}).then(function(n){return f(e,r,n,t)}).catch(function(n){return g(n,e,r,t)})}var i={success:true};e.markFinished(i);return i}).catch(function(e){return{success:false,error:e}})},applyAllChangesForControl:function(e,n,r,i){var l=e();var u=i.getId();var p=l.mChanges[u]||[];var d={modifier:t,appComponent:n,view:o.getViewForControl(i)};p.forEach(function(e){c(i,e,l,r,d);if(!e.isApplyProcessFinished()&&!e._ignoreOnce){e.setQueuedForApply()}});s=s.then(function(e,t){var r=[];var i=e.getId();var s=l.mChanges[i]||[];var c;if(l.mControlsWithDependencies[i]){a.removeControlsDependencies(l,i);c=true}s.forEach(function(o){if(o.originalSelectorToBeAdjusted){m(o,e,n);delete o.originalSelectorToBeAdjusted}if(o._ignoreOnce){delete o._ignoreOnce}else if(o.isApplyProcessFinished()){a.resolveDependenciesForChange(l,o.getId(),i)}else if(!l.mDependencies[o.getId()]){r.push(function(){return v.applyChangeOnControl(o,e,t).then(function(){a.resolveDependenciesForChange(l,o.getId(),i)})})}else{var s=v.applyChangeOnControl.bind(v,o,e,t);a.addChangeApplyCallbackToDependency(l,o.getId(),s)}});if(s.length||c){return o.execPromiseQueueSequentially(r).then(function(){return a.processDependentQueue(l,n,i)})}return undefined}.bind(null,i,d));return s},applyAllChangesForXMLView:function(n,t){if(!Array.isArray(t)){var r="No list of changes was passed for processing the flexibility on view: "+n.view+".";e.error(r,undefined,"sap.ui.fl.apply._internal.changes.Applier");t=[]}return t.reduce(function(e,t){var r;return e.then(l.bind(null,t,n)).then(function(e){r=e;t.setQueuedForApply();return p(r,t,undefined,undefined,n)}).then(function(){if(!t.isApplyProcessFinished()){return v.applyChangeOnControl(t,r,n)}return{success:true}}).then(function(e){if(!e.success){throw Error(e.error)}}).catch(function(e){h(e,t)})},new o.FakePromise).then(function(){return n.view})}};return v});