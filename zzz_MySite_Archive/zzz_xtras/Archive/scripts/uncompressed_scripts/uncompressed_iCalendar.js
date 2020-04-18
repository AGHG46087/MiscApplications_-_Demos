
function showCalendarEventResponse(originalRequest)
 {
   var responseText = originalRequest.responseText;
   var startPos = originalRequest.responseText.indexOf("<body>");
   if ( startPos > -1 )
   { // Did this thing come back with a full web page, remove everything -
     // except the contents of the body
     var endPos = originalRequest.responseText.indexOf("</body>");
     responseText = originalRequest.responseText.substring(startPos + "<body>".length, endPos);
   }

   var classOfWindow = AppUtils.getClassOfWindow();
   var win = new Window(AppUtils.getNewId(),
                        {className: classOfWindow,
                              width:470,
                              height:180,
                              zIndex: 100,
                              resizable: true,
                              title: "Event Item",
                              showEffect:Effect.BlindDown,
                              hideEffect: Effect.SwitchOff,
                              opacity: 0.95,
                              draggable:true});
   win.setDestroyOnClose();
   win.getContent().innerHTML= responseText;
   win.showCenter(false);
 }

function openEventWindowData(data)
 {
   var iCalendarEventPath = "content/phpicalendar/includes/event.php";
   var parms = "date="+data.date+"&time="+data.time+"&uid="+data.uid+"&cpath="+data.cpath+"&event_data="+data.event_data;
   return ajaxRequest(iCalendarEventPath, showCalendarEventResponse, ajaxErrorHandler, parms);
 }
function EventData(date, time, uid, cpath, event_data)
 {
   this.date = date;
   this.time = time;
   this.uid = uid;
   this.cpath = cpath;
   this.event_data = event_data;
   openEventWindowData(this); // Process The event
 }
function clickICalEvent(object)
 {
     // Use DOM Level 1 navigation for IE and Opera
     //var nodeValue = object.previousSibling.firstChild.nodeValue;
     //var nodeValue =  scriptNodes[0].firstChild.nodeValue;
   var scriptNodes = object.parentNode.getElementsByTagName('script');
   if( scriptNodes.length > 0 )
   { // We have some embedded scripts, execute them
     var nodeValue = scriptNodes.item(0).innerHTML.substring();
     var start = nodeValue.indexOf("EventData");
       // Make it as clean as we can for IE and Opera
     var stop = nodeValue.lastIndexOf("document"); // nodeValue.lastIndexOf(";");
     nodeValue = nodeValue.substring(start, stop);
     eval(nodeValue); // This should invoke "EventData()"
   }
   else // Does not have javascript, regular href
   {
     var hrefValue = String(object.getAttribute("href"));
     var pos = hrefValue.lastIndexOf('/');
     if ( pos > -1 )
     {
       hrefValue = hrefValue.substring(pos+1);
     }
     getCalendar(hrefValue);
   }
   
   return false;
 }

function showCalendarTodoInfoResponse(originalRequest)
 {
   var responseText = originalRequest.responseText;
   var startPos = originalRequest.responseText.indexOf("<body>");
   if ( startPos > -1 )
   { // Did this thing come back with a full web page, remove everything -
     // except the contents of the body
     var endPos = originalRequest.responseText.indexOf("</body>");
     responseText = originalRequest.responseText.substring(startPos + "<body>".length, endPos);
   }

   var classOfWindow = AppUtils.getClassOfWindow();
   var win = new Window(AppUtils.getNewId(),
                        {className: classOfWindow,
                              width:460,
                              height:275,
                              zIndex: 100,
                              resizable: true,
                              title: "Todo Item",
                              showEffect:Effect.BlindDown,
                              hideEffect: Effect.SwitchOff,
                              opacity: 0.95,
                              draggable:true});
   win.setDestroyOnClose();
   win.getContent().innerHTML= responseText;
   win.showCenter(true);
 }

function openTodoInfo(vtodo_array)
 {
   var iCalendarTodoInfoPath = "content/phpicalendar/includes/todo.php?vtodo_array="+vtodo_array;
   var parms = "vtodo_array="+vtodo_array;
   return ajaxRequest(iCalendarTodoInfoPath, showCalendarTodoInfoResponse, ajaxErrorHandler, parms);
   
 }

document.popup_data = new Array();
var idCount = 0;
function createCalendarNodeID(element)
 {
    if (element.id.length < 1)
    {
      var tempID = "";
      var temp = String(element.getAttribute("onclick"));
      element.removeAttribute("onclick");
      if ( temp == null || (temp.indexOf("null") > -1 ) )
      {
        tempID = "openEventWindow_" + (idCount++);
      }
      else // This was an onclick, we will use it
      {
        var theValue = temp.substring(temp.indexOf('(')+1, temp.lastIndexOf(')'));
        temp = "openEventWindow_" + theValue;
        tempID = temp;
      }
      element.id = tempID;
    }
 }
var my_iCal_rules = {
    // Work with the Week Calendar Displays - Modify the Days in TD -
    // the onclick is needed for IE, We can simlpy remove them upfront for firefox
  'td.rowOff2' : function(element){
    element.onclick = function(){ 
      this.removeAttribute("onclick");
    };
  },
  'td.rowOff' : function(element){
    element.onclick = function(){
      this.removeAttribute("onclick");
    };
  },
  'td.rowOn2' : function(element){
    element.onclick = function(){
      this.removeAttribute("onclick");
    };
  },
  'td.rowOn' : function(element){
    element.onclick = function(){
      this.removeAttribute("onclick");
    };
  },
  'td.rowToday' : function(element){
    element.onclick = function(){
      this.removeAttribute("onclick");
    };
  },
    // Work with the Jump to functionality
  'select.query_style' : function(element) {
    element.onchange = function() {
      getCalendar(this.options[this.selectedIndex].value);
    }
  },
    
    // Work the individual links of the Calendar
  'a.ps' : function(element){
      // Has a Javascript pair to be evaluated
    createCalendarNodeID(element);
    element.onclick = function(){
      clickICalEvent(this);
      this.removeAttribute("href");
    };
  },
  'a.ps3' : function(element){
      // Has a Javascript pair to be evaluated
    createCalendarNodeID(element);
    element.onclick = function(){
      clickICalEvent(this);
      this.removeAttribute("href");
    };
  },
  'a.psf' : function(element){
    element.onclick = function(){
      // Has javascript in the href itself
      var hrefValue = String(element.getAttribute("href"));
      this.removeAttribute("href");
      if ( hrefValue.indexOf("javascript:") > -1 )
      { // use the href value
        eval(hrefValue);
      }
      else // Does not have javascript, regular href
      {
        var pos = hrefValue.lastIndexOf('/');
        if ( pos > -1 )
        { // there is something in the href, use it.
          hrefValue = hrefValue.substring(pos+1);
          getCalendar(hrefValue);
        }
        else if ( hrefValue.lastIndexOf('#') > -1 )
        { // empty href, look for the javascript CDATA information,
          // from onclick data
          clickICalEvent(this);
        }
        else
        { // Whatever is left over
          getCalendar(hrefValue);
        }
      }
      return false;
    };
    
  }
};

Behaviour.register(my_iCal_rules);
