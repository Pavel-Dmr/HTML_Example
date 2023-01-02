$(() => {
  var ht;

  // TODO 창 크기 해상도따른 최적화
  $(window).resize(() => {
    ht = $(window).height(); // 현재 브라우저의 높이
    $("section").height(ht);
    //구한 높이값을 가져와서 컨텐츠 영역(section)의 높이에 대입
  });

  // TODO 브라우저를 켜자 마자 강제로 리사이즈

  $(window).trigger("resize");

  // TODO 왼쪽의 메뉴를(#menu li) 클릭할때 마다 스크롤
  $("#menu li").click(function () {
    let i = $(this).index();

    $("html,body")
      .stop()
      .animate({ scrollTop: i * ht }, 1300);

    return false;
  });

  // TODO 왼쪽 메뉴 강조 표시
  $(window).scroll(function () {
    let sct = $(window).scrollTop();

    // ? Option_01
    // for (let x = 0; x <= 3; x++) {
    //   if (sct >= ht * x && sct < ht * (1 + x)) {
    //     $("#menu li").removeClass("on");
    //     $("#menu li").eq(x).addClass("on");
    //   }
    // }

    // ? Option_02
    $("#menu li").each((x) => {
      if (sct >= ht * x && sct < ht * (1 + x)) {
        $("#menu li").removeClass("on");
        $("#menu li").eq(x).addClass("on");
      }
    });

    // TODO 마우스 휠 컨트롤 위아래 이벤트
    $("section").mousewheel(function (event, d) {
      console.log(d);

      if (d > 0) {
        let prev = $(this).prev().offset().top;
        $("html,body")
          .stop()
          .animate({ scrollTop: prev }, 1300, "easeOutBounce");
      }

      if (d < 0) {
        let next = $(this).next().offset().top;
        $("html,body")
          .stop()
          .animate({ scrollTop: next }, 1300, "easeOutBounce");
      }
    });
  });

  // TODO 마우스 움직임에 따른 화면 이펙트 움직임
  $("section").mousemove((e) => {
    var posX = e.pageX;
    var posY = e.pageY;

    // ! 1 페이지
    $(".p11").css({
      right: 20 - posX / 30,
      bottom: 20 - posY / 30,
    });
    $(".p12").css({
      right: 130 - posX / 20,
      bottom: -40 - posY / 20,
    });
    $(".p13").css({
      right: 60 + posX / 20,
      bottom: 180 + posY / 20,
    });

    // ! 2 페이지
    $(".p21").css({
      right: 20 - posX / 30,
      bottom: 20 - posY / 30,
    });
    $(".p22").css({
      right: 130 - posX / 20,
      bottom: -40 - posY / 20,
    });
    $(".p23").css({
      right: 60 + posX / 20,
      bottom: 180 + posY / 20,
    });
    // ! 3 페이지
    $(".p31").css({
      right: 20 - posX / 30,
      bottom: 20 - posY / 30,
    });
    $(".p32").css({
      right: 130 - posX / 20,
      bottom: -40 - posY / 20,
    });
    $(".p33").css({
      right: 60 + posX / 20,
      bottom: 180 + posY / 20,
    });
    // ! 4 페이지
    $(".p41").css({
      right: 20 - posX / 30,
      bottom: 20 - posY / 30,
    });
    $(".p42").css({
      right: 130 - posX / 20,
      bottom: -40 - posY / 20,
    });
    $(".p43").css({
      right: 60 + posX / 20,
      bottom: 180 + posY / 20,
    });
  });

  // TODO 팝업 관련 컨트롤
  // 24시간 보지 않음
  $(".popup01_btn01").click(function () {
    $.cookie("popup01", "none", { expires: 1 });
    $(".popup01").fadeOut("fast");
  });
  // 닫기
  $(".popup01_btn02").click(function () {
    $(".popup01").fadeOut("fast");
  });
  // 팝업 쿠키가 none인 경우
  if ($.cookie("popup01") == "none") {
    $(".popup01").hide();
  }
  // 팝업 드래그
  $("#draggable").draggable({
    scroll: false,
    containment: "parent",
  });
});
