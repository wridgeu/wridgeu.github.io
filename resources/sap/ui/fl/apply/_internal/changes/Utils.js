/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/Utils","sap/ui/fl/registry/ChangeHandlerRegistration","sap/ui/fl/registry/ChangeRegistry"],function(e,t,n,r){"use strict";var a={getControlIfTemplateAffected:function(e,t,n){var r=n.modifier;var a=e.getDefinition();var o={originalControl:t};var i=a.dependentSelector&&a.dependentSelector.originalSelector;if(e.getContent().boundAggregation&&i){o.control=r.bySelector(i,n.appComponent,n.view);o.controlType=r.getControlType(o.control);o.bTemplateAffected=true}else{o.control=t;o.controlType=r.getControlType(t);o.bTemplateAffected=false}return o},getChangeHandler:function(e,a,o){var i=o.modifier.getLibraryName(a.control);var l=new t.FakePromise;if(n.isChangeHandlerRegistrationInProgress(i)){l=n.waitForChangeHandlerRegistration(i)}return l.then(function(){var t=e.getChangeType();var n=e.getLayer();var i=r.getInstance();i.initSettings();return i.getChangeHandler(t,a.controlType,a.control,o.modifier,n)})},checkIfDependencyIsStillValid:function(n,r,a,o){var i=t.getChangeFromChangesMap(a.mChanges,o);var l=r.bySelector(i.getSelector(),n);if(e.hasChangeApplyFinishedCustomData(l,i,r)||i.hasApplyProcessStarted()){return false}return true}};return a});