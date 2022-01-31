/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/ui/core/support/Plugin","sap/ui/core/support/Support","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/model/json/JSONModel","sap/ui/fl/FlexController","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/support/apps/uiFlexibilityDiagnostics/helper/Extractor","sap/ui/core/mvc/XMLView","sap/ui/core/Component"],function(e,t,i,n,a,s,o,p,r,d){"use strict";var l=t.extend("sap.ui.fl.support.Flexibility",{constructor:function(e){t.apply(this,["sapUiSupportFlexibility","Flexibility",e]);this._oStub=e;if(this.runsAsToolPlugin()){this._aEventIds=[this.getId()+"SetApps",this.getId()+"SetChangesMaps"]}else{this._aEventIds=[this.getId()+"GetApps",this.getId()+"GetChangesMaps"]}}});l.prototype.sDelimiter=";";l.prototype.init=function(e){t.prototype.init.apply(this,arguments);var n="<div class='sapUiSmallMargin'>The applications listed below have been handled by the sap.ui.fl library in this session.</div>"+"<div class='sapUiSmallMarginBegin'>You can download a file containing the data that has been applied to an application as well as "+"relevant runtime information, and then upload this file to the UI Flexibility Diagnostics application for further investigation.</div>"+"<div class='sapUiSmallMarginBegin'>The UI Flexibility Diagnostics application displays graphs and is only available with SAPUI5.</div>";if(e.isToolStub()){this.addStylesheet("sap/ui/fl/support/flexibility");this.oChangesModel=new a;this.oAppModel=new a;this.oToolSettings=new a({hideDependingChanges:false,panelInfoText:n});this.oChangeDetails=new a;this._renderToolPlugin([]);i.getStub().sendEvent(this.getId()+"GetApps",{})}else{this.onsapUiSupportFlexibilityGetApps()}};l.prototype._renderToolPlugin=function(){var e=function(){var e=sap.ui.getCore().createRenderManager();e.write("<div id='"+this.getId()+"-FlexCacheArea' class='sapUiSizeCompact'></div>");e.flush(this.$().get(0));e.destroy()}.bind(this);var t=function(){this.oViewPromise=r.create({viewName:"sap.ui.fl.support.diagnostics.Flexibility",viewData:{plugin:this}}).then(function(e){this.oView=e;this.oView.placeAt(this.getId()+"-FlexCacheArea");this.oView.setModel(this.oAppModel,"flexApps");this.oView.setModel(this.oToolSettings,"flexToolSettings");this.oView.setModel(this.oChangesModel,"flexChanges");this.oView.setModel(this.oChangeDetails,"flexChangeDetails")}.bind(this))}.bind(this);e();t()};l.prototype.onRefresh=function(){i.getStub().sendEvent(this.getId()+"GetApps",{})};l.prototype.onsapUiSupportFlexibilityGetApps=function(){var t=[];if(o._instanceCache){e(o._instanceCache,function(e,i){t.push({key:e,text:e,additionalText:this.getAppVariantHierarchy(e),data:p.extractData(i)})}.bind(this))}this._oStub.sendEvent(this.getId()+"SetApps",t)};l.prototype.getAppVariantHierarchy=function(e){var t=d.registry.all();var i=[];Object.values(t).find(function(t){var n=t.getMetadata().getManifestEntry("/sap.app/id");var a=t.getMetadata().getManifestEntry("sap.ui5");if(n===e){a.appVariantIdHierarchy.forEach(function(e){i.push(e.appVariantId+" ("+e.version+")"+(e.layer?" in layer "+e.layer:""))});return true}});return i.length?"App variant based on:\n"+i.join("\n"):""};l.prototype.onsapUiSupportFlexibilityGetChangesMaps=function(e){var t=e.mParameters.appKey;var i=t.split(this.sDelimiter);var n=i[0];this._getChangesMapForApp(n)};l.prototype.onsapUiSupportFlexibilitySetApps=function(e){var t=e.getParameters();this.oAppModel.setData(t)};l.prototype.onsapUiSupportFlexibilitySetChangesMaps=function(e){var t=e.getParameters();this.oChangesModel.setData(t);this.oView.byId("Tree").expandToLevel(1e3)};l.prototype.exit=function(){t.prototype.exit.apply(this,arguments)};l.prototype._getChangesMapForApp=function(e){var t={};var i={};var a=[];var r=o.getChangePersistenceForComponent(e);var d=r._mChanges.mChanges;var l=r._mChangesInitial.mDependencies;function h(e,i){t[i]=[];var n=d[i];var a=sap.ui.getCore().byId(i);var o=[];var p=[];var r=[];if(a){if(a.data(s.appliedChangesCustomDataKey)){o=a.data(s.appliedChangesCustomDataKey).split(",")}if(a.data(s.failedChangesCustomDataKeyJs)){p=a.data(s.failedChangesCustomDataKeyJs).split(",")}if(a.data(s.failedChangesCustomDataKeyXml)){r=a.data(s.failedChangesCustomDataKeyXml).split(",")}}t[i]=n.map(g.bind(this,a,o,p,r,e))}function g(t,i,a,s,o,r){var d={id:r.getId(),changeType:r.getChangeType(),selector:r.getSelector(),controlPresent:!!t,indexInAppliedChanges:undefined,indexOfFirstFailing:undefined,dependentControls:[],dependentChanges:[],someDirectDependingChangesFailed:false,someDirectDependingChangesNotApplied:false,isInSubTree:false};var l=a.concat(s);if(d.controlPresent&&i.indexOf(r.getId())>-1){d.indexInAppliedChanges=i.indexOf(r.getId())}if(d.controlPresent&&a.indexOf(r.getId())>-1){d.modifier="JS";d.indexOfFirstFailing=l.indexOf(r.getId())}if(d.controlPresent&&s.indexOf(r.getId())>-1){d.modifier="XML";d.indexOfFirstFailing=l.indexOf(r.getId())}if(r._aDependentSelectorList){var h=p.getAppComponentInstance(e);d.dependentControls=r._aDependentSelectorList.map(function(e){return{id:e.id,controlPresent:n.bySelector(e,h)}})}o[r.getId()]=d;return d}function c(e,t,n){var a=n.dependencies;if(a.indexOf(e.id)!==-1){var s=JSON.stringify(i[t].selector)===JSON.stringify(e.selector);e.isInSubTree=e.isInSubTree||s}}function u(e,t){t.forEach(function(e){jQuery.each(l,c.bind(this,e));e.allDependendingControlsPresent=e.dependentControls.every(function(e){return e.controlPresent});if(l[e.id]&&l[e.id].dependencies){l[e.id].dependencies.forEach(function(t){var n=i[t];var a=n.indexInAppliedChanges===undefined;n=i[t];e.someDirectDependingChangesNotApplied=e.someDirectDependingChangesNotApplied||a;var s=n.indexOfFirstFailing===undefined;var o=s&&a;e.someDirectDependingChangesFailed=e.someDirectDependingChangesFailed||s;e.someDirectDependingChangesNotSuccessfulApplied=e.someDirectDependingChangesNotSuccessfulApplied||o;e.dependentChanges.push(n)})}e.isApplicable=!e.someDirectDependingChangesNotApplied&&e.controlPresent&&e.allDependendingControlsPresent&&!e.someDirectDependingChangesNotApplied;e.isPossibleRootCause=e.isApplicable&&e.indexInAppliedChanges===undefined})}function f(e){e=e.filter(function(t){return!e.some(function(e){return e.dependentChanges.some(function(e){return e.id===t.id})})});return e.map(function(e){return{id:e.id,text:e.changeType,nodes:e.dependentChanges?f(e.dependentChanges):[]}})}function C(e,t){a.push({text:e,nodes:f(t)})}Object.keys(d).forEach(h.bind(this,i));jQuery.each(t,u);jQuery.each(t,C);this._oStub.sendEvent(this.getId()+"SetChangesMaps",{changes:i,tree:a})};return l});