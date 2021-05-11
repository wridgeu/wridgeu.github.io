/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/fieldExtensibility/Access"],function(e){"use strict";var t={};var n;function i(){if(!n){n=e}return n}function r(e,t){var n=i();return Promise.resolve(n[e](t))}t.onControlSelected=function(e){return r("onControlSelected",e)};t.isExtensibilityEnabled=function(e){return r("isExtensibilityEnabled",e)};t.isServiceOutdated=function(e){return r("isServiceOutdated",e)};t.setServiceValid=function(e){return r("setServiceValid",e)};t.getTexts=function(){return r("getTexts")};t.getExtensionData=function(e){return r("getExtensionData",e)};t.onTriggerCreateExtensionData=function(e){return r("onTriggerCreateExtensionData",e)};return t});