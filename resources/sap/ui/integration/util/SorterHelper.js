/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/util/BindingResolver","sap/ui/model/Sorter"],function(e,r){"use strict";const t={};t.getGroupSorter=function(t){var i=false;if(t.order.dir&&t.order.dir==="DESC"){i=true}var n=new r(t.order.path,i,function(r){return e.resolveValue(t.title,r.getModel(),r.getPath())});return n};return t});
//# sourceMappingURL=SorterHelper.js.map