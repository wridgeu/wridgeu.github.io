/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../json/JSONModel","../json/JSONPropertyBinding","../json/JSONListBinding","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectObserver","../Context","../ChangeReason","sap/base/util/uid","sap/base/Log","sap/base/util/isPlainObject","sap/base/util/deepClone","sap/base/util/deepEqual"],function(e,t,i,r,n,s,a,o,g,f,p,h){"use strict";var u="@custom",d="--";function l(e,t,i,n){var s=i.get(t)||[],a,o;if(s&&!Array.isArray(s)&&!i.multiple){s=[s]}for(var g=0;g<s.length;g++){a=s[g];if(!(a instanceof r)){continue}o=true;if(n){e._oObserver.observe(a,{properties:true,aggregations:true})}else{e._oObserver.unobserve(a,{properties:true,aggregations:true})}var f=a.getMetadata().getAllAggregations();for(var p in f){l(e,a,f[p],n)}}if(o){var p=t.getId()+"/@"+i.name;if(n){if(!e._mObservedCount.aggregations[p]){e._mObservedCount.aggregations[p]=0}e._mObservedCount.aggregations[p]++}else{delete e._mObservedCount.aggregations[p]}}}function c(e){var t,i=e.length-1,n=[];while(!(e[i].node instanceof r)){if(t){n.splice(0,0,t)}t=e[i].path;i--}return[e[i].node,e[i+1],n,t]}function v(e){var t="",i;var n=typeof e;if(e==null||n!="object"&&n!="function"){t=e}else if(f(e)){t=JSON.stringify(e)}else if(e instanceof r){t=e.getId();for(i in e.mProperties){t=t+"$"+v(e.mProperties[i])}}else if(Array.isArray(e)){for(var s=0;e.length;s++){t=t+"$"+v(e)}}else{g.warning("Could not stringify object "+e);t="$"}return t}var b=i.extend("sap.ui.model.base.ManagedObjectModelAggregationBinding",{constructor:function(){i.apply(this,arguments);this._getOriginOfManagedObjectModelBinding()},_mightBeAffectedByChangesInside:function(e){while(e){if(e.getParent()===this._oOriginMO){return true}e=e.getParent()}return false},getEntryKey:function(e){var t=e.getObject();if(t instanceof r){return t.getId()}return i.prototype.getEntryData.apply(this,arguments)},getEntryData:function(e){var t=e.getObject();if(t instanceof r){return v(t)}return i.prototype.getEntryData.apply(this,arguments)},_getContexts:function(e,t){var r;if(this._oAggregation){var n=this._oOriginMO.getBinding(this._sMember);if(n){var s=n.getModel();r=s.iSizeLimit}var a=this._oOriginMO.getBindingInfo(this._sMember);if(a&&e>=0&&t&&r&&t>r){var o=false;if(e!=a.startIndex){a.startIndex=e;o=true}if(t!=a.length){a.length=t;o=true}if(o){this._oAggregation.update(this._oOriginMO,"change")}}}return i.prototype._getContexts.apply(this,arguments)},_getOriginOfManagedObjectModelBinding:function(){if(!this._oOriginMO){var e=this.oModel,t=[];e._getObject(this.sPath,this.oContext,t);var i=c(t);this._oOriginMO=i[0];this._aPartsInJSON=i[2];this._sMember=i[3];this._oAggregation=this._oOriginMO.getMetadata().getAggregation(this._sMember)}},getLength:function(){if(this._aPartsInJSON.length==0){var e=this._oOriginMO.getBinding(this._sMember);if(e&&e.isA("sap.ui.model.ListBinding")){return e.getLength()}}return i.prototype.getLength.apply(this,arguments)},isLengthFinal:function(){if(this._aPartsInJSON.length==0){var e=this._oOriginMO.getBinding(this._sMember);if(e&&e.isA("sap.ui.model.ListBinding")){return e.isLengthFinal()}}return true}});var y=t.extend("sap.ui.model.base.ManagedObjectModelPropertyBinding");var O=e.extend("sap.ui.model.base.ManagedObjectModel",{constructor:function(t,i){if(!i&&typeof i!="object"){i={}}i[u]={};this._oObject=t;this._mObservedCount={properties:{},aggregations:{}};this.mListBinding={};e.apply(this,[i]);this._oObserver=new n(this.observerChanges.bind(this));this.setSizeLimit(1e6)}});O.prototype.getAggregation=e.prototype.getProperty;O.prototype.setData=function(t,i){var r={};r[u]=t;e.prototype.setData.apply(this,[r,i])};O.prototype.getJSON=function(){return JSON.stringify(this.oData[u])};O.prototype.setProperty=function(t,i,n,s){var a=this.resolve(t,n),o,f,d;if(!a){return false}if(a.indexOf("/"+u)===0){return e.prototype.setProperty.apply(this,arguments)}o=a.lastIndexOf("/");f=a.substring(0,o||1);d=a.substr(o+1);var l=[],v=this._getObject(f,null,l);if(v){if(v instanceof r){var b=v.getMetadata().getManagedProperty(d);if(b){if(!h(b.get(v),i)){b.set(v,i);var y=function(e){var t=this.resolve(e.sPath,e.oContext);return t?t.startsWith(a):false}.bind(this);this.checkUpdate(false,s,y);return true}}else{g.warning("The setProperty method only supports properties, the path "+a+" does not point to a property",null,"sap.ui.model.base.ManagedObjectModel")}}else if(v[d]!==i){var O=c(l);var _=p(O[1].node),m=O[2];var M=_;for(var C=0;C<m.length;C++){M=M[m[C]]}M[d]=i;var j="/"+d;if(m.length>0){j="/"+m.join("/")+j}var A=a.lastIndexOf(j);var B=a.substr(0,A);return this.setProperty(B,_,n)}}return false};O.prototype.addBinding=function(t){e.prototype.addBinding.apply(this,arguments);if(t instanceof b){var i=t.sPath.replace("/","");this.mListBinding[i]=t}t.checkUpdate(false)};O.prototype.removeBinding=function(t){e.prototype.removeBinding.apply(this,arguments);if(t instanceof b){var i=t.sPath.replace("/","");delete this.mListBinding[i]}this._observeBeforeEvaluating(t,false)};O.prototype.firePropertyChange=function(t){if(t.reason===a.Binding){t.resolvedPath=this.resolve(t.path,t.context)}e.prototype.firePropertyChange.call(this,t)};O.prototype.bindAggregation=function(t,i,r){return e.prototype.bindProperty.apply(this,arguments)};O.prototype.bindProperty=function(e,t,i){var r=new y(this,e,t,i);return r};O.prototype.bindList=function(e,t,i,r,n){var s=new b(this,e,t,i,r,n);return s};O.prototype.getManagedObject=function(e,t){if(e instanceof s){t=e;e=t.getPath()}var i=this.getProperty(e,t);if(i instanceof r){return i}return null};O.prototype.getRootObject=function(){return this._oObject};O.prototype._observePropertyChange=function(e,t){if(!e||!t){return}var i=e.getId()+"/@"+t.name;if(!this._oObserver.isObserved(e,{properties:[t.name]})){this._oObserver.observe(e,{properties:[t.name]});this._mObservedCount.properties[i]=1}else{this._mObservedCount.properties[i]++}};O.prototype._unobservePropertyChange=function(e,t){if(!e||!t){return}var i=e.getId()+"/@"+t.name;this._mObservedCount.properties[i]--;if(this._mObservedCount.properties[i]==0){this._oObserver.unobserve(e,{properties:[t.name]});delete this._mObservedCount.properties[i]}};O.prototype._observeAggregationChange=function(e,t){if(!e||!t){return}var i=e.getId()+"/@"+t.name;if(!this._oObserver.isObserved(e,{aggregations:[t.name]})){this._oObserver.observe(e,{aggregations:[t.name]});this._mObservedCount.aggregations[i]=1;l(this,e,t,true)}else{this._mObservedCount.aggregations[i]++}};O.prototype._unobserveAggregationChange=function(e,t){if(!e||!t){return}var i=e.getId()+"/@"+t.name;this._mObservedCount.aggregations[i]--;if(this._mObservedCount.aggregations[i]==0){this._oObserver.unobserve(e,{aggregations:[t.name]});delete this._mObservedCount.aggregations[i]}};O.prototype._createId=function(e){var t=this._oObject;if(typeof t.createId==="function"){return t.createId(e)}if(!e){return t.getId()+d+o()}if(e.indexOf(t.getId()+d)!=0){return t.getId()+d+e}return e};O.prototype._getSpecialNode=function(e,t,i,n){if(e instanceof r){if(t==="className"){if(e.getMetadata){return e.getMetadata().getName()}else{return typeof e}}else if(t==="id"){return e.getId()}else if(t==="metadataContexts"){return e._oProviderData}}else if(t==="binding"&&i&&n){return i.getBinding(n)}else if(t==="bound"&&i&&n){return i.isBound(n)}else if(t==="bindingInfo"&&i&&n){return i.getBindingInfo(n)}else if(Array.isArray(e)){if(t==="length"){return e.length}else if(t.indexOf("id=")===0){var s=t.substring(3),a=null;for(var o=0;o<e.length;o++){if(e[o].getId()===this._createId(s)||e[o].getId()===s){a=e[o];break}}return a}}return null};O.prototype._getObject=function(t,i,n){var a=this._oObject,o="",g=this;if(n){n.push({path:"/",node:a})}this.aBindings.forEach(function(e){if(!e._bAttached){g._observeBeforeEvaluating(e,true)}});if(typeof t==="string"&&t.indexOf("/")!=0&&!i){return null}if(i instanceof r){a=i;o=t}else if(!i||i instanceof s){o=this.resolve(t,i);if(!o){return a}if(o.indexOf("/"+u)===0){return e.prototype._getObject.apply(this,[t,i])}}else{a=i;o=t}if(!a){return null}var p=o.split("/"),h=0;if(!p[0]){h++}var d=null,l=null,c;while(a!==null&&p[h]){c=p[h];if(c=="id"){c="@id"}if(c.indexOf("@")===0){a=this._getSpecialNode(a,c.substring(1),d,l)}else if(a instanceof r){var v=a.getMetadata();if(v.isInstanceOf("sap.ui.core.IDScope")&&c.indexOf("#")===0){a=a.byId(c.substring(1))}else{d=a;l=c;var b=v.getManagedProperty(c);if(b){a=b.get(a)}else{var y=v.getManagedAggregation(c);if(y){a=y.get(a)}else{if(a&&a[c]&&typeof a[c]==="function"){a=a[c]()}else{a=null}}}}}else if(Array.isArray(a)||f(a)){a=a[c]}else{if(a&&a[c]&&typeof a[c]==="function"){a=a[c]()}else{a=null}}if(n){n.push({path:c,node:a})}h++}return a};O.prototype.destroy=function(){for(var t in this._mAggregationObjects){var i=this._mAggregationObjects[t];if(i.object.invalidate.fn){i.object.invalidate=i.object.invalidate.fn}}e.prototype.destroy.apply(this,arguments)};O.prototype._observeBeforeEvaluating=function(e,t){if(!e.isResolved()){return}var i=e.getPath();var n=e.getContext(),a=this._oObject,o;if(n instanceof r){a=n;o=i}else if(!n||n instanceof s){o=this.resolve(i,n);if(!o){return}if(o.indexOf("/"+u)===0){return}}else{return}var g=o.split("/");if(!g[0]){g.shift()}var f=g[0];if(a.getMetadata().isInstanceOf("sap.ui.core.IDScope")&&f.indexOf("#")===0){a=a.byId(f.substring(1));f=g[1]}if(a instanceof r){var p=a.getMetadata(),h=p.getManagedProperty(f);if(h){if(t===true){this._observePropertyChange(a,h)}else if(t===false){this._unobservePropertyChange(a,h)}}else{var d=p.getAggregation(f)||p.getAllPrivateAggregations()[f];if(d){if(t===true){this._observeAggregationChange(a,d)}else if(t===false){this._unobserveAggregationChange(a,d)}}}e._bAttached=t}};O.prototype.observerChanges=function(e){if(e.type=="aggregation"){var t={};if(e.child instanceof r){t=e.child.getMetadata().getAllAggregations()}if(e.mutation=="insert"){if(e.child instanceof r){this._oObserver.observe(e.child,{properties:true,aggregations:true})}for(var i in t){l(this,e.child,t[i],true)}if(this.mListBinding[e.name]){var n=this._oObject.getBinding(e.name);var s=this._oObject.getAggregation(e.name);if(n&&n.getCurrentContexts().length!=s.length){return}}}else{if(e.child instanceof r){this._oObserver.unobserve(e.child,{properties:true,aggregations:true})}for(var i in t){l(this,e.child,t[i],false)}}}else if(e.type==="property"){this.aBindings.forEach(function(t){if(t._mightBeAffectedByChangesInside&&t._mightBeAffectedByChangesInside(e.object)){t.checkUpdate(true)}})}var a;if(e.object===this._oObject){a=function(t){var i=this.resolve(t.sPath,t.oContext);return i?i.startsWith("/"+e.name):true}.bind(this)}this.checkUpdate(false,false,a)};O.prototype.checkUpdate=function(e,t,i){if(t){this.bForceUpdate=this.bForceUpdate||e;if(!this.sUpdateTimer){this.fnFilter=this.fnFilter||i;this.sUpdateTimer=setTimeout(function(){this.checkUpdate(this.bForceUpdate,false,this.fnFilter)}.bind(this),0)}else if(this.fnFilter&&this.fnFilter!==i){this.fnFilter=undefined}return}e=this.bForceUpdate||e;i=!this.fnFilter||this.fnFilter===i?i:undefined;if(this.sUpdateTimer){clearTimeout(this.sUpdateTimer);this.sUpdateTimer=null;this.bForceUpdate=undefined;this.fnFilter=undefined}var r=this.aBindings.slice(0);r.forEach(function(t){if(!i||i(t)){t.checkUpdate(e)}})};return O});
//# sourceMappingURL=ManagedObjectModel.js.map