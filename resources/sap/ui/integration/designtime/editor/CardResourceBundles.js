/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions","sap/base/i18n/ResourceBundle","sap/base/util/includes"],function(e,n,a){"use strict";var s=function(){var s;function r(r){s=[];var i=e.loadResource("sap/ui/integration/designtime/editor/languages.json",{dataType:"json",failOnError:false,async:false});for(var u in i){var t=[u];if(u.indexOf("_")>-1){t.push(u.substring(0,u.indexOf("_")))}if(!a(t,"en")){t.push("en")}var o=n.create({url:r,async:false,locale:u,supportedLocales:t,fallbackLocale:"en"});s[u]={language:i[u],resourceBundle:o}}return s}return{getInstance:function(e){if(!s){s=r(e)}return s}}}();return s});