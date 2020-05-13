
/**************************************************
 * dom-drag.js
 * 09.25.2001
 * www.youngpup.net
 * Script featured on Dynamic Drive (http://www.dynamicdrive.com) 12.08.2005
 **************************************************
 * 10.28.2001 - fixed minor bug where events
 * sometimes fired off the handle, not the root.
 **************************************************/
var Drag = {

  obj : null,

  init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
  {
    o.onmousedown	= Drag.start;

    o.hmode			= bSwapHorzRef ? false : true ;
    o.vmode			= bSwapVertRef ? false : true ;

    o.root = oRoot && oRoot != null ? oRoot : o ;

    if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
    if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
    if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
    if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

    o.minX	= typeof minX != 'undefined' ? minX : null;
    o.minY	= typeof minY != 'undefined' ? minY : null;
    o.maxX	= typeof maxX != 'undefined' ? maxX : null;
    o.maxY	= typeof maxY != 'undefined' ? maxY : null;

    o.xMapper = fXMapper ? fXMapper : null;
    o.yMapper = fYMapper ? fYMapper : null;

    o.root.onDragStart	= new Function();
    o.root.onDragEnd	= new Function();
    o.root.onDrag		= new Function();
  },

  start : function(e)
  {
    var o = Drag.obj = this;
    e = Drag.fixE(e);
    var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
    var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
    o.root.onDragStart(x, y);

    o.lastMouseX	= e.clientX;
    o.lastMouseY	= e.clientY;

    if (o.hmode) {
      if (o.minX != null)	o.minMouseX	= e.clientX - x + o.minX;
      if (o.maxX != null)	o.maxMouseX	= o.minMouseX + o.maxX - o.minX;
    } else {
      if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
      if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
    }

    if (o.vmode) {
      if (o.minY != null)	o.minMouseY	= e.clientY - y + o.minY;
      if (o.maxY != null)	o.maxMouseY	= o.minMouseY + o.maxY - o.minY;
    } else {
      if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
      if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
    }

    document.onmousemove	= Drag.drag;
    document.onmouseup		= Drag.end;

    return false;
  },

  drag : function(e)
  {
    e = Drag.fixE(e);
    var o = Drag.obj;

    var ey	= e.clientY;
    var ex	= e.clientX;
    var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
    var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
    var nx, ny;

    if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
    if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
    if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
    if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

    nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
    ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

    if (o.xMapper)		nx = o.xMapper(y)
    else if (o.yMapper)	ny = o.yMapper(x)

                            Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
    Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
    Drag.obj.lastMouseX	= ex;
    Drag.obj.lastMouseY	= ey;

    Drag.obj.root.onDrag(nx, ny);
    return false;
  },

  end : function()
  {
    document.onmousemove = null;
    document.onmouseup   = null;
    Drag.obj.root.onDragEnd(	parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
                                parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
    Drag.obj = null;
  },

  fixE : function(e)
  {
    if (typeof e == 'undefined') e = window.event;
    if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
    if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
    return e;
  }
};

//	globals
var svgScale;
var scaleFactor;
var originalWrapWidth;
var originalWrapHeight;
var wrapWrapWidth;
var wrapWrapHeight;

var rxLength = /^(\d+\.\d*|\d*\.\d+|\d+)(px|in|cm)?$/;

//var SVG_WRAP = "democontainer";
//var SVG_WRAP_CONT = "cssBox";
var SVG_WRAP_CONT = "democontainer";
var SVG_WRAP = "svgwrap";

function GetLengthValue(s)
 {
   if (s != null)
   {
     var m = rxLength.exec(s);
		
     if (m != null)
     {
       var w = parseFloat(m[1]);
			
         //	do inches conversion
       if (m[2] == "in")
       w *= 96;
       else if (m[2] == "cm")
       w = w * 96 / 2.54;
			
       return w;
     }
   }

   return null;
 }

function InitPanAndZoom(svgId, noWheel) {
  if (typeof svgId == 'undefined' || svgId == null)
  svgId = "thesvg";

    //	use svgId parameter in the future
  var svgElement = document.getElementById(svgId);
  if (!svgElement)
  {
    window.alert("Cannot getElementById(\"" + svgId + "\")");
    return;
  }

  var svgWidth = GetLengthValue(svgElement.getAttribute("width"));
  if (svgWidth == null)
  {
    window.alert("Cannot get or parse width attribute of element \"" + svgId + "\"");
    return;
  }

  var svgHeight = GetLengthValue(svgElement.getAttribute("height"));
  if (svgHeight == null)
  {
    window.alert("Cannot get or parse height attribute of element \"" + svgId + "\"");
    return;
  }

    //	find initial SVG scale
  var svgScaleElement = document.getElementById("svgscale");
  if (!svgScaleElement)
  {
    window.alert("Cannot find element with id=\"svgscale\".");
    return;
  }
  var t = svgScaleElement.getAttribute("transform");
  if (t != null)
  svgScale = parseFloat(t.match(/scale\(\s*(\d+\.\d*|\d*\.\d+|\d+)/)[1]); // grab the first (or the one) scale value
  else
  svgScale = 1.0;

    //	get our viewBox width and height
  var vbw = svgWidth / svgScale;
  var vbh = svgHeight / svgScale;
  var svgViewBox = svgElement.getAttribute("viewBox");
  if (svgViewBox != null) {
    var vbm = svgViewBox.match(/0\s+0\s+([\+\-\.\d]+)\s+([\+\-\.\d]+)/);
    if (vbm != null) {
      vbw = parseFloat(vbm[1]);
      vbh = parseFloat(vbm[2]);
    }
  }

    //	ensure we have a viewBox attribute and no-op the scale
  svgElement.setAttribute("viewBox", "0 0 " + vbw.toString() + " " + vbh.toString());
  svgScaleElement.setAttribute("transform", "scale(1.0)");
  svgScale = 1.0;

    //	get the original size of the outer wrappers
  wrapWrapWidth = document.getElementById(SVG_WRAP_CONT).offsetWidth;
  wrapWrapHeight = document.getElementById(SVG_WRAP_CONT).offsetHeight;

  var svgScaleToFill = Math.min(wrapWrapWidth / svgWidth, wrapWrapHeight / svgHeight);

  originalWrapWidth = Math.round(svgWidth * svgScaleToFill + 0.5);
  originalWrapHeight = Math.round(svgHeight * svgScaleToFill + 0.5);

  svgElement.setAttribute("width", originalWrapWidth.toString() + "px");
  svgElement.setAttribute("height", originalWrapHeight.toString() + "px");

  document.getElementById(SVG_WRAP).style.width = svgElement.getAttribute("width");
  document.getElementById(SVG_WRAP).style.height = svgElement.getAttribute("height");

  svgScale *= svgScaleToFill;
//	svgScaleElement.setAttribute("transform", "scale(" + svgScale.toString() + ")");

    //	initialize the drag object as code in ApplyScale is going to modify some stuff
  Drag.init(document.getElementById(SVG_WRAP));
	
    //	apply an initial scale of 1.0 to center the image
  ApplyScale(1.0);

    //	finally, make our wrapper and the svg it contains visible
  document.getElementById(SVG_WRAP).style.visibility = "visible";

  if (typeof noWheel == 'undefined' || noWheel == false) {
    if (window.addEventListener) {
      document.getElementById(SVG_WRAP_CONT).addEventListener("mousewheel", ZoomWheel, false);
      document.getElementById(SVG_WRAP_CONT).addEventListener("DOMMouseScroll", ZoomWheel, false);    // firefox
    } else if (typeof window.attachEvent != 'undefined') {
      document.getElementById(SVG_WRAP_CONT).attachEvent("onmousewheel", ZoomWheel);
    }
  }

    //  init the zoom slider if we've got it
  var zoomSliderSlider = document.getElementById("slider");
  if (zoomSliderSlider != null)
  zoomSliderSlider.onmousedown = SliderMouseDown;
}


var Animator = {

  startTime: null,
  startValue: null,
  endTime: null,
  endValue: null,
  intervalTime: Math.floor(1000 / 60),
  intervalID: null,
  valueChanger: null,

  stop: function() {
    if (Animator.intervalID != null)
    window.clearInterval(Animator.intervalID);
    Animator.intervalID = null;
  },

  onInterval: function() {
    var now = new Date().getTime();
    if (Animator.endTime <= now) {
      Animator.stop();
      Animator.valueChanger(Animator.endValue);
    } else {
      var percentDone = (now - Animator.startTime) / (Animator.endTime - Animator.startTime);
      Animator.valueChanger(Animator.startValue + (Animator.endValue - Animator.startValue) * percentDone);
    }
  },

  start: function(initialValue, endingValue, duration, changer) {
    this.stop();
    this.startValue = initialValue;
    this.endValue = endingValue;
    this.startTime = new Date().getTime();
    this.endTime = this.startTime + duration;
    this.valueChanger = changer;
    this.intervalID = window.setInterval(this.onInterval, this.intervalTime);
  }
}

function ZoomInOverTime(factor, milliseconds)  {
  Animator.start(scaleFactor, scaleFactor * factor, milliseconds, ApplyScale);
}


//	animation state
var aniStep;
var aniStartScale;
var aniInterval = null;

//	animates a 3x zoom over 10 steps
function AnimateZoomIn()  {
  if (++aniStep <= 10)
  {
    ApplyScale(aniStartScale * (1 + .2 * aniStep));
  }
  else
  {
    window.clearInterval(aniInterval);
    aniInterval = null;
  }
}

function ZoomIn()  {
  aniStep = 0;

  if (aniInterval != null)
  window.clearInterval(aniInterval);
	
  aniStartScale = scaleFactor;
  aniInterval = window.setInterval(AnimateZoomIn, 20);
}

//	animates a 3x zoom over 10 steps
function AnimateZoomOut()  {
  if (--aniStep >= -10)
  {
    ApplyScale(aniStartScale / (1 - .2 * aniStep));	// anistep is negative so this 1 to 3
  }
  else
  {
    window.clearInterval(aniInterval);
    aniInterval = null;
  }
}

function ZoomOut()  {
  aniStep = 0;

  if (aniInterval != null)
  window.clearInterval(aniInterval);

  aniStartScale = scaleFactor;
  aniInterval = window.setInterval(AnimateZoomOut, 20);
}

function Zoom1x()  {
  ApplyScale(1.0);
}

function ZoomFast(factor)  {
  ApplyScale(scaleFactor * factor);
}

function ApplyScale(newScale)  {
  if (newScale < 1/9)
  return;
	
  if (typeof(SliderZoomTo) != 'undefined')
  {
      //	limit to range 10% to 1000% for the slider
    newScale = Math.max(0.10, Math.min(10.0, newScale));

    if (newScale == scaleFactor)
    return;
			
    SliderZoomTo(newScale * 100, false);
  }

  scaleFactor = newScale;

    //	get the wrapping div
  var sw = document.getElementById(SVG_WRAP_CONT);

    //	gather the old properties
  var oldw = sw.offsetWidth;
  var oldh = sw.offsetHeight;
  var oldl = sw.offsetLeft; //parseFloat(sw.style.left);
  var oldt = sw.offsetTop; //parseFloat(sw.style.top);

    //	compute the new width and height
  var neww = originalWrapWidth * newScale;
  var newh = originalWrapHeight * newScale;

    //	compute the new left and top
  var zoomCenterX = wrapWrapWidth / 2;
  var dx1 = zoomCenterX - oldl;
  var dx2 = dx1 * (neww / oldw);
  var newl = oldl + dx1 - dx2;
  var zoomCenterY = wrapWrapHeight / 2;
  var dy1 = zoomCenterY - oldt;
  var dy2 = dy1 * (newh / oldh);
  var newt = oldt + dy1 - dy2;

    //  fix the min and max X and Y for panning
  sw.minX = Math.min(wrapWrapWidth - neww, (wrapWrapWidth - neww) / 2);
  sw.maxX = Math.max(0, (wrapWrapWidth - neww) / 2);
  sw.minY = Math.min(wrapWrapHeight - newh, (wrapWrapHeight - newh) / 2);
  sw.maxY = Math.max(0, (wrapWrapHeight - newh) / 2);

    //  limit the new left and top to the new mins and maxes
  newl = Math.min(Math.max(newl, sw.minX), sw.maxX);
  newt = Math.min(Math.max(newt, sw.minY), sw.maxY);

    //	save all the property updating to last
  sw.style.width = neww.toString() + "px";
  sw.style.height = newh.toString() + "px";
  sw.style.left = newl.toString() + "px";
  sw.style.top = newt.toString() + "px";
	
  document.getElementById("svgGraph").setAttribute("width", neww.toString() + "px");
  document.getElementById("svgGraph").setAttribute("height", newh.toString() + "px");
	
    //  and, finally, update the svg scale factor
//	document.getElementById("svgscale").setAttribute("transform", "scale(" + (svgScale * newScale).toString() + ")");
}

function ZoomIt(delta)  {
    // only update if we'll make a change and don't let the new scalefactor get too small
  if (delta != 1 && 0.1 <= scaleFactor * delta)
  {
    ApplyScale(scaleFactor * delta);
  }
}

function ZoomWheel(e)  {
  if (typeof e == 'undefined') e = window.event;

  if (typeof e.wheelDelta != 'undefined')
  {
    if (e.wheelDelta > 0)
    ZoomIt(1.2);
    else if (e.wheelDelta < 0)
    ZoomIt(0.833333333);
  }
  else if (typeof e.detail != 'undefined')
  {
    if (e.detail < 0)
    ZoomIt(1.2);
    else if (e.detail > 0)
    ZoomIt(0.833333333);
  }

  return CancelEvent(e);
}

function CancelEvent(e) {
  e = e ? e : window.event;
  if (e.stopPropagation)
  e.stopPropagation();
  if (e.preventDefault)
  e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}


//  for the svg zoom slider control

// function SliderZoomTo(zoom, applyTheZoom) {
//     //  check for no slider
//   if (1 == 1) return;
//   if (document.getElementById("sliderControl") == null)
//   return;

//     //  fudge a little so that 100% is perfect
//   if (97.5 <= zoom && zoom <= 102.5)
//   zoom = 100;

//   zoom = Math.round(zoom);
//   document.getElementById("readout").firstChild.data = zoom.toString() + "%";

//   var pos = ZoomToSliderPosition(zoom);
//   document.getElementById("slidemover").setAttribute("transform", "translate(" + Math.round(pos).toString() + " 0)");

//   if (applyTheZoom && typeof (ApplyScale) != 'undefined')
//   ApplyScale(zoom / 100);
// }

function ZoomToSliderPosition(zoom) {
  alert("slider zoom position");
  var partial = Math.pow(0.000108 * zoom + 0.000108 * Math.sqrt(Math.pow(zoom, 2) - 62.0042 * zoom + 1011.04) - 0.00334823, 1 / 3);
  return 132.283 * partial + 14.15 - 1.10453 / partial;
}

function SliderPositionToZoom(pos) {
  return 0.002 * Math.pow(pos, 3) - 0.0849 * Math.pow(pos, 2) + 2.078 * pos + 12.931;
}

function SliderZoomBy(fraction) {
  alert("slider zoom by");
  var zoom = parseFloat(document.getElementById("readout").firstChild.data);
  zoom = Math.max(10, Math.min(1000, Math.round(zoom * fraction)));
  SliderZoomTo(zoom, true);
}

function SliderKeyZoomBy(e, fraction) {
  alert("slider zoom key");
  if (e.keyCode == 32 || e.keyCode == 13) {
    SliderZoomBy(fraction);
    CancelEvent(e);
  }
}

function SliderKeySliderMove(e) {
  alert("slider key move");
  if (e.keyCode == 38 || e.keyCode == 39) {
    SliderZoomBy(1.1);  // up or right
    CancelEvent(e);
  }
  else if (e.keyCode == 40 || e.keyCode == 37) {
    SliderZoomBy(1 / 1.1);  // down or left
    CancelEvent(e);
  }
  else if (e.keyCode == 32 || e.keyCode == 13) {
    SliderZoomTo(100, true);   // space or enter does 100%
    CancelEvent(e);
  }
}

function SliderMouseDown(e) {
  alert("slider zoom mouse down");

  var leftAdjust = 0;
  var op = document.getElementById("sliderControl");
  if (typeof (op.getBoundingClientRect) != 'undefined')
  leftAdjust = op.getBoundingClientRect().left;
  else {
    for (; op != null; op = op.offsetParent)
    leftAdjust += op.offsetLeft;
  }

  var zoneAdjust = parseFloat(document.getElementById("slidezone").getAttribute("transform").match(/\(\s*(\d+(\.\d*)?)/)[1]);
  zoneAdjust += parseFloat(document.getElementById("controlzone").getAttribute("transform").match(/\(\s*(\d+(\.\d*)?)/)[1]);

  document.onmousemove = function(e2) {
    var pos = Math.max(0, Math.min(91, e2.clientX - zoneAdjust - leftAdjust));
    var zoom = SliderPositionToZoom(pos);
    SliderZoomTo(zoom, true);
    CancelEvent(e2);
  };

  document.onmouseup = function(e2) {
    document.onmousemove = null;
    document.onmouseup = null;
    CancelEvent(e2);
  };

  CancelEvent(e);
};

