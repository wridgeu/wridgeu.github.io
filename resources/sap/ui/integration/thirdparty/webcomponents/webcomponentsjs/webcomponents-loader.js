/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function(){"use strict";var e=false;var n=[];var t=false;var o;function r(){window.WebComponents.ready=true;document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:true}))}function i(){if(window.customElements&&customElements.polyfillWrapFlushCallback){customElements.polyfillWrapFlushCallback(function(e){o=e;if(t){o()}})}}function d(){i();a()}function a(){if(window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap){HTMLTemplateElement.bootstrap(window.document)}e=true;l().then(r)}function l(){t=false;var e=n.map(function(e){return e instanceof Function?e():e});n=[];return Promise.all(e).then(function(){t=true;o&&o()}).catch(function(e){console.error(e)})}window.WebComponents=window.WebComponents||{};window.WebComponents.ready=window.WebComponents.ready||false;window.WebComponents.waitFor=window.WebComponents.waitFor||function(t){if(!t){return}n.push(t);if(e){l()}};window.WebComponents._batchCustomElements=i;var c="webcomponents-loader.js";var s=[];if(!("attachShadow"in Element.prototype&&"getRootNode"in Element.prototype)||window.ShadyDOM&&window.ShadyDOM.force){s.push("sd")}if(!window.customElements||window.customElements.forcePolyfill){s.push("ce")}var m=function(){var e=document.createElement("template");if(!("content"in e)){return true}if(!(e.content.cloneNode()instanceof DocumentFragment)){return true}var n=document.createElement("template");n.content.appendChild(document.createElement("div"));e.content.appendChild(n);var t=e.cloneNode(true);return t.content.childNodes.length===0||t.content.firstChild.content.childNodes.length===0}();if(!window.Promise||!Array.from||!window.URL||!window.Symbol||m){s=["sd-ce-pf"]}if(s.length){var u;var w="bundles/webcomponents-"+s.join("-")+".js";if(window.WebComponents.root){u=window.WebComponents.root+w}else{var p=document.querySelector('script[src*="'+c+'"]');u=p.src.replace(c,w)}var f=document.createElement("script");f.src=u;if(document.readyState==="loading"){f.setAttribute("onload","window.WebComponents._batchCustomElements()");document.write(f.outerHTML);document.addEventListener("DOMContentLoaded",a)}else{f.addEventListener("load",function(){d()});f.addEventListener("error",function(){throw new Error("Could not load polyfill bundle"+u)});document.head.appendChild(f)}}else{if(document.readyState==="complete"){e=true;r()}else{window.addEventListener("load",a);window.addEventListener("DOMContentLoaded",function(){window.removeEventListener("load",a);a()})}}})();