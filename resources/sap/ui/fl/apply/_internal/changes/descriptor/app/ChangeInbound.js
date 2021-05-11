/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/util/changePropertyValueByPath","sap/ui/fl/util/checkChangesConsistency"],function(n,t){"use strict";var e=["UPDATE","UPSERT"];var i=["title","subtitle","icon"];var o={applyChange:function(o,a){var s=o["sap.app"].crossNavigation;var r=a.getContent();t(r,i,e);if(s&&s.inbounds){var u=s.inbounds[r.inboundId];if(u){n(r.entityPropertyChange,u)}else{throw new Error('Nothing to update. Inbound with ID "'+r.inboundId+'" does not exist.')}}else{throw new Error("sap.app/crossNavigation or sap.app/crossNavigation/inbounds sections have not been found in manifest.json")}return o}};return o});