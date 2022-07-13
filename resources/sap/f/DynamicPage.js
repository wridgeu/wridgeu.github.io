/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Core","sap/m/library","sap/ui/base/ManagedObjectObserver","sap/ui/core/ResizeHandler","sap/ui/core/Configuration","sap/ui/core/delegate/ScrollEnablement","sap/ui/Device","sap/ui/base/ManagedObject","sap/f/DynamicPageTitle","sap/f/DynamicPageHeader","./DynamicPageRenderer","sap/base/Log","sap/ui/core/theming/Parameters","sap/ui/dom/units/Rem","sap/ui/core/library"],function(e,t,i,r,a,n,s,o,l,d,h,p,_,g,u,c,f){"use strict";var S=r.PageBackgroundDesign;var H=t.extend("sap.f.DynamicPage",{metadata:{library:"sap.f",properties:{preserveHeaderStateOnScroll:{type:"boolean",group:"Behavior",defaultValue:false},headerExpanded:{type:"boolean",group:"Behavior",defaultValue:true},headerPinned:{type:"boolean",group:"Behavior",defaultValue:false},toggleHeaderOnTitleClick:{type:"boolean",group:"Behavior",defaultValue:true},showFooter:{type:"boolean",group:"Behavior",defaultValue:false},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:S.Standard},fitContent:{type:"boolean",group:"Behavior",defaultValue:false}},associations:{stickySubheaderProvider:{type:"sap.f.IDynamicPageStickyContent",multiple:false}},aggregations:{title:{type:"sap.f.DynamicPageTitle",multiple:false},header:{type:"sap.f.DynamicPageHeader",multiple:false},content:{type:"sap.ui.core.Control",multiple:false},footer:{type:"sap.m.IBar",multiple:false},landmarkInfo:{type:"sap.f.DynamicPageAccessibleLandmarkInfo",multiple:false}},events:{pinnedStateChange:{parameters:{pinned:{type:"boolean"}}}},dnd:{draggable:false,droppable:true},designtime:"sap/f/designtime/DynamicPage.designtime"}});function y(e){if(arguments.length===1){return e&&"length"in e?e.length>0:!!e}return Array.prototype.slice.call(arguments).every(function(e){return y(e)})}function E(e){var t;if(!e){return false}t=e.getBoundingClientRect();return!!(t.width&&t.height)}var A=f.AccessibleLandmarkRole;H.HEADER_MAX_ALLOWED_PINNED_PERCENTAGE=.6;H.HEADER_MAX_ALLOWED_NON_SROLLABLE_PERCENTAGE=.6;H.HEADER_MAX_ALLOWED_NON_SROLLABLE_ON_MOBILE=.3;H.BREAK_POINTS={DESKTOP:1439,TABLET:1024,PHONE:600};H.EVENTS={TITLE_PRESS:"_titlePress",TITLE_MOUSE_OVER:"_titleMouseOver",TITLE_MOUSE_OUT:"_titleMouseOut",PIN_UNPIN_PRESS:"_pinUnpinPress",VISUAL_INDICATOR_MOUSE_OVER:"_visualIndicatorMouseOver",VISUAL_INDICATOR_MOUSE_OUT:"_visualIndicatorMouseOut",HEADER_VISUAL_INDICATOR_PRESS:"_headerVisualIndicatorPress",TITLE_VISUAL_INDICATOR_PRESS:"_titleVisualIndicatorPress"};H.MEDIA={PHONE:"sapFDynamicPage-Std-Phone",TABLET:"sapFDynamicPage-Std-Tablet",DESKTOP:"sapFDynamicPage-Std-Desktop",DESKTOP_XL:"sapFDynamicPage-Std-Desktop-XL"};H.RESIZE_HANDLER_ID={PAGE:"_sResizeHandlerId",TITLE:"_sTitleResizeHandlerId",HEADER:"_sHeaderResizeHandlerId",CONTENT:"_sContentResizeHandlerId"};H.DIV="div";H.HEADER="header";H.FOOTER="footer";H.HEADER_CONTENT_PADDING_BOTTOM=c.toPx("1rem");H.SHOW_FOOTER_CLASS_NAME="sapFDynamicPageActualFooterControlShow";H.HIDE_FOOTER_CLASS_NAME="sapFDynamicPageActualFooterControlHide";H.NAVIGATION_CLASS_NAME="sapFDynamicPageNavigation";H.ARIA_ROLE_DESCRIPTION="DYNAMIC_PAGE_ROLE_DESCRIPTION";H.prototype.init=function(){this._bPinned=false;this._bHeaderInTitleArea=false;this._bExpandingWithAClick=false;this._bSuppressToggleHeaderOnce=false;this._headerBiggerThanAllowedHeight=false;this._oStickySubheader=null;this._bStickySubheaderInTitleArea=false;this._oScrollHelper=new o(this,this.getId()+"-content",{horizontal:false,vertical:true});this._oScrollHelper.setOnAfterScrollToElement(this._onAfterScrollToElement.bind(this));this._oStickyHeaderObserver=null;this._oHeaderObserver=null;this._oSubHeaderAfterRenderingDelegate={onAfterRendering:function(){this._bStickySubheaderInTitleArea=false;this._adjustStickyContent()}};this._setAriaRoleDescription(i.getLibraryResourceBundle("sap.f").getText(H.ARIA_ROLE_DESCRIPTION))};H.prototype.onBeforeRendering=function(){if(!this._preserveHeaderStateOnScroll()){this._attachPinPressHandler()}this._attachTitlePressHandler();this._attachVisualIndicatorsPressHandlers();if(l.system.desktop){this._attachVisualIndicatorMouseOverHandlers();this._attachTitleMouseOverHandlers()}this._attachHeaderObserver();this._addStickySubheaderAfterRenderingDelegate();this._detachScrollHandler();this._detachResizeHandlers();this._toggleAdditionalNavigationClass()};H.prototype.onAfterRendering=function(){var e,t;if(this.getPreserveHeaderStateOnScroll()){setTimeout(this._overridePreserveHeaderStateOnScroll.bind(this),0)}this._cacheDomElements();this._attachResizeHandlers();this._updateMedia(this._getWidth(this));this._attachScrollHandler();this._updateTitlePositioning();this._attachPageChildrenAfterRenderingDelegates();this._updatePinButtonState();this._hidePinButtonIfNotApplicable();if(!this.getHeaderExpanded()){this._snapHeader(false);e=this.getHeader()&&!this.getPreserveHeaderStateOnScroll()&&this._canSnapHeaderOnScroll();if(e){t=this.$wrapper.scrollTop();this._setScrollPosition(t?t:this._getSnappingHeight())}else{this._toggleHeaderVisibility(false);this._moveHeaderToTitleArea()}}this._updateToggleHeaderVisualIndicators();this._updateTitleVisualState()};H.prototype.exit=function(){this._detachResizeHandlers();if(this._oScrollHelper){this._oScrollHelper.destroy()}if(this._oStickyHeaderObserver){this._oStickyHeaderObserver.disconnect()}if(this._oHeaderObserver){this._oHeaderObserver.disconnect()}if(this._oStickySubheader){this._oStickySubheader.removeEventDelegate(this._oSubHeaderAfterRenderingDelegate)}};H.prototype.setShowFooter=function(e){var t=this.setProperty("showFooter",e);this._toggleFooter(e);return t};H.prototype.setHeader=function(e){var t=this.getHeader();if(e===t){return this}this._detachHeaderEventListeners();return this.setAggregation("header",e)};H.prototype.destroyHeader=function(){this._detachHeaderEventListeners();return this.destroyAggregation("header")};H.prototype._detachHeaderEventListeners=function(){var e=this.getHeader();if(e){if(this._oStickyHeaderObserver){this._oStickyHeaderObserver.disconnect()}if(this._oHeaderObserver){this._oHeaderObserver.disconnect()}this._deRegisterResizeHandler(H.RESIZE_HANDLER_ID.HEADER);e.detachEvent(H.EVENTS.PIN_UNPIN_PRESS,this._onPinUnpinButtonPress);this._bAlreadyAttachedPinPressHandler=false;e.detachEvent(H.EVENTS.HEADER_VISUAL_INDICATOR_PRESS,this._onCollapseHeaderVisualIndicatorPress);this._bAlreadyAttachedHeaderIndicatorPressHandler=false;e.detachEvent(H.EVENTS.VISUAL_INDICATOR_MOUSE_OVER,this._onVisualIndicatorMouseOver);e.detachEvent(H.EVENTS.VISUAL_INDICATOR_MOUSE_OUT,this._onVisualIndicatorMouseOut);this._bAlreadyAttachedVisualIndicatorMouseOverOutHandler=false;this._bAlreadyAttachedStickyHeaderObserver=false;this._bAlreadyAttachedHeaderObserver=false}};H.prototype.setStickySubheaderProvider=function(e){var t,r=this.getStickySubheaderProvider();if(e===r){return this}t=i.byId(r);if(this._oStickySubheader&&t){t._returnStickyContent();t._setStickySubheaderSticked(false);this._oStickySubheader.removeEventDelegate(this._oSubHeaderAfterRenderingDelegate);this._bAlreadyAddedStickySubheaderAfterRenderingDelegate=false;this._oStickySubheader=null}this.setAssociation("stickySubheaderProvider",e);return this};H.prototype.setHeaderExpanded=function(e){e=this.validateProperty("headerExpanded",e);if(this._bPinned){return this}if(this.getHeaderExpanded()===e){return this}if(this.getDomRef()){this._titleExpandCollapseWhenAllowed()}this.setProperty("headerExpanded",e,true);this._updatePinButtonState();return this};H.prototype.setToggleHeaderOnTitleClick=function(e){var t=this.getHeaderExpanded(),i=this.setProperty("toggleHeaderOnTitleClick",e,true);e=this.getProperty("toggleHeaderOnTitleClick");this._updateTitleVisualState();this._updateToggleHeaderVisualIndicators();this._updateARIAStates(t);return i};H.prototype.setFitContent=function(e){var t=this.setProperty("fitContent",e,true);if(y(this.$())){this._updateFitContainer()}return t};H.prototype.getScrollDelegate=function(){return this._oScrollHelper};H.prototype._onAfterScrollToElement=function(){var e=this.$wrapper.scrollTop(),t=this._getTitleAreaHeight(),i=this._bStickySubheaderInTitleArea,r;this._toggleHeaderOnScroll();r=t;if(this._bStickySubheaderInTitleArea&&!i&&this.$wrapper.scrollTop()===e){r+=this._getHeight(this._oStickySubheader)}this.$wrapper.scrollTop(e-r)};H.prototype._overridePreserveHeaderStateOnScroll=function(){if(this.$().width()===0||this.$().height()===0){return}var e=this._headerBiggerThanAllowedHeight,t;this._headerBiggerThanAllowedHeight=this._headerBiggerThanAllowedToBeFixed();t=e!==this._headerBiggerThanAllowedHeight;if(!this._headerBiggerThanAllowedHeight||!t){return}if(this.getHeaderExpanded()){this._moveHeaderToContentArea()}else{this._adjustSnap()}this._updateTitlePositioning()};H.prototype._toggleFooter=function(e){var t=this.getFooter(),r,a;if(!y(this.$())||!y(t)||!y(this.$footerWrapper)){return}a=i.getConfiguration().getAnimationMode();r=a!==s.AnimationMode.none&&a!==s.AnimationMode.minimal;if(y(this.$contentFitContainer)){this.$contentFitContainer.toggleClass("sapFDynamicPageContentFitContainerFooterVisible",e)}if(r){this._toggleFooterAnimation(e,t)}else{this.$footerWrapper.toggleClass("sapUiHidden",!e)}this._updateTitlePositioning()};H.prototype._toggleFooterAnimation=function(e,t){this.$footerWrapper.on("webkitAnimationEnd animationend",this._onToggleFooterAnimationEnd.bind(this,t));if(e){this.$footerWrapper.removeClass("sapUiHidden")}t.toggleStyleClass(H.SHOW_FOOTER_CLASS_NAME,e);t.toggleStyleClass(H.HIDE_FOOTER_CLASS_NAME,!e)};H.prototype._onToggleFooterAnimationEnd=function(e){this.$footerWrapper.off("webkitAnimationEnd animationend");if(e.hasStyleClass(H.HIDE_FOOTER_CLASS_NAME)){this.$footerWrapper.addClass("sapUiHidden");e.removeStyleClass(H.HIDE_FOOTER_CLASS_NAME)}else{e.removeStyleClass(H.SHOW_FOOTER_CLASS_NAME)}};H.prototype._toggleHeaderInTabChain=function(e){var t=this.getTitle(),i=this.getHeader();if(!y(t)||!y(i)){return}i.$().css("visibility",e?"visible":"hidden")};H.prototype._snapHeader=function(e,t){var i=this.getTitle();if(this._bPinned&&!t){g.debug("DynamicPage :: aborted snapping, header is pinned",this);return}g.debug("DynamicPage :: snapped header",this);if(this._bPinned&&t){this._unPin(t);this._togglePinButtonPressedState(false)}if(y(i)){i._toggleState(false,t);if(e&&this._bHeaderInTitleArea){this._moveHeaderToContentArea(true)}}if(!y(this.$titleArea)){g.warning("DynamicPage :: couldn't snap header. There's no title.",this);return}this.setProperty("headerExpanded",false,true);if(this._hasVisibleTitleAndHeader()){this.$titleArea.addClass(l.system.phone&&i.getSnappedTitleOnMobile()?"sapFDynamicPageTitleSnappedTitleOnMobile":"sapFDynamicPageTitleSnapped");this._updateToggleHeaderVisualIndicators();this._togglePinButtonVisibility(false);this._updateTitlePositioning()}this._toggleHeaderInTabChain(false);this._updateARIAStates(false);this._toggleHeaderBackground(true)};H.prototype._expandHeader=function(e,t){var i=this.getTitle();g.debug("DynamicPage :: expand header",this);if(y(i)){i._toggleState(true,t);if(e){this._moveHeaderToTitleArea(true)}}if(!y(this.$titleArea)){g.warning("DynamicPage :: couldn't expand header. There's no title.",this);return}this.setProperty("headerExpanded",true,true);if(this._hasVisibleTitleAndHeader()){this.$titleArea.removeClass(l.system.phone&&i.getSnappedTitleOnMobile()?"sapFDynamicPageTitleSnappedTitleOnMobile":"sapFDynamicPageTitleSnapped");this._updateToggleHeaderVisualIndicators();if(!this.getPreserveHeaderStateOnScroll()&&!this._headerBiggerThanAllowedToPin()){this._togglePinButtonVisibility(true)}this._updateTitlePositioning()}this._toggleHeaderInTabChain(true);this._updateARIAStates(true);this._toggleHeaderBackground(false)};H.prototype._toggleHeaderVisibility=function(e,t){var i=this.getHeaderExpanded(),r=this.getTitle(),a=this.getHeader();if(this._bPinned&&!t){g.debug("DynamicPage :: header toggle aborted, header is pinned",this);return}if(y(r)){r._toggleState(i)}if(y(a)){a.$().toggleClass("sapFDynamicPageHeaderHidden",!e);this._updateTitlePositioning()}};H.prototype._toggleHeaderBackground=function(e){this.$headerInContentWrapper.toggleClass("sapFDynamicPageHeaderSolid",e)};H.prototype._moveHeaderToContentArea=function(e){var t=this.getHeader();if(y(t)){t.$().prependTo(this.$headerInContentWrapper);this._bHeaderInTitleArea=false;if(e){this._offsetContentOnMoveHeader()}this.fireEvent("_moveHeader")}};H.prototype._moveHeaderToTitleArea=function(e){var t=this.getHeader();if(y(t)){t.$().prependTo(this.$stickyPlaceholder);this._bHeaderInTitleArea=true;if(e){this._offsetContentOnMoveHeader()}this.fireEvent("_moveHeader")}};H.prototype._offsetContentOnMoveHeader=function(){var e=Math.ceil(this._getHeaderHeight()),t=this.$wrapper.scrollTop(),i;if(!e){return}i=this._bHeaderInTitleArea?t-e:t+e;i=Math.max(i,0);this._setScrollPosition(i,true)};H.prototype._isHeaderPinnable=function(){var e=this.getHeader();return e&&e.getPinnable()&&this.getHeaderExpanded()&&!this.getPreserveHeaderStateOnScroll()};H.prototype._updatePinButtonState=function(){var e=this.getHeaderPinned()&&this._isHeaderPinnable();this._togglePinButtonPressedState(e);if(e){this._pin()}else{this._unPin()}};H.prototype._pin=function(e){if(this._bPinned){return}this._bPinned=true;if(e){this.setProperty("headerPinned",true,true);this.fireEvent("pinnedStateChange",{pinned:true})}if(!this._bHeaderInTitleArea){this._moveHeaderToTitleArea(true);this._updateTitlePositioning()}this._updateToggleHeaderVisualIndicators();this.addStyleClass("sapFDynamicPageHeaderPinned")};H.prototype._unPin=function(e){if(!this._bPinned){return}this._bPinned=false;if(e){this.setProperty("headerPinned",false,true);this.fireEvent("pinnedStateChange",{pinned:false})}this._updateToggleHeaderVisualIndicators();this.removeStyleClass("sapFDynamicPageHeaderPinned")};H.prototype._togglePinButtonVisibility=function(e){var t=this.getHeader();if(y(t)){t._setShowPinBtn(e)}};H.prototype._togglePinButtonPressedState=function(e){var t=this.getHeader();if(y(t)){t._togglePinButton(e)}};H.prototype._hidePinButtonIfNotApplicable=function(){if(this._preserveHeaderStateOnScroll()){this._togglePinButtonVisibility(false)}};H.prototype._isHeaderPinnable=function(){var e=this.getHeader();return e&&e.getPinnable()&&this.getHeaderExpanded()&&!this.getPreserveHeaderStateOnScroll()};H.prototype._restorePinButtonFocus=function(){this.getHeader()._focusPinButton()};H.prototype._getScrollPosition=function(){return y(this.$wrapper)?Math.ceil(this.$wrapper.scrollTop()):0};H.prototype._setAriaRoleDescription=function(e){this._sAriaRoleDescription=e;return this};H.prototype._getAriaRoleDescription=function(){return this._sAriaRoleDescription};H.prototype._setScrollPosition=function(e,t){if(!y(this.$wrapper)){return}if(this._getScrollPosition()===e){return}if(t){this._bSuppressToggleHeaderOnce=true}if(!this.getScrollDelegate()._$Container){this.getScrollDelegate()._$Container=this.$wrapper}this.getScrollDelegate().scrollTo(0,e)};H.prototype._shouldSnapOnScroll=function(){return!this._preserveHeaderStateOnScroll()&&this._getScrollPosition()>=this._getSnappingHeight()&&this.getHeaderExpanded()&&!this._bPinned};H.prototype._shouldExpandOnScroll=function(){var e=this._needsVerticalScrollBar();return!this._preserveHeaderStateOnScroll()&&this._getScrollPosition()<this._getSnappingHeight()&&!this.getHeaderExpanded()&&!this._bPinned&&e};H.prototype._shouldStickStickyContent=function(){var e,t,i;i=this._getScrollPosition();e=i<this._getSnappingHeight()&&!this._bPinned&&!this.getPreserveHeaderStateOnScroll();t=i===0||e&&this._hasVisibleHeader();return!t};H.prototype._headerScrolledOut=function(){return this._getScrollPosition()>=this._getSnappingHeight()};H.prototype._headerSnapAllowed=function(){return!this._preserveHeaderStateOnScroll()&&this.getHeaderExpanded()&&!this._bPinned};H.prototype._canSnapHeaderOnScroll=function(){return this._getMaxScrollPosition()>this._getSnappingHeight()};H.prototype._getSnappingHeight=function(){var e=this.getTitle(),t=e&&e.$expandWrapper,i=e&&e.$snappedWrapper,r=e&&e.$expandHeadingWrapper,a=e&&e.$snappedHeadingWrapper,n=t&&t.length?t.height():0,s=a&&a.length?a.height():0,o=r&&r.length?r.height():0,l=i&&i.length?i.height():0,d=Math.ceil(this._getHeaderHeight()||n+l+s+o)-H.HEADER_CONTENT_PADDING_BOTTOM;return d>0?d:0};H.prototype._getMaxScrollPosition=function(){var e,t;if(y(this.$wrapper)){e=this.$wrapper[0];t=Math.max(e.clientHeight,Math.ceil(e.getBoundingClientRect().height));return e.scrollHeight-t}return 0};H.prototype._needsVerticalScrollBar=function(){return Math.floor(this._getMaxScrollPosition())>0};H.prototype._getOwnHeight=function(){return this._getHeight(this)};H.prototype._getEntireHeaderHeight=function(){var e=0,t=0,i=this.getTitle(),r=this.getHeader();if(y(i)){e=i.$().outerHeight()}if(y(r)){t=r.$().outerHeight()}return e+t};H.prototype._headerBiggerThanAllowedToPin=function(e){if(!(typeof e==="number"&&!isNaN(parseInt(e)))){e=this._getOwnHeight()}return this._getEntireHeaderHeight()>H.HEADER_MAX_ALLOWED_PINNED_PERCENTAGE*e};H.prototype._headerBiggerThanAllowedToBeFixed=function(){var e=this._getOwnHeight();return this._getEntireHeaderHeight()>H.HEADER_MAX_ALLOWED_NON_SROLLABLE_PERCENTAGE*e};H.prototype._headerBiggerThanAllowedToBeExpandedInTitleArea=function(){var e=this._getEntireHeaderHeight(),t=this._getOwnHeight();if(t===0){return false}return l.system.phone?e>=H.HEADER_MAX_ALLOWED_NON_SROLLABLE_ON_MOBILE*t:e>=t};H.prototype._updateTitlePositioning=function(){if(!y(this.$wrapper)||!y(this.$titleArea)||this._getHeight(this)===0){return}var e=this._needsVerticalScrollBar(),t=this.$wrapper.get(0),i=this.$titleArea.get(0).getBoundingClientRect().height,r=this._getTitleAreaWidth();t.style.paddingTop=i+"px";t.style.clipPath="polygon(0px "+Math.floor(i)+"px, "+r+"px "+Math.floor(i)+"px, "+r+"px 0, 100% 0, 100% 100%, 0 100%)";this.toggleStyleClass("sapFDynamicPageWithScroll",e);setTimeout(this._updateFitContainer.bind(this),0)};H.prototype._updateFitContainer=function(e){var t=typeof e!=="undefined"?!e:!this._needsVerticalScrollBar(),i=this.getFitContent(),r=i||t;this.$contentFitContainer.toggleClass("sapFDynamicPageContentFitContainer",r)};H.prototype._updateHeaderARIAState=function(e){var t=this.getHeader();if(y(t)){t._updateARIAState(e)}};H.prototype._updateTitleARIAState=function(e){var t=this.getTitle();if(y(t)){t._updateARIAState(e)}};H.prototype._updateARIAStates=function(e){this._updateHeaderARIAState(e);this._updateTitleARIAState(e)};H.prototype._applyContextualSettings=function(e){var t=e.contextualWidth;this._updateMedia(t);return d.prototype._applyContextualSettings.call(this,e)};H.prototype._updateMedia=function(e){if(!e){return}if(e<=H.BREAK_POINTS.PHONE){this._updateMediaStyle(H.MEDIA.PHONE)}else if(e<=H.BREAK_POINTS.TABLET){this._updateMediaStyle(H.MEDIA.TABLET)}else if(e<=H.BREAK_POINTS.DESKTOP){this._updateMediaStyle(H.MEDIA.DESKTOP)}else{this._updateMediaStyle(H.MEDIA.DESKTOP_XL)}};H.prototype._updateMediaStyle=function(e){Object.keys(H.MEDIA).forEach(function(t){var i=e===H.MEDIA[t];this.toggleStyleClass(H.MEDIA[t],i)},this)};H.prototype._toggleExpandVisualIndicator=function(e){var t=this.getTitle();if(y(t)){t._toggleExpandButton(e)}};H.prototype._focusExpandVisualIndicator=function(){var e=this.getTitle();if(y(e)){e._focusExpandButton()}};H.prototype._toggleCollapseVisualIndicator=function(e){var t=this.getHeader();if(y(t)){t._toggleCollapseButton(e)}};H.prototype._focusCollapseVisualIndicator=function(){var e=this.getHeader();if(y(e)){e._focusCollapseButton()}};H.prototype._updateToggleHeaderVisualIndicators=function(){var e,t,i,r=this._hasVisibleTitleAndHeader(),a=this.getHeader(),n=false;if(y(a)){n=!!a.getContent().length}if(!this.getToggleHeaderOnTitleClick()||!r){t=false;i=false}else{e=this.getHeaderExpanded();t=e;i=l.system.phone&&this.getTitle().getAggregation("snappedTitleOnMobile")?false:!e}i=i&&n;t=t&&n;this._toggleCollapseVisualIndicator(t);this._toggleExpandVisualIndicator(i);this._updateTitleVisualState()};H.prototype._updateHeaderVisualState=function(e,t){var i=this.getHeader();if(e&&this.getPreserveHeaderStateOnScroll()){this._overridePreserveHeaderStateOnScroll()}if(!this._preserveHeaderStateOnScroll()&&i){if(this._headerBiggerThanAllowedToPin(t)||l.system.phone){this._unPin();this._togglePinButtonVisibility(false);this._togglePinButtonPressedState(false)}else{this._togglePinButtonVisibility(true);this._updatePinButtonState()}if(this.getHeaderExpanded()&&this._bHeaderInTitleArea&&this._headerBiggerThanAllowedToBeExpandedInTitleArea()){this._expandHeader(false);this._setScrollPosition(0)}}else if(this._preserveHeaderStateOnScroll()&&i){this._togglePinButtonVisibility(false)}};H.prototype._updateTitleVisualState=function(){var e=this.getTitle(),t=this._hasVisibleTitleAndHeader()&&this.getToggleHeaderOnTitleClick();this.$().toggleClass("sapFDynamicPageTitleClickEnabled",t&&!l.system.phone);if(y(e)){e._toggleFocusableState(t)}};H.prototype._scrollBellowCollapseVisualIndicator=function(){var e=this.getHeader(),t,i,r,a;if(y(e)){t=this.getHeader()._getCollapseButton().getDomRef();i=t.getBoundingClientRect().height;r=this.$wrapper[0].getBoundingClientRect().height;a=t.offsetTop+i-r+this._getTitleHeight();this._setScrollPosition(a)}};H.prototype._hasVisibleTitleAndHeader=function(){var e=this.getTitle();return y(e)&&e.getVisible()&&this._hasVisibleHeader()};H.prototype._hasVisibleHeader=function(){var e=this.getHeader();return y(e)&&e.getVisible()&&y(e.getContent())};H.prototype._getHeight=function(e){var i;if(!(e instanceof t)){return 0}i=e.getDomRef();return i?i.getBoundingClientRect().height:0};H.prototype._getWidth=function(e){return!(e instanceof t)?0:e.$().outerWidth()||0};H.prototype._getTitleAreaHeight=function(){return y(this.$titleArea)?this.$titleArea.outerHeight()||0:0};H.prototype._getTitleAreaWidth=function(){return y(this.$titleArea)?this.$titleArea.width()||0:0};H.prototype._getTitleHeight=function(){return this._getHeight(this.getTitle())};H.prototype._getHeaderHeight=function(){return this._getHeight(this.getHeader())};H.prototype._preserveHeaderStateOnScroll=function(){return this.getPreserveHeaderStateOnScroll()&&!this._headerBiggerThanAllowedHeight};H.prototype._cacheDomElements=function(){var e=this.getFooter();if(y(e)){this.$footer=e.$();this.$footerWrapper=this.$("footerWrapper")}this.$wrapper=this.$("contentWrapper");this.$headerInContentWrapper=this.$("headerWrapper");this.$contentFitContainer=this.$("contentFitContainer");this.$titleArea=this.$("header");this.$stickyPlaceholder=this.$("stickyPlaceholder");this._cacheTitleDom();this._cacheHeaderDom()};H.prototype._cacheTitleDom=function(){var e=this.getTitle();if(y(e)){this.$title=e.$()}};H.prototype._cacheHeaderDom=function(){var e=this.getHeader();if(y(e)){this.$header=e.$()}};H.prototype._adjustSnap=function(){var e,t,i,r,a,n,s=this.$();if(!y(s)){return}if(!E(s[0])){return}e=this.getHeader();t=!this.getHeaderExpanded();if(!e||!t){return}i=!this._preserveHeaderStateOnScroll()&&this._canSnapHeaderOnScroll();r=t&&e.$().hasClass("sapFDynamicPageHeaderHidden");if(i&&r){this._toggleHeaderVisibility(true);this._moveHeaderToContentArea(true);return}if(!i&&!r){this._moveHeaderToTitleArea(true);this._toggleHeaderVisibility(false);return}if(i){a=this._getScrollPosition();n=this._getSnappingHeight();if(a<n){this._setScrollPosition(n)}}};H.prototype.ontouchmove=function(e){e.setMarked()};H.prototype._onChildControlAfterRendering=function(e){var t=e.srcControl;if(t instanceof h){this._cacheTitleDom();this._deRegisterResizeHandler(H.RESIZE_HANDLER_ID.TITLE);this._registerResizeHandler(H.RESIZE_HANDLER_ID.TITLE,this.$title[0],this._onChildControlsHeightChange.bind(this))}else if(t instanceof p&&t.getDomRef()!==this.$header.get(0)){this._cacheHeaderDom();this._deRegisterResizeHandler(H.RESIZE_HANDLER_ID.HEADER);this._registerResizeHandler(H.RESIZE_HANDLER_ID.HEADER,this.$header[0],this._onChildControlsHeightChange.bind(this))}setTimeout(this._updateTitlePositioning.bind(this),0)};H.prototype._onChildControlsHeightChange=function(e){var t=this._needsVerticalScrollBar(),i=this.getHeader(),r,a;if(t){this._updateFitContainer(t)}this._adjustSnap();if(!this._bExpandingWithAClick){this._updateTitlePositioning()}this._bExpandingWithAClick=false;if(i&&e.target.id===i.getId()){r=e.size.height;a=e.oldSize.height;this._updateHeaderVisualState(r!==a);this._adaptScrollPositionOnHeaderChange(r,a)}};H.prototype._onResize=function(e){var t=this.getTitle(),i=e.size.width,r=e.size.height,a=r!==e.oldSize.height;this._updateHeaderVisualState(a,r);if(y(t)){t._onResize(i)}this._adjustSnap();this._updateTitlePositioning();this._updateMedia(i)};H.prototype._toggleHeaderOnScroll=function(){this._adjustStickyContent();if(this._bSuppressToggleHeaderOnce){this._bSuppressToggleHeaderOnce=false;return}if(l.system.desktop&&this._bExpandingWithAClick){return}if(this._preserveHeaderStateOnScroll()){return}if(this._shouldSnapOnScroll()){this._snapHeader(true,true)}else if(this._shouldExpandOnScroll()){this._expandHeader(false,true);this._toggleHeaderVisibility(true)}else if(!this._bPinned&&this._bHeaderInTitleArea){var e=this._getScrollPosition()>=this._getSnappingHeight();this._moveHeaderToContentArea(e);this._updateTitlePositioning()}};H.prototype._adjustStickyContent=function(){if(!this._oStickySubheader){return}var e,t=this._shouldStickStickyContent(),r,a=this.getStickySubheaderProvider();if(t===this._bStickySubheaderInTitleArea){return}r=i.byId(a);if(!y(r)){return}e=document.activeElement;r._setStickySubheaderSticked(t);if(t){this._oStickySubheader.$().appendTo(this.$stickyPlaceholder)}else{r._returnStickyContent()}e.focus();this._bStickySubheaderInTitleArea=t};H.prototype._adaptScrollPositionOnHeaderChange=function(e,t){var i=e-t,r=this.getHeader();if(i&&(!this.getHeaderExpanded()&&r.$().css("visibility")!=="hidden")&&!this._bHeaderInTitleArea&&this._needsVerticalScrollBar()){this._setScrollPosition(this._getScrollPosition()+i)}};H.prototype._onTitlePress=function(){if(this.getToggleHeaderOnTitleClick()&&this._hasVisibleTitleAndHeader()){this._titleExpandCollapseWhenAllowed(true);this.getTitle()._focus()}};H.prototype._onExpandHeaderVisualIndicatorPress=function(){this._onTitlePress();if(this._headerBiggerThanAllowedToBeExpandedInTitleArea()){this._scrollBellowCollapseVisualIndicator()}this._focusCollapseVisualIndicator()};H.prototype._onCollapseHeaderVisualIndicatorPress=function(){this._onTitlePress();this._focusExpandVisualIndicator()};H.prototype._onVisualIndicatorMouseOver=function(){var e=this.$();if(y(e)){e.addClass("sapFDynamicPageTitleForceHovered")}};H.prototype._onVisualIndicatorMouseOut=function(){var e=this.$();if(y(e)){e.removeClass("sapFDynamicPageTitleForceHovered")}};H.prototype._onTitleMouseOver=H.prototype._onVisualIndicatorMouseOver;H.prototype._onTitleMouseOut=H.prototype._onVisualIndicatorMouseOut;H.prototype._titleExpandCollapseWhenAllowed=function(e){var t,i;if(this._bPinned&&!e){return this}if(this._preserveHeaderStateOnScroll()||!this._canSnapHeaderOnScroll()||!this.getHeader()){if(!this.getHeaderExpanded()){this._expandHeader(false,e);this._toggleHeaderVisibility(true,e)}else{this._snapHeader(false,e);this._toggleHeaderVisibility(false,e)}}else if(!this.getHeaderExpanded()){t=!this._headerBiggerThanAllowedToBeExpandedInTitleArea();this._bExpandingWithAClick=true;this._expandHeader(t,e);this.getHeader().$().removeClass("sapFDynamicPageHeaderHidden");if(!t){this._setScrollPosition(0)}this._bExpandingWithAClick=false}else{var r=this._bHeaderInTitleArea;this._snapHeader(r,e);if(!r){i=this._getSnappingHeight();this._setScrollPosition(i?i+H.HEADER_CONTENT_PADDING_BOTTOM:0)}}};H.prototype._onPinUnpinButtonPress=function(){if(this._bPinned){this._unPin(true)}else{this._pin(true);this._restorePinButtonFocus()}};H.prototype._attachResizeHandlers=function(){var e=this._onChildControlsHeightChange.bind(this);this._registerResizeHandler(H.RESIZE_HANDLER_ID.PAGE,this,this._onResize.bind(this));if(y(this.$title)){this._registerResizeHandler(H.RESIZE_HANDLER_ID.TITLE,this.$title[0],e)}if(y(this.$header)){this._registerResizeHandler(H.RESIZE_HANDLER_ID.HEADER,this.$header[0],e)}if(y(this.$contentFitContainer)){this._registerResizeHandler(H.RESIZE_HANDLER_ID.CONTENT,this.$contentFitContainer[0],e)}};H.prototype._registerResizeHandler=function(e,t,i){if(!this[e]){this[e]=n.register(t,i)}};H.prototype._detachResizeHandlers=function(){this._deRegisterResizeHandler(H.RESIZE_HANDLER_ID.PAGE);this._deRegisterResizeHandler(H.RESIZE_HANDLER_ID.TITLE);this._deRegisterResizeHandler(H.RESIZE_HANDLER_ID.HEADER);this._deRegisterResizeHandler(H.RESIZE_HANDLER_ID.CONTENT)};H.prototype._deRegisterResizeHandler=function(e){if(this[e]){n.deregister(this[e]);this[e]=null}};H.prototype._attachPageChildrenAfterRenderingDelegates=function(){var e=this.getTitle(),t=this.getHeader(),i=this.getContent(),r={onAfterRendering:this._onChildControlAfterRendering.bind(this)};if(y(e)){e.addEventDelegate(r)}if(y(i)){i.addEventDelegate(r)}if(y(t)){t.addEventDelegate(r)}};H.prototype._attachTitlePressHandler=function(){var e=this.getTitle();if(y(e)&&!this._bAlreadyAttachedTitlePressHandler){e.attachEvent(H.EVENTS.TITLE_PRESS,this._onTitlePress,this);this._bAlreadyAttachedTitlePressHandler=true}};H.prototype._attachPinPressHandler=function(){var e=this.getHeader();if(y(e)&&!this._bAlreadyAttachedPinPressHandler){e.attachEvent(H.EVENTS.PIN_UNPIN_PRESS,this._onPinUnpinButtonPress,this);this._bAlreadyAttachedPinPressHandler=true}};H.prototype._attachStickyHeaderObserver=function(){var e=this.getHeader();if(y(e)&&!this._bAlreadyAttachedStickyHeaderObserver){if(!this._oStickyHeaderObserver){this._oStickyHeaderObserver=new a(this._adjustStickyContent.bind(this))}this._oStickyHeaderObserver.observe(e,{properties:["visible"]});this._bAlreadyAttachedStickyHeaderObserver=true}};H.prototype._attachHeaderObserver=function(){var e=this.getHeader();if(y(e)&&!this._bAlreadyAttachedHeaderObserver){if(!this._oHeaderObserver){this._oHeaderObserver=new a(this._onHeaderFieldChange.bind(this))}this._oHeaderObserver.observe(e,{aggregations:["content"],properties:["visible","pinnable"]});this._bAlreadyAttachedHeaderObserver=true}};H.prototype._onHeaderFieldChange=function(e){if(e.type==="property"&&e.name==="pinnable"){this._updatePinButtonState();return}this._updateToggleHeaderVisualIndicators()};H.prototype._attachVisualIndicatorsPressHandlers=function(){var e=this.getTitle(),t=this.getHeader();if(y(e)&&!this._bAlreadyAttachedTitleIndicatorPressHandler){e.attachEvent(H.EVENTS.TITLE_VISUAL_INDICATOR_PRESS,this._onExpandHeaderVisualIndicatorPress,this);this._bAlreadyAttachedTitleIndicatorPressHandler=true}if(y(t)&&!this._bAlreadyAttachedHeaderIndicatorPressHandler){t.attachEvent(H.EVENTS.HEADER_VISUAL_INDICATOR_PRESS,this._onCollapseHeaderVisualIndicatorPress,this);this._bAlreadyAttachedHeaderIndicatorPressHandler=true}};H.prototype._addStickySubheaderAfterRenderingDelegate=function(){var e,t=this.getStickySubheaderProvider(),r;e=i.byId(t);if(y(e)&&!this._bAlreadyAddedStickySubheaderAfterRenderingDelegate){r=e.getMetadata().getInterfaces().indexOf("sap.f.IDynamicPageStickyContent")!==-1;if(r){this._oStickySubheader=e._getStickyContent();this._oStickySubheader.addEventDelegate(this._oSubHeaderAfterRenderingDelegate,this);this._bAlreadyAddedStickySubheaderAfterRenderingDelegate=true;this._attachStickyHeaderObserver()}}};H.prototype._attachVisualIndicatorMouseOverHandlers=function(){var e=this.getHeader();if(y(e)&&!this._bAlreadyAttachedVisualIndicatorMouseOverOutHandler){e.attachEvent(H.EVENTS.VISUAL_INDICATOR_MOUSE_OVER,this._onVisualIndicatorMouseOver,this);e.attachEvent(H.EVENTS.VISUAL_INDICATOR_MOUSE_OUT,this._onVisualIndicatorMouseOut,this);this._bAlreadyAttachedVisualIndicatorMouseOverOutHandler=true}};H.prototype._attachTitleMouseOverHandlers=function(){var e=this.getTitle();if(y(e)&&!this._bAlreadyAttachedTitleMouseOverOutHandler){e.attachEvent(H.EVENTS.TITLE_MOUSE_OVER,this._onTitleMouseOver,this);e.attachEvent(H.EVENTS.TITLE_MOUSE_OUT,this._onTitleMouseOut,this);this._bAlreadyAttachedTitleMouseOverOutHandler=true}};H.prototype._attachScrollHandler=function(){this._toggleHeaderOnScrollReference=this._toggleHeaderOnScroll.bind(this);this.$wrapper.on("scroll",this._toggleHeaderOnScrollReference)};H.prototype._toggleAdditionalNavigationClass=function(){var e=this._bStickySubheaderProviderExists();this.toggleStyleClass(H.NAVIGATION_CLASS_NAME,e)};H.prototype._bStickySubheaderProviderExists=function(){var e=i.byId(this.getStickySubheaderProvider());return!!e&&e.isA("sap.f.IDynamicPageStickyContent")};H.prototype._detachScrollHandler=function(){if(this.$wrapper){this.$wrapper.off("scroll",this._toggleHeaderOnScrollReference)}};H.prototype._formatLandmarkInfo=function(e,t){if(e){var i=e["get"+t+"Role"]()||"",r=e["get"+t+"Label"]()||"";if(i===A.None){i=""}return{role:i.toLowerCase(),label:r}}return{}};H.prototype._getHeaderTag=function(e){if(e&&e.getHeaderRole()!==A.None){return H.DIV}return H.HEADER};H.prototype._getFooterTag=function(e){if(e&&e.getFooterRole()!==A.None){return H.DIV}return H.FOOTER};return H});