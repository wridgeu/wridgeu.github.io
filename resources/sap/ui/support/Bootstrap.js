/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(t){"use strict";t.setLogEntriesLimit(Infinity);var e={initSupportRules:function(e,i){sap.ui.require(["sap/ui/support/supportRules/Main","sap/ui/support/jQuery.sap.support"],function(n){if(e[0].toLowerCase()==="true"||e[0].toLowerCase()==="silent"){var u=i&&i.onReady&&typeof i.onReady==="function";if(!n._pluginStarted){if(u){n.attachEvent("ready",i.onReady)}n.startPlugin(e)}else{if(u){i.onReady()}}t.logSupportInfo(true)}})}};return e});