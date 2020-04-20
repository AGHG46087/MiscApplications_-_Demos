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
     
    <link href="css/sync_vs_async.css" media="all" type="text/css" rel="stylesheet" id="preferred_css" title="sync_async"/>

     <script>
     <!--
      t_page_start = Number(new Date());
     // -->
     </script>
    <title>Scripts... Synchronous load</title>
  </head>

  <body>
     <div id="pageHead"><h1 class="frameTitle">This is loading the scripts synchronously, document.write</h1></div>
     <div id="mainContent">
     <p class="pageInfo">This page loads a script synchronously via the <b>&quot;document.write()&quot;</b>.
     for the primary script, followed executing a function which also loads a server side script
     via <b>&quot;document.write()&quot;</b> - as you will observe nothing can happen until the
     write has completed the round trip and written the results to the document. A secondary problem
     ocurrs is that in xhtml, the document.write will try and write a document (browser dependent).
       </p>
       <img class="topImage" src="./images/th_Smiley.gif"/>
       <div id="t_done"></div>
       <div id="done-sync"></div>
     </div> <!-- mainContent -->
  </body>
  <script type="text/javascript" id="prototype_js" src="./scripts/prototype.js"></script>
  <script>
     <!--
     sync_async_status = '400';
     getJavascript_php_status = '400';
     if (document.getElementById) {
       docURL = document.URL;
     } else {
       docURL = window.location;
     }
     if ( docURL != null ) {
       var end = docURL.lastIndexOf("/");
         //docURL = docURL.substring(0, end) + "/getJavascriptScript.php?delay=5";
       docURL = docURL.substring(0, end) + "/scripts/sync_async.js";
       document.write("<scr" + "ipt language=\"javascript\" src=\"" + docURL + "\"" + "></scr" + "ipt>");
     }
     // -->
  </script>
  <script>
     <!--
     if ( sync_async_status != "undefined" && sync_async_status == '200')
     {
      callPHPModuleForAnotherScript();
     }
     // -->
  </script>
  <script>
     <!--
     if ( getJavascript_php_status != "undefined" && getJavascript_php_status == '200')
     {
       sayScriptletDone("sync");
     }
    // -->
  </script>
  <script>
    <!--
     if ( getJavascript_php_status != "undefined" && getJavascript_php_status == '200')
     {
       pageScroll();
      timeToComplete();
     }
    // -->
  </script>
                                                
</html>
