/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/mvc/XMLView","sap/m/Page"],function(e,a,i){"use strict";e.attachInit(function(){a.create({viewName:"sap.ui.support.supportRules.ui.views.Main"}).then(function(e){var a=new i("page",{showHeader:false,backgroundDesign:"Solid",content:[e]});a.placeAt("content")})})});