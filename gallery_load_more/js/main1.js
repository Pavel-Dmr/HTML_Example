$(function () {
	var $container = $('.gallery');
	$loadMoreBtn = $('.load-more'),
	$addItemCount = 8,
	$added = 0, //더보기 버튼을 클릭해서 추가된 항목 개수
	$allData=[]
	$container.masonry({
		// options
		itemSelector: '.gallery-item',
		columnWidth: 270,//그림상의 넓이
		gutter:10//간격
	});
	
	
	
	
	//$.$.getJSON('파일경로',할일)
	$.getJSON('./data/content.json', initGallery);
	
	function initGallery(data){
		$allData = data;
		addItem();//열자마자 아이템 추가
		$loadMoreBtn.click(addItem);
	}
	function addItem(){
		var slicedData;
		var elements = [];
		//var $allData =[0,1,2,3,4,5,6,7,8,9]
		//var slidedData = $allData.slice(0,$addItemCount) 
		//$allData배열에서 0번째 9번째 전까지의 값을 가져온다.
		slicedData = $allData.slice($added,$added + $addItemCount); 
		console.log(slicedData)
		$.each(slicedData, function (i, item) {
					var itemHTML =
					 `<li class="gallery-item">
						<a href="#">
							<figure>
								<img src="${item.images.thumb}" alt="${item.title}"/>
								<figcaption>
								${item.title}
								</figcaption>
							</figure>
						</a>
					 </li>`;       
                elements.push($(itemHTML).get(0));
            });
		$container.append(elements);
		//$added 값 업데이트
		$added = $added + slicedData.length;
		
		if($added < $allData.length){
			$loadMoreBtn.show();
		}else{
			$loadMoreBtn.hide();
		}
		
		$container.append(elements);
		$container.imagesLoaded( function() {
		// $container.find('li').removeClass('is-loading');
		$container.masonry('appended',elements);
		});
		
	}//addItem
	
	
	
});




