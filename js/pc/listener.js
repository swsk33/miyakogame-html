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
	loadingInterval = 300;
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
startPageBtn[0].addEventListener('click', function() {
	if (!(currentScore == 0 && highScore == 0 && health == 3 && level == 1)) {
		isPaused = false;
		startPage.style.display = 'none';
		getPuddings();
		puddingMoveControl(isPaused, puddingMove);
	}
});
//新游戏按钮
startPageBtn[1].addEventListener('click', function() {
	window.localStorage.clear();
	readData();
	isPaused = false;
	startPage.style.display = 'none';
	getPuddings();
	puddingMoveControl(isPaused, puddingMove);
});

//成功界面监听
let succeedPageBtn = document.querySelector('.succeed ul').children;
//下一关按钮
succeedPageBtn[0].addEventListener('click', function() {
	isPaused = false;
	succeedPage.style.display = 'none';
	getPuddings();
	puddingMoveControl(isPaused, puddingMove());
});
//返回主菜单按钮
succeedPageBtn[1].addEventListener('click', function() {
	succeedPage.style.display = 'none';
	startPage.style.display = 'flex';
});