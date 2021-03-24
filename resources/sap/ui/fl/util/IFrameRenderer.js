/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function t(t,e,i){if(i!==""||i.toLowerCase()==="auto"){t.style(e,i)}}var e={apiVersion:2};e.render=function(e,i){e.openStart("iframe",i);t(e,"width",i.getWidth());t(e,"height",i.getHeight());e.style("display","block");e.style("border","none");e.attr("src",i.getUrl());var r=i.getTitle();if(r){e.attr("title",r)}e.openEnd();e.close("iframe")};return e},true);