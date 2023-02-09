/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AnnotationHelperBasics","sap/base/Log","sap/base/util/deepExtend","sap/base/util/extend"],function(e,a,t,i){"use strict";var n={Bool:"false"},r={Bool:"true"},o={fiscalyear:"IsFiscalYear",fiscalyearperiod:"IsFiscalYearPeriod",year:"IsCalendarYear",yearmonth:"IsCalendarYearMonth",yearmonthday:"IsCalendarDate",yearquarter:"IsCalendarYearQuarter",yearweek:"IsCalendarYearWeek"},s={interval:"SingleInterval","multi-value":"MultiValue","single-value":"SingleValue"},l="sap.ui.model.odata.ODataMetaModel",c={bday:"Contact",city:"Contact/adr",country:"Contact/adr",email:"Contact/email",familyname:"Contact/n",givenname:"Contact/n",honorific:"Contact/n",middlename:"Contact/n",name:"Contact",nickname:"Contact",note:"Contact",org:"Contact","org-role":"Contact","org-unit":"Contact",photo:"Contact",pobox:"Contact/adr",region:"Contact/adr",street:"Contact/adr",suffix:"Contact/n",tel:"Contact/tel",title:"Contact",zip:"Contact/adr",class:"Event",dtend:"Event",dtstart:"Event",duration:"Event",fbtype:"Event",location:"Event",status:"Event",transp:"Event",wholeday:"Event",body:"Message",from:"Message",received:"Message",sender:"Message",subject:"Message",completed:"Task",due:"Task","percent-complete":"Task",priority:"Task"},p=/(\w+)(?:;type=([\w,]+))?/,u={email:{typeMapping:{home:"home",pref:"preferred",work:"work"},v4EnumType:"com.sap.vocabularies.Communication.v1.ContactInformationType",v4PropertyAnnotation:"com.sap.vocabularies.Communication.v1.IsEmailAddress"},tel:{typeMapping:{cell:"cell",fax:"fax",home:"home",pref:"preferred",video:"video",voice:"voice",work:"work"},v4EnumType:"com.sap.vocabularies.Communication.v1.PhoneType",v4PropertyAnnotation:"com.sap.vocabularies.Communication.v1.IsPhoneNumber"}},f={creatable:{"Org.OData.Capabilities.V1.InsertRestrictions":{Insertable:n}},pageable:{"Org.OData.Capabilities.V1.SkipSupported":n,"Org.OData.Capabilities.V1.TopSupported":n},"requires-filter":{"Org.OData.Capabilities.V1.FilterRestrictions":{RequiresFilter:r}},topable:{"Org.OData.Capabilities.V1.TopSupported":n}},m={city:"locality",email:"address",familyname:"surname",givenname:"given",honorific:"prefix",middlename:"additional",name:"fn","org-role":"role","org-unit":"orgunit","percent-complete":"percentcomplete",tel:"uri",zip:"code"},d={"sap:filterable":["Org.OData.Capabilities.V1.FilterRestrictions","NonFilterableProperties"],"sap:required-in-filter":["Org.OData.Capabilities.V1.FilterRestrictions","RequiredProperties"],"sap:sortable":["Org.OData.Capabilities.V1.SortRestrictions","NonSortableProperties"]},v=/^com\.sap\.vocabularies\.Common\.v1\.ValueList(#.*)?$/,b=a.Level.WARNING,y;y={addEntitySetAnnotation:function(e,a,n,r,o){if(n==="EntitySet"&&a.value===r){if(o){t(e,f[a.name])}else{i(e,f[a.name])}}},addFilterRestriction:function(e,t){var i,n=s[e["sap:filter-restriction"]];if(!n){if(a.isLoggable(b,l)){a.warning("Unsupported sap:filter-restriction: "+e["sap:filter-restriction"],t.entityType+"."+e.name,l)}return}i=t["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"]||[];i.push({Property:{PropertyPath:e.name},AllowedExpressions:{EnumMember:"com.sap.vocabularies.Common.v1.FilterExpressionType/"+n}});t["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"]=i},addNavigationFilterRestriction:function(e,a){var t=a["Org.OData.Capabilities.V1.NavigationRestrictions"]||{};t.RestrictedProperties=t.RestrictedProperties||[];t.RestrictedProperties.push({FilterRestrictions:{Filterable:n},NavigationProperty:{NavigationPropertyPath:e.name}});a["Org.OData.Capabilities.V1.NavigationRestrictions"]=t},addPropertyToAnnotation:function(e,a,t){var i=d[e],n=i[0],r=i[1],o=a[n]||{},s=o[r]||[];s.push({PropertyPath:t.name});o[r]=s;a[n]=o},addSapSemantics:function(e){if(e.property){e.property.forEach(function(t){var i,n,s,f,d,v=t["sap:semantics"],g,h,C,P,O;if(!v){return}if(v==="url"){t["Org.OData.Core.V1.IsURL"]=r;return}if(v in o){g="com.sap.vocabularies.Common.v1."+o[v];t[g]=r;return}s=p.exec(v);if(!s){if(a.isLoggable(b,l)){a.warning("Unsupported sap:semantics: "+v,e.name+"."+t.name,l)}return}if(s[2]){v=s[1];O=y.getV4TypesForV2Semantics(v,s[2],t,e)}P=u[v];n=v==="tel"||v==="email";h=c[v];if(h){i=h.split("/");g="com.sap.vocabularies.Communication.v1."+i[0];e[g]=e[g]||{};C=e[g];f=i[1];if(f){C[f]=C[f]||(n?[]:{});if(n){d={};C[f].push(d);C=d}else{C=C[f]}}C[m[v]||v]={Path:t.name};if(O){C.type={EnumMember:O}}}if(P){t[P.v4PropertyAnnotation]=t[P.v4PropertyAnnotation]||r}})}},addUnitAnnotations:function(t,i){function n(t){(t||[]).forEach(function(t){(t.property||[]).forEach(function(n){var r,o,s,c,p,u=n["sap:unit"],f;if(u){o={getModel:function(){return i},getPath:function(){return t.$path}};p={Path:u};c=e.followPath(o,p);if(c&&c.resolvedPath){f=i.getProperty(c.resolvedPath);s=f["sap:semantics"];if(s==="unit-of-measure"){r="Org.OData.Measures.V1.Unit"}else if(s==="currency-code"){r="Org.OData.Measures.V1.ISOCurrency"}else if(a.isLoggable(b,l)){a.warning("Unsupported sap:semantics='"+s+"' at sap:unit='"+u+"'; "+"expected 'currency-code' or 'unit-of-measure'",t.namespace+"."+t.name+"/"+n.name,l)}if(r&&!(r in n)){n[r]=p}}else if(a.isLoggable(b,l)){a.warning("Path '"+u+"' for sap:unit cannot be resolved",t.namespace+"."+t.name+"/"+n.name,l)}}})})}t.forEach(function(e){n(e.complexType);n(e.entityType)})},addV4Annotation:function(e,a,t){switch(a.name){case"aggregation-role":if(a.value==="dimension"){e["com.sap.vocabularies.Analytics.v1.Dimension"]=r}else if(a.value==="measure"){e["com.sap.vocabularies.Analytics.v1.Measure"]=r}break;case"display-format":if(a.value==="NonNegative"){e["com.sap.vocabularies.Common.v1.IsDigitSequence"]=r}else if(a.value==="UpperCase"){e["com.sap.vocabularies.Common.v1.IsUpperCase"]=r}break;case"pageable":case"topable":y.addEntitySetAnnotation(e,a,t,"false",false);break;case"creatable":y.addEntitySetAnnotation(e,a,t,"false",true);break;case"deletable":case"deletable-path":y.handleXableAndXablePath(e,a,t,"Org.OData.Capabilities.V1.DeleteRestrictions","Deletable");break;case"updatable":case"updatable-path":y.handleXableAndXablePath(e,a,t,"Org.OData.Capabilities.V1.UpdateRestrictions","Updatable");break;case"requires-filter":y.addEntitySetAnnotation(e,a,t,"true",true);break;case"field-control":e["com.sap.vocabularies.Common.v1.FieldControl"]={Path:a.value};break;case"heading":e["com.sap.vocabularies.Common.v1.Heading"]={String:a.value};break;case"label":e["com.sap.vocabularies.Common.v1.Label"]={String:a.value};break;case"precision":e["Org.OData.Measures.V1.Scale"]={Path:a.value};break;case"quickinfo":e["com.sap.vocabularies.Common.v1.QuickInfo"]={String:a.value};break;case"text":e["com.sap.vocabularies.Common.v1.Text"]={Path:a.value};break;case"visible":if(a.value==="false"){e["com.sap.vocabularies.Common.v1.FieldControl"]={EnumMember:"com.sap.vocabularies.Common.v1.FieldControlType/Hidden"};e["com.sap.vocabularies.UI.v1.Hidden"]=r}break;default:}},calculateEntitySetAnnotations:function(e,a){if(a.property){a.property.forEach(function(a){if(a["sap:filterable"]==="false"){y.addPropertyToAnnotation("sap:filterable",e,a)}if(a["sap:required-in-filter"]==="true"){y.addPropertyToAnnotation("sap:required-in-filter",e,a)}if(a["sap:sortable"]==="false"){y.addPropertyToAnnotation("sap:sortable",e,a)}if(a["sap:filter-restriction"]){y.addFilterRestriction(a,e)}})}if(a.navigationProperty){a.navigationProperty.forEach(function(a){if(a["sap:filterable"]==="false"){y.addNavigationFilterRestriction(a,e);y.addPropertyToAnnotation("sap:filterable",e,a)}y.handleCreatableNavigationProperty(e,a)})}},findIndex:function(e,a,t){var i,n;t=t||"name";if(e){for(i=0,n=e.length;i<n;i+=1){if(e[i][t]===a){return i}}}return-1},findObject:function(e,a,t){var i=y.findIndex(e,a,t);return i<0?null:e[i]},getChildAnnotations:function(e,a,t){var i=t?e.EntityContainer:e.propertyAnnotations;return i&&i[a]||{}},getFromContainer:function(e,a,t,i){var n,r=i?undefined:null;if(e){n=y.findIndex(e[a],t);if(n>=0){r=i?e.$path+"/"+a+"/"+n:e[a][n]}}return r},getObject:function(e,a,t,i){var n,r=i?undefined:null,o,s,l,c;t=t||"";s=t.lastIndexOf(".");l=t.slice(0,s);c=t.slice(s+1);o=y.getSchema(e,l);if(o){n=o[a];if(n){n.some(function(e){if(e.name===c){r=i?e.$path:e;return true}return false})}}return r},getSchema:function(e,a){var t=null,i=Array.isArray(e)?e:e.getObject("/dataServices/schema");if(i){i.some(function(e){if(e.namespace===a){t=e;return true}return false})}return t},getV4TypesForV2Semantics:function(e,t,i,n){var r=[],o=u[e];if(o){t.split(",").forEach(function(e){var t=o.typeMapping[e];if(t){r.push(o.v4EnumType+"/"+t)}else if(a.isLoggable(b,l)){a.warning("Unsupported type for sap:semantics: "+e,n.name+"."+i.name,l)}})}return r.join(" ")},getValueLists:function(e){var a,t,i,n={};for(t in e){a=v.exec(t);if(a){i=(a[1]||"").slice(1);n[i]=e[t]}}return n},handleCreatableNavigationProperty:function(e,t){var i=t["sap:creatable"],n=t["sap:creatable-path"],r,o={NavigationPropertyPath:t.name},s;if(i&&n){a.warning("Inconsistent service","Use either 'sap:creatable' or 'sap:creatable-path' at navigation property "+"'"+e.entityType+"/"+t.name+"'",l);i="false";n=undefined}if(i==="false"||n){r=e["Org.OData.Capabilities.V1.InsertRestrictions"]=e["Org.OData.Capabilities.V1.InsertRestrictions"]||{};s=r["NonInsertableNavigationProperties"]=r["NonInsertableNavigationProperties"]||[];if(n){o={If:[{Not:{Path:n}},o]}}s.push(o)}},handleXableAndXablePath:function(e,t,i,r,o){var s=o.toLowerCase(),c;if(i!=="EntitySet"){return}if(e["sap:"+s]&&e["sap:"+s+"-path"]){a.warning("Inconsistent service","Use either 'sap:"+s+"' or 'sap:"+s+"-path'"+" at entity set '"+e.name+"'",l);c=n}else if(s!==t.name){c={Path:t.value}}else if(t.value==="false"){c=n}if(c){e[r]=e[r]||{};e[r][o]=c}},liftSAPData:function(e,a){if(!e.extensions){return}e.extensions.forEach(function(t){if(t.namespace==="http://www.sap.com/Protocols/SAPData"){e["sap:"+t.name]=t.value;y.addV4Annotation(e,t,a)}});switch(a){case"Property":if(e["sap:updatable"]==="false"){if(e["sap:creatable"]==="false"){e["Org.OData.Core.V1.Computed"]=r}else{e["Org.OData.Core.V1.Immutable"]=r}}break;case"EntitySet":if(e["sap:searchable"]!=="true"){e["Org.OData.Capabilities.V1.SearchRestrictions"]={Searchable:n}}break;default:}},merge:function(e,a,t){var n=a.dataServices.schema;if(!n){return}n.forEach(function(a,t){var n;delete a.annotations;y.liftSAPData(a);a.$path="/dataServices/schema/"+t;n=a["sap:schema-version"];if(n){a["Org.Odata.Core.V1.SchemaVersion"]={String:n}}i(a,e[a.namespace]);y.visitParents(a,e,"association",function(e,a){y.visitChildren(e.end,a)});y.visitParents(a,e,"complexType",function(e,a){y.visitChildren(e.property,a,"Property");y.addSapSemantics(e)});y.visitParents(a,e,"entityType",y.visitEntityType)});n.forEach(function(a){y.visitParents(a,e,"entityContainer",function(t,i){y.visitChildren(t.associationSet,i);y.visitChildren(t.entitySet,i,"EntitySet",n);y.visitChildren(t.functionImport,i,"",null,y.visitParameters.bind(this,e,a,t))})});y.addUnitAnnotations(n,t)},visitChildren:function(e,a,t,n,r,o){if(!e){return}if(o){e=e.slice(o)}e.forEach(function(e){y.liftSAPData(e,t)});e.forEach(function(e){var o;if(t==="EntitySet"){o=y.getObject(n,"entityType",e.entityType);y.calculateEntitySetAnnotations(e,o)}if(r){r(e)}i(e,a[e.name||e.role])})},visitEntityType:function(e,a){y.visitChildren(e.property,a,"Property");y.visitChildren(e.navigationProperty,a);y.addSapSemantics(e)},visitParameters:function(e,a,t,n){var r;if(!n.parameter){return}r=y.getChildAnnotations(e,a.namespace+"."+t.name,true);n.parameter.forEach(function(e){y.liftSAPData(e);i(e,r[n.name+"/"+e.name])})},visitParents:function(e,a,t,n,r){var o=e[t];function s(r,o){var s=e.namespace+"."+r.name,l=y.getChildAnnotations(a,s,t==="entityContainer");y.liftSAPData(r);r.namespace=e.namespace;r.$path=e.$path+"/"+t+"/"+o;n(r,l);i(r,a[s])}if(!o){return}if(r!==undefined){s(o[r],r)}else{o.forEach(s)}}};return y});
//# sourceMappingURL=_ODataMetaModelUtils.js.map