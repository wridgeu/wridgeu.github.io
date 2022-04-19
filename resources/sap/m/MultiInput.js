/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Input","./Tokenizer","./Token","./library","sap/ui/core/EnabledPropagator","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectMetadata","sap/ui/base/ManagedObjectObserver","sap/ui/Device","./Popover","./List","./Title","./Bar","./Toolbar","./StandardListItem","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","./MultiInputRenderer","sap/ui/dom/containsOrEquals","sap/m/inputUtils/completeTextSelected","sap/ui/events/KeyCodes","sap/ui/core/InvisibleText","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/control"],function(e,t,i,o,n,s,r,a,g,l,p,u,h,d,f,c,k,T,y,_,v,b,m){"use strict";var I=o.TokenizerRenderMode;var V=e.extend("sap.m.MultiInput",{metadata:{interfaces:["sap.ui.core.ISemanticFormContent"],library:"sap.m",designtime:"sap/m/designtime/MultiInput.designtime",properties:{enableMultiLineMode:{type:"boolean",group:"Behavior",defaultValue:false,deprecated:true},maxTokens:{type:"int",group:"Behavior"},_semanticFormValue:{type:"string",group:"Behavior",defaultValue:"",visibility:"hidden"}},aggregations:{tokens:{type:"sap.m.Token",multiple:true,singularName:"token"},tokenizer:{type:"sap.m.Tokenizer",multiple:false,visibility:"hidden"}},events:{tokenChange:{parameters:{type:{type:"string"},token:{type:"sap.m.Token"},tokens:{type:"sap.m.Token[]"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}},deprecated:true},tokenUpdate:{allowPreventDefault:true,parameters:{type:{type:"string"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}}},dnd:{draggable:false,droppable:true}}});n.apply(V.prototype,[true]);var P=sap.ui.getCore().getLibraryResourceBundle("sap.m");V.prototype.init=function(){var i=this;this._bShowListWithTokens=false;e.prototype.init.call(this);this._getClearIcon();this._bIsValidating=false;var o=new t({renderMode:I.Narrow,tokenDelete:this._tokenDelete.bind(this)});o.updateTokens=function(){this.destroyTokens();this.updateAggregation("tokens")};this.setAggregation("tokenizer",o);o.getTokensPopup().attachBeforeOpen(this._onBeforeOpenTokensPicker.bind(this)).attachAfterClose(this._onAfterCloseTokensPicker.bind(this))._getPopup().setAutoCloseAreas([o,this]);this.setAggregation("tokenizer",o);this._oTokenizerObserver=new a(function(e){var i=e.mutation;var o=e.child;switch(i){case"insert":o.attachEvent("_change",this.invalidate,this);this.fireTokenChange({type:t.TokenChangeType.Added,token:o,tokens:[o],removedTokens:[]});break;case"remove":var n=e.object.getTokens().length?t.TokenChangeType.Removed:t.TokenChangeType.RemovedAll;o.detachEvent("_change",this.invalidate,this);this.fireTokenChange({type:n,token:o,removedTokens:[o]});break;default:break}this.updateFormValueProperty();this.invalidate()}.bind(this));this._oTokenizerObserver.observe(o,{aggregations:["tokens"]});this._bShowListWithTokens=false;this._bIsValidating=false;o.addEventDelegate({onThemeChanged:this._handleInnerVisibility.bind(this),onAfterRendering:function(){if(this.isMobileDevice()&&this.getEditable()){o.addStyleClass("sapMTokenizerIndicatorDisabled")}else{o.removeStyleClass("sapMTokenizerIndicatorDisabled")}this._syncInputWidth(o);if(this.getTokens().length){this._handleInnerVisibility();this._handleNMoreAccessibility();this._registerTokenizerResizeHandler()}}.bind(this)},this);this._aTokenValidators=[];this.setShowValueHelp(true);this.setShowSuggestion(true);this._getSuggestionsPopover().getPopover().attachBeforeOpen(function(){if(i.isMobileDevice()!==true){return}var e=o._getTokensList();o._fillTokensList(e);this.addContent(e);i._manageListsVisibility(!!o.getTokens().length)}).attachAfterOpen(function(){var e=i.getTokens().length?P.getText("MULTIINPUT_NAVIGATION_POPUP_AND_TOKENS"):P.getText("MULTIINPUT_NAVIGATION_POPUP");i._oInvisibleMessage.announce(e)});this.attachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.attachLiveChange(this._onLiveChange,this);this.attachValueHelpRequest(this._onValueHelpRequested,this);this._getValueHelpIcon().setProperty("visible",true,true);this._onResize=this._onResize.bind(this)};V.prototype.exit=function(){this._deregisterResizeHandler();this._deregisterTokenizerResizeHandler();this._oTokenizerObserver.disconnect();this._oTokenizerObserver.destroy();this._oTokenizerObserver=null;e.prototype.exit.call(this)};V.prototype.onAfterRendering=function(){var t=this.getAggregation("tokenizer");this._bTokenIsValidated=false;t.setMaxWidth(this._calculateSpaceForTokenizer());t.scrollToEnd();this._registerResizeHandler();e.prototype.onAfterRendering.apply(this,arguments)};V.prototype._tokenDelete=function(e){if(!this.getEditable()||!this.getEnabled()){return}this._deleteTokens(e.getParameter("tokens"),e.getParameters())};V.prototype._deleteTokens=function(e,i){var o=this.getAggregation("tokenizer");var n=0;var s=i.keyCode===v.BACKSPACE;var r=e[e.length-1];var a=e[0];n=this.getTokens().indexOf(s?a:r);o.focusToken(n,i,function(){this.focus()}.bind(this));this.fireTokenUpdate({type:t.TokenUpdateType.Removed,addedTokens:[],removedTokens:e});e.filter(function(e){return this.getEditable()&&this.getEnabled()&&e.getEditable()}.bind(this)).forEach(function(e){e.destroy()});if(this.getTokens().length===0){o.getTokensPopup().close()}if(!i.keyCode){this.focus()}};V.prototype._handleInnerVisibility=function(){var e=!!this.getAggregation("tokenizer").getHiddenTokensCount();this._setValueVisible(!e)};V.prototype.oninput=function(t){this.setProperty("selectedKey","",true);e.prototype.oninput.call(this,t);if(t.isMarked("invalid")||!this.getEditable()){return}this._setValueVisible(true);this._manageListsVisibility(false);this.getAggregation("tokenizer").getTokensPopup().close()};V.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){this._iResizeHandlerId=c.register(this,this._onResize)}};V.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){c.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};V.prototype._registerTokenizerResizeHandler=function(){if(!this._iTokenizerResizeHandler){this._iTokenizerResizeHandler=c.register(this.getAggregation("tokenizer"),this._onResize)}};V.prototype._deregisterTokenizerResizeHandler=function(){if(this._iTokenizerResizeHandler){c.deregister(this._iTokenizerResizeHandler);this._iTokenizerResizeHandler=null}};V.prototype._onResize=function(){this.getAggregation("tokenizer").setMaxWidth(this._calculateSpaceForTokenizer())};V.prototype._onSuggestionItemSelected=function(e){var t=this.getAggregation("tokenizer"),o=null,n=null,r=t.getTokens().length;if(this.getMaxTokens()&&r>=this.getMaxTokens()||this._bValueHelpOpen){return}if(this._hasTabularSuggestions()){o=e.getParameter("selectedRow")}else{o=e.getParameter("selectedItem");if(o){n=new i({text:s.escapeSettingsValue(o.getText()),key:s.escapeSettingsValue(o.getKey())})}}if(o&&!this._bTokenIsAdded){var a=this.getValue();this.addValidateToken({text:a,token:n,suggestionObject:o,validationCallback:this._validationCallback.bind(this,r)})}if(this.isMobileDevice()){var g=t.getTokens().length;if(r<g){this.setValue("")}if(this._getSuggestionsList().isA("sap.m.Table")){this._getSuggestionsList().addStyleClass("sapMInputSuggestionTableHidden")}else{this._getSuggestionsList().destroyItems()}var l=this.getAggregation("tokenizer").getScrollDelegate();if(l){l.scrollTo(0,0,0)}this._getSuggestionsPopover().getInput().focus()}this._bTokenIsAdded=false};V.prototype._onValueHelpRequested=function(){this._bValueHelpOpen=true};V.prototype._onLiveChange=function(e){var t=this.getAggregation("tokenizer").getTokens().every(function(e){return e.getSelected()});if(!t){return}this.removeAllTokens()};V.prototype._setValueVisible=function(e){var t=e?"1":"0";this.$("inner").css("opacity",t)};V.prototype.onmousedown=function(e){if(e.target==this.getDomRef("content")){e.preventDefault();e.stopPropagation()}};V.prototype.openMultiLine=function(){};V.prototype.closeMultiLine=function(){};V.prototype.showItems=function(){e.prototype.showItems.apply(this,arguments);this._manageListsVisibility(false)};V.prototype.onBeforeRendering=function(){var t=this.getAggregation("tokenizer");var i=t._getTokensList();e.prototype.onBeforeRendering.apply(this,arguments);this._hideTokensOverLimit();t.setEnabled(this.getEnabled());t._fillTokensList(i)};V.prototype._hideTokensOverLimit=function(){if(!this.getMaxTokens()){return}this.getTokens().forEach(function(e,t){if(t>=this.getMaxTokens()){return e.setVisible(false)}return e.setVisible(true)},this)};V.prototype.onsapnext=function(e){var t=this.getAggregation("tokenizer");if(e.isMarked()){return}var i=m(document.activeElement).control()[0];if(!i){return}if(t===i||t.$().find(i.$()).length>0){t.scrollToEnd();this.$().find("input").trigger("focus")}};V.prototype.onsapbackspace=function(e){var t=this.getValue();var i=this.getFocusDomRef()===document.activeElement;var o=this.getTokens();var n=o[o.length-1];if(!this.getEnabled()||!this.getEditable()){e.preventDefault();return}if(t===""&&i&&n&&e.srcControl===this){var s=o.filter(function(e){return e.getSelected()}).length===o.length;if(s){return this._deleteTokens(o,{keyCode:v.BACKSPACE})}n.focus();e.preventDefault()}};V.prototype.onsapdelete=function(e){if(!this.getEditable()){return}if(this.getValue()&&!_(this.getFocusDomRef())){return}if(e.isMarked("forwardFocusToParent")){this.focus()}};V.prototype.onkeydown=function(t){var i=this.getAggregation("tokenizer");e.prototype.onkeydown.apply(this,arguments);if(!this.getEnabled()){return}if(t.which===v.TAB){i.selectAllTokens(false)}if((t.ctrlKey||t.metaKey)&&t.which===v.A&&i.getTokens().length>0){i.focus();i.selectAllTokens(true);t.preventDefault()}if((t.ctrlKey||t.metaKey)&&(t.which===v.C||t.which===v.INSERT)){i._copy()}if((t.ctrlKey||t.metaKey)&&t.which===v.X||t.shiftKey&&t.which===v.DELETE){if(this.getEditable()){i._cut()}else{i._copy()}}if((t.ctrlKey||t.metaKey)&&t.which===v.I&&i.getTokens().length){i._togglePopup(i.getTokensPopup());t.preventDefault()}};V.prototype.onpaste=function(e){var i,o,n,s=[];if(this.getValueHelpOnly()){return}i=e.originalEvent.clipboardData.getData("text/plain");n=i.split(/\r\n|\r|\n/g);if(n.length<=1){return}setTimeout(function(){if(n){if(this.fireEvent("_validateOnPaste",{texts:n},true)){var e="";for(o=0;o<n.length;o++){if(n[o]){var i=this._convertTextToToken(n[o],true);if(this._addUniqueToken(i)){s.push(i)}else{e=n[o]}}}this.updateDomValue(e);if(s.length>0){this.fireTokenUpdate({addedTokens:s,removedTokens:[],type:t.TokenUpdateType.Added});this.fireTokenChange({addedTokens:s,removedTokens:[],type:t.TokenChangeType.TokensChanged})}}if(s.length){this.cancelPendingSuggest()}}}.bind(this),0)};V.prototype._validationCallback=function(e,t){var i=this.getAggregation("tokenizer").getTokens().length;var o=this._getSuggestionsPopover();this._bIsValidating=false;if(t){this.setValue("");this._bTokenIsValidated=true;if(this.isMobileDevice()&&o&&o.getInput()&&e<i){o.getInput().setValue("")}}};V.prototype.onsapprevious=function(e){if(this._getIsSuggestionPopupOpen()){return}if(this._$input.cursorPos()===0){if(e.srcControl===this){t.prototype.onsapprevious.apply(this.getAggregation("tokenizer"),arguments)}}if(e.keyCode===v.ARROW_UP){e.preventDefault()}};V.prototype.onsaphome=function(i){if(!this.getFocusDomRef().selectionStart){t.prototype.onsaphome.apply(this.getAggregation("tokenizer"),arguments)}e.prototype.onsaphome.apply(this,arguments)};V.prototype.onsapend=function(t){if(t.isMarked("forwardFocusToParent")){this.focus()}e.prototype.onsapend.apply(this,arguments)};V.prototype.onsapenter=function(t){var i=this.getDOMValue();e.prototype.onsapenter.apply(this,arguments);var o=true,n=this.getAggregation("tokenizer");if(this._getIsSuggestionPopupOpen()){if(this._hasTabularSuggestions()){o=!this._getSuggestionsTable().getSelectedItem()}else{o=!this._getSuggestionsList().getSelectedItem()}}if(o){this._validateCurrentText()}if(t&&t.setMarked&&(this._bTokenIsValidated||i)){t.setMarked()}if(!this.getEditable()&&n.getHiddenTokensCount()&&t.target===this.getFocusDomRef()){n._togglePopup(n.getTokensPopup())}this.focus()};V.prototype.onsapfocusleave=function(t){var i=this._getSuggestionsPopoverPopup(),o=this.getAggregation("tokenizer"),n=o.getTokensPopup(),s=false,r=false,a=this.getDomRef()&&y(this.getDomRef(),document.activeElement),g,l;if(i&&i.isA("sap.m.Popover")){if(t.relatedControlId){g=sap.ui.getCore().byId(t.relatedControlId).getFocusDomRef();s=y(i.getFocusDomRef(),g);r=y(o.getFocusDomRef(),g);if(n){l=y(n.getFocusDomRef(),g)}}}e.prototype.onsapfocusleave.apply(this,arguments);if(this._bIsValidating||this._bValueHelpOpen){return}if(!this.isMobileDevice()&&!s&&t.relatedControlId!==this.getId()&&!r){this._validateCurrentText(true)}if(!this.isMobileDevice()&&this.getEditable()){if(a||s){return}}if(!l&&!r){n.isOpen()&&!this.isMobileDevice()&&o._togglePopup(n);o.setRenderMode(I.Narrow)}this._handleInnerVisibility()};V.prototype.ontap=function(t){var i=this.getAggregation("tokenizer");if(document.activeElement===this._$input[0]||document.activeElement===i.getDomRef()){i.selectAllTokens(false)}if(t&&t.isMarked("tokenDeletePress")){return}e.prototype.ontap.apply(this,arguments)};V.prototype.onfocusin=function(t){var i=this.getAggregation("tokenizer");this._deregisterTokenizerResizeHandler();this._bValueHelpOpen=false;if(t.target===this.getFocusDomRef()){e.prototype.onfocusin.apply(this,arguments);if(i.hasOneTruncatedToken()&&this.getEnabled()&&this.getEditable()){i.getTokens()[0].setSelected(false);!this.isMobileDevice()&&i.setFirstTokenTruncated(false)}}if(!this.isMobileDevice()&&this.getEditable()&&t.target===this.getDomRef("inner")&&!this._getIsSuggestionPopupOpen()){i.setRenderMode(I.Loose);this._setValueVisible(true)}this._registerResizeHandler()};V.prototype.onsapescape=function(t){var i=this.getAggregation("tokenizer"),o=i.getTokensPopup();this.getAggregation("tokenizer").selectAllTokens(false);this.selectText(0,0);if(o.isOpen()){i._togglePopup(o)}e.prototype.onsapescape.apply(this,arguments)};V.prototype._getIsSuggestionPopupOpen=function(){var e=this._getSuggestionsPopover(),t=this._getSuggestionsPopoverPopup();return e&&t&&t.isOpen()};V.prototype.setEditable=function(t){var i=this.getAggregation("tokenizer");t=this.validateProperty("editable",t);if(t===this.getEditable()){return this}if(e.prototype.setEditable){e.prototype.setEditable.apply(this,arguments)}i.setEditable(t);return this};V.prototype._findItem=function(e,t,i,o){if(!e){return}if(!(t&&t.length)){return}e=e.toLowerCase();var n=t.length;for(var s=0;s<n;s++){var r=t[s];var a=o(r);if(!a){continue}a=a.toLowerCase();if(a===e){return r}if(!i&&a.indexOf(e)===0){return r}}};V.prototype._getSuggestionItem=function(e,t){var i=null;var o=null;if(this._hasTabularSuggestions()){i=this.getSuggestionRows();o=this._findItem(e,i,t,function(e){var t=e.getCells();var i=null;if(t){var o;for(o=0;o<t.length;o++){if(t[o].getText){i=t[o].getText();break}}}return i})}else{i=this.getSuggestionItems();o=this._findItem(e,i,t,function(e){return e.getText()})}return o};V.prototype.clone=function(){var t;this.detachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.detachLiveChange(this._onLiveChange,this);this.detachValueHelpRequest(this._onValueHelpRequested,this);t=e.prototype.clone.apply(this,arguments);this.attachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.attachLiveChange(this._onLiveChange,this);this.attachValueHelpRequest(this._onValueHelpRequested,this);return t};V.getMetadata().forwardAggregation("tokens",{getter:function(){return this.getAggregation("tokenizer")},aggregation:"tokens",forwardBinding:true});V.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("content")};V.prototype.setTokens=function(e){if(!Array.isArray(e)){return}this.removeAllTokens();e.forEach(function(e){r.addAPIParentInfoBegin(e,this,"tokens")},this);e.forEach(function(e){this.addToken(e)},this);e.forEach(function(e){r.addAPIParentInfoEnd(e)},this);this.fireTokenChange({type:t.TokenChangeType.TokensChanged,addedTokens:e,removedTokens:[]});return this};V.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};V.WaitForAsyncValidation="sap.m.MultiInput.WaitForAsyncValidation";V.prototype.getDomRefForValueStateMessage=V.prototype.getPopupAnchorDomRef;V.prototype.updateInputField=function(t){e.prototype.updateInputField.call(this,t);var i=this._getSuggestionsPopover();this.setDOMValue("");if(i.getInput()){i.getInput().setDOMValue("")}};V.prototype.onChange=function(e,t,i){t=t||this.getChangeEventParams();if(!this.getEditable()||!this.getEnabled()){return}var o=this._getInputValue(i);if(o===this.getLastValue()){this._bCheckDomValue=false;return}if(!this._bTokenIsValidated){this.setValue(o);o=this.getValue();this.setLastValue(o)}this.fireChangeEvent(o,t);return true};V.prototype.getAccessibilityInfo=function(){var t=this.getTokens().map(function(e){return e.getText()}).join(" ");var i=e.prototype.getAccessibilityInfo.apply(this,arguments);i.type=P.getText("ACC_CTR_TYPE_MULTIINPUT");i.description=(this.getValueDescriptionInfo()+" "+t).trim();return i};V.prototype.getValueDescriptionInfo=function(){var e=this.getTokens().length;var t=this.getDescription()||"";var i=this.getValue();if(i){return i}if(e>0){return t}else{return t?t:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("INPUTBASE_VALUE_EMPTY")}};V.prototype._decoratePopupInput=function(t){e.prototype._decoratePopupInput.apply(this,arguments);if(!t){return}if(!this._oPopupInputDelegate){this._oPopupInputDelegate={oninput:this._manageListsVisibility.bind(this,false),onsapenter:this._handleConfirmation.bind(this,false)}}t.addEventDelegate(this._oPopupInputDelegate,this);return t};V.prototype._hasShowSelectedButton=function(){return true};V.prototype.forwardEventHandlersToSuggPopover=function(e){e.setShowSelectedPressHandler(this._handleShowSelectedPress.bind(this));e.setOkPressHandler(this._handleConfirmation.bind(this,true));e.setCancelPressHandler(this._handleCancelPress.bind(this))};V.prototype._handleConfirmation=function(e,t){var i=this._getSuggestionsPopover().getInput();if(e||!e&&i.getValue()){this._closeSuggestionPopup()}this._validateCurrentText();this._setValueVisible(false);this.onChange(t,null,i.getValue())};V.prototype._handleCancelPress=function(e){this._getSuggestionsPopover().getInput().setDOMValue(this.getLastValue());this._closeSuggestionPopup()};V.prototype._handleShowSelectedPress=function(e){this._bShowListWithTokens=e.getSource().getPressed();this._manageListsVisibility(this._bShowListWithTokens)};V.prototype._onBeforeOpenTokensPicker=function(){var e=this.getAggregation("tokenizer"),t=e.getTokensPopup(),i=this.getDomRef(),n=this.getEditable(),s,r;this._setValueVisible(false);this._manageListsVisibility(true);if(i&&t){s=parseInt(t.getContentWidth());r=isNaN(s)||i.offsetWidth>s?i.offsetWidth:s;r=e.getTokens().length===1||!n?"auto":r/parseFloat(o.BaseFontSize)+"rem";t.setContentWidth(r)}};V.prototype._onAfterCloseTokensPicker=function(){if(document.activeElement!==this.getDomRef("inner")){this.getAggregation("tokenizer").setRenderMode(I.Narrow)}};V.prototype.getDialogTitle=function(){var e=this._getSuggestionsPopoverPopup(),t=e&&e.getCustomHeader();if(t){return t.getContentMiddle()[0]}return null};V.prototype._updatePickerHeaderTitle=function(){var e,t;t=this.getLabels();if(t.length){e=t[0];if(e&&typeof e.getText==="function"){this.getDialogTitle().setText(e.getText())}}else{this.getDialogTitle().setText(P.getText("COMBOBOX_PICKER_TITLE"))}};V.prototype._getSuggestionsList=function(){var e=this._getSuggestionsPopover();return e&&e.getItemsContainer()};V.prototype._getSuggestionsPopoverPopup=function(){return this._oSuggestionPopup};V.prototype._manageListsVisibility=function(e){if(!this.isMobileDevice()){return}this.getAggregation("tokenizer")._getTokensList().setVisible(e);this._getSuggestionsList()&&this._getSuggestionsList().setVisible(!e);this._getSuggestionsPopover().getFilterSelectedButton().setPressed(e)};V.prototype._handleNMoreAccessibility=function(){var e=b.getStaticId("sap.m","MULTICOMBOBOX_OPEN_NMORE_POPOVER"),t=this.getFocusDomRef(),i=t&&t.getAttribute("aria-describedby"),o=i?i.split(" "):[],n=o.indexOf(e),s=this.getEnabled(),r=!this.getEditable()&&this.getAggregation("tokenizer").getHiddenTokensCount();if(r&&n===-1){o.push(e);s&&this.getFocusDomRef().setAttribute("aria-keyshortcuts","Enter")}else if(n!==-1&&!r){o.splice(n,1);this.getFocusDomRef().removeAttribute("aria-keyshortcuts")}if(t&&o.length){t.setAttribute("aria-describedby",o.join(" ").trim())}};V.prototype._calculateSpaceForTokenizer=function(){var e=this.getDomRef();if(e){var t,i=this.$().find(".sapMInputDescriptionWrapper"),o=this.$().find(".sapMInputBaseInner"),n=e.offsetWidth||0,s=i.width()||0,r=this._calculateIconsSpace(),a=["min-width","padding-right","padding-left"],g=a.reduce(function(e,t){return e+(parseInt(o.css(t))||0)},0);t=n-(r+g+s);t=t<0?0:t;return t+"px"}else{return null}};V.prototype._syncInputWidth=function(e){var t=this.getDomRef("inner"),i,o;if(!t||e&&!e.getDomRef()){return}i=this._calculateIconsSpace();o=e.getDomRef().scrollWidth;t.style.width="calc(100% - "+Math.floor(i+o)+"px"};V.prototype.isValueHelpOnlyOpener=function(e){return[this._$input[0],this._getValueHelpIcon().getDomRef()].indexOf(e)>-1};V.prototype._shouldTriggerSuggest=function(){var t=e.prototype._shouldTriggerSuggest.apply(this,arguments);return t&&!this._bShowListWithTokens};V.prototype.addValidator=function(e){if(typeof e==="function"){this._aTokenValidators.push(e)}};V.prototype.removeValidator=function(e){var t=this._aTokenValidators.indexOf(e);if(t!==-1){this._aTokenValidators.splice(t,1)}};V.prototype.removeAllValidators=function(){this._aTokenValidators=[]};V.prototype.getValidators=function(){return this._aTokenValidators};V.prototype.addValidateToken=function(e,i){var o=this._validateToken(e,i),n=this._addUniqueToken(o,e.validationCallback);if(n){this.fireTokenUpdate({addedTokens:[o],removedTokens:[],type:t.TokenUpdateType.Added});this.fireTokenChange({addedTokens:[o],removedTokens:[],type:t.TokenChangeType.TokensChanged})}};V.prototype._validateToken=function(e,t){var i=e.token,o=e.validationCallback,n=e.suggestionObject,s=i&&i.getText(),r=s?s:e.text,a;t=t?t:this._aTokenValidators;a=t.length;if(!a){if(!i&&o){o(false)}return i}for(var g=0;g<a;g++){i=t[g]({text:r,suggestedToken:i,suggestionObject:n,asyncCallback:this._getAsyncValidationCallback(t,g,r,n,o)});if(!i){if(o){o(false)}return null}if(i===V.WaitForAsyncValidation){return null}}return i};V.prototype._addUniqueToken=function(e,t){if(!e){return false}var i=!this._tokenExists(e);i&&this.addToken(e);if(t){t(i)}return i};V.prototype._tokenExists=function(e){var t=this.getTokens(),i=t.length,o=e&&e.getKey();if(!o){return false}for(var n=0;n<i;n++){if(t[n].getKey()===o){return true}}return false};V.prototype._convertTextToToken=function(e,t){var i=this.getAggregation("tokenizer"),o=i.getTokens().length,n=this._configureTokenOptions(e,false,t),s=n.text,r=n.item,a=n.token;if(!s){return null}return this._validateToken({text:s,token:a,suggestionObject:r,validationCallback:this._validationCallback.bind(this,o)})};V.prototype._validateCurrentText=function(e){var t=this.getAggregation("tokenizer"),i=t.getTokens().length,o=this._configureTokenOptions(this.getValue(),e),n=o.text,s=o.item,r=o.token;if(!n){return null}if(s){this._bTokenIsAdded=true}if(!this.getMaxTokens()||this.getTokens().length<this.getMaxTokens()){this._bIsValidating=true;this.addValidateToken({text:n,token:r,suggestionObject:s,validationCallback:this._validationCallback.bind(this,i)})}};V.prototype._configureTokenOptions=function(e,t,o){var n,r;if(e&&this.getEditable()){e=e.trim()}if(e&&(t||o||this._getIsSuggestionPopupOpen())){if(this._hasTabularSuggestions()){n=this._getSuggestionsTable().getSelectedItem()}else{n=this._getSuggestionItem(e,t)}}if(n&&n.getText&&n.getKey){r=new i({text:s.escapeSettingsValue(n.getText()),key:n.getKey()})}return{text:e,item:n,token:r}};V.prototype._getAsyncValidationCallback=function(e,t,i,o,n){var s=this;return function(r){if(r){r=s.addValidateToken({text:i,token:r,suggestionObject:o,validationCallback:n},e.slice(t+1))}else{n&&n(false)}}};V.prototype.getFormFormattedValue=function(){return this.getTokens().map(function(e){return e.getText()}).join(", ")};V.prototype.getFormValueProperty=function(){return"_semanticFormValue"};V.prototype.updateFormValueProperty=function(){this.setProperty("_semanticFormValue",this.getFormFormattedValue(),true)};return V});