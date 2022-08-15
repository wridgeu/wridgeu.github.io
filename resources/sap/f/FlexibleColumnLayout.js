/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/library","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/core/Control","sap/m/library","sap/m/Button","sap/m/NavContainer","sap/ui/core/Configuration","sap/ui/dom/units/Rem","./FlexibleColumnLayoutRenderer","sap/base/Log","sap/base/assert","sap/base/util/isEmptyObject","sap/base/util/merge","sap/ui/core/InvisibleMessage","sap/ui/dom/jquery/Focusable"],function(e,t,n,i,o,s,r,a,u,l,d,g,m,h,p,C,c){"use strict";var _=t.LayoutType;var f=n.InvisibleMessageMode;var y=s.extend("sap.f.FlexibleColumnLayout",{metadata:{interfaces:["sap.ui.core.IPlaceholderSupport"],properties:{autoFocus:{type:"boolean",group:"Behavior",defaultValue:true},layout:{type:"sap.f.LayoutType",defaultValue:_.OneColumn},defaultTransitionNameBeginColumn:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameMidColumn:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameEndColumn:{type:"string",group:"Appearance",defaultValue:"slide"},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:r.BackgroundDesign.Transparent},restoreFocusOnBackNavigation:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{beginColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getBeginColumn",aggregation:"pages"}},midColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getMidColumn",aggregation:"pages"}},endColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getEndColumn",aggregation:"pages"}},landmarkInfo:{type:"sap.f.FlexibleColumnLayoutAccessibleLandmarkInfo",multiple:false},_beginColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_midColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_endColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_beginColumnBackArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_midColumnForwardArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_midColumnBackArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_endColumnForwardArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{initialBeginColumnPage:{type:"sap.ui.core.Control",multiple:false},initialMidColumnPage:{type:"sap.ui.core.Control",multiple:false},initialEndColumnPage:{type:"sap.ui.core.Control",multiple:false}},events:{stateChange:{parameters:{layout:{type:"sap.f.LayoutType"},maxColumnsCount:{type:"int"},isNavigationArrow:{type:"boolean"},isResize:{type:"boolean"}}},beginColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterBeginColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},midColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterMidColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},endColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterEndColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},columnResize:{parameters:{beginColumn:{type:"boolean"},midColumn:{type:"boolean"},endColumn:{type:"boolean"}}}}}});y.DEFAULT_COLUMN_LABELS={FirstColumn:"FCL_BEGIN_COLUMN_REGION_TEXT",MiddleColumn:"FCL_MID_COLUMN_REGION_TEXT",LastColumn:"FCL_END_COLUMN_REGION_TEXT"};y.DEFAULT_ARROW_LABELS={FirstColumnBackArrow:"FCL_BEGIN_COLUMN_BACK_ARROW",MiddleColumnForwardArrow:"FCL_MID_COLUMN_FORWARD_ARROW",MiddleColumnBackArrow:"FCL_MID_COLUMN_BACK_ARROW",LastColumnForwardArrow:"FCL_END_COLUMN_FORWARD_ARROW"};y.ARROW_AGGREGATION_TO_LABEL_MAP={_beginColumnBackArrow:"FirstColumnBackArrow",_midColumnForwardArrow:"MiddleColumnForwardArrow",_midColumnBackArrow:"MiddleColumnBackArrow",_endColumnForwardArrow:"LastColumnForwardArrow"};y.COLUMN_RESIZING_ANIMATION_DURATION=560;y.PINNED_COLUMN_CLASS_NAME="sapFFCLPinnedColumn";y.COLUMN_ORDER=["begin","mid","end"];y.NAVIGATION_ARROW_WIDTH=d.toPx("1rem");y.prototype.init=function(){this._iWidth=0;this._oColumnFocusInfo={begin:{},mid:{},end:{}};this._initNavContainers();this._initButtons();this._oLayoutHistory=new E;this._oAnimationEndListener=new A;this._oRenderedColumnPagesBoolMap={};this._oColumnWidthInfo={begin:0,mid:0,end:0};this._oInvisibleMessage=null};y.prototype._announceMessage=function(e){var t=y._getResourceBundle().getText(e);if(this._oInvisibleMessage){this._oInvisibleMessage.announce(t,f.Polite)}};y.prototype._onNavContainerRendered=function(e){var t=e.srcControl,n=t.getPages().length>0,i=this._hasAnyColumnPagesRendered();this._setColumnPagesRendered(t.getId(),n);if(this._hasAnyColumnPagesRendered()!==i){this._hideShowArrows()}};y.prototype._createNavContainer=function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);var n=new u(this.getId()+"-"+e+"ColumnNav",{autoFocus:this.getAutoFocus(),navigate:function(t){this._handleNavigationEvent(t,false,e)}.bind(this),afterNavigate:function(t){this._handleNavigationEvent(t,true,e)}.bind(this),defaultTransitionName:this["getDefaultTransitionName"+t+"Column"]()});n.addDelegate({onAfterRendering:this._onNavContainerRendered},this);this["_"+e+"ColumnFocusOutDelegate"]={onfocusout:function(t){this._oColumnFocusInfo[e]=t.target}};n.addEventDelegate(this["_"+e+"ColumnFocusOutDelegate"],this);return n};y.prototype._formatColumnLandmarkInfo=function(e,t){var n=null;if(e){n=e["get"+t+"Label"]()}return{role:"region",label:n||y._getResourceBundle().getText(y.DEFAULT_COLUMN_LABELS[t])}};y.prototype._formatArrowLandmarkInfo=function(e,t){var n=null,i=y.ARROW_AGGREGATION_TO_LABEL_MAP[t];if(e){n=e["get"+i+"Label"]()}this.getAggregation(t).setTooltip(n||y._getResourceBundle().getText(y.DEFAULT_ARROW_LABELS[i]))};y.prototype._handleNavigationEvent=function(e,t,n){var i,o;if(t){i="after"+(n.charAt(0).toUpperCase()+n.slice(1))+"ColumnNavigate"}else{i=n+"ColumnNavigate"}o=this.fireEvent(i,e.mParameters,true);if(!o){e.preventDefault()}};y.prototype._getColumnByStringName=function(e){if(e==="end"){return this._getEndColumn()}else if(e==="mid"){return this._getMidColumn()}else{return this._getBeginColumn()}};y.prototype._getBeginColumn=function(){return this.getAggregation("_beginColumnNav")};y.prototype._getMidColumn=function(){return this.getAggregation("_midColumnNav")};y.prototype._getEndColumn=function(){return this.getAggregation("_endColumnNav")};y.prototype._flushColumnContent=function(e){var t=this.getAggregation("_"+e+"ColumnNav"),n=sap.ui.getCore().createRenderManager();n.renderControl(t);n.flush(this._$columns[e].find(".sapFFCLColumnContent")[0],undefined,true);n.destroy()};y.prototype.setLayout=function(e){e=this.validateProperty("layout",e);var t=this.getLayout();if(t===e){return this}var n=this.setProperty("layout",e,true);this._oLayoutHistory.addEntry(e);this._hideShowArrows();this._resizeColumns();return n};y.prototype.setAutoFocus=function(e){e=this.validateProperty("autoFocus",e);var t=this.getAutoFocus();if(t===e){return this}this._getNavContainers().forEach(function(t){t.setAutoFocus(e)});return this.setProperty("autoFocus",e,true)};y.prototype.onBeforeRendering=function(){if(!this._oInvisibleMessage){this._oInvisibleMessage=c.getInstance()}this._deregisterResizeHandler();this._oAnimationEndListener.cancelAll()};y.prototype.onAfterRendering=function(){this._measureControlWidth();this._registerResizeHandler();this._cacheDOMElements();this._hideShowArrows();this._resizeColumns();this._flushColumnContent("begin");this._flushColumnContent("mid");this._flushColumnContent("end");this._fireStateChange(false,false)};y.prototype._restoreFocusToColumn=function(t){var n=this._oColumnFocusInfo[t];if(!n||p(n)){n=this._getFirstFocusableElement(t)}e(n).trigger("focus")};y.prototype._getFirstFocusableElement=function(e){var t=this._getColumnByStringName(e),n=t.getCurrentPage();if(n){return n.$().firstFocusableDomRef()}return null};y.prototype._isFocusInSomeOfThePreviousColumns=function(){var e=y.COLUMN_ORDER.indexOf(this._sPreviuosLastVisibleColumn)-1,t;for(;e>=0;e--){t=this._getColumnByStringName(y.COLUMN_ORDER[e]);if(t&&t._isFocusInControl(t)){return true}}return false};y.prototype._getControlWidth=function(){if(this._iWidth===0){this._measureControlWidth()}return this._iWidth};y.prototype._measureControlWidth=function(){if(this.$().is(":visible")){this._iWidth=this.$().width()}else{this._iWidth=0}};y.prototype.exit=function(){this._removeNavContainersFocusOutDelegate();this._oRenderedColumnPagesBoolMap=null;this._oColumnFocusInfo=null;this._deregisterResizeHandler();this._handleEvent(e.Event("Destroy"))};y.prototype._removeNavContainersFocusOutDelegate=function(){y.COLUMN_ORDER.forEach(function(e){this._getColumnByStringName(e).removeEventDelegate(this["_"+e+"ColumnFocusOutDelegate"])},this)};y.prototype._registerResizeHandler=function(){h(!this._iResizeHandlerId,"Resize handler already registered");this._iResizeHandlerId=o.register(this,this._onResize.bind(this))};y.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){o.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};y.prototype._initNavContainers=function(){this.setAggregation("_beginColumnNav",this._createNavContainer("begin"),true);this.setAggregation("_midColumnNav",this._createNavContainer("mid"),true);this.setAggregation("_endColumnNav",this._createNavContainer("end"),true)};y.prototype._getNavContainers=function(){return[this._getBeginColumn(),this._getMidColumn(),this._getEndColumn()]};y.prototype._initButtons=function(){var e=new a(this.getId()+"-beginBack",{icon:"sap-icon://slim-arrow-left",type:"Transparent",press:function(){this._onArrowClick("left");this._announceMessage("FCL_MIDDLE_COLUMN_EXPANDED_MESSAGE")}.bind(this)}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonRight");this.setAggregation("_beginColumnBackArrow",e,true);var t=new a(this.getId()+"-midForward",{icon:"sap-icon://slim-arrow-right",type:"Transparent",press:function(){this._onArrowClick("right");this._announceMessage("FCL_FIRST_COLUMN_EXPANDED_MESSAGE")}.bind(this)}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonLeft");this.setAggregation("_midColumnForwardArrow",t,true);var n=new a(this.getId()+"-midBack",{icon:"sap-icon://slim-arrow-left",type:"Transparent",press:function(){this._onArrowClick("left");this._announceMessage("FCL_LAST_COLUMN_EXPANDED_MESSAGE")}.bind(this)}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonRight");this.setAggregation("_midColumnBackArrow",n,true);var i=new a(this.getId()+"-endForward",{icon:"sap-icon://slim-arrow-right",type:"Transparent",press:function(){this._onArrowClick("right");this._announceMessage("FCL_MIDDLE_COLUMN_EXPANDED_MESSAGE")}.bind(this)}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonLeft");this.setAggregation("_endColumnForwardArrow",i,true)};y.prototype._cacheDOMElements=function(){this._cacheColumns();if(!i.system.phone){this._cacheArrows()}};y.prototype._cacheColumns=function(){this._$columns={begin:this.$("beginColumn"),mid:this.$("midColumn"),end:this.$("endColumn")}};y.prototype._cacheArrows=function(){this._oColumnSeparatorArrows={beginBack:this.$("beginBack"),midForward:this.$("midForward"),midBack:this.$("midBack"),endForward:this.$("endForward")}};y.prototype._getVisibleColumnsCount=function(){return y.COLUMN_ORDER.filter(function(e){return this._getColumnSize(e)>0},this).length};y.prototype._getVisibleArrowsCount=function(){if(!this._oColumnSeparatorArrows){return 0}return Object.keys(this._oColumnSeparatorArrows).filter(function(e){return this._oColumnSeparatorArrows[e].data("visible")},this).length};y.prototype._getTotalColumnsWidth=function(e){var t=this._getVisibleArrowsCount();if(e){t++}return this._getControlWidth()-t*y.NAVIGATION_ARROW_WIDTH};y.prototype._resizeColumns=function(){var e,t,n=y.COLUMN_ORDER.slice(),s=sap.ui.getCore().getConfiguration().getRTL(),r=sap.ui.getCore().getConfiguration().getAnimationMode(),a=r!==l.AnimationMode.none&&r!==l.AnimationMode.minimal,u,d,g,m,h,p,c,f={};if(!this.isActive()){return}d=this._getVisibleColumnsCount();if(d===0){return}m=this.getLayout();g=this._getMaxColumnsCountForLayout(m,y.DESKTOP_BREAKPOINT);h=n[g-1];c=this.getRestoreFocusOnBackNavigation()&&this._isNavigatingBackward(h)&&!this._isFocusInSomeOfThePreviousColumns();p=d===3&&m===_.ThreeColumnsEndExpanded;t=this._getTotalColumnsWidth(p);if(a){n.forEach(function(e){var t=this._shouldConcealColumn(g,e),n=this._shouldRevealColumn(g,e===h),i=this._$columns[e];i.toggleClass(y.PINNED_COLUMN_CLASS_NAME,t||n)},this);n.forEach(function(e){f[e]=this._oAnimationEndListener.isWaitingForColumnResizeEnd(this._$columns[e])},this);this._oAnimationEndListener.cancelAll()}n.forEach(function(n){var s=this._$columns[n],r=s.get(0),u,l,d,m,_,y,E;e=this._getColumnSize(n);u=Math.round(t*(e/100));if([100,0].indexOf(e)!==-1){l=e+"%"}else{l=u+"px"}E={previousAnimationCompleted:!f[s],iNewWidth:u,shouldRestoreFocus:c&&n===h,hidden:e===0&&this._oColumnWidthInfo[n]===0};if(a){d=this._shouldRevealColumn(g,n===h);m=this._shouldConcealColumn(g,n);_=d||m;E=C(E,{hasAnimations:true,shouldConcealColumn:m,pinned:_});y=this._canResizeColumnWithAnimation(n,E)}if(!m){s.toggleClass("sapFFCLColumnActive",e>0)}s.toggleClass("sapFFCLColumnInset",p&&n==="mid");s.removeClass("sapFFCLColumnHidden");s.removeClass("sapFFCLColumnOnlyActive");s.removeClass("sapFFCLColumnLastActive");s.removeClass("sapFFCLColumnFirstActive");if(y){o.suspend(r);this._oAnimationEndListener.waitForColumnResizeEnd(s).then(function(){o.resume(r)}).catch(function(){o.resume(r)})}if(!m){s.width(l)}else{this._oAnimationEndListener.waitForAllColumnsResizeEnd().then(function(){s.width(l)}).catch(function(){})}if(y||_){this._oAnimationEndListener.waitForAllColumnsResizeEnd().then(this._afterColumnResize.bind(this,n,E)).catch(function(){})}else{this._afterColumnResize(n,E)}if(!i.system.phone){this._updateColumnContextualSettings(n,u);this._updateColumnCSSClasses(n,u)}},this);u=n.filter(function(e){return this._getColumnSize(e)>0},this);if(s){n.reverse()}if(u.length===1){this._$columns[u[0]].addClass("sapFFCLColumnOnlyActive")}if(u.length>1){this._$columns[u[0]].addClass("sapFFCLColumnFirstActive");this._$columns[u[u.length-1]].addClass("sapFFCLColumnLastActive")}this._storePreviousResizingInfo(g,h)};y.prototype._afterColumnResize=function(e,t){var n=this._$columns[e],i=t.shouldConcealColumn,o=t.iNewWidth,s=t.shouldRestoreFocus;n.toggleClass(y.PINNED_COLUMN_CLASS_NAME,false);if(i){n.removeClass("sapFFCLColumnActive")}n.toggleClass("sapFFCLColumnHidden",o===0);this._cacheColumnWidth(e,o);if(s){this._restoreFocusToColumn(e)}};y.prototype._getColumnWidth=function(e){var t=this._$columns[e].get(0),n=t.style.width,i=parseInt(n),o;if(/px$/.test(n)){return i}o=/%$/.test(n);if(o&&i===100){return this._getControlWidth()}if(o&&i===0){return 0}return t.offsetWidth};y.prototype._cacheColumnWidth=function(e,t){var n;if(this._oColumnWidthInfo[e]!==t){n={};y.COLUMN_ORDER.forEach(function(t){n[t+"Column"]=t===e});this.fireColumnResize(n)}this._oColumnWidthInfo[e]=t};y.prototype._storePreviousResizingInfo=function(e,t){var n=this.getLayout();this._iPreviousVisibleColumnsCount=e;this._bWasFullScreen=n===_.MidColumnFullScreen||n===_.EndColumnFullScreen;this._sPreviuosLastVisibleColumn=t};y.prototype._isNavigatingBackward=function(e){return this._bWasFullScreen||y.COLUMN_ORDER.indexOf(this._sPreviuosLastVisibleColumn)>y.COLUMN_ORDER.indexOf(e)};y.prototype._shouldRevealColumn=function(e,t){return e>this._iPreviousVisibleColumnsCount&&!this._bWasFullScreen&&t};y.prototype._shouldConcealColumn=function(e,t){return e<this._iPreviousVisibleColumnsCount&&t===this._sPreviuosLastVisibleColumn&&!this._bWasFullScreen&&this._getColumnSize(t)===0};y.prototype._canResizeColumnWithAnimation=function(e,t){var n,i,o=t.iNewWidth,s=t.hasAnimations,r=t.pinned,a=t.hidden,u=!t.previousAnimationCompleted;if(!s||r||a){return false}n=this._$columns[e];if(u){return n.width()!==o}i=!n.get(0).style.width;if(i){return false}return this._getColumnWidth(e)!==o};y.prototype._propagateContextualSettings=function(){};y.prototype._updateColumnContextualSettings=function(e,t){var n,i;n=this.getAggregation("_"+e+"ColumnNav");if(!n){return}i=n._getContextualSettings();if(!i||i.contextualWidth!==t){n._applyContextualSettings({contextualWidth:t})}};y.prototype._updateColumnCSSClasses=function(e,t){var n="";this._$columns[e].removeClass("sapUiContainer-Narrow sapUiContainer-Medium sapUiContainer-Wide sapUiContainer-ExtraWide");if(t<i.media._predefinedRangeSets[i.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0]){n="Narrow"}else if(t<i.media._predefinedRangeSets[i.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1]){n="Medium"}else if(t<i.media._predefinedRangeSets[i.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2]){n="Wide"}else{n="ExtraWide"}this._$columns[e].addClass("sapUiContainer-"+n)};y.prototype._getColumnSize=function(e){var t=this.getLayout(),n=this._getColumnWidthDistributionForLayout(t),i=n.split("/"),o={begin:0,mid:1,end:2},s=i[o[e]];return parseInt(s)};y.prototype.getMaxColumnsCount=function(){return this._getMaxColumnsCountForWidth(this._getControlWidth())};y.prototype._getMaxColumnsCountForWidth=function(e){if(e>=y.DESKTOP_BREAKPOINT){return 3}if(e>=y.TABLET_BREAKPOINT&&e<y.DESKTOP_BREAKPOINT){return 2}if(e>0){return 1}return 0};y.prototype._getMaxColumnsCountForLayout=function(e,t){var n=this._getMaxColumnsCountForWidth(t),i=this._getColumnWidthDistributionForLayout(e,false,n),o=i.split("/"),s={begin:0,mid:1,end:2},r,a,u=0;Object.keys(s).forEach(function(e){r=o[s[e]];a=parseInt(r);if(a){u++}});return u};y.prototype._onResize=function(e){var t=e.oldSize.width,n=e.size.width,i,o;this._iWidth=n;if(n===0){return}i=this._getMaxColumnsCountForWidth(t);o=this._getMaxColumnsCountForWidth(n);this._resizeColumns();if(o!==i){this._hideShowArrows();this._fireStateChange(false,true)}};y.prototype._setColumnPagesRendered=function(e,t){this._oRenderedColumnPagesBoolMap[e]=t};y.prototype._hasAnyColumnPagesRendered=function(){return Object.keys(this._oRenderedColumnPagesBoolMap).some(function(e){return this._oRenderedColumnPagesBoolMap[e]},this)};y.prototype._onArrowClick=function(e){var t=this.getLayout(),n=typeof y.SHIFT_TARGETS[t]!=="undefined"&&typeof y.SHIFT_TARGETS[t][e]!=="undefined",i;h(n,"An invalid layout was used for determining arrow behavior");i=n?y.SHIFT_TARGETS[t][e]:_.OneColumn;this.setLayout(i);if(y.ARROWS_NAMES[i][e]!==y.ARROWS_NAMES[t][e]&&n){var o=e==="right"?"left":"right";this._oColumnSeparatorArrows[y.ARROWS_NAMES[i][o]].trigger("focus")}this._fireStateChange(true,false)};y.prototype._hideShowArrows=function(){var e=this.getLayout(),t={},n=[],o,s;if(!this.isActive()||i.system.phone){return}o=this.getMaxColumnsCount();if(o>1){t[_.TwoColumnsBeginExpanded]=["beginBack"];t[_.TwoColumnsMidExpanded]=["midForward"];t[_.ThreeColumnsMidExpanded]=["midForward","midBack"];t[_.ThreeColumnsEndExpanded]=["endForward"];t[_.ThreeColumnsMidExpandedEndHidden]=["midForward","midBack"];t[_.ThreeColumnsBeginExpandedEndHidden]=["beginBack"];if(typeof t[e]==="object"){n=t[e]}}s=this._hasAnyColumnPagesRendered();Object.keys(this._oColumnSeparatorArrows).forEach(function(e){this._toggleButton(e,n.indexOf(e)!==-1,s)},this)};y.prototype._toggleButton=function(e,t,n){this._oColumnSeparatorArrows[e].toggle(t&&n);this._oColumnSeparatorArrows[e].data("visible",t)};y.prototype._fireStateChange=function(e,t){if(this._getControlWidth()===0){return}this.fireStateChange({isNavigationArrow:e,isResize:t,layout:this.getLayout(),maxColumnsCount:this.getMaxColumnsCount()})};y.prototype.setInitialBeginColumnPage=function(e){this._getBeginColumn().setInitialPage(e);this.setAssociation("initialBeginColumnPage",e,true);return this};y.prototype.setInitialMidColumnPage=function(e){this._getMidColumn().setInitialPage(e);this.setAssociation("initialMidColumnPage",e,true);return this};y.prototype.setInitialEndColumnPage=function(e){this._getEndColumn().setInitialPage(e);this.setAssociation("initialEndColumnPage",e,true);return this};y.prototype.to=function(e,t,n,i){if(this._getBeginColumn().getPage(e)){this._getBeginColumn().to(e,t,n,i)}else if(this._getMidColumn().getPage(e)){this._getMidColumn().to(e,t,n,i)}else{this._getEndColumn().to(e,t,n,i)}return this};y.prototype.backToPage=function(e,t,n){if(this._getBeginColumn().getPage(e)){this._getBeginColumn().backToPage(e,t,n)}else if(this._getMidColumn().getPage(e)){this._getMidColumn().backToPage(e,t,n)}else{this._getEndColumn().backToPage(e,t,n)}return this};y.prototype._safeBackToPage=function(e,t,n,i){if(this._getBeginColumn().getPage(e)){this._getBeginColumn()._safeBackToPage(e,t,n,i)}else if(this._getMidColumn().getPage(e)){this._getMidColumn()._safeBackToPage(e,t,n,i)}else{this._getEndColumn()._safeBackToPage(e,t,n,i)}};y.prototype.toBeginColumnPage=function(e,t,n,i){this._getBeginColumn().to(e,t,n,i);return this};y.prototype.toMidColumnPage=function(e,t,n,i){this._getMidColumn().to(e,t,n,i);return this};y.prototype.toEndColumnPage=function(e,t,n,i){this._getEndColumn().to(e,t,n,i);return this};y.prototype.backBeginColumn=function(e,t){return this._getBeginColumn().back(e,t)};y.prototype.backMidColumn=function(e,t){return this._getMidColumn().back(e,t)};y.prototype.backEndColumn=function(e,t){return this._getEndColumn().back(e,t)};y.prototype.backBeginColumnToPage=function(e,t,n){return this._getBeginColumn().backToPage(e,t,n)};y.prototype.backMidColumnToPage=function(e,t,n){return this._getMidColumn().backToPage(e,t,n)};y.prototype.backEndColumnToPage=function(e,t,n){return this._getEndColumn().backToPage(e,t,n)};y.prototype.backToTopBeginColumn=function(e,t){this._getBeginColumn().backToTop(e,t);return this};y.prototype.backToTopMidColumn=function(e,t){this._getMidColumn().backToTop(e,t);return this};y.prototype.backToTopEndColumn=function(e,t){this._getEndColumn().backToTop(e,t);return this};y.prototype.getCurrentBeginColumnPage=function(){return this._getBeginColumn().getCurrentPage()};y.prototype.getCurrentMidColumnPage=function(){return this._getMidColumn().getCurrentPage()};y.prototype.getCurrentEndColumnPage=function(){return this._getEndColumn().getCurrentPage()};y.prototype.setDefaultTransitionNameBeginColumn=function(e){this.setProperty("defaultTransitionNameBeginColumn",e,true);this._getBeginColumn().setDefaultTransitionName(e);return this};y.prototype.setDefaultTransitionNameMidColumn=function(e){this.setProperty("defaultTransitionNameMidColumn",e,true);this._getMidColumn().setDefaultTransitionName(e);return this};y.prototype.setDefaultTransitionNameEndColumn=function(e){this.setProperty("defaultTransitionNameEndColumn",e,true);this._getEndColumn().setDefaultTransitionName(e);return this};y.prototype._getLayoutHistory=function(){return this._oLayoutHistory};y.prototype._getColumnWidthDistributionForLayout=function(e,t,n){var i={},o;n||(n=this.getMaxColumnsCount());if(n===0){o="0/0/0"}else{i[_.OneColumn]="100/0/0";i[_.MidColumnFullScreen]="0/100/0";i[_.EndColumnFullScreen]="0/0/100";if(n===1){i[_.TwoColumnsBeginExpanded]="0/100/0";i[_.TwoColumnsMidExpanded]="0/100/0";i[_.ThreeColumnsMidExpanded]="0/0/100";i[_.ThreeColumnsEndExpanded]="0/0/100";i[_.ThreeColumnsMidExpandedEndHidden]="0/0/100";i[_.ThreeColumnsBeginExpandedEndHidden]="0/0/100"}else{i[_.TwoColumnsBeginExpanded]="67/33/0";i[_.TwoColumnsMidExpanded]="33/67/0";i[_.ThreeColumnsMidExpanded]=n===2?"0/67/33":"25/50/25";i[_.ThreeColumnsEndExpanded]=n===2?"0/33/67":"25/25/50";i[_.ThreeColumnsMidExpandedEndHidden]="33/67/0";i[_.ThreeColumnsBeginExpandedEndHidden]="67/33/0"}o=i[e]}if(t){o=o.split("/").map(function(e){return parseInt(e)})}return o};y.DESKTOP_BREAKPOINT=1280;y.TABLET_BREAKPOINT=960;y.ARROWS_NAMES={TwoColumnsBeginExpanded:{left:"beginBack"},TwoColumnsMidExpanded:{right:"midForward"},ThreeColumnsMidExpanded:{left:"midBack",right:"midForward"},ThreeColumnsEndExpanded:{right:"endForward"},ThreeColumnsMidExpandedEndHidden:{left:"midBack",right:"midForward"},ThreeColumnsBeginExpandedEndHidden:{left:"beginBack"}};y._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f")};y.SHIFT_TARGETS={TwoColumnsBeginExpanded:{left:_.TwoColumnsMidExpanded},TwoColumnsMidExpanded:{right:_.TwoColumnsBeginExpanded},ThreeColumnsMidExpanded:{left:_.ThreeColumnsEndExpanded,right:_.ThreeColumnsMidExpandedEndHidden},ThreeColumnsEndExpanded:{right:_.ThreeColumnsMidExpanded},ThreeColumnsMidExpandedEndHidden:{left:_.ThreeColumnsMidExpanded,right:_.ThreeColumnsBeginExpandedEndHidden},ThreeColumnsBeginExpandedEndHidden:{left:_.ThreeColumnsMidExpandedEndHidden}};y.prototype.showPlaceholder=function(e){if(!sap.ui.getCore().getConfiguration().getPlaceholder()){return}switch(e&&e.aggregation){case"beginColumnPages":return this.getAggregation("_beginColumnNav").showPlaceholder(e);case"midColumnPages":return this.getAggregation("_midColumnNav").showPlaceholder(e);default:return this.getAggregation("_endColumnNav").showPlaceholder(e)}};y.prototype.hidePlaceholder=function(e){switch(e.aggregation){case"beginColumnPages":this.getAggregation("_beginColumnNav").hidePlaceholder(e);break;case"midColumnPages":this.getAggregation("_midColumnNav").hidePlaceholder(e);break;default:this.getAggregation("_endColumnNav").hidePlaceholder(e)}};y.prototype.needPlaceholder=function(e,t){var n;switch(e){case"beginColumnPages":n=this.getAggregation("_beginColumnNav");break;case"midColumnPages":n=this.getAggregation("_midColumnNav");break;default:n=this.getAggregation("_endColumnNav")}return!t||n.getCurrentPage()!==t};function E(){this._aLayoutHistory=[]}E.prototype.addEntry=function(e){if(typeof e!=="undefined"){this._aLayoutHistory.push(e)}};E.prototype.getClosestEntryThatMatches=function(e){var t;for(t=this._aLayoutHistory.length-1;t>=0;t--){if(e.indexOf(this._aLayoutHistory[t])!==-1){return this._aLayoutHistory[t]}}};function A(){this._oListeners={};this._aPendingPromises=[];this._oPendingPromises={};this._oCancelPromises={};this._oPendingPromiseAll=null}A.prototype.waitForColumnResizeEnd=function(e){var t=e.get(0).id,n;if(!this._oPendingPromises[t]){n=new Promise(function(n,i){m.debug("FlexibleColumnLayout","wait for column "+t+" to resize");this._attachTransitionEnd(e,function(){m.debug("FlexibleColumnLayout","completed column "+t+" resize");this._cleanUp(e);n()}.bind(this));this._oCancelPromises[t]={cancel:function(){m.debug("FlexibleColumnLayout","cancel column "+t+" resize");this._cleanUp(e);i()}.bind(this)}}.bind(this));this._aPendingPromises.push(n);this._oPendingPromises[t]=n}return this._oPendingPromises[t]};A.prototype.waitForAllColumnsResizeEnd=function(){if(!this._oPendingPromiseAll){this._oPendingPromiseAll=new Promise(function(e,t){this.iTimer=setTimeout(function(){Promise.all(this._aPendingPromises).then(function(){m.debug("FlexibleColumnLayout","completed all columns resize");e()},0).catch(function(){t()});this.iTimer=null}.bind(this))}.bind(this))}return this._oPendingPromiseAll};A.prototype.isWaitingForColumnResizeEnd=function(e){var t=e.get(0).id;return!!this._oListeners[t]};A.prototype.cancelAll=function(){Object.keys(this._oCancelPromises).forEach(function(e){this._oCancelPromises[e].cancel()},this);this._oPendingPromises={};this._aPendingPromises=[];this._oCancelPromises={};this._oPendingPromiseAll=null;if(this.iTimer){clearTimeout(this.iTimer);this.iTimer=null}m.debug("FlexibleColumnLayout","detached all listeners for columns resize")};A.prototype._attachTransitionEnd=function(e,t){var n=e.get(0).id;if(!this._oListeners[n]){e.on("webkitTransitionEnd transitionend",t);this._oListeners[n]=t}};A.prototype._detachTransitionEnd=function(e){var t=e.get(0).id;if(this._oListeners[t]){e.off("webkitTransitionEnd transitionend",this._oListeners[t]);this._oListeners[t]=null}};A.prototype._cleanUp=function(e){if(e.length){var t=e.get(0).id;this._detachTransitionEnd(e);delete this._oPendingPromises[t];delete this._oCancelPromises[t]}};return y});