
if (CCL == null || typeof(CCL) == "undefined") { var CCL = new Object(); }
//var isStartedBy = null;

/********************************************
*       Utility Functions
*********************************************/
CCL.Utils = {
  pad: function(s) {
    return ('00' + s.toString(16).toUpperCase()).slice(-2);
  },
  
  convertRGB_HSV: function(r, g, b) {
      /**
       * Converts RGB to HSV value. The coordinate system of HSV is cylindrical, and the colors are defined
       * inside a hexcone. The hue value H runs from 0 to 360º. The saturation S is the degree of strength
       * or purity and is from 0 to 1. Purity is how much white is added to the color, so S=1 makes
       * the purest color (no white). Brightness V also ranges from 0 to 1, where 0 is the black.
       *
       * @param {Integer} r Red value, 0-255
       * @param {Integer} g Green value, 0-255
       * @param {Integer} b Blue value, 0-255
       * @returns {Array} The HSV values EG: [h,s,v], [0-360 degrees, 0-100%, 0-100%]
       */

    var r = (r / 255),
    g = (g / 255),
    b = (b / 255);    
    
    var min = Math.min(Math.min(r, g), b),
    max = Math.max(Math.max(r, g), b),
    delta = max - min;
    
    var value = max,    // Value defined
    saturation,
    hue;
    
      // Hue Defined
    if (max == min) {
      hue = 0;
    } else if (max == r) {
      hue = (60 * ((g-b) / (max-min))) % 360;
    } else if (max == g) {
      hue = 60 * ((b-r) / (max-min)) + 120;
    } else if (max == b) {
      hue = 60 * ((r-g) / (max-min)) + 240;
    }
    
    if (hue < 0) {
      hue += 360;
    }
    
      // Saturation Defined
    if (max == 0) {
      saturation = 0;
    } else {
      saturation = 1 - (min/max);
    }
    
    return [Math.round(hue), Math.round(saturation * 100), Math.round(value * 100)];
  },
  convertHSV_RGB: function(h,s,v) {
      /**
       * Converts HSV to RGB value.  onverts a hue-saturation-value (HSV) colormap to a
       * red-green-blue (RGB) colormap. H is the number of poistion in the cone colormap
       * colors in the colormap. saturation is the strength or purty - meaning how much
       * white is added to the color. Value is the brightness [0-100%] where 0 is black
       * respectively. 
       *
       * @param {Integer} h Hue as a value between 0 - 360 degrees
       * @param {Integer} s Saturation as a value between 0 - 100 %
       * @param {Integer} v Value as a value between 0 - 100 %
       * @returns {Array} The RGB values  EG: [r,g,b], [255,255,255]
       */
    
    var s = s / 100,
    v = v / 100;

    var hi = Math.floor((h/60) % 6);
    var f = (h / 60) - hi;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    
    var rgb = [];
    
    switch (hi) {
      case 0: rgb = [v,t,p];break;
      case 1: rgb = [q,v,p];break;
      case 2: rgb = [p,v,t];break;
      case 3: rgb = [p,q,v];break;
      case 4: rgb = [t,p,v];break;
      case 5: rgb = [v,p,q];break;
    }
    
    var r = Math.min(255, Math.round(rgb[0]*256)),
    g = Math.min(255, Math.round(rgb[1]*256)),
    b = Math.min(255, Math.round(rgb[2]*256));
    
    return [r,g,b];
    
  },
  
  formatFloat: function(pFloat, precision, suffix) {
    if ( precision < 1 ) {
      precision = 1;
    }

    var denom = Math.pow(10, precision);
    pFloat = parseInt(pFloat * denom)/denom;
    
    return pFloat + ( suffix ? suffix : "" );
  },
  getQueryParam: function( name )
  {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null || results.indexOf("undefined") > -1 ) {
      return null;
    }
    else {
      return results[1];
    }
  },
  closeTwiggie: function(node) {
    if( "string" == typeof(node) ) {
      node = document.getElementById(node);
    }
    var nodeToAction = node.getAttribute('value');
    var actionNode = document.getElementById(nodeToAction);
    if ( actionNode.className.indexOf('twiggieContentClosed') == -1 ) {
      CCL.Utils.removeClass(node, 'twiggieControlOpen');
      CCL.Utils.addClass(actionNode, 'twiggieContentClosed');
    }
  },
  openTwiggie: function(node) {
    if( "string" == typeof(node) ) {
      node = document.getElementById(node);
    }
    var nodeToAction = node.getAttribute('value');
    var actionNode = document.getElementById(nodeToAction);
    if ( actionNode.className.indexOf('twiggieContentClosed') > -1 ) {
      CCL.Utils.addClass(node, 'twiggieControlOpen');
      CCL.Utils.removeClass(actionNode, 'twiggieContentClosed');
    }
  },
  toggleTwiggie: function(node) {
    var nodeToAction = node.getAttribute('value');
    var actionNode = document.getElementById(nodeToAction);
    if ( actionNode.className.indexOf('twiggieContentClosed') > -1 ) {
      CCL.Utils.openTwiggie(node);
    }
    else {
      CCL.Utils.closeTwiggie(node);
    }
  },
  removeClass: function( nodeID, className ) {
    if( "string" != typeof(nodeID) ) {
      nodeID = nodeID.id;
    }
    var node = document.getElementById(nodeID);
    calssName = " " + className;
    node.className = node.className.replace(className,"");
  },
  addClass: function( nodeID, className) {
    if( "string" != typeof(nodeID) ) {
      nodeID = nodeID.id;
    }
    var node = document.getElementById(nodeID);
    if( node.className != null &&  node.className.indexOf(className) == -1 )
    {
      node.className += " " + className;
    }
  },
  clearClassNameValidFromResults: function() {
    var topNode = document.getElementById("resultbox");
    var inputList = topNode.getElementsByTagName("input");
    for( var i=0; inputList != null && i < inputList.length; i++ ) {
      var node = inputList[i];
      node.className = node.className.replace(' valid',"");
    }
  },
  getCheckedValue: function(radioObj) {
    if(!radioObj) { return ""; }
    var radioLength = radioObj.length;
    if(radioLength == undefined) {
      if(radioObj.checked) {
        return radioObj.value;
      }
      else {
        return "";
      }
    }
    for(var i = 0; i < radioLength; i++) {
      if(radioObj[i].checked) {
        return radioObj[i].value;
      }
    }
    return "";
  },
  setColorsObj: function(red, green, blue) {
    var colorObj = {};
    colorObj.red = red;
    colorObj.green = green;
    colorObj.blue = blue;
    return colorObj;
  }
  
};
CCL.Update = {
  isStartedBy : null,

  HSVSliders: function(prefix, hsv) {
    var p = prefix;
    window[p + 'Hue'].setValue(hsv[0]);
    window[p + 'Saturation'].setValue(hsv[1]);
    window[p + 'Value'].setValue(hsv[2]);                 
  },
  RGBSliders: function(prefix, rgb) {
    var p = prefix;
    window[p + 'Red'].setValue(rgb[0]);
    window[p + 'Green'].setValue(rgb[1]);
    window[p + 'Blue'].setValue(rgb[2]);     
  },
  ColorValue: function(prefix) {
    document.getElementById(prefix + 'Color').value = 
    CCL.Utils.pad(window[prefix + 'Red'].getValue()) +
    CCL.Utils.pad(window[prefix + 'Green'].getValue()) +
    CCL.Utils.pad(window[prefix + 'Blue'].getValue());
  },
  SampleTextStyle: function(nodeID, fontSize, fontUnit, fontWeight) {
    fontSize += (fontUnit.indexOf("pixel") > -1) ? "px" : "pt";
    var node = document.getElementById(nodeID);
    node.style.fontSize = fontSize;
    node.style.fontWeight = fontWeight;
  },
  inputColorChange: function(node, updateResults) {
    var v = node.value.toUpperCase();

    var fg_bg_prefix = ( node.id.indexOf("fgColor") > -1 ) ? "fg" : "bg";
    
    if(/^[0-9A-F]{3}$|^[0-9A-F]{6}$/.test(v) ){
      if(v.length == 3) {
        v = v.match(/[0-9A-F]/g);
        v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
        this.value = v;
      }
      
      var r = parseInt(v.substr(0,2),16);
      var g = parseInt(v.substr(2,2),16);
      var b = parseInt(v.substr(4,2),16); 
      CCL.Update.RGBSliders(fg_bg_prefix, [r,g,b]);
    }
    if( updateResults == false ) { return; }
    CCL.Update.ColorResults();
    
  },
  RGBChange: function( fg_bg_prefix ) {
    if (!this.isStartedBy) {
      this.isStartedBy = 'rgb';
    }
    if (this.isStartedBy == 'rgb') {
      var r = (fg_bg_prefix == 'fg') ? fgRed.getValue() : bgRed.getValue();
      var g = (fg_bg_prefix == 'fg') ? fgGreen.getValue() : bgGreen.getValue();
      var b = (fg_bg_prefix == 'fg') ? fgBlue.getValue() : bgBlue.getValue();
      var hsv = CCL.Utils.convertRGB_HSV(r,g,b);
      CCL.Update.HSVSliders(fg_bg_prefix, hsv);
      CCL.Update.ColorResults();
      CCL.Update.ColorValue(fg_bg_prefix);
      this.isStartedBy = null;
    }             
  },
  HSVChange: function( fg_bg_prefix ) {
    if (!this.isStartedBy) {
      this.isStartedBy = 'hsv';
    }
    if (this.isStartedBy == 'hsv') {
      var h = (fg_bg_prefix == 'fg') ? fgHue.getValue() : bgHue.getValue();
      var s = (fg_bg_prefix == 'fg') ? fgSaturation.getValue() : bgSaturation.getValue();;
      var v = (fg_bg_prefix == 'fg') ? fgValue.getValue() : bgValue.getValue();;
      var rgb = CCL.Utils.convertHSV_RGB(h,s,v);  
      CCL.Update.RGBSliders(fg_bg_prefix, rgb);
      CCL.Update.ColorResults();
      CCL.Update.ColorValue(fg_bg_prefix);
      this.isStartedBy = null;
    }
  },
  
  ColorResults: function(){
    CCL.Utils.clearClassNameValidFromResults();

      // Collect input values from Dashboard
    var wcag2Level = CCL.Utils.getCheckedValue(document.forms['wcagUnitForm'].elements['wcagLevel']);
    document.getElementById("spec-level").innerHTML = (wcag2Level.indexOf("2a") > -1) ? "AA" : "AAA";
      // Font Size & Unit
    var fontSize = parseInt(document.getElementById("fontsize").value);
    var fontUnit = CCL.Utils.getCheckedValue(document.forms['fontUnitForm'].elements['px-pt']);
    fontUnit = (fontUnit == null || fontUnit.length == 0) ? "pixel" : fontUnit;
      // 72pt per inch, 96px per inch (number*72pt/96px)
    var fontPointSize = fontSize; // Default the value, get converted in the condition
    CCL.Utils.addClass("cnvtFont", "dispNone");
    if ( fontUnit.indexOf("pixel") > -1 ) {
      fontPointSize = Math.round(parseFloat(fontSize)*72/96);
      document.getElementById("cnvtFont").innerHTML = "("+fontPointSize+"pt)";
      CCL.Utils.removeClass("cnvtFont", "dispNone");
    }
      // Font Weight
    var tmpFontWeight = document.getElementById("fontWeight").value; // Default the value
    var fontWeight = tmpFontWeight;
    if ( typeof tmpFontWeight ==  "string" && tmpFontWeight.indexOf("bold") > -1)
    {
      fontWeight = ((tmpFontWeight.indexOf("bolder") > -1) ? 900 : 700);
    }
    document.getElementById("specWeight").innerHTML = (fontWeight >= 700) ? "bold" : "normal";
  
      // Set sample text in dashboard to desired style
    CCL.Update.SampleTextStyle("viewresult", fontSize, fontUnit, fontWeight );

    fontSize += (fontUnit != null && fontUnit.indexOf("pixel") > -1) ? "px" : "pt";
    document.getElementById("specFont").innerHTML = fontSize;

      // Determine the Colors
    var colorStyles = {};
    colorStyles["bgColor"] = CCL.Utils.setColorsObj(bgRed.getValue(), bgGreen.getValue(), bgBlue.getValue());
    colorStyles["fgColor"] = CCL.Utils.setColorsObj(fgRed.getValue(), fgGreen.getValue(), fgBlue.getValue());

    var foregroundColorRGBsz = "rgb(" + colorStyles["fgColor"].red + "," +
    colorStyles["fgColor"].green + "," +
    colorStyles["fgColor"].blue + ")";
    var backgroundColorRGBsz = "rgb(" + colorStyles["bgColor"].red + "," +
    colorStyles["bgColor"].green + "," +
    colorStyles["bgColor"].blue + ")";
      // update preview
    var fcr = document.getElementById("fcolor-result");
    fcr.style.backgroundColor = foregroundColorRGBsz;
    document.getElementById("sample-text").style.color = foregroundColorRGBsz;
                        
    var bcr = document.getElementById("bcolor-result");
    bcr.style.backgroundColor = backgroundColorRGBsz;
    document.getElementById("sample-text").style.backgroundColor = backgroundColorRGBsz;
  
        
      // perform calculations covering the WCAG 1
    var brightnessThreshold = 125;
    var colorThreshold = 500;

    var bY=((colorStyles["bgColor"].red * 299) + (colorStyles["bgColor"].green * 587) + (colorStyles["bgColor"].blue * 114)) / 1000;
    var fY=((colorStyles["fgColor"].red * 299) + (colorStyles["fgColor"].green * 587) + (colorStyles["fgColor"].blue * 114)) / 1000;
    var brightnessDifference = Math.abs(bY-fY);

    var colorDifference = ((Math.max (colorStyles["fgColor"].red, colorStyles["bgColor"].red) -
                            Math.min (colorStyles["fgColor"].red, colorStyles["bgColor"].red)) +
                           (Math.max (colorStyles["fgColor"].green, colorStyles["bgColor"].green) -
                            Math.min (colorStyles["fgColor"].green, colorStyles["bgColor"].green)) +
                           (Math.max (colorStyles["fgColor"].blue, colorStyles["bgColor"].blue) -
                            Math.min (colorStyles["fgColor"].blue, colorStyles["bgColor"].blue)));

    document.getElementById("bDiff").value = parseFloat(CCL.Utils.formatFloat(brightnessDifference,2));
    document.getElementById("cDiff").value = parseFloat(CCL.Utils.formatFloat(colorDifference,2));
    CCL.Utils.addClass("bDiff", ((brightnessDifference>=brightnessThreshold)? "valid": ""));
    CCL.Utils.addClass("cDiff", ((colorDifference>=colorThreshold)? "valid": ""));

    if ((brightnessDifference >= brightnessThreshold) && (colorDifference >= colorThreshold))     {
      document.getElementById("cResult").value = "YES"; // compliant
      CCL.Utils.addClass("cResult", "valid");
    }else if ((brightnessDifference >= brightnessThreshold) || (colorDifference >= colorThreshold)){
      document.getElementById("cResult").value = "Sorry....."; // sort of compliant
    }else{ // not compliant "Poor visibility between text and background colors."
      document.getElementById("cResult").value = "NO"; 
    }


      // Perform calculations covering the WCAG 2
    var RsRGB = {};
    var GsRGB = {};
    var BsRGB = {};

    var RsRGB_2 = {};
    var GsRGB_2 = {};
    var BsRGB_2 = {};
  
    var Lrgb = {};
  
    for ( i in colorStyles )
    {
      RsRGB[i] = colorStyles[i].red / 255;
      GsRGB[i] = colorStyles[i].green / 255;
      BsRGB[i] = colorStyles[i].blue / 255;

      RsRGB_2[i] = ((RsRGB[i] <= 0.03928) ? (RsRGB[i]/12.92) : (Math.pow(((RsRGB[i]+0.055) / 1.055), 2.4)));
      GsRGB_2[i] = ((GsRGB[i] <= 0.03928) ? (GsRGB[i]/12.92) : (Math.pow(((GsRGB[i]+0.055) / 1.055), 2.4)));
      BsRGB_2[i] = ((BsRGB[i] <= 0.03928) ? (BsRGB[i]/12.92) : (Math.pow(((BsRGB[i]+0.055) / 1.055), 2.4)));

      Lrgb[i] = (RsRGB_2[i] * 0.2126) + (GsRGB_2[i] * 0.7152) +(BsRGB_2[i] * 0.0722);
    }
  
    var luminanceValue = ((Math.max(Lrgb["fgColor"],Lrgb["bgColor"]) + 0.05) /
                          (Math.min(Lrgb["fgColor"],Lrgb["bgColor"]) + 0.05));

      // Format the float to decimal places, and cast as a float. 
    luminanceValue = parseFloat(CCL.Utils.formatFloat(luminanceValue,2));
    var ratio = luminanceValue;

      // Update the result box with the appriate values
    document.getElementById('contrastratio').value = ratio;
    document.getElementById('w2-14Normal').value = (ratio >= 4.5 ? 'YES' : 'NO');
    document.getElementById('w2-14Bold').value = (ratio >= 3.0 ? 'YES' : 'NO');
    document.getElementById('w2-18Normal').value = (ratio >= 3.0 ? 'YES' : 'NO');
    document.getElementById('w2a-14Normal').value = (ratio >= 7.0 ? 'YES' : 'NO');
    document.getElementById('w2a-14Bold').value = (ratio >= 4.5 ? 'YES' : 'NO');
    document.getElementById('w2a-18Normal').value = (ratio >= 4.5 ? 'YES' : 'NO');
  
    var wcag2HighThreshold = (wcag2Level.indexOf("2a") > -1) ? 4.5 : 7.0;
    var wcag2LowThreshold = (wcag2Level.indexOf("2a") > -1) ? 3.0 : 4.5;
    var sampleResultPass = ((( fontPointSize >= 18 ) && (ratio >= wcag2LowThreshold )) ||
                            (( fontPointSize >= 14 ) && (fontPointSize < 18 ) &&
                             (fontWeight >= 700 ) && (ratio >= wcag2LowThreshold)) ||
                            (( fontPointSize < 18 ) && (ratio >= wcag2HighThreshold) ) );

    var ratioThreshold = (((( fontPointSize >= 14 ) && (fontPointSize < 18 ) && (fontWeight >= 700 )) ||
                           ( fontPointSize >= 18 ) ) ? wcag2LowThreshold : wcag2HighThreshold ) + ":1";
    
    CCL.Utils.addClass("contrastratio", ((sampleResultPass == true)? "valid": ""));
    document.getElementById("symbol").innerHTML = ((sampleResultPass)? "&gt;": "&lt;");
    document.getElementById("ratioThreshold").innerHTML = ratioThreshold;
  
    CCL.Utils.addClass("w2-14Normal", ((ratio>=4.5)? "valid": ""));
    CCL.Utils.addClass("w2-14Bold", ((ratio>=3.0)? "valid": ""));
    CCL.Utils.addClass("w2-18Normal", ((ratio>=3.0)? "valid": ""));
    CCL.Utils.addClass("w2a-14Normal", ((ratio>=7)? "valid": ""));
    CCL.Utils.addClass("w2a-14Bold", ((ratio>=4.5)? "valid": ""));
    CCL.Utils.addClass("w2a-18Normal", ((ratio>=4.5)? "valid": ""));
      // Update the Preview with the pass fail
    CCL.Utils.addClass("sample-result", ((sampleResultPass)? "valid": ""));
    document.getElementById("sample-result").innerHTML = ((sampleResultPass)? "PASS": "FAIL");

      // Open and close Twiggies
    CCL.Utils.closeTwiggie(((wcag2Level.indexOf("3a") > -1) ? "AA-rule-group" : "AAA-rule-group" ));
    CCL.Utils.openTwiggie(((wcag2Level.indexOf("2a") > -1) ? "AA-rule-group" : "AAA-rule-group" ));
      // CCL.Utils.closeTwiggie("priority2-rule-group");
  }
  
};

function Timer(nPauseTime) {
  this._pauseTime = typeof nPauseTime == "undefined" ? 1000 : nPauseTime;
  this._timer = null;
  this._isStarted = false;
}

Timer.prototype.start = function () {
  if (this.isStarted())
  this.stop();
  var oThis = this;
  this._timer = window.setTimeout(function () {
        if (typeof oThis.ontimer == "function")
        oThis.ontimer();
      }, this._pauseTime);
  this._isStarted = false;
};

Timer.prototype.stop = function () {
  if (this._timer != null)
  window.clearTimeout(this._timer);
  this._isStarted = false;
};

Timer.prototype.isStarted = function () {
  return this._isStarted;
};

Timer.prototype.getPauseTime = function () {
  return this._pauseTime;
};

Timer.prototype.setPauseTime = function (nPauseTime) {
  this._pauseTime = nPauseTime;
};

function Range() {
  this._value = 0;
  this._minimum = 0;
  this._maximum = 100;
  this._extent = 0;
        
  this._isChanging = false;
}

Range.prototype.setValue = function (value) {
  value = parseInt(value);
  if (isNaN(value)) return;
  if (this._value != value) {
    if (value + this._extent > this._maximum)
    this._value = this._maximum - this._extent;
    else if (value < this._minimum)
    this._value = this._minimum;
    else
    this._value = value;
    if (!this._isChanging && typeof this.onchange == "function")
    this.onchange();
  }
};

Range.prototype.getValue = function () {
  return this._value;
};

Range.prototype.setExtent = function (extent) {
  if (this._extent != extent) {
    if (extent < 0)
    this._extent = 0;
    else if (this._value + extent > this._maximum)
    this._extent = this._maximum - this._value;
    else
    this._extent = extent;
    if (!this._isChanging && typeof this.onchange == "function")
    this.onchange();
  }
};

Range.prototype.getExtent = function () {
  return this._extent;
};

Range.prototype.setMinimum = function (minimum) {
  if (this._minimum != minimum) {
    var oldIsChanging = this._isChanging;
    this._isChanging = true;

    this._minimum = minimum;
                
    if (minimum > this._value)
    this.setValue(minimum);
    if (minimum > this._maximum) {
      this._extent = 0;
      this.setMaximum(minimum);
      this.setValue(minimum)
          }
    if (minimum + this._extent > this._maximum)
    this._extent = this._maximum - this._minimum;

    this._isChanging = oldIsChanging;
    if (!this._isChanging && typeof this.onchange == "function")
    this.onchange();
  }
};

Range.prototype.getMinimum = function () {
  return this._minimum;
};

Range.prototype.setMaximum = function (maximum) {
  if (this._maximum != maximum) {
    var oldIsChanging = this._isChanging;
    this._isChanging = true;

    this._maximum = maximum;            
                
    if (maximum < this._value)
    this.setValue(maximum - this._extent);
    if (maximum < this._minimum) {
      this._extent = 0;
      this.setMinimum(maximum);
      this.setValue(this._maximum);
    }           
    if (maximum < this._minimum + this._extent)
    this._extent = this._maximum - this._minimum;
    if (maximum < this._value + this._extent)
    this._extent = this._maximum - this._value;
                
    this._isChanging = oldIsChanging;
    if (!this._isChanging && typeof this.onchange == "function")
    this.onchange();
  }
};

Range.prototype.getMaximum = function () {
  return this._maximum;
};

/*************************************/

Slider.isSupported = typeof document.createElement != "undefined" &&
    typeof document.documentElement != "undefined" &&
    typeof document.documentElement.offsetWidth == "number";


function Slider(oElement, oInput, sOrientation) {
  if (!oElement) return;
  this._orientation = sOrientation || "horizontal";
  this._range = new Range();
  this._range.setExtent(0);
  this._blockIncrement = 10;
  this._unitIncrement = 1;
  this._timer = new Timer(100);


  if (Slider.isSupported && oElement) {

    this.document = oElement.ownerDocument || oElement.document;

    this.element = oElement;
    this.element.slider = this;
    this.element.unselectable = "on";

      // add class name tag to class name
    this.element.className = this._orientation + " " + this.classNameTag + " " + this.element.className;

      // create line
    this.line = this.document.createElement("DIV");
    this.line.className = "line";
    this.line.unselectable = "on";
    this.line.appendChild(this.document.createElement("DIV"));
    this.element.appendChild(this.line);

      // create handle
    this.handle = this.document.createElement("DIV");
    this.handle.className = "handle";
    this.handle.unselectable = "on";
    this.handle.appendChild(this.document.createElement("DIV"));
    this.handle.firstChild.appendChild(
        this.document.createTextNode(String.fromCharCode(160)));
    this.element.appendChild(this.handle);
  }

  this.input = oInput;

    // events
  var oThis = this;
  this._range.onchange = function () {
    oThis.recalculate();
    if (typeof oThis.onchange == "function")
    oThis.onchange();
  };

  if (Slider.isSupported && oElement) {
    this.element.onfocus        = Slider.eventHandlers.onfocus;
    this.element.onblur         = Slider.eventHandlers.onblur;
    this.element.onmousedown    = Slider.eventHandlers.onmousedown;
    this.element.onmouseover    = Slider.eventHandlers.onmouseover;
    this.element.onmouseout     = Slider.eventHandlers.onmouseout;
    this.element.onkeydown      = Slider.eventHandlers.onkeydown;
    this.element.onkeypress     = Slider.eventHandlers.onkeypress;
    this.element.onmousewheel   = Slider.eventHandlers.onmousewheel;
    this.handle.onselectstart   = this.element.onselectstart = function () { return false; };

    this._timer.ontimer = function () { oThis.ontimer(); };

      // extra recalculate for ie
    window.setTimeout(function() {
          oThis.recalculate();
        }, 1);
  }
  else {
    this.input.onchange = function (e) { oThis.setValue(oThis.input.value); };
  }
}

Slider.eventHandlers = {

    // helpers to make events a bit easier
  getEvent:     function (e, el) {
    if (!e) {
      if (el) {
        e = el.document.parentWindow.event;
      }
      else {
        e = window.event;
      }
    }
    if (!e.srcElement) {
      var el = e.target;
      while (el != null && el.nodeType != 1) {
        el = el.parentNode;
      }
      e.srcElement = el;
    }
    if (typeof e.offsetX == "undefined") {
      e.offsetX = e.layerX;
      e.offsetY = e.layerY;
    }

    return e;
  },

  getDocument:  function (e) {
    if (e.target) {
      return e.target.ownerDocument;
    }
    return e.srcElement.document;
  },

  getSlider:    function (e) {
    var el = e.target || e.srcElement;
    while (el != null && el.slider == null) {
      el = el.parentNode;
    }
    if (el) {
      return el.slider;
    }
    return null;
  },

  getLine:      function (e) {
    var el = e.target || e.srcElement;
    while (el != null && el.className != "line") {
      el = el.parentNode;
    }
    return el;
  },

  getHandle:    function (e) {
    var el = e.target || e.srcElement;
    var re = /handle/;
    while (el != null && !re.test(el.className)) {
      el = el.parentNode;
    }
    return el;
  },
    // end helpers

  onfocus:      function (e) {
    var s = this.slider;
    s._focused = true;
    s.handle.className = "handle hover";
  },

  onblur:       function (e) {
    var s = this.slider
    s._focused = false;
    s.handle.className = "handle";
  },

  onmouseover:  function (e) {
    e = Slider.eventHandlers.getEvent(e, this);
    var s = this.slider;
    if (e.srcElement == s.handle) {
      s.handle.className = "handle hover";
    }
  },

  onmouseout:   function (e) {
    e = Slider.eventHandlers.getEvent(e, this);
    var s = this.slider;
    if (e.srcElement == s.handle && !s._focused) {
      s.handle.className = "handle";
    }
  },

  onmousedown:  function (e) {
    e = Slider.eventHandlers.getEvent(e, this);
    var s = this.slider;
    if (s.element.focus) {
      s.element.focus();
    }

    Slider._currentInstance = s;
    var doc = s.document;

    if (doc.addEventListener) {
      doc.addEventListener("mousemove", Slider.eventHandlers.onmousemove, true);
      doc.addEventListener("mouseup", Slider.eventHandlers.onmouseup, true);
    }
    else if (doc.attachEvent) {
      doc.attachEvent("onmousemove", Slider.eventHandlers.onmousemove);
      doc.attachEvent("onmouseup", Slider.eventHandlers.onmouseup);
      doc.attachEvent("onlosecapture", Slider.eventHandlers.onmouseup);
      s.element.setCapture();
    }

    if (Slider.eventHandlers.getHandle(e)) {    // start drag
      Slider._sliderDragData = {
        screenX:        e.screenX,
        screenY:        e.screenY,
        dx:             e.screenX - s.handle.offsetLeft,
        dy:             e.screenY - s.handle.offsetTop,
        startValue:     s.getValue(),
        slider:         s
      };
    }
    else {
      var lineEl = Slider.eventHandlers.getLine(e);
      s._mouseX = e.offsetX + (lineEl ? s.line.offsetLeft : 0);
      s._mouseY = e.offsetY + (lineEl ? s.line.offsetTop : 0);
      s._increasing = null;
      s.ontimer();
    }
  },

  onmousemove:  function (e) {
    e = Slider.eventHandlers.getEvent(e, this);

    if (Slider._sliderDragData) {       // drag
      var s = Slider._sliderDragData.slider;

      var boundSize = s.getMaximum() - s.getMinimum();
      var size, pos, reset;

      if (s._orientation == "horizontal") {
        size = s.element.offsetWidth - s.handle.offsetWidth;
        pos = e.screenX - Slider._sliderDragData.dx;
        reset = Math.abs(e.screenY - Slider._sliderDragData.screenY) > 100;
      }
      else {
        size = s.element.offsetHeight - s.handle.offsetHeight;
        pos = s.element.offsetHeight - s.handle.offsetHeight -
            (e.screenY - Slider._sliderDragData.dy);
        reset = Math.abs(e.screenX - Slider._sliderDragData.screenX) > 100;
      }
      s.setValue(reset ? Slider._sliderDragData.startValue :
                 s.getMinimum() + boundSize * pos / size);
      return false;
    }
    else {
      var s = Slider._currentInstance;
      if (s != null) {
        var lineEl = Slider.eventHandlers.getLine(e);
        s._mouseX = e.offsetX + (lineEl ? s.line.offsetLeft : 0);
        s._mouseY = e.offsetY + (lineEl ? s.line.offsetTop : 0);
      }
    }

  },

  onmouseup:    function (e) {
    e = Slider.eventHandlers.getEvent(e, this);
    var s = Slider._currentInstance;
    var doc = s.document;
    if (doc.removeEventListener) {
      doc.removeEventListener("mousemove", Slider.eventHandlers.onmousemove, true);
      doc.removeEventListener("mouseup", Slider.eventHandlers.onmouseup, true);
    }
    else if (doc.detachEvent) {
      doc.detachEvent("onmousemove", Slider.eventHandlers.onmousemove);
      doc.detachEvent("onmouseup", Slider.eventHandlers.onmouseup);
      doc.detachEvent("onlosecapture", Slider.eventHandlers.onmouseup);
      s.element.releaseCapture();
    }

    if (Slider._sliderDragData) {       // end drag
      Slider._sliderDragData = null;
    }
    else {
      s._timer.stop();
      s._increasing = null;
    }
    Slider._currentInstance = null;
  },

  onkeydown:    function (e) {
    e = Slider.eventHandlers.getEvent(e, this);
      //var s = Slider.eventHandlers.getSlider(e);
    var s = this.slider;
    var kc = e.keyCode;
    switch (kc) {
      case 33:  // page up
        s.setValue(s.getValue() + s.getBlockIncrement());
        break;
      case 34:  // page down
        s.setValue(s.getValue() - s.getBlockIncrement());
        break;
      case 35:  // end
        s.setValue(s.getOrientation() == "horizontal" ?
                   s.getMaximum() :
                   s.getMinimum());
        break;
      case 36:  // home
        s.setValue(s.getOrientation() == "horizontal" ?
                   s.getMinimum() :
                   s.getMaximum());
        break;
      case 38:  // up
      case 39:  // right
        s.setValue(s.getValue() + s.getUnitIncrement());
        break;

      case 37:  // left
      case 40:  // down
        s.setValue(s.getValue() - s.getUnitIncrement());
        break;
    }

    if (kc >= 33 && kc <= 40) {
      return false;
    }
  },

  onkeypress:   function (e) {
    e = Slider.eventHandlers.getEvent(e, this);
    var kc = e.keyCode;
    if (kc >= 33 && kc <= 40) {
      return false;
    }
  },

  onmousewheel: function (e) {
    e = Slider.eventHandlers.getEvent(e, this);
    var s = this.slider;
    if (s._focused) {
      s.setValue(s.getValue() + e.wheelDelta / 120 * s.getUnitIncrement());
        // windows inverts this on horizontal sliders. That does not
        // make sense to me
      return false;
    }
  }
};



Slider.prototype.classNameTag = "dynamic-slider-control",

Slider.prototype.setValue = function (v) {
  this._range.setValue(v);
  this.input.value = this.getValue();
};

Slider.prototype.getValue = function () {
  return this._range.getValue();
};

Slider.prototype.setMinimum = function (v) {
  this._range.setMinimum(v);
  this.input.value = this.getValue();
};

Slider.prototype.getMinimum = function () {
  return this._range.getMinimum();
};

Slider.prototype.setMaximum = function (v) {
  this._range.setMaximum(v);
  this.input.value = this.getValue();
};

Slider.prototype.getMaximum = function () {
  return this._range.getMaximum();
};

Slider.prototype.setUnitIncrement = function (v) {
  this._unitIncrement = v;
};

Slider.prototype.getUnitIncrement = function () {
  return this._unitIncrement;
};

Slider.prototype.setBlockIncrement = function (v) {
  this._blockIncrement = v;
};

Slider.prototype.getBlockIncrement = function () {
  return this._blockIncrement;
};

Slider.prototype.getOrientation = function () {
  return this._orientation;
};

Slider.prototype.setOrientation = function (sOrientation) {
  if (sOrientation != this._orientation) {
    if (Slider.isSupported && this.element) {
        // add class name tag to class name
      this.element.className = this.element.className.replace(this._orientation,
                                                              sOrientation);
    }
    this._orientation = sOrientation;
    this.recalculate();

  }
};

Slider.prototype.recalculate = function() {
  if (!Slider.isSupported || !this.element) return;

  var w = this.element.offsetWidth;
  var h = this.element.offsetHeight;
  var hw = this.handle.offsetWidth;
  var hh = this.handle.offsetHeight;
  var lw = this.line.offsetWidth;
  var lh = this.line.offsetHeight;

    // this assumes a border-box layout

  if (this._orientation == "horizontal") {
    this.handle.style.left = (w - hw) * (this.getValue() - this.getMinimum()) /
        (this.getMaximum() - this.getMinimum()) + "px";
    this.handle.style.top = (h - hh) / 2 + "px";

    this.line.style.top = (h - lh) / 2 + "px";
    this.line.style.left = hw / 2 + "px";
      //this.line.style.right = hw / 2 + "px";
    this.line.style.width = Math.max(0, w - hw - 2)+ "px";
    this.line.firstChild.style.width = Math.max(0, w - hw - 4)+ "px";
  }
  else {
    this.handle.style.left = (w - hw) / 2 + "px";
    this.handle.style.top = h - hh - (h - hh) * (this.getValue() - this.getMinimum()) /
    (this.getMaximum() - this.getMinimum()) + "px";

    this.line.style.left = (w - lw) / 2 + "px";
    this.line.style.top = hh / 2 + "px";
    this.line.style.height = Math.max(0, h - hh - 2) + "px";    //hard coded border width
      //this.line.style.bottom = hh / 2 + "px";
    this.line.firstChild.style.height = Math.max(0, h - hh - 4) + "px"; //hard coded border width
  }
};

Slider.prototype.ontimer = function () {
  var hw = this.handle.offsetWidth;
  var hh = this.handle.offsetHeight;
  var hl = this.handle.offsetLeft;
  var ht = this.handle.offsetTop;

  if (this._orientation == "horizontal") {
    if (this._mouseX > hl + hw &&
        (this._increasing == null || this._increasing)) {
      this.setValue(this.getValue() + this.getBlockIncrement());
      this._increasing = true;
    }
    else if (this._mouseX < hl &&
             (this._increasing == null || !this._increasing)) {
      this.setValue(this.getValue() - this.getBlockIncrement());
      this._increasing = false;
    }
  }
  else {
    if (this._mouseY > ht + hh &&
        (this._increasing == null || !this._increasing)) {
      this.setValue(this.getValue() - this.getBlockIncrement());
      this._increasing = false;
    }
    else if (this._mouseY < ht &&
             (this._increasing == null || this._increasing)) {
      this.setValue(this.getValue() + this.getBlockIncrement());
      this._increasing = true;
    }
  }

  this._timer.start();
};

/******************************************************
*       Create and Initialize Sliders
*******************************************************/
var fgRed = new Slider(document.getElementById("fgRed-slider"), document.getElementById("fgRed-slider-input"));
fgRed.setMaximum(255);
var fgGreen = new Slider(document.getElementById("fgGreen-slider"), document.getElementById("fgGreen-slider-input"));
fgGreen.setMaximum(255);
var fgBlue = new Slider(document.getElementById("fgBlue-slider"), document.getElementById("fgBlue-slider-input"));
fgBlue.setMaximum(255);

var fgHue = new Slider(document.getElementById("fgHue-slider"), document.getElementById("fgHue-slider-input"));
fgHue.setMaximum(360);
var fgSaturation = new Slider(document.getElementById("fgSaturation-slider"), document.getElementById("fgSaturation-slider-input"));
fgSaturation.setMaximum(100);
var fgValue = new Slider(document.getElementById("fgValue-slider"), document.getElementById("fgValue-slider-input"));
fgValue.setMaximum(100);

var bgRed = new Slider(document.getElementById("bgRed-slider"), document.getElementById("bgRed-slider-input"));
bgRed.setMaximum(255);
var bgGreen = new Slider(document.getElementById("bgGreen-slider"), document.getElementById("bgGreen-slider-input"));
bgGreen.setMaximum(255);
var bgBlue = new Slider(document.getElementById("bgBlue-slider"), document.getElementById("bgBlue-slider-input"));
bgBlue.setMaximum(255);

var bgHue = new Slider(document.getElementById("bgHue-slider"), document.getElementById("bgHue-slider-input"));
bgHue.setMaximum(360);
var bgSaturation = new Slider(document.getElementById("bgSaturation-slider"), document.getElementById("bgSaturation-slider-input"));
bgSaturation.setMaximum(100);
var bgValue = new Slider(document.getElementById("bgValue-slider"), document.getElementById("bgValue-slider-input"));
bgValue.setMaximum(100);

/******************************************************
*       Change Events & Click Events for form controls
*******************************************************/

var AA_ruleGroup = document.getElementById("AA-rule-group").onclick = function() { CCL.Utils.toggleTwiggie(this); }
var AAA_ruleGroup = document.getElementById("AAA-rule-group").onclick = function() { CCL.Utils.toggleTwiggie(this); }
var priority2_ruleGroup = document.getElementById("priority2-rule-group").onclick = function() { CCL.Utils.toggleTwiggie(this); }

var inputFontSize = document.getElementById("fontsize").onchange = function () { CCL.Update.ColorResults(); };
var inputFontWeight = document.getElementById("fontWeight").onchange = function () { CCL.Update.ColorResults(); };
var radioPXUnit = document.getElementById("pxUnit").onchange = function () { CCL.Update.ColorResults(); };
var radioPTUnit = document.getElementById("ptUnit").onchange = function () { CCL.Update.ColorResults(); };
var radioLevel2a = document.getElementById("level2a").onchange = function () { CCL.Update.ColorResults(); };
var radioLevel3a = document.getElementById("level3a").onchange = function () { CCL.Update.ColorResults(); };


var inputForegroundColor = document.getElementById("fgColor");
var inputBackgroundColor = document.getElementById("bgColor");

inputForegroundColor.onchange = function (updateResults) {  CCL.Update.inputColorChange(this,updateResults); };
inputBackgroundColor.onchange = function (updateResults) {  CCL.Update.inputColorChange(this,updateResults); };

fgRed.onchange = fgGreen.onchange = fgBlue.onchange = function() { CCL.Update.RGBChange('fg') };
bgRed.onchange = bgGreen.onchange = bgBlue.onchange = function() { CCL.Update.RGBChange('bg') };
fgHue.onchange = fgSaturation.onchange = fgValue.onchange = function() { CCL.Update.HSVChange('fg'); };
bgHue.onchange = bgSaturation.onchange = bgValue.onchange = function() { CCL.Update.HSVChange('bg'); };
    
/******************************************************
*       Init the Startup Colors and Fonts on the page
*******************************************************/
// set initial colors
inputForegroundColor.value = 'FFFFFF';
inputBackgroundColor.value = '6699CE';
inputForegroundColor.onchange();
inputBackgroundColor.onchange();

function processQueryString() {
  var fgcolor = CCL.Utils.getQueryParam('fg') || 'FFFFFF';
  var bgcolor = CCL.Utils.getQueryParam('bg') || '6699CE';
  var size = CCL.Utils.getQueryParam('size') || '20';
  var unit = CCL.Utils.getQueryParam('unit') || 'px';
  var weight = CCL.Utils.getQueryParam('weight') || '400';
  var wcag = CCL.Utils.getQueryParam('wcag') || 'level2a';

  
  unit += "Unit";
  document.getElementById(unit).checked = "checked";
  document.getElementById(wcag).checked = "checked";
  document.getElementById('fontsize').value = size;
  document.getElementById('fontWeight').value = weight;
  document.getElementById('bgColor').value = bgcolor;
  document.getElementById('fgColor').value = fgcolor;

  inputForegroundColor.value = fgcolor;
  inputBackgroundColor.value = bgcolor;
  inputForegroundColor.onchange(false);
  inputBackgroundColor.onchange(false);

  CCL.Update.ColorResults();
  
}
function colorContrastLoadEvent() {
  fgRed.recalculate();
  fgGreen.recalculate();
  fgBlue.recalculate();
  bgRed.recalculate();
  bgGreen.recalculate();
  bgBlue.recalculate();

  fgHue.recalculate();
  fgSaturation.recalculate();
  fgValue.recalculate();
  bgHue.recalculate();
  bgSaturation.recalculate();
  bgValue.recalculate();
}
// Capture any previous Load events and Rock & Roll
var previousOnload = window.onload;
window.onload = function() {
  if(previousOnload) {
    previousOnload();
  }
  colorContrastLoadEvent();
  setTimeout(processQueryString, 100);
}

    
