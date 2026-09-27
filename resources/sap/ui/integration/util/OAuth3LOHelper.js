/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";const e=new Map;const n={};n.openConsentWindow=function(e,n){const t=n?.width||400;const o=n?.height||400;const r=screen.width/2-t/2;const s=screen.height/2-o/2;const i=`noopener, noreferrer, popup, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${t}, height=${o}, top=${s}, left=${r}`;window.open(e,"_blank",i)};n.needsConsent=function(e){return e.status===502&&e.headers.get("sap-3lo-flow")};n.hasConsentError=function(e){if(!n.needsConsent(e)){return false}const t=n.readHeader(e);return t.status==="error"};n.readHeader=function(e){let n=e.headers.get("sap-3lo-flow");if(!n){return null}n=atob(n);return JSON.parse(n)};n.registerCard=function(n,t){let o=e.get(n);if(!o){o=new Set;e.set(n,o)}o.add(t)};n.unregisterCard=function(n,t){const o=e.get(n);o?.delete(t)};n.handleConsent=function(n){const t=e.get(n);if(!t){return}for(const e of t){e.refreshData()}e.delete(n)};return n});
//# sourceMappingURL=OAuth3LOHelper.js.map