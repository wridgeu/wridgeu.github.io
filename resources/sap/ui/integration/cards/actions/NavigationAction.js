/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseAction","sap/ui/util/openWindow"],function(t,i){"use strict";var e=t.extend("sap.ui.integration.cards.actions.NavigationAction",{metadata:{library:"sap.ui.integration"}});e.prototype.execute=function(){var t=this.getResolvedConfig();var i=this.getParameters(),a,n,r,o;if(i){r=i.url;o=i.target}a=t.url||r;n=t.target||o||e.DEFAULT_TARGET;if(a){this._openUrl(a,n)}};e.prototype._openUrl=function(t,e){i(t,e)};e.DEFAULT_TARGET="_blank";return e});
//# sourceMappingURL=NavigationAction.js.map