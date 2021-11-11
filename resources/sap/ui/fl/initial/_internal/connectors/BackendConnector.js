/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/connectors/Utils","sap/base/util/restricted/_pick"],function(e,n){"use strict";return{xsrfToken:undefined,settings:undefined,loadFlexData:function(s){var t=n(s,["version"]);if(this.isLanguageInfoRequired){e.addLanguageInfo(t)}var i=e.getUrl(this.ROUTES.DATA,s,t);return e.sendRequest(i,"GET",{xsrfToken:this.xsrfToken}).then(function(e){var n=e.response;if(e.xsrfToken){this.xsrfToken=e.xsrfToken}if(e.etag){n.cacheKey=e.etag}n.changes=n.changes.concat(n.compVariants||[]);if(n.settings){this.settings=n.settings}return n}.bind(this))}}});