/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/testrecorder/Dialects"],function(t,e){"use strict";var i=e.UIVERI5;var r=null;var c=t.extend("sap.ui.testrecorder.DialectRegistry",{constructor:function(){if(!r){Object.apply(this,arguments);this.setActiveDialect(i)}else{return r}}});c.prototype.getActiveDialect=function(){return this._sDialect};c.prototype.setActiveDialect=function(t){for(var i in e){if(t===e[i]){this._sDialect=t}}};r=new c;return r});