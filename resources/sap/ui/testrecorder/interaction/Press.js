/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/ui/external/Highlighter","sap/ui/test/_ControlFinder","sap/ui/testrecorder/Constants","sap/ui/testrecorder/CommunicationBus","sap/ui/testrecorder/CommunicationChannels","sap/ui/testrecorder/interaction/Commands"],function(e,t,i,n,r,s){"use strict";var o=new e(i.HIGHLIGHTER_ID);return{execute:function(e){var i=t._getIdentifiedDOMElementId("#"+e);o.highlight(i);n.publish(r.SELECT_CONTROL_IN_TREE,{rootElementId:i,interactionElementId:e,action:s.PRESS})}}});