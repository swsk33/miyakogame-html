//火控系统
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
			//如果子弹和敌人相碰，则停止飞行并销毁自身
			if (collideCheck(bullet, puddingArray)) {
				clearInterval(flyController);
				bullet.remove();
			}
			//子弹飞出边界，停止飞行控制并销毁自身
			if (bullet.offsetLeft + bullet.offsetWidth > bg.offsetWidth) {
				clearInterval(flyController);
				bullet.remove();
			}
		}, 3);
	}
}

//碰撞检测与计算，传入子弹dom和构造敌人对象数组
function collideCheck(bullet, objectArray) {
	let isCollide = false;
	//依次判断这个子弹是否和每一个敌人相碰，相碰后把相应的敌人构造对象标记为已被击中，加分并跳出遍历
	for (let i = 0; i < objectArray.length; i++) {
		//！此处错误，明天来改
		if (((bullet.offsetTop + bullet.offsetHeight) >= objectArray[i].dom.offsetTop && (bullet.offsetLeft + bullet.offsetWidth) >= objectArray[i].dom.offsetLeft) && (bullet.offsetTop <= (objectArray[i].dom.offsetTop + objectArray[i].dom.offsetHeight) && bullet.offsetLeft <= (objectArray[i].dom.offsetLeft + objectArray[i].dom.offsetWidth))) {
			isCollide = true;
			objectArray[i].isEaten = true;
			addScore(objectArray[i].score);
			break;
		}
	}
	return isCollide;
}