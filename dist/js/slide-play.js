(function ($, root) {
	let index = 0;
	let len = 7;
	let duration;
	let $document = $(document);
	let $slide_group = $document.find('.slide-group');
	let $slide_img = $slide_group.find('.slide-img');
	let $slide_control_li = $slide_group.find('.slide-control li');
	let width = $document.find('.slide-img li').width();
	let lock = true;
	root.timer = null;
	root.lastIndex = 0;
	function slidePlay() {
		// 点击prev 按钮处于第一张图片时候，需要马上跳转到最后一张
		if(index < 0 && duration < 0) {
			index = 6;
			$slide_img.css('left', - index * width + 'px');
			index --;
		}
		$slide_img.stop().animate({left: - index * width + 'px'}, 600, function () {
			// 点击next 按钮运动到第七张图片之后，将left置零，从而形成无缝轮播
			if(index == 6 && duration > 0) {
				index = 0;
				$slide_img.css('left', 0)
			}
			$slide_control_li.eq(root.lastIndex).removeClass('active');
			$slide_control_li.eq(index).addClass('active');
			root.lastIndex = index;
			lock = true;
			clearInterval(slidePlay.timer);
			slidePlay.timer = setInterval(slidePlay.autoPlay, 3000);
		});
	}
	function changeSlideIndex(value) {
		if(lock) {
			lock = false;
			duration = Number(value);
			index += duration;
			slidePlay();
		}	
	}
	function autoPlay() {
		changeSlideIndex(1);
		slidePlay();
	}
	root.changeSlideIndex = changeSlideIndex;
	root.autoPlay = autoPlay;
}(window.$, window.slidePlay || (window.slidePlay = {})))