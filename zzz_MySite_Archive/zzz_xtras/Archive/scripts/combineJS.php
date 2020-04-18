<?php

ob_start();

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

function setContentLength($contentLegth)
 {
   header ("Content-Length: " . $contentLegth);
 }
function setContentEncoding($encoding)
 {
   header ("Content-Encoding: " . $encoding);
 }
function setLastModified($lastMod)
 {
  $lmodDate = gmdate("D, d M Y H:i:s", $lastMod ) ." GMT";
  header ("Last-Modified: " . $lmodDate);
 }
function setETag($hashValue)
 {
   header ("Etag: \"" . $hashValue . "\"");
 }
function setExpires($expires)
 {
   header("Expires: " . gmdate("D, d M Y H:i:s", time() + $expires) . "GMT");
   header("Cache-Control: max-age=". $expires .", must-revalidate");
 }
function setContentType($theType)
 {
   header ("Content-Type: text/" . $theType);
 }

$cache = true;
$enableCompression = true;
$cachedir = dirname(__FILE__) . '/cache';
$jsdir   = dirname(__FILE__) . '/';
  // Determine the directory and type we should use
switch ($_GET['type']) {
  case 'javascript':
    $base = realpath($jsdir);
    break;
  default:
    header ("HTTP/1.0 503 Not Implemented");
    exit;
};


$type = $_GET['type'];
$tempLocation = strrpos(getParms('files'),'/');
if ( $tempLocation === false )
{
  $tempSz = $_GET['files'];
}
else
{
  $tempSz = substr($_GET['files'],($tempLocation + 1));
}
$elements = explode(',', $tempSz);

  // Determine last modification date of the files

$lastmodified = 0;
while (list(,$element) = each($elements)) {
  $path = realpath($base . '/' . $element);
  
  if ($type == 'javascript' && substr($path, -3) != '.js')
  {
    header ("HTTP/1.0 403 Forbidden");
    exit;   
  }
  
  if (substr($path, 0, strlen($base)) != $base || !file_exists($path))
  {
    header ("HTTP/1.0 404 Not Found");
    exit;
  }
  
  $lastmodified = max($lastmodified, filemtime($path));
}


$hash = $lastmodified;
setETag($hash);
setExpires(60*60*24*10); // (60*60*3);
setLastModified($lastmodified);
if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && 
    stripslashes($_SERVER['HTTP_IF_NONE_MATCH']) == '"' . $hash . '"') 
{
    // Return visit and no modifications, so do not send anything
  header ("HTTP/1.0 304 Not Modified");
  setContentLength(0);
  exit;
}

  // First time visit or files were modified
if ($cache) 
{
  $encoding = 'none'; // Default the value to none
  if($enableCompression)
  {
      // Determine supported compression method
    $gzip = strstr($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip');
    $deflate = strstr($_SERVER['HTTP_ACCEPT_ENCODING'], 'deflate');
    
      // Determine used compression method
    $encoding = $gzip ? 'gzip' : ($deflate ? 'deflate' : 'none');
    
      // Check for buggy versions of Internet Explorer
    if (!strstr($_SERVER['HTTP_USER_AGENT'], 'Opera') && 
        preg_match('/^Mozilla\/4\.0 \(compatible; MSIE ([0-9]\.[0-9])/i', $_SERVER['HTTP_USER_AGENT'], $matches)) {
      $version = floatval($matches[1]);
      
      if ($version < 6)
      {
        $encoding = 'none';
      }
      
      if ($version == 6 && !strstr($_SERVER['HTTP_USER_AGENT'], 'EV1'))
      {
        $encoding = 'none';
      }
    }
  }
  
    // Try the cache first to see if the combined files were already generated
  $cachefile = 'cacheJS-' . $hash . '.' . $type . ($encoding != 'none' ? '.' . $encoding : '');
  
  if (file_exists($cachedir . '/' . $cachefile)) {
    if ($fp = fopen($cachedir . '/' . $cachefile, 'rb')) {
      
      if ($encoding != 'none') {
        setContentEncoding($encoding);
      }

      setContentType($type);
      setContentLength(filesize($cachedir . '/' . $cachefile));
      
      fpassthru($fp);
      fclose($fp);

      ob_end_flush();
      
      exit;
    }
  }
}
  // Get contents of the files
$contents = '';
reset($elements);
while (list(,$element) = each($elements)) {
  $path = realpath($base . '/' . $element);
  $contents .= "" . file_get_contents($path) . "\n";
//  $contents .= "" . file_get_contents($path) . "\n /* End ".$element." */\n";
}

  // Send Content-Type
setContentType($type);
$contents .= "\n\n";
if (isset($encoding) && $encoding != 'none') 
{ // Send compressed contents
  $contents = gzencode($contents, 9, $gzip ? FORCE_GZIP : FORCE_DEFLATE);
  header ("Content-Encoding: " . $encoding);
} 

setContentLength(strlen($contents));
echo $contents;

  // Store cache
if ($cache) {
  if ($fp = fopen($cachedir . '/' . $cachefile, 'wb')) {
    fwrite($fp, $contents);
    fclose($fp);
  }
}



ob_end_flush();

?>