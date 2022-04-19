/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(e){"use strict";var n=e.extend("sap.ui.integration.cards.TimelineContentRenderer",{apiVersion:2});n.getMinHeight=function(e,n,t){var i=t.getContentPageSize(e);if(!i){return this.DEFAULT_MIN_HEIGHT}var r=this.isCompact(n),a=r?4:5;return i*a+"rem"};return n});