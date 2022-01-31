/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataBinding","./SubmitMode","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/ChangeReason"],function(e,t,n,r,i,o,s){"use strict";function a(){t.call(this);this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.aChildCanUseCachePromises=[];this.bHasPathReductionToParent=false;this.iPatchCounter=0;this.bPatchSuccess=true;this.oReadGroupLock=undefined;this.oRefreshPromise=null;this.oResumePromise=undefined}t(a.prototype);var h="sap.ui.model.odata.v4.ODataParentBinding";a.prototype.attachPatchCompleted=function(e,t){this.attachEvent("patchCompleted",e,t)};a.prototype.detachPatchCompleted=function(e,t){this.detachEvent("patchCompleted",e,t)};a.prototype.doSuspend=function(){};a.prototype.firePatchCompleted=function(e){if(this.iPatchCounter===0){throw new Error("Completed more PATCH requests than sent")}this.iPatchCounter-=1;this.bPatchSuccess=this.bPatchSuccess&&e;if(this.iPatchCounter===0){this.fireEvent("patchCompleted",{success:this.bPatchSuccess});this.bPatchSuccess=true}};a.prototype.attachPatchSent=function(e,t){this.attachEvent("patchSent",e,t)};a.prototype.detachPatchSent=function(e,t){this.detachEvent("patchSent",e,t)};a.prototype.firePatchSent=function(){this.iPatchCounter+=1;if(this.iPatchCounter===1){this.fireEvent("patchSent")}};a.prototype._findEmptyPathParentContext=function(e){if(this.sPath===""&&this.oContext.getBinding){return this.oContext.getBinding()._findEmptyPathParentContext(this.oContext)}return e};a.prototype.aggregateQueryOptions=function(e,t,n){var i=r.merge({},n&&this.mLateQueryOptions||this.mAggregatedQueryOptions),o=false,s=this;function a(e,t,r,i,h){function u(i){var h=!e.$expand[i],u=r+"/"+i;if(h){e.$expand[i]={};if(n&&s.oModel.getMetaModel().fetchObject(u).getResult().$isCollection){return false}o=true}return a(e.$expand[i],t.$expand[i],u,true,h)}function c(t){if(e.$select.indexOf(t)<0){o=true;e.$select.push(t)}return true}return(!i||Object.keys(e).every(function(e){return e in t||e==="$count"||e==="$expand"||e==="$select"}))&&Object.keys(t).every(function(n){switch(n){case"$count":if(t.$count){e.$count=true}return true;case"$expand":e.$expand=e.$expand||{};return Object.keys(t.$expand).every(u);case"$select":e.$select=e.$select||[];return t.$select.every(c);default:if(h){e[n]=t[n];return true}return t[n]===e[n]}})}if(a(i,e,t)){if(!n){this.mAggregatedQueryOptions=i}else if(o){this.mLateQueryOptions=i}return true}return false};a.prototype.changeParameters=function(e){var t=Object.assign({},this.mParameters),n,i,o=this;function a(r){if(o.oModel.bAutoExpandSelect&&(r==="$expand"||r==="$select")){throw new Error("Cannot change "+r+" parameter in auto-$expand/$select mode: "+JSON.stringify(e[r])+" !== "+JSON.stringify(t[r]))}if(r==="$filter"||r==="$search"){n=s.Filter}else if(r==="$orderby"&&n!==s.Filter){n=s.Sort}else if(!n){n=s.Change}}if(!e){throw new Error("Missing map of binding parameters")}for(i in e){if(i.startsWith("$$")){if(e[i]===t[i]){continue}throw new Error("Unsupported parameter: "+i)}if(e[i]===undefined&&t[i]!==undefined){a(i);delete t[i]}else if(t[i]!==e[i]){a(i);if(typeof e[i]==="object"){t[i]=r.clone(e[i])}else{t[i]=e[i]}}}if(n){if(this.hasPendingChanges(true)){throw new Error("Cannot change parameters due to pending changes")}this.applyParameters(t,n)}};a.prototype.checkUpdateInternal=function(e){var t=this;function n(){return o.all(t.getDependentBindings().map(function(e){return e.checkUpdateInternal()}))}if(e!==undefined){throw new Error("Unsupported operation: "+h+"#checkUpdateInternal must not"+" be called with parameters")}return this.oCachePromise.then(function(e){if(e&&t.bRelative){return t.fetchResourcePath(t.oContext).then(function(r){if(e.getResourcePath()===r){return n()}return t.refreshInternal("")})}return n()})};a.prototype.createInCache=function(e,t,n,i,o,s,a){var h=this;return this.oCachePromise.then(function(u){var c;if(u){c=r.getRelativePath(n,h.getResolvedPath());return u.create(e,t,c,i,o,s,a).then(function(e){if(h.mCacheByResourcePath){delete h.mCacheByResourcePath[u.getResourcePath()]}return e})}return h.oContext.getBinding().createInCache(e,t,n,i,o,s,a)})};a.prototype.createReadGroupLock=function(e,t,n){var r,o=this;function s(){o.oModel.addPrerenderingTask(function(){n-=1;if(n>0){Promise.resolve().then(s)}else if(o.oReadGroupLock===r){i.debug("Timeout: unlocked "+r,null,h);o.removeReadGroupLock()}})}this.removeReadGroupLock();this.oReadGroupLock=r=this.lockGroup(e,t);if(t){n=2+(n||0);s()}};a.prototype.createRefreshPromise=function(){var e,t;e=new Promise(function(e){t=e});e.$resolve=t;this.oRefreshPromise=e;return e};a.prototype.deleteFromCache=function(e,t,n,i,o,s){var a;if(this.oCache===undefined){throw new Error("DELETE request not allowed")}if(this.oCache){a=e.getGroupId();if(!this.oModel.isAutoGroup(a)&&!this.oModel.isDirectGroup(a)){throw new Error("Illegal update group ID: "+a)}return this.oCache._delete(e,t,n,i,o,s)}return this.oContext.getBinding().deleteFromCache(e,t,r.buildPath(this.oContext.iIndex,this.sPath,n),i,o,s)};a.prototype.destroy=function(){this.aChildCanUseCachePromises=[];this.removeReadGroupLock();this.oResumePromise=undefined;t.prototype.destroy.call(this)};a.prototype.fetchIfChildCanUseCache=function(t,n,s){var a=this.getBaseForPathReduction(),u=r.getMetaPath(t.getPath()),c,d,p=t.getPath().includes("(...)"),f=t.getIndex(),g=n[0]==="#",l=this.oModel.getMetaModel(),P,m=this.oModel.resolve(n,t),y=this;function C(){if(g){return l.fetchObject(u+"/")}return r.fetchPropertyAndType(y.oModel.oInterface.fetchMetadata,R(m))}function R(e){var t;e=r.getMetaPath(e);t=e.indexOf("@");return t>0?e.slice(0,t):e}if(p&&!m.includes("/$Parameter/")||this.getRootBinding().isSuspended()||this.mParameters&&this.mParameters.$$aggregation){return o.resolve(m)}c=this.oCachePromise.isRejected()||f!==undefined&&f!==e.VIRTUAL||t.isKeepAlive()||this.oCache===null||this.oCache&&this.oCache.hasSentRequest();P=[this.doFetchQueryOptions(this.oContext),C(),s];d=o.all(P).then(function(e){var t=e[2],n,o=e[0],d=e[1],f,P;if(Array.isArray(d)){return undefined}P=l.getReducedPath(m,a);f=r.getRelativePath(R(P),u);if(f===undefined){y.bHasPathReductionToParent=true;return y.oContext.getBinding().fetchIfChildCanUseCache(y.oContext,r.getRelativePath(m,y.oContext.getPath()),s)}if(p||f==="$count"||f.endsWith("/$count")){return P}if(y.bAggregatedQueryOptionsInitial){y.selectKeyProperties(o,u);y.mAggregatedQueryOptions=r.clone(o);y.bAggregatedQueryOptionsInitial=false}if(g){n={$select:[f.slice(1)]};return y.aggregateQueryOptions(n,u,c)?P:undefined}if(f===""||d&&(d.$kind==="Property"||d.$kind==="NavigationProperty")){n=r.wrapChildQueryOptions(u,f,t,y.oModel.oInterface.fetchMetadata);if(n){return y.aggregateQueryOptions(n,u,c)?P:undefined}return undefined}if(f==="value"){return y.aggregateQueryOptions(t,u,c)?P:undefined}i.error("Failed to enhance query options for auto-$expand/$select as the path '"+m+"' does not point to a property",JSON.stringify(d),h);return undefined}).then(function(e){if(y.mLateQueryOptions){if(y.oCache){y.oCache.setLateQueryOptions(y.mLateQueryOptions)}else if(y.oCache===null){return y.oContext.getBinding().fetchIfChildCanUseCache(y.oContext,y.sPath,o.resolve(y.mLateQueryOptions)).then(function(t){return t&&e})}}return e});this.aChildCanUseCachePromises.push(d);this.oCachePromise=o.all([this.oCachePromise,d]).then(function(e){var n=e[0];if(n&&!n.hasSentRequest()&&!y.oOperation){if(y.bSharedRequest){n.setActive(false);n=y.createAndSetCache(y.mAggregatedQueryOptions,n.getResourcePath(),t)}else{n.setQueryOptions(r.merge({},y.oModel.mUriParameters,y.mAggregatedQueryOptions))}}return n});this.oCachePromise.catch(function(e){y.oModel.reportError(y+": Failed to enhance query options for "+"auto-$expand/$select for child "+n,h,e)});return d};a.prototype.fetchResolvedQueryOptions=function(e){var t,n,i,s=this.oModel,a=this.getQueryOptionsFromParameters();if(!(s.bAutoExpandSelect&&a.$select)){return o.resolve(a)}t=s.oInterface.fetchMetadata;i=r.getMetaPath(s.resolve(this.sPath,e));n=Object.assign({},a,{$select:[]});return o.all(a.$select.map(function(e){return r.fetchPropertyAndType(t,i+"/"+e).then(function(){var o=r.wrapChildQueryOptions(i,e,{},t);if(o){r.aggregateExpandSelect(n,o)}else{r.addToSelect(n,[e])}})})).then(function(){return n})};a.prototype.getBaseForPathReduction=function(){var e,t;if(!this.isRoot()){e=this.oContext.getBinding();t=e.getUpdateGroupId();if(t===this.getUpdateGroupId()||this.oModel.getGroupProperty(t,"submit")!==n.API){return e.getBaseForPathReduction()}}return this.getResolvedPath()};a.prototype.getInheritableQueryOptions=function(){if(this.mLateQueryOptions){return r.merge({},this.mCacheQueryOptions,this.mLateQueryOptions)}return this.mCacheQueryOptions||r.getQueryOptionsForPath(this.oContext.getBinding().getInheritableQueryOptions(),this.sPath)};a.prototype.getGeneration=function(){return this.bRelative&&this.oContext.getGeneration&&this.oContext.getGeneration()||0};a.prototype.getQueryOptionsForPath=function(e,t){if(Object.keys(this.mParameters).length){return r.getQueryOptionsForPath(this.getQueryOptionsFromParameters(),e)}t=t||this.oContext;if(!this.bRelative||!t.getQueryOptionsForPath){return{}}return t.getQueryOptionsForPath(r.buildPath(this.sPath,e))};a.prototype.getResumePromise=function(){return this.oResumePromise};a.prototype.hasPendingChangesInDependents=function(e){return this.getDependentBindings().some(function(t){var n=t.oCache,r;if(e&&t.oContext.isKeepAlive()){return false}if(n!==undefined){if(n&&n.hasPendingChangesForPath("")){return true}}else if(t.hasPendingChangesForPath("")){return true}if(t.mCacheByResourcePath){r=Object.keys(t.mCacheByResourcePath).some(function(e){var r=t.mCacheByResourcePath[e];return r!==n&&r.hasPendingChangesForPath("")});if(r){return true}}return t.hasPendingChangesInDependents()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.getResolvedPath().slice(1))};a.prototype.isPatchWithoutSideEffects=function(){return this.mParameters.$$patchWithoutSideEffects||!this.isRoot()&&this.oContext&&this.oContext.getBinding().isPatchWithoutSideEffects()};a.prototype.isMeta=function(){return false};a.prototype.refreshDependentBindings=function(e,t,n,r){return o.all(this.getDependentBindings().map(function(i){return i.refreshInternal(e,t,n,r)}))};a.prototype.refreshDependentListBindingsWithoutCache=function(){return o.all(this.getDependentBindings().map(function(e){if(e.filter&&e.oCache===null){return e.refreshInternal("")}if(e.refreshDependentListBindingsWithoutCache){return e.refreshDependentListBindingsWithoutCache()}}))};a.prototype.removeReadGroupLock=function(){if(this.oReadGroupLock){this.oReadGroupLock.unlock(true);this.oReadGroupLock=undefined}};a.prototype.refreshSuspended=function(e){if(e&&e!==this.getGroupId()){throw new Error(this+": Cannot refresh a suspended binding with group ID '"+e+"' (own group ID is '"+this.getGroupId()+"')")}this.setResumeChangeReason(s.Refresh)};a.prototype.resetChangesInDependents=function(e){this.getDependentBindings().forEach(function(t){e.push(t.oCachePromise.then(function(e){if(e){e.resetChangesForPath("")}t.resetInvalidDataState()}).unwrap());if(t.mCacheByResourcePath){Object.keys(t.mCacheByResourcePath).forEach(function(e){t.mCacheByResourcePath[e].resetChangesForPath("")})}t.resetChangesInDependents(e)})};a.prototype.resolveRefreshPromise=function(e){if(this.oRefreshPromise){this.oRefreshPromise.$resolve(e.catch(function(e){if(!e.canceled){throw e}}));this.oRefreshPromise=null}return e};a.prototype._resume=function(e){var t=this;function n(){t.bSuspended=false;if(t.oResumePromise){t.resumeInternal(true);t.oResumePromise.$resolve();t.oResumePromise=undefined}}if(this.oOperation){throw new Error("Cannot resume an operation binding: "+this)}if(!this.isRoot()){throw new Error("Cannot resume a relative binding: "+this)}if(!this.bSuspended){throw new Error("Cannot resume a not suspended binding: "+this)}if(e){this.createReadGroupLock(this.getGroupId(),true,1);this.oModel.addPrerenderingTask(n)}else{this.createReadGroupLock(this.getGroupId(),true);n()}};a.prototype.resume=function(){this._resume(false)};a.prototype.resumeAsync=function(){this._resume(true);return Promise.resolve(this.oResumePromise)};a.prototype.selectKeyProperties=function(e,t){r.selectKeyProperties(e,this.oModel.getMetaModel().getObject(t+"/"))};a.prototype.suspend=function(){var e;if(this.oOperation){throw new Error("Cannot suspend an operation binding: "+this)}if(!this.isRoot()){throw new Error("Cannot suspend a relative binding: "+this)}if(this.bSuspended){throw new Error("Cannot suspend a suspended binding: "+this)}if(this.hasPendingChanges(true)){throw new Error("Cannot suspend a binding with pending changes: "+this)}this.bSuspended=true;this.oResumePromise=new o(function(t){e=t});this.oResumePromise.$resolve=e;this.removeReadGroupLock();this.doSuspend()};a.prototype.updateAggregatedQueryOptions=function(e){var t=Object.keys(e),n=this;if(this.mAggregatedQueryOptions){t=t.concat(Object.keys(this.mAggregatedQueryOptions));t.forEach(function(t){if(n.bAggregatedQueryOptionsInitial||t!=="$select"&&t!=="$expand"){if(e[t]===undefined){delete n.mAggregatedQueryOptions[t]}else{n.mAggregatedQueryOptions[t]=e[t]}}})}};a.prototype.visitSideEffects=function(e,t,n,i,o,s){var a=n?this.oModel.getDependentBindings(n):this.getDependentBindings();a.forEach(function(n){var a=r.buildPath(s,r.getMetaPath(n.getPath())),h;if(n.oCache){h=r.stripPathPrefix(a,t);if(h.length){o.push(n.requestSideEffects(e,h))}}else if(i[a]){o.push(n.refreshInternal("",e))}else{n.visitSideEffects(e,t,null,i,o,a)}})};function u(e){if(this){a.apply(this,arguments)}else{Object.assign(e,a.prototype)}}["adjustPredicate","destroy","doDeregisterChangeListener","getGeneration","hasPendingChangesForPath"].forEach(function(e){u.prototype[e]=a.prototype[e]});return u},false);