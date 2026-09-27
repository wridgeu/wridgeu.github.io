/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/uid","sap/ui/integration/util/openCardDialog"],(t,e)=>{"use strict";function i(e){const i=e.getManifestEntry("/");i["sap.app"].id=i["sap.app"].id+t();e.getAggregation("_filterBar")?._getFilters().forEach(t=>{t.writeValueToConfiguration(i["sap.card"].configuration.filters[t.getKey()])});return i}function a(t){return e(t,{manifest:i(t),baseUrl:t.getBaseUrl(),showCloseButton:true,isPaginationCard:true})}return a});
//# sourceMappingURL=openCardShowMore.js.map