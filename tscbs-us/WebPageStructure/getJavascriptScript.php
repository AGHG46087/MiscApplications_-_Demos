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
 $delaytime = getParms("delay");

 if ( $delaytime == NULL )
 {
   $delaytime = 10;
 }

  sleep( $delaytime );
  echo "var delay = '".$delaytime."secs';\n";

echo "function sayScriptletDone(module) {\n";
echo "  var node = $('done-' + module);\n";
echo "  if ( node != null )\n";
echo "  {\n";
echo "    node.innerHTML = 'Scriptlet is Done loading...';\n";
echo "  }\n";
echo "}\n";

  echo "getJavascript_php_status = '200'; \n";
/* echo "alert('Hello World, I am here');"; */


?>
 