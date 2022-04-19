/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./Button","./ScrollContainer","sap/ui/core/Core","sap/ui/core/Control","sap/ui/Device","sap/m/HeaderContainerItemNavigator","sap/ui/core/delegate/ItemNavigation","sap/ui/core/library","sap/ui/core/IntervalTrigger","sap/ui/core/Icon","./HeaderContainerRenderer","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/Selectors"],function(t,e,i,r,o,s,n,a,l,h,c,g,p,f,d,u){"use strict";var v=l.Orientation;var _=t.ScreenSizes;var m=o.extend("sap.m.HeaderContainerItemContainer",{metadata:{defaultAggregation:"item",properties:{position:{type:"int",defaultValue:null},setSize:{type:"int",defaultValue:null},ariaLabelledBy:{type:"string",defaultValue:null}},aggregations:{item:{type:"sap.ui.core.Control",multiple:false}}},renderer:{apiVersion:2,render:function(t,e){var i=e.getAggregation("item");if(!i||!i.getVisible()){return}t.openStart("div",e);t.class("sapMHdrCntrItemCntr");t.class("sapMHrdrCntrInner");t.attr("aria-setsize",e.getSetSize());t.attr("aria-posinset",e.getPosition());t.attr("role","listitem");if(e.getAriaLabelledBy()){t.attr("aria-labelledby",e.getAriaLabelledBy())}t.openEnd();t.renderControl(i);t.close("div")}}});var b=o.extend("sap.m.HeaderContainer",{metadata:{interfaces:["sap.m.ObjectHeaderContainer"],library:"sap.m",properties:{scrollStep:{type:"int",defaultValue:300,group:"Behavior"},scrollStepByItem:{type:"int",defaultValue:1,group:"Behavior"},scrollTime:{type:"int",defaultValue:500,group:"Behavior"},showOverflowItem:{type:"boolean",defaultValue:true,group:"Behavior"},showDividers:{type:"boolean",defaultValue:true,group:"Appearance"},orientation:{type:"sap.ui.core.Orientation",defaultValue:v.Horizontal,group:"Appearance"},backgroundDesign:{type:"sap.m.BackgroundDesign",defaultValue:t.BackgroundDesign.Transparent,group:"Appearance"},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},height:{type:"sap.ui.core.CSSSize",group:"Appearance"},gridLayout:{type:"boolean",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},_scrollContainer:{type:"sap.m.ScrollContainer",multiple:false,visibility:"hidden"},_prevButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{scroll:{}}}});b.prototype.init=function(){this._aItemEnd=[];this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oScrollCntr=new i(this.getId()+"-scrl-cntnr",{width:"100%",height:"100%",horizontal:!s.system.desktop});this.setAggregation("_scrollContainer",this._oScrollCntr,true);if(s.system.desktop){this._oArrowPrev=new e({id:this.getId()+"-scrl-prev-button",type:t.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_PREV_SECTION"),press:function(t){t.cancelBubble();this._scroll(this._getScrollValue(false),this.getScrollTime())}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this._oArrowPrev._bExcludeFromTabChain=true;this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new e({id:this.getId()+"-scrl-next-button",type:t.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_NEXT_SECTION"),press:function(t){t.cancelBubble();this._scroll(this._getScrollValue(true),this.getScrollTime())}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this._oArrowNext._bExcludeFromTabChain=true;this.setAggregation("_nextButton",this._oArrowNext,true)}else if(s.system.phone||s.system.tablet){if(!this._isMobileView()){this._oArrowPrev=new c({id:this.getId()+"-scrl-prev-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new c({id:this.getId()+"-scrl-next-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this.setAggregation("_nextButton",this._oArrowNext,true)}}this._oScrollCntr.addDelegate({onAfterRendering:function(){if(s.system.desktop){var t=this._oScrollCntr.getDomRef("scroll");var e=this._oScrollCntr.$("scroll");var i=e.find(".sapMHrdrCntrInner").attr("tabindex","0");t.setAttribute("role","list");if(!this._oItemNavigation){this._oItemNavigation=new n;this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(a.Events.BorderReached,this._handleBorderReached,this);this._oItemNavigation.attachEvent(a.Events.AfterFocus,this._handleAfterFocus,this);this._oItemNavigation.attachEvent(a.Events.BeforeFocus,this._handleBeforeFocus,this);if(s.browser.msie||s.browser.edge){this._oItemNavigation.attachEvent(a.Events.FocusAgain,this._handleFocusAgain,this)}}this._oItemNavigation.setRootDomRef(t);this._oItemNavigation.setItemDomRefs(i);this._oItemNavigation.setTabIndex0();this._oItemNavigation.setCycling(false);this._handleMobileScrolling()}if(this._isMobileView()){var r=this._filterVisibleItems();this.aItemSize=[];this.aItemScrollValue=[0];var o=function(t){return t.getDomRef().parentElement.offsetWidth+parseFloat(getComputedStyle(t.getDomRef().parentElement).marginLeft)+parseFloat(getComputedStyle(t.getDomRef().parentElement).marginRight)};for(var l=0;l<r.length;l++){this.aItemSize.push(o(r[l]));this.aItemScrollValue.push(this.aItemScrollValue[l]?this.aItemScrollValue[l]+this.aItemSize[l]:this.aItemSize[l])}this._oScrollCntr.attachBrowserEvent("scrollstop",function(t){if(!this.triggerScrollStop){this.triggerScrollStop=true;var e=0,i=15;var o=this._oScrollCntr.getDomRef().scrollLeft;var s=o+this._oScrollCntr.getDomRef().clientWidth;var n=r[r.length-1];var a=n.getParent().getDomRef().offsetLeft;var l=a+n.getDomRef().clientWidth;var h=l<=s&&a>=o;var c=this._bRtl?Math.abs(t.currentTarget.scrollLeft):t.currentTarget.scrollLeft;if(h){e=this.aItemScrollValue[r.length-1]-i-c;this.triggerScrollStop=false}else{var g=this.aItemScrollValue.reduce(function(t,e){var i=Math.abs(t-c);var r=Math.abs(e-c);if(i==r){return t>e?t:e}else{return r<i?e:t}});if(c==0){e=0;this.triggerScrollStop=false}else{e=g-i-c}}this._scroll(e,this.getScrollTime())}else{this.triggerScrollStop=false}}.bind(this))}}.bind(this)});h.addListener(this._checkOverflow,this)};b.prototype.onBeforeRendering=function(){var t=this.getOrientation()===v.Horizontal,e=t?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up",i=t?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down";if(!this.getHeight()){p.warning("No height provided",this)}if(!this.getWidth()){p.warning("No width provided",this)}if(s.system.desktop){this._oArrowPrev.setProperty("icon",e,true);this._oArrowNext.setProperty("icon",i,true)}else if(s.system.phone||s.system.tablet){this._oArrowPrev.setProperty("src",e,true);this._oArrowNext.setProperty("src",i,true)}this.getContent()};b.prototype.onAfterRendering=function(){this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._checkOverflow()};b.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}h.removeListener(this._checkOverflow,this)};b.prototype.onsaptabnext=function(t){var e=this.$().find(":focusable");var i=e.index(t.target);var r=e.eq(i+1).get(0);var o=this._getParentCell(t.target);var s;if(r){s=this._getParentCell(r)}if(o&&s&&o.id!==s.id||r&&r.id===this.getId()+"-after"||r&&r.id===this.getId()+"-scrl-prev-button"||r&&r.id===this.getId()+"-scrl-next-button"){var n=e.last().get(0);if(n){this._bIgnoreFocusIn=true;n.focus()}}};b.prototype.onsaptabprevious=function(t){this.$().find(".sapMHdrCntrItemCntr").css("border-color","");var e=this.$().find(":focusable");var i=e.index(t.target);var r=e.eq(i-1).get(0);var o=this._getParentCell(t.target);var s;if(r){s=this._getParentCell(r)}if(!s||o&&o.id!==s.id){var n=this.$().attr("tabindex");this.$().attr("tabindex","0");this.$().trigger("focus");if(!n){this.$().removeAttr("tabindex")}else{this.$().attr("tabindex",n)}}};b.prototype.setOrientation=function(t){this.setProperty("orientation",t);if(t===v.Horizontal&&!s.system.desktop){this._oScrollCntr.setHorizontal(true);this._oScrollCntr.setVertical(false)}else if(!s.system.desktop){this._oScrollCntr.setHorizontal(false);this._oScrollCntr.setVertical(true)}return this};b.prototype.validateAggregation=function(t,e,i){return this._callSuperMethod("validateAggregation",t,e,i)};b.prototype.getAggregation=function(t,e,i){return this._callSuperMethod("getAggregation",t,e,i)};b.prototype.setAggregation=function(t,e,i){return this._callSuperMethod("setAggregation",t,e,i)};b.prototype.indexOfAggregation=function(t,e){return this._callSuperMethod("indexOfAggregation",t,e)};b.prototype.insertAggregation=function(t,e,i,r){return this._callSuperMethod("insertAggregation",t,e,i,r)};b.prototype.addAggregation=function(t,e,i){return this._callSuperMethod("addAggregation",t,e,i)};b.prototype.removeAggregation=function(t,e,i){return this._callSuperMethod("removeAggregation",t,e,i)};b.prototype.removeAllAggregation=function(t,e){return this._callSuperMethod("removeAllAggregation",t,e)};b.prototype.destroyAggregation=function(t,e){return this._callSuperMethod("destroyAggregation",t,e)};b.prototype.onkeydown=function(t){var e=this.getOrientation()===v.Horizontal,i=this.$("prev-button-container"),r=this.$("next-button-container"),o,s=0,n=this._filterVisibleItems();if(t.which===f.ARROW_RIGHT&&e){o=n[t.srcControl.mProperties.position-1].$().parent().outerWidth(true);if(o<this._getSize(i.is(":visible"))){this._scroll(o-s,this.getScrollTime())}}else if(t.which===f.ARROW_LEFT&&e){o=n[t.srcControl.mProperties.position-1].$().parent().outerWidth(true);if(o<this._getSize(r.is(":visible"))){if(!r.is(":visible")){var a=10;if(o+a<this._getSize(true)){s=r.width()+a}else{s=r.width()}}this._scroll(-(o-s),this.getScrollTime())}}if(t.which===f.ARROW_DOWN&&!e){o=n[t.srcControl.mProperties.position-1].$().parent().outerHeight(true);if(o<this._getSize(i.is(":visible"))){this._scroll(o-s,this.getScrollTime())}}else if(t.which===f.ARROW_UP&&!e){o=n[t.srcControl.mProperties.position-1].$().parent().outerHeight(true);if(o<this._getSize(r.is(":visible"))){if(!r.is(":visible")){var a=10;if(o+a<this._getSize(true)){s=r.height()+a}else{s=r.wheightidth()}}this._scroll(-(o-s),this.getScrollTime())}}};b.prototype._setScrollInProcess=function(t){this.bScrollInProcess=t};b.prototype._scroll=function(t,e){this._setScrollInProcess(true);this.fireScroll();setTimeout(this._setScrollInProcess.bind(this,false),e+300);if(this.getOrientation()===v.Horizontal){this._hScroll(t,e)}else{this._vScroll(t,e)}};b.prototype._vScroll=function(t,e){var i=this._oScrollCntr.getDomRef(),r=i.scrollTop,o=i.scrollHeight,s=r+t,n=i.clientHeight,a=parseFloat(this.$("scroll-area").css("padding-top")),l;if(s<=0){l=this._calculateRemainingScrolling(t,e,r);this.$("scroll-area").css("transition","padding "+l+"s");this.$().removeClass("sapMHrdrTopPadding")}else if(s+n+a>=o){l=this._calculateRemainingScrolling(t,e,o-n-r);this.$("scroll-area").css("transition","padding "+l+"s");if(n+t>o&&n!==o){this.$().removeClass("sapMHrdrBottomPadding");this.$().addClass("sapMHrdrTopPadding")}else{this.$().removeClass("sapMHrdrBottomPadding")}}else{this.$("scroll-area").css("transition","padding "+e/1e3+"s")}this._oScrollCntr.scrollTo(0,s,e)};b.prototype._hScroll=function(t,e){var i=this._oScrollCntr.getDomRef();var r,o,n,a,l,h;if(!this._bRtl){o=i.scrollLeft;a=i.scrollWidth;n=i.clientWidth+(s.browser.msie?1:0);r=o+t;l=parseFloat(this.$("scroll-area").css("padding-left"));if(r<=0){h=this._calculateRemainingScrolling(t,e,o);this.$("scroll-area").css("transition","padding "+h+"s");this.$().removeClass("sapMHrdrLeftPadding")}else if(r+i.clientWidth+l>=a){h=this._calculateRemainingScrolling(t,e,a-n-o);this.$("scroll-area").css("transition","padding "+h+"s");if(n+t>a&&n!==a){this.$().removeClass("sapMHrdrRightPadding");this.$().addClass("sapMHrdrLeftPadding")}else{this.$().removeClass("sapMHrdrRightPadding")}}else{this.$("scroll-area").css("transition","padding "+e/1e3+"s")}this._oScrollCntr.scrollTo(r,0,e)}else{r=u(i).scrollRightRTL()+t;this._oScrollCntr.scrollTo(r>0?r:0,0,e)}};b.prototype._collectItemSize=function(){var t=0,e=this._filterVisibleItems(),i=this.getOrientation()===v.Horizontal?"outerWidth":"outerHeight";this._aItemEnd=[];e.forEach(function(e,r){t+=e.$().parent()[i](true);this._aItemEnd[r]=t},this)};b.prototype._getScrollValue=function(t){if(!this._oScrollCntr){return 0}var e=this.getOrientation()===v.Horizontal,i=this._oScrollCntr.$(),r=this.$("prev-button-container"),o=this.$("next-button-container"),s=e?i[0].scrollLeft:i[0].scrollTop,n=0,a=0,l,h=this._filterVisibleItems();var c=function(t){var i=0,s=0;var n=10;if(this._bRtl&&e){if(!r.is(":visible")){s=r.width()}if(!o.is(":visible")){s=o.width()}}for(var a=0;a<h.length&&a<t;a++){i+=g(h[a])}return i!==0?i+n-s:0}.bind(this);var g=function(t){return e?t.$().parent().outerWidth(true):t.$().parent().outerHeight(true)};var p=function(){var t=this._getSize(true),e,i=0;for(var r=n;r<h.length;r++){if(!h[r].$().is(":visible")){e=g(h[r])+c(r)-t-s;for(var o=n;o<h.length&&o<r;o++){if(l+i>e){break}n++;i+=g(h[o])}l+=i;break}}}.bind(this);if(this.getScrollStepByItem()>0){s=e&&this._bRtl?i.scrollRightRTL():s;for(var f=0;f<h.length;f++){a+=g(h[f]);if(a>=s){n=f;break}}n=(t?1:-1)*this.getScrollStepByItem()+n;if(n<0){n=0}if(n>=h.length){n=h.length-1}l=c(n)-s;if(t&&!this.getShowOverflowItem()){p()}return l}return t?this.getScrollStep():-this.getScrollStep()};b.prototype._calculateRemainingScrolling=function(t,e,i){return Math.abs(i*e/(1e3*t))};b.prototype._checkOverflow=function(){if(this.getOrientation()===v.Horizontal){this._checkHOverflow()}else{this._checkVOverflow()}};b.prototype._filterVisibleItems=function(){return this.getContent().filter(function(t){return t.getVisible()})};b.prototype._getFirstItemOffset=function(t){var e=this._filterVisibleItems()[0],i=e&&e.$(),r=i&&i.parent(),o=r&&r[0]&&r[0][t];return o||0};b.prototype._checkVOverflow=function(){var t=this._oScrollCntr.getDomRef(),e,i;if(t){var r=this._getFirstItemOffset("offsetTop");var o=Math.ceil(t.scrollTop);var s=false;var n=false;var a=t.scrollHeight;var l=t.offsetHeight;if(Math.abs(a-l)===1){a=l}if(o>r){s=true}if(a>l&&o+l<a){n=true}n=this._checkForOverflowItem(n);i=this.$("prev-button-container");e=i.is(":visible");if(e&&!s){i.hide();this.$().removeClass("sapMHrdrTopPadding")}if(!e&&s){i.show();this.$().addClass("sapMHrdrTopPadding")}i=this.$("next-button-container");var h=i.is(":visible");if(h&&!n){i.hide();this.$().removeClass("sapMHrdrBottomPadding")}if(!h&&n){i.show();this.$().addClass("sapMHrdrBottomPadding")}}};b.prototype._handleMobileScrolling=function(){if(r.isMobile()){var t=this.$("scrl-cntnr-scroll"),e=this.getOrientation()===v.Horizontal,i=e?"clientX":"clientY",o=0,s=this,n=false;t.on("touchstart",function(t){n=true;o=t.targetTouches[0][i]});t.on("touchmove",function(t){if(n){var r=t.targetTouches[0][i],a=o-r,l=s._oScrollCntr.getDomRef();e?l.scrollLeft+=a:l.scrollTop+=a;o=r;t.preventDefault()}});t.on("touchend",function(){n=false})}};b.prototype._checkHOverflow=function(){var t=this._oScrollCntr.getDomRef(),e;if(t){var i=this._getFirstItemOffset("offsetLeft");var r=Math.ceil(t.scrollLeft);var o=false;var n=false;var a=t.scrollWidth;var l=t.offsetWidth;if(Math.abs(a-l)===1){a=l}if(this._bRtl){var h=u(t).scrollLeftRTL();if(h>(s.browser.msie||s.browser.edge?1:0)){n=true}}else if(r>i){o=true}if(a-5>l){if(this._bRtl){if(u(t).scrollRightRTL()>1){o=true}}else if(r+l<a){n=true}}e=this.$("prev-button-container");n=this._checkForOverflowItem(n);var c=e.is(":visible");if(c&&!o&&!this._isMobileView()){e.hide();this.$().removeClass("sapMHrdrLeftPadding")}if(!c&&o&&!this._isMobileView()){e.show();this.$().addClass("sapMHrdrLeftPadding")}e=this.$("next-button-container");var g=e.is(":visible");if(g&&!n&&!this._isMobileView()){e.hide();this.$().removeClass("sapMHrdrRightPadding")}if(!g&&n&&!this._isMobileView()){e.show();this.$().addClass("sapMHrdrRightPadding")}}};b.prototype._getSize=function(t){var e=this._oScrollCntr.$(),i=this.getOrientation()===v.Horizontal,r=this.$("next-button-container"),o=!r.is(":visible")&&t,s=i?"width":"height";return e[s]()-(o?r[s]():0)};b.prototype._checkForOverflowItem=function(t){if(this._oScrollCntr&&!this.getShowOverflowItem()){var e=this._oScrollCntr.$(),i=this.getOrientation()===v.Horizontal,r=!i?e[0].scrollTop:this._bRtl?e.scrollRightRTL():e[0].scrollLeft,o=i?"width":"height",s=this._getSize(t),n=this._filterVisibleItems();this._collectItemSize();this._aItemEnd.forEach(function(e,i){var a=n[i].$(),l=a.parent(),h=a.is(":visible");if(t&&e>r+s){if(i===0||this._aItemEnd[i-1]<=r){l.css(o,"auto");a.show()}else if(h){l[o](l[o]());a.hide();t=true}}else{if(!h){l.css(o,"auto");a.show()}}},this)}return t};b.prototype._handleBorderReached=function(t){if(s.browser.msie&&this.bScrollInProcess){return}var e=t.getParameter("index");if(e===0){this._scroll(this._getScrollValue(false),this.getScrollTime())}else if(e===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime())}};b.prototype._handleAfterFocus=function(t){var e=t.getParameter("event");if((s.browser.msie||s.browser.edge)&&e.type==="mousedown"&&e.srcControl instanceof sap.m.Input){e.srcControl.focus()}if(s.browser.msie&&this.bScrollInProcess){return}var i=t.getParameter("index");if(i===0){this._scroll(this._getScrollValue(false),this.getScrollTime())}else if(i===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime())}};b.prototype._handleFocusAgain=function(t){var e=t.getParameter("event");if((s.browser.msie||s.browser.edge)&&e.type==="mousedown"&&e.srcControl instanceof sap.m.Input){e.srcControl.focus()}t.getParameter("event").preventDefault()};b.prototype._handleBeforeFocus=function(t){var e=t.getParameter("event");if(u(e.target).hasClass("sapMHdrCntrItemCntr")||u(e.target).hasClass("sapMScrollContScroll")||d.events.sapprevious.fnCheck(e)||d.events.sapnext.fnCheck(e)){this.$().find(".sapMHdrCntrItemCntr").css("border-color","")}else{this.$().find(".sapMHdrCntrItemCntr").css("border-color","transparent")}};b.prototype._isMobileView=function(){return this.getGridLayout()&&this.getOrientation()===v.Horizontal&&s.resize.width>=_.xsmall&&s.resize.width<_.tablet};b.prototype._unWrapHeaderContainerItemContainer=function(t){if(t instanceof m){t=t.getItem()}else if(Array.isArray(t)){for(var e=0;e<t.length;e++){if(t[e]instanceof m){t[e]=t[e].getItem()}}}return t};b._AGGREGATION_FUNCTIONS=["validateAggregation","getAggregation","setAggregation","indexOfAggregation","removeAggregation"];b._AGGREGATION_FUNCTIONS_FOR_INSERT=["insertAggregation","addAggregation"];b.prototype._callSuperMethod=function(t,e){var i=Array.prototype.slice.call(arguments);if(e==="content"){var r=i[2];i[1]="content";if(r instanceof o){if(b._AGGREGATION_FUNCTIONS.indexOf(t)>-1&&r.getParent()instanceof m){i[2]=r.getParent()}else if(b._AGGREGATION_FUNCTIONS_FOR_INSERT.indexOf(t)>-1){i[2]=new m({item:r})}}var s=[];this._oScrollCntr.getContent().forEach(function(t,e){if(!t.getItem()){s.push(e)}});for(var n=0;n<s.length;n++){this._oScrollCntr.removeContent(s[n])}var a=this._oScrollCntr[t].apply(this._oScrollCntr,i.slice(1));if(t!=="removeAllAggregation"){var l=this._oScrollCntr.getContent();var h=this.getAriaLabelledBy();var c=1;var g=l.filter(function(t){return t.getItem().getVisible()}).length;for(var n=0;n<l.length;n++){var p=l[n];if(p.getItem().getVisible()){p.setVisible(true);p.setPosition(c);p.setSetSize(g);p.setAriaLabelledBy(h[n]);c++}else{p.setVisible(false)}}}return this._unWrapHeaderContainerItemContainer(a)}else{return o.prototype[t].apply(this,i.slice(1))}};b.prototype._callMethodInManagedObject=function(){throw new TypeError("Method no longer exists: HeaderContainer.prototype._callMethodInManagedObject")};b.prototype._getParentCell=function(t){return u(t).parents(".sapMHrdrCntrInner").andSelf(".sapMHrdrCntrInner").get(0)};b.prototype.onfocusin=function(t){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;return}if(t.target.id===this.getId()+"-after"){this._restoreLastFocused()}};b.prototype._restoreLastFocused=function(){if(!this._oItemNavigation){return}var t=this._oItemNavigation.getItemDomRefs();var e=this._oItemNavigation.getFocusedIndex();var i=u(t[e]);var r=i.control(0)||{};var o=r.getTabbables?r.getTabbables():i.find(":sapTabbable");o.eq(-1).add(i).eq(-1).trigger("focus")};return b});