/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/ui/thirdparty/datajs","sap/ui/core/cache/CacheManager","./_ODataMetaModelUtils","sap/base/util/uid","sap/base/Log","sap/base/assert","sap/base/util/each","sap/ui/thirdparty/jquery"],function(t,e,a,n,i,s,r,o,p){"use strict";var h=t.extend("sap.ui.model.odata.ODataMetadata",{constructor:function(e,n){t.apply(this,arguments);this.bLoaded=false;this.bFailed=false;this.mEntityTypes={};this.mRequestHandles={};this.sUrl=e;this.bAsync=n.async;this.sUser=n.user;this.bWithCredentials=n.withCredentials;this.sPassword=n.password;this.mHeaders=n.headers;this.sCacheKey=n.cacheKey;this.oLoadEvent=null;this.oFailedEvent=null;this.oMetadata=null;this.bMessageScopeSupported=false;this.mNamespaces=n.namespaces||{sap:"http://www.sap.com/Protocols/SAPData",m:"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata","":"http://schemas.microsoft.com/ado/2007/06/edmx"};var i=this;this.fnResolve;this.pLoaded=new Promise(function(t,e){i.fnResolve=t});function r(t){a.set(i.sCacheKey,JSON.stringify({metadata:i.oMetadata,params:t}))}function o(t){s.error("[ODataMetadata] initial loading of metadata failed");if(t&&t.message){s.error("Error: "+t.message)}}if(this.sCacheKey){a.get(this.sCacheKey).then(function(t){if(t){var e=JSON.parse(t);this.oMetadata=e.metadata;this._handleLoaded(this.oMetadata,e.params,false)}else{this._loadMetadata().then(r).catch(o)}}.bind(this)).catch(o)}else{this._loadMetadata().catch(o)}},metadata:{publicMethods:["getServiceMetadata","attachFailed","detachFailed","attachLoaded","detachLoaded","refresh"]}});h.prototype._setNamespaces=function(t){this.mNamespaces=t};h.prototype._handleLoaded=function(t,e,a){var n=[];this.oMetadata=this.oMetadata?this.merge(this.oMetadata,t,n):t;this.oRequestHandle=null;e.entitySets=n;this.fnResolve(e);if(this.bAsync&&!a){this.fireLoaded(this)}else if(!this.bAsync&&!a){this.bLoaded=true;this.bFailed=false;this.oLoadEvent=setTimeout(this.fireLoaded.bind(this,e),0)}};h.prototype._loadMetadata=function(t,a){var n=this;t=t||this.sUrl;var s=this._createRequest(t);return new Promise(function(t,r){var o;function p(e,i){if(!e||!e.dataServices){var r={message:"Invalid metadata document",request:s,response:i};h(r);return}n.sMetadataBody=i.body;n.oRequestHandle=null;var o={metadataString:n.sMetadataBody};var p=i.headers["Last-Modified"];if(p){o.lastModified=p}var c=i.headers["eTag"];if(c){o.eTag=c}n._handleLoaded(e,o,a);t(o)}function h(t){var e={message:t.message,request:t.request,response:t.response};if(t.response){e.statusCode=t.response.statusCode;e.statusText=t.response.statusText;e.responseText=t.response.body}if(o&&o.bSuppressErrorHandlerCall){return}if(n.bAsync){delete n.mRequestHandles[o.id]}r(e);if(n.bAsync&&!a){n.fireFailed(e)}else if(!n.bAsync&&!a){n.bFailed=true;n.oFailedEvent=setTimeout(n.fireFailed.bind(n,e),0)}}o=e.request(s,p,h,e.metadataHandler);if(n.bAsync){o.id=i();n.mRequestHandles[o.id]=o}})};h.prototype.refresh=function(){return this._loadMetadata()};h.prototype.getServiceMetadata=function(){return this.oMetadata};h.prototype.isLoaded=function(){return this.bLoaded};h.prototype.loaded=function(){return this.pLoaded};h.prototype.isFailed=function(){return this.bFailed};h.prototype.fireLoaded=function(t){this.bLoaded=true;this.bFailed=false;this.fireEvent("loaded",t);s.debug(this+" - loaded was fired");return this};h.prototype.attachLoaded=function(t,e,a){this.attachEvent("loaded",t,e,a);return this};h.prototype.detachLoaded=function(t,e){this.detachEvent("loaded",t,e);return this};h.prototype.fireFailed=function(t){this.bFailed=true;this.fireEvent("failed",t);return this};h.prototype.attachFailed=function(t,e,a){this.attachEvent("failed",t,e,a);return this};h.prototype.detachFailed=function(t,e){this.detachEvent("failed",t,e);return this};h.prototype._getEntityAssociationEnd=function(t,e){var a;if(!this._checkMetadataLoaded()){return null}this._mGetEntityAssociationEndCache=this._mGetEntityAssociationEndCache||{};a=t.namespace+"."+t.name+"/"+e;if(this._mGetEntityAssociationEndCache[a]===undefined){var i=t?n.findObject(t.navigationProperty,e):null,s=i?n.getObject(this.oMetadata.dataServices.schema,"association",i.relationship):null,r=s?n.findObject(s.end,i.toRole,"role"):null;this._mGetEntityAssociationEndCache[a]=r}return this._mGetEntityAssociationEndCache[a]};function c(t){var e={};for(var a=0;a<t.length;a++){var n=t[a];if(n.entityContainer){for(var i=0;i<n.entityContainer.length;i++){var s=n.entityContainer[i];if(s.entitySet){for(var r=0;r<s.entitySet.length;r++){if(s.entitySet[r].name!=null){e[s.entitySet[r].name]=s.entitySet[r]}}}}}}return e}h.prototype._findEntitySetByName=function(t){if(!this.mEntitySets){this.mEntitySets=c(this.oMetadata.dataServices.schema)}return this.mEntitySets[t]};h.prototype._getEntityTypeByPath=function(t){if(!t){r(undefined,"sPath not defined!");return null}if(this.mEntityTypes[t]){return this.mEntityTypes[t]}if(!this._checkMetadataLoaded()){return null}var e=t.replace(/^\/|\/$/g,""),a=e.split("/"),n=a.length,i,s,o,p,h=this;if(a[0].indexOf("(")!=-1){a[0]=a[0].substring(0,a[0].indexOf("("))}if(n>1){i=h._getEntityTypeByPath(a[0]);for(var c=1;c<a.length;c++){if(i){if(a[c].indexOf("(")!=-1){a[c]=a[c].substring(0,a[c].indexOf("("))}p=h._getEntityTypeByNavProperty(i,a[c]);if(p){i=p}o=i}}}else{s=this._splitName(this._getEntityTypeName(a[0]));o=this._getObjectMetadata("entityType",s.name,s.namespace);if(o){o.entityType=this._getEntityTypeName(a[0])}}if(!o){var f=a[a.length-1];var y=this._getFunctionImportMetadata(f,"GET");if(!y){y=this._getFunctionImportMetadata(f,"POST")}if(y&&y.entitySet){o=Object.assign({},this._getEntityTypeByPath(y.entitySet));if(o){o.entityType=this._getEntityTypeName(y.entitySet);o.isFunction=true}}}if(o){this.mEntityTypes[t]=o}return o};h.prototype._getEntityTypeByName=function(t){var e,a=this,n,i,s;if(!t){r(undefined,"sName not defined!");return null}s=this._splitName(t);i=s.namespace;n=s.name;if(!this._checkMetadataLoaded()){return null}if(this.mEntityTypes[t]){e=this.mEntityTypes[t]}else{p.each(this.oMetadata.dataServices.schema,function(s,r){if(r.entityType&&(!i||r.namespace===i)){p.each(r.entityType,function(i,s){if(s.name===n){e=s;a.mEntityTypes[t]=e;e.namespace=r.namespace;return false}})}})}return e};h.prototype._checkMetadataLoaded=function(){if(!this.oMetadata||p.isEmptyObject(this.oMetadata)){r(undefined,"No metadata loaded!");return false}return true};h.prototype._getAnnotation=function(t){var e,a,n,i,s,o,p;a=t.split("/#");i=a[1].split("/");if(!a[0]){s=this._getEntityTypeByName(i[0]);r(s,i[0]+" is not a valid EntityType");if(!s){return}o=a[1].substr(a[1].indexOf("/")+1);p=this._getPropertyMetadata(s,o);r(p,o+" is not a valid property path");if(!p){return}n=o.substr(o.indexOf(p.name));n=n.substr(n.indexOf("/")+1)}else{s=this._getEntityTypeByPath(a[0]);r(s,a[0]+" is not a valid path");if(!s){return}t=a[0].replace(/^\/|\/$/g,"");o=t;while(!p&&o.indexOf("/")>0){o=o.substr(o.indexOf("/")+1);p=this._getPropertyMetadata(s,o)}r(p,o+" is not a valid property path");if(!p){return}n=i.join("/")}e=this._getAnnotationObject(s,p,n);return e};h.prototype._getAnnotationObject=function(t,e,a){var n,i,s,r,o;if(!e){return}r=e;i=a.split("/");if(i[0].indexOf(".")>-1){return this._getV4AnnotationObject(t,e,i)}else{if(i.length>1){r=r[i[0]];if(!r&&e.extensions){for(var p=0;p<e.extensions.length;p++){var h=e.extensions[p];if(h.name==i[0]){r=h;break}}}a=i.splice(0,1);s=this._getAnnotationObject(t,r,i.join("/"))}else{if(i[0].indexOf("@")>-1){o=i[0].substr(1);n=o.split(":");s=r[n[0]];if(!s&&r.extensions){for(var p=0;p<r.extensions.length;p++){var h=r.extensions[p];if(h.name===n[1]&&h.namespace===this.mNamespaces[n[0]]){s=h.value;break}}}}else{n=i[0].split(":");s=r[n[0]];s=r[i[0]];if(!s&&r.extensions){for(var p=0;p<r.extensions.length;p++){var h=r.extensions[p];if(h.name===n[1]&&h.namespace===this.mNamespaces[n[0]]){s=h;break}}}}}}return s};h.prototype._getV4AnnotationObject=function(t,e,a){var n,i=[];if(a.length>1){r(a.length==1,"'"+a.join("/")+"' is not a valid annotation path");return}var s=t.namespace?t.namespace+".":"";s+=t.name+"/"+e.name;p.each(this.oMetadata.dataServices.schema,function(t,e){if(e.annotations){p.each(e.annotations,function(t,e){if(e.target===s&&!e.qualifier){i.push(e.annotation);return false}})}});if(i){p.each(i,function(t,e){p.each(e,function(t,e){if(e.term===a[0]){n=e}})})}return n};h.prototype._splitName=function(t){var e={};if(t){var a=t.lastIndexOf(".");e.name=t.substr(a+1);e.namespace=t.substr(0,a)}return e};h.prototype._getEntityTypeName=function(t){var e,a;if(t){a=this._findEntitySetByName(t);if(a){e=a.entityType}}return e};h.prototype._getObjectMetadata=function(t,e,a){var n;if(e&&a){p.each(this.oMetadata.dataServices.schema,function(i,s){if(s[t]&&s.namespace===a){p.each(s[t],function(t,a){if(a.name===e){n=a;n.namespace=s.namespace;return false}});return!n}})}return n};h.prototype.getUseBatch=function(){var t=false;p.each(this.oMetadata.dataServices.schema,function(e,a){if(a.entityContainer){p.each(a.entityContainer,function(e,a){if(a.extensions){p.each(a.extensions,function(e,a){if(a.name==="use-batch"&&a.namespace==="http://www.sap.com/Protocols/SAPData"){t=typeof a.value==="string"?a.value.toLowerCase()==="true":!!a.value;return false}})}})}});return t};h.prototype._getFunctionImportMetadataIterate=function(t,e){var a=[];o(this.oMetadata.dataServices.schema,function(n,i){if(i["entityContainer"]){o(i["entityContainer"],function(n,i){if(i["functionImport"]){o(i["functionImport"],function(n,i){if(t(i)){a.push(i);if(e){return false}}})}return!(e&&a.length===1)})}return!(e&&a.length===1)});return a};h.prototype._getFirstMatchingFunctionImportMetadata=function(t){var e=this._getFunctionImportMetadataIterate(t,true);return e.length===1?e[0]:null};h.prototype._getFunctionImportMetadataByName=function(t){if(t.indexOf("/")>-1){t=t.substr(t.indexOf("/")+1)}return this._getFunctionImportMetadataIterate(function(e){return e.name===t})};h.prototype._getFunctionImportMetadata=function(t,e){if(t.indexOf("/")>-1){t=t.substr(t.indexOf("/")+1)}return this._getFirstMatchingFunctionImportMetadata(function(a){return a.name===t&&a.httpMethod===e})};h.prototype._getEntityTypeByNavProperty=function(t,e){if(!t.navigationProperty){return undefined}for(var a=0;a<t.navigationProperty.length;++a){var n=t.navigationProperty[a];if(n.name===e){return this._getEntityTypeByNavPropertyObject(n)}}return undefined};h.prototype._getEntityTypeByNavPropertyObject=function(t){var e;var a=this._splitName(t.relationship);var n=this._getObjectMetadata("association",a.name,a.namespace);if(n){var i=n.end[0];if(i.role!==t.toRole){i=n.end[1]}var s=this._splitName(i.type);e=this._getObjectMetadata("entityType",s.name,s.namespace);if(e){e.entityType=i.type}}return e};h.prototype._getNavigationPropertyNames=function(t){var e=[];if(t.navigationProperty){p.each(t.navigationProperty,function(t,a){e.push(a.name)})}return e};h.prototype._getNavPropertyRefInfo=function(t,e){var a,n,i,s,r,p,h,c,f,y,u,d=this;o(t.navigationProperty,function(o,l){i=d._splitName(l.relationship);n=d._getObjectMetadata("association",i.name,i.namespace);if(!n||!n.referentialConstraint){return}p=n.referentialConstraint.dependent;f=n.end.find(function(t){return t.role===p.role});if(f.type!==t.namespace+"."+t.name){return}h=p.propertyRef.some(function(t){return t.name===e});if(!h){return}r=n.referentialConstraint.principal;c=r.role;s=d._getAssociationSetByAssociation(l.relationship);f=s.end.find(function(t){return t.role===c});y=f.entitySet;u=r.propertyRef.map(function(t){return t.name});a={name:l.name,entitySet:y,keys:u}});return a};h.prototype._getPropertyMetadata=function(t,e){var a,n=this;if(!t){return}e=e.replace(/^\/|\/$/g,"");var i=e.split("/");p.each(t.property,function(t,e){if(e.name===i[0]){a=e;return false}});if(i.length>1){if(!a){while(t&&i.length>1){t=this._getEntityTypeByNavProperty(t,i[0]);i.shift()}if(t){a=n._getPropertyMetadata(t,i[0])}}else if(!a.type.toLowerCase().startsWith("edm.")){var s=this._splitName(a.type);a=this._getPropertyMetadata(this._getObjectMetadata("complexType",s.name,s.namespace),i[1])}}return a};h.prototype.destroy=function(){delete this.oMetadata;var e=this;p.each(this.mRequestHandles,function(t,a){a.bSuppressErrorHandlerCall=true;a.abort();delete e.mRequestHandles[t]});if(!!this.oLoadEvent){clearTimeout(this.oLoadEvent)}if(!!this.oFailedEvent){clearTimeout(this.oFailedEvent)}t.prototype.destroy.apply(this,arguments)};h.prototype._fillElementCaches=function(){var t=this;if(this._entitySetMap||!this._checkMetadataLoaded()){return}this._entitySetMap={};this.oMetadata.dataServices.schema.forEach(function(e){(e.entityContainer||[]).forEach(function(e){(e.entitySet||[]).forEach(function(e){var a=t._getEntityTypeByName(e.entityType);a.__navigationPropertiesMap={};(a.navigationProperty||[]).forEach(function(t){a.__navigationPropertiesMap[t.name]=t});e.__entityType=a;t._entitySetMap[e.entityType]=e})})})};h.prototype._createRequest=function(t){var e={"sap-cancel-on-close":true},a={"Accept-Language":sap.ui.getCore().getConfiguration().getLanguageTag()};p.extend(e,this.mHeaders,a);var n={headers:e,requestUri:t,method:"GET",user:this.sUser,password:this.sPassword,async:this.bAsync};if(this.bAsync){n.withCredentials=this.bWithCredentials}return n};h.prototype._getEntitySetByPath=function(t){var e;this._fillElementCaches();e=this._getEntityTypeByPath(t);if(e){return this._entitySetMap[e.entityType]}};h.prototype._addUrl=function(t){var e=[].concat(t);return Promise.all(e.map(function(t){return this._loadMetadata(t,true)},this))};h.prototype.merge=function(t,e,a){var n=this;if(this.mEntitySets){delete this.mEntitySets}p.each(t.dataServices.schema,function(t,i){p.each(e.dataServices.schema,function(t,e){if(e.namespace===i.namespace){if(e.entityType){if(!n.mEntityTypeNames){n.mEntityTypeNames={};i.entityType.map(function(t){n.mEntityTypeNames[t.name]=true})}i.entityType=!i.entityType?[]:i.entityType;for(var s=0;s<e.entityType.length;s++){if(!(e.entityType[s].name in n.mEntityTypeNames)){i.entityType.push(e.entityType[s]);n.mEntityTypeNames[e.entityType[s].name]=true}}}if(i.entityContainer&&e.entityContainer){p.each(i.entityContainer,function(t,i){p.each(e.entityContainer,function(t,e){if(e.entitySet){if(e.name===i.name){if(!n.mEntitySetNames){n.mEntitySetNames={};i.entitySet.map(function(t){n.mEntitySetNames[t.name]=true})}i.entitySet=!i.entitySet?[]:i.entitySet;for(var s=0;s<e.entitySet.length;s++){if(!(e.entitySet[s].name in n.mEntitySetNames)){i.entitySet.push(e.entitySet[s]);n.mEntitySetNames[e.entitySet[s].name]=true}}e.entitySet.forEach(function(t){a.push(t)})}}})})}if(e.annotations){i.annotations=!i.annotations?[]:i.annotations;i.annotations=i.annotations.concat(e.annotations)}}})});return t};h.prototype._getEntitySetByType=function(t){var e=t.namespace+"."+t.name;var a=this.oMetadata.dataServices.schema;for(var n=0;n<a.length;++n){var i=a[n].entityContainer;if(i){for(var s=0;s<i.length;++s){var r=i[s].entitySet;if(r){for(var o=0;o<r.length;++o){if(r[o].entityType===e){return r[o]}}}}}}return null};h.prototype._calculateCanonicalPath=function(t){var e,a,n,i;if(t){a=t.lastIndexOf(")");if(a!==-1){i=t.substr(0,a+1);var s=this._getEntitySetByPath(i);if(s){if(s.__entityType.isFunction){e=t}else{n=t.split("/");if(i==="/"+n[1]){if(!(n[2]in s.__entityType.__navigationPropertiesMap)){e=t}}else{n=i.split("/");i="/"+s.name+n[n.length-1].substr(n[n.length-1].indexOf("("))+t.substr(a+1);if(i!==t){e=i}}}}}}return e};h.prototype._getAssociationSetByAssociation=function(t){var e=this.oMetadata.dataServices.schema;for(var a=0;a<e.length;++a){var n=e[a].entityContainer;if(n){for(var i=0;i<n.length;++i){var s=n[i].associationSet;if(s){for(var r=0;r<s.length;++r){if(s[r].association===t){return s[r]}}}}}}return null};h.prototype._isMessageScopeSupported=function(){var t=this.oMetadata.dataServices.schema,e,a;if(!this.bMessageScopeSupported&&t){for(var n=0;n<t.length;++n){a=t[n].entityContainer;if(a){for(var i=0;i<a.length;++i){e=a[i];if(e.extensions&&Array.isArray(e.extensions)){for(var s=0;s<e.extensions.length;++s){if(e.extensions[s].name==="message-scope-supported"&&e.extensions[s].namespace===this.mNamespaces.sap){if(e.extensions[s].value==="true"){this.bMessageScopeSupported=true;break}}}}}}}}return this.bMessageScopeSupported};h.prototype._isCollection=function(t){var e=false;var a=t.lastIndexOf("/");if(a>0){var n=t.substring(0,a);var i=this._getEntityTypeByPath(n);if(i){var s=this._getEntityAssociationEnd(i,t.substring(a+1));if(s&&s.multiplicity==="*"){e=true}}}else{e=true}return e};h.prototype._getReducedPath=function(t){var e,a,n,i,s,r,o,p=t.split("/"),h;if(p.length<4){return t}this._fillElementCaches();for(a=1;a<p.length-2;a+=1){h=this._getEntityTypeByPath(p.slice(0,a+1).join("/"));s=h&&h.__navigationPropertiesMap[p[a+1].split("(")[0]];if(!s){continue}o=p[a+2].split("(")[0];i=this._getEntityTypeByNavPropertyObject(s);r=i&&i.__navigationPropertiesMap[o];if(!r||s.relationship!==r.relationship){continue}n=p[a+2].slice(o.length);e=this._getEntityAssociationEnd(i,o);if(e.multiplicity!=="*"||n&&p[a].endsWith(n)){p.splice(a+1,2);return this._getReducedPath(p.join("/"))}}return p.join("/")};h.prototype.getKeyPropertyNamesByPath=function(t){var e,a,n=t.lastIndexOf("/");if(n>0){a=this._getEntityTypeByPath(t.slice(0,n));if(a){e=this._getEntityAssociationEnd(a,t.slice(n+1).split("(")[0]);a=e?this._getEntityTypeByName(e.type):undefined}}else{a=this._getEntityTypeByPath(t)}if(a){return a.key.propertyRef.map(function(t){return t.name})}};return h});