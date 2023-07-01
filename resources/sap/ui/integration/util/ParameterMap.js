/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/date/UI5Date"],function(e,r){"use strict";var n={};var t={"{{parameters.NOW_ISO}}":a,"{{parameters.TODAY_ISO}}":i,"{{parameters.LOCALE}}":o};function a(){return r.getInstance().toISOString()}function i(){return r.getInstance().toISOString().slice(0,10)}function o(){return e.getConfiguration().getLocale().toString()}n.processPredefinedParameter=function(e){var r;Object.keys(t).forEach(function(n){r=new RegExp(n,"g");if(e.indexOf(n)>-1){e=e.replace(r,t[n]())}});return e};n.getParamsForModel=function(){var e={};for(var r in t){var n=r.indexOf("."),a=r.indexOf("}");e[r.substring(n+1,a)]=t[r]()}return e};return n});
//# sourceMappingURL=ParameterMap.js.map