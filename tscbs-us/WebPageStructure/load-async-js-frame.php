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
    <title>Scripts... Asynchronous load</title>
  </head>

  <body>
     <div id="pageHead"><h1 class="frameTitle">This is loading the scripts asynchronously, DOM</h1></div>
     <div id="mainContent">
     <p class="pageInfo">This page loads a script asynchronously via the <b>&quot;DOM&quot;</b>.
     for the primary script, followed executing a function which also loads a server side script
     via <b>&quot;DOM&quot;</b> - as you will observe the page will be loaded and the scripts
     continue running writing the results to the document.  Watch for the &quot;Scriptlet is Done loading...&quot;
     compared to the time to complete.
       </p>
       <img class="topImage" src="./images/bart2.gif"/>
       <div id="t_done"></div>
       <div id="done-async"></div>
     </div> <!-- mainContent -->
  </body>
  <script type="text/javascript" id="prototype_js" src="./scripts/prototype.js"></script>
  <script type="text/javascript" id="sync_async_js" src="./scripts/sync_async.js"></script>
  <script type="text/javascript">
    Event.observe(window, 'load', function(){
      pageScroll();
      setTimeout('callPHPModuleForAsyncScript()',50);
      timeToComplete();
    } );
  </script>
                      
                                                
</html>
