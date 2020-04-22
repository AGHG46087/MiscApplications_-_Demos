<?php
$section = $_GET['section'];
$access = $_GET['access'];
if ( strlen($access) == 0 )
{
  $access = $_COOKIE['access'];
}

$value = 'normalVis';
if( stristr($access,'lowVis') )
{
  $value = 'lowVis';
}
setcookie("access", $value);

$id=$_GET['id'];

?>

<!DOCtype html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml2/DTD/xhtml1-strict.dtd">
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
    <meta http-equiv='Pragma' content='no-cache'/>
    <meta http-equiv='Cache-Control' content='no-cache,must-revalidate,max_age=0'/>
    <meta http-equiv='Expires' content='-1'/>
    <link rel='stylesheet' media='all' type='text/css' href='./css/demo_default.css' />
    
<?php
    if( stristr($access,'lowVis') )
    {
      print "<link rel=\"stylesheet\" media=\"all\" type=\"text/css\" href=\"./css/lowVisStyle.css\" />";
    }
?>
  </head>
  <body>
  <h2>Development Reference: Accessible Menus - No Script, Index Page</h2>
        <div>You Selected option <span class='emp'><?php echo $id ?></span>,
        Click the back button to return to the page</div>
  </body>
</html>
