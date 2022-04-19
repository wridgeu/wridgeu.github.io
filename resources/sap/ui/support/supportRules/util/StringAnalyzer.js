/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r={calculateLevenshteinDistance:function(r,a){var n=r.length;var e=a.length;if(n===0){return e}if(e===0){return n}var t=new Array(e+1);var v;for(v=0;v<=e;v++){t[v]=new Array(n+1);t[v][0]=v}var i;for(i=0;i<=n;i++){t[0][i]=i}var f=0;var u;var c;for(u=1;u<=e;u++){for(c=1;c<=n;c++){var o=t[u-1][c]+1;var s=t[u][c-1]+1;var h=t[u-1][c-1];if(r[c]!==a[u]){h+=1}f=Math.min(o,s,h);t[u][c]=f}}return f}};return r});