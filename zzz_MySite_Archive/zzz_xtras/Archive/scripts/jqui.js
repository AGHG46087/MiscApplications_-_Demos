(function(A){A.ui=A.ui||{};A.extend(A.ui,{plugin:{add:function(C,F,E,D){var B=A.ui[C].prototype;if(!B.plugins[F]){B.plugins[F]=[]}B.plugins[F].push([E,D])},call:function(B,C,E){var H=B.plugins[C];if(!H){return }var G=B.interaction?B.interaction.options:B.options;var F=B.interaction?B.interaction.element:B.element;for(var D=0;D<H.length;D++){if(G[H[D][0]]){H[D][1].apply(F,E)}}}}});A.fn.mouseInteractionDestroy=function(){this.each(function(){if(A.data(this,"ui-mouse")){A.data(this,"ui-mouse").destroy()}})};A.ui.mouseInteraction=function(C,D){if(!D){var D={}}this.element=C;A.data(this.element,"ui-mouse",this);this.options={};A.extend(this.options,D);A.extend(this.options,{handle:D.handle?(A(D.handle,C)[0]?A(D.handle,C):A(C)):A(C),helper:D.helper||"original",preventionDistance:D.preventionDistance||0,dragPrevention:D.dragPrevention?D.dragPrevention.toLowerCase().split(","):["input","textarea","button","select","option"],cursorAt:{top:((D.cursorAt&&D.cursorAt.top)?D.cursorAt.top:0),left:((D.cursorAt&&D.cursorAt.left)?D.cursorAt.left:0),bottom:((D.cursorAt&&D.cursorAt.bottom)?D.cursorAt.bottom:0),right:((D.cursorAt&&D.cursorAt.right)?D.cursorAt.right:0)},cursorAtIgnore:(!D.cursorAt)?true:false,appendTo:D.appendTo||"parent"});D=this.options;if(!this.options.nonDestructive&&(D.helper=="clone"||D.helper=="original")){D.margins={top:parseInt(A(C).css("marginTop"))||0,left:parseInt(A(C).css("marginLeft"))||0,bottom:parseInt(A(C).css("marginBottom"))||0,right:parseInt(A(C).css("marginRight"))||0};if(D.cursorAt.top!=0){D.cursorAt.top=D.margins.top}if(D.cursorAt.left!=0){D.cursorAt.left+=D.margins.left}if(D.cursorAt.bottom!=0){D.cursorAt.bottom+=D.margins.bottom}if(D.cursorAt.right!=0){D.cursorAt.right+=D.margins.right}if(D.helper=="original"){D.wasPositioned=A(C).css("position")}}else{D.margins={top:0,left:0,right:0,bottom:0}}var B=this;this.mousedownfunc=function(E){return B.click.apply(B,[E])};D.handle.bind("mousedown",this.mousedownfunc);if(A.browser.msie){A(this.element).attr("unselectable","on")}};A.extend(A.ui.mouseInteraction.prototype,{plugins:{},currentTarget:null,lastTarget:null,timer:null,slowMode:false,init:false,destroy:function(){this.options.handle.unbind("mousedown",this.mousedownfunc)},trigger:function(B){return this.click.apply(this,arguments)},click:function(E){var F=this.options;window.focus();if(E.which!=1){return true}var D=(E.target)?E.target.nodeName.toLowerCase():E.srcElement.nodeName.toLowerCase();for(var C=0;C<F.dragPrevention.length;C++){if(D==F.dragPrevention[C]){return true}}if(F.startCondition&&!F.startCondition.apply(this,[E])){return true}var B=this;this.mouseup=function(H){return B.stop.apply(B,[H])};this.mousemove=function(H){return B.drag.apply(B,[H])};var G=function(){A(document).bind("mouseup",B.mouseup);A(document).bind("mousemove",B.mousemove);B.opos=[E.pageX,E.pageY]};if(F.preventionTimeout){if(this.timer){clearInterval(this.timer)}this.timer=setTimeout(function(){G()},F.preventionTimeout);return false}G();return false},start:function(D){var E=this.options;var B=this.element;E.co=A(B).offset();this.helper=typeof E.helper=="function"?A(E.helper.apply(B,[D,this]))[0]:(E.helper=="clone"?A(B).clone()[0]:B);if(E.appendTo=="parent"){var C=B.parentNode;while(C){if(C.style&&(A(C).css("position")=="relative"||A(C).css("position")=="absolute")){E.pp=C;E.po=A(C).offset();E.ppOverflow=!!(A(E.pp).css("overflow")=="auto"||A(E.pp).css("overflow")=="scroll");break}C=C.parentNode?C.parentNode:null}if(!E.pp){E.po={top:0,left:0}}}this.pos=[this.opos[0],this.opos[1]];this.rpos=[this.pos[0],this.pos[1]];if(E.cursorAtIgnore){E.cursorAt.left=this.pos[0]-E.co.left+E.margins.left;E.cursorAt.top=this.pos[1]-E.co.top+E.margins.top}if(E.pp){this.pos[0]-=E.po.left;this.pos[1]-=E.po.top}this.slowMode=(E.cursorAt&&(E.cursorAt.top-E.margins.top>0||E.cursorAt.bottom-E.margins.bottom>0)&&(E.cursorAt.left-E.margins.left>0||E.cursorAt.right-E.margins.right>0))?true:false;if(!E.nonDestructive){A(this.helper).css("position","absolute")}if(E.helper!="original"){A(this.helper).appendTo((E.appendTo=="parent"?B.parentNode:E.appendTo)).show()}if(E.cursorAt.right&&!E.cursorAt.left){E.cursorAt.left=this.helper.offsetWidth+E.margins.right+E.margins.left-E.cursorAt.right}if(E.cursorAt.bottom&&!E.cursorAt.top){E.cursorAt.top=this.helper.offsetHeight+E.margins.top+E.margins.bottom-E.cursorAt.bottom}this.init=true;if(E._start){E._start.apply(B,[this.helper,this.pos,E.cursorAt,this,D])}this.helperSize={width:A(this.helper).outerWidth(),height:A(this.helper).outerHeight()};return false},stop:function(D){var E=this.options;var B=this.element;var C=this;A(document).unbind("mouseup",C.mouseup);A(document).unbind("mousemove",C.mousemove);if(this.init==false){return this.opos=this.pos=null}if(E._beforeStop){E._beforeStop.apply(B,[this.helper,this.pos,E.cursorAt,this,D])}if(this.helper!=B&&!E.beQuietAtEnd){A(this.helper).remove();this.helper=null}if(!E.beQuietAtEnd){if(E._stop){E._stop.apply(B,[this.helper,this.pos,E.cursorAt,this,D])}}this.init=false;this.opos=this.pos=null;return false},drag:function(B){if(!this.opos||(A.browser.msie&&!B.button)){return this.stop.apply(this,[B])}var C=this.options;this.pos=[B.pageX,B.pageY];if(this.rpos&&this.rpos[0]==this.pos[0]&&this.rpos[1]==this.pos[1]){return false}this.rpos=[this.pos[0],this.pos[1]];if(C.pp){this.pos[0]-=C.po.left;this.pos[1]-=C.po.top}if((Math.abs(this.rpos[0]-this.opos[0])>C.preventionDistance||Math.abs(this.rpos[1]-this.opos[1])>C.preventionDistance)&&this.init==false){this.start.apply(this,[B])}else{if(this.init==false){return false}}if(C._drag){C._drag.apply(this.element,[this.helper,this.pos,C.cursorAt,this,B])}return false}})})(jQuery);