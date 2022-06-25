/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/library","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/Device"],function(e,t,s,i,a){"use strict";var n=t.TextDirection;var r={apiVersion:2};r.CSS_CLASS="sapMSelectList";r.render=function(e,t){this.writeOpenListTag(e,t,{elementData:true});this.renderItems(e,t);this.writeCloseListTag(e,t)};r.writeOpenListTag=function(e,t,s){var i=r.CSS_CLASS,a=t.getProperty("_tabIndex");if(s.elementData){e.openStart("ul",t)}else{e.openStart("ul")}e.class(i);if(t.getShowSecondaryValues()){e.class(i+"TableLayout")}if(!t.getEnabled()){e.class(i+"Disabled")}if(a){e.attr("tabindex",a)}e.style("width",t.getWidth());this.writeAccessibilityState(e,t);e.openEnd()};r.writeCloseListTag=function(e,t){e.close("ul")};r.renderItems=function(e,t){var s=t._getNonSeparatorItemsCount(),i=t.getHideDisabledItems()?t.getEnabledItems():t.getItems(),a=t.getSelectedItem(),n=1,r,l;for(var o=0;o<i.length;o++){l=o===0&&!a;r={selected:a===i[o],setsize:s,elementData:true};if(!(i[o]&&i[o].isA("sap.ui.core.SeparatorItem"))&&i[o].getEnabled()){r.posinset=n++}this.renderItem(e,t,i[o],r,l)}};r.renderDirAttr=function(e,t){if(t!==n.Inherit){e.attr("dir",t.toLowerCase())}};r.renderItem=function(t,s,i,n,l){if(!(i instanceof e)){return}var o=i.getEnabled(),c=s.getSelectedItem(),d=r.CSS_CLASS,I=i.getTooltip_AsString(),f=i.getTextDirection(),p=s.getShowSecondaryValues(),S;t.openStart("li",n.elementData?i:null);if(!p){this.renderDirAttr(t,f)}if(i.getIcon&&i.getIcon()){t.class("sapMSelectListItemWithIcon")}if(i.isA("sap.ui.core.SeparatorItem")){t.class(d+"SeparatorItem");if(p){t.class(d+"Row")}}else{t.class(d+"ItemBase");if(p){t.class(d+"Row")}else{t.class(d+"Item")}if(i.bVisible===false){t.class(d+"ItemBaseInvisible")}if(!o){t.class(d+"ItemBaseDisabled")}if(o&&a.system.desktop){t.class(d+"ItemBaseHoverable")}if(i===c||l){t.class(d+"ItemBaseSelected")}if(o){t.attr("tabindex","0")}}if(I){t.attr("title",I)}this.writeItemAccessibilityState.apply(this,arguments);t.openEnd();if(p){S=s._getColumnsPercentages();t.openStart("span");t.class(d+"Cell");t.class(d+"FirstCell");if(S){t.style("width",S.firstColumn)}t.attr("disabled","disabled");this.renderDirAttr(t,f);t.openEnd();this._renderIcon(t,i);t.text(i.getText());t.close("span");t.openStart("span");t.class(d+"Cell");t.class(d+"LastCell");if(S){t.style("width",S.secondColumn)}t.attr("disabled","disabled");t.openEnd();if(typeof i.getAdditionalText==="function"){t.text(i.getAdditionalText())}t.close("span")}else{this._renderIcon(t,i);t.text(i.getText())}t.close("li")};r.writeAccessibilityState=function(e,t){e.accessibilityState(t,{role:"listbox"})};r.writeItemAccessibilityState=function(e,t,s,a){var n=s.isA("sap.ui.core.SeparatorItem")?"separator":"option";var r;if(!s.getText()&&s.getIcon&&s.getIcon()){var l=i.getIconInfo(s.getIcon());if(l){r=l.text||l.name}}e.accessibilityState(s,{role:n,selected:a.selected,setsize:a.setsize,posinset:a.posinset,label:r})};r._renderIcon=function(e,t){if(t.getIcon&&t.getIcon()){e.icon(t.getIcon(),r.CSS_CLASS+"ItemIcon",{id:t.getId()+"-icon"})}};return r},true);