/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/WindowCommunicationBus","sap/ui/support/supportRules/WCBConfig"],function(u,i){"use strict";var r;var s=u.extend("sap.ui.support.supportRules.CommunicationBus",{constructor:function(){if(!r){var s=new i({modulePath:"sap/ui/support",receivingWindow:"supportTool",uriParams:{origin:"sap-ui-xx-support-origin",frameId:"sap-ui-xx-frame-identifier"}});u.call(this,s)}else{return r}}});r=new s;return r},true);