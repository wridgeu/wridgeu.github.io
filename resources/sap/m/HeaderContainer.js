/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./Button","./ScrollContainer","sap/ui/core/Core","sap/ui/core/Control","sap/ui/Device","sap/m/HeaderContainerItemNavigator","sap/ui/core/delegate/ItemNavigation","sap/ui/core/library","sap/ui/core/IntervalTrigger","sap/ui/base/ManagedObject","sap/ui/core/Icon","./HeaderContainerRenderer","sap/base/Log","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/Selectors"],function(t,e,r,i,o,s,a,n,l,c,h,g,d,p,f,u){"use strict";var v=l.Orientation;var _=o.extend("sap.m.HeaderContainerItemContainer",{metadata:{defaultAggregation:"item",properties:{position:{type:"int",defaultValue:null},setSize:{type:"int",defaultValue:null},ariaLabelledBy:{type:"string",defaultValue:null}},aggregations:{item:{type:"sap.ui.core.Control",multiple:false}}},renderer:function(t,e){var r=e.getAggregation("item");if(!r||!r.getVisible()){return}t.write("<div");t.writeControlData(e);t.addClass("sapMHdrCntrItemCntr");t.addClass("sapMHrdrCntrInner");t.writeAttribute("aria-setsize",e.getSetSize());t.writeAttribute("aria-posinset",e.getPosition());t.writeAttribute("role","listitem");if(e.getAriaLabelledBy()){t.writeAttributeEscaped("aria-labelledby",e.getAriaLabelledBy())}t.writeClasses();t.write(">");t.renderControl(r);t.write("</div>")}});var m=o.extend("sap.m.HeaderContainer",{metadata:{interfaces:["sap.m.ObjectHeaderContainer"],library:"sap.m",properties:{scrollStep:{type:"int",defaultValue:300,group:"Behavior"},scrollStepByItem:{type:"int",defaultValue:1,group:"Behavior"},scrollTime:{type:"int",defaultValue:500,group:"Behavior"},showOverflowItem:{type:"boolean",defaultValue:true,group:"Behavior"},showDividers:{type:"boolean",defaultValue:true,group:"Appearance"},orientation:{type:"sap.ui.core.Orientation",defaultValue:v.Horizontal,group:"Appearance"},backgroundDesign:{type:"sap.m.BackgroundDesign",defaultValue:t.BackgroundDesign.Transparent,group:"Appearance"},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},height:{type:"sap.ui.core.CSSSize",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},_scrollContainer:{type:"sap.m.ScrollContainer",multiple:false,visibility:"hidden"},_prevButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{scroll:{}}}});m.prototype.init=function(){this._aItemEnd=[];this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oScrollCntr=new r(this.getId()+"-scrl-cntnr",{width:"100%",height:"100%",horizontal:!s.system.desktop});this.setAggregation("_scrollContainer",this._oScrollCntr,true);if(s.system.desktop){this._oArrowPrev=new e({id:this.getId()+"-scrl-prev-button",type:t.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_PREV_SECTION"),press:function(t){t.cancelBubble();this._scroll(this._getScrollValue(false),this.getScrollTime())}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this._oArrowPrev._bExcludeFromTabChain=true;this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new e({id:this.getId()+"-scrl-next-button",type:t.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_NEXT_SECTION"),press:function(t){t.cancelBubble();this._scroll(this._getScrollValue(true),this.getScrollTime())}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this._oArrowNext._bExcludeFromTabChain=true;this.setAggregation("_nextButton",this._oArrowNext,true)}else if(s.system.phone||s.system.tablet){this._oArrowPrev=new g({id:this.getId()+"-scrl-prev-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new g({id:this.getId()+"-scrl-next-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this.setAggregation("_nextButton",this._oArrowNext,true)}this._oScrollCntr.addDelegate({onAfterRendering:function(){if(s.system.desktop){var t=this._oScrollCntr.getDomRef("scroll");var e=this._oScrollCntr.$("scroll");var r=e.find(".sapMHrdrCntrInner").attr("tabindex","0");if(!this._oItemNavigation){this._oItemNavigation=new a;this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(n.Events.BorderReached,this._handleBorderReached,this);this._oItemNavigation.attachEvent(n.Events.AfterFocus,this._handleAfterFocus,this);this._oItemNavigation.attachEvent(n.Events.BeforeFocus,this._handleBeforeFocus,this);if(s.browser.msie||s.browser.edge){this._oItemNavigation.attachEvent(n.Events.FocusAgain,this._handleFocusAgain,this)}}this._oItemNavigation.setRootDomRef(t);this._oItemNavigation.setItemDomRefs(r);this._oItemNavigation.setTabIndex0();this._oItemNavigation.setCycling(false);this._handleMobileScrolling()}}.bind(this)});c.addListener(this._checkOverflow,this)};m.prototype.onBeforeRendering=function(){if(!this.getHeight()){p.warning("No height provided",this)}if(!this.getWidth()){p.warning("No width provided",this)}if(s.system.desktop){this._oArrowPrev.setIcon(this.getOrientation()===v.Horizontal?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up");this._oArrowNext.setIcon(this.getOrientation()===v.Horizontal?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down")}else if(s.system.phone||s.system.tablet){this._oArrowPrev.setSrc(this.getOrientation()===v.Horizontal?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up");this._oArrowNext.setSrc(this.getOrientation()===v.Horizontal?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down")}};m.prototype.onAfterRendering=function(){this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._checkOverflow()};m.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}c.removeListener(this._checkOverflow,this)};m.prototype.onsaptabnext=function(t){var e=this.$().find(":focusable");var r=e.index(t.target);var i=e.eq(r+1).get(0);var o=this._getParentCell(t.target);var s;if(i){s=this._getParentCell(i)}if(o&&s&&o.id!==s.id||i&&i.id===this.getId()+"-after"||i&&i.id===this.getId()+"-scrl-prev-button"||i&&i.id===this.getId()+"-scrl-next-button"){var a=e.last().get(0);if(a){this._bIgnoreFocusIn=true;a.focus()}}};m.prototype.onsaptabprevious=function(t){this.$().find(".sapMHdrCntrItemCntr").css("border-color","");var e=this.$().find(":focusable");var r=e.index(t.target);var i=e.eq(r-1).get(0);var o=this._getParentCell(t.target);var s;if(i){s=this._getParentCell(i)}if(!s||o&&o.id!==s.id){var a=this.$().attr("tabindex");this.$().attr("tabindex","0");this.$().trigger("focus");if(!a){this.$().removeAttr("tabindex")}else{this.$().attr("tabindex",a)}}};m.prototype.setOrientation=function(t){this.setProperty("orientation",t);if(t===v.Horizontal&&!s.system.desktop){this._oScrollCntr.setHorizontal(true);this._oScrollCntr.setVertical(false)}else if(!s.system.desktop){this._oScrollCntr.setHorizontal(false);this._oScrollCntr.setVertical(true)}return this};m.prototype.validateAggregation=function(t,e,r){return this._callMethodInManagedObject("validateAggregation",t,e,r)};m.prototype.getAggregation=function(t,e,r){return this._callMethodInManagedObject("getAggregation",t,e,r)};m.prototype.setAggregation=function(t,e,r){return this._callMethodInManagedObject("setAggregation",t,e,r)};m.prototype.indexOfAggregation=function(t,e){return this._callMethodInManagedObject("indexOfAggregation",t,e)};m.prototype.insertAggregation=function(t,e,r,i){return this._callMethodInManagedObject("insertAggregation",t,e,r,i)};m.prototype.addAggregation=function(t,e,r){return this._callMethodInManagedObject("addAggregation",t,e,r)};m.prototype.removeAggregation=function(t,e,r){return this._callMethodInManagedObject("removeAggregation",t,e,r)};m.prototype.removeAllAggregation=function(t,e){return this._callMethodInManagedObject("removeAllAggregation",t,e)};m.prototype.destroyAggregation=function(t,e){return this._callMethodInManagedObject("destroyAggregation",t,e)};m.prototype._setScrollInProcess=function(t){this.bScrollInProcess=t};m.prototype._scroll=function(t,e){this._setScrollInProcess(true);this.fireScroll();setTimeout(this._setScrollInProcess.bind(this,false),e+300);if(this.getOrientation()===v.Horizontal){this._hScroll(t,e)}else{this._vScroll(t,e)}};m.prototype._vScroll=function(t,e){var r=this._oScrollCntr.getDomRef(),i=r.scrollTop,o=r.scrollHeight,s=i+t,a=r.clientHeight,n=parseFloat(this.$("scroll-area").css("padding-top")),l;if(s<=0){l=this._calculateRemainingScrolling(t,e,i);this.$("scroll-area").css("transition","padding "+l+"s");this.$().removeClass("sapMHrdrTopPadding")}else if(s+a+n>=o){l=this._calculateRemainingScrolling(t,e,o-a-i);this.$("scroll-area").css("transition","padding "+l+"s");if(a+t>o&&a!==o){this.$().removeClass("sapMHrdrBottomPadding");this.$().addClass("sapMHrdrTopPadding")}else{this.$().removeClass("sapMHrdrBottomPadding")}}else{this.$("scroll-area").css("transition","padding "+e/1e3+"s")}this._oScrollCntr.scrollTo(0,s,e)};m.prototype._hScroll=function(t,e){var r=this._oScrollCntr.getDomRef();var i,o,a,n,l,c;if(!this._bRtl){o=r.scrollLeft;n=r.scrollWidth;a=r.clientWidth+(s.browser.msie?1:0);i=o+t;l=parseFloat(this.$("scroll-area").css("padding-left"));if(i<=0){c=this._calculateRemainingScrolling(t,e,o);this.$("scroll-area").css("transition","padding "+c+"s");this.$().removeClass("sapMHrdrLeftPadding")}else if(i+r.clientWidth+l>=n){c=this._calculateRemainingScrolling(t,e,n-a-o);this.$("scroll-area").css("transition","padding "+c+"s");if(a+t>n&&a!==n){this.$().removeClass("sapMHrdrRightPadding");this.$().addClass("sapMHrdrLeftPadding")}else{this.$().removeClass("sapMHrdrRightPadding")}}else{this.$("scroll-area").css("transition","padding "+e/1e3+"s")}this._oScrollCntr.scrollTo(i,0,e)}else{i=u(r).scrollRightRTL()+t;this._oScrollCntr.scrollTo(i>0?i:0,0,e)}};m.prototype._collectItemSize=function(){var t=0,e=this._filterVisibleItems(),r=this.getOrientation()===v.Horizontal?"outerWidth":"outerHeight";this._aItemEnd=[];e.forEach(function(e,i){t+=e.$().parent()[r](true);this._aItemEnd[i]=t},this)};m.prototype._getScrollValue=function(t){if(!this._oScrollCntr){return 0}var e=this.getOrientation()===v.Horizontal,r=this._oScrollCntr.$(),i=this.$("prev-button-container"),o=this.$("next-button-container"),s=e?r[0].scrollLeft:r[0].scrollTop,a=0,n=0,l,c=this._filterVisibleItems();var h=function(t){var r=0,s=0;var a=10;if(this._bRtl&&e){if(!i.is(":visible")){s=i.width()}if(!o.is(":visible")){s=o.width()}}for(var n=0;n<c.length&&n<t;n++){r+=g(c[n])}return r!==0?r+a-s:0}.bind(this);var g=function(t){return e?t.$().parent().outerWidth(true):t.$().parent().outerHeight(true)};var d=function(){var t=this._getSize(true),e,r=0;for(var i=a;i<c.length;i++){if(!c[i].$().is(":visible")){e=g(c[i])+h(i)-t-s;for(var o=a;o<c.length&&o<i;o++){if(l+r>e){break}a++;r+=g(c[o])}l+=r;break}}}.bind(this);if(this.getScrollStepByItem()>0){s=e&&this._bRtl?r.scrollRightRTL():s;for(var p=0;p<c.length;p++){n+=g(c[p]);if(n>=s){a=p;break}}a=(t?1:-1)*this.getScrollStepByItem()+a;if(a<0){a=0}if(a>=c.length){a=c.length-1}l=h(a)-s;if(t&&!this.getShowOverflowItem()){d()}return l}return t?this.getScrollStep():-this.getScrollStep()};m.prototype._calculateRemainingScrolling=function(t,e,r){return Math.abs(r*e/(1e3*t))};m.prototype._checkOverflow=function(){if(this.getOrientation()===v.Horizontal){this._checkHOverflow()}else{this._checkVOverflow()}};m.prototype._filterVisibleItems=function(){return this.getContent().filter(function(t){return t.getVisible()})};m.prototype._getFirstItemOffset=function(t){var e=this._filterVisibleItems()[0],r=e&&e.$(),i=r&&r.parent(),o=i&&i[0]&&i[0][t];return o||0};m.prototype._checkVOverflow=function(){var t=this._oScrollCntr.getDomRef(),e,r;if(t){var i=this._getFirstItemOffset("offsetTop");var o=Math.ceil(t.scrollTop);var s=false;var a=false;var n=t.scrollHeight;var l=t.offsetHeight;if(Math.abs(n-l)===1){n=l}if(o>i){s=true}if(n>l&&o+l<n){a=true}a=this._checkForOverflowItem(a);r=this.$("prev-button-container");e=r.is(":visible");if(e&&!s){r.hide();this.$().removeClass("sapMHrdrTopPadding")}if(!e&&s){r.show();this.$().addClass("sapMHrdrTopPadding")}r=this.$("next-button-container");var c=r.is(":visible");if(c&&!a){r.hide();this.$().removeClass("sapMHrdrBottomPadding")}if(!c&&a){r.show();this.$().addClass("sapMHrdrBottomPadding")}}};m.prototype._handleMobileScrolling=function(){if(i.isMobile()){var t=this.$("scrl-cntnr-scroll"),e=this.getOrientation()===v.Horizontal,r=e?"clientX":"clientY",o=0,s=this,a=false;t.on("touchstart",function(t){a=true;o=t.targetTouches[0][r]});t.on("touchmove",function(t){if(a){var i=t.targetTouches[0][r],n=o-i,l=s._oScrollCntr.getDomRef();e?l.scrollLeft+=n:l.scrollTop+=n;o=i;t.preventDefault()}});t.on("touchend",function(){a=false})}};m.prototype._checkHOverflow=function(){var t=this._oScrollCntr.getDomRef(),e;if(t){var r=this._getFirstItemOffset("offsetLeft");var i=Math.ceil(t.scrollLeft);var o=false;var a=false;var n=t.scrollWidth;var l=t.offsetWidth;if(Math.abs(n-l)===1){n=l}if(this._bRtl){var c=u(t).scrollLeftRTL();if(c>(s.browser.msie||s.browser.edge?1:0)){a=true}}else if(i>r){o=true}if(n-5>l){if(this._bRtl){if(u(t).scrollRightRTL()>1){o=true}}else if(i+l<n){a=true}}e=this.$("prev-button-container");a=this._checkForOverflowItem(a);var h=e.is(":visible");if(h&&!o){e.hide();this.$().removeClass("sapMHrdrLeftPadding")}if(!h&&o){e.show();this.$().addClass("sapMHrdrLeftPadding")}e=this.$("next-button-container");var g=e.is(":visible");if(g&&!a){e.hide();this.$().removeClass("sapMHrdrRightPadding")}if(!g&&a){e.show();this.$().addClass("sapMHrdrRightPadding")}}};m.prototype._getSize=function(t){var e=this._oScrollCntr.$(),r=this.getOrientation()===v.Horizontal,i=this.$("next-button-container"),o=!i.is(":visible")&&t,s=r?"width":"height";return e[s]()-(o?i[s]():0)};m.prototype._checkForOverflowItem=function(t){if(this._oScrollCntr&&!this.getShowOverflowItem()){var e=this._oScrollCntr.$(),r=this.getOrientation()===v.Horizontal,i=!r?e[0].scrollTop:this._bRtl?e.scrollRightRTL():e[0].scrollLeft,o=r?"width":"height",s=this._getSize(t),a=this._filterVisibleItems();this._collectItemSize();this._aItemEnd.forEach(function(e,r){var n=a[r].$(),l=n.parent(),c=n.is(":visible");if(t&&e>i+s){if(r===0||this._aItemEnd[r-1]<=i){l.css(o,"auto");n.show()}else if(c){l[o](l[o]());n.hide();t=true}}else{if(!c){l.css(o,"auto");n.show()}}},this)}return t};m.prototype._handleBorderReached=function(t){if(s.browser.msie&&this.bScrollInProcess){return}var e=t.getParameter("index");if(e===0){this._scroll(this._getScrollValue(false),this.getScrollTime())}else if(e===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime())}};m.prototype._handleAfterFocus=function(t){var e=t.getParameter("event");if((s.browser.msie||s.browser.edge)&&e.type==="mousedown"&&e.srcControl instanceof sap.m.Input){e.srcControl.focus()}if(s.browser.msie&&this.bScrollInProcess){return}var r=t.getParameter("index");if(r===0){this._scroll(this._getScrollValue(false),this.getScrollTime())}else if(r===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime())}};m.prototype._handleFocusAgain=function(t){var e=t.getParameter("event");if((s.browser.msie||s.browser.edge)&&e.type==="mousedown"&&e.srcControl instanceof sap.m.Input){e.srcControl.focus()}t.getParameter("event").preventDefault()};m.prototype._handleBeforeFocus=function(t){var e=t.getParameter("event");if(u(e.target).hasClass("sapMHdrCntrItemCntr")||u(e.target).hasClass("sapMScrollContScroll")||f.events.sapprevious.fnCheck(e)||f.events.sapnext.fnCheck(e)){this.$().find(".sapMHdrCntrItemCntr").css("border-color","")}else{this.$().find(".sapMHdrCntrItemCntr").css("border-color","transparent")}};m.prototype._unWrapHeaderContainerItemContainer=function(t){if(t instanceof _){t=t.getItem()}else if(Array.isArray(t)){for(var e=0;e<t.length;e++){if(t[e]instanceof _){t[e]=t[e].getItem()}}}return t};m._AGGREGATION_FUNCTIONS=["validateAggregation","validateAggregation","getAggregation","setAggregation","indexOfAggregation","removeAggregation"];m._AGGREGATION_FUNCTIONS_FOR_INSERT=["insertAggregation","addAggregation"];m.prototype._callMethodInManagedObject=function(t,e){var r=Array.prototype.slice.call(arguments);if(e==="content"){var i=r[2];r[1]="content";if(i instanceof o){if((m._AGGREGATION_FUNCTIONS?Array.prototype.indexOf.call(m._AGGREGATION_FUNCTIONS,t):-1)>-1&&i.getParent()instanceof _){r[2]=i.getParent()}else if((m._AGGREGATION_FUNCTIONS_FOR_INSERT?Array.prototype.indexOf.call(m._AGGREGATION_FUNCTIONS_FOR_INSERT,t):-1)>-1){r[2]=new _({item:i})}}var s=this._oScrollCntr[t].apply(this._oScrollCntr,r.slice(1));if(t!=="removeAllAggregation"){var a=this._oScrollCntr.getContent();var n=this.getAriaLabelledBy();var l=1;var c=a.filter(function(t){return t.getItem().getVisible()}).length;for(var g=0;g<a.length;g++){var d=a[g];if(d.getItem().getVisible()){d.setPosition(l);d.setSetSize(c);d.setAriaLabelledBy(n[g]);l++}}}return this._unWrapHeaderContainerItemContainer(s)}else{return h.prototype[t].apply(this,r.slice(1))}};m.prototype._getParentCell=function(t){return u(t).parents(".sapMHrdrCntrInner").andSelf(".sapMHrdrCntrInner").get(0)};m.prototype.onfocusin=function(t){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;return}if(t.target.id===this.getId()+"-after"){this._restoreLastFocused()}};m.prototype._restoreLastFocused=function(){if(!this._oItemNavigation){return}var t=this._oItemNavigation.getItemDomRefs();var e=this._oItemNavigation.getFocusedIndex();var r=u(t[e]);var i=r.control(0)||{};var o=i.getTabbables?i.getTabbables():r.find(":sapTabbable");o.eq(-1).add(r).eq(-1).trigger("focus")};return m});