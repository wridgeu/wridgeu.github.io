/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseListContentRenderer","../library"],function(t,e){"use strict";var n=t.extend("sap.ui.integration.cards.TableContentRenderer",{apiVersion:2});n.getMinHeight=function(t,e,n){if(e._fMinHeight){return e._fMinHeight+"px"}var i=n.getContentMinItems(t);if(i==null){return this.DEFAULT_MIN_HEIGHT}var r=this.isCompact(e),a=r?2:2.75,s=r?2:2.75;return i*a+s+"rem"};n.getItemMinHeight=function(t,e){if(!t||!t.row){return 0}var n=this.isCompact(e);return n?2:2.75};return n});
//# sourceMappingURL=TableContentRenderer.js.map