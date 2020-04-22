/*
 * Core.js
 */
/* XSS protection */
if (top != self) {top.location=self.document.location; }
/*Added to fix issue in IE 6 with CSS button*/
try {document.execCommand("BackgroundImageCache", false, true);} catch(err) {}




// Begin clock code
var timerID = null;
var timerRunning = false;
var timeValue = null;

function stopclock (){
  if(timerRunning)
  clearTimeout(timerID);
  timerRunning = false;
}
function showtime () {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  timeValue = "" + ((hours >12) ? hours -12 :hours);
  if (timeValue == "0") timeValue = 12;
  timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
  timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
  timeValue += (hours >= 12) ? " P.M." : " A.M.";
  document.getElementById("face").value = timeValue;
  timerID = setTimeout("showtime()",1000);
  timerRunning = true;
}
function startclock() {
  stopclock();
  showtime();
}




/* Another dumb Method - that is needed */
function isIE() {
  var retVal = false;
  retVal = (window.ActiveXObject) || (navigator.appVersion.indexOf("MSIE")!=-1);
  return retVal;
}
function isSafari() {
  var ua = navigator.userAgent.toLowerCase();
  var retval = (ua.indexOf('safari') > -1);
  return retval;
}
function isOpera() {
  var ua = navigator.userAgent.toLowerCase();
  var retval = (ua.indexOf('opera') > -1);
  return retval;
}
function isFirefox() {
  var ua = navigator.userAgent.toLowerCase();
  var retval = (ua.indexOf('firefox') > -1);
  return retval;
}
// onClick example 3
function validate(evt)
 {
   Event.stop(evt);
   input_box=confirm('Are you sure your name is ' + $('yourname').value);
   if (input_box)
   {
// Output when OK is clicked
     alert ('Your name is ' + $('yourname').value);
   }
   else
   {
// Output when Cancel is clicked
     alert ('Enter your name correctly');
     $('yourname').value='';
     $('yourname').focus();
   }
 }

function checkAnswer() {
    // Check for an operational DOM
  if(document.getElementById) {
      // Make the right/wrong answer messages invisible by setting their
      // class names to "invis" - see style definitions below
    $('correct').className = "invis";
    $('higher').className = "invis";
    $('lower').className = "invis";

    var thenum = $('input1').value;

    if (((thenum / thenum) != 1) && (thenum != 0)) {
      alert('Please enter only a number into this text box');
      $('input1').value = '';
      var timer = setTimeout("document.getElementById('ex2').input1.focus()",20);
    }
    else
    {

        // Get answer from form using DOM and check it
      if(document.getElementById('input1').value > 7) {
          // If too high, change classname of 'lower' to make it visible, reset form and focus.
        $('lower').className = "lower";
        $('input1').value = '';
        var timer = setTimeout("document.getElementById('ex2').input1.focus()",20);
      }
      else if(document.getElementById('input1').value < 7) {
          // If to low, change classname of 'higher' to make it visible, reset form and focus.
        $('higher').className = "higher";
        $('input1').value = '';
        var timer = setTimeout("document.getElementById('ex2').input1.focus()",20);
      }
      else {
          // If correct, change classname of 'correct' to make it visible
        $('correct').className = "correct";
      }
    }
  }
}
function goto_URL(dest) {
  window.location.href = dest.options[dest.selectedIndex].value;
}
function checkAnswer2(evt) {
  if ( evt != null ) {   Event.stop(evt); }
  
    // Check for an operational DOM
  if(document.getElementById) {
      // Make the right/wrong answer messages invisible by setting their
      // class names to invis - see style definitions below
    $('answercorrect').className = "invis";
    $('answerwrong').className = "invis";

      // Get answer from form using DOM and check it
    if($('answerbox').value == 13) {
        // If correct, change classname of correct answer to make it visible
      $('answercorrect').className = "correct";
    }
    else {
        // If incorrect, change classname of wrong answer mesg to make it visible
      $('answerwrong').className = "incorrect";
    }
  }
}
function processConfirm1(evt) {
  Event.stop(evt);
  var result = confirm('Are you sure you want to view this page?');
  if ( result )
  {
    var node = this;
    var href = null;
    if ( node.nodeName != "A" )
    {
      href = "./NoscriptIndex.php?id=" + this.id;
    }
    else
    {
      href = node.href;
    }
    window.location = href;
  }
  return result;
}
function showThePopup(evt) {
  Event.stop(evt);
  window.open(this.href);
  return false;
}
function doPopup(evt) {
  Event.stop(evt); // stop any further action
  var node = Event.element(evt); // get the selected node
  var width=300;
  var height=330;
    // open the window
  var mywindow = window.open(node.href, "mywindow",
                             "location=1,status=1,scrollbars=1,  width="+width+",height="+height+" ");
  mywindow.moveTo(0, 0); // move it to the spot where it needs to be.
  return false;
}
function addObserversDemo7() {
  var bodyNode = $("demo7");
  if ( bodyNode != null )
  {
    $("popupLink").observe("click", showThePopup);
    $("popupLink3").observe("click", showThePopup);
    $("popupLink2").observe("click", function(evt) { return doPopup(evt); });
  }
  
}
function addObserversDemo6() {
  var bodyNode = $("demo6");
  if ( bodyNode != null )
  {
    $("showTimeBtn").observe("click",function() {
          alert('The current time is ' + timeValue);
        });
    startclock();
  }
  
}
function addObserversDemo5() {
  var bodyNode = $("demo5");
  if ( bodyNode != null )
  {
    $("selectPage").observe("change",function() {
          goto_URL($("selectPage"));
        });
    $("selectPageBtn").observe("click",function() {
          goto_URL($("selectPage2"));
        });
  }
  
}
function addObserversDemo4() {
  var bodyNode = $("demo4");
  if ( bodyNode != null )
  {
    $("TestLink4_1").observe("click",processConfirm1);
    $("TestLink4_2").observe("click",processConfirm1);
    $("TestLink4_3").observe("click",validate);
    $("TestLink4_4").observe("click",checkAnswer2);
  }
  
}
function addObserversDemo3() {
  var bodyNode = $("demo3");
  if ( bodyNode != null )
  {
    $("input1").observe("blur",checkAnswer);
  }
}

function addObserversDemo2() {
  var bodyNode = $("demo2");
  if ( bodyNode != null )
  {
    $("TestMouseOver2").observe("mouseover",function(){
          document.images['homepic'].src = "images/mouseover2.gif";
        });
    $("TestMouseOver2").observe("mouseout",function(){
          document.images['homepic'].src = "images/mouseover.gif";
        });

    $("TestMouseOver2a").observe("mouseover",function(){
          document.images['ex1pic2'].src = "images/mouseover2.gif";
        });
    $("TestMouseOver2a").observe("mouseout",function(){
          document.images['ex1pic2'].src = "images/mouseover.gif";
        });
    $("TestMouseOver2a").observe("blur",function(){
          document.images['ex1pic2'].src = "images/mouseover.gif";
          $("ex1pic2").removeClassName("gotFocusTest2a");
        });
    $("TestMouseOver2a").observe("focus",function(){
          document.images['ex1pic2'].src = "images/mouseover2.gif";
          $("ex1pic2").addClassName("gotFocusTest2a");
        });
  }
}
function addObserversDemo1() {
  var bodyNode = $("demo1");
  if ( bodyNode != null )
  {
    $("TestMouseOver").observe("mouseover",function(){
          document.images['homepic'].src = "images/on.gif";
        });
    $("TestMouseOver").observe("mouseout",function(){
          document.images['homepic'].src = "images/off.gif";
        });
    

  }
}

/* Function to be triggered once the page has loaded */
Event.observe(window,"load",function(){
      addObserversDemo1();
      addObserversDemo2();
      addObserversDemo3();
      addObserversDemo4();
      addObserversDemo5();
      addObserversDemo6();
      addObserversDemo7();
});

/* end File */
