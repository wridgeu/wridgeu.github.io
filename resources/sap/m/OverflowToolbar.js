/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/m/ToggleButton","sap/ui/core/InvisibleText","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/OverflowToolbarLayoutData","sap/m/OverflowToolbarAssociativePopover","sap/m/OverflowToolbarAssociativePopoverControls","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","sap/ui/core/theming/Parameters","sap/ui/dom/units/Rem","sap/ui/Device","./OverflowToolbarRenderer","sap/base/Log","sap/ui/dom/jquery/Focusable"],function(t,e,o,i,n,r,s,l,a,h,f,u,p,d,_,v){"use strict";var C=t.PlacementType;var c=t.ButtonType;var g=t.OverflowToolbarPriority;var y=n.extend("sap.m.OverflowToolbar",{metadata:{properties:{asyncMode:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{_overflowButton:{type:"sap.m.ToggleButton",multiple:false,visibility:"hidden"},_popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},designtime:"sap/m/designtime/OverflowToolbar.designtime"}});y.ARIA_ROLE_DESCRIPTION="OVERFLOW_TOOLBAR_ROLE_DESCRIPTION";y.prototype._callToolbarMethod=function(t,e){return n.prototype[t].apply(this,e)};y.prototype.init=function(){this._callToolbarMethod("init",arguments);this._iPreviousToolbarWidth=null;this._bOverflowButtonNeeded=false;this._bNestedInAPopover=null;this._bListenForControlPropertyChanges=false;this._bListenForInvalidationEvents=false;this._bControlsInfoCached=false;this._bSkipOptimization=false;this._aControlSizes={};this._iFrameRequest=null;this._iOverflowToolbarButtonSize=0;this._oOverflowToolbarButtonClone=null;this._aMovableControls=[];this._aToolbarOnlyControls=[];this._aPopoverOnlyControls=[];this._aAllCollections=[this._aMovableControls,this._aToolbarOnlyControls,this._aPopoverOnlyControls];this.addStyleClass("sapMOTB");this._sAriaRoleDescription=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText(y.ARIA_ROLE_DESCRIPTION)};y.prototype.exit=function(){var t=this.getAggregation("_popover");if(t){t.destroy()}if(this._oOverflowToolbarButtonClone){this._oOverflowToolbarButtonClone.destroy()}if(this._iFrameRequest){window.cancelAnimationFrame(this._iFrameRequest);this._iFrameRequest=null}};y.prototype.setAsyncMode=function(t){return this.setProperty("asyncMode",t,true)};y.prototype.onAfterRendering=function(){this._bInvalidatedAndNotRendered=false;this._getOverflowButton().$().attr("aria-haspopup","menu");if(this._bContentVisibilityChanged){this._bControlsInfoCached=false;this._bContentVisibilityChanged=false}if(this.getAsyncMode()){this._doLayoutAsync().then(this._applyFocus.bind(this))}else{this._doLayout();this._applyFocus()}};y.prototype.onsapfocusleave=function(){this._resetChildControlFocusInfo()};y.prototype.setWidth=function(t){this.setProperty("width",t);this._bResized=true;return this};y.prototype._doLayout=function(){var t=sap.ui.getCore(),e;if(!t.isThemeApplied()){v.debug("OverflowToolbar: theme not applied yet, skipping calculations",this);return}this._recalculateOverflowButtonSize();e=this.$().is(":visible")?this.$().width():0;this._bListenForControlPropertyChanges=false;this._bListenForInvalidationEvents=false;this._deregisterToolbarResize();if(e>0){if(!this._isControlsInfoCached()||this._bNeedUpdateOnControlsCachedSizes&&this._bResized){this._cacheControlsInfo()}if(this._iPreviousToolbarWidth!==e){this._iPreviousToolbarWidth=e;this._setControlsOverflowAndShrinking(e);this.fireEvent("_controlWidthChanged")}}this._registerToolbarResize();this._bListenForControlPropertyChanges=true;this._bListenForInvalidationEvents=true;this._bResized=false};y.prototype._doLayoutAsync=function(){return new Promise(function(t,e){this._iFrameRequest=window.requestAnimationFrame(function(){this._doLayout();t()}.bind(this))}.bind(this))};y.prototype._applyFocus=function(){var t,e,o=this.$().lastFocusableDomRef();if(this.sFocusedChildControlId){t=sap.ui.getCore().byId(this.sFocusedChildControlId);e=t&&t.$()}if(e&&e.length){e.trigger("focus")}else if(this._bControlWasFocused){this._getOverflowButton().focus();this._bControlWasFocused=false;this._bOverflowButtonWasFocused=true}else if(this._bOverflowButtonWasFocused&&!this._getOverflowButtonNeeded()){o&&o.focus();this._bOverflowButtonWasFocused=false}};y.prototype._preserveChildControlFocusInfo=function(){var t=sap.ui.getCore().getCurrentFocusedControlId();if(this._getControlsIds().indexOf(t)!==-1){this._bControlWasFocused=true;this.sFocusedChildControlId=t}else if(t===this._getOverflowButton().getId()){this._bOverflowButtonWasFocused=true;this.sFocusedChildControlId=""}};y.prototype._resetChildControlFocusInfo=function(){this._bControlWasFocused=false;this._bOverflowButtonWasFocused=false;this.sFocusedChildControlId=""};y.prototype._registerToolbarResize=function(){if(n.isRelativeWidth(this.getWidth())){var t=this._handleResize.bind(this);this._sResizeListenerId=h.register(this,t)}};y.prototype._deregisterToolbarResize=function(){if(this._sResizeListenerId){h.deregister(this._sResizeListenerId);this._sResizeListenerId=""}};y.prototype._handleResize=function(){this._bResized=true;if(this._bInvalidatedAndNotRendered){return}if(this.getAsyncMode()){this._doLayoutAsync()}else{this._doLayout()}};y.prototype._cacheControlsInfo=function(){var t,e,o=parseInt(this.$().css("padding-right"))||0,i=parseInt(this.$().css("padding-left"))||0;this._iOldContentSize=this._iContentSize;this._iContentSize=0;this._bNeedUpdateOnControlsCachedSizes=false;this.getContent().forEach(this._updateControlsCachedSizes,this);if(d.system.phone){this._iContentSize-=1}if(this._aPopoverOnlyControls.length){t=this._aPopoverOnlyControls.filter(function(t){return t.getVisible()});e=t.length>0;if(e){this._iContentSize+=this._getOverflowButtonSize()}}this._bControlsInfoCached=true;if(this._iOldContentSize!==this._iContentSize){this.fireEvent("_contentSizeChange",{contentSize:this._iContentSize+o+i+1})}};y.prototype._updateControlsCachedSizes=function(t){var e,o,i;e=this._getControlPriority(t);o=this._calculateControlSize(t);this._aControlSizes[t.getId()]=o;i=n.getOrigWidth(t.getId());if(i&&n.isRelativeWidth(i)){this._bNeedUpdateOnControlsCachedSizes=true}if(e!==g.AlwaysOverflow){this._iContentSize+=o}};y.prototype._calculateControlSize=function(t){return this._getOptimalControlWidth(t,this._aControlSizes[t.getId()])};y.prototype._isControlsInfoCached=function(){return this._bControlsInfoCached};y.prototype._flushButtonsToPopover=function(){this._aButtonsToMoveToPopover.forEach(this._moveButtonToPopover,this)};y.prototype._invalidateIfHashChanged=function(t){if(typeof t==="undefined"||this._getPopover()._getContentIdsHash()!==t){this._preserveChildControlFocusInfo();this.invalidate()}};y.prototype._addOverflowButton=function(){if(!this._getOverflowButtonNeeded()){this._iCurrentContentSize+=this._getOverflowButtonSize();this._setOverflowButtonNeeded(true)}};y.prototype._aggregateMovableControls=function(){var t={},e=[],o,i,n,r,s;this._aMovableControls.forEach(function(l){o=y._getControlGroup(l);i=y._oPriorityOrder;if(o){n=this._getControlPriority(l);r=this._getControlIndex(l);t[o]=t[o]||[];s=t[o];s.unshift(l);if(!s._priority||i[s._priority]<i[n]){s._priority=n}if(!s._index||s._index<r){s._index=r}}else{e.push(l)}},this);Object.keys(t).forEach(function(o){e.push(t[o])});return e};y.prototype._extractControlsToMoveToOverflow=function(t,e){var o,i;for(o=0;o<t.length;o++){i=t[o];if(i.length){i.forEach(this._addToPopoverArrAndUpdateContentSize,this)}else{this._addToPopoverArrAndUpdateContentSize(i)}if(this._getControlPriority(i)!==g.Disappear){this._addOverflowButton()}if(this._iCurrentContentSize<=e){break}}};y.prototype._addToPopoverArrAndUpdateContentSize=function(t){this._aButtonsToMoveToPopover.unshift(t);this._iCurrentContentSize-=this._aControlSizes[t.getId()]};y.prototype._sortByPriorityAndIndex=function(t,e){var o=y._oPriorityOrder,i=this._getControlPriority(t),n=this._getControlPriority(e),r=o[i]-o[n];if(r!==0){return r}else{return this._getControlIndex(e)-this._getControlIndex(t)}};y.prototype._setControlsOverflowAndShrinking=function(t){var e;this._iCurrentContentSize=this._iContentSize;this._aButtonsToMoveToPopover=[];if(this._bSkipOptimization){this._bSkipOptimization=false}else{e=this._getPopover()._getContentIdsHash()}this._resetToolbar();this._collectPopoverOnlyControls();this._markControlsWithShrinkableLayoutData();if(this._iCurrentContentSize<=t){this._flushButtonsToPopover();this._invalidateIfHashChanged(e);return}this._moveControlsToPopover(t);this._flushButtonsToPopover();if(this._iCurrentContentSize>t){this._checkContents()}this._invalidateIfHashChanged(e)};y.prototype._markControlsWithShrinkableLayoutData=function(){this.getContent().forEach(this._markControlWithShrinkableLayoutData,this)};y.prototype._collectPopoverOnlyControls=function(){var t=this._aPopoverOnlyControls.length,e,o;if(t){for(e=t-1;e>=0;e--){o=this._aPopoverOnlyControls[e];if(o.getVisible()){this._aButtonsToMoveToPopover.unshift(o)}}if(this._aButtonsToMoveToPopover.length>0){this._setOverflowButtonNeeded(true)}}};y.prototype._moveControlsToPopover=function(t){var e=[];if(this._aMovableControls.length){e=this._aggregateMovableControls();e.sort(this._sortByPriorityAndIndex.bind(this));this._extractControlsToMoveToOverflow(e,t)}};y.prototype._markControlWithShrinkableLayoutData=function(t){var e,o;t.removeStyleClass(n.shrinkClass);e=n.getOrigWidth(t.getId());if(!n.isRelativeWidth(e)){return}o=t.getLayoutData();if(o&&o.isA("sap.m.ToolbarLayoutData")&&o.getShrinkable()){t.addStyleClass(n.shrinkClass)}};y.prototype._resetToolbar=function(){this._getPopover().close();this._getPopover()._getAllContent().forEach(this._restoreButtonInToolbar,this);this._setOverflowButtonNeeded(false);this.getContent().forEach(this._removeShrinkingClass)};y.prototype._removeShrinkingClass=function(t){t.removeStyleClass(n.shrinkClass)};y.prototype._moveButtonToPopover=function(t){this._getPopover().addAssociatedContent(t)};y.prototype._restoreButtonInToolbar=function(t){if(typeof t==="object"){t=t.getId()}this._getPopover().removeAssociatedContent(t)};y.prototype._resetAndInvalidateToolbar=function(t){if(this._bIsBeingDestroyed){return}this._resetToolbar();this._bControlsInfoCached=false;this._bNestedInAPopover=null;this._iPreviousToolbarWidth=null;if(t){this._bSkipOptimization=true}if(this.$().length){this._preserveChildControlFocusInfo();this.invalidate()}};y.prototype.invalidate=function(){this._bInvalidatedAndNotRendered=true;e.prototype.invalidate.apply(this,arguments)};y.prototype._getVisibleContent=function(){var t=this.getContent(),e=this._getPopover()._getAllContent();return t.filter(function(t){return e.indexOf(t)===-1})};y.prototype._getVisibleAndNonOverflowContent=function(){return this._getVisibleContent().filter(function(t){return t.getVisible()})};y.prototype._getToggleButton=function(t){return new o({id:this.getId()+t,icon:f.getIconURI("overflow"),press:this._overflowButtonPressed.bind(this),ariaLabelledBy:i.getStaticId("sap.ui.core","Icon.overflow"),type:c.Transparent})};y.prototype._getOverflowButton=function(){var t;if(!this.getAggregation("_overflowButton")){t=this._getToggleButton("-overflowButton");this.setAggregation("_overflowButton",t,true)}return this.getAggregation("_overflowButton")};y.prototype._getOverflowButtonClone=function(){if(!this._oOverflowToolbarButtonClone){this._oOverflowToolbarButtonClone=this._getToggleButton("-overflowButtonClone").addStyleClass("sapMTBHiddenElement")}return this._oOverflowToolbarButtonClone};y.prototype._overflowButtonPressed=function(t){var e=this._getPopover(),o=this._getBestPopoverPlacement();if(e.getPlacement()!==o){e.setPlacement(o)}if(e.isOpen()){e.close()}else{e.openBy(t.getSource())}};y.prototype._getPopover=function(){var t;if(!this.getAggregation("_popover")){t=new l(this.getId()+"-popover",{showHeader:false,showArrow:false,modal:false,horizontalScrolling:d.system.phone?false:true,contentWidth:d.system.phone?"100%":"auto",offsetY:this._detireminePopoverVerticalOffset(),ariaLabelledBy:i.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")});t._adaptPositionParams=function(){l.prototype._adaptPositionParams.call(this);this._myPositions=["end top","begin center","end bottom","end center"];this._atPositions=["end bottom","end center","end top","begin center"]};if(d.system.phone){t.attachBeforeOpen(this._shiftPopupShadow,this)}t.attachAfterClose(this._popOverClosedHandler,this);this.setAggregation("_popover",t,true)}return this.getAggregation("_popover")};y.prototype._shiftPopupShadow=function(){var t=this._getPopover(),e=t.getCurrentPosition();if(e===C.Bottom){t.addStyleClass("sapMOTAPopoverNoShadowTop");t.removeStyleClass("sapMOTAPopoverNoShadowBottom")}else if(e===C.Top){t.addStyleClass("sapMOTAPopoverNoShadowBottom");t.removeStyleClass("sapMOTAPopoverNoShadowTop")}};y.prototype._popOverClosedHandler=function(){var t=d.os.windows_phone||d.browser.edge&&d.browser.mobile;this._getOverflowButton().setPressed(false);this._getOverflowButton().$().trigger("focus");if(this._isNestedInsideAPopup()||t){return}this._getOverflowButton().setEnabled(false);setTimeout(function(){this._getOverflowButton().setEnabled(true);setTimeout(function(){this._getOverflowButton().$().trigger("focus")}.bind(this),0)}.bind(this),0)};y.prototype._isNestedInsideAPopup=function(){var t;if(this._bNestedInAPopover!==null){return this._bNestedInAPopover}t=function(e){if(!e){return false}if(e.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){return true}return t(e.getParent())};this._bNestedInAPopover=t(this);return this._bNestedInAPopover};y.prototype._getOverflowButtonNeeded=function(){return this._bOverflowButtonNeeded};y.prototype._setOverflowButtonNeeded=function(t){if(this._bOverflowButtonNeeded!==t){this._bOverflowButtonNeeded=t}return this};y.prototype._updateContentInfoInControlsCollections=function(){this.getContent().forEach(function(t){if(t){this._removeContentFromControlsCollections(t);this._moveControlInSuitableCollection(t,this._getControlPriority(t))}},this)};y.prototype._moveControlInSuitableCollection=function(t,e){var o=e!==g.NeverOverflow,i=e===g.AlwaysOverflow;if(a.supportsControl(t)&&i){this._aPopoverOnlyControls.push(t)}else{if(a.supportsControl(t)&&o&&t.getVisible()){this._aMovableControls.push(t)}else{this._aToolbarOnlyControls.push(t)}}};y.prototype._removeContentFromControlsCollections=function(t){var e,o,i;for(e=0;e<this._aAllCollections.length;e++){o=this._aAllCollections[e];i=o.indexOf(t);if(i!==-1){o.splice(i,1)}}};y.prototype._clearAllControlsCollections=function(){this._aMovableControls=[];this._aToolbarOnlyControls=[];this._aPopoverOnlyControls=[];this._aAllCollections=[this._aMovableControls,this._aToolbarOnlyControls,this._aPopoverOnlyControls]};y.prototype.onLayoutDataChange=function(t){this._resetAndInvalidateToolbar(true);t&&this._updateContentInfoInControlsCollections()};y.prototype.addContent=function(t){this._registerControlListener(t);this._resetAndInvalidateToolbar(false);if(t){this._moveControlInSuitableCollection(t,this._getControlPriority(t))}this._informNewFlexibleContentAdded(t);return this._callToolbarMethod("addContent",arguments)};y.prototype.insertContent=function(t,e){this._registerControlListener(t);this._resetAndInvalidateToolbar(false);if(t){this._moveControlInSuitableCollection(t,this._getControlPriority(t))}this._informNewFlexibleContentAdded(t);return this._callToolbarMethod("insertContent",arguments)};y.prototype.removeContent=function(){var t=this._callToolbarMethod("removeContent",arguments);if(t){this._getPopover().removeAssociatedContent(t.getId())}this._resetAndInvalidateToolbar(false);this._deregisterControlListener(t);this._removeContentFromControlsCollections(t);return t};y.prototype.removeAllContent=function(){var t=this._callToolbarMethod("removeAllContent",arguments);t.forEach(this._deregisterControlListener,this);t.forEach(this._removeContentFromControlsCollections,this);this._resetAndInvalidateToolbar(false);this._clearAllControlsCollections();return t};y.prototype.destroyContent=function(){this._resetAndInvalidateToolbar(false);setTimeout(function(){this._resetAndInvalidateToolbar(false)}.bind(this),0);this._clearAllControlsCollections();return this._callToolbarMethod("destroyContent",arguments)};y.prototype._informNewFlexibleContentAdded=function(t){if(t&&t.isA("sap.m.IOverflowToolbarFlexibleContent")){this.fireEvent("_contentSizeChange",{contentSize:null})}};y.prototype._registerControlListener=function(t){var e;if(t){t.attachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this);if(t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1){e=t.getOverflowToolbarConfig().invalidationEvents;if(e&&Array.isArray(e)){e.forEach(function(e){t.attachEvent(e,this._onInvalidationEventFired,this)},this)}}}};y.prototype._deregisterControlListener=function(t){var e;if(t){t.detachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this);if(t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1){e=t.getOverflowToolbarConfig().invalidationEvents;if(e&&Array.isArray(e)){e.forEach(function(e){t.detachEvent(e,this._onInvalidationEventFired,this)},this)}}}};y.prototype._onContentPropertyChangedOverflowToolbar=function(t){var e=t.getSource(),o,i;this._updateContentInfoInControlsCollections();if(!this._bListenForControlPropertyChanges){return}o=a.getControlConfig(e);i=t.getParameter("name");if(i!=="visible"&&!e.getVisible()){return}if(typeof o!=="undefined"&&o.noInvalidationProps.indexOf(i)!==-1){return}if(i==="visible"){this._bContentVisibilityChanged=true}if(e.isA("sap.m.IOverflowToolbarFlexibleContent")&&e.getVisible()){this.fireEvent("_contentSizeChange",{contentSize:null})}this._resetAndInvalidateToolbar(true)};y.prototype._onInvalidationEventFired=function(t){var e=t.getSource();if(!this._bListenForInvalidationEvents){return}if(e.isA("sap.m.IOverflowToolbarFlexibleContent")){this.fireEvent("_contentSizeChange",{contentSize:null})}this._resetAndInvalidateToolbar(true)};y.prototype._getOverflowButtonSize=function(){return this._iOverflowToolbarButtonSize};y.prototype._getBestPopoverPlacement=function(){var t=this.getHTMLTag();if(t==="Footer"){return C.Top}else if(t==="Header"){return C.Bottom}return C.Vertical};y.prototype._getControlsIds=function(){return this.getContent().map(function(t){return t.getId()})};y.prototype._getControlIndex=function(t){return t.length?t._index:this.indexOfContent(t)};y.prototype._getOptimalControlWidth=function(t,e){var o,i=t.getLayoutData(),n=i&&i.isA("sap.m.ToolbarLayoutData")?i.getShrinkable():false,r=n?this._getMinWidthOfShrinkableControl(t):0,s=t.getVisible(),l;if(t.isA("sap.m.ToolbarSpacer")){l=parseInt(t.$().css("width"));r=t.getWidth()&&l?l:0;o=y._getOptimalWidthOfShrinkableControl(t,r)}else if(n&&r>0&&s){o=y._getOptimalWidthOfShrinkableControl(t,r)}else{o=s?y._getControlWidth(t):0}if(o===null){o=typeof e!=="undefined"?e:0}return o};y.prototype._getMinWidthOfShrinkableControl=function(t){var e=t.$().css("min-width"),o=parseInt(e),i=n.isRelativeWidth(e);if(i){return o*this.$().width()/100}else{return o}};y.prototype._getControlPriority=function(t){var e,o,i,n;if(t.length){return t._priority}e=t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1;n=e&&t.getOverflowToolbarConfig().getCustomImportance;if(e&&typeof n==="function"){return n()}o=t.getLayoutData&&t.getLayoutData();if(o&&o instanceof s){if(o.getMoveToOverflow()===false){return g.NeverOverflow}if(o.getStayInOverflow()===true){return g.AlwaysOverflow}i=o.getPriority();if(i===g.Never){return g.NeverOverflow}if(i===g.Always){return g.AlwaysOverflow}return i}return g.High};y._getControlMargins=function(t){return t.$().outerWidth(true)-t.$().outerWidth()};y._getOptimalWidthOfShrinkableControl=function(t,e){return e+y._getControlMargins(t)};y._getControlWidth=function(t){var e=t&&t.getDomRef();if(e){return Math.round(e.getBoundingClientRect().width+y._getControlMargins(t))}return null};y._getControlGroup=function(t){var e=t.getLayoutData();if(e instanceof s){return e.getGroup()}};y._oPriorityOrder=function(){var t={};t[g.Disappear]=1;t[g.Low]=2;t["Medium"]=3;t[g.High]=4;return t}();y.prototype._detireminePopoverVerticalOffset=function(){return this.$().parents().hasClass("sapUiSizeCompact")?2:3};y.prototype._recalculateOverflowButtonSize=function(){var t=this._getOverflowButtonClone().$(),e;if(!this._getOverflowButtonSize()&&t.width()>0){e=t.outerWidth(true);this._iOverflowToolbarButtonSize=e?e:0}};y.prototype.onThemeChanged=function(){this._resetAndInvalidateToolbar();this._iOverflowToolbarButtonSize=0;this._recalculateOverflowButtonSize();for(var t in this._aControlSizes){if(this._aControlSizes.hasOwnProperty(t)){this._aControlSizes[t]=0}}};y.prototype.closeOverflow=function(){this._getPopover().close()};return y});