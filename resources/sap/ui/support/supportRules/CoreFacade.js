/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Component"],function(t){"use strict";var e=null;function n(n){e=n;return{getMetadata:function(){return e.getMetadata()},getUIAreas:function(){return e.mUIAreas},getComponents:function(){return t.registry.all()},getModels:function(){return e.oModels}}}return n},true);