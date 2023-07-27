/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./DataType","./EventProvider","./ManagedObjectMetadata","./Object","./BindingInfo","sap/ui/util/ActivityDetection","sap/base/util/ObjectPath","sap/base/Log","sap/base/assert","sap/base/util/deepClone","sap/base/util/deepEqual","sap/base/util/uid","sap/base/util/extend","sap/base/util/isEmptyObject"],function(t,e,i,n,r,s,o,a,g,f,p,d,h,l){"use strict";var u;var c=Symbol("bindingInfoFactory");var y=Function.prototype.call.bind(Object.prototype.hasOwnProperty);var b=e.extend("sap.ui.base.ManagedObject",{metadata:{abstract:true,publicMethods:["getId","getMetadata","getModel","setModel","hasModel","bindProperty","unbindProperty","bindAggregation","unbindAggregation","bindObject","unbindObject","getObjectBinding"],library:"sap.ui.core",properties:{},aggregations:{},associations:{},events:{validationSuccess:{enableEventBubbling:true,parameters:{element:{type:"sap.ui.base.ManagedObject"},property:{type:"string"},type:{type:"sap.ui.model.Type"},newValue:{type:"any"},oldValue:{type:"any"}}},validationError:{enableEventBubbling:true,parameters:{element:{type:"sap.ui.base.ManagedObject"},property:{type:"string"},type:{type:"sap.ui.model.Type"},newValue:{type:"any"},oldValue:{type:"any"},message:{type:"string"}}},parseError:{enableEventBubbling:true,parameters:{element:{type:"sap.ui.base.ManagedObject"},property:{type:"string"},type:{type:"sap.ui.model.Type"},newValue:{type:"any"},oldValue:{type:"any"},message:{type:"string"}}},formatError:{enableEventBubbling:true,parameters:{element:{type:"sap.ui.base.ManagedObject"},property:{type:"string"},type:{type:"sap.ui.model.Type"},newValue:{type:"any"},oldValue:{type:"any"}}},modelContextChange:{}},specialSettings:{id:"sap.ui.core.ID",models:"object",bindingContexts:"object",objectBindings:"object",metadataContexts:"object",Type:{type:"string",visibility:"hidden"}}},constructor:function(i,n,r){var s=this;e.call(this);if(typeof i!=="string"&&i!==undefined){r=n;n=i;i=n&&n.id}if(!i){i=this.getMetadata().uid()}else{var o=b._fnIdPreprocessor;i=o?o.call(this,i):i;var a=u||(u=t.getType("sap.ui.core.ID"));if(!a.isValid(i)){throw new Error('"'+i+'" is not a valid ID.')}}this.sId=i;this.mProperties=this.getMetadata().createPropertyBag();this.mAggregations={};this.mAssociations={};this.oParent=null;this.aDelegates=[];this.aBeforeDelegates=[];this.iSuppressInvalidate=0;this.oPropagatedProperties=b._oEmptyPropagatedProperties;this.mSkipPropagation={};this._bIsOwnerActive=true;this.oModels={};this.aPropagationListeners=[];this.oBindingContexts={};this.mElementBindingContexts={};this.mBindingInfos={};this.mObjectBindingInfos={};this._oContextualSettings=b._defaultContextualSettings;this._sOwnerId=b._sOwnerId;(function(){var t=false;if(s.register){s.register()}try{if(s._initCompositeSupport){s._initCompositeSupport(n)}if(s.init){s.init()}s.applySettings(n,r);t=true}finally{if(!t&&s.deregister){s.deregister()}}})()}},i);Object.defineProperty(b,"bindingParser",{set:function(t){r.parse=t},get:function(){return r.parse}});function m(t){g(t===undefined||typeof t==="string"&&!/^(undefined|null)?$/.test(t),"sModelName must be a string or omitted")}var v=false;function P(t){if(!v){var e=Object.values(t)[0];if(e&&e.mixinBindingSupport){e.mixinBindingSupport(b.prototype);v=true}}}b.create=function(t,e,i){if(!t||t instanceof b||typeof t!=="object"||t instanceof String){return t}function n(t){if(typeof t==="function"){return t}if(typeof t==="string"){return o.get(t)}}var r=n(t.Type)||n(e&&e.type);if(typeof r==="function"){return new r(t,i)}var s="Don't know how to create a ManagedObject from "+t+" ("+typeof t+")";a.fatal(s);throw new Error(s)};b._fnIdPreprocessor=null;b._fnSettingsPreprocessor=null;b.runWithPreprocessors=function(t,e,i){g(typeof t==="function","fn must be a function");g(!e||typeof e==="object","oPreprocessors must be an object");var n={id:this._fnIdPreprocessor,settings:this._fnSettingsPreprocessor};e=e||{};this._fnIdPreprocessor=e.id;this._fnSettingsPreprocessor=e.settings;try{return t.call(i)}finally{this._fnIdPreprocessor=n.id;this._fnSettingsPreprocessor=n.settings}};b.runWithOwner=function(t,e,i){g(typeof t==="function","fn must be a function");var n=b._sOwnerId;try{b._sOwnerId=e;return t.call(i)}finally{b._sOwnerId=n}};b.prototype.applySettings=function(e,i){if(!e||l(e)){return this}var r=this,s=this.getMetadata(),o=s.getJSONKeys(),f=b.create,p=b._fnSettingsPreprocessor,d,h,u;function c(t){for(var e=0,n=t.length;e<n;e++){var s=t[e];if(Array.isArray(s)){c(s)}else{r[u._sMutator](f(s,u,i))}}}function y(t){r[u._sMutator](t[0],t[1],t[2])}function m(e){var i=t.getType(e),n=i&&i.getPrimitiveType().getName();return n==="object"||n==="any"}p&&p.call(this,e);if(e.metadataContexts&&this._processMetadataContexts){this._processMetadataContexts(e.metadataContexts,e)}if(e.models){if(typeof e.models!=="object"){throw new Error("models must be a simple object")}if(n.isA(e.models,"sap.ui.model.Model")){this.setModel(e.models)}else{for(d in e.models){this.setModel(e.models[d],d==="undefined"?undefined:d)}}}if(e.bindingContexts){if(typeof e.bindingContexts!=="object"){throw new Error("bindingContexts must be a simple object")}var v=e.bindingContexts;if(n.isA(v,"sap.ui.model.Context")){this.setBindingContext(e.bindingContexts)}else{for(d in e.bindingContexts){this.setBindingContext(e.bindingContexts[d],d==="undefined"?undefined:d)}}}if(e.objectBindings){if(typeof e.objectBindings!=="string"&&typeof e.objectBindings!=="object"){throw new Error("binding must be a string or simple object")}if(typeof e.objectBindings==="string"||e.objectBindings.path){this.bindObject(e.objectBindings)}else{for(d in e.objectBindings){e.objectBindings[d].model=d==="undefined"?undefined:d;this.bindObject(e.objectBindings[d])}}}for(d in e){h=e[d];if((u=o[d])!==undefined){var P;switch(u._iKind){case 0:P=this.extractBindingInfo(h,i,!m(u.type));if(P&&typeof P==="object"){this.bindProperty(d,P)}else{this[u._sMutator](typeof P==="string"?P:h)}break;case 1:P=u.altTypes&&this.extractBindingInfo(h,i,!u.altTypes.some(m));if(P&&typeof P==="object"){this.bindProperty(d,P)}else{if(Array.isArray(h)){if(h.length>1){a.error("Tried to add an array of controls to a single aggregation")}h=h[0]}this[u._sMutator](f(typeof P==="string"?P:h,u,i))}break;case 2:P=this.extractBindingInfo(h,i);if(P&&typeof P==="object"){this.bindAggregation(d,P)}else{h=typeof P==="string"?P:h;if(h){if(Array.isArray(h)){c(h)}else{r[u._sMutator](f(h,u,i))}}}break;case 3:this[u._sMutator](h);break;case 4:if(h){if(Array.isArray(h)){for(var A=0,_=h.length;A<_;A++){this[u._sMutator](h[A])}}else{this[u._sMutator](h)}}break;case 5:if(typeof h=="function"){this[u._sMutator](h)}else if(Array.isArray(h[0])&&(h.length<=1||Array.isArray(h[1]))){h.forEach(y)}else{y(h)}break;case-1:break;default:break}}else{g(false,"ManagedObject.apply: encountered unknown setting '"+d+"' for class '"+s.getName()+"' (value:'"+h+"')")}}return this};b.escapeSettingsValue=function(t){return typeof t==="string"?r.escape(t):t};b.prototype.toString=function(){return"ManagedObject "+this.getMetadata().getName()+"#"+this.getId()};b.prototype.getId=function(){return this.sId};b.prototype.setProperty=function(t,i,n){var r=this.mProperties[t];i=this.validateProperty(t,i);if(p(r,i)){this.mProperties[t]=i;return this}if(n){s.refresh()}this.mProperties[t]=i;if(!n&&!this.isInvalidateSuppressed()){this.invalidate()}this.updateModelProperty(t,i,r);i=this.mProperties[t];if(this.mEventRegistry["_change"]){e.prototype.fireEvent.call(this,"_change",{id:this.getId(),name:t,oldValue:r,newValue:i})}if(this._observer){this._observer.propertyChange(this,t,r,i)}return this};b.prototype.getProperty=function(e){var i=this.mProperties[e],n=this.getMetadata().getManagedProperty(e),r;if(!n){throw new Error('Property "'+e+'" does not exist in '+this)}r=t.getType(n.type);if(r instanceof t&&r.isArrayType()&&Array.isArray(i)){i=i.slice(0)}if(i instanceof String){i=i.valueOf()}if(n.byValue){i=f(i)}return i};b.prototype.validateProperty=function(e,i){var n=this.getMetadata().getManagedProperty(e),r;if(!n){throw new Error('Property "'+e+'" does not exist in '+this)}r=t.getType(n.type);if(r instanceof t&&r.isArrayType()&&Array.isArray(i)){i=i.slice(0)}if(i==null){i=n.getDefaultValue()}else if(r instanceof t){if(r.getName()=="string"){if(!(typeof i=="string"||i instanceof String)){i=""+i}}else if(r.getName()=="string[]"){if(typeof i=="string"){i=[i]}if(!Array.isArray(i)){throw new Error('"'+i+'" is of type '+typeof i+", expected string[]"+' for property "'+e+'" of '+this)}for(var s=0;s<i.length;s++){if(typeof i[s]!=="string"){i[s]=""+i[s]}}}else if(!r.isValid(i)){throw new Error('"'+i+'" is of type '+typeof i+", expected "+r.getName()+' for property "'+e+'" of '+this)}}if(n.byValue){i=f(i)}if(r&&r.normalize&&typeof r.normalize==="function"){i=r.normalize(i)}return i};b.prototype.isPropertyInitial=function(t){return!y(this.mProperties,t)&&!this.isBound(t)};b.prototype.resetProperty=function(t){if(this.mProperties.hasOwnProperty(t)){var e=this.getMetadata().getManagedProperty(t);e.set(this,null);if(this.mProperties[t]===e.getDefaultValue()){delete this.mProperties[t]}}return this};b.prototype.getOriginInfo=function(t){var e=this.mProperties[t];if(!(e instanceof String&&e.originInfo)){return null}return e.originInfo};b.prototype.setAssociation=function(t,e,i){if(e instanceof b){e=e.getId()}else if(e!=null&&typeof e!=="string"){g(false,"setAssociation(): sId must be a string, an instance of sap.ui.base.ManagedObject or null");return this}if(this.mAssociations[t]===e){return this}if(i){this.iSuppressInvalidate++}if(this._observer&&this.mAssociations[t]!=null){this._observer.associationChange(this,t,"remove",this.mAssociations[t])}this.mAssociations[t]=e;if(this._observer&&this.mAssociations[t]!=null){this._observer.associationChange(this,t,"insert",e)}if(!this.isInvalidateSuppressed()){this.invalidate()}if(i){this.iSuppressInvalidate--}return this};b.prototype.getAssociation=function(t,e){var i=this.mAssociations[t];if(!i){i=this.mAssociations[t]=e||null}else{if(typeof i.length==="number"&&!i.propertyIsEnumerable("length")){return i.slice()}return i}return i};b.prototype.addAssociation=function(t,e,i){if(e instanceof b){e=e.getId()}else if(typeof e!=="string"){g(false,"addAssociation(): sId must be a string or an instance of sap.ui.base.ManagedObject");return this}if(i){this.iSuppressInvalidate++}var n=this.mAssociations[t];if(!n){n=this.mAssociations[t]=[e]}else{n.push(e)}if(this._observer){this._observer.associationChange(this,t,"insert",e)}if(!this.isInvalidateSuppressed()){this.invalidate()}if(i){this.iSuppressInvalidate--}return this};b.prototype.removeAssociation=function(t,e,i){var n=this.mAssociations[t];var r=null;if(!n){return null}if(i){this.iSuppressInvalidate++}if(typeof e=="object"&&e.getId){e=e.getId()}if(typeof e=="string"){for(var s=0;s<n.length;s++){if(n[s]==e){e=s;break}}}if(typeof e=="number"){if(e<0||e>=n.length){a.warning("ManagedObject.removeAssociation called with invalid index: "+t+", "+e)}else{r=n[e];n.splice(e,1);if(this._observer){this._observer.associationChange(this,t,"remove",r)}if(!this.isInvalidateSuppressed()){this.invalidate()}}}if(i){this.iSuppressInvalidate--}return r};b.prototype.removeAllAssociation=function(t,e){var i=this.mAssociations[t];if(!i){return[]}delete this.mAssociations[t];if(!i.length){return i}if(e){this.iSuppressInvalidate++}if(this._observer){this._observer.associationChange(this,t,"remove",i)}if(!this.isInvalidateSuppressed()){this.invalidate()}if(e){this.iSuppressInvalidate--}return i};b.prototype.validateAggregation=function(e,i,r,s){var a=this.getMetadata(),f=a.getManagedAggregation(e),p,d,h,l;if(!f){throw new Error('Aggregation "'+e+'" does not exist in '+this)}if(f.multiple!==r){throw new Error("Aggregation '"+e+"' of "+this+" used with wrong cardinality (declared as "+(f.multiple?"0..n":"0..1")+")")}var u=a.getAggregationForwarder(e);if(u&&!s){u.getTarget(this).validateAggregation(u.targetAggregationName,i,r)}if(!f.multiple&&!i){return i}if(n.isA(i,f.type)){return i}p=f.altTypes;if(p&&p.length){if(i==null){return i}for(h=0;h<p.length;h++){d=t.getType(p[h]);if(d instanceof t){if(d.isValid(i)){return i}}}}d=o.get(f.type);if(typeof d==="function"&&i instanceof d){return i}l='"'+i+'" is not valid for aggregation "'+e+'" of '+this;if(t.isInterfaceType(f.type)){g(false,l);return i}else{throw new Error(l)}};b.prototype.setAggregation=function(t,e,i){var n=this.getMetadata().getAggregationForwarder(t);if(n){e=this.validateAggregation(t,e,false,true);return n.set(this,e)}var r=this.mAggregations[t];if(r===e){return this}e=this.validateAggregation(t,e,false);if(i){this.iSuppressInvalidate++}this.mAggregations[t]=null;if(r instanceof b){r.setParent(null)}else{if(this._observer!=null&&r!=null){this._observer.aggregationChange(this,t,"remove",r)}}this.mAggregations[t]=e;if(e instanceof b){e.setParent(this,t,i)}else{if(!this.isInvalidateSuppressed()){this.invalidate()}if(this._observer!=null&&e!=null){this._observer.aggregationChange(this,t,"insert",e)}}if(i){this.iSuppressInvalidate--}return this};b.prototype.getAggregation=function(t,e){var i=this.getMetadata().getAggregationForwarder(t);if(i){return i.get(this)}var n=this.mAggregations[t];if(!n){n=this.mAggregations[t]=e||null}if(n){if(typeof n.length==="number"&&!n.propertyIsEnumerable("length")){return n.slice()}return n}else{return null}};b.prototype.indexOfAggregation=function(t,e){var i=this.getMetadata().getAggregationForwarder(t);if(i){return i.indexOf(this,e)}var n=this.mAggregations[t];if(n){if(n.length==undefined){return-2}for(var r=0;r<n.length;r++){if(n[r]==e){return r}}}return-1};b.prototype.insertAggregation=function(t,e,i,n){if(!e){return this}e=this.validateAggregation(t,e,true,true);var r=this.getMetadata().getAggregationForwarder(t);if(r){return r.insert(this,e,i)}var s=this.mAggregations[t]||(this.mAggregations[t]=[]);var o;if(i<0){o=0}else if(i>s.length){o=s.length}else{o=i}if(o!==i){a.warning("ManagedObject.insertAggregation: index '"+i+"' out of range [0,"+s.length+"], forced to "+o)}s.splice(o,0,e);e.setParent(this,t,n);return this};b.prototype.addAggregation=function(t,e,i){if(!e){return this}e=this.validateAggregation(t,e,true,true);var n=this.getMetadata().getAggregationForwarder(t);if(n){return n.add(this,e)}var r=this.mAggregations[t];if(!r){r=this.mAggregations[t]=[e]}else{r.push(e)}e.setParent(this,t,i);return this};b.prototype.removeAggregation=function(t,e,i){var n=this.getMetadata().getAggregationForwarder(t);if(n){return n.remove(this,e)}var r=this.mAggregations[t],s=null,o;if(!r){return null}if(i){this.iSuppressInvalidate++}if(typeof e=="string"){for(o=0;o<r.length;o++){if(r[o]&&r[o].getId()===e){e=o;break}}}if(typeof e=="object"){for(o=0;o<r.length;o++){if(r[o]==e){e=o;break}}}if(typeof e=="number"){if(e<0||e>=r.length){a.warning("ManagedObject.removeAggregation called with invalid index: "+t+", "+e)}else{s=r[e];r.splice(e,1);s.setParent(null);if(!this.isInvalidateSuppressed()){this.invalidate()}}}if(i){this.iSuppressInvalidate--}return s};b.prototype.removeAllAggregation=function(t,e){var i=this.getMetadata().getAggregationForwarder(t);if(i){return i.removeAll(this)}var n=this.mAggregations[t];if(!n){return[]}delete this.mAggregations[t];if(!n.length){return n}if(e){this.iSuppressInvalidate++}for(var r=0;r<n.length;r++){n[r].setParent(null)}if(!this.isInvalidateSuppressed()){this.invalidate()}if(e){this.iSuppressInvalidate--}return n};b.prototype.destroyAggregation=function(t,e){var i=this.getMetadata().getAggregationForwarder(t);if(i){return i.destroy(this)}var n=this.mAggregations[t],r,s;if(!n){return this}delete this.mAggregations[t];if(Array.isArray(n)&&!n.length){return this}if(e){this.iSuppressInvalidate++}if(n instanceof b){n.destroy(e);if(this._observer){this._observer.aggregationChange(this,t,"remove",n)}}else if(Array.isArray(n)){for(r=n.length-1;r>=0;r--){s=n[r];if(s){s.destroy(e);if(this._observer){this._observer.aggregationChange(this,t,"remove",s)}}}}if(!this.isInvalidateSuppressed()){this.invalidate()}if(e){this.iSuppressInvalidate--}return this};b.prototype.invalidate=function(){if(this.oParent&&this.oParent.isInvalidateSuppressed&&!this.oParent.isInvalidateSuppressed()){this.oParent.invalidate(this)}};b.prototype.isInvalidateSuppressed=function(){return this.iSuppressInvalidate>0};b.prototype._removeChild=function(t,e,i){if(!e){a.error("Cannot remove aggregated child without aggregation name.",null,this)}else{if(i){this.iSuppressInvalidate++}var n=this.indexOfAggregation(e,t);var r=this.getMetadata().getAggregation(e);if(n==-2){if(r&&this[r._sMutator]){this[r._sMutator](null)}else{this.setAggregation(e,null,i)}}else if(n>-1){if(r&&this[r._sRemoveMutator]){this[r._sRemoveMutator](n)}else{this.removeAggregation(e,n,i)}}if(i){this.iSuppressInvalidate--}}};function A(t,e){while(t&&t!==e){t=t.oParent}return!!t}b.prototype.setParent=function(t,e,i){g(t==null||t instanceof b,"oParent either must be null, undefined or a ManagedObject");var n;if(!t){if(this.oParent){n=this._observer||this.oParent._observer;if(n){n.parentChange(this,this.sParentAggregationName,"unset",this.oParent)}if(this.aAPIParentInfos&&this.aAPIParentInfos.forwardingCounter===0){delete this.aAPIParentInfos}}this.oParent=null;this.sParentAggregationName=null;var r=b._oEmptyPropagatedProperties;if(r!==this.oPropagatedProperties){this.oPropagatedProperties=r;if(!this._bIsBeingDestroyed){Promise.resolve().then(function(){if(!this.oParent){this.updateBindings(true,null);this.updateBindingContext(false,undefined,true);this.propagateProperties(true);this.fireModelContextChange()}}.bind(this))}}this._oContextualSettings=b._defaultContextualSettings;if(!this._bIsBeingDestroyed){Promise.resolve().then(function(){if(!this.oParent){this._propagateContextualSettings()}}.bind(this))}s.refresh();return}if(A(t,this)){throw new Error("Cycle detected: new parent '"+t+"' is already a descendant of (or equal to) '"+this+"'")}if(i){s.refresh();t.iSuppressInvalidate++}var o=this.getParent();if(o){o._removeChild(this,this.sParentAggregationName)}this.oParent=t;this.sParentAggregationName=e;if(!t.mSkipPropagation[e]){var r=this.aAPIParentInfos?this.aAPIParentInfos[0].parent._getPropertiesToPropagate():t._getPropertiesToPropagate();if(r!==this.oPropagatedProperties){this.oPropagatedProperties=r;if(this.hasModel()){this.updateBindings(true,null);this.updateBindingContext(false,undefined,true);this.propagateProperties(true)}this._callPropagationListener();this.fireModelContextChange()}}this._applyContextualSettings(t._oContextualSettings);if(t&&!t.isInvalidateSuppressed()){t.invalidate(this)}if(i){t.iSuppressInvalidate--}n=this._observer||this.oParent._observer;if(n){n.parentChange(this,e,"set",this.oParent)}return this};b.prototype._applyContextualSettings=function(t){t=t||b._defaultContextualSettings;if(this._oContextualSettings!==t){this._oContextualSettings=t;this._propagateContextualSettings();if(this._bIsOwnerActive){this._onContextualSettingsChanged()}}};b.prototype._onContextualSettingsChanged=function(){};b.prototype._propagateContextualSettings=function(){var t=this._oContextualSettings,e,i,n;for(e in this.mAggregations){i=this.mAggregations[e];if(i instanceof b){i._applyContextualSettings(t)}else if(i instanceof Array){for(n=0;n<i.length;n++){if(i[n]instanceof b){i[n]._applyContextualSettings(t)}}}}};b.prototype._getContextualSettings=function(){return this._oContextualSettings};b.prototype.getParent=function(){return this.oParent};b.prototype.destroy=function(t){var i,n;if(this.bIsDestroyed){return}var r=this;this._bIsBeingDestroyed=true;if(t){this.iSuppressInvalidate++}for(i in this.mBindingInfos){n=this.mBindingInfos[i];if(n.binding){if(n.factory){this._detachAggregationBindingHandlers(i)}else{this._detachPropertyBindingHandlers(i)}}}for(i in this.mObjectBindingInfos){n=this.mObjectBindingInfos[i];if(n.binding){this._detachObjectBindingHandlers(n)}}if(this.exit){this.exit()}if(this._exitCompositeSupport){this._exitCompositeSupport()}for(var s in this.mAggregations){this.destroyAggregation(s,t)}if(this.deregister){this.deregister()}if(this.oParent&&this.sParentAggregationName){this.oParent._removeChild(this,this.sParentAggregationName,t)}delete this.oParent;for(i in this.mBindingInfos){if(this.mBindingInfos[i].factory){this.unbindAggregation(i,true)}else{this.unbindProperty(i,true)}}for(i in this.mObjectBindingInfos){this.unbindObject(i,true)}if(t){this.iSuppressInvalidate--}if(this._observer){this._observer.objectDestroyed(this)}if(this.aAPIParentInfos){this.aAPIParentInfos=null}e.prototype.destroy.apply(this,arguments);this.setParent=function(){throw Error("The object with ID "+r.getId()+" was destroyed and cannot be used anymore.")};this.bIsDestroyed=true};b.prototype.isBinding=function(t,e){return typeof this.extractBindingInfo(t)==="object"};b.prototype.extractBindingInfo=function(t,e,i){var n=r.extract(t,e,i);if(typeof t==="object"&&n&&n.template){n.template=b.create(n.template)}return n};b.prototype.getBindingInfo=function(t){var e=this.getMetadata().getAggregationForwarder(t);if(e&&e.forwardBinding){return e.getTarget(this).getBindingInfo(e.targetAggregationName)}return this.mBindingInfos[t]};b.prototype._getObjectBindingInfo=function(t){return this.mObjectBindingInfos[t]};b.prototype.bindObject=function(t){var e,i;if(typeof t=="string"){i=t;t={path:i,parameters:arguments[1]}}t=r.createObject(t);e=t.model;if(this.getObjectBinding(e)){this.unbindObject(e,true)}this.mObjectBindingInfos[e]=t;if(this.getModel(e)){this._bindObject(t)}return this};function _(t){a.error("Unexpected call of '"+t+"'.")}b.prototype._bindObject=_.bind(null,"_bindObject");b.prototype._detachObjectBindingHandlers=_.bind(null,"_detachObjectBindingHandlers");b.prototype.unbindObject=function(t,e){var i=this.mObjectBindingInfos[t];if(i){delete this.mObjectBindingInfos[t];if(i.binding){this._unbindObject(i,t,e)}}return this};b.prototype._unbindObject=_.bind(null,"_unbindObject");b.prototype.bindContext=function(t){return this.bindObject(t)};b.prototype.unbindContext=function(t){return this.unbindObject(t)};b.prototype.bindProperty=function(t,e,i,s){var o=true,a=this.getMetadata().getPropertyLikeSetting(t);if(!a){throw new Error('Property "'+t+'" does not exist in '+this)}if(typeof e=="string"){e={parts:[{path:e,type:n.isA(i,"sap.ui.model.Type")?i:undefined,mode:s}],formatter:typeof i==="function"?i:undefined}}if(this.isBound(t)){this.unbindProperty(t,true)}e=r.createProperty(e);this.mBindingInfos[t]=e;if(this._observer){this._observer.bindingChange(this,t,"prepare",e,"property")}for(var g=0;g<e.parts.length;g++){if(e.parts[g].value===undefined&&!this.getModel(e.parts[g].model)){o=false;break}}if(o){this._bindProperty(t,e)}return this};b.prototype._bindProperty=function(t,e){var i=true;for(var n=0;n<e.parts.length;n++){if(e.parts[n].value===undefined){i=false;break}}if(i){var r=[];e.parts.forEach(function(t){r.push(t.formatter?t.formatter(t.value):t.value)});var s=e.formatter?e.formatter(r):r.join(" ");var o=this.getMetadata().getPropertyLikeSetting(t);this[o._sMutator](s)}else{_.call(this,"_bindProperty")}};b.prototype._detachPropertyBindingHandlers=function(t){};b.prototype.unbindProperty=function(t,e){var i=this.mBindingInfos[t];if(i){if(i.binding){this._unbindProperty(i,t)}if(this._observer&&!this._bIsBeingDestroyed){this._observer.bindingChange(this,t,"remove",this.mBindingInfos[t],"property")}delete this.mBindingInfos[t];if(!e){this.resetProperty(t)}}return this};b.prototype._unbindProperty=_.bind(null,"_unbindProperty");b.prototype.updateProperty=function(t){};b.prototype.updateModelProperty=function(t,e,i){};var I=1;b.prototype.bindAggregation=function(t,e){var i,n,s,o,g=this.getMetadata(),f=g.getAggregation(t);if(!f){throw new Error('Aggregation "'+t+'" does not exist in '+this)}if(!f.multiple){a.error('Binding of single aggregation "'+t+'" of '+this+" is not supported!")}if(typeof e=="string"){i=arguments[1];n=arguments[2];s=arguments[3];o=arguments[4];e={path:i,sorter:s,filters:o};if(n instanceof b){e.template=n}else if(typeof n==="function"){e.factory=n}}var p=g.getAggregationForwarder(t);if(p&&p.forwardBinding){p.getTarget(this).bindAggregation(p.targetAggregationName,e);return this}if(this.isBound(t)){this.unbindAggregation(t)}if(e.template){if(e.template._sapui_candidateForDestroy){a.warning("A binding template that is marked as 'candidate for destroy' is reused in a binding. "+"You can use 'templateShareable:true' to fix this issue for all bindings that are affected "+"(The template is used in aggregation '"+t+"' of object '"+this.getId()+"'). "+"For more information, see documentation under 'Aggregation Binding'.");delete e.template._sapui_candidateForDestroy}if(e.templateShareable===undefined){e.templateShareable=I}}e=r.createAggregation(e,f._doesNotRequireFactory);this.mBindingInfos[t]=e;if(!(e.template||e.factory)){throw new Error("Missing template or factory function for aggregation "+t+" of "+this+" !")}if(e.factory){var d=e.factory[c]||e.factory;var h=this._sOwnerId;e.factory=function(t,e){return b.runWithOwner(d.bind(null,t,e),h)};e.factory[c]=d}if(this._observer){this._observer.bindingChange(this,t,"prepare",e,"aggregation")}if(this.getModel(e.model)){this._bindAggregation(t,e)}return this};b.prototype._bindAggregation=_.bind(null,"_bindAggregation");b.prototype._detachAggregationBindingHandlers=_.bind(null,"_detachAggregationBindingHandlers");b.prototype.unbindAggregation=function(t,e){var i=this.getMetadata().getAggregationForwarder(t);if(i&&i.forwardBinding){i.getTarget(this).unbindAggregation(i.targetAggregationName,e);return this}var n=this.mBindingInfos[t],r=this.getMetadata().getAggregation(t);if(n){if(n.binding){this._unbindAggregation(n,t)}if(n.template){if(!n.templateShareable&&n.template.destroy){n.template.destroy()}if(n.templateShareable===I){n.template._sapui_candidateForDestroy=true}}if(this._observer&&!this._bIsBeingDestroyed){this._observer.bindingChange(this,t,"remove",this.mBindingInfos[t],"aggregation")}delete this.mBindingInfos[t];if(!e){this[r._sDestructor]()}}return this};b.prototype._unbindAggregation=_.bind(null,"_unbindAggregation");b.prototype.updateAggregation=function(t,e,i){};b.prototype.refreshAggregation=function(t){};b.prototype.propagateMessages=function(t,e){a.warning("Message for "+this+", Property "+t)};b.prototype.isTreeBinding=function(t){return false};b.prototype.updateBindings=function(t,e){};b.prototype.isBound=function(t){return!!this.getBindingInfo(t)};b.prototype.getObjectBinding=function(t){m(t);var e=this._getObjectBindingInfo(t);return e&&e.binding};b.prototype.getEventingParent=function(){return this.oParent};b.prototype.getBinding=function(t){var e=this.getBindingInfo(t);return e&&e.binding};b.prototype.getBindingPath=function(t){var e=this.getBindingInfo(t);return e&&(e.path||e.parts&&e.parts[0]&&e.parts[0].path)};b.prototype.setBindingContext=function(t,e){m(e);var i=this.oBindingContexts[e];if(i!==t||t&&t.hasChanged()){if(t===undefined){delete this.oBindingContexts[e]}else{this.oBindingContexts[e]=t}this.updateBindingContext(false,e);this.propagateProperties(e);this.fireModelContextChange()}return this};b.prototype.setElementBindingContext=function(t,e){};b.prototype.updateBindingContext=function(t,e,i){};b.prototype.getBindingContext=function(t){var e=this.getModel(t),i=this.mElementBindingContexts[t];if(i&&!e){return i}else if(i&&e&&i.getModel()===e){return i}else if(i===null){return i}else{return this._getBindingContext(t)}};b.prototype._getBindingContext=function(t){var e=this.getModel(t),i=this.oBindingContexts[t],n=this.oPropagatedProperties.oBindingContexts[t];if(i&&!e){return this.oBindingContexts[t]}else if(i&&e&&i.getModel()===e){return this.oBindingContexts[t]}else if(i===null){return i}else if(n&&e&&n.getModel()!==e){return undefined}else{return n}};b.prototype.setModel=function(t,e){g(t==null||n.isA(t,"sap.ui.model.Model"),"oModel must be an instance of sap.ui.model.Model, null or undefined");g(e===undefined||typeof e==="string"&&!/^(undefined|null)?$/.test(e),"sName must be a string or omitted");if(!t&&this.oModels[e]){delete this.oModels[e];this.propagateProperties(e);this.updateBindings(false,e);this.fireModelContextChange()}else if(t&&t!==this.oModels[e]){this.oModels[e]=t;this.propagateProperties(e);this.updateBindingContext(false,e);this.updateBindings(false,e);this.fireModelContextChange()}return this};b.prototype.addPropagationListener=function(t){g(typeof t==="function","listener must be a function");this.aPropagationListeners.push(t);this.propagateProperties(false);this._callPropagationListener(t);return this};b.prototype.removePropagationListener=function(t){g(typeof t==="function","listener must be a function");var e=this.aPropagationListeners;var i=e.indexOf(t);if(i>=0){e.splice(i,1);this.propagateProperties(false)}return this};b.prototype.getPropagationListeners=function(){return this.oPropagatedProperties.aPropagationListeners.concat(this.aPropagationListeners)};b.prototype._callPropagationListener=function(t){var e;if(t){t(this)}else{e=this.getPropagationListeners();for(var i=0;i<e.length;i++){t=e[i];t(this)}}return this};b._oEmptyPropagatedProperties={oModels:{},oBindingContexts:{},aPropagationListeners:[]};function B(t,e){return!e.aAPIParentInfos||e.aAPIParentInfos[0].parent===t}b.prototype.propagateProperties=function(t){var e=this._getPropertiesToPropagate(),i=t===true,n=t===false,r=i?undefined:t,s,o,a,g=Object.assign({},this.mAggregations,this.mForwardedAggregations);P(e.oModels);for(s in g){if(this.mSkipPropagation[s]){continue}o=g[s];if(o instanceof b){if(B(this,o)){this._propagateProperties(t,o,e,i,r,n)}}else if(o instanceof Array){for(a=0;a<o.length;a++){if(o[a]instanceof b){if(B(this,o[a])){this._propagateProperties(t,o[a],e,i,r,n)}}}}}};b.prototype._propagateProperties=function(t,e,i,n,r,s){if(!i){i=this._getPropertiesToPropagate();n=t===true;s=t===false;r=n?undefined:t}P(i.oModels);if(e.oPropagatedProperties!==i){e.oPropagatedProperties=i;if(s!==true){e.updateBindings(n,r);e.updateBindingContext(false,r,n)}e.propagateProperties(t);if(s||n){e._callPropagationListener()}e.fireModelContextChange()}};b.prototype._getPropertiesToPropagate=function(){var t=l(this.oModels),e=l(this.oBindingContexts),i=this.aPropagationListeners.length===0,n=l(this.mElementBindingContexts);function r(t,e,i,n){return t?e:h({},e,i,n)}function s(t,e,i){return t?e:e.concat(i)}if(e&&t&&n&&i){return this.oPropagatedProperties}else{return{oModels:r(t,this.oPropagatedProperties.oModels,this.oModels),oBindingContexts:r(e&&n,this.oPropagatedProperties.oBindingContexts,this.oBindingContexts,this.mElementBindingContexts),aPropagationListeners:s(i,this.oPropagatedProperties.aPropagationListeners,this.aPropagationListeners)}}};b.prototype.getModel=function(t){m(t);return this.oModels[t]||this.oPropagatedProperties.oModels[t]};b.prototype.getOwnModels=function(){return this.oModels};b.prototype.hasModel=function(){return!(l(this.oModels)&&l(this.oPropagatedProperties.oModels))};b.prototype.clone=function(t,e,n){var s=true,o=true;if(n){s=!!n.cloneChildren;o=!!n.cloneBindings}if(!t){t=i.uid("clone")||d()}if(!e&&s){e=this.findAggregatedObjects(true,null,true).map(function(t){return t.getId()});e.push(this.getId())}var g=this.getMetadata(),p=g._oClass,h=this.getId()+"-"+t,l={},u,c=this.mProperties,y,m,v,P=r.escape,A,_;var B=Object.keys(c);var C;A=B.length;while(A>0){y=B[--A];u=g.getProperty(y);if(u&&!(this.isBound(y)&&o)){if(typeof c[y]==="string"){l[y]=P(c[y])}else{C=u.byValue?f(c[y]):c[y];if(C&&typeof C==="object"&&!Object.isFrozen(C)){C[r.UI5ObjectMarker]=true}l[y]=C}}}l["models"]=this.oModels;l["bindingContexts"]=this.oBindingContexts;if(s){var M=Object.assign({},this.mAggregations,this.mForwardedAggregations);for(m in M){var x=M[m];if(g.hasAggregation(m)&&!(this.isBound(m)&&o)){if(x instanceof b){l[m]=x.clone(t,e)}else if(Array.isArray(x)){l[m]=[];for(var A=0;A<x.length;A++){l[m].push(x[A].clone(t,e))}}else{l[m]=typeof x==="string"?P(x):x}}}for(m in this.mAssociations){if(!g.hasAssociation(m)){continue}var w=this.mAssociations[m];if(Array.isArray(w)){w=w.slice(0);for(var A=0;A<w.length;A++){if(e.indexOf(w[A])>=0){w[A]+="-"+t}}}else if(e.indexOf(w)>=0){w+="-"+t}l[m]=w}}v=new p(h,l);function j(i,n,r,s,o){var g=!r;var f=Object.assign({},i);if(!i.templateShareable&&i.template&&i.template.clone){f.template=i.template.clone(t,e);delete f.factory}else if(i.templateShareable===I){i.templateShareable=f.templateShareable=true;a.error("During a clone operation, a template was found that neither was marked with 'templateShareable:true' nor 'templateShareable:false'. "+"The framework won't destroy the template. This could cause errors (e.g. duplicate IDs) or memory leaks "+"(The template is used in aggregation '"+o+"' of object '"+s.getId()+"')."+"For more information, see documentation under 'Aggregation Binding'.")}delete f.binding;delete f.modelChangeHandler;delete f.dataStateChangeHandler;delete f.modelRefreshHandler;if(g){n.bindObject(f)}else if(i.factory){n.bindAggregation(r,f)}else{n.bindProperty(r,f)}}for(m in this.mEventRegistry){v.mEventRegistry[m]=this.mEventRegistry[m].slice()}if(o){for(m in this.mObjectBindingInfos){j(this.mObjectBindingInfos[m],v)}for(m in this.mBindingInfos){j(this.mBindingInfos[m],v,m,this,m)}}if(b._supportInfo){b._supportInfo.addSupportInfo(v.getId(),b._supportInfo.byId(this.getId()))}if(this._cloneMetadataContexts){this._cloneMetadataContexts(v)}if(this.mForwardedAggregations){for(m in this.mForwardedAggregations){var S=v.getMetadata().getAggregationForwarder(m);if(S){_=S.getTarget(v,true);if(S.forwardBinding&&this.isBound(m)){j(this.getBindingInfo(m),_,S.targetAggregationName,this,m)}}}}return v};b._handleLocalizationChange=function(t){var e,i,n,r;if(t===1){for(i in this.oModels){e=this.oModels[i];if(e&&e._handleLocalizationChange){e._handleLocalizationChange()}}}else if(t===2){for(i in this.mBindingInfos){n=this.mBindingInfos[i];var s=n.parts;if(s){for(r=0;r<s.length;r++){if(n.type&&n.type._handleLocalizationChange){n.type._handleLocalizationChange()}}if(n.modelChangeHandler){n.modelChangeHandler()}}}}};b.prototype.findAggregatedObjects=function(t,e,i){var n=[];if(e&&typeof e!=="function"){e=null}function r(s){var o,a,g;if(i){for(g in s.mBindingInfos){o=s.mBindingInfos[g].template;if(o){if(!e||e(o)){n.push(o)}if(t){r(o)}}}}for(g in s.mAggregations){o=s.mAggregations[g];if(Array.isArray(o)){for(a=0;a<o.length;a++){if(!e||e(o[a])){n.push(o[a])}if(t){r(o[a])}}}else if(o instanceof b){if(!e||e(o)){n.push(o)}if(t){r(o)}}}}r(this);return n};b.prototype.onOwnerDeactivation=function(){this._bIsOwnerActive=false};b.prototype.onOwnerActivation=function(){this._bIsOwnerActive=true;this._onContextualSettingsChanged()};b.prototype.isDestroyStarted=function(){return!!this._bIsBeingDestroyed};b.prototype.isDestroyed=function(){return!!this.bIsDestroyed};b._defaultContextualSettings={};return b});
//# sourceMappingURL=ManagedObject.js.map