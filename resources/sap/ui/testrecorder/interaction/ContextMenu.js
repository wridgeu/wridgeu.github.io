/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/ui/testrecorder/Constants","sap/ui/testrecorder/interaction/Commands","sap/ui/testrecorder/interaction/CommandExecutor","sap/ui/testrecorder/CommunicationBus","sap/ui/testrecorder/CommunicationChannels"],function(e,t,i,n,o,r,s){"use strict";var c=5;var d=null;var a={};var u={};var h=t.extend("sap.ui.testrecorder.interaction.ContextMenu",{});h.show=function(t){a=t.domElementId;if(d===null&&!document.getElementById(i.CONTEXTMENU_ID)){d=f(t)}if(t.items){var n=Object.keys(u).filter(function(e){return!(t.items[e]||t.items[e]===undefined)});var o=Object.keys(u).filter(function(e){return t.items[e]||t.items[e]===undefined});if(n.length===Object.keys(u).length){this.hide();return this}n.forEach(function(e){u[e].hide()});o.forEach(function(e){u[e].show()})}var r=e(window).width();var s=e(window).height();var l=d.width();var p=d.height();var v=t.location.x+l+c>=r?t.location.x-l:t.location.x;var E=t.location.y+p+c>=s?t.location.y-p:t.location.y;d.css("top",E+c+"px");d.css("left",v+c+"px");h._show();return this};h.hide=function(){if(d){d.hide()}};h._show=function(){if(d){d.show()}};function f(t){var c=e("<div></div>");var d=e("<div></div>");var f=e("<div></div>");var l=e("<div></div>");u={highlight:d,press:f,enterText:l};d.text("Highlight");f.text("Press");l.text("Enter Text");d.on("click",function(){h.hide();var e={domElementId:a};if(t.withEvents){r.publish(s.CONTEXT_MENU_HIGHLIGHT,e)}else{o.execute(n.HIGHLIGHT,e)}});f.on("click",function(){h.hide();var e={domElementId:a};if(t.withEvents){r.publish(s.CONTEXT_MENU_PRESS,e)}else{o.execute(n.PRESS,e)}});l.on("click",function(){h.hide();var e={domElementId:a};if(t.withEvents){r.publish(s.CONTEXT_MENU_ENTER_TEXT,e)}else{o.execute(n.ENTER_TEXT,e)}});c.attr("id",i.CONTEXTMENU_ID);c.css("min-width","150px");c.css("position","absolute");c.css("z-index",1001);c.css("border","1px solid rgb(200, 142, 250)");c.css("border-radius","3px");c.css("background","#fff");c.css("box-sizing","border-box");[d,l,f].forEach(function(e){e.css("padding","16px");e.css("cursor","pointer");e.hover(function(){e.css("background-color","#ebf5fe")},function(){e.css("background-color","transparent")})});[d,f].forEach(function(e){e.css("border-bottom","1px solid #d9d9d9")});c.append(d);c.append(f);c.append(l);e(document.body).append(c);return c}return h});