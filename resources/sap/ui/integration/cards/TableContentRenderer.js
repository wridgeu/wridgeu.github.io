/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(e){"use strict";var t=e.extend("sap.ui.integration.cards.TableContentRenderer",{apiVersion:2});t.getMinHeight=function(e,t,n){var r=n.getContentPageSize(e);if(!r){return this.DEFAULT_MIN_HEIGHT}var i=this.isCompact(t),a=i?2:2.75,s=i?2:2.75;return r*a+s+"rem"};return t});