/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/m/Button","sap/m/List","sap/m/StandardListItem","sap/m/ResponsivePopover","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/delegate/ScrollEnablement","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/ResizeHandler","./TokenizerRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/core/EnabledPropagator","sap/ui/core/theming/Parameters","sap/ui/dom/jquery/scrollLeftRTL"],function(e,t,o,i,n,s,r,a,l,d,p,h,u,c,f,g,T,k){"use strict";var _="sapUiNoContentPadding";var y=e.TokenizerRenderMode;var m=e.PlacementType;var v=e.ListMode;var S=e.ButtonType;var b=r.extend("sap.m.Tokenizer",{metadata:{library:"sap.m",properties:{editable:{type:"boolean",group:"Misc",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},renderMode:{type:"string",group:"Misc",defaultValue:y.Loose},hiddenTokensCount:{type:"int",group:"Misc",defaultValue:0,visibility:"hidden"}},defaultAggregation:"tokens",aggregations:{tokens:{type:"sap.m.Token",multiple:true,singularName:"token"},_tokensInfo:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tokenChange:{deprecated:true,parameters:{type:{type:"string"},token:{type:"sap.m.Token"},tokens:{type:"sap.m.Token[]"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}},tokenUpdate:{deprecated:true,allowPreventDefault:true,parameters:{type:{type:"string"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}},tokenDelete:{parameters:{tokens:{type:"sap.m.Token[]"},keyCode:{type:"number"}}}}},renderer:u});var R=s.getLibraryResourceBundle("sap.m");T.apply(b.prototype,[true]);b.prototype.init=function(){this.allowTextSelection(false);this._oTokensWidthMap={};this._oIndicator=null;this._bShouldRenderTabIndex=null;this._oScroller=new l(this,this.getId()+"-scrollContainer",{horizontal:true,vertical:false,nonTouchScrolling:true});this._fFontSizeRatio=1;if(s.getConfiguration().getAccessibility()){var e=new p({text:R.getText("TOKENIZER_ARIA_NO_TOKENS")});this.setAggregation("_tokensInfo",e)}this.attachEvent("delete",function(e){var t=e.getSource();var o=this.getSelectedTokens();this.fireTokenChange({type:b.TokenChangeType.Removed,token:t,tokens:o.length?o:[t],addedTokens:[],removedTokens:o.length?o:[t]});this.fireTokenUpdate({type:b.TokenChangeType.Removed,addedTokens:[],removedTokens:o.length?o:[t]});this.fireEvent("tokenDelete",{tokens:[t]});e.cancelBubble()},this)};b.prototype._handleNMoreIndicatorPress=function(){this._togglePopup(this.getTokensPopup())};b.prototype._getTokensList=function(){if(!this._oTokensList){this._oTokensList=new o({width:"auto",mode:v.Delete}).attachDelete(this._handleListItemDelete,this)}return this._oTokensList};b.prototype._setPopoverMode=function(e){var t={},o=this.getTokensPopup();switch(e){case v.Delete:t={showArrow:false,placement:m.VerticalPreferredBottom};break;default:t={showArrow:true,placement:m.Auto};break}o.setShowArrow(t.showArrow);o.setPlacement(t.placement);this._getTokensList().setMode(e)};b.prototype._fillTokensList=function(e,t){e.destroyItems();t=t?t:function(){return true};this.getTokens().filter(t).forEach(function(t){e.addItem(this._mapTokenToListItem(t))},this)};b.prototype._handleListItemDelete=function(e){var t=e.getParameter("listItem");var o=t&&t.data("tokenId");var i;i=this.getTokens().filter(function(e){return e.getId()===o&&e.getEditable()})[0];if(i){this.fireTokenUpdate({addedTokens:[],removedTokens:[i],type:b.TokenUpdateType.Removed});this.fireTokenDelete({tokens:[i]});this._adjustTokensVisibility()}};b.prototype.getTokensPopup=function(){if(this._oPopup){return this._oPopup}this._oPopup=new n({showArrow:false,showHeader:d.system.phone,placement:m.Auto,offsetX:0,offsetY:3,horizontalScrolling:false,title:this._getDialogTitle(),content:this._getTokensList()}).attachBeforeOpen(function(){var e=this.getEditable()?120:32,t=this._oPopup,o=function(){var e=this.getDomRef()&&this.getDomRef().parentElement;var t="Cozy";if(!e){return t}if(e.closest(".sapUiSizeCompact")!==null||document.body.classList.contains("sapUiSizeCompact")){t="Compact"}return t}.bind(this),i=new Promise(function(e){k.get({name:["_sap_m_Tokenizer_FontSizeRatio"+o()],callback:function(t){var o=parseFloat(t);if(isNaN(o)){e(this._fFontSizeRatio);return}e(o)}.bind(this)})}.bind(this));if(t.getContent&&!t.getContent().length){t.addContent(this._getTokensList())}this._fillTokensList(this._getTokensList());e+=Object.keys(this._oTokensWidthMap).map(function(e){return this._oTokensWidthMap[e]},this).sort(function(e,t){return e-t}).pop()||0;i.then(function(o){e+=Math.ceil(e*(1-o));t.setContentWidth(e+"px")})},this);this.addDependent(this._oPopup);this._oPopup.addStyleClass(_);this._oPopup.addStyleClass("sapMTokenizerTokensPopup");if(d.system.phone){this._oPopup.setEndButton(new t({text:R.getText("SUGGESTIONSPOPOVER_CLOSE_BUTTON"),type:S.Emphasized,press:function(){this._oPopup.close()}.bind(this)}))}return this._oPopup};b.prototype._getDialogTitle=function(){var e=s.getLibraryResourceBundle("sap.m");var t=this.getAriaLabelledBy().map(function(e){return s.byId(e)});return t.length?t[0].getText():e.getText("COMBOBOX_PICKER_TITLE")};b.prototype._togglePopup=function(e){var t,o=this.getDomRef(),i=e.isOpen(),n=this.getEditable();this._setPopoverMode(n?v.Delete:v.None);if(i){e.close()}else{t=n||this.hasOneTruncatedToken()?o:this._oIndicator[0];t=t&&t.className.indexOf("sapUiHidden")===-1?t:o;e.openBy(t||o)}};b.prototype._mapTokenToListItem=function(e){if(!e){return null}var t=new i({selected:true}).data("tokenId",e.getId());t.setTitle(e.getText());return t};b.prototype._getPixelWidth=function(){var e=this.getMaxWidth(),t,o=this.getDomRef(),i;if(!o){return}i=parseInt(this.$().css("padding-left"));if(e.indexOf("px")===-1){t=o.clientWidth}else{t=parseInt(this.getMaxWidth())}return t-i};b.prototype._adjustTokensVisibility=function(){if(!this.getDomRef()){return}var e=this._getPixelWidth(),t=this._getVisibleTokens().reverse(),o=t.length,i,n,s,r=-1;t.some(function(t,o){e=e-this._oTokensWidthMap[t.getId()];if(e<0){r=o;return true}else{n=e}},this);if(o===1&&r!==-1){this.setFirstTokenTruncated(true);return}else if(o===1&&t[0].getTruncated()){this.setFirstTokenTruncated(false)}if(r>-1){for(s=0;s<o;s++){if(s>=r){t[s].addStyleClass("sapMHiddenToken")}else{t[s].removeStyleClass("sapMHiddenToken")}}this._handleNMoreIndicator(o-r);i=this._oIndicator.width();if(i>=n){r=r-1;this._handleNMoreIndicator(o-r);t[r].addStyleClass("sapMHiddenToken")}this._setHiddenTokensCount(o-r)}else{this._setHiddenTokensCount(0);this._showAllTokens()}};b.prototype.setFirstTokenTruncated=function(e){var t=this.getTokens()[0];t&&t.setTruncated(e);if(e){this.addStyleClass("sapMTokenizerOneLongToken")}else{this.removeStyleClass("sapMTokenizerOneLongToken");this.scrollToEnd()}return this};b.prototype.hasOneTruncatedToken=function(){return this.getTokens().length===1&&this.getTokens()[0].getTruncated()};b.prototype._handleNMoreIndicator=function(e){if(!this.getDomRef()){return this}if(e){var t="MULTIINPUT_SHOW_MORE_TOKENS";if(e===this._getVisibleTokens().length){if(e===1){t="TOKENIZER_SHOW_ALL_ITEM"}else{t="TOKENIZER_SHOW_ALL_ITEMS"}}this._oIndicator.html(R.getText(t,e))}return this};b.prototype._getVisibleTokens=function(){return this.getTokens().filter(function(e){return e.getVisible()})};b.prototype._showAllTokens=function(){this._getVisibleTokens().forEach(function(e){e.removeStyleClass("sapMHiddenToken")})};b.prototype.getScrollDelegate=function(){return this._oScroller};b.prototype.scrollToEnd=function(){var e=this.getDomRef(),t=s.getConfiguration().getRTL(),o,i;if(!this.getDomRef()){return}i=this.$().find(".sapMTokenizerScrollContainer")[0];o=i.scrollWidth;if(t){o*=-1}e.scrollLeft=o};b.prototype._registerResizeHandler=function(){if(!this._sResizeHandlerId){this._sResizeHandlerId=h.register(this.getDomRef(),this._handleResize.bind(this))}};b.prototype._handleResize=function(){this._useCollapsedMode(this.getRenderMode());this.scrollToEnd()};b.prototype.setPixelWidth=function(e){if(typeof e!=="number"){g.warning("Tokenizer.setPixelWidth called with invalid parameter. Expected parameter of type number.");return}this.setWidth(e+"px");if(this._oScroller){this._oScroller.refresh()}};b.prototype.scrollToStart=function(){var e=this.getDomRef();if(!e){return}e.scrollLeft=0};b.prototype.getScrollWidth=function(){if(!this.getDomRef()){return 0}return this.$().children(".sapMTokenizerScrollContainer")[0].scrollWidth};b.prototype.onBeforeRendering=function(){var e=this.getTokens();if(e.length!==1){this.setFirstTokenTruncated(false)}e.forEach(function(t,o){t.setProperty("editableParent",this.getEditable()&&this.getEnabled(),true);t.setProperty("posinset",o+1,true);t.setProperty("setsize",e.length,true)},this);this._setTokensAria()};b.prototype.onAfterRendering=function(){var e=this.getRenderMode();this._oIndicator=this.$().find(".sapMTokenizerIndicator");if(s.isThemeApplied()){this._storeTokensSizes()}this._useCollapsedMode(e);this._registerResizeHandler();if(e===y.Loose){this.scrollToEnd()}};b.prototype.onThemeChanged=function(){this._storeTokensSizes();this._useCollapsedMode(this.getRenderMode())};b.prototype._storeTokensSizes=function(){var e=this.getTokens();e.forEach(function(e){if(e.getDomRef()&&!e.$().hasClass("sapMHiddenToken")&&!e.getTruncated()){this._oTokensWidthMap[e.getId()]=e.$().outerWidth(true)}},this)};b.prototype._useCollapsedMode=function(e){var t=this._getVisibleTokens();if(!t.length){this._setHiddenTokensCount(0);return}if(e===y.Narrow){this._adjustTokensVisibility()}else{this._setHiddenTokensCount(0);this._showAllTokens()}};b.prototype.onsapfocusleave=function(e){if(document.activeElement===this.getDomRef()||!this._checkFocus()){this._changeAllTokensSelection(false);this._oSelectionOrigin=null}};b.prototype.onsapbackspace=function(e){var t=this.getSelectedTokens();var o=this.getTokens().filter(function(e){return e.getFocusDomRef()===document.activeElement})[0];var i=t.length?t:[o];e.preventDefault();return this.fireTokenDelete({tokens:i,keyCode:e.which})};b.prototype.onsapdelete=b.prototype.onsapbackspace;b.prototype.onkeydown=function(e){var t;if(!this.getEnabled()){return}if(e.which===f.TAB){this._changeAllTokensSelection(false)}if((e.ctrlKey||e.metaKey)&&e.which===f.A){t=this.getSelectedTokens().length<this._getVisibleTokens().length;if(this._getVisibleTokens().length>0){this.focus();this._changeAllTokensSelection(t);e.preventDefault();e.stopPropagation()}}if((e.ctrlKey||e.metaKey)&&(e.which===f.C||e.which===f.INSERT)){this._copy()}if((e.ctrlKey||e.metaKey)&&e.which===f.X||e.shiftKey&&e.which===f.DELETE){if(this.getEditable()){this._cut()}else{this._copy()}}};b.prototype._shouldPreventModifier=function(e){var t=d.os.macintosh&&e.metaKey;var o=d.os.windows&&e.altKey;return t||o};b.prototype.onsappreviousmodifiers=function(e){if(!this._shouldPreventModifier(e)){this.onsapprevious(e)}};b.prototype.onsapnextmodifiers=function(e){if(!this._shouldPreventModifier(e)){this.onsapnext(e)}};b.prototype.onsaphomemodifiers=function(e){this._selectRange(false)};b.prototype.onsapendmodifiers=function(e){this._selectRange(true)};b.prototype._selectRange=function(e){var t={},o=this._getVisibleTokens(),i=a.closestTo(document.activeElement),n=o.indexOf(i);if(!i||!i.isA("sap.m.Token")){return}if(e){t.start=n;t.end=o.length-1}else{t.start=0;t.end=n}if(t.start<t.end){for(var s=t.start;s<=t.end;s++){o[s].setSelected(true)}}};b.prototype._copy=function(){this._fillClipboard("copy")};b.prototype._fillClipboard=function(e){var t=this.getSelectedTokens();var o=t.map(function(e){return e.getText()}).join("\r\n");var i=function(e){if(e.clipboardData){e.clipboardData.setData("text/plain",o)}else{e.originalEvent.clipboardData.setData("text/plain",o)}e.preventDefault()};document.addEventListener(e,i);document.execCommand(e);document.removeEventListener(e,i)};b.prototype._cut=function(){var e=this.getSelectedTokens();this._fillClipboard("cut");this.fireTokenChange({type:b.TokenChangeType.Removed,token:e,tokens:e,addedTokens:[],removedTokens:e});this.fireTokenUpdate({type:b.TokenChangeType.Removed,addedTokens:[],removedTokens:e});this.fireTokenDelete({tokens:e})};b.prototype._ensureTokenVisible=function(e){if(!e||!e.getDomRef()||!this.getDomRef()){return}var t=this.$().offset().left,o=this.$().width(),i=e.$().offset().left,n=s.getConfiguration().getRTL(),r=n?parseInt(e.$().css("margin-left")):parseInt(e.$().css("margin-right")),a=parseInt(e.$().css("border-left-width"))+parseInt(e.$().css("border-right-width")),l=e.$().width()+r+a,d=n?this.$().scrollLeftRTL():this.$().scrollLeft(),p=d-t+i,h=d+(i-t+l-o);if(this._getVisibleTokens().indexOf(e)===0){this.$().scrollLeft(0);return}if(i<t){n?this.$().scrollLeftRTL(p):this.$().scrollLeft(p)}if(i-t+l>o){n?this.$().scrollLeftRTL(h):this.$().scrollLeft(h)}};b.prototype.ontap=function(e){var t=e.shiftKey,o=e.ctrlKey||e.metaKey,i=e.getMark("tokenTap"),n=e.getMark("tokenDeletePress"),s=this._getVisibleTokens(),r,a,l,d,p;if(n||!i||!t&&o){this._oSelectionOrigin=null;return}if(!t){this._oSelectionOrigin=i;this._changeAllTokensSelection(false,i,true)}r=i;if(this._oSelectionOrigin){r=this._oSelectionOrigin}else{this._oSelectionOrigin=r}if(i&&this.hasOneTruncatedToken()){this._handleNMoreIndicatorPress();return}a=this.indexOfToken(r);l=this.indexOfToken(i);d=Math.min(a,l);p=Math.max(a,l);s.forEach(function(e,t){if(t>=d&&t<=p){e.setSelected(true)}else if(!o){e.setSelected(false)}})};b.prototype.onsapprevious=function(e){var t=this._getVisibleTokens(),o=t.length;if(o===0){return}var i=a.closestTo(document.activeElement);var n=i?t.indexOf(i):-1;if(n===0){e.setMarked("forwardFocusToParent");return}var s,r;if(n>0){s=t[n-1];this._ensureTokenVisible(s);s.focus()}else{s=t[t.length-1];this._ensureTokenVisible(s);s.focus({preventScroll:true})}if(e.shiftKey){r=t[n];s.setSelected(true);r.setSelected(true)}e.setMarked();e.preventDefault()};b.prototype.onsapnext=function(e){var t=this._getVisibleTokens(),o=t.length;if(o===0){return}var i=a.closestTo(document.activeElement);var n=i?t.indexOf(i):-1;var s=t[n+1];this._ensureTokenVisible(s);if(n<o-1){var r=t[n];s.focus();if(e.shiftKey){s.setSelected(true);r.setSelected(true)}}else{e.setMarked("forwardFocusToParent");return}e.setMarked();e.preventDefault()};b.prototype.addValidator=function(e){g.warning("[Warning]:","You are attempting to use deprecated method 'addValidator()', please use MultiInput.prototype.addValidator instead.",this)};b.prototype.removeValidator=function(e){g.warning("[Warning]:","You are attempting to use deprecated method 'addValidator()', please use MultiInput.prototype.addValidator instead.",this)};b.prototype.removeAllValidators=function(){g.warning("[Warning]:","You are attempting to use deprecated method 'addValidator()', please use MultiInput.prototype.addValidator instead.",this)};b.prototype.addValidateToken=function(e){g.warning("[Warning]:","You are attempting to use deprecated method 'addValidator()', please use MultiInput.prototype.addValidator instead.",this)};b.prototype._parseString=function(e){return e.split(/\r\n|\r|\n/g)};b.prototype._checkFocus=function(){return this.getDomRef()&&c(this.getDomRef(),document.activeElement)};b.prototype.selectAllTokens=function(e){if(e===undefined){e=true}this._changeAllTokensSelection(e);return this};b.prototype._changeAllTokensSelection=function(e,t,o){var i=this._getVisibleTokens();i.filter(function(e){return e!==t}).forEach(function(t){t.setSelected(e)});if(!o){this._doSelect()}return this};b.prototype.getSelectedTokens=function(){return this._getVisibleTokens().filter(function(e){return e.getSelected()})};b.prototype.onsaphome=function(e){var t=this.getTokens().filter(function(e){return e.getDomRef()&&!e.getDomRef().classList.contains("sapMHiddenToken")});t.length&&t[0].focus();this.scrollToStart();e.preventDefault()};b.prototype.onsapend=function(e){var t=this._getVisibleTokens(),o=t[t.length-1];if(o.getDomRef()!==document.activeElement){o.focus();this.scrollToEnd();e.stopPropagation()}else{e.setMarked("forwardFocusToParent")}e.preventDefault()};b.prototype.setShouldRenderTabIndex=function(e){this._bShouldRenderTabIndex=e};b.prototype.getEffectiveTabIndex=function(){return this._bShouldRenderTabIndex===null?!!this.getTokens().length:this._bShouldRenderTabIndex};b.prototype.onclick=function(e){var t;if(!this.getEnabled()){return}t=!this.hasStyleClass("sapMTokenizerIndicatorDisabled")&&e.target.classList.contains("sapMTokenizerIndicator");if(t){this._handleNMoreIndicatorPress()}};b.prototype.ontouchstart=function(e){e.setMarked();if(d.browser.chrome&&window.getSelection()){window.getSelection().removeAllRanges()}};b.prototype.exit=function(){this._deregisterResizeHandler();if(this._oTokensList){this._oTokensList.destroy();this._oTokensList=null}if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._oPopup){this._oPopup.destroy();this._oPopup=null}this._oTokensWidthMap=null;this._oIndicator=null;this._aTokenValidators=null;this._bShouldRenderTabIndex=null};b.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){h.deregister(this._sResizeHandlerId);delete this._sResizeHandlerId}};b.prototype._setTokensAria=function(){var e=this._getVisibleTokens().length;var t;var o="";var i="";var n={0:"TOKENIZER_ARIA_NO_TOKENS",1:"TOKENIZER_ARIA_CONTAIN_ONE_TOKEN"};if(s.getConfiguration().getAccessibility()){t=this.getAggregation("_tokensInfo");i=n[e]?n[e]:"TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS";o=R.getText(i,e);t.setText(o)}};b.prototype._doSelect=function(){if(this._checkFocus()&&this._bCopyToClipboardSupport){var e=document.activeElement;var t=window.getSelection();t.removeAllRanges();if(this.getSelectedTokens().length){var o=document.createRange();o.selectNodeContents(this.getDomRef("clip"));t.addRange(o)}if(window.clipboardData&&e.id===this.getId()+"-clip"&&this.getDomRef()){this.getDomRef().focus()}}};b.prototype._setHiddenTokensCount=function(e){e=this.validateProperty("hiddenTokensCount",e);return this.setProperty("hiddenTokensCount",e)};b.prototype.getHiddenTokensCount=function(){return this.getProperty("hiddenTokensCount")};b.prototype.getTokensInfoId=function(){return this.getAggregation("_tokensInfo").getId()};b.prototype._handleBackspace=function(e,t){var o=this.getTokens();if(o[e-1]){return o[e-1].focus()}return t()};b.prototype._handleDelete=function(e,t){var o=this.getTokens();if(o[e+1]){return o[e+1].focus()}return t()};b.prototype.focusToken=function(e,t,o){var i=this.getTokens();var n=t.keyCode;var s=t.keyCode===f.BACKSPACE;if(i.length===0){return}if(!n){return}if(s){return this._handleBackspace(e,o)}return this._handleDelete(e,o)};b.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};b.TokenUpdateType={Added:"added",Removed:"removed"};return b});
//# sourceMappingURL=Tokenizer.js.map