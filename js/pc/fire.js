//火控系统
let bg = document.querySelector('.game .gameBg');
//开火函数
function fire() {
	//在装填完毕的时候可以开火
	if (!isLoadingBullet) {
		//射击后装载时间
		isLoadingBullet = true;
		let loading = setTimeout(function() {
			isLoadingBullet = false;
		}, 500);
		//生成子弹
		let bullet = document.createElement('div');
		bullet.className = 'bullet';
		bullet.style.position = 'absolute';
		bullet.style.width = '15px';
		bullet.style.height = '24px';
		bullet.style.left = miyako.offsetLeft + miyako.offsetWidth + 'px';
		bullet.style.top = miyako.offsetTop + (0.3 * miyako.offsetHeight) + 'px';
		bullet.style.background = 'url(./img/bullet.png) no-repeat center/cover';
		bg.appendChild(bullet);
		//子弹飞行
		let bulletX = bullet.offsetLeft;
		let flyController = setInterval(function() {
			bulletX = bulletX + 2;
			bullet.style.left = bulletX + 'px';
			//子弹飞出边界，停止飞行控制并销毁自身
			if (bullet.offsetLeft + bullet.offsetWidth > bgWidth) {
				clearInterval(flyController);
				bullet.remove();
			}
		}, 3);
	}
}
