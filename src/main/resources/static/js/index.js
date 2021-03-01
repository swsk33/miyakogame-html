//随机网页标签图标
let iconElement = document.createElement('link');
iconElement.setAttribute('rel', 'icon');
iconElement.setAttribute('href', '/img/icons/' + genRandom(1, 4) + '.ico');
iconElement.setAttribute('type', 'x-icon');
document.head.appendChild(iconElement);
//检测UA
let userBrowserUA = window.navigator.userAgent;
setTimeout(function () {
	if (userBrowserUA.indexOf('Android') != -1 || userBrowserUA.indexOf('iPhone') != -1 || userBrowserUA.indexOf('iPad') != -1) {
		operateLoadingPage(false);
		operateNotSupportPage(true);
	} else {
		operateLoadingPage(false);
		operateStartPage(true);
	}
}, 1500);