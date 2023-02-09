/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/util/createPromise","sap/ui/integration/designtime/baseEditor/propertyEditor/PropertyEditorFactory","sap/ui/integration/designtime/baseEditor/validator/ValidatorRegistry","sap/ui/integration/designtime/baseEditor/PropertyEditors","sap/ui/integration/designtime/baseEditor/util/binding/resolveBinding","sap/ui/integration/designtime/baseEditor/util/binding/ObjectBinding","sap/ui/integration/designtime/baseEditor/util/hasTag","sap/ui/integration/designtime/baseEditor/util/cleanupDesigntimeMetadata","sap/ui/base/EventProvider","sap/ui/core/Control","sap/ui/model/resource/ResourceModel","sap/base/util/ObjectPath","sap/base/util/each","sap/base/util/deepClone","sap/base/util/deepEqual","sap/base/util/isPlainObject","sap/base/util/isEmptyObject","sap/base/util/restricted/_intersection","sap/base/util/restricted/_flatten","sap/base/util/restricted/_mergeWith","sap/base/util/restricted/_merge","sap/base/util/restricted/_omit","sap/base/util/restricted/_union","sap/base/util/restricted/_isNil","sap/base/util/restricted/_castArray","sap/ui/model/json/JSONModel","sap/base/i18n/ResourceBundle","sap/base/Log","sap/ui/integration/designtime/baseEditor/util/unset"],function(t,e,i,r,o,n,s,a,p,h,d,u,g,f,c,y,l,_,m,b,v,C,E,P,M,O,R,j,D){"use strict";var I="customProperty--";var S=h.extend("sap.ui.integration.designtime.baseEditor.BaseEditor",{metadata:{library:"sap.ui.integration",properties:{json:{type:"object"},config:{type:"object",defaultValue:{i18n:["sap/ui/integration/designtime/baseEditor/i18n/i18n.properties"]}},designtimeMetadata:{type:"object"},layout:{type:"string",defaultValue:"list"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true}},events:{jsonChange:{parameters:{json:{type:"object"}}},designtimeMetadataChange:{parameters:{designtimeMetadata:{type:"object"}}},configChange:{parameters:{config:{type:"object"}}},propertyEditorsReady:{parameters:{propertyEditors:{type:"array"}}},validationErrorChange:{parameters:{hasError:{type:"boolean"}}}}},constructor:function(){this._oSetConfigPromise=Promise.resolve();this._mObservableConfig={};this._mPropertyEditors={};this._aCancelHandlers=[];this._oDataModel=this._createModel();this._oDesigntimeMetadataModel=this._createModel();this._bInitFinished=false;this._bValidatorsReady=false;this._setReady(false);h.prototype.constructor.apply(this,arguments);this._oDataModel.setData(this._prepareData(this.getJson()));this.attachJsonChange(function(t){var e=t.getParameter("json");this._oDataModel.setData(this._prepareData(e));this._checkReady()},this)},renderer:function(t,e){var i=e.getContent();t.openStart("div",e);t.openEnd();if(i.length){i.forEach(function(e){t.renderControl(e)})}else{e.getPropertyEditorsSync().forEach(function(e){t.renderControl(e)})}t.close("div")}});S.prototype.init=function(){};S.prototype.exit=function(){this._reset();this._oDataModel.destroy();this._oDesigntimeMetadataModel.destroy()};S.prototype._prepareData=function(t){var e=f(t);g(this._mObservableConfig,function(t,i){var r=i.path;if(r[0]==="/"){r=r.substr(1)}if(typeof u.get(r.split("/"),e)==="undefined"&&typeof i.defaultValue!=="undefined"){u.set(r.split("/"),f(i.defaultValue),e)}});return e};S.prototype.setJson=function(t){var e;if(typeof t==="string"){try{e=JSON.parse(t)}catch(t){j.error("sap.ui.integration.designtime.baseEditor.BaseEditor: invalid JSON string is specified")}}else if(y(t)){e=v({},t)}else{j.error("sap.ui.integration.designtime.baseEditor.BaseEditor: unsupported data type specified in setJson()")}if(e&&!c(this.getProperty("json"),e,100)){this.setProperty("json",e);this.fireJsonChange({json:e})}};S.prototype.setPreventInitialization=function(t){this._bPreventInitialization=t};S.prototype.setConfig=function(t,e){this._bIsDefaultConfig=e;t=t||{};this._oSetConfigPromise=this._oSetConfigPromise.then(this._registerPropertyEditorTypes.bind(this,t.propertyEditors)).then(this._setConfig.bind(this,t,e));return this._oSetConfigPromise};S.prototype._registerPropertyEditorTypes=function(t){e.deregisterAllTypes();return e.registerTypes(t||{})};S.prototype._setConfig=function(t,e,i){this._initValidators(t.validators||{});var r={propertyEditors:{},properties:{}};var o=B(r,t);if(this._oSpecificConfig){o=e?this._oSpecificConfig:A(o,this._oSpecificConfig,i)}o.i18n=E(o.i18n&&M(o.i18n),this.getMetadata().getProperty("config").getDefaultValue().i18n);this.setProperty("config",o,false);this.fireConfigChange({config:f(o)});this.initialize()};S.prototype.addConfig=function(t,e){this._bIsDefaultConfig=e;this._oSetConfigPromise=this._oSetConfigPromise.then(function(){t=B(this.getConfig(),t);return t.propertyEditors}.bind(this)).then(this._registerPropertyEditorTypes).then(function(i){this._setConfig(t,e,i)}.bind(this));return this._oSetConfigPromise};function B(t,e){var i=v({},t,e);i.i18n=[].concat(t.i18n||[],e.i18n||[]);return i}S.prototype._addSpecificConfig=function(t){var e;this._oSetConfigPromise=this._oSetConfigPromise.then(function(){this._oSpecificConfig=t;e=v({},this.getConfig());e.propertyEditors=V(e,t);return e.propertyEditors}.bind(this)).then(this._registerPropertyEditorTypes).then(function(t){this._setConfig(e,this._bIsDefaultConfig,t)}.bind(this));return this._oSetConfigPromise};function V(t,e){var i={};var r=t.propertyEditors||{};var o=e.propertyEditors||{};E(Object.keys(r),Object.keys(o)).forEach(function(t){i[t]=o[t]||r[t]});return i}function A(t,e,i){t.i18n=E(t.i18n,e.i18n);var r=Object.assign({},t,C(e,["properties","i18n","propertyEditors"]),C(t,["properties","i18n","propertyEditors"]));r.properties={};g(t.properties,function(o,n){var s=t.propertyEditors[n.type]&&t.propertyEditors[n.type].split("/").join(".");var a=s&&i[s].configMetadata;if(a&&e.properties[o]){g(n,function(t,i){var n;var s=a[t]&&a[t].mergeStrategy;if(s){if(s==="mostRestrictiveWins"){var p=a[t].mostRestrictiveValue||false;if(i===p){n=p}else{n=e.properties[o][t]}}else if(s==="intersection"){n=_(i,e.properties[o][t])}}else{n=i}r.properties[o]=r.properties[o]||{};r.properties[o][t]=n})}});return r}S.prototype.setDesigntimeMetadata=function(t,e){var i=f(t,15);if(!c(i,this.getDesigntimeMetadata())){this.setProperty("designtimeMetadata",i);this._oDesigntimeMetadataModel.setData(i);if(!e){this.fireDesigntimeMetadataChange({designtimeMetadata:this._formatExportedDesigntimeMetadata(i)})}}};S.prototype._formatExportedDesigntimeMetadata=function(t){var e={};var i=function(t,r){Object.keys(t).forEach(function(o){var n=t[o];if(o==="__value"){e[r.join("/")]=n}else if(y(n)){i(n,[].concat(r,o))}})};i(t||{},[]);return e};S.prototype._initValidators=function(t){i.deregisterAllValidators();i.registerValidators(t);i.ready().then(function(){this._bValidatorsReady=true;this._checkReady()}.bind(this))};S.prototype._reset=function(){this._bInitFinished=false;this._setReady(false);this._aCancelHandlers.forEach(function(t){t()});if(this._oI18nModel){this._oI18nModel.destroy();delete this._oI18nModel}if(this._oConfigObserver){this._oConfigObserver.destroy()}g(this._mPropertyEditors,function(t,e){e.forEach(function(e){this.deregisterPropertyEditor(e,t)},this)}.bind(this));if(this._oRootWrapper){this._oRootWrapper.destroy()}};S.prototype.initialize=function(){if(!this._bPreventInitialization){this._initialize()}};S.prototype._initialize=function(){this._reset();var t=this.getConfig();if(typeof this.getProperty("json")==="undefined"){this.attachEventOnce("jsonChange",this._initialize);return}if(t){this._oConfigObserver=new n;this._loadI18nBundles(t.i18n).then(function(e){this._oI18nModel=this._createI18nModel(e);this.setModel(this._oI18nModel,"i18n");this._oConfigObserver.addToIgnore(["template","itemLabel"]);this._oConfigObserver.setModel(this._oDataModel);this._oConfigObserver.setModel(this._oDesigntimeMetadataModel,"designtimeMetadata");this._oConfigObserver.setModel(this._oI18nModel,"i18n");var i=this._getContextPath();if(i){this._oConfigObserver.setModel(this._oDataModel,"context");this._oConfigObserver.setBindingContext(this._oDataModel.getContext(i),"context")}var r=o(t.properties,{i18n:this._oI18nModel});this._mObservableConfig=Object.assign(this._mObservableConfig,this._prepareConfig(r));this._oConfigObserver.setObject(this._mObservableConfig);this._oConfigObserver.attachChange(this._onConfigChange,this);var n=this.getContent();if(n.length===0||n.length===1&&n[0]===this._oRootWrapper){this.removeAllContent();this._createEditors(this._oConfigObserver.getObject())}this._bInitFinished=true;this._checkReady()}.bind(this))}};S.prototype._onConfigChange=function(t){var e=t.getParameter("changes").reduce(function(t,e){var i=f(e);i.path=i.path.split("/");i.propertyKey=i.path.shift();if(!t[i.propertyKey]){t[i.propertyKey]=[]}t[i.propertyKey].push(i);return t},{});var i=Object.keys(e).reduce(function(t,e){var i=(this.getPropertyEditorsByNameSync(e)||[]).map(function(t){return{editor:t,propertyName:e}});t=t.concat(i);return t}.bind(this),[]);var r=i.filter(function(t){return!this._oRootWrapper||!this._oRootWrapper._aEditorWrappers.includes(t.editor)}.bind(this));r.forEach(function(i){var r=i.propertyName;var o=t.getSource().getObject();var n=C(f(o[r]),"value");var s=false;var a=e[r]||[];a.forEach(function(t){if(t.path[0]==="value"){i.editor.setValue(t.value)}else{u.set(t.path,t.value,n);s=true}});if(s){i.editor.setConfig(n)}});if(r.length<i.length){var o=f(this._oRootWrapper.getConfig()).map(function(t){var i=e[t.__propertyName]||[];i.forEach(function(e){u.set(e.path,e.value,t)});return t});this._oRootWrapper.setConfig(o)}};S.prototype._createModel=function(){var t=new O;t.setDefaultBindingMode("OneWay");return t};S.prototype.getI18nProperty=function(t,e){if(this.getModel("i18n")){return this.getModel("i18n").getResourceBundle().getText(t,e)}return t};S.prototype._loadI18nBundles=function(t){return this._createPromise(function(e,i){Promise.all(t.map(function(t){return new Promise(function(e,i){R.create({url:sap.ui.require.toUrl(t),async:true}).then(e,i)})})).then(e,i)})};S.prototype._createI18nModel=function(t){var e=t.slice();var i=new d({bundle:e.shift()});i.setDefaultBindingMode("OneWay");e.forEach(function(t){i.enhance(t)});return i};S.prototype._prepareConfig=function(t){var e={};g(t,function(t,i){e[t]=Object.assign({},this._preparePropertyConfig(i),{__propertyName:t})}.bind(this));return e};S.prototype._preparePropertyConfig=function(t){var e=this._getContextPath();if(e&&!e.endsWith("/")){e=e+"/"}var i=t.path;if(!i.startsWith("/")&&e){i=e+i}return Object.assign({},t,{path:i,value:"{"+i+"}",designtime:"{designtimeMetadata>"+i+"}"})};S.prototype._createEditors=function(t){var e=u.get(["layout",this.getLayout()],this.getConfig());if(y(e)||Array.isArray(e)){e=o(e,{i18n:this._oI18nModel})}this._oRootWrapper=new r({config:Object.values(t),layout:this.getLayout(),layoutConfig:e});this.addContent(this._oRootWrapper);return Promise.all(Object.values(this._mPropertyEditors).reduce(function(t,e){return t.concat(e)},[]).map(function(t){return t.ready()})).then(this._checkReady.bind(this))};S.prototype._getRegistrationKey=function(t,e){if(typeof e!=="string"){if(t.isA("sap.ui.integration.designtime.baseEditor.PropertyEditor")&&!t.getConfig()&&!t.getBindingInfo("config")&&t.getPropertyName()){e=t.getPropertyName()}else{e=I+t.getId()}}return e};S.prototype._addCustomProperty=function(t,e){var i=Object.assign({},this._mObservableConfig);i[t]=this._preparePropertyConfig(e);this._mObservableConfig=i;this._oConfigObserver.setObject(i)};S.prototype._removeCustomProperty=function(t){var e=C(this._mObservableConfig,t);this._mObservableConfig=e;this._oConfigObserver.setObject(e)};S.prototype.registerPropertyEditor=function(t,e){e=this._getRegistrationKey(t,e);var i=Array.isArray(this._mPropertyEditors[e])?this._mPropertyEditors[e]:[];this._mPropertyEditors[e]=i.concat(t);if(e.startsWith(I)){this._addCustomProperty(e,t.getConfig())}var r=u.get([e],this._oConfigObserver.getObject()).value;t.setValue(r);t.attachValueChange(this._onValueChange,this);t.attachDesigntimeMetadataChange(this._onDesigntimeMetadataChange,this);t.attachReady(this._checkReady,this);t.attachValidationErrorChange(function(){this.fireValidationErrorChange({hasError:this.hasError()})}.bind(this))};S.prototype.deregisterPropertyEditor=function(t,e){e=this._getRegistrationKey(t,e);var i=this._mPropertyEditors[e];if(e.startsWith(I)){this._removeCustomProperty(e)}t.detachValueChange(this._onValueChange,this);t.detachDesigntimeMetadataChange(this._onDesigntimeMetadataChange,this);if(Array.isArray(i)){this._mPropertyEditors[e]=i.filter(function(e){return t!==e});if(this._mPropertyEditors[e].length===0){delete this._mPropertyEditors[e]}}};S.prototype._setReady=function(t){var e=this._bIsReady;this._bIsReady=t;if(e!==true&&t===true){this.firePropertyEditorsReady({propertyEditors:this.getPropertyEditorsSync()})}};S.prototype._checkReady=function(){var t=this.getContent().filter(function(t){return t.isA("sap.ui.integration.designtime.baseEditor.PropertyEditors")||t.isA("sap.ui.integration.designtime.baseEditor.propertyEditor.BasePropertyEditor")});t.forEach(function(t){if(!p.hasListener(t,"ready",this._checkReady,this)){t.attachReady(this._checkReady,this)}},this);var e=[].concat(t,this.getPropertyEditorsSync());var i=this._bInitFinished&&this._bValidatorsReady&&e.every(function(t){return t.isReady()});this._setReady(i)};S.prototype.isReady=function(){return this._bIsReady};S.prototype.ready=function(){return new Promise(function(t){if(this.isReady()){t()}else{this.attachEventOnce("propertyEditorsReady",t)}}.bind(this))};S.prototype.hasError=function(){return m(Object.values(this._mPropertyEditors||{})).some(function(t){return t.hasError()})};S.prototype._createPromise=function(e){var i=t(e);this._aCancelHandlers.push(i.cancel);var r=function(t,e){this._aCancelHandlers=this._aCancelHandlers.filter(function(e){return e!==t});return e}.bind(this,i.cancel);return i.promise.then(r,r)};S.prototype.getPropertyConfigByName=function(t){return C(u.get([t],this._oConfigObserver.getObject()),"value")};S.prototype.getPropertyEditorsByName=function(t){return new Promise(function(t){if(!this._mPropertyEditors||Object.keys(this._mPropertyEditors).length===0){this.attachEventOnce("propertyEditorsReady",t)}else{t()}}.bind(this)).then(function(){return this.getPropertyEditorsByNameSync(t)}.bind(this))};S.prototype.getPropertyEditorsByNameSync=function(t){var e=this._mPropertyEditors[t];return Array.isArray(e)&&e.slice()||null};S.prototype.getPropertyEditorsByTag=function(t){return new Promise(function(t){if(!this._mPropertyEditors||Object.keys(this._mPropertyEditors).length===0){this.attachEventOnce("propertyEditorsReady",t)}else{t()}}.bind(this)).then(function(){return this.getPropertyEditorsByTagSync(t)}.bind(this))};S.prototype.getConfigsByTag=function(t){var e=this.getConfig().properties;return Object.keys(e).filter(function(i){return s(e[i],t)}).map(function(t){return e[t]})};S.prototype.getPropertyEditorsByTagSync=function(t){return this.getPropertyEditorsSync().filter(function(e){return s(e.getConfig(),t)})};S.prototype.getPropertyEditorsSync=function(){return Object.values(this._mPropertyEditors).reduce(function(t,e){return t.concat(e)},[]).sort(function(t,e){return parseInt(t.getId().match(/\d+$/))-parseInt(e.getId().match(/\d+$/))})};S.prototype.getJson=function(){return v({},this.getProperty("json"))};S.prototype.getDesigntimeMetadata=function(){return v({},this.getProperty("designtimeMetadata"))};S.prototype._getContextPath=function(){var t=this.getConfig();var e=t&&t.context||null;if(e&&e[0]!=="/"){e="/"+e}return e};S.prototype._onValueChange=function(t){var e=t.getSource();var i=t.getParameter("path");var r=this.getJson()||{};var o=t.getParameter("value");if(i[0]==="/"){i=i.substr(1)}else{throw new Error("BaseEditor._onValueChange: unknown relative path - '"+i+"'")}var n=i.split("/");u.set(n,o,r);if(typeof o==="undefined"||c(o,e.getRuntimeConfig().defaultValue)||Array.isArray(o)&&o.length===0||y(o)&&l(o)){D(r,n)}this.setJson(r)};S.prototype._onDesigntimeMetadataChange=function(t){var e=t.getParameter("path");var i=this.getDesigntimeMetadata()||{};var r=t.getParameter("value");if(e[0]==="/"){e=e.substr(1)}else{throw new Error("BaseEditor._onDesigntimeMetadataChange: unknown relative path - '"+e+"'")}var o=e.split("/");u.set(o,r,i);a(i);this.setDesigntimeMetadata(i)};return S});
//# sourceMappingURL=BaseEditor.js.map