//监听键盘事件
window.addEventListener('keydown', function(e) {
	//宫子向上移动
	if ((e.keyCode == 38 || e.keyCode == 87) && !isPaused) {
		up(5);
	}

	//宫子向下移动
	if ((e.keyCode == 40 || e.keyCode == 83) && !isPaused) {
		down(5);
	}

	//开火
	if (e.keyCode == 32 && !isPaused && !isAutoFire) {
		fire();
	}
	console.log('键盘调试输出：' + e.keyCode);
});


//自动开火按钮
let autoFireBtn = document.querySelector('.game .topBar .autoFire .btn');
let afc; //自动开火控制器
autoFireBtn.addEventListener('click', function() {
	isAutoFire = !isAutoFire;
	if (isAutoFire) {
		autoFireBtn.style.backgroundImage = 'url(./img/buttons/btn_on.png)';
		afc = setInterval(function() {
			fire();
		}, 300);
	} else {
		autoFireBtn.style.backgroundImage = 'url(./img/buttons/btn_off.png)';
		clearInterval(afc);
	}
});
