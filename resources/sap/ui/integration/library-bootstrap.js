/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(t){"use strict";var i;var e=document.currentScript||document.querySelector("script[src*='/sap-ui-integration.js']");function n(){if(t.sap&&t.sap.ui&&t.sap.ui.getCore){i=t.sap.ui.getCore();return u()}t.sap.ui.require(["sap/ui/core/Core"],function(t){t.boot();i=t;t.attachInit(function(){u()})})}function r(n){var r=i.getLoadedLibraries()[n],u=r.extensions["sap.ui.integration"].customElements,a=Object.keys(u),o=e.getAttribute("tags");if(o){a=o.split(",")}t.sap.ui.require(a.map(function(t,i){return u[a[i]]}))}function u(){i.loadLibrary("sap.ui.integration",{async:true}).then(function(){r("sap.ui.integration")})}n()})(window);
//# sourceMappingURL=library-bootstrap.js.map