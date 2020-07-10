/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/testrecorder/interaction/Commands","sap/ui/testrecorder/interaction/Highlight","sap/ui/testrecorder/interaction/Press","sap/ui/testrecorder/interaction/EnterText"],function(e,t,r,n){"use strict";return{execute:function(c,i){switch(c){case"HIGHLIGHT":t.execute(i.domElementId);break;case"PRESS":r.execute(i.domElementId);break;case"ENTER_TEXT":n.execute(i.domElementId);break;default:throw new Error("Command "+c+" is not known! Known commands are: "+Object.keys(e))}}}});