/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/Locale","sap/ui/core/date/UI5Date"],function(e,r,n){"use strict";var t={};var a={"{{parameters.NOW_ISO}}":i,"{{parameters.TODAY_ISO}}":o,"{{parameters.LOCALE}}":c};function i(){return n.getInstance().toISOString()}function o(){return n.getInstance().toISOString().slice(0,10)}function c(){return new r(e.getLanguageTag()).toString()}t.processPredefinedParameter=function(e){var r;Object.keys(a).forEach(function(n){r=new RegExp(n,"g");if(e.indexOf(n)>-1){e=e.replace(r,a[n]())}});return e};t.getParamsForModel=function(){var e={};for(var r in a){var n=r.indexOf("."),t=r.indexOf("}");e[r.substring(n+1,t)]=a[r]()}return e};return t});
//# sourceMappingURL=ParameterMap.js.map