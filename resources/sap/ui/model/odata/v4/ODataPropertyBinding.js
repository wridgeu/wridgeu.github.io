/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataBinding","./lib/_Cache","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ChangeReason","sap/ui/model/odata/v4/Context","sap/ui/model/PropertyBinding"],function(e,t,n,i,o,r,s,a,h){"use strict";var u="sap.ui.model.odata.v4.ODataPropertyBinding",d=Object.freeze([]),p={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true},l="/"+a.VIRTUAL,c=h.extend("sap.ui.model.odata.v4.ODataPropertyBinding",{constructor:f});function f(t,i,o,r){h.call(this,t,i);e.call(this);if(i.endsWith("/")){throw new Error("Invalid path: "+i)}if(r){this.checkBindingParameters(r,["$$groupId","$$ignoreMessages","$$noPatch"]);this.sGroupId=r.$$groupId;this.bNoPatch=r.$$noPatch;this.setIgnoreMessages(r.$$ignoreMessages)}else{this.sGroupId=undefined;this.bNoPatch=false}this.oCheckUpdateCallToken=undefined;this.oContext=o;this.bHasDeclaredType=undefined;this.bInitial=true;this.mQueryOptions=this.oModel.buildQueryOptions(n.clone(r),i.endsWith("$count"));this.vValue=undefined;this.fetchCache(o);t.bindingCreated(this)}e(c.prototype);c.prototype.attachEvent=function(e,t,n,i){if(!(e in p)){throw new Error("Unsupported event '"+e+"': v4.ODataPropertyBinding#attachEvent")}return h.prototype.attachEvent.apply(this,arguments)};c.prototype.checkUpdateInternal=function(e,t,a,h){var d=false,p=this.sPath.indexOf("##"),c=p>=0,f=this.oModel.getMetaModel(),g={data:{}},y=this.getResolvedPath(),C={forceUpdate:y&&(e||e===undefined&&this.getDataState().getControlMessages().length>0||this.oCheckUpdateCallToken&&this.oCheckUpdateCallToken.forceUpdate)},v=this.oType,R=this;this.oCheckUpdateCallToken=C;if(this.bHasDeclaredType===undefined){this.bHasDeclaredType=!!v}if(y&&!this.bHasDeclaredType&&this.sInternalType!=="any"&&!c){v=f.fetchUI5Type(y)}if(h===undefined){h=this.oCachePromise.then(function(e){var t,n;if(e){return e.fetchValue(R.lockGroup(a||R.getGroupId()),undefined,function(){d=true;R.fireDataRequested()},R).then(function(t){R.assertSameCache(e);return t})}if(!R.sReducedPath||!R.isResolved()){return undefined}if(y.includes(l)){C.forceUpdate=false}if(!c){return R.oContext.fetchValue(R.sReducedPath,R)}t=R.sPath.slice(0,p);n=R.sPath.slice(p+2);if(n[0]==="/"){n="."+n}return f.fetchObject(n,f.getMetaContext(R.oModel.resolve(t,R.oContext)))}).then(function(e){if(!e||typeof e!=="object"){return e}if(R.sInternalType==="any"&&(R.getBindingMode()===r.OneTime||R.sPath[R.sPath.lastIndexOf("/")+1]==="#"&&!c)){if(c){return e}else if(R.bRelative){return n.publicClone(e)}}i.error("Accessed value is not primitive",y,u)},function(e){R.oModel.reportError("Failed to read path "+y,u,e);if(e.canceled){C.forceUpdate=false;return R.vValue}g={error:e}});if(e&&h.isFulfilled()){if(v&&v.isFulfilled&&v.isFulfilled()){this.setType(v.getResult(),this.sInternalType)}this.vValue=h.getResult()}h=Promise.resolve(h)}return o.all([h,v]).then(function(e){var n=e[1],i=e[0];if(C===R.oCheckUpdateCallToken){R.oCheckUpdateCallToken=undefined;R.setType(n,R.sInternalType);if(C.forceUpdate||R.vValue!==i){R.bInitial=false;R.vValue=i;R._fireChange({reason:t||s.Change})}R.checkDataState()}if(d){R.fireDataReceived(g)}if(g.error){throw g.error}})};c.prototype.deregisterChange=function(){var e=this;this.withCache(function(t,n,i){i.doDeregisterChangeListener(n,e)}).catch(function(t){e.oModel.reportError("Error in deregisterChange",u,t)},"",false,true)};c.prototype.destroy=function(){this.deregisterChange();this.oModel.bindingDestroyed(this);this.oCheckUpdateCallToken=undefined;this.mQueryOptions=undefined;this.vValue=undefined;e.prototype.destroy.call(this);h.prototype.destroy.apply(this,arguments)};c.prototype.doCreateCache=function(e,n){return t.createProperty(this.oModel.oRequestor,e,n)};c.prototype.doFetchQueryOptions=function(){return this.isRoot()?o.resolve(this.mQueryOptions):o.resolve({})};c.prototype.getDependentBindings=function(){return d};c.prototype.getResumePromise=function(){};c.prototype.getValue=function(){return this.vValue};c.prototype.getValueListType=function(){var e=this.getResolvedPath();if(!e){throw new Error(this+" is unresolved")}return this.getModel().getMetaModel().getValueListType(e)};c.prototype.hasPendingChangesInDependents=function(){return false};c.prototype.initialize=function(){if(this.isResolved()){if(this.getRootBinding().isSuspended()){this.sResumeChangeReason=s.Change}else{this.checkUpdate(true)}}};c.prototype.isMeta=function(){return this.sPath.includes("##")};c.prototype.onChange=function(e){this.checkUpdateInternal(undefined,undefined,undefined,e).catch(this.oModel.getReporter())};c.prototype.refreshInternal=function(e,t,n,i){var r=this;if(this.isRootBindingSuspended()){this.refreshSuspended(t);return o.resolve()}return this.oCachePromise.then(function(){r.fetchCache(r.oContext,false,true,i);if(n){return r.checkUpdateInternal(undefined,s.Refresh,t)}})};c.prototype.requestValue=function(){var e=this;return Promise.resolve(this.checkUpdateInternal(false).then(function(){return e.getValue()}))};c.prototype.requestValueListInfo=function(e){var t=this.getResolvedPath();if(!t){throw new Error(this+" is unresolved")}return this.getModel().getMetaModel().requestValueListInfo(t,e,this.oContext)};c.prototype.requestValueListType=function(){var e=this.getResolvedPath();if(!e){throw new Error(this+" is unresolved")}return this.getModel().getMetaModel().requestValueListType(e)};c.prototype.resetChangesInDependents=function(){};c.prototype.resetInvalidDataState=function(){if(this.getDataState().isControlDirty()){this._fireChange({reason:s.Change})}};c.prototype.resume=function(){throw new Error("Unsupported operation: resume")};c.prototype.resumeInternal=function(e,t){var n=this.sResumeChangeReason;this.sResumeChangeReason=undefined;this.fetchCache(this.oContext);if(e){this.checkUpdateInternal(t?undefined:false,n).catch(this.oModel.getReporter())}};c.prototype.setContext=function(e){if(this.oContext!==e){if(this.bRelative){this.checkSuspended(true);this.deregisterChange()}this.oContext=e;this.sResumeChangeReason=undefined;if(this.bRelative){this.fetchCache(this.oContext);this.checkUpdateInternal(this.bInitial||undefined,s.Context).catch(this.oModel.getReporter())}}};c.prototype.setType=function(e,t){var n=this.oType;if(e&&e.getName()==="sap.ui.model.odata.type.DateTimeOffset"){e.setV4()}h.prototype.setType.apply(this,arguments);if(!this.bInitial&&n!==e){this._fireChange({reason:s.Change})}};c.prototype.setValue=function(e,t){var n,i=this;function o(e){i.oModel.reportError("Failed to update path "+i.getResolvedPath(),u,e);return e}this.checkSuspended();if(this.bNoPatch&&t){throw o(new Error("Must not specify a group ID ("+t+") with $$noPatch"))}this.oModel.checkGroupId(t);if(typeof e==="function"||e&&typeof e==="object"){throw o(new Error("Not a primitive value"))}if(!this.bNoPatch&&this.vValue===undefined){throw o(new Error("Must not change a property before it has been read"))}if(this.vValue!==e){if(this.oCache){o(new Error("Cannot set value on this binding as it is not relative"+" to a sap.ui.model.odata.v4.Context"));return}n=this.bNoPatch?null:this.lockGroup(t,true,true);this.oContext.doSetProperty(this.sPath,e,n).catch(function(e){if(n){n.unlock(true)}o(e)})}};c.prototype.supportsIgnoreMessages=function(){return true};c.prototype.suspend=function(){throw new Error("Unsupported operation: suspend")};c.prototype.visitSideEffects=function(){};return c});