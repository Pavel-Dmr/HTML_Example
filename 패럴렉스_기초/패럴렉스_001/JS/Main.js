$(function () {
  var top = $("#item_01").offset().top; // 40
  var left_01 = $("#item_01").offset().left; // 20
  var left_02 = $("#item_02").offset().left; // 100
  var left_03 = $("#item_03").offset().left; // 180
  var left_04 = $("#item_04").offset().left; // 260
  var left_05 = $("#item_05").offset().left; // 340

  $(window).scroll(function () {
    var sct = $(this).scrollTop();
    $("#value").text(sct);

    $("#item_01").css({
      top: top + sct / 4,
    });
    $("#item_02").css({
      top: top + sct / 5,
      left: left_02 + sct / 8,
    });
    $("#item_03").css({
      top: top + sct / 6,
      left: left_03 + sct / 6,
    });
    $("#item_04").css({
      top: top + sct / 8,
      left: left_04 + sct / 5,
    });
    $("#item_05").css({
      left: left_05 + sct / 4,
    });
  });
});
