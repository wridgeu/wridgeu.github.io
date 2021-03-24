/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/resource/ResourceModel","sap/ui/model/json/JSONModel","sap/ui/testrecorder/Dialects"],function(e,t,r){"use strict";var s=new e({bundleName:"sap.ui.core.messagebundle"});var a=new t({iFrameTitle:s.getProperty("TestRecorder.TitleBar.Title"),dialects:[{key:r.RAW,label:s.getProperty("TestRecorder.Inspect.Snippet.Dialect.Raw")},{key:r.OPA5,label:s.getProperty("TestRecorder.Inspect.Snippet.Dialect.OPA5")},{key:r.UIVERI5,label:s.getProperty("TestRecorder.Inspect.Snippet.Dialect.UIVeri5")}],selectedDialect:r.UIVERI5,settings:{preferViewId:false,formatAsPOMethod:true,multipleSnippets:false},elementTree:{search:"",filter:false,attributes:false,namespaces:true}});return a});