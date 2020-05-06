/*
 *
 */
var index = 0;
var MAX = 7;
var animID = 0;
var showborder = false;

function stopAnimation()
 {
   clearInterval(animID);
   var i = 1;
   for( i=1; i <=MAX; i++ )
   {
     var prevElement = $("lnk"+index);
     if( prevElement != null )
     {
       prevElement.removeClassName("activeLnk");
     }
   }
 }
function animateImage()
 {
   index = 0;
   animID = setInterval(changeClass, 200);
 }
function changeClass()
 {
   
   var prevElement = $("lnk"+index);
   if( prevElement != null )
   {
      prevElement.removeClassName("activeLnk");
   }
   index = (((index + 1) > MAX)? 1 : (index + 1) );
   var nextElement = $("lnk"+index);
   if( nextElement != null )
   {
     nextElement.addClassName("activeLnk");
   }
 }

function goNextPage(pageNum)
 {
   if ( pageNum == 8 )
   {
     window.location = "./pageConclusion.html";
   }
   else
   {
     window.location = "./pageSpritesDemo"+pageNum+".html";
   }
 }

function showActive(newNode)
 {
   var MAX_LINKS = 5;
   var element = null;
   var tempParent = null;
   for( var i = 0; i <= MAX_LINKS; i++ )
   { // IE is so lame, iterate over all the nodes - Just for IE
     element = null;
     element = $("lnk"+i);
     if( element != null )
     {
       element.removeClassName("activelink");
       tempParent = null;
       tempParent = $(element.parentNode.id);
       if( tempParent != null )
       {
         tempParent.removeClassName("activeParent");
       }
     }
   }
     // This works great in all Browsers but IE.
//    var element = getElementsByAttribute("class", "activelink", $("header"))[0];
//    element = getElementsByAttribute("class", "activeParent", $("header"))[0];
//    if( element != null )
//    {
//      element.removeClassName("activeParent");
//    }
   var parentNode = $(newNode.parentNode.id);
   if( parentNode == null )
   {
     parentNode = $(newNode.parentElement.id);
   }
   parentNode.addClassName("activeParent");
   Element.addClassName(newNode,"activelink"); // this is for Cross Browser, IE has an Issue
   return false;
 }
function showFixedActive(newIDName)
 {
   var bodyElement = document.getElementsByTagName("body")[0];
   bodyElement.id = newIDName;
 }


/* function getElementsByAttribute(). returns a element based on a attribute and value.
 * The condition is in the form of a container, list of tags with attribute by value
 * var helloElms = getElementsByAttribute("class", "MyRedClass", container)
 * @param attr : the attribute desired to be evaluated.
 * @param val  : the value of the attribute being examined 
 * @param container : The container
 * @returns Array
 */
function getElementsByAttribute(attr,val,container)
{
  container = container || document;
  var all = container.all || container.getElementsByTagName('*');
  var arr = [];
  for(var k=0;k<all.length;k++)
  {
    var aNode = all[k];
    var anAttr = aNode.getAttribute(attr);
    if(all[k].getAttribute(attr) == val)
    {
      arr[arr.length] = all[k];
    }
  }
  return arr;
}
function count(nmbr)
 {
   if( nmbr == 2 )
   {
     alert( "2 is correct" );
   }
   else
   {
     alert("Sorry... not " + nmbr + ", try again!");
   }
 }

