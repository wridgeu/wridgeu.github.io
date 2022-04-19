/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/util/IFrame"],function(){"use strict";return function(t,e,i){var n=e.modifier;var r=t.getDefinition();var a=e.view;var o=e.appComponent;var u={_settings:{}};["url","width","height"].forEach(function(t){var e=r.content[t];u[t]=e;u._settings[t]=e});return Promise.resolve().then(function(){return n.createControl("sap.ui.fl.util.IFrame",o,a,i,u,false)})}});