var niftyOk=(document.getElementById&&document.createElement&&Array.prototype.push);var niftyCss=true;String.prototype.find=function(A){return(this.indexOf(A)>=0?true:false)};var oldonload=window.onload;if(typeof (NiftyLoad)!="function"){NiftyLoad=function(){}}if(typeof (oldonload)=="function"){window.onload=function(){oldonload();AddCss();NiftyLoad()}}else{window.onload=function(){AddCss();NiftyLoad()}}function AddCss(){if(niftyCss==true){return }niftyCss=true;var A=CreateEl("link");A.setAttribute("type","text/css");A.setAttribute("rel","stylesheet");A.setAttribute("href","niftyCorners.css");A.setAttribute("media","screen");document.getElementsByTagName("head")[0].appendChild(A)}function Nifty(A,C){if(niftyOk==false){return }if(niftyCss==false){AddCss()}var D,B=A.split(","),E=0;if(C==null){C=""}if(C.find("fixed-height")){E=getElementsBySelector(B[0])[0].offsetHeight}for(D=0;D<B.length;D++){Rounded(B[D],C)}if(C.find("height")){SameHeight(A,E)}}function Rounded(A,D){var E,F="",C="",B=new Array();if(D!=""){D=D.replace("left","tl bl");D=D.replace("right","tr br");D=D.replace("top","tr tl");D=D.replace("bottom","br bl");D=D.replace("transparent","alias");if(D.find("tl")){F="both";if(!D.find("tr")){F="left"}}else{if(D.find("tr")){F="right"}}if(D.find("bl")){C="both";if(!D.find("br")){C="left"}}else{if(D.find("br")){C="right"}}}if(F==""&&C==""&&!D.find("none")){F="both";C="both"}B=getElementsBySelector(A);for(E=0;E<B.length;E++){FixIE(B[E]);if(F!=""){AddTop(B[E],F,D)}if(C!=""){AddBottom(B[E],C,D)}}}function AddTop(C,J,K){var I=CreateEl("b"),D=4,G="",A,H,B="r",E,F;I.style.marginLeft="-"+getPadding(C,"Left")+"px";I.style.marginRight="-"+getPadding(C,"Right")+"px";if(K.find("alias")||(F=getBk(C))=="transparent"){F="transparent";E="transparent";G=getParentBk(C);B="t"}else{E=getParentBk(C);G=Mix(F,E)}I.style.background=E;I.className="niftycorners";A=getPadding(C,"Top");if(K.find("small")){I.style.marginBottom=(A-2)+"px";B+="s";D=2}else{if(K.find("big")){I.style.marginBottom=(A-10)+"px";B+="b";D=8}else{I.style.marginBottom=(A-5)+"px"}}for(H=1;H<=D;H++){I.appendChild(CreateStrip(H,J,F,G,B))}C.style.paddingTop="0";C.insertBefore(I,C.firstChild)}function AddBottom(C,J,K){var I=CreateEl("b"),D=4,G="",A,H,B="r",E,F;I.style.marginLeft="-"+getPadding(C,"Left")+"px";I.style.marginRight="-"+getPadding(C,"Right")+"px";if(K.find("alias")||(F=getBk(C))=="transparent"){F="transparent";E="transparent";G=getParentBk(C);B="t"}else{E=getParentBk(C);G=Mix(F,E)}I.style.background=E;I.className="niftycorners";A=getPadding(C,"Bottom");if(K.find("small")){I.style.marginTop=(A-2)+"px";B+="s";D=2}else{if(K.find("big")){I.style.marginTop=(A-10)+"px";B+="b";D=8}else{I.style.marginTop=(A-5)+"px"}}for(H=D;H>0;H--){I.appendChild(CreateStrip(H,J,F,G,B))}C.style.paddingBottom=0;C.appendChild(I)}function CreateStrip(D,E,B,C,F){var A=CreateEl("b");A.className=F+D;A.style.backgroundColor=B;A.style.borderColor=C;if(E=="left"){A.style.borderRightWidth="0";A.style.marginRight="0"}else{if(E=="right"){A.style.borderLeftWidth="0";A.style.marginLeft="0"}}return(A)}function CreateEl(A){return(document.createElement(A))}function FixIE(A){if(A.currentStyle!=null&&A.currentStyle.hasLayout!=null&&A.currentStyle.hasLayout==false){A.style.display="inline-block"}}function SameHeight(A,D){var G,B=A.split(","),F,C,E=[],H;for(G=0;G<B.length;G++){F=getElementsBySelector(B[G]);E=E.concat(F)}for(G=0;G<E.length;G++){if(E[G].offsetHeight>D){D=E[G].offsetHeight}E[G].style.height="auto"}for(G=0;G<E.length;G++){H=D-E[G].offsetHeight;if(H>0){F=CreateEl("b");F.className="niftyfill";F.style.height=H+"px";nc=E[G].lastChild;if(nc.className=="niftycorners"){E[G].insertBefore(F,nc)}else{E[G].appendChild(F)}}}}function getElementsBySelector(B){var E,D,A="",H="",P=B,M="",L,C,G,K,O=[],J=[],I;if(B.find("#")){if(B.find(" ")){O=B.split(" ");var F=O[0].split("#");if(F.length==1){return(J)}G=document.getElementById(F[1]);if(G){N=G.getElementsByTagName(O[1]);for(E=0;E<N.length;E++){J.push(N[E])}}return(J)}else{O=B.split("#");P=O[0];A=O[1];if(A!=""){G=document.getElementById(A);if(G){J.push(G)}return(J)}}}if(B.find(".")){O=B.split(".");P=O[0];H=O[1];if(H.find(" ")){O=H.split(" ");H=O[0];M=O[1]}}var N=document.getElementsByTagName(P);if(H==""){for(E=0;E<N.length;E++){J.push(N[E])}return(J)}for(E=0;E<N.length;E++){I=N[E].className.split(" ");for(D=0;D<I.length;D++){if(I[D]==H){if(M==""){J.push(N[E])}else{L=N[E].getElementsByTagName(M);for(C=0;C<L.length;C++){J.push(L[C])}}}}}return(J)}function getParentBk(A){var B=A.parentNode,C;while(B.tagName.toUpperCase()!="HTML"&&(C=getBk(B))=="transparent"){B=B.parentNode}if(C=="transparent"){C="#FFFFFF"}return(C)}function getBk(A){var B=getStyleProp(A,"backgroundColor");if(B==null||B=="transparent"||B.find("rgba(0, 0, 0, 0)")){return("transparent")}if(B.find("rgb")){B=rgb2hex(B)}return(B)}function getPadding(A,B){var C=getStyleProp(A,"padding"+B);if(C==null||!C.find("px")){return(0)}return(parseInt(C))}function getStyleProp(A,B){if(A.currentStyle){return(A.currentStyle[B])}if(document.defaultView.getComputedStyle){return(document.defaultView.getComputedStyle(A,"")[B])}return(null)}function rgb2hex(F){var D="",A,C,B;var E=/([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;var C=E.exec(F);for(B=1;B<4;B++){A=parseInt(C[B]).toString(16);if(A.length==1){D+="0"+A}else{D+=A}}return("#"+D)}function Mix(F,E){var D,C,B,A,H,G=new Array(3);if(F.length==4){C=1}else{C=2}if(E.length==4){B=1}else{B=2}for(D=0;D<3;D++){A=parseInt(F.substr(1+C*D,C),16);if(C==1){A=16*A+A}H=parseInt(E.substr(1+B*D,B),16);if(B==1){H=16*H+H}G[D]=Math.floor((A*50+H*50)/100);G[D]=G[D].toString(16);if(G[D].length==1){G[D]="0"+G[D]}}return("#"+G[0]+G[1]+G[2])};