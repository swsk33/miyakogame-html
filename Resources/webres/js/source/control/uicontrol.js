//界面控制器
//关键网页dom
let currentScoreDom = document.querySelector('.game .topBar .scorePanel .currentScore'); //当前分数dom
let highScoreDom = document.querySelector('.game .topBar .scorePanel .highScore'); //最高分数dom
let levelDom = document.querySelector('.game .topBar .level'); //关卡dom
let healthDom = document.querySelector('.game .topBar .health .t'); //获取生命值文字部分dom
let weaponDom = document.querySelector('.game .topBar .weapon'); //获取武器指示部分的dom
let gameBackground = document.querySelector('.game .gameBg'); //获取游戏背景
let gameTopBar = document.querySelector('.game .topBar'); //获取游戏上栏
let succeedPage = document.querySelector('.succeed'); //获取胜利界面
let failedPage = document.querySelector('.failed'); //获取失败界面
let startPage = document.querySelector('.start'); //获取开始界面
let pausePage = document.querySelector('.pause'); //获取暂停界面
let loadingPage = document.querySelector('.loading'); //获取加载页面
let transitionPage = document.querySelector('.transition'); //获取过渡界面
let processBar = document.querySelector('.loading .processBar .processValue'); //获取进度条
let processNum = document.querySelector('.loading .processNum'); //获取加载动画数值
let notSupportPage = document.querySelector('.notsupport'); //获取不支持提示页面
let helpPage = document.querySelector('.help'); //获取帮助界面
let startPageBtn = document.querySelector('.start ul').children; //获取开始界面的所有按钮

/**
 * 开始页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateStartPage(isVisible) {
	if (isVisible) {
		startPage.children[0].style.display = 'flex';
		startPage.children[1].style.display = 'inline';
		startPage.style.borderRight = 'none';
		startPage.style.width = '100%';
		if (readData() || health < 0) {
			startPageBtn[0].style.color = 'gray';
			startPageBtn[0].removeEventListener('click', continueGame);
		} else {
			startPageBtn[0].style.color = '#ff5500';
			startPageBtn[0].addEventListener('click', continueGame);
		}
		startPage.style.display = 'flex';
	} else {
		let totalMagnification = 3570;
		let pageWidth = startPage.offsetWidth;
		let eachMove = pageWidth / totalMagnification;
		let startRate = 119;
		let keyFrame = 60;
		startPage.style.borderRight = '5px solid #014dff';
		let fadeControl = setInterval(() => {
			pageWidth = pageWidth - startRate * eachMove;
			startPage.style.width = pageWidth + 'px';
			startRate = startRate - 2;
			keyFrame--;
			if (keyFrame == 40) {
				startPage.children[0].style.display = 'none';
				startPage.children[1].style.display = 'none';
			}
			if (keyFrame <= 0) {
				startPage.style.display = 'none';
				clearInterval(fadeControl);
			}
		}, 16);
	}
}

/**
 * 操纵顶栏控件
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateTopBarContent(isVisible) {
	if (isVisible) {
		for (let i = 0; i < gameTopBar.children.length; i++) {
			gameTopBar.children[i].style.display = 'flex';
		}
	} else {
		for (let i = 0; i < gameTopBar.children.length; i++) {
			gameTopBar.children[i].style.display = 'none';
		}
	}
}

/**
 * 操纵加载页面
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateLoadingPage(isVisible) {
	if (isVisible) {
		loadingPage.style.display = 'flex';
	} else {
		loadingPage.style.display = 'none';
	}
}

/**
 * 操控进度条和进度数值
 * @param {*} value 进度百分比
 */
function setLoadingBar(value) {
	let originValue = processNum.innerHTML.substring(8, processNum.innerHTML.indexOf('%'));
	let distance = value - parseFloat(originValue);
	if (distance > 0) {
		let section = 169;
		let sectionValue = distance / section;
		let eachLoadSection = 25;
		let loadInterval = setInterval(function () {
			originValue = parseFloat(originValue) + eachLoadSection * sectionValue;
			processBar.style.width = originValue + '%';
			processNum.innerHTML = 'process ' + originValue.toFixed(2) + '%';
			eachLoadSection = eachLoadSection - 2;
			if (eachLoadSection < 0) {
				clearInterval(loadInterval);
			}
		}, 16);
	}
}

/**
 * 操纵不支持提示页
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 * @param {*} msg 提示信息
 */
function operateNotSupportPage(isVisible, msg) {
	if (isVisible) {
		notSupportPage.style.display = 'flex';
		notSupportPage.children[1].innerHTML = msg;
	} else {
		notSupportPage.style.display = 'none';
	}
}

/**
 * 失败页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function opreateFailedPage(isVisible) {
	if (isVisible) {
		failedPage.style.display = 'flex';
		document.querySelector('.failedAudio-' + genRandom(1, 3)).play();
	} else {
		failedPage.style.display = 'none';
	}
}

/**
 * 胜利页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateSuccessPage(isVisible) {
	if (isVisible) {
		succeedPage.style.display = 'flex';
		document.querySelector('.succeedAduio-' + genRandom(1, 2)).play();
	} else {
		succeedPage.style.display = 'none';
	}
}

/**
 * 暂停蒙层控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operatePausePage(isVisible) {
	if (isVisible) {
		pausePage.style.display = 'flex';
	} else {
		pausePage.style.display = 'none';
	}
}

/**
 * 帮助页面控制
 * @param {*} isVisible  值为true时显示界面，否则隐藏界面
 */
function opreateHelpPage(isVisible) {
	if (isVisible) {
		helpPage.style.display = 'block';
	} else {
		helpPage.style.display = 'none';
	}
}

/**
 * 敌人消失动画
 * @param {*} enemyObject 构造敌人对象
 */
function enemyFadeEffect(enemyObject) {
	enemyObject.isEaten = true;
	addScore(enemyObject.score);
	let currentKeyFrame = 20;
	let totalKeyFrame = currentKeyFrame;
	let sizeRatio = 1;
	let deg = 0;
	let effectControl = setInterval(() => {
		enemyObject.dom.style.transform = 'scale(' + sizeRatio.toFixed(2) + ') rotate(' + deg + 'deg)';
		sizeRatio = sizeRatio - 1 / totalKeyFrame;
		deg = deg + 90 / totalKeyFrame;
		currentKeyFrame--;
		if (currentKeyFrame <= 0) {
			enemyObject.dom.style.display = 'none';
			clearInterval(effectControl);
		}
	}, 16);
}