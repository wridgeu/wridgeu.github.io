/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/base/ManagedObjectMetadata","sap/ui/core/ComponentContainer","sap/ui/core/Placeholder","sap/ui/core/library","sap/ui/core/Configuration"],function(e,t,o,n,i,r){"use strict";var a=i.ComponentLifecycle;return{display:function(e){var t=Promise.resolve();return this._display(e,t)},_display:function(e,t,o){if(this._oParent){t=this._oParent._display(e,t,Object.assign({},o))}return this._place(e,t,o)},suspend:function(){if(this._oParent){this._oParent.suspend()}if(this._isLoaded()){var t=this._get(),o;if(t.isA("sap.ui.core.UIComponent")&&(o=t.getRouter())&&t.hasNativeRouter()){o.stop()}}else{e.warning("The target with name '"+this._oOptions._name+"' can't be suspended because it's being loaded or not loaded yet")}return this},resume:function(){if(this._oParent){this._oParent.resume()}if(this._isLoaded()){var e=this._get(),t;if(e.isA("sap.ui.core.UIComponent")&&(t=e.getRouter())&&e.hasNativeRouter()){t.initialize(true)}}return this},_isLoaded:function(){return this._bIsLoaded},_getCreateOptions:function(){var e=this._getEffectiveObjectName(this._oOptions.name),o=this._oOptions,n;switch(o.type){case"View":n={name:e,type:o.viewType,id:o.id,async:true};break;case"Component":o.id=o.id||t.uid("uicomponent");n={id:o.id};if(o.usage){n.usage=o.usage}else{n.name=e}n=Object.assign({},o.options||{},n);break;default:throw new Error("The given type "+o.type+" isn't support by sap.ui.core.routing.Target")}return n},_get:function(e){var t=this._getCreateOptions();return this._oCache._get(t,this._oOptions.type,this._bUseRawViewId,e)},_load:function(e){var t=this._get(e),o;if(!(t instanceof Promise)){if(t.isA("sap.ui.core.mvc.View")){o=t.loaded()}else{o=Promise.resolve(t)}}else{o=t}return o.then(function(e){this._bIsLoaded=true;return e}.bind(this))},load:function(e){return this._load(e).then(function(t){return{object:t,nestedComponentReady:this.waitForComponentTarget({target:t,createInfo:e})}}.bind(this))},waitForComponentTarget:function(e){return new Promise(function(t,o){var n=e.target;var i=e.createInfo;var r=true;if(n.isA("sap.ui.core.UIComponent")){var a=n.getRouter();if(a&&n.hasNativeRouter()){var s=a.getHashChanger().getHash();var l=a.getRouteByHash(s);var c=i&&i.ignoreInitialHash;if(!a._oConfig.async){throw new Error("The router of component '"+n.getId()+"' which is loaded via the target '"+this._oOptions._name+"' is defined as synchronous which is not supported using as a nested component.")}if(a._oOwner&&i){a._oOwner._bRoutingPropagateTitle=i.propagateTitle}if(!c&&(!a.isInitialized()||a._bMatchingProcessStarted)&&l&&l._oConfig.target){r=false;a.attachRouteMatched(t)}if(a.isStopped()){a.initialize(c)}}}if(r){t()}}.bind(this))},resolveContainerControl:function(e){return Promise.resolve().then(function(){e=e||{};var t=this._oOptions;var o=this._isValid(e);var n;if(o!==true){n=o;return this._refuseInvalidTarget(t._name,n)}var i=e.view,r=e.control,a,s;if(i&&i.isA("sap.ui.core.ComponentContainer")){i=i.getComponentInstance().getRootControl()}if(!i&&t.rootView){a=Promise.resolve(t.rootView).then(function(e){var o;if(e){o=sap.ui.getCore().byId(e);t.rootView=e}if(!o){n="Did not find the root view with the id "+t.rootView;return this._refuseInvalidTarget(t._name,n)}else{return o}}.bind(this))}else{a=Promise.resolve(i)}a=a.then(function(e){if(e&&e.isA("sap.ui.core.mvc.View")){return e.loaded()}else{return e}});if(t.controlId){s=a.then(function(e){var o;if(e){o=e.byId(t.controlId)}if(!o){o=sap.ui.getCore().byId(t.controlId)}return o})}else{s=Promise.resolve(r)}return s.then(function(e){if(!e){n="Control with ID "+t.controlId+" could not be found";return this._refuseInvalidTarget(t._name,n)}else{return e}}.bind(this))}.bind(this))},displayPlaceholder:function(e,t){var i,s=this._oOptions,l=s.type==="Component",c=false,d=e.placeholder||s.placeholder||{},h=Promise.resolve();if(n.hasProviders()){Object.assign(d,n.getPlaceholderFromProviders({name:s.name,type:s.type}))}if(Object.keys(d).length>0){if(d.autoClose===undefined){d.autoClose=true}c=true}if(l){var u=this._oCache._oComponent;var f=s.id+"-container";i=u&&u.byId(f)||sap.ui.getCore().byId(f);if(!i){var p=Object.assign({height:"100%",width:"100%",lifecycle:a.Application},s.containerOptions);if(u){u.runAsOwner(function(){i=new o(u.createId(f),p)})}else{i=new o(f,p)}}if(c){d.container=i}}if(c&&t.isA("sap.ui.core.IPlaceholderSupport")){d.container=t}if(d.container&&!e.repeatedRoute){d.aggregation=this._oOptions.controlAggregation;var g=this._getCreateOptions();var v=this._oCache.fetch(g,this._oOptions.type);if(v&&l){d.object=i}else{d.object=v}if(d.html){d.placeholder=new n({html:d.html})}if(d.placeholder&&r.getPlaceholder()){h=this.showPlaceholder(d)}}return h.then(function(e){return{containerControl:t,object:i,placeholderConfig:d,placeholderShown:!!e}})},_place:function(t,o,n){var i=this._oOptions,r=this,a,s=i.type==="Component";var l,c;if(t instanceof Promise){n=o;o=t;t=undefined}n=n||{};if((i.name||i.usage)&&i.type){l=this.load(n);if(this._oParent||n.legacy){c=o.then(this.resolveContainerControl.bind(this))}else{c=this.resolveContainerControl()}c=c.then(this.displayPlaceholder.bind(this,n));o=Promise.all([l,c,o]).then(function(e){var t=e[0].object,o=e[1],n,i;o.nestedComponentReady=e[0].nestedComponentReady;if(s){var a=t.destroy;t.destroy=function(){if(a){a.apply(this)}o.object.destroy()};o.object.setComponent(t);i=t.getRootControl();if(i&&i.isA("sap.ui.core.mvc.View")){n=i}}else{o.object=t;n=t}r._bindTitleInTitleProvider(n);r._addTitleProviderAsDependent(n);return o}).then(function(o){var n=o.containerControl,s=o.object;r._beforePlacingViewIntoContainer({container:n,view:s,data:t});var l=n.getMetadata().getJSONKeys()[i.controlAggregation];if(!l){a="Control "+i.controlId+" does not have an aggregation called "+i.controlAggregation;return r._refuseInvalidTarget(i._name,a)}if(i.clearControlAggregation===true){n[l._sRemoveAllMutator]()}e.info("Did place the "+i.type.toLowerCase()+" target '"+(i.name?r._getEffectiveObjectName(i.name):i.usage)+"' with the id '"+s.getId()+"' into the aggregation '"+i.controlAggregation+"' of a control with the id '"+n.getId()+"'",r);n[l._sMutator](s);return{name:i._name,view:s,control:n,nestedComponentReady:o.nestedComponentReady,placeholderConfig:o.placeholderConfig,placeholderShown:o.placeholderShown}})}else{o=o.then(function(){return{name:i._name}})}return o.then(function(e){var o=e.nestedComponentReady||Promise.resolve();return o.then(function(){var o=e.control,i=e.view,a=e.placeholderConfig;if(o&&i){r.fireDisplay({view:i.isA("sap.ui.core.mvc.View")?i:undefined,object:i,control:o,data:t,routeRelevant:n.routeRelevant})}if(a&&a.container&&a.autoClose&&r.hidePlaceholder){r.hidePlaceholder(a)}return e})})},showPlaceholder:function(e){if(e.container&&e.container.showPlaceholder){return e.container.showPlaceholder(e)}else{return Promise.resolve()}},hidePlaceholder:function(e){if(e.container.hidePlaceholder){e.container.hidePlaceholder()}},_isValid:function(t){var o=this._oOptions,n=t&&t.control,i=n||o.controlId,r=true,a="";if(!i){a="The target "+o._name+" has no controlId set and no parent so the target cannot be displayed.";r=false}if(!o.controlAggregation){a="The target "+o._name+" has a control id or a parent but no 'controlAggregation' was set, so the target could not be displayed.";r=false}if(a){e.error(a,this)}return r||a},_refuseInvalidTarget:function(e,t){return Promise.reject(new Error(t+" - Target: "+e))}}});
//# sourceMappingURL=Target.js.map