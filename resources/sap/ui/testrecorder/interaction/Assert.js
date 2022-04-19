/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_ControlFinder","sap/ui/testrecorder/CommunicationBus","sap/ui/testrecorder/CommunicationChannels","sap/ui/testrecorder/interaction/Commands"],function(e,t,n,i){"use strict";return{execute:function(o){var r=e._getIdentifiedDOMElementId("#"+o.domElementId);t.publish(n.SELECT_CONTROL_IN_TREE,{rootElementId:r,interactionElementId:o.domElementId,action:i.ASSERT,assertion:o.assertion})}}});