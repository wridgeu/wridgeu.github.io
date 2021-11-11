/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r={calculateLevenshteinDistance:function(r,a){var e=r.length;var n=a.length;if(e===0){return n}if(n===0){return e}var t=new Array(n+1);var v;for(v=0;v<=n;v++){t[v]=new Array(e+1);t[v][0]=v}var f;for(f=0;f<=e;f++){t[0][f]=f}var i=0;var u;var c;for(u=1;u<=n;u++){for(c=1;c<=e;c++){var o=t[u-1][c]+1;var s=t[u][c-1]+1;var l=t[u-1][c-1];if(r[c]!==a[u]){l+=1}i=Math.min(o,s,l);t[u][c]=i}}return i}};return r},false);