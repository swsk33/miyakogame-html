//监听键盘事件
window.addEventListener('keydown', function(e) {
	//宫子向上移动
	if ((e.keyCode == 38 || e.keyCode == 87) && !isPaused) {
		up(10);
	}

	//宫子向下移动
	if ((e.keyCode == 40 || e.keyCode == 83) && !isPaused) {
		down(10);
	}

	//开火
	if (e.keyCode == 32 && !isPaused && !isAutoFire) {
		fire();
	}
});


//自动开火按钮
let autoFireBtn = document.querySelector('.game .topBar .autoFire .btn');
let afc; //自动开火控制器
autoFireBtn.addEventListener('click', function() {
	isAutoFire = !isAutoFire;
	isLoadingBullet = false;
	loadingInterval = 350;
	if (isAutoFire) {
		autoFireBtn.style.backgroundImage = 'url(./img/buttons/btn_on.png)';
		afc = setInterval(function() {
			if (!isPaused) {
				fire();
			}
		}, loadingInterval);
	} else {
		autoFireBtn.style.backgroundImage = 'url(./img/buttons/btn_off.png)';
		loadingInterval = 500;
		clearInterval(afc);
	}
});

//开始界面监听
let startPageBtn = document.querySelector('.start ul').children;
//继续游戏按钮
function continueGame() {
	document.querySelector('.startAudio').play();
	isPaused = false;
	startPage.style.display = 'none';
	getPuddings();
	puddingMoveControl(isPaused, puddingMove);
}
startPageBtn[0].addEventListener('click', continueGame);
//新游戏按钮
startPageBtn[1].addEventListener('click', function() {
	window.localStorage.clear();
	readData();
	document.querySelector('.startAudio').play();
	isPaused = false;
	startPage.style.display = 'none';
	getPuddings();
	puddingMoveControl(isPaused, puddingMove);
});
//帮助按钮
startPageBtn[2].addEventListener('click', function() {
	helpPage.style.display = 'block';
});

//成功界面监听
let succeedPageBtn = document.querySelector('.succeed ul').children;
//下一关按钮
succeedPageBtn[0].addEventListener('click', function() {
	isPaused = false;
	succeedPage.style.display = 'none';
	getPuddings();
	puddingMoveControl(isPaused, puddingMove);
});
//返回主菜单按钮
succeedPageBtn[1].addEventListener('click', function() {
	succeedPage.style.display = 'none';
	startPage.style.display = 'flex';
	startPageBtn[0].style.color = '#ff5500';
});

//失败界面监听
let failedPageBtn = document.querySelector('.failed ul').children;
//重新开始按钮
failedPageBtn[0].addEventListener('click', function() {
	failedPage.style.display = 'none';
	isPaused = false;
	getPuddings();
	puddingMoveControl(isPaused, puddingMove);
});
//返回主菜单按钮
failedPageBtn[1].addEventListener('click', function() {
	failedPage.style.display = 'none';
	startPage.style.display = 'flex';
});

//帮助界面按钮
let helpPageBtn = helpPage.children[0];
helpPageBtn.children[4].addEventListener('click', function() {
	helpPage.style.display = 'none';
});
