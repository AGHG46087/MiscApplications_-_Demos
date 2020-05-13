
var closeConnectionMillis = 80000;
var previousQuote = 0.0;
var canvas = null;

function startSocket()
 {
   if("WebSocket" in window)
   {
     var ws = new WebSocket("ws://localhost:12345");

     ws.onopen = function(event) {
       document.getElementById('status').innerHTML = "open: " + this.readyState;
       drawCanvas();
       setTimeout(function() {ws.send("close"); ws.close();}, closeConnectionMillis);
     }

     ws.onmessage = function(event) {
       document.getElementById('stock').innerHTML = event.data;
       drawIncrement(event.data);
     }
				
     ws.onclose = function(event) {
       document.getElementById('status').innerHTML = "closed:" + this.readyState;
     }			
   }
			
 }
function drawCanvas()  {
   counter = 15;
		
   canvas = document.getElementById('myCanvas');
   ctx = canvas.getContext('2d');
   ctx.strokeStyle = "#efefef";
   ctx.textBaseline = 'middle';
   for(var i = 0; i< 400; i+=10)
   {
     ctx.fillStyle = "#FFFFFF";
     ctx.fillText  (((400-i)/10).toString(), 0, i)
         ctx.beginPath();
     ctx.moveTo(counter,i);
     ctx.lineTo(400,i);
     ctx.closePath();
     ctx.stroke();
   }
 }
	
function drawIncrement(quote)  {
  quote = parseFloat(quote);
  var color = (previousQuote > quote ? "#EE0000" : (previousQuote < quote) ? "#00EE00" : "#EEEE00" );
   
  var x = counter;
  var y = canvas.height-(quote*10);
  var radius = 2;
  var startAngle = 0;
  var endAngle = 2 * Math.PI;
  var clockwise = true;
   
  ctx.beginPath();
  try {
    ctx.arc(x, y, radius,  startAngle,  endAngle, clockwise);
      //ctx.arc(counter, canvas.height-(quote*10), 2,  0,  2 * Math.PI, true);
  }
  catch (e) { }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  counter = counter + 5;
  previousQuote = quote;
}
