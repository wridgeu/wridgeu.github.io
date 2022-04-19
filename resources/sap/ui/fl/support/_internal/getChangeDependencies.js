/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Component","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/support/apps/uiFlexibilityDiagnostics/helper/Extractor","sap/ui/fl/Utils"],function(e,t,n,i,a){"use strict";return function(){return a.getUShellService("AppLifeCycle").then(function(n){var a;if(n){a=n.getCurrentApplication().componentInstance}else{var r=e.registry.filter(function(e){return e.getManifestObject().getRawJson()["sap.app"].type==="application"});if(r.length===1){a=r[0]}}if(a){var p=a.oContainer.getComponentInstance();var s=t.getChangePersistenceForControl(p);return i.extractData(s)}return{}})}});