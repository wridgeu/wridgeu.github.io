/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.script","sap/ui/support/supportRules/WindowCommunicationBus","sap/ui/support/supportRules/WCBConfig"],function(u,i,r){"use strict";var s;var p=i.extend("sap.ui.support.supportRules.CommunicationBus",{constructor:function(){if(!s){var u=new r({modulePath:"sap/ui/support",receivingWindow:"supportTool",uriParams:{origin:"sap-ui-xx-support-origin",frameId:"sap-ui-xx-frame-identifier"}});i.call(this,u)}else{return s}}});s=new p;return s},true);