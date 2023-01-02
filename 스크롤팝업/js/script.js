$(function(){
    var he;
    $(window).resize(function(){
        //브라우저 사이즈가 바뀔때마다

        he = $(window).height();
        //현재 브라우저 높이를 he에 저장

        $('section > div').height(he);
        //저장한 높이 he를 section > div에 각각 넣는다.
    });
    $(window).trigger('resize');
    //브라우저 시작시 강제로 resize를 실행

    var dTop = $('#floatdiv').offset().top;
    // var dTop1 = parseInt($('#floatdiv').css('top'));
    // parseInt(123.45px) = 123.45
    // alert(dTop);
    
    
    pdt = 0;

    $(window).scroll(function(){
       
        
        var sct = $(window).scrollTop();
        $('#sTop').text(sct);
        pdt = 0.002*sct; 
        console.log(pdt);
        if(pdt<=1){
            $('#pdt_basic').css('opacity',pdt);
        }
       // $("#pdt_basic").css("opacity",(sct-200)/200);
        if(sct >= 100){
            $('nav').addClass('fixed');
        }else{
            $('nav').removeClass('fixed');
        }

        $('#floatdiv').stop().animate({top:dTop+sct},500);


        if(sct >= $('section>div').eq(0).offset().top){
        $('nav ul li').removeClass('on');
        $('nav ul li').eq(0).addClass('on');
        $('#floatdiv ul li').removeClass('on');
        $('#floatdiv ul li').eq(0).addClass('on');

        $('#leftdiv ul li').removeClass('on');
        $('#leftdiv .leftdiv_title').addClass('on');

        }



        if(sct >= $('section>div').eq(1).offset().top){
        $('nav ul li').removeClass('on');
        $('nav ul li').eq(1).addClass('on');
        
        $('#floatdiv ul li').removeClass('on');
        $('#floatdiv ul li').eq(1).addClass('on');

        $('#leftdiv .leftdiv_title').removeClass('on');
        
        $('#leftdiv ul li').removeClass('on');
        $('#leftdiv ul li').eq(0).addClass('on');
        }



        if(sct >= $('section>div').eq(2).offset().top){
        $('nav ul li').removeClass('on');
        $('nav ul li').eq(2).addClass('on');
        $('#floatdiv ul li').removeClass('on');
        $('#floatdiv ul li').eq(2).addClass('on');

        $('#leftdiv ul li').removeClass('on');
        $('#leftdiv ul li').eq(1).addClass('on');
        }



        if(sct >= $('section>div').eq(3).offset().top){
        $('nav ul li').removeClass('on');
        $('nav ul li').eq(3).addClass('on');
        $('#floatdiv ul li').removeClass('on');
        $('#floatdiv ul li').eq(3).addClass('on');

        $('#leftdiv ul li').removeClass('on');
        $('#leftdiv ul li').eq(2).addClass('on');
        }



        if(sct >= $('section>div').eq(4).offset().top){
        $('nav ul li').removeClass('on');
        $('nav ul li').eq(4).addClass('on');
        $('#floatdiv ul li').removeClass('on');
        $('#floatdiv ul li').eq(4).addClass('on');

        $('#leftdiv ul li').removeClass('on');
        $('#leftdiv ul li').eq(3).addClass('on');
        }



        if(sct >= $('section>div').eq(5).offset().top){
        $('nav ul li').removeClass('on');
        $('nav ul li').eq(5).addClass('on');
        $('#floatdiv ul li').removeClass('on');
        $('#floatdiv ul li').eq(5).addClass('on');
        }


    });




    $('nav ul li').click(function(){
        var index_nav = $(this).index();
        var offset_nav = $('section div').eq(index_nav).offset().top;

        //클릭한 nav에 on클래스 주기
        $('nav ul li').removeClass('on');
        $(this).addClass('on');

        //클릭한 nav에 버튼 on클래스 주기
        $('#floatdiv ul li').removeClass('on');
        $('#floatdiv ul li').eq(index_nav).addClass('on');

        $('html,body').stop().animate({scrollTop:offset_nav},1000);

    });
    


    $('#floatdiv ul li').click(function(){
        var index_floatdiv = $(this).index();
        var offset_floatdiv = $('section div').eq(index_floatdiv).offset().top;

        //클릭한 버튼에 on클래스 주기
        $('#floatdiv ul li').removeClass('on');
        $(this).addClass('on');

        //클릭한 버튼에 nav on클래스 주기
        $('nav ul li').removeClass('on');
        $('nav ul li').eq(index_floatdiv).addClass('on');

        $('html,body').stop().animate({scrollTop:offset_floatdiv},1000);
    });





    

    $('#leftdiv ul li').click(function(){
        var index_leftdiv = $(this).index();
        var offset_leftdiv = $('section div').eq(index_leftdiv+1).offset().top;
        console.log(offset_leftdiv);
        $('#floatdiv ul li').removeClass('on');
        $(this).addClass('on');

        $('nav ul li').removeClass('on');
        $('nav ul li').eq(index_leftdiv).addClass('on');

        $('#leftdiv ul li').removeClass('on');
        $('#leftdiv ul li').eq(index_leftdiv).addClass('on');

        $('html,body').stop().animate({scrollTop:offset_leftdiv},1000);
    });

    $('.leftdiv_title').click(function(){
        var offset_leftdiv = $('section div').eq(0).offset().top;
        $('html,body').stop().animate({scrollTop:offset_leftdiv},1000);
    });

    $('#leftdiv ul li').hover(function(){
        $(this).addClass('on');
    },function(){
        $('#leftdiv ul li').removeClass('on');
        $(window).trigger('scroll');
    });

    $('.leftdiv_title').hover(function(){
        $(this).addClass('on');
    },function(){
        $(this).removeClass('on');
    });
 //popup 첫번째
 
 $('#popup').draggable();
//jquery ul 링크  draggable(); 팝업창 이동가능

//$.cookie('pop','yes'); 쿠기생성
//7일뒤에 만료되는 쿠기생성
//$.cookie('name','value',{expires:7});

if($.cookie('pop')!="no"){$('#popup').show();}
//처음실행시 pop 에 저장된 데이터가 없으므로 no하고 다르므로
//팝업을 무조건 보여줌

$('#popup area:eq(0)').click(function(){
    $('#popup').fadeOut('fast');
});

$('#popup area:eq(1)').click(function(){
    $.cookie('pop','no',{expires:1});
    $('#popup').fadeOut('fast'); 
});


$('#notice_wrap').draggable();
$('#notice_wrap').css('cursor','move');
//마우스 모양이 무브로 변경


//초기값에 popup이 정의가 안되었으므로 첨엔 거짓
if($.cookie('popup')=='none'){
    $('#notice_wrap').hide();
}

var chk = $('#expiresChk');

$('.closeBtn').on('click',closePop);

function closePop(){
    if(chk.is(":checked")){//체크가 되있으면
        $.cookie('popup','none',{expires:3});
        //chk 변수가 checked를 가지고있으면
        //popup에 none을 3일동안 저장해라 
    }
    $('#notice_wrap').fadeOut('fast');
}




});