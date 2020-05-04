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

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-transitional.dtd">
  <html>
    <meta http-equiv="Content-type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="Content-Language" content="en-us" />
    <meta name="keywords" content="Bla bla bla to be filled" />
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Cache-Control" content="no-cache,must-revalidate,max_age=0"/>
    <meta http-equiv="Expires" content="-1"/>
    <head><title>Demo Web page debugging</title>
<!-- compliance patch for microsoft browsers -->
<!--[if lt IE 7]></script><![endif]-->
<!--[if IE]><script src="./scripts/firebug/firebug.js" type="text/javascript"></script><![endif]-->

    <style type="text/css">.bhv_Invisible {display:none;}</style>
    
    <!-- Load only the minimum -->
    <link href="css/holygrail.css" media="all" type="text/css" rel="stylesheet" id="preferred_css" title="holygrail"/>
    <link href="css/allFluid.css" media="all" type="text/css" rel="alternate stylesheet" id="allFluid_css" title="all fluid"/>
    
    <script type="text/javascript" id="prototype_js"     src="./scripts/prototype.js"></script>
    <script type="text/javascript" id="scriptaculous_js" src="./scripts/scriptaculous.js"></script>
    <script type="text/javascript" id="builder_js"       src="./scripts/builder.js"></script>
    <script type="text/javascript" id="effects_js"       src="./scripts/effects.js"></script>
    <script type="text/javascript" id="indexpage_js"     src="./scripts/indexpage.js"></script>

  </head>
  <body>
     <div id="HGDEBUG" class="bhv_Invisible"><?php print($hgDebug); ?></div>
    <noscript>
      <h2>This page requires JavaScript. Please enable JavaScript in your browser and reload this page.</h2>
    </noscript>
  <div id="banner">
     <span id="menuText"><h1><a href="#">LAYOUT TECHNIQUES</a></h1></span>
  </div>
  <div id="leftcontent">
  <h1>leftcontent</h1>
  <pre>#leftcontent {
   position: absolute;
   left:10px;
   top:50px;
   width:200px;
   background:#fff;
   border:1px solid #000;
  }
  </pre>
  <p class="greek">
	 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation ulliam corper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem veleum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel willum lunombro dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. 
  </p>
  </div>
  
  <div id="centercontent">
  <h1>centercontent</h1>
  <div id="AjaxResponseData">
  <p>This is the most elegant technique and perhaps the most sought after layout: a 3 column page with a fluid center column. Easy to understand, easy to implement. 
  <p><strong>read the source, it is quite simple.</strong></p>
  <p class="greek">
  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation ulliam corper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem veleum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel willum lunombro dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. 
  </p>
  <p class="greek">Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc., li tot Europa usa li sam vocabularium. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilit de un nov lingua franca: on refusa continuar payar custosi traductores. It solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. 
  </p>
  <br/>
  <a href="javascript:;" class="lnkKewlButton" id="nextContent" onClick="getPageLoad('tabstuff.php')">Next Content</a>
  <a href="javascript:;" class="lnkKewlButton" id="printableVersion" onClick="changecss('printablegrail.css')">Printable Version</a>
  <a href="javascript:;" class="lnkKewlButton" id="preferredVersion" onClick="changecss('holygrail.css')">three Col Version</a>
  </div>
  
  <a href="javascript:;" class="lnkKewlButton" id="getFireFoxLnk" onClick="goFireFox()">Get FireFox Link Now</a>
  <h1 id="printVersionText">Printable Version</h1>
  <div id="systemWorking" style="display:none;">
   <span id="workingText">Loading...</span>
  </div> <!-- id="systemWorking" -->
  </div>
  
  <div id="rightcontent">
  <h1>rightcontent</h1>
  <pre>#rightcontent {
      position: absolute;
      right:10px;
      top:50px;
      width:200px;
      background:#fff;
      border:1px solid #000;
  }</pre>
  <p id="idgotapi" class="reference">GO <a href="http://www.gotapi.com">Got API</a>?</p>
  <p id="idgetfirefox" class="ffstuff">Get <a href="http://www.getfirefox.com">FireFox</a> now!</p>
  <p id="idgetfirebug" class="ffstuff">Get <a href="http://www.getfirebug.com">Firebug</a> now!</p>
  <p id="idgetffwebdev" class="ffstuff">Get Firefox <a href="https://addons.mozilla.org/firefox/60/">Web Developer</a></p>
  <p id="idgetviewsrc" class="ffstuff">Get FireFox <a href="https://addons.mozilla.org/firefox/655/">View Source</a></p>
  <p id="idgetiewebdev" class="iestuff">Get IE <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=e59c3964-672d-4511-bb3e-2d5e1db91038&displaylang=en">Web Dev toolbar</a></p>
  <p id="idviewgensrc"  class="iestuff">GET IE <a href="javascripr:;" onclick="IEViewGeneratedSource(); return false;">View Source</a></p>
  <p id="idhowtocreate"  class="iestuff">How to Create <a href="http://www.howtocreate.co.uk/wrongWithIE/">IE info</a> article(s) and addl info</p>
  <p id="idwikibrowser"  class="browserstuff">Wiki <a href="http://en.wikipedia.org/wiki/Comparison_of_web_browsers#Web_technology_support">Web technology support</a></p>
  <p id="idwikisupport"  class="browserstuff">Wiki <a href="http://en.wikipedia.org/wiki/Comparison_of_web_browsers#JavaScript_support">Javascript support</a></p>
     
  </div>
  
  </body>
  </html>
  
