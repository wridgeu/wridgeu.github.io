/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element"],function(t){"use strict";var i=t.extend("sap.ui.integration.util.LoadingProvider",{metadata:{library:"sap.ui.integration",properties:{loading:{type:"boolean",defaultValue:false}}}});i.prototype.setLoading=function(t){if(this._bAwaitPagination&&!t){return this}return this.setProperty("loading",t)};i.prototype.setAwaitPagination=function(t){this._bAwaitPagination=t};i.prototype.getAwaitPagination=function(){return this._bAwaitPagination};return i});
//# sourceMappingURL=LoadingProvider.js.map