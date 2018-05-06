(function ($, root) {
	let $document = $(document);
	function renderTags(data) {
		let tags = data.tags;
		let html = '';
		tags.forEach(ele => {
			html += `<a href="#">${ele.name}</a>`
		});
		$document.find('.tag-list').html(html);
	}
	root.renderTags = renderTags;
}(window.$, window.musicManager || (window.musicManager = {})))

