var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(F){F=F.toUpperCase();var E=this.NODEMAP[F]||"div";var A=document.createElement(E);try{A.innerHTML="<"+F+"></"+F+">"}catch(D){}var C=A.firstChild||null;if(C&&(C.tagName!=F)){C=C.getElementsByTagName(F)[0]}if(!C){C=document.createElement(F)}if(!C){return }if(arguments[1]){if(this._isStringOrNumber(arguments[1])||(arguments[1] instanceof Array)){this._children(C,arguments[1])}else{var B=this._attributes(arguments[1]);if(B.length){try{A.innerHTML="<"+F+" "+B+"></"+F+">"}catch(D){}C=A.firstChild||null;if(!C){C=document.createElement(F);for(attr in arguments[1]){C[attr=="class"?"className":attr]=arguments[1][attr]}}if(C.tagName!=F){C=A.getElementsByTagName(F)[0]}}}}if(arguments[2]){this._children(C,arguments[2])}return C},_text:function(A){return document.createTextNode(A)},_attributes:function(B){var A=[];for(attribute in B){A.push((attribute=="className"?"class":attribute)+'="'+B[attribute].toString().escapeHTML()+'"')}return A.join(" ")},_children:function(A,B){if(typeof B=="object"){B.flatten().each(function(C){if(typeof C=="object"){A.appendChild(C)}else{if(Builder._isStringOrNumber(C)){A.appendChild(Builder._text(C))}}})}else{if(Builder._isStringOrNumber(B)){A.appendChild(Builder._text(B))}}},_isStringOrNumber:function(A){return(typeof A=="string"||typeof A=="number")},dump:function(A){if(typeof A!="object"&&typeof A!="function"){A=window}var B=("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);B.each(function(C){A[C]=function(){return Builder.node.apply(Builder,[C].concat($A(arguments)))}})}};