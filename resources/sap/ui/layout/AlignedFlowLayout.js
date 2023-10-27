/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/Control","./library","sap/ui/core/ResizeHandler","./AlignedFlowLayoutRenderer","sap/ui/dom/units/Rem"],function(e,t,i,n,s,r){"use strict";var o=t.extend("sap.ui.layout.AlignedFlowLayout",{metadata:{library:"sap.ui.layout",properties:{minItemWidth:{type:"sap.ui.core.AbsoluteCSSSize",defaultValue:"12rem"},maxItemWidth:{type:"sap.ui.core.AbsoluteCSSSize",defaultValue:"24rem"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},endContent:{type:"sap.ui.core.Control",multiple:true}}},renderer:s});o.prototype.init=function(){if(typeof ResizeObserver==="function"){this.oResizeObserver=new ResizeObserver(this.onResize.bind(this));this.fLayoutWidth=0;this.fEndItemWidth=0}else{this._sResizeHandlerContainerListenerID=n.register(this,this.onResizeHandler.bind(this))}this.fnReflow=this.reflow.bind(this);this.bReflowSuspended=false};o.prototype.exit=function(){this.fnReflow=null;this.disconnectResizeObserver();this.oResizeObserver=null;this.fLayoutWidth=undefined;this.fEndItemWidth=undefined;this.disconnectResizeHandler();this._sResizeHandlerContainerListenerID="";this._sResizeHandlerEndItemListenerID=""};o.prototype.onAfterRenderingOrThemeChanged=function(){window.requestAnimationFrame(function(){var t=this.getDomRef(),i=this.getDomRef("endItem"),n=!!(this.hasContent()&&t&&i);if(n){var s=window.getComputedStyle(t,null),r=s.getPropertyValue("padding-top"),o=i.style;if(e.getConfiguration().getRTL()){o.left=s.getPropertyValue("padding-left")}else{o.right=s.getPropertyValue("padding-right")}o.bottom=r}var f={domRef:t,endItemDomRef:i};this.reflow(f)}.bind(this))};o.prototype.onBeforeRendering=function(){this.disconnectResizeObserver();this.disconnectResizeHandlerForEndItem()};o.prototype.onAfterRendering=function(){this.observeSizeChangesIfRequired();this.onAfterRenderingOrThemeChanged()};o.prototype.onThemeChanged=o.prototype.onAfterRenderingOrThemeChanged;o.prototype.onResizeHandler=function(e){if(e.size.width!==e.oldSize.width){this.reflow()}};o.prototype.onResize=function(e){var t=this.getDomRef();this.bReflowSuspended=this.bReflowSuspended||this.unobserveSizeChangesIfReflowSuspended(t);if(this.bReflowSuspended){return}var i,n=e[0],s=f(this.fLayoutWidth,n,t),r=n.contentRect.width,o=n.contentRect.height;if(s){this.fLayoutWidth=r;this.fLayoutHeight=o}else{i=this.getDomRef("endItem");s=f(this.fEndItemWidth,n,i);if(s){this.fEndItemWidth=r;this.fLayoutHeight=o}else if(this.fLayoutHeight!==o){this.fLayoutHeight=o}else{return}}window.requestAnimationFrame(function(){var e={domRef:t,endItemDomRef:i};this.reflow(e)}.bind(this))};o.prototype.reflow=function(t){if(this.bReflowSuspended){this.bReflowSuspended=false;if(this.oResizeObserver){this.observeSizeChangesIfRequired()}}var i=this.getContent();if(i.length===0||!i[0].isActive()){return}t=t||{};var n=t.domRef||this.getDomRef();if(!n){return}var s=t.endItemDomRef||this.getDomRef("endItem"),r=this.getLastItemDomRef();if(!s||!r){if(!n.offsetParent){return}this.toggleDisplayOfSpacers(n);return}var o=n.lastElementChild;a(n,o);if(!n.offsetParent){return}var f=o.style,h=s.offsetHeight,d=s.offsetWidth,u=r.offsetTop,l=r.offsetLeft,p,g;var m=window.getComputedStyle(r);if(e.getConfiguration().getRTL()){var R=Number.parseFloat(m.marginLeft);g=l-R}else{var c=Number.parseFloat(m.marginRight);var v=l+r.offsetWidth+c;g=n.offsetWidth-v}var y=window.getComputedStyle(s);var b=Number.parseFloat(y.marginLeft);var z=Number.parseFloat(y.marginRight);var I=g>=b+d+z;if(I){if(this.checkItemsWrapping(n)){if(s.offsetTop<u){f.height=Math.max(0,h-u)+"px";if(r.offsetTop>=s.offsetTop){p=s.offsetLeft;l=r.offsetLeft;if(p>=l&&p<=l+r.offsetWidth){f.height=h+"px"}}f.display="block"}else{f.height="0";f.display=""}}else{if(s.offsetTop<u){f.height=h+"px"}f.display="block"}}else{f.height=h+"px";f.display="block"}var C=d+"px";f.width=C;f.minWidth=C;f.marginLeft=b+"px";f.marginRight=z+"px";this.toggleDisplayOfSpacers(n)};o.prototype.toggleDisplayOfSpacers=function(e){var t=this.getRenderer().CSS_CLASS+"OneLine",i=true;if(this.checkItemsWrapping(e,i)){e.classList.remove(t)}else{e.classList.add(t)}};function f(e,t,i){var n=.25,s=t.contentRect.width;return i===t.target&&Math.abs(s-e)>=n}function a(e,t){var i=t&&t.style;if(i){i.width="";i.height="";i.display="";i.marginLeft="";i.marginRight=""}e.classList.remove(e.classList.item(0)+"OneLine")}o.prototype.checkItemsWrapping=function(e,t){e=e||this.getDomRef();if(!e){return false}var i=e.firstElementChild,n=this.getLastItemDomRef();if(!i||!n){return false}var s=i.offsetTop,r=n.offsetTop,o=i.offsetHeight;if(r>=s+o){return true}if(t){return false}var f=this.getDomRef("endItem");return!!f&&f.offsetTop>=s+o};o.prototype.getLastItemDomRef=function(){var e=this.getContent(),t=e.length;if(t){var i=e[t-1],n=i.getDomRef();if(n){return n.parentElement}}return null};o.prototype.getLastVisibleDomRef=function(){return this.getDomRef("endItem")||this.getLastItemDomRef()};o.prototype.computeNumberOfSpacers=function(){var e=this.getContent().length;if(e===0){return 0}var t=e,i=this.getMinItemWidth(),n;if(i.lastIndexOf("rem")!==-1){n=r.toPx(i)}else if(i.lastIndexOf("px")!==-1){n=parseFloat(i)}if(n){var s=Math.max(document.documentElement.clientWidth,window.screen.width);t=Math.abs(s/n)}t=Math.min(t,e-1);t=Math.max(1,t);t=Math.floor(t);return t};o.prototype.observeSizeChangesIfRequired=function(){if(this.hasContent()){this.observeSizeChanges()}};o.prototype.observeSizeChanges=function(){var e=this.getDomRef();if(!e){return}var t=this.getDomRef("endItem");if(this.oResizeObserver){this.oResizeObserver.observe(e);if(t){this.oResizeObserver.observe(t)}return}if(t){this._sResizeHandlerEndItemListenerID=n.register(t,this.onResizeHandler.bind(this))}};o.prototype.unobserveSizeChanges=function(e){if(this.oResizeObserver&&e){this.oResizeObserver.unobserve(e)}};o.prototype.unobserveSizeChangesIfReflowSuspended=function(e){var t=n.isSuspended(e,this.fnReflow);if(t){this.unobserveSizeChanges(e);this.unobserveSizeChanges(this.getDomRef("endItem"));return true}return false};o.prototype.disconnectResizeObserver=function(){if(this.oResizeObserver){this.oResizeObserver.disconnect()}};o.prototype.disconnectResizeHandler=function(){if(this._sResizeHandlerContainerListenerID){n.deregister(this._sResizeHandlerContainerListenerID)}this.disconnectResizeHandlerForEndItem()};o.prototype.disconnectResizeHandlerForEndItem=function(){if(this._sResizeHandlerEndItemListenerID){n.deregister(this._sResizeHandlerEndItemListenerID)}};o.prototype.hasContent=function(){return this.getContent().length>0};return o});
//# sourceMappingURL=AlignedFlowLayout.js.map