/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseAddXml"],function(e){"use strict";var n={};n.applyChange=function(n,t,i){var o=i.view;var r=i.modifier;var a=n.getDefinition().selector;var f=n.getExtensionPointInfo&&n.getExtensionPointInfo()||r.getExtensionPointInfo(a.name,o);if(!f){throw new Error("AddXMLAtExtensionPoint-Error: Either no Extension-Point found by name '"+(a&&a.name)+"' or multiple Extension-Points available with the given name in the view (view.id='"+(o&&r.getId(o))+"'). Multiple Extension-points with the same name in one view are not supported!")}(f.defaultContent||[]).forEach(function(e){if(e){r.destroy(e)}});f.defaultContent=[];var s=e.applyChange(n,t,i,f);if(f.ready){f.ready(s)}return true};n.revertChange=e.revertChange;n.completeChangeContent=function(n,t){e.completeChangeContent(n,t)};return n},true);