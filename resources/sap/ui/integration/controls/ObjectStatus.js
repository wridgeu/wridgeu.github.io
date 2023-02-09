/*!
* OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/m/ObjectStatus","sap/m/ObjectStatusRenderer"],function(t,e){"use strict";var a=t.extend("sap.ui.integration.controls.ObjectStatus",{metadata:{library:"sap.ui.integration",properties:{showStateIcon:{type:"boolean",defaultValue:false}}},renderer:e});a.prototype.onBeforeRendering=function(){if(this.getShowStateIcon()){this.addStyleClass("sapMObjStatusShowIcon")}};return a});
//# sourceMappingURL=ObjectStatus.js.map