/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/util/IFrame"],function(){"use strict";return function(t,i,e){var r=i.modifier;var n=t.getDefinition();var a=i.view;var u=i.appComponent;var o={_settings:{}};["url","width","height"].forEach(function(t){var i=n.content[t];o[t]=i;o._settings[t]=i});var f=r.createControl("sap.ui.fl.util.IFrame",u,a,e,o,false);return f}});