//监听键盘事件
window.addEventListener('keydown', function (e) {
	//宫子向上移动
	if ((e.keyCode == 38 || e.keyCode == 87) && !isPaused) {
		up(10);
	}

	//宫子向下移动
	if ((e.keyCode == 40 || e.keyCode == 83) && !isPaused) {
		down(10);
	}

	//开火
	if (e.keyCode == 32 && !isPaused) {
		fire();
	}
});

//新游戏按钮
startPageBtn[1].addEventListener('click', function () {
	window.localStorage.clear();
	readData();
	document.querySelector('.startAudio').play();
	operateStartPage(false);
	initializePuddings();
	startGameProcess();
});

//帮助按钮
startPageBtn[2].addEventListener('click', function () {
	opreateHelpPage(true);
});

//成功界面监听
let succeedPageBtn = document.querySelector('.succeed ul').children;
//下一关按钮
succeedPageBtn[0].addEventListener('click', function () {
	operateSuccessPage(false);
	initializePuddings();
	startGameProcess();
});
//返回主菜单按钮
succeedPageBtn[1].addEventListener('click', function () {
	operateSuccessPage(false);
	operateStartPage(true);
});

//失败界面监听
let failedPageBtn = document.querySelector('.failed ul').children;
//重新开始按钮
failedPageBtn[0].addEventListener('click', function () {
	opreateFailedPage(false);
	initializePuddings();
	startGameProcess();
});

//返回主菜单按钮
failedPageBtn[1].addEventListener('click', function () {
	opreateFailedPage(false);
	operateStartPage(true);
});

//帮助界面按钮
let helpPageBtn = helpPage.children[0];
helpPageBtn.children[4].addEventListener('click', function () {
	opreateHelpPage(false);
});