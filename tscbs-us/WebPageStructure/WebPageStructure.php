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

    <title>Scripts... Top vs. Middle vs. Bottom</title>
  </head>

  <body id="scriptlocationPHP">
     <div id="pageHead"><h1>Put Scripts at the Bottom</h1></div>
     <div id="mainContent">
       <h3>As a customer - Which page would you prefer?</h3>
     <p>This page loads the three frames asyncronously as to provide for even faster loading.  If the page loaded the frames syncronously - the page would not completely render until the iframes were complete.  When each of the frames are done, they will have a <b>&quot;Done Loading...&quot;</b> message at the bottom.</p>
       <ul>
         <li><b>Left:</b> the page has the javascript on the top (10 sec, delay)</li>
         <li><b>Center:</b> the page has the javascript in the middle (10 sec, delay)</li>
         <li><b>Right:</b> the page has the javascript  on the bottom (10 sec, delay)</li>
       </ul>
     <div id="frameWrapper">
     </div>
     <div id="linkWrapper">
     <span id="linkFrame1" class="frameCaption">See this frame alone &quot;<span class="frameLink">js-top</span>&quot;</span>
       <span id="linkFrame2" class="frameCaption">See this frame alone &quot;<span class="frameLink">js-middle</span>&quot;</span>
       <span id="linkFrame3" class="frameCaption">See this frame alone &quot;<span class="frameLink">js-bottom</span>&quot;</span>
     </div>
       <br/><br/>
       <a href="index.php" class="returnLink">return to index page</a>
     </div> <!-- mainContent -->
     
  </body>
  <script type="text/javascript" id="prototype_js" src="./scripts/prototype.js"></script>
  <script type="text/javascript" id="indexpage_js" src="./scripts/page_structure.js"></script>
  <script>
     <!--
     Event.observe(window, 'load', function() {
        registerFrameLinkEvents();
        populateFrameWrapper();
     });    
     
       // -->
  </script>
</html>

