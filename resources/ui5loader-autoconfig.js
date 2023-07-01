/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";var e=globalThis.sap&&globalThis.sap.ui&&globalThis.sap.ui.loader;function r(){var r=/[-\.]([a-z0-9])/gi;var i=function(e){var i=e.replace(r,function(e,r){return r.toUpperCase()});if(/^[a-z][A-Za-z0-9]*$/.test(i)){return i}};e._.defineModuleSync("sap/base/strings/_camelize.js",i)}function i(){var e;function r(e,r){var i=e&&e.getAttribute("src");var a=r.exec(i);var t;if(a){t={tag:e,url:i,resourceRoot:a[1]||""}}return t}if(globalThis.document){var i=/^((?:.*\/)?resources\/)/,a,t,s;e=r(globalThis.document.querySelector("SCRIPT[src][id=sap-ui-bootstrap]"),i);if(!e){t=globalThis.document.querySelectorAll("SCRIPT[src]");a=/^([^?#]*\/)?(?:sap-ui-(?:core|custom|boot|merged)(?:-[^?#/]*)?|jquery.sap.global|ui5loader(?:-autoconfig)?)\.js(?:[?#]|$)/;for(s=0;s<t.length;s++){e=r(t[s],a);if(e){break}}}}return e||{}}function a(){var r="sap-ui-config.json",a=globalThis["sap-ui-config"];if(typeof a==="string"){if(globalThis.XMLHttpRequest){e._.logger.warning('Loading external bootstrap configuration from "'+a+'". This is a design time feature and not for productive usage!');if(a!==r){e._.logger.warning('The external bootstrap configuration file should be named "'+r+'"!')}try{var t=new XMLHttpRequest;t.open("GET",a,false);t.setRequestHeader("Accept","application/json, text/javascript");t.addEventListener("load",function(){try{if(t.responseType==="json"){globalThis["sap-ui-config"]=t.response}else{globalThis["sap-ui-config"]=JSON.parse(t.responseText)}}catch(r){e._.logger.error('Parsing externalized bootstrap configuration from "'+a+'" failed! Reason: '+r+"!")}});t.addEventListener("error",function(){e._.logger.error('Loading externalized bootstrap configuration from "'+a+'" failed! Response: '+t.status+"!")});t.send(null)}catch(r){e._.logger.error('Loading externalized bootstrap configuration from "'+a+'" failed! Reason: '+r+"!")}}}var s=i();if(s.tag){var o=s.tag.dataset;if(o["sapUiConfig"]){var n=o["sapUiConfig"];var u;try{u=JSON.parse("{"+n+"}")}catch(r){e._.logger.error("JSON.parse on the data-sap-ui-config attribute failed. Please check the config for JSON syntax violations.");u=new Function("return {"+n+"};")()}if(u){if(!globalThis["sap-ui-config"]){globalThis["sap-ui-config"]={}}Object.assign(globalThis["sap-ui-config"],u)}}}}function t(){var r;var i=/^(sapUiXx|sapUi|sap)((?:[A-Z0-9][a-z]*)+)$/;var a=Object.create(null);var t=false;var s=sap.ui.require("sap/base/strings/_camelize");function o(){r=Object.create(null);var i={};var t=globalThis["sap-ui-config"];if(typeof t==="object"){for(var o in t){var n=s("sapUi-"+o);var u=a[n];if(!n){e._.logger.error("Invalid configuration option '"+o+"' in global['sap-ui-config']!")}else if(r[n]){e._.logger.error("Configuration option '"+o+"' was already set by '"+i[n]+"' and will be ignored!")}else if(u!==undefined&&t[o]!==u){r[n]=u;e._.logger.error("Configuration option '"+n+"' was frozen and cannot be changed to "+t[o]+"!")}else{r[n]=t[o];i[n]=o}}}i=undefined}function n(){if(!t){o();t=true}}function u(e,t){var s=r[e];if(s===undefined){var o=e.match(i);var n=o?o[1]+o[2][0]+o[2].slice(1).toLowerCase():undefined;if(n){s=r[n]}}if(t){a[e]=s}return s}var p={get:u,freeze:n};o();e._.defineModuleSync("sap/base/config/GlobalConfigurationProvider.js",p)}function s(){var r=Object.create(null);var a=/^(sapUiXx|sapUi|sap)((?:[A-Z0-9][a-z]*)+)$/;var t=sap.ui.require("sap/base/strings/_camelize");var s=i();if(s.tag){var o=s.tag.dataset;if(o){for(var n in o){var u=t(n);if(!u){e._.logger.error("Invalid configuration option '"+n+"' in bootstrap!")}else if(r[u]){e._.logger.error("Configuration option '"+n+"' already exists and will be ignored!")}else{r[u]=o[n]}}}}function p(e){var i=r[e];if(i===undefined){var t=e.match(a);var s=t?t[1]+t[2][0]+t[2].slice(1).toLowerCase():undefined;if(s){i=r[s]}}return i}var d={get:p};e._.defineModuleSync("sap/ui/core/config/BootstrapConfigurationProvider.js",d)}function o(){var r=Object.create(null);var i=sap.ui.require("sap/base/strings/_camelize");if(globalThis.location){r=Object.create(null);var a={};var t=globalThis.location.search;var s=new URLSearchParams(t);s.forEach(function(t,s){var o=i(s);if(!o){e._.logger.error("Invalid configuration option '"+s+"' in url!")}else if(r[o]){e._.logger.error("Configuration option '"+s+"' was already set by '"+a[o]+"' and will be ignored!")}else{r[o]=t;a[o]=s}});a=undefined}function o(e){return r[e]}var n={external:true,get:o};e._.defineModuleSync("sap/ui/base/config/URLConfigurationProvider.js",n)}function n(){var r=Object.create(null);var i=sap.ui.require("sap/base/strings/_camelize");if(globalThis.document){r=Object.create(null);var a={};var t=globalThis.document.querySelectorAll("meta");t.forEach(function(t){var s=i(t.name);if(s){if(r[s]){e._.logger.error("Configuration option '"+t.name+"' was already set by '"+a[s]+"' and will be ignored!")}else{r[s]=t.content;a[s]=t.name}}else if(t.name){e._.logger.error("Invalid configuration option '"+t.name+"' in meta tag!")}});a=undefined}function s(e){return r[e]}var o={get:s};e._.defineModuleSync("sap/ui/base/config/MetaConfigurationProvider.js",o)}function u(){var r=[sap.ui.require("sap/base/config/GlobalConfigurationProvider")];var i={name:"sapUiIgnoreUrlParams",type:"boolean"};var a={boolean:false,code:undefined,integer:0,string:"","string[]":[],"function[]":[],function:undefined,object:{}};var t={Boolean:"boolean",Code:"code",Integer:"integer",String:"string",StringArray:"string[]",FunctionArray:"function[]",Function:"function",Object:"object"};var s=f(i);function o(e){if(e==null){return e}else if(Array.isArray(e)){return n(e)}else if(typeof e==="object"){return u(e)}else{return e}}function n(e){var r=[];for(var i=0;i<e.length;i++){r.push(o(e[i]))}return r}function u(e){var r={};for(var i in e){if(i==="__proto__"){continue}r[i]=o(e[i])}return r}function p(e){if(r.indexOf(e)===-1){r.push(e);s=f(i)}}function d(e,r,i){if(e===undefined||e===null){return e}if(typeof r==="string"){switch(r){case t.Boolean:if(typeof e==="string"){return e.toLowerCase()==="true"||e.toLowerCase()==="x"}else{e=!!e}break;case t.Code:e=typeof e==="function"?e:String(e);break;case t.Integer:if(typeof e==="string"){e=parseInt(e)}if(typeof e!=="number"&&isNaN(e)){throw new TypeError("unsupported value")}break;case t.String:e=""+e;break;case t.StringArray:if(Array.isArray(e)){return e}else if(typeof e==="string"){e=e?e.split(/[,;]/).map(function(e){return e.trim()}):[];return e}else{throw new TypeError("unsupported value")}case t.FunctionArray:e.forEach(function(e){if(typeof e!=="function"){throw new TypeError("Not a function: "+e)}});break;case t.Function:if(typeof e!=="function"){throw new TypeError("unsupported value")}break;case t.Object:if(typeof e==="string"){e=JSON.parse(e)}if(typeof e!=="object"){throw new TypeError("unsupported value")}break;default:throw new TypeError("unsupported type")}}else if(typeof r==="object"&&!Array.isArray(r)){e=l(r,e,i)}else if(typeof r==="function"){e=r(e)}else{throw new TypeError("unsupported type")}return e}function l(e,r,i){var a=[];for(var t in e){if(e.hasOwnProperty(t)){if(e[t]===r){return r}a.push(e[t])}}throw new TypeError("Unsupported Enumeration value for "+i+", valid values are: "+a.join(", "))}function f(e){e=Object.assign({},e);var i;var t=/^[a-z][A-Za-z0-9]*$/;var n=/^(sapUi(?!Xx))(.*)$/;var u=s||!e.external;var p=e.name;var l=p.match(n);var c=e.hasOwnProperty("defaultValue")?e.defaultValue:a[e.type];if(typeof e.name!=="string"||!t.test(p)){throw new TypeError("Invalid configuration key '"+p+"'!")}if(e.provider){i=e.provider.get(p,e.freeze)}if(i===undefined){for(var y=r.length-1;y>=0;y--){if(!r[y].external||!u){i=r[y].get(p,e.freeze);if(i!==undefined){break}}}}if(i!==undefined){i=d(i,e.type,e.name)}else if(l&&l[1]==="sapUi"){e.name=l[1]+"Xx"+l[2];return f(e)}if(Array.isArray(i)||typeof i==="object"){i=o(i)}return i!==undefined?i:c}var c={get:f,registerProvider:p,Type:t};e._.defineModuleSync("sap/base/config/_Configuration.js",c)}function p(){var e=sap.ui.require("sap/base/config/_Configuration");e.registerProvider(sap.ui.require("sap/ui/core/config/BootstrapConfigurationProvider"));e.registerProvider(sap.ui.require("sap/ui/base/config/MetaConfigurationProvider"));e.registerProvider(sap.ui.require("sap/ui/base/config/URLConfigurationProvider"))}r();a();t();s();n();o();u();p();var d=sap.ui.require("sap/base/config/_Configuration");var l,f,c,y,g,v,h=false;function b(e,r){var i=e&&e.getAttribute("src"),a=r.exec(i);if(a){l=a[1]||"";v=i;f=/sap-ui-core-nojQuery\.js(?:[?#]|$)/.test(i);return true}}function m(e){return e&&e[e.length-1]!=="/"?e+"/":e}if(e==null){throw new Error("ui5loader-autoconfig.js: ui5loader is needed, but could not be found")}if(!b(document.querySelector("SCRIPT[src][id=sap-ui-bootstrap]"),/^((?:[^?#]*\/)?resources\/)/)){y=/^([^?#]*\/)?(?:sap-ui-(?:core|custom|boot|merged)(?:-[^?#/]*)?|jquery.sap.global|ui5loader(?:-autoconfig)?)\.js(?:[?#]|$)/;c=document.scripts;for(g=0;g<c.length;g++){if(b(c[g],y)){break}}}var j=d.get({name:"sapUiResourceRoots",type:d.Type.Object,freeze:true});if(typeof j[""]==="string"){l=j[""]}if(l==null){throw new Error("ui5loader-autoconfig.js: could not determine base URL. No known script tag and no configuration found!")}(function(){var e;try{e=window.localStorage.getItem("sap-ui-reboot-URL")}catch(e){}var r=d.get({name:"sapBootstrapDebug",type:d.Type.Boolean,external:true,freeze:true});if(r){debugger}if(e){var i=m(l)+"sap/ui/core/support/debugReboot.js";document.write('<script src="'+i+'"><\/script>');var a=new Error("This is not a real error. Aborting UI5 bootstrap and rebooting from: "+e);a.name="Restart";throw a}})();(function(){var r=d.get({name:"sapUiDebug",type:d.Type.String,defaultValue:false,external:true,freeze:true});try{r=r||window.localStorage.getItem("sap-ui-debug")}catch(e){}if(typeof r==="string"){if(/^(?:false|true|x|X)$/.test(r)){r=r!=="false"}}else{r=!!r}if(/-dbg\.js([?#]|$)/.test(v)){window["sap-ui-loaddbg"]=true;r=r||true}window["sap-ui-debug"]=r;window["sap-ui-optimized"]=window["sap-ui-optimized"]||/\.getAttribute/.test(b)&&!/oScript/.test(b);if(window["sap-ui-optimized"]&&r){window["sap-ui-loaddbg"]=true;if(r===true&&!window["sap-ui-debug-no-reboot"]){var i;if(v!=null){i=v.replace(/\/(?:sap-ui-cachebuster\/)?([^\/]+)\.js/,"/$1-dbg.js")}else{i=m(l)+"sap-ui-core.js"}e.config({amd:false});window["sap-ui-optimized"]=false;if(e.config().async){var a=document.createElement("script");a.src=i;document.head.appendChild(a)}else{document.write('<script src="'+i+'"><\/script>')}var t=new Error("This is not a real error. Aborting UI5 bootstrap and restarting from: "+i);t.name="Restart";throw t}}function s(e){if(!/\/\*\*\/$/.test(e)){e=e.replace(/\/$/,"/**/")}return e.replace(/\*\*\/|\*|[[\]{}()+?.\\^$|]/g,function(e){switch(e){case"**/":return"(?:[^/]+/)*";case"*":return"[^/]*";default:return"\\"+e}})}var o;if(typeof r==="string"){var n="^(?:"+r.split(/,/).map(s).join("|")+")",u=new RegExp(n);o=function(e){return u.test(e)};e._.logger.debug("Modules that should be excluded from preload: '"+n+"'")}else if(r===true){o=function(){return true};e._.logger.debug("All modules should be excluded from preload")}e.config({debugSources:!!window["sap-ui-loaddbg"],ignoreBundledResources:o})})();if(d.get({name:"sapUiAsync",type:d.Type.Boolean,external:true,freeze:true})){e.config({async:true})}e._.maxTaskDuration=d.get({name:"sapUiXxMaxLoaderTaskDuration",type:d.Type.Integer,defaultValue:undefined,external:true,freeze:true});h=d.get({name:"sapUiAmd",type:d.Type.Boolean,defaultValue:!d.get({name:"sapUiNoLoaderConflict",type:d.Type.Boolean,defaultValue:true,external:true,freeze:true}),external:true,freeze:true});e.config({baseUrl:l,amd:h,map:{"*":{blanket:"sap/ui/thirdparty/blanket",crossroads:"sap/ui/thirdparty/crossroads",d3:"sap/ui/thirdparty/d3",handlebars:"sap/ui/thirdparty/handlebars",hasher:"sap/ui/thirdparty/hasher",IPv6:"sap/ui/thirdparty/IPv6",jquery:"sap/ui/thirdparty/jquery",jszip:"sap/ui/thirdparty/jszip",less:"sap/ui/thirdparty/less",OData:"sap/ui/thirdparty/datajs",punycode:"sap/ui/thirdparty/punycode",SecondLevelDomains:"sap/ui/thirdparty/SecondLevelDomains",sinon:"sap/ui/thirdparty/sinon",signals:"sap/ui/thirdparty/signals",URI:"sap/ui/thirdparty/URI",URITemplate:"sap/ui/thirdparty/URITemplate",esprima:"sap/ui/documentation/sdk/thirdparty/esprima"}},shim:{"sap/ui/thirdparty/bignumber":{amd:true,exports:"BigNumber"},"sap/ui/thirdparty/blanket":{amd:true,exports:"blanket"},"sap/ui/thirdparty/caja-html-sanitizer":{amd:false,exports:"html"},"sap/ui/thirdparty/crossroads":{amd:true,exports:"crossroads",deps:["sap/ui/thirdparty/signals"]},"sap/ui/thirdparty/d3":{amd:true,exports:"d3"},"sap/ui/thirdparty/datajs":{amd:true,exports:"OData"},"sap/ui/thirdparty/handlebars":{amd:true,exports:"Handlebars"},"sap/ui/thirdparty/hasher":{amd:true,exports:"hasher",deps:["sap/ui/thirdparty/signals"]},"sap/ui/thirdparty/IPv6":{amd:true,exports:"IPv6"},"sap/ui/thirdparty/iscroll-lite":{amd:false,exports:"iScroll"},"sap/ui/thirdparty/iscroll":{amd:false,exports:"iScroll"},"sap/ui/thirdparty/jquery":{amd:true,exports:"jQuery",deps:["sap/ui/thirdparty/jquery-compat"]},"sap/ui/thirdparty/jqueryui/jquery-ui-datepicker":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-core"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-draggable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-droppable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse","sap/ui/thirdparty/jqueryui/jquery-ui-draggable"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-effect":{deps:["sap/ui/thirdparty/jquery"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-mouse":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-core","sap/ui/thirdparty/jqueryui/jquery-ui-widget"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-position":{deps:["sap/ui/thirdparty/jquery"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-resizable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-selectable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-sortable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-widget":{deps:["sap/ui/thirdparty/jquery"],exports:"jQuery"},"sap/ui/thirdparty/jquery-mobile-custom":{amd:true,deps:["sap/ui/thirdparty/jquery","sap/ui/Device"],exports:"jQuery.mobile"},"sap/ui/thirdparty/jszip":{amd:true,exports:"JSZip"},"sap/ui/thirdparty/less":{amd:true,exports:"less"},"sap/ui/thirdparty/qunit-2":{amd:false,exports:"QUnit"},"sap/ui/thirdparty/punycode":{amd:true,exports:"punycode"},"sap/ui/thirdparty/RequestRecorder":{amd:true,exports:"RequestRecorder",deps:["sap/ui/thirdparty/URI","sap/ui/thirdparty/sinon"]},"sap/ui/thirdparty/require":{exports:"define"},"sap/ui/thirdparty/SecondLevelDomains":{amd:true,exports:"SecondLevelDomains"},"sap/ui/thirdparty/signals":{amd:true,exports:"signals"},"sap/ui/thirdparty/sinon":{amd:true,exports:"sinon"},"sap/ui/thirdparty/sinon-4":{amd:true,exports:"sinon"},"sap/ui/thirdparty/sinon-server":{amd:true,exports:"sinon"},"sap/ui/thirdparty/URI":{amd:true,exports:"URI"},"sap/ui/thirdparty/URITemplate":{amd:true,exports:"URITemplate",deps:["sap/ui/thirdparty/URI"]},"sap/ui/thirdparty/vkbeautify":{amd:false,exports:"vkbeautify"},"sap/ui/thirdparty/zyngascroll":{amd:false,exports:"Scroller"},"sap/ui/demokit/js/esprima":{amd:true,exports:"esprima"},"sap/ui/documentation/sdk/thirdparty/esprima":{amd:true,exports:"esprima"},"sap/viz/libs/canvg":{deps:["sap/viz/libs/rgbcolor"]},"sap/viz/libs/rgbcolor":{},"sap/viz/libs/sap-viz":{deps:["sap/viz/library","sap/ui/thirdparty/jquery","sap/ui/thirdparty/d3","sap/viz/libs/canvg"]},"sap/viz/libs/sap-viz-info-charts":{deps:["sap/viz/libs/sap-viz-info-framework"]},"sap/viz/libs/sap-viz-info-framework":{deps:["sap/ui/thirdparty/jquery","sap/ui/thirdparty/d3"]},"sap/viz/ui5/container/libs/sap-viz-controls-vizcontainer":{deps:["sap/viz/libs/sap-viz","sap/viz/ui5/container/libs/common/libs/rgbcolor/rgbcolor_static"]},"sap/viz/ui5/controls/libs/sap-viz-vizframe/sap-viz-vizframe":{deps:["sap/viz/libs/sap-viz-info-charts"]},"sap/viz/ui5/controls/libs/sap-viz-vizservices/sap-viz-vizservices":{deps:["sap/viz/libs/sap-viz-info-charts"]},"sap/viz/resources/chart/templates/standard_fiori/template":{deps:["sap/viz/libs/sap-viz-info-charts"]}}});var w=e._.defineModuleSync;w("ui5loader.js",null);w("ui5loader-autoconfig.js",null);if(f&&typeof jQuery==="function"){w("sap/ui/thirdparty/jquery.js",jQuery);if(jQuery.ui&&jQuery.ui.position){w("sap/ui/thirdparty/jqueryui/jquery-ui-position.js",jQuery)}}var q=d.get({name:"sapUiMain",type:d.Type.String,freeze:true});if(q){sap.ui.require(q.trim().split(/\s*,\s*/))}})();
//# sourceMappingURL=ui5loader-autoconfig.js.map