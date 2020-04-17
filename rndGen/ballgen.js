/*
 *
 */
window.requestAnimFrame = (function(callback){
      return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback){
        window.setTimeout(callback, 1000 / 60);
      };
    })();


function IsNumeric(n){
    return !isNaN(n);
} 

function genRandomNumber() {
  var numLow = document.getElementById("lownumber").value;
  var numHigh = document.getElementById("highnumber").value;
  
  var adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
  
  if ((IsNumeric(numLow)) && (IsNumeric(numHigh)) && (parseFloat(numLow) <= parseFloat(numHigh)) && (numLow != '') && (numHigh != '')) {
    var numRand = Math.floor(Math.random()*adjustedHigh) + parseFloat(numLow);
    return numRand;
  } else {
    alert("Careful now...");
    return 0;
  }
  
}
function getRndNumber() {
    var numHigh = 131.0;
    var numLow = 8.1;
    var adjustedHigh = numHigh - numLow + 1;
    var numRand = parseInt(Math.floor(Math.random()*adjustedHigh) + parseFloat(numLow));
    return numRand;
}

function adjustOffset( ballList, offset ) {
  for( var i = 0; i < ballList.length; i++ ) {
    ballList[i].x += offset;
    ballList[i].origX += offset;
  }
}

function getBallNumberFactory( value, offset) {
  var numb1 = [];
  var numb2 = [];
  var numb3 = [];
  var numb4 = [];
  var numb5 = [];
  var numb6 = [];
  var numb7 = [];
  var numb8 = [];
  var numb9 = [];
  var numb0 = [];
            
            
  var red = "#EF2B36";
  var green = "#02A817";
  var blue = "#3A5BCD";
  var yellow = "#FFC636";
  var color = "";

  var rndNumb = getRndNumber();
  var temp = rndNumb % 7;
  switch( temp ) {
    case 0: color = red;  break;
    case 1: color = green;  break;
    case 2: color = blue;  break;
    case 3: color = yellow;  break;
    case 4: color = red;  break;
    case 5: color = green;  break;
    case 6: color = blue;  break;
  }


  numb1.push(new Ball(54, 49, 0, 0, color));
  numb1.push(new Ball(41, 50, 0, 0, color));
  numb1.push(new Ball(51, 61, 0, 0, color));
  numb1.push(new Ball(50, 73, 0, 0, color));
  numb1.push(new Ball(52, 89, 0, 0, color));
  numb1.push(new Ball(50, 105, 0, 0, color));
  numb1.push(new Ball(50, 118, 0, 0, color));
  numb1.push(new Ball(48, 128, 0, 0, color));
  numb1.push(new Ball(60, 128, 0, 0, color));

  numb2.push(new Ball(60, 50, 0, 0, color));
  numb2.push(new Ball(58, 49, 0, 0, color));
  numb2.push(new Ball(46, 49, 0, 0, color));
  numb2.push(new Ball(35, 54, 0, 0, color));
  numb2.push(new Ball(58, 86, 0, 0, color));
  numb2.push(new Ball(62, 79, 0, 0, color));
  numb2.push(new Ball(62, 64, 0, 0, color));
  numb2.push(new Ball(55, 98, 0, 0, color));
  numb2.push(new Ball(40, 105, 0, 0, color));
  numb2.push(new Ball(27, 112, 0, 0, color));
  numb2.push(new Ball(25, 125, 0, 0, color));
  numb2.push(new Ball(39, 125, 0, 0, color));
  numb2.push(new Ball(52, 125, 0, 0, color));
  numb2.push(new Ball(67, 125, 0, 0, color));

  numb3.push(new Ball(60, 50, 0, 0, color));
  numb3.push(new Ball(58, 49, 0, 0, color));
  numb3.push(new Ball(46, 49, 0, 0, color));
  numb3.push(new Ball(35, 54, 0, 0, color));
  numb3.push(new Ball(58, 86, 0, 0, color));
  numb3.push(new Ball(62, 79, 0, 0, color));
  numb3.push(new Ball(62, 64, 0, 0, color));
  numb3.push(new Ball(55, 98, 0, 0, color));
  numb3.push(new Ball(45, 90, 0, 0, color));
  numb3.push(new Ball(40, 90, 0, 0, color));
  numb3.push(new Ball(62, 105, 0, 0, color));
  numb3.push(new Ball(62, 112, 0, 0, color));
  numb3.push(new Ball(62, 125, 0, 0, color));
  numb3.push(new Ball(58, 125, 0, 0, color));
  numb3.push(new Ball(46, 125, 0, 0, color));
  numb3.push(new Ball(35, 125, 0, 0, color));
            
  numb4.push(new Ball(35, 50, 0, 0, color));
  numb4.push(new Ball(35, 54, 0, 0, color));
  numb4.push(new Ball(35, 64, 0, 0, color));
  numb4.push(new Ball(35, 74, 0, 0, color));
  numb4.push(new Ball(37, 84, 0, 0, color));
  numb4.push(new Ball(50, 84, 0, 0, color));
  numb4.push(new Ball(65, 84, 0, 0, color));
  numb4.push(new Ball(67, 50, 0, 0, color));
  numb4.push(new Ball(67, 54, 0, 0, color));
  numb4.push(new Ball(67, 64, 0, 0, color));
  numb4.push(new Ball(67, 74, 0, 0, color));
  numb4.push(new Ball(67, 94, 0, 0, color));
  numb4.push(new Ball(67, 104, 0, 0, color));
  numb4.push(new Ball(67, 114, 0, 0, color));
  numb4.push(new Ball(67, 125, 0, 0, color));
                
  numb5.push(new Ball(67, 50, 0, 0, color));
  numb5.push(new Ball(52, 50, 0, 0, color));
  numb5.push(new Ball(39, 50, 0, 0, color));
  numb5.push(new Ball(25, 50, 0, 0, color));
  numb5.push(new Ball(25, 62, 0, 0, color));
  numb5.push(new Ball(28, 75, 0, 0, color));
  numb5.push(new Ball(27, 85, 0, 0, color));
  numb5.push(new Ball(43, 83, 0, 0, color));
  numb5.push(new Ball(58, 93, 0, 0, color));
  numb5.push(new Ball(65, 108, 0, 0, color));
  numb5.push(new Ball(63, 123, 0, 0, color));
  numb5.push(new Ball(55, 133, 0, 0, color));
  numb5.push(new Ball(45, 135, 0, 0, color));
  numb5.push(new Ball(35, 135, 0, 0, color));
  numb5.push(new Ball(27, 123, 0, 0, color));

  numb6.push(new Ball(60, 50, 0, 0, color));
  numb6.push(new Ball(52, 58, 0, 0, color));
  numb6.push(new Ball(46, 64, 0, 0, color));
  numb6.push(new Ball(38, 72, 0, 0, color));
  numb6.push(new Ball(35, 84, 0, 0, color));
  numb6.push(new Ball(35, 93, 0, 0, color));
  numb6.push(new Ball(30, 100, 0, 0, color));
  numb6.push(new Ball(25, 110, 0, 0, color));
  numb6.push(new Ball(45, 87, 0, 0, color));
  numb6.push(new Ball(58, 93, 0, 0, color));
  numb6.push(new Ball(65, 108, 0, 0, color));
  numb6.push(new Ball(63, 123, 0, 0, color));
  numb6.push(new Ball(55, 133, 0, 0, color));
  numb6.push(new Ball(45, 135, 0, 0, color));
  numb6.push(new Ball(35, 135, 0, 0, color));
  numb6.push(new Ball(27, 128, 0, 0, color));
  numb6.push(new Ball(27, 120, 0, 0, color));

  numb7.push(new Ball(25, 50, 0, 0, color));
  numb7.push(new Ball(39, 50, 0, 0, color));
  numb7.push(new Ball(52, 50, 0, 0, color));
  numb7.push(new Ball(67, 50, 0, 0, color));
  numb7.push(new Ball(67, 62, 0, 0, color));
  numb7.push(new Ball(60, 72, 0, 0, color));
  numb7.push(new Ball(60, 72, 0, 0, color));
  numb7.push(new Ball(57, 85, 0, 0, color)); //
  numb7.push(new Ball(50, 95, 0, 0, color));
  numb7.push(new Ball(47, 105, 0, 0, color));
  numb7.push(new Ball(45, 115, 0, 0, color));
  numb7.push(new Ball(43, 125, 0, 0, color));
  numb7.push(new Ball(43, 135, 0, 0, color));
            
  numb8.push(new Ball(60, 50, 0, 0, color));
  numb8.push(new Ball(58, 49, 0, 0, color));
  numb8.push(new Ball(46, 49, 0, 0, color));
  numb8.push(new Ball(35, 54, 0, 0, color));
  numb8.push(new Ball(30, 68, 0, 0, color));
  numb8.push(new Ball(34, 81, 0, 0, color));
  numb8.push(new Ball(48, 86, 0, 0, color));
  numb8.push(new Ball(62, 79, 0, 0, color));
  numb8.push(new Ball(62, 64, 0, 0, color));
  numb8.push(new Ball(55, 88, 0, 0, color));
  numb8.push(new Ball(57, 95, 0, 0, color));
  numb8.push(new Ball(53, 95, 0, 0, color));
  numb8.push(new Ball(40, 105, 0, 0, color));
  numb8.push(new Ball(27, 112, 0, 0, color));
  numb8.push(new Ball(25, 125, 0, 0, color));
  numb8.push(new Ball(39, 135, 0, 0, color));
  numb8.push(new Ball(52, 136, 0, 0, color));
  numb8.push(new Ball(67, 131, 0, 0, color));
  numb8.push(new Ball(71, 119, 0, 0, color));
  numb8.push(new Ball(66, 107, 0, 0, color));
                
  numb9.push(new Ball(45, 51, 0, 0, color));
  numb9.push(new Ball(32, 61, 0, 0, color));
  numb9.push(new Ball(31, 73, 0, 0, color));
  numb9.push(new Ball(35, 86, 0, 0, color));
  numb9.push(new Ball(44, 97, 0, 0, color));
  numb9.push(new Ball(58, 100, 0, 0, color));
  numb9.push(new Ball(79, 84, 0, 0, color));
  numb9.push(new Ball(77, 68, 0, 0, color));
  numb9.push(new Ball(72, 56, 0, 0, color));
  numb9.push(new Ball(60, 51, 0, 0, color));
  numb9.push(new Ball(72, 97, 0, 0, color));
  numb9.push(new Ball(67, 105, 0, 0, color));
  numb9.push(new Ball(65, 110, 0, 0, color));
  numb9.push(new Ball(63, 123, 0, 0, color));
  numb9.push(new Ball(58, 133, 0, 0, color));
  numb9.push(new Ball(50, 143, 0, 0, color));
                
  numb0.push(new Ball(73, 63, 0, 0, color));
  numb0.push(new Ball(58, 53, 0, 0, color));
  numb0.push(new Ball(43, 52, 0, 0, color));
  numb0.push(new Ball(30, 53, 0, 0, color));
  numb0.push(new Ball(20, 58, 0, 0, color));
  numb0.push(new Ball(20, 70, 0, 0, color));
  numb0.push(new Ball(20, 82, 0, 0, color));
  numb0.push(new Ball(20, 96, 0, 0, color));
  numb0.push(new Ball(20, 107, 0, 0, color));
  numb0.push(new Ball(20, 120, 0, 0, color));
  numb0.push(new Ball(24, 130, 0, 0, color));
  numb0.push(new Ball(39, 136, 0, 0, color));
  numb0.push(new Ball(52, 136, 0, 0, color));
  numb0.push(new Ball(66, 136, 0, 0, color));
  numb0.push(new Ball(74, 127, 0, 0, color));
  numb0.push(new Ball(74, 120, 0, 0, color));
  numb0.push(new Ball(74, 110, 0, 0, color));
  numb0.push(new Ball(74, 103, 0, 0, color));
  numb0.push(new Ball(74, 96, 0, 0, color));
  numb0.push(new Ball(74, 82, 0, 0, color));
  numb0.push(new Ball(74, 70, 0, 0, color));
  numb0.push(new Ball(74, 58, 0, 0, color));

  var ballList = [];
  switch( value ) {
    case 0:
      ballList.push.apply(ballList, numb0);
      break;
    case 1:
      ballList.push.apply(ballList, numb1);
      break;
    case 2:
      ballList.push.apply(ballList, numb2);
      break;
    case 3:
      ballList.push.apply(ballList, numb3);
      break;
    case 4:
      ballList.push.apply(ballList, numb4);
      break;
    case 5:
      ballList.push.apply(ballList, numb5);
      break;
    case 6:
      ballList.push.apply(ballList, numb6);
      break;
    case 7:
      ballList.push.apply(ballList, numb7);
      break;
    case 8:
      ballList.push.apply(ballList, numb8);
      break;
    case 9:
      ballList.push.apply(ballList, numb9);
      break;
  }

  adjustOffset(ballList, offset);
  return ballList;
}
                                  
function getBallList(value){
  var balls = [];
  var red = "#EF2B36";
  var green = "#02A817";
  var blue = "#3A5BCD";
  var yellow = "#FFC636";
  var positions = [];
  var values = [];

  var tValue = "" + value;
  var numbLength = tValue.length;
  for(var l = 0; l < tValue.length; l++ ) {
    values[l] = parseInt(tValue.charAt(l));
  }

  switch(numbLength) {
    case 3:
      positions[0] = 150;
      positions[1] = 250;
      positions[2] = 350;
      break;
    case 2:
      positions[0] = 200;
      positions[1] = 300;
      break;
    case 1:
      positions[0] = 250;
      break;
      
  }


  for( var i = 0; i < numbLength; i++ ) {
    var list = getBallNumberFactory(values[i], positions[i]);

    for ( var j = 0; j < list.length; j++ ) {
      balls.push(list[j]);
    }
  }


  balls.push(new Ball(120, 160, 0, 0, blue));
  balls.push(new Ball(135, 160, 0, 0, green));
  balls.push(new Ball(150, 160, 0, 0, yellow));
  balls.push(new Ball(165, 160, 0, 0, red));
  balls.push(new Ball(180, 160, 0, 0, green));
  balls.push(new Ball(195, 160, 0, 0, blue));
  balls.push(new Ball(210, 160, 0, 0, yellow));
  balls.push(new Ball(225, 160, 0, 0, yellow));
  balls.push(new Ball(240, 160, 0, 0, green));
  balls.push(new Ball(255, 160, 0, 0, blue));
  balls.push(new Ball(270, 160, 0, 0, yellow));
  balls.push(new Ball(285, 160, 0, 0, red));
  balls.push(new Ball(300, 160, 0, 0, blue));
  balls.push(new Ball(315, 160, 0, 0, green));
  balls.push(new Ball(330, 160, 0, 0, blue));
  balls.push(new Ball(345, 160, 0, 0, yellow));
  balls.push(new Ball(360, 160, 0, 0, yellow));
  balls.push(new Ball(375, 160, 0, 0, green));
  balls.push(new Ball(390, 160, 0, 0, blue));
  balls.push(new Ball(405, 160, 0, 0, yellow));
  balls.push(new Ball(420, 160, 0, 0, blue));
  balls.push(new Ball(435, 160, 0, 0, red));
  balls.push(new Ball(450, 160, 0, 0, green));
  balls.push(new Ball(465, 160, 0, 0, blue));
  balls.push(new Ball(480, 160, 0, 0, red));
  balls.push(new Ball(495, 160, 0, 0, yellow));
  

  

  return balls;
}
            
function getMousePos(canvas, evt){
    // get canvas position
  var obj = canvas;
  var top = 0;
  var left = 0;
  while (obj.tagName != 'BODY') {
    top += obj.offsetTop;
    left += obj.offsetLeft;
    obj = obj.offsetParent;
  }
                
    // return relative mouse position
  var mouseX = evt.clientX - left + window.pageXOffset;
  var mouseY = evt.clientY - top + window.pageYOffset;
  return {
    x: mouseX,
        y: mouseY
        };
}
            
function updateBalls(canvas, balls, timeDiff, mousePos){
  var context = canvas.getContext("2d");
  var collisionDamper = 0.3;
  var floorFriction = 0.0005 * timeDiff;
  var mouseForceMultiplier = 1 * timeDiff;
  var restoreForce = 0.002 * timeDiff;
                
  for (var n = 0; n < balls.length; n++) {
    var ball = balls[n];
      // set ball position based on velocity
    ball.y += ball.vy;
    ball.x += ball.vx;
                    
      // restore forces
    if (ball.x > ball.origX) {
      ball.vx -= restoreForce;
    }
    else {
      ball.vx += restoreForce;
    }
    if (ball.y > ball.origY) {
      ball.vy -= restoreForce;
    }
    else {
      ball.vy += restoreForce;
    }
                    
      // mouse forces
    var mouseX = mousePos.x;
    var mouseY = mousePos.y;
                    
    var distX = ball.x - mouseX;
    var distY = ball.y - mouseY;
                    
    var radius = Math.sqrt(Math.pow(distX, 2) +
                           Math.pow(distY, 2));
                    
    var totalDist = Math.abs(distX) + Math.abs(distY);
                    
    var forceX = (Math.abs(distX) / totalDist) *
        (1 / radius) *
        mouseForceMultiplier;
    var forceY = (Math.abs(distY) / totalDist) *
        (1 / radius) *
        mouseForceMultiplier;
                    
    if (distX > 0) { // mouse is left of ball
      ball.vx += forceX;
    }
    else {
      ball.vx -= forceX;
    }
    if (distY > 0) { // mouse is on top of ball
      ball.vy += forceY;
    }
    else {
      ball.vy -= forceY;
    }
                    
      // floor friction
    if (ball.vx > 0) {
      ball.vx -= floorFriction;
    }
    else if (ball.vx < 0) {
      ball.vx += floorFriction;
    }
    if (ball.vy > 0) {
      ball.vy -= floorFriction;
    }
    else if (ball.vy < 0) {
      ball.vy += floorFriction;
    }
                    
      // floor condition
    if (ball.y > (canvas.height - ball.radius)) {
      ball.y = canvas.height - ball.radius - 2;
      ball.vy *= -1;
      ball.vy *= (1 - collisionDamper);
    }
                    
      // ceiling condition
    if (ball.y < (ball.radius)) {
      ball.y = ball.radius + 2;
      ball.vy *= -1;
      ball.vy *= (1 - collisionDamper);
    }
                    
      // right wall condition
    if (ball.x > (canvas.width - ball.radius)) {
      ball.x = canvas.width - ball.radius - 2;
      ball.vx *= -1;
      ball.vx *= (1 - collisionDamper);
    }
                    
      // left wall condition
    if (ball.x < (ball.radius)) {
      ball.x = ball.radius + 2;
      ball.vx *= -1;
      ball.vx *= (1 - collisionDamper);
    }
  }
}
            
function Ball(x, y, vx, vy, color){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
  this.origX = x;
  this.origY = y;
  this.radius = 10;
}
            
function animate(canvas, balls, lastTime, mousePos){
  var context = canvas.getContext("2d");
                
    // update
  var date = new Date();
  var time = date.getTime();
  var timeDiff = time - lastTime;
  updateBalls(canvas, balls, timeDiff, mousePos);
  lastTime = time;
                
    // clear
  context.clearRect(0, 0, canvas.width, canvas.height);
                
    // render
  for (var n = 0; n < balls.length; n++) {
    var ball = balls[n];
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    context.fillStyle = ball.color;
    context.fill();
  }
                
    // request new frame
  requestAnimFrame(function(){
        animate(canvas, balls, lastTime, mousePos);
      });
}

function kickStart() {
  var canvas = document.getElementById("myCanvas");
  var rndNumb = genRandomNumber();
  var balls = getBallList(rndNumb);
  var date = new Date();
  var time = date.getTime() - (45 * 60 * 1000);

  var mousePos = {
    x: 300,
    y: 420
  };

  animate(canvas, balls, time, mousePos);
  
  mousePos = {
    x: 9999,
    y: 9999
  };
  animate(canvas, balls, time, mousePos);
  
}

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

window.onload = function(){
  setDateNodes();
  var canvas = document.getElementById("myCanvas");
  var btn = document.getElementById("getValue");
    /*
     * set mouse position really far away
     * so the mouse forces are nearly obsolete
     */
  var mousePos = {
    x: 9999,
    y: 9999
  };

  btn.addEventListener("click", function(evt){
        var pos = getMousePos(canvas, evt);
        mousePos.x = pos.x;
        mousePos.y = pos.y;
        kickStart();
      });
  
  canvas.addEventListener("mousemove", function(evt){
        var pos = getMousePos(canvas, evt);
        mousePos.x = pos.x;
        mousePos.y = pos.y;
      });
                
  canvas.addEventListener("mouseout", function(evt){
        mousePos.x = 9999;
        mousePos.y = 9999;
      });
                
};
