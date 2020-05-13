/*
 *
 */
if (HTML5 == null || typeof(HTML5) == "undefined") { var HTML5 = new Object(); }
HTML5.init = {
  
  isPage: function(pageName) {
    if ( pageName == null || pageName.length == 0 ) { return false; }
    
    var docURL = null;
    if (document.getElementById) { docURL = document.URL; }
    else { docURL = window.location; }
    
    if ( docURL != null )
    {
      var pagelocation = docURL.toLowerCase();
      pageName = pageName.toLowerCase();
      if ( pagelocation.indexOf(pageName) > -1 )
      {
        return true;
      }
    }
    return false;
  },
  injectSPAN_IE: function() {
    if( jQuery.browser.msie && parseInt(jQuery.browser.version) <= 7 ) {
      var liList = $("ul#features li").each(function() {
            $(this).append("<span class='ie'>&nbsp;</span>");
          });
    }
  },
  
  identityCrisis: function () {
      // JQuery: Some versions of IE7 have an identity crisis,
      // it may think it is ie6, correct the body tag
    if( jQuery.browser.msie && parseInt(jQuery.browser.version) == 7 ) {
      var ie6BodyTag = $("body.ie6").addClass("ie7").removeClass("ie6");
    }
    return false;
  },
//   identityCrisis: function() {
//       // Prototype: Some versions of IE7 have an identity crisis,
//       // it may think it is ie6, correct the body tag
//     var ie7Browser = (Prototype.Browser.IE &&
//                       parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5)) == 7);
//     if( ie7Browser ) {
//       var ie6BodyTag = $$("body.ie6");
//       if( (ie6BodyTag != null) && (ie6BodyTag.length >  0 )) {
//         ie6BodyTag[0].addClassName("ie7");
//         ie6BodyTag[0].removeClassName("ie6");
//       }
//     }
//     return false;
    
//   },

  processPPTSelection: function() {
    var results = document.cookie.match ( '(^|;) ?' + "shortVersion" + '=([^;]*)(;|$)' );

    if ( results ) {
      var value = unescape ( results[2] );
      if ( value == "true" ) {
        $("ol#demoList").addClass("abridged");
      }
      else {
        $("ol#demoList").removeClass("abridged");
      }
    }
    return;
  },
  setPPTSelection: function(abridgedVersion) {

    cookieExpire = new Date();
    cookieExpire.setTime(cookieExpire.getTime() + (60 * 60 * 5)); // 5 hours
    document.cookie =  'shortVersion=' + escape(abridgedVersion) + "; " + (typeof cookieExpire == 'date' ? 'expires=' + cookieExpire.toGMTString() : '') + '; path=/;';

    this.processPPTSelection();
  },
  initAllDemos: function() {
    this.injectSPAN_IE();
    this.identityCrisis();
    this.intro();
    this.demo1();
      // No JavaScript for Demo_02
      // No JavaScript for Demo_03
    this.demo4();
    this.demo5();
    this.demo6();
      // No JavaScript for Demo_07
    this.demo8();
    this.demo9();
      // No JavaScript for Demo_10
    this.demo11();
    this.demo12();
      // No JavaScript for Demo_Finally
  },
  intro: function() {
      // we do not know if the user is accepting server redirect, so look for an existing ID on the intro page.
    var nodeExists = $("#pptLong");
    var introPageValid = ( nodeExists != null && nodeExists.length > 0 );
    if ( ! introPageValid ) { return; }

    $("a.pptItem").click(function() {
          var itemID = this.id;
          HTML5.init.setPPTSelection(("pptShort" == itemID));
        });
    
    HTML5.init.processPPTSelection();
  },
  demo1: function() {
    if(this.isPage("demos_01") != true) { return; }
    HTML5.DragDrop.init();
  },
  demo4: function() {
    if(this.isPage("demos_04") != true) { return; }
    $("div#cssBox.divideBrowser").addClass(function() {
          if ( $.browser.webkit ) {
            return "webkit";
          }
          else {
            return "mozilla";
          }
        });
    $("div.redSlider.cssgradients").slider({ min: 0, max: 255, step: 1, value: 0,
              slide: HTML5.Demos.setGradColors, change: HTML5.Demos.setGradColors });
    $("div.greenSlider.cssgradients").slider({ min: 0, max: 255, step: 1, value: 0,
              slide: HTML5.Demos.setGradColors, change: HTML5.Demos.setGradColors });
    $("div.blueSlider.cssgradients").slider({ min: 0, max: 255, step: 1, value: 255,
              slide: HTML5.Demos.setGradColors, change: HTML5.Demos.setGradColors });
    $("#pointGradient").change(HTML5.Demos.setGradColors);
    $("#webkitPointGradient").change(HTML5.Demos.setGradColors);
    $("#webkitPointStop").change(HTML5.Demos.setGradColors);
  },
  demo5: function() {
    if(this.isPage("demos_05") != true) { return; }
    $("div#cssBox.divideBrowser").addClass(function() {
          if ( $.browser.webkit ) {
            return "webkit";
          }
          else {
            return "mozilla";
          }
        });
    $("div.redSlider.cssgradients").slider({ min: 0, max: 255, step: 1, value: 0,
              slide: HTML5.Demos.setRadialColors, change: HTML5.Demos.setRadialColors });
    $("div.greenSlider.cssgradients").slider({ min: 0, max: 255, step: 1, value: 0,
              slide: HTML5.Demos.setRadialColors, change: HTML5.Demos.setRadialColors });
    $("div.blueSlider.cssgradients").slider({ min: 0, max: 255, step: 1, value: 255,
              slide: HTML5.Demos.setRadialColors, change: HTML5.Demos.setRadialColors });
    $("#pointGradient").change(HTML5.Demos.setRadialColors);
    $("#mozPosX").change(HTML5.Demos.setRadialColors);
    $("#mozPosY").change(HTML5.Demos.setRadialColors);
    
    $("#webkitPosX").change(HTML5.Demos.setRadialColors);
    $("#webkitPosY").change(HTML5.Demos.setRadialColors);
    $("#webkitRadius").change(HTML5.Demos.setRadialColors);
    
  },
  demo6: function() {
    if(this.isPage("demos_06") != true) { return; }

    $("div.textXSlider.cssTextShadowPos").slider({ min: -20, max: 20, step: 1, value: 0,
              slide: HTML5.Demos.setTextShadowColor, change: HTML5.Demos.setTextShadowColor });
    $("div.textYSlider.cssTextShadowPos").slider({ min: -20, max: 20, step: 1, value: 0,
              slide: HTML5.Demos.setTextShadowColor, change: HTML5.Demos.setTextShadowColor });
    $("div.textRadiusSlider.cssTextShadowPos").slider({ min: 0, max: 10, step: 1, value: 0,
              slide: HTML5.Demos.setTextShadowColor, change: HTML5.Demos.setTextShadowColor });

    $("div.redSlider.cssTextShadow").slider({ min: 0, max: 255, step: 1, value: 255,
              slide: HTML5.Demos.setTextShadowColor, change: HTML5.Demos.setTextShadowColor });
    $("div.greenSlider.cssTextShadow").slider({ min: 0, max: 255, step: 1, value: 255,
              slide: HTML5.Demos.setTextShadowColor, change: HTML5.Demos.setTextShadowColor });
    $("div.blueSlider.cssTextShadow").slider({ min: 0, max: 255, step: 1, value: 255,
              slide: HTML5.Demos.setTextShadowColor, change: HTML5.Demos.setTextShadowColor });
    $("div.alphaSlider.cssTextShadow").slider({ min: 0, max: 100, step: 1, value: 100,
              slide: HTML5.Demos.setTextShadowColor, change: HTML5.Demos.setTextShadowColor });
    
    
  },
  demo8: function() {
    if(HTML5.init.isPage("demos_08") != true) { return; }
    $('#field2').keyup(HTML5.Demos.validateInput);
  },
 demo9: function() {
    if(HTML5.init.isPage("demos_09") != true) { return; }

    $("#ariaSlider").slider({ 
          min: 1, max: 5, step: 1, value: 2,
              slide: HTML5.Demos.updateAria, change: HTML5.Demos.updateAria });
      //Assign current value & slider role to this UI Element
    var sliderHandle = $("#ariaSlider").children('.ui-slider-handle');
    var value = $("#ariaSlider").slider("value");
    sliderHandle.attr('role', 'slider');
    sliderHandle.attr('aria-valuenow',value);
    sliderHandle.attr('aria-valuetext', value + ' columns' );
  },
  demo11: function() {
    if(this.isPage("demos_11") != true) { return; }
    HTML5.GeoLocationOffer.init();
  },
  demo12: function(){
    if(HTML5.init.isPage("demos_12") != true) { return; }
    $('body').addClass("svgDemo");
      //Set actions when user interacts with bars
    $('.bar').click(HTML5.Demos.graphPopout);
    $('.focusLabel').click(HTML5.Demos.accessibleGraphPopout);
    $('.bar').mouseover(HTML5.Demos.graphHighlight);
    $('.bar').mouseout(HTML5.Demos.graphHighlightOff);
      //Hide details for each bar by default - these are shown based on bar click.
    $('.itemDetails').hide();
    $('.popupClose').click(HTML5.Demos.closeGraphPopout);
      // Adding in ZOOM Capabilities
    
    InitPanAndZoom("svgGraph");
  }  
  
};

HTML5.Demos = {
  previx: "",

  toHex: function(numb) {
    if (numb==null) return "00";
    numb=parseInt(numb);
    if (numb==0 || isNaN(numb)) return "00";
    
    numb=Math.max(0,numb);
    numb=Math.min(numb,255);
    numb=Math.round(numb);
    return "0123456789ABCDEF".charAt((numb-numb % 16) / 16) + "0123456789ABCDEF".charAt(numb % 16);
  },
  
  RGBtoHex: function(r,g,b) {
    return this.toHex(r) + this.toHex(g) + this.toHex(b)
  },
  setTextShadowColor: function() {
    var rColor =  $("#sliderTextShadowColor div.redSlider.cssTextShadow").slider("value");
    var gColor =  $("#sliderTextShadowColor div.greenSlider.cssTextShadow").slider("value");
    var bColor =  $("#sliderTextShadowColor div.blueSlider.cssTextShadow").slider("value");
    var aColor = parseInt($("#sliderTextShadowColor div.alphaSlider.cssTextShadow").slider("value")) / 100;
    $("#rColor").html(rColor);
    $("#gColor").html(gColor);
    $("#bColor").html(bColor);
    $("#aColor").html(aColor);

    var xPos = $("#sliderTextShadowPosition div.textXSlider.cssTextShadowPos").slider("value");
    var yPos = $("#sliderTextShadowPosition div.textYSlider.cssTextShadowPos").slider("value");
    var rPos = $("#sliderTextShadowPosition div.textRadiusSlider.cssTextShadowPos").slider("value");
    $("#xPos").html(xPos);
    $("#yPos").html(yPos);
    $("#rPos").html(rPos);
    
    var brColor =  $("#sliderBoxShadowColor div.redSlider.cssTextShadow").slider("value");
    var bgColor =  $("#sliderBoxShadowColor div.greenSlider.cssTextShadow").slider("value");
    var bbColor =  $("#sliderBoxShadowColor div.blueSlider.cssTextShadow").slider("value");
    var baColor = parseInt($("#sliderBoxShadowColor div.alphaSlider.cssTextShadow").slider("value")) / 100;
    $("#brColor").html(brColor);
    $("#bgColor").html(bgColor);
    $("#bbColor").html(bbColor);
    $("#baColor").html(baColor);
    
    var bxPos = $("#sliderBoxShadowPosition div.textXSlider.cssTextShadowPos").slider("value");
    var byPos = $("#sliderBoxShadowPosition div.textYSlider.cssTextShadowPos").slider("value");
    var brPos = $("#sliderBoxShadowPosition div.textRadiusSlider.cssTextShadowPos").slider("value");
    $("#bxPos").html(bxPos);
    $("#byPos").html(byPos);
    $("#brPos").html(brPos);

    var coolShadow = "text-shadow: "+xPos+"px "+yPos+"px "+rPos+"px rgba("+rColor+","+gColor+","+bColor+","+aColor+");";
    $("#coolShadows").attr('style', coolShadow);

    var col1 = HTML5.Demos.RGBtoHex(rColor, gColor, bColor);
    var col2 = HTML5.Demos.RGBtoHex(rColor, gColor, bColor-204);
    var col3 = HTML5.Demos.RGBtoHex(rColor, gColor-34, bColor-204);
    var col4 = HTML5.Demos.RGBtoHex(rColor, gColor-119, bColor-255);
    var col5 = HTML5.Demos.RGBtoHex(rColor, gColor-221, bColor-255);

    var hotShadow = "text-shadow: "+
    " "+xPos+"px "+yPos+"px 4px #"+col1+", "+
    " "+xPos+"px "+(yPos-5)+"px 4px #"+col2+", "+
    " "+(xPos+2)+"px "+(yPos-10)+"px 6px #"+col3+", "+
    " "+(xPos-2)+"px "+(yPos-15)+"px 11px #"+col4+", "+
    " "+(xPos+2)+"px "+(yPos-25)+"px 18px #"+col5+";";
    $("#hotShadows").attr('style', hotShadow);

    var boxShadow = "box-shadow: "+bxPos+"px "+byPos+"px "+brPos+"px rgba("+brColor+","+bgColor+","+bbColor+","+baColor+");";
    $("#shadowBox").attr('style', HTML5.Demos.prefix+boxShadow);
  },
  
  setGradColors: function() {

    var angle = $("#pointGradient").val();
    var webkitangle = $("#webkitPointGradient").val();
    var webkitstop = $("#webkitPointStop").val();
    
    var fromRed =  $("#sliderFromColor div.redSlider.cssgradients").slider("value");
    var fromGreen =  $("#sliderFromColor div.greenSlider.cssgradients").slider("value");
    var fromBlue =  $("#sliderFromColor div.blueSlider.cssgradients").slider("value");
    var fromHEXColor = "#" + HTML5.Demos.RGBtoHex(fromRed, fromGreen, fromBlue);
    $("#fromColorValue").html(fromHEXColor);
    $("#fromColorValueWebkit").html(fromHEXColor);
    
    
    var toRed =  $("#sliderToColor div.redSlider.cssgradients").slider("value");
    var toGreen =  $("#sliderToColor div.greenSlider.cssgradients").slider("value");
    var toBlue =  $("#sliderToColor div.blueSlider.cssgradients").slider("value");
    var toHEXColor = "#" + HTML5.Demos.RGBtoHex(toRed, toGreen, toBlue);
    $("#toColorValue").html(toHEXColor);
    $("#toColorValueWebkit").html(toHEXColor);
      // Process Mozilla
    var gradientTwoColor = "background: -moz-linear-gradient( "+angle+", "+fromHEXColor+", "+toHEXColor+");";
    var gradientFourColor = "background: -moz-linear-gradient( "+angle+", "+fromHEXColor+", "+toHEXColor+", "+fromHEXColor+");";
      // Process Webkit
    gradientTwoColor += " background: -webkit-gradient(linear, "+webkitangle+", "+webkitstop+", from("+fromHEXColor+"), to("+toHEXColor+"));";
    gradientFourColor += " background: -webkit-gradient(linear, "+webkitangle+", "+webkitstop+", from("+fromHEXColor+"),  color-stop(50%,"+toHEXColor+"), to("+fromHEXColor+"));";
    
    $("#twoColor").attr('style', gradientTwoColor);
    $("#fourColor").attr('style', gradientFourColor);
    
  },
  setRadialColors: function() {

    var angle = $("#pointGradient").val();
    var mozPosX = $("#mozPosX").val();
    var mozPosY = $("#mozPosY").val();

    var webkitRadius = $("#webkitRadius").val();
    var webkitPosX = $("#webkitPosX").val();
    var webkitPosY = $("#webkitPosY").val();
    $("#wkPosX2").html(webkitPosX);
    $("#wkPosY2").html(webkitPosY);
    
    var fromRed =  $("#sliderFromColor div.redSlider.cssgradients").slider("value");
    var fromGreen =  $("#sliderFromColor div.greenSlider.cssgradients").slider("value");
    var fromBlue =  $("#sliderFromColor div.blueSlider.cssgradients").slider("value");
    var fromHEXColor = "#" + HTML5.Demos.RGBtoHex(fromRed, fromGreen, fromBlue);
    $("#fromColorValue").html(fromHEXColor);
    $("#fromColorValueWebkit").html(fromHEXColor);
    
    
    var toRed =  $("#sliderToColor div.redSlider.cssgradients").slider("value");
    var toGreen =  $("#sliderToColor div.greenSlider.cssgradients").slider("value");
    var toBlue =  $("#sliderToColor div.blueSlider.cssgradients").slider("value");
    var toHEXColor = "#" + HTML5.Demos.RGBtoHex(toRed, toGreen, toBlue);
    $("#toColorValue").html(toHEXColor);
    $("#toColorValueWebkit").html(toHEXColor);
      // Process Mozilla
    var gradientTwoColor = "background: -moz-radial-gradient("+mozPosX+" "+mozPosY+", circle "+angle+", "+fromHEXColor+",  "+toHEXColor+");";
    var gradientFourColor = "background: -moz-radial-gradient("+mozPosX+" "+mozPosY+", circle "+angle+", "+fromHEXColor+",  "+toHEXColor+", "+fromHEXColor+");";
    var gradientSphere = "background: -moz-radial-gradient(50% 50%,circle contain, "+fromHEXColor+","+toHEXColor+" 75%,rgba(255,255,255,0));";
      // Process Webkit

    
    gradientTwoColor += " background: -webkit-gradient(radial, "+webkitPosX+" "+webkitPosY+", "+(parseInt(webkitRadius/2))+", "+webkitPosX+" "+webkitPosY+", "+webkitRadius+", from("+fromHEXColor+"), to("+toHEXColor+"));";
    gradientFourColor += " background: -webkit-gradient(radial, "+webkitPosX+" "+webkitPosY+", "+(parseInt(webkitRadius/2))+", "+webkitPosX+" "+webkitPosY+", "+webkitRadius+", from("+fromHEXColor+"), color-stop(50%,"+toHEXColor+"), to("+fromHEXColor+"));";
    gradientSphere += " background: -webkit-gradient(radial,50% 50%,5,50% 50%,"+webkitRadius+",from("+fromHEXColor+"),color-stop(75%, "+toHEXColor+"),to(rgba(255,255,255,0)));";
    
    $("#twoColor").attr('style', gradientTwoColor);
    $("#fourColor").attr('style', gradientFourColor);
    $("#radialSphere").attr('style', gradientSphere);
    
  },

    /*Function added for Glenn ARIA Demos*/
  validateInput: function(){
    if($("#field2").val().length > 5){
      $("#field2").attr('aria-invalid', 'true');
      $("#invalidInd").html('true');
    }
    else{
      $("#field2").attr('aria-invalid', 'false');
      $("#invalidInd").html('false');
    }
  },
  updateAria: function(valuenow, valuetext){
    var value = $("#ariaSlider").slider("value");
    $(".colcount").html(value);
    $(".coltext").html(' column' + ((value > 1 ) ? 's' : ''));
    $("#affectedContent.columnLayout").attr('style', HTML5.Demos.prefix+"column-count: " + value);
    
      //Update ARIA attributes
    var sliderHandle = $("#ariaSlider").children('.ui-slider-handle');
    sliderHandle.attr('aria-valuenow', value);
    sliderHandle.attr('aria-valuetext', value + ' column' + ((value > 1) ? 's' : '') );
    sliderHandle.attr('role', 'slider');
    
  },
graphPopout: function(event){
    var detailsKeyword = "Details";
    //hide any existing details
    $('.itemDetails').hide('fast');
    //display details relating to bar that user clicked
    $('#' + event.target.id + detailsKeyword).show('fast');
  },
  accessibleGraphPopout: function(event){
    event.preventDefault();
    alert("Work in progress. These X Axis labels will provide accessible information for this SVG chart");
  },
  closeGraphPopout: function(event){
    event.preventDefault();
    $('.itemDetails').hide('fast');
  },
  graphHighlight: function(event){
    var currBar = $('#' + event.target.id);
    currBar.attr('fill-opacity', '0.6');
  },
  graphHighlightOff: function(event){
    var currBar = $('#' + event.target.id);
    currBar.attr('fill-opacity', '1');
  }  
};

// generic add event for james' code below
var addEvent=(function(){if(document.addEventListener){return function(el,type,fn){if(el&&el.nodeName||el===window){el.addEventListener(type,fn,false);}else if(el&&el.length){for(var i=0;i<el.length;i++){addEvent(el[i],type,fn);}}};}else{return function(el,type,fn){if(el&&el.nodeName||el===window){el.attachEvent('on'+type,function(){return fn.call(el,window.event);});}else if(el&&el.length){for(var i=0;i<el.length;i++){addEvent(el[i],type,fn);}}};}})();

HTML5.DragDrop = {
  drop: document.getElementById('drop'),
  drag: document.getElementById('drag'),
  data: document.getElementById('data'),
  tts: document.getElementById('tts'),
  speech: document.getElementById('speechBubble'),
  elementDragged: null,
  init: function() {
    var dragElements = document.querySelectorAll('a.draggable');
    for (var i = 0; i < dragElements.length; i++) {
      // add draggable attribute
      dragElements[i].setAttribute('draggable', 'true');
      // once dragging fire this event
      addEvent(dragElements[i], 'dragstart', function (e) {
        HTML5.DragDrop.elementDragged = this.id;
        e.dataTransfer.effectAllowed='copy';
        var tmp = $("#"+HTML5.DragDrop.elementDragged).html();
        HTML5.DragDrop.tts.src = 'http://translate.google.com/translate_tts?tl=en&q=' + tmp;
      });
    }
    // allows us to dragover/enter our drop div (dustbin)
    addEvent(HTML5.DragDrop.drop, 'dragover', function (e) { 
      // make call to cancel default events firing
      HTML5.DragDrop.cancel(e);
    });
    // IE needs this one...
    addEvent(HTML5.DragDrop.drop, 'dragenter', function (e) { 
          HTML5.DragDrop.cancel(e);
    });  
    addEvent(HTML5.DragDrop.drop, 'drop', function (e) {
      // once elements dropped over target - make call to cancel default events firing
      HTML5.DragDrop.cancel(e);
      // update the grouch
      HTML5.DragDrop.data.innerHTML = e.dataTransfer.getData('text/html');
      HTML5.DragDrop.data.className = HTML5.DragDrop.elementDragged;
      var tmp = $("#"+HTML5.DragDrop.elementDragged).html();
//      HTML5.DragDrop.data.childNodes[0].className = HTML5.DragDrop.elementDragged;
//      HTML5.DragDrop.tts.src = 'http://translate.google.com/translate_tts?tl=en&q=' +HTML5.DragDrop.data.childNodes[0].innerHTML;
//      HTML5.DragDrop.speech.innerHTML = '<p>'+HTML5.DragDrop.data.childNodes[0].innerHTML +'</p>';
      HTML5.DragDrop.tts.src = 'http://translate.google.com/translate_tts?tl=en&q=' + tmp;
      HTML5.DragDrop.speech.innerHTML = '<p>'+tmp +'</p>';
      HTML5.DragDrop.drop.setAttribute('tabindex', '-1'); 
      setTimeout('HTML5.DragDrop.drop.focus();', 500); // this will call transition
    });
  },
  cancel: function(e) {
    if (e.preventDefault) e.preventDefault(); // required by FF + Safari
    return false; // required by IE  
  }
};

HTML5.GeoLocationOffer = {
  userLocation: null,
  googleMap: null,
  map: document.getElementById('map'),
  offer: [],
  lastOffer: null,
  diningChk: document.getElementById('showOffersDining'),
  genericOffers: [
    ['California Pizza Kitchen', 'Guests who purchase $100 in gift cards receive a $20 Rewards Card. During the holidays, reward yourself with a CPK gift card. When you purchase $100 in California Pizza Kitchen Gift Cards with any American Joyride Card, well give you a $20 Rewards Card. ', './resrc/cpk-offer.png'], 
    ['Uno Chicago Grill', 'Enjoy 15% off your food purchase of $40 or more at Uno Chicago Grill. UNO is famous for inventing Deep Dish Pizza in Chicago back in 1943. Today, over 65 years later, you can still enjoy our handcrafted Deep Dish Pizza with its flaky, buttery crust made fresh each and every morning in every restaurant. ', './resrc/uno-offer.png'], 
    ['Marina Cafe', 'Print this offer and present it to your server to receive 15% off your meal. At Marina Caf&eacute;, it is all about sensational food, attentive service and breathtaking Destin Harbor views. ', './resrc/mk-offer.png'], 
    ['Landmark Grill and Lounge', '15% off your bill. Landmark Grill + Lounge, located right across from the Steppenwolf Theatre, and in the heart of Lincoln Park, serves upscale American comfort food with a twist. Landmark was awarded 3 Stars by Mobil Travel Guide in 2009, and Best New Restaurant in 2006 by Chicago Magazine.', './resrc/lm-offer.png'], 
    ['Texas De Brazil', 'Texas de Brazil is a Brazilian Steakhouse, featuring 70+ item salad and sushi area, continuous service of sizzling cuts of beef, chicken, lamb, pork and sausage served tableside by a troop of carvers with long sword-like skewers.', './resrc/tb-offer.png'], 
    ['Circle K', 'Hans you can get a free Coffee at Circle K.', './resrc/km-offer.png'], 
    ['The Pineapple Grill', 'Complimentary appetizer or dessert with purchase of entr&eacute;e. Receive a complimentary dessert with purchase of entr&eacute;e, one dessert per person', './resrc/pa-offer.png']
  ], 
  init:function() {
    // test to find if they are allowing location
    if (Modernizr.geolocation) { navigator.geolocation.getCurrentPosition(HTML5.GeoLocationOffer.generateUserPositionMap, HTML5.GeoLocationOffer.error); } 
    else { } // no support    
    // make onclick assign reference to offers
    HTML5.GeoLocationOffer.diningChk.onclick = function () { 
      if (!HTML5.GeoLocationOffer.diningChk.checked) {
        // remove offers
        for (i in HTML5.GeoLocationOffer.offer) {
          HTML5.GeoLocationOffer.offer[i].marker.setMap(null);
        }
      } else {
        // then add some offers    
        HTML5.GeoLocationOffer.addOffers();          
      }      
    };
  },
  generateUserPositionMap:function(position){
    // set user location globally
    HTML5.GeoLocationOffer.userLocation = position;

    // generate map based on the user location
    var latlng = new google.maps.LatLng(HTML5.GeoLocationOffer.userLocation.coords.latitude, HTML5.GeoLocationOffer.userLocation.coords.longitude);
    var mapOptions = {
      zoom: 15,
      center: latlng,
      mapTypeControl: false,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };    
    HTML5.GeoLocationOffer.googleMap = new google.maps.Map(HTML5.GeoLocationOffer.map, mapOptions);
    var marker = new google.maps.Marker({ position: latlng, map: HTML5.GeoLocationOffer.googleMap,  title:"This is your current location" });

    // call to setup detailed information about location
    HTML5.GeoLocationOffer.detailedLocationInformation();
  },
  addOffers:function(){
    // watch for map boundary change (meaning map loaded) and add more PIN     
    /* google.maps.event.addListener(HTML5.GeoLocationOffer.googleMap, "bounds_changed", function() { */
      // generate PIN location at random
      var bounds = HTML5.GeoLocationOffer.googleMap.getBounds();
      var southWest = bounds.getSouthWest();
      var northEast = bounds.getNorthEast();
      var lngSpan = northEast.lng() - southWest.lng();
      var latSpan = northEast.lat() - southWest.lat();      
     
      // add PIN to map
      for (i in HTML5.GeoLocationOffer.genericOffers) {
        var point = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(), southWest.lng() + lngSpan * Math.random());
        var marker = new google.maps.Marker({ position: point, map: HTML5.GeoLocationOffer.googleMap,  title: HTML5.GeoLocationOffer.genericOffers[i][0], icon: HTML5.GeoLocationOffer.genericOffers[i][2] });                
        HTML5.GeoLocationOffer.offer[i] = new Object;
        HTML5.GeoLocationOffer.offer[i].marker = marker;
        HTML5.GeoLocationOffer.offer[i].infoWindow = new google.maps.InfoWindow({ maxWidth: 200, content: '<div class="bubble"><h2><span>' +HTML5.GeoLocationOffer.genericOffers[i][0] +'</span></h2><span class="offerInfo">' +HTML5.GeoLocationOffer.genericOffers[i][1] +"</span><p>Brought to you by <a href=\"#\">American Joyride Selects</a></p></div>" });
        HTML5.GeoLocationOffer.offer[i].listener = HTML5.GeoLocationOffer.toggleInformationWindow(i, HTML5.GeoLocationOffer.offer[i].marker);        
      } 
      // remove bound changed event so we only get our offers added once 
      google.maps.event.clearListeners(HTML5.GeoLocationOffer.googleMap, 'bounds_changed');
    /*}); No longer needed as done on click of checkbox now */
  },
  detailedLocationInformation:function(){
    var latitude = '<strong>Latitude:</strong> ' +HTML5.GeoLocationOffer.userLocation.coords.latitude; // double decimal degrees
    var longitude = '<br /><strong>Longitude:</strong> ' +HTML5.GeoLocationOffer.userLocation.coords.longitude; // double ecimal degrees
    var accuracy = '<br /><strong>Accuracy:</strong> ' +HTML5.GeoLocationOffer.userLocation.coords.accuracy; // double meters
    var altitude = '<br /><strong>Altitude:</strong> ' +HTML5.GeoLocationOffer.userLocation.coords.altitude; // double meters above reference episodial
    var altitudeAccurace = '<br /><strong>Altitude Accurace:</strong> ' +HTML5.GeoLocationOffer.userLocation.coords.altitudeAccuracy;  // double meters
    var heading = '<br /><strong>Heading:</strong> ' +HTML5.GeoLocationOffer.userLocation.coords.heading; // double degrees clockwise from true north
    var speed = '<br /><strong>Speed:</strong> ' +HTML5.GeoLocationOffer.userLocation.coords.speed; // double meters/second
    var timestamp = '<br /><strong>Timestamp:</strong> ' +HTML5.GeoLocationOffer.userLocation.timestamp; // DOMTimeStamp like a Date() object 
    
    document.querySelector('#locationDetail').innerHTML += latitude +longitude +accuracy +altitude +altitudeAccurace +heading +speed +timestamp;    
  },
  openInformation:function(i){ 
    // close window if were not seeing previous one opened    
    if (HTML5.GeoLocationOffer.lastOffer !== null) {
      HTML5.GeoLocationOffer.offer[HTML5.GeoLocationOffer.lastOffer].infoWindow.close();
    } 
    // setup vars for previous and open new window
    HTML5.GeoLocationOffer.lastOffer = i;    
    HTML5.GeoLocationOffer.offer[i].infoWindow.open(HTML5.GeoLocationOffer.googleMap,HTML5.GeoLocationOffer.offer[i].marker);     
  },
  toggleInformationWindow:function(i, marker){ 
    var listener = google.maps.event.addListener(marker, 'click', function() {
      HTML5.GeoLocationOffer.openInformation(i);   // call open which deals with close also
    });
    return listener;  
  },
  error:function(err){
    var text = "";
    switch (err.code) {
      case err.PERMISSION_DENIED: // user said no: 1: PERMISSION_DENIED
      text = "User Said no to GEO Location";
      break;
      case err.POSITION_UNAVAILABLE: // network down, sattelites not available: 2: POSITION_UNAVAILABLE
      text = "Network is down, Satellites not available";
      break;
      case err.TIMEOUT: // Network up, but time to calcualte too long: 3, TIMEOUT
      text = "Timeout, network is up, but too long to calculate";
      break;
      case err.UNKNOWN_ERROR: // 0: UNKNOWN_ERROR: 
      text = "Something went wrong in Denmark, unknown error";
      break;
      default: // really wierd
      text = "Something Wierd ocurred=["+err.code+"]";
      break;
    }
    document.querySelector('#mapArea').className = 'failed';
    document.querySelector('#status').innerHTML = "Location Failed, " + text;
  }  
};


$(document).ready(function() {
      var prefix = "";
      prefix = ($.browser.webkit) ? "-webkit-" : prefix;
      prefix = ($.browser.opera) ? "-o-" : prefix;
      prefix = ($.browser.mozilla) ? "-moz-" : prefix;
      prefix = ($.browser.msie) ? "-ms-" : prefix;
      HTML5.Demos.prefix = prefix;
      HTML5.init.initAllDemos();
      
  });
