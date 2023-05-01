/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions","sap/base/i18n/ResourceBundle"],function(e,n){"use strict";var r=function(){var r,u,s,t;e.loadResource("sap/ui/integration/editor/languages.json",{dataType:"json",failOnError:false,async:true}).then(function(e){u=e});function a(){r=[];for(var e in u){var a;if(s){var i=[e];if(e.indexOf("-")>-1){i.push(e.substring(0,e.indexOf("-")))}if(!i.includes("en")){i.push("en")}a=n.create({url:s,async:false,locale:e,supportedLocales:i})}var o={language:u[e],resourceBundle:a,isSupportedLocale:true};if(Array.isArray(t)&&!t.includes(e)&&!t.includes(e.replace("-","_"))){o.isSupportedLocale=false}r[e]=o}return r}return{getResourceBundleURL:function(){return s},setResourceBundleURL:function(e){s=e},getSupportedLocales:function(){return t},setSupportedLocales:function(e){t=e},getInstance:function(){if(!r){r=a()}return r}}}();return r});
//# sourceMappingURL=EditorResourceBundles.js.map