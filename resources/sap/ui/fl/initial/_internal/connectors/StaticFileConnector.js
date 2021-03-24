/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/LoaderExtensions"],function(e,r){"use strict";function n(n,a){var o=n.replace(/\./g,"/")+"/changes/"+a+".json";var t=!!sap.ui.loader._.getModuleState(o);var i=sap.ui.getCore().getConfiguration();if(t||i.getDebug()||i.getComponentPreload()==="off"){try{return r.loadResource(o)}catch(r){if(r.name.includes("SyntaxError")){e.error(r)}e.warning("flexibility did not find a "+a+".json for the application: "+n)}}}return{loadFlexData:function(e){var r=e.componentName;if(!r){r=e.reference.replace(/.Component/g,"")}var a=n(r,"flexibility-bundle");if(a){a.changes=a.changes.concat(a.compVariants);delete a.compVariants;return Promise.resolve(a)}var o=n(r,"changes-bundle");if(o){return Promise.resolve({changes:o})}return Promise.resolve()}}});