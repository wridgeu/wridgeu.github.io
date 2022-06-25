/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Manifest","./ComponentMetadata","./Element","sap/base/util/extend","sap/base/util/deepExtend","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectRegistry","sap/ui/core/ResizeHandler","sap/ui/thirdparty/URI","sap/ui/performance/trace/Interaction","sap/base/assert","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/UriParameters","sap/base/util/isPlainObject","sap/base/util/LoaderExtensions","sap/ui/VersionInfo","sap/ui/core/mvc/ViewType"],function(e,t,n,i,r,o,a,s,u,c,f,p,d,l,g,m,h,v,y){"use strict";var M={lazy:"lazy",eager:"eager",waitFor:"waitFor"};function _(e){["sap-client","sap-server"].forEach(function(t){if(!e.hasSearch(t)){var n=sap.ui.getCore().getConfiguration().getSAPParam(t);if(n){e.addSearch(t,n)}}})}function C(e,t,n,i){if(n){for(var r in e){if(!t[r]&&n[r]&&n[r].uri){t[r]=i}}}}function b(e,n,i,o){var a=n.getEntry(i);if(a!==undefined&&!m(a)){return a}var s,u;if(o&&(s=e.getParent())instanceof t){u=s._getManifestEntry(i,o)}if(u||a){a=r({},u,a)}return a}function w(e,t){var n=Object.create(Object.getPrototypeOf(e));n._oMetadata=e;n._oManifest=t;for(var i in e){if(!/^(getManifest|_getManifest|getManifestObject|getManifestEntry|_getManifestEntry|getMetadataVersion)$/.test(i)&&typeof e[i]==="function"){n[i]=e[i].bind(e)}}n.getManifest=function(){return this._getManifest()};n.getManifestEntry=function(e,t){return this._getManifestEntry(e,t)};n._getManifest=function(){return t&&t.getJson()};n.getManifestObject=function(){return t};n._getManifestEntry=function(n,i){return b(e,t,n,i)};n.getMetadataVersion=function(){return 2};return n}function S(e,t,n){p(typeof e==="function","fn must be a function");var i=a._sOwnerId;try{a._sOwnerId=t;return e.call(n)}finally{a._sOwnerId=i}}var E=a.extend("sap.ui.core.Component",{constructor:function(e,t){var n=Array.prototype.slice.call(arguments);if(typeof e!=="string"){t=e;e=undefined}if(t&&typeof t._metadataProxy==="object"){this._oMetadataProxy=t._metadataProxy;this._oManifest=t._metadataProxy._oManifest;delete t._metadataProxy;this.getMetadata=function(){return this._oMetadataProxy}}if(t&&typeof t._cacheTokens==="object"){this._mCacheTokens=t._cacheTokens;delete t._cacheTokens}if(t&&Array.isArray(t._activeTerminologies)){this._aActiveTerminologies=t._activeTerminologies;delete t._activeTerminologies}if(t&&typeof t._manifestModels==="object"){this._mManifestModels=t._manifestModels;delete t._manifestModels}else{this._mManifestModels={}}this._mServices={};this._oKeepAliveConfig=this.getManifestEntry("/sap.ui5/keepAlive");if(this._oKeepAliveConfig){this._oKeepAliveConfig.supported=!!this._oKeepAliveConfig.supported}this._bIsActive=true;this._aDestroyables=[];a.apply(this,n)},metadata:{stereotype:"component",abstract:true,specialSettings:{componentData:"any"},version:"0.0",includes:[],dependencies:{libs:[],components:[],ui5version:""},config:{},customizing:{},library:"sap.ui.core"}},t);s.apply(E,{onDeregister:function(e){n.registry.forEach(function(t){if(t._sapui_candidateForDestroy&&t._sOwnerId===e&&!t.getParent()){d.debug("destroying dangling template "+t+" when destroying the owner component");t.destroy()}})}});function O(e){var t,n;if(!sap.ui.getCore().getConfiguration().getDisableCustomizing()){if(typeof e==="string"){n=e}else if(e&&typeof e.isA==="function"&&!e.isA("sap.ui.core.Component")){n=E.getOwnerIdFor(e)}else{t=e}if(n){t=E.get(n)}if(t){if(t.getExtensionComponent){t=t.getExtensionComponent();if(!t){throw new Error("getExtensionComponent() must return an instance.")}}}}return t}E.getCustomizing=function(e,t){var n=t.type,i=t.name?"/"+t.name:"",r="/sap.ui5/extends/extensions/"+n+i;if(n==="sap.ui.viewExtensions"){r+="/"+t.extensionName}var o=O(e);return o?o._getManifestEntry(r,true):undefined};E.prototype.getManifest=function(){if(!this._oManifest){return this.getMetadata()._getManifest()}else{return this._oManifest.getJson()}};E.prototype.getManifestEntry=function(e){return this._getManifestEntry(e)};E.prototype._getManifestEntry=function(e,t){if(!this._oManifest){return this.getMetadata()._getManifestEntry(e,t)}else{return b(this.getMetadata(),this._oManifest,e,t)}};E.prototype.getManifestObject=function(){if(!this._oManifest){return this.getMetadata().getManifestObject()}else{return this._oManifest}};E.prototype._isVariant=function(){if(this._oManifest){var e=this.getManifestEntry("/sap.ui5/componentName");return e&&e!==this.getManifestEntry("/sap.app/id")}else{return false}};E.activateCustomizing=function(e){};E.deactivateCustomizing=function(e){};E.getOwnerIdFor=function(e){p(e instanceof a,"oObject must be given and must be a ManagedObject");var t=e instanceof a&&e._sOwnerId;return t||undefined};E.getOwnerComponentFor=function(e){return E.get(E.getOwnerIdFor(e))};E.prototype.runAsOwner=function(e){if(!this.isActive()){throw new Error("Execute 'runAsOwner' on an inactive owner component is not supported. Component: '"+this.getMetadata().getName()+"' with id '"+this.getId()+"'.")}return S(e,this.getId())};E.prototype.getInterface=function(){return this};E.prototype._initCompositeSupport=function(e){this.oComponentData=e&&e.componentData;if(this._oManifest){this._oManifest.init(this)}else{this.getMetadata().init()}if(this._isVariant()){var t=this._oManifest.getEntry("/sap.app/id");if(t){U(t,this._oManifest.resolveUri("./","manifest"))}}this.initComponentModels();if(this.onWindowError){this._fnWindowErrorHandler=function(e){var t=e.originalEvent;this.onWindowError(t.message,t.filename,t.lineno)}.bind(this);window.addEventListener("error",this._fnWindowErrorHandler)}if(this.onWindowBeforeUnload){this._fnWindowBeforeUnloadHandler=function(e){var t=this.onWindowBeforeUnload.apply(this,arguments);if(typeof t==="string"){e.returnValue=t;e.preventDefault();return t}}.bind(this);window.addEventListener("beforeunload",this._fnWindowBeforeUnloadHandler)}if(this.onWindowUnload){this._fnWindowUnloadHandler=this.onWindowUnload.bind(this);window.addEventListener("unload",this._fnWindowUnloadHandler)}};E.prototype._getDestroyables=function(){if(!this._aDestroyables){d.error("Mandatory super constructor not called for Component: '"+this.getManifestObject().getComponentName()+"'.",null,"sap.ui.support",function(){return{type:"missingSuperConstructor"}});this._aDestroyables=[]}return this._aDestroyables};E.prototype.destroy=function(){for(var e in this._mServices){if(this._mServices[e].instance){this._mServices[e].instance.destroy()}}delete this._mServices;for(var t in this._mManifestModels){this._mManifestModels[t].destroy()}delete this._mManifestModels;if(this._fnWindowErrorHandler){window.removeEventListener("error",this._fnWindowErrorHandler);delete this._fnWindowErrorHandler}if(this._fnWindowBeforeUnloadHandler){window.removeEventListener("beforeunload",this._fnWindowBeforeUnloadHandler);delete this._fnWindowBeforeUnloadHandler}if(this._fnWindowUnloadHandler){window.removeEventListener("unload",this._fnWindowUnloadHandler);delete this._fnWindowUnloadHandler}if(this._oEventBus){this._oEventBus.destroy();delete this._oEventBus}function n(e){if(e&&!e._bIsBeingDestroyed){e.destroy()}}var i=this._getDestroyables();for(var r=0;r<i.length;r++){i[r]=i[r].then(n)}a.prototype.destroy.apply(this,arguments);sap.ui.getCore().getMessageManager().unregisterObject(this);if(this._oManifest){this._oManifest.exit(this);delete this._oManifest}else{this.getMetadata().exit()}return Promise.all(i)};E.prototype.getComponentData=function(){return this.oComponentData};E.prototype.getEventBus=function(){if(!this._oEventBus){var e=sap.ui.require("sap/ui/core/EventBus");if(!e){var t=this.getMetadata().getName();d.warning("Synchronous loading of EventBus, due to #getEventBus() call on Component '"+t+"'.","SyncXHR",null,function(){return{type:"SyncXHR",name:t}});e=sap.ui.requireSync("sap/ui/core/EventBus")}this._oEventBus=new e;if(!this.isActive()){this._oEventBus.suspend()}}return this._oEventBus};E.prototype.isActive=function(){return this._bIsActive};E.prototype.initComponentModels=function(){var e=this.getMetadata();if(e.isBaseClass()){return}var t=this._getManifestEntry("/sap.app/dataSources",true)||{};var n=this._getManifestEntry("/sap.ui5/models",true)||{};this._initComponentModels(n,t,this._mCacheTokens)};E.prototype._initComponentModels=function(e,t,n){var i=this.getManifestObject().getComponentName();var r=E._findManifestModelClasses({models:e,dataSources:t,componentName:i});E._loadManifestModelClasses(r,i);var o=E._createManifestModelConfigurations({models:r,dataSources:t,component:this,mergeParent:true,cacheTokens:n,activeTerminologies:this.getActiveTerminologies()}),a={},s;if(!o){return}for(s in o){if(!this._mManifestModels[s]){a[s]=o[s]}}var u=E._createManifestModels(a,i);for(s in u){this._mManifestModels[s]=u[s]}for(s in this._mManifestModels){var c=this._mManifestModels[s];this.setModel(c,s||undefined)}};E.prototype.getService=function(e){if(!this._mServices[e]){this._mServices[e]={};this._mServices[e].promise=new Promise(function(t,n){sap.ui.require(["sap/ui/core/service/ServiceFactoryRegistry"],function(i){var r=this._getManifestEntry("/sap.ui5/services/"+e,true);var o=r&&r.factoryName;if(!o){n(new Error("Service "+e+" not declared!"));return}var a=i.get(o);if(a){a.createInstance({scopeObject:this,scopeType:"component",settings:r.settings||{}}).then(function(i){if(!this.bIsDestroyed){this._mServices[e].instance=i;this._mServices[e].interface=i.getInterface();t(this._mServices[e].interface)}else{n(new Error("Service "+e+" could not be loaded as its Component was destroyed."))}}.bind(this)).catch(n)}else{var s="The ServiceFactory "+o+" for Service "+e+" not found in ServiceFactoryRegistry!";var u=this._getManifestEntry("/sap.ui5/services/"+e+"/optional",true);if(!u){d.error(s)}n(new Error(s))}}.bind(this),n)}.bind(this))}return this._mServices[e].promise};function A(e,t){var n=e._getManifestEntry("/sap.ui5/services",true);var i=t?[]:null;if(!n){return i}var r=Object.keys(n);if(!t&&r.some(function(e){return n[e].startup===M.waitFor})){throw new Error('The specified component "'+e.getMetadata().getName()+'" cannot be loaded in sync mode since it has some services declared with "startup" set to "waitFor"')}return r.reduce(function(t,i){if(n[i].lazy===false||n[i].startup===M.waitFor||n[i].startup===M.eager){var r=e.getService(i);if(n[i].startup===M.waitFor){t.push(r)}}return t},i)}E.prototype.createComponent=function(e){p(typeof e==="string"&&e||typeof e==="object"&&typeof e.usage==="string"&&e.usage,"vUsage either must be a non-empty string or an object with a non-empty usage id");var t={async:true};if(e){var n;if(typeof e==="object"){n=e.usage;["id","async","settings","componentData"].forEach(function(n){if(e[n]!==undefined){t[n]=e[n]}})}else if(typeof e==="string"){n=e}t=this._enhanceWithUsageConfig(n,t)}var i=E._createComponent(t,this);if(i instanceof Promise){this.registerForDestroy(i)}return i};E.prototype._enhanceWithUsageConfig=function(e,t){var n=this.getManifestEntry("/sap.ui5/componentUsages/"+e);if(!n){throw new Error('Component usage "'+e+'" not declared in Component "'+this.getManifestObject().getComponentName()+'"!')}if(n.activeTerminologies){throw new Error("Terminologies vector can't be used in component usages")}return r(n,t)};E.prototype.getActiveTerminologies=function(){return this._aActiveTerminologies?this._aActiveTerminologies.slice():undefined};E._createComponent=function(e,t){function n(){if(e.async===true){return E.create(e)}else{return sap.ui.component(e)}}if(t){if(!t.isActive()){throw new Error("Creation of component '"+e.name+"' is not possible due to inactive owner component '"+t.getId()+"'")}return t.runAsOwner(n)}else{return n()}};E._applyCacheToken=function(e,t,n){var i=sap.ui.getCore().getConfiguration();var r=n?"Model":"DataSource";var o=n?'["sap.ui5"]["models"]':'["sap.app"]["dataSources"]';var a=n&&n["sap-language"]||e.search(true)["sap-language"];var s=n&&n["sap-client"]||e.search(true)["sap-client"];if(!a){d.warning('Component Manifest: Ignoring provided "sap-context-token='+t.cacheToken+'" for '+r+' "'+t.dataSource+'" ('+e.toString()+"). "+'Missing "sap-language" URI parameter',o+'["'+t.dataSource+'"]',t.componentName);return}if(!s){d.warning('Component Manifest: Ignoring provided "sap-context-token='+t.cacheToken+'" for '+r+' "'+t.dataSource+'" ('+e.toString()+"). "+'Missing "sap-client" URI parameter',o+'["'+t.dataSource+'"]',t.componentName);return}if(s!==i.getSAPParam("sap-client")){d.warning('Component Manifest: Ignoring provided "sap-context-token='+t.cacheToken+'" for '+r+' "'+t.dataSource+'" ('+e.toString()+"). "+'URI parameter "sap-client='+s+'" must be identical with configuration "sap-client='+i.getSAPParam("sap-client")+'"',o+'["'+t.dataSource+'"]',t.componentName);return}if(e.hasQuery("sap-context-token")&&!e.hasQuery("sap-context-token",t.cacheToken)||n&&n["sap-context-token"]&&n["sap-context-token"]!==t.cacheToken){d.warning('Component Manifest: Overriding existing "sap-context-token='+(e.query(true)["sap-context-token"]||n["sap-context-token"])+'" with provided value "'+t.cacheToken+'" for '+r+' "'+t.dataSource+'" ('+e.toString()+").",o+'["'+t.dataSource+'"]',t.componentName)}if(n){if(e.hasQuery("sap-context-token")){d.warning('Component Manifest: Move existing "sap-context-token='+e.query(true)["sap-context-token"]+'" to metadataUrlParams for '+r+' "'+t.dataSource+'" ('+e.toString()+").",o+'["'+t.dataSource+'"]',t.componentName)}e.removeQuery("sap-context-token");n["sap-context-token"]=t.cacheToken}else{e.setQuery("sap-context-token",t.cacheToken)}};E._findManifestModelClasses=function(e){if(!e.models){return null}var t={models:e.models,dataSources:e.dataSources||{},origin:{dataSources:{},models:{}}};var n=e.componentName;var i={};for(var r in t.models){var o=t.models[r];if(typeof o==="string"){o={dataSource:o}}if(o.dataSource){var a=t.dataSources&&t.dataSources[o.dataSource];if(typeof a==="object"){if(a.type===undefined){a.type="OData"}var s;if(!o.type){switch(a.type){case"OData":s=a.settings&&a.settings.odataVersion;if(s==="4.0"){o.type="sap.ui.model.odata.v4.ODataModel"}else if(!s||s==="2.0"){o.type="sap.ui.model.odata.v2.ODataModel"}else{d.error('Component Manifest: Provided OData version "'+s+'" in '+'dataSource "'+o.dataSource+'" for model "'+r+'" is unknown. '+'Falling back to default model type "sap.ui.model.odata.v2.ODataModel".','["sap.app"]["dataSources"]["'+o.dataSource+'"]',n);o.type="sap.ui.model.odata.v2.ODataModel"}break;case"JSON":o.type="sap.ui.model.json.JSONModel";break;case"XML":o.type="sap.ui.model.xml.XMLModel";break;default:}}}}if(!o.type){d.error('Component Manifest: Missing "type" for model "'+r+'"','["sap.ui5"]["models"]["'+r+'"]',n);continue}i[r]=o}return i};E._createManifestModelConfigurations=function(e){var n=e.component;var i=e.manifest||n.getManifestObject();var r=e.mergeParent;var o=e.cacheTokens||{};var a=n?n.getMetadata().getComponentName():i.getComponentName();var s=sap.ui.getCore().getConfiguration();var u=e.activeTerminologies;if(!e.models){return null}var f={models:e.models,dataSources:e.dataSources||{},origin:{dataSources:{},models:{}}};if(n&&r){var p=n.getMetadata();while(p instanceof t){var g=p.getManifestObject();var m=p._getManifestEntry("/sap.app/dataSources");C(f.dataSources,f.origin.dataSources,m,g);var h=p._getManifestEntry("/sap.ui5/models");C(f.models,f.origin.models,h,g);p=p.getParent()}}var v={};for(var y in f.models){var M=f.models[y];var b=sap.ui.require(M.type.replace(/\./g,"/"));if(!b){b=l.get(M.type)}if(!b){d.error('Component Manifest: Class "'+M.type+'" for model "'+y+'" could not be found','["sap.ui5"]["models"]["'+y+'"]',a);continue}var w=b.getMetadata();var S=w.isA("sap.ui.model.odata.ODataModel");var O=w.isA("sap.ui.model.odata.v2.ODataModel");var A=w.isA("sap.ui.model.odata.v4.ODataModel");var P=w.isA("sap.ui.model.resource.ResourceModel");var T=false;var U=null;if(typeof M==="string"){M={dataSource:M}}if(M.dataSource){var k=f.dataSources&&f.dataSources[M.dataSource];if(typeof k==="object"){if(k.type===undefined){k.type="OData"}if(A&&k.settings&&k.settings.odataVersion){M.settings=M.settings||{};M.settings.odataVersion=k.settings.odataVersion}if(!M.uri){M.uri=k.uri;T=true}if(k.type==="OData"&&k.settings&&typeof k.settings.maxAge==="number"){M.settings=M.settings||{};M.settings.headers=M.settings.headers||{};M.settings.headers["Cache-Control"]="max-age="+k.settings.maxAge}if(k.type==="OData"&&k.settings&&k.settings.annotations){var I=k.settings.annotations;for(var D=0;D<I.length;D++){var j=I[D];var N=f.dataSources[j];if(!N){d.error('Component Manifest: ODataAnnotation "'+j+'" for dataSource "'+M.dataSource+'" could not be found in manifest','["sap.app"]["dataSources"]["'+j+'"]',a);continue}if(N.type!=="ODataAnnotation"){d.error('Component Manifest: dataSource "'+j+'" was expected to have type "ODataAnnotation" but was "'+N.type+'"','["sap.app"]["dataSources"]["'+j+'"]',a);continue}if(!N.uri){d.error('Component Manifest: Missing "uri" for ODataAnnotation "'+j+'"','["sap.app"]["dataSources"]["'+j+'"]',a);continue}var x=new c(N.uri);if(O||A){["sap-language","sap-client"].forEach(function(e){if(!x.hasQuery(e)&&s.getSAPParam(e)){x.setQuery(e,s.getSAPParam(e))}});var R=o.dataSources&&o.dataSources[N.uri];if(R){E._applyCacheToken(x,{cacheToken:R,componentName:a,dataSource:j})}}var B=f.origin.dataSources[I[D]]||i;var F=B._resolveUri(x).toString();M.settings=M.settings||{};M.settings.annotationURI=M.settings.annotationURI||[];M.settings.annotationURI.push(F)}}}else{d.error('Component Manifest: dataSource "'+M.dataSource+'" for model "'+y+'" not found or invalid','["sap.app"]["dataSources"]["'+M.dataSource+'"]',a);continue}}if(S&&(!M.settings||M.settings.json===undefined)){M.settings=M.settings||{};M.settings.json=true}if(P){if(M.uri&&M.settings&&M.settings.bundleUrl){d.warning("Defining both model uri and bundleUrl is not supported. Only model uri will be resolved.")}if(!M.uri&&M.settings&&M.settings.terminologies){if(M.bundleUrl||M.settings.bundleUrl){M.uri=M.bundleUrl||M.settings.bundleUrl;delete M.settings.bundleUrl}}}if(M.uri){var H=new c(M.uri);var L=(T?f.origin.dataSources[M.dataSource]:f.origin.models[y])||i;H=L._resolveUri(H);if(M.dataSource){_(H);if(O||A){var W=f.dataSources&&f.dataSources[M.dataSource];var q=o.dataSources&&o.dataSources[W.uri];U=M.settings&&M.settings.metadataUrlParams;var V=(!U||typeof U["sap-language"]==="undefined")&&!H.hasQuery("sap-language")&&s.getSAPParam("sap-language");if(V||q){M.settings=M.settings||{};U=M.settings.metadataUrlParams=M.settings.metadataUrlParams||{};if(V){U["sap-language"]=s.getSAPParam("sap-language")}}if(q){E._applyCacheToken(H,{cacheToken:q,componentName:a,dataSource:y},U)}}}M.uri=H.toString()}if(M.uriSettingName===undefined){if(S||O||A){M.uriSettingName="serviceUrl"}else if(P){M.uriSettingName="bundleUrl"}else{}}var z;var J;if(n){J=n.getComponentData()}else{J=e.componentData}z=J&&J.startupParameters&&J.startupParameters["sap-system"];if(!z){z=s.getSAPParam("sap-system")}var K=false;var Q;if(z&&(S||O)){K=true;Q=sap.ui.require("sap/ui/model/odata/ODataUtils")}if(M.uri){if(K){M.preOriginBaseUri=M.uri.split("?")[0];M.uri=Q.setOrigin(M.uri,{alias:z});M.postOriginBaseUri=M.uri.split("?")[0]}if(M.uriSettingName!==undefined){M.settings=M.settings||{};if(!M.settings[M.uriSettingName]){M.settings[M.uriSettingName]=M.uri}}else if(M.settings){M.settings=[M.uri,M.settings]}else{M.settings=[M.uri]}}else if(K&&M.uriSettingName!==undefined&&M.settings&&M.settings[M.uriSettingName]){M.preOriginBaseUri=M.settings[M.uriSettingName].split("?")[0];M.settings[M.uriSettingName]=Q.setOrigin(M.settings[M.uriSettingName],{alias:z});M.postOriginUri=M.settings[M.uriSettingName].split("?")[0]}if(K&&M.settings&&M.settings.annotationURI){var X=[].concat(M.settings.annotationURI);var $=[];for(var G=0;G<X.length;G++){$.push(Q.setAnnotationOrigin(X[G],{alias:z,preOriginBaseUri:M.preOriginBaseUri,postOriginBaseUri:M.postOriginBaseUri}))}M.settings.annotationURI=$}if(P&&M.settings){if(u){M.settings.activeTerminologies=u}i._processResourceConfiguration(M.settings,undefined,true)}if(M.settings&&!Array.isArray(M.settings)){M.settings=[M.settings]}v[y]=M}if(i.getEntry("/sap.ui5/commands")||n&&n._getManifestEntry("/sap.ui5/commands",true)){v["$cmd"]={type:"sap.ui.model.json.JSONModel"}}return v};E._loadManifestModelClasses=function(e,t){for(var n in e){var i=e[n];try{sap.ui.requireSync(i.type.replace(/\./g,"/"))}catch(e){d.error('Component Manifest: Class "'+i.type+'" for model "'+n+'" could not be loaded. '+e,'["sap.ui5"]["models"]["'+n+'"]',t);continue}}};E._createManifestModels=function(e,t){var n={};for(var i in e){var r=e[i];var o=l.get(r.type);var a=[null].concat(r.settings||[]);var s=o.bind.apply(o,a);var u=new s;n[i]=u}return n};function P(e){var t={afterManifest:{},afterPreload:{}};var n=o({},e.getEntry("/sap.app/dataSources"));var i=o({},e.getEntry("/sap.ui5/models"));var r=e.getComponentName();var a=E._findManifestModelClasses({models:i,dataSources:n,componentName:r});var s=g.fromQuery(window.location.search).get("sap-ui-xx-preload-component-models-"+e.getComponentName());var u=s&&s.split(",");for(var c in a){var f=a[c];if(!f.preload&&u&&u.indexOf(c)>-1){f.preload=true;d.warning('FOR TESTING ONLY!!! Activating preload for model "'+c+'" ('+f.type+")",r,"sap.ui.core.Component")}if(f.type==="sap.ui.model.resource.ResourceModel"&&(!f.settings||f.settings.async!==true)){t.afterPreload[c]=f}else if(f.preload){if(sap.ui.loader._.getModuleState(f.type.replace(/\./g,"/")+".js")){t.afterManifest[c]=f}else{d.warning('Can not preload model "'+c+'" as required class has not been loaded: "'+f.type+'"',r,"sap.ui.core.Component")}}}return t}function T(e){return sap.ui.require.toUrl(e.replace(/\./g,"/")+"/manifest.json")}function U(e,t){h.registerResourcePath(e.replace(/\./g,"/"),t)}function k(e){var n=[];var i=[];function r(e){if(!e._oManifest){var o=e.getComponentName();var a=T(o);var s=h.loadResource({url:a,dataType:"json",async:true}).catch(function(e){d.error('Failed to load component manifest from "'+a+'" (component '+o+")! Reason: "+e);return{}});n.push(s);i.push(e)}var u=e.getParent();if(u&&u instanceof t&&!u.isBaseClass()){r(u)}}r(e);return Promise.all(n).then(function(e){for(var t=0;t<e.length;t++){if(e[t]){i[t]._applyManifest(e[t])}}})}E._fnLoadComponentCallback=null;var I=[];Object.defineProperty(E,"_fnOnInstanceCreated",{get:function(){return I[0]},set:function(e){if(typeof e==="function"){I.push(e)}else{I=[]}}});E._fnPreprocessManifest=null;E.create=function(e){if(e==null||typeof e!=="object"){throw new TypeError("Component.create() must be called with a configuration object.")}var t=o({},e);t.async=true;if(t.manifest===undefined){t.manifest=true}return D(t)};sap.ui.component=function(e){if(!e){throw new Error("sap.ui.component cannot be called without parameter!")}var t=function(e){return{type:"sap.ui.component",name:e}};if(typeof e==="string"){d.warning("Do not use deprecated function 'sap.ui.component' ("+e+") + for Component instance lookup. "+"Use 'Component.get' instead","sap.ui.component",null,t.bind(null,e));return E.get(e)}if(e.async){d.info("Do not use deprecated factory function 'sap.ui.component' ("+e["name"]+"). "+"Use 'Component.create' instead","sap.ui.component",null,t.bind(null,e["name"]))}else{d.warning("Do not use synchronous component creation ("+e["name"]+")! "+"Use the new asynchronous factory 'Component.create' instead","sap.ui.component",null,t.bind(null,e["name"]))}return D(e,true)};function D(e,n){var r=E.get(a._sOwnerId);var o=e.activeTerminologies||r&&r.getActiveTerminologies()||sap.ui.getCore().getConfiguration().getActiveTerminologies();if(!e.asyncHints||!e.asyncHints.cacheTokens){var s=r&&r._mCacheTokens;if(typeof s==="object"){e.asyncHints=e.asyncHints||{};e.asyncHints.cacheTokens=s}}function u(e,t){return I.map(function(n){return n(e,t)})}function c(e,t){if(t.async){var n=e.rootControlLoaded?e.rootControlLoaded():Promise.resolve();var i=u(e,t);i.push(n);return Promise.all(i)}else{u(e,t)}return e}function f(t){if(n&&t.getMetadata().isA("sap.ui.core.IAsyncContentCreation")){throw new Error("Do not use deprecated factory function 'sap.ui.component' in combination with IAsyncContentCreation ("+e["name"]+"). "+"Use 'Component.create' instead")}var r=e.name,a=e.id,s=e.componentData,u=r+".Component",f=e.settings;var l=new t(i({},f,{id:a,componentData:s,_cacheTokens:e.asyncHints&&e.asyncHints.cacheTokens,_activeTerminologies:o}));p(l instanceof E,'The specified component "'+u+'" must be an instance of sap.ui.core.Component!');d.info("Component instance Id = "+l.getId());var g=l.getMetadata()._getManifestEntry("/sap.ui5/handleValidation");if(g!==undefined||e.handleValidation){sap.ui.getCore().getMessageManager().registerObject(l,g===undefined?e.handleValidation:g)}var m=A(l,e.async);if(e.async){return c(l,e).then(function(){return Promise.all(m)}).then(function(){return l})}else{return c(l,e)}}var l=j(e,{failOnError:true,createModels:true,waitFor:e.asyncHints&&e.asyncHints.waitFor,activeTerminologies:o});if(e.async){var g=a._sOwnerId;return l.then(function(e){var n=function(e){var i=e.getParent();var r=Promise.resolve();if(i instanceof t){r=r.then(function(){return n(i)})}return r.then(function(){return e.getManifestObject().loadDependenciesAndIncludes(true)})};return n(e.getMetadata()).then(function(){return S(function(){return f(e)},g)})})}else{return f(l)}}E.load=function(e){var t=o({},e);t.async=true;if(t.manifest===undefined){t.manifest=true}return j(t,{preloadOnly:t.asyncHints&&t.asyncHints.preloadOnly})};E.get=function(e){return E.registry.get(e)};sap.ui.component.load=function(e,t){d.warning("Do not use deprecated function 'sap.ui.component.load'! Use 'Component.load' instead");return j(e,{failOnError:t,preloadOnly:e.asyncHints&&e.asyncHints.preloadOnly})};function j(t,n){var i=n.activeTerminologies,a=t.name,s=t.url,u=sap.ui.getCore().getConfiguration(),c=/^(sync|async)$/.test(u.getComponentPreload()),l=t.manifest,g,m,h,M,_,C;function b(n,i){var r=JSON.parse(JSON.stringify(n));if(t.async){return S(r).then(function(t){return new e(t,i)})}else{return new e(r,i)}}function S(e){if(typeof E._fnPreprocessManifest==="function"&&e!=null){try{var n=r({},t);return E._fnPreprocessManifest(e,n)}catch(e){d.error("Failed to execute flexibility hook for manifest preprocessing.",e);return Promise.reject(e)}}else{return Promise.resolve(e)}}p(!s||typeof s==="string","sUrl must be a string or undefined");if(a&&typeof s==="string"){U(a,s)}f.setStepComponent(a);if(l===undefined){g=t.manifestFirst===undefined?u.getManifestFirst():!!t.manifestFirst;m=t.manifestUrl}else{if(t.async===undefined){t.async=true}g=!!l;m=l&&typeof l==="string"?l:undefined;h=l&&typeof l==="object"?b(l,{url:t&&t.altManifestUrl,activeTerminologies:i}):undefined}if(!h&&m){h=e.load({activeTerminologies:i,manifestUrl:m,componentName:a,processJson:S,async:t.async,failOnError:true})}if(h&&!t.async){a=h.getComponentName();if(a&&typeof s==="string"){U(a,s)}}if(!(h&&t.async)){if(!a){throw new Error("The name of the component is undefined.")}p(typeof a==="string","sName must be a string")}if(g&&!h){h=e.load({activeTerminologies:i,manifestUrl:T(a),componentName:a,async:t.async,processJson:S,failOnError:false})}function O(){return(a+".Component").replace(/\./g,"/")}function A(e){var t=a+".Component";if(!e){var i="The specified component controller '"+t+"' could not be found!";if(n.failOnError){throw new Error(i)}else{d.warning(i)}}if(h){var r=w(e.getMetadata(),h);var o=function(){var t=Array.prototype.slice.call(arguments);var n;if(t.length===0||typeof t[0]==="object"){n=t[0]=t[0]||{}}else if(typeof t[0]==="string"){n=t[1]=t[1]||{}}n._metadataProxy=r;if(M){n._manifestModels=M}var i=Object.create(e.prototype);e.apply(i,t);return i};o.getMetadata=function(){return r};o.extend=function(){throw new Error("Extending Components created by Manifest is not supported!")};return o}else{return e}}function I(e,t){p(typeof e==="string"&&e||typeof e==="object"&&typeof e.name==="string"&&e.name,"reference either must be a non-empty string or an object with a non-empty 'name' and an optional 'url' property");if(typeof e==="object"){if(e.url){U(e.name,e.url)}return e.lazy&&t!==true?undefined:e.name}return e}function D(e,t){var n=e+".Component",i=sap.ui.getCore().getConfiguration().getDepCache(),r,o,a,s=function(e,t){return function(n){var i="Component-preload for this component does not exist.";d.warning("Couldn't preload component from "+e+": "+(n&&n.message||n),!t?i:i+" If the component is part of a library or another component, the configuration 'sap.app/embeddedBy' is not maintained. "+" The 'sap.app/embeddedBy' property must be relative path inside the deployment unit (library or component).","sap.ui.core.Component#preload")}};if(c&&e!=null&&!sap.ui.loader._.getModuleState(n.replace(/\./g,"/")+".js")){if(t){o=v._getTransitiveDependencyForComponent(e);if(o&&!o.hasOwnPreload){a=[o.library];Array.prototype.push.apply(a,o.dependencies);return sap.ui.getCore().loadLibraries(a,{preloadOnly:true}).catch(s(o.library,true))}else{r=n.replace(/\./g,"/")+(i?"-h2-preload.js":"-preload.js");return sap.ui.loader._.loadJSResourceAsync(r).catch(s(r,true))}}try{r=n+"-preload";sap.ui.requireSync(r.replace(/\./g,"/"))}catch(e){s(r,false)(e)}}else if(t){return Promise.resolve()}}function j(e,t,n){var i=[];var r=n?function(e){i.push(e)}:function(){};var o=t.getEntry("/sap.ui5/dependencies/libs");if(o){var a=[];for(var s in o){if(!o[s].lazy){a.push(s)}}if(a.length>0){d.info('Component "'+e+'" is loading libraries: "'+a.join(", ")+'"');r(sap.ui.getCore().loadLibraries(a,{async:n}))}}var u=t.getEntry("/sap.ui5/extends/component");if(u){r(D(u,n))}var c=[];var f=t.getEntry("/sap.ui5/dependencies/components");if(f){for(var p in f){if(!f[p].lazy){c.push(p)}}}var l=t.getEntry("/sap.ui5/componentUsages");if(l){for(var g in l){if(l[g].lazy===false&&c.indexOf(l[g].name)===-1){c.push(l[g].name)}}}if(c.length>0){c.forEach(function(e){r(D(e,n))})}return n?Promise.all(i):undefined}if(t.async){var N=t.asyncHints||{},x=[],R=function(e){e=e.then(function(e){return{result:e,rejected:false}},function(e){return{result:e,rejected:true}});return e},B=function(e){if(e){x.push(R(e))}},F=function(e){return e},H,L;H=[];if(Array.isArray(N.preloadBundles)){N.preloadBundles.forEach(function(e){H.push(sap.ui.loader._.loadJSResourceAsync(I(e,true),true))})}if(Array.isArray(N.libs)){L=N.libs.map(I).filter(F);H.push(sap.ui.getCore().loadLibraries(L,{preloadOnly:true}))}H=Promise.all(H);if(L&&!n.preloadOnly){H=H.then(function(){return sap.ui.getCore().loadLibraries(L)})}B(H);if(N.components){Object.keys(N.components).forEach(function(e){B(D(I(N.components[e]),true))})}if(!h){B(D(a,true))}else{var W=[];h=h.then(function(e){var t=e.getComponentName();if(typeof s==="string"){U(t,s)}e.defineResourceRoots();e._preprocess({resolveUI5Urls:true,i18nProperties:W});return e});if(n.createModels){B(h.then(function(e){var n=e.getComponentName();_=P(e);if(Object.keys(_.afterManifest).length>0){E._loadManifestModelClasses(_.afterManifest,n);var r=o({},e.getEntry("/sap.app/dataSources"));var a=E._createManifestModelConfigurations({models:_.afterManifest,dataSources:r,manifest:e,componentData:t.componentData,cacheTokens:N.cacheTokens,activeTerminologies:i});M=E._createManifestModels(a,n)}return e}))}B(h.then(function(e){var r=Promise.resolve();var a=e.getEntry("/sap.app/embeddedBy");var s=e.getComponentName();if(!a){r=D(s,true)}else if(!sap.ui.loader._.getModuleState(O()+".js")){d.warning("Component '"+s+"' is defined to be embedded in a library or another component"+"The relatively given preload for the embedding resource was not loaded before hand. "+"Please make sure to load the embedding resource containing this Component before instantiating.",undefined,"sap.ui.core.Component#embeddedBy")}return r.then(function(){return e._processI18n(true,W)}).then(function(){if(!n.createModels){return null}var r=Object.keys(_.afterPreload);if(r.length===0){return null}return new Promise(function(e,t){sap.ui.require(["sap/ui/model/resource/ResourceModel"],function(t){e(t)},t)}).then(function(a){var s=o({},e.getEntry("/sap.app/dataSources"));var u=E._createManifestModelConfigurations({models:_.afterPreload,dataSources:s,manifest:e,componentData:t.componentData,cacheTokens:N.cacheTokens,activeTerminologies:i});function c(t){var i=u[t];if(Array.isArray(i.settings)&&i.settings.length>0){var r=i.settings[0];r.activeTerminologies=n.activeTerminologies;return a.loadResourceBundle(r,true).then(function(e){r.bundle=e;delete r.terminologies;delete r.activeTerminologies;delete r.enhanceWith},function(n){d.error("Component Manifest: Could not preload ResourceBundle for ResourceModel. "+"The model will be skipped here and tried to be created on Component initialization.",'["sap.ui5"]["models"]["'+t+'"]',e.getComponentName());d.error(n);delete u[t]})}else{return Promise.resolve()}}return Promise.all(r.map(c)).then(function(){if(Object.keys(u).length>0){var t=E._createManifestModels(u,e.getComponentName());if(!M){M={}}for(var n in t){M[n]=t[n]}}})})})}));C=function(e){if(typeof E._fnLoadComponentCallback==="function"){var n=r({},t);try{return E._fnLoadComponentCallback(n,e)}catch(t){d.error('Callback for loading the component "'+e.getComponentName()+'" run into an error. The callback was skipped and the component loading resumed.',t,"sap.ui.core.Component")}}}}return Promise.all(x).then(function(e){var t=[],n=false,i;n=e.some(function(e){if(e&&e.rejected){i=e.result;return true}t.push(e.result)});if(n){return Promise.reject(i)}return t}).then(function(e){if(h&&C){return h.then(C).then(function(){return e})}return e}).then(function(e){d.debug("Component.load: all promises fulfilled, then "+e);if(h){return h.then(function(e){if(!e._bLoadManifestRequestFailed){h=e;a=h.getComponentName();return j(a,h,true)}else{h=undefined;return h}})}else{return e}}).then(function(){if(n.preloadOnly){return true}return new Promise(function(e,t){sap.ui.require([O()],function(t){e(t)},t)}).then(function(t){var r=t.getMetadata();var o=r.getComponentName();var a=T(o);var s;if(h&&typeof l!=="object"&&(typeof m==="undefined"||m===a)){r._applyManifest(JSON.parse(JSON.stringify(h.getRawJson())))}s=k(r);return s.then(function(){var o=Promise.resolve();if(!h&&Array.isArray(n.activeTerminologies)&&n.activeTerminologies.length>0){h=new e(r.getManifestObject().getRawJson(),{process:false,activeTerminologies:i});o=h._processI18n(true)}return o.then(A.bind(undefined,t))})})}).then(function(e){if(!h){return e}var t=[];var n;var i=h.getEntry("/sap.ui5/rootView");if(typeof i==="string"){n="XML"}else if(i&&typeof i==="object"&&i.type){n=i.type}if(n&&y[n]){var r="sap/ui/core/mvc/"+y[n]+"View";t.push(r)}var a=h.getEntry("/sap.ui5/routing");if(a){if(a.routes){var s=h.getEntry("/sap.ui5/routing/config/routerClass")||"sap.ui.core.routing.Router";var u=s.replace(/\./g,"/");t.push(u)}else if(a.targets){var c=h.getEntry("/sap.ui5/routing/config/targetsClass")||"sap.ui.core.routing.Targets";var f=c.replace(/\./g,"/");t.push(f);t.push("sap/ui/core/routing/Views")}}var p=o({},h.getEntry("/sap.ui5/models"));var l=o({},h.getEntry("/sap.app/dataSources"));var g=E._findManifestModelClasses({models:p,dataSources:l,componentName:h.getComponentName()});for(var m in g){if(!g.hasOwnProperty(m)){continue}var v=g[m];if(!v.type){continue}var M=v.type.replace(/\./g,"/");if(t.indexOf(M)===-1){t.push(M)}}if(t.length>0){return Promise.all(t.map(function(e){return new Promise(function(t,n){var i=false;function r(n){if(i){return}d.warning('Can not preload module "'+e+'". '+"This will most probably cause an error once the module is used later on.",h.getComponentName(),"sap.ui.core.Component");d.warning(n);i=true;t()}sap.ui.require([e],t,r)})})).then(function(){return e})}else{return e}}).then(function(e){var t=n.waitFor;if(t){var i=Array.isArray(t)?t:[t];return Promise.all(i).then(function(){return e})}return e}).catch(function(e){if(M){for(var t in M){var n=M[t];if(n&&typeof n.destroy==="function"){n.destroy()}}}throw e})}if(h){h.defineResourceRoots();h._preprocess({resolveUI5Urls:true});j(a,h)}D(a);return A(sap.ui.requireSync(O()))}if(Math.sqrt(2)<1){sap.ui.require(["sap/ui/core/Core"],function(){})}E.prototype.getCommand=function(e){if(!this._mComputedCommands){var t=E.getCustomizing(this,{type:"sap.ui.commands"})||{},n=this._getManifestEntry("/sap.ui5/commands",true)||{},i=this.getMetadata().getComponentName(),r="",a=this.getExtensionComponent&&this.getExtensionComponent();if(a&&a.getLocalId){r="#"+(a.getLocalId(this.getId())||this.getId())}this._mComputedCommands=o({},n,t[i],t[i+r])}return e?this._mComputedCommands[e]:this._mComputedCommands};E.prototype.deactivate=function(){var e=E.getOwnerComponentFor(this);if(e&&e.isActive()){throw new Error("Component.deactivate must not be called on nested components.")}if(!this.isKeepAliveSupported()){d.warning("Deactivation of component failed. Component '"+this.getId()+"' does not support 'keepAlive'.");return}if(!this.isActive()){d.warning("Deactivation of component failed. Component '"+this.getId()+"' is already inactive.");return}this.onOwnerDeactivation();this._bIsActive=false;n.registry.filter(function(e){var t=E.getOwnerIdFor(e);if(t===this.getId()){u.suspend(e.getDomRef());return e.onOwnerDeactivation()}},this);E.registry.filter(function(e){var t=E.getOwnerIdFor(e);if(t===this.getId()){e.deactivate()}},this);if(this._oEventBus){this._oEventBus.suspend()}if(this.getRouter()){this.getRouter().stop()}if(typeof this.onDeactivate==="function"){this.onDeactivate()}};E.prototype.activate=function(){if(!this.isKeepAliveSupported()){d.warning("Activation of component failed. Component '"+this.getId()+"' does not support 'keepAlive'.");return}if(this.isActive()){d.warning("Activation of component failed. Component '"+this.getId()+"' is already active.");return}this.onOwnerActivation();this._bIsActive=true;n.registry.forEach(function(e){var t=E.getOwnerIdFor(e);if(t===this.getId()){u.resume(e.getDomRef());return e.onOwnerActivation()}},this);E.registry.forEach(function(e){var t=E.getOwnerIdFor(e);if(t===this.getId()){e.activate()}},this);if(this._oEventBus){this._oEventBus.resume()}if(this.getRouter()){this.getRouter().initialize()}if(typeof this.onActivate==="function"){this.onActivate()}};E.prototype.isKeepAliveSupported=function(){var e=this._oKeepAliveConfig&&this._oKeepAliveConfig.supported;if(e){e=E.registry.filter(function(e){var t=E.getOwnerIdFor(e);if(t===this.getId()){return true}},this).every(function(e){return e.isKeepAliveSupported()},this)}return!!e};E.prototype.registerForDestroy=function(e){var t=this._getDestroyables();e=e.then(function(n){t.splice(t.indexOf(e),1);return n});t.push(e)};return E});