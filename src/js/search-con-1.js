// 观察者模式改写
var publish = {};
(function (p) {
	var subs = -1,
		topics = [];
	p.publish = function (topic, args) {
		if(!topics[topic]) {
			return false;
		}
		var subscribers = topics[topic],
			len = subscribers.length;
		while(len -- ) {
			subscribers[len].func(topic, args);
		}
	};
	p.subscribe = function (topic, func) {
		if(!topics[topic]) {
			topics[topic] = [];
		}
		var token = subs;
		topics[topic].push({
			token: token,
			func: func
		});
	};
	p.unsubscribe = function (token) {
		for(var topic in topics) {
			if(topics.hasOwnProperty(topic)) {
				for(var i = 0, len = topics[topic].length; i < len; i ++) {
					if(topics[topic][i].token == token) {
						topics[topic].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	}
}(publish));
let $document = $(document);
(function ($, root) {
	root.page = 0;
	let num = 15;
	root.total = 0;
	function changePage(value) {
		root.page += Number(value);
	}
	function getPageMsg(value) {
		root.page = Number(value);
		$.ajax({
			method: 'get',
			dataType: 'jsonp',
			url: 'https://api.douban.com/v2/music/search',
			data: `count = 15&start=${root.page * 15}&q=${musicManager.msgObj.keyword}` ,
			success: renderMusicMsg,
			error: function () {
				console.log('error')
			}
		})
	}
	function renderMusicMsg(data) {
		let html = '';
		data.musics.forEach(ele => {
			let rating = ele.rating;
			html += `<li class="search-con-list-item">
						<div class="left-pic-show">
							<a href="./music-info.html?key=${ele.title}&id=${ele.id}">
								<img src="${ele.image}" alt="" onerror="this.style.cssText='box-sizing: border-box; height: 100%; border: 1px solid #ccc'"/>
							</a>
						</div>
						<div class="right-info">
							<p class="title-text">
								<a href="#" class="common-btn">${ele.title}</a>
							</p>
							<p class="grade">
								<i class="star ${judgeStar(rating)}"></i>
								<span class="score">${rating.average || ''}</span>
								<span class="evaluate-num">(${rating.numRaters > 10 ? rating.numRaters + '人评价' : '评价人数不足' })</span>
							</p>
							<p class="other-msg">
								<span>${ele.attrs.singer}</span>/
								<span>${ele.attrs.pubdate}</span>/
								<span>${ele.attrs.version}</span>
							</p>
						</div>
					</li>`
		});
		$document.find('.search-con-list').html(html);
		root.total = Math.ceil(data.total / 15);
		root.managerPage(root.total, root.page);
		isDisabled(root.page, root.total);
	}
	// 判断前页 后页是否可点击
	function isDisabled(page, total) {
		var $prev = $('.prev-page a');
		var $next = $('.next-page a');
		if(page > 0 && page < total -1) {
			$prev.removeClass('disabled');
			$next.removeClass('disabled');
		} else if(page == 0) {
			$prev.addClass('disabled');
		} else if(page == total -1) {
			$next.addClass('disabled');
		}
	}
	// 判断星级
	function judgeStar(rating) {
		let star = Math.ceil(rating.average);
		switch(star) {
				case 10 :
					return 'five-star';
				case 9 : 
					return 'four-half-star';
				case 8 : 
					return 'four-star';
				case 7 : 
					return 'three-half-star';
				case 6 : 
					return 'three-star';
				case 5 : 
					return 'two-half-star';
				case 4 : 
					return 'two-star';
				case 3 : 
					return 'one-half-star';
				case 2 : 
					return 'one-star';
				case 1 : 
					return 'half-star';
				case 0 :
					return 'zero-star';
		}
	}
	root.changePage = changePage;
	root.getPageMsg = getPageMsg;
	root.renderMusicMsg = renderMusicMsg;
}(window.$, pageControl));
// 订阅函数
function getPage(e, data) {
	console.log(e);
	pageControl.getPageMsg(data);
}
// 订阅'getpage';
publish.subscribe('getpage', getPage);
// 发布 'getpage'
publish.publish('getpage', 0);

function bindEvent() {
	$document.find('.search-page-control ul').on('click', function (e) {
		e.preventDefault();
		if(e.target.nodeName == 'A') {
			// 点击索引页
			if($(e.target).attr('data-item')) {
				publish.publish('getpage', $(e.target).attr('data-item'));
			// 点击后页
			} else if($(e.target).attr('data-list') == 'next' && !$(e.target).hasClass('disabled')) {
				if(pageControl.page < pageControl.total ) {
					publish.publish('getpage', pageControl.page + 1);
				}
			// 点击前页
			} else if($(e.target).attr('data-list') == 'prev' && !$(e.target).hasClass('disabled')) {
				if(pageControl.page > 0 && pageControl.page < pageControl.total) {
					publish.publish('getpage', pageControl.page - 1);
				}
			}
			
		}
	});
	
}
bindEvent();

