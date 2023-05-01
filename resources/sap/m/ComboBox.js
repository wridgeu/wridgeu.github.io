/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxTextField","./ComboBoxBase","./List","./library","sap/ui/Device","sap/ui/core/Item","./ComboBoxRenderer","sap/ui/dom/containsOrEquals","sap/m/inputUtils/scrollToItem","sap/m/inputUtils/inputsDefaultFilter","sap/m/inputUtils/typeAhead","sap/m/inputUtils/filterItems","sap/m/inputUtils/ListHelpers","sap/m/inputUtils/itemsVisibilityHandler","sap/m/inputUtils/selectionRange","sap/m/inputUtils/calculateSelectionStart","sap/ui/events/KeyCodes","sap/ui/core/Core","sap/base/Log"],function(e,t,s,i,o,n,r,a,l,h,p,c,u,d,g,f,m,y,I){"use strict";var S=i.ListMode;var v=t.extend("sap.m.ComboBox",{metadata:{interfaces:["sap.m.IToolbarInteractiveControl"],library:"sap.m",designtime:"sap/m/designtime/ComboBox.designtime",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},filterSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},_open:{type:"boolean",defaultValue:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{change:{parameters:{value:{type:"string"},itemPressed:{type:"boolean"}}},selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},dnd:{draggable:false,droppable:true}},renderer:r});function L(e){var t=this.getSelectedItem(),s=u.getListItem(t),i=t&&s&&s.getDomRef(),o=i&&i.offsetTop,n=i&&i.offsetHeight,r=this.getPicker(),a=r.getDomRef("cont"),l=a.clientHeight;if(t&&o+n>l){if(!e){this._getList().$().css("visibility","hidden")}else{a.scrollTop=o-n/2;this._getList().$().css("visibility","visible")}}}v.prototype._getSelectedItemText=function(e){e=e||this.getSelectedItem();if(!e){e=this.getDefaultSelectedItem()}if(e){return e.getText()}return""};v.prototype.setSelectedIndex=function(e,t){var s;t=t||this.getItems();e=e>t.length-1?t.length-1:Math.max(0,e);s=t[e];if(s){this.setSelection(s)}};v.prototype.revertSelection=function(){var e,t=this.getPickerTextField();this.setSelectedItem(this._oSelectedItemBeforeOpen);this.setValue(this._sValueBeforeOpen);if(this.getSelectedItem()===null){e=this._sValueBeforeOpen}else{e=this._oSelectedItemBeforeOpen.getText()}t&&t.setValue(e)};v.prototype._filterStartsWithItems=function(e,t){var s=e.toLowerCase();var i=this.getItems(),o=i.filter(function(e){return e[t]&&e[t]().toLowerCase().startsWith(s)});return o};v.prototype.setSelection=function(e){var t=this._getList(),s,i;this.setAssociation("selectedItem",e);this._setPropertyProtected("selectedItemId",e instanceof n?e.getId():e,true);if(typeof e==="string"){e=y.byId(e)}if(t){s=u.getListItem(e);if(s){t.setSelectedItem(s,true)}else{t.removeSelections(true)}}i=e?e.getKey():this.getMetadata().getProperty("selectedKey").defaultValue;this._setPropertyProtected("selectedKey",i)};v.prototype.isSelectionSynchronized=function(){var e=this.getSelectedItem();return this.getSelectedKey()===(e&&e.getKey())};v.prototype.isItemSelected=function(e){return e&&e.getId()===this.getAssociation("selectedItem")};v.prototype.setAssociation=function(e,s,i){var o=this._getList();if(o&&e==="selectedItem"){if(!(s instanceof n)){s=this.findItem("id",s)}o.setSelectedItem(u.getListItem(s),true)}return t.prototype.setAssociation.apply(this,arguments)};v.prototype.removeAllAssociation=function(e,i){var o=this._getList();if(o&&e==="selectedItem"){s.prototype.removeAllAssociation.apply(o,arguments)}return t.prototype.removeAllAssociation.apply(this,arguments)};v.prototype.init=function(){t.prototype.init.apply(this,arguments);this.bOpenValueStateMessage=true;this._sValueBeforeOpen="";this._sInputValueBeforeOpen="";this._oSelectedItemBeforeOpen=null;if(o.system.phone){this.attachEvent("_change",this.onPropertyChange,this)}this.setLastFocusedListItem(null)};v.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.apply(this,arguments);var e=this.getItems();if(this.getRecreateItems()){u.fillList(e,this._getList(),this._mapItemToListItem.bind(this));this.setRecreateItems(false)}this.synchronizeSelection();if(!this.isOpen()&&document.activeElement===this.getFocusDomRef()&&this.getEnabled()){this.addStyleClass("sapMFocus")}if(this.getSelectedItem()&&e.indexOf(this.getSelectedItem())===-1){var s=this.getValue();this.clearSelection();this.setValue(s)}if(this.getShowClearIcon()){this._getClearIcon().setVisible(this.shouldShowClearIcon())}else if(this._oClearIcon){this._getClearIcon().setVisible(false)}};v.prototype.exit=function(){t.prototype.exit.apply(this,arguments);this._oSelectedItemBeforeOpen=null;this._bInputFired=null;this.setLastFocusedListItem(null)};v.prototype.onBeforeRenderingPicker=function(){var e=this["onBeforeRendering"+this.getPickerType()];e&&e.call(this)};v.prototype.onBeforeRenderingDropdown=function(){var e=this.getPicker(),t=this.$().outerWidth()/parseFloat(i.BaseFontSize)+"rem";if(e){e.setContentMinWidth(t)}};v.prototype.onBeforeRenderingList=function(){if(this.bProcessingLoadItemsEvent){var e=this._getList(),t=this.getFocusDomRef();if(e){e.setBusy(true)}if(t){t.setAttribute("aria-busy","true")}}};v.prototype.onAfterRenderingPicker=function(){var e=this["onAfterRendering"+this.getPickerType()];e&&e.call(this);L.call(this,false)};v.prototype.onAfterRenderingList=function(){var e=this.getSelectedItem(),t=u.getListItem(e);if(this.bProcessingLoadItemsEvent&&!this.bItemsUpdated&&this.getItems().length===0){return}var s=this._getList(),i=this.getFocusDomRef();this.highlightList(this._sInputValueBeforeOpen);if(e){s.setSelectedItem(t);this.setLastFocusedListItem(t)}if(s){s.setBusy(false)}if(i){i.removeAttribute("aria-busy")}};v.prototype.filterItems=function(e){return c(this,this.getItems(),e,true,this.getFilterSecondaryValues(),this.fnFilter||h)};v.prototype._mapItemToListItem=function(e){var t=u.createListItemFromCoreItem(e,this.getShowSecondaryValues());if(e.isA("sap.ui.core.Item")){this.setSelectable(e,e.getEnabled())}if(e.isA("sap.ui.core.SeparatorItem")){t.addAriaLabelledBy(this._getGroupHeaderInvisibleText().getId())}t.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"NonInteractiveItem");return t};v.prototype.oninput=function(e){t.prototype.oninput.apply(this,arguments);this.syncPickerContent();if(e.isMarked("invalid")){return}this._bInputFired=true;this.loadItems(function(){this.handleInputValidation(e)},{name:"input",busyIndicator:false});if(this.bProcessingLoadItemsEvent&&this.getPickerType()==="Dropdown"){if(this.isOpen()&&!this.getValue()){this.close()}else{this.open()}}if(this.getLastFocusedListItem()){this.getLastFocusedListItem().removeStyleClass("sapMLIBFocused");this.setLastFocusedListItem(null)}this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus");if(this._getItemsShownWithFilter()){this.toggleIconPressedStyle(true)}};v.prototype.handleInputValidation=function(e){var t,s,i,o,n=this.getSelectedItem(),r=e.target.value,a=r==="",h=e.srcControl,p=this.getPickerType()==="Dropdown",c=u.getListItem(n),g=this.filterItems(r);if(a&&!this.bOpenedByKeyboardOrButton&&!this.isPickerDialog()){t=this.getItems()}else{t=g.items;d(this.getItems(),g)}i=t[0];o=t.some(function(e){return e.getKey()===this.getSelectedKey()},this);s=this.intersectItems(this._filterStartsWithItems(r,"getText"),t);if(i&&this.getSelectedKey()&&!o){this.setSelection(null)}if(!a&&h&&h._bDoTypeAhead){this.handleTypeAhead(h,t,r)}else if(!a&&s[0]&&r===s[0].getText()){this.setSelection(s[0])}else{this.setSelection(null)}if(n!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});c=u.getListItem(this.getSelectedItem())}this._sInputValueBeforeOpen=r;if(this.isOpen()){setTimeout(function(){this.highlightList(r)}.bind(this))}if(i){if(a&&!this.bOpenedByKeyboardOrButton){this.close()}else if(p){this.open();l(c,this.getPicker())}}else if(this.isOpen()){if(p&&!this.bOpenedByKeyboardOrButton){this.close()}}else{this.clearFilter()}};v.prototype.handleTypeAhead=function(e,t,s){var i,o=this.getFilterSecondaryValues(),n=p(s,e,t,function(e){i=[e.getText()];if(o){i.push(e.getAdditionalText())}return i});this.setSelection(n[0]);this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus")};v.prototype.onSelectionChange=function(e){var t=u.getItemByListItem(this.getItems(),e.getParameter("listItem")),s=this.getChangeEventParams(),i=t!==this.getSelectedItem();t&&this.updateDomValue(t.getText());this.setSelection(t);this.fireSelectionChange({selectedItem:this.getSelectedItem()});if(i){s.itemPressed=true;this.onChange(null,s)}};v.prototype.onItemPress=function(e){var t=e.getParameter("listItem"),s=t.getTitle(),i=this.getChangeEventParams(),o=t!==u.getListItem(this.getSelectedItem());if(t.isA("sap.m.GroupHeaderListItem")){return}this.setLastFocusedListItem(t);this.updateDomValue(s);if(!o){i.itemPressed=true;this.onChange(null,i)}this._setPropertyProtected("value",s,true);if(this.getPickerType()==="Dropdown"&&!this.isPlatformTablet()){this.selectText(this.getValue().length,this.getValue().length)}this.close()};v.prototype.onBeforeOpen=function(){t.prototype.onBeforeOpen.apply(this,arguments);var e=this["onBeforeOpen"+this.getPickerType()];this.setProperty("_open",true);if(this.hasLoadItemsEventListeners()&&!this.bProcessingLoadItemsEvent){this.loadItems()}this.addContent();e&&e.call(this)};v.prototype.onBeforeOpenDialog=function(){var e=this.getPickerTextField();this._oSelectedItemBeforeOpen=this.getSelectedItem();this._sValueBeforeOpen=this.getValue();this.getSelectedItem()&&d(this.getItems(),this.filterItems(""));e.setValue(this._sValueBeforeOpen)};v.prototype.onAfterOpen=function(){var e=this.getSelectedItem(),t=g(this.getFocusDomRef()),s=this.isPlatformTablet();this.closeValueStateMessage();L.call(this,true);if(!s&&e&&t.start===t.end&&t.start>1){setTimeout(function(){this.selectText(0,t.end)}.bind(this),0)}};v.prototype.onBeforeClose=function(){t.prototype.onBeforeClose.apply(this,arguments);var e=this.getFocusDomRef();this.setProperty("_open",false);if(document.activeElement===e){this.updateFocusOnClose()}this.toggleIconPressedStyle(false)};v.prototype.onAfterClose=function(){this.clearFilter();this._sInputValueBeforeOpen="";if(this.isPickerDialog()){t.prototype.closeValueStateMessage.apply(this,arguments)}};v.prototype.onItemChange=function(e){var s=this.getAssociation("selectedItem"),i=e.getParameter("newValue"),o=e.getParameter("name");if(s===e.getParameter("id")){switch(o){case"text":if(!this.isBound("value")){this.setValue(i)}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(i)}break}}return t.prototype.onItemChange.call(this,e,this.getShowSecondaryValues())};v.prototype.onkeydown=function(e){var s=e.srcControl;t.prototype.onkeydown.apply(s,arguments);if(!s.getEnabled()||!s.getEditable()){return}var i=m;s._bDoTypeAhead=!o.os.android&&e.which!==i.BACKSPACE&&e.which!==i.DELETE};v.prototype.oncut=function(e){var s=e.srcControl;t.prototype.oncut.apply(s,arguments);s._bDoTypeAhead=false};v.prototype.onsapenter=function(e){var s=e.srcControl,i=s.getSelectedItem();if(i&&this.getFilterSecondaryValues()){s.updateDomValue(i.getText())}t.prototype.onsapenter.apply(s,arguments);if(!s.getEnabled()||!s.getEditable()){return}if(s.isOpen()&&!this.isComposingCharacter()){s.close()}};["onsapup","onsapdown","onsappageup","onsappagedown","onsaphome","onsapend"].forEach(function(e){v.prototype[e]=function(t){this.handleListNavigation(t,e)}});v.prototype.handleListNavigation=function(e,t){var s=e.srcControl;if(!s.getEnabled()||!s.getEditable()){return}e.preventDefault();this.loadItems(function(){this.syncPickerContent();if(!this.isOpen()){this.handleInlineListNavigation(t)}else{var s=this._getSuggestionsPopover();s&&s.handleListNavigation(this,e,t)}e.setMarked()})};v.prototype.handleInlineListNavigation=function(e){var t=this.getItems(),s=u.getSelectableItems(t),i=this.getSelectedItem(),o;switch(e){case"onsapdown":o=s.indexOf(i)+1;break;case"onsapup":o=i?s.indexOf(i)-1:s.length-1;break;case"onsapend":o=s.length-1;break;case"onsaphome":o=0;break;case"onsappagedown":o=Math.min(s.length-1,s.indexOf(i)+10);break;case"onsappageup":o=Math.max(0,s.indexOf(i)-10);break}this.handleSelectionFromList(s[o])};v.prototype.handleSelectionFromList=function(e){if(!e){return}var t=this.getFocusDomRef(),s=t.value.substring(0,t.selectionStart),i=this.getSelectedItem(),o=this.getLastFocusedListItem(),n,r,a,l;if(e.isA("sap.m.StandardListItem")||e.isA("sap.m.GroupHeaderListItem")){n=e;e=u.getItemByListItem(this.getItems(),e)}else{n=u.getListItem(e)}this.setSelection(e);this.setLastFocusedListItem(n);if(e.isA("sap.ui.core.SeparatorItem")){this.setSelectedItem(null);this.updateDomValue(s);this.fireSelectionChange({selectedItem:null});this._getGroupHeaderInvisibleText().setText(this._oRb.getText("LIST_ITEM_GROUP_HEADER")+" "+e.getText());return}if(e!==i){r=e.getText();l=o&&o.isA("sap.m.GroupHeaderListItem");a=f(g(t,l),r,s,l);this.updateDomValue(r);this.fireSelectionChange({selectedItem:e});e=this.getSelectedItem();this.selectText(a,t.value.length)}};v.prototype.setLastFocusedListItem=function(e){this._oLastFocusedListItem=e};v.prototype.getLastFocusedListItem=function(){return this._oLastFocusedListItem};v.prototype.onsapshow=function(e){var s,i,o=this.getEditable(),n;t.prototype.onsapshow.apply(this,arguments);this.syncPickerContent();if(!this.getValue()&&o){s=u.getSelectableItems(this.getItems());i=s[0];if(i){n=u.getListItem(i);if(this.isOpen()){this._getSuggestionsPopover().updateFocus(this,n);this.setLastFocusedListItem(n)}else{this.addStyleClass("sapMFocus")}this.setSelection(i);this.updateDomValue(i.getText());this.fireSelectionChange({selectedItem:i});setTimeout(function(){this.selectText(0,i.getText().length)}.bind(this),0)}}};v.prototype.onsaphide=v.prototype.onsapshow;v.prototype.ontap=function(e){if(!this.getEnabled()){return}this.updateFocusOnClose()};v.prototype.updateFocusOnClose=function(){var e=this.getFocusDomRef(),t=this._getSuggestionsPopover();this.setLastFocusedListItem(null);if(t){t.setValueStateActiveState(false);t.updateFocus(this)}e.removeAttribute("aria-activedescendant")};v.prototype.onmouseup=function(){if(this.getPickerType()==="Dropdown"&&document.activeElement===this.getFocusDomRef()&&!this.getSelectedText()){this.selectText(0,this.getValue().length)}};v.prototype.onfocusin=function(e){var t=this.getPickerType()==="Dropdown";if(this._bIsBeingDestroyed){return}if(e.target===this.getOpenArea()){this.bOpenValueStateMessage=false;if(t&&!this.isPlatformTablet()){this.focus()}}else{if(!this.isOpen()&&this.bOpenValueStateMessage&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage()}this.bOpenValueStateMessage=true}if(this.getEnabled()&&(!this.isOpen()||!this.getSelectedItem()||!this._getList().hasStyleClass("sapMListFocus"))){this.addStyleClass("sapMFocus")}};v.prototype.onsapfocusleave=function(e){var s,i,o,n,r=this.getSelectedItem();if(r&&this.getFilterSecondaryValues()){this.updateDomValue(r.getText())}t.prototype.onsapfocusleave.apply(this,arguments);if(this.isPickerDialog()){return}i=this.getPicker();if(!e.relatedControlId||!i){return}s=this.isPlatformTablet();o=y.byId(e.relatedControlId);n=o&&o.getFocusDomRef();if(a(i.getFocusDomRef(),n)&&!s&&!this._getSuggestionsPopover().getValueStateActiveState()){this.focus()}};v.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return}var e=this.getSelectedKey(),t=this.getItemByKey(""+e);if(t&&e!==""){this.setAssociation("selectedItem",t,true);this._setPropertyProtected("selectedItemId",t.getId(),true);this.setValue(t.getText());this._sValue=this.getValue()}};v.prototype.configPicker=function(e){var t=this.getRenderer(),s=t.CSS_CLASS_COMBOBOXBASE;e.setHorizontalScrolling(false).addStyleClass(s+"Picker").addStyleClass(s+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this)};v.prototype._configureList=function(e){var t=this.getRenderer();if(!e){return}e.applyAriaRole("listbox");e.setMode(S.SingleSelectMaster).addStyleClass(t.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(t.CSS_CLASS_COMBOBOX+"List");e.attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);e.addEventDelegate({onBeforeRendering:this.onBeforeRenderingList,onAfterRendering:this.onAfterRenderingList},this)};v.prototype.getDefaultSelectedItem=function(){return null};v.prototype.getChangeEventParams=function(){return{itemPressed:false}};v.prototype.clearSelection=function(){this.setAssociation("selectedItem",null);this.setSelectedItemId("");this.setSelectedKey("")};v.prototype.selectText=function(e,s){t.prototype.selectText.apply(this,arguments);return this};v.prototype.clone=function(e){var s=t.prototype.clone.apply(this,arguments),i=this._getList();s.setAssociation("selectedItem",null);if(!this.isBound("items")&&i){s.syncPickerContent();s.setSelectedIndex(this.indexOfItem(this.getSelectedItem()))}return s};v.prototype.open=function(){this.syncPickerContent();t.prototype.open.call(this);var e=u.getListItem(this.getSelectedItem());if(!this._bInputFired){this._getSuggestionsPopover()&&this._getSuggestionsPopover().updateFocus(this,e)}this._bInputFired=false;return this};v.prototype.syncPickerContent=function(){var e,t=this.getPicker(),s=this.getInputForwardableProperties();if(!t){var i,o;t=this.createPicker(this.getPickerType());e=this.getPickerTextField();u.fillList(this.getItems(),this._getList(),this._mapItemToListItem.bind(this));d(this.getItems(),this.filterItems(""));if(e){s.forEach(function(t){t=t.charAt(0).toUpperCase()+t.slice(1);i="set"+t;o="get"+t;if(e[i]){e[i](this[o]())}},this)}this._getSuggestionsPopover().updateValueState(this.getValueState(),this.getValueStateText(),this.getShowValueStateMessage())}this.synchronizeSelection();return t};v.prototype.findAggregatedObjects=function(){var e=this._getList();if(e){return s.prototype.findAggregatedObjects.apply(e,arguments)}return[]};v.prototype.setSelectedItem=function(e){if(typeof e==="string"){this.setAssociation("selectedItem",e,true);e=y.byId(e)}if(!(e instanceof n)&&e!==null){return this}if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);this.setValue(this._getSelectedItemText(e));return this};v.prototype.setSelectedItemId=function(e){e=this.validateProperty("selectedItemId",e);if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);e=this.getSelectedItem();this.setValue(this._getSelectedItemText(e));return this};v.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var t=e===this.getMetadata().getProperty("selectedKey").defaultValue,s=this.isBound("selectedKey")&&this.isBound("value")&&this.getBindingInfo("selectedKey").skipModelUpdate;if(t){this.setSelection(null);if(!s){this.setValue("")}return this}var i=this.getItemByKey(e);if(i){this.setSelection(i);if(!s){this.setValue(this._getSelectedItemText(i))}return this}this._sValue=this.getValue();return this._setPropertyProtected("selectedKey",e)};v.prototype._setPropertyProtected=function(e,t,s){try{return this.setProperty(e,t,s)}catch(e){I.warning("setSelectedKey update failed due to exception. Loggable in support mode log",null,null,function(){return{exception:e}})}};v.prototype.getSelectedItem=function(){var e=this.getAssociation("selectedItem");return e===null?null:y.byId(e)||null};v.prototype._decoratePopupInput=function(e){t.prototype._decoratePopupInput.apply(this,arguments);if(!e||!e.isA(["sap.m.InputBase"])){return}e.addEventDelegate({onsapenter:function(){var t=e.getValue();this.updateDomValue(t);this.onChange();if(t){this.updateDomValue(t);this.onChange();this.close()}}},this);e.attachChange(this._handleInnerInputChange.bind(this));return e};v.prototype._handleInnerInputChange=function(e){if(e.getParameter("value")===""){this.clearSelection();this.clearFilter()}};v.prototype.applyShowItemsFilters=function(){var e,t;this.syncPickerContent();e=this.getPicker();t=function(){e.detachBeforeOpen(t,this);e=null;d(this.getItems(),this.filterItems(this.getValue()||"_"))};e.attachBeforeOpen(t,this)};v.prototype.showItems=function(e){var s,i,o=Array.prototype.slice.call(arguments),n=this.fnFilter,r=function(){this.setFilterFunction(e||function(){return true});i=this.filterItems(this.getValue()||"_");d(this.getItems(),i);this.setFilterFunction(n);s=i.items;if(s&&s.length){t.prototype.showItems.apply(this,o)}}.bind(this);this.attachLoadItems(r);this.loadItems(r)};v.prototype._getFormattedValueStateText=function(){if(this.isOpen()){return this._getSuggestionsPopover()._getValueStateHeader().getFormattedText()}else{return e.prototype.getFormattedValueStateText.call(this)}};v.prototype.handleClearIconPress=function(e){var t=this.getSelectedItem(),s=this.getChangeEventParams();if(!(this.getEnabled()&&this.getEditable())){return}if(this.getValue()!==""){this.clearSelection();this.bOpenedByKeyboardOrButton?this.clearFilter():this.close();this.setProperty("effectiveShowClearIcon",false)}if(t){this.fireSelectionChange({selectedItem:null});this.fireChangeEvent(null,s)}};v.prototype._getToolbarInteractive=function(){return true};return v});
//# sourceMappingURL=ComboBox.js.map