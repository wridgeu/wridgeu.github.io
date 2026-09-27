/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(i){"use strict";var e;var r;function u(){if(i.sap.ui.require("sap/ui/core/Core")&&i.sap.ui.require("sap/ui/core/Lib")){e=i.sap.ui.require("sap/ui/core/Core");r=i.sap.ui.require("sap/ui/core/Lib");o();return}i.sap.ui.require(["sap/ui/core/Core","sap/ui/core/Lib"],function(i,u){e=i;r=u;e.boot();e.ready().then(o)})}function n(e){const r=e.extensions?.["sap.ui.integration"]?.customElements;if(!r){return}i.sap.ui.require(Object.values(r))}function o(){r.load({name:"sap.ui.integration"}).then(function(i){n(i)})}u()})(window);
//# sourceMappingURL=library-bootstrap.js.map