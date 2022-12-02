/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions","sap/base/i18n/ResourceBundle"],function(e,n){"use strict";var r=function(){var r,u,s;e.loadResource("sap/ui/integration/editor/languages.json",{dataType:"json",failOnError:false,async:true}).then(function(e){u=e});function a(){r=[];for(var e in u){var a;if(s){var t=[e];if(e.indexOf("-")>-1){t.push(e.substring(0,e.indexOf("-")))}if(!t.includes("en")){t.push("en")}a=n.create({url:s,async:false,locale:e,supportedLocales:t})}r[e]={language:u[e],resourceBundle:a}}return r}return{getResourceBundleURL:function(){return s},setResourceBundleURL:function(e){s=e},getInstance:function(){if(!r){r=a()}return r}}}();return r});