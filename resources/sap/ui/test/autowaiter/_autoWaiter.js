/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/ui/test/_OpaLogger","sap/ui/test/autowaiter/_XHRWaiter","sap/ui/test/autowaiter/_timeoutWaiter","sap/ui/test/autowaiter/_promiseWaiter","sap/ui/test/autowaiter/_navigationContainerWaiter","sap/ui/test/autowaiter/_UIUpdatesWaiter","sap/ui/test/autowaiter/_moduleWaiter"],function(t,e,i,a,r,n,o,u,s){"use strict";var f=[];var d=i.getLogger("sap.ui.test.autowaiter._autoWaiter");var c=e.extend("sap.ui.test.autowaiter._autoWaiter",{registerWaiter:function(t,e){return new Promise(function(i,a){if(typeof e==="string"){sap.ui.require([e],this._addWaiter(t,i,a),function(e){a("Failed to load waiter "+t+": "+e)})}else if(typeof e==="object"){this._addWaiter(t,i,a)(e)}}.bind(this))},hasToWait:function(){var t=false;f.forEach(function(e){if(!t&&e.waiter.isEnabled()&&e.waiter.hasPending()){t=true}});if(!t){d.timestamp("opa.autoWaiter.syncPoint");d.debug("AutoWaiter syncpoint")}return t},extendConfig:function(e){if(!t.isEmptyObject(e)){f.forEach(function(t){if(t.waiter.extendConfig){t.waiter.extendConfig(e[t.name])}})}},getWaiters:function(){return f.slice()},_addWaiter:function(t,e,i){e=e||function(){};i=i||function(){};return function(a){if(typeof a.hasPending!=="function"){i("Waiter "+t+" should have a hasPending method")}else if(typeof a.isEnabled!=="function"){i("Waiter "+t+" should have an isEnabled method")}else{var r;f.forEach(function(e){if(e.name===t){d.debug("Waiter with name "+t+" will be overridden!");r=true;e.waiter=a}});if(!r){f.push({name:t,waiter:a})}e(a)}}}});var p=new c;var W={xhrWaiter:a,timeoutWaiter:r,promiseWaiter:n,navigationWaiter:o,uiUpdatesWaiter:u,moduleWaiter:s};Object.keys(W).forEach(function(t){return p._addWaiter(t)(W[t])});return p},true);