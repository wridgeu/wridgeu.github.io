/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/base/Log","sap/ui/base/ManagedObject","sap/ui/integration/cards/actions/CustomAction","sap/ui/integration/cards/actions/DateChangeAction","sap/ui/integration/cards/actions/MonthChangeAction","sap/ui/integration/cards/actions/SubmitAction","sap/ui/integration/cards/actions/NavigationAction","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/BindingResolver","sap/base/strings/capitalize","sap/ui/integration/cards/actions/ShowCardAction","sap/ui/integration/cards/actions/HideCardAction"],function(e,t,n,a,i,r,o,s,c,l,u,d,f){"use strict";function p(e){if(e&&typeof e==="object"){return e.name}return e}var g=e.CardActionArea,h=e.CardActionType;var v=n.extend("sap.ui.integration.cards.actions.CardActions",{metadata:{library:"sap.ui.integration",properties:{card:{type:"object"},bindingPathResolver:{type:"function"}}}});v.prototype.attach=function(e){var t=e.control,n=e.area;e.actionControl=e.actionControl||e.control;e.enabledPropertyValue=e.enabledPropertyValue||true;e.disabledPropertyValue=e.disabledPropertyValue||false;e.eventName=e.eventName||"press";if(!e.actions){this._fireActionReady(t,n);return}var a=e.actions[0];if(a&&a.type){e.action=a;this._attachAction(e)}else{this._fireActionReady(t,n)}};v.prototype._attachAction=function(e){var t=e.action,n=e.area,a=e.control,i=e.actionControl,r=e.enabledPropertyName,o=e.enabledPropertyValue,s=e.disabledPropertyValue,c=true,l=this._isSingleAction(n),u=true;if(r){c=false;if(t.service&&!l){this._setControlEnabledStateUsingService(t,a,i,r,o,s)}else{this._setControlEnabledState(t,i,r,o,s)}}if(t.service&&l){this._getSingleActionEnabledState(t,a).then(function(t){if(t){this._attachEventListener(e)}this._fireActionReady(a,n)}.bind(this));return}if(c){u=t.enabled!==false&&t.enabled!=="false"}if(u){this._attachEventListener(e)}this._fireActionReady(a,n)};v.prototype._setControlEnabledStateUsingService=function(e,t,a,i,r,o){var s=n.bindingParser("{path:''}");s.formatter=function(n){var a=this.getBindingContext(),i,s;if(a){i=a.getPath()}s=l.resolveValue(e.parameters,t,i);if(n.__resolved){if(!n.__enabled||n.__enabled==="false"){return o}return r}if(!n.__promise){n.__promise=true;t._oServiceManager.getService(p(e.service)).then(function(e){if(e){e.enabled({parameters:s}).then(function(e){n.__resolved=true;n.__enabled=e;t.getModel().checkUpdate(true)}).catch(function(){n.__resolved=true;n.__enabled=false})}else{n.__resolved=true;n.__enabled=false}})}return o};a.bindProperty(i,s)};v.prototype._setControlEnabledState=function(e,t,n,a,i){var r,o;if(typeof e.enabled==="object"){r=c.formattedProperty(e.enabled,function(e){if(!e||e==="false"){return i}return a})}if(r){t.bindProperty(n,r)}else{o=e.enabled===false||e.enabled==="false"?i:a;t.setProperty(n,o)}};v.prototype._getSingleActionEnabledState=function(e,t){var n=t.getBindingContext(),a,i;if(n){i=n.getPath()}a=l.resolveValue(e.parameters,t,i);return new Promise(function(n){t._oServiceManager.getService(p(e.service)).then(function(e){if(e){e.enabled({parameters:a}).then(function(e){n(e)}).catch(function(){n(false)})}else{n(false)}}).catch(function(){n(false)})})};v.prototype._fireActionReady=function(e,t){var n=t===g.Header;var a=n?"_actionHeaderReady":"_actionContentReady";e.fireEvent(a)};v.prototype._resolveBindingPath=function(e){var t=e.getSource().getBindingContext(),n;if(this.getBindingPathResolver()){n=this.getBindingPathResolver()(e)}else if(t){n=t.getPath()}return n};v.prototype._handleServiceAction=function(e,n,a){var i=e.getSource();var r=this._resolveBindingPath(e);a._oServiceManager.getService(p(n.service)).then(function(e){if(e){e.navigate({parameters:l.resolveValue(n.parameters,i,r)})}}).catch(function(e){t.error("Navigation service unavailable",e)}).finally(function(){this._processAction(i,n,r)}.bind(this))};v.prototype._attachEventListener=function(e){var t=e.action;e.actionControl["attach"+u(e.eventName)](function(n){var a=n.getSource();if(t.service){this._handleServiceAction(n,t,e.control)}else{this._processAction(a,t,this._resolveBindingPath(n))}}.bind(this))};v.prototype._processAction=function(e,t,n){var a=this._getHostInstance(),i=this.getCard();v.fireAction({card:i,host:a,action:t,parameters:l.resolveValue(t.parameters,e,n),source:e})};v.prototype._getHostInstance=function(){var e=this.getCard();if(e){return e.getHostInstance()}return null};v.prototype.fireAction=function(e,t,n){v.fireAction({card:this.getCard(),host:this._getHostInstance(),action:{type:t},parameters:n,source:e})};v.fireAction=function(e){var t=e.host,n=e.card,a=n.getAggregation("_extension"),i=e.parameters||{},r={type:e.action.type,card:n,actionSource:e.source,parameters:i},o=Object.assign({},r,{manifestParameters:i}),s=n.fireAction(o);if(!s){return false}if(t){s=t.fireAction(r)}if(!s){return false}if(a){s=a.fireAction(r)}if(s){var c=v._createHandler(e);if(c){c.execute();c.destroy()}}return s};v.prototype._isSingleAction=function(e){return[g.Header,g.Content,g.ContentItemDetail,g.ActionsStrip].indexOf(e)>-1};v._createHandler=function(e){var n=null;switch(e.action.type){case h.Custom:n=a;break;case h.DateChange:n=i;break;case h.HideCard:n=f;break;case h.MonthChange:n=r;break;case h.Navigation:n=s;break;case h.ShowCard:n=d;break;case h.Submit:n=o;break;default:t.error("Unknown action type '"+e.action.type+"'. Expected one of "+Object.values(h).join(", "),null,"sap.ui.integration.widgets.Card")}if(n){return new n({config:e.action,parameters:e.parameters,actionHandler:e.card.getManifestEntry("/sap.card/configuration/actionHandlers/"+e.action.type.toLowerCase()),card:e.card,source:e.source})}return null};return v});