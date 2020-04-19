/*
 *
 */
function callPHPModuleForAsyncScript() {
  if (document.getElementById) {
    docURL = document.URL;
  } else {
    docURL = window.location;
  }
  if ( docURL != null )
  {
    var end = docURL.lastIndexOf("/");
    docURL =  docURL.substring(0, end) + "/getJavascriptScript.php?delay=5";
    loadFile(docURL, function() { setTimeout("processAsyncScriplet()",100); });
  }
}

function processAsyncScriplet() {
  sayScriptletDone("async");
}
function callPHPModuleForAnotherScript() {
  if (document.getElementById) {
    docURL = document.URL;
  } else {
    docURL = window.location;
  }
  if ( docURL != null )
  {
    var end = docURL.lastIndexOf("/");
    docURL =  docURL.substring(0, end) + "/getJavascriptScript.php?delay=5";
    document.write("<scr" + "ipt language=\"javascript\" src=\"" + docURL + "\"" + "></scr" + "ipt>");
  }
}
function timeToComplete() {
  var end = Number(new Date());  // get a timestamp FIRST THING!
    // We can definitely get the time for this page.
  t_page = end - t_page_start;
  var node = $("t_done");
  var data = "Time to complete load [<span id='t_done_time'>"+t_page+"</span>ms]";
  node.innerHTML = data;
}
function sayDone(module) {
  var node = $("done-" + module);
  if ( node != null )
  {
    node.innerHTML = "Done loading...";
  }
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
function registerFrameLinkEvents() {
  var nodes = $$("span.frameCaption");
  for( var i = 0; i < nodes.length; i++ )
  {
    var mybutton = nodes[i];
    Event.observe(mybutton, 'click', myFrameClick);
      //alert("button \'" + mybutton.id + "\' was found in body, added a click event");
  }
}
function clearPage(evt) {
  document.body.style.display = "none";
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
  element.src = "load-sync-js-frame.php";
  element.id =  "pageFrame1";
  element.setAttribute("class","iframeCompare");
  $("frameWrapper").appendChild(element);
  
  element = document.createElement("iframe");
  element.src = "load-async-js-frame.php";
  element.id =  "pageFrame2";
  element.setAttribute("class","iframeCompare");
  $("frameWrapper").appendChild(element);
  
}
function pageScroll() {
  window.scrollBy(0,50); // horizontal and vertical scroll increments
  scrolldelay = setTimeout("pageScroll()",100); // scrolls every 100 milliseconds
}


sync_async_status = '200';
