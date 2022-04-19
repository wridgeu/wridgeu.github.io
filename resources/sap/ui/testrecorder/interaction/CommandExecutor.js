/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/testrecorder/interaction/Commands","sap/ui/testrecorder/interaction/Highlight","sap/ui/testrecorder/interaction/Press","sap/ui/testrecorder/interaction/EnterText","sap/ui/testrecorder/interaction/Assert"],function(e,t,r,n,s){"use strict";return{execute:function(c,a){switch(c){case"HIGHLIGHT":t.execute(a.domElementId);break;case"PRESS":r.execute(a.domElementId);break;case"ENTER_TEXT":n.execute(a.domElementId);break;case"ASSERT":s.execute(a);break;default:throw new Error("Command "+c+" is not known! Known commands are: "+Object.keys(e))}}}});