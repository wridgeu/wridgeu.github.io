/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./InputBaseRenderer"],function(e,t){"use strict";var r=e.extend(t);r.apiVersion=2;r.getAccessibilityState=function(e){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m"),i=r.getText("MASKINPUT_ROLE_DESCRIPTION"),s=t.getAccessibilityState.apply(this,arguments);s["roledescription"]=i;return s};return r},true);