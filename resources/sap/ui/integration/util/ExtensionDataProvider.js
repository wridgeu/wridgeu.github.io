/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/util/DataProvider"],function(t){"use strict";var e=t.extend("sap.ui.integration.util.ExtensionDataProvider",{metadata:{library:"sap.ui.integration"},constructor:function(e,o){t.call(this,e);this._oExtension=o}});e.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);this._oExtension=null};e.prototype.getData=function(){const t=this.getResolvedConfiguration().extension;if(!this._oExtension){return Promise.reject("The extension module is not loaded properly or doesn't export a correct value.")}if(!this._oExtension[t.method]){return Promise.reject("Extension doesn't implement "+t.method+" method.")}return this._oExtension[t.method].apply(this._oExtension,t.args)};e.prototype.getDetails=function(){return"Load data from Extension. Method: "+this.getResolvedConfiguration().extension.method};return e});
//# sourceMappingURL=ExtensionDataProvider.js.map