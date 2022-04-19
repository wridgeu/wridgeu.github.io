/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/ui/external/Highlighter","sap/ui/test/_ControlFinder","sap/ui/testrecorder/Constants","sap/ui/testrecorder/CommunicationBus","sap/ui/testrecorder/CommunicationChannels"],function(e,t,i,n,r){"use strict";var s=new e(i.HIGHLIGHTER_ID);return{execute:function(e,i){var u=t._getIdentifiedDOMElementId("#"+e);s.highlight(u);n.publish(r.SELECT_CONTROL_IN_TREE,{rootElementId:u,interactionElementId:e})}}});