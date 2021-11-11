/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(e){"use strict";var t=e.extend("sap.ui.integration.cards.TimelineContentRenderer",{apiVersion:2});t.getMinHeight=function(e,t){if(!e){return this.DEFAULT_MIN_HEIGHT}if(!e.maxItems){return this.DEFAULT_MIN_HEIGHT}var n=this.isCompact(t),i=parseInt(e.maxItems),r=n?4:5;return i*r+"rem"};return t});