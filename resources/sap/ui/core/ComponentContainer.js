/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","./Control","./Component","./library","./ComponentContainerRenderer","sap/base/Log","sap/ui/core/Configuration"],function(e,t,n,o,i,a,r){"use strict";var s=o.ComponentLifecycle;var p=t.extend("sap.ui.core.ComponentContainer",{metadata:{interfaces:["sap.ui.core.IPlaceholderSupport"],library:"sap.ui.core",properties:{name:{type:"string",defaultValue:null},url:{type:"sap.ui.core.URI",defaultValue:null},async:{type:"boolean",defaultValue:false},handleValidation:{type:"boolean",defaultValue:false},settings:{type:"object",defaultValue:null},propagateModel:{type:"boolean",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},lifecycle:{type:"sap.ui.core.ComponentLifecycle",defaultValue:s.Legacy},autoPrefixId:{type:"boolean",defaultValue:false},usage:{type:"string",defaultValue:null},manifest:{type:"any",defaultValue:null}},associations:{component:{type:"sap.ui.core.UIComponent",multiple:false}},events:{componentCreated:{parameters:{component:{type:"sap.ui.core.UIComponent"}}},componentFailed:{allowPreventDefault:true,parameters:{reason:{type:"object"}}}},designtime:"sap/ui/core/designtime/ComponentContainer.designtime"},renderer:i});function l(t,o,i,a){var r=typeof o==="string"?n.get(o):o;var s=t.getComponentInstance();if(s!==r){if(s){s.setContainer(undefined);if(a){s.destroy()}else{t._propagateProperties(true,s,e._oEmptyPropagatedProperties,true)}}t.setAssociation("component",r,i);r=t.getComponentInstance();if(r){r.setContainer(t);t.propagateProperties(true)}}}p.prototype.getComponentInstance=function(){var e=this.getComponent();return e&&n.get(e)};var f={onAfterRendering:function(){if(this._placeholder){this._placeholder.show(this)}}};p.prototype.showPlaceholder=function(e){var t;if(!r.getPlaceholder()){return}if(this._placeholder){this.hidePlaceholder()}if(e.placeholder){this._placeholder=e.placeholder;t=this._placeholder._load()}else{t=Promise.resolve()}if(this.getDomRef()&&this._placeholder){this._placeholder.show(this)}this.addEventDelegate(f,this);return t};p.prototype.hidePlaceholder=function(){if(this._placeholder){this._placeholder.hide();this.removeEventDelegate(f);this._placeholder=undefined}};p.prototype.setComponent=function(e,t){l(this,e,t,this.getLifecycle()===s.Container||typeof this.getUsage()==="string"&&this.getUsage()&&this.getLifecycle()===s.Legacy);return this};p.prototype.applySettings=function(e,n){if(e){if(e.manifest==="true"||e.manifest==="false"){e.manifest=e.manifest==="true"}if(e.manifest&&e.async===undefined){e.async=true}}t.prototype.applySettings.apply(this,arguments)};function u(e){var t=e.getName();var n=e.getManifest();var o=e.getUrl();var i=e.getSettings();var a={name:t?t:undefined,manifest:n!==null?n:false,async:e.getAsync(),url:o?o:undefined,handleValidation:e.getHandleValidation(),settings:i!==null?i:undefined};return a}p.prototype._createComponent=function(){var e=n.getOwnerComponentFor(this),t=this.getUsage(),o=u(this);if(t){if(e){o=e._enhanceWithUsageConfig(t,o)}else{a.error('ComponentContainer "'+this.getId()+'" does have a "usage", but no owner component!')}}if(this.getAutoPrefixId()){if(o.id){o.id=this.getId()+"-"+o.id}if(o.settings&&o.settings.id){o.settings.id=this.getId()+"-"+o.settings.id}}return n._createComponent(o,e)};p.prototype.onBeforeRendering=function(){var e=this.getComponentInstance(),t=this.getUsage(),n=this.getName(),o=this.getManifest();if(!this._oComponentPromise&&!e&&(t||n||o)){e=this._createComponent();if(e instanceof Promise){this._oComponentPromise=e;e.then(function(e){delete this._oComponentPromise;this.setComponent(e);this.fireComponentCreated({component:e})}.bind(this),function(e){delete this._oComponentPromise;if(this.fireComponentFailed({reason:e})){a.error("Failed to load component for container "+this.getId(),e)}}.bind(this))}else if(e){this.setComponent(e,true);this.fireComponentCreated({component:e})}else{this.fireComponentFailed({reason:new Error("The component could not be created.")})}}if(e&&e.onBeforeRendering){e.onBeforeRendering()}};p.prototype.onAfterRendering=function(){var e=this.getComponentInstance();if(e&&e.onAfterRendering){e.onAfterRendering()}};p.prototype.exit=function(){l(this,undefined,true,this.getLifecycle()!==s.Application)};p.prototype.propagateProperties=function(e){var n=this.getComponentInstance();if(n&&this.getPropagateModel()){this._propagateProperties(e,n)}t.prototype.propagateProperties.apply(this,arguments)};p.prototype._propagateContextualSettings=function(){var e=this.getComponentInstance();if(e){e._applyContextualSettings(this._getContextualSettings())}};return p});
//# sourceMappingURL=ComponentContainer.js.map