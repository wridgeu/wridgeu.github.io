/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/AbstractContainer","sap/m/Bar","sap/m/Button","sap/m/List","sap/m/IconTabBar","sap/m/IconTabFilter","sap/m/p13n/AbstractContainerItem","sap/ui/Device","sap/m/library","sap/m/StandardListItem","sap/m/CustomListItem","sap/ui/core/Control"],function(t,e,i,a,s,o,n,r,h,p,g,d){"use strict";var v=h.ButtonType;var u=h.ListType;var _=t.extend("sap.m.p13n.Container",{metadata:{library:"sap.m",properties:{listLayout:{type:"boolean",defaultValue:false}}},renderer:{apiVersion:2}});_.prototype.DEFAULT_KEY="$default";_.prototype.init=function(){t.prototype.init.apply(this,arguments);this.addStyleClass("sapMP13nContainer");this.setListLayout(r.system.phone)};_.prototype.setListLayout=function(t){this.setProperty("listLayout",t);this._getTabBar().removeAllItems();this._getNavigationList().removeAllItems();var i;if(t){this._getTabBar().setVisible(false);this._getNavigationList();this.switchView(this.DEFAULT_KEY);i=this._getNavBackBtn()}else{this._getTabBar().setVisible(true);var a=this.getViews();if(a.length>1){this.switchView(a[1].getKey())}i=this._getTabBar()}var s=this.getHeader();if(!s){var o=new e({contentLeft:[i]});this.setHeader(o)}else{s.removeAllContentLeft();s.addContentLeft(i)}this.getViews().forEach(function(t){this._addToNavigator(t)}.bind(this));return this};_.prototype.switchView=function(e){t.prototype.switchView.apply(this,arguments);if(this._bPrevented){return}var i=this.getParent();if(i&&i.isA("sap.ui.core.Control")){i.focus();i.invalidate();var a=i.getDependents();if(a){a.forEach(function(t){if(t&&t.isA("sap.ui.core.Control")){t.invalidate()}})}}this.oLayout.setShowHeader(e!==this.DEFAULT_KEY);this._getTabBar().setSelectedKey(e);this._getNavBackBtn().setVisible(e!==this.DEFAULT_KEY);this._getNavBackBtn().setText(this.getView(e)&&this.getView(e).getText()||e)};_.prototype.addView=function(e){t.prototype.addView.apply(this,arguments);this._addToNavigator(e);return this};_.prototype.removeView=function(e){t.prototype.removeView.apply(this,arguments);this._removeFromNavigator(e)};_.prototype.addSeparator=function(){if(!this.getProperty("listLayout")){return}var t=this._getNavigationList().getItems();var e=t[t.length-1];e.addStyleClass("sapMMenuDivider");return this};_.prototype._getTabBar=function(){if(!this._oTabBar){this._oTabBar=new s({expandable:false,expanded:true,select:function(t){this.switchView(t.getParameter("key"))}.bind(this)});this.addDependent(this._oTabBar)}return this._oTabBar};_.prototype._getNavigationList=function(){if(!this._oNavigationList){this._oNavigationList=new a({itemPress:function(t){var e=t.getParameter("listItem");this.switchView(e._key)}.bind(this)}).addStyleClass("p13nContainerDefaultList");this.addDependent(this._oNavigationList)}if(!this.getView(this.DEFAULT_KEY)){var t=new n({key:this.DEFAULT_KEY,content:this._oNavigationList});this.addView(t)}return this._oNavigationList};_.prototype._getNavBackBtn=function(){if(!this._oNavBackBtn){this._oNavBackBtn=new i({type:v.Back,press:function(t){this.switchView(this.DEFAULT_KEY)}.bind(this)});this.addDependent(this._oNavBackBtn)}return this._oNavBackBtn};_.prototype._addToNavigator=function(t){var e=t.getKey(),i=t.getText(),a=t.getIcon();if(e==this.DEFAULT_KEY){return}if(this.getListLayout()){this.getView(this.DEFAULT_KEY);var s=new p({type:u.Navigation,icon:a,title:i});s._key=e;this._getNavigationList().addItem(s)}else{this._getTabBar().addItem(new o({key:e,text:i||e}))}};_.prototype._removeFromNavigator=function(t){var e=t.getKey();if(e==this.DEFAULT_KEY){return}if(this.getListLayout()){var i=this._getNavigationList().getItems().find(function(t){return t._key===e});this._getNavigationList().removeItem(i)}else{var a=this._getTabBar().getItems().find(function(t){return t.getKey()===e});this._getTabBar().removeItem(a)}};_.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._oTabBar){this._oTabBar.destroy();this._oTabBar=null}if(this._oNavigationList){this._oNavigationList.destroy();this._oNavigationList=null}this._oNavBackBtn=null};return _});