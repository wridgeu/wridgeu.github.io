/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../Control","../Element","./WebComponentMetadata","./WebComponentRenderer","sap/base/strings/hyphenate","sap/base/strings/camelize","../library","../LabelEnablement"],function(t,e,n,r,o,i,a,s){"use strict";var p=a.TextDirection;var u=function(t){if(t.id&&e.getElementById(t.id)){return e.getElementById(t.id)}};var f=function(t,e,n){if(e===undefined){e=0}if(n===undefined){n=2}if(t==null){return t}if(t instanceof window.HTMLElement){var r=u(t);return r?r:t}if(e<n){if(Array.isArray(t)){return t.map(f,e+1,n)}if(typeof t==="object"){var o={};for(var i in t){if(t.hasOwnProperty(i)){o[i]=f(t[i],e+1,n)}}return o}}return t};var d=t.extend("sap.ui.core.webc.WebComponent",{metadata:{stereotype:"webcomponent",abstract:true,library:"sap.ui.core",properties:{__isBusy:{type:"boolean",visibility:"hidden",defaultValue:false,mapping:{type:"property",to:"__is-busy"}}}},constructor:function(e,n){t.apply(this,arguments);this.__busyIndicatorTimeout=null;this.__onInvalidationBound=this.__onInvalidation.bind(this);this.__handleCustomEventBound=this.__handleCustomEvent.bind(this);this.__delegates={onBeforeRendering:this.__onBeforeRenderingDelegate,onAfterRendering:this.__onAfterRenderingDelegate};this.addDelegate(this.__delegates,true,this,false)},renderer:r},n);d.prototype._setSlot=function(t,e){var n=["tooltip","customData","layoutData","dependents","dragDropConfig"];if(t&&!n.includes(e)){var r=this.getMetadata().getAggregationSlot(e);t.__slot=r}};d.prototype._unsetSlot=function(t){if(t){delete t.__slot}};d.prototype.setAggregation=function(e,n,r){var o=t.prototype.setAggregation.apply(this,arguments);this._setSlot(n,e);return o};d.prototype.insertAggregation=function(e,n,r,o){var i=t.prototype.insertAggregation.apply(this,arguments);this._setSlot(n,e);return i};d.prototype.addAggregation=function(e,n,r){var o=t.prototype.addAggregation.apply(this,arguments);this._setSlot(n,e);return o};d.prototype.removeAggregation=function(e,n,r){var o=t.prototype.removeAggregation.apply(this,arguments);this._unsetSlot(o);return o};d.prototype.removeAllAggregation=function(e,n){var r=t.prototype.removeAllAggregation.apply(this,arguments);r.forEach(function(t){this._unsetSlot(t)},this);return r};d.prototype.__onBeforeRenderingDelegate=function(){this.__detachCustomEventsListeners()};d.prototype.__onAfterRenderingDelegate=function(){this.__attachCustomEventsListeners();var t=this.getDomRef();this.__updateObjectProperties(t);window.customElements.whenDefined(t.localName).then(function(){if(typeof t.attachInvalidate==="function"){t.attachInvalidate(this.__onInvalidationBound)}if(t._individualSlot){this.__slot=t._individualSlot}}.bind(this))};d.prototype.__updateObjectProperties=function(t){var e=this.getMetadata().getPropertiesByMapping("property");for(var n in e){if(this.isPropertyInitial(n)){continue}var r=e[n];var o=r.get(this);if(r.type==="object"||typeof o==="object"){var i=r._sMapTo?r._sMapTo:n;t[i]=o}}};d.prototype.setBusy=function(t){var e=this.getBusy();this.setProperty("busy",t,true);if(e!==t){if(t){this.__busyIndicatorTimeout=setTimeout(function(){this.setProperty("__isBusy",t)}.bind(this),this.getBusyIndicatorDelay())}else{this.setProperty("__isBusy",t);clearTimeout(this.__busyIndicatorTimeout)}}return this};d.prototype.__onInvalidation=function(t){if(t.type==="property"){var e=t.name;var n=t.newValue;var r=this.getMetadata().getProperty(e);if(r){this.setProperty(e,n,true)}}};d.prototype.__attachCustomEventsListeners=function(){var t=this.getMetadata().getEvents();for(var e in t){var n=o(e);this.getDomRef().addEventListener(n,this.__handleCustomEventBound)}};d.prototype.__detachCustomEventsListeners=function(){var t=this.getDomRef();if(!t){return}var e=this.getMetadata().getEvents();for(var n in e){if(e.hasOwnProperty(n)){var r=o(n);t.removeEventListener(r,this.__handleCustomEventBound)}}};d.prototype.__handleCustomEvent=function(t){var e=t.type;var n=i(e);var r=this.__formatEventData(t.detail);var o=this.getMetadata().getEvent(n);var a=!o.fire(this,r);if(a){t.preventDefault()}};d.prototype.__formatEventData=function(t){if(typeof t==="object"){return f(t)}return{}};d.prototype.__callPublicMethod=function(t,n){if(!this.getDomRef()){throw new Error("Method called before custom element has been created by: "+this.getId())}var r=Array.from(n).map(function(t){if(t instanceof e){return t.getDomRef()}return t});var o=this.getDomRef()[t].apply(this.getDomRef(),r);if(typeof o==="object"){o=f(o)}return o};d.prototype.__callPublicGetter=function(t){if(!this.getDomRef()){throw new Error("Getter called before custom element has been created by: "+this.getId())}var e=this.getDomRef()[t];if(typeof e==="object"){e=f(e)}return e};d.prototype.destroy=function(){var e=this.getDomRef();this.__detachCustomEventsListeners();if(e&&typeof e.detachInvalidate==="function"){e.detachInvalidate(this.__onInvalidationBound)}return t.prototype.destroy.apply(this,arguments)};d.prototype._mapEnabled=function(t){return!t};d.prototype._mapTextDirection=function(t){if(t===p.Inherit){return null}return t.toLowerCase()};d.prototype._getAriaLabelledByForRendering=function(t){var e=s.getReferencingLabels(this);if(Array.isArray(t)){t.forEach(function(t){if(e.indexOf(t)<0){e.unshift(t)}})}return e.join(" ")};return d});
//# sourceMappingURL=WebComponent.js.map