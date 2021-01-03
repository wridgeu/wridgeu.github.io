/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Element","sap/ui/core/Control","sap/ui/core/Core"],function(e,t,o){"use strict";e.sap.require("sap.ui.qunit.qunit-css");e.sap.require("sap.ui.thirdparty.qunit");e.sap.require("sap.ui.qunit.qunit-junit");e.sap.require("sap.ui.qunit.qunit-coverage");QUnit.config.reorder=false;var n={};function r(){return t.registry.all()}var a=function(e){var t=e.getMetadata().getAllProperties();for(var o in t){if(e.isPropertyInitial(o)){var n=t[o];try{e[n._sMutator]("dummyValueForMemLeakTest")}catch(e){}}}if(!e.getTooltip()){e.setTooltip("test")}};var i=function(e,t,n,i){QUnit.test("Control "+e+" should not have any memory leaks",function(e){var s=t();e.ok(s,"calling fnControlFactory() should return something (a control)");e.ok(s instanceof o,"calling fnControlFactory() should return something that is really instanceof sap.ui.core.Control");if(s.placeAt&&!i){try{s.getMetadata().getRenderer()}catch(t){e.ok(false,"Error: control does not have a renderer. If this is known, please set the 'bControlCannotRender' flag when calling MemoryLeakCheck.checkControl")}}a(s);if(s.placeAt&&!i){try{s.placeAt("qunit-fixture");sap.ui.getCore().applyChanges()}catch(t){e.ok(false,"Error: control has a renderer, but could not be rendered. If this is known, please set the 'bControlCannotRender' flag when calling MemoryLeakCheck.checkControl");throw t}}if(n){n(s);sap.ui.getCore().applyChanges()}s.destroy();sap.ui.getCore().applyChanges();var c=r(),u=t();a(u);if(u.placeAt&&!i){u.placeAt("qunit-fixture");sap.ui.getCore().applyChanges();u.rerender();sap.ui.getCore().applyChanges()}if(n){n(u);sap.ui.getCore().applyChanges()}u.destroy();sap.ui.getCore().applyChanges();var f=r();l(e,f,c,"Memory leak check should not find any leftover controls after creating two instances and rendering twice"+(n?"\n(and calling fnSomeAdditionalFunction)":""))})};var l=function(e,t,o,n){var r=[];for(var a in t){if(!o[a]){r.push(t[a])}}for(var i=0;i<r.length;i++){if(typeof r[i].getText==="function"){r[i]+=" (text: '"+r[i].getText()+"')"}}n=n+(r.length>0?". LEFTOVERS: "+r.join(", "):"");e.equal(r.length,0,n)};n.checkControl=function(e,o,n,a){if(typeof e!=="string"){a=n;n=o;o=e;e="[some control, id: "+Math.random()+" - please update your test to also pass the control name]"}if(n===true||n===false){a=n;n=undefined}var l;QUnit.module("MemoryLeakCheck.checkControl: "+e,{beforeEach:function(){l=r()},afterEach:function(e){t.registry.forEach(function(t,o){if(!l[o]){e.ok(t.getMetadata().getName(),"Cleanup of id: "+o+", control: "+t.getMetadata().getName());t.destroy()}})}});QUnit.test("MemoryLeakCheck.checkControl(fnControlFactory) should receive a control factory",function(e){e.equal(typeof o,"function","MemoryLeakCheck should have received a control factory");e.ok(document.getElementById("qunit-fixture"),"the test page HTML should contain an element with ID 'qunit-fixture'")});i(e,o,n,a)};return n},true);