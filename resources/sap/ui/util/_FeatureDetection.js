/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/**
 * This module is overall:
 * SPDX-FileCopyrightText: 2009-2020 SAP SE or an SAP affiliate company and OpenUI5 contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * but contains code which is inspired by jQuery.rtl-scroll-type, which is:
 * SPDX-FileCopyrightText: 2012 Wei-Ko Kao
 * SPDX-License-Identifier: MIT
 */
sap.ui.define([],function(){"use strict";var i={};function e(){var e=document.createElement("div");e.innerHTML='<div dir="rtl" style="width: 1px; height: 1px; position: fixed; top: 0px; left: 0px; overflow: hidden"><div style="width: 2px"><span style="display: inline-block; width: 1px"></span><span style="display: inline-block; width: 1px"></span></div></div>';document.documentElement.appendChild(e);var t=e.firstChild;i.initialZero=t.scrollLeft==0;t.scrollLeft=-1;i.canNegative=t.scrollLeft<0;document.documentElement.removeChild(e)}e();var t={canScrollToNegative:function(){return i.canNegative},initialScrollPositionIsZero:function(){return i.initialZero}};return t});