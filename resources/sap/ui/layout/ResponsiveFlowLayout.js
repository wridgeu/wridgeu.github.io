/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./ResponsiveFlowLayoutData","./library","sap/ui/core/ResizeHandler","./ResponsiveFlowLayoutRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/rect"],function(t,e,i,r,n,o){"use strict";var a=t.extend("sap.ui.layout.ResponsiveFlowLayout",{metadata:{library:"sap.ui.layout",properties:{responsive:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});(function(){a.prototype.init=function(){this._rows=[];this._bIsRegistered=false;this._proxyComputeWidths=h.bind(this);this._iRowCounter=0};a.prototype.exit=function(){delete this._rows;if(this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID)}delete this._resizeHandlerComputeWidthsID;delete this._proxyComputeWidths;if(this.oRm){this.oRm.destroy();delete this.oRm}delete this._$DomRef;delete this._oDomRef;delete this._iRowCounter};var t=function(t){var i=t.getContent();var r=[];var n=-1;var o={},a={};var s="";var h;var d=0,u=0,f=0;var p=false,g=false,c=false;for(var v=0;v<i.length;v++){d=e.MIN_WIDTH;u=e.WEIGHT;p=e.LINEBREAK;g=e.MARGIN;c=e.LINEBREAKABLE;h=l(i[v]);if(h instanceof e){p=h.getLinebreak();d=h.getMinWidth();u=h.getWeight();g=h.getMargin();c=h.getLinebreakable()}if(n<0||p){n++;r.push({height:-1,cont:[]})}f=r[n].cont.length;s=i[v].getId()+"-cont"+n+"_"+f;o={minWidth:d,weight:u,linebreakable:c,padding:g,control:i[v],id:s,breakWith:[]};var m=false;if(!c){for(var C=f;C>0;C--){a=r[n].cont[C-1];if(a.linebreakable){a.breakWith.push(o);m=true;break}}}if(!m){r[n].cont.push(o)}}t._rows=r};var i=function(t,e,i){var r=[];var n=1e7;var a=-1;var s=function(e){var i=o(document.getElementById(t.cont[e].id));if(i.length>0){var s=i[0].offsetLeft;if(n>=s){r.push({cont:[]});a++}n=s;r[a].cont.push(t.cont[e])}};if(sap.ui.getCore().getConfiguration().getRTL()){for(var h=t.cont.length-1;h>=0;h--){s(h)}}else{for(var h=0;h<t.cont.length;h++){s(h)}}return r};var n=function(t,e){var i=[];var r=-1;var n=0;var o=0;var a=0;var s=0,h=0;var l=0,d=0;for(l=0;l<t.cont.length;l++){n=0;o=0;for(d=a;d<=l;d++){o=o+t.cont[d].weight}for(d=a;d<=l;d++){s=e/o*t.cont[d].weight;s=Math.floor(s);h=t.cont[d].minWidth;n+=Math.max(s,h)}if(r==-1||n>e){i.push({cont:[]});if(r!==-1){a=l}r++}i[r].cont.push(t.cont[l])}return i};var s=function(t,e){if(t.length!=e.length){return true}for(var i=0;i<t.length;i++){if(t[i].cont.length!=e[i].cont.length){return true}}return false};a.prototype.renderContent=function(t,e){var i=t,r=0,n=[],o=0,a=0,s=0,h=0,l=0,d=0,u,f=0,p=0,g=[],c=[],v=this.getId(),m="",C=this._getRenderManager();for(o=0;o<i.length;o++){d=0;n.length=0;r=100;c.length=0;c.push("sapUiRFLRow");if(i[o].cont.length<=1){c.push("sapUiRFLCompleteRow")}var _=v+"-row"+this._iRowCounter;var R={};C.writeHeader(_,R,c);l=0;for(a=0;a<i[o].cont.length;a++){l+=i[o].cont[a].weight}for(s=0;s<i[o].cont.length;s++){u=i[o].cont[s];f=0;p=0;if(u.breakWith.length>0){f=u.weight;p=u.minWidth;for(var w=0;w<u.breakWith.length;w++){f+=u.breakWith[w].weight;p+=u.breakWith[w].minWidth}}m=i[o].cont[s].id;c.length=0;R={"min-width":u.breakWith.length>0?p:u.minWidth};d=100/l*u.weight;var y=R["min-width"]/e*100;var W=Math.ceil(y);var I=Math.floor(d);if(I!==100&&W>I){d=W}else{d=I}d=r<d?r:d;r-=d;n.push(d);if(r>0&&s===i[o].cont.length-1){d+=r}c.push("sapUiRFLContainer");R["width"]=d+"%";R["min-width"]=R["min-width"]+"px";C.writeHeader(m,R,c);c.length=0;c.push("sapUiRFLContainerContent");if(u.breakWith.length>0){c.push("sapUiRFLMultiContainerContent")}if(u.padding){c.push("sapUiRFLPaddingClass")}var D=this._addContentClass(u.control,s);if(D){c.push(D)}R={};C.writeHeader("",R,c);if(u.breakWith.length>0){m=i[o].cont[s].id+"-multi0";c.length=0;R={"min-width":p+"px"};var b=100/f*u.weight;b=Math.floor(b);g.push(b);c.push("sapUiRFLMultiContent");R["width"]=b+"%";if(i[o].cont[s].padding){c.push("sapUiRFLPaddingClass")}C.writeHeader(m,R,c);var L=b;C.renderControl(u.control);C.close("div");for(h=0;h<u.breakWith.length;h++){m=u.breakWith[h].id+"-multi"+(h+1);c.length=0;R={"min-width":u.breakWith[h].minWidth+"px"};b=100/f*u.breakWith[h].weight;b=Math.floor(b);g.push(b);L+=b;if(L<100&&h===u.breakWith.length-1){b+=100-L}c.push("sapUiRFLMultiContent");R["width"]=b+"%";if(u.breakWith[h].padding){c.push("sapUiRFLPaddingClass")}C.writeHeader(m,R,c);C.renderControl(u.breakWith[h].control);C.close("div")}}else{C.renderControl(u.control)}C.close("div");C.close("div")}C.close("div");this._iRowCounter++}};var h=function(){this._iRowCounter=0;this._oDomRef=this.getDomRef();if(this._oDomRef){var t=this.getId();var e=o(this._oDomRef).width();var a=false;if(this._rows){for(var h=0;h<this._rows.length;h++){var l=o(document.getElementById(t+"-row"+h));var d=n(this._rows[h],e);var u=i(this._rows[h],l,this);a=s(u,d);var f=this._getElementRect(l);var p=this._rows[h].oRect;if(f&&p){a=a||f.width!==p.width&&f.height!==p.height}if(this._bLayoutDataChanged||a){this._oDomRef.innerHTML="";this._bLayoutDataChanged=false;this.renderContent(d,e)}}if(this._oDomRef.innerHTML===""){this._getRenderManager().flush(this._oDomRef);for(var h=0;h<this._rows.length;h++){var g=this._getElementRect(o(document.getElementById(t+"-row"+h)));this._rows[h].oRect=g}}if(this._rows.length===0){if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID}}}}};a.prototype.onBeforeRendering=function(){t(this);if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID}};a.prototype.onAfterRendering=function(){this._oDomRef=this.getDomRef();this._$DomRef=o(this._oDomRef);this._proxyComputeWidths();if(this.getResponsive()){if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=r.register(this,a.prototype.rerender.bind(this))}}else{if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID}}};a.prototype.onThemeChanged=function(e){if(e.type==="LayoutDataChange"){this._bLayoutDataChanged=true}if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=r.register(this,a.prototype.rerender.bind(this))}t(this);this._proxyComputeWidths()};a.prototype.onLayoutDataChange=a.prototype.onThemeChanged;var l=function(t){var i=t.getLayoutData();if(!i){return undefined}else if(i instanceof e){return i}else if(i.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var r=i.getMultipleLayoutData();for(var n=0;n<r.length;n++){var o=r[n];if(o instanceof e){return o}}}};a.prototype.addContent=function(t){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.addAggregation("content",t);return this};a.prototype.insertContent=function(t,e){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.insertAggregation("content",t,e);return this};a.prototype.removeContent=function(t){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.removeAggregation("content",t)};a.prototype._getAccessibleRole=function(){return null};a.prototype._addContentClass=function(t,e){return null};a.prototype._getElementRect=function(t){var e=t&&t.rect();if(e){e.height=e.height.toFixed(1);e.width=e.width.toFixed(1)}return e};a.prototype._getRenderManager=function(){if(!this.oRm){this.oRm=sap.ui.getCore().createRenderManager();this.oRm.writeHeader=function(t,e,i){this.openStart("div",t);if(e){for(var r in e){if(r==="width"&&e[r]==="100%"){this.class("sapUiRFLFullLength")}this.style(r,e[r])}}for(var n=0;n<i.length;n++){this.class(i[n])}this.openEnd()}}return this.oRm}})();return a});