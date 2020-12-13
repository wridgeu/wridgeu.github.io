/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Popup","sap/ui/core/Core","sap/m/Text","sap/m/Button","sap/ui/core/ResizeHandler","sap/ui/Device","sap/ui/core/Icon","sap/ui/layout/VerticalLayout","./InstanceManager","sap/ui/core/InvisibleText","sap/ui/core/library","./LightBoxRenderer","sap/m/BusyIndicator","sap/ui/thirdparty/jquery","sap/ui/dom/units/Rem"],function(t,e,i,s,o,n,r,a,h,p,u,g,l,_,c,d,f){"use strict";var m=t.ButtonType;var I=t.LightBoxLoadingStates;var y=l.OpenState;var x=l.TextAlign;var L=e.extend("sap.m.LightBox",{metadata:{library:"sap.m",interfaces:["sap.ui.core.PopupInterface"],aggregations:{imageContent:{type:"sap.m.LightBoxItem",multiple:true,bindable:"bindable"},_closeButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_verticalLayout:{type:"sap.ui.layout.VerticalLayout",multiple:false,visibility:"hidden"},_invisiblePopupText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_busy:{type:"sap.m.BusyIndicator",multiple:false,visibility:"hidden"}},defaultAggregation:"imageContent",events:{},designtime:"sap/m/designtime/LightBox.designtime"}});L.prototype.init=function(){this._createPopup();this._iWidth=0;this._iHeight=0;this._isRendering=true;this._iResizeListenerId=null;this._$lightBox=null;this._oRB=s.getLibraryResourceBundle("sap.m");this.setAggregation("_invisiblePopupText",new g)};L.prototype.onBeforeRendering=function(){var t=this._getImageContent(),e=t._getNativeImage(),i=t.getImageSrc(),s=t._getImageState(),o=this._oRB.getText("LIGHTBOX_ARIA_ENLARGED",[t.getTitle(),t.getSubtitle()]),n=this._oRB.getText("LIGHTBOX_IMAGE_ERROR"),h=this._oRB.getText("LIGHTBOX_IMAGE_ERROR_DETAILS");this._createErrorControls();if(e.getAttribute("src")!==i){e.src=i}if(this._iResizeListenerId){a.resize.detachHandler(this._fnResizeListener);r.deregister(this._iResizeListenerId);this._iResizeListenerId=null}switch(s){case I.Loading:if(!this._iTimeoutId){this._iTimeoutId=setTimeout(function(){t._setImageState(I.TimeOutError)},1e4)}break;case I.Loaded:clearTimeout(this._iTimeoutId);this._calculateSizes(e);break;case I.Error:clearTimeout(this._iTimeoutId);o+=" "+n+" "+h;break;default:break}if(t){this.getAggregation("_invisiblePopupText").setText(o)}this._isRendering=true};L.prototype.onAfterRendering=function(){this._isRendering=false;this._$lightBox=this.$();if(!this._iResizeListenerId){this._fnResizeListener=this._onResize.bind(this);a.resize.attachHandler(this._fnResizeListener);this._iResizeListenerId=r.register(this,this._fnResizeListener)}};L.prototype.forceInvalidate=e.prototype.invalidate;L.prototype.invalidate=function(t){var e=this._getImageContent();if(this.isOpen()){if(e&&e.getImageSrc()){this.forceInvalidate(t)}else{this.close()}}return this};L.prototype.exit=function(){if(this._oPopup){this._oPopup.detachOpened(this._fnPopupOpened,this);this._oPopup.detachClosed(this._fnPopupClosed,this);this._oPopup.destroy();this._oPopup=null}if(this._iResizeListenerId){a.resize.detachHandler(this._fnResizeListener);r.deregister(this._iResizeListenerId);this._iResizeListenerId=null}u.removeLightBoxInstance(this)};L.prototype.open=function(){var t=this._getImageContent();this._oPopup.setContent(this);if(t&&t.getImageSrc()){this._oPopup.open(300,"center center","center center",document.body,null);u.addLightBoxInstance(this)}return this};L.prototype.isOpen=function(){if(this._oPopup&&this._oPopup.isOpen()){return true}return false};L.prototype.close=function(){if(this._iResizeListenerId){a.resize.detachHandler(this._fnResizeListener);r.deregister(this._iResizeListenerId);this._iResizeListenerId=null}this._oPopup.close();u.removeLightBoxInstance(this);return this};L.prototype._getCloseButton=function(){var t=this.getAggregation("_closeButton");if(!t){t=new n({id:this.getId()+"-closeButton",text:this._oRB.getText("LIGHTBOX_CLOSE_BUTTON"),type:m.Transparent,press:this.close.bind(this)});this.setAggregation("_closeButton",t,true)}return t};L.prototype._getBusyIndicator=function(){var t=this.getAggregation("_busy");if(!t){t=new c;this.setAggregation("_busy",t,true)}return t};L.prototype._imageStateChanged=function(t){var e=t===I.Loaded||t===I.Error;if(e&&!this._isRendering){this.rerender()}};L.prototype._createPopup=function(){this._oPopup=new i(this,true,true);this._oPopup.attachOpened(this._fnPopupOpened,this);this._oPopup.attachClosed(this._fnPopupClosed,this)};L.prototype._fnPopupOpened=function(){this._onResize();d("#sap-ui-blocklayer-popup").on("click",function(){this.close()}.bind(this))};L.prototype._fnPopupClosed=function(){d("#sap-ui-blocklayer-popup").off("click")};L.prototype._createErrorControls=function(){var t,e,i,s,n;if(this.getAggregation("_verticalLayout")){return}if(this._getImageContent()._getImageState()===I.TimeOutError){t=this._oRB.getText("LIGHTBOX_IMAGE_TIMED_OUT");e=this._oRB.getText("LIGHTBOX_IMAGE_TIMED_OUT_DETAILS")}else{t=this._oRB.getText("LIGHTBOX_IMAGE_ERROR");e=this._oRB.getText("LIGHTBOX_IMAGE_ERROR_DETAILS")}i=new o({text:t,textAlign:x.Center}).addStyleClass("sapMLightBoxErrorTitle");s=new o({text:e,textAlign:x.Center}).addStyleClass("sapMLightBoxErrorSubtitle");n=new h({src:"sap-icon://picture"}).addStyleClass("sapMLightBoxErrorIcon");this.setAggregation("_verticalLayout",new p({content:[n,i,s]}).addStyleClass("sapMLightBoxVerticalLayout"))};L.prototype._onResize=function(){var t=this._calculateOffset()/2+"px",e=t,i=t,s="",o="",n=this._getImageContent(),r=this.getDomRef(),a,h,p=this._calculateOffset();if(n._getImageState()===I.Loaded){this._calculateSizes(n._getNativeImage());a=this._iWidth;h=this._iHeight;this._$lightBox.width(a);this._$lightBox.height(h)}else{a=r.clientWidth;h=r.clientHeight}if(window.innerWidth>a+p){i="50%";o=Math.round(-a/2)}if(window.innerHeight>h+p){e="50%";s=Math.round(-h/2)}this._$lightBox.css({top:e,"margin-top":s,left:i,"margin-left":o})};L.prototype._calculateSizes=function(t){var e=this._calculateFooterHeightInPx(),i=288-e,s=this._getImageContent().getAggregation("_image"),o;this._setImageSize(s,t.naturalWidth,t.naturalHeight);this._calculateAndSetLightBoxSize(s);o=this._pxToNumber(s.getHeight());this.toggleStyleClass("sapMLightBoxMinSize",o<i);this._isBusy=false};L.prototype._calculateFooterHeightInPx=function(){var t=this.$().parents().hasClass("sapUiSizeCompact"),e=this._getImageContent().getSubtitle(),i=3;if(t&&!e){i-=.5}if(e){i+=.5}return f.toPx(i)};L.prototype._calculateAndSetLightBoxSize=function(t){var e,i,s=20*16,o=18*16,n=this._calculateFooterHeightInPx();e=this._pxToNumber(t.getHeight());i=this._pxToNumber(t.getWidth());this._iWidth=Math.max(s,i);this._iHeight=Math.max(o,e+n);this._bIsLightBoxBiggerThanMinDimensions=i>=s&&e>=o-n};L.prototype._setImageSize=function(t,e,i){var s=this._calculateFooterHeightInPx(),o=this._getDimensions(e,i,s);t.setWidth(o.width+"px");t.setHeight(o.height+"px")};L.prototype._getDimensions=function(t,e,i){var s=20*16,o=18*16,n=d(window),r=n.height(),a=n.width(),h=this._calculateOffset(),p=Math.max(a-h,s),u=Math.max(r-h,o),g;u-=i;if(e<=u){if(t<=p){}else{e*=p/t;t=p}}else if(t<=p){t*=u/e;e=u}else{g=Math.max(t/p,e/u);t/=g;e/=g}return{width:Math.round(t),height:Math.round(e)}};L.prototype._pxToNumber=function(t){return t.substring(0,t.length-2)*1};L.prototype._getImageContent=function(){var t=this.getAggregation("imageContent");return t&&t[0]};L.prototype._calculateOffset=function(){if(a.system.desktop){return 4*16}if(a.system.tablet){return 2*16}if(a.system.phone&&a.resize.width>320){return 1*16}return 0};L.prototype.onsapescape=function(t){var e=this._oPopup.getOpenState();if(e!==y.CLOSED||e!==y.CLOSING){this.close();t.stopPropagation()}};return L});