ace.define("ace/ext/whitespace",[],function(e,t,n){"use strict";var r=e("../lib/lang");t.$detectIndentation=function(e,t){var n=[];var r=[];var i=0;var a=0;var o=Math.min(e.length,1e3);for(var s=0;s<o;s++){var c=e[s];if(!/^\s*[^*+\-\s]/.test(c))continue;if(c[0]=="\t"){i++;a=-Number.MAX_VALUE}else{var f=c.match(/^ */)[0].length;if(f&&c[f]!="\t"){var v=f-a;if(v>0&&!(a%v)&&!(f%v))r[v]=(r[v]||0)+1;n[f]=(n[f]||0)+1}a=f}while(s<o&&c[c.length-1]=="\\")c=e[s++]}function g(e){var t=0;for(var r=e;r<n.length;r+=e)t+=n[r]||0;return t}var u=r.reduce(function(e,t){return e+t},0);var l={score:0,length:0};var h=0;for(var s=1;s<12;s++){var d=g(s);if(s==1){h=d;d=n[1]?.9:.8;if(!n.length)d=0}else d/=h;if(r[s])d+=r[s]/u;if(d>l.score)l={score:d,length:s}}if(l.score&&l.score>1.4)var p=l.length;if(i>h+1){if(p==1||h<i/4||l.score<1.8)p=undefined;return{ch:"\t",length:p}}if(h>i+1)return{ch:" ",length:p}};t.detectIndentation=function(e){var n=e.getLines(0,1e3);var r=t.$detectIndentation(n)||{};if(r.ch)e.setUseSoftTabs(r.ch==" ");if(r.length)e.setTabSize(r.length);return r};t.trimTrailingSpace=function(e,t){var n=e.getDocument();var r=n.getAllLines();var i=t&&t.trimEmpty?-1:0;var a=[],o=-1;if(t&&t.keepCursorPosition){if(e.selection.rangeCount){e.selection.rangeList.ranges.forEach(function(e,t,n){var r=n[t+1];if(r&&r.cursor.row==e.cursor.row)return;a.push(e.cursor)})}else{a.push(e.selection.getCursor())}o=0}var s=a[o]&&a[o].row;for(var c=0,f=r.length;c<f;c++){var v=r[c];var g=v.search(/\s+$/);if(c==s){if(g<a[o].column&&g>i)g=a[o].column;o++;s=a[o]?a[o].row:-1}if(g>i)n.removeInLine(c,g,v.length)}};t.convertIndentation=function(e,t,n){var i=e.getTabString()[0];var a=e.getTabSize();if(!n)n=a;if(!t)t=i;var o=t=="\t"?t:r.stringRepeat(t,n);var s=e.doc;var c=s.getAllLines();var f={};var v={};for(var g=0,u=c.length;g<u;g++){var l=c[g];var h=l.match(/^\s*/)[0];if(h){var d=e.$getStringScreenWidth(h)[0];var p=Math.floor(d/a);var m=d%a;var S=f[p]||(f[p]=r.stringRepeat(o,p));S+=v[m]||(v[m]=r.stringRepeat(" ",m));if(S!=h){s.removeInLine(g,0,h.length);s.insertInLine({row:g,column:0},S)}}}e.setTabSize(n);e.setUseSoftTabs(t==" ")};t.$parseStringArg=function(e){var t={};if(/t/.test(e))t.ch="\t";else if(/s/.test(e))t.ch=" ";var n=e.match(/\d+/);if(n)t.length=parseInt(n[0],10);return t};t.$parseArg=function(e){if(!e)return{};if(typeof e=="string")return t.$parseStringArg(e);if(typeof e.text=="string")return t.$parseStringArg(e.text);return e};t.commands=[{name:"detectIndentation",description:"Detect indentation from content",exec:function(e){t.detectIndentation(e.session)}},{name:"trimTrailingSpace",description:"Trim trailing whitespace",exec:function(e,n){t.trimTrailingSpace(e.session,n)}},{name:"convertIndentation",description:"Convert indentation to ...",exec:function(e,n){var r=t.$parseArg(n);t.convertIndentation(e.session,r.ch,r.length)}},{name:"setIndentation",description:"Set indentation",exec:function(e,n){var r=t.$parseArg(n);r.length&&e.session.setTabSize(r.length);r.ch&&e.session.setUseSoftTabs(r.ch==" ")}}]});(function(){ace.require(["ace/ext/whitespace"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();