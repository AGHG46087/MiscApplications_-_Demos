var $j=jQuery.noConflict();$j(document).ready(function(A){A("#MainDockBarNav").magnifier({magnification:2.5,overlap:true,zIndex:10,opacity:{min:0.6,max:1},baseline:-1})});Event.observe(window,"load",function(){InitialLoadModule()});function InitialLoadModule(){registerHandlers();setTimeout("loadOtherFiles();",200);if(isDebugMode()){console.info("We are in DEBUG MODE")}}function loadOtherFiles(){loadScript("./scripts/combineJS.php?type=javascript&files=niftycube.js,behaviour.js,window.js,iCalendar.js,iGallery.js",null,"html");loadCSS("./css/combineCSS.php?type=css&files=niftyCorners.css,defaultWin.css,mac_os_x.css,nuncio.css,alphacube.css,spread.css")}function isDebugMode(){var C=false;var B=$("HGDEBUG");if(B!=null){var A=B.innerHTML.substring();C=(A.indexOf("true")>-1)}return C}function loadScript(C,F,B){if(B==null){B="html"}if(F==null){F=function(){}}var H=C.lastIndexOf("/")+1;var E=C.lastIndexOf(".");var G=C.substring(H,E);var A=C.substring(E+1);var G=C.substring(H,E)+"_"+A;if(A.indexOf("php")>-1){E=C.lastIndexOf("?");G=C.substring(H,E)+"_SERVLET"}var D=$(G);if(D==null){D=document.createElement("script");D.src=C;D.id=G;D.setAttribute("type","text/javascript");D.setAttribute("language","javascript");D.onload=function(){F()};D.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){F()}};document.getElementsByTagName(B)[0].appendChild(D)}}function loadCSS(C,B){if(B==null){B="head"}var G=C.lastIndexOf("/")+1;var E=C.lastIndexOf(".");var F=C.substring(G,E);var A=C.substring(E+1);var F=C.substring(G,E)+"_"+A;if(A.indexOf("php")>-1){E=C.lastIndexOf("?");F=C.substring(G,E)+"_SERVLET"}var D=$(F);if(D==null){if(A.indexOf("css")>-1){D=document.createElement("link");D.setAttribute("type","text/css");D.setAttribute("rel","stylesheet");D.setAttribute("media","all");D.setAttribute("href",C);D.id=F;document.getElementsByTagName(B)[0].appendChild(D)}}}function registerHandlers(){var A={onCreate:function(){Element.show("systemWorking")},onComplete:function(){if(Ajax.activeRequestCount==0){Element.hide("systemWorking")}}};Ajax.Responders.register(A);Element.hide("systemWorking")}function ajaxRequest(B,H,D,I,F){var C=(I!=null)?I:"";var J=(F!=null)?F:ajaxOnCompleteHandler;var G=(H!=null)?H:ajaxShowResponseHandler;var E=(D!=null)?D:ajaxErrorHandler;var A=new Ajax.Request(B,{method:"post",parameters:C,onSuccess:G,onFailure:E,onComplete:J});return false}function getCalendar(C){if(C!=null){var B="content/phpicalendar/";var A=B+C;return ajaxRequest(A,showCalendarResponse,ajaxErrorHandler,null,ajaxOnCompleteHandler)}return false}function getPageLoad(D,C){if(D!=null){var A="content/";var B=A+D;return ajaxRequest(B,ajaxShowResponseHandler,ajaxErrorHandler,C,ajaxOnCompleteHandler)}return false}function ajaxErrorHandler(B){var A='<div id="WeAreSorryText">We are Sorry, The request could not be processed, please try back later, ID= '+B.readyState+""+B.status+" </div>";$("AjaxResponseData").innerHTML=A}function ajaxOnCompleteHandler(A){cleanupNodes();setActiveStyleSheet();processAnyOnDemandJavascript()}function ajaxShowResponseHandler(A){$("AjaxResponseData").innerHTML=A.responseText}function showCalendarResponse(A){var D=A.responseText;var C=A.responseText.indexOf("<body>");if(C>-1){var B=A.responseText.indexOf("</body>");D=A.responseText.substring(C+"<body>".length,B)}$("AjaxResponseData").innerHTML=D+createReplacementCSSNode("bgcalendar.css")}function showFireFoxWindow(A){var B=new Window(AppUtils.getNewId(),{className:"spread",width:640,height:370,zIndex:100,resizable:true,title:"Get Firefox, You deserve it",url:"http://www.getfirefox.com/",draggable:true});B.setDestroyOnClose();B.showCenter(A)}function createReplacementCSSNode(B){if(B.indexOf("css/")==-1){B="./css/"+B}var A='<span id="Active_Background" class="bhv_Invisible" title="bg_replacement">'+B+"</span>";return A}function delegateAjaxContentRequest(B,A){$("AjaxResponseData").innerHTML="&nbsp;";var D="browserData="+AppUtils.getBrowserData();var C=null;switch(A){case 1:C="content_home.php";getPageLoad(C,D);break;case 2:C="content_music.php";getPageLoad(C);break;case 3:loadCSS("./css/iCalendar.css");getCalendar("index.php");break;case 4:C="phpigallery/content_iGallery.php";getPageLoad(C,D);break;case 5:C="content_email.php";getPageLoad(C);break;case 6:C="content_apple.php";getPageLoad(C);break;case 7:C="content_getfirefox.php";getPageLoad(C);showFireFoxWindow(true);break;default:break}return false}function start_app(){getPageLoad("content_home.php");fadeEffect("menuText","Home")}function load_app(B,A){delegateAjaxContentRequest(B,A);var C=B.title;fadeEffect("menuText",C)}function fadeEffect(A,B){new Effect.FadeAndSlide(A,B,{duration:1.5,dropout:false,startX:0,endX:700,endY:10,mode:"absolute"});return false}function processAnyOnDemandJavascript(){var C=$("contentElement");if(C!=null){var D=C.getAttribute("title");if(D.indexOf("home")>-1){$("Accordian").visualEffect("Accordian",{headingSelector:"h5",sectionSelector:"div.Accordian-Blind",showSection:0,duration:0.3});setTimeout('Nifty("p.rounderItem", "big");',75);setTimeout('Nifty("h5.rounderItem", "med");',75)}if(D.indexOf("gallery")>-1){Behaviour.apply();setTimeout('Nifty("div.rounderItem", "big");',60)}}else{var B=$("eventPopupForm");if(B!=null){Behaviour.apply();var A=1}}}function setActiveStyleSheet(){var C=$("Active_Background");if(C!=null){var A=String(C.innerHTML.substring());var B=$("bg_replacement");if(B!=null){C=document.createElement("link");C.setAttribute("type","text/css");C.setAttribute("rel","stylesheet");C.setAttribute("media","all");C.setAttribute("href",A);C.id="bg_replacement";B.parentNode.replaceChild(C,B)}}}function cleanupNodes(){return false}function disableDockBar(){$j("#MainDockBarNav").magnifierDisable()}function enableDockBar(){$j("#MainDockBarNav").magnifierEnable()}Effect.FadeAndSlide=Class.create();Object.extend(Object.extend(Effect.FadeAndSlide.prototype,Effect.Base.prototype),{initialize:function(G,E){var D=Object.extend({},arguments[2]||{});this.element=$(G);this.idName=$(G).id;this.oldValue=this.element.innerHTML.substring();this.newValue=E;this.startX=((D.startX==0||D.startX==null)?-200:D.startX);this.endX=((D.endX==0||D.endX==null)?700:D.endX);this.startY=((D.startY==0||D.startY==null)?A(this.element.getStyle("top")):D.startY);this.endY=((D.endY==0||D.endY==null)?A(this.element.getStyle("top")):D.endY);this.duration=((D.duration<=0||D.duration==null)?1.5:D.duration);this.mode=(D.mode==null)?"absolute":D.mode;this.dropout=(D.dropout==null)?true:D.dropout;this.nodeClass=(D.nodeClass==null)?"FadeAndSlide":D.nodeClass;this.fadeDelay=((D.fadeDelay==null)?(this.duration/((this.oldValue.length<=5)?2:3)):D.fadeDelay);this.start(D);this.element.id="fadeTextSpan";var F='<span id="'+this.idName+'">'+this.newValue+"</span>";new Insertion.Before(this.element.id,F);$(this.idName).addClassName(this.nodeClass);$(this.element.id).addClassName(this.nodeClass);Element.setStyle(this.idName,{left:this.startX+"px",top:this.startY+"px","font-style":"italic",position:this.mode});if(D.dropout){Effect.tagifyText(this.element);new Effect.multiple(this.element.childNodes,Effect.DropOut,{delay:this.fadeDelay,speed:D.duration/7})}new Effect.Fade(this.element,{duration:this.duration+this.fadeDelay,delay:this.fadeDelay,afterFinish:function(H){C(H)}});new Effect.Move(this.idName,{x:D.endX,y:this.endY,mode:this.mode,duration:this.duration,afterFinish:function(H){B(H)}});function B(H){effectIDName=H.element.id;Element.setStyle(effectIDName,{"font-style":"normal"})}function C(H){effectIDName=H.element.id;H.element.parentNode.removeChild(H.element)}function A(H){var J=String(H);var I=J.lastIndexOf("px");if(I>0){J=J.substring(0,I)}return J}}});Effect.Accordian=function(D){var F=0.5;var E=0;var B=true;D=$(D);var C=Object.extend({},arguments[1]||{});headings=$$("#"+D.id+" "+C.headingSelector);sections=$$("#"+D.id+" "+C.sectionSelector);function A(G){if(!B&&G.visible()){return true}if(G.visible()){G.visualEffect("blind_up",{duration:C.duration});return false}sections.each(function(H){if(H==G){H.visualEffect("blind_down",{duration:C.duration})}else{H.visualEffect("blind_up",{duration:C.duration})}});return true}headings.each(function(H,G){H.style.cursor="pointer";H.onclick=function(){headings.each(function(J){J.removeClassName("activefold")});var I=A(sections[G]);if(I){this.addClassName("activefold")}}});sections.each(function(G,H){if(!C.showSection||(H+1!=C.showSection)){G.hide()}else{G.show()}});if(C.showSection){headings[C.showSection-1].addClassName("activefold")}};var AppUtils={lastId:0,currentSampleNb:0,maxZIndex:0,trim:function(A){return A.replace(/^\s*|\s*$/g,"")},getPageSize:function(){var E,A;if(window.innerHeight&&window.scrollMaxY){E=document.body.scrollWidth;A=window.innerHeight+window.scrollMaxY}else{if(document.body.scrollHeight>document.body.offsetHeight){E=document.body.scrollWidth;A=document.body.scrollHeight}else{E=document.body.offsetWidth;A=document.body.offsetHeight}}var C,F;if(self.innerHeight){C=self.innerWidth;F=self.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){C=document.documentElement.clientWidth;F=document.documentElement.clientHeight}else{if(document.body){C=document.body.clientWidth;F=document.body.clientHeight}}}var D,B;D=(A<F)?F:A;B=(E<C)?C:E;return{pageWidth:B,pageHeight:D,windowWidth:C,windowHeight:F}},getElementsByAttribute:function(B,F,C){C=C||document;var E=C.all||C.getElementsByTagName("*");var A=[];for(var D=0;D<E.length;D++){if(E[D].getAttribute(B)==F){A[A.length]=E[D]}}return A},shieldsDown:function(B){var A=$(B);if(A){A.style.display="none";A.parentNode.removeChild(A)}},shieldsUp:function(F,D){var E=$(F);if(E!=null){if(E.style.display=="block"){return }E.parentNode.removeChild(E)}var B=(D!=null)?D:F;var C=document.getElementsByTagName("body").item(0);var E=document.createElement("div");E.setAttribute("id",F);E.className="shieldup_"+B;E.style.display="none";E.style.position="absolute";E.style.top="0";E.style.left="0";E.style.zIndex="auto";E.style.width="100%";C.insertBefore(E,C.lastChild);var A=WindowUtilities.getPageSize();E.style.height=(A.pageHeight+"px");E.style.width=(A.windowWidth+"px");E.style.display="block";return E},updateZIndex:function(A){if(A>this.maxZIndex){this.maxZIndex=A}},isUserAgent:function(B){var C=navigator.userAgent.toLowerCase();var A=(C.indexOf(B)>-1);return A},isIE:function(){var A=(window.ActiveXObject);return A},isOpera:function(){var B=navigator.userAgent.toLowerCase();var A=(B.indexOf("opera")>-1);return A},isSafari:function(){var B=navigator.userAgent.toLowerCase();var A=(B.indexOf("safari")>-1);return A},isFirefox:function(){var B=navigator.userAgent.toLowerCase();var A=(B.indexOf("firefox")>-1);return A},getBrowserData:function(){var D=navigator.userAgent.toLowerCase();var F=-1;var A="";var E="";if(D.indexOf("firefox")!=-1){F=D.indexOf("firefox")+8;A=D.substring(F);E="Firefox"}else{if(D.indexOf("opera")>-1){F=D.indexOf("Opera")+6;A=""+parseInt(D.charAt(versionindex));E="Opera"}else{if(D.indexOf("safari")>-1){F=D.indexOf("Opera")+8;A=""+parseInt(D.charAt(versionindex));E="Safari"}else{if(navigator.appVersion.indexOf("MSIE")!=-1){var C=navigator.appVersion.split("MSIE");A=""+parseFloat(C[1]);E="MSIE"}}}}var B=""+E+" : "+A;return B},getNewId:function(){AppUtils.lastId++;return"window_id_"+AppUtils.lastId},evalCode:function(id){var pre=$(id);var code;if(pre.textarea&&pre.textarea.visible){code=pre.textarea.value}else{code=pre.innerHTML}code=code.gsub("&lt;","<");code=code.gsub("&gt;",">");try{eval(code)}catch(error){Dialog.alert(" error accurs while interprating your javascript code <br/>"+error,{windowParameters:{width:300,showEffect:Element.show},okLabel:"close"})}},createThemeWindow:function(B,C){var A=new Window(AppUtils.getNewId(),{className:B,width:300,height:200,title:"Theme : "+B});if(C==null){C="The Text is NULL"}A.getContent().innerHTML=C;return A},openThemeWindow:function(C,D,A){var B=createThemeWindow(C,D);B.showCenter(A);return B},openThemeDialog:function(B,C,A){if(C==null){C="the Text is NULL"}Dialog.alert(C,{windowParameters:{className:B,width:350},okLabel:"close"})},getClassOfWindow:function(E){var C=E||"mac_os_x";if(this.isIE()){var B=this.getBrowserData();var D=B.split(" : ");var A=parseFloat(D[1]);if(A<7){C="alphacube"}}return C}};