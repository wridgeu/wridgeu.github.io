/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/util/RequestDataProvider","sap/base/Log","sap/ui/core/Core","sap/base/util/merge"],function(e,t,a,s){"use strict";var r=31536e3;function i(e){var t=e.url,a=e.data,s,r;if(e.method!=="GET"){return e.url}s=new URL(t,window.location.href);for(r in a){s.searchParams.set(r,a[r])}return s.href}var n=e.extend("sap.ui.integration.util.CacheAndRequestDataProvider");n.prototype.init=function(){this._oRefreshWithoutCacheBound=this.refreshWithoutCache.bind(this)};n.prototype.destroy=function(){this._unsubscribeFromHostMessages();this._detachTimestampPress();e.prototype.destroy.apply(this,arguments)};n.prototype.getHostInstance=function(){return a.byId(this.getHost())};n.prototype.getCardInstance=function(){return a.byId(this.getCard())};n.prototype.getCardInstanceHeader=function(){var e=this.getCardInstance();if(!e){return null}return e.getCardHeader()};n.prototype.onDataRequestComplete=function(){var e;if(this._iUpdateIntervalTimeout){clearTimeout(this._iUpdateIntervalTimeout);this._iUpdateIntervalTimeout=null}if(!this._oSettings||!this._oSettings.updateInterval){return}e=parseInt(this._oSettings.updateInterval);if(isNaN(e)){return}this._iUpdateIntervalTimeout=setTimeout(function(){this.refreshWithoutCache()}.bind(this),e*1e3)};n.prototype._request=function(t){var a,s=this.getCardInstanceHeader();this._sCurrentRequestFullUrl=i(t);this._subscribeToHostMessages();a=e.prototype._request.apply(this,arguments);a.then(function(e){var t=e[1],a=t.getResponseHeader("Date");if(a&&s){this._attachTimestampPress();s.setDataTimestamp(new Date(a).toISOString())}}.bind(this));return a};n.prototype.refreshWithoutCache=function(){var e=this.getCardInstanceHeader();if(e){e.setDataTimestampUpdating(true)}setTimeout(function(){this._bCacheOnly=false;this._bNoCache=true;this._triggerDataUpdate()}.bind(this),200)};n.prototype.refreshFromCache=function(){var e=this.getCardInstanceHeader();if(e){e.setDataTimestampUpdating(true)}setTimeout(function(){this._bCacheOnly=true;this._bNoCache=false;this._triggerDataUpdate()}.bind(this),200)};n.prototype._prepareHeaders=function(t,a){var i={enabled:true,maxAge:0,staleWhileRevalidate:true},n=s({request:{cache:i}},a),o=n.request.cache;if(o.noStore){o.enabled=false}if(o.enabled){if(this._bCacheOnly){o.maxAge=r;o.staleWhileRevalidate=false}else if(this._bNoCache){o.maxAge=0;o.staleWhileRevalidate=false}}n.request.cache=o;return e.prototype._prepareHeaders.call(this,t,n)};n.prototype._subscribeToHostMessages=function(){var e=this.getHostInstance();if(this._bIsSubscribed){return}if(!e){return}e.attachMessage(this._handleHostMessage,this);this._bIsSubscribed=true};n.prototype._unsubscribeFromHostMessages=function(){var e=this.getHostInstance();if(!e){return}e.detachMessage(this._handleHostMessage,this);this._bIsSubscribed=false};n.prototype._handleHostMessage=function(e){var a=e.getParameter("data");if(a.type!=="ui-integration-card-update"){return}if(a.url!==this._sCurrentRequestFullUrl){return}t.info("[CARDS CACHE] message ui-integration-card-update received for "+a.url);this.refreshFromCache()};n.prototype._attachTimestampPress=function(e){var t=this.getCardInstance(),a=this.getCardInstanceHeader();if(this._oHeaderDelegate){return}if(!a){return}this._oHeaderDelegate={onBeforeRendering:function(){var e=t.$().find(".sapFCardDataTimestamp");e.off("click",this._oRefreshWithoutCacheBound)}.bind(this),onAfterRendering:function(){var e=t.$().find(".sapFCardDataTimestamp");e.on("click",this._oRefreshWithoutCacheBound)}.bind(this)};a.addEventDelegate(this._oHeaderDelegate)};n.prototype._detachTimestampPress=function(e){var t=this.getCardInstance(),a=this.getCardInstanceHeader(),s=t&&t.$().find(".sapFCardDataTimestamp");if(!a){return}s.off("click",this._oRefreshWithoutCacheBound);a.removeEventDelegate(this._oHeaderDelegate);this._oHeaderDelegate=null};return n});