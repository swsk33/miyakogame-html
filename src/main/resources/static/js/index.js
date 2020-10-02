//获取浏览器UA
let ua = navigator.userAgent;
let clientType; //用户设备类型

setTimeout(function() {
	if (ua.indexOf("iPhone") != -1 || ua.indexOf("Android") != -1) {
		clientType = 'mobile';
	} else {
		clientType = 'pc';
	}

	//开始跳转，加载页的路径为/miyakogame，pc端跳转至/miyakogamepc，移动端跳转至/miyakogamemobile
	if (clientType === 'pc') {
		location.pathname = '/miyakogamepc';
	} else {
		location.pathname = '/miyakogamemobile';
	}
}, 2000);
