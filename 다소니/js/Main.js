$(function () {
  // TODO 최상단 슬라이더 글짜 지연
  setTimeout(function () {
    $(".slider li .text0").addClass("on");
    $(".slider li .atext0").addClass("on");
  }, 1000);

  // TODO 최상단 슬라이더
  var bx = $(".slider").bxSlider({
    auto: true,
    controls: false,
    pager: false,
    mode: "fade",
    pause: 5000,
    autoHover: true,
    onSlideBefore: function () {},
    onSlideAfter: function () {
      var k = bx.getCurrentSlide(); //현재의 슬라이드 번호 k에 입력
      $(".slider li").find("h2").removeClass("on");
      $(".slider li").find("p").removeClass("on");
      $(".slider li .text" + k).addClass("on");
      $(".slider li .atext" + k).addClass("on");
    },
  });

  // TODO 스크롤 애니메이션
  let s2_offset = $(".s2_title").offset().top;
  let s3_offset = $(".s3_title").offset().top;
  let s4_offset = $(".s4_title").offset().top;
  let s5_offset = $(".s5_title").offset().top;
  let s6_offset = $(".s6_noti").offset().top;
  $(window).scroll(function () {
    var sct = $(this).scrollTop(); //스크롤의 위치값

    // ! s2 영역의 애니메이션
    if (s2_offset < sct + 700) {
      $(".s2_title img").addClass("slide");
      $(".s2_title h2").addClass("slide");
      $(".s2_title p").addClass("slide");

      // 시간차를 두고 차례대로 애니메이션
      $(".s2_table li").eq(0).addClass("slide");
      setTimeout(function () {
        $(".s2_table li").eq(1).addClass("slide");
      }, 300);
      setTimeout(function () {
        $(".s2_table li").eq(2).addClass("slide");
      }, 600);
      setTimeout(function () {
        $(".s2_table li").eq(3).addClass("slide");
      }, 900);
    }

    // ! s3 영역의 애니메이션
    if (s3_offset < sct + 600) {
      $(".s3_title img").addClass("slide");
      $(".s3_title h2").addClass("slide");
      $(".s3_title p").addClass("slide");

      // 시간차를 두고 차례대로 애니메이션
      $(".s3_table li").eq(0).addClass("slide");
      setTimeout(function () {
        $(".s3_table li").eq(1).addClass("slide");
      }, 300);
      setTimeout(function () {
        $(".s3_table li").eq(2).addClass("slide");
      }, 600);
      setTimeout(function () {
        $(".s3_table li").eq(3).addClass("slide");
      }, 900);
      setTimeout(function () {
        $(".s3_table li").eq(4).addClass("slide");
      }, 1200);
    }

    // ! s4 영역의 애니메이션

    if (s4_offset < sct + 500) {
      $(".s4_title img").addClass("slide");
      $(".s4_title h2").addClass("slide");
      $(".s4_title p").addClass("slide");

      // 시간차를 두고 차례대로 애니메이션
      $(".s4_table li").eq(0).addClass("slide");
      setTimeout(function () {
        $(".s4_table li").eq(1).addClass("slide");
      }, 300);
      setTimeout(function () {
        $(".s4_table li").eq(2).addClass("slide");
      }, 600);
      setTimeout(function () {
        $(".s4_table li").eq(3).addClass("slide");
      }, 900);
      setTimeout(function () {
        $(".s4_table li").eq(4).addClass("slide");
      }, 1200);
    }

    // ! s5 영역의 애니메이션
    if (s5_offset < sct + 800) {
      $(".s5_title img").addClass("slide");
      $(".s5_title h2").addClass("slide");
      $(".s5_title p").addClass("slide");
      $(".s5_title a").addClass("slide");
    }

    // ! s6 영역의 애니메이션
    if (s5_offset < sct + 500) {
      $(".s6_noti, .s6_review").addClass("slide");
    }
  });

  // TODO ===== 팝업 창 관련 =====

  // 팝업 드래그 설정
  $("#draggable").draggable({
    scroll: false,
    containment: "parent",
  });

  // 팝업창 쿠기가 none이면 숨깁니다
  if ($.cookie("popup01") == "none") {
    $(".popup01").hide();
  }

  $(".popup01_btn02").click(function () {
    $(".popup01").fadeOut("fast");
  });

  // 24시간동안 노출 시키지 않음
  $(".popup01_btn01").click(function () {
    $.cookie("popup01", "none", { expires: 1 });
    $(".popup01").fadeOut("fast");
  });

  // TODO ===== 고정된 버튼 박스 관련 =====

  // 버튼 스크롤에 따라 움직임
  $(window).scroll(() => {
    let fixed_box = $(".fixed_box");
    let sct = $(this).scrollTop();
    setTimeout(() => {
      fixed_box.css({ top: 400 + sct, transition: "0.5s" });
    }, 100);
  });

  // ! 스크롤 멈춤 감지 - 사용 중지
  // $.fn.scrollStopped = function (callback) {
  //   $(this).scroll(function (ev) {
  //     clearTimeout($(this).data("scrollTimeout"));
  //     $(this).data("scrollTimeout", setTimeout(callback.bind(this), 250, ev));
  //   });
  // };

  // $(window).scrollStopped(function (ev) {
  //   console.log(ev);
  //   alert("scroll stopped");
  // });
});
