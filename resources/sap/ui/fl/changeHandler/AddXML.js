/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseAddXml"],function(e){"use strict";var t={};t.applyChange=function(t,n,r){var i=t.getDefinition();var g={aggregationName:i.content.targetAggregation,index:i.content.index};e.applyChange(t,n,r,g);return true};t.revertChange=e.revertChange;t.completeChangeContent=function(t,n){var r=t.getDefinition();if(!r.content){r.content={}}if(n.targetAggregation){r.content.targetAggregation=n.targetAggregation}else{e._throwMissingAttributeError("targetAggregation")}if(n.index!==undefined){r.content.index=n.index}else{e._throwMissingAttributeError("index")}e.completeChangeContent(t,n,r)};return t},true);