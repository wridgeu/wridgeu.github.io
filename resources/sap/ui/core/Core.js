/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/Device","sap/ui/base/EventProvider","sap/ui/base/Interface","sap/ui/base/Object","sap/ui/base/ManagedObject","./Component","./Configuration","./Element","./ElementMetadata","./Lib","./Rendering","./RenderManager","./UIArea","./message/MessageManager","sap/base/Log","sap/ui/performance/Measurement","sap/ui/security/FrameOptions","sap/base/assert","sap/base/util/ObjectPath","sap/ui/performance/trace/initTraces","sap/base/util/isEmptyObject","sap/base/util/each","sap/ui/VersionInfo","sap/ui/events/jquery/EventSimulation"],function(jQuery,e,t,n,o,i,r,a,s,u,c,p,d,l,f,h,g,y,m,v,E,b,C,T){"use strict";if(sap.ui.getCore&&sap.ui.getCore()){return sap.ui.getCore()}var M;var S;E();var _;var I=function(e,t){var n=[],o=0,i=0;this.startTask=function(e){var t=n.length;n[t]={name:e,finished:false};o++;return t};this.finishTask=function(t,a){if(!n[t]||n[t].finished){throw new Error("trying to finish non existing or already finished task")}n[t].finished=true;o--;if(a===false){i++}if(o===0){h.info("Sync point '"+e+"' finished (tasks:"+n.length+", open:"+o+", failures:"+i+")");r()}};function r(){if(t){t(o,i)}t=null}h.info("Sync point '"+e+"' created")};var L=o.extend("sap.ui.core.Core",{constructor:function(){var e=this,n="sap.ui.core.Core";if(sap.ui.getCore&&sap.ui.getCore()){h.error("Only the framework must create an instance of sap/ui/core/Core."+" To get access to its functionality, use sap.ui.getCore().");return sap.ui.getCore()}o.call(this);_=new t;["attachEvent","detachEvent","getEventingParent"].forEach(function(e){L.prototype[e]=_[e].bind(_)});this.bBooted=false;this.bInitialized=false;this.aPlugins=[];this.oModels={};this.oEventBus=null;Object.defineProperty(this,"mElements",{get:function(){h.error("oCore.mElements was a private member and has been removed. Use one of the methods in sap.ui.core.Element.registry instead");return s.registry.all()},configurable:false});this.mObjects={template:{}};this.oRootComponent=null;this.aInitListeners=[];this.bInitLegacyLib=false;h.info("Creating Core",null,n);g.start("coreComplete","Core.js - complete");g.start("coreBoot","Core.js - boot");g.start("coreInit","Core.js - init");a.setCore(this);var i=a.getValue("frameOptionsConfig")||{};i.mode=a.getFrameOptions();i.allowlistService=a.getAllowlistService();this.oFrameOptions=new y(i);this._grantFriendAccess();var r=this.aModules=a.getValue("modules");if(a.getDebug()){r.unshift("sap.ui.debug.DebugEnv")}var u=r.indexOf("sap.ui.core.library");if(u!=0){if(u>0){r.splice(u,1)}r.unshift("sap.ui.core.library")}if(a.getValue("xx-lesssupport")&&r.indexOf("sap.ui.core.plugin.LessSupport")==-1){h.info("Including LessSupport into declared modules");r.push("sap.ui.core.plugin.LessSupport")}var p=a.getPreload();var d=p==="async"||sap.ui.loader.config().async;document.documentElement.classList.add("sapUiTheme-"+a.getTheme());h.info("Declared theme "+a.getTheme(),null,n);h.info("Declared modules: "+r,n);this._setupContentDirection();this._setupBrowser();this._setupOS();this._setupLang();this._setupAnimation();sap.ui.getCore=function(){return e.getInterface()};var l=new I("UI5 Document Ready",function(t,n){e.init()});var f=l.startTask("document.ready");var m=l.startTask("preload and boot");var v=function(){h.trace("document is ready");l.finishTask(f);document.removeEventListener("DOMContentLoaded",v)};if(document.readyState!=="loading"){v()}else{document.addEventListener("DOMContentLoaded",v)}var E=new I("UI5 Core Preloads and Bootstrap Script",function(t,n){h.trace("Core loaded: open="+t+", failures="+n);e._boot(d,function(){l.finishTask(m);g.end("coreBoot")})});var b=E.startTask("create sp2 tasks task");if(a.getValue("versionedLibCss")){var C=E.startTask("load version info");var M=function(e){if(e){h.trace('Loaded "sap-ui-version.json".')}else{h.error('Could not load "sap-ui-version.json".')}E.finishTask(C)};if(d){T.load().then(M,function(e){h.error('Unexpected error when loading "sap-ui-version.json": '+e);E.finishTask(C)})}else{M(sap.ui.getVersionInfo({async:d,failOnError:false}))}}this._polyfillFlexbox();var S=E.startTask("bootstrap script");this.boot=function(){if(this.bBooted){return}this.bBooted=true;P.call(this);E.finishTask(S)};function P(){var t=a.getValue("xx-bootTask");if(t){var n=E.startTask("custom boot task");t(function(e){E.finishTask(n,typeof e==="undefined"||e===true)})}if(p==="sync"||p==="async"){var o=e.aModules.reduce(function(e,t){var n=t.search(/\.library$/);if(n>=0){e.push(t.slice(0,n))}return e},[]);var i=c._load(o,{sync:!d,preloadOnly:true});if(d){var r=E.startTask("preload bootstrap libraries");i.then(function(){E.finishTask(r)},function(){E.finishTask(r,false)})}}var s=a.getAppCacheBuster();if(s&&s.length>0){if(d){var u=E.startTask("require AppCachebuster");sap.ui.require(["sap/ui/core/AppCacheBuster"],function(e){e.boot(E);E.finishTask(u)})}else{var l=sap.ui.requireSync("sap/ui/core/AppCacheBuster");l.boot(E)}}if(a.getSupportMode()!==null){var f=E.startTask("support info script");var g=function(e,t){e.initializeSupportMode(a.getSupportMode(),d);t.initSupportRules(a.getSupportMode());E.finishTask(f)};if(d){sap.ui.require(["sap/ui/core/support/Support","sap/ui/support/Bootstrap"],g,function(e){h.error("Could not load support mode modules:",e)})}else{h.warning("Synchronous loading of Support mode. Set preload configuration to 'async' or switch to asynchronous bootstrap to prevent these synchronous request.","SyncXHR",null,function(){return{type:"SyncXHR",name:"support-mode"}});g(sap.ui.requireSync("sap/ui/core/support/Support"),sap.ui.requireSync("sap/ui/support/Bootstrap"))}}if(a.getTestRecorderMode()!==null){var y=E.startTask("test recorder script");var m=function(e){e.init(a.getTestRecorderMode());E.finishTask(y)};if(d){sap.ui.require(["sap/ui/testrecorder/Bootstrap"],m,function(e){h.error("Could not load test recorder:",e)})}else{h.warning("Synchronous loading of Test recorder mode. Set preload configuration to 'async' or switch to asynchronous bootstrap to prevent these synchronous request.","SyncXHR",null,function(){return{type:"SyncXHR",name:"test-recorder-mode"}});m(sap.ui.requireSync("sap/ui/testrecorder/Bootstrap"))}}E.finishTask(b)}},metadata:{publicMethods:["isInitialized","attachInit","getConfiguration","lock","unlock","isLocked","createUIArea","getUIArea","getUIDirty","applyChanges","getStaticAreaRef","createRenderManager","applyTheme","setThemeRoot","attachThemeChanged","detachThemeChanged","isThemeApplied","notifyContentDensityChanged","getCurrentFocusedControlId","isMobile","getEventBus","byId","byFieldGroupId","getLoadedLibraries","loadLibrary","initLibrary","getLibraryResourceBundle","setModel","getModel","hasModel","getMessageManager","attachEvent","detachEvent","attachControlEvent","detachControlEvent","attachParseError","detachParseError","attachValidationError","detachValidationError","attachFormatError","detachFormatError","attachValidationSuccess","detachValidationSuccess","attachLocalizationChanged","detachLocalizationChanged","isStaticAreaRef","fireFormatError","fireValidationSuccess","fireValidationError","fireParseError","boot","addPrerenderingTask","setMessageManager","attachLibraryChanged","detachLibraryChanged","loadLibraries","attachThemeScopingChanged","detachThemeScopingChanged","fireThemeScopingChanged","includeLibraryTheme","attachInitEvent","registerPlugin","unregisterPlugin","setRoot","getRootComponent","getApplication","getControl","getComponent","getTemplate","createComponent","attachIntervalTimer","detachIntervalTimer","getElementById","getRenderManager"]}});L.M_EVENTS={ControlEvent:"ControlEvent",UIUpdated:"UIUpdated",ThemeChanged:"ThemeChanged",ThemeScopingChanged:"themeScopingChanged",LocalizationChanged:"localizationChanged",LibraryChanged:"libraryChanged",ValidationError:"validationError",ParseError:"parseError",FormatError:"formatError",ValidationSuccess:"validationSuccess"};L.prototype._grantFriendAccess=function(){u.prototype.register=function(e){c._registerElement(e)}};L.prototype._setupContentDirection=function(){var e="sap.ui.core.Core",t=a.getRTL()?"rtl":"ltr";document.documentElement.setAttribute("dir",t);h.info("Content direction set to '"+t+"'",null,e)};L.prototype._setupBrowser=function(){var t="sap.ui.core.Core";var n=document.documentElement;var o=e.browser;var i=o.name;if(i){if(i===o.BROWSER.SAFARI&&o.mobile){i="m"+i}i=i+(o.version===-1?"":Math.floor(o.version));n.dataset.sapUiBrowser=i;h.debug("Browser-Id: "+i,null,t)}};L.prototype._setupOS=function(t){var t=document.documentElement;t.dataset.sapUiOs=e.os.name+e.os.versionStr;var n=null;switch(e.os.name){case e.os.OS.IOS:n="sap-ios";break;case e.os.OS.ANDROID:n="sap-android";break}if(n){t.classList.add(n)}};L.prototype._setupLang=function(){var e=document.documentElement;var t=function(){var t=a.getLocale();t?e.setAttribute("lang",t.toString()):e.removeAttribute("lang")};t.call(this);this.attachLocalizationChanged(t,this)};L.prototype._setupAnimation=function(){var e=document.documentElement;var t=a.getAnimationMode();e.dataset.sapUiAnimationMode=t;var n=t!==a.AnimationMode.minimal&&t!==a.AnimationMode.none;e.dataset.sapUiAnimation=n?"on":"off";if(typeof jQuery!=="undefined"){jQuery.fx.off=!n}};L.prototype._polyfillFlexbox=function(){jQuery.support.useFlexBoxPolyfill=false};L.prototype._boot=function(e,t){this.aModules.push("sap/ui/core/date/"+a.getCalendarType());if(e){return this._requireModulesAsync().then(function(){t()})}h.warning("Modules and libraries declared via bootstrap-configuration are loaded synchronously. Set preload configuration to"+" 'async' or switch to asynchronous bootstrap to prevent these requests.","SyncXHR",null,function(){return{type:"SyncXHR",name:"legacy-module"}});this.aModules.forEach(function(e){var t=e.match(/^(.*)\.library$/);if(t){c._load(t[1],{sync:true})}else{sap.ui.requireSync(/^jquery\.sap\./.test(e)?e:e.replace(/\./g,"/"))}});t()};L.prototype._requireModulesAsync=function(){var e=[],t=[];this.aModules.forEach(function(n){var o=n.match(/^(.*)\.library$/);if(o){e.push(o[1])}else{t.push(/^jquery\.sap\./.test(n)?n:n.replace(/\./g,"/"))}});return Promise.all([c._load(e),new Promise(function(e){sap.ui.require(t,function(){e(Array.prototype.slice.call(arguments))})})])};L.prototype.applyTheme=function(e,t){m(typeof e==="string","sThemeName must be a string");m(typeof t==="string"||typeof t==="undefined","sThemeBaseUrl must be a string or undefined");e=a.normalizeTheme(e,t);if(e&&a.getTheme()!=e){a.setTheme(e);this._getThemeManager().then(function(n){n.applyTheme(e,t,true)})}};L.prototype.setThemeRoot=function(e,t,n,o){this._getThemeManager().then(function(i){i.setThemeRoot(e,t,n,o)});return this};L.prototype.init=function(){if(this.bInitialized){return}l.setCore(this);var e="sap.ui.core.Core.init()";h.info("Initializing",null,e);g.end("coreInit");this._setBodyAccessibilityRole();var t=a.getValue("xx-waitForTheme");if(this.isThemeApplied()||!t){this._executeInitialization()}else{p.suspend();if(t==="rendering"){p.notifyInteractionStep();this._executeInitialization();p.getLogger().debug("delay initial rendering until theme has been loaded");_.attachEventOnce(L.M_EVENTS.ThemeChanged,function(){p.resume("after theme has been loaded")},this)}else if(t==="init"){p.getLogger().debug("delay init event and initial rendering until theme has been loaded");p.notifyInteractionStep();_.attachEventOnce(L.M_EVENTS.ThemeChanged,function(){this._executeInitialization();p.resume("after theme has been loaded")},this)}this._getThemeManager()}};L.prototype._executeOnInit=function(){var e=a.getValue("onInit");if(e){if(typeof e==="function"){e()}else if(typeof e==="string"){var t=/^module\:((?:[_$.\-a-zA-Z0-9]+\/)*[_$.\-a-zA-Z0-9]+)$/.exec(e);if(t&&t[1]){setTimeout(sap.ui.require.bind(sap.ui,[t[1]]),0)}else{var n=v.get(e);if(typeof n==="function"){n()}else{h.warning("[Deprecated] Do not use inline JavaScript code with the oninit attribute."+" Use the module:... syntax or the name of a global function");window.eval(e)}}}}};L.prototype._setupRootComponent=function(){var e="sap.ui.core.Core.init()";var t=a.getRootComponent();if(t){h.info("Loading Root Component: "+t,null,e);var n=sap.ui.component({name:t});this.oRootComponent=n;var i=a.getValue("xx-rootComponentNode");if(i&&n.isA("sap.ui.core.UIComponent")){var r=document.getElementById(i);if(r){h.info("Creating ComponentContainer for Root Component: "+t,null,e);var s=sap.ui.requireSync("sap/ui/core/ComponentContainer"),u=new s({component:n,propagateModel:true});u.placeAt(r)}}}else{var c=a.getApplication();if(c){h.warning("The configuration 'application' is deprecated. Please use the configuration 'component' instead! "+"Please migrate from sap.ui.app.Application to sap.ui.core.Component.","SyncXHR",null,function(){return{type:"Deprecation",name:"sap.ui.core"}});h.info("Loading Application: "+c,null,e);sap.ui.requireSync(c.replace(/\./g,"/"));var p=v.get(c);m(p!==undefined,'The specified application "'+c+'" could not be found!');var d=new p;m(o.isA(d,"sap.ui.app.Application"),'The specified application "'+c+'" must be an instance of sap.ui.app.Application!')}}};L.prototype._setBodyAccessibilityRole=function(){var e=document.body;if(a.getAccessibility()&&a.getAutoAriaBodyRole()&&!e.getAttribute("role")){e.setAttribute("role","application")}};L.prototype._executeInitListeners=function(){var e="sap.ui.core.Core.init()";var t=this.aInitListeners;this.aInitListeners=undefined;if(t&&t.length>0){h.info("Fire Loaded Event",null,e);t.forEach(function(e){e()})}};L.prototype._executeInitialization=function(){var e="sap.ui.core.Core.init()";if(this.bInitialized){return}this.bInitialized=true;h.info("Initialized",null,e);h.info("Starting Plugins",null,e);this.startPlugins();h.info("Plugins started",null,e);this._executeOnInit();this._setupRootComponent();this._executeInitListeners()};L.prototype.isInitialized=function(){return this.bInitialized};L.prototype.isThemeApplied=function(){S=S||sap.ui.require("sap/ui/core/theming/ThemeManager");return S?S.themeLoaded:false};L.prototype._getThemeManager=function(e){S=S||sap.ui.require("sap/ui/core/theming/ThemeManager");if(!this.pThemeManager){if(!S){this.pThemeManager=new Promise(function(e,t){sap.ui.require(["sap/ui/core/theming/ThemeManager"],function(t){e(t)},t)})}else{this.pThemeManager=Promise.resolve(S)}this.pThemeManager=this.pThemeManager.then(function(e){e.attachEvent("ThemeChanged",function(e){this.fireThemeChanged(e.getParameters())}.bind(this));return e}.bind(this))}if(S&&e){S.reset()}return this.pThemeManager};L.prototype.attachInitEvent=function(e){m(typeof e==="function","fnFunction must be a function");if(this.aInitListeners){this.aInitListeners.push(e)}};L.prototype.attachInit=function(e){m(typeof e==="function","fnFunction must be a function");if(this.aInitListeners){this.aInitListeners.push(e)}else{e()}};L.prototype.lock=function(){this.bLocked=true};L.prototype.unlock=function(){this.bLocked=false};L.prototype.isLocked=function(){return this.bLocked};L.prototype.getConfiguration=function(){return a};L.prototype.getRenderManager=function(){return this.createRenderManager()};L.prototype.createRenderManager=function(){m(this.isInitialized(),"A RenderManager should be created only after the Core has been initialized");var e=new d;return e.getInterface()};L.prototype.getCurrentFocusedControlId=function(){if(!this.isInitialized()){throw new Error("Core must be initialized")}M=M||sap.ui.require("sap/ui/core/FocusHandler");return M?M.getCurrentFocusedControlId():null};L.prototype.loadLibrary=function(e,t){var n={name:e};var o={sync:true};if(typeof t==="boolean"){o.sync=!t}else if(typeof t==="string"){n.url=t}else if(typeof t==="object"){o.sync=!t.async;n.url=t.url}var i=c._load(n,o);if(!o.sync){return i.then(function(e){return e[0]})}else{return i[0]}};L.prototype.loadLibraries=function(e,t){t=Object.assign({async:true},t);t.sync=!t.async;var n=c._load(e,t);if(!t.sync){return n}else{return undefined}};L.prototype.createComponent=function(e,t,n,o){if(typeof e==="string"){e={name:e,url:t};if(typeof n==="object"){e.settings=n}else{e.id=n;e.settings=o}}if(e.async&&(e.manifest!==undefined||e.manifestFirst===undefined&&e.manifestUrl===undefined)){if(e.manifest===undefined){e.manifest=false}return r.create(e)}return sap.ui.component(e)};L.prototype.getRootComponent=function(){return this.oRootComponent};L.prototype.initLibrary=function(e){m(typeof e==="string"||typeof e==="object","oLibInfo must be a string or object");var t=typeof e==="string";if(t){e={name:e}}var n=e.name,o="sap.ui.core.Core.initLibrary()";if(t){h.error("[Deprecated] library "+n+" uses old fashioned initLibrary() call (rebuild with newest generator)")}if(!n){h.error("A library name must be provided.",null,o);return}var i=c.get(n);if(i&&i.isSettingsEnhanced()){return v.get(n)}return c.init(e)};L.prototype.includeLibraryTheme=function(e,t,n){var o=c._get(e,true);o._includeTheme(t,n)};L.prototype.getLoadedLibraries=function(){return c.all()};L.prototype.getLibraryResourceBundle=function(e,t,n){if(typeof e==="boolean"){n=e;e=undefined;t=undefined}if(typeof t==="boolean"){n=t;t=undefined}m(e===undefined&&t===undefined||typeof e==="string","sLibraryName must be a string or there is no argument given at all");m(t===undefined||typeof t==="string","sLocale must be a string or omitted");e=e||"sap.ui.core";var o=c._get(e||"sap.ui.core",true);return o._loadResourceBundle(t,!n)};function P(e,t){m(typeof e==="string"||typeof e==="object","oDomRef must be a string or object");m(t instanceof n||o.isA(t,"sap.ui.core.Control"),"oControl must be a Control or Interface");if(t){t.placeAt(e,"only")}}L.prototype.setRoot=P;L.prototype.createUIArea=function(e){return l.create(e)};L.prototype.getUIArea=function(e){m(typeof e==="string"||typeof e==="object","o must be a string or object");var t="";if(typeof e=="string"){t=e}else{t=e.id}if(t){return l.registry.get(t)}return null};L.prototype.getUIDirty=function(){return p.getUIDirty()};L.prototype.attachUIUpdated=function(e,t){_.attachEvent(L.M_EVENTS.UIUpdated,e,t)};L.prototype.detachUIUpdated=function(e,t){_.detachEvent(L.M_EVENTS.UIUpdated,e,t)};p.attachUIUpdated(function(e){_.fireEvent(L.M_EVENTS.UIUpdated,e.getParameters())});L.prototype.notifyContentDensityChanged=function(){this._getThemeManager().then(function(e){e.notifyContentDensityChanged()})};L.prototype.attachThemeChanged=function(e,t){this._getThemeManager();_.attachEvent(L.M_EVENTS.ThemeChanged,e,t)};L.prototype.detachThemeChanged=function(e,t){_.detachEvent(L.M_EVENTS.ThemeChanged,e,t)};L.prototype.fireThemeChanged=function(e){var t=L.M_EVENTS.ThemeChanged;_.fireEvent(t,e)};L.prototype.attachThemeScopingChanged=function(e,t){_.attachEvent(L.M_EVENTS.ThemeScopingChanged,e,t)};L.prototype.detachThemeScopingChanged=function(e,t){_.detachEvent(L.M_EVENTS.ThemeScopingChanged,e,t)};L.prototype.fireThemeScopingChanged=function(e){_.fireEvent(L.M_EVENTS.ThemeScopingChanged,e)};L.prototype.attachLocalizationChanged=function(e,t){_.attachEvent(L.M_EVENTS.LocalizationChanged,e,t)};L.prototype.detachLocalizationChanged=function(e,t){_.detachEvent(L.M_EVENTS.LocalizationChanged,e,t)};L.prototype.fireLocalizationChanged=function(e){var t=L.M_EVENTS.LocalizationChanged,n=jQuery.Event(t,{changes:e}),o=i._handleLocalizationChange;h.info("localization settings changed: "+Object.keys(e).join(","),null,"sap.ui.core.Core");C(this.oModels,function(e,t){if(t&&t._handleLocalizationChange){t._handleLocalizationChange()}});function u(e){l.registry.forEach(function(t){o.call(t,e)});r.registry.forEach(function(t){o.call(t,e)});s.registry.forEach(function(t){o.call(t,e)})}u.call(this,1);u.call(this,2);if(e.rtl!=undefined){document.documentElement.setAttribute("dir",e.rtl?"rtl":"ltr");this._getThemeManager().then(function(e){e._updateThemeUrls(a.getTheme())});l.registry.forEach(function(e){e.invalidate()});h.info("RTL mode "+e.rtl?"activated":"deactivated")}s.registry.forEach(function(e){e._handleEvent(n)});_.fireEvent(t,{changes:e})};L.prototype.attachLibraryChanged=function(e,t){_.attachEvent(L.M_EVENTS.LibraryChanged,e,t)};L.prototype.detachLibraryChanged=function(e,t){_.detachEvent(L.M_EVENTS.LibraryChanged,e,t)};c.attachLibraryChanged(function(e){_.fireEvent(L.M_EVENTS.LibraryChanged,e.getParameters())});L.prototype.applyChanges=function(){p.renderPendingUIUpdates("forced by applyChanges")};L.prototype.registerObject=function(e){var t=e.getId(),n=e.getMetadata().getStereotype(),o=this.getObject(n,t);if(o&&o!==e){h.error('adding object "'+n+"\" with duplicate id '"+t+"'");throw new Error('Error: adding object "'+n+"\" with duplicate id '"+t+"'")}this.mObjects[n][t]=e};L.prototype.deregisterObject=function(e){var t=e.getId(),n=e.getMetadata().getStereotype();delete this.mObjects[n][t]};L.prototype.byId=s.registry.get;L.prototype.getControl=s.registry.get;L.prototype.getElementById=s.registry.get;L.prototype.getObject=function(e,t){m(t==null||typeof t==="string","sId must be a string when defined");m(this.mObjects[e]!==undefined,"sType must be a supported stereotype");return t==null?undefined:this.mObjects[e]&&this.mObjects[e][t]};L.prototype.getComponent=r.registry.get;L.prototype.getTemplate=function(e){h.warning("Synchronous loading of 'sap/ui/core/tmpl/Template'. Use 'sap/ui/core/tmpl/Template' module and"+" call Template.byId instead","SyncXHR",null,function(){return{type:"SyncXHR",name:"Core.prototype.getTemplate"}});var t=sap.ui.requireSync("sap/ui/core/tmpl/Template");return t.byId(e)};L.prototype.getStaticAreaRef=function(){return l.getStaticAreaRef()};L.prototype.isStaticAreaRef=function(e){return l.isStaticAreaRef(e)};var A;L.prototype.attachIntervalTimer=function(e,t){h.warning("Usage of sap.ui.getCore().attachIntervalTimer() is deprecated. "+"Please use 'IntervalTrigger.addListener()' from 'sap/ui/core/IntervalTrigger' module instead.","Deprecation",null,function(){return{type:"sap.ui.core.Core",name:"Core"}});if(!A){A=sap.ui.require("sap/ui/core/IntervalTrigger")||sap.ui.requireSync("sap/ui/core/IntervalTrigger")}A.addListener(e,t)};L.prototype.detachIntervalTimer=function(e,t){if(A){A.removeListener(e,t)}};L.prototype.attachControlEvent=function(e,t){_.attachEvent(L.M_EVENTS.ControlEvent,e,t)};L.prototype.detachControlEvent=function(e,t){_.detachEvent(L.M_EVENTS.ControlEvent,e,t)};L.prototype.fireControlEvent=function(e){_.fireEvent(L.M_EVENTS.ControlEvent,e)};L.prototype._handleControlEvent=function(e,t){var n=jQuery.Event(e.type);Object.assign(n,e);n.originalEvent=undefined;this.fireControlEvent({browserEvent:n,uiArea:t})};L.prototype.getApplication=function(){return sap.ui.getApplication&&sap.ui.getApplication()};L.prototype.registerPlugin=function(e){m(typeof e==="object","oPlugin must be an object");if(!e){return}for(var t=0,n=this.aPlugins.length;t<n;t++){if(this.aPlugins[t]===e){return}}this.aPlugins.push(e);if(this.bInitialized&&e&&e.startPlugin){e.startPlugin(this)}};L.prototype.unregisterPlugin=function(e){m(typeof e==="object","oPlugin must be an object");if(!e){return}var t=-1;for(var n=this.aPlugins.length;n--;n>=0){if(this.aPlugins[n]===e){t=n;break}}if(t==-1){return}if(this.bInitialized&&e&&e.stopPlugin){e.stopPlugin(this)}this.aPlugins.splice(t,1)};L.prototype.startPlugins=function(){for(var e=0,t=this.aPlugins.length;e<t;e++){var n=this.aPlugins[e];if(n&&n.startPlugin){n.startPlugin(this,true)}}};L.prototype.stopPlugins=function(){for(var e=0,t=this.aPlugins.length;e<t;e++){var n=this.aPlugins[e];if(n&&n.stopPlugin){n.stopPlugin(this)}}};L.prototype.setModel=function(e,t){m(e==null||o.isA(e,"sap.ui.model.Model"),"oModel must be an instance of sap.ui.model.Model, null or undefined");m(t===undefined||typeof t==="string"&&!/^(undefined|null)?$/.test(t),"sName must be a string or omitted");var n=this,r;if(!e&&this.oModels[t]){delete this.oModels[t];if(b(n.oModels)&&b(n.oBindingContexts)){r=i._oEmptyPropagatedProperties}else{r={oModels:Object.assign({},n.oModels),oBindingContexts:{},aPropagationListeners:[]}}l.registry.forEach(function(n){if(e!=n.getModel(t)){n._propagateProperties(t,n,r,false,t)}})}else if(e&&e!==this.oModels[t]){this.oModels[t]=e;l.registry.forEach(function(n){if(e!=n.getModel(t)){var o={oModels:Object.assign({},this.oModels),oBindingContexts:{},aPropagationListeners:[]};n._propagateProperties(t,n,o,false,t)}}.bind(this))}return this};L.prototype.setMessageManager=function(e){this.oMessageManager=e};L.prototype.getMessageManager=function(){if(!this.oMessageManager){this.oMessageManager=new f}return this.oMessageManager};L.prototype.byFieldGroupId=function(e){return s.registry.filter(function(t){return t.isA("sap.ui.core.Control")&&t.checkFieldGroupIds(e)})};L.prototype.getModel=function(e){m(e===undefined||typeof e==="string"&&!/^(undefined|null)?$/.test(e),"sName must be a string or omitted");return this.oModels[e]};L.prototype.hasModel=function(){return!b(this.oModels)};L.prototype.getEventBus=function(){if(!this.oEventBus){var e=sap.ui.require("sap/ui/core/EventBus");if(!e){h.warning("Synchronous loading of EventBus. Ensure that 'sap/ui/core/EventBus' module is loaded"+" before this function is called.","SyncXHR",null,function(){return{type:"SyncXHR",name:"core-eventbus"}});e=sap.ui.requireSync("sap/ui/core/EventBus")}var t=this.oEventBus=new e;this._preserveHandler=function(e){t.publish("sap.ui","__preserveContent",{domNode:e.domNode})};d.attachPreserveContent(this._preserveHandler)}return this.oEventBus};L.prototype.attachValidationError=function(e,t,n){if(typeof e==="function"){n=t;t=e;e=undefined}_.attachEvent(L.M_EVENTS.ValidationError,e,t,n);return this};L.prototype.detachValidationError=function(e,t){_.detachEvent(L.M_EVENTS.ValidationError,e,t);return this};L.prototype.attachParseError=function(e,t,n){if(typeof e==="function"){n=t;t=e;e=undefined}_.attachEvent(L.M_EVENTS.ParseError,e,t,n);return this};L.prototype.detachParseError=function(e,t){_.detachEvent(L.M_EVENTS.ParseError,e,t);return this};L.prototype.attachFormatError=function(e,t,n){if(typeof e==="function"){n=t;t=e;e=undefined}_.attachEvent(L.M_EVENTS.FormatError,e,t,n);return this};L.prototype.detachFormatError=function(e,t){_.detachEvent(L.M_EVENTS.FormatError,e,t);return this};L.prototype.attachValidationSuccess=function(e,t,n){if(typeof e==="function"){n=t;t=e;e=undefined}_.attachEvent(L.M_EVENTS.ValidationSuccess,e,t,n);return this};L.prototype.detachValidationSuccess=function(e,t){_.detachEvent(L.M_EVENTS.ValidationSuccess,e,t);return this};L.prototype.fireParseError=function(e){_.fireEvent(L.M_EVENTS.ParseError,e);return this};L.prototype.fireValidationError=function(e){_.fireEvent(L.M_EVENTS.ValidationError,e);return this};L.prototype.fireFormatError=function(e){_.fireEvent(L.M_EVENTS.FormatError,e);return this};L.prototype.fireValidationSuccess=function(e){_.fireEvent(L.M_EVENTS.ValidationSuccess,e);return this};L.prototype.isMobile=function(){return e.browser.mobile};L.prototype._getEventProvider=function(){return _};L.prototype.addPrerenderingTask=function(e,t){p.addPrerenderingTask(e,t)};L.prototype.destroy=function(){d.detachPreserveContent(this._preserveHandler);_.destroy();o.prototype.destroy.call(this)};sap.ui.setRoot=P;return(new L).getInterface()});
//# sourceMappingURL=Core.js.map