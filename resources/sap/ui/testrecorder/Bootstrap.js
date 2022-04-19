/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{init:function(e,t){sap.ui.require(["sap/ui/testrecorder/Recorder"],function(t){if(e[0].toLowerCase()==="true"||e[0].toLowerCase()==="silent"){t.start(e)}})}}});