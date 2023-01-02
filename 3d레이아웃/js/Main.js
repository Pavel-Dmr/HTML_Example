$(function () {
  // TODO 메뉴 버튼 클릭시
  $(".btnMenu").click(function () {
    // 메뉴버튼 페이드아웃
    $(".btnMenu").fadeOut();

    // 화면이 3D로 뒤로 밀려나듯하도록 설정
    $("section").addClass("on");

    // 사이드바 메뉴 보이게함
    $("nav.sidebar").addClass("on");
  });

  // TODO 사이드바 메뉴 클릭시
  $("#gnb li").click(function () {
    // 메뉴 버튼 페이드 인
    $(".btnMenu").fadeIn();

    $("section").removeClass("on");
    // 몇번째 메뉴인지
    let num = $(this).index();
    console.log(num);
    $("section div").removeClass("on");
    $("section div").eq(num).addClass("on");

    // 사이드바 메뉴 다시 보이지 않게함
    $("nav.sidebar").removeClass("on");
  });
});

// 1. btnMenu를 클릭하면 .btnMenu가 서서히 사라짐

// Section 에 클래스 on추가

// 메뉴에 (nav) 클래스 on 추가

//.nav li 클릭하면

//btn Menu가 서서히 보여짐

//section과 nav에 클래스 제거

//인덱스 번호 구하기

//section > div 클래스 제거

//section > div 중 인덱스번호가 같은 것에 클래스 on 추가
