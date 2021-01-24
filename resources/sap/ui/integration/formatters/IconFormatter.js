/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/IconPool"],function(t,i){"use strict";var s=t.extend("sap.ui.integration.util.Destinations",{constructor:function(i){t.call(this);this._oDestinations=i}});s.prototype.formatSrc=function(t,s){var r=0;if(!t||!s){return t}if(t.startsWith("data:")){return t}if(this._oDestinations.hasDestination(t)){return this._oDestinations.processString(t)}if(i.isIconURI(t)||t.startsWith("http://")||t.startsWith("https://")||t.startsWith("//")){return t}if(t.startsWith("..")){r=2}else if(t.startsWith(".")){r=1}return sap.ui.require.toUrl(s.replace(/\./g,"/")+t.slice(r,t.length))};return s});