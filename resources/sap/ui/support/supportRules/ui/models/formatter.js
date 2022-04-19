/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/Constants"],function(e){"use strict";return{resolutionUrl:function(e,t){var n=e.indexOf(t)===e.length-1?"":",  ";return t.text+n},hasResolutionUrls:function(e){if(e&&e.length>0){return true}return false},filteredText:function(t,n,r,u){var i="Filtered by: ";i+=t===e.FILTER_VALUE_ALL?"":"Severity - "+t+";";i+=n===e.FILTER_VALUE_ALL?"":" Category    - "+n+";";i+=r===e.FILTER_VALUE_ALL?"":" Audience - "+r+";";i+=u===e.FILTER_VALUE_ALL?"":" Control Element - "+u+";";return i}}});