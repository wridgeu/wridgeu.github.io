/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/ManagedObject","sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/fl/LayerUtils","sap/ui/fl/registry/Settings","sap/base/Log","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/base/util/includes"],function(e,t,i,n,o,r,s,a,p){"use strict";var u=t.extend("sap.ui.fl.Change",{constructor:function(n){t.apply(this);if(!e.isPlainObject(n)){s.error("Constructor : sap.ui.fl.Change : oFile is not defined")}this._oDefinition=n;this._sRequest="";this._bUserDependent=n.layer===i.USER;this._vRevertData=null;this._aUndoOperations=null;this._oExtensionPointInfo=null;this.setState(u.states.NEW);this._sPreviousState=null;this._oChangeProcessedPromise=null;this.setInitialApplyState();this._oChangeProcessingPromises={}},metadata:{properties:{state:{type:"string"},applyState:{type:"int"}}}});u.states={NEW:"NEW",PERSISTED:"NONE",DELETED:"DELETE",DIRTY:"UPDATE"};u.applyState={INITIAL:0,APPLYING:1,APPLY_FINISHED:2,REVERTING:3,REVERT_FINISHED:4};u.operations={APPLY:0,REVERT:1};u.prototype.setState=function(e){var t=this.getState();if(t!==e&&this._isValidState(e)){this._sPreviousState=t;this.setProperty("state",e)}return this};u.prototype.setQueuedForRevert=function(){if(this._aQueuedProcesses[this._aQueuedProcesses.length-1]!==u.operations.REVERT){this._aQueuedProcesses.unshift(u.operations.REVERT)}};u.prototype.isQueuedForRevert=function(){return this._aQueuedProcesses.indexOf(u.operations.REVERT)>-1};u.prototype.setQueuedForApply=function(){if(this._aQueuedProcesses[this._aQueuedProcesses.length-1]!==u.operations.APPLY){this._aQueuedProcesses.unshift(u.operations.APPLY)}};u.prototype.isQueuedForApply=function(){return this._aQueuedProcesses.indexOf(u.operations.APPLY)>-1};u.prototype.setInitialApplyState=function(){this._aQueuedProcesses=[];delete this._ignoreOnce;this.setApplyState(u.applyState.INITIAL);this._oChangeProcessedPromise={};this._oChangeProcessedPromise.promise=new Promise(function(e){this._oChangeProcessedPromise.resolveFunction={resolve:e}}.bind(this))};u.prototype.isInInitialState=function(){return this._aQueuedProcesses.length===0&&this.getApplyState()===u.applyState.INITIAL};u.prototype.isValidForDependencyMap=function(){return this._oDefinition.selector&&this._oDefinition.selector.id};u.prototype.startApplying=function(){this.setApplyState(u.applyState.APPLYING)};u.prototype.markFinished=function(e){this._aQueuedProcesses.pop();this._resolveChangeProcessingPromiseWithError(u.operations.APPLY,e);this.setApplyState(u.applyState.APPLY_FINISHED)};u.prototype.startReverting=function(){this.setApplyState(u.applyState.REVERTING)};u.prototype.markRevertFinished=function(e){this._aQueuedProcesses.pop();this._resolveChangeProcessingPromiseWithError(u.operations.REVERT,e);this.setApplyState(u.applyState.REVERT_FINISHED)};u.prototype.hasApplyProcessStarted=function(){return this.getApplyState()===u.applyState.APPLYING};u.prototype.isApplyProcessFinished=function(){return this.getApplyState()===u.applyState.APPLY_FINISHED};u.prototype.hasRevertProcessStarted=function(){return this.getApplyState()===u.applyState.REVERTING};u.prototype.isRevertProcessFinished=function(){return this.getApplyState()===u.applyState.REVERT_FINISHED};u.prototype.isCurrentProcessFinished=function(){return this._aQueuedProcesses.length===0&&this.getApplyState()!==u.applyState.INITIAL};u.prototype.addChangeProcessingPromise=function(e){if(!this._oChangeProcessingPromises[e]){this._oChangeProcessingPromises[e]={};this._oChangeProcessingPromises[e].promise=new Promise(function(t){this._oChangeProcessingPromises[e].resolveFunction={resolve:t}}.bind(this))}return this._oChangeProcessingPromises[e].promise};u.prototype.addChangeProcessingPromises=function(){var e=[];if(this.getApplyState()===u.applyState.INITIAL&&this._oChangeProcessedPromise){e.push(this._oChangeProcessedPromise.promise)}this._aQueuedProcesses.forEach(function(t){e.push(this.addChangeProcessingPromise(t))},this);return e};u.prototype.addPromiseForApplyProcessing=function(){return this.addChangeProcessingPromise(u.operations.APPLY)};u.prototype._resolveChangeProcessingPromiseWithError=function(e,t){if(this._oChangeProcessingPromises[e]){this._oChangeProcessingPromises[e].resolveFunction.resolve(t);delete this._oChangeProcessingPromises[e]}if(this._oChangeProcessedPromise){this._oChangeProcessedPromise.resolveFunction.resolve(t);this._oChangeProcessedPromise=null}};u.prototype._isValidState=function(e){var t=false;Object.keys(u.states).some(function(i){if(u.states[i]===e){t=true}return t});if(!t){return false}if(this.getState()===u.states.NEW&&e===u.states.DIRTY){return false}return true};u.prototype.isValid=function(){var e=true;if(typeof this._oDefinition!=="object"){e=false}if(!this._oDefinition.fileType){e=false}if(!this._oDefinition.fileName){e=false}if(!this._oDefinition.changeType){e=false}if(!this._oDefinition.layer){e=false}if(!this._oDefinition.originalLanguage){e=false}return e};u.prototype.isVariant=function(){return this._oDefinition.fileType==="variant"};u.prototype.getChangeType=function(){if(this._oDefinition){return this._oDefinition.changeType}};u.prototype.getFileName=function(){if(this._oDefinition){return this._oDefinition.fileName}};u.prototype.getFileType=function(){if(this._oDefinition){return this._oDefinition.fileType}};u.prototype.getOriginalLanguage=function(){if(this._oDefinition&&this._oDefinition.originalLanguage){return this._oDefinition.originalLanguage}return""};u.prototype.getPackage=function(){return this._oDefinition.packageName};u.prototype.setPackage=function(e){if(typeof e!=="string"){s.error("sap.ui.fl.Change.setPackage : sPackage is not defined")}this._oDefinition.packageName=e};u.prototype.getNamespace=function(){return this._oDefinition.namespace};u.prototype.setNamespace=function(e){this._oDefinition.namespace=e};u.prototype.getModuleName=function(){return this._oDefinition.moduleName};u.prototype.setModuleName=function(e){this._oDefinition.moduleName=e};u.prototype.getProjectId=function(){return this._oDefinition.projectId};u.prototype.setProjectId=function(e){this._oDefinition.projectId=e};u.prototype.getId=function(){return this._oDefinition.fileName};u.prototype.getContent=function(){return this._oDefinition.content};u.prototype.setContent=function(e){this._oDefinition.content=e;this.setState(u.states.DIRTY)};u.prototype.getVariantReference=function(){return this._oDefinition.variantReference||""};u.prototype.setVariantReference=function(e){this._oDefinition.variantReference=e;this.setState(u.states.DIRTY)};u.prototype.getSelector=function(){return this._oDefinition.selector};u.prototype.setSelector=function(e){this._oDefinition.selector=e};u.prototype.getSourceSystem=function(){return this._oDefinition.sourceSystem};u.prototype.getSourceClient=function(){return this._oDefinition.sourceClient};u.prototype.getOwnerId=function(){return this._oDefinition.support?this._oDefinition.support.user:""};u.prototype.getText=function(e){if(typeof e!=="string"){s.error("sap.ui.fl.Change.getTexts : sTextId is not defined")}if(this._oDefinition.texts){if(this._oDefinition.texts[e]){return this._oDefinition.texts[e].value}}return""};u.prototype.getTexts=function(){return this._oDefinition.texts};u.prototype.setText=function(e,t){if(typeof e!=="string"){s.error("sap.ui.fl.Change.setTexts : sTextId is not defined");return}if(this._oDefinition.texts){if(this._oDefinition.texts[e]){this._oDefinition.texts[e].value=t;this.setState(u.states.DIRTY)}}};u.prototype.isReadOnly=function(){return this._isReadOnlyDueToLayer()||this._isReadOnlyWhenNotKeyUser()||this.isChangeFromOtherSystem()};u.prototype._isReadOnlyWhenNotKeyUser=function(){if(this.isUserDependent()){return false}var e=this.getDefinition().reference;if(!e){return true}var t=r.getInstanceOrUndef();if(!t){return true}return!t.isKeyUser()};u.prototype.isLabelReadOnly=function(){if(this._isReadOnlyDueToLayer()){return true}return this._isReadOnlyDueToOriginalLanguage()};u.prototype._isReadOnlyDueToLayer=function(){var e;e=this._bUserDependent?i.USER:o.getCurrentLayer();return this._oDefinition.layer!==e};u.prototype.isChangeFromOtherSystem=function(){var e=this.getSourceSystem();var t=this.getSourceClient();if(!e||!t){return false}var i=r.getInstanceOrUndef();if(!i){return true}var n=i.getSystem();var o=i.getClient();if(!n||!o){return false}return e!==n||t!==o};u.prototype._isReadOnlyDueToOriginalLanguage=function(){var e;var t;t=this.getOriginalLanguage();if(!t){return false}e=n.getCurrentLanguage();return e!==t};u.prototype.markForDeletion=function(){this.setState(u.states.DELETED)};u.prototype.restorePreviousState=function(){if(this._sPreviousState){this.setState(this._sPreviousState);delete this._sPreviousState}};u.prototype.setRequest=function(e){if(typeof e!=="string"){s.error("sap.ui.fl.Change.setRequest : sRequest is not defined")}this._sRequest=e};u.prototype.getRequest=function(){return this._sRequest};u.prototype.getLayer=function(){return this._oDefinition.layer};u.prototype.getComponent=function(){return this._oDefinition.reference};u.prototype.setComponent=function(e){this._oDefinition.reference=e};u.prototype.getCreation=function(){return this._oDefinition.creation};u.prototype.isUserDependent=function(){return this._bUserDependent};u.prototype.getPendingAction=function(){return this.getState()};u.prototype.getDefinition=function(){return this._oDefinition};u.prototype.setResponse=function(e){var t=JSON.stringify(e);if(t){this._oDefinition=JSON.parse(t);this.setState(u.states.PERSISTED)}};u.prototype.getFullFileIdentifier=function(){var e=this.getLayer();var t=this.getNamespace();var i=this.getDefinition().fileName;var n=this.getDefinition().fileType;return e+"/"+t+"/"+i+"."+n};u.prototype.addDependentControl=function(e,t,i,n){if(!e){throw new Error("Parameter vControl is mandatory")}if(!t){throw new Error("Parameter sAlias is mandatory")}if(!i){throw new Error("Parameter mPropertyBag is mandatory")}if(!this._oDefinition.dependentSelector){this._oDefinition.dependentSelector={}}if(this._oDefinition.dependentSelector[t]){throw new Error("Alias '"+t+"' already exists in the change.")}var o=i.modifier;var r=i.appComponent;if(Array.isArray(e)){var s=[];e.forEach(function(e){s.push(o.getSelector(e,r,n))});this._oDefinition.dependentSelector[t]=s}else{this._oDefinition.dependentSelector[t]=o.getSelector(e,r,n)}delete this._aDependentSelectorList};u.prototype.getDependentControl=function(e,t){var i=[];var n;if(!e){throw new Error("Parameter sAlias is mandatory")}if(!t){throw new Error("Parameter mPropertyBag is mandatory")}var o=t.modifier;var r=t.appComponent;if(!this._oDefinition.dependentSelector){return undefined}n=this._oDefinition.dependentSelector[e];if(Array.isArray(n)){n.forEach(function(e){i.push(o.bySelector(e,r,t.view))});return i}return o.bySelector(n,r,t.view)};u.prototype.getDependentSelectorList=function(){var e=this;var t=[this.getSelector()];if(!this._aDependentSelectorList){if(this._oDefinition.dependentSelector){Object.keys(this._oDefinition.dependentSelector).some(function(i){if(i==="originalSelector"){t=[this.getSelector()];return true}var o=e._oDefinition.dependentSelector[i];if(!Array.isArray(o)){o=[o]}o.forEach(function(e){if(e&&n.indexOfObject(t,e)===-1){t.push(e)}})}.bind(this))}this._aDependentSelectorList=t}return this._aDependentSelectorList};u.prototype.getDependentControlSelectorList=function(){var e=this.getDependentSelectorList().concat();if(e.length>0){var t=this.getSelector();var i=n.indexOfObject(e,t);if(i>-1){e.splice(i,1)}}return e};u.prototype.getRevertData=function(){return this._vRevertData};u.prototype.hasRevertData=function(){return this._vRevertData!==null};u.prototype.setRevertData=function(e){if(e===undefined){throw new Error("Change cannot be applied in XML as revert data is not available yet. Retrying in JS.")}this._vRevertData=e};u.prototype.resetRevertData=function(){this.setRevertData(null)};u.prototype.getUndoOperations=function(){return this._aUndoOperations};u.prototype.setUndoOperations=function(e){this._aUndoOperations=e};u.prototype.getExtensionPointInfo=function(){return this._oExtensionPointInfo};u.prototype.setExtensionPointInfo=function(e){this._oExtensionPointInfo=e};u.prototype.resetUndoOperations=function(){this.setUndoOperations(null)};u.createInitialFileContent=function(e){if(!e){e={}}var t;if(e.fileType){t=e.fileType}else{t=e.isVariant?"variant":"change"}var r={fileName:e.id||n.createDefaultFileName(e.changeType),fileType:t,changeType:e.changeType||"",moduleName:e.moduleName||"",reference:e.reference||"",packageName:e.packageName||"",content:e.content||{},selector:e.selector||{id:""},layer:e.layer||(e.isUserDependent?i.USER:o.getCurrentLayer()),texts:e.texts||{},namespace:e.namespace||n.createNamespace(e,t),projectId:e.projectId||e.reference&&e.reference.replace(".Component","")||"",creation:"",originalLanguage:n.getCurrentLanguage(),support:{generator:e.generator||"Change.createInitialFileContent",service:e.service||"",user:"",sapui5Version:sap.ui.version,sourceChangeFileName:e.support&&e.support.sourceChangeFileName||"",compositeCommand:e.support&&e.support.compositeCommand||"",command:e.command||""},oDataInformation:e.oDataInformation||{},dependentSelector:e.dependentSelector||{},jsOnly:e.jsOnly||false,variantReference:e.variantReference||"",appDescriptorChange:p(a.getChangeTypes(),e.changeType)};return r};return u},true);