$(function () {
  $(window).scroll(function () {
    var sct = $(this).scrollTop();

    $("#value").text(sct);

    $("#area1").css({ transform: "translateZ(" + (-20000 + sct) + "px" });
  });
});
