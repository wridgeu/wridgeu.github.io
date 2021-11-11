ace.define("ace/mode/prisma_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,i){"use strict";var n=e("../lib/oop");var r=e("./text_highlight_rules").TextHighlightRules;var o=function(){this.$rules={start:[{include:"#triple_comment"},{include:"#double_comment"},{include:"#model_block_definition"},{include:"#config_block_definition"},{include:"#enum_block_definition"},{include:"#type_definition"}],"#model_block_definition":[{token:["source.prisma.embedded.source","storage.type.model.prisma","source.prisma.embedded.source","entity.name.type.model.prisma","source.prisma.embedded.source","punctuation.definition.tag.prisma"],regex:/^(\s*)(model|type)(\s+)([A-Za-z][\w]*)(\s+)({)/,push:[{token:"punctuation.definition.tag.prisma",regex:/\s*\}/,next:"pop"},{include:"#triple_comment"},{include:"#double_comment"},{include:"#field_definition"},{defaultToken:"source.prisma.embedded.source"}]}],"#enum_block_definition":[{token:["source.prisma.embedded.source","storage.type.enum.prisma","source.prisma.embedded.source","entity.name.type.enum.prisma","source.prisma.embedded.source","punctuation.definition.tag.prisma"],regex:/^(\s*)(enum)(\s+)([A-Za-z][\w]*)(\s+)({)/,push:[{token:"punctuation.definition.tag.prisma",regex:/\s*\}/,next:"pop"},{include:"#triple_comment"},{include:"#double_comment"},{include:"#enum_value_definition"},{defaultToken:"source.prisma.embedded.source"}]}],"#config_block_definition":[{token:["source.prisma.embedded.source","storage.type.config.prisma","source.prisma.embedded.source","entity.name.type.config.prisma","source.prisma.embedded.source","punctuation.definition.tag.prisma"],regex:/^(\s*)(generator|datasource)(\s+)([A-Za-z][\w]*)(\s+)({)/,push:[{token:"source.prisma.embedded.source",regex:/\s*\}/,next:"pop"},{include:"#triple_comment"},{include:"#double_comment"},{include:"#assignment"},{defaultToken:"source.prisma.embedded.source"}]}],"#assignment":[{token:["text","variable.other.assignment.prisma","text","keyword.operator.terraform","text"],regex:/^(\s*)(\w+)(\s*)(=)(\s*)/,push:[{token:"text",regex:/$/,next:"pop"},{include:"#value"},{include:"#double_comment_inline"}]}],"#field_definition":[{token:["text","variable.other.assignment.prisma","invalid.illegal.colon.prisma","text","support.type.primitive.prisma","keyword.operator.list_type.prisma","keyword.operator.optional_type.prisma","invalid.illegal.required_type.prisma"],regex:/^(\s*)(\w+)((?:\s*:)?)(\s+)(\w+)((?:\[\])?)((?:\?)?)((?:\!)?)/},{include:"#attribute_with_arguments"},{include:"#attribute"}],"#type_definition":[{token:["text","storage.type.type.prisma","text","entity.name.type.type.prisma","text","support.type.primitive.prisma"],regex:/^(\s*)(type)(\s+)(\w+)(\s*=\s*)(\w+)/},{include:"#attribute_with_arguments"},{include:"#attribute"}],"#enum_value_definition":[{token:["text","variable.other.assignment.prisma","text"],regex:/^(\s*)(\w+)(\s*$)/},{include:"#attribute_with_arguments"},{include:"#attribute"}],"#attribute_with_arguments":[{token:["entity.name.function.attribute.prisma","punctuation.definition.tag.prisma"],regex:/(@@?[\w\.]+)(\()/,push:[{token:"punctuation.definition.tag.prisma",regex:/\)/,next:"pop"},{include:"#named_argument"},{include:"#value"},{defaultToken:"source.prisma.attribute.with_arguments"}]}],"#attribute":[{token:"entity.name.function.attribute.prisma",regex:/@@?[\w\.]+/}],"#array":[{token:"source.prisma.array",regex:/\[/,push:[{token:"source.prisma.array",regex:/\]/,next:"pop"},{include:"#value"},{defaultToken:"source.prisma.array"}]}],"#value":[{include:"#array"},{include:"#functional"},{include:"#literal"}],"#functional":[{token:["support.function.functional.prisma","punctuation.definition.tag.prisma"],regex:/(\w+)(\()/,push:[{token:"punctuation.definition.tag.prisma",regex:/\)/,next:"pop"},{include:"#value"},{defaultToken:"source.prisma.functional"}]}],"#literal":[{include:"#boolean"},{include:"#number"},{include:"#double_quoted_string"},{include:"#identifier"}],"#identifier":[{token:"support.constant.constant.prisma",regex:/\b(?:\w)+\b/}],"#map_key":[{token:["variable.parameter.key.prisma","text","punctuation.definition.separator.key-value.prisma","text"],regex:/(\w+)(\s*)(:)(\s*)/}],"#named_argument":[{include:"#map_key"},{include:"#value"}],"#triple_comment":[{token:"comment.prisma",regex:/\/\/\//,push:[{token:"comment.prisma",regex:/$/,next:"pop"},{defaultToken:"comment.prisma"}]}],"#double_comment":[{token:"comment.prisma",regex:/\/\//,push:[{token:"comment.prisma",regex:/$/,next:"pop"},{defaultToken:"comment.prisma"}]}],"#double_comment_inline":[{token:"comment.prisma",regex:/\/\/[^$]*/}],"#boolean":[{token:"constant.language.boolean.prisma",regex:/\b(?:true|false)\b/}],"#number":[{token:"constant.numeric.prisma",regex:/(?:0(?:x|X)[0-9a-fA-F]*|(?:\+|-)?\b(?:[0-9]+\.?[0-9]*|\.[0-9]+)(?:(?:e|E)(?:\+|-)?[0-9]+)?)(?:[LlFfUuDdg]|UL|ul)?\b/}],"#double_quoted_string":[{token:"string.quoted.double.start.prisma",regex:/"/,push:[{token:"string.quoted.double.end.prisma",regex:/"/,next:"pop"},{include:"#string_interpolation"},{token:"string.quoted.double.prisma",regex:/[\w\-\/\._\\%@:\?=]+/},{defaultToken:"unnamed"}]}],"#string_interpolation":[{token:"keyword.control.interpolation.start.prisma",regex:/\$\{/,push:[{token:"keyword.control.interpolation.end.prisma",regex:/\s*\}/,next:"pop"},{include:"#value"},{defaultToken:"source.tag.embedded.source.prisma"}]}]};this.normalizeRules()};o.metaData={name:"Prisma",scopeName:"source.prisma"};n.inherits(o,r);t.PrismaHighlightRules=o});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,i){"use strict";var n=e("../../lib/oop");var r=e("../../range").Range;var o=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};n.inherits(a,o);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,i){var n=e.getLine(i);if(this.singleLineBlockCommentRe.test(n)){if(!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return""}var r=this._getFoldWidgetBase(e,t,i);if(!r&&this.startRegionRe.test(n))return"start";return r};this.getFoldWidgetRange=function(e,t,i,n){var r=e.getLine(i);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,i);var o=r.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],i,a);var s=e.getCommentFoldRange(i,a+o[0].length,1);if(s&&!s.isMultiLine()){if(n){s=this.getSectionRange(e,i)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var o=r.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;if(o[1])return this.closingBracketBlock(e,o[1],i,a);return e.getCommentFoldRange(i,a,-1)}};this.getSectionRange=function(e,t){var i=e.getLine(t);var n=i.search(/\S/);var o=t;var a=i.length;t=t+1;var s=t;var u=e.getLength();while(++t<u){i=e.getLine(t);var l=i.search(/\S/);if(l===-1)continue;if(n>l)break;var d=this.getFoldWidgetRange(e,"all",t);if(d){if(d.start.row<=o){break}else if(d.isMultiLine()){t=d.end.row}else if(n==l){break}}s=t}return new r(o,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,i){var n=t.search(/\s*$/);var o=e.getLength();var a=i;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var u=1;while(++i<o){t=e.getLine(i);var l=s.exec(t);if(!l)continue;if(l[1])u--;else u++;if(!u)break}var d=i;if(d>a){return new r(a,n,d,t.length)}}}).call(a.prototype)});ace.define("ace/mode/prisma",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/prisma_highlight_rules","ace/mode/folding/cstyle"],function(e,t,i){"use strict";var n=e("../lib/oop");var r=e("./text").Mode;var o=e("./prisma_highlight_rules").PrismaHighlightRules;var a=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=o;this.foldingRules=new a};n.inherits(s,r);(function(){this.lineCommentStart="//";this.$id="ace/mode/prisma"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/prisma"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();