/*
 *
 */
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
function logMsg(msg) {
  var logNode = document.getElementById('eventLog');
  logNode.innerHTML += "<br/>" + (msg);
}

var triggerNodeID = null; // this variable is used to identity the triggering element
var fingerCount = 0;
var startX = 0;
var startY = 0;
var curX = 0;
var curY = 0;
var deltaX = 0;
var deltaY = 0;
var horzDiff = 0;
var vertDiff = 0;
var minLength = 72; // the shortest distance the user may swipe
var swipeLength = 0;
var swipeAngle = null;
var swipeDirection = null;

function touchStart(event,nodeID) {
    // disable the standard ability to select the touched object
  event.preventDefault();
    // get the total number of fingers touching the screen
  fingerCount = event.touches.length;
    // since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
    // check that only one finger was used
  logMsg('touchStart Fired: id='+nodeID+', fingerCount=['+fingerCount+']');
  if ( fingerCount == 1 ) {
      // get the coordinates of the touch
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
      // store the triggering element ID
    triggerNodeID = nodeID;
  } else {
      // more than one finger touched so cancel
    touchCancel(event);
  }
}

function touchMove(event) {
  event.preventDefault();
  if ( event.touches.length == 1 ) {
    curX = event.touches[0].pageX;
    curY = event.touches[0].pageY;
  } else {
    touchCancel(event);
  }
  logMsg('touchMove Fired: id='+triggerNodeID+',curX=['+curX+'], curY=['+curY+']');
  
}

function touchEndColor(event) {
  logMsg('touchEnd Fired: id='+triggerNodeID+' ');
  event.preventDefault();
    // check to see if more than one finger was used and that there is an ending coordinate
  if ( fingerCount == 1 && curX != 0 ) {
      // use the Distance Formula to determine the length of the swipe
    swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
      // if the user swiped more than the minimum length, perform the appropriate action
    if ( swipeLength >= minLength ) {
      caluculateAngle();
      determineSwipeDirection();
      processingRoutine();
    }
  }
  touchCancel(event); // reset the variables
}
function touchEndCarousel(event) {
  logMsg('touchEnd Fired: id='+triggerNodeID+' ');
  event.preventDefault();
    // check to see if more than one finger was used and that there is an ending coordinate
  if ( fingerCount == 1 && curX != 0 ) {
      // use the Distance Formula to determine the length of the swipe
    swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
      // if the user swiped more than the minimum length, perform the appropriate action
    if ( swipeLength >= minLength ) {
      caluculateAngle();
      determineSwipeDirection();
      processCarouselSwipe();
    }
  }
  touchCancel(event); // reset the variables
}

function touchCancel(event) {
  logMsg('touchCancel Fired: id='+triggerNodeID+' ');
    // reset the variables back to default values
  fingerCount = 0;
  startX = 0;
  startY = 0;
  curX = 0;
  curY = 0;
  deltaX = 0;
  deltaY = 0;
  horzDiff = 0;
  vertDiff = 0;
  swipeLength = 0;
  swipeAngle = null;
  swipeDirection = null;
  triggerNodeID = null;
}

function caluculateAngle() {
  var X = startX-curX;
  var Y = curY-startY;
  var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
  var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
  swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
  if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
}

function determineSwipeDirection() {
  if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
    swipeDirection = 'left';
  } else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
    swipeDirection = 'left';
  } else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
    swipeDirection = 'right';
  } else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
    swipeDirection = 'down';
  } else {
    swipeDirection = 'up';
  }
  logMsg('determineSwipeDirection: id='+triggerNodeID+', swipe=['+swipeDirection+'], angle=['+swipeAngle+' deg]');
}

function processingRoutine() {
  var swipedElement = document.getElementById(triggerNodeID);
  
  swipedElement.style.color = "#ffffff";
  
  if ( swipeDirection == 'left' ) {  // REPLACE WITH YOUR ROUTINES
    swipedElement.style.backgroundColor = 'orange';
    swipedElement.style.color = "#000000";
  } else if ( swipeDirection == 'right' ) { // REPLACE WITH YOUR ROUTINES
    swipedElement.style.backgroundColor = 'green';
  } else if ( swipeDirection == 'up' ) { // REPLACE WITH YOUR ROUTINES
    swipedElement.style.backgroundColor = 'maroon';
  } else if ( swipeDirection == 'down' ) { // REPLACE WITH YOUR ROUTINES
    swipedElement.style.backgroundColor = 'purple';
  }
}
function processCarouselSwipe() {
  var swipedElement = $(triggerNodeID);
  
   if ( swipeDirection == 'left' ) {
     swipedElement.stopClock();
     swipedElement.shift('next');
   } else if ( swipeDirection == 'right' ) {
     swipedElement.stopClock();
     swipedElement.shift('prev');
   }
   swipedElement.resetClock(); // startClock() from 0
   
}

function initColorChange() {
  var obj = document.getElementById('swipeBand');
  
  obj.addEventListener('touchstart', function(event) {  touchStart(event, 'swipeBand'); }, false);  
  obj.addEventListener('touchmove', function(event) {   touchMove(event); }, false);  
  obj.addEventListener('touchend', function(event) {    touchEndColor(event); }, false);  
  obj.addEventListener('touchcancel', function(event) { touchCancel(event); }, false);  
}
function initCarouselChange() {
  var obj = document.getElementById('carousel');
  
  obj.addEventListener('touchstart', function(event) {  touchStart(event, 'carousel'); }, false);  
  obj.addEventListener('touchmove', function(event) {   touchMove(event); }, false);  
  obj.addEventListener('touchend', function(event) {    touchEndCarousel(event); }, false);  
  obj.addEventListener('touchcancel', function(event) { touchCancel(event); }, false);  
}


$(document).ready(function() {
      setDateNodes();
      initColorChange();
      $('#carousel').orbit();
      initCarouselChange();
      
});
