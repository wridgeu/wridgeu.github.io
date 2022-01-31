/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","sap/ui/core/library","sap/ui/core/ResizeHandler","sap/ui/core/RenderManager","./SplitterRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/layout/SplitterLayoutData"],function(e,t,i,s,r,a,o,n,h){"use strict";var u=i.Orientation;var l=16;var d=e.extend("sap.ui.layout.Splitter",{metadata:{library:"sap.ui.layout",properties:{orientation:{type:"sap.ui.core.Orientation",group:"Behavior",defaultValue:u.Horizontal},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"}},defaultAggregation:"contentAreas",aggregations:{contentAreas:{type:"sap.ui.core.Control",multiple:true,singularName:"contentArea"}},events:{resize:{parameters:{id:{type:"string"},oldSizes:{type:"int[]"},newSizes:{type:"int[]"}}}},designtime:"sap/ui/layout/designtime/Splitter.designtime"},renderer:a});d.prototype.init=function(){this._liveResize=true;this._keyboardEnabled=true;this._bHorizontal=true;this._calculatedSizes=[];this._move={};this._resizeTimeout=null;this._resizeCallback=function(e){this._delayedResize(0)}.bind(this);this._resizeHandlerId=null;this._autoResize=true;this.enableAutoResize();this._boundBarMoveEnd=this._onBarMoveEnd.bind(this);this._boundBarMove=this._onBarMove.bind(this);this._initOrientationProperties();this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._keyListeners={increase:this._onKeyboardResize.bind(this,"inc",20),decrease:this._onKeyboardResize.bind(this,"dec",20),increaseMore:this._onKeyboardResize.bind(this,"incMore",20),decreaseMore:this._onKeyboardResize.bind(this,"decMore",20),max:this._onKeyboardResize.bind(this,"max",20),min:this._onKeyboardResize.bind(this,"min",20)};this._enableKeyboardListeners()};d.prototype.exit=function(){this.disableAutoResize();delete this._resizeCallback;delete this._boundBarMoveEnd;delete this._boundBarMove;delete this._$SplitterOverlay;delete this._$SplitterOverlayBar};d.prototype.onBeforeRendering=function(){this._initOrientationProperties()};d.prototype.onAfterRendering=function(){this._$SplitterOverlay=this.$("overlay");this._$SplitterOverlayBar=this.$("overlayBar");this._resize()};d.prototype.triggerResize=function(e){if(e){this._resize()}else{this._delayedResize()}};d.prototype.resetContentAreasSizes=function(){var e=this._getContentAreas();for(var t=0;t<e.length;t++){e[t].getLayoutData().setSize("auto")}};d.prototype.getCalculatedSizes=function(){return this._calculatedSizes};d.prototype.enableAutoResize=function(e){if(e&&!this._autoResize){return}this._autoResize=true;var t=this;sap.ui.getCore().attachInit(function(){t._resizeHandlerId=s.register(t,t._resizeCallback)});this._delayedResize()};d.prototype.disableAutoResize=function(e){s.deregister(this._resizeHandlerId);if(!e){this._autoResize=false}};d.prototype.enableLiveResize=function(){this._liveResize=true;this.removeStyleClass("sapUiLoSplitterAnimated")};d.prototype.disableLiveResize=function(){this._liveResize=false;this.addStyleClass("sapUiLoSplitterAnimated")};d.prototype.enableKeyboardSupport=function(){var e=this.$().find(".sapUiLoSplitterBar");e.attr("tabindex","0");this._enableKeyboardListeners()};d.prototype.disableKeyboardSupport=function(){var e=this.$().find(".sapUiLoSplitterBar");e.attr("tabindex","-1");this._disableKeyboardListeners()};d.prototype.onLayoutDataChange=function(){this._delayedResize()};d.prototype.ontouchstart=function(e){if(this._ignoreTouch){return}var t=this._getBar(e.target);if(!t){return}if(!e.changedTouches||!e.changedTouches[0]){return}this._ignoreMouse=true;this._onBarMoveStart(e.changedTouches[0],t,true)};d.prototype.onmousedown=function(e){if(this._ignoreMouse){return}var t=this._getBar(e.target);if(!t){return}this._ignoreTouch=true;this._onBarMoveStart(e,t);this._oLastDOMclicked=t};d.prototype._onBarMoveStart=function(e,t,i){var s=this.getId();this.disableAutoResize(true);var r=e[this._moveCord];var a=parseInt(t.id.substr((s+"-splitbar-").length));var o=n(t);var h=this.getCalculatedSizes();var u=this._bHorizontal?o.outerWidth():o.outerHeight();var l=this._getContentAreas();var d=l[a].getLayoutData();var c=l[a+1].getLayoutData();if(!d.getResizable()||!c.getResizable()){p(i);return}var v=0-u;for(var _=0;_<=a;++_){v+=h[_]+u}this._move={start:r,relStart:v,barNum:a,$bar:o,c1Size:h[a],c1MinSize:d.getMinSize(),c2Size:h[a+1],c2MinSize:c.getMinSize()};if(i){document.addEventListener("touchend",this._boundBarMoveEnd);document.addEventListener("touchmove",this._boundBarMove)}else{document.addEventListener("mouseup",this._boundBarMoveEnd);document.addEventListener("mousemove",this._boundBarMove)}this._$SplitterOverlay.css("display","block");this._$SplitterOverlayBar.css(this._sizeDirNot,"");this._move.$bar.css("visibility","hidden");this._onBarMove(e)};d.prototype._onBarMove=function(e){if(e.preventDefault&&!e.changedTouches){e.preventDefault()}var t=e;if(e.changedTouches&&e.changedTouches[0]){t=t.changedTouches[0]}var i=t[this._moveCord];var s=i-this._move.start;if(this.getOrientation()==u.Horizontal&&this._bRtl){s=-s}var r=this._move.c1Size+s;var a=this._move.c2Size-s;var o=r>=0&&a>=0&&r>=this._move.c1MinSize&&a>=this._move.c2MinSize;if(o){this._$SplitterOverlayBar.css(this._sizeDir,this._move.relStart+s);if(this._liveResize){var n=this._move["start"]-t[this._moveCord];if(this.getOrientation()==u.Horizontal&&this._bRtl){n=-n}this._resizeContents(this._move["barNum"],-n,false)}}};d.prototype._onBarMoveEnd=function(e){this._ignoreMouse=false;this._ignoreTouch=false;var t=e;if(e.changedTouches&&e.changedTouches[0]){t=t.changedTouches[0]}var i=t[this._moveCord];var s=this._move["start"]-i;if(this.getOrientation()==u.Horizontal&&this._bRtl){s=-s}this._resizeContents(this._move["barNum"],-s,true);this._move.$bar.css("visibility","");this._$SplitterOverlay.css("display","");document.removeEventListener("mouseup",this._boundBarMoveEnd);document.removeEventListener("mousemove",this._boundBarMove);document.removeEventListener("touchend",this._boundBarMoveEnd);document.removeEventListener("touchmove",this._boundBarMove);this.enableAutoResize(true);if(this._move.$bar){this._move.$bar.trigger("focus")}};d.prototype._resizeContents=function(e,t,i){if(isNaN(t)){o.warning("Splitter: Received invalid resizing values - resize aborted.");return}var s=this._getContentAreas();var r=s[e].getLayoutData();var a=s[e+1].getLayoutData();var n=r.getSize();var h=a.getSize();var u=this.$("content-"+e);var l=this.$("content-"+(e+1));var d=this._move.c1Size+t;var c=this._move.c2Size-t;var p=r.getMinSize();var v=a.getMinSize();var _;if(d<p){_=p-d;t+=_;d=p;c-=_}else if(c<v){_=v-c;t-=_;c=v;d-=_}if(i){if(n==="auto"&&h!=="auto"){a.setSize(c+"px")}else if(n!=="auto"&&h==="auto"){r.setSize(d+"px")}else{r.setSize(d+"px");a.setSize(c+"px")}}else{u.css(this._sizeType,d+"px");l.css(this._sizeType,c+"px")}};d.prototype._delayedResize=function(e){if(e===undefined){e=0}if(this.getDomRef()){clearTimeout(this._resizeTimeout);this._resizeTimeout=setTimeout(this._resize.bind(this),e)}};d.prototype._resizeBars=function(e){var t,i,s=this._bHorizontal?this.$().innerHeight():this.$().innerWidth();for(t=0;t<e.length-1;++t){i=this.$("splitbar-"+t);i.css(this._sizeTypeNot,"")}for(t=0;t<e.length-1;++t){i=this.$("splitbar-"+t);i.css(this._sizeType,"");i.css(this._sizeTypeNot,s+"px")}};d.prototype._resize=function(){var e=this.getDomRef();if(!e||r.getPreserveAreaRef().contains(e)||e.scrollHeight===0||e.scrollWidth===0){return}var t=0,i;var s=this._getContentAreas();this._resizeBars(s);var a=this.getCalculatedSizes();this._recalculateSizes();var o=this.getCalculatedSizes();var n=false;for(t=0;t<o.length;++t){if(o[t]!==0){n=true;break}}if(!n){this._delayedResize(100);return}var h=true;for(t=0;t<s.length;++t){var u=this.$("content-"+t);var l=s[t];u.css(this._sizeType,o[t]+"px");u.css(this._sizeTypeNot,"");var d=l.getLayoutData();var p=d&&d.getResizable();if(t>0){var v=p&&h;i=this.$("splitbar-"+(t-1));i.toggleClass("sapUiLoSplitterNoResize",!v);i.attr("tabindex",v&&this._keyboardEnabled?"0":"-1")}h=p}this._resizeBars(s);if(c(a,o)){this.fireResize({oldSizes:a,newSizes:o})}};d.prototype._getTotalSize=function(){return this._bHorizontal?this.$().innerWidth():this.$().innerHeight()};d.prototype._calcAvailableContentSize=function(){return this._getTotalSize()-this._calcBarsSize()};d.prototype._calcBarsSize=function(){var e=0,t=this._getContentAreas().length-1;for(var i=0;i<t;i++){e+=this._bHorizontal?this.$("splitbar-"+i).outerWidth():this.$("splitbar-"+i).outerHeight()}return e};d.prototype._recalculateSizes=function(){var e,t,i,s;var r=[];var a=this._getContentAreas();var n=this._calcAvailableContentSize();var h=[];var u=[];var d=[];this._calculatedSizes=[];for(e=0;e<a.length;++e){r.push(a[e].getLayoutData().getSize())}for(e=0;e<r.length;++e){var c=r[e];var p;if(c.indexOf("rem")>-1){p=parseFloat(c)*l;n-=p;this._calculatedSizes[e]=p}else if(c.indexOf("px")>-1){p=parseInt(c);n-=p;this._calculatedSizes[e]=p}else if(c.indexOf("%")>-1){d.push(e)}else if(c==="auto"){if(a[e].getLayoutData().getMinSize()!==0){u.push(e)}else{h.push(e)}}else{o.error("Illegal size value: "+r[e])}}var v=false;if(n<0){v=true;n=0}n=this._calcPercentBasedSizes(d,n);if(n<0){v=true;n=0}var _=Math.floor(n/(u.length+h.length),0);for(e=0;e<u.length;++e){t=_;i=u[e];s=a[i].getLayoutData().getMinSize();if(t>n){t=n}if(t<s){t=s}this._calculatedSizes[i]=t;n-=t}if(n<0){v=true;n=0}var f=h.length;_=Math.floor(n/f,0);for(e=0;e<f;++e){i=h[e];this._calculatedSizes[i]=_;n-=_}if(v){this._logConstraintsViolated()}};d.prototype._calcPercentBasedSizes=function(e,t){var i=this._getContentAreas(),s=this._calcAvailableContentSize();for(var r=0;r<e.length;++r){var a=e[r];var o=parseFloat(i[a].getLayoutData().getSize())/100*s;var n=i[a].getLayoutData().getMinSize();if(o<n){o=n}this._calculatedSizes[a]=o;t-=o}return t};d.prototype._logConstraintsViolated=function(){o.warning("The set sizes and minimal sizes of the splitter contents are bigger than the available space in the UI.",null,"sap.ui.layout.Splitter")};d.prototype._initOrientationProperties=function(){this._bHorizontal=this.getOrientation()===u.Horizontal;if(this._bHorizontal){this._sizeDirNot="top";this._sizeTypeNot="height";this._sizeType="width";this._moveCord="pageX";if(this._bRtl){this._sizeDir="right"}else{this._sizeDir="left"}}else{this._moveCord="pageY";this._sizeType="height";this._sizeTypeNot="width";this._sizeDir="top";this._sizeDirNot="left"}};d.prototype._onKeyboardResize=function(e,t,i){var s=this.getId()+"-splitbar-";if(!i||!i.target||!i.target.id||i.target.id.indexOf(s)!==0){return}var r=999999;var a=parseInt(i.target.id.substr(s.length));var n=this.getCalculatedSizes();this._move.c1Size=n[a];this._move.c2Size=n[a+1];var h=0;switch(e){case"inc":h=t;break;case"incMore":h=t*10;break;case"dec":h=0-t;break;case"decMore":h=0-t*10;break;case"max":h=r;break;case"min":h=0-r;break;default:o.warn("[Splitter] Invalid keyboard resize type");break}this._resizeContents(a,h,true)};d.prototype._enableKeyboardListeners=function(){this.onsapright=this._keyListeners.increase;this.onsapdown=this._keyListeners.increase;this.onsapleft=this._keyListeners.decrease;this.onsapup=this._keyListeners.decrease;this.onsappageup=this._keyListeners.decreaseMore;this.onsappagedown=this._keyListeners.increaseMore;this.onsapend=this._keyListeners.max;this.onsaphome=this._keyListeners.min;this._keyboardEnabled=true};d.prototype._disableKeyboardListeners=function(){delete this.onsapincreasemodifiers;delete this.onsapdecreasemodifiers;delete this.onsapendmodifiers;delete this.onsaphomemodifiers;this._keyboardEnabled=false};d.prototype._getBar=function(e){var t=e,i=this.getId();if(t.classList.contains("sapUiLoSplitterBarGripIcon")){t=e.parentElement}if(t.classList.contains("sapUiLoSplitterBarDecorationBefore")||t.classList.contains("sapUiLoSplitterBarDecorationAfter")||t.classList.contains("sapUiLoSplitterBarGrip")){t=t.parentElement}if(!t.id||t.id.indexOf(i+"-splitbar")!==0){return null}return t};function c(e,t){if(e===t){return false}if(!e||!t||e.length===undefined||t.length===undefined){return true}if(e.length!=t.length){return true}for(var i=0;i<e.length;++i){if(e[i]!==t[i]){return true}}return false}function p(e){var t=function(t){if(!e){t.preventDefault()}};var i=null;i=function(){document.removeEventListener("touchend",i);document.removeEventListener("touchmove",t);document.removeEventListener("mouseup",i);document.removeEventListener("mousemove",t)};if(e){this._ignoreMouse=true;document.addEventListener("touchend",i);document.addEventListener("touchmove",t)}else{document.addEventListener("mouseup",i);document.addEventListener("mousemove",t)}}d.prototype._ensureLayoutData=function(e){var t=e.getLayoutData();if(t&&(!t.getResizable||!t.getSize||!t.getMinSize)){o.warning('Content "'+e.getId()+'" for the Splitter contained wrong LayoutData. '+"The LayoutData has been replaced with default values.");t=null}if(!t){e.setLayoutData(new h)}};d.prototype.invalidate=function(t){var i=t&&this.indexOfContentArea(t)!=-1||t&&t instanceof sap.ui.core.CustomData&&t.getWriteToDom()||t===undefined;if(i){e.prototype.invalidate.apply(this,arguments)}};d.prototype.addContentArea=function(e){this._ensureLayoutData(e);return this.addAggregation("contentAreas",e)};d.prototype.insertContentArea=function(e,t){this._ensureLayoutData(e);return this.insertAggregation("contentAreas",e,t)};d.prototype._getContentAreas=function(){return this.getContentAreas()};return d});