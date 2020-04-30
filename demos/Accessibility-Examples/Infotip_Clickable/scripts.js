	
	/*thisCode_isNumber and prevCode_isNumber are used not to populate the same message/popup again 
	 hence screen reader will read only when the message/popup changes*/
	var thisCode_isNumber = 0; 
	var prevCode_isNumber = 0;
	/**
		Function to display popup on focus of the input field
	*/
	function showPopup() {
		document.getElementById("dynamicPopUP").style.display = "block";
	}

	/**
		Function accepts event, determines the source element and based on the key pressed calls buildPopup() with error flag
	*/
	function validatePopup(event){
		var inputID;
		if (window.event) {
		   inputID = event.srcElement.id;
		} else {	 
		   inputID = event.target.id;
		}
		if(document.getElementById(inputID)){
			if(isNaN(document.getElementById(inputID).value)){
				buildPopup('true');
			} else {
				buildPopup('false');
		   }
		}		 
	}
	
	/**
		Function accepts error flag and builds the message for the popup dynamically and also stop populating incase of same message
	*/
	function buildPopup(error){
		prevCode_isNumber = thisCode_isNumber;
		var newElement=document.createElement("span");
        var oldElement=document.getElementById("dynamicMsg");
        newElement.setAttribute("id", "dynamicMsg");
		
		/*aria attributes added to the element which will have visual changes on screen*/
		newElement.setAttribute("aria-live", "assertive");  
		newElement.setAttribute("aria-relevant", "additions");

		if(error == "true"){
			thisCode_isNumber = 1;
			if (thisCode_isNumber != prevCode_isNumber) {  // check if the message code is different 
				newElement.innerHTML = "Error: Please enter numbers only";
				newElement.style.color = "red";
				document.getElementById("msgContainerDiv").replaceChild(newElement, oldElement);
			}
		} else {
			thisCode_isNumber = 0;
			if (thisCode_isNumber != prevCode_isNumber) {  // check if the message code is different 
				newElement.innerHTML = "Please enter 5 numeric characters";
				newElement.style.color = "black";
				document.getElementById("msgContainerDiv").replaceChild(newElement, oldElement);
			}
		}
	}

	/**
	Function to hide the popup onblur of the input box.
	*/
	function hidePopup(){
		document.getElementById("dynamicPopUP").style.display = "none";
	}

