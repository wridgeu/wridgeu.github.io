/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions"],function(e){"use strict";var t={setTextInChange:function(e,t,a,n){if(!e.texts){e.texts={}}if(!e.texts[t]){e.texts[t]={}}e.texts[t].value=a;e.texts[t].type=n},instantiateFragment:function(t,a){var n=t.getModuleName();if(!n){throw new Error("The module name of the fragment is not set. This should happen in the backend")}var r=a.modifier;var s=a.view;var i=e.loadResource(n,{dataType:"text"});var o=t.getProjectId();try{return r.instantiateFragment(i,o,s)}catch(e){throw new Error("The following XML Fragment could not be instantiated: "+i+" Reason: "+e.message)}},markAsNotApplicable:function(e,t){var a={message:e};if(!t){throw a}return Promise.reject(a)}};return t},true);