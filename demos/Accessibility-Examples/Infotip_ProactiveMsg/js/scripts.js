/*thisCode_isNumber and prevCode_isNumber are used not to populate the same message/popup again 
	 hence screen reader will read only when the message/popup changes*/
var thisCode_isNumber = 0;
var prevCode_isNumber = 0;
	
  /*browser is determined*/
var isMSBrowser=false;
var isMozillaBrowser=false;

if(navigator.appName == 'Netscape') { isMozillaBrowser = true; }
else if(navigator.appName == 'Microsoft Internet Explorer') { isMSBrowser = true; }

/**
 * Function to display popup on focus of the input field
 */
function showPopup() {
//  document.getElementById("dynamicPopUP").style.display = "block";
  var dynamicPopup = $('dynamicPopUP');
  if ( dynamicPopup != null )
  {
    dynamicPopup.removeClassName('noDisplay');
  }
}
/**
 * Function to hide the popup onblur of the input box.
 */
function hidePopup(){
//  document.getElementById("dynamicPopUP").style.display = "none";
  var dynamicPopup = $('dynamicPopUP');
  if ( dynamicPopup != null )
  {
    dynamicPopup.addClassName('noDisplay');
  }
}
	
/**
 * Function accepts event, determines the source element and based on the key pressed calls
 * buildPopup() with error flag
 */
function validatePopup(event){
  var inputID = Event.element(event).id;
  var node = $(inputID);
  if ( node ) {
    if (isNaN(node.value)) {
      buildPopup('true');
    }
    else {
      buildPopup('false');
    }
  }
  
}
	
/**
 * Function accepts error flag and builds the message for the popup dynamically and also stop
 * populating incase of same message
 */
function buildPopup(error){
  prevCode_isNumber = thisCode_isNumber;
  var newElement=document.createElement("span");
  var oldElement=document.getElementById("dynamicMsg");
  newElement.setAttribute("id", "dynamicMsg");	

    /* aria attributes added to the element which will have visual changes on screen
     * only for IE as Firefox reads it late
     */
  if(isMSBrowser){
    newElement.setAttribute("aria-live", "assertive");  
    newElement.setAttribute("aria-relevant", "additions");
  }

  if(error == "true"){
    thisCode_isNumber = 1;
    if (thisCode_isNumber != prevCode_isNumber) {
  console.log('processing, error=['+error+']');
      newElement.innerHTML = "Error: Please enter numbers only";
      newElement.style.color = "red";
      document.getElementById("msgContainerDiv").replaceChild(newElement, oldElement);

        /* Label for input box is changed to error message and focus is brought nback in
         * to read the changed label for firefox
         */
      if(isMozillaBrowser){
        document.getElementById("inputNumber").blur();
        document.getElementById("inputLabel").innerHTML = "Error: Please enter numbers only";
        document.getElementById("inputNumber").focus();
      }
    }
  }
  else {
    thisCode_isNumber = 0;
    if (thisCode_isNumber != prevCode_isNumber) {
      newElement.innerHTML = "Please enter 5 numeric characters";
      newElement.style.color = "black";
      document.getElementById("msgContainerDiv").replaceChild(newElement, oldElement);

        /* Label for input box is changed to proper message and focus is brought nback in to
         * read the changed label for firefox
        */
      if(isMozillaBrowser){
        document.getElementById("inputNumber").blur();
        document.getElementById("inputLabel").innerHTML = "Please enter 5 numeric characters";
        document.getElementById("inputNumber").focus();
      }
    }
  }
}


function addObservers() {
  var inputNumberField = $('inputNumber');
  if ( inputNumberField != null )
  {
    inputNumberField.observe('focus', showPopup );
    inputNumberField.observe('keyup', validatePopup );
    inputNumberField.observe('blur', hidePopup );
  }
}

addObservers();
