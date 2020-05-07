/*
 *
 */

var LayerManager = 
{
  showHelpLayer: function(url) {
        // TODO add in parsing and show of HELP layers
  },

  showLayer:function(url)
  {
    // Set vars
    var $_GET = LayerManager.querystring_to_array(url); 
    var CSSwidth = ($_GET['width']) ? parseInt($_GET['width']) : 600;
    var CSSheight = ($_GET['height']) ? parseInt($_GET['height']) + 25 : 400;
    var CSSleft = ($_GET['left']) ? parseInt($_GET['left']) : -1;
    var CSStop = ($_GET['top']) ? parseInt($_GET['top']) : 100;
    var docWidth = $(document).width();
    var docHeight = $(document).height();
    var calcDocWidth = (docWidth/2);
    var calcCSSWidth = (CSSwidth+43) / 2;
    if ( CSSleft < 0 ) {
      CSSleft = Math.floor( calcDocWidth - calcCSSWidth);
    }

    // Hide select boxes for IE6 users
    $("select").hide(); 
    // Disable page scrolling
    //$("html").css("overflow", "hidden");
    // Init tabindex
    $("#popup").attr("tabIndex", 0);
    $("#layer").attr("tabIndex", 0);
    $("#layer").css("height",$(document).height() + "px");
    $("#popupDivert").attr("tabIndex", 0);
    // Init attributes
    $("#popup").css("top", CSStop + "px");
    $("#popup").css("left", CSSleft + "px");
    $("#popup").css("width", CSSwidth + "px");
    $("#popup").css("height", CSSheight + "px");

    $("#popup").css("position", "absolute");
    
    // Show the loading icon
    $("#popup").append('<div class="loadicon"><img src="images/loading.gif" alt="Loading" title="" /></div>');
    $("#layer").show();

    // Load the data
    $.get( url, function(data){ LayerManager.loadContent(data) } ); 

    $("#popup").addClass("popup"); 

    // Set timout to ensure nodes are added to element before focus given, else they are missed
    var to = window.setTimeout(function(){
      $("#popup").focus();
      window.clearTimeout(to);
    }, 100);  
  },

  closePopup:function(event)
  {
    $("#popup").attr("tabIndex", null);
    $("#layer").attr("tabIndex", null);
    $("#popupDivert").attr("tabIndex", null);
    $("#layer").css("display", "none");
    $("#popup").removeClass("popup");
    $("#popup").empty();
    $("#popup").css("height", 0);
    $("#popup").css("width", 0);
    $("#layer").hide();

    // Show select boxes for IE6 users
    $("select").show();
    // Re-enable page scrolling
    //$("html").css("overflow", "auto");
  },

  checkLayer:function(event)
  {
    var popup = document.getElementById("popup");
    if( $("#popup").hasClass("popup") && event == "popup") {
      document.getElementById("closePopup").focus();
    }
    else if( $("#popup").hasClass("popup")) {
      popup.focus();
    }
  },
  loadContent:function(dat)
  {
    var contentHeight = $("#popup").height() - 20;
    $("#popup").empty();
    $("#popup").append('<div class="popup_header"><a href="#" id="closePopup"><img src="images/close.gif" alt="Close" title="Close" /></a></div>');
    $("#popup").append('<div id="popup_content">' + dat + '</div>');
//    $("#popup_content").css("height", contentHeight + "px" );
    // Bind close button
    $("#closePopup").click(function(){
      LayerManager.closePopup();
      return false;
    });
    // Bind escape key to close function
    $(document).keyup(function(event){
      if(event.keyCode == 27) {
        LayerManager.closePopup();
        return false;
      }
    }); 
  },
// Convert a querystring to an associative array
  querystring_to_array: function(q) {
    var arr0 = q.split('?');
    var arr1 = arr0[1].split('&');
    var arr2 = new Array();
    var arr3 = new Array();
    
    for(var i=0; i<arr1.length; i++) {
      arr2 = arr1[i].split('=');
      arr3[arr2[0]] = arr2[1]; } 
    return arr3;
  } 
} 


  // this script can be used with one or more page elements to perform actions based on them being swiped with a single finger
function setDateNodes() {
  var mList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var date = new Date();
  var day = date.getDate();
  var year = date.getFullYear();
  var month = mList[date.getMonth()] + "&nbsp;&nbsp;";

  document.getElementById('day').innerHTML = day;
  document.getElementById('month').innerHTML = month;
  document.getElementById('year').innerHTML = year;
}

function autoTab(current,next) {
  var currAttr = current.getAttribute;
  var curLen = current.value.length;
  var currgetAttr =  current.getAttribute("maxlength");
  if ( current.getAttribute && current.value.length == current.getAttribute("maxlength") ) {
    next.focus();
  }
}

function lightbox_init() {
      // Bind lightbox layer function
  $(".lightbox").click(function(){
        LayerManager.showLayer( $(this).attr("href")  );
        setTimeout(addNewObservers, 2000);
          // Small Delay, to allow the page to Normalize 
        return false;
      }); 
    // Focus hits top of lightbox
  $("#layer").focus(function(){
        LayerManager.checkLayer('layer'); return false;
      }); 
    // Focus leaves lightbox
  $("#popupDivert").focus(function(){
        LayerManager.checkLayer('popupDivert');
        return false;
      }); 
  
}
function insertParam(key, value)
{
  key = escape(key); value = escape(value);
  var kvp = document.location.search.substr(1).split('&');
  var i=kvp.length; var x;
  while(i--)   {
    x = kvp[i].split('=');
    if (x[0]==key) {
      x[1] = value;
      kvp[i] = x.join('=');
      break;
    }
  }

  if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
  document.location.search = kvp.join('&'); 
}

function processPageUpdate() {
$.ajax({
  url: 'getData.html',
  success: function(data) {
    $('#serverData').html(data);
  }
});
// Get cookie data

}
function addNewObservers() {
  $('#layerDownload').bind("click", function() {
        setTimeout(function() {insertParam('PDF', 'true');}, 500);
      });
}
function initNotWorkingObservers() {
  $("input.fldAutoTab").each(function(i) {
        this.value = "";
      });
  
  $("#first").bind('keyup', function() { autoTab(this, $("#second") ); } );
  $("#second").bind('keyup', function() { autoTab(this,  $("#third") ); } );
  // No need for auto tab 3rd field
  
  $("#TestMouseOver").bind("mouseover",function(){ document.images['homepic'].src = "img/on.gif"; } );
  $("#TestMouseOver").bind("mouseout",function(){ document.images['homepic'].src = "img/off.gif"; } );
  processPageUpdate();
}
function testReload() {
  console.log("runnning");
  var tmp = $("#download-wrapper").length;
  if ( tmp > 0 ) {
    window.location.reload();
  }
}
$(document).ready(function() {
//      testReload();
      setDateNodes();
      initNotWorkingObservers();
      lightbox_init();
});
