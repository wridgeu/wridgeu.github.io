/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/Object","./EventBus","sap/base/assert"],function(e,t,i){"use strict";var n="sapUiIntervalTrigger-event";var s=e.extend("sap.ui.core.IntervalTrigger",{constructor:function(i){e.apply(this);this._oEventBus=new t;this._delayedCallId=null;this._trigger=r.bind(this);this._iInterval=0;if(i){this.setInterval(i)}}});var r=function(){if(this._delayedCallId){clearTimeout(this._delayedCallId);this._delayedCallId=null}var e=this._oEventBus._defaultChannel.hasListeners(n);if(this._iInterval>0&&e){this._oEventBus.publish(n);this._delayedCallId=setTimeout(this._trigger,this._iInterval)}};s.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments);if(this._delayedCallId){clearTimeout(this._delayedCallId);this._delayedCallId=null}delete this._trigger;this._oEventBus.destroy();delete this._oEventBus};s.prototype.setInterval=function(e){i(typeof e==="number","Interval must be an integer value");if(this._iInterval!==e){this._iInterval=e;this._trigger()}};s.prototype.addListener=function(e,t){this._oEventBus.subscribe(n,e,t);this._trigger()};s.prototype.removeListener=function(e,t){this._oEventBus.unsubscribe(n,e,t)};s.prototype.getInterface=function(){return this};var a=function(){var e=new s(200);a=function(){return e};return e};s.addListener=function(e,t){a().addListener(e,t)};s.removeListener=function(e,t){a().removeListener(e,t)};return s});
//# sourceMappingURL=IntervalTrigger.js.map