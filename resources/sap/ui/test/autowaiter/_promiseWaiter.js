/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/autowaiter/_utils","sap/ui/thirdparty/jquery","sap/ui/test/autowaiter/_timeoutWaiter","./WaiterBase"],function(e,t,r,n){"use strict";var o=[];var i=window.Promise;var a=["resolve","reject","all","any","race","allSettled"];var u;var s=n.extend("sap.ui.test.autowaiter._promiseWaiter",{hasPending:function(){var e=o.filter(function(e){return!!e.pending&&!m(e)});if(e.length>0){var t="There are "+e.length+" pending promises\n";e.forEach(function(e){t+=g(e)});c._oHasPendingLogger.debug(t)}return e.length>0},_getDefaultConfig:function(){return t.extend({maxDelay:1e3},n.prototype._getDefaultConfig.call(this))},_getValidationInfo:function(){return t.extend({maxDelay:"numeric"},n.prototype._getValidationInfo.call(this))}});var c=new s;r._registerInitiatorResolverId(function(){return u?u.completorTimeoutId:undefined});function g(e){return"\nPromise: Args: "+e.args+"\n Stack: "+e.stack}function f(){var e=r._getInitiatorId();if(!e&&u){e=u.completorTimeoutId}return e}function l(){var e=r._getInitiatorId();return e}function p(t){var r={args:t,stack:e.resolveStackTrace(),pending:true,tooLate:false,initiatorTimeoutId:f(),longRunnerTimeoutId:setTimeout(function(){r.tooLate=true;r.pending=false;c._oLogger.trace("Long-running promise is ignored:"+g(r))},c._mConfig.maxDelay,"TIMEOUT_WAITER_IGNORE")};c._oLogger.trace("New pending promise:"+g(r));o.push(r);return r}function d(e){if(!e){return}e.completorTimeoutId=l();e.endTime=Date.now();if(e.tooLate){return}else{e.pending=false;c._oLogger.trace("Promise complete:"+g(e));clearTimeout(e.longRunnerTimeoutId)}}function m(e){if(e.initiatorTimeoutId&&r._isPolling(e.initiatorTimeoutId)){c._oLogger.trace("Polling promise is ignored:"+g(e));return true}return false}var v=function(t,r){var n;var o=function(o,i){var a=e.functionToString(t);if(window.ES6Promise&&a==="'function noop() {}'"){c._oLogger.trace("Ignoring internal constructor of ES6 Promise polyfill");return t(o,i)}else if(a==="'function () { [native code] }'"){c._oLogger.trace("Ignoring internal Promise constructor");return t(o,i)}else if(r==="PROMISE_WAITER_IGNORE"){c._oLogger.trace("Ignoring Promise marked to ignore");return t(o,i)}else{n=p(a);var u=function e(){d(n);o.apply(this,arguments)};var s=function e(){d(n);i.apply(this,arguments)};return t(u,s)}};var a=new i(o);function s(e){var t=e.then;e.then=function e(r,o){var i=r;if(r){var i=function e(){u=n;var t=r.apply(this,arguments);u=undefined;return t}}var a=t.apply(this,[i,o]);return a};return e}return s(a)};v.prototype=i.prototype;v.prototype.constructor=v;a.forEach(function(e){if(i[e]){v[e]=i[e]}});window.Promise=v;return c},true);
//# sourceMappingURL=_promiseWaiter.js.map