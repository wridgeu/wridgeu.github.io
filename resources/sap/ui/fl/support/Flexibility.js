/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/support/Plugin","sap/ui/core/support/Support","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/model/json/JSONModel","sap/ui/fl/FlexController","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/Utils","sap/ui/fl/support/apps/uiFlexibilityDiagnostics/helper/Extractor"],function(e,t,i,n,s,a,o,p,r){"use strict";var l=t.extend("sap.ui.fl.support.Flexibility",{constructor:function(e){t.apply(this,["sapUiSupportFlexibility","Flexibility",e]);this._oStub=e;if(this.runsAsToolPlugin()){this._aEventIds=[this.getId()+"SetApps",this.getId()+"SetChangesMaps"]}else{this._aEventIds=[this.getId()+"GetApps",this.getId()+"GetChangesMaps"]}}});l.prototype.sDelimiter=";";l.prototype.init=function(e){t.prototype.init.apply(this,arguments);var n="<div class='sapUiSmallMargin'>The applications listed below have been handled by the sap.ui.fl library in this session.</div>"+"<div class='sapUiSmallMarginBegin'>You can download a file containing the data that has been applied to an application as well as "+"relevant runtime information, and then upload this file to the UI Flexibility Diagnostics application for further investigation.</div>"+"<div class='sapUiSmallMarginBegin'>The UI Flexibility Diagnostics application displays graphs and is only available with SAPUI5.</div>";if(e.isToolStub()){this.addStylesheet("sap/ui/fl/support/flexibility");this.oChangesModel=new s;this.oAppModel=new s;this.oToolSettings=new s({hideDependingChanges:false,panelInfoText:n});this.oChangeDetails=new s;this._renderToolPlugin([]);i.getStub().sendEvent(this.getId()+"GetApps",{})}else{this.onsapUiSupportFlexibilityGetApps()}};l.prototype._renderToolPlugin=function(){var e=this;var t=function(){var t=sap.ui.getCore().createRenderManager();t.write("<div id='"+e.getId()+"-FlexCacheArea' class='sapUiSizeCompact'></div>");t.flush(e.$().get(0));t.destroy()};var i=function(){e.oView=sap.ui.view({viewName:"sap.ui.fl.support.diagnostics.Flexibility",type:sap.ui.core.mvc.ViewType.XML,viewData:{plugin:e}});e.oView.placeAt(e.getId()+"-FlexCacheArea");e.oView.setModel(e.oAppModel,"flexApps");e.oView.setModel(e.oToolSettings,"flexToolSettings");e.oView.setModel(e.oChangesModel,"flexChanges");e.oView.setModel(e.oChangeDetails,"flexChangeDetails")};t();i()};l.prototype.onRefresh=function(){i.getStub().sendEvent(this.getId()+"GetApps",{})};l.prototype.onsapUiSupportFlexibilityGetApps=function(){var t=[];if(o._instanceCache){e.each(o._instanceCache,function(e,i){t.push({key:e,text:e,data:r.extractData(i)})})}this._oStub.sendEvent(this.getId()+"SetApps",t)};l.prototype.onsapUiSupportFlexibilityGetChangesMaps=function(e){var t=e.mParameters.appKey;var i=t.split(this.sDelimiter);var n=i[0];this._getChangesMapForApp(n)};l.prototype.onsapUiSupportFlexibilitySetApps=function(e){var t=e.getParameters();this.oAppModel.setData(t)};l.prototype.onsapUiSupportFlexibilitySetChangesMaps=function(e){var t=e.getParameters();this.oChangesModel.setData(t);this.oView.byId("Tree").expandToLevel(1e3)};l.prototype.exit=function(){t.prototype.exit.apply(this,arguments)};l.prototype._getChangesMapForApp=function(t){function i(e,t){c[t]=[];var i=C[t];var n=sap.ui.getCore().byId(t);var o=[];var p=[];var r=[];if(n){if(n.data(a.appliedChangesCustomDataKey)){o=n.data(a.appliedChangesCustomDataKey).split(",")}if(n.data(a.failedChangesCustomDataKeyJs)){p=n.data(a.failedChangesCustomDataKeyJs).split(",")}if(n.data(a.failedChangesCustomDataKeyXml)){r=n.data(a.failedChangesCustomDataKeyXml).split(",")}}c[t]=i.map(s.bind(this,n,o,p,r,e))}function s(e,i,s,a,o,p){var l={id:p.getId(),changeType:p.getChangeType(),selector:p.getSelector(),controlPresent:!!e,indexInAppliedChanges:undefined,indexOfFirstFailing:undefined,dependentControls:[],dependentChanges:[],someDirectDependingChangesFailed:false,someDirectDependingChangesNotApplied:false,isInSubTree:false};var d=s.concat(a);if(l.controlPresent&&i.indexOf(p.getId())>-1){l.indexInAppliedChanges=i.indexOf(p.getId())}if(l.controlPresent&&s.indexOf(p.getId())>-1){l.modifier="JS";l.indexOfFirstFailing=d.indexOf(p.getId())}if(l.controlPresent&&a.indexOf(p.getId())>-1){l.modifier="XML";l.indexOfFirstFailing=d.indexOf(p.getId())}if(p._aDependentSelectorList){var g=r.getAppComponentInstance(t);l.dependentControls=p._aDependentSelectorList.map(function(e){return{id:e.id,controlPresent:n.bySelector(e,g)}})}o[p.getId()]=l;return l}function p(e,t,i){var n=i.dependencies;if(n.indexOf(e.id)!==-1){var s=JSON.stringify(h[t].selector)===JSON.stringify(e.selector);e.isInSubTree=e.isInSubTree||s}}function l(t,i){i.forEach(function(t){e.each(y,p.bind(this,t));t.allDependendingControlsPresent=t.dependentControls.every(function(e){return e.controlPresent});if(y[t.id]&&y[t.id].dependencies){y[t.id].dependencies.forEach(function(e){var i=h[e];var n=i.indexInAppliedChanges===undefined;i=h[e];t.someDirectDependingChangesNotApplied=t.someDirectDependingChangesNotApplied||n;var s=i.indexOfFirstFailing===undefined;var a=s&&n;t.someDirectDependingChangesFailed=t.someDirectDependingChangesFailed||s;t.someDirectDependingChangesNotSuccessfulApplied=t.someDirectDependingChangesNotSuccessfulApplied||a;t.dependentChanges.push(i)})}t.isApplicable=!t.someDirectDependingChangesNotApplied&&t.controlPresent&&t.allDependendingControlsPresent&&!t.someDirectDependingChangesNotApplied;t.isPossibleRootCause=t.isApplicable&&t.indexInAppliedChanges===undefined})}function d(e){e=e.filter(function(t){return!e.some(function(e){return e.dependentChanges.some(function(e){return e.id===t.id})})});return e.map(function(e){return{id:e.id,text:e.changeType,nodes:e.dependentChanges?d(e.dependentChanges):[]}})}function g(e,t){u.push({text:e,nodes:d(t)})}var h={};var c={};var u=[];var f=o.getChangePersistenceForComponent(t);var C=f._mChanges.mChanges;var y=f._mChangesInitial.mDependencies;Object.keys(C).forEach(i.bind(this,h));e.each(c,l);e.each(c,g);this._oStub.sendEvent(this.getId()+"SetChangesMaps",{changes:h,tree:u})};return l});