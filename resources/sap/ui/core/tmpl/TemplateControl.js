/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/DeclarativeSupport","sap/ui/core/UIArea","./DOMElement","./Template","./TemplateControlRenderer","sap/base/strings/capitalize","sap/base/strings/hyphenate","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/core/library"],function(t,e,n,i,r,o,a,p,s,l){"use strict";var c=t.extend("sap.ui.core.tmpl.TemplateControl",{metadata:{library:"sap.ui.core",properties:{context:{type:"object",group:"Data",defaultValue:null}},aggregations:{controls:{type:"sap.ui.core.Control",multiple:true,singularName:"control",visibility:"hidden"}},associations:{template:{type:"sap.ui.core.tmpl.Template",multiple:false}},events:{afterRendering:{},beforeRendering:{}}},renderer:o});c.prototype.init=function(){this._aBindingInfos=[]};c.prototype.isInline=function(){var t=false,e=this.getParent();if(e instanceof n&&l(e.getRootNode()).attr("id")===this.getId()){t=true}return t};c.prototype.placeAt=function(e,n){var i=this.isInline();var r=this.$(),o=this.getUIArea();t.prototype.placeAt.apply(this,arguments);if(i&&r.length===1){r.remove();o.destroyContent()}};c.prototype.getTemplateRenderer=function(){return this.fnRenderer};c.prototype.setTemplateRenderer=function(t){this.fnRenderer=t;return this};c.prototype._cleanup=function(){this.destroyAggregation("controls");this._aBindingInfos.forEach(function(t){var e=t.binding;if(e){e.detachChange(t.changeHandler);e.destroy()}});this._aBindingInfos=[]};c.prototype._compile=function(){var t=sap.ui.getCore().byId(this.getTemplate()),n=t&&t.getDeclarativeSupport();if(n){var i=this;setTimeout(function(){e.compile(i.getDomRef())})}};c.prototype.exit=function(){this._cleanup()};c.prototype.onBeforeRendering=function(){this.fireBeforeRendering();this._cleanup()};c.prototype.onAfterRendering=function(){this.fireAfterRendering()};c.prototype.clone=function(){var e=t.prototype.clone.apply(this,arguments);e.fnRenderer=this.fnRenderer;return e};c.prototype.updateBindings=function(e,n){t.prototype.updateBindings.apply(this,arguments);if(this.getDomRef()){this.invalidate()}};c.prototype.bind=function(t,e){var n=r.parsePath(t),i=this.getModel(n.model),t=n.path,o=e?"bind"+a(e):"bindProperty",p=i&&i[o](t),l={binding:p,path:n.path,model:n.model};if(p){l.changeHandler=function(){s.debug("TemplateControl#"+this.getId()+": "+e+' binding changed for path "'+t+'"');this.invalidate()}.bind(this);p.attachChange(l.changeHandler)}this._aBindingInfos.push(l);return p};c.prototype.calculatePath=function(t,e){var n=this.getBindingContext(),i=n&&n.getPath();if(t&&i&&!t.startsWith("/")){if(!i.endsWith("/")){i+="/"}t=i+t}return t};c.prototype.bindProp=function(t){var e=this.bind(this.calculatePath(t),"property");return e&&e.getExternalValue()};c.prototype.bindList=function(t){var e=this.bind(this.calculatePath(t),"list"),n=e&&e.getModel(),t=e&&e.getPath();return e&&n.getProperty(t)};c.prototype.createDOMElement=function(t,e,n){var r=new i(t);if(e){r.bindObject(e)}if(!n){this.addAggregation("controls",r)}return r};c.prototype.createControl=function(t,n,i,r){var o={};l.each(t,function(t,e){o["data-"+p(t)]=e});var a=l("<div></div>",o);var s=e._createControl(a.get(0),r);if(n){s.bindObject(n)}if(!i){this.addAggregation("controls",s)}return s};return c});