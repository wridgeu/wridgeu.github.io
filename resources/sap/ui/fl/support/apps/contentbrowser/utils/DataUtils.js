/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/GroupHeaderListItem","sap/ui/thirdparty/jquery"],function(e,r){"use strict";var t={aBlacklist:[{category:"NS",name:"LREP_HOME_CONTENT",ns:"UIF/"},{category:"NS",name:"virtual~",ns:"/"}],formatData:function(e,r){if(r==="js"||r==="properties"){return e}try{e=JSON.parse(e);return JSON.stringify(e,null,"\t")}catch(r){var t=sap.ui.require("sap/ui/fl/support/apps/contentbrowser/utils/ErrorUtils");t.displayError("Error",r.name,r.message);return e}},getGroupHeader:function(r){var t="{i18n>systemData}";if(r.key==="custom"){t="{i18n>externalReferences}"}return new e({title:t,upperCase:false})},isNotOnBlacklist:function(e){var t=true;r.each(this.aBlacklist,function(n,a){var i=true;r.each(a,function(r,t){i=i&&e[r]===t});if(i){t=false;return false}});return t},cleanLeadingAndTrailingSlashes:function(e){if(!e){return""}if(e[0]==="/"){var r=e.substring(1,e.length);return this.cleanLeadingAndTrailingSlashes(r)}if(e[e.length-1]==="/"){var t=e.substring(0,e.length-1);return this.cleanLeadingAndTrailingSlashes(t)}return e},formatItemTitle:function(e){return e.namespace+e.fileName+"."+e.fileType},endsStringWith:function(e,r){return e.indexOf(r,e.length-r.length)!==-1}};return t},true);