<?php

  //echo "\n--------------- START ----------\n";

  //echo base64_encode(file_get_contents("./images/logo_small.gif"));

  //echo "<br/>--------------- Done ----------";

// Project folders to ignore in the itenization
$projectsListIgnore = array ('.','..','zzz_images',);

$phpVersion = phpversion();
$apacheVersion = apache_get_version();

// textes
$langues = array(
	'en' => array(
		'langue' => 'English',
		'titleHtml' => 'MAMP 1.7, Mac, Apache, MySql, PHP Personal main landing page launching demo projects',
		'titreConf' => 'Server Configuration',
		'versa' => 'Apache Version :',
		'versp' => 'PHP Version :',
		'versm' => 'MySQL Version :',
		'versionInfo' => 'Version Info',
		'toolinfo' => 'Tools',
		'txtProject' => 'My Demo Projects',
		'txtNoProject' => 'No demo projects yet.<br />' .
                                  'To create a new one, just create a directory in \'www\'.',
		'faq' => 'http://www.mamp.info'
	),
);



// images
$pngFolder = <<< EOFILE
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAABhlBMVEX//v7//v3///7//fr//fj+/v3//fb+/fT+/Pf//PX+/Pb+/PP+/PL+/PH+/PD+++/+++7++u/9+vL9+vH79+r79+n79uj89tj89Nf889D88sj78sz78sr58N3u7u7u7ev777j67bL67Kv46sHt6uP26cns6d356aP56aD56Jv45pT45pP45ZD45I324av344r344T14J734oT34YD13pD24Hv03af13pP233X025303JL23nX23nHz2pX23Gvn2a7122fz2I3122T12mLz14Xv1JPy1YD12Vz02Fvy1H7v04T011Py03j011b01k7v0n/x0nHz1Ejv0Hnuz3Xx0Gvz00buzofz00Pxz2juz3Hy0TrmznzmzoHy0Djqy2vtymnxzS3xzi/kyG3jyG7wyyXkwJjpwHLiw2Liw2HhwmDdvlXevVPduVThsX7btDrbsj/gq3DbsDzbrT7brDvaqzjapjrbpTraojnboTrbmzrbmjrbl0Tbljrakz3ajzzZjTfZijLZiTJdVmhqAAAAgnRSTlP///////////////////////////////////////8A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9XzUpQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAACqSURBVBiVY5BDAwxECGRlpgNBtpoKCMjLM8jnsYKASFJycnJ0tD1QRT6HromhHj8YMOcABYqEzc3d4uO9vIKCIkULgQIlYq5haao8YMBUDBQoZWIBAnFtAwsHD4kyoEA5l5SCkqa+qZ27X7hkBVCgUkhRXcvI2sk3MCpRugooUCOooWNs4+wdGpuQIlMDFKiWNbO0dXTx9AwICVGuBQqkFtQ1wEB9LhGeAwDSdzMEmZfC0wAAAABJRU5ErkJggg==
EOFILE;
$pngFolderGo = <<< EOFILE
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJISURBVDjLpZPLS5RhFIef93NmnMIRSynvgRF5KWhRlmWbbotwU9sWLupfCBeBEYhQm2iVq1oF0TKIILIkMgosxBaBkpFDmpo549y+772dFl5bBIG/5eGch9+5KRFhOwrYpmIAk8+OjScr29uV2soTotzXtLOZLiD6q0oBUDjY89nGAJQErU3dD+NKKZDVYpTChr9a5sdvpWUtClCWqBRxZiE/9+o68CQGgJUQr8ujn/dxugyCSpRKkaw/S33n7QQigAfxgKCCitqpp939mwCjAvEapxOIF3xpBlOYJ78wQjxZB2LAa0QsYEm19iUQv29jBihJeltCF0F0AZNbIdXaS7K6ba3hdQey6iBWBS6IbQJMQGzHHqrarm0kCh6vf2AzLxGX5eboc5ZLBe52dZBsvAGRsAUgIi7EFycQl0VcDrEZvFlGXBZshtCGNNa0cXVkjEdXIjBb1kiEiLd4s4jYLOKy9L1+DGLQ3qKtpW7XAdpqj5MLC/Q8uMi98oYtAC2icIj9jdgMYjNYrznf0YsTj/MOjzCbTXO48RR5XaJ35k2yMBCoGIBov2yLSztNPpHCpwKROKHVOPF8X5rCeIv1BuMMK1GOI02nyZsiH769DVcBYXRneuhSJ8I5FCmAsNomrbPsrWzGeocTz1x2ht0VtXxKj/Jl+v1y0dCg/vVMl4daXKg12mtCq9lf0xGcaLnA2Mw7hidfTGhL5+ygROp/v/HQQLB4tPlMzcjk8EftOTk7KHr1hP4T0NKvFp0vqyl5F18YFLse/wPLHlqRZqo3CAAAAABJRU5ErkJggg==
EOFILE;
$gifLogo = <<< EOFILE
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
    EOFILE;
$pngPlugin = <<< EOFILE
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABmklEQVR42mL4//8/AyUYIIDAxK5du1BwXEb3/9D4FjBOzZ/wH10ehkF6AQIIw4B1G7b+D09o/h+X3gXG4YmteA0ACCCsLghPbPkfm9b5PzK5439Sdg9eAwACCEyANMBwaFwTGIMMAOEQIBuGA6Mb/qMbABBAEAOQnIyMo1M74Tgiqf2/b3gVhgEAAQQmQuKa/8ekdYMxyLCgmEYMHJXc9t87FNMAgACCGgBxIkgzyDaQU5FxQGQN2AUBUXX/vULKwdgjsOQ/SC9AAKEEYlB03f+oFJABdSjYP6L6P0guIqkVjt0DisEGAAQQigEgG0AhHxBVi4L9wqvBBiEHtqs/xACAAAIbEBBd/x+Eg2ObwH4FORmGfYCaQRikCUS7B5YBNReBMUgvQABBDADaAtIIwsEx9f/Dk9pQsH9kHTh8XANKMAIRIIDAhF9ELTiQQH4FaQAZCAsskPNhyRpkK7oBAAEEMSC8GsVGkEaYIlBghcU3gbGzL6YBAAEEJnzCgP6EYs/gcjCGKQI5G4Z9QiswDAAIIAZKszNAgAEAHgFgGSNMTwgAAAAASUVORK5CYII=
EOFILE;
$pngWrench = <<< EOFILE
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAABO1BMVEXu7u7n5+fk5OTi4uLg4ODd3d3X19fV1dXU1NTS0tLPz8+7z+/MzMy6zu65ze65zu7Kysq3zO62zO3IyMjHx8e1yOiyyO2yyOzFxcXExMSyxue0xuexxefDw8OtxeuwxOXCwsLBwcGuxOWsw+q/v7+qweqqwuqrwuq+vr6nv+qmv+m7u7ukvumkvemivOi5ubm4uLicuOebuOeat+e0tLSYtuabtuaatuaXteaZteaatN6Xs+aVs+WTsuaTsuWRsOSrq6uLreKoqKinp6elpaWLqNijo6OFpt2CpNyAo92BotyAo9+dnZ18oNqbm5t4nt57nth7ntp4nt15ndp3nd6ZmZmYmJhym956mtJzm96WlpaVlZVwmNyTk5Nvl9lultuSkpKNjY2Li4uKioqIiIiHh4eGhoZQgtVKfNFdha6iAAAAaXRSTlMA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////914ivwAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAKFJREFUGJVjYIABASc/PwYkIODDxBCNLODEzGiQgCwQxsTlzJCYmAgXiGKVdHFxYEuB8dkTOIS1tRUVocaIWiWI8IiIKKikaoD50kYWrpwmKSkpsRC+lBk3t2NEMgtMu4wpr5aeuHcAjC9vzadjYyjn7w7lK9kK6tqZK4d4wBQECenZW6pHesEdFC9mbK0W7otwsqenqmpMILIn4tIzgpG4ADUpGMOpkOiuAAAAAElFTkSuQmCC
EOFILE;
$favicon = <<< EOFILE
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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx5dJX7ceM/+/Iif/u1Ku5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx7+kG7NSvpOrMnMjt5NUmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////z9AH///////P0AH//////8/QAD//////z9AAD//////P0AwB/////8/YB4B/////z9wD8Af////P3gH8AH///8/fAP+AB///z9+Af/AB///P38A//AD//8/f4B//AP//z9/wB//A///P3/gD/wD//8/f/gH8Af//z9//APAB///P3/+AQAf//8/f/8AAH///z9//4AA////P3//AAP///8/f/wAD////z9/8AAH////P3+AAAP///8/fAAEAf///z94AB8A////P3AA/4B///8/cAP/wD///z9wD4fgH///P3h/A/AH//8/f/8D+AP//z9//gP+AP//P3/8B8cAf/8/f/wPg4Af/z9/+B+DwA//P3/4PwPwA/8/f/x/A/gA/z9///8D/AA/P3///wP/AD8/f///B+GAPz9///8HwcA/P3///wfA8D8/f///D8D8fz9/////wP//P3/////gf/8/f////+B//z9/////8P//P3/////w//8/SgAAAAYAAAAMAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC7jFuUp18I8LR8QLS/k2RD3NDGAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqZhvhplwC/6ZcA/2nXg/trW4q0LiHTm3OtJkPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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
EOFILE;


//affichage du phpinfo
if (isset($_GET['phpinfo']))
{
	phpinfo();
	exit();
}


//affichage des images
if (isset($_GET['img']))
{
    header("cache-control: max-age=86400, private, must-revalidate");
    switch ($_GET['img'])
    {
        case 'pngFolder' :
        header("Content-type: image/png");
        echo base64_decode($pngFolder);
        exit();
        
        case 'pngFolderGo' :
        header("Content-type: image/png");
        echo base64_decode($pngFolderGo);
        exit();
        
        case 'gifLogo' :
        header("Content-type: image/gif");
        echo base64_decode($gifLogo);
        exit();
        
        case 'pngPlugin' :
        header("Content-type: image/png");
        echo base64_decode($pngPlugin);
        exit();
        
        case 'pngWrench' :
        header("Content-type: image/png");
        echo base64_decode($pngWrench);
        exit();
        
        case 'favicon' :
        header("Content-type: image/x-icon");
        echo base64_decode($favicon);
        exit();
    }
}



// Language Definition

if (isset ($_GET['lang']))
{
	$langue = $_GET['lang'];
}
else
{
	$langue = 'en';
}

// itemize projects
$handle=opendir(".");
while ($file = readdir($handle)) 
{
  if (is_dir($file) && !in_array($file,$projectsListIgnore)) 
  {
    $titleName = $file;
    $titleAttrText = "Select link to see the demo on " . $titleName;
    $projectContents .= '<li><a title="'.$titleAttrText.'" href="'.$file.'">'.$file.'</a></li>';
  }
}
closedir($handle);
if (!isset($projectContents))
	$projectContents = $langues[$langue]['txtNoProject'];


//initialisation
$phpExtContents = '';

// itemize PHP Extensions
$loaded_extensions = get_loaded_extensions();
foreach ($loaded_extensions as $extension)
	$phpExtContents .= "<li>${extension}</li>";




$pageContents = <<< EOPAGE
<?xml version="1.0" encoding="iso-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html lang="en" xml:lang="en">
    <head>
    <title>{$langues[$langue]['titleHtml']}</title>
    <meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <meta http-equiv='Content-Language' content="en" />
    <meta name="Description" content="Personal main landing page of launching demo projects in MAMP. Demo projects are written in PHP, demonstrating concepts for performance, accessibility and SEO.  All demo projects are written in JavaScript, CSS and XHTML-Strict." /> 
    <meta name="Keywords" content="Personal main, main landing page, launching demo projects, MAMP, Apache, PHP, MySQL, XHTML-Strict, JavaScript, script, CSS, style phpinfo, phpMyAdmin, SQLLiteManage, accessibility, mysite, demo, demos, tools, Version Info, My Demo Projects, Hans, localhost" />
    <style type="text/css">
* {
  margin: 0;
  padding: 0;
}
html {
  background: #ddd;
}
body {
  margin: 1em 10%;
  padding: 1em 3em;
  font: 80%/1.4 tahoma, arial, helvetica, lucida sans, sans-serif;
  border: 1px solid #999;
      background: #eee;
  position: relative;
}
#head {
  margin-bottom: 1.8em;
  margin-top: 1.8em;
  padding-bottom: 0em;
  border-bottom: 1px solid #999;
  letter-spacing: -500em;
  text-indent: -500em;
  height: 125px;
  background: url(index.php?img=gifLogo) 0 0 no-repeat;
}
#versionInfo {
  float: left !important;
}
#versionInfo li.li1 {
float: left;
}
.utility {
   position: absolute;
   right: 4em;
   top: 145px;
   font-size: 0.85em;
}
.utility li {
   display: inline;
}

h2 {
  margin: 0.0em 0 0 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#head ul li, dl ul li, #foot li {
  list-style: none;
  display: inline;
  margin: 0;
  padding: 0 0.2em;
}
ul.aliases, ul.projects, ul.tools, ul.versionInfo {
  list-style: none;
  line-height: 24px;
}
ul.aliases a, ul.projects a, ul.tools a {
  padding-left: 22px;
  background: url(index.php?img=pngFolderGo) 0 100% no-repeat;
}
ul.tools a {
  background: url(index.php?img=pngWrench) 0 100% no-repeat;
}
dl {
  margin: 0;
  padding: 0;
}
dt {
  font-weight: bold;
  text-align: right;
  width: 11em;
  clear: both;
}
dd {
  margin: -1.35em 0 0 12em;
  padding-bottom: 0.4em;
  overflow: auto;
}
dd ul li {
  float: left;
  display: block;
  width: 16.5%;
  margin: 0;
  padding: 0 0 0 20px;
  background: url(index.php?img=pngPlugin) 2px 50% no-repeat;
  line-height: 1.6;
}
ul.versionInfo li {
  color: #024378;
  font-weight: bold;
  text-decoration: none;
  text-indent: 23px;
}
a {
  color: #024378;
  font-weight: bold;
  text-decoration: none;
}
div#versionInfoCont {
  float: right;
}
div#toolsCont {
padding: 0 0 10px 0;
}
div#projectCont {
}
a:hover {
  color: #04569A;
  text-decoration: underline;
}
#foot {
  text-align: center;
  margin-top: 1.8em;
  border-top: 1px solid #999;
  padding-top: 1em;
  font-size: 0.85em;
}
    </style>
    <link rel="shortcut icon" href="index.php?img=favicon" type="image/ico" />
  </head>
  <body>
          <div id="head">
          <h1><abbr title="Mac">M</abbr><abbr title="Apache">A</abbr><abbr title="MySQL">M</abbr><abbr title="PHP">P</abbr></h1>
          </div>
        <div id='versionInfoCont'>
        <h2 class='bhv_displayNone'>{$langues[$langue]['versionInfo']}</h2>
        <ul class='versionInfo'>
          <li>PHP - Ver. {$phpVersion}</li>
          <li>Apache - Ver. {$apacheVersion}</li>
          <li>MySQL - Ver. 5</li>
        </ul>
        </div>
        <div id='toolsCont'>
	<h2>{$langues[$langue]['toolinfo']}</h2>
	<ul class="tools">
          <li><a title='Renders all the PHP Info for this server' href="?phpinfo=1">phpinfo</a></li>
          <li><a title='Renders the PHP Admin Console' href="/phpMyAdmin">phpmyadmin</a></li>
          <li><a title='Renders the MySQL Admin console' href="/SQLiteManager">sqlitemanager</a></li>
        </ul>
        </div>
        <div id='projectCont'>
	<h2>{$langues[$langue]['txtProject']}</h2>
	<ul class="projects">
	$projectContents
	</ul>
	<ul id="foot">
          <li><a title='MAMP Home page (Mac, Apache, MySql, PHP)' href="http://www.mamp.info">MAMP</a></li> -
          <li><a title='Hans\' Home Page ' href="http://www.tscbs-us.com">by iHans</a></li>
	</ul>
        </div>
  </body>
</html>
EOPAGE;

echo $pageContents;
?>