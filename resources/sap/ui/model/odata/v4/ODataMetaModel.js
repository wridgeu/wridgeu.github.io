/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnnotationHelper","./ValueListType","./lib/_Helper","sap/base/assert","sap/base/Log","sap/base/util/isEmptyObject","sap/base/util/JSTokenizer","sap/base/util/ObjectPath","sap/ui/base/ManagedObject","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ChangeReason","sap/ui/model/ClientListBinding","sap/ui/model/Context","sap/ui/model/ContextBinding","sap/ui/model/MetaModel","sap/ui/model/PropertyBinding","sap/ui/model/odata/OperationMode","sap/ui/model/odata/type/Boolean","sap/ui/model/odata/type/Byte","sap/ui/model/odata/type/Date","sap/ui/model/odata/type/DateTimeOffset","sap/ui/model/odata/type/Decimal","sap/ui/model/odata/type/Double","sap/ui/model/odata/type/Guid","sap/ui/model/odata/type/Int16","sap/ui/model/odata/type/Int32","sap/ui/model/odata/type/Int64","sap/ui/model/odata/type/Raw","sap/ui/model/odata/type/SByte","sap/ui/model/odata/type/Single","sap/ui/model/odata/type/Stream","sap/ui/model/odata/type/String","sap/ui/model/odata/type/TimeOfDay","sap/ui/thirdparty/URI"],function(e,t,n,i,r,o,a,s,u,f,l,c,d,p,h,y,g,m,v,$,C,b,O,M,P,w,x,E,U,S,T,A,j,L,R){"use strict";var D=u.extend("sap.ui.model.odata.v4._any",{metadata:{properties:{any:"any"}}}),I,V=new Map,q=r.Level.DEBUG,N=/\$\(/g,k=/^-?\d+$/,B,W,F="sap.ui.model.odata.v4.ODataMetaModel",_,G=/\(.*\)$/,K=new U,z=/\$\)/g,H=new Map,J={messageChange:true},Q={"Edm.Boolean":{Type:v},"Edm.Byte":{Type:$},"Edm.Date":{Type:C},"Edm.DateTimeOffset":{constraints:{$Precision:"precision"},Type:b},"Edm.Decimal":{constraints:{"@Org.OData.Validation.V1.Minimum/$Decimal":"minimum","@Org.OData.Validation.V1.Minimum@Org.OData.Validation.V1.Exclusive":"minimumExclusive","@Org.OData.Validation.V1.Maximum/$Decimal":"maximum","@Org.OData.Validation.V1.Maximum@Org.OData.Validation.V1.Exclusive":"maximumExclusive",$Precision:"precision",$Scale:"scale"},Type:O},"Edm.Double":{Type:M},"Edm.Guid":{Type:P},"Edm.Int16":{Type:w},"Edm.Int32":{Type:x},"Edm.Int64":{Type:E},"Edm.SByte":{Type:S},"Edm.Single":{Type:T},"Edm.Stream":{Type:A},"Edm.String":{constraints:{"@com.sap.vocabularies.Common.v1.IsDigitSequence":"isDigitSequence",$MaxLength:"maxLength"},Type:j},"Edm.TimeOfDay":{constraints:{$Precision:"precision"},Type:L}},X={},Y="@com.sap.vocabularies.Common.v1.ValueList",Z="@com.sap.vocabularies.Common.v1.ValueListMapping",ee="@com.sap.vocabularies.Common.v1.ValueListReferences",te="@com.sap.vocabularies.Common.v1.ValueListRelevantQualifiers",ne="@com.sap.vocabularies.Common.v1.ValueListWithFixedValues",ie=r.Level.WARNING;function re(e,t,n,i){var r,o=e.mSchema2MetadataUrl[t];if(!o){o=e.mSchema2MetadataUrl[t]={};o[n]=false}else if(!(n in o)){r=Object.keys(o)[0];if(o[r]){le(e,"A schema cannot span more than one document: "+t+" - expected reference URI "+r+" but instead saw "+n,i)}o[n]=false}}function oe(e,t,n,i){var r,o,a,s;function u(e){var r,a;if(!(n in e)){i(ie,o," does not contain ",n);return}i(q,"Including ",n," from ",o);for(a in e){if(a[0]!=="$"&&ce(a)===n){r=e[a];t[a]=r;fe(r,t.$Annotations)}}}if(n in t){return t[n]}s=e.mSchema2MetadataUrl[n];if(s){a=Object.keys(s);if(a.length>1){le(e,"A schema cannot span more than one document: "+"schema is referenced by following URLs: "+a.join(", "),n)}o=a[0];s[o]=true;i(q,"Namespace ",n," found in $Include of ",o);r=e.mMetadataUrl2Promise[o];if(!r){i(q,"Reading ",o);r=e.mMetadataUrl2Promise[o]=f.resolve(e.oRequestor.read(o)).then(e.validate.bind(e,o))}r=r.then(u);if(n in t){return t[n]}t[n]=r;return r}}function ae(e,t){if(e===t){return""}if(e.startsWith(t)&&e[t.length]==="#"&&e.indexOf("@",t.length)<0){return e.slice(t.length+1)}}function se(e){var t=ae(e,Z);return t!==undefined?t:ae(e,Y)}function ue(e,t){return t.some(function(t){return e==="$ReturnType"?t.$ReturnType:t.$Parameter&&t.$Parameter.some(function(t){return t.$Name===e})})}function fe(e,t,n){var i;function r(e,t){var i;for(i in t){if(n||!(i in e)){e[i]=t[i]}}}for(i in e.$Annotations){if(!(i in t)){t[i]={}}r(t[i],e.$Annotations[i])}delete e.$Annotations}function le(e,t,n){var i=new Error(n+": "+t);e.oModel.reportError(t,F,i);throw i}function ce(e){return e.slice(0,e.lastIndexOf(".")+1)}B=h.extend("sap.ui.model.odata.v4.ODataMetaContextBinding",{constructor:function(e,t,n){i(!n||n.getModel()===e,"oContext must belong to this model");h.call(this,e,t,n)},initialize:function(){var e=this.oModel.createBindingContext(this.sPath,this.oContext);this.bInitial=false;if(e!==this.oElementContext){this.oElementContext=e;this._fireChange()}},setContext:function(e){i(!e||e.getModel()===this.oModel,"oContext must belong to this model");if(e!==this.oContext){this.oContext=e;if(!this.bInitial){this.initialize()}}}});W=d.extend("sap.ui.model.odata.v4.ODataMetaListBinding",{constructor:function(){d.apply(this,arguments)},_fireFilter:function(){},_fireSort:function(){},checkUpdate:function(e){var t=this.oList.length;this.update();if(e||this.oList.length!==t){this._fireChange({reason:c.Change})}},fetchContexts:function(){var e,t=this.oModel.resolve(this.sPath,this.oContext),n=this;if(!t){return f.resolve([])}e=t.endsWith("@");if(!e&&!t.endsWith("/")){t+="/"}return this.oModel.fetchObject(t).then(function(i){if(!i){return[]}if(e){t=t.slice(0,-1)}return Object.keys(i).filter(function(t){return t[0]!=="$"&&e!==(t[0]!=="@")}).map(function(e){return new p(n.oModel,t+e)})})},getContexts:function(e,t){this.iCurrentStart=e||0;this.iCurrentLength=Math.min(t||Infinity,this.iLength-this.iCurrentStart);return this.getCurrentContexts()},getCurrentContexts:function(){var e=[],t,n=this.iCurrentStart+this.iCurrentLength;for(t=this.iCurrentStart;t<n;t+=1){e.push(this.oList[this.aIndices[t]])}if(this.oList.dataRequested){e.dataRequested=true}return e},setContexts:function(e){this.oList=e;this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength()},update:function(){var e=[],t=this.fetchContexts(),n=this;if(t.isFulfilled()){e=t.getResult()}else{t.then(function(e){n.setContexts(e);n._fireChange({reason:c.Change})});e.dataRequested=true}this.setContexts(e)}});_=g.extend("sap.ui.model.odata.v4.ODataMetaPropertyBinding",{constructor:function(){g.apply(this,arguments);this.vValue=undefined},checkUpdate:function(e,t){var n,i=this;function r(n){if(e||n!==i.vValue){i.vValue=n;i._fireChange({reason:t||c.Change})}return n}n=this.oModel.fetchObject(this.sPath,this.oContext,this.mParameters).then(r);if(this.mParameters&&this.mParameters.$$valueAsPromise&&n.isPending()){r(n.unwrap())}else if(n.isRejected()){n.unwrap()}},getValue:function(){return this.vValue},setContext:function(e){if(this.oContext!==e){this.oContext=e;if(this.bRelative){this.checkUpdate(false,c.Context)}}},setValue:function(){throw new Error("Unsupported operation: ODataMetaPropertyBinding#setValue")}});var de=y.extend("sap.ui.model.odata.v4.ODataMetaModel",{constructor:function(e,t,n,i,r){y.call(this);this.aAnnotationUris=n&&!Array.isArray(n)?[n]:n;this.sDefaultBindingMode=l.OneTime;this.mETags={};this.dLastModified=new Date(0);this.oMetadataPromise=null;this.oModel=i;this.mMetadataUrl2Promise={};this.oRequestor=e;this.mSchema2MetadataUrl={};this.mSupportedBindingModes={OneTime:true,OneWay:true};this.bSupportReferences=r!==false;this.mUnsupportedFilterOperators={All:true,Any:true};this.sUrl=t}});de.prototype.$$valueAsPromise=true;de.prototype._mergeAnnotations=function(e,t){var n=this;this.validate(this.sUrl,e);e.$Annotations={};Object.keys(e).forEach(function(t){if(e[t].$kind==="Schema"){re(n,t,n.sUrl);fe(e[t],e.$Annotations)}});t.forEach(function(t,i){var r,o;n.validate(n.aAnnotationUris[i],t);for(o in t){if(o[0]!=="$"){if(o in e){le(n,"A schema cannot span more than one document: "+o,n.aAnnotationUris[i])}r=t[o];e[o]=r;if(r.$kind==="Schema"){re(n,o,n.aAnnotationUris[i]);fe(r,e.$Annotations,true)}}}})};de.prototype.attachEvent=function(e){if(!(e in J)){throw new Error("Unsupported event '"+e+"': v4.ODataMetaModel#attachEvent")}return y.prototype.attachEvent.apply(this,arguments)};de.prototype.bindContext=function(e,t){return new B(this,e,t)};de.prototype.bindList=function(e,t,n,i){return new W(this,e,t,n,i)};de.prototype.bindProperty=function(e,t,n){return new _(this,e,t,n)};de.prototype.bindTree=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#bindTree")};de.prototype.fetchCanonicalPath=function(e){return this.fetchUpdateData("",e).then(function(t){if(!t.editUrl){throw new Error(e.getPath()+": No canonical path for transient entity")}if(t.propertyPath){throw new Error("Context "+e.getPath()+" does not point to an entity. It should be "+t.entityPath)}return"/"+t.editUrl})};de.prototype.fetchData=function(){return this.fetchEntityContainer().then(function(e){return JSON.parse(JSON.stringify(e))})};de.prototype.fetchEntityContainer=function(e){var t,n=this;if(!this.oMetadataPromise){t=[f.resolve(this.oRequestor.read(this.sUrl,false,e))];if(this.aAnnotationUris){this.aAnnotationUris.forEach(function(i){t.push(f.resolve(n.oRequestor.read(i,true,e)))})}if(!e){this.oMetadataPromise=f.all(t).then(function(e){var t=e[0];n._mergeAnnotations(t,e.slice(1));return t})}}return this.oMetadataPromise};de.prototype.fetchObject=function(e,t,n){var i=this.resolve(e,t),o=this;if(!i){r.error("Invalid relative path w/o context",e,F);return f.resolve(null)}return this.fetchEntityContainer().then(function(u){var l,c,d,h,y,g,m,v,$,C;function b(e,t,n){var i,r,o,a,s="";if(t){r=t.indexOf("@@");if(r>0){t=t.slice(0,r)}}else{t=e}n=n||"";if(l){m=a=C.filter(P);if(a.length!==1){return w(ie,"Expected a single overload, but found "+a.length)}if(l!==X){s=a[0].$Parameter[0].$isCollection?"Collection("+l+")":l}o=$+"("+s+")"+n;if(u.$Annotations[o]){if(t==="@"){C=u.$Annotations[o];i=u.$Annotations[$+n];if(i){C=Object.assign({},i,C)}return false}if(t in u.$Annotations[o]){$=o;C=u;return true}}}$+=n;C=u;return true}function O(e,t){var i,r,u,f=e.indexOf("@",2);if(f>-1){return w(ie,"Unsupported path after ",e.slice(0,f))}e=e.slice(2);u=e.indexOf("(");if(u>0){if(!e.endsWith(")")){return w(ie,"Expected ')' instead of '",e.slice(-1),"'")}try{r=a.parseJS("["+e.slice(u+1,-1).replace(N,"{").replace(z,"}")+"]")}catch(e){return w(ie,e.message,": ",e.text.slice(1,e.at),"<--",e.text.slice(e.at,-1))}e=e.slice(0,u)}i=e[0]==="."?s.get(e.slice(1),n.scope):n&&s.get(e,n.scope)||(e==="requestCurrencyCodes"||e==="requestUnitsOfMeasure"?o[e].bind(o):s.get(e));if(typeof i!=="function"){return w(ie,e," is not a function but: "+i)}try{C=i(C,{$$valueAsPromise:n&&n.$$valueAsPromise,arguments:r,context:new p(o,t),schemaChildName:v,overload:m.length===1?m[0]:undefined})}catch(t){w(ie,"Error calling ",e,": ",t)}return true}function M(e,t){var n;if(e==="$ReturnType"){if(t.$ReturnType){C=t.$ReturnType;return true}}else if(e&&t.$Parameter){n=t.$Parameter.filter(function(t){return t.$Name===e});if(n.length){C=n[0];return true}}return false}function P(e){return!e.$IsBound&&l===X||e.$IsBound&&l===e.$Parameter[0].$Type}function w(e){var t;if(r.isLoggable(e,F)){t=Array.isArray(h)?h.join("/"):h;r[e===q?"debug":"warning"](Array.prototype.slice.call(arguments,1).join("")+(t?" at /"+t:""),i,F)}if(e===ie){C=undefined}return false}function x(e,t){var n;function i(){h=h||$&&t&&$+"/"+t;return w.apply(this,arguments)}l=C&&C.$Type||l;if(o.bSupportReferences&&!(e in u)){n=ce(e);C=oe(o,u,n,i)}if(e in u){$=y=v=e;C=m=u[v];if(!f.isThenable(C)){return true}}if(f.isThenable(C)&&C.isPending()){return i(q,"Waiting for ",n)}return i(ie,"Unknown qualified name ",e)}function E(e,t,n){var i,r;if(e==="$Annotations"){return w(ie,"Invalid segment: $Annotations")}if(t&&typeof C==="object"&&e in C){if(e[0]==="$"||k.test(e)){g=false}}else{i=e.indexOf("@@");if(i<0){if(e.endsWith("@sapui.name")){i=e.length-11}else{i=e.indexOf("@")}}if(i>0){if(!E(e.slice(0,i),t,n)){return false}e=e.slice(i);r=true;if(C&&(C.$kind==="EntitySet"||C.$kind==="Singleton")){c=C}}if(typeof C==="string"&&!(r&&(e==="@sapui.name"||e[1]==="@"))&&!U(C,n.slice(0,t))){return false}if(g){if(e[0]==="$"&&e!=="$Parameter"&&e!=="$ReturnType"||k.test(e)){g=false}else{if(r){}else if(e[0]!=="@"&&e.indexOf(".")>0){return x(e)}else if(C&&"$Type"in C){if(!x(C.$Type,"$Type")){return false}}else if(C&&"$Action"in C){if(!x(C.$Action,"$Action")){return false}l=X}else if(C&&"$Function"in C){if(!x(C.$Function,"$Function")){return false}l=X}else if(!t){$=y=v=v||u.$EntityContainer;C=m=m||u[v];if(Array.isArray(C)&&M(e,C[0])){return true}if(e&&e[0]!=="@"&&!(e in m)){return w(ie,"Unknown child ",e," of ",v)}}if(Array.isArray(C)){if(e==="$Parameter"){return true}if(e.startsWith("@$ui5.overload@")){e=e.slice(14);r=true}if(r){if(e[1]!=="@"&&!b(e)){return false}}else{if(e!==n[t]&&n[t][e.length+1]!=="@"&&ue(e,C)){y=e;return b(e,n[t].slice(e.length),"/"+y)}if(l){C=C.filter(P)}if(e==="@$ui5.overload"){return true}if(C.length!==1){return w(ie,"Expected a single overload, but found "+C.length)}if(M(e,C[0])){return true}C=C[0].$ReturnType;$+="/0/$ReturnType";if(C){if(e==="value"&&!(u[C.$Type]&&u[C.$Type].value)){y=undefined;return true}if(!x(C.$Type,"$Type")){return false}}if(!e){return true}}}}}if(!e){return t+1>=n.length||w(ie,"Invalid empty segment")}if(e[0]==="@"){if(e==="@sapui.name"){C=y;if(C===undefined){w(ie,"Unsupported path before @sapui.name")}else if(t+1<n.length){w(ie,"Unsupported path after @sapui.name")}return false}if(e[1]==="@"){if(t+1<n.length){return w(ie,"Unsupported path after ",e)}return O(e,[""].concat(n.slice(0,t),n[t].slice(0,i)).join("/"))}}if(!C||typeof C!=="object"){C=undefined;return!d&&w(q,"Invalid segment: ",e)}if(g&&e[0]==="@"){l=C.$Type||l;C=u.$Annotations[$]||{};g=false}else if(e==="$"&&t+1<n.length){return w(ie,"Unsupported path after $")}}if(e!=="@"&&e!=="$"){if(e[0]==="@"){d=true}y=g||e[0]==="@"?e:undefined;$=g?$+"/"+e:undefined;C=C[e]}return true}function U(e,t){var n;if(h){return w(ie,"Invalid recursion")}h=t;d=false;g=true;C=u;if(c){if(!e){C=c;c=h=undefined;return true}v=c.$Type;c=m=undefined}n=e.split("/").every(E);h=undefined;return n}if(!U(i.slice(1))&&f.isThenable(C)){C=C.then(function(){return o.fetchObject(e,t,n)})}return C})};de.prototype.fetchUI5Type=function(e,t){var n=this.getMetaContext(e),i=this;if(e.endsWith("/$count")){I=I||new E;return f.resolve(I)}return this.fetchObject(undefined,n).catch(function(){}).then(function(a){var s=K,u;if(!a){r.warning("No metadata for path '"+e+"', using "+s.getName(),undefined,F);return s}if(t){if(o(t)){t=undefined}else if("parseKeepsEmptyString"in t&&a.$Type!=="Edm.String"){if(Object.keys(t).length===1){t=undefined}else{t=Object.assign({},t);delete t.parseKeepsEmptyString}}}if(!t&&a["$ui5.type"]){return a["$ui5.type"]}if(a.$isCollection){r.warning("Unsupported collection type, using "+s.getName(),e,F)}else{u=Q[a.$Type];if(u){s=new u.Type(t,i.getConstraints(a,n.getPath()))}else{r.warning("Unsupported type '"+a.$Type+"', using "+s.getName(),e,F)}}if(!t){a["$ui5.type"]=s}return s})};de.prototype.fetchUpdateData=function(e,t,i){var r=t.getModel(),o=r.resolve(e,t),a=this;function s(e){var t=new Error(o+": "+e);r.reportError(e,F,t);throw t}return this.fetchObject(this.getMetaPath(o)).then(function(){return a.fetchEntityContainer()}).then(function(r){var a,u=r[r.$EntityContainer],l,c,d,p,h=false,y,g,m,v;function $(e){var t=e.indexOf("(");return t>=0?e.slice(t):""}function C(e){a.push({path:y,prefix:e,type:v})}function b(e){var t=e.indexOf("(");return t>=0?e.slice(0,t):e}function O(e){if(e.includes("($uid=")){C(b(e))}else{a.push(e)}}m=o.slice(1).split("/");p=m.shift();y="/"+p;l=y;d=decodeURIComponent(b(p));c=u[d];if(!c){s("Not an entity set: "+d)}v=r[c.$Type];e="";g="";a=[];O(p);m.forEach(function(t){var i,o;y+="/"+t;if(k.test(t)){C(a.pop());l+="/"+t}else{o=decodeURIComponent(b(t));g=n.buildPath(g,o);i=h?{}:v[o];if(!i){if(o.includes("@")){if(o.includes("@$ui5.")){s("Read-only path must not be updated")}h=true;i={}}else{s("Not a (navigation) property: "+o)}}v=r[i.$Type];if(i.$kind==="NavigationProperty"){if(c.$NavigationPropertyBinding&&g in c.$NavigationPropertyBinding){d=c.$NavigationPropertyBinding[g];c=u[d];g="";a=[encodeURIComponent(d)+$(t)];if(!i.$isCollection){C(a.pop())}}else{O(t)}l=y;e=""}else{e=n.buildPath(e,t)}}});if(i){return f.resolve({editUrl:undefined,entityPath:l,propertyPath:e})}return f.all(a.map(function(e){if(typeof e==="string"){return e}return t.fetchValue(e.path).then(function(t){var r;if(!t){s("No instance to calculate key predicate at "+e.path)}if(n.hasPrivateAnnotation(t,"transient")){i=true;return undefined}r=n.getPrivateAnnotation(t,"predicate");if(!r){s("No key predicate known at "+e.path)}return e.prefix+r},function(t){s(t.message+" at "+e.path)})})).then(function(t){return{editUrl:i?undefined:t.join("/"),entityPath:l,propertyPath:e}})})};de.prototype.fetchValueListMappings=function(e,t,i,r){var o=this,a=e.getMetaModel();function s(){var e=r[0],n="";if(r.length!==1){throw new Error("Expected a single overload, but found "+r.length)}if(e.$IsBound){n=e.$Parameter[0].$isCollection?"Collection("+e.$Parameter[0].$Type+")":e.$Parameter[0].$Type}return t+"("+n+")"}return a.fetchEntityContainer().then(function(r){var u,f=r.$Annotations,l,c=n.namespace(t),d={},p=o===a,h,y;if(i.$Name){l=s()+"/"+i.$Name;y=t+"/"+i.$Name}h=Object.keys(f).filter(function(t){if(n.namespace(t)===c){if(l?t===l||t===y:o.getObject("/"+t)===i){return true}if(p||y&&n.getMetaPath(t)===y){return false}throw new Error("Unexpected annotation target '"+t+"' with namespace of data service in "+e.sServiceUrl)}return false});if(!h.length){throw new Error("No annotation '"+Y.slice(1)+"' in "+e.sServiceUrl)}if(h.length===1){u=f[h[0]]}else{u=Object.assign({},f[y],f[l])}Object.keys(u).forEach(function(t){var n=se(t);if(n!==undefined){d[n]=u[t];["CollectionRoot","SearchSupported"].forEach(function(n){if(n in u[t]){throw new Error("Property '"+n+"' is not allowed in annotation '"+t.slice(1)+"' for target '"+h[0]+"' in "+e.sServiceUrl)}})}else if(!p){throw new Error("Unexpected annotation '"+t.slice(1)+"' for target '"+h[0]+"' with namespace of data service in "+e.sServiceUrl)}});return d})};de.prototype.fetchValueListType=function(e){var n=this.getMetaContext(e),i=this;return this.fetchObject(undefined,n).then(function(r){var o,a;if(!r){throw new Error("No metadata for "+e)}o=i.getObject("@",n);if(o[ne]){return t.Fixed}for(a in o){if(ae(a,ee)!==undefined||ae(a,Z)!==undefined){return t.Standard}if(ae(a,Y)!==undefined){return o[a].SearchSupported===false?t.Fixed:t.Standard}}return t.None})};de.prototype.getAbsoluteServiceUrl=function(e){var t=new R(this.sUrl).absoluteTo(document.baseURI).pathname().toString();return new R(e).absoluteTo(t).filename("").toString()};de.prototype.getAllPathReductions=function(e,t,n,i){var r=t.split("/").length,o,a={},s=e.split("/"),u=this;function f(e,t,o,s){var l,c,d;function p(i){if(!n){f(e,t,l-1,true)}if(s){t=t.slice();e=e.slice()}t.splice(l,i);e.splice(l,i);if(!n){a[e.join("/")]=true}}for(l=o;l>=r;l-=1){c=k.test(e[l+1])?l+2:l+1;if(c<e.length&&t[l].$Partner===e[c]&&!t[c].$isCollection&&t[c].$Partner===e[l].replace(G,"")){p(c-l+1)}else if(Array.isArray(t[l])&&e[l+1]==="$Parameter"){d=u.getObject(u.getMetaPath(e.slice(0,l+1).join("/")+"/@$ui5.overload"));if(d.length===1&&d[0].$Parameter[0].$Name===e[l+2]){p(3)}}else if(i&&t[l].$isCollection){break}}}o=s.map(function(e,t){return t<r||e[0]==="#"||e[0]==="@"||k.test(e)||e==="$Parameter"?{}:u.getObject(u.getMetaPath(s.slice(0,t+1).join("/")))||{}});a[e]=true;if(!(i&&o[s.length-1].$isCollection)){f(s,o,s.length-2)}return n?s.join("/"):Object.keys(a)};de.prototype.getConstraints=function(e,t){var n,i,r,o=Q[e.$Type];function a(e,t){if(t!==undefined){i=i||{};i[e]=t}}if(o){r=o.constraints;for(n in r){a(r[n],n[0]==="@"?this.getObject(t+n):e[n])}if(e.$Nullable===false){a("nullable",false)}}return i};de.prototype.getData=n.createGetMethod("fetchData");de.prototype.getETags=function(){return this.mETags};de.prototype.getLastModified=function(){return this.dLastModified};de.prototype.getMetaContext=function(e){return new p(this,this.getMetaPath(e))};de.prototype.getMetaPath=function(e){return n.getMetaPath(e)};de.prototype.getObject=n.createGetMethod("fetchObject");de.prototype.getOrCreateSharedModel=function(e,t,n){var i,r;e=this.getAbsoluteServiceUrl(e);i=!!n+e;r=H.get(i);if(!r){r=new this.oModel.constructor({autoExpandSelect:n,groupId:t,httpHeaders:this.oModel.getHttpHeaders(),operationMode:m.Server,serviceUrl:e,sharedRequests:true,synchronizationMode:"None"});H.set(i,r)}return r};de.prototype.getOriginalProperty=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#getOriginalProperty")};de.prototype.getProperty=de.prototype.getObject;de.prototype.getReducedPath=function(e,t){return this.getAllPathReductions(e,t,true,true)};de.prototype.getUI5Type=n.createGetMethod("fetchUI5Type",true);de.prototype.getUnitOrCurrencyPath=function(e){var t=this.getObject("@",this.getMetaContext(e)),n=t&&(t["@Org.OData.Measures.V1.Unit"]||t["@Org.OData.Measures.V1.ISOCurrency"]);return n&&n.$Path};de.prototype.getValueListType=n.createGetMethod("fetchValueListType",true);de.prototype.isList=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#isList")};de.prototype.refresh=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#refresh")};de.prototype.requestCodeList=function(e,t,n){var i=this.fetchEntityContainer().getResult(),o=i[i.$EntityContainer],a=this;if(n&&n.context){if(n.context.getModel()!==this||n.context.getPath()!=="/"){throw new Error("Unsupported context: "+n.context)}}if(t!==undefined&&t!==o){throw new Error("Unsupported raw value: "+t)}return this.requestObject("/@com.sap.vocabularies.CodeList.v1."+e).then(function(e){var t,n,i,o,s;if(!e){return null}t=a.getAbsoluteServiceUrl(e.Url)+"#"+e.CollectionPath;o=V.get(t);if(o){return o}i=a.getOrCreateSharedModel(e.Url,"$direct");n=i.getMetaModel();s="/"+e.CollectionPath+"/";o=n.requestObject(s).then(function(t){var o=s+"@Org.OData.Core.V1.AlternateKeys",a=n.getObject(o),u,f=m(t.$Key),l=s+f+"@com.sap.vocabularies.Common.v1.",c,d,p=s+f+"@com.sap.vocabularies.CodeList.v1.StandardCode/$Path",h,y;function g(t,n){var i=n.getProperty(f),o={Text:n.getProperty(y),UnitSpecificScale:n.getProperty(d)};if(h){o.StandardCode=n.getProperty(h)}if(o.UnitSpecificScale===null){r.error("Ignoring customizing w/o unit-specific scale for code "+i+" from "+e.CollectionPath,e.Url,F)}else{t[i]=o}return t}function m(e){var t;if(e&&e.length===1){t=e[0]}else{throw new Error("Single key expected: "+s)}return typeof t==="string"?t:t[Object.keys(t)[0]]}if(a){if(a.length!==1){throw new Error("Single alternative expected: "+o)}else if(a[0].Key.length!==1){throw new Error("Single key expected: "+o+"/0/Key")}f=a[0].Key[0].Name.$PropertyPath}d=n.getObject(l+"UnitSpecificScale/$Path");y=n.getObject(l+"Text/$Path");c=[f,d,y];h=n.getObject(p);if(h){c.push(h)}u=i.bindList("/"+e.CollectionPath,null,null,null,{$select:c});return u.requestContexts(0,Infinity).then(function(t){if(!t.length){r.error("Customizing empty for ",i.sServiceUrl+e.CollectionPath,F)}return t.reduce(g,{})}).finally(function(){u.destroy()})});V.set(t,o);return o})};de.prototype.requestCurrencyCodes=function(e,t){return this.requestCodeList("CurrencyCodes",e,t)};de.prototype.requestData=n.createRequestMethod("fetchData");de.prototype.requestObject=n.createRequestMethod("fetchObject");de.prototype.requestUI5Type=n.createRequestMethod("fetchUI5Type");de.prototype.requestUnitsOfMeasure=function(e,t){return this.requestCodeList("UnitsOfMeasure",e,t)};de.prototype.requestValue4Annotation=function(t,n,i){var r=new D({any:e.value(t,{context:this.createBindingContext(n)}),bindingContexts:i,models:i.getModel()}),o=r.getBinding("any"),a;if(o){if(o.getBindings){a=Promise.all(o.getBindings().map(function(e){return e.requestValue()}))}else{a=o.requestValue()}}else{a=Promise.resolve()}return a.then(function(){return r.getAny()})};de.prototype.requestValueListInfo=function(e,t,i){var r=this.getMetaPath(e),o=r.slice(0,r.lastIndexOf("/")).replace("/$Parameter",""),a=o.slice(o.lastIndexOf("/")+1),s=this;if(!a.includes(".")){a=undefined}return Promise.all([a||this.requestObject(o+"/@sapui.name"),this.requestObject(r),this.requestObject(r+"@"),this.requestObject(r+ne),this.requestObject(o+"/@$ui5.overload")]).then(function(o){var a=o[2],u=o[3],f={},l=o[1],c={};function d(i,r,o,a){if(u!==undefined&&"SearchSupported"in i){throw new Error("Must not set 'SearchSupported' in annotation "+"'com.sap.vocabularies.Common.v1.ValueList' and annotation "+"'com.sap.vocabularies.Common.v1.ValueListWithFixedValues'")}if("CollectionRoot"in i){a=s.getOrCreateSharedModel(i.CollectionRoot,undefined,t);if(c[r]&&c[r].$model===a){f[r]=undefined}}if(f[r]){throw new Error("Annotations '"+Y.slice(1)+"' with identical qualifier '"+r+"' for property "+e+" in "+f[r]+" and "+o)}f[r]=o;i=n.clone(i);i.$model=a;delete i.CollectionRoot;delete i.SearchSupported;c[r]=i}if(!l){throw new Error("No metadata for "+e)}return Promise.all(Object.keys(a).filter(function(e){return ae(e,ee)!==undefined}).map(function(e){var n=a[e];return Promise.all(n.map(function(e){var n=s.getOrCreateSharedModel(e,undefined,t);return s.fetchValueListMappings(n,o[0],l,o[4]).then(function(t){Object.keys(t).forEach(function(i){d(t[i],i,e,n)})})}))})).then(function(){var t;Object.keys(a).filter(function(e){return se(e)!==undefined}).forEach(function(e){d(a[e],se(e),s.sUrl,s.oModel)});t=Object.keys(c);if(!t.length){throw new Error("No annotation '"+ee.slice(1)+"' for "+e)}if(u){if(t.length>1){throw new Error("Annotation '"+ne.slice(1)+"' but multiple '"+Y.slice(1)+"' for property "+e)}return{"":c[t[0]]}}t=a[te];return t&&i&&i.getBinding?s.filterValueListRelevantQualifiers(c,t,r+te,i):c})})};de.prototype.filterValueListRelevantQualifiers=function(e,t,n,i){return this.requestValue4Annotation(t,n,i).then(function(t){var n={};t.forEach(function(t){if(t in e){n[t]=e[t]}});return n})};de.prototype.requestValueListType=n.createRequestMethod("fetchValueListType");de.prototype.resolve=function(e,t){var n,i;if(!e){return t?t.getPath():undefined}i=e[0];if(i==="/"){return e}if(!t){return undefined}if(i==="."){if(e[1]!=="/"){throw new Error("Unsupported relative path: "+e)}e=e.slice(2)}n=t.getPath();return i==="@"||n.endsWith("/")?n+e:n+"/"+e};de.prototype.setLegacySyntax=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#setLegacySyntax")};de.prototype.toString=function(){return F+": "+this.sUrl};de.prototype.validate=function(e,t){var n,i,r,o,a,s;if(!this.bSupportReferences){return t}for(s in t.$Reference){a=t.$Reference[s];s=new R(s).absoluteTo(this.sUrl).toString();if("$IncludeAnnotations"in a){le(this,"Unsupported IncludeAnnotations",e)}for(n in a.$Include){o=a.$Include[n];if(o in t){le(this,"A schema cannot span more than one document: "+o+" - is both included and defined",e)}re(this,o,s,e)}}r=t.$LastModified?new Date(t.$LastModified):null;this.mETags[e]=t.$ETag?t.$ETag:r;i=t.$Date?new Date(t.$Date):new Date;r=r||i;if(this.dLastModified<r){this.dLastModified=r}delete t.$Date;delete t.$ETag;delete t.$LastModified;return t};return de});