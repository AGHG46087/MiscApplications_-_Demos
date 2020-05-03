<!--
// <![CDATA[
function toggleFonts(evt){
  // Enable all buttons
  $$("button").each(function(btn){
    btn.disabled = "";
  });
  var btn = Event.element(evt);
  // Disable clicked button
  btn.disabled = "disabled";
  // Set class of content container
  $("testContainer").writeAttribute("class",btn.id);
}
// load handler
Event.observe(window,"load",function () {
  // JS to prevent framing in external sites
  if(top!=self){top.location=self.document.location;}
  // Attach event observers to all buttons
  $$("button").each(function(btn){
    Event.observe(btn,"click",toggleFonts);
  });
});
//]]
-->