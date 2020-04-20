
<?php
 function getParms($parmVal)
 {
   $value = NULL;
   if(isset($_GET[$parmVal]))
   {
     $value = $_GET[$parmVal];
   }
   else if(isset($_POST[$parmVal]))
   {
     $value = $_POST[$parmVal];
   }
   return $value;
 }
 $hgDebug = getParms("hgdebug");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="Content-Language" content="en-us" />
    <meta name="keywords" content="Bla bla bla to be filled" />
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Cache-Control" content="no-cache,must-revalidate,max_age=0"/>
    <meta http-equiv="Expires" content="-1"/>
     
    <link href="css/page_structure.css" media="all" type="text/css" rel="stylesheet" id="preferred_css" title="page_structure"/>

    <title>Web Page Structures</title>
  </head>

  <body id="scriptlocationPHP">
     <div id="pageHead"><h1>Demos</h1></div>
     <div id="mainContent">
       
       <ul>
         <li id="link1"><a href="WebPageStructure.php"><h3>Web Page Structure</h3></a> - javascript include top,middle,bottom</li>
         <ul>
         <li id="link2"><a href="js-top-frame.php">Javascript at top of page</a></li>
         <li id="link3"><a href="js-middle-frame.php">Javascript in middle of page</a></li>
         <li id="link4"><a href="js-bottom-frame.php">Javascript at bottom of page</a></li>
         </ul>
         <li id="link5"><a href="Sync-vs-Async.php"><h3>Sync vs. Async</h3></a> - javascript document.write vs. DOM</li>
         <ul>
         <li id="link6"><a href="load-sync-js-frame.php">Javascript sync</a> - javascript document.write</li>
         <li id="link7"><a href="load-async-js-frame.php">Javascript async</a> - javascript DOM</li>
         </ul>
       </ul>
     </div> <!-- mainContent -->
     
  </body>
  <script type="text/javascript" id="prototype_js" src="./scripts/prototype.js"></script>
  <script type="text/javascript" id="indexpage_js" src="./scripts/page_structure.js"></script>
  <script>
     <!--
     Event.observe($("link1"), 'click', clearPage);    
     Event.observe($("link2"), 'click', clearPage);    
     Event.observe($("link3"), 'click', clearPage);    
     Event.observe($("link4"), 'click', clearPage);    
     Event.observe($("link5"), 'click', clearPage);    
     Event.observe($("link6"), 'click', clearPage);    
     Event.observe($("link7"), 'click', clearPage);    
       // -->
  </script>
</html>