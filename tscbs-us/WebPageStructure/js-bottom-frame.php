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

    <title>Scripts... Put Scripts at Bottom</title>
  </head>

  <body>
     <div id="pageHead"><h1 class="frameTitle">Put Scripts at bottom of the page</h1></div>
     <div id="mainContent">
       <p>This page contains a <b><code>&lt;SCRIPT SRC="..."&gt;</code></b> tag at the bottom of the page in the
       document - after the <code>BODY</code> that takes 10 seconds to load.
       This demos emphasizes, anything above the script is flowing
       and downloading until after the script is loaded. In this case, that means
       the <i>entire page</i> is rendered.
       </p>
       <img class="bottomImage"  src="./images/bart2.gif"/>
       <div id="done-bottom"></div>  
     </div> <!-- mainContent -->
     
  </body>
  <script type="text/javascript" id="prototype_js" src="./scripts/prototype.js"></script>
  <script type="text/javascript" id="indexpage_js" src="./scripts/page_structure.js"></script>
  <script>
     <!--
     Event.observe(window, 'load', function() {
        pageScroll();
        sayDone("bottom");
     });    
     // -->
  </script>
  <script type="text/javascript" id="top_js"     src="getJavascriptScript.php?delay=10"></script>

</html>
