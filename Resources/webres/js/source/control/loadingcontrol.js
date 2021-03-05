//检测各种元素加载情况
//所有的图片资源的地址
let allImg = ['/img/avatars/angry.png',
	'/img/avatars/excepted.png',
	'/img/avatars/happy.png',
	'/img/avatars/not-support.png',
	'/img/puddings/p1.png',
	'/img/puddings/p2.png',
	'/img/puddings/p3.png',
	'/img/textImg/title.png',
	'/img/bullets/bullet.png',
	'/img/bullets/bullet-penetrate.png',
	'/img/bullets/bullet-boom.gif',
	'/img/bullets/scatter-icon.png',
	'/img/miyako-normal.png',
	'/img/youl-dynamic.gif',
	'/img/youl-static.png'
];
//所有图片资源对象
let allImgObjects = [];
//加载图片资源总数
let imgTotalCount = allImg.length;
//图片资源已加载个数
let imgLoaded = 0;
//图片是否全部加载完成
let isImgAllLoaded = false;
//获取所有音频资源dom
let audios = document.querySelectorAll('audio');
//音频资源总数
let audioTotalCount = audios.length;
//音频加载完成数
let audioLoaded = 0;
//音频是否全部加载完成
let isAudioAllLoaded = false;

/**
 * 预加载所有图片资源并实时设定加载完成个数
 */
function loadAllImg() {
	for (let i = 0; i < allImg.length; i++) { //先加载对象，并将其放入全局数组
		let img = new Image();
		img.src = allImg[i];
		allImgObjects.push(img);
	}
	let loadCheckControl = setInterval(() => {
		let currentCheck = 0;
		for (let i = 0; i < allImgObjects.length; i++) {
			if (allImgObjects[i].complete) {
				currentCheck++;
			}
		}
		imgLoaded = currentCheck;
		if (imgLoaded == allImgObjects.length) {
			isImgAllLoaded = true;
			clearInterval(loadCheckControl);
		}
	}, 100);
}

/**
 * 检测全部音频是否加载完成并实时设定加载数
 */
function checkAllAudioLoad() {
	let audioCheckControl = setInterval(() => {
		let currentCheck = 0;
		for (let i = 0; i < audios.length; i++) {
			if (audios[i].readyState == 4) {
				currentCheck++;
			}
		}
		audioLoaded = currentCheck;
		if (audioLoaded == audios.length) {
			isAudioAllLoaded = true;
			clearInterval(audioCheckControl);
		}
	}, 100);
}