/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/changes/DependencyHandler","sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/Change","sap/ui/fl/Layer","sap/ui/fl/Variant","sap/ui/fl/Utils","sap/ui/fl/LayerUtils","sap/ui/fl/Cache","sap/ui/fl/registry/Settings","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/write/_internal/Storage","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/model/json/JSONModel","sap/ui/performance/Measurement","sap/base/util/includes","sap/base/util/merge","sap/base/util/restricted/_union","sap/base/util/UriParameters","sap/base/Log","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/write/_internal/condenser/Condenser"],function(e,t,n,r,a,i,s,o,h,g,p,c,l,f,u,d,C,m,y,_,v,D,S){"use strict";var b=function(t){this._mComponent=t;this._mChanges=e.createEmptyDependencyMap();this._bChangesMapCreated=false;this._mChangesInitial=C({},this._mChanges);if(!this._mComponent||!this._mComponent.name){_.error("The Control does not belong to an SAPUI5 component. Personalization and changes for this control might not work as expected.");throw new Error("Missing component name.")}this._aDirtyChanges=[];this._oMessagebundle=undefined;this._mChangesEntries={};this._bHasChangesOverMaxLayer=false;this.HIGHER_LAYER_CHANGES_EXIST="higher_layer_changes_exist"};function I(e,t){var r;if(t instanceof n){r=t;this._mChangesEntries[r.getFileName()]=r}else{if(!this._mChangesEntries[t.fileName]){this._mChangesEntries[t.fileName]=new n(t)}r=this._mChangesEntries[t.fileName];r.setState(n.states.PERSISTED)}return r}b.prototype.getComponentName=function(){return this._mComponent.name};b.prototype.getCacheKey=function(e){return o.getCacheKey(this._mComponent,e)};b.prototype._preconditionsFulfilled=function(e){var t=e instanceof n?e.getDefinition():e;function r(){if(t.fileType==="ctrl_variant"||t.fileType==="ctrl_variant_change"||t.fileType==="ctrl_variant_management_change"){return t.variantManagementReference||t.variantReference||t.selector&&t.selector.id}}return t.fileType==="change"||r()};b.prototype.getChangesForComponent=function(e,n){return i.getUShellService("URLParsing").then(function(t){this._oUShellURLParsingService=t;return o.getChangesFillingCache(this._mComponent,e,n)}.bind(this)).then(function(e,n){var a=C({},n);var o=e&&e.component&&i.getAppComponentForControl(e.component);var h=t.isStorageResponseFilled(a.changes);if(!h){return[]}var g=a.changes.changes;if(!this._oMessagebundle&&a.messagebundle&&o){if(!o.getModel("i18nFlexVendor")){if(g.some(function(e){return e.layer===r.VENDOR})){this._oMessagebundle=a.messagebundle;var p=new f(this._oMessagebundle);o.setModel(p,"i18nFlexVendor")}}}var c=e&&e.currentLayer;var l=!(e&&e.ignoreMaxLayerParameter);var u=function(){return true};if(c){g=s.filterChangeOrChangeDefinitionsByCurrentLayer(g,c)}else if(s.isLayerFilteringRequired(this._oUShellURLParsingService)&&l){u=this._filterChangeForMaxLayer.bind(this);g=g.filter(u)}else if(this._bHasChangesOverMaxLayer&&!l){this._bHasChangesOverMaxLayer=false;return this.HIGHER_LAYER_CHANGES_EXIST}var d=a.changes&&e&&e.includeCtrlVariants;var m=this._getAllCtrlVariantChanges(a,d,u);g=g.concat(m);return this._checkAndGetChangeInstances(g,a)}.bind(this,e))};b.prototype._checkAndGetChangeInstances=function(e,t){return e.filter(this._preconditionsFulfilled).map(I.bind(this,t))};b.prototype._filterChangeForMaxLayer=function(e){if(s.isOverMaxLayer(this._getLayerFromChangeOrChangeContent(e),this._oUShellURLParsingService)){if(!this._bHasChangesOverMaxLayer){this._bHasChangesOverMaxLayer=true}return false}return true};b.prototype._getLayerFromChangeOrChangeContent=function(e){var t;if(e instanceof a||e instanceof n){t=e.getLayer()}else{t=e.layer}return t};b.prototype._getAllCtrlVariantChanges=function(e,t,n){if(!t){return v.getInitialChanges({reference:this._mComponent.name})}return["variants","variantChanges","variantDependentControlChanges","variantManagementChanges"].reduce(function(t,n){if(e.changes[n]){return t.concat(e.changes[n])}return t},[]).filter(n)};b.prototype.loadChangesMapForComponent=function(t){return this.getChangesForComponent({component:t}).then(n.bind(this));function n(n){u.start("fl.createDependencyMap","Measurement of creating initial dependency map");this._mChanges=e.createEmptyDependencyMap();n.forEach(this.addChangeAndUpdateDependencies.bind(this,t));this._mChangesInitial=C({},this._mChanges);u.end("fl.createDependencyMap","Measurement of creating initial dependency map");this._bChangesMapCreated=true;return this.getChangesMapForComponent.bind(this)}};b.prototype.checkForOpenDependenciesForControl=function(t,n){return e.checkForOpenDependenciesForControl(this._mChanges,c.getControlIdBySelector(t,n),n)};function M(e){var t=C({},this._mChangesInitial.mDependencies);return t[e.getId()]}function E(e,t,n,r){var a;var i=[];e.controlsDependencies.forEach(function(e){if(!c.bySelector(e,n)){a=c.getControlIdBySelector(e,n);i.push(e);this._mChanges.mControlsWithDependencies[a]=this._mChanges.mControlsWithDependencies[a]||[];if(!d(this._mChanges.mControlsWithDependencies[a],r.getId())){this._mChanges.mControlsWithDependencies[a].push(r.getId())}}}.bind(this));e.dependencies=t;e.controlsDependencies=i;if(t.length||i.length){this._mChanges.mDependencies[r.getId()]=e}}b.prototype.copyDependenciesFromInitialChangesMapSync=function(e,t,n){var r=M.call(this,e);if(r){var a=[];r.dependencies.forEach(function(n){if(t(n)){this._mChanges.mDependentChangesOnMe[n]=this._mChanges.mDependentChangesOnMe[n]||[];this._mChanges.mDependentChangesOnMe[n].push(e.getId());a.push(n)}}.bind(this));E.call(this,r,a,n,e)}return this._mChanges};b.prototype.copyDependenciesFromInitialChangesMap=function(e,t,n){var r=M.call(this,e);if(r){var a=[];return r.dependencies.reduce(function(n,r){return n.then(function(){return t(r)}).then(function(t){if(t){this._mChanges.mDependentChangesOnMe[r]=this._mChanges.mDependentChangesOnMe[r]||[];this._mChanges.mDependentChangesOnMe[r].push(e.getId());a.push(r)}}.bind(this))}.bind(this),Promise.resolve()).then(function(){E.call(this,r,a,n,e);return this._mChanges}.bind(this))}return Promise.resolve(this._mChanges)};b.prototype.addChangeAndUpdateDependencies=function(t,n,r){n.setInitialApplyState();if(r){e.insertChange(n,this._mChanges,r)}e.addChangeAndUpdateDependencies(n,t,this._mChanges)};b.prototype._addRunTimeCreatedChangeAndUpdateDependencies=function(t,n){e.addRuntimeChangeAndUpdateDependencies(n,t,this._mChanges,this._mChangesInitial)};b.prototype.getChangesMapForComponent=function(){return this._mChanges};b.prototype.getAllUIChanges=function(e){var t=m(this.getChangesMapForComponent().aChanges,e.includeDirtyChanges&&this.getDirtyChanges()).filter(function(t){return Boolean(t)&&t.getFileType()==="change"&&s.compareAgainstCurrentLayer(t.getLayer(),e.layer)===0});return t};b.prototype.isChangeMapCreated=function(){return this._bChangesMapCreated};b.prototype.changesHavingCorrectViewPrefix=function(e,t){var n=e.modifier;var r=e.appComponent;var a=t.getSelector();if(!a||!e){return false}if(a.viewSelector){var i=n.getControlIdBySelector(a.viewSelector,r);return i===e.viewId}var s=a.id;if(s){var o;if(t.getSelector().idIsLocal){if(r){o=r.getLocalId(e.viewId)}}else{o=e.viewId}var h=0;var g;do{h=s.indexOf("--",h);g=s.slice(0,h);h++}while(g!==o&&h>0);return g===o}return false};b.prototype.getChangesForView=function(e){return this.getChangesForComponent(e).then(function(t){return t.filter(this.changesHavingCorrectViewPrefix.bind(this,e))}.bind(this))};b.prototype.addChange=function(e,t){var n=this.addDirtyChange(e);this._addRunTimeCreatedChangeAndUpdateDependencies(t,n);this._mChangesEntries[n.getFileName()]=n;this._addPropagationListener(t);return n};b.prototype.addDirtyChange=function(e){var t;if(e instanceof n||e instanceof a){t=e}else{t=new n(e)}if(this._aDirtyChanges.indexOf(t)===-1){this._aDirtyChanges.push(t)}return t};b.prototype._addPropagationListener=function(e){var t=i.getAppComponentForControl(e);if(t instanceof l){var n=function(e){return!e._bIsSapUiFlFlexControllerApplyChangesOnControl};var r=t.getPropagationListeners().every(n);if(r){var a=sap.ui.require("sap/ui/fl/FlexControllerFactory");var s=a.create(this.getComponentName());var o=g.applyAllChangesForControl.bind(g,this.getChangesMapForComponent.bind(this),t,s);o._bIsSapUiFlFlexControllerApplyChangesOnControl=true;t.addPropagationListener(o)}}};b.prototype._deleteNotSavedChanges=function(e,t,n){e.filter(function(e){return!t.some(function(t){return e.getId()===t.getId()})}).forEach(function(e){if(n){this.removeChange(e);o.deleteChange(this._mComponent,e.getDefinition())}else{this.deleteChange(e)}}.bind(this))};function L(e,t){var n=e.map(function(e){return e[t]()});var r=n.filter(function(e,t,n){return n.indexOf(e)===t});return r.length===1}function F(e,t){var n=false;if(!e||t.length<2){return false}if(!L(t,"getLayer")){return false}var r=t[0].getLayer();if(r==="CUSTOMER"||r==="USER"){n=true}var a=y.fromURL(window.location.href);if(a.has("sap-ui-xx-condense-changes")){n=a.get("sap-ui-xx-condense-changes")==="true"}return n}function x(e){var t=h.getInstanceOrUndef()&&h.getInstanceOrUndef().isCondensingEnabled();if(t&&!L(e,"getNamespace")){t=false}return t}function O(e,t,n,r){this._massUpdateCacheAndDirtyState(t,n);this._deleteNotSavedChanges(e,t,r)}function A(e){if(!e.length){return[]}var t=e[0].getLayer();var r=this._mChanges.aChanges.filter(function(e){return e.getState()===n.states.PERSISTED&&s.compareAgainstCurrentLayer(e.getLayer(),t)===0});return r.concat(e)}b.prototype.saveDirtyChanges=function(e,t,r,a){var i=r||this._aDirtyChanges;var s=A.call(this,i);var o=x(s)&&F(e,s);var h=o?s:i;var g=h.slice(0);var c=i.slice(0);var l=this._getRequests(i);var f=this._getStates(i);if(f.length===1&&l.length===1&&f[0]===n.states.NEW){var u=Promise.resolve(g);if(F(e,g)){u=S.condense(e,g)}return u.then(function(e){var n=l[0];var r=i[0].getDefinition().layer;if(o){return p.condense({allChanges:h,condensedChanges:e,layer:r,transport:n,isLegacyVariant:false,parentVersion:a}).then(function(n){O.call(this,h,e,t,true);return n}.bind(this))}if(e.length){return p.write({layer:r,flexObjects:this._prepareDirtyChanges(e),transport:n,isLegacyVariant:false,parentVersion:a}).then(function(n){O.call(this,h,e,t);return n}.bind(this))}this._deleteNotSavedChanges(h,e)}.bind(this))}return this.saveSequenceOfDirtyChanges(c,t,a)};b.prototype.saveSequenceOfDirtyChanges=function(e,t,r){var a;if(r){var i=e.filter(function(e){return e.getState()===n.states.NEW});a=[].concat(i).shift()}return e.reduce(function(e,n){return e.then(this._performSingleSaveAction(n,a,r)).then(this._updateCacheAndDirtyState.bind(this,n,t))}.bind(this),Promise.resolve())};b.prototype._performSingleSaveAction=function(e,t,r){return function(){switch(e.getState()){case n.states.NEW:if(r!==undefined){r=e===t?r:sap.ui.fl.Versions.Draft}return p.write({layer:e.getLayer(),flexObjects:[e.getDefinition()],transport:e.getRequest(),parentVersion:r});case n.states.DELETED:return p.remove({flexObject:e.getDefinition(),layer:e.getLayer(),transport:e.getRequest()})}}};b.prototype._updateCacheAndDirtyState=function(e,t){if(!t){if(i.isChangeRelatedToVariants(e)){v.updateVariantsState({reference:this._mComponent.name,changeToBeAddedOrDeleted:e})}else{switch(e.getState()){case n.states.NEW:e.setState(n.states.PERSISTED);o.addChange(this._mComponent,e.getDefinition());break;case n.states.DELETED:o.deleteChange(this._mComponent,e.getDefinition());break;case n.states.DIRTY:e.setState(n.states.PERSISTED);o.updateChange(this._mComponent,e.getDefinition());break}}}this._aDirtyChanges=this._aDirtyChanges.filter(function(t){return e.getId()!==t.getId()})};b.prototype._massUpdateCacheAndDirtyState=function(e,t){e.forEach(function(e){this._updateCacheAndDirtyState(e,t)},this)};b.prototype._getRequests=function(e){var t=[];e.forEach(function(e){var n=e.getRequest();if(t.indexOf(n)===-1){t.push(n)}});return t};b.prototype._getStates=function(e){var t=[];e.forEach(function(e){var n=e.getState();if(t.indexOf(n)===-1){t.push(n)}});return t};b.prototype._prepareDirtyChanges=function(e){var t=[];e.forEach(function(e){t.push(e.getDefinition())});return t};b.prototype.getDirtyChanges=function(){return this._aDirtyChanges};b.prototype.deleteChange=function(e,t){var r=this._aDirtyChanges.indexOf(e);if(r>-1){if(e.getState()===n.states.DELETED){return}this._aDirtyChanges.splice(r,1);this._deleteChangeInMap(e,t);return}e.markForDeletion();this.addDirtyChange(e);this._deleteChangeInMap(e,t)};b.prototype.removeChange=function(e){var t=this._aDirtyChanges.indexOf(e);if(t>-1){this._aDirtyChanges.splice(t,1)}this._deleteChangeInMap(e)};b.prototype._deleteChangeInMap=function(t,n){var r=t.getId();e.removeChangeFromMap(this._mChanges,r);e.removeChangeFromDependencies(n?this._mChangesInitial:this._mChanges,r)};function R(e,t){return(t.getRequest()==="$TMP"||t.getRequest()==="")&&t.getLayer()===e}b.prototype.transportAllUIChanges=function(e,t,n,r){return Promise.all([this.getChangesForComponent({currentLayer:n,includeCtrlVariants:true}),D.getCompVariantsMap(this.getComponentName())]).then(function(a){var i=a[0];var s=a[1];var o=[];for(var h in s){for(var g in s[h].byId){o.push(s[h].byId[g])}}i=i.concat(o.filter(R.bind(this,n)));return p.publish({transportDialogSettings:{rootControl:e,styleClass:t},layer:n,reference:this.getComponentName(),localChanges:i,appVariantDescriptors:r})}.bind(this))};b.prototype._getChangesFromMapByNames=function(e){return this._mChanges.aChanges.filter(function(t){return e.indexOf(t.getFileName())!==-1})};b.prototype.removeDirtyChanges=function(e,t,n,r,a){if(!n){_.error("The selectorId must be provided");return Promise.reject("The selectorId must be provided")}var i=this._aDirtyChanges;var s=i.filter(function(i){var s=true;if(i.getLayer()!==e){return false}if(r&&i.getDefinition().support.generator!==r){return false}var o=i.getSelector();s=n.getId()===c.getControlIdBySelector(o,t);if(a){s=s&&a.indexOf(i.getChangeType())!==-1}return s});s.forEach(function(e){var t=i.indexOf(e);i.splice(t,1)});return Promise.resolve(s)};b.prototype.resetChanges=function(e,t,n,r){var a=n&&n.length>0;var i=r&&r.length>0;return this.getChangesForComponent({currentLayer:e,includeCtrlVariants:true}).then(function(s){var o={reference:this.getComponentName(),layer:e,changes:s};if(t){o.generator=t}if(a){o.selectorIds=n}if(i){o.changeTypes=r}return p.reset(o)}.bind(this)).then(function(e){var t=[];if(n||r){var a=[];if(e&&e.response&&e.response.length>0){e.response.forEach(function(e){a.push(e.fileName)})}o.removeChanges(this._mComponent,a);t=this._getChangesFromMapByNames(a)}return t}.bind(this))};b.prototype.getResetAndPublishInfo=function(e){return p.getFlexInfo(e)};return b});