(function ($, root) {
	let msgObj = {};
	//  获取url的搜索信息 key=...&id=....
	let msgArr = decodeURI(window.location.search).slice(1).split("&").map(ele => ele.split('='));
	msgArr.forEach(ele => {
		msgObj[ele[0]] = ele[1];
	});
	root.msgObj = msgObj;
}(window.jquery, window.musicManager || (window.musicManager = {})))
