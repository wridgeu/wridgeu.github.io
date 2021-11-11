ace.define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";var n=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var a=t.reservedKeywords="!|{|}|case|do|done|elif|else|"+"esac|fi|for|if|in|then|until|while|"+"&|;|export|local|read|typeset|unset|"+"elif|select|set|function|declare|readonly";var o=t.languageConstructs="[|]|alias|bg|bind|break|builtin|"+"cd|command|compgen|complete|continue|"+"dirs|disown|echo|enable|eval|exec|"+"exit|fc|fg|getopts|hash|help|history|"+"jobs|kill|let|logout|popd|printf|pushd|"+"pwd|return|set|shift|shopt|source|"+"suspend|test|times|trap|type|ulimit|"+"umask|unalias|wait";var s=function(){var e=this.createKeywordMapper({keyword:a,"support.function.builtin":o,"invalid.deprecated":"debugger"},"identifier");var t="(?:(?:[1-9]\\d*)|(?:0))";var r="(?:\\.\\d+)";var n="(?:\\d+)";var i="(?:(?:"+n+"?"+r+")|(?:"+n+"\\.))";var s="(?:(?:"+i+"|"+n+")"+")";var l="(?:"+s+"|"+i+")";var g="(?:&"+n+")";var h="[a-zA-Z_][a-zA-Z0-9_]*";var c="(?:"+h+"(?==))";var u="(?:\\$(?:SHLVL|\\$|\\!|\\?))";var d="(?:"+h+"\\s*\\(\\))";this.$rules={start:[{token:"constant",regex:/\\./},{token:["text","comment"],regex:/(^|\s)(#.*)$/},{token:"string.start",regex:'"',push:[{token:"constant.language.escape",regex:/\\(?:[$`"\\]|$)/},{include:"variables"},{token:"keyword.operator",regex:/`/},{token:"string.end",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"string",regex:"\\$'",push:[{token:"constant.language.escape",regex:/\\(?:[abeEfnrtv\\'"]|x[a-fA-F\d]{1,2}|u[a-fA-F\d]{4}([a-fA-F\d]{4})?|c.|\d{1,3})/},{token:"string",regex:"'",next:"pop"},{defaultToken:"string"}]},{regex:"<<<",token:"keyword.operator"},{stateName:"heredoc",regex:"(<<-?)(\\s*)(['\"`]?)([\\w\\-]+)(['\"`]?)",onMatch:function(e,t,r){var n=e[2]=="-"?"indentedHeredoc":"heredoc";var i=e.split(this.splitRegex);r.push(n,i[4]);return[{type:"constant",value:i[1]},{type:"text",value:i[2]},{type:"string",value:i[3]},{type:"support.class",value:i[4]},{type:"string",value:i[5]}]},rules:{heredoc:[{onMatch:function(e,t,r){if(e===r[1]){r.shift();r.shift();this.next=r[0]||"start";return"support.class"}this.next="";return"string"},regex:".*$",next:"start"}],indentedHeredoc:[{token:"string",regex:"^\t+"},{onMatch:function(e,t,r){if(e===r[1]){r.shift();r.shift();this.next=r[0]||"start";return"support.class"}this.next="";return"string"},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(e,t){if(t[0]==="heredoc"||t[0]==="indentedHeredoc")return t[0];return e}},{token:["keyword","text","text","text","variable"],regex:/(declare|local|readonly)(\s+)(?:(-[fixar]+)(\s+))?([a-zA-Z_][a-zA-Z0-9_]*\b)/},{token:"variable.language",regex:u},{token:"variable",regex:c},{include:"variables"},{token:"support.function",regex:d},{token:"support.function",regex:g},{token:"string",start:"'",end:"'"},{token:"constant.numeric",regex:l},{token:"constant.numeric",regex:t+"\\b"},{token:e,regex:"[a-zA-Z_][a-zA-Z0-9_]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!=|[%&|`]"},{token:"punctuation.operator",regex:";"},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]]"},{token:"paren.rparen",regex:"[\\)\\}]",next:"pop"}],variables:[{token:"variable",regex:/(\$)(\w+)/},{token:["variable","paren.lparen"],regex:/(\$)(\()/,push:"start"},{token:["variable","paren.lparen","keyword.operator","variable","keyword.operator"],regex:/(\$)(\{)([#!]?)(\w+|[*@#?\-$!0_])(:[?+\-=]?|##?|%%?|,,?\/|\^\^?)?/,push:"start"},{token:"variable",regex:/\$[*@#?\-$!0_]/},{token:["variable","paren.lparen"],regex:/(\$)(\{)/,push:"start"}]};this.normalizeRules()};n.inherits(s,i);t.ShHighlightRules=s});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,r){"use strict";var n=e("../../lib/oop");var i=e("../../range").Range;var a=e("./fold_mode").FoldMode;var o=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};n.inherits(o,a);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,r){var n=e.getLine(r);if(this.singleLineBlockCommentRe.test(n)){if(!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return""}var i=this._getFoldWidgetBase(e,t,r);if(!i&&this.startRegionRe.test(n))return"start";return i};this.getFoldWidgetRange=function(e,t,r,n){var i=e.getLine(r);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,r);var a=i.match(this.foldingStartMarker);if(a){var o=a.index;if(a[1])return this.openingBracketBlock(e,a[1],r,o);var s=e.getCommentFoldRange(r,o+a[0].length,1);if(s&&!s.isMultiLine()){if(n){s=this.getSectionRange(e,r)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var a=i.match(this.foldingStopMarker);if(a){var o=a.index+a[0].length;if(a[1])return this.closingBracketBlock(e,a[1],r,o);return e.getCommentFoldRange(r,o,-1)}};this.getSectionRange=function(e,t){var r=e.getLine(t);var n=r.search(/\S/);var a=t;var o=r.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){r=e.getLine(t);var g=r.search(/\S/);if(g===-1)continue;if(n>g)break;var h=this.getFoldWidgetRange(e,"all",t);if(h){if(h.start.row<=a){break}else if(h.isMultiLine()){t=h.end.row}else if(n==g){break}}s=t}return new i(a,o,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,r){var n=t.search(/\s*$/);var a=e.getLength();var o=r;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++r<a){t=e.getLine(r);var g=s.exec(t);if(!g)continue;if(g[1])l--;else l++;if(!l)break}var h=r;if(h>o){return new i(o,n,h,t.length)}}}).call(o.prototype)});ace.define("ace/mode/sh",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sh_highlight_rules","ace/range","ace/mode/folding/cstyle","ace/mode/behaviour/cstyle"],function(e,t,r){"use strict";var n=e("../lib/oop");var i=e("./text").Mode;var a=e("./sh_highlight_rules").ShHighlightRules;var o=e("../range").Range;var s=e("./folding/cstyle").FoldMode;var l=e("./behaviour/cstyle").CstyleBehaviour;var g=function(){this.HighlightRules=a;this.foldingRules=new s;this.$behaviour=new l};n.inherits(g,i);(function(){this.lineCommentStart="#";this.getNextLineIndent=function(e,t,r){var n=this.$getIndent(t);var i=this.getTokenizer().getLineTokens(t,e);var a=i.tokens;if(a.length&&a[a.length-1].type=="comment"){return n}if(e=="start"){var o=t.match(/^.*[\{\(\[:]\s*$/);if(o){n+=r}}return n};var e={pass:1,return:1,raise:1,break:1,continue:1};this.checkOutdent=function(t,r,n){if(n!=="\r\n"&&n!=="\r"&&n!=="\n")return false;var i=this.getTokenizer().getLineTokens(r.trim(),t).tokens;if(!i)return false;do{var a=i.pop()}while(a&&(a.type=="comment"||a.type=="text"&&a.value.match(/^\s+$/)));if(!a)return false;return a.type=="keyword"&&e[a.value]};this.autoOutdent=function(e,t,r){r+=1;var n=this.$getIndent(t.getLine(r));var i=t.getTabString();if(n.slice(-i.length)==i)t.remove(new o(r,n.length-i.length,r,n.length))};this.$id="ace/mode/sh";this.snippetFileId="ace/snippets/sh"}).call(g.prototype);t.Mode=g});(function(){ace.require(["ace/mode/sh"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();