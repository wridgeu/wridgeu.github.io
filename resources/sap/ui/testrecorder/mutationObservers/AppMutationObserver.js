/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/testrecorder/mutationObservers/MutationObserver"],function(e){"use strict";var t=e.extend("sap.ui.testrecorder.mutationObservers.AppMutationObserver",{_getOptions:function(){return{subtree:true,childList:true}}});return t});