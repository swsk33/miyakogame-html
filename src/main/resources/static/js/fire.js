//火控系统
//子弹dom数组
let bulletsArray = [];

/**
 * 开火函数
 */
function fire() {
	//在装填完毕的时候可以开火
	if (!isLoadingBullet) {
		//射击后装载时间
		isLoadingBullet = true;
		let loading = setTimeout(function () {
			isLoadingBullet = false;
		}, loadingInterval);
		//生成子弹
		let bullet = document.createElement('div');
		bullet.className = 'bullet';
		bullet.style.position = 'absolute';
		bullet.style.left = miyako.offsetLeft + miyako.offsetWidth + 'px';
		bullet.style.top = miyako.offsetTop + (0.3 * miyako.offsetHeight) + 'px';
		//万圣节和平常子弹贴图不同
		if (dateCriteria) {
			bullet.style.width = '15px';
			bullet.style.height = '25px';
			bullet.style.background = 'url(./img/festival/halloween/bullet.png) no-repeat center/cover';
		} else {
			bullet.style.width = '15px';
			bullet.style.height = '24px';
			bullet.style.background = 'url(./img/bullet.png) no-repeat center/cover';
		}
		bulletsArray.push(bullet);
		gameBackground.appendChild(bullet);
	}
}

/**
 * 子弹飞行方法，需通过另外的循环计时器调用
 * @param {*} bullets 子弹dom数组
 * @param {*} enemies 敌人构造对象数组
 */
function bulletFly(bullets, enemies) {
	for (let i = 0; i < bullets.length; i++) {
		let eachBullet = bullets[i];
		let eachBulletX = eachBullet.offsetLeft;
		eachBulletX = eachBulletX + 12;
		eachBullet.style.left = eachBulletX + 'px';
		//开始碰撞检测
		let isCollide = false;
		for (let j = 0; j < enemies.length; j++) {
			//条件1：子弹的右下部分在敌人贴图范围内
			let criteria1 = bullet.offsetTop + bullet.offsetHeight >= enemies[j].dom.offsetTop && bullet.offsetLeft + bullet.offsetWidth >= enemies[j].dom.offsetLeft;
			//条件2：子弹左上部分在敌人贴图范围内
			let criteria2 = bullet.offsetTop <= enemies[j].dom.offsetTop + enemies[j].dom.offsetHeight && bullet.offsetLeft <= enemies[j].dom.offsetLeft + enemies[j].dom.offsetWidth;
			//条件3：子弹碰到的敌人是没被击中的状态
			let criteria3 = !enemies[j].isEaten;
			//总条件：三个条件需要同时满足
			let criteriaTotal = criteria1 && criteria2 && criteria3;
			if (criteriaTotal) {
				enemies[j].dom.style.display = 'none';
				enemies[j].isEaten = true;
				bullets.splice(i, 1);
				addScore(enemies[j].score);
				isCollide = true;
				break;
			}
		}
		//假设子弹未击中敌人，那么子弹飞出边界也要销毁自身
		if (!isCollide) {
			if (eachBullet.offsetLeft + eachBullet.offsetWidth >= gameBackground.offsetWidth) {
				eachBullet.remove();
				bullets.splice(i, 0);
			}
		}
	}
}