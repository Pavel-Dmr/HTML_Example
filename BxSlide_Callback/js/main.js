$(function () {
  var slider = $(".slider").bxSlider({
    auto: true, // 자동 슬라이드
    controls: false, // 이전,다음 컨트롤 생성하지 않음
    autoHover: true, // 마우스 올릴시 자동으로 슬라이딩 일시정지
    InfiniteLoop: true, // 비활성시
    // 각 슬라이드의 전환 직전의 실행할 코드을 입력
    onSlideBefore: function () {
      var n = slider.getCurrentSlide(); //현재슬라이드
      var w = $("#page ul li").width(); // 페이지 버튼의 크기
      console.log(n);
      $("#page ul li").removeClass("on");
      $("#page ul li").eq(n).addClass("on");
      if (n == 0) {
        $("#focus").css("left", "0");
      } else {
        $("#focus")
          .stop()
          .animate({ left: n * w }, 600);
      }
    },
    onSlideAfter: function () {
      var k = slider.getCurrentSlide(); //현재슬라이드
      $(".slider li").find("h1").removeClass("on");
      $(".slider li .text" + k).addClass("on");
    },
  });

  $(".left_btn").click(function () {
    slider.goToPrevSlide();
    return false;
  });
  $(".right_btn").click(function () {
    slider.goToNextSlide();
    return false;
  });
  $("#page ul li").click(function () {
    var j = $(this).index();
    slider.goToSlide(j);
    return false;
  });
});
