ace.define("ace/mode/folding/coffee",[],function(e,t,i){"use strict";var r=e("../../lib/oop");var o=e("./fold_mode").FoldMode;var n=e("../../range").Range;var a=t.FoldMode=function(){};r.inherits(a,o);(function(){this.getFoldWidgetRange=function(e,t,i){var r=this.indentationBlock(e,i);if(r)return r;var o=/\S/;var a=e.getLine(i);var s=a.search(o);if(s==-1||a[s]!="#")return;var l=a.length;var g=e.getLength();var d=i;var f=i;while(++i<g){a=e.getLine(i);var c=a.search(o);if(c==-1)continue;if(a[c]!="#")break;f=i}if(f>d){var u=e.getLine(f).length;return new n(d,l,f,u)}};this.getFoldWidget=function(e,t,i){var r=e.getLine(i);var o=r.search(/\S/);var n=e.getLine(i+1);var a=e.getLine(i-1);var s=a.search(/\S/);var l=n.search(/\S/);if(o==-1){e.foldWidgets[i-1]=s!=-1&&s<l?"start":"";return""}if(s==-1){if(o==l&&r[o]=="#"&&n[o]=="#"){e.foldWidgets[i-1]="";e.foldWidgets[i+1]="";return"start"}}else if(s==o&&r[o]=="#"&&a[o]=="#"){if(e.getLine(i-2).search(/\S/)==-1){e.foldWidgets[i-1]="start";e.foldWidgets[i+1]="";return""}}if(s!=-1&&s<o)e.foldWidgets[i-1]="start";else e.foldWidgets[i-1]="";if(o<l)return"start";else return""}}).call(a.prototype)});ace.define("ace/mode/space_highlight_rules",[],function(e,t,i){"use strict";var r=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var n=function(){this.$rules={start:[{token:"empty_line",regex:/ */,next:"key"},{token:"empty_line",regex:/$/,next:"key"}],key:[{token:"variable",regex:/\S+/},{token:"empty_line",regex:/$/,next:"start"},{token:"keyword.operator",regex:/ /,next:"value"}],value:[{token:"keyword.operator",regex:/$/,next:"start"},{token:"string",regex:/[^$]/}]}};r.inherits(n,o);t.SpaceHighlightRules=n});ace.define("ace/mode/space",[],function(e,t,i){"use strict";var r=e("../lib/oop");var o=e("./text").Mode;var n=e("./folding/coffee").FoldMode;var a=e("./space_highlight_rules").SpaceHighlightRules;var s=function(){this.HighlightRules=a;this.foldingRules=new n;this.$behaviour=this.$defaultBehaviour};r.inherits(s,o);(function(){this.$id="ace/mode/space"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/space"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();