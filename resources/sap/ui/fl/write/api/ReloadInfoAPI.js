/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/LayerUtils","sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/fl/write/api/VersionsAPI","sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/write/api/PersistenceWriteAPI","sap/base/util/UriParameters"],function(a,e,r,t,i,s){"use strict";function l(a){return i.isVersioningEnabled(a.layer).then(function(e){return e&&t.isDraftAvailable({selector:a.selector,layer:a.layer})})}function n(a){var r=a.layer===e.USER;if(r){return Promise.resolve(false)}return s.hasHigherLayerChanges({selector:a.selector,ignoreMaxLayerParameter:a.ignoreMaxLayerParameter,upToLayer:a.layer})}var o={getReloadReasonsForStart:function(a){var e=o.hasMaxLayerParameterWithValue({value:a.layer});var t=!!r.getParameter(sap.ui.fl.Versions.UrlParameter);return Promise.all([!e?n(a):false,!t?l(a):false]).then(function(e){a.hasHigherLayerChanges=e[0];a.isDraftAvailable=e[1];return a})},hasVersionParameterWithValue:function(a){return r.hasParameterAndValue(sap.ui.fl.Versions.UrlParameter,a.value)},hasMaxLayerParameterWithValue:function(e){var t=a.FL_MAX_LAYER_PARAM;return r.hasParameterAndValue(t,e.value)},handleUrlParametersForStandalone:function(e){if(e.hasHigherLayerChanges){e.parameters=r.handleUrlParameters(e.parameters,a.FL_MAX_LAYER_PARAM,e.layer)}var t=new RegExp("&*"+sap.ui.fl.Versions.UrlParameter+"=-?\\d*&?","g");e.parameters=e.parameters.replace(t,"");if(e.isDraftAvailable){e.parameters=r.handleUrlParameters(e.parameters,sap.ui.fl.Versions.UrlParameter,sap.ui.fl.Versions.Draft)}if(e.versionSwitch){e.parameters=r.handleUrlParameters(e.parameters,sap.ui.fl.Versions.UrlParameter,e.version)}if(e.parameters==="?"){e.parameters=""}return e.parameters},handleParametersOnStart:function(e){var t=r.getParsedURLHash();t.params=t.params||{};if(e.hasHigherLayerChanges){t.params[a.FL_MAX_LAYER_PARAM]=[e.layer]}if(e.isDraftAvailable){t.params[sap.ui.fl.Versions.UrlParameter]=[sap.ui.fl.Versions.Draft]}return t},initialDraftGotActivated:function(a){if(a.versioningEnabled){var e=this.hasVersionParameterWithValue({value:sap.ui.fl.Versions.Draft.toString()});return!t.isDraftAvailable(a)&&e}return false},getReloadMethod:function(a){var e={NOT_NEEDED:"NO_RELOAD",RELOAD_PAGE:"HARD_RELOAD",VIA_HASH:"CROSS_APP_NAVIGATION"};a.reloadMethod=e.NOT_NEEDED;a.isDraftAvailable=a.isDraftAvailable||o.hasVersionParameterWithValue({value:sap.ui.fl.Versions.Draft.toString()});if(a.activeVersion>sap.ui.fl.Versions.Original){a.activeVersionNotSelected=a.activeVersion&&!o.hasVersionParameterWithValue({value:a.activeVersion.toString()})}a.hasHigherLayerChanges=o.hasMaxLayerParameterWithValue({value:a.layer});a.initialDraftGotActivated=o.initialDraftGotActivated(a);if(a.initialDraftGotActivated){a.isDraftAvailable=false}if(a.changesNeedReload||a.isDraftAvailable||a.hasHigherLayerChanges||a.initialDraftGotActivated||a.activeVersionNotSelected){a.reloadMethod=e.RELOAD_PAGE;if(!a.changesNeedReload&&r.getUshellContainer()){a.reloadMethod=e.VIA_HASH}}return a}};return o});