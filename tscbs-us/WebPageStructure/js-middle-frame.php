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
     <p>Any components below a script are not downloaded until <i>after</i> the script is loaded,
     regardless of hostname. This page contains:
     <ul>
      <li> Three images: Three from <code>http://www.tscbs-us.com</code>
      <li> a script from <code>http://www.tscbs-us.com</code> that takes 10 seconds to load
     </ul>
     </p>
     <p>The first two images are not downloaded, even though the browser supports downloading
      two or more components per hostname in parallel, <br/>the latter three images are not downloaded
      until after the script is done loading.
     </p>
     <span class="codeEmphasize"><i>The <code>&lt;SCRIPT SRC="..."&gt;</code> tag is here.</i></span>

     <script src="getJavascriptScript.php?delay=10"></script>

     <p>Once you see this text it means the script is done loading. Now these latter images are downloaded.</p>
     <img class="middleImage" src="./images/lisa.gif"/>
     <img class="middleImage" src="./images/homer.gif"/>
     <img class="middleImage" src="./images/bart1.gif"/>
     <div id="done-middle"></div>  
     </div> <!-- mainContent -->
     
  </body>
  <script type="text/javascript" id="prototype_js" src="./scripts/prototype.js"></script>
  <script type="text/javascript" id="indexpage_js" src="./scripts/page_structure.js"></script>
  <script>
     <!--
     Event.observe(window, 'load', function() {
         pageScroll();
         sayDone("middle");
     });    
     
       // -->
  </script>
                                                      
</html>
