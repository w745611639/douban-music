let $document = $(document);
function bindEvent() {
	let $next_btn = $('.next-btn');
	let $prev_btn = $('.prev-btn');
	let $slide_control_li = $document.find('.slide-control li');
	// 轮播
	$next_btn.on('click', function () {
		clearInterval(slidePlay.timer);
		slidePlay.changeSlideIndex(1);
	});
	$prev_btn.on('click', function () {
		clearInterval(slidePlay.timer);
		slidePlay.changeSlideIndex(-1);
	});
	$slide_control_li.on('click', function () {
		clearInterval(slidePlay.timer);
		slidePlay.changeSlideIndex($(this).index() - slidePlay.lastIndex)
	});
	$document.find('.slide-group').on('mouseenter', function () {
		clearInterval(slidePlay.timer)
	});
	$document.find('.slide-group').on('mouseleave', function () {
		slidePlay.timer = setInterval(slidePlay.autoPlay, 3000)	
	});
	slidePlay.timer = setInterval(slidePlay.autoPlay, 3000);
}
bindEvent();
