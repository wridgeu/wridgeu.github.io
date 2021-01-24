/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core"],function(e){"use strict";var r={};var t={"{{parameters.NOW_ISO}}":n,"{{parameters.TODAY_ISO}}":a,"{{parameters.LOCALE}}":i};function n(){return(new Date).toISOString()}function a(){return(new Date).toISOString().slice(0,10)}function i(){return e.getConfiguration().getLocale().toString()}r.processPredefinedParameter=function(e){var r;Object.keys(t).forEach(function(n){r=new RegExp(n,"g");if(e.indexOf(n)>-1){e=e.replace(r,t[n]())}});return e};return r});