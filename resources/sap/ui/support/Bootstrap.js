/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/Log"],function(t,e){"use strict";e.setLogEntriesLimit(Infinity);var o={initSupportRules:function(e,o){sap.ui.require(["sap/ui/support/supportRules/Main","sap/ui/support/jQuery.sap.support"],function(i){if(e[0].toLowerCase()==="true"||e[0].toLowerCase()==="silent"){var n=o&&o.onReady&&typeof o.onReady==="function";if(!i._pluginStarted){if(n){i.attachEvent("ready",o.onReady)}i.startPlugin(e)}else{if(n){o.onReady()}}if("logSupportInfo"in t.sap.log){t.sap.log.logSupportInfo(true)}}})}};return o});