/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/base/EventProvider","sap/ui/performance/trace/Interaction","sap/ui/performance/Measurement"],function(e,n,i,t){"use strict";var r=e.getLogger("sap.ui.Rendering",window["sap-ui-config"]&&(window["sap-ui-config"]["xx-debugRendering"]||window["sap-ui-config"]["xx-debugrendering"])||/sap-ui-xx-debug(R|-r)endering=(true|x|X)/.test(document.location.search)?e.Level.DEBUG:Math.min(e.Level.INFO,e.getLevel()));var a=20;var d;var s={};var u=[];var o=new n;var f=false;function p(e){t.start("renderPendingUIUpdates","Render pending UI updates in all UIAreas");r.debug("Render pending UI updates: start ("+(e||"by timer")+")");var n=false,i=a>0,u=0;f=true;do{if(i){u++;if(u>a){f=false;throw new Error("Rendering has been re-started too many times ("+u+"). Add URL parameter sap-ui-xx-debugRendering=true for a detailed analysis.")}if(u>1){r.debug("Render pending UI updates: iteration "+u)}}if(d){if(d!==this){clearTimeout(d)}d=undefined;if(g.aFnDone.length>0){g.aFnDone.pop()()}}c();var o=s;s={};for(var p in o){n=o[p].rerender()||n}}while(i&&d);f=false;if(n){g.fireUIUpdated()}r.debug("Render pending UI updates: finished");t.end("renderPendingUIUpdates")}var g={aFnDone:[],notifyInteractionStep:function(){g.aFnDone.push(i.notifyAsyncStep())},addPrerenderingTask:function(e,n){if(n){u.unshift(e)}else{u.push(e)}},renderPendingUIUpdates:function(e,n){if(n!==undefined){g.aFnDone.push(i.notifyAsyncStep());d=setTimeout(p.bind(null,e),n)}else{p(e)}},suspend:function(){d=this},resume:function(e){g.renderPendingUIUpdates(e,0)},isPending:function(){return!!(d||f)},attachUIUpdated:function(e,n){o.attachEvent("UIUpdated",e,n)},detachUIUpdated:function(e,n){o.detachEvent("UIUpdated",e,n)},fireUIUpdated:function(e){o.fireEvent("UIUpdated",e)},getLogger:function(){return r},invalidateUIArea:function(e){s[e.getId()]=e;if(!d){r.debug("Registering timer for delayed re-rendering");g.renderPendingUIUpdates("invalidated UIArea",0)}}};function c(){var e=u.slice();u=[];e.forEach(function(e){e()})}return g});
//# sourceMappingURL=Rendering.js.map