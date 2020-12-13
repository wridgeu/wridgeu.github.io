/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/flexState/compVariants/CompVariantState","sap/ui/fl/write/_internal/transport/TransportSelection","sap/ui/fl/registry/Settings","sap/ui/fl/apply/_internal/flexState/ManifestUtils"],function(e,t,n,r){"use strict";function i(e){return e&&e.getPersistencyKey&&e.getPersistencyKey()}function a(e,t){e.persistencyKey=i(e.control);if(!e.reference){e.reference=r.getFlexReferenceForControl(e.control)}return t(e)}var s={add:function(t){return a(t,e.add)},save:function(t){return a(t,e.persist)},setDefaultVariantId:function(t){return a(t,e.setDefault)},setExecuteOnSelect:function(t){return a(t,e.setExecuteOnSelect)},isVariantSharingEnabled:function(){return n.getInstance().then(function(e){return e.isVariantSharingEnabled()})},_getTransportSelection:function(){return new t}};return s},true);