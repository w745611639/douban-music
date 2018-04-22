(function ($, root) {
	var $document = $(document);
	let pickObj = {
		pubdate: '出版时间',
		publisher: '出版者',
		media: '介质',
		version: '专辑类型',
		singer: '表演者',
	};
	function renderMusicInfo(data) {
		let attrs = data.attrs;
		let html = '';
		for(let prop in attrs) {
			if(prop in pickObj) {
				html += `<p>
						<span class="title">${pickObj[prop]}:</span>
						<span>${attrs[prop]}</span>
					</p>`;
				$document.find('.music-info').html(html);
			}		
		}	
		$document.find('.img-show .contain-img img').attr('src', data.image)
		$document.find('.music-title').html(data.title);
	}
	root.renderMusicInfo = renderMusicInfo;
}(window.$, window.musicManager || (window.musicManager = {})))

