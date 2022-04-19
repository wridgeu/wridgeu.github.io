/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","sap/base/Log","sap/ui/performance/Measurement"],function(e,t,o){"use strict";var s="sap.ui.model.odata.v4.lib._MetadataConverter";function r(){this.aliases={};this.oAnnotatable=null;this.entityContainer=null;this.entitySet=null;this.namespace=null;this.oOperation=null;this.reference=null;this.schema=null;this.type=null;this.result=null;this.url=null;this.xmlns=null}r.prototype.rCollection=/^Collection\((.*)\)$/;r.prototype.sEdmNamespace="http://docs.oasis-open.org/odata/ns/edm";r.prototype.sEdmxNamespace="http://docs.oasis-open.org/odata/ns/edmx";r.prototype.addToResult=function(e,o){if(e in this.result){t.warning("Duplicate qualified name "+e,undefined,s)}this.result[e]=o};r.prototype.annotatable=function(t,o,s){var r,n,a;if(typeof t==="string"){r=this.oAnnotatable;if(r){t=e.buildPath(r.path,t)}a=t;n=this.schema.$Annotations;if(n&&n[t]){t=n[t]}}this.oAnnotatable={parent:this.oAnnotatable,path:a,prefix:o||"",qualifiedName:undefined,qualifier:s,target:t}};r.prototype.convertXMLMetadata=function(e,t){var s;o.average("convertXMLMetadata","","sap.ui.model.odata.v4.lib._V4MetadataConverter");s=e.documentElement;if(s.localName!=="Edmx"||s.namespaceURI!==this.sRootNamespace){throw new Error(t+": expected <Edmx> in namespace '"+this.sRootNamespace+"'")}this.result={};this.url=t;this.traverse(s,this.oAliasConfig);this.traverse(s,this.oFullConfig,true);this.finalize();o.end("convertXMLMetadata");return this.result};r.prototype.getAnnotationValue=function(t,o){var s,r,n;switch(t){case"AnnotationPath":case"NavigationPropertyPath":case"Path":case"PropertyPath":o=this.resolveAliasInPath(o);case"Binary":case"Date":case"DateTimeOffset":case"Decimal":case"Duration":case"Guid":case"TimeOfDay":case"UrlRef":s={};s["$"+t]=o;return s;case"Bool":return o==="true";case"EnumMember":r=o.trim().replace(/ +/g," ").split(" ");for(n=0;n<r.length;n+=1){r[n]=this.resolveAliasInPath(r[n])}return{$EnumMember:r.join(" ")};case"Float":if(o==="NaN"||o==="INF"||o==="-INF"){return{$Float:o}}return parseFloat(o);case"Int":s=parseInt(o);return e.isSafeInteger(s)?s:{$Int:o};case"String":return o;default:return undefined}};r.prototype.getInlineAnnotationValue=function(e){var t,o=e.attributes,s,r;for(r=o.length-1;r>=0;r-=1){t=o.item(r);s=this.getAnnotationValue(t.name,t.value);if(s!==undefined){return s}}return true};r.prototype.getOrCreateArray=function(e,t){var o=e[t];if(!o){o=e[t]=[]}return o};r.prototype.getOrCreateObject=function(e,t){var o=e[t];if(!o){o=e[t]={}}return o};r.prototype.postProcessAnnotation=function(e,t){var o=this.oAnnotatable.parent;o.target[o.qualifiedName]=t.length?t[0]:this.getInlineAnnotationValue(e)};r.prototype.postProcessApply=function(e,t){var o=this.oAnnotatable.target;o.$Apply=t;o.$Function=this.resolveAlias(e.getAttribute("Function"));return o};r.prototype.postProcessCastOrIsOf=function(e,t){var o=e.localName,s=this.oAnnotatable.target;s["$"+o]=t[0];this.processTypedCollection(e.getAttribute("Type"),s);this.processFacetAttributes(e,s);return s};r.prototype.postProcessCollection=function(e,t){return t};r.prototype.postProcessLabeledElement=function(e,t){var o=this.oAnnotatable.target;o.$LabeledElement=t.length?t[0]:this.getInlineAnnotationValue(e);o.$Name=e.getAttribute("Name");return o};r.prototype.postProcessLabeledElementReference=function(e,t){return{$LabeledElementReference:this.resolveAlias(e.textContent)}};r.prototype.postProcessLeaf=function(e,t){return this.getAnnotationValue(e.localName,e.textContent)};r.prototype.postProcessNot=function(e,t){var o=this.oAnnotatable.target;o.$Not=t[0];return o};r.prototype.postProcessNull=function(e,t){var o=this.oAnnotatable,s=null;if(o.qualifiedName){s=o.target;s.$Null=null}return s};r.prototype.postProcessOperation=function(e,t){var o=this.oAnnotatable.target;o["$"+e.localName]=t;return o};r.prototype.postProcessPropertyValue=function(e,t){return{property:e.getAttribute("Property"),value:t.length?t[0]:this.getInlineAnnotationValue(e)}};r.prototype.postProcessRecord=function(e,t){var o,s=this.oAnnotatable.target,r=e.getAttribute("Type"),n;if(r){s.$Type=this.resolveAlias(r)}for(n=0;n<t.length;n+=1){o=t[n];s[o.property]=o.value}return s};r.prototype.postProcessUrlRef=function(e,t){return{$UrlRef:t[0]}};r.prototype.processAlias=function(e){var t=e.getAttribute("Alias");if(t){this.aliases[t]=e.getAttribute("Namespace")+"."}};r.prototype.processAnnotatableExpression=function(e){this.annotatable({})};r.prototype.processAnnotation=function(e){var t=this.oAnnotatable,o,s=t.prefix+"@"+this.resolveAlias(e.getAttribute("Term")),r=t.qualifier||e.getAttribute("Qualifier");if(r){s+="#"+r}if(typeof t.target==="string"){o=this.getOrCreateObject(this.schema,"$Annotations");t.target=o[t.target]={}}t.qualifiedName=s;t.target[s]=true;this.annotatable(t.target,s)};r.prototype.processAnnotations=function(e){this.annotatable(this.resolveAliasInPath(e.getAttribute("Target"),true),undefined,e.getAttribute("Qualifier"))};r.prototype.processAttributes=function(e,t,o){var s,r;for(s in o){r=o[s](e.getAttribute(s));if(r!==undefined&&r!==null){t["$"+s]=r}}};r.prototype.processInclude=function(e){var t=this.getOrCreateArray(this.reference,"$Include");t.push(e.getAttribute("Namespace")+".")};r.prototype.processIncludeAnnotations=function(e){var t=this.reference,o={$TermNamespace:e.getAttribute("TermNamespace")+"."},s=this.getOrCreateArray(t,"$IncludeAnnotations");this.processAttributes(e,o,{TargetNamespace:function e(t){return t?t+".":t},Qualifier:this.setValue});s.push(o)};r.prototype.processPropertyValue=function(e){this.annotatable(this.oAnnotatable.target,e.getAttribute("Property"))};r.prototype.processReference=function(e){var t=this.getOrCreateObject(this.result,"$Reference");this.reference=t[e.getAttribute("Uri")]={};this.annotatable(this.reference)};r.prototype.resolveAlias=function(e){var t=e?e.indexOf("."):-1,o;if(t>=0&&!e.includes(".",t+1)){o=this.aliases[e.slice(0,t)];if(o){return o+e.slice(t+1)}}return e};r.prototype.resolveAliasInParentheses=function(e,t){var o=e?t.indexOf("("):-1;if(o>=0){return this.resolveAlias(t.slice(0,o))+"("+t.slice(o+1,-1).split(",").map(this.resolveAliasInParentheses.bind(this,e)).join(",")+")"}return this.resolveAlias(t)};r.prototype.resolveAliasInPath=function(e,t){var o,s="";if(!e.includes(".")){return e}o=e.indexOf("@");if(o>=0){s="@"+this.resolveAlias(e.slice(o+1));e=e.slice(0,o)}return e.split("/").map(this.resolveAliasInParentheses.bind(this,t)).join("/")+s};r.prototype.setIfFalse=function(e){return e==="false"?false:undefined};r.prototype.setIfTrue=function(e){return e==="true"?true:undefined};r.prototype.setNumber=function(e){return e?parseInt(e):undefined};r.prototype.setValue=function(e){return e};r.prototype.traverse=function(e,t,o){var s=this.oAnnotatable,r,n=e.childNodes,a,i,p,c,l=this.xmlns,u,f=[],_=t.__xmlns||this.xmlns,h,d;if(_&&_!==e.namespaceURI){return undefined}this.xmlns=_;if(o){this.processElement(e,t.__processor)}else if(t.__processor){t.__processor.call(this,e)}for(h=0;h<n.length;h+=1){a=n.item(h);if(a.nodeType===1){c=a.localName;r=t[c];if(!r&&t.__include){p=t.__include;for(d=0;d<p.length;d+=1){r=p[d][c];if(r){break}}}if(r){i=this.traverse(a,r,o);if(i!==undefined&&t.__postProcessor){f.push(i)}}}}if(t.__postProcessor){u=t.__postProcessor.call(this,e,f)}this.oAnnotatable=s;this.xmlns=l;return u};(function(e){var t,o,s,r,n;s={AnnotationPath:{__postProcessor:e.postProcessLeaf},Binary:{__postProcessor:e.postProcessLeaf},Bool:{__postProcessor:e.postProcessLeaf},Date:{__postProcessor:e.postProcessLeaf},DateTimeOffset:{__postProcessor:e.postProcessLeaf},Decimal:{__postProcessor:e.postProcessLeaf},Duration:{__postProcessor:e.postProcessLeaf},EnumMember:{__postProcessor:e.postProcessLeaf},Float:{__postProcessor:e.postProcessLeaf},Guid:{__postProcessor:e.postProcessLeaf},Int:{__postProcessor:e.postProcessLeaf},LabeledElementReference:{__postProcessor:e.postProcessLabeledElementReference},NavigationPropertyPath:{__postProcessor:e.postProcessLeaf},Path:{__postProcessor:e.postProcessLeaf},PropertyPath:{__postProcessor:e.postProcessLeaf},String:{__postProcessor:e.postProcessLeaf},TimeOfDay:{__postProcessor:e.postProcessLeaf}};r=[s];e.oAnnotationConfig={Annotation:{__xmlns:e.sEdmNamespace,__processor:e.processAnnotation,__postProcessor:e.postProcessAnnotation,__include:r}};t=[s,e.oAnnotationConfig];n={__processor:e.processAnnotatableExpression,__postProcessor:e.postProcessOperation,__include:t};o={And:n,Apply:{__processor:e.processAnnotatableExpression,__postProcessor:e.postProcessApply,__include:t},Cast:{__processor:e.processAnnotatableExpression,__postProcessor:e.postProcessCastOrIsOf,__include:t},Collection:{__postProcessor:e.postProcessCollection,__include:r},Eq:n,Ge:n,Gt:n,If:n,IsOf:{__processor:e.processAnnotatableExpression,__postProcessor:e.postProcessCastOrIsOf,__include:t},LabeledElement:{__processor:e.processAnnotatableExpression,__postProcessor:e.postProcessLabeledElement,__include:t},Le:n,Lt:n,Ne:n,Null:{__processor:e.processAnnotatableExpression,__postProcessor:e.postProcessNull,__include:[e.oAnnotationConfig]},Not:{__processor:e.processAnnotatableExpression,__postProcessor:e.postProcessNot,__include:t},Or:n,Record:{__processor:e.processAnnotatableExpression,__postProcessor:e.postProcessRecord,__include:[e.oAnnotationConfig],PropertyValue:{__processor:e.processPropertyValue,__postProcessor:e.postProcessPropertyValue,__include:t}},UrlRef:{__postProcessor:e.postProcessUrlRef,__include:r}};e.oAnnotationsConfig={Annotations:{__processor:e.processAnnotations,__include:[e.oAnnotationConfig]}};r.push(o);t.push(o);e.oAnnotationConfig.Annotation.Annotation=e.oAnnotationConfig.Annotation;e.oReferenceInclude={Reference:{__xmlns:e.sEdmxNamespace,__processor:e.processReference,__include:[e.oAnnotationConfig],Include:{__processor:e.processInclude},IncludeAnnotations:{__processor:e.processIncludeAnnotations}}}})(r.prototype);return r},false);