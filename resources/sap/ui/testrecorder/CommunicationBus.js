/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/WindowCommunicationBus","sap/ui/support/supportRules/WCBConfig"],function(e,r){"use strict";var i;var t=e.extend("sap.ui.testrecorder.CommunicationBus",{constructor:function(){if(!i){var t=new r({modulePath:"sap/ui/test",receivingWindow:"testRecorder",uriParams:{origin:"sap-ui-testrecorder-origin",frameId:"sap-ui-testrecorder-frame-identifier"}});e.call(this,t)}else{return i}}});i=new t;return i},true);