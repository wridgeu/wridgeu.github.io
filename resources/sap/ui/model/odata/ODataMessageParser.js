/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/odata/ODataMetadata","sap/ui/model/odata/ODataUtils","sap/ui/core/library","sap/ui/thirdparty/URI","sap/ui/core/message/MessageParser","sap/ui/core/message/Message","sap/base/Log"],function(e,r,t,s,a,i,n){"use strict";var o="sap.ui.model.odata.ODataMessageParser",u=/^\/+|\/$/g,d=t.MessageType,c={error:d.Error,info:d.Information,success:d.Success,warning:d.Warning};var h=a.extend("sap.ui.model.odata.ODataMessageParser",{metadata:{publicMethods:["parse","setProcessor","getHeaderField","setHeaderField"]},constructor:function(e,r,t){a.apply(this);this._serviceUrl=p(this._parseUrl(e).url);this._metadata=r;this._headerField="sap-message";this._lastMessages=[];this._bPersistTechnicalMessages=t}});h.prototype.getHeaderField=function(){return this._headerField};h.prototype.setHeaderField=function(e){this._headerField=e;return this};h.prototype.parse=function(e,r,t,s,a){var i,u,d=String(e.statusCode);if(r.method==="GET"&&d==="204"){return}u={request:r,response:e,url:r.requestUri};if(e.statusCode>=200&&e.statusCode<300){i=this._parseHeader(e,u)}else if(e.statusCode>=400&&e.statusCode<600){try{i=this._parseBody(e,u);this._logErrorMessages(i,r,d)}catch(e){i=this._createGenericError(u);n.error("Request failed with status code "+d+": "+r.method+" "+r.requestUri,e,o)}}else{i=this._createGenericError(u);n.error("Request failed with unsupported status code "+d+": "+r.method+" "+r.requestUri,undefined,o)}if(r.method==="GET"&&d==="424"){return}this._propagateMessages(i,u,t,s,!a)};h.prototype._getAffectedTargets=function(e,r,t,s){var a=Object.assign({"":true},t,s),i,n=this._parseUrl(r.url).url;if(r.request.key&&r.request.created){a[r.request.key]=true}if(n.startsWith(this._serviceUrl)){n=n.slice(this._serviceUrl.length+1)}i=this._metadata._getEntitySetByPath(n);if(i){a[i.name]=true}e.forEach(function(e){e.getTargets().forEach(function(e){var r,t,s;if(!e){return}s=e.replace(u,"");a[s]=true;t=s.lastIndexOf("/");if(t>0){r=s.slice(0,t);a[r]=true}})});return a};h.prototype._propagateMessages=function(r,t,s,a,i){var d,c=t.request.deepPath,h=[],l,f=c&&t.request.updateAggregatedMessages,p=t.request.headers&&t.request.headers["sap-messages"]==="transientOnly",g=[],y=e._returnsCollection(t.request.functionMetadata),_,m,v;function M(e,r){return r.some(function(e){return d[e]})||f&&e.aFullTargets.some(function(e){if(y){return l.some(function(r){var t=r.slice(r.indexOf("("));return e.startsWith(c+t)})}else{return e.startsWith(c)}})}s=s||{};if(p){h=this._lastMessages;_=r.some(function(e){return!e.getPersistent()&&!e.getTechnical()});if(_){n.error("Unexpected non-persistent message in response, but requested only "+"transition messages",undefined,o)}}else{d=this._getAffectedTargets(r,t,s,a);l=Object.keys(s);m=t.response.statusCode;v=m>=200&&m<300;this._lastMessages.forEach(function(e){var r=e.getTargets().map(function(e){e=e.replace(u,"");var r=e.lastIndexOf(")/");if(r>0){e=e.substr(0,r+1)}return e});if(v||i){if(!e.getPersistent()&&M(e,r)){g.push(e)}else{h.push(e)}}else if(!e.getPersistent()&&e.getTechnical()&&M(e,r)){g.push(e)}else{h.push(e)}})}this.getProcessor().fireMessageChange({oldMessages:g,newMessages:r});this._lastMessages=h.concat(r)};h.prototype._createMessage=function(e,r,t){var s=e.target&&e.target.indexOf("/#TRANSIENT#")===0||e.transient||e.transition||t&&this._bPersistTechnicalMessages,a,n=typeof e.message==="object"?e.message.value:e.message,o=e["@sap.severity"]||e.severity;e.transition=!!s;a=this._createTargets(e,r,t);return new i({code:e.code||"",description:e.description,descriptionUrl:e.longtext_url||"",fullTarget:a.aDeepPaths,message:n,persistent:!!s,processor:this._processor,target:a.aTargets,technical:t,technicalDetails:{headers:r.response.headers,statusCode:r.response.statusCode},type:c[o]||o})};h._isResponseForCreate=function(e){var r=e.request,t=e.response;if(r.method==="POST"&&t.statusCode==201&&t.headers["location"]){return true}if(r.key&&r.created&&t.statusCode>=400){return false}return undefined};h.prototype._createTarget=function(e,t,s,a){var i,n,o,u,d,c,l,f,p,g=t.request,y=t.response;if(e===undefined&&(!s&&g.headers["sap-message-scope"]==="BusinessObject"||s&&a)){return{deepPath:"",target:""}}e=e||"";e=e.startsWith("/#TRANSIENT#")?e.slice(12):e;if(e[0]!=="/"){n=h._isResponseForCreate(t);o=g.deepPath||"";if(n===true){p=y.headers["location"]}else if(n===false){p=g.key}else{p=t.url}f=this._parseUrl(p);l=f.url;u=l.indexOf(this._serviceUrl);if(u>-1){c=l.slice(u+this._serviceUrl.length)}else{c="/"+l}if(!n&&g.functionMetadata){c=g.functionTarget}if(c.slice(c.lastIndexOf("/")).indexOf("(")>-1||!this._metadata._isCollection(c)){o=e?o+"/"+e:o;e=e?c+"/"+e:c}else{o=o+e;e=c+e}}i=this._processor.resolve(e,undefined,true);while(i&&i.lastIndexOf("/")>0&&i!==d){d=i;i=this._processor.resolve(i,undefined,true)||d}e=i||e;return{deepPath:this._metadata._getReducedPath(o||e),target:r._normalizeKey(e)}};h.prototype._createTargets=function(e,r,t){var s=[],a=Array.isArray(e.additionalTargets)?[e.target].concat(e.additionalTargets):[e.target],i,u=[],d=this;if(e.propertyref!==undefined&&a[0]!==undefined){n.warning("Used the message's 'target' property for target calculation; the property"+" 'propertyref' is deprecated and must not be used together with 'target'",r.url,o)}else if(a[0]===undefined){a[0]=e.propertyref}a.forEach(function(a){i=d._createTarget(a,r,t,e.transition);s.push(i.deepPath);u.push(i.target)});return{aDeepPaths:s,aTargets:u}};h.prototype._parseHeader=function(e,r){var t,s,a,i,o=this.getHeaderField(),u=[];if(!e.headers){return u}for(s in e.headers){if(s.toLowerCase()===o.toLowerCase()){o=s}}if(!e.headers[o]){return u}a=e.headers[o];try{i=JSON.parse(a);u.push(this._createMessage(i,r));if(Array.isArray(i.details)){for(t=0;t<i.details.length;t+=1){u.push(this._createMessage(i.details[t],r))}}}catch(e){n.error("The message string returned by the back-end could not be parsed: '"+e.message+"'");return u}return u};h.prototype._parseBody=function(e,r){var t=l(e);return t&&t.indexOf("xml")>-1?this._parseBodyXML(e,r,t):this._parseBodyJSON(e,r)};h.prototype._createGenericError=function(e){return[this._createMessage({description:e.response.body,message:sap.ui.getCore().getLibraryResourceBundle().getText("CommunicationError"),severity:d.Error,transition:true},e,true)]};h.prototype._getBodyMessages=function(e,r,t){var s=t.request.headers["Content-ID"],a=[],i=this._createMessage(e,t,true),n=this;r.forEach(function(e){var r=n._createMessage(e,t,true);if(i&&i.getCode()===r.getCode()&&i.getMessage()===r.getMessage()){i=undefined}if(!s||!e.ContentID||s===e.ContentID){a.push(r)}});if(i){a.unshift(i)}return a};h.prototype._logErrorMessages=function(e,r,t){var s=e.length?JSON.stringify(e.map(function(e){return{code:e.getCode(),message:e.getMessage(),persistent:e.getPersistent(),targets:e.getTargets(),type:e.getType()}})):"Another request in the same change set failed";n.error("Request failed with status code "+t+": "+r.method+" "+r.requestUri,s,o)};h.prototype._parseBodyXML=function(e,r,t){var s,a,i,n,o,u,c,h=(new DOMParser).parseFromString(e.body,t),l=g(h,["error","errordetail"]),f=[];if(!l.length){return this._createGenericError(r)}for(n=0;n<l.length;n+=1){c=l[n];i={};i.severity=d.Error;for(u=0;u<c.childNodes.length;u+=1){s=c.childNodes[u];a=s.nodeName;if(a==="errordetails"||a==="details"||a==="innererror"||a==="#text"){continue}if(a==="message"&&s.hasChildNodes()&&s.firstChild.nodeType!==window.Node.TEXT_NODE){for(o=0;o<s.childNodes.length;o+=1){if(s.childNodes[o].nodeName==="value"){i.message=s.childNodes[o].text||s.childNodes[o].textContent}}}else{i[s.nodeName]=s.text||s.textContent}}f.push(i)}return this._getBodyMessages(f[0],f.slice(1),r)};h.prototype._parseBodyJSON=function(e,r){var t,s,a=JSON.parse(e.body);if(a.error){s=a.error}else{s=a["odata.error"]}if(!s){n.error("Error message returned by server did not contain error-field");return this._createGenericError(r)}s.severity=d.Error;if(Array.isArray(s.details)){t=s.details}else if(s.innererror&&Array.isArray(s.innererror.errordetails)){t=s.innererror.errordetails}else{t=[]}return this._getBodyMessages(s,t,r)};h.prototype._parseUrl=function(e){var r={url:e,parameters:{},hash:""};var t=-1;t=e.indexOf("#");if(t>-1){r.hash=r.url.substr(t+1);r.url=r.url.substr(0,t)}t=e.indexOf("?");if(t>-1){var a=r.url.substr(t+1);r.parameters=s.parseQuery(a);r.url=r.url.substr(0,t)}return r};h.prototype._setPersistTechnicalMessages=function(e){this._bPersistTechnicalMessages=e};function l(e){if(e&&e.headers){for(var r in e.headers){if(r.toLowerCase()==="content-type"){return e.headers[r].replace(/([^;]*);.*/,"$1")}}}return false}var f=document.createElement("a");function p(e){f.href=e;return s.parse(f.href).path}function g(e,r){var t=[];var s={};for(var a=0;a<r.length;a+=1){s[r[a]]=true}var i=e;while(i){if(s[i.tagName]){t.push(i)}if(i.hasChildNodes()){i=i.firstChild}else{while(!i.nextSibling){i=i.parentNode;if(!i||i===e){i=null;break}}if(i){i=i.nextSibling}}}return t}return h});