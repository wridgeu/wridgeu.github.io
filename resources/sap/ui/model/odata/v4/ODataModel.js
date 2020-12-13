/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataContextBinding","./ODataListBinding","./ODataMetaModel","./ODataPropertyBinding","./SubmitMode","./lib/_GroupLock","./lib/_Helper","./lib/_MetadataRequestor","./lib/_Parser","./lib/_Requestor","sap/base/assert","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/core/library","sap/ui/core/message/Message","sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/model/Model","sap/ui/model/odata/OperationMode","sap/ui/thirdparty/URI"],function(e,t,r,o,i,n,s,a,u,p,d,h,c,f,l,g,y,m,w,M){"use strict";var v=/^\w+$/,b="sap.ui.model.odata.v4.ODataModel",E=["$count","$expand","$filter","$levels","$orderby","$search","$select"],P=/^(\$auto(\.\w+)?|\$direct|\w+)$/,k=f.MessageType,U=[undefined,k.Success,k.Information,k.Warning,k.Error],G={messageChange:true,sessionTimeout:true},$={annotationURI:true,autoExpandSelect:true,earlyRequests:true,groupId:true,groupProperties:true,httpHeaders:true,metadataUrlParams:true,odataVersion:true,operationMode:true,serviceUrl:true,sharedRequests:true,supportReferences:true,synchronizationMode:true,updateGroupId:true},O=["$apply","$count","$expand","$filter","$orderby","$search","$select"],S=/^[ -~]+$/;var x=m.extend("sap.ui.model.odata.v4.ODataModel",{constructor:function(e){var t,o,n=sap.ui.getCore().getConfiguration().getLanguageTag(),u,d,h,c,f=this;m.call(this);if(!e||e.synchronizationMode!=="None"){throw new Error("Synchronization mode must be 'None'")}u=e.odataVersion||"4.0";this.sODataVersion=u;if(u!=="4.0"&&u!=="2.0"){throw new Error("Unsupported value for parameter odataVersion: "+u)}for(d in e){if(!(d in $)){throw new Error("Unsupported parameter: "+d)}}h=e.serviceUrl;if(!h){throw new Error("Missing service root URL")}c=new M(h);if(c.path()[c.path().length-1]!=="/"){throw new Error("Service root URL must end with '/'")}if(e.operationMode&&e.operationMode!==w.Server){throw new Error("Unsupported operation mode: "+e.operationMode)}this.sOperationMode=e.operationMode;this.mUriParameters=this.buildQueryOptions(c.query(true),false,true);this.sServiceUrl=c.query("").toString();this.sGroupId=e.groupId;if(this.sGroupId===undefined){this.sGroupId="$auto"}if(this.sGroupId!=="$auto"&&this.sGroupId!=="$direct"){throw new Error("Group ID must be '$auto' or '$direct'")}this.checkGroupId(e.updateGroupId,false,"Invalid update group ID: ");this.sUpdateGroupId=e.updateGroupId||this.getGroupId();this.mGroupProperties={};for(t in e.groupProperties){f.checkGroupId(t,true);o=e.groupProperties[t];if(typeof o!=="object"||Object.keys(o).length!==1||!(o.submit in i)){throw new Error("Group '"+t+"' has invalid properties: '"+o+"'")}}this.mGroupProperties=s.clone(e.groupProperties)||{};this.mGroupProperties.$auto={submit:i.Auto};this.mGroupProperties.$direct={submit:i.Direct};if(e.autoExpandSelect!==undefined&&typeof e.autoExpandSelect!=="boolean"){throw new Error("Value for autoExpandSelect must be true or false")}this.bAutoExpandSelect=e.autoExpandSelect===true;if("sharedRequests"in e&&e.sharedRequests!==true){throw new Error("Value for sharedRequests must be true")}this.bSharedRequests=e.sharedRequests===true;this.mHeaders={"Accept-Language":n};this.mMetadataHeaders={"Accept-Language":n};this.oMetaModel=new r(a.create(this.mMetadataHeaders,u,Object.assign({},this.mUriParameters,e.metadataUrlParams)),this.sServiceUrl+"$metadata",e.annotationURI,this,e.supportReferences);this.oInterface={fetchEntityContainer:this.oMetaModel.fetchEntityContainer.bind(this.oMetaModel),fetchMetadata:this.oMetaModel.fetchObject.bind(this.oMetaModel),fireSessionTimeout:function(){f.fireEvent("sessionTimeout")},getGroupProperty:this.getGroupProperty.bind(this),onCreateGroup:function(e){if(f.isAutoGroup(e)){f.addPrerenderingTask(f._submitBatch.bind(f,e,true))}},reportBoundMessages:this.reportBoundMessages.bind(this),reportUnboundMessages:this.reportUnboundMessages.bind(this)};this.oRequestor=p.create(this.sServiceUrl,this.oInterface,this.mHeaders,this.mUriParameters,u);this.changeHttpHeaders(e.httpHeaders);if(e.earlyRequests){this.oMetaModel.fetchEntityContainer(true);this.initializeSecurityToken()}this.aAllBindings=[];this.mSupportedBindingModes={OneTime:true,OneWay:true};if(e.sharedRequests){this.sDefaultBindingMode=g.OneWay}else{this.sDefaultBindingMode=g.TwoWay;this.mSupportedBindingModes.TwoWay=true}this.aPrerenderingTasks=null}});x.prototype._submitBatch=function(e,t){var r=this;return this.oRequestor.submitBatch(e).catch(function(e){r.reportError("$batch failed",b,e);if(!t){throw e}})};x.prototype.addPrerenderingTask=function(e,t){var r=this;if(!this.aPrerenderingTasks){this.aPrerenderingTasks=[];sap.ui.getCore().addPrerenderingTask(function(){while(r.aPrerenderingTasks.length){r.aPrerenderingTasks.shift()()}r.aPrerenderingTasks=null})}if(t){this.aPrerenderingTasks.unshift(e)}else{this.aPrerenderingTasks.push(e)}};x.prototype.attachEvent=function(e){if(!(e in G)){throw new Error("Unsupported event '"+e+"': v4.ODataModel#attachEvent")}return m.prototype.attachEvent.apply(this,arguments)};x.prototype.attachSessionTimeout=function(e,t){return this.attachEvent("sessionTimeout",e,t)};x.prototype.bindContext=function(t,r,o){return new e(this,t,r,o)};x.prototype.bindingCreated=function(e){this.aAllBindings.push(e)};x.prototype.bindingDestroyed=function(e){var t=this.aAllBindings.indexOf(e);if(t<0){throw new Error("Unknown "+e)}this.aAllBindings.splice(t,1)};x.prototype.bindList=function(e,r,o,i,n){return new t(this,e,r,o,i,n)};x.prototype.bindProperty=function(e,t,r){return new o(this,e,t,r)};x.prototype.bindTree=function(){throw new Error("Unsupported operation: v4.ODataModel#bindTree")};x.prototype.buildQueryOptions=function(e,t,r){var o,i=s.clone(e)||{};function n(e,r,o){var i,s,a,p=e[r];if(!t||o.indexOf(r)<0){throw new Error("System query option "+r+" is not supported")}if((r==="$expand"||r==="$select")&&typeof p==="string"){p=u.parseSystemQueryOption(r+"="+p)[r];e[r]=p}if(r==="$expand"){for(a in p){s=p[a];if(s===null||typeof s!=="object"){s=p[a]={}}for(i in s){n(s,i,E)}}}else if(r==="$count"){if(typeof p==="boolean"){if(!p){delete e.$count}}else{switch(typeof p==="string"&&p.toLowerCase()){case"false":delete e.$count;break;case"true":e.$count=true;break;default:throw new Error("Invalid value for $count: "+p)}}}}if(e){for(o in e){if(o.startsWith("$$")){delete i[o]}else if(o[0]==="@"){throw new Error("Parameter "+o+" is not supported")}else if(o[0]==="$"){n(i,o,O)}else if(!r&&o.startsWith("sap-")&&!o.startsWith("sap-valid-")){throw new Error("Custom query option "+o+" is not supported")}}}return i};x.prototype.changeHttpHeaders=function(e){var t,r,o={},i,n;this.oRequestor.checkHeaderNames(e);for(n in e){r=n.toLowerCase();i=e[n];if(o[r]){throw new Error("Duplicate header "+n)}else if(!(typeof i==="string"&&S.test(i)||i===undefined)){throw new Error("Unsupported value for header '"+n+"': "+i)}else{if(r==="x-csrf-token"){n="X-CSRF-Token"}o[r]={key:n,value:i}}}this.oRequestor.checkForOpenRequests();for(n in this.mHeaders){r=n.toLowerCase();t=o[r];if(t){delete this.mHeaders[n];delete this.mMetadataHeaders[n];if(t.value!==undefined){this.mHeaders[t.key]=t.value;this.mMetadataHeaders[t.key]=t.value}delete o[r]}}for(n in o){t=o[n];if(t.value!==undefined){this.mHeaders[t.key]=t.value;if(n!=="x-csrf-token"){this.mMetadataHeaders[t.key]=t.value}}}};x.prototype.checkBatchGroupId=function(e){this.checkGroupId(e);if(this.isDirectGroup(e)){throw new Error("Group ID does not use batch requests: "+e)}};x.prototype.checkGroupId=function(e,t,r){if(!t&&e===undefined||typeof e==="string"&&(t?v:P).test(e)){return}throw new Error((r||"Invalid group ID: ")+e)};x.prototype.createBindingContext=function(e,t){var r,o,i,n,s;function a(e){var t=e.indexOf("."),r=e.indexOf("/");return t>0&&(r<0||t<r)}if(arguments.length>2){throw new Error("Only the parameters sPath and oContext are supported")}if(t&&t.getBinding){throw new Error("Unsupported type: oContext must be of type sap.ui.model.Context, "+"but was sap.ui.model.odata.v4.Context")}n=this.resolve(e,t);if(n===undefined){throw new Error("Cannot create binding context from relative path '"+e+"' without context")}s=n.indexOf("#");if(s>=0){r=n.slice(0,s);i=n.slice(s+1);if(i[0]==="#"){i=i.slice(1)}else if(r.length>1&&i[0]!=="@"&&a(i)){return new y(this,n)}if(i[0]==="/"){i="."+i}o=this.oMetaModel.getMetaContext(r);return this.oMetaModel.createBindingContext(i,o)}return new y(this,n)};x.prototype.destroy=function(){this.oMetaModel.destroy();this.oRequestor.destroy();this.mHeaders=undefined;this.mMetadataHeaders=undefined;return m.prototype.destroy.apply(this,arguments)};x.prototype.destroyBindingContext=function(){throw new Error("Unsupported operation: v4.ODataModel#destroyBindingContext")};x.prototype.detachSessionTimeout=function(e,t){return this.detachEvent("sessionTimeout",e,t)};x.prototype.filterMatchingMessages=function(e,t){return s.hasPathPrefix(e,t)?this.mMessages[e]:[]};x.prototype.getAllBindings=function(){return this.aAllBindings.slice()};x.prototype.getContext=function(){throw new Error("Unsupported operation: v4.ODataModel#getContext")};x.prototype.getDependentBindings=function(e){return this.aAllBindings.filter(function(t){var r=t.getContext();return t.isRelative()&&(r===e||r&&r.getBinding&&r.getBinding()===e)})};x.prototype.getGroupId=function(){return this.sGroupId};x.prototype.getGroupProperty=function(e,t){switch(t){case"submit":if(e.startsWith("$auto.")){return i.Auto}return this.mGroupProperties[e]?this.mGroupProperties[e].submit:i.API;default:throw new Error("Unsupported group property: '"+t+"'")}};x.prototype.getHttpHeaders=function(){var e=Object.assign({},this.mHeaders);delete e["SAP-ContextId"];if(e["X-CSRF-Token"]===null){delete e["X-CSRF-Token"]}return e};x.prototype.getMetaModel=function(){return this.oMetaModel};x.prototype.getObject=function(){throw new Error("Unsupported operation: v4.ODataModel#getObject")};x.prototype.getODataVersion=function(){return this.sODataVersion};x.prototype.getOriginalProperty=function(){throw new Error("Unsupported operation: v4.ODataModel#getOriginalProperty")};x.prototype.getProperty=function(){throw new Error("Unsupported operation: v4.ODataModel#getProperty")};x.prototype.getUpdateGroupId=function(){return this.sUpdateGroupId};x.prototype.hasPendingChanges=function(e){if(e!==undefined){this.checkBatchGroupId(e);if(this.isAutoGroup(e)&&this.oRequestor.hasPendingChanges("$parked."+e)){return true}}return this.oRequestor.hasPendingChanges(e)};x.prototype.initializeSecurityToken=function(){this.oRequestor.refreshSecurityToken().catch(function(){})};x.prototype.isAutoGroup=function(e){return this.getGroupProperty(e,"submit")===i.Auto};x.prototype.isDirectGroup=function(e){return this.getGroupProperty(e,"submit")===i.Direct};x.prototype.isList=function(){throw new Error("Unsupported operation: v4.ODataModel#isList")};x.prototype.lockGroup=function(e,t,r,o,i){return this.oRequestor.lockGroup(e,t,r,o,i)};x.prototype.refresh=function(e){this.checkGroupId(e);this.getBindings().forEach(function(t){if(t.isRoot()){t.refresh(t.isSuspended()?undefined:e)}})};x.prototype.reportBoundMessages=function(e,t,r){var o="/"+e,i=[],n=[],a=this;Object.keys(t).forEach(function(e){t[e].forEach(function(t){var r=t.target[0]==="/"?t.target:s.buildPath(o,e,t.target);i.push(new l({code:t.code,descriptionUrl:t.longtextUrl||undefined,message:t.message,persistent:t.transition,processor:a,target:r,technical:t.technical,technicalDetails:s.createTechnicalDetails(t),type:U[t.numericSeverity]||k.None}))})});(r||[""]).forEach(function(e){var t=s.buildPath(o,e);Object.keys(a.mMessages).forEach(function(e){if(e===t||e.startsWith(t+"/")||e.startsWith(t+"(")){n=n.concat(a.mMessages[e].filter(function(e){return!e.persistent}))}})});if(i.length||n.length){this.fireMessageChange({newMessages:i,oldMessages:n})}};x.prototype.reportError=function(e,t,r){var o=[],i,n,a=[];function u(e,t,i){var u={code:e.code,message:e.message,numericSeverity:t,technical:i||e.technical,"@$ui5.error":r,"@$ui5.originalMessage":e};Object.keys(e).forEach(function(t){if(t[0]==="@"){if(t.endsWith(".numericSeverity")){u.numericSeverity=e[t]}else if(t.endsWith(".longtextUrl")&&r.requestUrl&&n){u.longtextUrl=s.makeAbsolute(e[t],r.requestUrl)}}});if(typeof e.target!=="string"){a.push(u)}else if(e.target[0]==="$"||!n){u.message=e.target+": "+u.message;a.push(u)}else{u.target=e.target;u.transition=true;o.push(u)}}if(r.canceled==="noDebugLog"){return}i=r.stack||r.message;if(i.indexOf(r.message)<0){i=r.message+"\n"+r.stack}if(r.canceled){h.debug(e,i,t);return}h.error(e,i,t);if(r.$reported){return}r.$reported=true;if(r.error){n=r.resourcePath&&r.resourcePath.split("?")[0];u(r.error,4,true);if(r.error.details){r.error.details.forEach(function(e){u(e)})}if(o.length){this.reportBoundMessages(n,{"":o},[])}}else{u(r,4,true)}this.reportUnboundMessages(n,a)};x.prototype.reportUnboundMessages=function(e,t){var r=this;if(t&&t.length){this.fireMessageChange({newMessages:t.map(function(t){var o=t.longtextUrl;return new l({code:t.code,descriptionUrl:o&&e?s.makeAbsolute(o,r.sServiceUrl+e):undefined,message:t.message,persistent:true,processor:r,target:"",technical:t.technical,technicalDetails:s.createTechnicalDetails(t),type:U[t.numericSeverity]||k.None})})})}};x.prototype.requestCanonicalPath=function(e){d(e.getModel()===this,"oEntityContext must belong to this model");return e.requestCanonicalPath()};x.prototype.requestSideEffects=function(e,t){var r;if(!t.length){return undefined}r=this.oMetaModel.getObject("/$EntityContainer");t=t.map(function(e){var t=e.split("/");if(t[1]!==r){throw new Error("Path must start with '/"+r+"': "+e)}t.splice(1,1);return t.join("/")});return c.all(this.aAllBindings.filter(function(e){return e.isRoot()&&e.requestAbsoluteSideEffects}).map(function(r){return r.requestAbsoluteSideEffects(e,t)}))};x.prototype.resetChanges=function(e){e=e||this.sUpdateGroupId;this.checkBatchGroupId(e);if(this.isAutoGroup(e)){this.oRequestor.cancelChanges("$parked."+e)}this.oRequestor.cancelChanges(e);this.aAllBindings.forEach(function(t){if(e===t.getUpdateGroupId()){t.resetInvalidDataState()}})};x.prototype.resolve=function(e,t){var r;if(e&&e[0]==="/"){r=e}else if(t){r=t.getPath();if(e){if(!r.endsWith("/")){r+="/"}r+=e}}if(r&&r!=="/"&&r[r.length-1]==="/"&&r.indexOf("#")<0){r=r.slice(0,r.length-1)}return r};x.prototype.setLegacySyntax=function(){throw new Error("Unsupported operation: v4.ODataModel#setLegacySyntax")};x.prototype.submitBatch=function(e){var t=this;this.checkBatchGroupId(e);if(this.isAutoGroup(e)){this.oRequestor.relocateAll("$parked."+e,e)}else{this.oRequestor.addChangeSet(e)}return new Promise(function(r){t.addPrerenderingTask(function(){r(t._submitBatch(e))})})};x.prototype.toString=function(){return b+": "+this.sServiceUrl};x.prototype.withUnresolvedBindings=function(e,t){return this.aAllBindings.filter(function(e){return!e.isResolved()}).some(function(r){return r[e](t)})};return x});