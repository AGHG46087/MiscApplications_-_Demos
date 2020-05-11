<?php



$pngPlugin = <<< EOFILE
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABmklEQVR42mL4//8/AyUYIIDAxK5du1BwXEb3/9D4FjBOzZ/wH10ehkF6AQIIw4B1G7b+D09o/h+X3gXG4YmteA0ACCCsLghPbPkfm9b5PzK5439Sdg9eAwACCEyANMBwaFwTGIMMAOEQIBuGA6Mb/qMbABBAEAOQnIyMo1M74Tgiqf2/b3gVhgEAAQQmQuKa/8ekdYMxyLCgmEYMHJXc9t87FNMAgACCGgBxIkgzyDaQU5FxQGQN2AUBUXX/vULKwdgjsOQ/SC9AAKEEYlB03f+oFJABdSjYP6L6P0guIqkVjt0DisEGAAQQigEgG0AhHxBVi4L9wqvBBiEHtqs/xACAAAIbEBBd/x+Eg2ObwH4FORmGfYCaQRikCUS7B5YBNReBMUgvQABBDADaAtIIwsEx9f/Dk9pQsH9kHTh8XANKMAIRIIDAhF9ELTiQQH4FaQAZCAsskPNhyRpkK7oBAAEEMSC8GsVGkEaYIlBghcU3gbGzL6YBAAEEJnzCgP6EYs/gcjCGKQI5G4Z9QiswDAAIIAZKszNAgAEAHgFgGSNMTwgAAAAASUVORK5CYII=
EOFILE;


//affichage images
if (isset($_GET['img']))
{
    header("cache-control: max-age=86400, private, must-revalidate");
    switch ($_GET['img'])
    {
        case 'pngPlugin' :
        header("Content-type: image/png");
        echo base64_decode($pngPlugin);
        exit();
    }
}

$langue = 'en';

$pageContents = <<< EOPAGE
<?xml version="1.0" encoding="iso-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html lang="en" xml:lang="en">
    <head>
    <title>CSS 103: CSS Floats & things you should know</title>
    <meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <meta http-equiv="content-language" content="en">
    Guillotine, Guillotine bug, IE, IE 6, IE 7, clearing, clearing floats '>
    <style type="text/css">
    .emp {
      color: #FF0000;
      font-weight: bold;
    }
    * { /* good*/
        margin: 0;
        padding: 0;
    }
    html { /* good */
        background: #ddd;
    }
    body { /* good */
        margin: 1em 10%;
        padding: 1em 3em;
        font: 80%/1.4 tahoma, arial, helvetica, lucida sans, sans-serif;
        border: 1px solid #999;
        background: #eee;
        position: relative;
    }
    h1 {
      padding: 0 0 10px 0;
      border-bottom : 1px dotted #0000FF;
    }
    h2 {
        margin: 0.0em 0 0 0;
      _clear: both;
    }
    #presentationContent {
     margin: 15px 0 0 0;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    ul.aliases, ul.projects, ul.tools, ul.versionInfo {
        list-style: none;
        line-height: 24px;
    }
    ul.aliases a, ul.projects a, ul.tools a {
        padding-left: 22px;
        background: url(index.php?img=pngFolderGo) 0 100% no-repeat;
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
        margin: 0 0 0 0;
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
    ol.numberedlist {
      text-indent: 20px;
    }
    ol.numberedlist li {
       list-style-type: lower-alpha;
       margin: 0 0 0 40px;
    }
    li.percent75 {
       width: 75%;
      _width: 100%;
      _clear: both;
    }
    li.percent30 {
       width: 30%;
      _width: 40%;
      _clear: right;
    }
    li.percent25 {
       width: 25%;
      _width: 35%;
    }
    a, a:link, a:active, a:visited {
        color: #024378;
        font-weight: bold;
        text-decoration: none;
    }
    a:hover, a:focus {
      text-decoration: underline;
      color: #0000ff;
      font-size: 100%;
      font-weight: bold;
    }
    br {
      line-height: 0.1px;
    }
    </style>
    <link rel="shortcut icon" href="index.php?img=favicon" type="image/ico" />
  </head>
  <body>
    <h1>CSS 103: Floats & Things you should know</h1>
    <div id='presentationContent'>
      <h2>Word Doc - Presentation</h2>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent75'>
            <a href='CSS_Precedence_Specificity.doc'
               title='Downloads to open the Precendence Specifity document'>CSS Precedence Specificity:</a>
            Things you should know and an overview.
          </li>
        </ul>
      </dd>
      <h2>CSS Demos:  Floats</h2>
      <div id='synopsis'>
        <ol class='numberedlist'>CSS Floats is one one of the most common and poswerful capabilities, and appears to be the least understood.
          <!--[if lte IE 7]><br/><![endif]-->
          <li>Understanding how they work</li>
          <li>Some pitfalls, in Ie ... No surprise here</li>
          <li>Solutions</li>
          <li>JavaScript is not used in these demos</li>
        </ol>
      </div>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent75'><a name='demo1' id='demo1' href='demo1_floats.html' title='View the first demo on Floats basic implementation'>Demo 1 - Floats intro </a></li>
          <li class='percent75'><a name='demo2' id='demo2' href='demo2_floatboxes.html' title='View the demo of floating boxes in another box'>Demo 2 - Floating boxes within another box.</a></li>
          <li class='percent75'><a name='demo3' id='demo3' href='demo3_floatparagraph.html' title='View the demo of floating paragrphs'>Demo 3 - Floats and paragraphs</a></li>
          <li class='percent75'><a name='demo4' id='demo4' href='demo4_guillotineIE6.html' title='View the demo on IE 6 Guillotine Bug'>Demo 4 - The IE 6 Guillotine Bug</a></li>
          <li class='percent75'><a name='demo5' id='demo5' href='http://css-class.com/articles/explorer/guillotine/index.htm' title='External Site View the Guillotine Bug - yet once again in IE7'>Demo 5 - The "reportedly" fixed Guillotine bug is back again in IE7</a> (External Site)</li>
          <li class='percent75'><a name='demo6' id='demo6' href='demo6_clearing21stCentury.html' title='View the demo on clearing floats in the 21st century'>Demo 6 - Modern Age of
          clearing floats.</a></li>
          <li class='percent75'><a name='demo7' id='demo7' href='http://www.positioniseverything.net/explorer.html' title='View the various other dark and deep issue with IE'>Demo 7 -
          IE Leads the pack when it comes to issues.</a> (External Site)</li>
        </ul>
      </dd>
    </div>
  </body>
 </html>
EOPAGE;

echo $pageContents;
?>
