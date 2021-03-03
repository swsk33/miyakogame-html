//检测各种元素加载情况
//所有的图片资源
const allImg = ['/img/avatars/angry.png', '/img/avatars/excepted.png', '/img/avatars/happy.png', '/img/avatars/not-support.png', '/img/puddings/p1.png', '/img/puddings/p2.png', '/img/puddings/p3.png', '/img/textImg/title.png', '/img/bullet.png', '/img/miyako-normal.png', '/img/youl-dynamic.gif', '/img/youl-static.png'];
//图片资源已加载个数
let imgLoaded = 0;

/**
 * 预加载所有图片资源并设定加载完成个数（待完善）
 */
function loadAllImg() {
	let currentLoadCount = 0;
	let img = new Image();
	for (let i = 0; i < allImg.length; i++) {
		img.src = allImg[i];
		if (img.complete) {
			currentLoadCount++;
		}
	}
	imgLoaded = currentLoadCount;
	if (imgLoaded < allImg.length) {
		loadAllImg();
	}
}

/**
 * 检测音频或者视频是否加载完成
 * @param {*} element 音频或者视频dom
 */
function isAudioOrVedioLoaded(element) {
	return element.readyState == 4;
}

/**
 * 检测Img标签是否加载完成
 * @param {*} img img标签dom
 */
function isImageLoaded(img) {
	return img.complete;
}

/**
 * 检测div元素的背景图片是否加载完成
 * @param {*} divElem 
 */
function isDivBackgroundLoaded(divElem) {
	let imgurl = window.getComputedStyle(divElem, null).getPropertyValue('background-image');
	imgurl = imgurl.substring(5, imgurl.lastIndexOf('\"'));
	let img = new Image();
	img.src = imgurl;
	return img.complete;
}