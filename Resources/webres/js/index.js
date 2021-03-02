//随机网页标签图标
let iconElement = document.createElement('link');
iconElement.setAttribute('rel', 'icon');
iconElement.setAttribute('href', '/img/icons/' + genRandom(1, 4) + '.ico');
iconElement.setAttribute('type', 'x-icon');
document.head.appendChild(iconElement);
//检测UA
let userBrowserUA = window.navigator.userAgent;
operateTopBarContent(false);
if (userBrowserUA.indexOf('Android') != -1 || userBrowserUA.indexOf('iPhone') != -1 || userBrowserUA.indexOf('iPad') != -1) {
	operateLoadingPage(false);
	operateNotSupportPage(true);
} else {
	//加载组件（待完善）
	let loadValue = 0;
	let audios = document.querySelectorAll('audio');
	let audioLoadValue = 100;
	let eachAudioLoad = audioLoadValue / audios.length;
	window.onload = function () {
		//operateLoadingPage(false);
		operateStartPage(true);
		//operateTopBarContent(true);
	};
}
//开启鼠标效果
mouseMoveDropDotControl(true);
mouseClickLineControl(true);