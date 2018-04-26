(function ($, root) {
	let $document = $(document);
	let value;
	// 立即执行函数，生成私用属性timer 用于防抖
	function bindEvent() {
		$document.find('.search-bar').on('input', (() => {
			let timer = null;
			return function () {
				clearTimeout(timer);
				timer = setTimeout(() => {
					// 全局缓存value, 便于跳转音乐具体页时寻找目标
					value = this.value;
					$.ajax({
						method: 'get',
						dataType: 'jsonp',
						data: `q=${value}&count=7`,
						url: 'https://api.douban.com/v2/music/search',
						success: renderMusicList,
						error: function () {
							console.log('error');
						}
					})

				}, 500);
			}
		})());
		$document.find('.search-group').on('click', function (e) {
			e.stopPropagation();
		});
		$document.on('click', function () {
			$(this).find('.search-con-show').css('display', 'none');
		});
	}
	function renderMusicList(data) {
		console.log(data);
		let html = '';
		data.musics.forEach((ele, index) => {
			if(index >= 7) return;
			html += `<li>
						<a href="./music-info.html?key=${value}&id=${ele.id}">
							<div class="search-con-pic">
								<img src="${ele.image}" alt="error" onerror="this.style.cssText='display: block; height: 100%; border: 1px solid #ccc; box-sizing: border-box'"/>
							</div>
							<div class="search-con-info">
								<p class="info-name">
									<span class="name">${ele.title}</span>
								</p>
								<p>
									<span>表演者:</span>
									<span class="performer">${ele.author[0].name}</span>
								</p>
							</div>
						</a>
					</li>`
		})
		$document.find('.search-con-show').html(html).css('display', 'block');
	}
	root.bindEvent = bindEvent;
	root.renderMusicList = renderMusicList;
	root.bindEvent();
}(window.jQuery, window.musicSearch || (window.musicSearch = {})))

