ace.define("ace/mode/gcode_highlight_rules",[],function(e,t,o){"use strict";var r=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var n=function(){var e="IF|DO|WHILE|ENDWHILE|CALL|ENDIF|SUB|ENDSUB|GOTO|REPEAT|ENDREPEAT|CALL";var t="PI";var o="ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN";var r=this.createKeywordMapper({"support.function":o,keyword:e,"constant.language":t},"identifier",true);this.$rules={start:[{token:"comment",regex:"\\(.*\\)"},{token:"comment",regex:"([N])([0-9]+)"},{token:"string",regex:"([G])([0-9]+\\.?[0-9]?)"},{token:"string",regex:"([M])([0-9]+\\.?[0-9]?)"},{token:"constant.numeric",regex:"([-+]?([0-9]*\\.?[0-9]+\\.?))|(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"},{token:r,regex:"[A-Z]"},{token:"keyword.operator",regex:"EQ|LT|GT|NE|GE|LE|OR|XOR"},{token:"paren.lparen",regex:"[\\[]"},{token:"paren.rparen",regex:"[\\]]"},{token:"text",regex:"\\s+"}]}};r.inherits(n,i);t.GcodeHighlightRules=n});ace.define("ace/mode/gcode",[],function(e,t,o){"use strict";var r=e("../lib/oop");var i=e("./text").Mode;var n=e("./gcode_highlight_rules").GcodeHighlightRules;var a=e("../range").Range;var g=function(){this.HighlightRules=n;this.$behaviour=this.$defaultBehaviour};r.inherits(g,i);(function(){this.$id="ace/mode/gcode"}).call(g.prototype);t.Mode=g});(function(){ace.require(["ace/mode/gcode"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();