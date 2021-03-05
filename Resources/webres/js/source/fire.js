//火控系统
//子弹dom数组
let bulletArray = [];

/**
 * 根据武器模板射击子弹
 * 该函数实际上是对武器模板对象的深复制，因为直接使用武器模板赋值会导致武器模板的dom属性也被修改，不仅破坏了模板信息，还不能实现多个不同子弹效果
 * @param {*} weapon 武器模板
 * @returns 根据武器模板生成子弹
 */
function genBulletByWeaponTemplate(weapon) {
	let destObject = {};
	for (let key in weapon) {
		let property = weapon[key];
		if (property == null) {
			destObject[key] = null;
		} else if (property == undefined) {
			destObject[key] = undefined;
		} else if (typeof property == 'object') {
			destObject[key] = genBulletByWeaponTemplate(property);
		} else {
			destObject[key] = property;
		}
	}
	return destObject;
}

/**
 * 开火函数
 * @param {*} weapon 武器模板
 */
function fire(weapon) {
	//在装填完毕的时候可以开火
	if (!isLoadingBullet) {
		//射击后装载
		isLoadingBullet = true;
		setTimeout(function () {
			isLoadingBullet = false;
		}, weapon.interval);
		//生成子弹
		let bullet = genBulletByWeaponTemplate(weapon);
		document.querySelector(bullet.soundClassName).play();
		bullet.dom = bullet.shooting(miyako.offsetLeft + miyako.offsetWidth, miyako.offsetTop + (0.3 * miyako.offsetHeight));
		bulletArray.push(bullet);
	}
}

/**
 * 全局子弹飞行主控，此函数为回调函数，需通过另外的循环计时器调用
 * @param {*} bullets 子弹构造数组
 * @param {*} enemies 敌人构造对象数组
 */
function bulletFlyMainControl(bullets, enemies) {
	for (let i = 0; i < bullets.length; i++) {
		let eachBullet = bullets[i];
		let eachBulletDOM = eachBullet.dom;
		//执行子弹自身的飞行方法
		eachBullet.flying(eachBulletDOM);
		//开始碰撞检测
		for (let j = 0; j < enemies.length; j++) {
			if (!enemies[j].isEaten) {
				//条件1：子弹的右下部分在敌人贴图范围内
				let criteria1 = eachBulletDOM.offsetTop + eachBulletDOM.offsetHeight >= enemies[j].dom.offsetTop && eachBulletDOM.offsetLeft + eachBulletDOM.offsetWidth >= enemies[j].dom.offsetLeft;
				//条件2：子弹左上部分在敌人贴图范围内
				let criteria2 = eachBulletDOM.offsetTop <= enemies[j].dom.offsetTop + enemies[j].dom.offsetHeight && eachBulletDOM.offsetLeft <= enemies[j].dom.offsetLeft + enemies[j].dom.offsetWidth;
				//总条件：两个条件需要同时满足
				let criteriaTotal = criteria1 && criteria2;
				if (criteriaTotal) {
					//执行子弹自身的击中方法
					eachBullet.hitTrigger(eachBulletDOM, enemies[j], enemies);
					if (eachBulletDOM.offsetParent == null) {
						bullets.splice(i, 1);
					}
					break;
				}
			}
		}
		//假设子弹没有消失，说明子弹没有击中敌人或者属于击中敌人但是不消失的武器类型，那么进一步判断子弹是否飞出边界，是的话也要销毁自身
		if (eachBulletDOM.offsetParent != null) {
			if (eachBulletDOM.offsetLeft + eachBulletDOM.offsetWidth >= gameBackground.offsetWidth) {
				eachBulletDOM.remove();
				bullets.splice(i, 0);
			}
		}
	}
}

/**
 * 清空所有子弹
 */
function clearBullets() {
	for (let i = 0; i < bulletArray.length; i++) {
		bulletArray[i].dom.remove();
	}
	bulletArray = [];
}