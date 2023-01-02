$(function () {
  // 트랜지션 완료 이벤트 변수
  var transition_end =
    "transitionend webkitTransitionEnd oTransitionEnd otransitionend";

  // TODO 버튼 클릭 이벤트, 트랜지션 완료 감지
  // ! 1번 버튼
  $(".art01_btn .btn01").click((e) => {
    console.log("Btn01");

    $(".art01 ul li:eq(0)").addClass("on");

    $(".art01 ul li img").one(transition_end, function () {
      $(".art01 ul li").removeClass("on");
    });
  });
  // ! 2번 버튼
  $(".art01_btn .btn02").click((e) => {
    console.log("Btn02");

    $(".art01 ul li:eq(1)").addClass("on");

    $(".art01 ul li img").one(transition_end, function () {
      $(".art01 ul li").removeClass("on");
    });
  });
  // ! 3번 버튼
  // ! 4번 버튼
});
