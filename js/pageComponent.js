(function ($, root) {
	let $document = $(document);
	// 根据总分页数 和当前活动页 渲染分页组件
	function managerPage (num, active) {
		let len;
		let conut;
		let html = '<li class="prev-page"><a href="#" class="common-btn" data-list="prev" data-click="false"><前页</a></li>';
		if(num <= 1) {
			return 
		} else if (num < 9) {
			for(let i = 0; i < num; i ++) {
				html += `<li class="${ i == active && 'active'}">
						<a href="#" data-item="${i}" class="common-btn">${i + 1}</a>
				</li>`;
			}	
		} else {
			let i = 0;
			count = active - 5;
			len = count > 0 ? Math.min(9 + count, num) : 9;
			if(len > 11) {
				for(; i < 2; i ++) {
					html += `<li class="${ i == active && 'active'}">
							<a href="#" data-item="${i}" class="common-btn">${i + 1}</a>
					</li>`;
				}
				html += `<li class="prev-omit" style="display: block">...</li>`;
				i = active - 4;
				for(; i < Math.min(active + 4, num); i ++) {
					html += `<li class="${ i == active && 'active'}">
								<a href="#" data-item="${i}" class="common-btn">${i + 1}</a>
					</li>`;
				}
				
				if(active < num - 4) {
					console.log(11)
					html += '<li class="next-omit">...</li>';
					i = num - 2;
					for(; i < num; i ++) {
						html += `<li class="${ i == active && 'active'}">
									<a href="#" data-item="${i}" class="common-btn">${i + 1}</a>
						</li>`;
					}
				}
				
			} else {
				for(; i < len; i ++) {
					html += `<li class="${ i == active && 'active'}">
							<a href="#" data-item="${i}" class="common-btn">${i + 1}</a>
					</li>`;
				}
				html += `<li class="next-omit">...</li>`;
				i = num == 10 ? num - 1 : num - 2;
				for(; i < num; i ++) {
					html += `<li class="${ i == active && 'active'}">
							<a href="#" data-item="${i}" class="common-btn">${i + 1}</a>
					</li>`;
				}				
			}
		}
		html += '<li class="next-page"><a href="#" class="common-btn" data-list="next" data-click="true">后页></a></li>';
		$document.find('.search-page-control ul').html(html);

	}
	root.managerPage = managerPage;
}(window.$, window.pageControl || (window.pageControl = {})))

