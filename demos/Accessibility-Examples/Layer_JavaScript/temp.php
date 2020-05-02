<!DOCtype html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml2/DTD/xhtml1-strict.dtd">
<html xmlns='http://www.w3.org/1999/xhtml' lang='en-GB' xml:lang='en'>
  <head>
    <?php
    $noscriptValue = isset($_GET["noscript"]) ? true : false;
    $noscriptContent = "<noscript>Enable JavaScript</noscript>";
    if($noscriptValue == false ) {
      $noscriptContent = "<noscript>";
      $noscriptContent .= "<meta http-equiv=\"refresh\" content=\"0;URL=http://demos/Accessibility-Examples/Layer_JavaScript/temp.php?noscript=ashish\" />";
      $noscriptContent .= "</noscript>";
    }
    echo $noscriptContent;
    ?>
    
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
    <meta http-equiv='Pragma' content='no-cache' />
    <meta http-equiv='Cache-Control' content='no-cache,must-revalidate,max_age=0' />
    <meta http-equiv='Expires' content='-1' />
    <meta name='Description' content='layerDemo2, demonstrates the cvapability of presetning a JavaScript generated layer, that is also accessible'>
    <meta name='Keywords' content='Layer, Accessibility, Demo, Layer Accessibility, Accsssibility Demo, Layer Demo, nativ, focus, element, demonstrating a native,demo,Accessible, AccessibleLayer, layerDemo, LayerDemo2 '>
    <title>Accessibility Demo: layerDemo2, JavaScript generated layers</title>
    <link rel='stylesheet' media='all' type='text/css' href='./css/layerDemo2.css' />
  </head>
  <body>
    <h1>Layer Accessibility Demo</h1>
    <p>This demo shows an accessible xHTML popup layer. This layer implements a walled content area to prevent focus leaving the arae whilst it is open. <a href='demo2Include3.html' id='openPopup'>Open a questionnaire</a>.</p>
    <form name='demoForm' id='demoForm' action='demo2Include2.html'>
      <fieldset>
        <legend>An example form</legend>
        <div>
          <label for='input1'>Sample Input 1</label>
          <input type='text' id='input1' name='input1' />
        </div>
        <div>
          <label for='input2'>Sample Input 2</label>
          <input type='text' id='input2' name='input2' />
        </div>
        <input type='submit' id='submitButton' name='submitButton' value='Submit this form' />
      </fieldset>
    </form>
    <div id='layer'></div>
    <div id='popup'></div>
    <div id='popupDivert'></div>
    <p>Morbi nisi. Morbi egestas, leo vitae suscipit eleifend, tellus nulla venenatis nisl, quis pellentesque lacus enim a neque. Curabitur tristique. Proin lobortis nisi eget lacus. Mauris bibendum tempor arcu. Etiam non sapien volutpat metus egestas varius. Pellentesque magna. Pellentesque vel ipsum. Vestibulum mattis lorem in diam. Mauris sed eros. Donec iaculis pretium enim. Donec eu ipsum a lectus ornare vulputate. Fusce auctor, urna vel rutrum imperdiet, eros orci venenatis tellus, quis viverra tortor dolor sit amet ligula. Vivamus lacus massa, ullamcorper ac, faucibus id, sodales a, ligula. Nunc pharetra consequat est. Donec sodales gravida velit. Donec posuere, magna nec rutrum feugiat, lectus quam suscipit orci, ac posuere lorem erat non nulla. Aliquam enim. Nunc mattis arcu sed libero. Nullam risus. Morbi consectetuer dolor vitae elit. Nulla massa. Quisque at metus. Donec lectus lorem, blandit non, viverra in, varius id, nulla.</p>
    <script type='text/javascript' src='./js/prototype.js'></script>
    <script type='text/javascript' src='./js/layerDemo2.js'></script>
  </body>
</html>
