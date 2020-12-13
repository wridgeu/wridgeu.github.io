/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./Template","./TemplateControl","sap/ui/thirdparty/handlebars","sap/ui/base/ManagedObject","sap/base/util/ObjectPath","sap/base/security/encodeXML","sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject"],function(e,t,a,r,n,i,o,s,h){"use strict";var l=t.extend("sap.ui.core.tmpl.HandlebarsTemplate",{metadata:{library:"sap.ui.core"},constructor:function(e,a){t.apply(this,arguments)}});t.registerType("text/x-handlebars-template","sap.ui.core.tmpl.HandlebarsTemplate");function p(e){for(var t in e){e[t]=e[t].replace("&gt;",">").replace("&lt;","<").replace("&quot;",'"').replace("&amp;","&")}}function g(e,t){var a=/^((\w+)>)?(.*)/,r=a.exec(e),n=r[2],i=a.exec(t),o=i[2];var r=a.exec(e);if(t&&n==o){return t+r[3]}else{return e}}l.RENDER_HELPERS=function(){var e=r.helpers["each"],t=r.helpers["with"],a=r.helpers["if"],s=r.helpers["unless"],l=sap.ui.getCore().createRenderManager();l.renderControl=function(e){this.writeControlData(e);this.writeClasses(e);this.writeStyles(e)};var f={each:function(t,a){a=a||t;if(!a.hash.path){return e.apply(this,arguments)}else{p(a.hash);var n=a.data.renderManager,i=a.data.rootControl,o=a.data.path,s=a.data.parentControl,h=g(a.hash.path,o),l=i.bindList(h),f=[],u;if(a.data){u=r.createFrame(a.data)}if(l){for(var d in l){if(u){u.renderManager=n;u.rootControl=i;u.path=h+"/"+d+"/";u.parentControl=s}f.push(a.fn({},{data:u}))}}if(!s){return new r.SafeString(f.join(""))}}},with:function(e,a){a=a||e;if(!a.hash.path){return t.apply(this,arguments)}},if:function(e,t){t=t||e;if(!t.hash.path){return a.apply(this,arguments)}else{p(t.hash);var r=t.data.rootControl,n=t.data.path,i=g(t.hash.path,n);if(i){var o=r.bindProp(i);if(o){return t.fn(this)}else{return t.inverse(this)}}}},unless:function(e,t){t=t||e;if(!t.hash.path){return s.apply(this,arguments)}else{p(t.hash);var a=t.data.rootControl,r=t.data.path,n=g(t.hash.path,r);if(n){var i=a.bindProp(n);if(!i){return t.fn(this)}else{return t.inverse(this)}}}},text:function(e,t){t=t||e;p(t.hash);var a=t.data.rootControl,n=t.data.path,i=g(t.hash.path,n);if(i){var s=a.bindProp(i);return s&&new r.SafeString(o(s))}else{throw new Error('The expression "text" requires the option "path"!')}},element:function(e,t){t=t||e;p(t.hash);var a=t.data.renderManager,n=t.data.rootControl,i=n.createDOMElement(t.hash,t.data.path),o=t.data.parentElement;if(t.fn){t.fn({},{data:{renderManager:a,rootControl:n,parentElement:i}})}if(o){o.addElement(i);return}return new r.SafeString(a.getHTML(i))},control:function(e,t){t=t||e;p(t.hash);var a=t.data.renderManager,o=t.data.control;if(o){return new r.SafeString(a.getHTML(o))}var s=t.data.rootControl,l=t.data.path,g=t.data.children,f=t.hash["sap-ui-type"],u=i.get(f||""),d=u&&u.getMetadata(),c=t.hash["sap-ui-default-aggregation"]||d&&d.getDefaultAggregationName(),v=t.data.view;if(!u){throw new Error("Control of type "+f+" cannot be found.")}var m={};if(t.fn){t.fn({},{data:{rootControl:s,path:l,children:m,defaultAggregation:c,view:v}})}var C=Object.assign({},t.hash),w;for(var y in C){if(y==="sap-ui-class"&&typeof C[y]==="string"){w=C["sap-ui-class"]&&C["sap-ui-class"].split(" ");delete C[y]}else if(m[y]){delete C[y]}}var b=s.createControl(C,t.data.path,!!g,v);if(w&&w.length>0){w.forEach(b.addStyleClass.bind(b))}if(!h(m)){C=t.hash;var M=d.getAllAggregations();for(var E in m){var S=m[E];for(var T=0,A=S.length;T<A;T++){var j=S[T],x=M[E],H=x&&x.multiple;if(typeof C[E]==="string"){var L=n.bindingParser(C[E],v&&v.getController());L.template=j;b.bindAggregation(E,L)}else{if(H){b.addAggregation(E,j)}else{b.setAggregation(E,j)}}}}}if(g){var E=t.hash["sap-ui-aggregation"]||t.data.defaultAggregation;g[E]=g[E]||[];g[E].push(b);return}return new r.SafeString(a.getHTML(b))},property:function(e,t){t=t||e;p(t.hash);var a=t.data.rootControl,r=a.getMetadata(),n=t.hash.name,i=r.getProperty(n)._sGetter;return a[i]()},aggregation:function(e,t){t=t||e;p(t.hash);if(t.data.children){var a=t.hash.name;if(t.fn){var n=Object.assign({},t.data,{defaultAggregation:a});t.fn({},{data:n})}}else{var i=t.data.renderManager,o=t.data.rootControl,s=o.getMetadata(),a=t.hash.name,h=s.getAggregation(a)._sGetter,l=[];var g=o[h]();if(g){for(var f=0,u=g.length;f<u;f++){if(t.fn){l.push(t.fn({},{data:{renderManager:i,rootControl:o,control:g[f]}}))}else{l.push(i.getHTML(g[f]))}}}return new r.SafeString(l.join(""))}},event:function(e,t){t=t||e},controlData:function(e,t){t=t||e;var a=t.data.rootControl;return new r.SafeString(l.getHTML(a))}};return f}();l.prototype.createMetadata=function(){var e=this.getContent(),t=this._fnTemplate=this._fnTemplate||r.compile(e);var n={},i=a.getMetadata().getAllSettings(),o=a.getMetadata().getAllPrivateAggregations();var s={property:function(e,t){t=t||e;p(t.hash);var a=t.hash.name;if(a&&a!=="id"&&!i[a]){n.properties=n.properties||{};n.properties[a]=Object.assign({},{type:"string"},t.hash)}else{throw new Error('The property name "'+a+'" is reserved.')}},aggregation:function(e,t){t=t||e;p(t.hash);var a=t.hash.name;if(a&&!i[a]&&!o[a]){t.hash.multiple=t.hash.multiple=="true";n.aggregations=n.aggregations||{};n.aggregations[a]=Object.assign({},t.hash)}else{throw new Error('The aggregation name "'+a+'" is reserved.')}},event:function(e,t){t=t||e},controlData:function(e,t){t=t||e;n._hasControlData=true}};["each","if","unless","with"].forEach(function(e){s[e]=function(){}});t({},{helpers:s});return n};l.prototype.createRenderer=function(e){var t=this.getContent(),a=this._fnTemplate=this._fnTemplate||r.compile(t);var n=function(t,r){var n=a(r.getContext()||{},{data:{renderManager:t,rootControl:r,view:e},helpers:l.RENDER_HELPERS});t.write(n)};return n};return l});