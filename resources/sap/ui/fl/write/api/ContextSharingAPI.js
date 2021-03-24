/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/variants/context/Component","sap/ui/core/ComponentContainer"],function(e,n,t){"use strict";var r;var o={createComponent:function(o){return e.isContextSharingEnabled(o.layer).then(function(e){if(e){if(!r||r.bIsDestroyed){var o=new n("contextSharing");o.setSelectedContexts({role:[]});r=new t("contextSharingContainer",{component:o})}return r}})}};return o});