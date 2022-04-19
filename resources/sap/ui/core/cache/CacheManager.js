/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./LRUPersistentCache","./CacheManagerNOP","sap/ui/Device","sap/base/Log","sap/ui/performance/Measurement","sap/ui/performance/trace/Interaction"],function(e,n,t,s,r,a){"use strict";var i={_instance:null,_getInstance:function(){var e,n=g("_getInstance"),t=this;e=new Promise(function(e,a){var u;s.debug("Cache Manager: Initialization...");if(!i._instance){u=t._findImplementation();r.start(o,"CM",c);u.init().then(d,a);r.end(o,"CM")}else{d(i._instance)}function d(t){i._instance=t;n.endAsync();s.debug("Cache Manager initialized with implementation ["+i._instance.name+"], resolving _getInstance promise");e(t)}});n.endSync();return e},_findImplementation:function(){if(d()&&this._isSupportedEnvironment()){return e}else{s.debug("UI5 Cache Manager is switched off");return n}},set:function(e,n){var t,r=g("set",e);s.debug("Cache Manager: Setting value of type["+typeof n+"] with key ["+e+"]");t=this._callInstanceMethod("set",arguments).then(function n(){s.debug("Cache Manager: Setting key ["+e+"] completed successfully");r.endAsync()},function(n){s.error("Cache Manager: Setting key ["+e+"] failed. Error:"+n);r.endAsync();throw n});r.endSync();return t},get:function(e){var n,t=a.notifyAsyncStep(),r=g("get",e);s.debug("Cache Manager: Getting key ["+e+"]");n=this._callInstanceMethod("get",arguments).then(function n(t){s.debug("Cache Manager: Getting key ["+e+"] done");r.endAsync();return t},function(n){s.debug("Cache Manager: Getting key ["+e+"] failed. Error: "+n);r.endAsync();throw n}).finally(t);r.endSync();return n},has:function(e){var n,t=g("has",e);s.debug("Cache Manager: has key ["+e+"] called");n=this._callInstanceMethod("has",arguments).then(function n(r){t.endAsync();s.debug("Cache Manager: has key ["+e+"] returned "+r);return r});t.endSync();return n},del:function(e){var n,t=g("del",e);s.debug("Cache Manager: del called.");n=this._callInstanceMethod("del",arguments).then(function e(){s.debug("Cache Manager: del completed successfully.");t.endAsync()},function(e){s.debug("Cache Manager: del failed. Error: "+e);t.endAsync();throw e});t.endSync();return n},reset:function(){var e,n=g("reset");s.debug("Cache Manager: Reset called.");e=this._callInstanceMethod("reset",arguments).then(function e(){s.debug("Cache Manager: Reset completed successfully.");n.endAsync()},function(e){s.debug("Cache Manager: Reset failed. Error: "+e);n.endAsync();throw e});n.endSync();return e},_switchOff:function(){var e=this;return Promise.resolve().then(function(){h(e);sap.ui.getCore().getConfiguration().setUI5CacheOn(false)})},_switchOn:function(){var e=this;return Promise.resolve().then(function(){var n=sap.ui.getCore().getConfiguration();if(!n.isUI5CacheOn()){h(e);sap.ui.getCore().getConfiguration().setUI5CacheOn(true)}return Promise.resolve()})},_callInstanceMethod:function(e,n){var t,a="[sync ] _callInstanceMethod";r.start(a,"CM",c);if(this._instance){s.debug("Cache Manager: calling instance...");return this._instance[e].apply(this._instance,n)}s.debug("Cache Manager: getting instance...");t=this._getInstance().then(function t(s){return s[e].apply(s,n)});r.end(a);return t},_isSupportedEnvironment:function(){var e=[];if(this._bSupportedEnvironment==undefined){e.push({system:t.system.SYSTEMTYPE.DESKTOP,browserName:t.browser.BROWSER.CHROME,browserVersion:49});e.push({system:t.system.SYSTEMTYPE.DESKTOP,browserName:t.browser.BROWSER.SAFARI,browserVersion:13});e.push({system:t.system.SYSTEMTYPE.TABLET,browserName:t.browser.BROWSER.SAFARI,browserVersion:13});e.push({system:t.system.SYSTEMTYPE.PHONE,browserName:t.browser.BROWSER.SAFARI,browserVersion:13});e.push({system:t.system.SYSTEMTYPE.TABLET,os:t.os.OS.ANDROID,browserName:t.browser.BROWSER.CHROME,browserVersion:80});e.push({system:t.system.SYSTEMTYPE.PHONE,os:t.os.OS.ANDROID,browserName:t.browser.BROWSER.CHROME,browserVersion:80});this._bSupportedEnvironment=e.some(function(e){var n=t.system[e.system],s=e.os?e.os===t.os.name:true,r=e.browserName===t.browser.name,a=t.browser.version>=e.browserVersion;try{return n&&s&&r&&a&&window.indexedDB}catch(e){return false}})}return this._bSupportedEnvironment}};var c="CacheManager",o="[sync ] _initImplementation",u=0;function d(){return sap.ui.getCore().getConfiguration().isUI5CacheOn()}function h(e){if(e._instance){e._instance._destroy();e._instance=null}}function g(e,n){u++;var t="[async]  "+e+"["+n+"]- #"+u,s="[sync ]  "+e+"["+n+"]- #"+u;r.start(t,"CM",[c,e]);r.start(s,"CM",[c,e]);return{sMeasureAsync:t,sMeasureSync:s,endAsync:function(){r.end(this.sMeasureAsync)},endSync:function(){r.end(this.sMeasureSync)}}}return i});