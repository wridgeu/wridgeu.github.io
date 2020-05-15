/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./LRUPersistentCache","./CacheManagerNOP","sap/ui/Device","sap/base/Log","sap/ui/performance/Measurement","sap/ui/performance/trace/Interaction"],function(e,n,s,t,r,a){"use strict";var i={_instance:null,_getInstance:function(){var e,n=g("_getInstance"),s=this;e=new Promise(function(e,a){var u;t.debug("Cache Manager: Initialization...");if(!i._instance){u=s._findImplementation();r.start(c,"CM",o);u.init().then(h,a);r.end(c,"CM")}else{h(i._instance)}function h(s){i._instance=s;n.endAsync();t.debug("Cache Manager initialized with implementation ["+i._instance.name+"], resolving _getInstance promise");e(s)}});n.endSync();return e},_findImplementation:function(){if(h()&&this._isSupportedEnvironment()){return e}else{t.warning("UI5 Cache Manager is switched off");return n}},set:function(e,n){var s,r=g("set",e);t.debug("Cache Manager: Setting value of type["+typeof n+"] with key ["+e+"]");s=this._callInstanceMethod("set",arguments).then(function n(){t.debug("Cache Manager: Setting key ["+e+"] completed successfully");r.endAsync()},function(n){t.error("Cache Manager: Setting key ["+e+"] failed. Error:"+n);r.endAsync();throw n});r.endSync();return s},get:function(e){var n,s=a.notifyAsyncStep(),r=g("get",e);t.debug("Cache Manager: Getting key ["+e+"]");n=this._callInstanceMethod("get",arguments).then(function n(s){t.debug("Cache Manager: Getting key ["+e+"] done");r.endAsync();return s},function(n){t.debug("Cache Manager: Getting key ["+e+"] failed. Error: "+n);r.endAsync();throw n}).finally(s);r.endSync();return n},has:function(e){var n,s=g("has",e);t.debug("Cache Manager: has key ["+e+"] called");n=this._callInstanceMethod("has",arguments).then(function n(r){s.endAsync();t.debug("Cache Manager: has key ["+e+"] returned "+r);return r});s.endSync();return n},del:function(e){var n,s=g("del",e);t.debug("Cache Manager: del called.");n=this._callInstanceMethod("del",arguments).then(function e(){t.debug("Cache Manager: del completed successfully.");s.endAsync()},function(e){t.debug("Cache Manager: del failed. Error: "+e);s.endAsync();throw e});s.endSync();return n},reset:function(){var e,n=g("reset");t.debug("Cache Manager: Reset called.");e=this._callInstanceMethod("reset",arguments).then(function e(){t.debug("Cache Manager: Reset completed successfully.");n.endAsync()},function(e){t.debug("Cache Manager: Reset failed. Error: "+e);n.endAsync();throw e});n.endSync();return e},_switchOff:function(){var e=this;return Promise.resolve().then(function(){d(e);sap.ui.getCore().getConfiguration().setUI5CacheOn(false)})},_switchOn:function(){var e=this;return Promise.resolve().then(function(){var n=sap.ui.getCore().getConfiguration();if(!n.isUI5CacheOn()){d(e);sap.ui.getCore().getConfiguration().setUI5CacheOn(true)}return Promise.resolve()})},_callInstanceMethod:function(e,n){var s,a="[sync ] _callInstanceMethod";r.start(a,"CM",o);if(this._instance){t.debug("Cache Manager: calling instance...");return this._instance[e].apply(this._instance,n)}t.debug("Cache Manager: getting instance...");s=this._getInstance().then(function s(t){return t[e].apply(t,n)});r.end(a);return s},_isSupportedEnvironment:function(){var e=[];if(this._bSupportedEnvironment==undefined){e.push({system:s.system.SYSTEMTYPE.DESKTOP,browserName:s.browser.BROWSER.CHROME,browserVersion:49});e.push({system:s.system.SYSTEMTYPE.DESKTOP,browserName:s.browser.BROWSER.INTERNET_EXPLORER,browserVersion:11});e.push({system:s.system.SYSTEMTYPE.DESKTOP,browserName:s.browser.BROWSER.EDGE,browserVersion:80});e.push({system:s.system.SYSTEMTYPE.DESKTOP,os:s.os.OS.WINDOWS,browserName:s.browser.BROWSER.FIREFOX,browserVersion:74});e.push({system:s.system.SYSTEMTYPE.DESKTOP,browserName:s.browser.BROWSER.SAFARI,browserVersion:13});e.push({system:s.system.SYSTEMTYPE.TABLET,browserName:s.browser.BROWSER.SAFARI,browserVersion:13});e.push({system:s.system.SYSTEMTYPE.PHONE,browserName:s.browser.BROWSER.SAFARI,browserVersion:13});e.push({system:s.system.SYSTEMTYPE.TABLET,os:s.os.OS.ANDROID,browserName:s.browser.BROWSER.CHROME,browserVersion:80});e.push({system:s.system.SYSTEMTYPE.PHONE,os:s.os.OS.ANDROID,browserName:s.browser.BROWSER.CHROME,browserVersion:80});this._bSupportedEnvironment=e.some(function(e){var n=s.system[e.system],t=e.os?e.os===s.os.name:true,r=e.browserName===s.browser.name,a=s.browser.version>=e.browserVersion;return n&&t&&r&&a&&window.indexedDB})}return this._bSupportedEnvironment}};var o="CacheManager",c="[sync ] _initImplementation",u=0;function h(){return sap.ui.getCore().getConfiguration().isUI5CacheOn()}function d(e){if(e._instance){e._instance._destroy();e._instance=null}}function g(e,n){u++;var s="[async]  "+e+"["+n+"]- #"+u,t="[sync ]  "+e+"["+n+"]- #"+u;r.start(s,"CM",[o,e]);r.start(t,"CM",[o,e]);return{sMeasureAsync:s,sMeasureSync:t,endAsync:function(){r.end(this.sMeasureAsync)},endSync:function(){r.end(this.sMeasureSync)}}}return i});