/*
 *  Demos Final Sequnce of Events:  All major nodes will have an even handler bind this includes the images of
 *  browsers, explosion the "HTML5" Lazer, and the "4" torpedos.
 *  The JavaScript in  this case only manages events and music - adds and removes classes to the nodes, nothing more.
 *  1. IE Death Star is the primary drive will start on page load and Audio will start after page load on 2 Seconds.
 *  2. Other browsers are started however their intential delay ranging 16-18 seconds into page load.
 *  3. When the Primary drive is complete 'ielogo1'  then add a class to the IELogo that will start rotation
 *  4. Browser Starships arrive approx: 30 seconds, add class to FFBomb and SFBomb for warningShot.
 *  5. On completion of the warning shots, add class to all lazers and Bombs to Fire.
 *  6. There should be 4 shakes added to the IELogo
 *  7. At the end of the 4th Shake, the IELogo explodes (58 seconds) and disapears,
 *  8. After the explosion,  the Browser ships all goaway
 *  9. The End is rendered via the EndTitle in TRON font - 72 seconds.
 * 10. Page returns to index.html - 84 seconds
 */
if (DEMO_FINAL == null || typeof(DEMO_FINAL) == "undefined") { var DEMO_FINAL = new Object(); }
DEMO_FINAL.init = {

  count: 0,
  
  identityCrisis: function () {
      // JQuery: Some versions of IE7 have an identity crisis, it may think it is ie6, correct the body tag
    if( jQuery.browser.msie && parseInt(jQuery.browser.version) == 7 ) {
      var ie6BodyTag = $("body.ie6").addClass("ie7").removeClass("ie6");
    }
    return false;
  },
  startup: function() {
    this.intRef = setInterval("DEMO_FINAL.init.updateSecs()", 1000);
    var a1 = document.getElementById('audio'); a1.volume = 0; a1.play();
    setTimeout(function() { a1.pause(); a1.volume = 1; a1.currentTime = 0; a1.play(); }, 2000);
      //setTimeout("document.getElementById('audio').play()", 2000);
    $("#IELogo").bind('webkitAnimationEnd', function(event) {
          DEMO_FINAL.work.handleIELogo(this, event.originalEvent ); });
    $("#IEExplode").bind('webkitAnimationEnd', function(event) {
          DEMO_FINAL.work.handleIELogo(this, event.originalEvent ); });
    $("img.coolBrowser").bind('webkitAnimationEnd', function(event) {
          DEMO_FINAL.work.handleCoolLogo(this, event.originalEvent ); });
    $("#endTitle").bind('webkitAnimationEnd', function(event) {
          DEMO_FINAL.work.handleCoolLogo(this, event.originalEvent ); });
    $("span.lazer").bind('webkitAnimationEnd', function(event) {
          DEMO_FINAL.work.handleLazer(this, event.originalEvent ); });
    $("span.ieTorpedo").bind('webkitAnimationEnd', function(event) {
          DEMO_FINAL.work.handleTorpedo(this, event.originalEvent ); });
  },
  updateSecs: function() {
    this.count++;
    $('#secs').html(""+this.count);
  }

  
};

DEMO_FINAL.work = {

  bombCount: 0,
  lazerCount: 0,
  allArrive: 0,

  returnToMain: function() {
    window.location.href = "index.html";
  },
  handleLazer: function(node, event) {
    $("#IELogo").addClass('ieShake');
    
  },
  handleTorpedo: function(node, event) {
    this.bombCount++;
    if ( this.bombCount >= 2 ) {
      $('#OPLazer').addClass('fire');
      $('#CHLazer').addClass('fire');
      $('#SFLazer').addClass('fire');
      $('#FFLazer').addClass('fire');
      $('#OPBomb').addClass('fire');
      $('#CHBomb').addClass('fire');
      $('#SFBomb').addClass('fire').removeClass('warningShot');
      $('#FFBomb').addClass('fire').removeClass('warningShot');
      this.bombCount = -1000;
    }
  },
  handleCoolLogo: function(node, event) {
    if ( event.animationName == 'fflogo1' ) {
      $(node).addClass('wobble');  this.allArrive++;
    }
    if ( event.animationName == 'sflogo1' ) {
       $(node).addClass('wobble'); this.allArrive++;
    }
    if ( event.animationName == 'chlogo1' ) {
       $(node).addClass('wobble'); this.allArrive++;
    }
    if ( event.animationName == 'oplogo1' ) {
       $(node).addClass('wobble'); this.allArrive++;
    }
    if ( event.animationName == 'ffaway' ) {
      $("#sequence").addClass('dispNone');
      $("#endTitle").addClass('show');
    }
    if( event.animationName == 'showTheEnd' ) {
      setTimeout("DEMO_FINAL.work.returnToMain()", 2000);
    }

    if ( this.allArrive >= 4 ) {
      $('#SFBomb').addClass('warningShot');
      $('#FFBomb').addClass('warningShot');
      this.allArrive = -1000;
    }
    
  },
  handleIELogo: function( node, event ) {
    if ( event.animationName == 'ielogo1' ) {
      $(node).addClass('ieRotate');
    }
    if ( event.animationName == 'ieShake' ) {
       $(node).removeClass('ieShake');
       this.lazerCount++;
    }
    if ( event.animationName == 'ieexploder' ) {
      $(node).removeClass('explode');
      $('#OPLogo').addClass('goaway').removeClass('wobble');
      $('#CHLogo').addClass('goaway').removeClass('wobble');
      $('#SFLogo').addClass('goaway').removeClass('wobble');
      $('#FFLogo').addClass('goaway').removeClass('wobble');
    }
    if ( this.lazerCount >= 4 ) {
      $(node).addClass('ieFadeOut').removeClass('ieRotate');
      $('#IEExplode').addClass('explode');
      this.lazerCount = -1000;
    }
    
  }
  
};

$(document).ready(function() {
      if (Modernizr.csstransforms3d) {
        DEMO_FINAL.init.startup();
      }
    });
