function ajax(method, url, data, callback, boolean) {
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new window.XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHttp")
	}

	method = method.toUpperCase();
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				callback(xhr.responseText);
			} else {
				console.log("error")
			}
		}
	}
	if(method === "GET") {
		xhr.open(method, url + "?" + data, boolean);
		xhr.send();
	} else {
		xhr.open(method, url, boolean);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(data)
	}

}
