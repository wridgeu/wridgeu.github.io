/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataParentBinding","./lib/_AggregationCache","./lib/_AggregationHelper","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","sap/base/Log","sap/base/util/uid","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/FilterOperator","sap/ui/model/FilterProcessor","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/Sorter","sap/ui/model/odata/OperationMode"],function(e,t,i,n,r,o,s,a,h,d,u,f,c,l,p,g,C,x){"use strict";var v="sap.ui.model.odata.v4.ODataListBinding",y={AggregatedDataStateChange:true,change:true,createCompleted:true,createSent:true,dataReceived:true,dataRequested:true,DataStateChange:true,patchCompleted:true,patchSent:true,refresh:true};var m=g.extend("sap.ui.model.odata.v4.ODataListBinding",{constructor:function(i,n,r,o,a,h){g.call(this,i,n);t.call(this);if(n.endsWith("/")){throw new Error("Invalid path: "+n)}h=s.clone(h)||{};this.checkBindingParameters(h,["$$aggregation","$$canonicalPath","$$groupId","$$operationMode","$$ownRequest","$$patchWithoutSideEffects","$$sharedRequest","$$updateGroupId"]);this.aApplicationFilters=s.toArray(a);this.sChangeReason=i.bAutoExpandSelect&&!h.$$aggregation?"AddVirtualContext":undefined;this.oDiff=undefined;this.aFilters=[];this.sGroupId=h.$$groupId;this.bHasAnalyticalInfo=false;this.oHeaderContext=this.bRelative?null:e.create(i,this,n);this.sOperationMode=h.$$operationMode||i.sOperationMode;this.mPreviousContextsByPath={};this.aPreviousData=[];this.bSharedRequest=h.$$sharedRequest||i.bSharedRequests;this.aSorters=s.toArray(o);this.sUpdateGroupId=h.$$updateGroupId;if(!this.sOperationMode&&(this.aSorters.length||this.aApplicationFilters.length)){throw new Error("Unsupported operation mode: "+this.sOperationMode)}this.applyParameters(h);if(!this.bRelative||r&&!r.fetchValue){this.createReadGroupLock(this.getGroupId(),true)}this.setContext(r);i.bindingCreated(this)}});t(m.prototype);m.prototype.attachCreateCompleted=function(e,t){this.attachEvent("createCompleted",e,t)};m.prototype.detachCreateCompleted=function(e,t){this.detachEvent("createCompleted",e,t)};m.prototype.attachCreateSent=function(e,t){this.attachEvent("createSent",e,t)};m.prototype.detachCreateSent=function(e,t){this.detachEvent("createSent",e,t)};m.prototype._delete=function(t,i,n,r){var o,a=false,h=n.iIndex===undefined?s.getRelativePath(n.getPath(),this.oHeaderContext.getPath()):String(n.iIndex),d=false,u=this;return this.deleteFromCache(t,i,h,r,function(t,i){var r,h,f,c,l;if(n.isKeepAlive()){n.resetKeepAlive();o=true}if(n.created()){u.destroyCreated(n,true);a=true}else if(t>=0){for(h=t;h<u.aContexts.length;h+=1){n=u.aContexts[h];if(n){u.mPreviousContextsByPath[n.getPath()]=n}}c=u.oModel.resolve(u.sPath,u.oContext);u.aContexts.splice(t,1);for(h=t;h<u.aContexts.length;h+=1){if(u.aContexts[h]){l=h-u.iCreatedContexts;f=s.getPrivateAnnotation(i[h],"predicate");r=c+(f||"/"+l);n=u.mPreviousContextsByPath[r];if(n){delete u.mPreviousContextsByPath[r];if(n.iIndex===l){n.checkUpdate()}else{n.iIndex=l}}else{n=e.create(u.oModel,u,r,l)}u.aContexts[h]=n}}u.iMaxLength-=1;a=true}else if(u.bLengthFinal){d=true}}).then(function(){var e=u.iMaxLength;if(d){u.iMaxLength=u.fetchValue("$count",undefined,true).getResult()-u.iCreatedContexts;a=e!==u.iMaxLength}if(a){u._fireChange({reason:f.Remove})}else if(o){delete u.mPreviousContextsByPath[n.getPath()];n.destroy()}})};m.prototype.adjustPredicate=function(e,t,i){var n=this;function r(e,t){var i=n.aPreviousData.indexOf(e);if(i>=0){n.aPreviousData[i]=t}}if(i){i.adjustPredicate(e,t,r)}else{this.oHeaderContext.adjustPredicate(e,t);this.aContexts.forEach(function(i){i.adjustPredicate(e,t,r)})}};m.prototype.applyParameters=function(e,t){var i,r=this.mParameters&&this.mParameters.$$aggregation,o=this.mQueryOptions&&this.mQueryOptions.$apply;if("$$aggregation"in e){if("$apply"in e){throw new Error("Cannot combine $$aggregation and $apply")}i=n.buildApply(e.$$aggregation).$apply}this.mQueryOptions=this.oModel.buildQueryOptions(e,true);this.mParameters=e;if(i){this.mQueryOptions.$apply=i}if(t===""){if(this.mQueryOptions.$apply===o&&(!this.mParameters.$$aggregation||!r||s.deepEqual(this.mParameters.$$aggregation,r))){return}t=this.bHasAnalyticalInfo?f.Change:f.Filter}if(this.isRootBindingSuspended()){this.setResumeChangeReason(t);return}this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(t)};m.prototype.attachEvent=function(e){if(!(e in y)){throw new Error("Unsupported event '"+e+"': v4.ODataListBinding#attachEvent")}return g.prototype.attachEvent.apply(this,arguments)};m.prototype._checkDataStateMessages=function(e,t){if(t){e.setModelMessages(this.oModel.getMessagesByPath(t,true))}};m.prototype.checkKeepAlive=function(e){if(this.isRelative()&&!this.mParameters.$$ownRequest){throw new Error("Missing $$ownRequest at "+this)}if(e===this.oHeaderContext){throw new Error("Unsupported header context "+e)}if(this.mParameters.$$aggregation){throw new Error("Unsupported $$aggregation at "+this)}};m.prototype.collapse=function(e){var t=this.aContexts,i=this.oCache.collapse(s.getRelativePath(e.getPath(),this.oHeaderContext.getPath())),n=e.getModelIndex(),r,o=this;if(i>0){t.splice(n+1,i).forEach(function(e){o.mPreviousContextsByPath[e.getPath()]=e});for(r=n+1;r<t.length;r+=1){if(t[r]){t[r].iIndex=r}}this.iMaxLength-=i;this._fireChange({reason:f.Change})}};m.prototype.create=function(t,i,n){var r,o=this.fetchResourcePath(),a,d,u=this.oModel.resolve(this.sPath,this.oContext),c="($uid="+h()+")",l=u+c,p=this;if(!u){throw new Error("Binding is unresolved: "+this)}this.checkSuspended();n=!!n;if(n&&!this.bLengthFinal){throw new Error("Must know the final length to create at the end. Consider setting $count")}if(this.bCreatedAtEnd!==undefined&&this.bCreatedAtEnd!==n){throw new Error("Creating entities at the start and at the end is not supported.")}this.bCreatedAtEnd=n;d=this.lockGroup(undefined,true,true,function(){p.destroyCreated(r,true);return Promise.resolve().then(function(){p._fireChange({reason:f.Remove})})});a=this.createInCache(d,o,u,c,t,function(e){p.oModel.reportError("POST on '"+o+"' failed; will be repeated automatically",v,e);p.fireEvent("createCompleted",{context:r,success:false})},function(){p.fireEvent("createSent",{context:r})}).then(function(e){var n,o;if(!(t&&t["@$ui5.keepTransientPath"])){o=s.getPrivateAnnotation(e,"predicate");if(o){p.adjustPredicate(c,o,r);p.oModel.checkMessages()}}p.fireEvent("createCompleted",{context:r,success:true});if(!i){n=p.getGroupId();if(!p.oModel.isDirectGroup(n)&&!p.oModel.isAutoGroup(n)){n="$auto"}return p.refreshSingle(r,p.lockGroup(n))}},function(e){d.unlock(true);throw e});this.iCreatedContexts+=1;r=e.create(this.oModel,this,l,-this.iCreatedContexts,a);this.aContexts.unshift(r);this._fireChange({reason:f.Add});return r};m.prototype.createContexts=function(t,i,n){var r=false,o,a,h,d=n.$count,u,f=this.bLengthFinal,c=this.oModel,l=c.resolve(this.sPath,this.oContext),p,g=t>this.aContexts.length,C=this;function x(){var e,t=C.iMaxLength+C.iCreatedContexts;if(t>=C.aContexts.length){return}for(e=t;e<C.aContexts.length;e+=1){if(C.aContexts[e]){C.aContexts[e].destroy()}}while(t>0&&!C.aContexts[t-1]){t-=1}C.aContexts.length=t;r=true}for(h=t;h<t+n.length;h+=1){if(this.aContexts[h]===undefined&&n[h-t]){r=true;u=h-this.iCreatedContexts;p=s.getPrivateAnnotation(n[h-t],"predicate")||s.getPrivateAnnotation(n[h-t],"transientPredicate");a=l+(p||"/"+u);o=this.mPreviousContextsByPath[a];if(o&&(!o.created()||o.isTransient())){delete this.mPreviousContextsByPath[a];o.iIndex=u;o.checkUpdate()}else{o=e.create(c,this,a,u)}this.aContexts[h]=o}}if(Object.keys(this.mPreviousContextsByPath).length){c.addPrerenderingTask(this.destroyPreviousContexts.bind(this))}if(d!==undefined){this.bLengthFinal=true;this.iMaxLength=d-this.iCreatedContexts;x()}else{if(!n.length){this.iMaxLength=t-this.iCreatedContexts;x()}else if(this.aContexts.length>this.iMaxLength+this.iCreatedContexts){this.iMaxLength=Infinity}if(!(g&&n.length===0)){this.bLengthFinal=this.aContexts.length===this.iMaxLength+this.iCreatedContexts}}if(this.bLengthFinal!==f){r=true}return r};m.prototype.destroy=function(){if(this.bHasAnalyticalInfo&&this.aContexts===undefined){return}this.aContexts.forEach(function(e){e.destroy()});this.destroyPreviousContexts(true);if(this.oHeaderContext){this.oHeaderContext.destroy()}this.oModel.bindingDestroyed(this);this.aApplicationFilters=undefined;this.aContexts=undefined;this.oDiff=undefined;this.aFilters=undefined;this.oHeaderContext=undefined;this.mPreviousContextsByPath=undefined;this.aPreviousData=undefined;this.mQueryOptions=undefined;this.aSorters=undefined;t.prototype.destroy.call(this);g.prototype.destroy.call(this)};m.prototype.destroyCreated=function(e,t){var i,n=e.getModelIndex();this.iCreatedContexts-=1;for(i=0;i<n;i+=1){this.aContexts[i].iIndex+=1}if(!this.iCreatedContexts){this.bCreatedAtEnd=undefined}this.aContexts.splice(n,1);if(t&&this.iCurrentEnd){this.mPreviousContextsByPath[e.getPath()]=e}else{e.destroy()}};m.prototype.destroyPreviousContexts=function(e){var t=this.mPreviousContextsByPath;if(t){Object.keys(t).forEach(function(i){var n=t[i];if(e||!n.isKeepAlive()){n.destroy();delete t[i]}else{n.iIndex=undefined}})}};m.prototype.doCreateCache=function(e,t,n,r){return i.create(this.oModel.oRequestor,e,r,this.mParameters.$$aggregation,this.inheritQueryOptions(t,n),this.oModel.bAutoExpandSelect,this.bSharedRequest)};m.prototype.doFetchQueryOptions=function(e){var t=this;return this.fetchResolvedQueryOptions(e).then(function(i){return t.fetchFilter(e,i.$filter).then(function(e){return s.mergeQueryOptions(i,t.getOrderby(i.$orderby),e)})})};m.prototype.doSetProperty=function(){};m.prototype.expand=function(e){var t=false,i=this;this.checkSuspended();return this.oCache.expand(this.lockGroup(),s.getRelativePath(e.getPath(),this.oHeaderContext.getPath()),function(){t=true;i.fireDataRequested()}).then(function(n){var r=i.aContexts,o,s,a;if(n>0){o=e.getModelIndex();for(a=r.length-1;a>o;a-=1){s=r[a];if(s){s.iIndex+=n;r[a+n]=s;delete r[a]}}i.iMaxLength+=n;i._fireChange({reason:f.Change})}if(t){i.fireDataReceived({})}},function(e){if(t){i.fireDataReceived({error:e})}throw e})};m.prototype.fetchCache=function(){var e=this.oCache,i=this.oModel.resolve(this.sPath,this.oContext),n,r=this;t.prototype.fetchCache.apply(this,arguments);if(e){this.oCachePromise.then(function(t){Object.keys(r.mPreviousContextsByPath).forEach(function(o){var a=r.mPreviousContextsByPath[o];if(a.isKeepAlive()){t.addKeptElement(e.getValue(s.getRelativePath(o,i)));a.checkUpdate();n=true}});if(n){t.setLateQueryOptions(e.getLateQueryOptions())}})}};m.prototype.fetchContexts=function(e,t,i,n,r,o){var s,a=this;if(this.bCreatedAtEnd){e+=this.iCreatedContexts}n=n||this.lockGroup();s=this.fetchData(e,t,i,n,o);if(r){s=Promise.resolve(s)}return s.then(function(i){return i&&a.createContexts(e,t,i.value)},function(e){n.unlock(true);throw e})};m.prototype.fetchData=function(e,t,i,n,r){var o=this.oContext,s=this;return this.oCachePromise.then(function(a){if(s.bRelative&&o!==s.oContext){return undefined}if(a){return a.read(e,t,i,n,r).then(function(e){s.assertSameCache(a);return e})}n.unlock();return o.fetchValue(s.sReducedPath).then(function(i){var n;i=i||[];n=i.$count;i=i.slice(e,e+t);i.$count=n;return{value:i}})})};m.prototype.fetchDownloadUrl=function(){var e=this.oModel.mUriParameters;if(!this.isResolved()){throw new Error("Binding is unresolved")}return this.withCache(function(t,i){return t.getDownloadUrl(i,e)})};m.prototype.fetchFilter=function(e,t){var i,r,o,a;function h(e,t,i){var n,r,o,a;function h(e){return o?"tolower("+e+")":e}o=t==="Edm.String"&&e.bCaseSensitive===false;r=h(decodeURIComponent(e.sPath));a=h(s.formatLiteral(e.oValue1,t));switch(e.sOperator){case c.BT:n=r+" ge "+a+" and "+r+" le "+h(s.formatLiteral(e.oValue2,t));break;case c.NB:n=p(r+" lt "+a+" or "+r+" gt "+h(s.formatLiteral(e.oValue2,t)),i);break;case c.EQ:case c.GE:case c.GT:case c.LE:case c.LT:case c.NE:n=r+" "+e.sOperator.toLowerCase()+" "+a;break;case c.Contains:case c.EndsWith:case c.NotContains:case c.NotEndsWith:case c.NotStartsWith:case c.StartsWith:n=e.sOperator.toLowerCase().replace("not","not ")+"("+r+","+a+")";break;default:throw new Error("Unsupported operator: "+e.sOperator)}return n}function u(e,t,i){var n;if(!e){return d.resolve()}if(e.aFilters){return d.all(e.aFilters.map(function(i){return u(i,t,e.bAnd)})).then(function(t){return p(t.join(e.bAnd?" and ":" or "),i&&!e.bAnd)})}n=o.resolve(f(e.sPath,t),a);return o.fetchObject(n).then(function(r){var o,s,a;if(!r){throw new Error("Type cannot be determined, no metadata for path: "+n)}a=e.sOperator;if(a===c.All||a===c.Any){o=e.oCondition;s=e.sVariable;if(a===c.Any&&!o){return e.sPath+"/any()"}t=Object.create(t);t[s]=f(e.sPath,t);return u(o,t).then(function(t){return e.sPath+"/"+e.sOperator.toLowerCase()+"("+s+":"+t+")"})}return h(e,r.$Type,i)})}function f(e,t){var i=e.split("/");i[0]=t[i[0]];return i[0]?i.join("/"):e}function p(e,t){return t?"("+e+")":e}i=l.combineFilters(this.aFilters,this.aApplicationFilters);if(!i){return d.resolve([t])}r=n.splitFilter(i,this.mParameters.$$aggregation);o=this.oModel.getMetaModel();a=o.getMetaContext(this.oModel.resolve(this.sPath,e));return d.all([u(r[0],{},t).then(function(e){return e&&t?e+" and ("+t+")":e||t}),u(r[1],{})])};m.prototype.fetchValue=function(e,t,i){var n=i&&this.oCache!==undefined?d.resolve(this.oCache):this.oCachePromise,r=this;return n.then(function(n){var s,a;if(n){s=i?o.$cached:r.lockGroup();a=r.getRelativePath(e);if(a!==undefined){return n.fetchValue(s,a,undefined,t)}}if(r.oContext){return r.oContext.fetchValue(e,t,i)}})};m.prototype.filter=function(e,t){if(this.sOperationMode!==x.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server")}if(this.hasPendingChanges()){throw new Error("Cannot filter due to pending changes")}if(t===p.Control){this.aFilters=s.toArray(e)}else{this.aApplicationFilters=s.toArray(e)}if(this.isRootBindingSuspended()){this.setResumeChangeReason(f.Filter);return this}this.createReadGroupLock(this.getGroupId(),true);this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(f.Filter);return this};m.prototype.getContexts=function(t,i,n){var r,o,s=false,h=false,d,u,c=!!this.sChangeReason,l=this.oModel.resolve(this.sPath,this.oContext),p,g=this;a.debug(this+"#getContexts("+t+", "+i+", "+n+")",undefined,v);this.checkSuspended();if(t!==0&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" first parameter must be 0 if extended change detection is enabled, but is "+t)}if(n!==undefined&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" third parameter must not be set if extended change detection is enabled")}if(!this.isResolved()){this.aPreviousData=[];return[]}r=this.sChangeReason||f.Change;this.sChangeReason=undefined;if(r==="AddVirtualContext"){this.oModel.addPrerenderingTask(function(){var e=g.bUseExtendedChangeDetection;if(g.aContexts===undefined){p.destroy();return}if(!g.isRootBindingSuspended()){g.bUseExtendedChangeDetection=false;g.getContexts(t,i,n);g.bUseExtendedChangeDetection=e}g.oModel.addPrerenderingTask(function(){if(g.aContexts&&!g.isRootBindingSuspended()){g.sChangeReason="RemoveVirtualContext";g._fireChange({detailedReason:"RemoveVirtualContext",reason:f.Change});g.reset(f.Refresh)}p.destroy()})},true);p=e.create(this.oModel,this,l+"/"+e.VIRTUAL,e.VIRTUAL);return[p]}if(r==="RemoveVirtualContext"||this.oContext&&this.oContext.iIndex===e.VIRTUAL){return[]}t=t||0;i=i||this.oModel.iSizeLimit;if(!n||n<0){n=0}d=this.oReadGroupLock;this.oReadGroupLock=undefined;if(!this.oDiff){u=this.fetchContexts(t,i,n,d,c,function(){s=true;g.fireDataRequested()});this.resolveRefreshPromise(u);u.then(function(e){if(g.bUseExtendedChangeDetection){g.oDiff={aDiff:g.getDiff(i),iLength:i}}if(h){if(e||g.oDiff&&g.oDiff.aDiff.length){g._fireChange({reason:r})}else{g.oDiff=undefined}}if(s){g.fireDataReceived({data:{}})}},function(e){if(s){g.fireDataReceived(e.canceled?{data:{}}:{error:e})}throw e}).catch(function(e){g.oModel.reportError("Failed to get contexts for "+g.oModel.sServiceUrl+l.slice(1)+" with start index "+t+" and length "+i,v,e)});h=true}this.iCurrentBegin=t;this.iCurrentEnd=t+i;o=this.getContextsInViewOrder(t,i);if(this.bUseExtendedChangeDetection){if(this.oDiff&&i!==this.oDiff.iLength){throw new Error("Extended change detection protocol violation: Expected "+"getContexts(0,"+this.oDiff.iLength+"), but got getContexts(0,"+i+")")}o.dataRequested=!this.oDiff;o.diff=this.oDiff?this.oDiff.aDiff:[]}this.oDiff=undefined;return o};m.prototype.getContextsInViewOrder=function(e,t){var i,n,r;if(this.bCreatedAtEnd){i=[];r=Math.min(t,this.getLength()-e);for(n=0;n<r;n+=1){i[n]=this.aContexts[this.getModelIndex(e+n)]}}else{i=this.aContexts.slice(e,e+t)}return i};m.prototype.getCurrentContexts=function(){var e,t=Math.min(this.iCurrentEnd,this.iMaxLength+this.iCreatedContexts)-this.iCurrentBegin;e=this.getContextsInViewOrder(this.iCurrentBegin,t);while(e.length<t){e.push(undefined)}return e};m.prototype.getDependentBindings=function(){var e=this;return this.oModel.getDependentBindings(this).filter(function(t){return t.oContext.isKeepAlive()||!(t.oContext.getPath()in e.mPreviousContextsByPath)})};m.prototype.getDiff=function(e){var t=this.aPreviousData,i=this;this.aPreviousData=this.getContextsInViewOrder(0,e).map(function(e){return i.getContextData(e)});return this.diffData(t,this.aPreviousData)};m.prototype.getDistinctValues=function(){throw new Error("Unsupported operation: v4.ODataListBinding#getDistinctValues")};m.prototype.getDownloadUrl=s.createGetMethod("fetchDownloadUrl",true);m.prototype.getEntryData=function(e){return JSON.stringify(e.getValue())};m.prototype.getEntryKey=function(e){return e.getPath()};m.prototype.getFilterInfo=function(e){var t=l.combineFilters(this.aFilters,this.aApplicationFilters),i=null,n;if(t){i=t.getAST(e)}if(this.mQueryOptions.$filter){n={expression:this.mQueryOptions.$filter,syntax:"OData "+this.oModel.getODataVersion(),type:"Custom"};if(i){i={left:i,op:"&&",right:n,type:"Logical"}}else{i=n}}return i};m.prototype.getHeaderContext=function(){return this.isResolved()?this.oHeaderContext:null};m.prototype.getModelIndex=function(e){if(!this.bCreatedAtEnd){return e}return e<this.getLength()-this.iCreatedContexts?e+this.iCreatedContexts:this.getLength()-e-1};m.prototype.getLength=function(){if(this.bLengthFinal){return this.iMaxLength+this.iCreatedContexts}return this.aContexts.length?this.aContexts.length+10:0};m.prototype.getOrderby=function(e){var t=[],i=this;this.aSorters.forEach(function(e){if(e instanceof C){t.push(e.sPath+(e.bDescending?" desc":""))}else{throw new Error("Unsupported sorter: "+e+" - "+i)}});if(e){t.push(e)}return t.join(",")};m.prototype.getQueryOptions=function(e){var t={},i=this;if(e){throw new Error("Unsupported parameter value: bWithSystemQueryOptions: "+e)}Object.keys(this.mQueryOptions).forEach(function(e){if(e[0]!=="$"){t[e]=s.clone(i.mQueryOptions[e])}});return t};m.prototype.getQueryOptionsFromParameters=function(){return this.mQueryOptions};m.prototype.hasPendingChangesForPath=function(e){if(this.oCache===undefined){return this.iCreatedContexts>0}return t.prototype.hasPendingChangesForPath.apply(this,arguments)};m.prototype.inheritQueryOptions=function(e,t){var i;if(!Object.keys(this.mParameters).length){i=this.getQueryOptionsForPath("",t);if(e.$orderby&&i.$orderby){e.$orderby+=","+i.$orderby}if(e.$filter&&i.$filter){e.$filter="("+e.$filter+") and ("+i.$filter+")"}e=Object.assign({},i,e);s.aggregateQueryOptions(e,i)}return e};m.prototype.initialize=function(){if(this.isResolved()){if(this.getRootBinding().isSuspended()){this.sResumeChangeReason=this.sChangeReason==="AddVirtualContext"?f.Change:f.Refresh}else if(this.sChangeReason==="AddVirtualContext"){this._fireChange({detailedReason:"AddVirtualContext",reason:f.Change})}else{this.sChangeReason=f.Refresh;this._fireRefresh({reason:f.Refresh})}}};m.prototype.isLengthFinal=function(){return this.bLengthFinal};m.prototype.refreshInternal=function(e,t,i,n){var r,o=this;function s(i){return i.map(function(i){return i.refreshInternal(e,t,false,n)})}if(this.isRootBindingSuspended()){this.refreshSuspended(t);return d.all(s(o.getDependentBindings()))}this.createReadGroupLock(t,this.isRoot());return this.oCachePromise.then(function(i){var a=o.iCreatedContexts,h,u=o.oRefreshPromise;if(i&&!u){o.removeCachesAndMessages(e);o.fetchCache(o.oContext);r=o.oCachePromise.then(function(e){return e.refreshKeptElement(o.lockGroup(t))});u=o.createRefreshPromise();if(n){u=u.catch(function(e){return o.fetchResourcePath(o.oContext).then(function(t){if(!o.bRelative||i.$resourcePath===t){o.oCache=i;o.oCachePromise=d.resolve(i);o.iCreatedContexts=a;i.setActive(true);o._fireChange({reason:f.Change})}throw e})})}}h=o.getDependentBindings();o.reset(f.Refresh);return d.all(s(h).concat(u,r))})};m.prototype.refreshSingle=function(e,t,i){var n=e.getPath(),r=n.slice(1),o=this;if(e===this.oHeaderContext){throw new Error("Unsupported header context: "+e)}return this.withCache(function(a,h,u){var c=false,l=false,p=e.isKeepAlive(),g=s.getRelativePath(n,o.oHeaderContext.getPath()),C=[];function x(e){if(c){o.fireDataReceived(e)}}function y(){c=true;o.fireDataRequested()}function m(t){var i,r=e.getModelIndex();if(e.created()){o.destroyCreated(e);l=true}else{if(r===undefined){delete o.mPreviousContextsByPath[n]}else{o.aContexts.splice(r,1);o.iMaxLength-=1;for(i=r;i<o.aContexts.length;i+=1){if(o.aContexts[i]){o.aContexts[i].iIndex-=1}}if(t){o.mPreviousContextsByPath[n]=e}}if(!t){l=true;e.destroy()}}if(r!==undefined){o._fireChange({reason:f.Remove})}}C.push((i?a.refreshSingleWithRemove(t,h,e.getModelIndex(),g,p,y,m):a.refreshSingle(t,h,e.getModelIndex(),g,p,y)).then(function(n){var s=[];x({data:{}});if(!l){s.push(e.checkUpdate());if(i){s.push(o.refreshDependentBindings(r,t.getGroupId()))}}return d.all(s).then(function(){return n})},function(e){x({error:e});throw e}).catch(function(i){t.unlock(true);o.oModel.reportError("Failed to refresh entity: "+e,v,i)}));if(!i){C.push(o.refreshDependentBindings(r,t.getGroupId()))}return d.all(C).then(function(e){return e[0]})})};m.prototype.requestContexts=function(e,t,i){var n=this;if(!this.isResolved()){throw new Error("Unresolved binding: "+this.sPath)}this.checkSuspended();this.oModel.checkGroupId(i);e=e||0;t=t||this.oModel.iSizeLimit;return Promise.resolve(this.fetchContexts(e,t,0,this.lockGroup(i,true))).then(function(i){if(i){n._fireChange({reason:f.Change})}return n.getContextsInViewOrder(e,t)},function(i){n.oModel.reportError("Failed to get contexts for "+n.oModel.sServiceUrl+n.oModel.resolve(n.sPath,n.oContext).slice(1)+" with start index "+e+" and length "+t,v,i);throw i})};m.prototype.requestDownloadUrl=s.createRequestMethod("fetchDownloadUrl");m.prototype.requestSideEffects=function(e,t,i){var r,o=this.oModel,s={},a,h,u=i&&i!==this.oHeaderContext,f=this;function c(e){return e.catch(function(e){o.reportError("Failed to request side effects",v,e);throw e})}if(this.mParameters.$$aggregation){if(u){throw new Error("Must not request side effects for a context of a binding with $$aggregation")}if(n.isAffected(this.mParameters.$$aggregation,this.aFilters.concat(this.aApplicationFilters),t)){return this.refreshInternal("",e,false,true)}return d.resolve()}if(t.indexOf("")<0){a=this.oCache.requestSideEffects(this.lockGroup(e),t,s,u?i.getModelIndex():this.iCurrentBegin,u?undefined:this.iCurrentEnd-this.iCurrentBegin);if(a){h=[a];this.visitSideEffects(e,t,u?i:undefined,s,h);return d.all(h.map(c)).then(function(){return f.refreshDependentListBindingsWithoutCache()})}}if(u){return this.refreshSingle(i,this.lockGroup(e),false)}if(this.aContexts.length){r=this.aContexts.every(function(e){return e.isTransient()});if(r){return d.resolve()}}return this.refreshInternal("",e,false,true)};m.prototype.reset=function(e){var t=this.iCurrentEnd===0,i=this;if(this.aContexts){this.aContexts.forEach(function(e){i.mPreviousContextsByPath[e.getPath()]=e})}this.aContexts=[];this.iCreatedContexts=0;this.bCreatedAtEnd=undefined;this.iCurrentBegin=this.iCurrentEnd=0;this.iMaxLength=Infinity;this.bLengthFinal=false;if(e&&!(t&&e===f.Change)){this.sChangeReason=e;this._fireRefresh({reason:e})}if(this.getHeaderContext()){this.oModel.getDependentBindings(this.oHeaderContext).forEach(function(e){e.checkUpdate()})}};m.prototype.resetKeepAlive=function(){var e=this.mPreviousContextsByPath;function t(e){if(e.isKeepAlive()){e.resetKeepAlive()}}Object.keys(e).forEach(function(i){t(e[i])});this.aContexts.forEach(t)};m.prototype.resumeInternal=function(e,t){var i=this.getDependentBindings(),n=this.sResumeChangeReason,r=t||n;this.sResumeChangeReason=undefined;if(r){this.removeCachesAndMessages("");this.reset();this.fetchCache(this.oContext,!t)}i.forEach(function(e){e.resumeInternal(!r,!!n)});if(this.sChangeReason==="AddVirtualContext"){this._fireChange({detailedReason:"AddVirtualContext",reason:n})}else if(n){this._fireRefresh({reason:n})}this.oModel.getDependentBindings(this.oHeaderContext).forEach(function(e){e.checkUpdate()})};m.prototype.setAggregation=function(e){var t;if(this.hasPendingChanges()){throw new Error("Cannot set $$aggregation due to pending changes")}t=Object.assign({},this.mParameters);if(e===undefined){delete t.$$aggregation}else{t.$$aggregation=s.clone(e);this.resetKeepAlive()}this.applyParameters(t,"")};m.prototype.setContext=function(t){var i,n,r=this;if(this.oContext!==t){if(this.bRelative){this.checkSuspended();for(i=0;i<r.iCreatedContexts;i+=1){if(r.aContexts[i].isTransient()){throw new Error("setContext on relative binding is forbidden if a "+"transient entity exists: "+r)}}this.reset();this.resetKeepAlive();this.fetchCache(t);if(t){n=this.oModel.resolve(this.sPath,t);if(this.oHeaderContext&&this.oHeaderContext.getPath()!==n){this.oHeaderContext.destroy();this.oHeaderContext=null}if(!this.oHeaderContext){this.oHeaderContext=e.create(this.oModel,this,n)}}u.prototype.setContext.call(this,t,{detailedReason:this.sChangeReason})}else{this.oContext=t}}};m.prototype.sort=function(e){if(this.sOperationMode!==x.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server")}if(this.hasPendingChanges()){throw new Error("Cannot sort due to pending changes")}this.aSorters=s.toArray(e);if(this.isRootBindingSuspended()){this.setResumeChangeReason(f.Sort);return this}this.createReadGroupLock(this.getGroupId(),true);this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(f.Sort);return this};m.prototype.updateAnalyticalInfo=function(e){var t={aggregate:{},group:{}},i=false,n=this;e.forEach(function(e){var n={};if("total"in e){if("grouped"in e){throw new Error("Both dimension and measure: "+e.name)}if(e.as){n.name=e.name;t.aggregate[e.as]=n}else{t.aggregate[e.name]=n}if(e.min){n.min=true;i=true}if(e.max){n.max=true;i=true}if(e.with){n.with=e.with}}else if(!("grouped"in e)||e.inResult||e.visible){t.group[e.name]=n}});this.bHasAnalyticalInfo=true;this.setAggregation(t);if(i){return{measureRangePromise:Promise.resolve(this.getRootBindingResumePromise().then(function(){return n.oCachePromise}).then(function(e){return e.getMeasureRangePromise()}))}}};return m});