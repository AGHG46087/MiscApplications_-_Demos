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
    <title>Accessibility JavaScript dos and Donts with Accessible menus Demo projects</title>
    <meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <meta http-equiv="content-language" content="en">
    <meta name="Description" content="Personal main landing page of launching demo projects in MAMP. Demo projects are written in PHP, demonstrating concepts for performance, accessibility and SEO.  All demo projects are written in JavaScript, CSS and XHTML-Strict.">
    <meta name="Keywords" content="Personal main, main landing page, launching demo projects, MAMP, Apache, PHP, MySQL, XHTML-Strict, JavaScript, script, CSS, style phpinfo, phpMyAdmin, SQLLiteManage, accessibility, mysite, demo, demos, tools, Version Info, My Demo Projects, Hans, localhost, do, don't, menu, menus">
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
    <h1>Accessibility: Dos - Donts and Accessible Menu</h1>
    <div id='presentationContent'>
      <h2>Power Point - Presentation</h2>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent30'>
            <a href='Accessibility_JavaScript.ppt'
               title='Downloads to open Accessibility and JavaScript Presentation'>Accessibility & JavaScript</a>
          </li>
        </ul>
      </dd>
      <h2>JavaScript usage for Good Not Evil</h2>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent30'><a href='demo1_rollovers.html' title='View Demo on rollover events'>Rollovers</a></li>
          <li class='percent30'><a href='demo2_mouseover.html' title='View Demo on mouseover events'>Mouseover</a></li>
          <li class='percent30'><a href='demo3_focusblur.html' title='View Demo on focus and blur events'>Focus & Blur</a></li>
          <li class='percent30'><a href='demo4_onclickdblclick.html' title='View Demo on Click events'>Click & DblClick</a></li>
          <li class='percent30'><a href='demo5_onchangeselect.html' title='View Demo on onChange events'>Change Select</a></li>
          <li class='percent30'><a href='demo6_docwrite.html' title='View Demo on document write'>Document Write</a></li>
          <li class='percent30'><a href='demo7_popupwindow.html' title='View Demo on popup windows'>Popup Window</a></li>
          <li class='percent30'><a href='demo8_links.html' title='View Demo on links'>Links</a></li>
        </ul>
      </dd>
      <h2>Accessible Menus</h2>
      <div id='synopsis'>
        <ol class='numberedlist'>Follow these three simple steps to developing accessible pages:
          <!--[if lte IE 7]><br/><![endif]-->
          <li>Start with content first - the semantic markup of the page</li>
          <li>Add CSS to apply the presentation</li>
          <li>Add Behavior to fill in missing gaps from browsers, using JavaScript for good - not evil</li>
        </ol>
      </div>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent75'><a href='menu1_step1.html' title='View main content of accessible menus'>Menu 1 - Part 1 - Main Content</a></li>
          <li class='percent75'><a href='menu1_step1a.html' title='View setting decorations and margins page'>Menu 1 - Part 1-A - Decorations and Margins</a></li>
          <li class='percent75'><a href='menu1_step1b.html' title='View horizonatal layout of primary menu items'>Menu 1 - Part 1-B - Horizontal layout of primary menu items</a></li>
          <li class='percent75'><a href='menu1_step1c.html' title='View setting borders and secondary nav items'>Menu 1 - Part 1-C - borders & layout of secondary menu items</a></li>
          <li class='percent75'><a href='menu1_step2.html' title='View rendering secondary nav menu'>Menu 1 - Part 2 - Render secondary Nav menu row items</a></li>
          <li class='percent75'><a href='menu1_step3.html' title='View rendering hover and rollover'>Menu 1 - Part 3 - Rendering hover and rollowver</a></li>
          <li class='percent75'><a href='menu1_step4.html' title='View adding final touches with JavaScript'>Menu 1 - Part 4 - Final Touch with JavaScript progressively enhanced.</a></li>
        </ul>
      </dd>
      <div id='synopsis'>
        <ol class='numberedlist'>Developers tend to like JavaScript for page development, here is a page with the developer in mind.
          <!--[if lte IE 7]><br/><![endif]-->
          <li>Start with content first - mulitple levels deep. the semantic markup of the page</li>
          <li>Add CSS to apply the presentation</li>
          <li>Accessible Keyboard and Mouse menu driven from Javascript provides an alternative... JavaScript for good not evil.</li>
        </ol>
      </div>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent75'><a href='menu2.html' title='View a another derivitive of a accessible menu'>Menu 2 </a></li>
        </ul>
      </dd>
        
    </div>
  </body>
 </html>
EOPAGE;

echo $pageContents;
?>
