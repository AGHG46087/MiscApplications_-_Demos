/*
 * Page4.js
 */
/* XSS protection */
if (top != self) {top.location=self.document.location; }
/*Added to fix issue in IE 6 with CSS button*/
try {document.execCommand("BackgroundImageCache", false, true);} catch(err) {}

/* Another dumb Method - that is needed */
function isIE() {
  var retVal = false;
  retVal = (window.ActiveXObject) || (navigator.appVersion.indexOf("MSIE")!=-1);
  return retVal;
}
function isSafari() {
  var ua = navigator.userAgent.toLowerCase();
  var retval = (ua.indexOf("safari") > -1);
  return retval;
}
function isOpera() {
  var ua = navigator.userAgent.toLowerCase();
  var retval = (ua.indexOf("opera") > -1);
  return retval;
}
function isFirefox() {
  var ua = navigator.userAgent.toLowerCase();
  var retval = (ua.indexOf("firefox") > -1);
  return retval;
}
function whereDoYaWannaGo(evt) {
  Event.stop(evt);
  var parent = this.ancestors()[0];
  if( parent.hasClassName("level2") )
  {
    var youWant = "" + this.ancestors()[1].siblings()[0].innerHTML.substring();
    youWant += "->" + this.innerHTML.substring();
    alert(youWant);
  }
}
function clearIELinkItems() {
    // Clear all link items - if IE worked properly this would not be required.
  var listElements=$$("li.level2 a");
  for(var a=0;(listElements!= null) && (a < listElements.length);a++){
    var node = listElements[a];
    listElements[a].removeClassName("ieLinkItem");
  }
}
function addIEKeyFocus() {
  var parent = this.ancestors()[0];
    // If we are a level 2 item, set the node
    // if IE worked properly this would not be required.
  if ( parent.hasClassName("level2") )
  { 
    this.addClassName("ieLinkItem");
  }
    // this is the case if the menu item is level 1, we want to have the
    // level 2 menu show focus
    // if IE worked properly this would not be required.
  if ( parent.hasClassName("topItem") && parent.hasClassName("off") )
  {
    var listElements=$$("li.topItem");
    for(var a=0;(listElements!= null) && (a < listElements.length);a++){
      var node = listElements[a];
      listElements[a].addClassName("off");
      listElements[a].removeClassName("on");
    }
    parent.addClassName("on");
    parent.removeClassName("off");
    parent.addClassName("over");
  }
  
  
}
function startList() {
  if (document.getElementById)
  {
    var navRoot = $("nav");
    for (i=0; i<navRoot.childNodes.length; i++)
    {
      node = navRoot.childNodes[i];
      var nodeName = node.nodeName;
      if (node.nodeName == "LI")
      {
        node.onmouseover = function() { this.addClassName("over"); }
        node.onmouseout = function() { this.removeClassName("over");  }
      }
    }
    var listElements=$$("a");
    for(var a=0;(listElements!= null) && (a < listElements.length);a++){
      var node = listElements[a];
      node.observe("keyup", addIEKeyFocus);
      node.observe("blur", function(){
            clearIELinkItems();
            var parent = this.ancestors()[0];
            parent.removeClassName("over");
          });
    }
    
  }
}
function actionEventToProcess(evt) {
  Event.stop(evt);
  var listElements=$$("li.topItem");
  for(var a=0;(listElements!= null) && (a < listElements.length);a++){
    listElements[a].addClassName("off");
    listElements[a].removeClassName("on");
  }
  var element = this;
  if( element != null )
  {
    element.addClassName("on");
    element.removeClassName("off");
  }
  element = Event.element(evt);
}
function addObservers() {
  var elements=$$("li.topItem");
  for(var a=0;(elements!= null) && (a < elements.length);a++){
      // Device independent, Keyboard focus and mouse click
    Event.observe(elements[a].id,"click",actionEventToProcess);
    Event.observe(elements[a].id,"focus",actionEventToProcess);
  }
    // Where do ya want to go on these links
  var listElements=$$("a");
  for(var a=0;(listElements!= null) && (a < listElements.length);a++){
    var node = listElements[a];
    node.observe("click", whereDoYaWannaGo);
  }
}
/* Function to be triggered once the page has loaded */
Event.observe(window,"load",function(){
      startList();
      addObservers();
});

/* end File */
