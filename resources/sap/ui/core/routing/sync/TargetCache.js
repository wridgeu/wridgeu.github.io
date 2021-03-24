/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/View"],function(e){"use strict";return{_getObjectWithGlobalId:function(i){function t(){i.viewName=i.name;delete i.name;return e._legacyCreate(i)}var n,a=i.name,o;this._checkName(a,"View");o=this._oCache.view[a];n=o&&o[i.id];if(n){return n}if(this._oComponent){n=this._oComponent.runAsOwner(t)}else{n=t()}o=this._oCache.view[a];if(!o){o=this._oCache.view[a]={};o[undefined]=n}if(i.id!==undefined){o[i.id]=n}this.fireCreated({object:n,type:"View",options:i});return n},_getViewWithGlobalId:function(e){if(e&&!e.name){e.name=e.viewName}return this._getObjectWithGlobalId(e)}}});