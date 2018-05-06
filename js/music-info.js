
let aimgMsg;
function filterAimMsg(data) {
	console.log(data);
	aimMsg = data.musics.filter(ele => ele.id == musicManager.msgObj.id)[0];
	musicManager.renderGrade(aimMsg);
	musicManager.renderTags(aimMsg);
	musicManager.renderMusicInfo(aimMsg);
}
$.ajax({
	method: 'get',
	dataType: 'jsonp',
	data: `count=7&q=${musicManager.msgObj.key}`,
	url: 'https://api.douban.com/v2/music/search',
	success: filterAimMsg,
	error: function () {
		console.log('error');
	}
});