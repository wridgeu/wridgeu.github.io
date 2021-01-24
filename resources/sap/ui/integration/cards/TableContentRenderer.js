/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer"],function(e){"use strict";var t=e.extend("sap.ui.integration.cards.TableContentRenderer",{apiVersion:2});t.getMinHeight=function(e,t){if(!e){return this.DEFAULT_MIN_HEIGHT}var n=this.isCompact(t),r=parseInt(e.maxItems)||0,i=n?2:2.75,a=n?2:2.75;return r*i+a+"rem"};return t});