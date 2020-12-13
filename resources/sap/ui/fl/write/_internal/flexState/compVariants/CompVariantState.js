/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Layer","sap/ui/fl/Change","sap/ui/fl/Utils","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/write/_internal/Storage"],function(e,t,n,a,r){"use strict";function i(e){switch(e.fileType){case"change":case"variant":return"changes";case"comp_variant_change":return"compVariantChanges";default:}}function s(e,t){var n=e.changeToBeAddedOrDeleted.getDefinition();var r=i(n);t[r].push(n);var s=n.fileName;var c=a.getCompEntitiesByIdMap(e.reference);c[s]=n}function c(e,t){var n=e.changeToBeAddedOrDeleted.getDefinition();var r=i(n);var s=-1;t[r].some(function(e,t){if(e.fileName===n.fileName){s=t;return true}});if(s>-1){t[r].splice(s,1)}var c=a.getCompEntitiesByIdMap(e.reference);delete c[n.fileName]}function o(r,i,s){var c=a.getCompVariantsMap(r.reference)._getOrCreate(r.persistencyKey);if(!c[s]){var o={fileName:n.createDefaultFileName(s),fileType:"change",changeType:s,layer:e.USER,reference:r.reference,selector:{persistencyKey:r.persistencyKey},support:{generator:r.generator||"CompVariantState."+s,sapui5Version:sap.ui.version}};if(r.compositeCommand){o.support.generator.compositeCommand=r.compositeCommand}var f=new t(o);c[s]=f;a.getCompEntitiesByIdMap(r.reference)[f.getId()]=f}c[s].setContent(i);return c[s]}function f(e,t){for(var n=0;n<e.length;n++){if((e[n].fileName||e[n].getFileName())===t.fileName){e.splice(n,1);break}}}function u(e,t){if(t.isVariant()){return e.variants}switch(t.getChangeType()){case"defaultVariant":return e.defaultVariants;case"standardVariant":return e.standardVariants;default:return e.changes}}function p(e,n){return r.write({flexObjects:[e.getDefinition()],layer:e.getLayer(),transport:e.getRequest(),isLegacyVariant:e.isVariant()}).then(function(a){if(a&&a.response&&a.response[0]){e.setResponse(a.response[0])}else{e.setState(t.states.PERSISTED)}return n}).then(function(t){u(t.changes.comp,e).push(e.getDefinition());return e.getDefinition()})}function g(e,t){for(var n=0;n<e.length;n++){if(e[n].fileName===t.fileName){e.splice(n,1,t);break}}}function d(e,n){return r.update({flexObject:e.getDefinition(),layer:e.getLayer(),transport:e.getRequest()}).then(function(a){if(a&&a.response){e.setResponse(a.response)}else{e.setState(t.states.PERSISTED)}return n}).then(function(t){var n=u(t.changes.comp,e);g(n,e.getDefinition());return e.getDefinition()})}function l(e,t,n,a){return r.remove({flexObject:e.getDefinition(),layer:e.getLayer(),transport:e.getRequest()}).then(function(){delete t[e.getId()];if(e.getChangeType()==="standardVariant"){n.standardVariant=undefined}else if(e.getChangeType()==="defaultVariant"){n.defaultVariant=undefined}else{f(u(n,e),e.getDefinition())}return a}).then(function(t){f(u(t.changes.comp,e),e.getDefinition());return e.getDefinition()})}function v(e){return e&&(e.getPendingAction()==="NEW"||e.getPendingAction()==="UPDATE"||e.getPendingAction()==="DELETE")}function m(e){return e.variants.concat(e.changes).concat(e.defaultVariant).concat(e.standardVariant)}function y(e){var t={};if(typeof e.texts==="object"){Object.keys(e.texts).forEach(function(n){t[n]={value:e.texts[n],type:"XFLD"}})}return t}var h={};h.setDefault=function(e){var t={defaultVariantName:e.defaultVariantId};return o(e,t,"defaultVariant")};h.setExecuteOnSelect=function(e){var t={executeOnSelect:e.executeOnSelect};return o(e,t,"standardVariant")};h.add=function(e){if(!e){return undefined}var n=e.changeSpecificData;var r={changeType:n.type,service:n.ODataService,content:n.content,reference:e.reference,isVariant:n.isVariant,packageName:n.packageName,isUserDependent:n.isUserDependent,selector:{persistencyKey:e.persistencyKey},texts:y(n)};var i=t.createInitialFileContent(r);var s=new t(i);var c=a.getCompVariantsMap(e.reference);var o=c._getOrCreate(e.persistencyKey);u(o,s).push(s);var f=s.getId();var p=a.getCompEntitiesByIdMap(e.reference);p[f]=s;return f};h.updateState=function(e){var t=a.getFlexObjectsFromStorageResponse(e.reference);if(e.changeToBeAddedOrDeleted){switch(e.changeToBeAddedOrDeleted.getPendingAction()){case"NEW":s(e,t);break;case"DELETE":c(e,t);break;default:break}}};h.persist=function(e){var t=e.reference;var n=e.persistencyKey;var r=a.getCompVariantsMap(t);var i=r._getOrCreate(n);var s=a.getCompEntitiesByIdMap(t);var c=a.getStorageResponse(t);var o=m(i).filter(v).map(function(e){switch(e.getPendingAction()){case"NEW":return p(e,c);case"UPDATE":return d(e,c);case"DELETE":return l(e,s,i,c);default:break}});return Promise.all(o)};return h});