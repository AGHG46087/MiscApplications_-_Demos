/*
 *
 */

var cardart_index = 1;
var MAX_CARDART = 6;
var MIN_CARDART = 1;

function getNextCardArtIndex(nextBool) {
  cardart_index += ((nextBool == true) ? 1 : -1);
  if ( nextBool == true && cardart_index > MAX_CARDART ) {
    cardart_index = MIN_CARDART;
  }
  if ( nextBool == false && cardart_index < MIN_CARDART ) {
    cardart_index = MAX_CARDART;
  }

  return cardart_index;
  
}
function getNextCardArtID(nextBool) {
//  cardart_index = parseInt(currID.substring(currID.length-1));

  var index = getNextCardArtIndex(nextBool);
  var idString = "img_" + index;
  return idString;
  
}
function renderDetails() {
  var detailID = "#detail_" + cardart_index;
  var node = $(detailID);

  var details = $("#details");
  details.html(node.html());
}
function changeImage(event) {
  event.preventDefault();
  var el = $(event.currentTarget).find("img");
  
  var mainImg = $("#mainImage");
  var caption = $("#caption");

  mainImg.attr("src", el.attr("src"));
  caption.html(el.attr("alt"));

  var elid = el.attr("id");
  cardart_index = parseInt(elid.substring(elid.length-1));
  renderDetails();
}
function buttonClick(event) {
  event.preventDefault();
  var el = $(event.currentTarget).find("button");

  var idVal = el.attr("id");
  var nextBool = (idVal.indexOf("next") > -1);
  var idString = "#" + getNextCardArtID(nextBool);
  var newImgNode = $(idString);
  
  var mainImg = $("#mainImage");
  var caption = $("#caption");

  mainImg.attr("src", newImgNode.attr("src"));
  caption.html(newImgNode.attr("alt"));

  renderDetails();
  
}
function initPage() {

  $('#nav_gallery .clickable').bind("click", function(event) {
        changeImage(event);
      });

  $('#nav_buttons .clickable').bind("click", function(event) {
        buttonClick(event);
      });

  renderDetails();
    
}


$(document).ready(function() {
      initPage();
});
