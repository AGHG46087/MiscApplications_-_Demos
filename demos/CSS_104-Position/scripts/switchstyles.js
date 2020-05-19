/*
 *
 */
var tabberOptions = {
  onTabClick: function(tabIndex)
  {
    var styleIndex = formatTabIndex(tabIndex+1);
    chooseStyle(styleIndex);
  }
};

function formatTabIndex(tabIndex) {
  var retval = (tabIndex >= 10) ? "" : "0";
  retval += tabIndex;
  return retval;
}

function chooseStyle(title) {
  setActiveStyleSheet("Step " + title);
}
function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    var relAttrib = a.getAttribute("rel");
    var titleAttrib = a.getAttribute("title");
    if(relAttrib.indexOf("style") != -1 && titleAttrib) {
      a.disabled = true;
      if(titleAttrib == title) {
        a.disabled = false;
      }
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    var relAttrib = a.getAttribute("rel");
    var titleAttrib = a.getAttribute("title");
    if(relAttrib.indexOf("style") != -1 &&
       titleAttrib && !a.disabled) {
      return titleAttrib;
    }
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    var relAttrib = a.getAttribute("rel");
    var titleAttrib = a.getAttribute("title");
    var preferredCSS = (titleAttrib && titleAttrib.indexOf("preferredcss") > -1);
    if(relAttrib.indexOf("style") != -1
       && relAttrib.indexOf("alt") == -1
       && titleAttrib ) {
      return titleAttrib;
    }
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else {
    expires = "";
  }
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  var cookieValid = (ca == null || ca.indexOf("null")) ? false : true;
  for(var i=0;i < ca.length && cookieValid;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1,c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
