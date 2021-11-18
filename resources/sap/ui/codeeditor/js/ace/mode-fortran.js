ace.define("ace/mode/fortran_highlight_rules",[],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var a=function(){var e="call|case|contains|continue|cycle|do|else|elseif|end|enddo|endif|function|"+"if|implicit|in|include|inout|intent|module|none|only|out|print|program|return|"+"select|status|stop|subroutine|"+"return|then|use|while|write|"+"CALL|CASE|CONTAINS|CONTINUE|CYCLE|DO|ELSE|ELSEIF|END|ENDDO|ENDIF|FUNCTION|"+"IF|IMPLICIT|IN|INCLUDE|INOUT|INTENT|MODULE|NONE|ONLY|OUT|PRINT|PROGRAM|RETURN|"+"SELECT|STATUS|STOP|SUBROUTINE|"+"RETURN|THEN|USE|WHILE|WRITE";var t="and|or|not|eq|ne|gt|ge|lt|le|"+"AND|OR|NOT|EQ|NE|GT|GE|LT|LE";var n="true|false|TRUE|FALSE";var r="abs|achar|acos|acosh|adjustl|adjustr|aimag|aint|all|allocate|"+"anint|any|asin|asinh|associated|atan|atan2|atanh|"+"bessel_j0|bessel_j1|bessel_jn|bessel_y0|bessel_y1|bessel_yn|"+"bge|bgt|bit_size|ble|blt|btest|ceiling|char|cmplx|conjg|cos|cosh|"+"count|cpu_time|cshift|date_and_time|dble|deallocate|digits|dim|dot_product|dprod|"+"dshiftl|dshiftr|dsqrt|eoshift|epsilon|erf|erfc|erfc_scaled|exp|float|floor|"+"format|fraction|gamma|input|len|lge|lgt|lle|llt|log|log10|maskl|maskr|matmul|max|maxloc|maxval|"+"merge|min|minloc|minval|mod|modulo|nint|not|norm2|null|nullify|pack|parity|popcnt|poppar|"+"precision|present|product|radix|random_number|random_seed|range|repeat|reshape|round|"+"rrspacing|same_type_as|scale|scan|selected_char_kind|selected_int_kind|selected_real_kind|"+"set_exponent|shape|shifta|shiftl|shiftr|sign|sin|sinh|size|sngl|spacing|spread|"+"sqrt|sum|system_clock|tan|tanh|tiny|trailz|transfer|transpose|trim|ubound|unpack|verify|"+"ABS|ACHAR|ACOS|ACOSH|ADJUSTL|ADJUSTR|AIMAG|AINT|ALL|ALLOCATE|"+"ANINT|ANY|ASIN|ASINH|ASSOCIATED|ATAN|ATAN2|ATANH|"+"BESSEL_J0|BESSEL_J1|BESSEL_JN|BESSEL_Y0|BESSEL_Y1|BESSEL_YN|"+"BGE|BGT|BIT_SIZE|BLE|BLT|BTEST|CEILING|CHAR|CMPLX|CONJG|COS|COSH|"+"COUNT|CPU_TIME|CSHIFT|DATE_AND_TIME|DBLE|DEALLOCATE|DIGITS|DIM|DOT_PRODUCT|DPROD|"+"DSHIFTL|DSHIFTR|DSQRT|EOSHIFT|EPSILON|ERF|ERFC|ERFC_SCALED|EXP|FLOAT|FLOOR|"+"FORMAT|FRACTION|GAMMA|INPUT|LEN|LGE|LGT|LLE|LLT|LOG|LOG10|MASKL|MASKR|MATMUL|MAX|MAXLOC|MAXVAL|"+"MERGE|MIN|MINLOC|MINVAL|MOD|MODULO|NINT|NOT|NORM2|NULL|NULLIFY|PACK|PARITY|POPCNT|POPPAR|"+"PRECISION|PRESENT|PRODUCT|RADIX|RANDOM_NUMBER|RANDOM_SEED|RANGE|REPEAT|RESHAPE|ROUND|"+"RRSPACING|SAME_TYPE_AS|SCALE|SCAN|SELECTED_CHAR_KIND|SELECTED_INT_KIND|SELECTED_REAL_KIND|"+"SET_EXPONENT|SHAPE|SHIFTA|SHIFTL|SHIFTR|SIGN|SIN|SINH|SIZE|SNGL|SPACING|SPREAD|"+"SQRT|SUM|SYSTEM_CLOCK|TAN|TANH|TINY|TRAILZ|TRANSFER|TRANSPOSE|TRIM|UBOUND|UNPACK|VERIFY";var i="logical|character|integer|real|type|"+"LOGICAL|CHARACTER|INTEGER|REAL|TYPE";var a="allocatable|dimension|intent|parameter|pointer|target|private|public|"+"ALLOCATABLE|DIMENSION|INTENT|PARAMETER|POINTER|TARGET|PRIVATE|PUBLIC";var o=this.createKeywordMapper({"invalid.deprecated":"debugger","support.function":r,"constant.language":n,keyword:e,"keyword.operator":t,"storage.type":i,"storage.modifier":a},"identifier");var s="(?:r|u|ur|R|U|UR|Ur|uR)?";var l="(?:(?:[1-9]\\d*)|(?:0))";var g="(?:0[oO]?[0-7]+)";var c="(?:0[xX][\\dA-Fa-f]+)";var d="(?:0[bB][01]+)";var E="(?:"+l+"|"+g+"|"+c+"|"+d+")";var u="(?:[eE][+-]?\\d+)";var f="(?:\\.\\d+)";var h="(?:\\d+)";var T="(?:(?:"+h+"?"+f+")|(?:"+h+"\\.))";var R="(?:(?:"+T+"|"+h+")"+u+")";var N="(?:"+R+"|"+T+")";var S="\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";this.$rules={start:[{token:"comment",regex:"!.*$"},{token:"string",regex:s+'"{3}',next:"qqstring3"},{token:"string",regex:s+'"(?=.)',next:"qqstring"},{token:"string",regex:s+"'{3}",next:"qstring3"},{token:"string",regex:s+"'(?=.)",next:"qstring"},{token:"constant.numeric",regex:"(?:"+N+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:N},{token:"constant.numeric",regex:E+"[lL]\\b"},{token:"constant.numeric",regex:E+"\\b"},{token:"keyword",regex:"#\\s*(?:include|import|define|undef|INCLUDE|IMPORT|DEFINE|UNDEF)\\b"},{token:"keyword",regex:"#\\s*(?:endif|ifdef|else|elseif|ifndef|ENDIF|IFDEF|ELSE|ELSEIF|IFNDEF)\\b"},{token:o,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}],qqstring3:[{token:"constant.language.escape",regex:S},{token:"string",regex:'"{3}',next:"start"},{defaultToken:"string"}],qstring3:[{token:"constant.language.escape",regex:S},{token:"string",regex:'"{3}',next:"start"},{defaultToken:"string"}],qqstring:[{token:"constant.language.escape",regex:S},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:S},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"start"},{defaultToken:"string"}]}};r.inherits(a,i);t.FortranHighlightRules=a});ace.define("ace/mode/folding/cstyle",[],function(e,t,n){"use strict";var r=e("../../lib/oop");var i=e("../../range").Range;var a=e("./fold_mode").FoldMode;var o=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(o,a);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var i=this._getFoldWidgetBase(e,t,n);if(!i&&this.startRegionRe.test(r))return"start";return i};this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var a=i.match(this.foldingStartMarker);if(a){var o=a.index;if(a[1])return this.openingBracketBlock(e,a[1],n,o);var s=e.getCommentFoldRange(n,o+a[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var a=i.match(this.foldingStopMarker);if(a){var o=a.index+a[0].length;if(a[1])return this.closingBracketBlock(e,a[1],n,o);return e.getCommentFoldRange(n,o,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var r=n.search(/\S/);var a=t;var o=n.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){n=e.getLine(t);var g=n.search(/\S/);if(g===-1)continue;if(r>g)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=a){break}else if(c.isMultiLine()){t=c.end.row}else if(r==g){break}}s=t}return new i(a,o,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/);var a=e.getLength();var o=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++n<a){t=e.getLine(n);var g=s.exec(t);if(!g)continue;if(g[1])l--;else l++;if(!l)break}var c=n;if(c>o){return new i(o,r,c,t.length)}}}).call(o.prototype)});ace.define("ace/mode/fortran",[],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text").Mode;var a=e("./fortran_highlight_rules").FortranHighlightRules;var o=e("./folding/cstyle").FoldMode;var s=e("../range").Range;var l=function(){this.HighlightRules=a;this.foldingRules=new o;this.$behaviour=this.$defaultBehaviour};r.inherits(l,i);(function(){this.lineCommentStart="!";this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var i=this.getTokenizer().getLineTokens(t,e);var a=i.tokens;if(a.length&&a[a.length-1].type=="comment"){return r}if(e=="start"){var o=t.match(/^.*[\{\(\[:]\s*$/);if(o){r+=n}}return r};var e={return:1,break:1,continue:1,RETURN:1,BREAK:1,CONTINUE:1};this.checkOutdent=function(t,n,r){if(r!=="\r\n"&&r!=="\r"&&r!=="\n")return false;var i=this.getTokenizer().getLineTokens(n.trim(),t).tokens;if(!i)return false;do{var a=i.pop()}while(a&&(a.type=="comment"||a.type=="text"&&a.value.match(/^\s+$/)));if(!a)return false;return a.type=="keyword"&&e[a.value]};this.autoOutdent=function(e,t,n){n+=1;var r=this.$getIndent(t.getLine(n));var i=t.getTabString();if(r.slice(-i.length)==i)t.remove(new s(n,r.length-i.length,n,r.length))};this.$id="ace/mode/fortran"}).call(l.prototype);t.Mode=l});(function(){ace.require(["ace/mode/fortran"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();