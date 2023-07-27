/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/events/KeyCodes","sap/ui/Device","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/InvisibleText","sap/ui/core/LabelEnablement","sap/ui/core/delegate/ItemNavigation","./library","./InstanceManager","./GrowingEnablement","./GroupHeaderListItem","./ListItemBase","./ListBaseRenderer","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/core/InvisibleMessage","sap/m/table/Util","sap/ui/dom/jquery/Selectors","sap/ui/dom/jquery/Aria"],function(e,t,i,n,o,s,r,a,l,u,h,d,p,g,c,jQuery,f,m,v){"use strict";var y=l.ListType;var I=l.ListKeyboardMode;var _=l.ListGrowingDirection;var S=l.SwipeDirection;var b=l.ListSeparators;var w=l.ListMode;var T=l.ListHeaderDesign;var D=l.Sticky;var C=l.MultiSelectMode;var B=n.extend("sap.m.ListBase",{metadata:{library:"sap.m",dnd:true,properties:{inset:{type:"boolean",group:"Appearance",defaultValue:false},headerText:{type:"string",group:"Misc",defaultValue:null},headerDesign:{type:"sap.m.ListHeaderDesign",group:"Appearance",defaultValue:T.Standard,deprecated:true},footerText:{type:"string",group:"Misc",defaultValue:null},mode:{type:"sap.m.ListMode",group:"Behavior",defaultValue:w.None},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},includeItemInSelection:{type:"boolean",group:"Behavior",defaultValue:false},showUnread:{type:"boolean",group:"Misc",defaultValue:false},noDataText:{type:"string",group:"Misc",defaultValue:null},showNoData:{type:"boolean",group:"Misc",defaultValue:true},enableBusyIndicator:{type:"boolean",group:"Behavior",defaultValue:true},modeAnimationOn:{type:"boolean",group:"Misc",defaultValue:true},showSeparators:{type:"sap.m.ListSeparators",group:"Appearance",defaultValue:b.All},swipeDirection:{type:"sap.m.SwipeDirection",group:"Misc",defaultValue:S.Both},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingThreshold:{type:"int",group:"Misc",defaultValue:20},growingTriggerText:{type:"string",group:"Appearance",defaultValue:null},growingScrollToLoad:{type:"boolean",group:"Behavior",defaultValue:false},growingDirection:{type:"sap.m.ListGrowingDirection",group:"Behavior",defaultValue:_.Downwards},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:true},keyboardMode:{type:"sap.m.ListKeyboardMode",group:"Behavior",defaultValue:I.Navigation},sticky:{type:"sap.m.Sticky[]",group:"Appearance"},multiSelectMode:{type:"sap.m.MultiSelectMode",group:"Behavior",defaultValue:C.Default}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ListItemBase",multiple:true,singularName:"item",bindable:"bindable",selector:"#{id} .sapMListItems",dnd:true},swipeContent:{type:"sap.ui.core.Control",multiple:false},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false},contextMenu:{type:"sap.ui.core.IContextMenu",multiple:false},_messageStrip:{type:"sap.m.MessageStrip",multiple:false,visibility:"hidden"},noData:{type:"sap.ui.core.Control",multiple:false,altTypes:["string"]}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{deprecated:true,parameters:{listItem:{type:"sap.m.ListItemBase"}}},selectionChange:{parameters:{listItem:{type:"sap.m.ListItemBase"},listItems:{type:"sap.m.ListItemBase[]"},selected:{type:"boolean"},selectAll:{type:"boolean"}}},delete:{parameters:{listItem:{type:"sap.m.ListItemBase"}}},swipe:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ListItemBase"},swipeContent:{type:"sap.ui.core.Control"},srcControl:{type:"sap.ui.core.Control"},swipeDirection:{type:"sap.m.SwipeDirection"}}},growingStarted:{deprecated:true,parameters:{actual:{type:"int"},total:{type:"int"}}},growingFinished:{deprecated:true,parameters:{actual:{type:"int"},total:{type:"int"}}},updateStarted:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},updateFinished:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},itemPress:{parameters:{listItem:{type:"sap.m.ListItemBase"},srcControl:{type:"sap.ui.core.Control"}}},beforeOpenContextMenu:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ListItemBase"}}}},designtime:"sap/m/designtime/ListBase.designtime"},renderer:g});B.prototype.bAnnounceDetails=true;B.getInvisibleText=function(){if(!this.oInvisibleText){this.oInvisibleText=(new s).toStatic()}return this.oInvisibleText};B.prototype.sNavItemClass="sapMLIB";B.prototype.init=function(){this._aNavSections=[];this._aSelectedPaths=[];this._iItemNeedsHighlight=0;this._iItemNeedsNavigated=0;this._bItemsBeingBound=false;this._bSkippedInvalidationOnRebind=false;this.data("sap-ui-fastnavgroup","true",true)};B.prototype.onBeforeRendering=function(){this._bRendering=true;this._bActiveItem=false;this._aNavSections=[];this._removeSwipeContent()};B.prototype.onAfterRendering=function(){this._bRendering=false;this._sLastMode=this.getMode();this._startItemNavigation(true)};B.prototype.exit=function(){this._aNavSections=[];this._aSelectedPaths=[];this._destroyGrowingDelegate();this._destroyItemNavigation()};B.prototype.refreshItems=function(e){if(this._oGrowingDelegate){this._oGrowingDelegate.refreshItems(e)}else{if(!this._bReceivingData){this._updateStarted(e);this._bReceivingData=true}this.refreshAggregation("items")}};B.prototype.updateItems=function(e,t){if(t&&t.detailedReason==="AddVirtualContext"){R(this);if(this._oGrowingDelegate){this._oGrowingDelegate.reset(true)}return}else if(t&&t.detailedReason==="RemoveVirtualContext"){M(this);return}if(this._bSkippedInvalidationOnRebind&&this.getBinding("items").getLength()===0){this.invalidate()}if(this._oGrowingDelegate){this._oGrowingDelegate.updateItems(e)}else{if(this._bReceivingData){this._bReceivingData=false}else{this._updateStarted(e)}this.updateAggregation("items");this._updateFinished()}this._bSkippedInvalidationOnRebind=false};function R(e){var t=e.getBinding("items");var i=e.getBindingInfo("items");var n=e.getGrowing()?e.getGrowingThreshold():i.length;var o=e.getGrowing()||!i.startIndex?0:i.startIndex;var s=t.getContexts(o,n)[0];M(e);e._oVirtualItem=h.createItem(s,i,"virtual");e.addAggregation("dependents",e._oVirtualItem,true)}function M(e){if(e._oVirtualItem){e._oVirtualItem.destroy();delete e._oVirtualItem}}B.prototype.setBindingContext=function(e,t){var i=(this.getBindingInfo("items")||{}).model;if(i===t){this._resetItemsBinding()}return n.prototype.setBindingContext.apply(this,arguments)};B.prototype.bindAggregation=function(e){this._bItemsBeingBound=e==="items";M(this);n.prototype.bindAggregation.apply(this,arguments);this._bItemsBeingBound=false;return this};B.prototype._bindAggregation=function(e,t){function i(e,t,i){e.events=e.events||{};if(!e.events[t]){e.events[t]=i}else{var n=e.events[t];e.events[t]=function(){i.apply(this,arguments);n.apply(this,arguments)}}}if(e==="items"){this._resetItemsBinding();i(t,"dataRequested",this._onBindingDataRequestedListener.bind(this));i(t,"dataReceived",this._onBindingDataReceivedListener.bind(this))}n.prototype._bindAggregation.call(this,e,t)};B.prototype._onBindingDataRequestedListener=function(e){this._showBusyIndicator();if(this._dataReceivedHandlerId!=null){clearTimeout(this._dataReceivedHandlerId);delete this._dataReceivedHandlerId}};B.prototype._onBindingDataReceivedListener=function(e){if(this._dataReceivedHandlerId!=null){clearTimeout(this._dataReceivedHandlerId);delete this._dataReceivedHandlerId}this._dataReceivedHandlerId=setTimeout(function(){this._hideBusyIndicator();delete this._dataReceivedHandlerId}.bind(this),0);if(this._oGrowingDelegate){this._oGrowingDelegate._onBindingDataReceivedListener(e)}};B.prototype.destroyItems=function(e){if(!this.getItems(true).length){return this}this.destroyAggregation("items","KeepDom");if(!e){if(this._bItemsBeingBound){this._bSkippedInvalidationOnRebind=true}else{this.invalidate()}}return this};B.prototype.getItems=function(e){if(e){return this.mAggregations["items"]||[]}return this.getAggregation("items",[])};B.prototype.getId=function(e){var t=this.sId;return e?t+"-"+e:t};B.prototype.setGrowing=function(e){e=!!e;if(this.getGrowing()!=e){this.setProperty("growing",e,!e);if(e){this._oGrowingDelegate=new h(this)}else if(this._oGrowingDelegate){this._oGrowingDelegate.destroy();this._oGrowingDelegate=null}}return this};B.prototype.setGrowingThreshold=function(e){return this.setProperty("growingThreshold",e,true)};B.prototype.setEnableBusyIndicator=function(e){this.setProperty("enableBusyIndicator",e,true);this._hideBusyIndicator();return this};B.prototype.setNoData=function(e){this.setAggregation("noData",e,true);if(typeof e==="string"){this.$("nodata-text").text(e)}else if(e){this.invalidate()}else if(!e){this.$("nodata-text").text(this.getNoDataText())}return this};B.prototype.setNoDataText=function(e){this.setProperty("noDataText",e,true);if(!this.getNoData()){this.$("nodata-text").text(this.getNoDataText())}return this};B.prototype.getNoDataText=function(e){if(e&&this._bBusy){return""}var t=this.getProperty("noDataText");t=t||i.getLibraryResourceBundle("sap.m").getText("LIST_NO_DATA");return t};B.prototype.getSelectedItem=function(){var e=this.getItems(true);for(var t=0;t<e.length;t++){if(e[t].getSelected()){return e[t]}}return null};B.prototype.setSelectedItem=function(e,t,i){if(this.indexOfItem(e)<0){f.warning("setSelectedItem is called without valid ListItem parameter on "+this);return}if(this._bSelectionMode){e.setSelected(t===undefined?true:!!t);i&&this._fireSelectionChangeEvent([e])}};B.prototype.getSelectedItems=function(){return this.getItems(true).filter(function(e){return e.getSelected()})};B.prototype.setSelectedItemById=function(e,t){var n=i.byId(e);return this.setSelectedItem(n,t)};B.prototype.getSelectedContexts=function(e){var t=this.getBindingInfo("items"),i=(t||{}).model,n=this.getModel(i);if(!t||!n){return[]}if(e&&this.getRememberSelections()){return this._aSelectedPaths.map(function(e){return n.getContext(e)})}return this.getSelectedItems().map(function(e){return e.getBindingContext(i)})};B.prototype.removeSelections=function(e,t,i){var n=[];this._oSelectedItem=null;e&&(this._aSelectedPaths=[]);this.getItems(true).forEach(function(t){if(!t.getSelected()){return}if(i&&t.isSelectedBoundTwoWay()){return}t.setSelected(false,true);n.push(t);!e&&this._updateSelectedPaths(t)},this);if(t&&n.length){this._fireSelectionChangeEvent(n)}return this};B.prototype.selectAll=function(e){if(this.getMode()!="MultiSelect"||this.getMultiSelectMode()==C.ClearAll){return this}var t=[];this.getItems(true).forEach(function(e){if(!e.getSelected()){e.setSelected(true,true);t.push(e);this._updateSelectedPaths(e)}},this);if(e&&t.length){this._fireSelectionChangeEvent(t,e)}var i=this.getItems().filter(function(e){return e.isSelectable()}).length;if(e&&this.getGrowing()&&this.getMultiSelectMode()==="SelectAll"&&this.getBinding("items").getLength()>i){var n=this._getSelectAllCheckbox?this._getSelectAllCheckbox():undefined;if(n){v.showSelectionLimitPopover(i,n)}}return this};B.prototype.getLastMode=function(e){return this._sLastMode};B.prototype.setMode=function(e){e=this.validateProperty("mode",e);var t=this.getMode();if(t==e){return this}this._bSelectionMode=e.indexOf("Select")>-1;if(!this._bSelectionMode){this.removeSelections(true)}else{var i=this.getSelectedItems();if(i.length>1){this.removeSelections(true)}else if(t===w.MultiSelect){this._oSelectedItem=i[0]}}return this.setProperty("mode",e)};B.prototype.getGrowingInfo=function(){return this._oGrowingDelegate?this._oGrowingDelegate.getInfo():null};B.prototype.setRememberSelections=function(e){this.setProperty("rememberSelections",e,true);!this.getRememberSelections()&&(this._aSelectedPaths=[]);return this};B.prototype.setSelectedContextPaths=function(e){this._aSelectedPaths=e||[]};B.prototype.getSelectedContextPaths=function(e){if(!e||e&&this.getRememberSelections()){return this._aSelectedPaths.slice(0)}return this.getSelectedItems().map(function(e){return e.getBindingContextPath()})};B.prototype.isAllSelectableSelected=function(){if(this.getMode()!=w.MultiSelect){return false}var e=this.getItems(true),t=this.getSelectedItems().length,i=e.filter(function(e){return e.isSelectable()}).length;return e.length>0&&t==i};B.prototype.getVisibleItems=function(){return this.getItems(true).filter(function(e){return e.getVisible()})};B.prototype.getActiveItem=function(){return this._bActiveItem};B.prototype.onItemDOMUpdate=function(e){if(!this._bRendering&&this.bOutput){this._startItemNavigation(true)}var t=this.getVisibleItems().length>0;if(!t&&!this._bInvalidatedForNoData){this.invalidate();this._bInvalidatedForNoData=true}else if(t&&this._bInvalidatedForNoData){this.invalidate();this._bInvalidatedForNoData=false}};B.prototype.onItemActiveChange=function(e,t){this._bActiveItem=t};B.prototype.onItemHighlightChange=function(e,t){this._iItemNeedsHighlight+=t?1:-1;if(this._iItemNeedsHighlight==1&&t){this.$("listUl").addClass("sapMListHighlight")}else if(this._iItemNeedsHighlight==0){this.$("listUl").removeClass("sapMListHighlight")}};B.prototype.onItemNavigatedChange=function(e,t){this._iItemNeedsNavigated+=t?1:-1;if(this._iItemNeedsNavigated==1&&t){this.$("listUl").addClass("sapMListNavigated")}else if(this._iItemNeedsNavigated==0){this.$("listUl").removeClass("sapMListNavigated")}};B.prototype.onItemSelectedChange=function(e,t){if(this.getMode()==w.MultiSelect){this._updateSelectedPaths(e,t);return}if(t){this._aSelectedPaths=[];this._oSelectedItem&&this._oSelectedItem.setSelected(false,true);this._oSelectedItem=e}else if(this._oSelectedItem===e){this._oSelectedItem=null}this._updateSelectedPaths(e,t)};B.prototype.getItemsContainerDomRef=function(){return this.getDomRef("listUl")};B.prototype.getStickyFocusOffset=function(){return 0};B.prototype.checkGrowingFromScratch=function(){};B.prototype.onBeforePageLoaded=function(e,t){this._fireUpdateStarted(t,e);this.fireGrowingStarted(e)};B.prototype.onAfterPageLoaded=function(e,t){this._fireUpdateFinished(e);this.fireGrowingFinished(e)};B.prototype.addNavSection=function(e){this._aNavSections.push(e);return e};B.prototype.getMaxItemsCount=function(){var e=this.getBinding("items");if(e&&e.getLength){return e.getLength()||0}return this.getItems(true).length};B.prototype.shouldRenderItems=function(){return true};B.prototype.shouldGrowingSuppressInvalidation=function(){return true};B.prototype._resetItemsBinding=function(){if(this.isBound("items")){this._bUpdating=false;this._bReceivingData=false;this.removeSelections(true,false,true);this._oGrowingDelegate&&this._oGrowingDelegate.reset();this._hideBusyIndicator();if(this._oItemNavigation&&document.activeElement.id!=this.getId("nodata")){this._oItemNavigation.iFocusedIndex=-1}}};B.prototype._updateStarted=function(e){if(!this._bReceivingData&&!this._bUpdating){this._bUpdating=true;this._fireUpdateStarted(e)}};B.prototype._fireUpdateStarted=function(e,t){this._sUpdateReason=c(e||"Refresh");this.fireUpdateStarted({reason:this._sUpdateReason,actual:t?t.actual:this.getItems(true).length,total:t?t.total:this.getMaxItemsCount()})};B.prototype.onThemeChanged=function(){if(this._oGrowingDelegate){this._oGrowingDelegate._updateTrigger()}};B.prototype._updateFinished=function(){if(!this._bReceivingData&&this._bUpdating){this._fireUpdateFinished();this._bUpdating=false}};B.prototype._fireUpdateFinished=function(e){this._hideBusyIndicator();setTimeout(function(){this._bItemNavigationInvalidated=true;this.fireUpdateFinished({reason:this._sUpdateReason,actual:e?e.actual:this.getItems(true).length,total:e?e.total:this.getMaxItemsCount()})}.bind(this),0)};B.prototype._showBusyIndicator=function(){if(this.getEnableBusyIndicator()&&!this.getBusy()&&!this._bBusy){this._bBusy=true;this.setBusy(true,"listUl")}};B.prototype._hideBusyIndicator=function(){if(this._bBusy){this._bBusy=false;if(this.getEnableBusyIndicator()){this.setBusy(false,"listUl")}}};B.prototype.setBusy=function(e,t){if(this.getBusy()==e){return this}n.prototype.setBusy.apply(this,arguments);if(!e||!window.IntersectionObserver){clearTimeout(this._iBusyTimer);return this}this._iBusyTimer=setTimeout(function(){var e=this.getDomRef(t);var i=this.getDomRef("busyIndicator");var n=l.getScrollDelegate(this,true);if(!e||!i||!n){return}var o=new window.IntersectionObserver(function(e){o.disconnect();var t=e.pop();var n=t.intersectionRatio;if(n<=0||n>=1){return}var s=i.firstChild.style;if(t.intersectionRect.height>=t.rootBounds.height){s.position="sticky"}else{s.top=((t.boundingClientRect.top<0?1-n:0)+n/2)*100+"%"}},{root:n.getContainerDomRef()});o.observe(e)}.bind(this),this.getBusyIndicatorDelay());return this};B.prototype.onItemBindingContextSet=function(e){if(!this._bSelectionMode||!this.getRememberSelections()||!this.isBound("items")){return}if(e.isSelectedBoundTwoWay()){return}var t=e.getBindingContextPath();if(t){var i=this._aSelectedPaths.indexOf(t)>-1;e.setSelected(i)}};B.prototype.onItemRemoved=function(e){e._bGroupHeader=false;if(this._oLastGroupHeader==e){this._oLastGroupHeader=null}if(this._oSelectedItem==e){this._oSelectedItem=null}};B.prototype.onItemInserted=function(e,t){if(this._oLastGroupHeader&&!e.isGroupHeader()){this._oLastGroupHeader.setGroupedItem(e)}if(t){this.onItemSelectedChange(e,true)}if(!this._bSelectionMode||!this._aSelectedPaths.length||!this.getRememberSelections()||!this.isBound("items")||e.isSelectedBoundTwoWay()||e.getSelected()){return}var i=e.getBindingContextPath();if(i&&this._aSelectedPaths.indexOf(i)>-1){e.setSelected(true)}};B.prototype.onItemSelect=function(e,t){var n=this.getMode();if(this._mRangeSelection){if(!this._mRangeSelection.selected){this._fireSelectionChangeEvent([e]);this._mRangeSelection.index=this.getVisibleItems().indexOf(e);this._mRangeSelection.selected=t;return}if(!t){e.setSelected(true);return}var o=this.indexOfItem(e),s=this.getItems(),r,a,l=[],u;if(o<this._mRangeSelection.index){r=this._mRangeSelection.index-o;u=-1}else{r=o-this._mRangeSelection.index;u=1}for(var h=1;h<=r;h++){a=s[this._mRangeSelection.index+h*u];if(a.isSelectable()&&a.getVisible()&&!a.getSelected()){a.setSelected(true);l.push(a)}else if(a===e){l.push(a)}}this._fireSelectionChangeEvent(l);return}if(n===w.MultiSelect||this._bSelectionMode&&t){this._fireSelectionChangeEvent([e]);if(this.getAriaRole()==="list"&&document.activeElement===e.getDomRef()){var d=i.getLibraryResourceBundle("sap.m");m.getInstance().announce(t?d.getText("LIST_ITEM_SELECTED"):d.getText("LIST_ITEM_NOT_SELECTED"),"Assertive")}}};B.prototype._fireSelectionChangeEvent=function(e,t){var i=e&&e[0];if(!i){return}this.fireSelectionChange({listItem:i,listItems:e,selected:i.getSelected(),selectAll:!!t});if(this.getGrowing()){this._bSelectAll=t}this.fireSelect({listItem:i})};B.prototype.onItemDelete=function(e){this.fireDelete({listItem:e})};B.prototype.onItemPress=function(e,t){if(e.getType()==y.Inactive){return}setTimeout(function(){this.fireItemPress({listItem:e,srcControl:t})}.bind(this),0)};B.prototype.onItemKeyDown=function(t,i){if(!i.shiftKey||i.ctrlKey||i.altKey||i.metaKey||this.getMode()!==w.MultiSelect||!t.isSelectable()||i.which===e.F6){if(this._mRangeSelection){this._mRangeSelection=null}return}var n=this.getVisibleItems(),o=n.some(function(e){return!!e.getSelected()});if(!o){return}if(!this._mRangeSelection){this._mRangeSelection={index:this.indexOfItem(t),selected:t.getSelected()}}};B.prototype.onItemKeyUp=function(t,i){if(i.which===e.SHIFT){this._mRangeSelection=null}};B.prototype._updateSelectedPaths=function(e,t){if(!this.getRememberSelections()||!this.isBound("items")){return}var i=e.getBindingContextPath();if(!i){return}t=t===undefined?e.getSelected():t;var n=this._aSelectedPaths.indexOf(i);if(t){n<0&&this._aSelectedPaths.push(i)}else{n>-1&&this._aSelectedPaths.splice(n,1)}};B.prototype._destroyGrowingDelegate=function(){if(this._oGrowingDelegate){this._oGrowingDelegate.destroy();this._oGrowingDelegate=null}};B.prototype._destroyItemNavigation=function(){if(this._oItemNavigation){this.removeEventDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}};B.prototype._getTouchBlocker=function(){return this.$().children()};B.prototype._getSwipeContainer=function(){if(!this._$swipeContainer){this._$swipeContainer=jQuery("<div>",{id:this.getId("swp"),class:"sapMListSwp"})}return this._$swipeContainer};B.prototype._setSwipePosition=function(){if(this._isSwipeActive){return this._getSwipeContainer().css("top",this._swipedItem.$().position().top)}};B.prototype._renderSwipeContent=function(){var e=this._swipedItem.$(),t=this._getSwipeContainer();this.$().prepend(t.css({top:e.position().top,height:e.outerHeight(true)}));if(this._bRerenderSwipeContent){this._bRerenderSwipeContent=false;var n=i.createRenderManager();n.render(this.getSwipeContent(),t.empty()[0]);n.destroy()}return this};B.prototype._swipeIn=function(){var e=this,t=e._getTouchBlocker(),i=e._getSwipeContainer();e._isSwipeActive=true;e._renderSwipeContent();u.addPopoverInstance(e);window.document.activeElement.blur();jQuery(window).on("resize.swp",function(){e._setSwipePosition()});t.css("pointer-events","none").on("touchstart.swp mousedown.swp",function(e){if(!i[0].firstChild.contains(e.target)){e.preventDefault();e.stopPropagation()}});i.on("webkitAnimationEnd animationend",function(){jQuery(this).off("webkitAnimationEnd animationend");i.css("opacity",1).trigger("focus");t.parent().on("touchend.swp touchcancel.swp mouseup.swp",function(t){if(!i[0].firstChild.contains(t.target)){e.swipeOut()}})}).removeClass("sapMListSwpOutAnim").addClass("sapMListSwpInAnim")};B.prototype._onSwipeOut=function(e){this._getSwipeContainer().css("opacity",0).remove();jQuery(window).off("resize.swp");this._getTouchBlocker().css("pointer-events","auto").off("touchstart.swp mousedown.swp");if(typeof e=="function"){e.call(this,this._swipedItem,this.getSwipeContent())}this._isSwipeActive=false;u.removePopoverInstance(this)};B.prototype.swipeOut=function(e){if(!this._isSwipeActive){return this}var t=this,i=this._getSwipeContainer();this._getTouchBlocker().parent().off("touchend.swp touchend.swp touchcancel.swp mouseup.swp");i.on("webkitAnimationEnd animationend",function(){jQuery(this).off("webkitAnimationEnd animationend");t._onSwipeOut(e)}).removeClass("sapMListSwpInAnim").addClass("sapMListSwpOutAnim");return this};B.prototype._removeSwipeContent=function(){if(this._isSwipeActive){this.swipeOut()._onSwipeOut()}};B.prototype.close=B.prototype._removeSwipeContent;B.prototype._onSwipe=function(e,i){var n=this.getSwipeContent(),o=e.srcControl;if(n&&o&&!this._isSwipeActive&&this!==o&&!this._eventHandledByControl&&t.support.touch){for(var s=o;s&&!(s instanceof p);s=s.oParent);if(s instanceof p){this._swipedItem=s;this.fireSwipe({listItem:this._swipedItem,swipeContent:n,srcControl:o,swipeDirection:i},true)&&this._swipeIn()}}};B.prototype.ontouchstart=function(e){this._eventHandledByControl=e.isMarked()};B.prototype.onswipeleft=function(e){var t=i.getConfiguration().getRTL();var n=t?S.EndToBegin:S.BeginToEnd;var o=this.getSwipeDirection();if(o===S.LeftToRight){o=S.BeginToEnd}else if(o===S.RightToLeft){o=S.EndToBegin}if(o!=n){if(o==S.Both){o=t?S.BeginToEnd:S.EndToBegin}this._onSwipe(e,o)}};B.prototype.onswiperight=function(e){var t=i.getConfiguration().getRTL();var n=t?S.BeginToEnd:S.EndToBegin;var o=this.getSwipeDirection();if(o===S.LeftToRight){o=S.BeginToEnd}else if(o===S.RightToLeft){o=S.EndToBegin}if(o!=n){if(o==S.Both){o=t?S.EndToBegin:S.BeginToEnd}this._onSwipe(e,o)}};B.prototype.setSwipeDirection=function(e){return this.setProperty("swipeDirection",e,true)};B.prototype.getSwipedItem=function(){return this._isSwipeActive?this._swipedItem:null};B.prototype.setSwipeContent=function(e){this._bRerenderSwipeContent=true;this.toggleStyleClass("sapMListSwipable",!!e);return this.setAggregation("swipeContent",e,!this._isSwipeActive)};B.prototype.invalidate=function(e){if(e&&e===this.getSwipeContent()){this._bRerenderSwipeContent=true;this._isSwipeActive&&this._renderSwipeContent();return}return n.prototype.invalidate.apply(this,arguments)};B.prototype.addItemGroup=function(e,t,i){if(!t){t=this.getGroupHeaderTemplate(e)}t._bGroupHeader=true;this.addAggregation("items",t,i);this.setLastGroupHeader(t);return t};B.prototype.getGroupHeaderTemplate=function(e){var t=new d;t.setTitle(e.text||e.key);return t};B.prototype.setLastGroupHeader=function(e){this._oLastGroupHeader=e};B.prototype.getLastGroupHeader=function(){return this._oLastGroupHeader};B.prototype.removeGroupHeaders=function(e){this.getItems(true).forEach(function(t){if(t.isGroupHeader()){t.destroy(e)}})};B.prototype.getAccessibilityType=function(){return i.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_LIST")};B.prototype.getAccessibilityStates=function(){if(!this.getItems(true).length){return""}var e="",t=w,n=this.getMode(),o=i.getLibraryResourceBundle("sap.m");if(r.isRequired(this)){e+=o.getText("LIST_REQUIRED")+" "}if(n==t.MultiSelect){e+=o.getText("LIST_MULTISELECTABLE")+" . "}else if(n==t.Delete){e+=o.getText("LIST_DELETABLE")+" . "}else if(n!=t.None){e+=o.getText("LIST_SELECTABLE")+" . "}if(this.isGrouped()){e+=o.getText("LIST_GROUPED")+" . "}return e};B.prototype.getAccessibilityInfo=function(){return{description:this.getAccessibilityStates().trim(),focusable:true}};B.prototype.getAccessbilityPosition=function(e){var t=0,i=this.getVisibleItems(),n=this.getAriaRole(),o=n==="list"||n==="listbox";if(o){i=i.filter(function(e){return!e.isGroupHeader()})}var s=i.indexOf(e)+1,r=this.getBinding("items");if(this.getGrowing()&&this.getGrowingScrollToLoad()&&r&&r.isLengthFinal()){t=r.getLength();if(r.isGrouped()&&!o){t+=i.filter(function(e){return e.isGroupHeader()}).length}}else{t=i.length}return{setSize:t,posInset:s}};B.prototype.onItemFocusIn=function(e,t){this._handleStickyItemFocus(e.getDomRef());if(e!==t||!i.getConfiguration().getAccessibility()){return}var n=e.getDomRef();if(!e.getContentAnnouncement){this.getNavigationRoot().setAttribute("aria-activedescendant",n.id)}else{var o=e.getAccessibilityInfo(),s=i.getLibraryResourceBundle("sap.m"),r=e.isGroupHeader()?"":o.type+" . ";if(this.isA("sap.m.Table")){var a=this.getAccessbilityPosition(e);r+=s.getText("LIST_ITEM_POSITION",[a.posInset,a.setSize])+" . "}r+=o.description;this.updateInvisibleText(r,n);return r}};B.prototype.updateInvisibleText=function(e,t,i){var n=B.getInvisibleText(),o=jQuery(t||document.activeElement);if(this.bAnnounceDetails){this.bAnnounceDetails=false;e=this.getAccessibilityInfo().description+" "+e}n.setText(e.trim());o.addAriaLabelledBy(n.getId(),i)};B.prototype.getNavigationRoot=function(){return this.getDomRef("listUl")};B.prototype.getFocusDomRef=function(){return this.getNavigationRoot()};B.prototype._startItemNavigation=function(e){if(!t.system.desktop){return}var i=this.getDomRef();if(!this.getShowNoData()&&!this.getVisibleItems().length&&i){i.classList.add("sapMListPreventFocus");this._destroyItemNavigation();return}if(i){i.classList.remove("sapMListPreventFocus")}var n=this.getKeyboardMode(),o=I;if(n==o.Edit&&!this.getItems(true).length){return}var s=this.getNavigationRoot();var r=n==o.Edit?-1:0;if(e&&s&&!s.contains(document.activeElement)){this._bItemNavigationInvalidated=true;if(!s.getAttribute("tabindex")){s.tabIndex=r}return}if(!this._oItemNavigation){this._oItemNavigation=new a;this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this._setItemNavigationTabIndex(r);this._oItemNavigation.setTableMode(true,true).setColumns(1);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta","ctrl"],sapprevious:["alt","meta","ctrl"]})}this._oItemNavigation.setPageSize(this.getGrowingThreshold());this._oItemNavigation.setRootDomRef(s);this.setNavigationItems(this._oItemNavigation,s);this._bItemNavigationInvalidated=false;if(document.activeElement==s){jQuery(s).trigger("focus")}};B.prototype.setNavigationItems=function(e,t){var i=jQuery(t).children(".sapMLIB").get();e.setItemDomRefs(i);if(e.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==_.Upwards){e.setFocusedIndex(i.length-1)}else{e.setFocusedIndex(0)}}};B.prototype.getItemNavigation=function(){return this._oItemNavigation};B.prototype._setItemNavigationTabIndex=function(e){if(this._oItemNavigation){this._oItemNavigation.iActiveTabIndex=e;this._oItemNavigation.iTabIndex=e}};B.prototype.setKeyboardMode=function(e){this.setProperty("keyboardMode",e,true);if(this.isActive()){var t=e==I.Edit?-1:0;this.$("nodata").prop("tabIndex",~t);this.$("listUl").prop("tabIndex",t);this.$("after").prop("tabIndex",t);this._setItemNavigationTabIndex(t)}return this};B.prototype.setItemFocusable=function(e){if(!this._oItemNavigation){return}var t=this._oItemNavigation.getItemDomRefs();var i=t.indexOf(e.getDomRef());if(i>=0){this._oItemNavigation.setFocusedIndex(i)}};B.prototype.forwardTab=function(e){this._bIgnoreFocusIn=true;this.$(e?"after":"before").trigger("focus")};B.prototype.onsaptabnext=function(e){if(e.isMarked()||this.getKeyboardMode()==I.Edit){return}if(jQuery(this.getDomRef("nodata")).find(":sapTabbable").addBack().get(-1)==e.target){this.forwardTab(true);e.setMarked()}};B.prototype.onsaptabprevious=function(e){if(e.isMarked()||this.getKeyboardMode()==I.Edit){return}var t=e.target.id;if(t==this.getId("nodata")){this.forwardTab(false)}else if(t==this.getId("trigger")){this.focusPrevious();e.preventDefault()}};B.prototype._navToSection=function(e){var t;var i=0;var n=e?1:-1;var o=this._aNavSections.length;this._aNavSections.some(function(e,t){var n=e?window.document.getElementById(e):null;if(n&&n.contains(document.activeElement)){i=t;return true}});var s=this.getItemsContainerDomRef();var r=jQuery(document.getElementById(this._aNavSections[i]));if(r[0]===s&&this._oItemNavigation){r.data("redirect",this._oItemNavigation.getFocusedIndex())}this._aNavSections.some(function(){i=(i+n+o)%o;t=jQuery(document.getElementById(this._aNavSections[i]));if(t[0]===s&&this._oItemNavigation){var e=t.data("redirect");var r=this._oItemNavigation.getItemDomRefs();var a=r[e]||s.children[0];t=jQuery(a)}if(t.is(":focusable")){t.trigger("focus");return true}},this);return t};B.prototype.onsapshow=function(t){if(t.isMarked()||t.which==e.F4||t.target.id!=this.getId("trigger")&&!jQuery(t.target).hasClass(this.sNavItemClass)){return}if(this._navToSection(true)){t.preventDefault();t.setMarked()}};B.prototype.onsaphide=function(e){if(e.isMarked()||e.target.id!=this.getId("trigger")&&!jQuery(e.target).hasClass(this.sNavItemClass)){return}if(this._navToSection(false)){e.preventDefault();e.setMarked()}};B.prototype.onkeydown=function(t){var i=t.which==e.A&&(t.metaKey||t.ctrlKey);if(t.isMarked()||!i||!jQuery(t.target).hasClass(this.sNavItemClass)){return}var n=this.getMultiSelectMode();var o=i&&t.shiftKey&&n==C.ClearAll;if(o){t.preventDefault();t.setMarked();this.removeSelections(false,true);return}t.preventDefault();if(this.getMode()!==w.MultiSelect||n===C.ClearAll){return}if(this.isAllSelectableSelected()){this.removeSelections(false,true)}else{this.selectAll(true)}t.setMarked()};B.prototype.onmousedown=function(e){if(this._bItemNavigationInvalidated){this._startItemNavigation()}if(e.shiftKey&&this._mRangeSelection&&e.srcControl.getId().includes("-selectMulti")){e.preventDefault()}};B.prototype.focusPrevious=function(){if(!this._oItemNavigation){return}var e=this._oItemNavigation.getItemDomRefs();var t=this._oItemNavigation.getFocusedIndex();var i=jQuery(e[t]);var n=o.closestTo(i[0])||{};var s=n.getTabbables?n.getTabbables():i.find(":sapTabbable");var r=s.eq(-1).add(i).eq(-1);this.bAnnounceDetails=true;r.trigger("focus")};B.prototype.onfocusin=function(e){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;e.stopImmediatePropagation(true);return}if(this._bItemNavigationInvalidated){this._startItemNavigation()}var t=e.target;if(t.id==this.getId("nodata")){var i=this.getNoData();var n=i||this.getNoDataText();if(i&&typeof i!=="string"){n=p.getAccessibilityText(i)}this.updateInvisibleText(n,t)}if(e.isMarked()||!this._oItemNavigation||this.getKeyboardMode()==I.Edit||t.id!=this.getId("after")){return}this.focusPrevious();e.setMarked()};B.prototype.onsapfocusleave=function(e){if(this._oItemNavigation&&!this.bAnnounceDetails&&!this.getNavigationRoot().contains(document.activeElement)){this.bAnnounceDetails=true}};B.prototype.onItemArrowUpDown=function(e,t){if(this.getKeyboardMode()!==I.Edit||t.target instanceof HTMLTextAreaElement){return}var i=this.getVisibleItems(true),n=t.type=="sapup"||t.type=="sapupmodifiers"?-1:1,o=i.indexOf(e)+n,s=i[o];if(s&&s.isGroupHeader()){s=i[o+n]}if(!s){return}var r=s.getTabbables(),a=e.getTabbables().index(t.target),l=r.eq(r[a]?a:-1);l[0]?l.trigger("focus"):s.focus();l[0]&&l[0].select&&l[0].select();t.preventDefault();t.setMarked()};B.prototype.onItemContextMenu=function(e,t){var n=this.getContextMenu();if(!n){return}var o=this.fireBeforeOpenContextMenu({listItem:e,column:i.byId(jQuery(t.target).closest(".sapMListTblCell",this.getNavigationRoot()).attr("data-sap-ui-column"))});if(o){t.setMarked();t.preventDefault();var s,r=this.getBindingInfo("items");if(r){s=e.getBindingContext(r.model);n.setBindingContext(s,r.model)}n.openAsContextMenu(t,e)}};B.prototype.onItemUpDownModifiers=function(e,t,i){if(t.srcControl!=e){if(!t.shiftKey&&(t.metaKey||t.ctrlKey)){this.onItemArrowUpDown(e,t)}return}if(!this._mRangeSelection){return}var n=this.getVisibleItems(),o=n.indexOf(e),s=n[o+i];if(!s){if(this._mRangeSelection){this._mRangeSelection=null}t.setMarked();return}var r=s.getSelected();if(this._mRangeSelection.direction===undefined){this._mRangeSelection.direction=i}else if(this._mRangeSelection.direction!==i){if(this._mRangeSelection.index!==n.indexOf(e)){s=e;r=s.getSelected();if(this._mRangeSelection.selected&&r){this.setSelectedItem(s,false,true);return}}else{this._mRangeSelection.direction=i}}if(this._mRangeSelection.selected!==r&&s.isSelectable()){this.setSelectedItem(s,this._mRangeSelection.selected,true)}};B.prototype.isGrouped=function(){var e=this.getBinding("items");return e&&e.isGrouped()};B.prototype.setContextMenu=function(e){this.setAggregation("contextMenu",e,true);return this};B.prototype.destroyContextMenu=function(){this.destroyAggregation("contextMenu",true);return this};B.prototype.getStickyStyleValue=function(){var e=this.getSticky();if(!e||!e.length){this._iStickyValue=0;return this._iStickyValue}var t=0,i=this.getHeaderText(),n=this.getHeaderToolbar(),o=i||n&&n.getVisible(),s=this.getInfoToolbar(),r=s&&s.getVisible(),a=false;if(this.isA("sap.m.Table")){a=this.getColumns().some(function(e){return e.getVisible()&&e.getHeader()})}e.forEach(function(e){if(e===D.HeaderToolbar&&o){t+=1}else if(e===D.InfoToolbar&&r){t+=2}else if(e===D.ColumnHeaders&&a){t+=4}});this._iStickyValue=t;return this._iStickyValue};B.prototype._handleStickyItemFocus=function(e){if(!this._iStickyValue){return}var t=l.getScrollDelegate(this,true);if(!t){return}var i=0,n=0,o=0,s=0,r=0,a=0,u=this.getStickyFocusOffset();if(this._iStickyValue&4){var h=this.getDomRef("tblHeader").firstChild;var d=h.getBoundingClientRect();n=parseInt(d.bottom);i=parseInt(d.height)}if(this._iStickyValue&2){var p=this.getDomRef().querySelector(".sapMListInfoTBarContainer");if(p){var g=p.getBoundingClientRect();s=parseInt(g.bottom);o=parseInt(g.height)}}if(this._iStickyValue&1){var c=this.getDomRef().querySelector(".sapMListHdr");if(c){var f=c.getBoundingClientRect();a=parseInt(f.bottom);r=parseInt(f.height)}}var m=Math.round(e.getBoundingClientRect().top);if(n>m||s>m||a>m){window.requestAnimationFrame(function(){t.scrollToElement(e,0,[0,-i-o-r-u],true)})}};B.prototype.setHeaderToolbar=function(e){return this._setToolbar("headerToolbar",e)};B.prototype.setInfoToolbar=function(e){return this._setToolbar("infoToolbar",e)};B.prototype.scrollToIndex=function(e){return new Promise(function(t,i){var n,o;o=l.getScrollDelegate(this,true);if(!o){return i()}n=x(this,e);if(!n){return i()}setTimeout(function(){try{o.scrollToElement(n.getDomRef(),null,[0,this._getStickyAreaHeight()*-1],true);t()}catch(e){i(e)}}.bind(this),0)}.bind(this))};B.prototype.requestItems=function(e){if(e<=0||!this.getGrowing()||!this._oGrowingDelegate){throw new Error("The prerequisites to use 'requestItems' are not met. Please read the documentation for more details.")}if(e!=null){var t=this.getGrowingThreshold();this.setGrowingThreshold(e);this._oGrowingDelegate.requestNewPage();this.setGrowingThreshold(t)}else{this._oGrowingDelegate.requestNewPage()}};function x(e,t){var i=e.getVisibleItems();var n=i.length;if(typeof t!=="number"||t<-1){t=0}if(t>=n||t===-1){t=n-1}return i[t]}B.prototype._setFocus=function(e,t){return new Promise(function(i,n){var o=x(this,e);if(!o){return n()}if(t===true){var s=o.getTabbables();if(s.length){s[0].focus();return i()}}o.focus();return i()}.bind(this))};B.prototype._getStickyAreaHeight=function(){var e=this.getSticky();if(!(e&&e.length)){return 0}return e.reduce(function(e,t){var i,n;switch(t){case D.HeaderToolbar:i=this.getHeaderToolbar();n=i&&i.getDomRef()||this.getDomRef("header");break;case D.InfoToolbar:i=this.getInfoToolbar();n=i&&i.getDomRef();break;case D.ColumnHeaders:n=this.getDomRef("tblHeader");break;default:}return e+(n?n.offsetHeight:0)}.bind(this),0)};B.prototype._setToolbar=function(e,t){var i=this.getAggregation(e);if(i){i.detachEvent("_change",this._onToolbarPropertyChanged,this)}this.setAggregation(e,t);if(t){t.attachEvent("_change",this._onToolbarPropertyChanged,this)}return this};B.prototype._onToolbarPropertyChanged=function(e){if(e.getParameter("name")!=="visible"){return}var t=this._iStickyValue,i=this.getStickyStyleValue();if(t!==i){var n=this.getDomRef();if(n){var o=n.classList;o.toggle("sapMSticky",!!i);o.remove("sapMSticky"+t);o.toggle("sapMSticky"+i,!!i)}}};B.prototype.getAriaRole=function(){return"list"};B.prototype.enhanceAccessibilityState=function(e,t){if(!e.isA("sap.m.ListItemBase")||e.isGroupHeader()){return}var i=this.getAccessbilityPosition(e);t.posinset=i.posInset;t.setsize=i.setSize};return B});
//# sourceMappingURL=ListBase.js.map