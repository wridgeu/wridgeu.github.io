/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/util/Utils","sap/ui/integration/util/BindingHelper","sap/ui/integration/controls/ObjectStatus"],function(t,e,i){"use strict";var n={};n._getVisible=function(i){let n=i.visible;if(typeof i.visible==="string"){n=!t.hasFalsyValueAsString(n)}return e.reuse(n)};n.createStatusItem=function(t){return new i({text:t.value,visible:n._getVisible(t),state:t.state,showStateIcon:t.showStateIcon,customIcon:t.customStateIcon,inverted:t.inverted})};return n});
//# sourceMappingURL=ObjectStatusFactory.js.map