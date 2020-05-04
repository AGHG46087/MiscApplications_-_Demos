
/* Firebug notes: - useful function, more info...http://getfirebug.com/console.html
 * CTRL-SHIFT-L or F12 to view console
 * console.log(object[, object, ...])   - similar as printf, no link to code
 * console.debug(object[, object, ...]) - similar as printf, link to code, no image
 * console.info(object[, object, ...])  - similar as printf, link to code, info image
 * console.warn(object[, object, ...])  - similar as printf, link to code, warn image
 * console.error(object[, object, ...]) - similar as printf, link to code, error image
 * console.group(object[, object, ...]) - similar as printf, link to code, groups and indents
 * console.groupEnd()                   - ends group
 * console.time(name)                   - starts timer with label
 * console.timeEnd(name)                - Ends timer with label
 * console.count([title])               - count how many times code has passed through
 */
// Lets get this party started, 
// If some where in the libraries there is a onLoad event, we can have our cake and eat it too.
var oldonload=window.onload;
if(typeof(oldonload)=='function') window.onload=function(){oldonload();InitialLoadModule()};
else window.onload=function(){InitialLoadModule();};
// This is called if there is nothing more todo.
function InitialLoadModule()
 {
   registerHandlers();
     // GEEK:  Load files that are used later, 
   setTimeout('loadOtherFiles();',500);
     // Set a debugger option.
   if( isDebugMode() )
   {
     console.info("We are in DEBUG MODE");
   }
   
 }
function loadOtherFiles()
 { // spread it out, a little, speed things up
   // Here we can add other Javascript files or even CSS files
   dhtmlLoadFile("./scripts/niftycube.js");
   dhtmlLoadFile("./css/demoextra.css");
 }
 function isDebugMode()
  {
    var retVal = false;
    var hgDebug = $("HGDEBUG");
    if ( hgDebug != null )
    {
      var nodeValue = hgDebug.innerHTML.substring();
      retVal = ( nodeValue.indexOf("true") > -1 );
    }
    return retVal;
  }
function dhtmlLoadFile(url, where)
{
  if ( where == null )
  {
    where = "head";
  }
  
  var start = url.lastIndexOf("/") + 1;
  var stop = url.lastIndexOf(".");
  var id = url.substring(start, stop);
  var fileType = url.substring(stop+1); // Use Stop to get the File Extension
  var id = url.substring(start, stop) + "_" + fileType; // just to ensure no collisions with CSS and JS names.
  var element = $(id);
  if ( element == null )
  { // Does not exist, add it
    if ( fileType.indexOf("css") > -1 )
    {
      element = document.createElement("link");
      element.setAttribute("type","text/css");
      element.setAttribute("rel","stylesheet");
      element.setAttribute("media","all");
      element.setAttribute("href",url);
      element.id = id;
    }
    else if ( fileType.indexOf("js") > -1 )
    {
      element = document.createElement("script");
      element.src = url;
      element.id = id;
      element.setAttribute("type","text/javascript");
    }
    document.getElementsByTagName(where)[0].appendChild(element);
  }
    // we are done
}


function registerHandlers()
 {
   var myGlobalHandlers = {
     onCreate: function()
     {
       Element.show("systemWorking");
     },
     onComplete: function()
     {
       if(Ajax.activeRequestCount == 0)
       {
         Element.hide("systemWorking");
       }
     }
   };
   
   Ajax.Responders.register(myGlobalHandlers);
   Element.hide("systemWorking"); // Initial State
 }

function ajaxRequest(urlID, foo, fubar, parms, onCompleteReq)
 {
   var pars = ( parms != null ) ? parms : "";
   var requestComplete = (onCompleteReq != null) ? onCompleteReq : ajaxOnCompleteHandler;
   var successHandler = (foo != null) ? foo : ajaxShowResponseHandler; 
   var errorHandler = (fubar != null ) ? fubar : ajaxErrorHandler;

   
   var myAjax = new Ajax.Request( urlID,
                                  { method: "post",
                                        parameters: pars,
                                        onSuccess: successHandler, 
                                        onFailure : errorHandler,
                                        onComplete: requestComplete
                                        }
                                  );

   return false;
 }
function getPageLoad(urlID, parms)
 {
   if ( urlID != null )
   {
     $("AjaxResponseData").innerHTML = "&nbsp;";
     
     var contentPath = "content/";
     var fullPath = contentPath + urlID;
     return ajaxRequest(fullPath, ajaxShowResponseHandler, ajaxErrorHandler, parms, ajaxOnCompleteHandler);
   }
   return false;
 }


function ajaxErrorHandler(requestError)
 {
   var text = "<div id=\"WeAreSorryText\">We are Sorry, The request could not be processed, please try back later, ID= " +
       requestError.readyState + "" + requestError.status + " </div>";
   $("AjaxResponseData").innerHTML = text;
 }
function ajaxOnCompleteHandler(originalRequest)
 {
   cleanupNodes();
     // GEEK:  here is a general bug for all browsers
   console.info("GEEK: General error here, both Firefox and IE");
   processAnyOnDemandJavascript();
 }
function ajaxShowResponseHandler(originalRequest)
 {
   $("AjaxResponseData").innerHTML = originalRequest.responseText;
 }
function processAnyOnDemandJavascript()
 {
   Nifty("ul#nav span","small transparent top");
 }
function processEvent(node, idName, text)
 {
/* GEEK */
    console.error("GEEK: processEvent(), bug IE");
    var element = AppUtils.getElementsByAttribute("class", "activelink", $("menu"))[0];
    console.info("GEEK: %s", element );
    element.removeClassName("activelink");
    node.addClassName("activelink");
    

     if ( AppUtils.isIE() )
     {
//       var parent = $("nav");
//       var children = parent.childNodes;
//       for( var x = 0; x < children.length; x++ )
//       {
//         childNode = children.item(x);
//         if( childNode.className == "activelink" )
//         {
//           childNode.className = "";
//           x = children.length; // done
//         }
//       }
//         // get the child Node and continue on
//       node.className = "activelink";
//       if( isDebugMode() )
//       {
//         console.log("Debug Mode condition");
//         debugger;
//       }
     }
     else
     {
       var element = AppUtils.getElementsByAttribute("class", "activelink", $("menu"))[0];
       element.removeClassName("activelink");
       node.addClassName("activelink");
     }

   fadeEffect(idName, text);
   
   return false;
 }
function fadeEffect(idName, text)
 {
   new Effect.FadeAndSlide(idName,text,{duration:1.5, dropout: false ,startX : 0, endX : 700, endY: 10, mode : "absolute"});
   return false;
 }

function changecss(fileName)
 {
   var newLinkHREF = String("./css/" + fileName);
   var cssLink = $("preferred_css");
   if ( cssLink != null )
   {
     newElement = document.createElement("link");
     newElement.setAttribute("type","text/css");
     newElement.setAttribute("rel","stylesheet");
     newElement.setAttribute("media","all");
     newElement.setAttribute("href",newLinkHREF);
     newElement.setAttribute("title","holygrail");
     newElement.id = "preferred_css";
       
     cssLink.parentNode.replaceChild(newElement, cssLink);
   }
   
 }
function cleanupNodes()
 { // Perform any cleanup activity
   return false;
 }
function hideNode(id)
 {
   var element = $(id);
   if ( element != null )
   {
     element.addClassName("bhv_Invisible");
   }
 }
function showNode(id)
 {
   var element = $(id);
   if ( element != null )
   {
     element.removeClassName("bhv_Invisible");
   }
 }
/* this class will move the text to position - This Class will add a class to each Node
 * class="FadeAndSlide"
 * drop each letter of the old text, and fade the characters, 
 * move the new text to the location,
 * USAGE: new Effect.FadeAndSlide(idName,text,{duration:1.5, startX : -200, endX : 700});
 * parameters:
 * @param - idName, the name of the ID to act on.
 * @param - text, the string text to manipulate
 * @param (optional) attributes-defaults:
 *        startX : -200,  // starting x position
 *        endX : 700,     // ending x position
 *        startY : element.getStyle('top'), // the starting y position
 *        endY : element.getStyle('top'), // the ending y position
 *        duration : 1.5, // duration
 *        mode : 'absolute' | 'relative' // position mode
 *        fadeDelay : this.duration / ((this.oldValue.length <= 5) ? 2 : 3); // The delay before fade starts
 *        dropout : true, // provides the character drop out effect.
 *        nodeClass : "FadeAndSlide", // the node class to add, default "FadeAndSlide"
 */
Effect.FadeAndSlide = Class.create();
Object.extend(Object.extend(Effect.FadeAndSlide.prototype, Effect.Base.prototype), {
      initialize: function(element, valueText) {
        
        var options = Object.extend( {}, arguments[2] || {});
          // Setup variables with repsect to this class.
        this.element = $(element);
        this.idName = $(element).id;
        this.oldValue = this.element.innerHTML.substring();
        this.newValue = valueText;
        this.startX = ((options.startX == 0 || options.startX == null) ? -200 : options.startX);
        this.endX = ((options.endX == 0 || options.endX == null) ? 700 : options.endX);
        this.startY =((options.startY == 0 || options.startY == null) ?
                      getValueOf(this.element.getStyle("top")) : options.startY);
        this.endY =((options.endY == 0 || options.endY == null) ?
                    getValueOf(this.element.getStyle("top")) : options.endY);
        this.duration = ((options.duration <= 0.0 || options.duration == null) ? 1.5 : options.duration);
        this.mode = (options.mode == null) ?  "absolute" : options.mode ;
        this.dropout = (options.dropout == null) ?  true : options.dropout ;
        this.nodeClass = (options.nodeClass == null) ? "FadeAndSlide" : options.nodeClass;
        this.fadeDelay = ((options.fadeDelay == null ) ?
                          (this.duration / ((this.oldValue.length <= 5) ? 2 : 3)) : options.fadeDelay);
          // Let 'er rip.
        this.start(options);

          // Change the ID of the existing tag.
        this.element.id = "fadeTextSpan";
          // Create a New Node and Add it to the DOM
        var newNode = "<span id=\""+this.idName+"\">"+this.newValue+"</span>";
        new Insertion.Before(this.element.id, newNode);
          // Add Class Name for Easier CSS
        $(this.idName).addClassName(this.nodeClass);
        $(this.element.id).addClassName(this.nodeClass);
          // Set the Style to set starting position
          //       Element.setStyle(this.element.id, {position : this.mode, left : this.endX-70 + "px"} );
        Element.setStyle(this.idName, { left : this.startX + "px",
                  top : this.startY + "px",
                  "font-style" : "italic",
                  position : this.mode });
        
          // Tagify each Text item in Old, drop each letter, fade each letter,
          // and move the new to its location
        if ( options.dropout )
        {
          Effect.tagifyText(this.element);
          new Effect.multiple(this.element.childNodes, Effect.DropOut,
                              { delay: this.fadeDelay, speed:options.duration/7});
        }
        new Effect.Fade(this.element,
                        { duration : this.duration + this.fadeDelay, delay : this.fadeDelay,
                              afterFinish : function(effect) {removeThisNode(effect)} });
        new Effect.Move (this.idName,
                         { x: options.endX,
                               y: this.endY,
                               mode: this.mode,
                               duration : this.duration,
                               afterFinish : function(effect) {resetFont(effect)} });
          /* method cleanup, to perform any cleanup activity needed */
        function resetFont(effect)
         {
           effectIDName = effect.element.id;
           Element.setStyle(effectIDName, { "font-style" : "normal" });
         }
        function removeThisNode(effect)
         {
           effectIDName = effect.element.id;
           effect.element.parentNode.removeChild(effect.element);
         }
          /* used for striping the "px" tags from values */
        function getValueOf(stringVal)
         {
           var textNodeValue = String(stringVal);
           var pos = textNodeValue.lastIndexOf("px");
           if ( pos > 0 ) textNodeValue = textNodeValue.substring(0,pos);
           return textNodeValue;
         }
      }
    });
/* Accordian effect, this effect is used to generate the accordian look and feel.
 * you should have something to trigger the script, here is an example in the HTML
 * <script>
 *  $("Accordian").visualEffect("Accordian",{headingSelector:"h5",sectionSelector:"div.Accordian-Blind",showSection: 0, duration: 0.3});
 * </script>
 */
Effect.Accordian =	function(element) 
{
  // Define some variables to localize the the parameters to Options variable
  var delaySpeed = 0.5;
  var sectionToShow = 0;
  // Set to true if the Closing is ok. otherwise false
  var clickToCloseFoldEnabled = true; 
  
  
  element = $(element);
  var options = Object.extend({}, arguments[1] || {});
//  {
//    headingSelector: 'h4',
//    sectionSelector: 'div',
//    showSection: sectionToShow,
//    duration: delaySpeed
//  }, arguments[1] || {});

  headings = $$('#'+element.id+' '+options.headingSelector);
  sections = $$('#'+element.id+' '+options.sectionSelector);

  function showSection(section) 
  {
     // If we are not allowing clock to close, and the blind is open, 
     // user clicked on the open fold
     if ( !clickToCloseFoldEnabled && section.visible() )
     { // Return True, as the Section is a "Active Fold"
       return true;
     }
     // if(section.visible()) return false;
     // Close the section if it is open, user clicked on the same fold
     if(section.visible())
     { // Close the Blind, and Return False, Not an Active Fold
       section.visualEffect('blind_up', {duration:options.duration});
       return false;
     }
     // We are here there is a click on a different fold, close old, and open new.
     sections.each(function(e)
     {
        if(e == section) 
        {
           e.visualEffect('blind_down', {duration:options.duration});
        }
        else 
        {
           e.visualEffect('blind_up', {duration:options.duration});
        }
     } ); // end section.each()
     return true;
  } // showSection()

  headings.each(function(e,index) 
  {
     e.style.cursor = 'pointer';
     e.onclick = function()
     { 
       headings.each(function(h){ h.removeClassName('activefold'); })
       var foldOpen = showSection(sections[index]);
       if(foldOpen)
       {
         this.addClassName('activefold');
       }
     };
  }); // end headings.each()

  sections.each(function(s,ind) 
  { 
    if(!options.showSection || (ind + 1 != options.showSection)) 
    {
       s.hide(); 
    }
    else 
    {
       s.show();
    }
  }); // sections.each
  
  if(options.showSection) 
  {
     headings[options.showSection - 1].addClassName('activefold');
  }
} // Effect.Accordian 

/////////////////////////////////////////////////////
/* AppUtils, Variable with associated variables and
 * utility functions.
 */
/////////////////////////////////////////////////////
var AppUtils =  {
  lastId: 0,
  currentSampleNb: 0,
  maxZIndex: 0,

  trim :  function(str)
  {
    return str.replace(/^\s*|\s*$/g,"");
  },
  // Returns data with page width, height and window width, height
  // Core code from - quirksmode.org
  getPageSize : function()
  {
    var xScroll, yScroll;
    
    if (window.innerHeight && window.scrollMaxY)
    {
      xScroll = document.body.scrollWidth;
      yScroll = window.innerHeight + window.scrollMaxY;
    }
    else if (document.body.scrollHeight > document.body.offsetHeight)
    { // all but Explorer Mac
      xScroll = document.body.scrollWidth;
      yScroll = document.body.scrollHeight;
    }
    else
    { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
      xScroll = document.body.offsetWidth;
      yScroll = document.body.offsetHeight;
    }
   
    var windowWidth, windowHeight;
    
    if (self.innerHeight)
    { // all except Explorer
      windowWidth = self.innerWidth;
      windowHeight = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    { // Explorer 6 Strict Mode
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    }
    else if (document.body)
    { // other Explorers
      windowWidth = document.body.clientWidth;
      windowHeight = document.body.clientHeight;
    }
    var pageHeight, pageWidth;
    
      // for small pages with total height less then height of the viewport
    pageHeight = (yScroll < windowHeight) ? windowHeight : yScroll;
    
      // for small pages with total width less then width of the viewport
    pageWidth = (xScroll < windowWidth) ? windowWidth : xScroll;
    
    return {pageWidth: pageWidth ,pageHeight: pageHeight , windowWidth: windowWidth, windowHeight: windowHeight};
  },

    /* function getElementsByAttribute(). returns a element based on a attribute and value.
     * The condition is in the form of a container, list of tags with attribute by value
     * var helloElms = getElementsByAttribute("class", "MyRedClass", container)
     * @param attr : the attribute desired to be evaluated.
     * @param val  : the value of the attribute being examined
     * @param container : The container
     * @returns Array
     */
  getElementsByAttribute : function(attr,val,container)
  {
    container = container || document;
    var all = container.all || container.getElementsByTagName('*');
    var arr = [];
    for(var k=0;k<all.length;k++)
    {
      if(all[k].getAttribute(attr) == val)
      {
        arr[arr.length] = all[k];
      }
    }
    return arr;
  },
  
  shieldsDown : function(id)
  {
    var objOverlay =  $(id);
    if(objOverlay)
    {
        // hide lightbox and overlay
      objOverlay.style.display = 'none';
      objOverlay.parentNode.removeChild(objOverlay);
    }
  },
  shieldsUp : function(id, className)
  {
    var objOverlay = $(id);
    if ( objOverlay != null )
    { // The node already exists - it is rendered
      if( objOverlay.style.display == 'block')
      { 
        return;
      }
        // It is exists - not rendered, delete it
      objOverlay.parentNode.removeChild(objOverlay);
    }
    var tmpClass = (className != null ) ? className : id;
    var objBody = document.getElementsByTagName("body").item(0);
    var objOverlay = document.createElement("div");
    objOverlay.setAttribute('id', id);
    objOverlay.className = "shieldup_" + tmpClass;
    objOverlay.style.display = 'none';
    objOverlay.style.position = 'absolute';
    objOverlay.style.top = '0';
    objOverlay.style.left = '0';
      // increment our zindex first
//    this.updateZIndex(this.maxZIndex + 10);
    
    objOverlay.style.zIndex = 'auto'; //AppUtils.maxZIndex;
    objOverlay.style.width = '100%';
//    objBody.insertBefore(objOverlay, objBody.firstChild);
    objBody.insertBefore(objOverlay, objBody.lastChild);

      // Set page size and Show it
    var pageSize = WindowUtilities.getPageSize();
    objOverlay.style.height = (pageSize.pageHeight + 'px');
    objOverlay.style.width = (pageSize.windowWidth + 'px');
    objOverlay.style.display = 'block';
      // return the new layer
    return objOverlay;
  },
  
  updateZIndex : function(zindex)
  {
    if(zindex > this.maxZIndex)
    {
      this.maxZIndex = zindex;
    }
  },

  isUserAgent :  function( name )
  {
    var ua = navigator.userAgent.toLowerCase();
    var retval = (ua.indexOf(name) > -1);
    return retval;
  },
  
  isIE :  function()
  {
    var retval = (window.ActiveXObject);
    return retval;
  },
  
  isOpera :  function()
  {
    var ua = navigator.userAgent.toLowerCase();
    var retval = (ua.indexOf('opera') > -1);
    return retval;
  },
  
  isSafari :  function()
  {
    var ua = navigator.userAgent.toLowerCase();
    var retval = (ua.indexOf('safari') > -1);
    return retval;
  },
  isFirefox :  function()
  {
    var ua = navigator.userAgent.toLowerCase();
    var retval = (ua.indexOf('firefox') > -1);
    return retval;
  },
  getBrowserData :  function()
  {
    var ua = navigator.userAgent.toLowerCase();
    var versionIndex = -1;
    var version = "";
    var browserName = "";
    if(ua.indexOf("firefox")!=-1)
    {
      versionIndex = ua.indexOf("firefox")+8;
      version = ua.substring(versionIndex);
      browserName = "Firefox";
    }
    else if(ua.indexOf("opera") > -1)
    { // sneaky little devils, those opera guys
      versionIndex = ua.indexOf("Opera")+6;
      version = "" + parseInt(ua.charAt(versionindex));
      browserName = "Opera";
    }
    else if(ua.indexOf("safari") > -1)
    { // sneaky little devils, those opera guys
      versionIndex = ua.indexOf("Opera")+8;
      version = "" + parseInt(ua.charAt(versionindex));
      browserName = "Safari";
    }
    else if(navigator.appVersion.indexOf("MSIE")!=-1)
    {
      var temp = navigator.appVersion.split("MSIE");
      version = "" + parseFloat(temp[1]);
      browserName = "MSIE";
    }

    var browserData = "" + browserName + " : " + version;
    return browserData;
    
  },
  
  getNewId: function()
  {
    AppUtils.lastId++;
    return "window_id_" + AppUtils.lastId;
  }
  
};


function goFireFox()
 {
   alert("Going to Fire Fix Site");
   window.location = "http://www.getfirefox.com";
 }

function IEViewGeneratedSource()
 {
   alert("javascript:'<xmp>'%20+%20window.document.body.outerHTML+%20'</xmp>'");
 }