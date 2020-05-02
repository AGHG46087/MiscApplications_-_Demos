
var eventTrigger;
var Layer = {
  init:function(event){
    var layer = document.createElement("div");
    layer.setAttribute("id","layer");
    document.body.appendChild(layer);
    var popup = document.createElement("div");
    popup.setAttribute("id","popup");
    document.body.appendChild(popup);
    var popupDivert = document.createElement("div");
    popupDivert.setAttribute("id","popupDivert");
    document.body.appendChild(popupDivert);
    // Observe "walls" for layer AFTER they are added to DOM
    Event.observe($("layer"),"focus",Layer.findFocus);
    Event.observe($("popupDivert"),"focus",Layer.findFocus);
  },
  show:function(event){
    Event.stop(event);
    eventTrigger = Event.element(event).id;
    $("layer").tabIndex = 0;
    $("layer").style.display = "block";
    var popup = $("popup");
    popup.tabIndex = 0;    
    popup.addClassName("popup");
    $("popupDivert").tabIndex = 0;
    /* Code to insert content into layer - replace with your own */
    if(eventTrigger === "openPopup")
      popup.appendChild(linkContent());
    else
      popup.appendChild(buttonContent());
    popup.appendChild(closeButton());

    // Set timout to ensure nodes are added to element before focus given, else they are missed
    var to = window.setTimeout(function(){
      popup.focus();
      window.clearTimeout(to);
    }, 100);
  },
  close:function(event){
    var popup = $("popup");
    popup.removeAttribute("tabIndex");
    var layer = $("layer");
    layer.removeAttribute("tabIndex");
    layer.style.display = "none";
    $("popupDivert").removeAttribute("tabIndex");
    var children = popup.childElements();
    children.each(Element.remove);
    popup.removeClassName("popup");
    $(eventTrigger).focus();
  },
  findFocus:function(event){
    var popup = $("popup");
    if(popup.hasClassName("popup")&& Event.element(event).id == "layer")
      $("closePopup").focus();
    else if(popup.hasClassName("popup"))
      popup.focus();
  }
}
/* Utility function to add close button to layer */
function closeButton(){
  var closeContainer = document.createElement("div");
  closeContainer.setAttribute("class","centerText");
  var close = document.createElement("input");
  close.setAttribute("type","button");
  close.setAttribute("value","Close popup");
  close.setAttribute("id","closePopup");
  closeContainer.appendChild(close);
  Event.observe(close,"click",Layer.close);
  return closeContainer;
}
/* Simple utility methods to reduce code duplication */
function createInput(labelText,id,type,value){
  var fieldset = document.createElement("div");
  if(labelText){
    var label = document.createElement("label");
    label.setAttribute("for",id);
    label.appendChild(document.createTextNode(labelText));
    fieldset.appendChild(label);
  }
  var input = document.createElement("input");
  input.setAttribute("id",id);
  input.setAttribute("type",type);
  if(value)
    input.setAttribute("value",value);
  fieldset.appendChild(input);
  return fieldset;
}
function linkContent(){
  var element = document.createElement("div");
  var head = document.createElement("h2");
  head.appendChild(document.createTextNode("An Accessible Layer"));
  var form = document.createElement("form");
  var fieldset = document.createElement("fieldset");
  var legend = document.createElement("legend");
  legend.appendChild(document.createTextNode("An example layer form"));
  fieldset.appendChild(legend);
  var field1 = createInput("Layer Input 1","layerInput1","text",null);
  fieldset.appendChild(field1);
  var field2 = createInput("Layer Input 2","layerInput2","text",null);
  fieldset.appendChild(field2);
  var submit = createInput(null,"submitButtonLayer","submit","Submit Form");
  fieldset.appendChild(submit);  
  form.appendChild(fieldset);
  element.appendChild(head);
  element.appendChild(form);
  return element;
}
function buttonContent(){
  var element = document.createElement("div");
  var head = document.createElement("h2");
  head.appendChild(document.createTextNode("Form Processing"));
  var img = document.createElement("img");
  img.setAttribute("src","images/loading.gif");
  img.setAttribute("alt","Blue circles rotating clockwise indicating loading");
  var copy = document.createElement("p");
  copy.appendChild(document.createTextNode("Thank you for completing the form. We are now processing your details."));
  copy.appendChild(img);
  element.appendChild(head);
  element.appendChild(copy);
  return element;
}
// load handler
Event.observe(window,"load",function () {
  Layer.init();
  /* Replace with your own event observers for opening a layer */
  Event.observe($("demoForm"),"submit",Layer.show);
  Event.observe($("submitButton"),"click",Layer.show);
  Event.observe($("openPopup"),"click",Layer.show);
});
