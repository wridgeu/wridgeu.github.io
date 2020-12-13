/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/base/util/restricted/_omit","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/ui/fl/write/_internal/condenser/Condenser","sap/ui/fl/write/api/FeaturesAPI","sap/base/Log","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/fl/write/_internal/flexState/FlexObjectState"],function(e,t,n,r,a,s,l,o,i,c,u,g){"use strict";function p(t){return t._getMap&&e(s.getChangeTypes(),t._getMap().changeType)||t.getChangeType&&e(s.getChangeTypes(),t.getChangeType())}function h(e){e.includeCtrlVariants=true;e.invalidateCache=false;return f._getUIChanges(e).then(function(e){return e.length>0})}function d(e){e.includeCtrlVariants=true;e.invalidateCache=false;return f._getUIChanges(e).then(function(e){return e.some(function(e){var t=e.getPackage();return t==="$TMP"||t===""})})}var f={hasHigherLayerChanges:function(e){e.upToLayer=e.upToLayer||u.getCurrentLayer(false);return g.getFlexObjects(e).then(function(t){return t.filter(function(t){return u.isOverLayer(t.getLayer(),e.upToLayer)})}).then(function(e){return e.length>0})},save:function(e){var n=a.getFlexControllerInstance(e.selector);var r=a.getDescriptorFlexControllerInstance(e.selector);e.invalidateCache=true;var s=a.getAppComponentForSelector(e.selector);e.componentId=s.getId();return n.saveAll(s,e.skipUpdateCache,e.draft,s).then(r.saveAll.bind(r,s,e.skipUpdateCache,e.draft)).then(f._getUIChanges.bind(null,t(e,"skipUpdateCache")))},getResetAndPublishInfo:function(e){return Promise.all([h(e),d(e),o.isPublishAvailable()]).then(function(t){var n={isResetEnabled:t[0],isPublishEnabled:t[1]};var r=t[2];var s=!(e.layer===c.USER)&&(!n.isResetEnabled||r&&!n.isPublishEnabled);if(s){return a.getFlexControllerInstance(e.selector).getResetAndPublishInfo(e).then(function(e){n.isResetEnabled=n.isResetEnabled||e.isResetEnabled;n.isPublishEnabled=n.isPublishEnabled||e.isPublishEnabled;return n}).catch(function(e){i.error("Sending request to flex/info route failed: "+e.message);return n})}return n})},reset:function(e){var t=a.getAppComponentForSelector(e.selector);var n=a.getFlexControllerInstance(t);var r=[e.layer,e.generator,t,e.selectorIds,e.changeTypes];return n.resetChanges.apply(n,r)},publish:function(e){e.styleClass=e.styleClass||"";var t=a.getAppComponentForSelector(e.selector);return a.getFlexControllerInstance(t)._oChangePersistence.transportAllUIChanges({},e.styleClass,e.layer,e.appVariantDescriptors)},add:function(e){if(p(e.change)){return e.change.store()}var t=a.getAppComponentForSelector(e.selector);return a.getFlexControllerInstance(t).addPreparedChange(e.change,t)},remove:function(e){if(!e.selector){throw new Error("An invalid selector was passed so change could not be removed with id: "+e.change.getId())}var t=a.getAppComponentForSelector(e.selector);if(!t){throw new Error("Invalid application component for selector, change could not be removed with id: "+e.change.getId())}if(p(e.change)){var s=a.getDescriptorFlexControllerInstance(t);s.deleteChange(e.change,t);return}var l=n.bySelector(e.change.getSelector(),t);var o=a.getFlexControllerInstance(t);if(l){r.destroyAppliedCustomData(l,e.change,n)}o.deleteChange(e.change,t)},_condense:function(e){return Promise.resolve().then(function(){if(!e.selector){throw Error("An invalid selector was passed")}var t=a.getAppComponentForSelector(e.selector);if(!t){throw Error("Invalid application component for selector")}if(!e.changes||e.changes&&!Array.isArray(e.changes)){throw Error("Invalid array of changes")}return l.condense(t,e.changes)})},_getUIChanges:function(e){if(e.layer){e.currentLayer=e.layer}return g.getFlexObjects(e)}};return f});