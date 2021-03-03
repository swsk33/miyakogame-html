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
	let loadValue = 0;
	let isAudioAllLoaded = false;
	let isStartPageLoaded = false;
	let isBulletLoaded = false;
	//加载音频
	let audios = document.querySelectorAll('audio');
	let audioLoadCompleteValue = 60;
	let eachAudioLoad = audioLoadCompleteValue / audios.length;
	let currentLoad = 0;
	let audioLoadControl = setInterval(() => {
		let oldLoadValue = loadValue;
		//每次获取已加载音频数
		currentLoad = 0;
		for (let i = 0; i < audios.length; i++) {
			if (isAudioOrVedioLoaded(audios[i])) {
				currentLoad++;
			}
		}
		loadValue = oldLoadValue + currentLoad * eachAudioLoad;
		setLoadingBar(loadValue);
		if (currentLoad >= audios.length) {
			isAudioAllLoaded = true;
			clearInterval(audioLoadControl);
		}
	}, 100);
	//预加载主页
	let titleImg = new Image();
	titleImg.src = "/img/textImg/title.png";
	let startPageLoadControl = setInterval(() => {
		if (titleImg.complete) {
			isStartPageLoaded = true;
			loadValue = loadValue + 15;
			setLoadingBar(loadValue);
			clearInterval(startPageLoadControl);
		}
	}, 100);
	//预加载子弹贴图
	let bulletImage = new Image();
	bulletImage.src = '/img/bullet.png';
	let bulletLoadControl = setInterval(() => {
		if (bulletImage.complete) {
			isBulletLoaded = true;
			loadValue = 100;
			setLoadingBar(loadValue);
			clearInterval(bulletLoadControl);
		}
	}, 100);
	let totalLoadControl = setInterval(() => {
		let allLoaded = isAudioAllLoaded && isStartPageLoaded && isBulletLoaded;
		if (allLoaded) {
			operateLoadingPage(false);
			operateStartPage(true);
			operateTopBarContent(true);
			clearInterval(totalLoadControl);
		}
	}, 100);
}
//开启鼠标效果
mouseMoveDropDotControl(true);
mouseClickLineControl(true);