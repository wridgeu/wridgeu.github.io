/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepEqual"],function(t){"use strict";var e={};e.CSS_CLASS="InputWithSuggestions";e.getItemByListItem=function(t,e){return this.getItemBy(t,e,"ListItem")};e.getListItem=function(t){return t&&t.data?t.data(e.CSS_CLASS+"ListItem"):null};e.getItemBy=function(r,n,i){var u;i=e.CSS_CLASS+i;if(!Array.isArray(r)){return}for(var a=0;a<r.length;a++){u=r[a].data&&r[a].data(i);if(u===n||t(u,n)){return r[a]}}return null};e.getEnabledItems=function(t){if(!Array.isArray(t)){return}return t.filter(function(t){return t.getEnabled&&t.getEnabled()})};return e});