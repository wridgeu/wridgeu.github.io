/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Component","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/ChangePersistence","sap/ui/fl/Utils"],function(n,e,t,a){"use strict";var o={};o._instanceCache={};o.getChangePersistenceForComponent=function(n){var e=o._instanceCache[n];if(!e){var a={name:n};e=new t(a);o._instanceCache[n]=e}return e};o.getChangePersistenceForControl=function(n){var e;e=a.getComponentClassName(n);return o.getChangePersistenceForComponent(e)};o.registerLoadComponentEventHandler=function(){n._fnLoadComponentCallback=this._onLoadComponent.bind(this)};o._onLoadComponent=function(n,t){if(!a.isApplication(t)||!n.id){return}e.initialize({componentData:n.componentData||n.settings&&n.settings.componentData,asyncHints:n.asyncHints,manifest:t,componentId:n.id})};return o},true);