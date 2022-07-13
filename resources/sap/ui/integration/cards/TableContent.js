/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseListContent","./TableContentRenderer","sap/ui/integration/library","sap/m/Table","sap/m/Column","sap/m/ColumnListItem","sap/m/Text","sap/m/Link","sap/m/ProgressIndicator","sap/m/ObjectIdentifier","sap/m/ObjectStatus","sap/m/Avatar","sap/ui/core/library","sap/m/library","sap/ui/integration/util/BindingResolver","sap/ui/integration/util/BindingHelper","sap/base/Log"],function(t,e,i,r,n,a,o,s,l,c,d,u,p,h,g,f,m){"use strict";var v=h.AvatarSize;var y=h.AvatarColor;var C=p.VerticalAlign;var b=h.ListSeparators;var w=h.ListType;var A=i.CardActionArea;var I=t.extend("sap.ui.integration.cards.TableContent",{metadata:{library:"sap.ui.integration"},renderer:e});I.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._oItemTemplate){this._oItemTemplate.destroy();this._oItemTemplate=null}};I.prototype._getTable=function(){if(this._bIsBeingDestroyed){return null}var t=this.getAggregation("_content");if(!t){t=new r({id:this.getId()+"-Table",showSeparators:b.None});this.setAggregation("_content",t)}return t};I.prototype.setConfiguration=function(e){t.prototype.setConfiguration.apply(this,arguments);e=this.getParsedConfiguration();if(!e){return this}if(e.rows&&e.columns){this._setStaticColumns(e.rows,e.columns);return this}if(e.row&&e.row.columns){this._setColumns(e.row)}return this};I.prototype.getStaticConfiguration=function(){var t=this.getInnerList().getItems(),e=this.getParsedConfiguration(),i=t[0]&&t[0].isA("sap.m.GroupHeaderListItem"),r=[],n=[],a=[],o,s;(e.row.columns||[]).forEach(function(t){t=g.resolveValue(t,this,this.getBindingContext().getPath());r.push({title:t.title,width:t.width,hAlign:t.hAlign,visible:t.visible,identifier:t.identifier})}.bind(this));t.forEach(function(t){if(t.isA("sap.m.GroupHeaderListItem")){if(s){a.push(s)}n=[];s={title:t.getTitle(),rows:n}}else{o=g.resolveValue(e.row,this,t.getBindingContext().getPath());(o.columns||[]).forEach(function(t){delete t.title;delete t.width;delete t.hAlign;delete t.visible;delete t.identifier});n.push(o)}}.bind(this));if(s){a.push(s)}var l={headers:r};if(i){l.groups=a}else{l.rows=n}return l};I.prototype.onDataChanged=function(){this._handleNoItemsError(this.getParsedConfiguration().row);this._checkHiddenNavigationItems(this.getParsedConfiguration().row)};I.prototype._setColumns=function(t){var e=[],i=this._getTable(),r=t.columns;r.forEach(function(t){i.addColumn(new n({header:new o({text:t.title}),width:t.width,hAlign:t.hAlign,visible:t.visible}));e.push(this._createCell(t))}.bind(this));this._oItemTemplate=new a({cells:e,vAlign:C.Middle});this._oActions.attach({area:A.ContentItem,actions:t.actions,control:this,actionControl:this._oItemTemplate,enabledPropertyName:"type",enabledPropertyValue:w.Active,disabledPropertyValue:w.Inactive});var s=this.getParsedConfiguration().group;if(s){this._oSorter=this._getGroupSorter(s)}var l={template:this._oItemTemplate,sorter:this._oSorter};this._bindAggregationToControl("items",i,l)};I.prototype._setStaticColumns=function(t,e){var i=this._getTable();e.forEach(function(t){i.addColumn(new n({header:new o({text:t.title}),width:t.width,hAlign:t.hAlign}))});t.forEach(function(t){var e=new a({vAlign:C.Middle});if(t.cells&&Array.isArray(t.cells)){for(var r=0;r<t.cells.length;r++){e.addCell(this._createCell(t.cells[r]))}}if(t.actions&&Array.isArray(t.actions)){this._oActions.attach({area:A.ContentItem,actions:t.actions,control:this,actionControl:e,enabledPropertyName:"type",enabledPropertyValue:w.Active,disabledPropertyValue:w.Inactive})}i.addItem(e)}.bind(this));this.fireEvent("_actionContentReady")};I.prototype._createCell=function(t){var e;if(t.identifier){if(typeof t.identifier=="object"){if(!g.isBindingInfo(t.identifier)){m.warning("Usage of object type for column property 'identifier' is deprecated.",null,"sap.ui.integration.widgets.Card")}if(t.identifier.url){t.actions=[{type:"Navigation",parameters:{url:t.identifier.url,target:t.identifier.target}}]}}e=new c({title:t.value});if(t.actions){e.setTitleActive(true);this._oActions.attach({area:A.ContentItemDetail,actions:t.actions,control:this,actionControl:e,enabledPropertyName:"titleActive",eventName:"titlePress"})}return e}if(t.url){m.warning("Usage of column property 'url' is deprecated. Use card actions for navigation.",null,"sap.ui.integration.widgets.Card");t.actions=[{type:"Navigation",parameters:{url:t.url,target:t.target}}]}if(t.actions){e=new s({text:t.value});this._oActions.attach({area:A.ContentItemDetail,actions:t.actions,control:this,actionControl:e,enabledPropertyName:"enabled"});return e}if(t.state){return new d({text:t.value,state:t.state})}if(t.value){return new o({text:t.value})}if(t.icon){var i=f.formattedProperty(t.icon.src,function(t){return this._oIconFormatter.formatSrc(t)}.bind(this));return new u({src:i,displayShape:t.icon.shape,displaySize:t.icon.size||v.XS,tooltip:t.icon.alt,initials:t.icon.text,backgroundColor:t.icon.backgroundColor||(t.icon.text?undefined:y.Transparent)}).addStyleClass("sapFCardIcon")}if(t.progressIndicator){return new l({percentValue:t.progressIndicator.percent,displayValue:t.progressIndicator.text,state:t.progressIndicator.state})}};I.prototype.getInnerList=function(){return this._getTable()};return I});