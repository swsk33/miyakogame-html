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
	operateNotSupportPage(true, '抱歉，该游戏不支持移动端，请使用电脑访问！');
} else if (userBrowserUA.toLowerCase().indexOf('trident') != -1) {
	operateLoadingPage(false);
	operateNotSupportPage(true, '抱歉，该游戏不支持IE内核浏览器，请使用Chrome或者Firefox内核浏览器访问！');
} else {
	let loadValue = 0;
	let audioDataProportion = 70;
	let imgDataProportion = 30;
	//开始预加载图片和音频并检查加载进度、设定进度条
	loadAllImg();
	checkAllAudioLoad();
	let loadingBarControl = setInterval(() => {
		let imgLoadRatio = (imgLoaded / imgTotalCount) * imgDataProportion;
		let audioLoadRatio = (audioLoaded / audioTotalCount) * audioDataProportion;
		loadValue = imgLoadRatio + audioLoadRatio;
		setLoadingBar(loadValue);
		if (isImgAllLoaded && isAudioAllLoaded) {
			operateLoadingPage(false);
			operateStartPage(true);
			operateTopBarContent(true);
			//释放内存
			loadValue = null;
			audioDataProportion = null;
			imgDataProportion = null;
			allImg = null;
			allImgObjects = null;
			imgTotalCount = null;
			imgLoaded = null;
			isImgAllLoaded = null;
			audios = null;
			audioTotalCount = null;
			audioLoaded = null;
			isAudioAllLoaded = null;
			clearInterval(loadingBarControl);
		}
	}, 100);
}
//开启鼠标效果
mouseMoveDropDotControl(true);
mouseClickLineControl(true);