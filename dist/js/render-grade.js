(function ($, root) {
	let $document = $(document);
	function renderGrade(data) {
		let rating = data.rating;
		let html = `<span class="score">${rating.average}</span>
					<p>
						<i class="star"></i>
						<a href="#" class="common-btn">${rating.numRaters}人评价</a>
					</p>`;
		$document.find('.douban-grade-score').html(html);
	}
	root.renderGrade = renderGrade;
}(window.$, window.musicManager || (window.musicManager = {})))
