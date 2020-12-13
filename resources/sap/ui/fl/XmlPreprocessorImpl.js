/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Component","sap/ui/fl/FlexControllerFactory","sap/ui/fl/Utils","sap/ui/fl/ChangePersistenceFactory","sap/base/Log"],function(e,r,n,t,o){"use strict";var i=function(){};i.process=function(t,i){try{if(!i||i.sync){o.warning("Flexibility feature for applying changes on an XML view is only available for "+"asynchronous views; merge is be done later on the JS controls.");return t}i.viewId=i.id;var s=e.get(i.componentId);if(!s){o.warning("View is generated without a component. Flexibility features are not possible.");return Promise.resolve(t)}var a=n.getAppComponentForControl(s);if(!n.isApplication(a.getManifestObject())){return Promise.resolve(t)}var l=n.getComponentClassName(a);var c=r.create(l);return c.processXmlView(t,i).then(function(){o.debug("flex processing view "+i.id+" finished");return t}).catch(function(){o.warning("Error happens when getting flex cache key! flexibility XML view preprocessing is skipped. "+"The processing will be done later on the JS controls.");return Promise.resolve(t)})}catch(e){var p="view "+i.id+": "+e;o.info(p);return Promise.resolve(t)}};i.getCacheKey=function(r){var o=e.get(r.componentId);var i=n.getAppComponentForControl(o);if(n.isVariantByStartupParameter(i)){return Promise.resolve()}var s=n.getComponentClassName(i);var a=t.getChangePersistenceForComponent(s);return a.getCacheKey(i)};return i},true);