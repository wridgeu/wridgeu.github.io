/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./LabelEnablement","sap/ui/base/Object","sap/ui/performance/trace/Interaction","sap/base/util/uid","sap/ui/util/ActivityDetection","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/security/encodeCSS","sap/base/assert","sap/ui/performance/Measurement","sap/base/Log","sap/base/util/extend","./InvisibleRenderer","./Patcher","./FocusHandler","sap/ui/core/Configuration"],function(e,t,n,r,i,jQuery,a,s,o,l,u,f,d,c,p,h){"use strict";var g=["renderControl","cleanupControlWithoutRendering","accessibilityState","icon"];var m=["write","writeEscaped","writeAcceleratorKey","writeControlData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","translate","getConfiguration","getHTML"];var y=["openStart","voidStart","attr","class","style","openEnd","voidEnd","text","unsafeHtml","close"];var v=["render","flush","destroy"];var b=document.createElement("template");var C="data-sap-ui-stylekey";function S(){var e=this,r,s,f,h,I,A="",w=false,R,D="",T={},N={},_=[],O=new c,H,j;function B(){o(!(H=j=""));r=e.aBuffer=[];s=e.aRenderedControls=[];f=e.aStyleStack=[{}];R=undefined;w=false;A=""}function k(e,t){r.push(" ",e,'="',t,'"')}function L(e){var t=f[f.length-1];var n;if(e){n=e.aCustomStyleClasses}else if(e===false){n=[]}else{n=t.aCustomStyleClasses}if(t.aClasses||n){var r=[].concat(t.aClasses||[],n||[]);if(r.length){k("class",r.join(" "))}}if(!e){t.aCustomStyleClasses=null}t.aClasses=null}function F(){var e=f[f.length-1];if(e.aStyle&&e.aStyle.length){k(C,_.push(e.aStyle.join(" "))-1)}e.aStyle=null}function U(e,t){o(e&&typeof e=="string"&&/^[a-z_][a-zA-Z0-9_\-]*$/.test(e),"The "+t+" name provided '"+e+"' is not valid; it must contain alphanumeric characters, hyphens or underscores")}function V(e){o(A,"There is no open tag; '"+e+"' must not be called without an open tag")}function q(e){var t=e===undefined?!A:e;o(t,"There is an open tag; '"+A+"' tag has not yet ended with '"+(w?"voidEnd":"openEnd")+"'")}function W(e){U(e,"attr");o((e!="class"||j!="class"&&(j="attr"))&&(e!="style"||H!="style"&&(H="attr")),"Attributes 'class' and 'style' must not be written when the methods with the same name"+" have been called for the same element already")}function G(e){o(j!="attr"&&(j="class"),"Method class() must not be called after the 'class' attribute has been written for the same element");o(typeof e=="string"&&!/\s/.test(e)&&arguments.length===1,"Method 'class' must be called with exactly one class name")}function X(e){o(H!="attr"&&(H="style"),"Method style() must not be called after the 'style' attribute has been written for the same element");o(e&&typeof e=="string"&&!/\s/.test(e),"Method 'style' must be called with a non-empty string name")}this.write=function(e){o(typeof e==="string"||typeof e==="number","sText must be a string or number");r.push.apply(r,arguments);return this};this.writeEscaped=function(e,t){if(e!=null){e=a(String(e));if(t){e=e.replace(/&#xa;/g,"<br>")}r.push(e)}return this};this.writeAttribute=function(e,t){o(typeof e==="string","sName must be a string");o(typeof t==="string"||typeof t==="number"||typeof t==="boolean","value must be a string, number or boolean");r.push(" ",e,'="',t,'"');return this};this.writeAttributeEscaped=function(e,t){o(typeof e==="string","sName must be a string");r.push(" ",e,'="',a(String(t)),'"');return this};this.addStyle=function(e,t){o(typeof e==="string","sName must be a string");if(t!=null&&t!=""){o(typeof t==="string"||typeof t==="number","value must be a string or number");var n=f[f.length-1];if(!n.aStyle){n.aStyle=[]}n.aStyle.push(e+": "+t+";")}return this};this.writeStyles=function(){F();return this};this.addClass=function(e){if(e){o(typeof e==="string","sName must be a string");var t=f[f.length-1];if(!t.aClasses){t.aClasses=[]}t.aClasses.push(e)}return this};this.writeClasses=function(e){o(!e||typeof e==="boolean"||t.isA(e,"sap.ui.core.Element"),"oElement must be empty, a boolean, or an sap.ui.core.Element");L(e);return this};this.openStart=function(e,n){U(e,"tag");q();o(!(H=j=""));A=e;r.push("<"+e);if(n){if(typeof n=="string"){this.attr("id",n)}else{o(n&&t.isA(n,"sap.ui.core.Element"),"vControlOrId must be an sap.ui.core.Element");this.attr("id",n.getId());M(this,n)}}return this};this.openEnd=function(e){V("openEnd");q(!w);o(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");A="";L(e===true?false:undefined);F();r.push(">");return this};this.close=function(e){U(e,"tag");q();r.push("</"+e+">");return this};this.voidStart=function(e,t){this.openStart(e,t);w=true;return this};this.voidEnd=function(e){V("voidEnd");q(w||!A);w=false;A="";L(e?false:undefined);F();r.push(">");return this};this.unsafeHtml=function(e){q();r.push(e);return this};this.text=function(e){q();if(e!=null){e=a(String(e));r.push(e)}return this};this.attr=function(e,t){W(e);if(e=="style"){f[f.length-1].aStyle=[t]}else{r.push(" ",e,'="',a(String(t)),'"')}return this};this.class=function(e){if(e){G.apply(this,arguments);var t=f[f.length-1];if(!t.aClasses){t.aClasses=[]}t.aClasses.push(a(e))}return this};this.style=function(e,t){X(e);if(t!=null&&t!=""){o(typeof t==="string"||typeof t==="number","value must be a string or number");var n=f[f.length-1];if(!n.aStyle){n.aStyle=[]}n.aStyle.push(e+": "+t+";")}return this};N.openStart=function(e,t){U(e,"tag");q();o(!(H=j=""));A=e;if(!t){O.openStart(e)}else if(typeof t=="string"){O.openStart(e,t)}else{O.openStart(e,t.getId());M(this,t)}return this};N.voidStart=function(e,t){this.openStart(e,t);w=true;return this};N.attr=function(e,t){W(e);V("attr");O.attr(e,t);return this};N.class=function(e){if(e){G.apply(this,arguments);V("class");O.class(e)}return this};N.style=function(e,t){X(e);V("style");O.style(e,t);return this};N.openEnd=function(e){if(e!==true){var t=f[f.length-1];var n=t.aCustomStyleClasses;if(n){n.forEach(O.class,O);t.aCustomStyleClasses=null}}V("openEnd");q(!w);o(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");A="";O.openEnd();return this};N.voidEnd=function(e){if(!e){var t=f[f.length-1];var n=t.aCustomStyleClasses;if(n){n.forEach(O.class,O);t.aCustomStyleClasses=null}}V("voidEnd");q(w||!A);w=false;A="";O.voidEnd();return this};N.text=function(e){q();if(e!=null){O.text(e)}return this};N.unsafeHtml=function(e){q();O.unsafeHtml(e);return this};N.close=function(e){U(e,"tag");q();O.close(e);return this};function z(e){I=true;try{var t=new jQuery.Event("BeforeRendering");t.srcControl=e;e._bOnBeforeRenderingPhase=true;e._handleEvent(t)}finally{e._bOnBeforeRenderingPhase=false;I=false}}this.cleanupControlWithoutRendering=function(e){o(!e||t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return}var n=e.getDomRef();if(n){z(e);S.preserveContent(n,false,false);if(!n.hasAttribute(P)){e.bOutput=false}}};this.renderControl=function(e){o(!e||t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return this}if(!h){h=[]}if(h&&h.length>0){l.pause(h[0]+"---renderControl")}else if(e.getParent()&&e.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){l.pause(e.getParent().getId()+"---rerender")}h.unshift(e.getId());l.start(e.getId()+"---renderControl","Rendering of "+e.getMetadata().getName(),["rendering","control"]);z(e);l.pause(e.getId()+"---renderControl");var n;var i=e.getMetadata();var a=e.getVisible();if(a){n=i.getRenderer()}else{var c=i.getProperty("visible");var g=c&&c._oParent&&c._oParent.getName()=="sap.ui.core.Control";n=g?d:i.getRenderer()}l.resume(e.getId()+"---renderControl");var m=e.aBindParameters,y;if(m&&m.length>0&&(y=e.getDomRef())){var v=jQuery(y);for(var b=0;b<m.length;b++){var C=m[b];v.off(C.sEventType,C.fnProxy)}}if(n&&typeof n.render==="function"){if(r.length){R=false}else if(R===undefined){if(S.getApiVersion(n)==2){y=y||e.getDomRef()||d.getDomRef(e);if(S.isPreservedContent(y)){R=false}else{if(y){p.storePatchingControlFocusInfo(y)}O.setRootNode(y);R=true}}else{R=false}}else if(!D&&R){if(S.getApiVersion(n)!=2){D=e.getId();R=false}}var E={};if(e.aCustomStyleClasses&&e.aCustomStyleClasses.length>0){E.aCustomStyleClasses=e.aCustomStyleClasses}f.push(E);if(R){var I=O.getCurrentNode();n.render(N,e);if(O.getCurrentNode()==I){O.unsafeHtml("",e.getId());e.bOutput=false}else{e.bOutput=true}}else{var A=r.length;n.render(T,e);e.bOutput=r.length!==A}f.pop();if(D&&D===e.getId()){O.unsafeHtml(r.join(""),D,J);D="";R=true;r=[]}}else{u.error("The renderer for class "+i.getName()+" is not defined or does not define a render function! Rendering of "+e.getId()+" will be skipped!")}s.push(e);var P=e.getUIArea();if(P){P._onControlRendered(e)}if(n===d){e.bOutput="invisible"}l.end(e.getId()+"---renderControl");h.shift();if(h&&h.length>0){l.resume(h[0]+"---renderControl")}else if(e.getParent()&&e.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){l.resume(e.getParent().getId()+"---rerender")}return this};this.getHTML=function(e){o(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");var n=r;var i=r=this.aBuffer=[];this.renderControl(e);r=this.aBuffer=n;return i.join("")};function K(e){var t,n=s.length;for(t=0;t<n;t++){s[t]._sapui_bInAfterRenderingPhase=true}I=true;try{for(t=0;t<n;t++){var r=s[t];if(r.bOutput&&r.bOutput!=="invisible"){var i=new jQuery.Event("AfterRendering");i.srcControl=r;l.start(r.getId()+"---AfterRendering","AfterRendering of "+r.getMetadata().getName(),["rendering","after"]);r._handleEvent(i);l.end(r.getId()+"---AfterRendering")}}}finally{for(t=0;t<n;t++){delete s[t]._sapui_bInAfterRenderingPhase}I=false}try{p.restoreFocus(e)}catch(e){u.warning("Problems while restoring the focus after rendering: "+e,null)}for(t=0;t<n;t++){var r=s[t],a=r.aBindParameters,o;if(a&&a.length>0&&(o=r.getDomRef())){var f=jQuery(o);for(var d=0;d<a.length;d++){var c=a[d];f.on(c.sEventType,c.fnProxy)}}}}function $(e,t,n){var a;if(!R){a=p.getControlFocusInfo();var s=r.join("");if(s&&_.length){if(n instanceof SVGElement&&n.localName!="foreignObject"){b.innerHTML="<svg>"+s+"</svg>";b.replaceWith.apply(b.content.firstChild,b.content.firstChild.childNodes)}else{b.innerHTML=s}J(b.content.childNodes);e(b.content)}else{e(s)}}else{var o=O.getRootNode();if(o.nodeType==11){a=p.getControlFocusInfo();e(o.lastChild?o:"")}else{a=p.getPatchingControlFocusInfo()}O.reset()}K(a);B();i.refresh();if(t){t()}}function Z(e,t){var n=e.getAttribute(C);if(n!=t){return 0}e.style=_[t];e.removeAttribute(C);return 1}function J(e){if(!_.length){return}var t=0;e.forEach(function(e){if(e.nodeType==1){t+=Z(e,t);e.querySelectorAll("["+C+"]").forEach(function(e){t+=Z(e,t)})}});_=[]}this.flush=function(e,t,r){o(typeof e==="object"&&e.ownerDocument==document,"oTargetDomNode must be a DOM element");var i=n.notifyAsyncStep();if(!t&&typeof r!=="number"&&!r){S.preserveContent(e)}$(function(t){for(var n=0;n<s.length;n++){var i=s[n].getDomRef();if(i&&!S.isPreservedContent(i)){if(S.isInlineTemplate(i)){jQuery(i).empty()}else{jQuery(i).remove()}}}if(typeof r==="number"){if(r<=0){x(e,"prepend",t)}else{var a=e.children[r-1];if(a){x(a,"after",t)}else{x(e,"append",t)}}}else if(!r){jQuery(e).html(t)}else{x(e,"append",t)}},i,e)};this.render=function(e,r){o(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be a control");o(typeof r==="object"&&r.ownerDocument==document,"oTargetDomNode must be a DOM element");if(I){u.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return}var i=n.notifyAsyncStep();B();this.renderControl(e);$(function(t){if(e&&r){var n=e.getDomRef();if(!n||S.isPreservedContent(n)){n=d.getDomRef(e)||document.getElementById(E.Dummy+e.getId())}var i=n&&n.parentNode!=r;if(i){if(!S.isPreservedContent(n)){if(S.isInlineTemplate(n)){jQuery(n).empty()}else{jQuery(n).remove()}}if(t){x(r,"append",t)}}else{if(t){if(n){if(S.isInlineTemplate(n)){jQuery(n).html(t)}else{x(n,"after",t);jQuery(n).remove()}}else{x(r,"append",t)}}else{if(S.isInlineTemplate(n)){jQuery(n).empty()}else{if(!e.getParent()||!e.getParent()._onChildRerenderedEmpty||!e.getParent()._onChildRerenderedEmpty(e,n)){jQuery(n).remove()}}}}}},i,r)};this.destroy=function(){B()};var Q={};g.forEach(function(e){T[e]=N[e]=Q[e]=this[e]},this);y.forEach(function(e){T[e]=Q[e]=this[e]},this);m.forEach(function(e){T[e]=Q[e]=this[e]},this);v.forEach(function(e){Q[e]=this[e]},this);this.getRendererInterface=function(){return T};this.getInterface=function(){return Q};B()}S.prototype.getConfiguration=function(){return h};S.prototype.translate=function(e){};S.prototype.writeAcceleratorKey=function(){return this};S.prototype.writeControlData=function(e){o(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");this.writeElementData(e);return this};S.prototype.writeElementData=function(e){o(e&&t.isA(e,"sap.ui.core.Element"),"oElement must be an sap.ui.core.Element");this.attr("id",e.getId());M(this,e);return this};S.prototype.accessibilityState=function(n,r){if(!h.getAccessibility()){return this}if(arguments.length==1&&!t.isA(n,"sap.ui.core.Element")){r=n;n=null}var i={};if(n!=null){var a=n.getMetadata();var s=function(e,t,r){var s=a.getProperty(e);if(s&&n[s._sGetter]()===r){i[t]="true"}};var o=function(t,r){var s=a.getAssociation(t);if(s&&s.multiple){var o=n[s._sGetter]();if(t=="ariaLabelledBy"){var l=e.getReferencingLabels(n);var u=l.length;if(u){var f=[];for(var d=0;d<u;d++){if(o.indexOf(l[d])<0){f.push(l[d])}}o=f.concat(o)}}if(o.length>0){i[r]=o.join(" ")}}};s("editable","readonly",false);s("enabled","disabled",false);s("visible","hidden",false);if(e.isRequired(n)){i["required"]="true"}s("selected","selected",true);s("checked","checked",true);o("ariaDescribedBy","describedby");o("ariaLabelledBy","labelledby")}if(r){var l=function(e){var t=typeof e;return e===null||t==="number"||t==="string"||t==="boolean"};var u={};var f,d,c;for(f in r){d=r[f];if(l(d)){u[f]=d}else if(typeof d==="object"&&l(d.value)){c="";if(d.append&&(f==="describedby"||f==="labelledby")){c=i[f]?i[f]+" ":""}u[f]=c+d.value}}Object.assign(i,u)}if(t.isA(n,"sap.ui.core.Element")&&n.getParent()&&n.getParent().enhanceAccessibilityState){n.getParent().enhanceAccessibilityState(n,i)}for(var p in i){if(i[p]!=null&&i[p]!==""){this.attr(p==="role"?p:"aria-"+p,i[p])}}return this};S.prototype.writeAccessibilityState=S.prototype.accessibilityState;S.prototype.icon=function(e,t,n){var i=sap.ui.require("sap/ui/core/IconPool");if(!i){u.warning("Synchronous loading of IconPool due to sap.ui.core.RenderManager#icon call. "+"Ensure that 'sap/ui/core/IconPool is loaded before this function is called","SyncXHR",null,function(){return{type:"SyncXHR",name:"rendermanager-icon"}});i=sap.ui.requireSync("sap/ui/core/IconPool")}var a=i.isIconURI(e),o=false,l,d,c,p,h;if(typeof t==="string"){t=[t]}if(a){d=i.getIconInfo(e);if(!d){u.error("An unregistered icon: "+e+" is used in sap.ui.core.RenderManager's writeIcon method.");return this}if(!t){t=[]}t.push("sapUiIcon");if(!d.suppressMirroring){t.push("sapUiIconMirrorInRTL")}}if(a){this.openStart("span")}else{this.voidStart("img")}if(Array.isArray(t)){t.forEach(function(e){this.class(e)},this)}if(a){c={"data-sap-ui-icon-content":d.content,role:"presentation",title:d.text||null};this.style("font-family","'"+s(d.fontFamily)+"'")}else{c={role:"presentation",alt:"",src:e}}n=f(c,n);if(!n.id){n.id=r()}if(a){p=n.alt||n.title||d.text||d.name;h=n.id+"-label";if(n["aria-labelledby"]){o=true;n["aria-labelledby"]+=" "+h}else if(!n.hasOwnProperty("aria-label")){n["aria-label"]=p}}if(typeof n==="object"){for(l in n){if(n.hasOwnProperty(l)&&n[l]!==null){this.attr(l,n[l])}}}if(a){this.openEnd();if(o){this.openStart("span");this.style("display","none");this.attr("id",h);this.openEnd();this.text(p);this.close("span")}this.close("span")}else{this.voidEnd()}return this};S.prototype.writeIcon=S.prototype.icon;S.prototype.getRenderer=function(e){o(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return S.getRenderer(e)};var E=S.RenderPrefixes={Invisible:d.PlaceholderPrefix,Dummy:"sap-ui-dummy-",Temporary:"sap-ui-tmp-"};S.getRenderer=function(e){o(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return e.getMetadata().getRenderer()};S.forceRepaint=function(e){var t=e?window.document.getElementById(e):null;var n=typeof e=="string"?t:e;if(n){u.debug("forcing a repaint for "+(n.id||String(n)));var r=n.style.display;var i=document.activeElement;n.style.display="none";n.offsetHeight;n.style.display=r;if(document.activeElement!==i&&i){i.focus()}}};S.createInvisiblePlaceholderId=function(e){return d.createInvisiblePlaceholderId(e)};var I="sap-ui-preserve",A="sap-ui-static",P="data-sap-ui-preserve",w="data-sap-ui-area";function R(){var e=jQuery(document.getElementById(I));if(e.length===0){e=jQuery("<div></div>",{"aria-hidden":"true",id:I}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body)}return e}function D(e){jQuery("<div></div>",{id:E.Dummy+e.id}).addClass("sapUiHidden").insertBefore(e)}var T=[];S.attachPreserveContent=function(e,t){S.detachPreserveContent(e);T.push({fn:e,context:t})};S.detachPreserveContent=function(e){T=T.filter(function(t){return t.fn!==e})};S.preserveContent=function(e,t,n,r){o(typeof e==="object"&&e.ownerDocument==document,"oRootNode must be a DOM element");T.forEach(function(t){t.fn.call(t.context||S,{domNode:e})});var i=R();function a(t){while(t&&t!=e&&t.parentNode){t=t.parentNode;if(t.hasAttribute(P)){return true}if(t.hasAttribute("data-sap-ui")){break}}}function s(e,t,n){if(e===t){return true}for(var r=t.getParent();r;r=r.isA("sap.ui.core.UIComponent")?r.oContainer:r.getParent()){if(r.isA("sap.ui.core.Control")){if(!r.getVisible()){return false}var i=r.getDomRef();if(i&&!i.contains(n)){return false}}if(r===e){return true}}}function u(t){if(t.id===I||t.id===A){return}var o=t.getAttribute(P);if(o){if(r){var l=sap.ui.getCore().byId(o);if(l&&s(r,l,t)){return}}if(t===e||a(t)){D(t)}p.trackFocusForPreservedElement(t);i.append(t)}else if(n&&t.id){p.trackFocusForPreservedElement(t);S.markPreservableContent(jQuery(t),t.id);i.append(t);return}if(!t.hasAttribute(w)){var f=t.firstChild;while(f){t=f;f=f.nextSibling;if(t.nodeType===1){u(t)}}}}l.start(e.id+"---preserveContent","preserveContent for "+e.id,["rendering","preserve"]);if(t){u(e)}else{jQuery(e).children().each(function(e,t){u(t)})}l.end(e.id+"---preserveContent")};S.findPreservedContent=function(e){o(typeof e==="string","sId must be a string");var t=R(),n=t.children("["+P+"='"+e.replace(/(:|\.)/g,"\\$1")+"']");return n};S.markPreservableContent=function(e,t){e.attr(P,t)};S.isPreservedContent=function(e){return e&&e.getAttribute(P)&&e.parentNode&&e.parentNode.id==I};S.getPreserveAreaRef=function(){return R()[0]};var N="data-sap-ui-template";S.markInlineTemplate=function(e){e.attr(N,"")};S.isInlineTemplate=function(e){return e&&e.hasAttribute(N)};S.getApiVersion=function(e){if(e.hasOwnProperty("apiVersion")){return e.apiVersion}return 1};function M(e,t){var n=t.getId();e.attr("data-sap-ui",n);if(t.__slot){e.attr("slot",t.__slot)}t.getCustomData().forEach(function(n){var r=n._checkWriteToDom(t);if(r){e.attr(r.key.toLowerCase(),r.value)}});var r=t.getDragDropConfig().some(function(e){return e.isDraggable(t)});if(!r){var i=t.getParent();if(i&&i.getDragDropConfig){r=i.getDragDropConfig().some(function(e){return e.isDraggable(t)})}}if(r){e.attr("draggable","true");e.attr("data-sap-ui-draggable","true")}return this}var _={before:"beforebegin",prepend:"afterbegin",append:"beforeend",after:"afterend"};function x(e,t,n){if(typeof n=="string"){e.insertAdjacentHTML(_[t],n)}else{e[t](n)}}return S},true);
//# sourceMappingURL=RenderManager.js.map