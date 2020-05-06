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
    <title>CSS 102: Sprites introduction and demonstration</title>
    <meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <meta http-equiv="content-language" content="en">
    <meta name="Description" content="Personal main landing page of launching demo projects in MAMP. Demo projects are written in PHP, demonstrating concepts for performance, accessibility and SEO.  All demo projects are written in JavaScript, CSS and XHTML-Strict. This project in particular provides a CSS instroduction ">
    <meta name="Keywords" content="Demo, demos, introduction, demonstration, introduction and demonstration, Sprites, Sprites Intro, Sprites Introduction, CSS 102,
    CSS_102-Sprites, CSS_102, Sprites Presentation, Sprites Research, animated effect, Irregular Shapes, menu, menus generate menu, generate a menu, generate
    buttons, generate, Sliding door, sliding, bleed, bleeding, Conclusions">
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
    <h1>CSS 102: Intro to Sprites</h1>
    <div id='presentationContent'>
      <h2>Power Point - Presentation</h2>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent75'>
            <a href='Sprites_with_CSS.ppt'
               title='Downloads to open the Sprites Presentation'>Sprites Presentation</a>
          </li>
          <li class='percent75'>
            <a href='Keynote_JingZhi.pdf'
               title='Downloads to open the Sprites research Paper'>Sprites Research paper</a> Jing Zhi from Keynote
          </li>
        </ul>
      </dd>
      <h2>Sprite Demos:  Using Sprites in various different approaches.</h2>
      <div id='synopsis'>
        <ol class='numberedlist'>Each Page is built to demonstrate the approach:
          <!--[if lte IE 7]><br/><![endif]-->
          <li>Demos of the Result</li>
          <li>The CSS that is utilized to create the result</li>
          <li>The actual Sprite image utilized.</li>
        </ol>
      </div>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent75'><a href='pageSpritesIntro.html' title='View the Sprite Intro, the sprites are animated'>Sprite Intro - animated effect </a></li>
          <li class='percent75'><a href='pageSpritesDemo1.html' title='View the Sprite Demo 1, Boxing Irregular Shapes'>Demo 1 - Boxing Irregular Shapes</a></li>
          <li class='percent75'><a href='pageSpritesDemo2.html' title='View the Sprite Demo 2, Shapes close together can have bleed through'>Demo 2 - Irregular Shapes that are close can bleed through</a></li>
          <li class='percent75'><a href='pageSpritesDemo3.html' title='View the Sprite Demo 3, Shapes close together with bleeding resolved'>Demo 3 - Irregular Shapes bleed through resolved</a></li>
          <li class='percent75'><a href='pageSpritesDemo4.html' title='View the Sprite Demo 4, Fixed tabs to generate a menu'>Demo 4 - Fixed tabs to generate a manu</a></li>
          <li class='percent75'><a href='pageSpritesDemo5.html' title='View the Sprite Demo 5, Sliding Door tabs to generate a menu'>Demo 5 - Sliding Door tabs to generate a manu</a></li>
          <li class='percent75'><a href='pageSpritesDemo6.html' title='View the Sprite Demo 6, Sliding Doors to generate buttons -bleeding'>Demo 6 - Sliding
          Doors to generate buttons - bleeding</a></li>
          <li class='percent75'><a href='pageSpritesDemo7.html' title='View the Sprite Demo 7, Sliding Doors to generate buttons - bleeding resolved'>Demo 7 - Sliding Doors to generate buttons - bleeding resolved</a></li>
          <li class='percent75'><a href='pageConclusion.html' title='View the Sprite Conclusions'>Sprite Conclusions</a></li>
        </ul>
      </dd>
      <h2>Graphical Text Sprite:  Technique for accessibility and Performance.</h2>
      <div id='synopsis'>
        <ol class='numberedlist'>Useful where Sprites are desired for performance however graphical text is needed and there are Accessibility concerns.
          <!--[if lte IE 7]><br/><![endif]-->
          <li>Markup content with &lt;img&gt; tags including alt and title attributes</li>
          <li>Utilize a clear.gif as the placeholder</li>
          <li>Use CSS Sprites to replace the image.</li>
        </ol>
      </div>
      <dd>
        <ul>
          <!--[if lte IE 7]><br/><![endif]-->
          <li class='percent75'><a href='pageSpritesGraphicalText.html' title='View the Sprite using graphical Text'>Sprite Graphical Text</a></li>
        </ul>
      </dd>
    </div>
  </body>
 </html>
EOPAGE;

echo $pageContents;
?>
