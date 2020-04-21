/**  SDO js methods **/
$(document).ready(function() {  
	/*Functionality to check if the scroll bar is completely scrolled to the bottom,If yes enable the AGREE/SAVE CHANGES button
	      i.e 1)Get the scrollable text content height
		  2)Get the current scroll position value
		  3)Calculate the difference of scrollheight and current scroll position
		  4)The differnce should be <= total div textarea height
      		  5)scrollHeight,scrollTop are the html properties of an element.
	  	  6)scroll,attr,height,removeClass,addClass are the jquery functions.
	*/
	$("#tctxtareafield").scroll(function() {
		//Total tctxtareafield scrollable text content height
		var scrollheight = $("#tctxtareafield").attr("scrollHeight");
		//Current position of scroll
		var scrolltop = $("#tctxtareafield").attr("scrollTop");
		// Total scroll height - current position of scroll <= text area i.e tctxtareafield div height
		if ((scrollheight - scrolltop )  <= $("#tctxtareafield").height()) {  
			// Enabling Agree/Save Changes button
			$("#submitptopl").removeClass("sdogreyout");
			$("#submitptopl").addClass("sdobtnpointer");
		}		
	}); 
	 /* Functionality to print the sdo terms and conditions when the print link in the 
	 preconfirmation page is clicked on, or even if the Enter key is pressed on, 
	 this event gets fired */
     $("#print").bind('click keypress',function(objEvent){
		if ((objEvent.type == 'click') || (objEvent.keyCode == '13')) {
			/*dynamically creating a new iframe and setting the attribute id, name and styles*/
			ifrmprint = document.createElement("iframe");
			ifrmprint.setAttribute('id', 'iframeprint');
			ifrmprint.setAttribute('name', 'iframeprint');
			//Setting these parameters explicitly to avoid display of iframe in IE
			ifrmprint.style.height = 0; 
			ifrmprint.style.width = 0; 
			ifrmprint.style.border = 0;
			document.body.appendChild(ifrmprint);
			
			//Fetching the terms and conditions content for printing
			var tnccontent = $("#tctxtareafield").html();
			var docobject = (ifrmprint.contentWindow || ifrmprint.contentDocument);
			if (docobject.document)  {
				docobject = docobject.document;
			}
			/*Adding Title to the terms and conditions thats gets displayed on 
			click of print in printer console window*/

			docobject.write("<head><title>Terms and Conditions</title><link rel='stylesheet' type='text/css' href='css/sdo.css'></link>");
			//pops up printer console window to print the terms and conditions
			docobject.write("</head><body onload='this.focus();this.print();'>");
			//Writing terms and conditions content for printing for the CM
			docobject.write(tnccontent + "</body>");
			docobject.close();
			//Dynamically removing the iframe after 5000 milli seconds
			setTimeout(function() { $("#iframeprint").remove(); }, 5000);
		}
    });//End of Print functionality
});
