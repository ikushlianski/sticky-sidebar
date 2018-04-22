// function expects jQuery object
function getElementAbsBottomCoord(elem) {
  elemAbsBottomCoord = elem.offset().top + elem.height();
  return elemAbsBottomCoord;
}

function getElementAbsTopCoord(elem) {
  elemAbsTopCoord = elem.offset().top;
  return elemAbsTopCoord;
}



let $newsPiece = $(".node-type-article .pane-center .panel-panel.panel-col-first");
let $ya = $(".node-type-article .pane-yandex-right");
if ($newsPiece.length !== 0 && $ya.length !== 0) {
  var newsPieceAbsBottom = getElementAbsBottomCoord($newsPiece);
  var yandexAbsBottomInitial = getElementAbsBottomCoord($ya);
}

$(window).on("scroll", function() {
  if ($ya.height() == 0) {
    return false;
  }
  if ($newsPiece.length == 0 || $ya.length == 0) {
    return false;
  }
  if ($ya.height() >= $newsPiece.height()) {
    // $ya too high to do anything here
    return false;
  }
  if ($ya.height() >= window.innerHeight) {
    // $ya too high for this viewport
    return false;
  }
  let yandexAbsTopNow = getElementAbsTopCoord($ya);
  $ya.parent().css({"position": "relative", "height": $newsPiece.height()})
  // when we are scrolling down
  if (($(window).scrollTop() > yandexAbsBottomInitial) ) {
    if (newsPieceAbsBottom > getElementAbsBottomCoord($ya)) {
      $ya.css({"position": "fixed", "top": "1em", "bottom": ""});
    }
  }
  if ($(window).scrollTop() > (getElementAbsBottomCoord($newsPiece)-$ya.height()) && ($ya.css("position") === "fixed")) {
    if (getElementAbsBottomCoord($newsPiece) < getElementAbsBottomCoord($ya)) {
      // make its position absolute to parent div with bottom: 0
      $ya.css({"position": "absolute", "bottom": '1em', "top": ""});
    }
  }
  // when we are scrolling up
  if ($(window).scrollTop() < (getElementAbsBottomCoord($ya)-$ya.height()) && ($ya.css("position") === "absolute")) {
    $ya.css({"position": "fixed", "top": "1em", "bottom": ""});
  }
  if (($(window).scrollTop() < yandexAbsBottomInitial) && ($ya.css("position") === "fixed")) {
    $ya.css({"position": "static", "top": "", "bottom": ""});
  }
});
