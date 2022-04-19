/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/base/util/isEmptyObject","sap/f/cards/Header","sap/f/cards/HeaderRenderer","sap/m/library","sap/ui/integration/util/BindingHelper","sap/ui/model/json/JSONModel","sap/ui/integration/util/LoadingProvider"],function(t,i,e,a,o,r,s,n){"use strict";var d=o.AvatarColor;var h=e.extend("sap.ui.integration.cards.Header",{constructor:function(t,a,o){t=t||{};this._bIsEmpty=i(t);var s={title:t.title,titleMaxLines:t.titleMaxLines,subtitle:t.subTitle,subtitleMaxLines:t.subTitleMaxLines,dataTimestamp:t.dataTimestamp};if(t.status&&t.status.text&&!t.status.text.format){s.statusText=t.status.text}if(t.icon){s.iconSrc=t.icon.src;s.iconDisplayShape=t.icon.shape;s.iconInitials=t.icon.text;s.iconAlt=t.icon.alt;s.iconBackgroundColor=t.icon.backgroundColor||(t.icon.text?d.Accent6:d.Transparent)}if(s.iconSrc){s.iconSrc=r.formattedProperty(s.iconSrc,function(t){return o.formatSrc(t)})}s.toolbar=a;e.call(this,s);if(a&&a.isA("sap.ui.integration.controls.ActionsToolbar")){a.attachVisibilityChange(this._handleToolbarVisibilityChange.bind(this))}},metadata:{library:"sap.ui.integration",aggregations:{_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:a});h.prototype.init=function(){e.prototype.init.call(this);this._bReady=false;this.setAggregation("_loadingProvider",new n);this._aReadyPromises=[];this._awaitEvent("_dataReady");this._awaitEvent("_actionHeaderReady");Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready")}.bind(this))};h.prototype.exit=function(){e.prototype.exit.call(this);this._oServiceManager=null;this._oDataProviderFactory=null;if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null}if(this._oActions){this._oActions.destroy();this._oActions=null}};h.prototype.isReady=function(){return this._bReady};h.prototype.isLoading=function(){var t=this.getAggregation("_loadingProvider"),i=this.getCardInstance(),e=i&&i.isA("sap.ui.integration.widgets.Card")?i.isLoading():false;return!t.isDataProviderJson()&&(t.getLoading()||e)};h.prototype._handleError=function(t){this.fireEvent("_error",{logMessage:t})};h.prototype._handleToolbarVisibilityChange=function(t){var i=t.getParameter("visible");if(this._bIsEmpty&&this.getVisible()!==i){this.setVisible(i)}};h.prototype._awaitEvent=function(t){this._aReadyPromises.push(new Promise(function(i){this.attachEventOnce(t,function(){i()})}.bind(this)))};h.prototype.setServiceManager=function(t){this._oServiceManager=t;return this};h.prototype.setDataProviderFactory=function(t){this._oDataProviderFactory=t;return this};h.prototype._setDataConfiguration=function(t){var i=this.getCardInstance(),e="/",a;if(t&&t.path){e=t.path}this.bindObject(e);if(this._oDataProvider){this._oDataProvider.destroy()}this._oDataProvider=i.getDataProviderFactory().create(t,this._oServiceManager);this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(t&&t.name){a=i.getModel(t.name)}else if(this._oDataProvider){a=new s;this.setModel(a)}if(this._oDataProvider){this._oDataProvider.attachDataRequested(function(){this.showLoadingPlaceholders()}.bind(this));this._oDataProvider.attachDataChanged(function(t){a.setData(t.getParameter("data"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.attachError(function(t){this._handleError(t.getParameter("message"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.triggerDataUpdate()}else{this.fireEvent("_dataReady")}};h.prototype.refreshData=function(){if(this._oDataProvider){this._oDataProvider.triggerDataUpdate()}};h.prototype.showLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(true)};h.prototype.hideLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(false)};h.prototype.onDataRequestComplete=function(){this.fireEvent("_dataReady");this.hideLoadingPlaceholders()};h.prototype.getCardInstance=function(){return t.byId(this.getCard())};return h});