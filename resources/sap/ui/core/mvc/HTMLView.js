/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./View","./HTMLViewRenderer","./ViewType","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/core/DeclarativeSupport","sap/ui/model/resource/ResourceModel","sap/base/util/LoaderExtensions"],function(e,t,r,n,o,i,a,l){"use strict";var s=e.extend("sap.ui.core.mvc.HTMLView",{metadata:{library:"sap.ui.core"},renderer:t});s.create=function(t){var o=n({},t);o.type=r.HTML;return e.create(o)};sap.ui.htmlview=function(e,t){return sap.ui.view(e,t,r.HTML)};s._sType=r.HTML;s.asyncSupport=true;s._mTemplates={};s._mAllowedSettings={viewName:true,controller:true,viewContent:true,definition:true,controllerName:true,resourceBundleName:true,resourceBundleUrl:true,resourceBundleLocale:true,resourceBundleAlias:true};s._getTemplate=function(e,t){var r=this._getViewUrl(e);var n=this._mTemplates[r];if(!n){n=this._loadTemplate(e,t);if(t&&t.async){var o=this;return n.then(function(e){o._mTemplates[r]=e;return Promise.resolve(e)})}else{this._mTemplates[r]=n}}return t.async?Promise.resolve(n):n};s.prototype.getControllerName=function(){return this._controllerName};s._getViewUrl=function(e){return sap.ui.require.toUrl(e.replace(/\./g,"/"))+".view.html"};s._loadTemplate=function(e,t){var r=e.replace(/\./g,"/")+".view.html";return l.loadResource(r,t)};s.prototype.initViewSettings=function(e){if(!e){throw new Error("mSettings must be given")}if(e.viewName&&e.viewContent){throw new Error("View name and view content are given. There is no point in doing this, so please decide.")}else if(!e.viewName&&!e.viewContent){throw new Error("Neither view name nor view content is given. One of them is required.")}var t=this;function r(){t._oTemplate=document.createElement("div");if(typeof n==="string"){t._oTemplate.innerHTML=n}else{var r=n;var o=document.createDocumentFragment();for(var l=0;l<r.length;l++){o.appendChild(r.item(l))}t._oTemplate.appendChild(o)}var u=t._oTemplate.getElementsByTagName("template")[0];var c=t.getMetadata().getAllProperties();if(u){var m=u.getAttributeNames();for(var p=0;p<m.length;p++){var d=m[p];var v=i.convertAttributeToSettingName(d,t.getId());var f=u.getAttribute(d);var h=c[v];if(!e[v]){if(h){e[v]=i.convertValueToType(i.getPropertyDataType(h),f)}else if(s._mAllowedSettings[v]){e[v]=f}}}t._oTemplate=u}if(t._oTemplate.content){var o=t._oTemplate.content;t._oTemplate=document.createElement("div");t._oTemplate.appendChild(o)}if(e.controllerName){t._controllerName=e.controllerName}if((e.resourceBundleName||e.resourceBundleUrl)&&(!e.models||!e.models[e.resourceBundleAlias])){var g=new a({bundleName:e.resourceBundleName,bundleUrl:e.resourceBundleUrl,bundleLocale:e.resourceBundleLocale,async:e.async});var _=g.getResourceBundle();if(_ instanceof Promise){return _.then(function(){t.setModel(g,e.resourceBundleAlias)})}t.setModel(g,e.resourceBundleAlias)}}var n=e.viewContent;if(!n){n=s._getTemplate(e.viewName,{async:e.async})}if(e.async){return n.then(function(e){n=e;return r()})}r()};s.prototype.onControllerConnected=function(e){var t=this;o.runWithPreprocessors(function(){i.compile(t._oTemplate,t)},{settings:this._fnSettingsPreprocessor})};s.prototype.exit=function(){this._oTemplate=null;e.prototype.exit.call(this);if(this._connectedControls){for(var t=0;t<this._connectedControls.length;t++){this._connectedControls[t].destroy()}this._connectedControls=null}};s.prototype.connectControl=function(e){this._connectedControls=this._connectedControls||[];this._connectedControls.push(e)};return s});