/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(e,t,n,i){"use strict";var o="sap.ui.model.odata.v4.Context",r=0,s,h=-9007199254740991,a=i.extend("sap.ui.model.odata.v4.Context",{constructor:u});function d(e,t,i,o){var r,s=[e.fetchValue(t,null,o)],h=e.oModel.resolve(t,e);if(i){s.push(e.oModel.getMetaModel().fetchUI5Type(h))}return n.all(s).then(function(e){var t=e[1],n=e[0];if(n&&typeof n==="object"){r=new Error("Accessed value is not primitive: "+h);r.isNotPrimitive=true;throw r}return i?t.formatValue(n,"string"):n})}function u(e,t,n,o,r,s,h){if(n[0]!=="/"){throw new Error("Not an absolute path: "+n)}if(n.endsWith("/")){throw new Error("Unsupported trailing slash: "+n)}i.call(this,e,n);this.oBinding=t;this.oCreatedPromise=r&&Promise.resolve(r).then(function(){});this.oSyncCreatePromise=r;this.bDeleted=false;this.iGeneration=s||0;this.bInactive=h||undefined;this.iIndex=o;this.bKeepAlive=false;this.fnOnBeforeDestroy=undefined}a.prototype._delete=function(e,t,n){var i=this;if(!e){return this.oBinding._delete(null,"n/a",this,null,true)}return this.fetchCanonicalPath().then(function(o){return i.oBinding._delete(e,o.slice(1),i,t,n)})};a.prototype.adjustPredicate=function(e,t,n){var i=this.sPath;this.sPath=i.replace(e,t);if(n){n(i,this.sPath)}this.oModel.getDependentBindings(this).forEach(function(n){n.adjustPredicate(e,t)})};a.prototype.checkUpdate=function(){this.oModel.getDependentBindings(this).forEach(function(e){e.checkUpdate()})};a.prototype.checkUpdateInternal=function(){return n.all(this.oModel.getDependentBindings(this).map(function(e){return e.checkUpdateInternal()}))};a.prototype.collapse=function(){switch(this.getProperty("@$ui5.node.level")===0?undefined:this.isExpanded()){case true:this.oBinding.collapse(this);break;case false:throw new Error("Already collapsed: "+this);default:throw new Error("Not expandable: "+this)}};a.prototype.created=function(){return this.oCreatedPromise};a.prototype.delete=function(e,t){var n=null,i=this.oModel,r=this;if(this.isDeleted()){throw new Error("Must not delete twice: "+this)}this.oBinding.checkSuspended();if(this.isTransient()){e=null}else if(e===null){if(!(this.bKeepAlive&&this.iIndex===undefined)){throw new Error("Cannot delete "+this)}}if(e===null){t=true}else{i.checkGroupId(e);n=this.oBinding.lockGroup(e,true,true)}this.bDeleted=true;return Promise.resolve(this._delete(n,null,t)).then(function(){var e=r.sPath.slice(1);r.bDeleted=false;i.getAllBindings().forEach(function(t){t.removeCachesAndMessages(e,true)})}).catch(function(e){if(n){n.unlock(true)}i.reportError("Failed to delete "+r,o,e);r.bDeleted=false;r.checkUpdate();throw e})};a.prototype.destroy=function(){var e=this.fnOnBeforeDestroy;if(e){this.fnOnBeforeDestroy=undefined;e()}this.oModel.getDependentBindings(this).forEach(function(e){e.setContext(undefined)});this.oBinding=undefined;this.oCreatedPromise=undefined;this.oSyncCreatePromise=undefined;this.bInactive=undefined;this.bKeepAlive=undefined;this.oModel=undefined;i.prototype.destroy.call(this)};a.prototype.doSetProperty=function(t,n,i,r){var s=this.oModel.getMetaModel(),h,a,d=this;if(this.isDeleted()){if(i){i.unlock()}throw new Error("must not modify a deleted entity: "+this)}if(i&&this.isTransient()&&!this.isInactive()){a=this.getValue();h=a&&e.getPrivateAnnotation(a,"transient");if(h instanceof Promise){i.unlock();i=i.getUnlockedCopy();this.doSetProperty(t,n,null,true).catch(this.oModel.getReporter());return h.then(function(e){return e&&d.created()}).then(function(){return d.doSetProperty(t,n,i,r)})}}if(this.oModel.bAutoExpandSelect){t=s.getReducedPath(this.oModel.resolve(t,this),this.oBinding.getBaseForPathReduction())}return this.withCache(function(h,a,u){return u.doSetProperty(a,n,i)||s.fetchUpdateData(t,d,!i).then(function(a){var c=e.getRelativePath(a.entityPath,u.oReturnValueContext?u.oReturnValueContext.getPath():u.getResolvedPath()),l=false;function f(e){d.oModel.reportError("Failed to update path "+d.oModel.resolve(t,d),o,e);p(false)}function p(e){if(l){u.firePatchCompleted(e);l=false}}function g(){l=true;u.firePatchSent()}if(!i){return h.setProperty(a.propertyPath,n,c)}if(d.isInactive()){u.fireCreateActivate(d);d.bInactive=false}return h.update(i,a.propertyPath,n,r?undefined:f,a.editUrl,c,s.getUnitOrCurrencyPath(d.oModel.resolve(t,d)),u.isPatchWithoutSideEffects(),g,d.isKeepAlive.bind(d)).then(function(){p(true)},function(e){p(false);throw e})})},t,false,true)};a.prototype.expand=function(){switch(this.isExpanded()){case false:this.oBinding.expand(this).catch(this.oModel.getReporter());break;case true:throw new Error("Already expanded: "+this);default:throw new Error("Not expandable: "+this)}};a.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};a.prototype.fetchValue=function(e,t,i){var o=this.oBinding;if(this.iIndex===h){return n.resolve()}if(o.getHeaderContext&&o.getHeaderContext()===this){if(e&&e.startsWith(this.sPath)){e=e.slice(this.sPath.length+1)}if(!e){return o.fetchValue(this.sPath,t,i).then(function(e){return{$count:e.$count}})}else if(e!=="$count"){throw new Error("Invalid header path: "+e)}}if(!e||e[0]!=="/"){e=this.oModel.resolve(e,this);if(this.oModel.bAutoExpandSelect){e=this.oModel.getMetaModel().getReducedPath(e,this.oBinding.getBaseForPathReduction())}}return this.oBinding.fetchValue(e,t,i)};a.prototype.getBinding=function(){return this.oBinding};a.prototype.getCanonicalPath=e.createGetMethod("fetchCanonicalPath",true);a.prototype.getGeneration=function(e){if(this.iGeneration||e){return this.iGeneration}return this.oBinding.getGeneration()};a.prototype.getGroupId=function(){return this.oBinding.getGroupId()};a.prototype.getIndex=function(){if(this.iIndex===undefined){return undefined}if(this.oBinding.isFirstCreateAtEnd()){if(this.iIndex<0){return this.oBinding.bLengthFinal?this.oBinding.iMaxLength-this.iIndex-1:-this.iIndex-1}return this.iIndex}return this.getModelIndex()};a.prototype.getModelIndex=function(){if(this.iIndex!==undefined&&this.oBinding.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts}return this.iIndex};a.prototype.getObject=function(t){return e.publicClone(this.getValue(t))};a.prototype.getProperty=function(e,n){var i,r;this.oBinding.checkSuspended();r=d(this,e,n,true);if(r.isRejected()){r.caught();i=r.getResult();if(i.isNotPrimitive){throw i}else if(!i.$cached){t.warning(i.message,e,o)}}return r.isFulfilled()?r.getResult():undefined};a.prototype.getQueryOptionsForPath=function(e){return this.oBinding.getQueryOptionsForPath(e)};a.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};a.prototype.getValue=function(e){var t,n=this;this.oBinding.checkSuspended();t=this.fetchValue(e,null,true).catch(function(e){if(!e.$cached){n.oModel.reportError("Unexpected error",o,e)}});if(t.isFulfilled()){return t.getResult()}};a.prototype.hasPendingChanges=function(){return this.isTransient()||this.isDeleted()||this.oModel.getDependentBindings(this).some(function(e){return e.hasPendingChanges()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1))};a.prototype.isDeleted=function(){return this.bDeleted};a.prototype.isExpanded=function(){return this.getProperty("@$ui5.node.isExpanded")};a.prototype.isInactive=function(){return this.bInactive};a.prototype.isKeepAlive=function(){return this.bKeepAlive};a.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};a.prototype.patch=function(e){return this.withCache(function(t,n){t.patch(n,e)},"")};a.prototype.refresh=function(e,t){this.requestRefresh.apply(this,arguments).catch(this.oModel.getReporter())};a.prototype.refreshDependentBindings=function(e,t,i,o){return n.all(this.oModel.getDependentBindings(this).map(function(n){return n.refreshInternal(e,t,i,o)}))};a.prototype.replaceWith=function(t){var n;this.oBinding.checkSuspended();if(this.isTransient()){throw new Error("Cannot replace "+this)}if(t.oBinding!==this.oBinding||t.iIndex!==undefined){throw new Error("Cannot replace with "+t)}n=t.getValue();this.oBinding.doReplaceWith(this,n,e.getPrivateAnnotation(n,"predicate"))};a.prototype.requestCanonicalPath=e.createRequestMethod("fetchCanonicalPath");a.prototype.requestObject=function(t){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(t)).then(e.publicClone)};a.prototype.requestProperty=function(e,i){var r=Array.isArray(e)?e:[e],s=this;this.oBinding.checkSuspended();return Promise.all(r.map(function(e){return s.oBinding.fetchIfChildCanUseCache(s,e,n.resolve({})).then(function(n){if(n){return d(s,n,i)}t.error("Not a valid property path: "+e,undefined,o)})})).then(function(t){return Array.isArray(e)?t:t[0]})};a.prototype.requestRefresh=function(e,t){var n;this.oModel.checkGroupId(e);this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){n=this.oBinding.refreshSingle(this,this.oBinding.lockGroup(e,true),t)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+t)}n=this.oBinding.refreshReturnValueContext(this,e)||this.oBinding.requestRefresh(e)}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1));return Promise.resolve(n).then(function(){})};a.prototype.requestSideEffects=function(t,i){var o,r=this.oModel.getMetaModel(),s=[],h=[],a,d,u=this;function c(e){if(!e){return false}if(e==="*"){return true}if(e.endsWith("/*")){e=e.slice(0,-2)}return!e.includes("*")}this.oBinding.checkSuspended();this.oModel.checkGroupId(i);if(this.isTransient()){throw new Error("Unsupported context: "+this)}if(!t||!t.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}if(!this.oBinding.isResolved()){throw new Error("Cannot request side effects of unresolved binding's context: "+this)}o=r.getObject("/$EntityContainer");if(!o){throw new Error("Missing metadata")}o="/"+o+"/";t.map(function(e){if(e&&typeof e==="object"){if(c(e.$PropertyPath)){return e.$PropertyPath}if(typeof e.$NavigationPropertyPath==="string"&&!e.$NavigationPropertyPath.includes("*")){return e.$NavigationPropertyPath}}else if(typeof e==="string"&&(!e||c(e))){return e}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(e))}).forEach(function(e){if(e[0]==="/"){if(!e.startsWith(o)){throw new Error("Path must start with '"+o+"': "+e)}h.push(e.slice(o.length-1))}else{s.push(e)}});a=this.oBinding.getRootBinding();d=a.getResolvedPath();s=s.reduce(function(t,n){return t.concat(r.getAllPathReductions(e.buildPath(u.getPath(),n),d))},[]);s=e.filterPaths(h,s);i=i||this.getUpdateGroupId();return Promise.resolve(n.resolve(this.oModel.isAutoGroup(i)&&this.oModel.oRequestor.waitForRunningChangeRequests(i).then(function(){u.oModel.oRequestor.relocateAll("$parked."+i,i)})).then(function(){return n.all([u.oModel.requestSideEffects(i,h),u.requestSideEffectsInternal(s,i)])})).then(function(){})};a.prototype.requestSideEffectsInternal=function(t,i){var o=this,r,s=o,h,a=[],d,u=[],c,l=[];if(!t.length){return undefined}for(;;){r=s.getBinding();c=r.getPath();d=r.getContext();if(r.oCache&&(!h||r.oCache.hasChangeListeners())){h=s}if(h&&c){break}if(!r.getBoundContext){throw new Error("Not a context binding: "+r)}s=d}r=h.getBinding();t.forEach(function(t){var n=e.getRelativePath(t,h.getPath());if(n===undefined){u.push(t)}else{a.push(n)}});if(u.length){l.push(r.getContext().requestSideEffectsInternal(u,i))}if(a.length&&r.oCache!==undefined){l.push(r.requestSideEffects(i,a,h))}return n.all(l)};a.prototype.resetKeepAlive=function(){this.bKeepAlive=false};a.prototype.setNewGeneration=function(){r+=1;this.iGeneration=r};a.prototype.setKeepAlive=function(t,n,i){var o=this;if(this.isTransient()){throw new Error("Unsupported transient context "+this)}this.oModel.getPredicateIndex(this.sPath);this.oBinding.checkKeepAlive(this);if(t&&i){if(!this.oModel.bAutoExpandSelect){throw new Error("Missing parameter autoExpandSelect at model")}this.bKeepAlive=t;this.oModel.getMetaModel().fetchObject(e.getMetaPath(this.sPath)+"/@com.sap.vocabularies.Common.v1.Messages/$Path").then(function(e){if(!e){throw new Error("Missing @com.sap.vocabularies.Common.v1.Messages")}return o.oBinding.fetchIfChildCanUseCache(o,e,{})}).then(function(e){return o.fetchValue(e)}).catch(this.oModel.getReporter())}this.bKeepAlive=t;this.fnOnBeforeDestroy=t?n:undefined};a.prototype.setProperty=function(e,t,n,i){var r=null,s=this.oModel,h=this;this.oBinding.checkSuspended();if(typeof t==="function"||t&&typeof t==="object"){throw new Error("Not a primitive value")}if(n!==null){this.oModel.checkGroupId(n);r=this.oBinding.lockGroup(n,true,true)}return Promise.resolve(this.doSetProperty(e,t,r,!i)).catch(function(t){if(r){r.unlock(true)}s.reportError("Failed to update path "+s.resolve(e,h),o,t);throw t})};a.prototype.toString=function(){var e="";if(this.iIndex!==undefined){e="["+this.iIndex+(this.isTransient()?"|transient":"")+"]"}return this.sPath+e};a.prototype.withCache=function(e,t,i,o){if(this.iIndex===h){return n.resolve()}return this.oBinding.withCache(e,this.oModel.resolve(t,this),i,o)};s={create:function(e,t,n,i,o,r){return new a(e,t,n,i,o,0,r)},createNewContext:function(e,t,n){r+=1;return new a(e,t,n,undefined,undefined,r)}};Object.defineProperty(s,"VIRTUAL",{value:h});return s},false);