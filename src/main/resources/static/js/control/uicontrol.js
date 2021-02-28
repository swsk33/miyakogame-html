//界面控制器
//关键网页dom
let currentScoreDom = document.querySelector('.game .topBar .scorePanel .currentScore'); //当前分数dom
let highScoreDom = document.querySelector('.game .topBar .scorePanel .highScore'); //最高分数dom
let levelDom = document.querySelector('.game .topBar .level'); //关卡dom
let healthDom = document.querySelector('.game .topBar .health .t'); //获取生命值文字部分dom
let gameBackground = document.querySelector('.game .gameBg'); //获取游戏背景
let gameTopBar = document.querySelector('.game .topBar'); //获取游戏上栏
let succeedPage = document.querySelector('.succeed'); //获取胜利界面
let failedPage = document.querySelector('.failed'); //获取失败界面
let startPage = document.querySelector('.start'); //获取开始界面
let helpPage = document.querySelector('.help'); //获取帮助界面
let startPageBtn = document.querySelector('.start ul').children; //获取开始界面的所有按钮

/**
 * 开始页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateStartPage(isVisible) {
	if (isVisible) {
		if (readData()) {
			startPageBtn[0].style.color = 'gray';
			startPageBtn[0].onclick = null;
		} else {
			startPageBtn[0].style.color = '#ff5500';
			startPageBtn[0].onclick = 'continueGame()';
		}
		startPage.style.display = 'flex';
	} else {
		startPage.style.display = 'none';
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