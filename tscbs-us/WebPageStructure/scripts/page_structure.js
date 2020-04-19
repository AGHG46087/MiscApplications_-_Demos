/*
 *
 */

function registerFrameLinkEvents() {
  var nodes = $$("span.frameCaption");
  for( var i = 0; i < nodes.length; i++ )
  {
    var mybutton = nodes[i];
    Event.observe(mybutton, 'click', myFrameClick);
  }
}
function myFrameClick(evt) {
  Event.stop(evt);
  clearPage();
  var child = Event.element(evt);
  var page = child.innerHTML.substring() + "-frame.php";
  window.location = page;
}
function populateFrameWrapper() {
  var element = null;
  element = document.createElement("iframe");
  element.src = "js-top-frame.php";
  element.id =  "pageFrame1";
  element.setAttribute("class","iframeCompare");
  $("frameWrapper").appendChild(element);
  
  element = document.createElement("iframe");
  element.src = "js-middle-frame.php";
  element.id =  "pageFrame2";
  element.setAttribute("class","iframeCompare");
  $("frameWrapper").appendChild(element);
  
  element = document.createElement("iframe");
  element.src = "js-bottom-frame.php";
  element.id =  "pageFrame3";
  element.setAttribute("class","iframeCompare");
  $("frameWrapper").appendChild(element);

  var nodes = $$("img.middleImage");
  for( var i = 0; i < nodes.length; i++ )
  {
    var myimage = nodes[i];
    myimage.addClassName("shrink");
  }
  
  
}
function pageScroll() {
  window.scrollBy(0,50); // horizontal and vertical scroll increments
  scrolldelay = setTimeout("pageScroll()",100); // scrolls every 100 milliseconds
}
function sayDone(module) {
  var node = $("done-" + module);
  if ( node != null )
  {
    node.innerHTML = "Done loading...";
  }
}
function clearPage(evt) {
  document.body.style.display = "none";
}
function loadFile(url, callbackFoo, where)
 {
   if ( where == null )
   {
     where = "head"; // body, head
   }
   if( callbackFoo == null )
   {
     callbackFoo = function(){/* do nothing */};
   }
   var start = url.lastIndexOf("/") + 1;
   var stop = url.lastIndexOf(".");
   var id = url.substring(start, stop);
   var fileType = url.substring(stop+1); // Use Stop to get the File Extension
   // just to ensure no collisions with CSS and JS names.
   var id = url.substring(start, stop) + "_" + fileType; 
   
   if (  fileType.indexOf("php") > -1 )
   { // Servlet, lets grab a different ID
     stop = url.lastIndexOf("?");
     id = url.substring(start, stop)  + "_SERVLET";
   }

     // does the Element Exist, Do Not reload it.
   var element = document.getElementById(id);
   if ( element == null )
   { // Does not exist, add it
 
     element = document.createElement("script");
     element.src = url;
     element.id = id;
     element.setAttribute("type","text/javascript");
     element.setAttribute("language","javascript");
     
     element.onload = function() {
       callbackFoo();
     }
     element.onreadystatechange = function() {
       if (this.readyState == 'complete' || this.readyState == 'loaded') {
         callbackFoo();
       }
     }

     document.getElementsByTagName(where)[0].appendChild(element);

   }
     // we are done
 }
