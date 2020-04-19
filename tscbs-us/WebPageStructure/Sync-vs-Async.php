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

    <title>Scripts... Sync - vs - Async</title>
  </head>

  <body id="syncVsasyncPHP">
     <div id="pageHead"><h1>Synchronous versus Asynchronous scripts</h1></div>
     <div id="mainContent">
       <h3>As a customer - Which page would you prefer?</h3>
     <p></p>
       <ul>
         <li><b>Left:</b>The page loads scripts and servlet requests via document.write - SYNCHRONOUS</li>
         <li><b>Right:</b>The page loads scripts and servlet requests via DOM - ASYNCHRONOUS</li>
       </ul>
     <div id="frameWrapper">
     </div>
     <div id="linkWrapper">
     <span id="linkFrame1" class="frameCaption">See this frame alone &quot;<span class="frameLink">load-sync-js</span>&quot;</span>
     <span id="linkFrame2" class="frameCaption">See this frame alone &quot;<span class="frameLink">load-async-js</span>&quot;</span>
     </div>
       <br/><br/>
       <a href="index.php" class="returnLink">return to index page</a>
     </div> <!-- mainContent -->
     
  </body>
  <script type="text/javascript" id="prototype_js" src="./scripts/prototype.js"></script>
  <script type="text/javascript" id="indexpage_js" src="./scripts/sync_async.js"></script>
  <script>
     <!--
     Event.observe(window, 'load', function() {
        registerFrameLinkEvents();
        populateFrameWrapper();
     });    
     
       // -->
  </script>
</html>

