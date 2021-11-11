ace.define("ace/mode/terraform_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";var n=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var i=function(){this.$rules={start:[{token:["storage.function.terraform"],regex:"\\b(output|resource|data|variable|module|export)\\b"},{token:"variable.terraform",regex:"\\$\\s",push:[{token:"keyword.terraform",regex:"(-var-file|-var)"},{token:"variable.terraform",regex:"\\n|$",next:"pop"},{include:"strings"},{include:"variables"},{include:"operators"},{defaultToken:"text"}]},{token:"language.support.class",regex:"\\b(timeouts|provider|connection|provisioner|lifecycleprovider|atlas)\\b"},{token:"singleline.comment.terraform",regex:"#.*$"},{token:"singleline.comment.terraform",regex:"//.*$"},{token:"multiline.comment.begin.terraform",regex:/\/\*/,push:"blockComment"},{token:"storage.function.terraform",regex:"^\\s*(locals|terraform)\\s*{"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{include:"constants"},{include:"strings"},{include:"operators"},{include:"variables"}],blockComment:[{regex:/\*\//,token:"multiline.comment.end.terraform",next:"pop"},{defaultToken:"comment"}],constants:[{token:"constant.language.terraform",regex:"\\b(true|false|yes|no|on|off|EOF)\\b"},{token:"constant.numeric.terraform",regex:"(\\b([0-9]+)([kKmMgG]b?)?\\b)|(\\b(0x[0-9A-Fa-f]+)([kKmMgG]b?)?\\b)"}],variables:[{token:["variable.assignment.terraform","keyword.operator"],regex:"\\b([a-zA-Z_]+)(\\s*=)"}],interpolated_variables:[{token:"variable.terraform",regex:"\\b(var|self|count|path|local)\\b(?:\\.*[a-zA-Z_-]*)?"}],strings:[{token:"punctuation.quote.terraform",regex:"'",push:[{token:"punctuation.quote.terraform",regex:"'",next:"pop"},{include:"escaped_chars"},{defaultToken:"string"}]},{token:"punctuation.quote.terraform",regex:'"',push:[{token:"punctuation.quote.terraform",regex:'"',next:"pop"},{include:"interpolation"},{include:"escaped_chars"},{defaultToken:"string"}]}],escaped_chars:[{token:"constant.escaped_char.terraform",regex:"\\\\."}],operators:[{token:"keyword.operator",regex:"\\?|:|==|!=|>|<|>=|<=|&&|\\|\\||!|%|&|\\*|\\+|\\-|/|="}],interpolation:[{token:"punctuation.interpolated.begin.terraform",regex:"\\$?\\$\\{",push:[{token:"punctuation.interpolated.end.terraform",regex:"\\}",next:"pop"},{include:"interpolated_variables"},{include:"operators"},{include:"constants"},{include:"strings"},{include:"functions"},{include:"parenthesis"},{defaultToken:"punctuation"}]}],functions:[{token:"keyword.function.terraform",regex:"\\b(abs|basename|base64decode|base64encode|base64gzip|base64sha256|base64sha512|bcrypt|ceil|chomp|chunklist|cidrhost|cidrnetmask|cidrsubnet|coalesce|coalescelist|compact|concat|contains|dirname|distinct|element|file|floor|flatten|format|formatlist|indent|index|join|jsonencode|keys|length|list|log|lookup|lower|map|matchkeys|max|merge|min|md5|pathexpand|pow|replace|rsadecrypt|sha1|sha256|sha512|signum|slice|sort|split|substr|timestamp|timeadd|title|transpose|trimspace|upper|urlencode|uuid|values|zipmap)\\b"}],parenthesis:[{token:"paren.lparen",regex:"\\["},{token:"paren.rparen",regex:"\\]"}]};this.normalizeRules()};n.inherits(i,o);t.TerraformHighlightRules=i});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,r){"use strict";var n=e("../../lib/oop");var o=e("../../range").Range;var i=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};n.inherits(a,i);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,r){var n=e.getLine(r);if(this.singleLineBlockCommentRe.test(n)){if(!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return""}var o=this._getFoldWidgetBase(e,t,r);if(!o&&this.startRegionRe.test(n))return"start";return o};this.getFoldWidgetRange=function(e,t,r,n){var o=e.getLine(r);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,r);var i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],r,a);var s=e.getCommentFoldRange(r,a+i[0].length,1);if(s&&!s.isMultiLine()){if(n){s=this.getSectionRange(e,r)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;if(i[1])return this.closingBracketBlock(e,i[1],r,a);return e.getCommentFoldRange(r,a,-1)}};this.getSectionRange=function(e,t){var r=e.getLine(t);var n=r.search(/\S/);var i=t;var a=r.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){r=e.getLine(t);var c=r.search(/\S/);if(c===-1)continue;if(n>c)break;var u=this.getFoldWidgetRange(e,"all",t);if(u){if(u.start.row<=i){break}else if(u.isMultiLine()){t=u.end.row}else if(n==c){break}}s=t}return new o(i,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,r){var n=t.search(/\s*$/);var i=e.getLength();var a=r;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++r<i){t=e.getLine(r);var c=s.exec(t);if(!c)continue;if(c[1])l--;else l++;if(!l)break}var u=r;if(u>a){return new o(a,n,u,t.length)}}}).call(a.prototype)});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,r){"use strict";var n=e("../range").Range;var o=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var r=e.getLine(t);var o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length;var a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype);t.MatchingBraceOutdent=o});ace.define("ace/mode/terraform",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/terraform_highlight_rules","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/mode/matching_brace_outdent"],function(e,t,r){"use strict";var n=e("../lib/oop");var o=e("./text").Mode;var i=e("./terraform_highlight_rules").TerraformHighlightRules;var a=e("./behaviour/cstyle").CstyleBehaviour;var s=e("./folding/cstyle").FoldMode;var l=e("./matching_brace_outdent").MatchingBraceOutdent;var c=function(){o.call(this);this.HighlightRules=i;this.$outdent=new l;this.$behaviour=new a;this.foldingRules=new s};n.inherits(c,o);(function(){this.lineCommentStart=["#","//"];this.blockComment={start:"/*",end:"*/"};this.$id="ace/mode/terraform"}).call(c.prototype);t.Mode=c});(function(){ace.require(["ace/mode/terraform"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();