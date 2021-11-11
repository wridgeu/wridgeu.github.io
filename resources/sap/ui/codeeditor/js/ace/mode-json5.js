ace.define("ace/mode/json_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var i=e("../lib/oop");var r=e("./text_highlight_rules").TextHighlightRules;var o=function(){this.$rules={start:[{token:"variable",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'},{token:"string",regex:'"',next:"string"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"text",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"comment",regex:"\\/\\/.*$"},{token:"comment.start",regex:"\\/\\*",next:"comment"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],string:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],comment:[{token:"comment.end",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]}};i.inherits(o,r);t.JsonHighlightRules=o});ace.define("ace/mode/json5_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/json_highlight_rules"],function(e,t,n){"use strict";var i=e("../lib/oop");var r=e("./json_highlight_rules").JsonHighlightRules;var o=function(){r.call(this);var e=[{token:"variable",regex:/[a-zA-Z$_\u00a1-\uffff][\w$\u00a1-\uffff]*\s*(?=:)/},{token:"variable",regex:/['](?:(?:\\.)|(?:[^'\\]))*?[']\s*(?=:)/},{token:"constant.language.boolean",regex:/(?:null)\b/},{token:"string",regex:/'/,next:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,consumeLineEnd:true},{token:"string",regex:/'|$/,next:"start"},{defaultToken:"string"}]},{token:"string",regex:/"(?![^"]*":)/,next:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,consumeLineEnd:true},{token:"string",regex:/"|$/,next:"start"},{defaultToken:"string"}]},{token:"constant.numeric",regex:/[+-]?(?:Infinity|NaN)\b/}];for(var t in this.$rules)this.$rules[t].unshift.apply(this.$rules[t],e);this.normalizeRules()};i.inherits(o,r);t.Json5HighlightRules=o});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var i=e("../range").Range;var r=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var r=n.match(/^(\s*\})/);if(!r)return 0;var o=r[1].length;var a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new i(t,0,t,o-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype);t.MatchingBraceOutdent=r});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var i=e("../../lib/oop");var r=e("../../range").Range;var o=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};i.inherits(a,o);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var i=e.getLine(n);if(this.singleLineBlockCommentRe.test(i)){if(!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return""}var r=this._getFoldWidgetBase(e,t,n);if(!r&&this.startRegionRe.test(i))return"start";return r};this.getFoldWidgetRange=function(e,t,n,i){var r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);var o=r.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,a);var s=e.getCommentFoldRange(n,a+o[0].length,1);if(s&&!s.isMultiLine()){if(i){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var o=r.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;if(o[1])return this.closingBracketBlock(e,o[1],n,a);return e.getCommentFoldRange(n,a,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var i=n.search(/\S/);var o=t;var a=n.length;t=t+1;var s=t;var g=e.getLength();while(++t<g){n=e.getLine(t);var l=n.search(/\S/);if(l===-1)continue;if(i>l)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=o){break}else if(c.isMultiLine()){t=c.end.row}else if(i==l){break}}s=t}return new r(o,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var i=t.search(/\s*$/);var o=e.getLength();var a=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var g=1;while(++n<o){t=e.getLine(n);var l=s.exec(t);if(!l)continue;if(l[1])g--;else g++;if(!g)break}var c=n;if(c>a){return new r(a,i,c,t.length)}}}).call(a.prototype)});ace.define("ace/mode/json5",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/json5_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var i=e("../lib/oop");var r=e("./text").Mode;var o=e("./json5_highlight_rules").Json5HighlightRules;var a=e("./matching_brace_outdent").MatchingBraceOutdent;var s=e("./behaviour/cstyle").CstyleBehaviour;var g=e("./folding/cstyle").FoldMode;var l=function(){this.HighlightRules=o;this.$outdent=new a;this.$behaviour=new s;this.foldingRules=new g};i.inherits(l,r);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)};this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)};this.$id="ace/mode/json5"}).call(l.prototype);t.Mode=l});(function(){ace.require(["ace/mode/json5"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();