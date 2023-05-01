/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/events/KeyCodes","sap/ui/model/BindingMode","sap/ui/Device","sap/ui/core/Core","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/Icon","sap/ui/core/InvisibleText","sap/ui/core/theming/Parameters","./library","./Button","./CheckBox","./RadioButton","./ListItemBaseRenderer","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(t,e,i,o,s,n,r,a,l,c,h,u,p,d,f,g,y,jQuery){"use strict";var I=u.ListKeyboardMode;var T=u.ListMode;var _=u.ListType;var m=u.ButtonType;var v=n.MessageType;var S=r.extend("sap.m.ListItemBase",{metadata:{library:"sap.m",properties:{type:{type:"sap.m.ListType",group:"Misc",defaultValue:_.Inactive},visible:{type:"boolean",group:"Appearance",defaultValue:true},unread:{type:"boolean",group:"Misc",defaultValue:false},selected:{type:"boolean",defaultValue:false},counter:{type:"int",group:"Misc",defaultValue:null},highlight:{type:"string",group:"Appearance",defaultValue:"None"},highlightText:{type:"string",group:"Misc",defaultValue:""},navigated:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{deprecated:true},detailTap:{deprecated:true},press:{},detailPress:{}},designtime:"sap/m/designtime/ListItemBase.designtime",dnd:true},renderer:g});S.getAccessibilityText=function(t,e,i){var o=s.getLibraryResourceBundle("sap.m");if(!t||!t.getVisible||!t.getVisible()){return e?o.getText("CONTROL_EMPTY"):""}var n;if(t.getAccessibilityInfo){n=t.getAccessibilityInfo()}if(!n||!t.getAccessibilityInfo){n=this.getDefaultAccessibilityInfo(t.getDomRef())}n=jQuery.extend({type:"",description:"",children:[]},n);var r=n.type+" "+n.description+" ",a=t.getTooltip_AsString();if(n.required===true){r+=o.getText(i?"CONTROL_IN_COLUMN_REQUIRED":"ELEMENT_REQUIRED")+" "}if(n.enabled===false){r+=o.getText("CONTROL_DISABLED")+" "}if(n.editable===false){r+=o.getText("CONTROL_READONLY")+" "}if(!n.type&&a&&r.indexOf(a)==-1){r=a+" "+r}n.children.forEach(function(t){r+=S.getAccessibilityText(t)+" "});r=r.trim();if(e&&!r){r=o.getText("CONTROL_EMPTY")}return r};S.getDefaultAccessibilityInfo=function(t){if(!t){return null}var e=[],i=window.Node,o=window.NodeFilter,s=document.createTreeWalker(t,o.SHOW_TEXT+o.SHOW_ELEMENT);while(s.nextNode()){var n=s.currentNode;if(n.nodeType===i.TEXT_NODE){var r=(n.nodeValue||"").trim();if(r){e.push(r)}}}return{description:e.join(" ")}};S.prototype.DetailIconURI=a.getIconURI("edit");S.prototype.NavigationIconURI=a.getIconURI("slim-arrow-right");S.prototype.TagName="li";S.prototype.init=function(){this._active=false;this._bGroupHeader=false;this._bNeedsHighlight=false;this._bNeedsNavigated=false};S.prototype.onBeforeRendering=function(){this._oDomRef=this.getDomRef()};S.prototype.onAfterRendering=function(){if(!this._oDomRef||this._oDomRef!==this.getDomRef()){this.informList("DOMUpdate",true)}this._oDomRef=undefined;this._checkHighlight();this._checkNavigated()};S.prototype.invalidate=function(){if(!this.bOutput){return}r.prototype.invalidate.apply(this,arguments)};S.prototype.getBindingContextPath=function(t){var e=this.getList();if(e&&!t){t=(e.getBindingInfo("items")||{}).model}var i=this.getBindingContext(t);if(i){return i.getPath()}};S.prototype.isSelectedBoundTwoWay=function(){var t=this.getBinding("selected");if(t&&t.getBindingMode()==i.TwoWay){return true}};S.prototype.getList=function(){var t=this.getParent();if(t&&t.isA("sap.m.ListBase")){return t}};S.prototype.getListProperty=function(t,e){var i=this.getList();if(i){t=y(t);return i["get"+t]()}return e};S.prototype.informList=function(t,e,i){var o=this.getList();if(o){var s="onItem"+t;if(o[s]){o[s](this,e,i)}}};S.prototype.informSelectedChange=function(t){var e=this.getList();if(e){e.onItemSelectedChange(this,t);this.bSelectedDelayed=undefined}else{this.bSelectedDelayed=t}};S.prototype.getAccessibilityType=function(t){return this.getListProperty("ariaRole")=="list"?t.getText("ACC_CTR_TYPE_LISTITEM"):""};S.prototype.getGroupAnnouncement=function(){return this.$().prevAll(".sapMGHLI:first").text()};S.prototype.getAccessibilityDescription=function(t){var e=[],i=this.getType(),o=this.getHighlight();if(this.getSelected()){e.push(t.getText("LIST_ITEM_SELECTED"))}if(o!==v.None){var s=this.getHighlightText();if(o in v&&!s){s=t.getText("LIST_ITEM_STATE_"+o.toUpperCase())}e.push(s)}if(this.getUnread()&&this.getListProperty("showUnread")){e.push(t.getText("LIST_ITEM_UNREAD"))}if(this.getCounter()){e.push(t.getText("LIST_ITEM_COUNTER",this.getCounter()))}if(i==_.Navigation){e.push(t.getText("LIST_ITEM_NAVIGATION"))}else{if(i==_.Detail||i==_.DetailAndActive){e.push(t.getText("LIST_ITEM_DETAIL"))}if(i==_.Active||i==_.DetailAndActive){e.push(t.getText("LIST_ITEM_ACTIVE"))}}var n=this.getGroupAnnouncement()||"";if(n){e.push(n)}if(this.getContentAnnouncement){var r=(this.getContentAnnouncement(t)||"").trim();r&&e.push(r)}if(this.getListProperty("ariaRole")!="listbox"&&this.isSelectable()&&!this.getSelected()){e.push(t.getText("LIST_ITEM_NOT_SELECTED"))}return e.join(" . ")};S.prototype.getAccessibilityInfo=function(){var t=s.getLibraryResourceBundle("sap.m");return{type:this.getAccessibilityType(t),description:this.getAccessibilityDescription(t),focusable:true}};S.prototype.getMode=function(){return this.getListProperty("mode","")};S.prototype.updateAccessibilityState=function(t){var e=this.$();if(!e.length){return}var i=e.parent().children(".sapMLIB");e.attr(jQuery.extend({"aria-setsize":i.length,"aria-posinset":i.index(e)+1},t))};S.prototype.getDeleteControl=function(t){if(!t||this._oDeleteControl){return this._oDeleteControl}if(!this.DeleteIconURI){S.prototype.DeleteIconURI=a.getIconURI(h.get({name:"_sap_m_ListItemBase_DeleteIcon"})||"decline")}this._oDeleteControl=new p({id:this.getId()+"-imgDel",icon:this.DeleteIconURI,type:m.Transparent,tooltip:s.getLibraryResourceBundle("sap.m").getText("LIST_ITEM_DELETE")}).addStyleClass("sapMLIBIconDel sapMLIBSelectD").setParent(this,null,true).attachPress(function(t){this.informList("Delete")},this);this._oDeleteControl._bExcludeFromTabChain=true;this._oDeleteControl.useEnabledPropagator(false);return this._oDeleteControl};S.prototype.onThemeChanged=function(){S.prototype.DeleteIconURI=a.getIconURI(h.get({name:"_sap_m_ListItemBase_DeleteIcon"}));if(this._oDeleteControl){this._oDeleteControl.setIcon(this.DeleteIconURI)}};S.prototype.getDetailControl=function(t){if(!t||this._oDetailControl){return this._oDetailControl}this._oDetailControl=new p({id:this.getId()+"-imgDet",icon:this.DetailIconURI,type:m.Transparent,tooltip:s.getLibraryResourceBundle("sap.m").getText("LIST_ITEM_EDIT")}).addStyleClass("sapMLIBType sapMLIBIconDet").setParent(this,null,true).attachPress(function(){this.fireDetailTap();this.fireDetailPress()},this);this._oDetailControl._bExcludeFromTabChain=true;this._oDetailControl.useEnabledPropagator(false);return this._oDetailControl};S.prototype.getNavigationControl=function(t){if(!t||this._oNavigationControl){return this._oNavigationControl}this._oNavigationControl=new l({id:this.getId()+"-imgNav",src:this.NavigationIconURI,useIconTooltip:false,noTabStop:true}).setParent(this,null,true).addStyleClass("sapMLIBType sapMLIBImgNav");return this._oNavigationControl};S.prototype.getSingleSelectControl=function(t){if(!t||this._oSingleSelectControl){t&&this._oSingleSelectControl.setSelected(this.getSelected());return this._oSingleSelectControl}this._oSingleSelectControl=new f({id:this.getId()+"-selectSingle",groupName:this.getListProperty("id")+"_selectGroup",activeHandling:false,selected:this.getSelected(),ariaLabelledBy:c.getStaticId("sap.m","LIST_ITEM_SELECTION")}).addStyleClass("sapMLIBSelectS").setParent(this,null,true).setTabIndex(-1).attachSelect(function(t){var e=t.getParameter("selected");this.setSelected(e);this.informList("Select",e)},this);this._oSingleSelectControl.useEnabledPropagator(false);return this._oSingleSelectControl};S.prototype.getMultiSelectControl=function(t){if(!t||this._oMultiSelectControl){t&&this._oMultiSelectControl.setSelected(this.getSelected());return this._oMultiSelectControl}this._oMultiSelectControl=new d({id:this.getId()+"-selectMulti",activeHandling:false,selected:this.getSelected(),ariaLabelledBy:c.getStaticId("sap.m","LIST_ITEM_SELECTION")}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).setTabIndex(-1).addEventDelegate({onkeydown:function(t){this.informList("KeyDown",t)},onkeyup:function(t){this.informList("KeyUp",t)}},this).attachSelect(function(t){var e=t.getParameter("selected");this.setSelected(e);this.informList("Select",e)},this);this._oMultiSelectControl.useEnabledPropagator(false);return this._oMultiSelectControl};S.prototype.getModeControl=function(t){var e=this.getMode();if(!e||e==T.None){return}if(e==T.Delete){return this.getDeleteControl(t)}if(e==T.MultiSelect){return this.getMultiSelectControl(t)}return this.getSingleSelectControl(t)};S.prototype.getTypeControl=function(t){var e=this.getType();if(e==_.Detail||e==_.DetailAndActive){return this.getDetailControl(t)}if(e==_.Navigation){return this.getNavigationControl(t)}};S.prototype.destroyControls=function(t){t.forEach(function(t){t="_o"+t+"Control";if(this[t]){this[t].destroy("KeepDom");this[t]=null}},this)};S.prototype.isActionable=function(t){if(t&&!o.system.desktop){return false}return this.isIncludedIntoSelection()||this.getType()!=_.Inactive&&this.getType()!=_.Detail};S.prototype.exit=function(){this._oDomRef=null;this._oLastFocused=null;this._checkHighlight(false);this._checkNavigated(false);this.setActive(false);this.destroyControls(["Delete","SingleSelect","MultiSelect","Detail","Navigation"])};S.prototype.setHighlight=function(e){if(e==null){e=v.None}else if(!t.getType("sap.ui.core.MessageType").isValid(e)&&!t.getType("sap.ui.core.IndicationColor").isValid(e)){throw new Error('"'+e+'" is not a value of the enums sap.ui.core.MessageType or sap.ui.core.IndicationColor for property "highlight" of '+this)}return this.setProperty("highlight",e)};S.prototype.isSelectable=function(){var t=this.getMode();return!(t==T.None||t==T.Delete)};S.prototype.getSelected=function(){if(this.isSelectable()){return this.getProperty("selected")}return false};S.prototype.isSelected=S.prototype.getSelected;S.prototype.setSelected=function(t,e){t=this.validateProperty("selected",t);if(!this.isSelectable()||t==this.getSelected()){return this}if(!e){this.informSelectedChange(t)}var i=this.getModeControl();if(i){i.setSelected(t)}this.updateSelectedDOM(t,this.$());this.setProperty("selected",t,true);return this};S.prototype.updateSelectedDOM=function(t,e){e.toggleClass("sapMLIBSelected",t);if(e.attr("role")!=="listitem"){e.attr("aria-selected",t)}};S.prototype.setParent=function(t){if(!t){this.informList("Removed")}r.prototype.setParent.apply(this,arguments);this.informList("Inserted",this.bSelectedDelayed);return this};S.prototype.setBindingContext=function(){r.prototype.setBindingContext.apply(this,arguments);this.informList("BindingContextSet");return this};S.prototype.isGroupHeader=function(){return this._bGroupHeader};S.prototype.setGroupedItem=function(t){this._aGroupedItems=this._aGroupedItems||[];this._aGroupedItems.push(t.getId())};S.prototype.getGroupedItems=function(){return this._aGroupedItems};S.prototype.isIncludedIntoSelection=function(){if(!this.isSelectable()){return false}var t=this.getMode();return t==T.SingleSelectMaster||this.getListProperty("includeItemInSelection")&&(t==T.SingleSelectLeft||t==T.SingleSelect||t==T.MultiSelect)};S.prototype._checkHighlight=function(t){if(t==undefined){t=this.getVisible()&&this.getHighlight()!=v.None}if(this._bNeedsHighlight!=t){this._bNeedsHighlight=t;this.informList("HighlightChange",t)}};S.prototype._checkNavigated=function(t){if(t==undefined){t=this.getVisible()&&this.getNavigated()}if(this._bNeedsNavigated!=t){this._bNeedsNavigated=t;this.informList("NavigatedChange",t)}};S.prototype.hasActiveType=function(){var t=this.getType();return t==_.Active||t==_.Navigation||t==_.DetailAndActive};S.prototype.setActive=function(t){if(t==this._active){return this}if(t&&this.getListProperty("activeItem")){return this}var e=this.$();this._active=t;this._activeHandling(e);if(this.getType()==_.Navigation){this._activeHandlingNav(e)}if(t){this._activeHandlingInheritor(e)}else{this._inactiveHandlingInheritor(e)}this.informList("ActiveChange",t)};S.detectTextSelection=function(t){var e=window.getSelection(),i=e.toString().replace("\n","");return i&&jQuery.contains(t,e.focusNode)};S.prototype.ontap=function(t){if(this._eventHandledByControl){return t.setMarked()}if(S.detectTextSelection(this.getDomRef())){return}if(this.isIncludedIntoSelection()){if(this.getMode()==T.MultiSelect){this.setSelected(!this.getSelected());this.informList("Select",this.getSelected())}else if(!this.getSelected()){this.setSelected(true);this.informList("Select",true)}}else if(this.hasActiveType()){window.clearTimeout(this._timeoutIdStart);window.clearTimeout(this._timeoutIdEnd);this.setActive(true);if(o.os.ios){this.focus()}setTimeout(function(){this.setActive(false)}.bind(this),180);setTimeout(function(){this.fireTap();this.firePress()}.bind(this),0)}this.informList("Press",t.srcControl)};S.prototype.ontouchstart=function(t){this._eventHandledByControl=t.isMarked();var e=t.targetTouches[0];this._touchedY=e.clientY;this._touchedX=e.clientX;if(this._eventHandledByControl||t.touches.length!=1||!this.hasActiveType()){if(this.getListProperty("includeItemInSelection")&&this.getList()._mRangeSelection){t.preventDefault()}return}this._timeoutIdStart=setTimeout(function(){this.setActive(true)}.bind(this),100)};S.prototype.ontouchmove=function(t){if((this._active||this._timeoutIdStart)&&(Math.abs(this._touchedY-t.targetTouches[0].clientY)>10||Math.abs(this._touchedX-t.targetTouches[0].clientX)>10)){clearTimeout(this._timeoutIdStart);this._timeoutIdStart=null;this._timeoutIdEnd=null;this.setActive(false)}};S.prototype.ontouchend=function(t){if(this.hasActiveType()){this._timeoutIdEnd=setTimeout(function(){this.setActive(false)}.bind(this),100)}};S.prototype.ontouchcancel=S.prototype.ontouchend;S.prototype.ondragend=S.prototype.ontouchend;S.prototype._activeHandlingNav=function(){};S.prototype._activeHandlingInheritor=function(){};S.prototype._inactiveHandlingInheritor=function(){};S.prototype._activeHandling=function(t){t.toggleClass("sapMLIBActive",this._active);if(this.isActionable(true)){t.toggleClass("sapMLIBHoverable",!this._active)}};S.prototype.onsapspace=function(t){if(t.srcControl!==this){return}t.preventDefault();if(t.isMarked()||!this.isSelectable()){return}if(this.getMode()==T.MultiSelect){this.setSelected(!this.getSelected());this.informList("Select",this.getSelected())}else if(!this.getSelected()){this.setSelected(true);this.informList("Select",true)}t.setMarked()};S.prototype.onsapenter=function(t){var e=this.getList();if(t.isMarked()||!e){return}if(t.srcControl!==this&&e.getKeyboardMode()==I.Edit){e.setKeyboardMode(I.Navigation);this._switchFocus(t);return}if(t.srcControl!==this){return}if(this.isIncludedIntoSelection()){this.onsapspace(t)}else if(this.hasActiveType()){t.setMarked();this.setActive(true);setTimeout(function(){this.setActive(false)}.bind(this),180);setTimeout(function(){this.fireTap();this.firePress()}.bind(this),0)}e.onItemPress(this,t.srcControl)};S.prototype.onsapdelete=function(t){if(t.isMarked()||t.srcControl!==this||this.getMode()!=T.Delete){return}this.informList("Delete");t.preventDefault();t.setMarked()};S.prototype._switchFocus=function(t){var e=this.getList();if(!e){return}var i=this.getTabbables();if(t.srcControl!==this){e._iLastFocusPosOfItem=i.index(t.target);this.focus()}else if(i.length){var o=e._iLastFocusPosOfItem||0;o=i[o]?o:-1;i.eq(o).trigger("focus")}t.preventDefault();t.setMarked()};S.prototype.onkeydown=function(t){if(t.isMarked()){return}if(t.which==e.F7){this._switchFocus(t);return}if(t.which==e.F2){if(t.srcControl===this&&this.getType().indexOf("Detail")==0&&this.hasListeners("detailPress")||this.hasListeners("detailTap")){this.fireDetailTap();this.fireDetailPress();t.preventDefault();t.setMarked()}else{var i=this.getList();if(i){this.$().prop("tabIndex",-1);i.setKeyboardMode(i.getKeyboardMode()==I.Edit?I.Navigation:I.Edit);this._switchFocus(t)}}}if(t.srcControl!==this){return}this.informList("KeyDown",t)};S.prototype.onkeyup=function(t){if(t.isMarked()||t.srcControl!==this){return}this.informList("KeyUp",t)};S.prototype.onsapupmodifiers=function(t){if(t.isMarked()){return}this.informList("UpDownModifiers",t,-1)};S.prototype.onsapdownmodifiers=function(t){if(t.isMarked()){return}this.informList("UpDownModifiers",t,1)};S.prototype.getTabbables=function(){return this.$().find(":sapTabbable")};S.prototype.onsaptabnext=function(t){var e=this.getList();if(!e||t.isMarked()||e.getKeyboardMode()==I.Edit){return}var i=this.getTabbables().get(-1)||this.getDomRef();if(t.target===i){e.forwardTab(true);t.setMarked()}};S.prototype.onsaptabprevious=function(t){var e=this.getList();if(!e||t.isMarked()||e.getKeyboardMode()==I.Edit){return}if(t.target===this.getDomRef()){e.forwardTab(false);t.setMarked()}};S.prototype.onfocusin=function(t){var e=this.getList();if(!e||t.isMarked()){return}this.informList("FocusIn",t.srcControl);t.setMarked();if(t.srcControl===this){return}if(e.getKeyboardMode()==I.Edit||!jQuery(t.target).is(":sapFocusable")){return}setTimeout(e["setItemFocusable"].bind(e,this),0)};S.prototype.onsapup=function(t){if(t.isMarked()||t.srcControl===this||t.target instanceof HTMLInputElement||t.target instanceof HTMLTextAreaElement){return}this.informList("ArrowUpDown",t)};S.prototype.oncontextmenu=function(t){if(this._bGroupHeader){return}if(jQuery(document.activeElement).is(":focusable")&&document.activeElement!==this.getDomRef()&&t.srcControl!==this.getModeControl()){return}this.informList("ContextMenu",t)};S.prototype.onsapdown=S.prototype.onsapup;return S});
//# sourceMappingURL=ListItemBase.js.map